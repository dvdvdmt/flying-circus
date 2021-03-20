/* eslint-disable no-await-in-loop, max-len */
import initPlot from './plot'
import encodeImage, {Image} from './encode-image'

const image: Image = {
  // prettier-ignore
  data: [
    [1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0],
  ],
  bottomPadding: 3,
  rightPadding: 3,
}

function generateArray(): number[] {
  return Array.from(new Array(50), () => Math.random())
}

window.addEventListener('load', () => {
  const chartEl = document.querySelector('.chart') as SVGElement
  const chartWidth = Number.parseInt(getComputedStyle(chartEl).width!, 10)
  const chartHeight = chartWidth
  chartEl.style.height = `${chartHeight}px`
  const plot = initPlot(chartEl, chartWidth, chartHeight)
  let array: number[] = generateArray()
  let state = [...array]
  let encodedImage = encodeImage([...array], image)
  const runBtnEl = document.querySelector('.app__button') as HTMLButtonElement
  plot({data: state, encodedImage})
  let isFirstRun = true
  runBtnEl.addEventListener('click', () => {
    runBtnEl.disabled = true
    if (!isFirstRun) {
      array = generateArray()
      encodedImage = encodeImage([...array], image)
      state = [...array]
    }
    mergeSort(array).then(() => {
      runBtnEl.disabled = false
      isFirstRun = false
    })
  })

  async function mergeSort(arr: number[], offset = 0): Promise<number[]> {
    if (arr.length <= 1) {
      return arr
    }
    const middle = Math.floor(arr.length / 2)
    const left = await mergeSort(arr.slice(0, middle), offset)
    const right = await mergeSort(arr.slice(middle), offset + middle)
    return merge(left, right, offset)
  }

  async function merge(
    left: number[],
    right: number[],
    offset = 0
  ): Promise<number[]> {
    const result = []
    let l = 0
    let r = 0
    while (l < left.length && r < right.length) {
      const firstL = left[l]
      const firstR = right[r]
      if (firstL <= firstR) {
        result.push(firstL)
        l += 1
      } else {
        result.push(firstR)
        r += 1
      }
      await updateState(
        [...result, ...left.slice(l), ...right.slice(r)],
        offset
      )
    }
    if (left.length) {
      result.push(...left.slice(l))
    }
    if (right.length) {
      result.push(...right.slice(r))
    }
    return result
  }

  async function updateState(
    part: number[],
    start: number
  ): Promise<undefined> {
    state.splice(start, part.length, ...part)
    plot({data: state, mergeRange: [start, start + part.length], encodedImage})
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        resolve()
      })
    })
  }
})
