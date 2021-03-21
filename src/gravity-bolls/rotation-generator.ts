export function rotationGenerator(
  center: {x: number; y: number},
  radius: number,
  speed = 0.01
): () => {x: number; y: number} {
  let step = -1
  return function nextPosition(): {x: number; y: number} {
    step += 1
    const angle = step * speed
    return {x: radius * Math.cos(angle), y: radius * Math.sin(angle)}
  }
}
