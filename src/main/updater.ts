import { app } from 'electron'
import AutoUpdater from 'electron-updater'
import { store } from './store'
import { clearPreferences } from './services/preferences'

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

  resetPreferencesAfterUpdate()
}

function resetPreferencesAfterUpdate() {
  const currentVersion = app.getVersion()
  const lastSeenVersion = store.get('appVersion')

  console.info(`Current version: ${currentVersion}, Last seen version: ${lastSeenVersion}`)

  if (lastSeenVersion.length > 0 && lastSeenVersion !== currentVersion) {
    clearPreferences()
    store.set('appVersion', currentVersion)

    console.info('Preferences reset due to app update')
  }
}
