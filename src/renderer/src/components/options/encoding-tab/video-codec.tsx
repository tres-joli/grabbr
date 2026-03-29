import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { usePreferences } from '../../providers/preferences'

const CODECS: {
  value: VideoPreferences['custom']['postProcessing']['ffmpeg']['videoCodec']
  name: string
  content: React.JSX.Element
}[] = [
  {
    value: 'libx264',
    name: 'H.264',
    content: (
      <>
        <p>H.264</p>
      </>
    )
  },
  {
    value: 'libx265',
    name: 'H.265',
    content: (
      <>
        <p>H.265</p>
      </>
    )
  }
]

export function VideoCodec() {
  const { preferences, updatePreference } = usePreferences()

  const { video } = preferences

  return (
    <div className="space-y-1">
      <div className="font-medium">Video Codec</div>
      <ToggleGroup
        value={[video.custom.postProcessing.ffmpeg.videoCodec]}
        onValueChange={function (value) {
          updatePreference('video.custom.postProcessing.ffmpeg.videoCodec', value[0] as any)
        }}
      >
        {CODECS.map(function (codec) {
          return (
            <Tooltip key={codec.value}>
              <TooltipTrigger
                render={<ToggleGroupItem value={codec.value}>{codec.name}</ToggleGroupItem>}
              />
              <TooltipContent>{codec.content}</TooltipContent>
            </Tooltip>
          )
        })}
      </ToggleGroup>
    </div>
  )
}
