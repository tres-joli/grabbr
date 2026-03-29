import AutoUpdater from 'electron-updater'

const { autoUpdater } = AutoUpdater

export function setupUpdater(win: Electron.BrowserWindow) {
  autoUpdater.on('update-available', function () {
    win.webContents.send('update-available')
  })

  autoUpdater.on('update-downloaded', function () {
    win.webContents.send('update-complete')
  })

  autoUpdater.on('error', function () {
    win.webContents.send('update-error')
  })

  autoUpdater.checkForUpdatesAndNotify()
}
