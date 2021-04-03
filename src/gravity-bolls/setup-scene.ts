import * as PIXI from 'pixi.js'
import {solarSystemFactory} from './utils/solar-system-factory'

export function setupScene(app: PIXI.Application): void {
  const sceneCenter: PIXI.IPointData = {
    x: app.view.width / 2,
    y: app.view.height / 2,
  }
  const [sun, ...planets] = solarSystemFactory({sceneCenter})
  app.stage.addChild(sun.view)
  planets.forEach(({view}) => {
    app.stage.addChild(view)
  })
  app.ticker.add(() => {
    planets.forEach((planet) => {
      planet.move()
    })
  })
}
