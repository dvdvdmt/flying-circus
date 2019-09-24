import c from 'classnames';
import * as d3 from 'd3';
import {EncodedImage} from './encode-image';

interface PlotInterface {
  data: number[];
  mergeRange?: [number, number];
  encodedImage: EncodedImage;
}

export default function initPlot(chartEl, chartWidth, chartHeight) {
  return function plot({
    data,
    mergeRange = [0, data.length],
    encodedImage,
  }: PlotInterface): void {
    const barWidth = chartWidth / data.length;
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .rangeRound([chartHeight, 0]);

    const bar = d3.select(chartEl).selectAll('g').data(data);
    bar.selectAll('rect').remove();
    initBarContainers(bar);
    initBars(bar);

    const barEnter = bar.enter().append('g');
    initBarContainers(barEnter);
    initBars(barEnter);

    bar.exit().remove();

    function initBarContainers(selection): void {
      selection.attr('transform', (_, i) => `translate(${i * barWidth},0)`);
    }

    function initBars(selection): void {
      selection.append('rect')
        .attr('class', (_, i) => c('chart__bar', {'chart__bar--colored': isInMergeRange(i)}))
        .attr('width', barWidth)
        .attr('height', (v) => (chartHeight - yScale(v)))
        .attr('y', yScale);

      if (encodedImage) {
        const barsWithMarks = selection.filter((d) => encodedImage[d]);
        const marks = barsWithMarks.selectAll('.chart__mark')
          .data((d) => encodedImage[d]);

        marks.enter()
          .append('rect')
          .attr('class', (d) => c('chart__mark', {'chart__mark--visible': d}))
          .attr('width', barWidth)
          .attr('height', barWidth)
          .attr('y', (_, i) => chartHeight - (i * barWidth) - barWidth);
      }
    }

    function isInMergeRange(x): boolean {
      const [min, max] = mergeRange;
      return x >= min && x <= max;
    }
  };
}
