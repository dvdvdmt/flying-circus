import * as PIXI from 'pixi.js'
import {ICelestialBodyData} from './types'

export function solarSystemData(center: PIXI.IPointData): ICelestialBodyData[] {
  const orbitGap = 5
  const sunRadius = 200
  return [
    {
      name: 'Sun',
      position: center,
      gravityCenter: center,
      radius: sunRadius,
      rotationSpeedAroundSun: 0,
      color: 0xfdffa3,
    },
    {
      name: 'Mercury',
      position: center,
      gravityCenter: center,
      radius: 4,
      rotationSpeedAroundSun: rotationSpeed(88),
      color: 0xb1a7a2,
    },
    {
      name: 'Venus',
      position: center,
      gravityCenter: center,
      radius: 10,
      rotationSpeedAroundSun: rotationSpeed(225),
      color: 0xf3d39d,
    },
    {
      name: 'Earth',
      position: center,
      gravityCenter: center,
      radius: 12,
      rotationSpeedAroundSun: rotationSpeed(365),
      color: 0x8fabd4,
    },
    {
      name: 'Mars',
      position: center,
      gravityCenter: center,
      radius: 6,
      rotationSpeedAroundSun: rotationSpeed(687),
      color: 0xb07764,
    },
  ].map(alignBodies)

  function alignBodies(
    data: ICelestialBodyData,
    i: number,
    arr: ICelestialBodyData[]
  ) {
    if (i === 0) {
      return data
    }
    const prevData = arr[i - 1]
    data.position = nextPosition(prevData, data)
    return data
  }

  function nextPosition(
    prevBody: ICelestialBodyData,
    nextBody: ICelestialBodyData
  ) {
    return {
      x: nextBody.position.x,
      y: prevBody.position.y - prevBody.radius - orbitGap - nextBody.radius,
    }
  }
}

function rotationSpeed(days: number): number {
  const animationSpeed = 0.005
  const earthDays = 365
  return (earthDays / days) * animationSpeed
}
