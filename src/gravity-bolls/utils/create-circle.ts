import * as PIXI from 'pixi.js'

export function createCircle(radius: number, color = 0x0000ff): PIXI.Graphics {
  const graphics = new PIXI.Graphics()
  graphics.beginFill(color)
  // NOTE: Drawing happens in local coordinates of the child.
  // It is better to draw a circle in the center of coordinate system.
  // The placement of a child on a scene (parent) is regulated with its 'position' property.
  graphics.drawCircle(0, 0, radius)
  return graphics
}
