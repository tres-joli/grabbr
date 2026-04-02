import { store } from '../store'

export function getPreferences() {
  return store.store
}

export function setPreference<K extends keyof PreferenceMap>(key: K, value: PreferenceMap[K]) {
  console.info('store:', key, '-', value)

  store.set(key, value)
}

export function clearPreferences() {
  console.info('Preferences cleared')
  store.reset('type', 'base', 'audio', 'video', 'downloadMode')
}
