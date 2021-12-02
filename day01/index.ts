import { AOCInput } from '../interfaces';

const transform = (rows: AOCInput) => rows.map(x => parseInt(x));


export const part1 = (rows: AOCInput) => {
  let data = transform(rows);
  let count = data.reduce((prev: [number, number], cur) => {
    if (prev[0] === null) return [cur, 0];
    return prev[0] < cur ? [cur, ++prev[1]] : [cur, prev[1]];
  }, [null, 0]);

  return count[1];
}

export const part2 = (rows: AOCInput) => {
  let data = transform(rows);
  let prev = data[0] + data[1] + data[2];
  let count = 0;
  for (let ii = 3; ii < data.length; ii++) {
    let cur = data[ii-2] + data[ii-1] + data[ii];
    if (cur > prev) count++;
    prev = cur;
  }

  return count;
}