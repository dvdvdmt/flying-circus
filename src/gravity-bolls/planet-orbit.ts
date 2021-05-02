import * as PIXI from 'pixi.js'

export class PlanetOrbit {
  readonly view: PIXI.Graphics

  constructor(position: PIXI.IPointData, color: number, radius: number) {
    this.view = PlanetOrbit.createHollowCircle(color, radius)
    this.position = position
  }

  private static createHollowCircle(
    color: number,
    radius: number
  ): PIXI.Graphics {
    const graphics = new PIXI.Graphics()
    graphics.lineStyle(1, color)
    graphics.drawCircle(0, 0, radius)
    return graphics
  }

  set position(point: PIXI.IPointData) {
    this.view.position.set(point.x, point.y)
  }
}
