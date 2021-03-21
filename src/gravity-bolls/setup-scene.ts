import * as PIXI from 'pixi.js'
import {createCircle} from './utils/create-circle'
import {rotationGenerator} from './rotation-generator'

export function setupScene(app: PIXI.Application): void {
  const sceneCenter: PIXI.IPointData = {
    x: app.view.width / 2,
    y: app.view.height / 2,
  }
  const [sun, mercury, ...planets] = solarSystemData(sceneCenter)
  const sunCircle = createCircle(sun.gravityCenter, sun.radius, sun.color)
  app.stage.addChild(sunCircle)
  const mercuryCircle = createCircle(
    mercury.gravityCenter,
    mercury.radius,
    mercury.color
  )
  app.stage.addChild(mercuryCircle)
  const nextRotatePosition = rotationGenerator(sceneCenter, mercury.position)
  app.ticker.add(() => {
    const nextPoint = nextRotatePosition()
    mercuryCircle.position.set(nextPoint.x, nextPoint.y)
  })
}

interface ICelestialBody {
  name: string
  position: PIXI.IPointData
  gravityCenter: PIXI.IPointData
  radius: number
  color: number
}

function solarSystemData(center: PIXI.IPointData): ICelestialBody[] {
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
