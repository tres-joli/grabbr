import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { usePreferences } from '@renderer/components/providers/preferences'
import { VideoMergeOutputFormatEnum } from '../../../../../shared/constants/ytdlp'

const CONTAINERS: { value: VideoMergeOutputFormatEnum; name: string; content: React.ReactNode }[] =
  [
    {
      value: VideoMergeOutputFormatEnum.MP4,
      name: 'MP4',
      content: (
        <>
          <p className="underline underline-offset-4 decoration-muted-foreground mb-1 font-medium">
            MPEG-4 Part 14
          </p>
          <p>Compatibility: Universal</p>
          <p>Flexibility: Good</p>
        </>
      )
    },
    {
      value: VideoMergeOutputFormatEnum.MKV,
      name: 'MKV',
      content: (
        <>
          <p className="underline underline-offset-4 decoration-muted-foreground mb-1 font-medium">
            Matroska Video
          </p>
          <p>Compatibility: Moderate</p>
          <p>Flexibility: Excellent</p>
        </>
      )
    }
    // {
    //   value: VideoMergeOutputFormatEnum.WEBM,
    //   name: 'WEBM',
    //   content: (
    //     <>
    //       <p className="underline underline-offset-4 decoration-muted-foreground mb-1">
    //         Web Media (Restricted Matroska for browsers)
    //       </p>
    //       <p>Compatibility: Moderate</p>
    //       <p>Flexibility: Limited</p>
    //     </>
    //   )
    // }
  ]

export function Container() {
  const { preferences, updatePreference } = usePreferences()

  const { mergeOutputFormat } = preferences.video.custom.videoFormat

  const isBest = preferences.video.preset === 'best'

  return (
    <div className="space-y-1">
      <div className={`${isBest && 'opacity-50'} font-medium`}>Container</div>
      <ToggleGroup
        disabled={isBest}
        value={[mergeOutputFormat]}
        onValueChange={function ([value]) {
          updatePreference(
            'video.custom.videoFormat.mergeOutputFormat',
            value as VideoMergeOutputFormatEnum
          )
        }}
      >
        {CONTAINERS.map(function (container) {
          return (
            <Tooltip key={container.value}>
              <TooltipTrigger
                render={<ToggleGroupItem value={container.value}>{container.name}</ToggleGroupItem>}
              />
              <TooltipContent>{container.content}</TooltipContent>
            </Tooltip>
          )
        })}
      </ToggleGroup>
    </div>
  )
}
