import { usePreferences } from '@renderer/components/providers/preferences'
import { Switch } from '../../ui/switch'
import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'
import { HugeiconsIcon } from '@hugeicons/react'
import { InformationCircleIcon } from '@hugeicons/core-free-icons'
import { THUMB_EMBED_VIDEO_FMTS } from '../../../../../shared/constants/conditional'

export function Switches() {
  const { preferences, updatePreference } = usePreferences()

  const { mergeOutputFormat } = preferences.video.custom.videoFormat
  const { embedThumbnail, embedChapters, embedMetadata } = preferences.video.custom.postProcessing

  const isBest = preferences.video.preset === 'best'
  const isThumbnailConfigurable = THUMB_EMBED_VIDEO_FMTS.includes(mergeOutputFormat)

  return (
    <>
      <div className="space-y-1.5">
        <div
          className={`${(isBest || !isThumbnailConfigurable) && 'opacity-50'} inline-flex items-center gap-1.5`}
        >
          <span className="font-medium">Embed Thumbnail</span>
          <Tooltip disabled={isBest || !isThumbnailConfigurable}>
            <TooltipTrigger className={`${!isBest && isThumbnailConfigurable && 'cursor-help'}`}>
              <HugeiconsIcon icon={InformationCircleIcon} size={16} />
            </TooltipTrigger>
            <TooltipContent>
              Supported containers:{' '}
              <span className="font-medium">
                {THUMB_EMBED_VIDEO_FMTS.toString().replaceAll(',', ', ').toUpperCase()}
              </span>
            </TooltipContent>
          </Tooltip>
        </div>
        <div>
          <Switch
            checked={embedThumbnail}
            onCheckedChange={function (value) {
              updatePreference('video.custom.postProcessing.embedThumbnail', value)
            }}
            disabled={isBest || !isThumbnailConfigurable}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <div className={`${isBest && 'opacity-50'} inline-flex items-center gap-1.5`}>
          <span className="font-medium">Embed Chapters</span>
          <Tooltip disabled={isBest}>
            <TooltipTrigger className={`${!isBest && 'cursor-help'}`}>
              <HugeiconsIcon icon={InformationCircleIcon} size={16} />
            </TooltipTrigger>
            <TooltipContent>Adds the video&apos;s timestamped sections</TooltipContent>
          </Tooltip>
        </div>
        <div>
          <Switch
            checked={embedChapters}
            onCheckedChange={function (value) {
              updatePreference('video.custom.postProcessing.embedChapters', value)
            }}
            disabled={isBest}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <div className={`${isBest && 'opacity-50'} font-medium`}>Embed Metadata</div>
        <div>
          <Switch
            checked={embedMetadata}
            onCheckedChange={function (value) {
              updatePreference('video.custom.postProcessing.embedMetadata', value)
            }}
            disabled={isBest}
          />
        </div>
      </div>
    </>
  )
}
