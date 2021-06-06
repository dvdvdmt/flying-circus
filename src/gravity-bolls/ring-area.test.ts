import {RingArea} from './ring-area'

describe(`RingArea`, () => {
  it(`detects a point inside`, () => {
    const result = new RingArea(0, 0, 10, 4).contains(9, 0)
    expect(result).toBeTruthy()
  })

  it(`detects a point outside (in hole)`, () => {
    const result = new RingArea(0, 0, 10, 4).contains(5, 0)
    expect(result).toBeFalsy()
  })

  it(`detects a point outside`, () => {
    const result = new RingArea(0, 0, 10, 4).contains(13, 0)
    expect(result).toBeFalsy()
  })

  it(`detects a point on the external edge`, () => {
    const result = new RingArea(0, 0, 10, 4).contains(12, 0)
    expect(result).toBeTruthy()
  })

  it(`detects a point on the internal edge`, () => {
    const result = new RingArea(0, 0, 10, 4).contains(8, 0)
    expect(result).toBeTruthy()
  })
})
