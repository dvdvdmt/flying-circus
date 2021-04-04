import * as PIXI from 'pixi.js'
import {distributeObjects, ILinearObject} from './distribute-objects'
import {solarSystemData} from '../solar-system-data'
import {CelestialBody} from '../celestial-body'
import {PickOptional} from './types'
import {CelestialType, ICelestialBodyData, ICelestialVisual} from '../types'

interface IOptions {
  sceneCenter: PIXI.IPointData
  isSunSmall?: boolean
}

const defaultOptions: PickOptional<IOptions> = {
  isSunSmall: true,
}

function visualPresentation(
  data: ICelestialBodyData[],
  {sceneCenter, isSunSmall}: IOptions
): ICelestialVisual[] {
  const maxSceneSize = Math.min(sceneCenter.x, sceneCenter.y)
  const sunData = data.find(({type}) => type === CelestialType.Star)
  if (sunData && isSunSmall) {
    sunData.radius = 6
  }
  const objects = data.map<ILinearObject>(({distanceFromSun, radius}) => ({
    position: distanceFromSun,
    size: radius * 2,
  }))
  const positions = distributeObjects(objects, maxSceneSize)
  return data.map((datum, i) => {
    return {
      type: datum.type,
      position: {x: sceneCenter.x, y: sceneCenter.y + positions[i]},
      radius: datum.type === CelestialType.Star ? 6 : datum.radius,
      revolution: {
        center: sceneCenter,
        speed: rotationSpeed(datum.rotationSpeedAroundSun),
      },
      info: datum,
    }
  })
}

/*
 TODO:
 - Add diameter value to data that is relative to earth diameter
 - Move radius in pixels from data to visual
*/
export function solarSystemFactory(options: IOptions): CelestialBody[] {
  const settings = {...defaultOptions, ...options}
  const data = visualPresentation(solarSystemData(), settings)

  return data.map((datum, i) => {
    return new CelestialBody(datum)
  })
}

function rotationSpeed(days: number): number {
  const animationSpeed = 0.005
  const earthDays = 365
  return (earthDays / days) * animationSpeed
}
