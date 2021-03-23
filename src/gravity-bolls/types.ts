import * as PIXI from 'pixi.js'

export interface ICelestialBodyData {
  name: string
  position: PIXI.IPointData
  gravityCenter: PIXI.IPointData
  radius: number
  rotationSpeedAroundSun: number
  color: number
}
