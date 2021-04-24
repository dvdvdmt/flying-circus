import {CelestialType, ICelestialBodyData} from './types'

export function solarSystemData(): ICelestialBodyData[] {
  return [
    {
      type: CelestialType.Star,
      name: 'Sun',
      diameter: 109.18,
      distanceFromSun: 0,
      rotationSpeedAroundSun: 0,
      color: 0xfdffa3,
    },
    {
      type: CelestialType.Planet,
      name: 'Mercury',
      diameter: 0.38,
      distanceFromSun: 0.4,
      rotationSpeedAroundSun: 88,
      color: 0xb1a7a2,
    },
    {
      type: CelestialType.Planet,
      name: 'Venus',
      diameter: 0.95,
      distanceFromSun: 0.7,
      rotationSpeedAroundSun: 225,
      color: 0xf3d39d,
    },
    {
      type: CelestialType.Planet,
      name: 'Earth',
      diameter: 1,
      distanceFromSun: 1,
      rotationSpeedAroundSun: 365,
      color: 0x8fabd4,
    },
    {
      type: CelestialType.Planet,
      name: 'Mars',
      diameter: 0.53,
      distanceFromSun: 1.5,
      rotationSpeedAroundSun: 687,
      color: 0xb07764,
    },
    {
      type: CelestialType.Planet,
      name: 'Jupiter',
      diameter: 11.2,
      distanceFromSun: 5.2,
      rotationSpeedAroundSun: 4332,
      color: 0xa56956,
    },
    {
      type: CelestialType.Planet,
      name: 'Saturn',
      diameter: 9.45,
      distanceFromSun: 9.5,
      rotationSpeedAroundSun: 10759,
      color: 0xe9c197,
    },
    {
      type: CelestialType.Planet,
      name: 'Uranus',
      diameter: 4.01,
      distanceFromSun: 19.2,
      rotationSpeedAroundSun: 30688,
      color: 0x96b6c1,
    },
    {
      type: CelestialType.Planet,
      name: 'Triton',
      diameter: 3.88,
      distanceFromSun: 30,
      rotationSpeedAroundSun: 60182,
      color: 0x5285b4,
    },
  ]
}
