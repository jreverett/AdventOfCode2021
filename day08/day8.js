const fs = require('fs');
const path = require('path');

const entries = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map((x) => x.split(/\s\|\s/))
  .filter((x) => x);

function part1() {
  var numOccurrences = entries
    .map((e) => e[1].split(' ').filter((x) => [2, 3, 4, 7].includes(x.length)))
    .reduce((acc, cur) => acc + cur.length, 0);

  console.log(`there are ${numOccurrences} occurrences of 1, 4, 7 and 8`);
}

function part2() {
  let sumCodes = 0;

  entries.forEach((entry) => {
    // prettier-ignore
    const patterns = entry[0].split(' ').map((x) => x.split('').sort().join(''));
    const codes = entry[1].split(' ').map((x) => x.split('').sort().join(''));
    const codeKey = {
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: 'abcdefg',
      9: '',
    };

    // find patterns for digits with unique length
    patterns.forEach((p) => {
      switch (p.length) {
        case 2:
          codeKey[1] = p;
          break;
        case 3:
          codeKey[7] = p;
          break;
        case 4:
          codeKey[4] = p;
          break;
      }
    });

    // find patterns for the other digits
    patterns.forEach((p) => {
      switch (p.length) {
        case 5:
          // 2, 3 or 5
          if (includesChars(p, codeKey[1])) codeKey[3] = p;
          else if ([...new Set([...p, ...codeKey[4]])].length === 6)
            codeKey[5] = p;
          else codeKey[2] = p;
          break;
        case 6:
          // 0, 6 or 9
          if (includesChars(p, codeKey[4])) codeKey[9] = p;
          else if (includesChars(p, codeKey[7])) codeKey[0] = p;
          else codeKey[6] = p;
          break;
      }
    });

    sumCodes += calculateTotal(codes, codeKey);
  });

  console.log(`sum of output values: ${sumCodes} `);
}

function includesChars(pattern, chars) {
  let matches = 0;

  [...pattern].forEach((p) => {
    if (chars.split('').includes(p)) matches++;
  });

  return matches === chars.length ? true : false;
}

function calculateTotal(codes, codeKey) {
  return Number(
    codes
      .map((currCode) =>
        Object.keys(codeKey).find((key) => codeKey[key] === currCode)
      )
      .join('')
  );
}

part1();
part2();
