import * as PIXI from 'pixi.js'
import {rotationGenerator} from './rotation-generator'
import {ICelestialBodyData} from './types'
import {createCircle} from './utils/create-circle'

export class CelestialBody {
  view: PIXI.Graphics
  private rotationGenerator: () => PIXI.IPointData
  constructor(data: ICelestialBodyData) {
    this.view = createCircle(data.gravityCenter, data.radius, data.color)
    this.rotationGenerator = rotationGenerator(
      data.gravityCenter,
      data.position
    )
  }

  move(): void {
    const nextPoint = this.rotationGenerator()
    this.view.position.set(nextPoint.x, nextPoint.y)
  }
}
