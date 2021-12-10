const fs = require('fs');
const path = require('path');

const measurements = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .filter((x) => x)
  .map((x) => parseInt(x));

function part1() {
  const totalIncreases = measurements.filter(
    (_, i, arr) => arr[i] > arr[i - 1]
  ).length;

  console.log(
    `${totalIncreases} measurements were larger than the previous measurement`
  );
}

function part2() {
  const totalIncreases = measurements.filter(
    (_, i, arr) =>
      // prettier-ignore
      arr[i] + arr[i + 1] + arr[i + 2] > 
      arr[i - 1] + arr[i] + arr[i + 1]
  ).length;

  console.log(
    `... that's ${totalIncreases} when using a three-measurement sliding window`
  );
}

part1();
part2();
