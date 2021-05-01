import * as PIXI from 'pixi.js'
import {solarSystemData} from '../solar-system-data'
import {CelestialBody} from '../celestial-body'
import {PickOptional} from './types'
import {ICelestialBodyData, ICelestialVisual} from '../types'
import {celestialVisualData} from './celestial-visual-data'
import {enrichWithClampedRadius} from './enrich-with-radius'
import {enrichWithPosition} from './enrich-with-position'

interface IOptions {
  sceneCenter: PIXI.IPointData
  isSunSmall?: boolean
}

const defaultOptions: PickOptional<IOptions> = {
  isSunSmall: true,
}

function visualPresentation(
  data: ICelestialBodyData[],
  {sceneCenter}: IOptions
): ICelestialVisual[] {
  const visualData = data.map((datum) => {
    return celestialVisualData({
      type: datum.type,
      revolution: {
        center: sceneCenter,
        speed: rotationSpeed(datum.rotationSpeedAroundSun),
      },
      radius: datum.diameter / 2,
      info: datum,
    })
  })
  enrichWithClampedRadius(visualData, 2, 80)
  enrichWithPosition(visualData, sceneCenter)
  return visualData
}

/*
 TODO:
 - Express rotation speed in Earth years instead of days
 - Align planets by distributing free space evenly.
   This should work like that:
   1. We have relative planet distances from star.
      These are our weights.
   2. We distribute free space between planets according to
      these weights.
   3. We have coefficient (CX) that controls free space
      distribution according to weight.
      CX = 1 - all space is distributed based on weights.
      CX = 0 - space is distributed evenly, weights do nothing.
 - Show orbits
 - Add asteroid belt
*/
export function solarSystemFactory(options: IOptions): CelestialBody[] {
  const settings = {...defaultOptions, ...options}
  const data = visualPresentation(solarSystemData(), settings)

  return data.map((datum) => {
    return new CelestialBody(datum)
  })
}

function rotationSpeed(days: number): number {
  const animationSpeed = 0.005
  const earthDays = 365
  return (earthDays / days) * animationSpeed
}
