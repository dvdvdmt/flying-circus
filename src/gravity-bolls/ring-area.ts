import * as PIXI from 'pixi.js'

export class RingArea implements PIXI.IHitArea {
  private outerRadius: number
  private innerRadius: number
  private x: number
  private y: number

  constructor(x: number, y: number, radius: number, thickness: number) {
    this.x = x
    this.y = y
    this.outerRadius = radius + thickness / 2
    this.innerRadius = radius - thickness / 2
  }

  contains(x: number, y: number): boolean {
    const xDiff = Math.abs(this.x - x)
    const yDiff = Math.abs(this.y - y)
    const radius = Math.sqrt(xDiff ** 2 + yDiff ** 2)
    return radius <= this.outerRadius && radius >= this.innerRadius
  }
}
