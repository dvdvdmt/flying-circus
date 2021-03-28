import * as PIXI from 'pixi.js'
import {ICelestialBodyData} from './types'

export function solarSystemData(center: PIXI.IPointData): ICelestialBodyData[] {
  const sunRadius = 200
  return [
    {
      name: 'Sun',
      position: {...center},
      gravityCenter: {...center},
      radius: sunRadius,
      distanceFromSun: 0,
      rotationSpeedAroundSun: 0,
      color: 0xfdffa3,
    },
    {
      name: 'Mercury',
      position: {...center},
      gravityCenter: {...center},
      radius: 4,
      distanceFromSun: 0.4,
      rotationSpeedAroundSun: rotationSpeed(88),
      color: 0xb1a7a2,
    },
    {
      name: 'Venus',
      position: {...center},
      gravityCenter: {...center},
      radius: 10,
      distanceFromSun: 0.7,
      rotationSpeedAroundSun: rotationSpeed(225),
      color: 0xf3d39d,
    },
    {
      name: 'Earth',
      position: {...center},
      gravityCenter: {...center},
      radius: 12,
      distanceFromSun: 1,
      rotationSpeedAroundSun: rotationSpeed(365),
      color: 0x8fabd4,
    },
    {
      name: 'Mars',
      position: {...center},
      gravityCenter: {...center},
      radius: 6,
      distanceFromSun: 1.5,
      rotationSpeedAroundSun: rotationSpeed(687),
      color: 0xb07764,
    },
  ]
}

function rotationSpeed(days: number): number {
  const animationSpeed = 0.005
  const earthDays = 365
  return (earthDays / days) * animationSpeed
}
