import { AOCInput } from "../interfaces";
import _ from 'lodash';

let transform = (rows): string[][] => rows.map(row => row.split(''));

export let part1 = (rows: AOCInput) => {
  let gamma = getGamma(rows);
  let epsilon = getEpsilon(rows);

  let gammaInt = parseInt(gamma, 2);
  let epInt = parseInt(epsilon, 2);
  return gammaInt * epInt;
}

export let part2 = (rows: AOCInput) => {
  let cols = rows[0].length;

  let O2 = '', CO2 = '';
  let o2possibilies = rows;
  let co2possibilities = rows;

  for (let ii = 0; ii < rows[0].length; ii++) {
    if (!O2) {
      let most = mostCommon(o2possibilies, ii);
      o2possibilies = o2possibilies.filter(val => val[ii] == most);
      if (o2possibilies.length == 1) O2 = o2possibilies[0];
    }
    if (!CO2) {
      let least = leastCommon(co2possibilities, ii);
      co2possibilities = co2possibilities.filter(val => val[ii] == least);
      if (co2possibilities.length == 1) CO2 = co2possibilities[0];
    }
  }
  console.log({O2, CO2});

  return parseInt(O2, 2) * parseInt(CO2, 2);
}

function mostCommon(rows: string[], index: number) {
  return _(rows)
    .map(r => r[index])
    .countBy()
    .entries()
    .orderBy(_.first, 'desc')
    .maxBy(_.last)
    .shift();
}

function leastCommon(rows: string[], index: number) {
  return _(rows)
    .map(r => r[index])
    .countBy()
    .entries()
    .orderBy(_.first, 'asc')
    .minBy(_.last)
    .shift();
}

function getGamma(rows: AOCInput) {
  return Array(rows[0].length).fill('').map((v, idx) => {
    return mostCommon(rows, idx);
  })
  .join('');
}

function getEpsilon(rows: AOCInput) {
  return Array(rows[0].length).fill('').map((v, idx) => {
    return leastCommon(rows, idx);
  })
  .join('');
}