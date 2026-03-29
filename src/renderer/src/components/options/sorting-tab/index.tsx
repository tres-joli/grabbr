import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import { usePreferences } from '../../providers/preferences'
import { Card, CardContent } from '@renderer/components/ui/card'
import { Switch } from '@renderer/components/ui/switch'
import { InformationCircleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Codec } from './codec'

export function SortingTab() {
  const { preferences, updatePreference } = usePreferences()

  const { sortFormat } = preferences

  return (
    <Card className="h-full">
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5">
            <span className="font-medium">Sorting</span>
            <Tooltip>
              <TooltipTrigger className="cursor-help">
                <HugeiconsIcon icon={InformationCircleIcon} size={15} />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Sorting rules take priority over your selections (e.g., codec first, then
                  resolution)
                </p>
                <p>
                  You can use this to avoid re-encoding, but not all selected audio/video options
                  may be respected
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div>
            <Switch
              checked={sortFormat}
              onCheckedChange={function (value) {
                updatePreference('sortFormat', value)
              }}
            />
          </div>
        </div>
        <Codec />
      </CardContent>
    </Card>
  )
}
