import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { usePreferences } from '../../providers/preferences'

export function Encoder() {
  const { preferences, updatePreference } = usePreferences()

  const { video } = preferences

  return (
    <div className="space-y-1">
      <div className="font-medium">Encoder</div>
      <ToggleGroup
        value={[video.custom.postProcessing.ffmpeg.encoder]}
        onValueChange={function (value) {
          updatePreference('video.custom.postProcessing.ffmpeg.encoder', value[0] as any)
        }}
      >
        <Tooltip>
          <TooltipTrigger render={<ToggleGroupItem value="cpu">CPU</ToggleGroupItem>} />
          <TooltipContent>Default</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <ToggleGroupItem value="gpu">
                GPU <span className="text-orange-400">(Experimental)</span>
              </ToggleGroupItem>
            }
          />
          <TooltipContent>4x - 5x speed</TooltipContent>
        </Tooltip>
      </ToggleGroup>
    </div>
  )
}
