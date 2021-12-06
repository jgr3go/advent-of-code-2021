import _ from 'lodash';
import { isTemplateExpression } from 'typescript';
import { AOCInput } from '../interfaces';


let transform = (rows: AOCInput) => rows[0].split(',').map(x => parseInt(x));

export let part1 = (rows: AOCInput) => {
  let data = transform(rows);
  return performant(data, 80);
  // return naivePart1(data);
}

export let part2 = (rows: AOCInput) => {
  let data = transform(rows);
  return performant(data, 256);
}

let naivePart1 = (data: number[]) => {
  let allFish = _.cloneDeep(data);
  for (let ii = 0; ii < 80; ii++) {
    let curLength = allFish.length;
    for (let jj = 0; jj < curLength; jj++) {
      if (allFish[jj] > 0) {
        allFish[jj] -= 1;
      } else {
        allFish[jj] = 6;
        allFish.push(8);
      }
    }
  }
  return allFish.length;
}

let performant = (data: number[], iterations: number) => {
  let fishes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let d of data) {
    fishes[d] += 1;
  }
  console.log(fishes)
  for (let ii = 0; ii < iterations; ii++) {
    let cloned = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    cloned[0] = fishes[1];
    cloned[1] = fishes[2];
    cloned[2] = fishes[3];
    cloned[3] = fishes[4];
    cloned[4] = fishes[5];
    cloned[5] = fishes[6];
    cloned[6] = fishes[0] + fishes[7];
    cloned[7] = fishes[8];
    cloned[8] = fishes[0];
    fishes = cloned;
  }
  return fishes.reduce((count, cur) => count + cur, 0);
}