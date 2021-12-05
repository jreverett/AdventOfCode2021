const fs = require('fs');
const path = require('path');

const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .filter((x) => x);

const calledNumbers = input[0].split(',').map((x) => Number(x));

const boardDimensions = { x: 5, y: 5 };

function part1() {
  const boards = readBoards();
  let winningBoard = [];

  calledNumbers.forEach((number, i) => {
    if (winningBoard.length !== 0) return;

    removeNumberFromBoards(boards, number);

    if (i >= boardDimensions.x) {
      // check for winning rows
      boards.forEach((board) => {
        board.forEach((row) => {
          if (row.every((x) => x === null)) winningBoard = board;
        });
      });
    }

    if (i >= boardDimensions.y) {
      // check for winning columns
      for (let j = 0; j < boardDimensions.y; j++) {
        boards.forEach((board) => {
          if (board.every((row) => row[j] === null)) winningBoard = board;
        });
      }
    }

    if (winningBoard.length !== 0) {
      let sum = 0;

      winningBoard.forEach((row) => {
        sum += row.reduce((a, b) => a + b);
      });

      console.log(`score for the first winning board is: ${sum * number} 😎🥇`);
    }
  });
}

function readBoards() {
  let boards = [];

  for (let i = 1; i < input.length; i += boardDimensions.y) {
    let currentBoard = [];

    for (let j = 0; j < boardDimensions.y; j++) {
      currentBoard[j] = input[i + j]
        .trim()
        .split(/\s+/)
        .map((x) => Number(x));
    }

    boards.push(currentBoard);
  }

  return boards;
}

function removeNumberFromBoards(boards, number) {
  boards.forEach((board, i) => {
    board.forEach((row, j) => {
      boards[i][j] = row.map((x) => (x = x === number ? null : x));
    });
  });
}

/////////////////////////////////////////////////////////////

function part2() {
  let boards = readBoards();
  let lastWinningBoard = [];

  calledNumbers.forEach((number, i) => {
    if (boards.length === 0) return;

    removeNumberFromBoards(boards, number);

    if (i >= boardDimensions.x) {
      // check for winning rows
      boards.forEach((board) => {
        board.forEach((row) => {
          if (row.every((x) => x === null)) {
            boards = boards.filter((x) => x !== board);
            lastWinningBoard = board;
          }
        });
      });
    }

    if (i >= boardDimensions.y) {
      // check for winning columns
      for (let j = 0; j < boardDimensions.y; j++) {
        boards.forEach((board) => {
          if (board.every((row) => row[j] === null)) {
            boards = boards.filter((x) => x !== board);
            lastWinningBoard = board;
          }
        });
      }
    }

    if (boards.length === 0) {
      let sum = 0;

      lastWinningBoard.forEach((row) => {
        sum += row.reduce((a, b) => a + b);
      });

      console.log(`score for the last winning board is: ${sum * number} 🙇🏼‍♂️🦑`);
    }
  });
}

part1();
part2();
