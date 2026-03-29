import { registerDialogIpc } from './dialog'
import { registerDownloadIpc } from './download'
import { registerPreferencesIpc } from './preferences'
import { registerUpdaterIpc } from './updater'
import { registerYtdlpIpc } from './ytdlp'

export function registerIpc(win: Electron.BrowserWindow) {
  registerUpdaterIpc()
  registerPreferencesIpc()
  registerDialogIpc(win)
  registerDownloadIpc(win)
  registerYtdlpIpc()
}
