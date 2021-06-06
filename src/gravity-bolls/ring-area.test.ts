import {RingArea} from './ring-area'

describe(`RingArea`, () => {
  it(`detects an inside point`, () => {
    const result = new RingArea(0, 0, 10, 4).contains(9, 0)
    expect(result).toBeTruthy()
  })

  it(`detects an outside point (in hole)`, () => {
    const result = new RingArea(0, 0, 10, 4).contains(5, 0)
    expect(result).toBeFalsy()
  })

  it(`detects an outside point`, () => {
    const result = new RingArea(0, 0, 10, 4).contains(13, 0)
    expect(result).toBeFalsy()
  })

  it(`detects a point on the edge`, () => {
    const result = new RingArea(0, 0, 10, 4).contains(12, 0)
    expect(result).toBeTruthy()
  })
})
