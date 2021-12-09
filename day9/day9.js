const fs = require('fs');
const path = require('path');

const positions = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map((x) => x.split('').map(Number));

function part1() {
  let lowPoints = 0;

  for (let i = 0; i < positions.length; i++) {
    // loop through each array
    for (let j = 0; j < positions[i].length; j++) {
      // loop through array positions
      const position = positions[i][j];
      let adjacentValues = [];

      // check position above
      if (positions[i - 1] !== undefined) {
        adjacentValues.push(positions[i - 1][j]);
      }

      // check position below
      if (positions[i + 1] !== undefined) {
        adjacentValues.push(positions[i + 1][j]);
      }

      // check position left
      if (positions[i][j - 1] !== undefined) {
        adjacentValues.push(positions[i][j - 1]);
      }

      // check position right
      if (positions[i][j + 1] !== undefined) {
        adjacentValues.push(positions[i][j + 1]);
      }

      if (adjacentValues.every((x) => x > position)) lowPoints += 1 + position;
    }
  }

  console.log(`sum of risk levels is: ${lowPoints}`);
}

function part2() {
  // replace 9's with 1's, anything else with 0's
  const borderMap = positions.map((array) =>
    array.map((x) => (x = x === 9 ? 1 : 0))
  );

  const basinSizes = [];

  for (let i = 0; i < positions.length; i++) {
    // loop through each array
    for (let j = 0; j < positions[i].length; j++) {
      // loop through array positions
      const basinSize = floodfill(borderMap, i, j);

      if (basinSize > 0) basinSizes.push(basinSize);
    }
  }

  const largestThreeBasins = basinSizes.sort((a, b) => b - a).slice(0, 3);

  console.log(
    `the largest 3 basins have sizes of ${largestThreeBasins[0]}, ${largestThreeBasins[1]} and ${largestThreeBasins[2]}`
  );

  console.log(
    `... multiplied for a total of ${largestThreeBasins.reduce(
      (a, b) => a * b,
      1
    )}`
  );
}

function floodfill(map, i, j) {
  if (map[i][j] === 1) return 0;
  map[i][j] = 1;

  let size = 1;

  // check position above
  if (map[i - 1] !== undefined) {
    size += floodfill(map, i - 1, j);
  }

  // check position below
  if (map[i + 1] !== undefined) {
    size += floodfill(map, i + 1, j);
  }

  // check position left
  if (map[i][j - 1] !== undefined) {
    size += floodfill(map, i, j - 1);
  }

  // check position right
  if (map[i][j + 1] !== undefined) {
    size += floodfill(map, i, j + 1);
  }

  return size;
}

part1();
part2();
