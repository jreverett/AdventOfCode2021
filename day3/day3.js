const fs = require('fs');
const path = require('path');

const binaryReport = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .match(/.{1,12}/g) // produces ['000010000011', '001010000111', '...']
  .filter((x) => x);

function part1() {
  let binaryValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  binaryReport.map((report) =>
    report
      .split('')
      .map((x) => Number(x))
      .map((value, i) => (binaryValues[i] += value))
  );

  const gammaRate = binaryValues
    .map((x) => (x / binaryReport.length) * 100)
    .map((x) => (x = x > 50 ? 1 : 0));

  const epislonRate = gammaRate.map((x) => Number(!x));

  const powerConsumption =
    parseInt(gammaRate.join(''), 2) * parseInt(epislonRate.join(''), 2);

  console.log(`power consumption is: ${powerConsumption} ⚡️`);
}

function part2() {
  const multiArray = binaryReport.map((report) =>
    report.split('').map((x) => parseInt(x))
  );

  //prettier-ignore
  const oxygenGeneratorRating = parseInt(findMode(multiArray, 0, true).join(''), 2);
  //prettier-ignore
  const cO2ScrubberRating = parseInt(findMode(multiArray, 0, false).join(''), 2);

  console.log(
    `the life support rating is: ${oxygenGeneratorRating * cO2ScrubberRating} 🫀`
  );
}

function findMode(multiArray, index, mostCommon) {
  let zeros = 0;
  let ones = 0;
  let discriminator = 0;
  let tempArray = [];

  multiArray.map((x) => (x[index] === 0 ? zeros++ : ones++));

  if (mostCommon) discriminator = zeros > ones ? 0 : 1;
  else discriminator = zeros > ones ? 1 : 0;

  tempArray = multiArray.filter((value) => value[index] === discriminator);

  if (tempArray.length !== 1) {
    return findMode(tempArray, ++index, mostCommon);
  }

  return tempArray[0];
}

part1();
part2();
