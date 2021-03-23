import * as PIXI from 'pixi.js'
import {CelestialBody} from './celestial-body'
import {solarSystemData} from './solar-system-data'

export function setupScene(app: PIXI.Application): void {
  const sceneCenter: PIXI.IPointData = {
    x: app.view.width / 2,
    y: app.view.height / 2,
  }
  const [sun, ...planets] = solarSystemData(sceneCenter).map(
    (data) => new CelestialBody(data)
  )
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
