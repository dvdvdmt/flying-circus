import * as PIXI from 'pixi.js'

document.addEventListener('DOMContentLoaded', main)

function main(): void {
  const app = createApp()
  const graphics = new PIXI.Graphics()
  graphics.beginFill(0x0000ff)
  graphics.drawCircle(0, 0, 250)
  app.stage.addChild(graphics)
}

function createApp(): PIXI.Application {
  const width = window.innerWidth
  const height = window.innerHeight
  const app = new PIXI.Application({
    width,
    height,
    autoDensity: true,
  })
  document.querySelector('.app')!.appendChild(app.view)
  return app
}
