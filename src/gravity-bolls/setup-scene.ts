import * as PIXI from 'pixi.js'
import {solarSystemFactory} from './utils/solar-system-factory'

export function setupScene(app: PIXI.Application): void {
  const sceneCenter: PIXI.IPointData = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  }
  const {sun, planets, orbits} = solarSystemFactory({sceneCenter})
  app.stage.addChild(sun.view)
  planets.forEach((planet) => {
    app.stage.addChild(planet.view)
  })
  orbits.forEach((orbit) => {
    app.stage.addChild(orbit.view)
  })
  app.ticker.add(() => {
    planets.forEach((planet) => {
      planet.move()
    })
  })
}
