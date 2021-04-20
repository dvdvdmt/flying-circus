import {clampNumbers} from './clamp-numbers'

describe(`clampNumbers`, () => {
  it(`returns empty array if there are no numbers`, () => {
    const result = clampNumbers([], 0, 10)
    expect(result).toHaveLength(0)
  })

  it(`doesn't change a single value if it is inside the range`, () => {
    const result = clampNumbers([1], 0, 10)
    expect(result).toEqual([1])
  })

  it(`clamps single value if it is smaller than minimum`, () => {
    const result = clampNumbers([1], 5, 10)
    expect(result).toEqual([5])
  })

  it(`clamps single value if it is bigger than maximum`, () => {
    const result = clampNumbers([11], 5, 10)
    expect(result).toEqual([10])
  })

  it(`clamps values without scaling`, () => {
    const result = clampNumbers([1, 2, 3], 1, 3)
    expect(result).toEqual([1, 2, 3])
  })

  it(`clamps values and scale them`, () => {
    const result = clampNumbers([1, 2, 3], 10, 30)
    expect(result).toEqual([10, 20, 30])
  })
})
