/* eslint-disable no-await-in-loop */
import plot from './plot';

const array = Array.from(new Array(300), () => Math.floor(Math.random() * 500));
const state = [...array];

plot(array);
mergeSort(array);

async function mergeSort(arr: number[], offset = 0): Promise<number[]> {
  if (arr.length <= 1) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = await mergeSort(arr.slice(0, middle), offset);
  const right = await mergeSort(arr.slice(middle), offset + middle);
  return merge(left, right, offset);
}

async function merge(left: number[], right: number[], offset = 0): Promise<number[]> {
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
    await updateState([...result, ...left.slice(l), ...right.slice(r)], offset);
  }
  if (left.length) {
    result.push(...left.slice(l));
  }
  if (right.length) {
    result.push(...right.slice(r));
  }
  return result;
}

async function updateState(part: number[], start: number): Promise<undefined> {
  state.splice(start, part.length, ...part);
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      plot(state, [start, start + part.length]);
      resolve();
    });
  });
}
