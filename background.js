const SYSTEM_PROMPT = `You are a strict dictionary API. You must respond ONLY with a valid JSON object. Do not include any markdown formatting, code blocks, conversational text, or explanations. 

Required JSON format:
{
  "type": "noun/verb/adj/adv/phrase/etc",
  "definition": "clear 1-2 sentence definition",
  "example": "a natural example sentence",
  "note": "optional extra note, or null"
}

Rules:
1. Return ONLY the JSON object.
2. Keys must exactly match: "type", "definition", "example", "note".
3. NO MARKDOWN (do not use \`\`\`json).
4. NO EXPLANATIONS.`;

// ── Provider API handlers ──────────────────────────────────────────────────────

async function callGemini(apiKey, model, word) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ parts: [{ text: `Define: ${word}` }] }],
        generationConfig: { maxOutputTokens: 300, temperature: 0.2, responseMimeType: 'application/json' }
      })
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gemini API error ${res.status}`);
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callOpenAI(apiKey, model, word) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Define: ${word}` }
      ],
      max_tokens: 300,
      temperature: 0.2,
      response_format: { type: 'json_object' }
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `OpenAI API error ${res.status}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

async function callAnthropic(apiKey, model, word) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: `Define: ${word}` }]
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Anthropic API error ${res.status}`);
  }
  const data = await res.json();
  return data.content?.[0]?.text || '';
}

async function callGroq(apiKey, model, word) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Define: ${word}` }
      ],
      max_tokens: 300,
      temperature: 0.2,
      response_format: { type: 'json_object' }
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Groq API error ${res.status}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

async function callOpenRouter(apiKey, model, word) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://github.com/word-definer-ext',
      'X-Title': 'Word Definer'
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Define: ${word}` }
      ],
      max_tokens: 300,
      temperature: 0.2,
      response_format: { type: 'json_object' }
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `OpenRouter API error ${res.status}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

// ── Parse raw text to definition object ───────────────────────────────────────

function parseDefinition(rawText) {
  let text = rawText
    // Strip thinking blocks from reasoning models (DeepSeek R1, Qwen3, etc.)
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/<thinking>[\s\S]*?<\/thinking>/gi, '')
    // Unwrap code fences with any language tag (```json, ```javascript, ``` etc.)
    .replace(/```[a-z0-9]*\s*\n?([\s\S]*?)\n?\s*```/gi, '$1')
    .trim();

  // Fast path: the whole cleaned text is valid JSON
  try { return JSON.parse(text); } catch {}

  // Fallback: extract the outermost {...} — handles leading/trailing prose
  const start = text.indexOf('{');
  const end   = text.lastIndexOf('}');
  if (start !== -1 && end > start) {
    try { return JSON.parse(text.slice(start, end + 1)); } catch {}
  }

  return { _rawFailed: text };
}

// ── Context menu (right-click to define — works in PDFs where mouseup can't) ──

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus?.removeAll?.(() => {
    chrome.contextMenus?.create({
      id: 'define-word',
      title: 'Define "%s"',
      contexts: ['selection'],
    });
  });
});

chrome.contextMenus?.onClicked?.addListener((info, tab) => {
  if (info.menuItemId !== 'define-word') return;
  const word = (info.selectionText || '').trim();
  if (!word || word.length < 2 || word.length > 120) return;
  // Broadcast to all frames — the PDF viewer assigns non-zero frameId to its
  // internal frame, but our content script lives in the outer document (frame 0).
  // Broadcasting lets whichever frame has the script handle it.
  chrome.tabs.sendMessage(
    tab.id,
    { type: 'DEFINE_FROM_MENU', word },
    () => void chrome.runtime.lastError
  );
});

// ── Message listener ──────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type !== 'DEFINE') return;

  chrome.storage.sync.get(['apiKey', 'provider', 'model', 'customModel'], async (result) => {
    const provider = result.provider || 'openrouter';
    const apiKey = (result.apiKey || '').replace(/[^\x20-\x7E]/g, '');
    // customModel is the legacy field; model is the unified field going forward
    const finalModel = result.customModel || result.model || 'deepseek/deepseek-r1:free';

    if (!apiKey) {
      sendResponse({ error: 'NO_KEY' });
      return;
    }

    try {
      let rawText;
      switch (provider) {
        case 'gemini':      rawText = await callGemini(apiKey, finalModel, request.word);      break;
        case 'openai':      rawText = await callOpenAI(apiKey, finalModel, request.word);      break;
        case 'anthropic':   rawText = await callAnthropic(apiKey, finalModel, request.word);   break;
        case 'groq':        rawText = await callGroq(apiKey, finalModel, request.word);         break;
        case 'openrouter':  rawText = await callOpenRouter(apiKey, finalModel, request.word);  break;
        default: throw new Error('Unknown AI provider selected.');
      }

      const def = parseDefinition(rawText);

      if (def && def._rawFailed) {
        sendResponse({ error: `Could not parse AI response. Try a different model.\nRaw: ${def._rawFailed.substring(0, 120)}` });
        return;
      }

      if (!def || !def.definition) {
        sendResponse({ error: `AI response missing required fields. Try a different model.\nRaw: ${rawText.substring(0, 120)}` });
        return;
      }

      sendResponse({ result: def });
    } catch (err) {
      sendResponse({ error: err.message });
    }
  });

  return true; // keep message channel open for async response
});
