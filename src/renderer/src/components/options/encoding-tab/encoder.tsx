import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { usePreferences } from '../../providers/preferences'
import { FFmpegEncoderEnum } from '../../../../../shared/constants/ffmpeg'

export function Encoder() {
  const { preferences, updatePreference } = usePreferences()

  const { supportedEncoders } = preferences
  const { encoder } = preferences.video.custom.postProcessing.postProcessorArgs

  return (
    <div className="space-y-1">
      <div className="font-medium">Encoder</div>
      <ToggleGroup
        value={[encoder]}
        onValueChange={function ([value]) {
          updatePreference(
            'video.custom.postProcessing.postProcessorArgs.encoder',
            value as FFmpegEncoderEnum
          )
        }}
      >
        {supportedEncoders.map(function (encoder) {
          return (
            <Tooltip key={encoder}>
              <TooltipTrigger
                render={
                  <ToggleGroupItem value={encoder}>
                    {encoder === FFmpegEncoderEnum.NVIDIA
                      ? 'NVIDIA'
                      : encoder === FFmpegEncoderEnum.AMD
                        ? 'AMD'
                        : encoder === FFmpegEncoderEnum.INTEL
                          ? 'Intel'
                          : 'CPU'}
                  </ToggleGroupItem>
                }
              />
              <TooltipContent>
                {encoder === FFmpegEncoderEnum.NVIDIA
                  ? '4x - 5x faster'
                  : encoder === FFmpegEncoderEnum.AMD
                    ? '4x - 5x faster'
                    : encoder === FFmpegEncoderEnum.INTEL
                      ? 'Not recommended'
                      : 'Default'}
              </TooltipContent>
            </Tooltip>
          )
        })}
      </ToggleGroup>
    </div>
  )
}
