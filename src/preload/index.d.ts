import type { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }

  type API = {
    // Update
    onUpdateAvailable: (callback: () => void) => void
    onUpdateComplete: (callback: () => void) => void
    onUpdateError: (callback: () => void) => void
    quitAndInstallUpdate: () => void

    // Download
    startDownload: (url: string) => void
    cancelDownload: (taskId: string) => void
    onDownloadInit: (callback: (payload: { id: string }) => void) => void
    onDownloadStart: (
      callback: (payload: { id: string; name: string; url: string }) => void
    ) => void
    onDownloadComplete: (
      callback: (payload: { id: string; name: string; filePath: string }) => void
    ) => void
    onDownloadError: (
      callback: (payload: { id: string; name: string; message: string }) => void
    ) => void
    onDownloadCancel: (
      callback: (payload: { id: string; name: string; message?: string }) => void
    ) => void

    // Preferences
    getPreferences: () => Promise<Preferences>
    setPreference: (key: string, value: unknown) => void
    clearPreferences: () => void

    // yt-dlp
    ytdlpVersion: () => Promise<string>
    ytdlpUpdate: () => Promise<{ alreadyLatest: boolean; version: string }>

    // Dialog & Shell
    selectFile: (options?: { name: string; extensions: string[] }) => Promise<string | null>
    selectFolder: () => Promise<string | null>
    showItemInFolder: (fullPath: string) => void
    openExternalUrl: (url: string) => void
  }
}
