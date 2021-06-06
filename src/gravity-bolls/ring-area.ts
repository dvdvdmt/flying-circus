import * as PIXI from 'pixi.js'

export class RingArea implements PIXI.IHitArea {
  private outerBoundary: PIXI.Circle
  private innerBoundary: PIXI.Circle

  constructor(x: number, y: number, radius: number, thickness: number) {
    this.outerBoundary = new PIXI.Circle(x, y, radius + thickness / 2)
    this.innerBoundary = new PIXI.Circle(x, y, radius - thickness / 2)
  }

  contains(x: number, y: number): boolean {
    return (
      this.outerBoundary.contains(x, y) && !this.innerBoundary.contains(x, y)
    )
  }
}
