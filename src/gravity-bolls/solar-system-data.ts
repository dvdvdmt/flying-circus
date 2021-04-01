import * as PIXI from 'pixi.js'
import {ICelestialBodyData} from './types'

export function solarSystemData(center: PIXI.IPointData): ICelestialBodyData[] {
  return [
    {
      name: 'Sun',
      position: {...center},
      gravityCenter: {...center},
      radius: 200,
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
    {
      name: 'Jupiter',
      position: {...center},
      gravityCenter: {...center},
      radius: 80,
      distanceFromSun: 5.2,
      rotationSpeedAroundSun: rotationSpeed(4332),
      color: 0xa56956,
    },
    {
      name: 'Saturn',
      position: {...center},
      gravityCenter: {...center},
      radius: 50,
      distanceFromSun: 9.5,
      rotationSpeedAroundSun: rotationSpeed(10759),
      color: 0xe9c197,
    },
    {
      name: 'Uranus',
      position: {...center},
      gravityCenter: {...center},
      radius: 20,
      distanceFromSun: 19.2,
      rotationSpeedAroundSun: rotationSpeed(30688),
      color: 0x96b6c1,
    },
  ]
}

function rotationSpeed(days: number): number {
  const animationSpeed = 0.005
  const earthDays = 365
  return (earthDays / days) * animationSpeed
}
