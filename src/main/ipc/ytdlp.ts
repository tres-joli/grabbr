import { ipcMain } from 'electron'
import { getVersion, updateYtdlp } from '../services/update'

export function registerYtdlpIpc() {
  ipcMain.handle('ytdlp-update', async function () {
    return await updateYtdlp()
  })

  ipcMain.handle('ytdlp-version', async function () {
    return await getVersion()
  })
}
