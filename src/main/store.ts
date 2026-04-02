import Store from 'electron-store'
import { DefaultPreferences } from '../shared/constants/preferences'

export const store = new Store<Preferences>({
  defaults: DefaultPreferences
})
