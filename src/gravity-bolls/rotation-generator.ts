import * as PIXI from 'pixi.js'
export function rotationGenerator(
  center: PIXI.IPointData,
  initialPosition: PIXI.IPointData,
  angleIncrement = 0.01
): () => PIXI.IPointData {
  const radius = getLength(center, initialPosition)
  let angle = -angleIncrement
  return function nextPosition(): {x: number; y: number} {
    angle += angleIncrement
    return {x: radius * Math.cos(angle), y: radius * Math.sin(angle)}
  }
}

function getLength(pointA: PIXI.IPointData, pointB: PIXI.IPointData): number {
  //  length = sqrt(a^2 + b^2)
  const ax = Math.abs(pointA.x)
  const ay = Math.abs(pointA.y)
  const bx = Math.abs(pointB.x)
  const by = Math.abs(pointB.y)
  return Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2))
}
