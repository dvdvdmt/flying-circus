interface State {
  current: number[];
  changeLog: number[][];
  set(state: number[]): void;
  update(part: number[], start: number): void;
  log(state: number[]): void;
  printLog(): void;
  printCurrent(): void;
}
const state: State = {
  changeLog: [[]],
  get current(): number[] {
    return this.changeLog[this.changeLog.length - 1];
  },
  set(newState: number[]): void {
    this.changeLog = [];
    this.log(newState);
  },
  update(part, start) {
    const newState = [...this.current];
    newState.splice(start, part.length, ...part);
    this.log(newState);
  },
  log(newState): void {
    this.changeLog.push(newState);
    this.printCurrent();
  },
  printCurrent() {
    console.log(this.current);
  },
  printLog() {
    console.log(this.changeLog);
  },
};

function mergeSort(arr: number[], offset = 0): number[] {
  if (arr.length <= 1) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, middle), offset);
  const right = mergeSort(arr.slice(middle), offset + middle);
  return merge(left, right, offset);
}

function merge(left: number[], right: number[], offset = 0): number[] {
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
    state.update([...result, ...left.slice(l), ...right.slice(r)], offset);
  }
  if (left.length) {
    result.push(...left.slice(l));
  }
  if (right.length) {
    result.push(...right.slice(r));
  }
  return result;
}
