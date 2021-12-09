import _ from 'lodash';
import { AOCInput } from '../interfaces';

let transform = (rows: AOCInput) => rows.map(row => row.split('').map(x => parseInt(x)));

export let part1 = (rows: AOCInput) => {
  let data = transform(rows);
  let risks = 0;
  for (let ii = 0; ii < data.length; ii++) {
    let row = data[ii];
    for (let jj = 0; jj < row.length; jj++) {
      let isLowPt = isLow(data, ii, jj);
      if (isLowPt) {
        risks += data[ii][jj] + 1;
      }
    }
  }
  return risks;
}

function isLow(data: number[][], ii: number, jj: number) {
  let neighbors = [
    data[ii-1]?.[jj],
    data[ii+1]?.[jj],
    data[ii][jj+1],
    data[ii][jj-1]
  ].filter(x => x != undefined);
  
  return neighbors.every(val => val > data[ii][jj]);
}

export let part2 = (rows: AOCInput) => {
  let data = transform(rows);
  let basins = [];
  for (let ii = 0; ii < data.length; ii++) {
    let row = data[ii];
    for (let jj = 0; jj < row.length; jj++) {
      let isLowPt = isLow(data, ii, jj);
      if (isLowPt) {
        let basinSize = calculateBasin(data, ii, jj);
        basins.push(basinSize);
      }
    } 
  }
  basins = _.sortBy(basins);
  return basins[basins.length-1] * basins[basins.length-2] * basins[basins.length-3];
}

function calculateBasin(data: number[][], ii: number, jj: number) {
  let dataClone = _.cloneDeep(data);
  let toProcess = [{
    x: ii,
    y: jj,
    val: dataClone[ii][jj]
  }];

  let count = 0;
  while (toProcess.length) {
    let processing = toProcess.shift();
    count++;

    // set self to null to mark processed
    dataClone[processing.x][processing.y] = null;

    let neighbors = [
      {x: processing.x-1, y: processing.y, val: dataClone[processing.x-1]?.[processing.y] },
      {x: processing.x+1, y: processing.y, val: dataClone[processing.x+1]?.[processing.y] },
      {x: processing.x, y: processing.y-1, val: dataClone[processing.x][processing.y-1] },
      {x: processing.x, y: processing.y+1, val: dataClone[processing.x][processing.y+1] }
    ].filter(x => x.val != undefined && x.val != null);

    for (let neighbor of neighbors) {
      if (neighbor.val != 9 && !toProcess.find(x => x.x == neighbor.x && x.y == neighbor.y)) {
        toProcess.push(neighbor);
      }
    }
  }

  return count;
}