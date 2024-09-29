import { ipcRenderer, contextBridge } from 'electron'

const electronApi = {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...(args as unknown[])))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...(omit as unknown[]))
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...(omit as unknown[]))
  },
  platform: process.platform,

  // You can expose other APTs you need here.
  // ...
}

contextBridge.exposeInMainWorld('electronApi', electronApi)

export type ElectronApi = typeof electronApi
