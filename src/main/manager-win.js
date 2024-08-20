const { app, BrowserWindow, globalShortcut, Menu } = require('electron')
const path = require('node:path');
const isMac = process.platform === 'darwin'
const isDev = !app.isPackaged;

module.exports = function(){
  let dockICON = path.join(__dirname, '../' ,'assets/icon.png');
  let mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    frame: false,
    icon: dockICON,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../', 'render', 'preload.js')
    }
  })
  let url = 'https://im.jugglechat.com/';
  if(isDev){
    url = url = process.argv[2] || ''; 
  }
  mainWindow.loadURL(url);

  if (isMac) {
    mainWindow.setWindowButtonVisibility(true);
    app.dock.setIcon(dockICON);
  }

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  globalShortcut.register('CommandOrControl+Shift+K', () => {
    mainWindow.webContents.openDevTools();
  });
  
  let tpl = getMenus();
  let menu = Menu.buildFromTemplate(tpl)
  Menu.setApplicationMenu(menu)
  return mainWindow;
}


function getMenus() {
  let tpls = [
    ...(isMac
      ? [{label: ''},{
        label: 'JuggleChat',
        submenu: [
          {
            label: '关于 JuggleChat',
            click: async () => {
              const { shell } = require('electron')
              await shell.openExternal('https://www.jugglechat.com/')
            }
          },
          { role: 'hide', label: '隐藏 JuggleChat' },
          { role: 'hideOthers', label: '隐藏 其他窗口' },
          { role: 'unhide', label: '显示所有窗口' },
          { type: 'separator' },
          { role: 'quit', label: '退出' }
        ]
      }]
      : []),
    {
      label: '编辑',
      submenu: [
        { role: 'undo', label: '撤销' },
        { role: 'redo', label: '重做' },
        { type: 'separator' },
        { role: 'cut', label: '剪切' },
        { role: 'copy', label: '复制' },
        { role: 'paste', label: '粘贴' },
        { role: 'selectAll', label: '全选' }
      ]
    },
    {
      label: '显示',
      submenu: [
        { role: 'resetZoom', label: '实际大小' },
        { role: 'zoomIn', label: '缩小' },
        { role: 'zoomOut', label: '放大' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: '进入全屏' }
      ]
    }
  ];
  return tpls;
}