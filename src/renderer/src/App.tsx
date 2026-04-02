import { toast } from 'sonner'
import { Download } from '@hugeicons/core-free-icons'
import { useState } from 'react'
import { Options } from '@renderer/components/options'
import { Button } from '@renderer/components/ui/button'
import { InputUrl } from '@renderer/components/input-url'
import { usePreferences } from '@renderer/components/providers/preferences'
import { HugeiconsIcon } from '@hugeicons/react'
import { Type } from './components/type'
import { useIpc } from './components/use-ipc'
import { isValidUrl } from '../../shared/utils'

export function App() {
  const [url, setUrl] = useState('')
  const { preferences, updatePreference, prefLoading } = usePreferences()

  // Hook for IPC listeners
  useIpc()

  async function startDownload() {
    const normalizedUrl = url.trim()
    if (!isValidUrl(normalizedUrl)) {
      toast.warning('Invalid URL', { richColors: true })
      return
    }

    try {
      const { downloadMode, base } = preferences
      switch (downloadMode) {
        case 'ask': {
          const selectedPath = await window.api.selectFolder()
          if (!selectedPath) {
            return
          } else {
            updatePreference('base.filesystem.output', selectedPath)
          }
          break
        }

        case 'select': {
          if (base.filesystem.output.length < 1) {
            toast.error('Download location not set', { richColors: true })
            return
          }
        }
      }

      window.api.startDownload(normalizedUrl)
      setUrl('')
    } catch {
      toast.error('Something went wrong', { richColors: true })
    }
  }

  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <div className="space-y-2 w-xs sm:w-xl md:w-2xl">
        <InputUrl url={url} setUrl={setUrl} />
        {prefLoading ? (
          <div className="text-sm text-center text-muted-foreground mt-2">
            Loading preferences...
          </div>
        ) : (
          <div className="flex justify-between w-full">
            <div className="flex gap-2">
              <Type />
              <Options />
            </div>
            <Button disabled={!isValidUrl(url.trim())} onClick={startDownload}>
              <HugeiconsIcon icon={Download} /> Download
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
