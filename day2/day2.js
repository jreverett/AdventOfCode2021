const fs = require('fs');
const path = require('path');

const vectors = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .filter((x) => x);

function part1() {
  const position = { horizontal: 0, depth: 0 };

  vectors
    .map((v) => v.split(' ')) // produces [['direction', 'magnitude'], ['...' , '...']]
    .map((v) => [v[0], Number(v[1])]) // produces [['direction', magnitude], ['...' , ...]]
    .forEach((v) => {
      switch (v[0]) {
        case 'forward':
          position.horizontal += v[1];
          break;
        case 'up':
          position.depth -= v[1];
          break;
        case 'down':
          position.depth += v[1];
          break;
      }
    });

  console.log(
    `${
      position.horizontal * position.depth
    } is the result of final horizontal * final depth ⚓️`
  );
}

function part2() {
  let position = { horizontal: 0, depth: 0, aim: 0 };

  vectors
    .map((v) => v.split(' '))
    .map((v) => [v[0], Number(v[1])])
    .forEach((v) => {
      switch (v[0]) {
        case 'forward':
          position.horizontal += v[1];
          position.depth += v[1] * position.aim;
          break;
        case 'up':
          position.aim -= v[1];
          break;
        case 'down':
          position.aim += v[1];
          break;
      }
    });

  console.log(
    `${
      position.horizontal * position.depth
    } is the result of final horizontal * final depth, accounting for aim ⚓️`
  );
}

part1();
part2();
