import * as PIXI from 'pixi.js'
import {ICelestialBodyData} from './types'
import {CelestialBody} from './celestial-body'

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

function solarSystemData(center: PIXI.IPointData): ICelestialBodyData[] {
  const orbitGap = 5
  const sunRadius = 200
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
      position: center,
      gravityCenter: center,
      radius: 5,
      color: 0xb1a7a2,
    },
    {
      name: 'Venus',
      position: center,
      gravityCenter: center,
      radius: 10,
      color: 0xf3d39d,
    },
  ].map(alignBodies)

  function alignBodies(
    data: ICelestialBodyData,
    i: number,
    arr: ICelestialBodyData[]
  ) {
    if (i === 0) {
      return data
    }
    const prevData = arr[i - 1]
    data.position = nextPosition(prevData, data)
    return data
  }

  function nextPosition(
    prevBody: ICelestialBodyData,
    nextBody: ICelestialBodyData
  ) {
    return {
      x: nextBody.position.x,
      y: prevBody.position.y - prevBody.radius - orbitGap - nextBody.radius,
    }
  }
}
