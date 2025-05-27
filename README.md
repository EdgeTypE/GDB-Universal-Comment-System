# GDB Universal Comment System

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/bbgiegnpfhcgpkojnmgnofkiophiacgl.svg)](https://chromewebstore.google.com/detail/gdb-universal-comment-sys/bbgiegnpfhcgpkojnmgnofkiophiacgl)
[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/bbgiegnpfhcgpkojnmgnofkiophiacgl.svg)](https://chromewebstore.google.com/detail/gdb-universal-comment-sys/bbgiegnpfhcgpkojnmgnofkiophiacgl)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> 🌐 Transform the entire web into an interactive social platform

GDB Universal Comment System is a Chrome extension that revolutionizes your browsing experience by allowing you to comment on any webpage across the internet. Share your thoughts, engage in discussions, and connect with other users viewing the same content.

## 🚀 Features

### Core Functionality
- **📝 Universal Comments**: Comment on any webpage without requiring website owner permissions
- **👥 Community Engagement**: See what others are saying about the content you're viewing
- **🌍 Global Community**: Participate in a worldwide community of web users
- **🎨 Non-Intrusive Design**: Simple, intuitive interface that doesn't interfere with your browsing

### Technical Features
- **🌐 Multi-language Support**: Available in English, German, and Turkish
- **⚡ Fast Performance**: Built with Svelte for optimal performance
- **🌙 Theme Support**: Light and dark theme options

## 🛠️ Installation

### From Chrome Web Store (Recommended)
1. Visit the [Chrome Web Store page](https://chromewebstore.google.com/detail/gdb-universal-comment-sys/bbgiegnpfhcgpkojnmgnofkiophiacgl)
2. Click "Add to Chrome"
3. Confirm the installation
4. The extension icon will appear in your browser toolbar

### Manual Installation (Development)
1. Clone this repository:
   ```bash
   git clone https://github.com/EdgeTypE/GDB-Universal-Comment-System.git
   cd GDB-Universal-Comment-System
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

## 🎯 How to Use

1. **Navigate to any webpage** you want to comment on
2. **Click the extension icon** in your browser toolbar
3. **View existing comments** from other users or be the first to comment
4. **Write your comment** using the intuitive comment form
5. **Engage with others** by replying to existing comments
6. **Switch languages** using the language selector if needed

## 🏗️ Built With

- **[Svelte](https://svelte.dev/)** - Reactive frontend framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[DaisyUI](https://daisyui.com/)** - Component library for Tailwind CSS
- **[Vite](https://vitejs.dev/)** - Fast build tool
- **[Chrome Extension API](https://developer.chrome.com/docs/extensions/)** - Browser extension platform

## 🔧 Development

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup Development Environment

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/GDB-Universal-Comment-System.git
   cd GDB-Universal-Comment-System
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Type checking**:
   ```bash
   npm run check
   ```

### Project Structure

```
src/
├── manifest.json          # Extension manifest
├── popup/                 # Extension popup interface
│   ├── index.html
│   ├── main.ts
│   ├── Popup.svelte
│   └── styles.css
└── lib/
    ├── components/        # Svelte components
    │   ├── CommentForm.svelte
    │   ├── CommentItem.svelte
    │   ├── CommentList.svelte
    │   ├── Footer.svelte
    │   ├── LanguageSelector.svelte
    │   └── ThemeToggle.svelte
    ├── i18n/              # Localization
    │   ├── en.json
    │   ├── de.json
    │   ├── tr.json
    │   └── index.ts
    ├── services/          # API services
    │   └── api.ts
    ├── stores/            # Svelte stores
    │   └── theme.ts
    ├── types/             # TypeScript definitions
    │   └── index.ts
    └── utils/             # Utility functions
        └── date.ts
```

## 🌐 Backend Integration

This extension integrates with the [easyCommentSystem](https://github.com/EdgeTypE/easyCommentSystem) backend.
## 🌍 Localization

The extension supports multiple languages:

- **🇺🇸 English** (en)
- **🇩🇪 German** (de) 
- **🇹🇷 Turkish** (tr)

To add a new language:
1. Create a new JSON file in `src/lib/i18n/`
2. Add the language code to the language selector component
3. Update the i18n index file


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🔗 Links

- **[Chrome Web Store](https://chromewebstore.google.com/detail/gdb-universal-comment-sys/bbgiegnpfhcgpkojnmgnofkiophiacgl)** - Install the extension
- **[Backend Repository](https://github.com/EdgeTypE/easyCommentSystem)** - Comment system backend
- **[Homepage](https://dash.goygoyengine.com)** - Official website

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please:
1. Check if the issue already exists in our [Issues](https://github.com/EdgeTypE/GDB-Universal-Comment-System/issues)
2. If not, create a new issue with detailed information

---

<div align="center">
  <strong>Transform every webpage into a collaborative space! 🚀</strong>
  <br><br>
  <a href="https://chromewebstore.google.com/detail/gdb-universal-comment-sys/bbgiegnpfhcgpkojnmgnofkiophiacgl">
    <img src="https://cdn.goygoyengine.com/images/1748245557955-6f074a2fa4f6f531.png" alt="Available in the Chrome Web Store" height="58">
  </a>
</div>