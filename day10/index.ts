import _ from 'lodash';
import { resourceLimits } from 'worker_threads';
import { AOCInput } from '../interfaces';


let OPEN = ['{', '(', '[', '<'];
let CLOSE = ['}', ')', ']', '>'];
let MAP = {
  '[': ']',
  '{': '}',
  '(': ')',
  '<': '>'
};


export let part1 = (rows: AOCInput) => {
  let corruptedPts = 0;
  for (let row of rows) {
    let result = parseRow(row);
    if (result.corrupted) {
      if (result.type == ')') corruptedPts += 3;
      else if (result.type == ']') corruptedPts += 57;
      else if (result.type == '}') corruptedPts += 1197;
      else if (result.type == '>') corruptedPts += 25137;
    }
  }
  return corruptedPts;
};

export let part2 = (rows: AOCInput) => {
  let scores = [];
  for (let row of rows) {
    let result = parseRow(row);
    if (!result.corrupted) {
      let incompletePts = 0;
      let remaining = result.remaining;
      let reverse = remaining.map(x => MAP[x]).reverse();
      for (let symb of reverse) {
        if (symb == ')') incompletePts = incompletePts*5 + 1;
        else if (symb == ']') incompletePts = incompletePts*5 + 2;
        else if (symb == '}') incompletePts = incompletePts*5 + 3;
        else incompletePts = incompletePts*5 + 4;
      }
      scores.push(incompletePts);
    } 
  }
  return _.sortBy(scores)[Math.floor(scores.length/2)];
}

function parseRow(row: string) {
  let parser = [];

  let symbs = row.split('');
  for (let symb of symbs) {
    if (OPEN.includes(symb)) {
      parser.push(symb);
    }
    else {
      let expected = MAP[parser.pop()];
      if (expected != symb) {
        return {corrupted: true, type: symb, remaining: parser};
      } else {
        // all good
      }
    }
  }
  return {corrupted: false, remaining: parser};
}