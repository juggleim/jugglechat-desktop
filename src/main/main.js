const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const JGMain = require('jugglechat-electron/main');
const WindowManager = require('./manager-win');
const isMac = process.platform === 'darwin'
const isDev = process.env.NODE_ENV === 'development';

let mainWindow = null;

app.whenReady().then(() => {

  JGMain.init();

  mainWindow = WindowManager();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
