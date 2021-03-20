import c from 'classnames'
import * as d3 from 'd3'
import {EncodedImage} from './encode-image'

interface PlotInterface {
  data: number[]
  mergeRange?: [number, number]
  encodedImage: EncodedImage
}

export default function initPlot(
  chartEl: SVGElement,
  chartWidth: number,
  chartHeight: number
) {
  return function plot({
    data,
    mergeRange = [0, data.length],
    encodedImage,
  }: PlotInterface): void {
    const barWidth = chartWidth / data.length
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)!])
      .rangeRound([chartHeight, 0])

    const bar = d3.select(chartEl).selectAll('g').data(data)
    bar.selectAll('rect').remove()
    initBarContainers(bar)
    initBars(bar)

    const barEnter = bar.enter().append('g')
    initBarContainers(barEnter)
    initBars(barEnter)

    bar.exit().remove()

    function initBarContainers(
      selection:
        | d3.Selection<d3.BaseType, number, SVGElement, unknown>
        | d3.Selection<SVGGElement, number, SVGElement, unknown>
    ): void {
      selection.attr('transform', (_, i) => `translate(${i * barWidth},0)`)
    }

    function initBars(
      selection:
        | d3.Selection<d3.BaseType, number, SVGElement, unknown>
        | d3.Selection<SVGGElement, number, SVGElement, unknown>
    ): void {
      selection
        .append('rect')
        .attr('class', (_, i) =>
          c('chart__bar', {'chart__bar--colored': isInMergeRange(i)})
        )
        .attr('width', barWidth)
        // @ts-expect-error
        .attr('height', (v) => chartHeight - yScale(v))
        // @ts-expect-error
        .attr('y', yScale)

      if (encodedImage) {
        // @ts-expect-error
        const barsWithMarks = selection.filter((d) => encodedImage[d])
        const marks = barsWithMarks
          // @ts-expect-error
          .selectAll('.chart__mark')
          // @ts-expect-error
          .data((d) => encodedImage[d])

        marks
          // @ts-expect-error
          .enter()
          .append('rect')
          // @ts-expect-error
          .attr('class', (d) => c('chart__mark', {'chart__mark--visible': d}))
          .attr('width', barWidth)
          .attr('height', barWidth)
          // @ts-expect-error
          .attr('y', (_, i) => chartHeight - i * barWidth - barWidth)
      }
    }

    function isInMergeRange(x: number): boolean {
      const [min, max] = mergeRange
      return x >= min && x <= max
    }
  }
}
