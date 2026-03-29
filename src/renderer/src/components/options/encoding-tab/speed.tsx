import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import { usePreferences } from '../../providers/preferences'
import { Slider } from '@renderer/components/ui/slider'
import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { InformationCircleIcon } from '@hugeicons/core-free-icons'

const SPEEDS: {
  value: VideoPreferences['custom']['postProcessing']['ffmpeg']['preset']
  name: string
}[] = [
  {
    value: 'ultrafast',
    name: 'Ultra Fast'
  },
  {
    value: 'superfast',
    name: 'Super Fast'
  },
  {
    value: 'veryfast',
    name: 'Very Fast'
  },
  {
    value: 'faster',
    name: 'Faster'
  },
  {
    value: 'fast',
    name: 'Fast'
  },
  {
    value: 'medium',
    name: 'Medium'
  },
  {
    value: 'slow',
    name: 'Slow'
  },
  {
    value: 'slower',
    name: 'Slower'
  },
  {
    value: 'veryslow',
    name: 'Very Slow'
  }
]

export function Speed() {
  const { preferences, updatePreference } = usePreferences()
  const [currSpeedIdx, setCurrSpeedIdx] = useState(
    SPEEDS.findIndex(
      (speed) => speed.value === preferences.video.custom.postProcessing.ffmpeg.preset
    )
  )

  return (
    <div className="space-y-2 max-w-7/12">
      <div className="flex justify-between">
        <div className="inline-flex items-center gap-1.5">
          <span className="font-medium">Speed</span>
          <Tooltip>
            <TooltipTrigger className="cursor-help">
              <HugeiconsIcon icon={InformationCircleIcon} size={15} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Faster encoding = Less compression, Larger file</p>
              <p>Slower encoding = More compression, Smaller file</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <span
          className={
            currSpeedIdx > 5
              ? 'text-destructive'
              : currSpeedIdx > 2
                ? 'text-orange-400'
                : 'text-green-400'
          }
        >
          {currSpeedIdx === 0 && <span className="text-muted-foreground">(Default) </span>}
          {SPEEDS[currSpeedIdx].name}
        </span>
      </div>
      <Slider
        max={SPEEDS.length - 1}
        value={currSpeedIdx}
        onValueChange={function (index) {
          const i = index as number
          setCurrSpeedIdx(i)
        }}
        onValueCommitted={function (index) {
          const i = index as number
          const speed = SPEEDS[i].value

          if (preferences.video.custom.postProcessing.ffmpeg.preset !== speed) {
            updatePreference('video.custom.postProcessing.ffmpeg.preset', speed)
          }
        }}
      />
    </div>
  )
}
