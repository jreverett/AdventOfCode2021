const fs = require('fs');
const path = require('path');

const lines = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map((x) => x);

function part1() {
  const invalidChars = [];

  for (const line of lines) {
    const stack = [];
    let isValid = true;

    for (const char of line) {
      switch (char) {
        case '(':
          stack.push(')');
          break;
        case '[':
          stack.push(']');
          break;
        case '{':
          stack.push('}');
          break;
        case '<':
          stack.push('>');
          break;
        default:
          if (char !== stack.pop()) {
            isValid = false;
            invalidChars.push(char);
            break;
          }
      }

      if (!isValid) break;
    }
  }

  console.log(
    `total syntax error score is ${calculateSyntaxScore(invalidChars)}`
  );
}

function calculateSyntaxScore(invalidChars) {
  let sum = 0;

  invalidChars.forEach((char) => {
    switch (char) {
      case ')':
        sum += 3;
        break;
      case ']':
        sum += 57;
        break;
      case '}':
        sum += 1197;
        break;
      case '>':
        sum += 25137;
        break;
    }
  });

  return sum;
}

part1();
