import { ElectronAPI } from '@electron-toolkit/preload'
import { ResponseReadFile } from './types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      openFile: () => Promise<ResponseReadFile|undefined>
      initialFile: () => Promise<ResponseReadFile|undefined>
    }
  }
}
