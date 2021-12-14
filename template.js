const fs = require('fs');
const path = require('path');

const input = fs
  .readFileSync(path.resolve(__dirname, 'example.txt'), 'utf-8')
  .split('\n') // split by new line
  .filter((x) => x) // remove empty lines
  .map(Number); // parse to Numbers

function part1() {
  // TODO
  console.log(input);
}

function part2() {
  // TODO
}

part1();
part2();
