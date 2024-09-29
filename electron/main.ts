import { app, BrowserWindow, Menu, shell } from 'electron'
import path from 'node:path'

let win: BrowserWindow

// disable default menu
// https://github.com/electron/electron/issues/35512
Menu.setApplicationMenu(null)

const createWindow = () => {
  win = new BrowserWindow({
    title: 'AGE Anime',
    width: 300,
    height: 50,
    // minWidth: 391,
    // minHeight: 732,
    resizable: true,
    fullscreenable: true,
    backgroundColor: '#ffffff',
    // titleBarStyle: process.platform === 'darwin' ? 'default' : 'hidden',
    // titleBarOverlay: {
    //   color: '#ffffff',
    //   symbolColor: '#000000',
    //   height: 32,
    // },
    icon: path.join(__dirname, '../public/favicon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // create menu
  const template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [
    {
      id: 'Dev',
      label: 'Dev',
      submenu: [
        {
          id: 'Toggle Developer Tools',
          label: 'Toggle Developer Tools',
          accelerator: 'Shift+CmdOrCtrl+I',
          role: 'toggleDevTools',
        },
        {
          id: 'Reload',
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          role: 'reload',
        },
      ],
    },
    {
      id: 'view',
      label: 'View',
      submenu: [
        {
          id: 'Official Website',
          label: 'Official Website',
          click: () => {
            void shell.openExternal('https://www.electronjs.org/')
          },
        },
        {
          id: 'FullScreen',
          label: 'FullScreen',
          accelerator: 'F11',
          role: 'togglefullscreen',
        },
      ],
    },
  ]

  // override MacOS first Menu item
  if (process.platform === 'darwin') {
    template.unshift({
      id: 'quit',
      label: app.getName(),
      submenu: [
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click() {
            app.quit()
          },
        },
      ],
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // load url
  if (process.env.NODE_ENV === 'development') {
    void win.loadURL(process.env.VITE_DEV_SERVER_URL!)
    win.webContents.openDevTools()
  } else {
    void win.loadFile('index.html')
  }
}

void app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// ipcMain.on('clickOnMenu', (_event, key) => {
//   switch (key) {
//     case 'Toggle Developer Tools': {
//       win.webContents.toggleDevTools()
//       break
//     }
//     case 'Reload': {
//       win.webContents.reload()
//       break
//     }
//     case 'FullScreen': {
//       win.setFullScreen(!win.isFullScreen())
//       break
//     }
//     default: {
//       break
//     }
//   }
// })

// ipcMain.on('openLink', (_event, url) => {
//   void shell.openExternal(url as string)
// })
