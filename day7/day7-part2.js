const fs = require("fs");
const path = require("path");

const crabPositions = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split(",")
  .map(Number);

function part2() {
  const flooredAverage = Math.floor(getAverage(crabPositions));
  const ceiledAverage = Math.ceil(getAverage(crabPositions));

  let lowAverageCost = 0;
  let highAverageCost = 0;

  crabPositions.map((position) => {
    const lowAverageDistance = Math.abs(position - flooredAverage);
    const highAverageDistance = Math.abs(position - ceiledAverage);
    lowAverageCost += (lowAverageDistance * (lowAverageDistance + 1)) / 2;
    highAverageCost += (highAverageDistance * (highAverageDistance + 1)) / 2;
  });

  console.log(
    `least fuel usage is: ${Math.min(lowAverageCost, highAverageCost)}`
  );
}

function getAverage(positions) {
  const sum = positions.reduce((a, b) => a + b, 0);
  return sum / positions.length;
}

part2();
