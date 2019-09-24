export interface Image {
  readonly data: number[][];
  bottomPadding: number;
  rightPadding: number;
}

export interface EncodedImage {
  [value: number]: number[];
}

export default function (arr: number[], image: Image): EncodedImage {
  const sorted = arr.sort((a, b) => (a - b));
  const imageWidthInBars = image.data[0].length;
  const reversedImage = image.data.slice().reverse();
  const firstBarIndex = sorted.length - (imageWidthInBars + image.rightPadding);
  const endBarIndex = sorted.length - image.rightPadding;
  return sorted.slice(firstBarIndex, endBarIndex)
    .reduce((acc, v, imageColumnIdx) => {
      const imageColumn = reversedImage.map((row) => row[imageColumnIdx]);
      const paddingBottom = Array.from(new Array(image.bottomPadding), () => 0);
      acc[v] = [...paddingBottom, ...imageColumn];
      return acc;
    }, {});
}
