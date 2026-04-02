import { usePreferences } from '@renderer/components/providers/preferences'
import { Card, CardContent } from '@renderer/components/ui/card'
import { Switch } from '@renderer/components/ui/switch'
import { VideoCodec } from './video-codec'
// import { Speed } from './speed'
// import { Crf } from './crf'
import { Encoder } from './encoder'

export function EncodingTab() {
  const { preferences, updatePreference } = usePreferences()

  const { enabled } = preferences.video.custom.postProcessing.postProcessorArgs

  return (
    <Card className="h-full">
      <CardContent className="space-y-6">
        <div className="space-y-1">
          {!enabled && (
            <p className="text-destructive text-base mb-4">
              Note: Enabling this setting re-encodes the video, which is resource-intensive, can
              significantly slow down the download process, and may make your PC feel slow/laggy. If
              your PC has low-end specs, it's recommended to leave this option disabled and use an
              online converter instead.
            </p>
          )}
          <div className="font-medium">Encoding</div>
          <Switch
            checked={enabled}
            onCheckedChange={function (value) {
              updatePreference('video.custom.postProcessing.postProcessorArgs.enabled', value)
            }}
          />
        </div>
        {enabled && (
          <>
            <Encoder />
            <VideoCodec />
            {/* <Speed /> */}
            {/* <Crf /> */}
          </>
        )}
      </CardContent>
    </Card>
  )
}
