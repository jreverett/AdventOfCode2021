const fs = require('fs');
const path = require('path');

const input = fs
  .readFileSync(path.resolve(__dirname, 'example.txt'), 'utf-8')
  .split('\n')
  .filter((x) => x);

function part1() {
  let lines = getCoordinates();

  // remove diagonal lines
  lines = lines.filter((l) => l.start.x === l.end.x || l.start.y === l.end.y);

  const maxVal = Math.max(
    ...lines.map((l) => Math.max(l.start.x, l.start.y, l.end.x, l.end.y))
  );

  const grid = Array(maxVal + 1)
    .fill()
    .map(() => Array(maxVal + 1).fill(0));

  lines.forEach((l) => drawLineOnGrid(l, grid));

  const numAtLeastTwoOverlaps = grid.reduce(
    (total, curr) => (total += curr.filter((a) => a >= 2).length),
    0
  );

  console.log(
    `there are ${numAtLeastTwoOverlaps} occurances of at least two lines overlapping`
  );
}

function getCoordinates() {
  return (coordinates = input.map((c) => {
    const [startX, startY, endX, endY] = c.split(/[,(\s->\s)]+/gm);

    return {
      start: { x: parseInt(startX), y: parseInt(startY) },
      end: { x: parseInt(endX), y: parseInt(endY) },
    };
  }));
}

function drawLineOnGrid(line, grid) {
  let start, end;
  if (line.start.x < line.end.x || line.start.y < line.end.y) {
    start = line.start;
    end = line.end;
  } else {
    start = line.end;
    end = line.start;
  }

  for (let i = start.y; i <= end.y; i++) {
    for (let j = start.x; j <= end.x; j++) {
      grid[i][j]++;
    }
  }
}

/////////////////////////////////////////////////////////////

function part2() {
  let lines = getCoordinates();

  const maxVal = Math.max(
    ...lines.map((l) => Math.max(l.start.x, l.start.y, l.end.x, l.end.y))
  );

  const grid = Array(maxVal + 1)
    .fill()
    .map(() => Array(maxVal + 1).fill(0));

  lines.forEach((l) => {
    if (l.start.x === l.end.x || l.start.y === l.end.y) {
      drawLineOnGrid(l, grid);
    } else {
      drawDiagonalOnGrid(l, grid);
    }
  });

  const numAtLeastTwoOverlaps = grid.reduce(
    (total, curr) => (total += curr.filter((a) => a >= 2).length),
    0
  );

  console.log(
    `there are ${numAtLeastTwoOverlaps} occurances of at least two lines overlapping, including diagonals`
  );
}

function drawDiagonalOnGrid(line, grid) {
  // TODO
}

part1();
// part2();
