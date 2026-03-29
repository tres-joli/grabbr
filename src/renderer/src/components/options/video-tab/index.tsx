import { Card, CardContent } from '../../ui/card'
import { Container } from './container'
import { Preset } from './preset'
import { Quality } from './quality'
import { Switches } from './switches'

export function VideoTab() {
  return (
    <Card className="h-full">
      <CardContent className="space-y-6">
        <Preset />
        <Quality />
        <Container />
        <Switches />
      </CardContent>
    </Card>
  )
}
