import * as PIXI from 'pixi.js'
import {solarSystemData} from '../solar-system-data'
import {CelestialBody} from '../celestial-body'
import {PickOptional} from './types'
import {ICelestialBodyData, ICelestialVisual} from '../types'
import {celestialVisualData} from './celestial-visual-data'
import {enrichWithRadius} from './enrich-with-radius'
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
      info: datum,
    })
  })
  enrichWithRadius(visualData)
  enrichWithPosition(visualData, sceneCenter)
  return visualData
}

/*
 TODO:
 - Clamp planet radii between two values but preserve their relative difference
 - Express rotation speed in Earth years instead of days
 - Align planets by distributing free space evenly
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
