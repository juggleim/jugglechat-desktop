const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const JGMain = require('jugglechat-electron/main');
const WindowManager = require('./manager-win');
const EventManager = require('./manage-event');
const isMac = process.platform === 'darwin'
const isDev = process.env.NODE_ENV === 'development';

let mainWindow = null;

app.whenReady().then(() => {

  // 初始化 JuggleIM PC SDK
  JGMain.init();

  // 初始化窗口
  mainWindow = WindowManager();

  // 初始化事件
  EventManager({ mainWindow });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
