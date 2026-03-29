import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { usePreferences } from '@renderer/components/providers/preferences'

const CONTAINERS: { value: FormatSortMap['vcodec']; name: string }[] = [
  {
    value: 'h264',
    name: 'H264'
  },
  {
    value: 'hevc',
    name: 'H265'
  }
]

export function Codec() {
  const { preferences, updatePreference } = usePreferences()

  const { video, sortFormat } = preferences

  return (
    <div className="space-y-1">
      <div className={`${!sortFormat && 'opacity-50'} font-medium`}>Codec</div>
      <ToggleGroup
        disabled={!sortFormat}
        value={[video.custom.videoFormat.formatSort.vcodec!]}
        onValueChange={function (value) {
          updatePreference('video.custom.videoFormat.formatSort.vcodec', value[0] as any)
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
