import * as PIXI from 'pixi.js'
import {ICelestialBodyData} from '../types'
import {distributeObjects, ILinearObject} from './distribute-objects'
import {solarSystemData} from '../solar-system-data'

/*
 TODO:
 - Separate real data from its visual interpretation
 - Create options object that will configure solar system visual interpretation
*/
export function solarSystemVisualData(
  sceneCenter: PIXI.IPointData
): ICelestialBodyData[] {
  const maxSceneSize = Math.max(sceneCenter.x, sceneCenter.y)
  const data = solarSystemData(sceneCenter)
  const objects = data.map<ILinearObject>(({distanceFromSun, radius}) => ({
    position: distanceFromSun,
    size: radius * 2,
  }))
  const positions = distributeObjects(objects, maxSceneSize)

  return data.map((body, i) => {
    body.position.y += positions[i]
    return body
  })
}
