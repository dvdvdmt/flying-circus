import * as PIXI from 'pixi.js'
import {ICelestialBodyData} from './types'
import {CelestialBody} from './celestial-body'

export function setupScene(app: PIXI.Application): void {
  const sceneCenter: PIXI.IPointData = {
    x: app.view.width / 2,
    y: app.view.height / 2,
  }
  const [sun, mercury, ...planets] = solarSystemData(sceneCenter).map(
    (data) => new CelestialBody(data)
  )
  app.stage.addChild(sun.view)
  app.stage.addChild(mercury.view)
  app.ticker.add(() => {
    mercury.move()
  })
}

function solarSystemData(center: PIXI.IPointData): ICelestialBodyData[] {
  const orbitGap = 5
  const sunRadius = 200
  const mercuryRadius = 5
  return [
    {
      name: 'Sun',
      position: center,
      gravityCenter: center,
      radius: sunRadius,
      color: 0xfdffa3,
    },
    {
      name: 'Mercury',
      position: {...center, y: center.y - sunRadius - orbitGap - mercuryRadius},
      gravityCenter: center,
      radius: mercuryRadius,
      color: 0xb1a7a2,
    },
  ]
}
