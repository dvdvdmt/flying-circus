import {CelestialType, ICelestialVisual} from '../types'
import {celestialBodyData} from './celestial-body-data'

export function celestialVisualData(data: Partial<ICelestialVisual>) {
  const defaults: ICelestialVisual = {
    type: CelestialType.Planet,
    radius: 0,
    position: {x: 0, y: 0},
    revolution: {
      center: {x: 0, y: 0},
      speed: 0,
    },
    info: celestialBodyData({}),
  }
  return {...defaults, ...data}
}
