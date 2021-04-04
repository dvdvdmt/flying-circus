import * as PIXI from 'pixi.js'
import {distributeObjects, ILinearObject} from './distribute-objects'
import {solarSystemData} from '../solar-system-data'
import {CelestialBody} from '../celestial-body'
import {PickOptional} from './types'

interface IOptions {
  sceneCenter: PIXI.IPointData
  isSunSmall?: boolean
}

const defaultOptions: PickOptional<IOptions> = {
  isSunSmall: true,
}

/*
 TODO:
 - Reduce Sun radius to give planets more space
 - Introduce the concept of revolution (rotation around external point - Sun)
*/
export function solarSystemFactory(options: IOptions): CelestialBody[] {
  const {sceneCenter} = {...defaultOptions, ...options}
  const maxSceneSize = Math.max(sceneCenter.x, sceneCenter.y)
  const data = solarSystemData()
  const objects = data.map<ILinearObject>(({distanceFromSun, radius}) => ({
    position: distanceFromSun,
    size: radius * 2,
  }))
  const positions = distributeObjects(objects, maxSceneSize)
  return data.map<CelestialBody>((datum, i) => {
    const position = {x: sceneCenter.x, y: sceneCenter.y + positions[i]}
    return new CelestialBody(
      position,
      sceneCenter,
      rotationSpeed(datum.rotationSpeedAroundSun),
      datum
    )
  })
}

function rotationSpeed(days: number): number {
  const animationSpeed = 0.005
  const earthDays = 365
  return (earthDays / days) * animationSpeed
}
