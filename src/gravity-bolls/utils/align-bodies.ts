import {ICelestialBodyData} from '../types'
import {distributeObjects, ILinearObject} from './distribute-objects'

export function alignBodies(
  bodies: ICelestialBodyData[],
  maxDistance: number
): ICelestialBodyData[] {
  const objects = bodies.map<ILinearObject>(({distanceFromSun, radius}) => ({
    position: distanceFromSun,
    size: radius * 2,
  }))
  const positions = distributeObjects(objects, maxDistance)

  return bodies.map((body, i) => {
    body.position.y += positions[i]
    return body
  })
}
