import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { HugeiconsIcon } from '@hugeicons/react'
import { AiMagicIcon } from '@hugeicons/core-free-icons'
import { usePreferences } from '../../providers/preferences'

export function Preset() {
  const { preferences, updatePreference } = usePreferences()

  const { preset } = preferences.audio

  return (
    <div className="space-y-1">
      <div className="font-medium">Preset</div>
      <ToggleGroup
        value={[preset]}
        onValueChange={function ([value]) {
          updatePreference('audio.preset', value as 'best' | 'custom')
        }}
      >
        <Tooltip>
          <TooltipTrigger
            render={
              <ToggleGroupItem value="best">
                <HugeiconsIcon icon={AiMagicIcon} />
                Best
              </ToggleGroupItem>
            }
          />
          <TooltipContent>Source quality (in MP3)</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<ToggleGroupItem value="custom">Custom</ToggleGroupItem>} />
          <TooltipContent>Full control over each setting</TooltipContent>
        </Tooltip>
      </ToggleGroup>
    </div>
  )
}
