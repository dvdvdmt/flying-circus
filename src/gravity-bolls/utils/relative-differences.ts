export function relativeDifferences(numbers: number[]): number[] {
  if (numbers.length === 0) {
    return numbers
  }
  const maxNumber = Math.max(...numbers)
  const minNumber = Math.min(...numbers)
  const maxDifference = maxNumber - minNumber
  return numbers.map((number) => {
    if (maxDifference === 0) {
      return 0
    }
    return (number - minNumber) / maxDifference
  })
}
