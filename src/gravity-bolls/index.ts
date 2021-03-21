import * as PIXI from 'pixi.js'
import {rotationGenerator} from './rotation-generator'

document.addEventListener('DOMContentLoaded', main)

function createCircle(x: number, y: number): PIXI.Graphics {
  const graphics = new PIXI.Graphics()
  graphics.beginFill(0x0000ff)
  graphics.drawCircle(x, y, 250)
  return graphics
}

function main(): void {
  const app = createApp()
  const circle = createCircle(app.view.width / 2, app.view.height / 2)
  app.stage.addChild(circle)
  const nextRotatePosition = rotationGenerator(circle.position, 200)
  app.ticker.add(() => {
    const nextPoint = nextRotatePosition()
    circle.position.set(nextPoint.x, nextPoint.y)
  })
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
