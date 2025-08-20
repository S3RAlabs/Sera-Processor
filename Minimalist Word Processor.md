# Minimalist Word Processor

A clean, distraction-free word processor built with Electron, featuring a Silicon Valley-inspired aesthetic.

## Features

- **Minimalist Design**: Clean, uncluttered interface focused on writing
- **Silicon Valley Aesthetic**: Modern, flat design with thoughtful typography
- **Essential Formatting**: Bold, italic, and underline text formatting
- **File Operations**: Create, open, and save text files
- **Live Statistics**: Real-time word count and cursor position
- **Keyboard Shortcuts**: Standard shortcuts for formatting and file operations
- **Cross-Platform**: Works on Windows, macOS, and Linux

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Quick Start

1. **Extract the files** to your desired directory
2. **Open terminal/command prompt** in the project directory
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the application**:
   ```bash
   npm start
   ```

## Usage

### Basic Operations

- **New File**: `Ctrl+N` (or `Cmd+N` on macOS)
- **Open File**: `Ctrl+O` (or `Cmd+O` on macOS)
- **Save File**: `Ctrl+S` (or `Cmd+S` on macOS)
- **Save As**: `Ctrl+Shift+S` (or `Cmd+Shift+S` on macOS)

### Text Formatting

- **Bold**: `Ctrl+B` (or `Cmd+B` on macOS) or click the **B** button
- **Italic**: `Ctrl+I` (or `Cmd+I` on macOS) or click the *I* button
- **Underline**: `Ctrl+U` (or `Cmd+U` on macOS) or click the U button

### Interface Elements

- **Document Title**: Shows current file name (displays "•" when modified)
- **Format Toolbar**: Central formatting controls with visual feedback
- **Word Count**: Live word count in the top-right corner
- **Status Bar**: Shows save status and cursor position

## File Formats

The word processor supports:
- Plain text files (`.txt`)
- Markdown files (`.md`)
- All file types for opening

Formatted text is saved as plain text with markdown-style formatting indicators.

## Design Philosophy

This word processor embraces the Silicon Valley aesthetic:
- **Minimalism**: Only essential features, no distractions
- **Clean Typography**: System fonts for optimal readability
- **Subtle Interactions**: Smooth transitions and hover effects
- **Focus on Content**: The interface fades into the background

## Technical Details

- Built with Electron for cross-platform compatibility
- Uses native system fonts for consistent appearance
- Responsive design adapts to different window sizes
- Efficient rendering with minimal resource usage

## Troubleshooting

### Application won't start
- Ensure Node.js is installed: `node --version`
- Install dependencies: `npm install`
- Try clearing npm cache: `npm cache clean --force`

### File operations not working
- Check file permissions in the target directory
- Ensure you have write access to the save location

### Formatting buttons not responding
- Click in the text area to focus the editor
- Try using keyboard shortcuts instead

## Development

To modify or extend the application:

1. **Main Process**: Edit `main.js` for window management and system integration
2. **Renderer Process**: Edit files in the `src/` directory:
   - `index.html`: Application structure
   - `styles.css`: Visual styling
   - `renderer.js`: Application logic and interactions

## License

ISC License - Feel free to modify and distribute.

---

*Built with ❤️ for writers who value simplicity and focus.*

