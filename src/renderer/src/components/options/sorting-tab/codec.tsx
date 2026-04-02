import { VideoCodecEnum } from '../../../../../shared/constants/ytdlp'
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { usePreferences } from '@renderer/components/providers/preferences'

const CONTAINERS: { value: VideoCodecEnum; name: string }[] = [
  {
    value: VideoCodecEnum.H264,
    name: 'H264'
  },
  {
    value: VideoCodecEnum.H265,
    name: 'H265'
  }
]

export function Codec() {
  const { preferences, updatePreference } = usePreferences()

  const { enabled, vcodec } = preferences.video.custom.videoFormat.formatSort

  return (
    <div className="space-y-1">
      <div className={`${!enabled && 'opacity-50'} font-medium`}>Codec</div>
      <ToggleGroup
        disabled={!enabled}
        value={[vcodec]}
        onValueChange={function ([value]) {
          updatePreference('video.custom.videoFormat.formatSort.vcodec', value as VideoCodecEnum)
        }}
      >
        {CONTAINERS.map(function (container) {
          return (
            <ToggleGroupItem key={container.value} value={container.value}>
              {container.name}
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>
    </div>
  )
}
