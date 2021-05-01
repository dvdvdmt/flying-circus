import {ICelestialVisual} from '../types'
import * as PIXI from 'pixi.js'
import {justifyNumbers} from './justify-numbers'

export function positionByRelativeDistances(
  data: ICelestialVisual[],
  sceneCenter: PIXI.IPointData
) {
  const maxSceneSize = Math.min(sceneCenter.x, sceneCenter.y)
  const [sun, ...planets] = data
  sun.position = sceneCenter
  const distances = justifyNumbers(
    planets.map((planet) => planet.info.distanceFromSun),
    sun.radius + planets[0].radius + 5,
    maxSceneSize,
    0.7
  )
  planets.forEach((datum, i) => {
    datum.position = {x: sceneCenter.x, y: sceneCenter.y + distances[i]}
  })
}
