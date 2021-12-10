const fs = require('fs');
const path = require('path');

const fish = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split(',')
  .map(Number);

const cycleLength = 6;
const newFishModifier = 2;

function part1() {
  const days = 80;

  for (let i = 0; i < days; i++) {
    fish.forEach((f, j) => {
      fish[j]--;
      if (f === 0) {
        fish[j] = cycleLength;
        fish.push(cycleLength + newFishModifier);
      }
    });
  }

  console.log(`after ${days} days there are ${fish.length} lanternfish`);
}

function part2() {
  // need something more optimised than part 1, malloc failure 😬
  // dont track each fish, just how many of each cycle position there are:
  const days = 256;

  const fishQueue = Array(cycleLength + newFishModifier + 1).fill(0);
  fish.forEach((f) => fishQueue[f]++);

  for (let i = 0; i < days; i++) {
    const newFish = fishQueue.shift();
    fishQueue.push(newFish);
    fishQueue[cycleLength] += newFish;
  }

  const totalFish = fishQueue.reduce((a, b) => a + b, 0);

  console.log(`after ${days} days there are ${totalFish} lanternfish`);
}

part1();
part2();
