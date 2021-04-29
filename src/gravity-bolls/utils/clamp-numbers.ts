import {relativeDifferences} from './relative-differences'

export function clampNumbers(
  numbers: number[],
  minBoundary: number,
  maxBoundary: number
): number[] {
  const rangeDistance = maxBoundary - minBoundary
  return relativeDifferences(numbers).map((relativeDifference) => {
    return minBoundary + rangeDistance * relativeDifference
  })
}
