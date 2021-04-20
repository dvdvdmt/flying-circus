export function clampNumbers(
  arr: number[],
  min: number,
  max: number
): number[] {
  return arr.map((num) => {
    return Math.min(Math.max(num, min), max)
  })
}
