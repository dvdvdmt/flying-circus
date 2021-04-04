import * as PIXI from 'pixi.js'
import {rotationGenerator} from './rotation-generator'
import {ICelestialBodyData, ICelestialVisual} from './types'
import {createCircle} from './utils/create-circle'

export class CelestialBody {
  readonly view: PIXI.Graphics
  private nextPosition: () => PIXI.IPointData
  private info: ICelestialBodyData

  constructor({radius, position, revolution, info}: ICelestialVisual) {
    this.info = info
    this.view = createCircle(radius, info.color)
    this.position = position
    this.nextPosition = rotationGenerator(
      revolution.center,
      position,
      revolution.speed
    )
  }

  set position(point: PIXI.IPointData) {
    this.view.position.set(point.x, point.y)
  }

  move(): void {
    this.position = this.nextPosition()
  }
}
