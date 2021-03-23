import * as PIXI from 'pixi.js'
import {ICelestialBodyData} from './types'

export function solarSystemData(center: PIXI.IPointData): ICelestialBodyData[] {
  const orbitGap = 5
  const sunRadius = 200
  const earthRotationSpeedAroundSun = 0.005 // 365 days
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
      radius: 5,
      rotationSpeedAroundSun: earthRotationSpeedAroundSun * 4.147727273, // 88 days
      color: 0xb1a7a2,
    },
    {
      name: 'Venus',
      position: center,
      gravityCenter: center,
      radius: 10,
      rotationSpeedAroundSun: earthRotationSpeedAroundSun * 1.624388073, // 224.7 days
      color: 0xf3d39d,
    },
    {
      name: 'Earth',
      position: center,
      gravityCenter: center,
      radius: 12,
      rotationSpeedAroundSun: earthRotationSpeedAroundSun,
      color: 0x8fabd4,
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
