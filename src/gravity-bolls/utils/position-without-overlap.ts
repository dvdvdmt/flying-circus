import {ICelestialVisual} from '../types'
import * as PIXI from 'pixi.js'
import {distributeObjects, ILinearObject} from './distribute-objects'

export function positionWithoutOverlap(
  data: ICelestialVisual[],
  sceneCenter: PIXI.IPointData
): void {
  const objects = data.map<ILinearObject>(({info, radius}) => ({
    position: info.distanceFromSun,
    size: radius * 2,
  }))
  const maxSceneSize = Math.min(sceneCenter.x, sceneCenter.y)
  const positions = distributeObjects(objects, maxSceneSize)
  data.forEach((datum, i) => {
    datum.position = {x: sceneCenter.x, y: sceneCenter.y + positions[i]}
  })
}
