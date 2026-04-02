import { HugeiconsIcon } from '@hugeicons/react'
import { usePreferences } from './providers/preferences'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { FlimSlateIcon, MusicNote04Icon } from '@hugeicons/core-free-icons'
import { MediaTypeEnum } from '../../../shared/constants/preferences'

export function Type() {
  const { preferences, updatePreference } = usePreferences()

  const { type } = preferences

  return (
    <ToggleGroup
      value={[type]}
      onValueChange={function ([value]) {
        updatePreference('type', value as MediaTypeEnum)
      }}
    >
      <ToggleGroupItem value="audio">
        <HugeiconsIcon icon={MusicNote04Icon} className="mr-0.5" />
        Audio
      </ToggleGroupItem>
      <ToggleGroupItem value="video">
        <HugeiconsIcon icon={FlimSlateIcon} className="size-4.5 mr-0.5" />
        Video
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
