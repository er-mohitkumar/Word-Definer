(() => {
  // Skip sub-frames that are not PDF documents — avoids running in ad iframes etc.
  const isPdfPage = document.contentType === 'application/pdf'
    || /\.pdf(\?|#|$)/i.test(location.href);
  if (window !== window.top && !isPdfPage) return;

  let popup = null;
  let popupWord = '';
  let hideTimer = null;

  // Trigger chip — shown on selection; LLM is only called when user clicks it.
  let trigger = null;
  let triggerWord = '';
  let triggerTimer = null;

  let isDragging = false; // true while user drags the definition popup

  // Track mouse so we have a fallback position for PDF selections (no DOM rect)
  let lastMouseX = window.innerWidth / 2;
  let lastMouseY = 100;
  document.addEventListener('mousemove', e => {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  }, { passive: true });

  // ── Popup lifecycle ────────────────────────────────────────────────────────────

  function replacePopup() {
    if (!popup) return;
    const dying = popup;
    popup = null;
    dying.classList.add('wd-fade-out');
    setTimeout(() => dying.remove(), 200);
  }

  function removePopup() {
    popupWord = '';
    replacePopup();
  }

  // Called only on explicit user action (trigger click or context menu).
  function showDefinition(text, x, y) {
    if (text === popupWord && popup) return;
    popupWord = text;
    replacePopup();

    popup = document.createElement('div');
    popup.className = 'wd-popup';
    popup.innerHTML = `
      <div class="wd-header">
        <span class="wd-word"></span>
        <button class="wd-close" title="Close">✕</button>
      </div>
      <div class="wd-body">
        <div class="wd-loading">
          <span class="wd-spinner"></span>
          <span>Looking up definition…</span>
        </div>
      </div>
    `;

    popup.querySelector('.wd-word').textContent = `"${text}"`;
    popup.querySelector('.wd-close').addEventListener('click', removePopup);
    popup.addEventListener('mouseenter', () => clearTimeout(hideTimer));
    popup.addEventListener('mouseleave', () => {
      if (!isDragging) hideTimer = setTimeout(removePopup, 1200);
    });

    document.body.appendChild(popup);

    const pw = popup.offsetWidth || 320;
    const ph = popup.offsetHeight || 160;
    let left = x - pw / 2;
    let top = y - ph - 14;

    left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
    if (top < 8) top = y + 22;
    top = Math.max(8, top);

    popup.style.left = (left + window.scrollX) + 'px';
    popup.style.top = (top + window.scrollY) + 'px';

    fetchDefinition(text, popup);
    makeDraggable(popup);
  }

  // ── Drag-to-move ───────────────────────────────────────────────────────────────

  function makeDraggable(el) {
    const handle = el.querySelector('.wd-header');
    if (!handle) return;

    handle.addEventListener('mousedown', e => {
      if (e.button !== 0) return;
      if (e.target.closest('.wd-close')) return; // don't drag when clicking close

      e.preventDefault();
      isDragging = true;
      clearTimeout(hideTimer);

      const startX = e.clientX;
      const startY = e.clientY;
      const startLeft = parseInt(el.style.left) || 0;
      const startTop = parseInt(el.style.top) || 0;

      el.classList.add('wd-dragging');

      function onMove(e) {
        const newLeft = Math.max(8,
          Math.min(startLeft + e.clientX - startX, window.innerWidth - el.offsetWidth - 8 + window.scrollX));
        const newTop = Math.max(8,
          Math.min(startTop + e.clientY - startY, window.innerHeight - el.offsetHeight - 8 + window.scrollY));
        el.style.left = newLeft + 'px';
        el.style.top = newTop + 'px';
      }

      function onUp() {
        isDragging = false;
        el.classList.remove('wd-dragging');
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      }

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  }

  // ── Trigger chip lifecycle ─────────────────────────────────────────────────────

  function removeTrigger() {
    clearTimeout(triggerTimer);
    triggerWord = '';
    if (!trigger) return;
    const dying = trigger;
    trigger = null;
    dying.classList.add('wd-fade-out');
    setTimeout(() => dying.remove(), 200);
  }

  function showTrigger(text, x, y) {
    if (text === triggerWord && trigger) return;
    removeTrigger();

    triggerWord = text;

    trigger = document.createElement('div');
    trigger.className = 'wd-trigger';

    const label = text.length > 28 ? text.slice(0, 28) + '…' : text;
    trigger.innerHTML = `<span class="wd-trigger-label">Define "<strong>${label}</strong>"</span>`;

    trigger.addEventListener('click', e => {
      e.stopPropagation();
      removeTrigger();
      showDefinition(text, x, y);
    });

    // Pause auto-dismiss while hovering so user can read the label
    trigger.addEventListener('mouseenter', () => clearTimeout(triggerTimer));
    trigger.addEventListener('mouseleave', () => {
      triggerTimer = setTimeout(removeTrigger, 2000);
    });

    document.body.appendChild(trigger);

    const tw = trigger.offsetWidth || 180;
    const th = trigger.offsetHeight || 32;
    let left = x - tw / 2;
    let top = y - th - 8;

    left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
    if (top < 8) top = y + 16;
    top = Math.max(8, top);

    trigger.style.left = (left + window.scrollX) + 'px';
    trigger.style.top = (top + window.scrollY) + 'px';

    // Auto-dismiss after 5 seconds if user ignores it
    triggerTimer = setTimeout(removeTrigger, 5000);
  }

  // ── AI fetch ───────────────────────────────────────────────────────────────────

  function fetchDefinition(word, targetPopup) {
    const body = targetPopup.querySelector('.wd-body');

    if (!chrome.runtime?.id) {
      body.innerHTML = `<div class="wd-error">⚠ Extension was updated. Please reload this page.</div>`;
      return;
    }

    try {
      chrome.runtime.sendMessage({ type: 'DEFINE', word }, (response) => {
        if (targetPopup !== popup) return; // stale popup — a newer one took over

        if (chrome.runtime.lastError) {
          const msg = chrome.runtime.lastError.message || '';
          if (msg.includes('invalidated') || msg.includes('context')) {
            body.innerHTML = `<div class="wd-error">⚠ Extension was reloaded. Please refresh the page.</div>`;
          } else {
            body.innerHTML = `<div class="wd-error">⚠ Extension error. Try reloading the page.</div>`;
          }
          return;
        }

        if (!response) {
          body.innerHTML = `<div class="wd-error">⚠ No response from extension.</div>`;
          return;
        }

        if (response.error === 'NO_KEY') {
          body.innerHTML = `<div class="wd-error"><strong>API key not set.</strong><br>Click the extension icon to configure your AI provider and key.</div>`;
          return;
        }

        if (response.error) {
          body.innerHTML = `<div class="wd-error">⚠ ${response.error}</div>`;
          return;
        }

        const def = response.result;
        body.innerHTML = `
          <div class="wd-type">${def.type || 'word'}</div>
          <div class="wd-definition">${def.definition}</div>
          ${def.example ? `<div class="wd-example">"${def.example}"</div>` : ''}
          ${def.note && def.note !== 'null' ? `<div class="wd-note">${def.note}</div>` : ''}
        `;
      });
    } catch {
      body.innerHTML = `<div class="wd-error">⚠ Extension was reloaded. Please refresh this page.</div>`;
    }
  }

  // ── Selection helpers ──────────────────────────────────────────────────────────

  function getSelectionInfo() {
    const sel = window.getSelection();
    const text = sel?.toString().trim();
    if (!text || text.length < 2 || text.length > 120) return null;
    if (!sel.rangeCount) return null;
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    // Fall back to last mouse position when rect is unavailable (e.g. PDF viewers)
    const x = (rect.width || rect.height) ? rect.left + rect.width / 2 : lastMouseX;
    const y = (rect.width || rect.height) ? rect.top : lastMouseY;
    return { text, x, y };
  }

  function isInEditable() {
    const el = document.activeElement;
    return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
  }

  // ── Event listeners ────────────────────────────────────────────────────────────

  let mouseupTimer = null;
  let scTimer = null;

  // Primary: mouseup — works for all regular web pages
  document.addEventListener('mouseup', e => {
    if (popup && popup.contains(e.target)) return;
    if (trigger && trigger.contains(e.target)) return;
    clearTimeout(mouseupTimer);
    mouseupTimer = setTimeout(() => {
      const info = getSelectionInfo();
      if (info) showTrigger(info.text, info.x, info.y);
    }, 300);
  });

  // Backup: selectionchange — catches PDF viewers and keyboard-driven selection.
  // The 700 ms delay + triggerWord guard ensure this never double-triggers after mouseup.
  document.addEventListener('selectionchange', () => {
    clearTimeout(scTimer);
    scTimer = setTimeout(() => {
      if (isInEditable()) return;
      const info = getSelectionInfo();
      if (info && info.text !== triggerWord) showTrigger(info.text, info.x, info.y);
    }, 700);
  });

  // PDF copy fallback: Brave/Chrome's PDF plugin doesn't expose mouseup or
  // selectionchange to the outer document, but the copy event does reach us.
  // Flow: select text in PDF → Ctrl+C → trigger chip appears.
  document.addEventListener('copy', e => {
    if (!isPdfPage) return;
    const text = (e.clipboardData?.getData('text/plain') || '').trim();
    if (text && text.length >= 2 && text.length <= 120 && text !== triggerWord) {
      showTrigger(text, lastMouseX, lastMouseY);
    }
  });

  // Context-menu "Define …" is explicit user intent — skip the trigger chip.
  chrome.runtime.onMessage.addListener(msg => {
    if (msg.type === 'DEFINE_FROM_MENU' && msg.word) {
      showDefinition(msg.word, lastMouseX, lastMouseY);
    }
  });

  document.addEventListener('mousedown', e => {
    if (trigger && !trigger.contains(e.target)) removeTrigger();
    if (popup && !popup.contains(e.target)) {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(removePopup, 100);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { removeTrigger(); removePopup(); }
  });
})();
