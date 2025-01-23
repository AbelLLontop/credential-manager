import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ResponseReadFile } from '../main/type'

// Custom APIs for renderer
const api = {
  openFile: (): Promise<ResponseReadFile | undefined> => ipcRenderer.invoke('dialog:openFile'),
  initialFile: (): Promise<ResponseReadFile | undefined> => ipcRenderer.invoke('initial:openFile')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
