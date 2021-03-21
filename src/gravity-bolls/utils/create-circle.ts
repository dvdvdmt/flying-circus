import * as PIXI from 'pixi.js'

export function createCircle(
  point: PIXI.IPointData,
  radius: number,
  color = 0x0000ff
): PIXI.Graphics {
  const graphics = new PIXI.Graphics()
  graphics.beginFill(color)
  graphics.drawCircle(point.x, point.y, radius)
  return graphics
}
