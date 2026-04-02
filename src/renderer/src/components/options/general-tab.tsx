import { toast } from 'sonner'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'
import { Card, CardContent } from '../ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import {
  HelpCircleIcon,
  Folder01Icon,
  ComputerIcon,
  Sun03Icon,
  Moon02Icon,
  Tick02Icon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { usePreferences } from '../providers/preferences'
import { useState } from 'react'
import { DownloadModeEnum } from '../../../../shared/constants/preferences'

export function GeneralTab() {
  const { theme, setTheme } = useTheme()
  const { preferences, updatePreference, reloadPreferences } = usePreferences()
  const [prefReset, setPrefReset] = useState(false)

  const { downloadMode, base } = preferences

  async function selectDownloadDirectory() {
    const selectedPath = await window.api.selectFolder()
    if (selectedPath) {
      updatePreference('base.filesystem.output', selectedPath)
      if (downloadMode !== DownloadModeEnum.SELECT) {
        updatePreference('downloadMode', DownloadModeEnum.SELECT)
      }
      toast.success('Download Location Selected')
    }
  }

  async function resetPreferences() {
    setPrefReset(true)
    window.api.clearPreferences()
    await reloadPreferences()
    setTimeout(function () {
      setPrefReset(false)
    }, 6000)
  }

  return (
    <Card className="h-full">
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <div className="font-medium">Theme</div>
          <ToggleGroup
            value={[theme!]}
            onValueChange={function ([value]) {
              setTheme(value)
            }}
          >
            <ToggleGroupItem value="system">
              <HugeiconsIcon icon={ComputerIcon} className="mr-0.5 size-3.5" /> System
            </ToggleGroupItem>
            <ToggleGroupItem value="light">
              <HugeiconsIcon icon={Sun03Icon} /> Light
            </ToggleGroupItem>
            <ToggleGroupItem value="dark">
              <HugeiconsIcon icon={Moon02Icon} className="size-3.5" /> Dark
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="space-y-1">
          <div className="font-medium">Download Directory</div>
          <div className="flex items-center gap-2">
            <ToggleGroup
              value={[downloadMode]}
              onValueChange={function ([value]) {
                if (value === DownloadModeEnum.SELECT) {
                  selectDownloadDirectory()
                } else {
                  updatePreference('downloadMode', value as DownloadModeEnum)
                }
              }}
            >
              <ToggleGroupItem value={DownloadModeEnum.ASK}>
                <HugeiconsIcon icon={HelpCircleIcon} /> Ask Each Time
              </ToggleGroupItem>
              {downloadMode === DownloadModeEnum.SELECT ? (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <ToggleGroupItem value={DownloadModeEnum.SELECT}>
                        <HugeiconsIcon icon={Folder01Icon} className="mr-0.5" />
                        {base.filesystem.output.length > 15
                          ? `${base.filesystem.output.slice(0, 15)}...`
                          : base.filesystem.output}
                      </ToggleGroupItem>
                    }
                  />
                  <TooltipContent>
                    <p>{base.filesystem.output}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <ToggleGroupItem value={DownloadModeEnum.SELECT}>
                  <HugeiconsIcon icon={Folder01Icon} />
                  Select
                </ToggleGroupItem>
              )}
            </ToggleGroup>
            {downloadMode === DownloadModeEnum.SELECT && (
              <Button onClick={selectDownloadDirectory}>Change</Button>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <div className="font-medium">Reset Options</div>
          <Button onClick={resetPreferences} disabled={prefReset}>
            {!prefReset ? 'Reset' : <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
