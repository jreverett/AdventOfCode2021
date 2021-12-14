const fs = require('fs');
const path = require('path');

const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .filter((x) => x);

const dots = input
  .filter((dot) => /(\d+,\d+)/.test(dot))
  .map((dot) => {
    const [x, y] = dot.split(',').map(Number);
    return { x: x, y: y };
  });

const instructions = input
  .filter((x) => /fold along.+/.test(x))
  .map((x) => {
    const [axis, value] = x.split('=');
    return { axis: axis.charAt(axis.length - 1), value: Number(value) };
  });

function part2() {
  let maxX = Math.max(...dots.map((o) => o.x), 0) + 1;
  let maxY = Math.max(...dots.map((o) => o.y), 0) + 1;

  instructions[0].axis === 'x'
    ? (maxX = instructions[0].value * 2 + 1)
    : (maxY = instructions[0].value * 2 + 1);

  let matrix = Array(maxY)
    .fill(0)
    .map(() => Array(maxX).fill('.'));

  // plot dots on matrix
  dots.forEach((dot) => {
    matrix[dot.y][dot.x] = '#';
  });

  instructions.forEach((instruction) => {
    matrix = applyFoldInstruction(matrix, instruction);
  });

  console.log(`output after ${instructions.length} instructions:`);
  console.log('---------------------------------------');

  // print output to console
  for (let i = 0; i < matrix.length; i++) {
    let string = '';
    for (let j = 0; j < matrix[i].length; j++) {
      string += matrix[i][j] === '#' ? '█' : 'ᐧ';
    }
    console.log(string);
  }
}

function applyFoldInstruction(matrix, instruction) {
  if (instruction.axis === 'x') {
    // vertical fold
    const leftHalf = [];
    const rightHalf = [];
    matrix.map((row) => {
      leftHalf.push(row.slice(0, instruction.value));
      rightHalf.push(row.slice(instruction.value + 1, row.length));
    });

    // flip along x axis and merge
    return mergeMatrixes(
      leftHalf,
      rightHalf.map((x) => x.reverse())
    );
  } else {
    // horizontal fold
    const topHalf = [];
    const bottomHalf = [];
    matrix.map((row, i) => {
      if (i < instruction.value) topHalf.push(row);
      else if (i !== instruction.value) bottomHalf.push(row); // ignore dots on the fold line
    });

    // flip along y axis and merge
    return mergeMatrixes(topHalf, bottomHalf.reverse());
  }
}

function mergeMatrixes(matrixA, matrixB) {
  for (let i = 0; i < matrixA.length; i++) {
    for (let j = 0; j < matrixA[i].length; j++) {
      if (matrixA[i][j] === '#' || matrixB[i][j] === '#') matrixA[i][j] = '#';
    }
  }

  return matrixA;
}

part2();
