import { ElectronApi } from '~/electron/preload'

declare global {
  interface Window {
    // expose in the `electron/preload/index.ts`
    electronApi: ElectronApi
  }
}
