import {ICelestialVisual} from '../types'
import {solarSystemVisualDataMap} from '../solar-system-visual-data-map'
import {clampNumbers} from './clamp-numbers'

export function enrichWithPredefinedRadius(data: ICelestialVisual[]): void {
  data.forEach((datum) => {
    datum.radius = solarSystemVisualDataMap[datum.info.name].radius
  })
}

export function enrichWithClampedRadius(
  data: ICelestialVisual[],
  min: number,
  max: number
) {
  const radii = data.map((datum) => datum.radius)
  const clampedRadii = clampNumbers(radii, min, max)
  console.log(`[enrichWithClampedRadius clampedRadii]`, clampedRadii)
  data.forEach((datum, i) => {
    datum.radius = clampedRadii[i]
  })
  return data
}
