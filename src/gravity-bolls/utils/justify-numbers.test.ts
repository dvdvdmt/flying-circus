import {justifyNumbers} from './justify-numbers'

describe(`justifyNumbers`, () => {
  it(`returns empty array on empty input`, () => {
    const result = justifyNumbers([], 0, 10)
    expect(result).toEqual([])
  })

  describe(`weight factor is 0`, () => {
    it.each([[[0], [77], [42]]])(
      `maps single value to the min of the range`,
      (points) => {
        const result = justifyNumbers(points, 5, 10, 0)
        expect(result).toEqual([5])
      }
    )

    it.each([[[0, 0]], [[42, 42]], [[77, 77]]])(
      `maps two values to the min and max of the range`,
      (points) => {
        const result = justifyNumbers(points, 5, 10, 0)
        expect(result).toEqual([5, 10])
      }
    )
  })

  describe(`weight factor is 1`, () => {
    const range = {min: 5, max: 10}
    it.each([[[0], [77], [42]]])(
      `maps single value to the min of the range`,
      (points) => {
        const result = justifyNumbers(points, range.min, range.max, 1)
        expect(result).toEqual([range.min])
      }
    )

    it.each([[[0, 0]], [[42, 42]], [[77, 77]]])(
      `maps two equal values to the min of the range`,
      (points) => {
        const result = justifyNumbers(points, range.min, range.max, 1)
        expect(result).toEqual([range.min, range.min])
      }
    )

    it.each([
      [
        [0, 1],
        [range.min, range.max],
      ],
      [
        [40, 42],
        [range.min, range.max],
      ],
      [
        // What does it mean?
        [42, 40],
        [range.max, range.min],
      ],
    ])(
      `maps two different values to the min and max of the range`,
      (points, expected) => {
        const result = justifyNumbers(points, range.min, range.max, 1)
        expect(result).toEqual(expected)
      }
    )

    it.each([
      [
        [1, 2, 3],
        [0, 5, 10],
      ],
      [
        [0, 40, 100],
        [0, 4, 10],
      ],
      [
        [90, 95, 100],
        [0, 5, 10],
      ],
    ])(`maps numbers to values in range`, (points, expected) => {
      const result = justifyNumbers(points, 0, 10, 1)
      expect(result).toEqual(expected)
    })
  })

  describe(`weight factor is dynamic`, () => {
    const range = {min: 0, max: 10}
    it.each([
      [0, [0, 8, 10], [0, 5, 10]],
      [0.1, [0, 8, 10], [0, 5.3, 10]],
      [0.2, [0, 8, 10], [0, 5.6, 10]],
      [0.3, [0, 8, 10], [0, 5.9, 10]],
      [0.5, [0, 8, 10], [0, 6.5, 10]],
      [0.6, [0, 8, 10], [0, 6.8, 10]],
      [0.7, [0, 8, 10], [0, 7.1, 10]],
      [0.8, [0, 8, 10], [0, 7.4, 10]],
      [0.9, [0, 8, 10], [0, 7.7, 10]],
      [1, [0, 8, 10], [0, 8, 10]],
    ])(
      `distributes numbers inside range according to weight factor %d`,
      (weightFactor, points, expected) => {
        const result = justifyNumbers(
          points,
          range.min,
          range.max,
          weightFactor
        )
        expect(result).toEqual(expected)
      }
    )
  })
})
