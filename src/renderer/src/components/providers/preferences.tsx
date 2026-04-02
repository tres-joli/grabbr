import { toast } from 'sonner'
import { createContext, useContext, useEffect, useState } from 'react'
import { DefaultPreferences } from '../../../../shared/constants/preferences'

type ContextType = {
  preferences: Preferences
  updatePreference: <K extends keyof PreferenceMap>(key: K, value: PreferenceMap[K]) => void
  prefLoading: boolean
  reloadPreferences: () => Promise<void>
}

const PreferencesContext = createContext<ContextType | null>(null)

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(DefaultPreferences)
  const [prefLoading, setPrefLoading] = useState(true)

  async function loadPreferences() {
    try {
      const savedPreferences = await window.api.getPreferences()
      setPreferences(savedPreferences)
    } catch {
      toast.error('Failed to load preferences')
    } finally {
      setPrefLoading(false)
    }
  }

  useEffect(function () {
    loadPreferences()
  }, [])

  function updatePreference(key: string, value: unknown) {
    window.api.setPreference(key, value)
    setPreferences(function (prev) {
      const keys = key.split('.')
      if (keys.length === 1) {
        return { ...prev, [key]: value }
      }

      const result = { ...prev }
      let current = result as Record<string, unknown>
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) }
        current = current[keys[i]] as Record<string, unknown>
      }
      current[keys[keys.length - 1]] = value
      return result
    })
  }

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreference,
        prefLoading,
        reloadPreferences: loadPreferences
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider')
  }
  return context
}
