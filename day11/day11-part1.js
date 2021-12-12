const fs = require('fs');
const path = require('path');

const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map((x) => x.split('').map(Number));

function part1() {
  const steps = 100;
  let currentGrid = input;
  let numFlashes = 0;
  let flashedPositions = [];

  for (let i = 1; i <= steps; i++) {
    // increment each position
    currentGrid = currentGrid.map((line) => (line = line.map((x) => ++x)));

    while (
      // prettier-ignore
      currentGrid
        .map((line) => line.some((x) => x > 9))
        .some((x) => x === true)
    ) {
      for (let j = 0; j < currentGrid.length; j++) {
        for (let k = 0; k < currentGrid[j].length; k++) {
          if (currentGrid[j][k] > 9 && !flashedPositions.includes([j, k])) {
            numFlashes++;
            currentGrid[j][k] = 0;
            flashedPositions.push([j, k]);
            currentGrid = incrementNeighbours(
              currentGrid,
              j,
              k,
              flashedPositions
            );
          }
        }
      }
    }

    flashedPositions = [];
  }

  console.log(`after ${steps} steps, there were ${numFlashes} flashes ⚡`);
}

// prettier-ignore
function incrementNeighbours(grid, i, j, flashedPositions) {
  // row above
  if (i - 1 >= 0) {
    if (j - 1 >= 0) incrIfNotFlashed(grid, i - 1, j - 1, flashedPositions);
    incrIfNotFlashed(grid, i - 1, j, flashedPositions);
    if (j + 1 < grid[i - 1].length) incrIfNotFlashed(grid, i - 1, j + 1, flashedPositions);
  }

  // left/right side
  if (j - 1 >= 0) incrIfNotFlashed(grid, i, j - 1, flashedPositions);
  if (j + 1 < grid[i].length) incrIfNotFlashed(grid, i, j + 1, flashedPositions);

  // row below
  if (i + 1 < grid.length) {
    if (j - 1 >= 0) incrIfNotFlashed(grid, i + 1, j - 1, flashedPositions);
    incrIfNotFlashed(grid, i + 1, j, flashedPositions);
    if (j + 1 < grid[i + 1].length) incrIfNotFlashed(grid, i + 1, j + 1, flashedPositions);
  }

  return grid;
}

function incrIfNotFlashed(grid, i, j, flashedPositions) {
  const position = [i, j];
  const hasFlashed = flashedPositions.some((x) =>
    x.every((value, index) => value === position[index])
  );

  if (!hasFlashed) grid[i][j]++;
}

part1();
