import c from 'classnames';
import * as d3 from 'd3';

const chartBorder = 1;
const chartWidth = 500 - 2 * chartBorder;
const chartHeight = 500 - 2 * chartBorder;
const chart = getChart(chartWidth, chartHeight);

function getChart(width, height): d3.Selection<SVGElement, unknown, HTMLElement, any> {
  return d3.select('.app')
    .append('svg')
    .attr('class', 'chart')
    .attr('width', width)
    .attr('height', height);
}

export default function plot(arr: number[], mergeRange: [number, number] = [0, arr.length]): void {
  const barWidth = chartWidth / arr.length;
  const yScale = d3.scaleLinear()
    .domain(d3.extent(arr))
    .rangeRound([chartHeight, 0]);

  const bar = chart.selectAll('g').data(arr);
  bar.selectAll('.chart__bar').remove();
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
  }

  function isInMergeRange(x): boolean {
    const [min, max] = mergeRange;
    return x >= min && x <= max;
  }
}
