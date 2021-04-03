import {ICelestialBodyData} from './types'

export function solarSystemData(): ICelestialBodyData[] {
  return [
    {
      name: 'Sun',
      radius: 200,
      distanceFromSun: 0,
      rotationSpeedAroundSun: 0,
      color: 0xfdffa3,
    },
    {
      name: 'Mercury',
      radius: 4,
      distanceFromSun: 0.4,
      rotationSpeedAroundSun: 88,
      color: 0xb1a7a2,
    },
    {
      name: 'Venus',
      radius: 10,
      distanceFromSun: 0.7,
      rotationSpeedAroundSun: 225,
      color: 0xf3d39d,
    },
    {
      name: 'Earth',
      radius: 12,
      distanceFromSun: 1,
      rotationSpeedAroundSun: 365,
      color: 0x8fabd4,
    },
    {
      name: 'Mars',
      radius: 6,
      distanceFromSun: 1.5,
      rotationSpeedAroundSun: 687,
      color: 0xb07764,
    },
    {
      name: 'Jupiter',
      radius: 80,
      distanceFromSun: 5.2,
      rotationSpeedAroundSun: 4332,
      color: 0xa56956,
    },
    {
      name: 'Saturn',
      radius: 50,
      distanceFromSun: 9.5,
      rotationSpeedAroundSun: 10759,
      color: 0xe9c197,
    },
    {
      name: 'Uranus',
      radius: 20,
      distanceFromSun: 19.2,
      rotationSpeedAroundSun: 30688,
      color: 0x96b6c1,
    },
    {
      name: 'Triton',
      radius: 16,
      distanceFromSun: 30,
      rotationSpeedAroundSun: 60182,
      color: 0x5285b4,
    },
  ]
}
