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
  if (numbers.length === 1) {
    return numbers.map((num) => {
      return clamp(num, minBoundary, maxBoundary)
    })
  }
  const boundarySpan = maxBoundary - minBoundary
  const maxNumber = Math.max(...numbers)
  const minNumber = Math.min(...numbers)
  const numberSpan = maxNumber - minNumber
  return numbers.map((num) => {
    const shiftedNum = num - minNumber
    return minBoundary + boundarySpan * (shiftedNum / numberSpan)
  })
}
