import * as PIXI from 'pixi.js'
import {RingArea} from './ring-area'
import {ICelestialVisual} from './types'

export class PlanetOrbit {
  static readonly opacityDefault = 0.2
  static readonly opacityHovered = 0.8
  readonly view: PIXI.Graphics

  constructor(center: PIXI.IPointData, planet: ICelestialVisual) {
    const orbitRadius = planet.position.x - center.x
    this.view = PlanetOrbit.createOrbit(
      planet.info.color,
      orbitRadius,
      planet.radius * 2
    )
    this.position = center
    this.initInteractions()
  }

  set position(point: PIXI.IPointData) {
    this.view.position.set(point.x, point.y)
  }

  private static createOrbit(
    color: number,
    radius: number,
    thickness: number
  ): PIXI.Graphics {
    const result = new PIXI.Graphics()
    result.lineStyle(1, color)
    result.drawCircle(0, 0, radius)
    result.interactive = true
    result.hitArea = new RingArea(0, 0, radius, thickness)
    result.alpha = PlanetOrbit.opacityDefault
    return result
  }

  private initInteractions() {
    this.view.on('mouseover', () => {
      this.view.alpha = PlanetOrbit.opacityHovered
    })
    this.view.on('mouseout', () => {
      this.view.alpha = PlanetOrbit.opacityDefault
    })
  }
}
