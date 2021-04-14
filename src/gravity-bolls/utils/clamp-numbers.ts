export function clampNumbers(arr: number[], max: number, min = 0): number[] {
  return arr.map((num) => {
    return Math.min(Math.max(num, min), max)
  })
}
