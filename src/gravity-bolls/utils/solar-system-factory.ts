import * as PIXI from 'pixi.js'
import {distributeObjects, ILinearObject} from './distribute-objects'
import {solarSystemData} from '../solar-system-data'
import {CelestialBody} from '../celestial-body'

/*
 TODO:
 - Create options object that will configure solar system appearance
*/
export function solarSystemFactory(
  sceneCenter: PIXI.IPointData
): CelestialBody[] {
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
