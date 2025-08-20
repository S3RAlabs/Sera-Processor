#!/bin/bash

# Word Processor for macOS - Run Script
# Optimized for macOS with native features and behaviors

echo "🍎 Starting Word Processor for macOS..."
echo ""

# Check if we're running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "⚠️  This script is optimized for macOS."
    echo "   For other platforms, use: npm start"
    echo ""
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "   Please install Node.js from: https://nodejs.org/"
    echo "   Or use Homebrew: brew install node"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js $(node --version) and npm $(npm --version) are installed"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies for macOS..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo ""
fi

# Check if we can build for macOS
if command -v electron-builder &> /dev/null; then
    echo "🔧 Electron Builder is available for creating macOS apps"
    echo "   Run 'npm run build-mac' to create a distributable .dmg file"
    echo ""
fi

# Start the application
echo "🚀 Launching Word Processor..."
echo "   • Native macOS menus and shortcuts"
echo "   • Dark mode support"
echo "   • Vibrancy effects"
echo "   • Traffic light window controls"
echo ""

npm start

