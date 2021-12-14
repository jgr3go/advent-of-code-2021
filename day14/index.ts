import _, { min } from 'lodash';
import { AOCInput } from '../interfaces';


interface Polymer {
  [pair: string]: number;
};
interface PairInsertion {
  pair: string;
  insert: string;
}

let transform = (rows: AOCInput) => {
  let row1 = rows[0];
  let polymer: Polymer = {};
  for (let ii = 0; ii < row1.length-1; ii++) {
    let pair = row1.substr(ii, 2);
    if (polymer[pair]) {
      polymer[pair] += 1;
    } else {
      polymer[pair] = 1;
    }
  }
  let pairs = rows.slice(2).map(row => {
    return <PairInsertion>{
      pair: row.slice(0, 2),
      insert: row.slice(6)
    };
  });
  return {polymer, pairs};
}

export let part1 = (rows: AOCInput) => {
  let data = transform(rows);
  return process(data, 10);
}

export let part2 = (rows: AOCInput) => {
  let data = transform(rows);
  return process(data, 40);
}

function process(data, iterations: number) {
  for (let ii = 0; ii < 10; ii++) {
    insert(data.polymer, data.pairs);
  }

  let evald = evaluate(data.polymer);
  let maxCount = _.maxBy(Object.entries(evald), elem => elem[1]);
  let minCount = _.minBy(Object.entries(evald), elem => elem[1]);
  return maxCount[1] - minCount[1];
}



function evaluate(polymer: Polymer) {
  let quantities: {[element: string]: number} = {};
  for (let pair of Object.entries(polymer)) {
    let elem1 = pair[0][0];
    let elem2 = pair[0][1];
    let count = pair[1];

    if (!quantities[elem1]) quantities[elem1] = 0;
    if (!quantities[elem2]) quantities[elem2] = 0;
    quantities[elem1] += count;
    quantities[elem2] += count;
  }
  for (let quant of Object.entries(quantities)) {
    // half rounded up
    quantities[quant[0]] = _.ceil(quant[1]/2);
  }
  return quantities;
}

function insert(polymer: Polymer, pairs: PairInsertion[]) {
  let toRemove: Polymer = {};
  let toAdd: Polymer = {};
  for (let pair of pairs) {
    if (polymer[pair.pair]) {
      let pair1 = `${pair.pair[0]}${pair.insert}`;
      let pair2 = `${pair.insert}${pair.pair[1]}`;

      let count = polymer[pair.pair];

      if (!toRemove[pair.pair]) toRemove[pair.pair] = 0;
      toRemove[pair.pair] += count;
      if (!toAdd[pair1]) toAdd[pair1] = 0;
      toAdd[pair1] += count;
      if (!toAdd[pair2]) toAdd[pair2] = 0;
      toAdd[pair2] += count;
    }
  }

  for (let removing of Object.entries(toRemove)) {
    polymer[removing[0]] -= removing[1];
  }
  for (let adding of Object.entries(toAdd)) {
    if (!polymer[adding[0]]) polymer[adding[0]] = 0;
    polymer[adding[0]] += adding[1];
  }
  for (let entries of Object.entries(polymer)) {
    if (entries[1] == 0) delete polymer[entries[0]];
  }
}