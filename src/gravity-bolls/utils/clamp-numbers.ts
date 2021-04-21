function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max)
}

export function clampNumbers(
  numbers: number[],
  minBoundary: number,
  maxBoundary: number
): number[] {
  if (numbers.length === 0) {
    return numbers
  }
  const boundarySpan = maxBoundary - minBoundary
  const maxNumber = Math.max(...numbers)
  const minNumber = Math.min(...numbers)
  const numberSpan = maxNumber - minNumber
  return numbers.map((num) => {
    if (numberSpan === 0) {
      return minBoundary
    }
    const relativeNumberSize = (num - minNumber) / numberSpan
    return minBoundary + boundarySpan * relativeNumberSize
  })
}
