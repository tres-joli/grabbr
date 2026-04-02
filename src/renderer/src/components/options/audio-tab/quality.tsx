import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { usePreferences } from '../../providers/preferences'
import { InformationCircleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { QLTY_CHNG_AUDIO_FMTS } from '../../../../../shared/constants/conditional'
import { AudioQualityEnum } from '../../../../../shared/constants/ytdlp'

const QUALITIES: { value: AudioQualityEnum; name: string }[] = [
  {
    value: AudioQualityEnum['320K'],
    name: '320K'
  },
  {
    value: AudioQualityEnum['256K'],
    name: '256K'
  },
  {
    value: AudioQualityEnum['224K'],
    name: '224K'
  },
  {
    value: AudioQualityEnum['192K'],
    name: '192K'
  },
  {
    value: AudioQualityEnum['160K'],
    name: '160K'
  },
  {
    value: AudioQualityEnum['128K'],
    name: '128K'
  },
  {
    value: AudioQualityEnum['96K'],
    name: '96K'
  },
  {
    value: AudioQualityEnum['64K'],
    name: '64K'
  }
]

export function Quality() {
  const { preferences, updatePreference } = usePreferences()

  const { audioFormat, audioQuality } = preferences.audio.custom.postProcessing

  const isBest = preferences.audio.preset === 'best'
  const isQualityConfigurable = QLTY_CHNG_AUDIO_FMTS.includes(audioFormat)

  return (
    <div className="space-y-1">
      <div
        className={`${(isBest || !isQualityConfigurable) && 'opacity-50'} inline-flex items-center gap-1.5`}
      >
        <span className="font-medium">Quality</span>
        <Tooltip disabled={isBest}>
          <TooltipTrigger className={`${!isBest && 'cursor-help'}`}>
            <HugeiconsIcon icon={InformationCircleIcon} size={14} />
          </TooltipTrigger>
          <TooltipContent>
            Supported formats:{' '}
            <span className="font-medium">
              {QLTY_CHNG_AUDIO_FMTS.toString().replaceAll(',', ', ').toUpperCase()}
            </span>
          </TooltipContent>
        </Tooltip>
      </div>
      <ToggleGroup
        disabled={!isQualityConfigurable || isBest}
        value={[audioQuality]}
        onValueChange={function ([value]) {
          updatePreference('audio.custom.postProcessing.audioQuality', value as AudioQualityEnum)
        }}
      >
        <Tooltip>
          <TooltipTrigger render={<ToggleGroupItem value="0">Peak</ToggleGroupItem>} />
          <TooltipContent>Peak available</TooltipContent>
        </Tooltip>
        {QUALITIES.map(function (quality) {
          return (
            <ToggleGroupItem key={quality.value} value={quality.value}>
              {quality.name}
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>
    </div>
  )
}
