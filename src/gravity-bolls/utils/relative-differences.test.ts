import {relativeDifferences} from './relative-differences'

describe(`relativeDifferences`, () => {
  it(`returns empty array on empty input`, () => {
    const result = relativeDifferences([])
    expect(result).toEqual([])
  })

  it.each([
    [[1], [0]],
    [
      [0, 0],
      [0, 0],
    ],
    [
      [1, 1, 1],
      [0, 0, 0],
    ],
  ])('returns zeroes if there are no differences', (numbers, expected) => {
    const result = relativeDifferences(numbers)
    expect(result).toEqual(expected)
  })

  it.each([
    [
      [1, 2],
      [0, 1],
    ],
    [
      [100, 200],
      [0, 1],
    ],
    [
      [1, 2, 3],
      [0, 0.5, 1],
    ],
    [
      [0, 10, 40, 60, 85, 100],
      [0, 0.1, 0.4, 0.6, 0.85, 1],
    ],
  ])(`calculates relative differences`, (numbers, expected) => {
    const result = relativeDifferences(numbers)
    expect(result).toEqual(expected)
  })
})
