import type { FFmpegEncoderEnum } from '../src/shared/constants/ffmpeg'
import type { DownloadModeEnum, MediaTypeEnum } from '../src/shared/constants/preferences'

declare global {
  type Preferences = {
    type: MediaTypeEnum
    downloadMode: DownloadModeEnum
    supportedEncoders: FFmpegEncoderEnum[]
    appVersion: string
    base: BasePreferences
    audio: AudioPreferences
    video: VideoPreferences
  }

  type DeepKeyOf<T> = {
    [K in keyof T & string]: T[K] extends object ? K | `${K}.${DeepKeyOf<T[K]>}` : K
  }[keyof T & string]

  type DeepValue<T, K extends string> = K extends `${infer A}.${infer B}`
    ? A extends keyof T
      ? DeepValue<T[A], B>
      : never
    : K extends keyof T
      ? T[K]
      : never

  type PreferenceMap = {
    [K in DeepKeyOf<Preferences>]: DeepValue<Preferences, K>
  }
}

export {}
