/* eslint-disable no-param-reassign */
import {expect} from 'chai';

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, middle));
  const right = mergeSort(arr.slice(middle));
  if (left[left.length - 1] <= right[0]) {
    left.push(...right);
    return left;
  }
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result = [];
  let l = 0;
  let r = 0;
  while (l < left.length && r < right.length) {
    const firstL = left[l];
    const firstR = right[r];
    if (firstL <= firstR) {
      result.push(firstL);
      l += 1;
    } else {
      result.push(firstR);
      r += 1;
    }
  }
  if (left.length) {
    result.push(...left.slice(l));
  }
  if (right.length) {
    result.push(...right.slice(r));
  }
  return result;
}

describe('Merge sort', () => {
  it('merges two arrays', () => {
    expect(merge([2], [1])).to.be.an('array');
    expect(merge([1], [2])).to.deep.equal([1, 2]);
    expect(merge([2], [1])).to.deep.equal([1, 2]);
    expect(merge([2, 0], [1])).to.deep.equal([1, 2, 0]);
    expect(merge([2, 3], [0, 1, 2])).to.deep.equal([0, 1, 2, 2, 3]);
    expect(merge([2, 3, 0, 1, 3], [0, 1, 2])).to.deep.equal([0, 1, 2, 2, 3, 0, 1, 3]);
  });

  it('sorts', () => {
    expect(mergeSort([])).deep.equal([]);
    expect(mergeSort([1])).deep.equal([1]);
    expect(mergeSort([3, 2, 1])).deep.equal([1, 2, 3]);
    expect(mergeSort([6, 6, 6, 10, 0, 7])).deep.equal([0, 6, 6, 6, 7, 10]);
  });
});
