const fs = require('fs');
const path = require('path');

let lines = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map((x) => x);

function part2() {
  const missingChars = removeInvalidLines().map((line) =>
    findMissingChars(line)
  );

  var sortedTotals = missingChars
    .map((line) => calculateAutocompleteScore(line))
    .sort((a, b) => b - a);

  console.log(
    `middle score is ${sortedTotals[Math.floor(sortedTotals.length / 2)]}`
  );
}

function removeInvalidLines() {
  let validatedLines = lines;

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
            validatedLines = validatedLines.filter((x) => x !== line);
            break;
          }
      }

      if (!isValid) break;
    }
  }

  return validatedLines;
}

function findMissingChars(line) {
  const stack = [];

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
          break;
        }
    }
  }

  return stack;
}

function calculateAutocompleteScore(missingChars) {
  let sum = 0;

  missingChars.reverse().forEach((char) => {
    switch (char) {
      case ')':
        sum = sum * 5 + 1;
        break;
      case ']':
        sum = sum * 5 + 2;
        break;
      case '}':
        sum = sum * 5 + 3;
        break;
      case '>':
        sum = sum * 5 + 4;
        break;
    }
  });

  return sum;
}

part2();
