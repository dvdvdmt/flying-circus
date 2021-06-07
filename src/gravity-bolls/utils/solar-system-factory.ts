import * as PIXI from 'pixi.js'
import {solarSystemData} from '../solar-system-data'
import {CelestialBody} from '../celestial-body'
import {PickOptional} from './types'
import {ICelestialBodyData, ICelestialVisual} from '../types'
import {celestialVisualData} from './celestial-visual-data'
import {enrichWithClampedRadius} from './enrich-with-radius'
import {positionByRelativeDistances} from './position-by-relative-distances'
import {PlanetOrbit} from '../planet-orbit'

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
  // positionWithoutOverlap(visualData, sceneCenter)
  positionByRelativeDistances(visualData, sceneCenter)
  return visualData
}

/*
 TODO:
 - Show name of a planet near the cursor when its orbit is hovered.
 - Show additional information about a planet with its preview near the cursor.
 - Express rotation speed in Earth years instead of days.
 - Add Asteroid belt and Kuiper belt.
 - Add scene dragging.
 - Add scene zooming.
*/
export function solarSystemFactory(
  options: IOptions
): {sun: CelestialBody; planets: CelestialBody[]; orbits: PlanetOrbit[]} {
  const settings = {...defaultOptions, ...options}
  const [sun, ...planets] = visualPresentation(solarSystemData(), settings)
  return {
    sun: new CelestialBody(sun),
    planets: planets.map((datum) => new CelestialBody(datum)),
    orbits: planets.map(
      (planet) => new PlanetOrbit(settings.sceneCenter, planet)
    ),
  }
}

function rotationSpeed(days: number): number {
  const animationSpeed = 0.005
  const earthDays = 365
  return (earthDays / days) * animationSpeed
}
