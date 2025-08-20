const { ipcRenderer } = require('electron');

class WordProcessor {
    constructor() {
        this.editor = document.getElementById('editor');
        this.documentTitle = document.getElementById('documentTitle');
        this.wordCount = document.getElementById('wordCount');
        this.saveStatus = document.getElementById('saveStatus');
        this.cursorPosition = document.getElementById('cursorPosition');
        
        this.boldBtn = document.getElementById('boldBtn');
        this.italicBtn = document.getElementById('italicBtn');
        this.underlineBtn = document.getElementById('underlineBtn');
        
        this.currentFilePath = null;
        this.isModified = false;
        this.lastSavedContent = '';
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupMenuHandlers();
        this.updateWordCount();
        this.updateCursorPosition();
        this.lastSavedContent = this.editor.innerHTML;
    }
    
    setupEventListeners() {
        // Editor events
        this.editor.addEventListener('input', () => {
            this.handleContentChange();
        });
        
        this.editor.addEventListener('keydown', (e) => {
            this.handleKeydown(e);
        });
        
        this.editor.addEventListener('keyup', () => {
            this.updateCursorPosition();
        });
        
        this.editor.addEventListener('click', () => {
            this.updateCursorPosition();
            this.updateFormatButtons();
        });
        
        this.editor.addEventListener('selectionchange', () => {
            this.updateFormatButtons();
        });
        
        // Format button events
        this.boldBtn.addEventListener('click', () => this.toggleFormat('bold'));
        this.italicBtn.addEventListener('click', () => this.toggleFormat('italic'));
        this.underlineBtn.addEventListener('click', () => this.toggleFormat('underline'));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key.toLowerCase()) {
                    case 'b':
                        e.preventDefault();
                        this.toggleFormat('bold');
                        break;
                    case 'i':
                        e.preventDefault();
                        this.toggleFormat('italic');
                        break;
                    case 'u':
                        e.preventDefault();
                        this.toggleFormat('underline');
                        break;
                }
            }
        });
    }
    
    setupMenuHandlers() {
        // Handle menu events from main process
        ipcRenderer.on('menu-new-file', () => {
            this.newFile();
        });
        
        ipcRenderer.on('menu-open-file', (event, { filePath, content }) => {
            this.openFile(filePath, content);
        });
        
        ipcRenderer.on('menu-save-file', () => {
            this.saveFile();
        });
        
        ipcRenderer.on('menu-save-as-file', () => {
            this.saveAsFile();
        });
        
        ipcRenderer.on('menu-format', (event, command) => {
            this.toggleFormat(command);
        });
    }
    
    handleContentChange() {
        this.isModified = this.editor.innerHTML !== this.lastSavedContent;
        this.updateWordCount();
        this.updateSaveStatus();
        this.updateDocumentTitle();
    }
    
    handleKeydown(e) {
        // Handle tab key for indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            document.execCommand('insertText', false, '    ');
        }
    }
    
    toggleFormat(command) {
        document.execCommand(command, false, null);
        this.editor.focus();
        this.updateFormatButtons();
        this.handleContentChange();
    }
    
    updateFormatButtons() {
        this.boldBtn.classList.toggle('active', document.queryCommandState('bold'));
        this.italicBtn.classList.toggle('active', document.queryCommandState('italic'));
        this.underlineBtn.classList.toggle('active', document.queryCommandState('underline'));
    }
    
    updateWordCount() {
        const text = this.editor.innerText || '';
        const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
        this.wordCount.textContent = `${words} word${words !== 1 ? 's' : ''}`;
    }
    
    updateCursorPosition() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(this.editor);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            
            const textBeforeCaret = preCaretRange.toString();
            const lines = textBeforeCaret.split('\\n');
            const lineNumber = lines.length;
            const columnNumber = lines[lines.length - 1].length + 1;
            
            this.cursorPosition.textContent = `Line ${lineNumber}, Column ${columnNumber}`;
        }
    }
    
    updateSaveStatus() {
        if (this.isModified) {
            this.saveStatus.textContent = 'Modified';
        } else {
            this.saveStatus.textContent = 'Saved';
        }
    }
    
    updateDocumentTitle() {
        const fileName = this.currentFilePath ? 
            this.currentFilePath.split('/').pop().split('\\\\').pop() : 
            'Untitled Document';
        
        const title = this.isModified ? `${fileName} •` : fileName;
        this.documentTitle.textContent = title;
    }
    
    newFile() {
        if (this.isModified) {
            const response = confirm('You have unsaved changes. Are you sure you want to create a new file?');
            if (!response) return;
        }
        
        this.editor.innerHTML = '';
        this.currentFilePath = null;
        this.isModified = false;
        this.lastSavedContent = '';
        this.updateDocumentTitle();
        this.updateSaveStatus();
        this.updateWordCount();
        this.editor.focus();
    }
    
    openFile(filePath, content) {
        if (this.isModified) {
            const response = confirm('You have unsaved changes. Are you sure you want to open a new file?');
            if (!response) return;
        }
        
        this.currentFilePath = filePath;
        this.editor.innerHTML = this.escapeHtml(content);
        this.isModified = false;
        this.lastSavedContent = this.editor.innerHTML;
        this.updateDocumentTitle();
        this.updateSaveStatus();
        this.updateWordCount();
        this.editor.focus();
    }
    
    async saveFile() {
        const content = this.getPlainTextContent();
        
        try {
            const result = await ipcRenderer.invoke('save-file', {
                filePath: this.currentFilePath,
                content: content
            });
            
            if (result.success) {
                this.currentFilePath = result.filePath;
                this.isModified = false;
                this.lastSavedContent = this.editor.innerHTML;
                this.updateDocumentTitle();
                this.updateSaveStatus();
            } else {
                alert('Failed to save file: ' + (result.error || 'Unknown error'));
            }
        } catch (error) {
            alert('Failed to save file: ' + error.message);
        }
    }
    
    async saveAsFile() {
        const content = this.getPlainTextContent();
        
        try {
            const result = await ipcRenderer.invoke('save-file', {
                filePath: null, // Force save dialog
                content: content
            });
            
            if (result.success) {
                this.currentFilePath = result.filePath;
                this.isModified = false;
                this.lastSavedContent = this.editor.innerHTML;
                this.updateDocumentTitle();
                this.updateSaveStatus();
            }
        } catch (error) {
            alert('Failed to save file: ' + error.message);
        }
    }
    
    getPlainTextContent() {
        // Convert HTML content to plain text while preserving some formatting
        let content = this.editor.innerHTML;
        
        // Replace HTML tags with plain text equivalents
        content = content.replace(/<strong[^>]*>|<b[^>]*>/gi, '**');
        content = content.replace(/<\\/strong>|<\\/b>/gi, '**');
        content = content.replace(/<em[^>]*>|<i[^>]*>/gi, '*');
        content = content.replace(/<\\/em>|<\\/i>/gi, '*');
        content = content.replace(/<u[^>]*>/gi, '_');
        content = content.replace(/<\\/u>/gi, '_');
        content = content.replace(/<br[^>]*>/gi, '\\n');
        content = content.replace(/<div[^>]*>/gi, '\\n');
        content = content.replace(/<\\/div>/gi, '');
        content = content.replace(/<p[^>]*>/gi, '');
        content = content.replace(/<\\/p>/gi, '\\n\\n');
        
        // Remove any remaining HTML tags
        content = content.replace(/<[^>]*>/g, '');
        
        // Decode HTML entities
        const textarea = document.createElement('textarea');
        textarea.innerHTML = content;
        content = textarea.value;
        
        return content.trim();
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML.replace(/\\n/g, '<br>');
    }
}

// Initialize the word processor when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WordProcessor();
});

