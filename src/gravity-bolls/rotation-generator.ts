export function rotationGenerator(
  center: {x: number; y: number},
  radius: number,
  angleIncrement = 0.01
): () => {x: number; y: number} {
  let angle = -angleIncrement
  return function nextPosition(): {x: number; y: number} {
    angle += angleIncrement
    return {x: radius * Math.cos(angle), y: radius * Math.sin(angle)}
  }
}
