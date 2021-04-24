import * as PIXI from 'pixi.js'

export enum CelestialType {
  Star = 'star',
  Planet = 'planet',
}

export interface ICelestialBodyData {
  type: CelestialType
  name: string
  diameter: number // relative to Earth diameter
  distanceFromSun: number // astronomical units (AU)
  rotationSpeedAroundSun: number // days
  color: number
}

export interface ICelestialVisual {
  type: CelestialType
  radius: number
  position: PIXI.IPointData
  revolution: {
    center: PIXI.IPointData
    speed: number
  }
  info: ICelestialBodyData
}
