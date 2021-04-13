import {CelestialType, ICelestialBodyData} from '../types'

export function celestialBodyData(data: Partial<ICelestialBodyData>) {
  const defaults: ICelestialBodyData = {
    type: CelestialType.Planet,
    radius: 0,
    diameter: 0,
    rotationSpeedAroundSun: 0,
    distanceFromSun: 0,
    color: 0,
    name: '',
  }
  return {...defaults, ...data}
}
