# Word Processor for macOS

A minimalistic word processor designed specifically for macOS with native Silicon Valley aesthetics.

## macOS Features

- **Native macOS Integration**: Proper menu bar, window controls, and system behaviors
- **Dark Mode Support**: Automatically adapts to system dark mode preferences
- **Vibrancy Effects**: Uses macOS blur and transparency effects
- **Traffic Light Positioning**: Proper spacing for macOS window controls
- **Native Typography**: Uses SF Pro fonts for authentic macOS feel
- **Dock Integration**: Proper app icon and dock behavior
- **macOS Shortcuts**: Standard Cmd+key shortcuts throughout

## Installation

### Quick Start (Recommended)
```bash
# Make the run script executable and start
chmod +x run-macos.sh
./run-macos.sh
```

### Manual Installation
```bash
# Install dependencies
npm install

# Start the app
npm start

# Build macOS app (optional)
npm run build-mac
```

## macOS-Specific Features

### Menu Bar
- **App Menu**: Standard macOS app menu with About, Services, Hide, Quit
- **File Menu**: New, Open, Save, Save As with proper ellipsis notation
- **Edit Menu**: Includes Paste and Match Style, Speech submenu
- **Format Menu**: Text formatting options
- **View Menu**: Zoom controls and developer tools
- **Window Menu**: Standard window management

### Keyboard Shortcuts
All shortcuts use the Command (⌘) key as per macOS conventions:
- `⌘N` - New document
- `⌘O` - Open document
- `⌘S` - Save document
- `⌘⇧S` - Save As
- `⌘B` - Bold text
- `⌘I` - Italic text
- `⌘U` - Underline text
- `⌘Q` - Quit application

### Window Behavior
- **Traffic Lights**: Proper positioning and behavior
- **Hide on Close**: App hides instead of quitting when window is closed
- **Dock Integration**: Click dock icon to show hidden window
- **Vibrancy**: Translucent toolbar and status bar with blur effects

## Design Philosophy

This word processor embraces authentic macOS design principles:

- **Native Feel**: Uses system fonts, colors, and behaviors
- **Minimalism**: Clean interface that doesn't distract from writing
- **Accessibility**: Full VoiceOver support and keyboard navigation
- **Responsiveness**: Smooth animations using macOS timing curves

## System Requirements

- macOS 10.14 (Mojave) or later
- Node.js 14.0 or later
- 50MB free disk space

## Building for Distribution

To create a distributable macOS app:

```bash
# Build DMG and ZIP for both Intel and Apple Silicon
npm run build-mac

# Files will be created in the 'dist' folder:
# - Word Processor-1.0.0.dmg
# - Word Processor-1.0.0-mac.zip
```

## Troubleshooting

### "App can't be opened because it is from an unidentified developer"
1. Right-click the app and select "Open"
2. Click "Open" in the security dialog
3. Or go to System Preferences > Security & Privacy and click "Open Anyway"

### App doesn't start
- Ensure you have Node.js installed: `node --version`
- Try: `npm install` then `npm start`
- Check Console.app for error messages

### Menu shortcuts not working
- Ensure the app has focus (click on the window)
- Try using the menu bar instead of keyboard shortcuts

---

*Optimized for macOS with love ❤️*

