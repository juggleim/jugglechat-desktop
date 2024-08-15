const { ipcMain } = require('electron')
const { JG_RENDER_NAME } = require('../enum');

module.exports = function({ mainWindow }){
  ipcMain.handle(JG_RENDER_NAME.WIN_OPTERATOR, (event, args) => {
    let { type } = args;
    mainWindow[type]();
    return {};
  });
  
  ipcMain.handle(JG_RENDER_NAME.WIN_IS_MAXED, (event, args) => {
    return mainWindow.isMaximized();
  });
}