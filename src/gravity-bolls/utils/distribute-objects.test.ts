import {distributeObjects} from './distribute-objects'

describe(`distributeObjects()`, () => {
  it(`does nothing on empty array`, () => {
    expect(distributeObjects([], 10)).toHaveLength(0)
  })

  it(`preserves object's position if it is at start`, () => {
    const result = distributeObjects([{position: 0, size: 2}], 10)
    expect(result).toStrictEqual([0])
  })

  it(`preserves objects position if they are in range`, () => {
    const result = distributeObjects(
      [
        {position: 0, size: 2},
        {position: 5, size: 2},
        {position: 10, size: 2},
      ],
      10
    )
    expect(result).toStrictEqual([0, 5, 10])
  })

  it(`shifts overlapping objects to right`, () => {
    const result = distributeObjects(
      [
        {position: 0, size: 4},
        {position: 0, size: 6},
      ],
      10
    )
    expect(result).toStrictEqual([0, 5])
  })

  it(`maps objects positions on length`, () => {
    const result = distributeObjects(
      [
        {position: 0, size: 4},
        {position: 50, size: 4},
        {position: 100, size: 4},
      ],
      10
    )
    expect(result).toStrictEqual([0, 5, 10])
  })

  it(`maps objects positions on length and prevents overlapping`, () => {
    const result = distributeObjects(
      [
        {position: 0, size: 10},
        {position: 50, size: 4},
        {position: 100, size: 4},
      ],
      10
    )
    expect(result).toStrictEqual([0, 7, 11])
  })
})
