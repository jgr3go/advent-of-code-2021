import _ from 'lodash';
import { AOCInput } from '../interfaces';


let transform = (rows: AOCInput) => rows[0].split(',').map(x => parseInt(x));

export let part1 = (rows: AOCInput) => {
  let data = transform(rows);
  console.log({min: _.min(data), mean: _.mean(data), max: _.max(data)});
  return naivePart1(data);  
}

function naivePart1(data: number[]) {
  let distances: number[] = [];
  for (let ii = 0; ii < data.length; ii++) {
    distances.push(data.reduce((total, val) => {
      total += Math.abs(val - ii);
      return total;
    }, 0));
  }
  return _.min(distances);
}

export let part2 = (rows: AOCInput) => {
  let data = transform(rows);

  // precalc fuel rates
  let rates = {0: 0};
  let max = _.max(data);
  let min = _.min(data);
  let maxDist = max - min;
  let cost = 0;
  for (let ii = 1; ii <= maxDist; ii++) {
    cost += ii;
    rates[ii] = cost;
  }

  // redo algo
  let fuels: number[] = [];
  for (let ii = min; ii <= max; ii++) {
    fuels.push(data.reduce((total, val) => {
      let dist = Math.abs(val - ii);
      total += rates[dist];
      return total;
    }, 0));
  }

  return _.min(fuels);
}