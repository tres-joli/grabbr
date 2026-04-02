import type {
  FFmpegACodecEnum,
  FFmpegEncoderEnum,
  FFmpegTargetEnum,
  FFmpegVCodecCPUEnum,
  FFmpegVCodecNVIDIAEnum,
  FFmpegVCodecAMFEnum,
  FFmpegVCodecQSVEnum,
  FFmpegPresetQSVEnum,
  FFmpegPresetAMFEnum,
  FFmpegPresetNVENCEnum,
  FFmpegPresetCPUEnum
} from '../src/shared/constants/ffmpeg'

declare global {
  type FFmpegAPI = {
    enabled: boolean
    target: FFmpegTargetEnum
    audioCodec: FFmpegACodecEnum
    encoder: FFmpegEncoderEnum
    [FFmpegEncoderEnum.CPU]: {
      videoCodec: FFmpegVCodecCPUEnum
      preset: FFmpegPresetCPUEnum
      crf: number // 0-51, h264 default: 23, h265 default: 28
    }
    [FFmpegEncoderEnum.NVIDIA]: {
      videoCodec: FFmpegVCodecNVIDIAEnum
      preset: FFmpegPresetNVENCEnum
      cq: number // 0-51, default: 0 (means FFmpeg lets NVENC decide)
    }
    [FFmpegEncoderEnum.AMD]: {
      videoCodec: FFmpegVCodecAMFEnum
      preset: FFmpegPresetAMFEnum
      qp: number // 0-51, default: -1 (means AMF picks internally)
    }
    [FFmpegEncoderEnum.INTEL]: {
      videoCodec: FFmpegVCodecQSVEnum
      preset: FFmpegPresetQSVEnum
      globalQuality: number // 1-51, default: 25
    }
  }
}

export {}
