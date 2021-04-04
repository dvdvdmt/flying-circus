export enum CelestialType {
  Star = 'star',
  Planet = 'planet',
}

export interface ICelestialBodyData {
  type: CelestialType
  name: string
  radius: number
  distanceFromSun: number // astronomical units (AU)
  rotationSpeedAroundSun: number // days
  color: number
}
