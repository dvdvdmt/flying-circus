import {clampNumbers} from './clamp-numbers'

describe(`clampNumbers`, () => {
  it(`returns empty array if there are no numbers`, () => {
    const result = clampNumbers([], 0, 10)
    expect(result).toHaveLength(0)
  })

  it(`maps single value to minimum`, () => {
    const result = clampNumbers([777], 0, 10)
    expect(result).toEqual([0])
  })

  it(`maps several equal values to minimum`, () => {
    const result = clampNumbers([1, 1, 1], 0, 10)
    expect(result).toEqual([0, 0, 0])
  })

  it(`maps two different values to min and max boundaries`, () => {
    const result = clampNumbers([1, 2], 5, 10)
    expect(result).toEqual([5, 10])
  })

  it(`preserves original values if min and max boundaries are equal to min and max numbers`, () => {
    const result = clampNumbers([1, 2, 3], 1, 3)
    expect(result).toEqual([1, 2, 3])
  })

  it(`translates numbers to specified range`, () => {
    const result = clampNumbers([1, 2, 3], 111, 113)
    expect(result).toEqual([111, 112, 113])
  })

  it(`scales numbers to fit specified range`, () => {
    const result = clampNumbers([1, 2, 3], 10, 30)
    expect(result).toEqual([10, 20, 30])
  })
})
