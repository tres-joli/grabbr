import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { usePreferences } from '../../providers/preferences'
import {
  FFmpegEncoderEnum,
  FFmpegVCodecAMFEnum,
  FFmpegVCodecCPUEnum,
  FFmpegVCodecNVIDIAEnum,
  FFmpegVCodecQSVEnum
} from '../../../../../shared/constants/ffmpeg'

const CODECS = {
  [FFmpegEncoderEnum.CPU]: [
    { label: 'H264', value: FFmpegVCodecCPUEnum.LIBX264 },
    { label: 'H265', value: FFmpegVCodecCPUEnum.LIBX265 }
  ],
  [FFmpegEncoderEnum.NVIDIA]: [
    { label: 'H264', value: FFmpegVCodecNVIDIAEnum.H264_NVENC },
    { label: 'H265', value: FFmpegVCodecNVIDIAEnum.HEVC_NVENC }
  ],
  [FFmpegEncoderEnum.AMD]: [
    { label: 'H264', value: FFmpegVCodecAMFEnum.H264_AMF },
    { label: 'H265', value: FFmpegVCodecAMFEnum.HEVC_AMF }
  ],
  [FFmpegEncoderEnum.INTEL]: [
    { label: 'H264', value: FFmpegVCodecQSVEnum.H264_QSV },
    { label: 'H265', value: FFmpegVCodecQSVEnum.HEVC_QSV }
  ]
}

export function VideoCodec() {
  const { preferences, updatePreference } = usePreferences()

  const { postProcessorArgs } = preferences.video.custom.postProcessing

  const vCodec = postProcessorArgs[postProcessorArgs.encoder].videoCodec
  const options = CODECS[postProcessorArgs.encoder]

  return (
    <div className="space-y-1">
      <div className="font-medium">Video Codec</div>
      <ToggleGroup
        value={[vCodec]}
        onValueChange={function ([value]) {
          updatePreference(
            `video.custom.postProcessing.postProcessorArgs.${postProcessorArgs.encoder}.videoCodec`,
            value as never
          )
        }}
      >
        {options.map(({ label, value }) => (
          <Tooltip key={value}>
            <TooltipTrigger render={<ToggleGroupItem value={value}>{label}</ToggleGroupItem>} />
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        ))}
      </ToggleGroup>
    </div>
  )
}
