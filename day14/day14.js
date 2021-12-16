const fs = require('fs');
const path = require('path');

let [template, rules] = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n\n') // split by new line
  .filter((x) => x); // remove empty lines

template = template.split('');

rules = rules.split('\n').map((x) => x.split(' -> '));

const rulesMap = new Map();
for (const rule of rules) {
  // for rule CH -> B
  // create CB and HB
  rulesMap.set(rule[0], [rule[0][0] + rule[1], rule[1] + rule[0][1]]);
}

function day14() {
  // FOR PART 1: numSteps = 10, FOR PART 2 numSteps = 40
  const numSteps = 40;
  let map = new Map();

  for (let i = 0; i < template.length - 1; i++) {
    const pair = template[i] + template[i + 1];
    addToMap(map, pair);
  }

  for (let step = 1; step <= numSteps; step++) {
    const currentMap = new Map();
    const pairs = map.keys();

    for (const pair of pairs) {
      const ruleOutput = rulesMap.get(pair);
      // use 3rd param map.get(pair) to pass in the number of occurrances of the pair
      addToMap(currentMap, ruleOutput[0], map.get(pair));
      addToMap(currentMap, ruleOutput[1], map.get(pair));
    }
    map = currentMap;
  }

  // count occourances of each element
  const elementCount = new Map();
  const pairs = map.keys();

  // take first element of each pair in polymer
  for (const pair of pairs) {
    addToMap(elementCount, pair[0], map.get(pair));
  }
  // add last element of the polymer to the map (not accounted for in loop above)
  addToMap(elementCount, template[template.length - 1]);

  const values = [...elementCount.values()]; // remove iterator by passing into an array
  const max = Math.max(...values);
  const min = Math.min(...values);
  console.log(
    `most common element (${max}) - least common element (${min}) = ${
      max - min
    }`
  );
}

function addToMap(map, key, val = 1) {
  // if map doesn't include the key, add it and initialise to 0
  if (!map.has(key)) map.set(key, 0);

  // increment pair counter
  map.set(key, map.get(key) + val);
}

day14();
