import * as PIXI from 'pixi.js'
import {rotationGenerator} from './rotation-generator'
import {ICelestialBodyData} from './types'
import {createCircle} from './utils/create-circle'

export class CelestialBody {
  view: PIXI.Graphics
  private nextPosition: () => PIXI.IPointData

  constructor(data: ICelestialBodyData) {
    this.view = createCircle(data.radius, data.color)
    this.position = data.position
    this.nextPosition = rotationGenerator(
      data.gravityCenter,
      data.position,
      data.rotationSpeedAroundSun
    )
  }

  set position(point: PIXI.IPointData) {
    this.view.position.set(point.x, point.y)
  }

  move(): void {
    this.position = this.nextPosition()
  }
}
