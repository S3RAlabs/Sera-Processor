const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    trafficLightPosition: process.platform === 'darwin' ? { x: 20, y: 20 } : undefined,
    vibrancy: process.platform === 'darwin' ? 'under-window' : undefined,
    show: false,
    icon: process.platform !== 'darwin' ? path.join(__dirname, 'assets/icon.png') : undefined
  });

  mainWindow.loadFile('src/index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Center window on macOS
    if (process.platform === 'darwin') {
      mainWindow.center();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // macOS specific window behavior
  if (process.platform === 'darwin') {
    mainWindow.on('close', (event) => {
      if (!app.isQuitting) {
        event.preventDefault();
        mainWindow.hide();
      }
    });
  }

  // Create application menu
  createMenu();
}

function createMenu() {
  const isMac = process.platform === 'darwin';
  
  const template = [
    // macOS app menu
    ...(isMac ? [{
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('menu-new-file');
          }
        },
        {
          label: 'Open...',
          accelerator: 'CmdOrCtrl+O',
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow, {
              properties: ['openFile'],
              filters: [
                { name: 'Text Files', extensions: ['txt', 'md'] },
                { name: 'All Files', extensions: ['*'] }
              ]
            });

            if (!result.canceled) {
              const filePath = result.filePaths[0];
              const content = fs.readFileSync(filePath, 'utf8');
              mainWindow.webContents.send('menu-open-file', { filePath, content });
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            mainWindow.webContents.send('menu-save-file');
          }
        },
        {
          label: 'Save As...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => {
            mainWindow.webContents.send('menu-save-as-file');
          }
        },
        { type: 'separator' },
        ...(isMac ? [] : [{
          label: 'Quit',
          accelerator: 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }])
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac ? [
          { role: 'pasteandmatchstyle' },
          { role: 'delete' },
          { role: 'selectall' },
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [
              { role: 'startspeaking' },
              { role: 'stopspeaking' }
            ]
          }
        ] : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectall' }
        ])
      ]
    },
    {
      label: 'Format',
      submenu: [
        {
          label: 'Bold',
          accelerator: 'CmdOrCtrl+B',
          click: () => {
            mainWindow.webContents.send('menu-format', 'bold');
          }
        },
        {
          label: 'Italic',
          accelerator: 'CmdOrCtrl+I',
          click: () => {
            mainWindow.webContents.send('menu-format', 'italic');
          }
        },
        {
          label: 'Underline',
          accelerator: 'CmdOrCtrl+U',
          click: () => {
            mainWindow.webContents.send('menu-format', 'underline');
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [])
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Handle save file requests from renderer
ipcMain.handle('save-file', async (event, { filePath, content }) => {
  try {
    if (filePath) {
      fs.writeFileSync(filePath, content, 'utf8');
      return { success: true, filePath };
    } else {
      const result = await dialog.showSaveDialog(mainWindow, {
        filters: [
          { name: 'Text Files', extensions: ['txt'] },
          { name: 'Markdown Files', extensions: ['md'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      });

      if (!result.canceled) {
        fs.writeFileSync(result.filePath, content, 'utf8');
        return { success: true, filePath: result.filePath };
      }
    }
    return { success: false };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

app.whenReady().then(() => {
  createWindow();
  
  // macOS specific behavior
  if (process.platform === 'darwin') {
    app.dock.setIcon(path.join(__dirname, 'assets/icon.png'));
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else if (mainWindow) {
    mainWindow.show();
  }
});

app.on('before-quit', () => {
  app.isQuitting = true;
});

