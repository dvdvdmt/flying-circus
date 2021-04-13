import {ICelestialVisual} from '../types'
import {solarSystemVisualDataMap} from '../solar-system-visual-data-map'

export function enrichWithRadius(data: ICelestialVisual[]): void {
  data.forEach((datum) => {
    datum.radius = solarSystemVisualDataMap[datum.info.name].radius
  })
}
