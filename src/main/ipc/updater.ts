import { ipcMain } from 'electron'
import AutoUpdater from 'electron-updater'

const { autoUpdater } = AutoUpdater

export function registerUpdaterIpc() {
  ipcMain.on('quit-and-install-update', function () {
    autoUpdater.quitAndInstall()
  })
}
