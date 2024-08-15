const { contextBridge } = require('electron');
const { ipcRenderer } = require('electron/renderer');
const { JG_RENDER_NAME } = require('../enum');
function next(){
  contextBridge.exposeInMainWorld('JuggleIMDesktop', {
    setWindow: ({ type }) => {
      ipcRenderer.invoke(JG_RENDER_NAME.WIN_OPTERATOR, { type });
    },
    isMaximized: async () => {
      return await ipcRenderer.invoke(JG_RENDER_NAME.WIN_IS_MAXED, {  });
    },
  });
}
module.exports = next();