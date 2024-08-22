const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const JGMain = require('jugglechat-electron/main');
const WindowManager = require('./manager-win');
const EventManager = require('./manage-event');
const isMac = process.platform === 'darwin'
const isDev = process.env.NODE_ENV === 'development';

let mainWindow = null;
let isQuit = false;

app.whenReady().then(() => {

  // 初始化 JuggleIM PC SDK
  JGMain.init();

  // 初始化窗口
  mainWindow = WindowManager();

  // 初始化事件
  let eventManager = EventManager({ mainWindow });

  mainWindow.on('close', (event) => {
    if(!isQuit){
      event.preventDefault();
      mainWindow.hide();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = WindowManager();
      eventManager.setWin(mainWindow);
    }else{
      mainWindow.show();
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin'){
    app.quit()
  }
})
app.on('before-quit', () => {
  isQuit = true;
})
