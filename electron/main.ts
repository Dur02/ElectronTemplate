import { app, BrowserWindow, Menu, shell } from 'electron'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

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
    {
      id: 'navigation',
      label: 'Navi',
      submenu: [
        {
          id: 'back',
          label: 'Back',
          click: () => {
            if (win.webContents.canGoBack()) {
              win.webContents.goBack()
            }
          },
        },
        {
          id: 'forward',
          label: 'Forward',
          click: () => {
            if (win.webContents.canGoForward()) {
              win.webContents.goForward()
            }
          },
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
    // void win.loadURL(process.env.VITE_DEV_SERVER_URL!)
    // void win.loadFile(path.join(__dirname, '../document/1562_11443_115193.html'))
    // void win.loadURL('https://www.lightnovel.us/cn/') // 11
    // void win.loadURL('https://masiro.me')
    // void win.loadURL('https://cijoc.com') //12
    void win.loadURL('https://wenku8.net') // month 5
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

app.on('web-contents-created', (_e, webContents) => {
  // 禁用window.open打开窗口
  webContents.setWindowOpenHandler(({ url }) => {
    if (url) {
      void win.loadURL(url)
    }
    return { action: 'deny' }
  })
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
