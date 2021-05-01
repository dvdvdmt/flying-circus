import {relativeDifferences} from './relative-differences'

export function justifyNumbers(
  numbers: number[],
  min: number,
  max: number,
  weightInfluence: number = 0
): number[] {
  if (numbers.length === 0) {
    return numbers
  }
  const rangeDistance = max - min
  const equalDistanceBetweenNumbers =
    numbers.length === 1 ? 0 : rangeDistance / (numbers.length - 1)
  const weights = relativeDifferences(numbers)
  return numbers.map((number, i) => {
    const numberValue = equalDistanceBetweenNumbers * i
    return (
      min +
      rangeDistance * weights[i] * weightInfluence +
      numberValue * (1 - weightInfluence)
    )
  })
}
