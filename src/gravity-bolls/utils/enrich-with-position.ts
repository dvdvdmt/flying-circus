import {ICelestialVisual} from '../types'
import * as PIXI from 'pixi.js'
import {distributeObjects, ILinearObject} from './distribute-objects'

export function enrichWithPosition(
  data: ICelestialVisual[],
  sceneCenter: PIXI.IPointData
): void {
  const maxSceneSize = Math.min(sceneCenter.x, sceneCenter.y)
  const objects = data.map<ILinearObject>(({info, radius}) => ({
    position: info.distanceFromSun,
    size: radius * 2,
  }))
  const positions = distributeObjects(objects, maxSceneSize)
  data.forEach((datum, i) => {
    datum.position = {x: sceneCenter.x, y: sceneCenter.y + positions[i]}
  })
}
