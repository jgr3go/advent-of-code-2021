import _ from 'lodash';
import { AOCInput } from '../interfaces';


interface Octopus {
  flashed: boolean;
  energy: number
}

let transform = (rows: AOCInput) => rows.map(row => row.split('').map(x => (<Octopus>{
  flashed: false,
  energy: parseInt(x)
})));

export let part1 = (rows: AOCInput) => {
  let data = transform(rows);
  let flashes = 0;
  for (let ii = 0; ii < 100; ii++) {
    for (let jj = 0; jj < data.length; jj++) {
      for (let kk = 0; kk < data[jj].length; kk++) {
        flash(data, jj, kk);
      }
    }
    flashes += resetAndCount(data);
  }
  return flashes;
};

export let part2 = (rows: AOCInput) => {
  let data = transform(rows);
  let allOctos = data.length * data[0].length;
  let ii = 0;
  while(true) {
    ii++;
    for (let jj = 0; jj < data.length; jj++) {
      for (let kk = 0; kk < data[jj].length; kk++) {
        flash(data, jj, kk);
      }
    }
    let flashes = resetAndCount(data);
    if (flashes == allOctos) return ii;
  }
}

function flash(data: Octopus[][], jj: number, kk: number) {
  let octo = data[jj]?.[kk];
  if (octo == undefined) return;
  if (octo.flashed) return;
  octo.energy += 1;
  if (octo.energy > 9) {
    octo.flashed = true;
    for (let rr = jj-1; rr <= jj+1; rr++) {
      for (let cc = kk-1; cc <= kk+1; cc++) {
        if (rr == jj && cc == kk) continue;
        flash(data, rr, cc);
      }
    }
  }
}

function resetAndCount(data: Octopus[][]) {
  let flashes = 0;
  for (let row of data) {
    for (let octo of row) {
      if (octo.flashed == true) {
        octo.flashed = false;
        octo.energy = 0;
        flashes += 1;
      }
    }
  }
  return flashes;
}