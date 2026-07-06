const PROVIDERS = {
  gemini: {
    name: 'Google Gemini',
    models: [
      { id: 'gemini-2.0-flash',       name: 'Gemini 2.0 Flash (Recommended)' },
      { id: 'gemini-1.5-flash',        name: 'Gemini 1.5 Flash' },
      { id: 'gemini-1.5-pro',          name: 'Gemini 1.5 Pro' },
      { id: 'gemini-2.0-flash-lite',   name: 'Gemini 2.0 Flash Lite' },
    ],
    placeholder: 'AIza...',
    keyUrl: 'https://aistudio.google.com/apikey',
    keyLabel: 'aistudio.google.com/apikey'
  },
  openai: {
    name: 'OpenAI',
    models: [
      { id: 'gpt-4o-mini',   name: 'GPT-4o Mini (Recommended)' },
      { id: 'gpt-4o',        name: 'GPT-4o' },
      { id: 'gpt-4-turbo',   name: 'GPT-4 Turbo' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
    ],
    placeholder: 'sk-...',
    keyUrl: 'https://platform.openai.com/api-keys',
    keyLabel: 'platform.openai.com/api-keys'
  },
  anthropic: {
    name: 'Anthropic (Claude)',
    models: [
      { id: 'claude-3-5-haiku-latest',  name: 'Claude 3.5 Haiku (Recommended)' },
      { id: 'claude-3-5-sonnet-latest', name: 'Claude 3.5 Sonnet' },
      { id: 'claude-3-opus-latest',     name: 'Claude 3 Opus' },
    ],
    placeholder: 'sk-ant-...',
    keyUrl: 'https://console.anthropic.com/keys',
    keyLabel: 'console.anthropic.com/keys'
  },
  groq: {
    name: 'Groq (Free & Fast)',
    models: [
      { id: 'llama-3.1-8b-instant',    name: 'Llama 3.1 8B Instant (Recommended)' },
      { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B' },
      { id: 'mixtral-8x7b-32768',      name: 'Mixtral 8x7B' },
      { id: 'gemma2-9b-it',            name: 'Gemma 2 9B' },
    ],
    placeholder: 'gsk_...',
    keyUrl: 'https://console.groq.com/keys',
    keyLabel: 'console.groq.com/keys'
  },
  openrouter: {
    name: 'OpenRouter (Multi-model)',
    models: [
      // ── Free models (fetched 2025-05-17) ──────────────────────────────────
      { id: 'deepseek/deepseek-v4-flash:free',                               name: 'DeepSeek V4 Flash (Free)' },
      { id: 'deepseek/deepseek-r1:free',                                     name: 'DeepSeek R1 Thinking (Free)' },
      { id: 'deepseek/deepseek-chat-v3-0324:free',                           name: 'DeepSeek V3 (Free)' },
      { id: 'google/gemma-4-31b-it:free',                                    name: 'Google Gemma 4 31B (Free)' },
      { id: 'google/gemma-4-26b-a4b-it:free',                               name: 'Google Gemma 4 26B (Free)' },
      { id: 'google/gemini-2.0-flash-exp:free',                              name: 'Gemini 2.0 Flash Exp (Free)' },
      { id: 'meta-llama/llama-4-scout:free',                                 name: 'Llama 4 Scout (Free)' },
      { id: 'meta-llama/llama-3.3-70b-instruct:free',                        name: 'Llama 3.3 70B (Free)' },
      { id: 'meta-llama/llama-3.2-3b-instruct:free',                         name: 'Llama 3.2 3B (Free)' },
      { id: 'qwen/qwen3-coder:free',                                         name: 'Qwen3 Coder 480B (Free)' },
      { id: 'qwen/qwen3-next-80b-a3b-instruct:free',                         name: 'Qwen3 Next 80B (Free)' },
      { id: 'qwen/qwen3-8b:free',                                            name: 'Qwen3 8B (Free)' },
      { id: 'nvidia/nemotron-3-super-120b-a12b:free',                        name: 'NVIDIA Nemotron Super 120B (Free)' },
      { id: 'nvidia/nemotron-3-nano-30b-a3b:free',                           name: 'NVIDIA Nemotron Nano 30B (Free)' },
      { id: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',            name: 'NVIDIA Nemotron Omni 30B (Free)' },
      { id: 'nvidia/nemotron-nano-9b-v2:free',                               name: 'NVIDIA Nemotron Nano 9B (Free)' },
      { id: 'openai/gpt-oss-120b:free',                                      name: 'OpenAI GPT OSS 120B (Free)' },
      { id: 'openai/gpt-oss-20b:free',                                       name: 'OpenAI GPT OSS 20B (Free)' },
      { id: 'nousresearch/hermes-3-llama-3.1-405b:free',                     name: 'Nous Hermes 3 405B (Free)' },
      { id: 'minimax/minimax-m2.5:free',                                     name: 'MiniMax M2.5 (Free)' },
      { id: 'arcee-ai/trinity-large-thinking:free',                          name: 'Arcee Trinity Thinking (Free)' },
      { id: 'mistralai/mistral-7b-instruct:free',                            name: 'Mistral 7B (Free)' },
      { id: 'z-ai/glm-4.5-air:free',                                         name: 'GLM 4.5 Air (Free)' },
      { id: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free', name: 'Venice Uncensored 24B (Free)' },
      { id: 'liquid/lfm-2.5-1.2b-instruct:free',                            name: 'LiquidAI LFM 1.2B (Free)' },
      { id: 'baidu/cobuddy:free',                                            name: 'Baidu CoBuddy (Free)' },
      { id: 'poolside/laguna-m.1:free',                                      name: 'Poolside Laguna M.1 (Free)' },
      { id: 'poolside/laguna-xs.2:free',                                     name: 'Poolside Laguna XS.2 (Free)' },
      // ── Paid (popular) ────────────────────────────────────────────────────
      { id: 'meta-llama/llama-3.3-70b-instruct',                            name: 'Llama 3.3 70B' },
      { id: 'anthropic/claude-3.5-haiku',                                   name: 'Claude 3.5 Haiku' },
      { id: 'openai/gpt-4o-mini',                                           name: 'GPT-4o Mini' },
      { id: 'google/gemini-2.0-flash-001',                                  name: 'Gemini 2.0 Flash' },
    ],
    placeholder: 'sk-or-...',
    keyUrl: 'https://openrouter.ai/keys',
    keyLabel: 'openrouter.ai/keys'
  }
};

// ── DOM refs ───────────────────────────────────────────────────────────────────
const providerSelect   = document.getElementById('provider-select');
const modelInput       = document.getElementById('model-input');
const modelDropdown    = document.getElementById('model-dropdown');
const apiInput         = document.getElementById('api-key');
const toggleBtn        = document.getElementById('toggle-btn');
const saveBtn          = document.getElementById('save-btn');
const statusEl         = document.getElementById('status');
const keyLink          = document.getElementById('key-link');
const refreshModelsBtn = document.getElementById('refresh-models-btn');

const configuredBanner = document.getElementById('configured-banner');
const bannerProvider   = document.getElementById('banner-provider');
const bannerModel      = document.getElementById('banner-model');
const updateBtn        = document.getElementById('update-btn');
const settingsForm     = document.getElementById('settings-form');

const defineInput  = document.getElementById('define-input');
const defineBtn    = document.getElementById('define-btn');
const defineResult = document.getElementById('define-result');

// ── Configured / Edit state ────────────────────────────────────────────────────

function showConfiguredState(provider, model) {
  const p = PROVIDERS[provider];
  bannerProvider.textContent = p ? p.name : provider;
  bannerModel.textContent    = model || '—';
  configuredBanner.style.display = '';
  settingsForm.style.display     = 'none';
}

function showEditState() {
  configuredBanner.style.display = 'none';
  settingsForm.style.display     = '';
}

updateBtn.addEventListener('click', showEditState);

// ── Combobox state ─────────────────────────────────────────────────────────────
let currentModels = [];
let activeIndex   = -1;

function openDropdown(filter) {
  const q       = (filter || '').toLowerCase();
  const matches = currentModels.filter(m =>
    m.id.toLowerCase().includes(q) || m.name.toLowerCase().includes(q)
  );

  modelDropdown.innerHTML = '';
  activeIndex = -1;

  if (matches.length === 0) {
    const empty = document.createElement('div');
    empty.className   = 'combobox-empty';
    empty.textContent = 'No presets match — your input will be used as-is.';
    modelDropdown.appendChild(empty);
  } else {
    matches.forEach(m => {
      const opt = document.createElement('div');
      opt.className    = 'combobox-option';
      opt.dataset.value = m.id;
      opt.innerHTML =
        `<div class="combobox-option-name">${m.name}</div>` +
        `<div class="combobox-option-id">${m.id}</div>`;
      opt.addEventListener('mousedown', e => { e.preventDefault(); pickModel(m.id); });
      modelDropdown.appendChild(opt);
    });
  }
  modelDropdown.hidden = false;
}

function closeDropdown() { modelDropdown.hidden = true; activeIndex = -1; }

function pickModel(id) { modelInput.value = id; closeDropdown(); }

function highlightOption(newIndex) {
  const opts = modelDropdown.querySelectorAll('.combobox-option');
  opts.forEach((o, i) => o.classList.toggle('active', i === newIndex));
  activeIndex = newIndex;
  if (newIndex >= 0 && opts[newIndex]) opts[newIndex].scrollIntoView({ block: 'nearest' });
}

modelInput.addEventListener('focus', () => openDropdown(modelInput.value));
modelInput.addEventListener('input', () => openDropdown(modelInput.value));
modelInput.addEventListener('blur',  () => setTimeout(closeDropdown, 150));
modelInput.addEventListener('keydown', e => {
  if (modelDropdown.hidden) { if (e.key === 'ArrowDown') openDropdown(modelInput.value); return; }
  const opts = modelDropdown.querySelectorAll('.combobox-option');
  if      (e.key === 'ArrowDown')                              { e.preventDefault(); highlightOption(Math.min(activeIndex + 1, opts.length - 1)); }
  else if (e.key === 'ArrowUp')                                { e.preventDefault(); highlightOption(Math.max(activeIndex - 1, 0)); }
  else if (e.key === 'Enter' && activeIndex >= 0 && opts[activeIndex]) { e.preventDefault(); pickModel(opts[activeIndex].dataset.value); }
  else if (e.key === 'Escape')                                 { closeDropdown(); }
});

// ── Populate provider dropdown ─────────────────────────────────────────────────
Object.entries(PROVIDERS).forEach(([id, p]) => {
  const opt = document.createElement('option');
  opt.value       = id;
  opt.textContent = p.name;
  providerSelect.appendChild(opt);
});

// ── Apply provider ─────────────────────────────────────────────────────────────
let openrouterFetched = false;

function applyProvider(providerId, keepModel) {
  const p = PROVIDERS[providerId];
  if (!p) return;
  currentModels = p.models;
  if (!keepModel) modelInput.value = p.models[0]?.id || '';
  apiInput.placeholder = p.placeholder;
  keyLink.textContent  = p.keyLabel;
  keyLink.href         = p.keyUrl;
  refreshModelsBtn.style.display = '';
  if (providerId === 'openrouter' && !openrouterFetched) {
    openrouterFetched = true;
    fetchModelsForProvider();
  }
}

providerSelect.addEventListener('change', () => applyProvider(providerSelect.value, false));

// ── Live OpenRouter model fetch ────────────────────────────────────────────────
const TEXT_MODEL_SKIP = /lyria|whisper|tts|image|vision|embed|rerank|moderat/i;

async function fetchModelsForProvider() {
  const providerId = providerSelect.value;
  let key = apiInput.value.trim();

  if (!key && providerId !== 'openrouter') {
    const r = await new Promise(resolve => chrome.storage.sync.get(['apiKey', 'provider'], resolve));
    if (r.provider === providerId && r.apiKey) {
      key = r.apiKey;
    } else {
      statusEl.textContent = 'Please enter an API key first to fetch models.';
      statusEl.className   = 'status error';
      setTimeout(() => statusEl.textContent = '', 3000);
      return;
    }
  }

  refreshModelsBtn.textContent = '↻ loading…';
  refreshModelsBtn.disabled    = true;

  try {
    let fetchedModels = [];

    if (providerId === 'openrouter') {
      const res  = await fetch('https://openrouter.ai/api/v1/models');
      const data = await res.json();
      fetchedModels = (data.data || [])
        .filter(m => !TEXT_MODEL_SKIP.test(m.id) && !TEXT_MODEL_SKIP.test(m.name || ''))
        .map(m => {
          let name = m.name || m.id;
          const p = m.pricing || {};
          const isFree = String(p.prompt) === '0' && String(p.completion) === '0';
          if (isFree && !name.toLowerCase().includes('free')) {
              name = name + ' (Free)';
          }
          return { id: m.id, name: name };
        });
    } else if (providerId === 'openai') {
      const res = await fetch('https://api.openai.com/v1/models', {
        headers: { 'Authorization': `Bearer ${key}` }
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      fetchedModels = (data.data || [])
        .filter(m => !TEXT_MODEL_SKIP.test(m.id))
        .map(m => ({ id: m.id, name: m.id }));
    } else if (providerId === 'anthropic') {
      const res = await fetch('https://api.anthropic.com/v1/models', {
        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01' }
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      fetchedModels = (data.data || [])
        .filter(m => m.type === 'model')
        .map(m => ({ id: m.id, name: m.display_name || m.id }));
    } else if (providerId === 'groq') {
      const res = await fetch('https://api.groq.com/openai/v1/models', {
        headers: { 'Authorization': `Bearer ${key}` }
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      fetchedModels = (data.data || [])
        .map(m => ({ id: m.id, name: m.id }));
    } else if (providerId === 'gemini') {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      fetchedModels = (data.models || [])
        .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
        .map(m => {
           const id = m.name.replace('models/', '');
           return { id, name: m.displayName || id };
        });
    }

    if (fetchedModels.length > 0) {
      fetchedModels.sort((a, b) => a.id.localeCompare(b.id));
      PROVIDERS[providerId].models = fetchedModels;
      if (providerSelect.value === providerId) {
        currentModels = fetchedModels;
      }
      refreshModelsBtn.textContent = `↻ ${fetchedModels.length} models`;
      refreshModelsBtn.style.color = '#34d399';
      setTimeout(() => { refreshModelsBtn.textContent = '↻ refresh'; refreshModelsBtn.style.color = ''; }, 2500);
    } else {
      throw new Error('No models found');
    }
  } catch (err) {
    console.error(err);
    refreshModelsBtn.textContent = '↻ failed';
    refreshModelsBtn.style.color = '#f87171';
    statusEl.textContent = 'Failed to fetch models. Check API key or network.';
    statusEl.className   = 'status error';
    setTimeout(() => { 
      refreshModelsBtn.textContent = '↻ refresh'; 
      refreshModelsBtn.style.color = ''; 
      statusEl.textContent = '';
      statusEl.className = 'status';
    }, 2500);
  } finally {
    refreshModelsBtn.disabled = false;
  }
}

refreshModelsBtn.addEventListener('click', fetchModelsForProvider);

// ── Toggle API key visibility ──────────────────────────────────────────────────
toggleBtn.addEventListener('click', () => {
  const hidden = apiInput.type === 'password';
  apiInput.type         = hidden ? 'text' : 'password';
  toggleBtn.textContent = hidden ? '🙈' : '👁';
});

// ── Load saved settings ────────────────────────────────────────────────────────
chrome.storage.sync.get(['apiKey', 'provider', 'model', 'customModel'], r => {
  const savedProvider = r.provider || 'openrouter';
  providerSelect.value = savedProvider;
  applyProvider(savedProvider, true);

  const savedModel = r.customModel || r.model || PROVIDERS[savedProvider]?.models[0]?.id || '';
  modelInput.value = savedModel;

  if (r.apiKey) {
    showConfiguredState(savedProvider, savedModel);
  } else {
    showEditState();
  }
});

// ── Save settings ──────────────────────────────────────────────────────────────
saveBtn.addEventListener('click', () => {
  const key      = apiInput.value.trim();
  const provider = providerSelect.value;
  const model    = modelInput.value.trim();

  if (!key) {
    statusEl.textContent = 'Please enter an API key.';
    statusEl.className   = 'status error';
    return;
  }
  if (key.length < 10) {
    statusEl.textContent = 'That key looks too short — please check it.';
    statusEl.className   = 'status error';
    return;
  }
  if (!model) {
    statusEl.textContent = 'Please select or enter a model.';
    statusEl.className   = 'status error';
    return;
  }

  chrome.storage.sync.set({ apiKey: key, provider, model, customModel: '' }, () => {
    apiInput.value        = '';
    apiInput.type         = 'password';
    toggleBtn.textContent = '👁';
    statusEl.textContent  = '';

    showConfiguredState(provider, model);
  });
});

// ── Quick Define ───────────────────────────────────────────────────────────────
function setDefineResult(html) {
  defineResult.innerHTML     = html;
  defineResult.style.display = '';
}

function runDefine() {
  const word = defineInput.value.trim();
  if (!word || word.length < 2) return;

  defineBtn.disabled = true;
  setDefineResult('<div class="dr-loading">Looking up definition…</div>');

  chrome.runtime.sendMessage({ type: 'DEFINE', word }, response => {
    defineBtn.disabled = false;

    if (chrome.runtime.lastError || !response) {
      setDefineResult('<div class="dr-error">⚠ Could not reach the extension. Try reloading.</div>');
      return;
    }
    if (response.error === 'NO_KEY') {
      setDefineResult('<div class="dr-error">⚠ No API key saved. Fill in your settings above first.</div>');
      return;
    }
    if (response.error) {
      setDefineResult(`<div class="dr-error">⚠ ${response.error}</div>`);
      return;
    }

    const d = response.result;
    const type    = document.createElement('div'); type.className = 'dr-type';       type.textContent = d.type || 'word';
    const def     = document.createElement('div'); def.className  = 'dr-definition'; def.textContent  = d.definition;

    defineResult.innerHTML     = '';
    defineResult.style.display = '';
    defineResult.appendChild(type);
    defineResult.appendChild(def);

    if (d.example) {
      const ex = document.createElement('div'); ex.className = 'dr-example'; ex.textContent = `"${d.example}"`;
      defineResult.appendChild(ex);
    }
    if (d.note && d.note !== 'null') {
      const nt = document.createElement('div'); nt.className = 'dr-note'; nt.textContent = d.note;
      defineResult.appendChild(nt);
    }
  });
}

defineBtn.addEventListener('click', runDefine);
defineInput.addEventListener('keydown', e => { if (e.key === 'Enter') runDefine(); });
