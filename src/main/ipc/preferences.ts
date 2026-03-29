import { ipcMain } from 'electron'
import { clearPreferences, getPreferences, setPreference } from '../controller/preferences'

export function registerPreferencesIpc() {
  ipcMain.handle('get-preferences', function () {
    return getPreferences()
  })

  ipcMain.on('set-preference', function <
    K extends keyof PreferenceMap
  >(_event: Electron.IpcMainEvent, key: K, value: PreferenceMap[K]) {
    setPreference(key, value)
  })

  ipcMain.on('clear-preferences', function () {
    clearPreferences()
  })
}
