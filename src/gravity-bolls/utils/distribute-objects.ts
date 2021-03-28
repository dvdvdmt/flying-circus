export interface ILinearObject {
  position: number
  size: number
}

export function distributeObjects(
  objects: ILinearObject[],
  length: number
): number[] {
  let maxPosition = objects.reduce(
    (acc, object) => Math.max(acc, object.position),
    0
  )
  if (maxPosition > 0) {
    const lengthPositionedObjects = objects.map((object) => {
      const relativePosition = object.position / maxPosition
      object.position = relativePosition * length
      return object
    })
    return shiftOverlappedObjectsToRight(lengthPositionedObjects)
  }
  return shiftOverlappedObjectsToRight(objects)
}

function shiftOverlappedObjectsToRight(objects: ILinearObject[]): number[] {
  let prevRight: number
  return objects.map(({position, size}, i) => {
    let result = position
    const half = size / 2
    let right = position + half
    const left = position - half
    if (i > 0 && left < prevRight) {
      result = prevRight + half
      right = result + half
    }
    prevRight = right
    return result
  })
}
