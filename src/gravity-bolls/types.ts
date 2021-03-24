import * as PIXI from 'pixi.js'

export interface ICelestialBodyData {
  name: string
  position: PIXI.IPointData
  gravityCenter: PIXI.IPointData
  radius: number
  distanceFromSun: number // astronomical units (AU)
  rotationSpeedAroundSun: number // days
  color: number
}
