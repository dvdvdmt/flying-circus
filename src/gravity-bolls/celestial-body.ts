import * as PIXI from 'pixi.js'
import {rotationGenerator} from './rotation-generator'
import {ICelestialBodyData} from './types'
import {createCircle} from './utils/create-circle'

export class CelestialBody {
  readonly view: PIXI.Graphics
  private nextPosition: () => PIXI.IPointData
  private info: ICelestialBodyData

  constructor(
    initialPosition: PIXI.IPointData,
    rotationCenter: PIXI.IPointData,
    rotationSpeed: number,
    info: ICelestialBodyData
  ) {
    this.info = info
    this.view = createCircle(info.radius, info.color)
    this.position = initialPosition
    this.nextPosition = rotationGenerator(
      rotationCenter,
      initialPosition,
      rotationSpeed
    )
  }

  set position(point: PIXI.IPointData) {
    this.view.position.set(point.x, point.y)
  }

  move(): void {
    this.position = this.nextPosition()
  }
}
