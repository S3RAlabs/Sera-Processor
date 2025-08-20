# 🍎 macOS Word Processor - Quick Start

## Minimalist Word Processor - macOS Edition

### What's New for macOS
- **Native macOS Integration**: Proper menu bar, window controls, and behaviors
- **Dark Mode Support**: Automatically adapts to your system theme
- **Vibrancy Effects**: Beautiful blur and transparency effects
- **SF Pro Fonts**: Uses Apple's system fonts for authentic feel
- **Traffic Light Controls**: Proper macOS window button positioning
- **Dock Integration**: Native app icon and dock behavior

### Super Quick Setup

#### Option 1: One-Command Start (Recommended)
```bash
# Extract files, navigate to folder, then:
chmod +x run-macos.sh && ./run-macos.sh
```

#### Option 2: Manual Setup
```bash
# Extract files and navigate to folder
cd word-processor

# Install dependencies
npm install

# Start the app
npm start
```

### macOS-Specific Features

#### Native Menu Bar
- **⌘N** - New document
- **⌘O** - Open document  
- **⌘S** - Save document
- **⌘⇧S** - Save As
- **⌘B** - Bold text
- **⌘I** - Italic text
- **⌘U** - Underline text

#### Window Behavior
- **Hide on Close**: App hides when you close the window (like native macOS apps)
- **Dock Click**: Click the dock icon to bring the app back
- **Traffic Lights**: Proper red/yellow/green button positioning
- **Vibrancy**: Translucent toolbar with system blur effects

#### Dark Mode
The app automatically switches between light and dark themes based on your macOS system preference.

### Building a Distributable App

Want to create a proper macOS .app file?

```bash
# Build DMG installer and ZIP archive
npm run build-mac

# Creates files in 'dist' folder:
# - Word Processor-1.0.0.dmg (installer)
# - Word Processor-1.0.0-mac.zip (portable)
```

### System Requirements
- **macOS**: 10.14 (Mojave) or later
- **Node.js**: 14.0 or later
- **Disk Space**: 50MB

### Troubleshooting

**"App can't be opened" security warning:**
1. Right-click the app → "Open"
2. Click "Open" in the dialog
3. Or: System Preferences → Security & Privacy → "Open Anyway"

**App won't start:**
- Check Node.js: `node --version`
- Reinstall: `npm install`
- Check Console.app for errors

---

*Designed with ❤️ for macOS users who love clean, focused writing.*

