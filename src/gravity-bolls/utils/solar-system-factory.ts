import * as PIXI from 'pixi.js'
import {distributeObjects, ILinearObject} from './distribute-objects'
import {solarSystemData} from '../solar-system-data'
import {CelestialBody} from '../celestial-body'
import {PickOptional} from './types'
import {ICelestialBodyData, ICelestialVisual} from '../types'
import {solarSystemVisualDataMap} from '../solar-system-visual-data-map'

interface IOptions {
  sceneCenter: PIXI.IPointData
  isSunSmall?: boolean
}

const defaultOptions: PickOptional<IOptions> = {
  isSunSmall: true,
}

function visualPresentation(
  data: ICelestialBodyData[],
  {sceneCenter}: IOptions
): ICelestialVisual[] {
  const maxSceneSize = Math.min(sceneCenter.x, sceneCenter.y)
  const visualData = data.map((datum) => {
    return {
      type: datum.type,
      radius: solarSystemVisualDataMap[datum.name].radius,
      revolution: {
        center: sceneCenter,
        speed: rotationSpeed(datum.rotationSpeedAroundSun),
      },
      info: datum,
    }
  })
  const objects = visualData.map<ILinearObject>(({info, radius}) => ({
    position: info.distanceFromSun,
    size: radius * 2,
  }))
  const positions = distributeObjects(objects, maxSceneSize)
  return visualData.map((datum, i) => {
    return {
      ...datum,
      position: {x: sceneCenter.x, y: sceneCenter.y + positions[i]},
    }
  })
}

/*
 TODO:
 - Express rotation speed in Earth years instead of days
 - Align planets by distributing free space evenly
*/
export function solarSystemFactory(options: IOptions): CelestialBody[] {
  const settings = {...defaultOptions, ...options}
  const data = visualPresentation(solarSystemData(), settings)

  return data.map((datum) => {
    return new CelestialBody(datum)
  })
}

function rotationSpeed(days: number): number {
  const animationSpeed = 0.005
  const earthDays = 365
  return (earthDays / days) * animationSpeed
}
