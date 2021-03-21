import * as PIXI from 'pixi.js'

export function createCircle(x: number, y: number): PIXI.Graphics {
  const graphics = new PIXI.Graphics()
  graphics.beginFill(0x0000ff)
  graphics.drawCircle(x, y, 250)
  return graphics
}
