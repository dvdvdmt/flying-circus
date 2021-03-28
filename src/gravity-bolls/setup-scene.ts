import * as PIXI from 'pixi.js'
import {CelestialBody} from './celestial-body'
import {solarSystemData} from './solar-system-data'
import {alignBodies} from './utils/align-bodies'

export function setupScene(app: PIXI.Application): void {
  const sceneCenter: PIXI.IPointData = {
    x: app.view.width / 2,
    y: app.view.height / 2,
  }
  const maxSceneSize = Math.max(sceneCenter.x, sceneCenter.y)
  const [sun, ...planets] = alignBodies(
    solarSystemData(sceneCenter),
    maxSceneSize
  ).map((data) => {
    return new CelestialBody(data)
  })
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
