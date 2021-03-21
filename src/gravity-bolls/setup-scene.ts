import * as PIXI from 'pixi.js'
import {rotationGenerator} from './rotation-generator'
import {createCircle} from './utils/create-circle'

export function setupScene(app: PIXI.Application): void {
  const circle = createCircle(app.view.width / 2, app.view.height / 2)
  app.stage.addChild(circle)
  const nextRotatePosition = rotationGenerator(circle.position, 200)
  app.ticker.add(() => {
    const nextPoint = nextRotatePosition()
    circle.position.set(nextPoint.x, nextPoint.y)
  })
}
