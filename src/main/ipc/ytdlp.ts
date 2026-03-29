import { ipcMain } from 'electron'
import { getVersion, update } from '../services/ytdlp/update'

export function registerYtdlpIpc() {
  ipcMain.handle('ytdlp-update', async function () {
    return await update()
  })

  ipcMain.handle('ytdlp-version', async function () {
    return await getVersion()
  })
}
