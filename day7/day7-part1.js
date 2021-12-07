const fs = require("fs");
const path = require("path");

const crabPositions = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split(",")
  .map(Number);

function part1() {
  const fuelUsage = calculateFuelUse(findMedian(crabPositions));

  console.log(`least fuel usage is: ${fuelUsage}`);
}

function findMedian(positions) {
  positions.sort((a, b) => a - b);
  return positions[Math.floor(positions.length) / 2];
}

function calculateFuelUse(targetPosition) {
  return crabPositions
    .map((p) => (p = Math.abs(p - targetPosition)))
    .reduce((a, b) => a + b);
}

part1();
