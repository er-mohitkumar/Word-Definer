# 📖 Word Definer — AI-Powered Instant Definitions

> Select any word or phrase on any webpage and get an instant, beautifully formatted AI definition — right where you're reading.

---

## ✨ Features

- **Instant popup** — select any word or phrase and a definition appears automatically
- **PDF support** — works in PDF files via right-click → *Define "…"*
- **Quick Define panel** — type or paste any text directly in the extension popup
- **Multi-provider AI** — choose from 5 AI providers including free options
- **Context-menu trigger** — right-click selected text to define from anywhere
- **Keyboard shortcut** — press `Escape` to dismiss the popup
- **Privacy-first** — API keys are stored locally in your browser, never sent anywhere else
- **Works everywhere** — all URLs including `file://` pages and PDFs

---

## 🤖 Supported AI Providers

| Provider | Free Tier | Get API Key |
|---|---|---|
| **OpenRouter** | ✅ Free models available | [openrouter.ai/keys](https://openrouter.ai/keys) |
| **Groq** | ✅ Free tier | [console.groq.com/keys](https://console.groq.com/keys) |
| **Google Gemini** | ✅ Free tier | [aistudio.google.com](https://aistudio.google.com/app/apikey) |
| **OpenAI** | Paid | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| **Anthropic (Claude)** | Paid | [console.anthropic.com/keys](https://console.anthropic.com/keys) |

> **Tip:** Start free with **OpenRouter** (default model: `deepseek/deepseek-r1:free`) or **Groq** — no credit card required.

---

## 🚀 How to Install in Chrome

Because this extension is not on the Chrome Web Store, you need to load it manually as an **unpacked extension**. It takes less than a minute.

### Step 1 — Download the project

Clone or download this repository to your computer:

```bash
git clone https://github.com/your-username/word-definer-gemini.git
```

Or download the ZIP from GitHub and extract it to a folder.

### Step 2 — Open Chrome Extensions page

1. Open **Google Chrome**
2. In the address bar, type:
   ```
   chrome://extensions
   ```
   and press **Enter**

### Step 3 — Enable Developer Mode

In the top-right corner of the Extensions page, toggle **Developer mode** ON.

![Developer Mode toggle in top-right corner]

### Step 4 — Load the extension

1. Click the **"Load unpacked"** button that appears on the top-left
2. In the file picker, navigate to and select the project folder (the one containing `manifest.json`)
3. Click **Select Folder** (or **Open**)

The **Word Definer** extension will now appear in your extensions list with the 📖 icon.

### Step 5 — Pin the extension (optional but recommended)

1. Click the **puzzle piece icon** (🧩) in the Chrome toolbar
2. Find **Word Definer** and click the **pin icon** 📌

The 📖 icon will now be visible in your toolbar for quick access to settings.

---

## ⚙️ Configuration

Before using the extension, you need to set up your AI provider:

1. Click the **📖 Word Definer icon** in the Chrome toolbar
2. Select your preferred **AI Provider** from the dropdown
3. Choose a **Model** (or type a custom model ID)
4. Paste your **API Key**
5. Click **Save Settings**

You only need to do this once — settings are saved in your browser's local storage.

---

## 🎯 How to Use

### On any webpage
Simply **highlight / select any text** with your mouse. A definition popup appears automatically above the selection.

### On PDF files
PDFs don't support automatic popup. Instead:
1. Select text in the PDF
2. **Right-click** the selection
3. Click **Define "your word"** from the context menu

### Quick Define
Click the extension icon and use the **Quick Define** input box at the bottom to type or paste any word or phrase on demand.

### Keyboard shortcut
Press **`Escape`** to close any open definition popup.

---

## 📁 Project Structure

```
word-definer-gemini/
├── manifest.json       # Chrome extension manifest (MV3)
├── background.js       # Service worker — handles AI API calls
├── content.js          # Content script — injects popup into web pages
├── popup.css           # Styles for the definition popup
├── settings.html       # Extension popup UI (provider & key settings)
├── settings.js         # Settings UI logic & Quick Define feature
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## 🛠️ How It Works

```
User selects text on page
        │
        ▼
content.js detects selection
        │
        ▼
Sends DEFINE message to background.js
        │
        ▼
background.js reads saved provider + API key
        │
        ▼
Calls AI provider API (Gemini / OpenAI / Claude / Groq / OpenRouter)
        │
        ▼
Parses JSON response { type, definition, example, note }
        │
        ▼
content.js renders beautiful popup on the page
```

---

## 🔒 Privacy

- Your API key is stored using `chrome.storage.sync` — **local to your browser**
- No data is collected or logged by this extension
- Definitions are fetched directly from the AI provider's API — no middleman server

---

## 🧩 Compatibility

| Browser | Support |
|---|---|
| Google Chrome | ✅ Full support |
| Microsoft Edge | ✅ Full support (Chromium-based) |
| Brave | ✅ Full support |
| Firefox | ❌ Not supported (uses Manifest V3) |

---

## 📄 License

MIT License — free to use, modify, and distribute.
