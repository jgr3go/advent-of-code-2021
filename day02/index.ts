import { AOCInput } from "../interfaces";


const transform = (rows): Array<{dir: string, pos: number}> => rows.map(row => row.split(' ')).map(d => ({dir: d[0], pos: parseInt(d[1])}));

export const part1 = (rows: AOCInput) => {
  let data = transform(rows);
  let horizonal = 0, depth = 0;

  for (let d of data) {
    if (d.dir == 'forward') horizonal += d.pos;
    if (d.dir == 'backward') horizonal -= d.pos;
    if (d.dir == 'down') depth += d.pos;
    if (d.dir == 'up') depth -= d.pos;
  }

  return horizonal * depth;
}

export const part2 = (rows: AOCInput) => {
  let data = transform(rows);
  let horizontal = 0, depth = 0, aim = 0;

  for (let d of data) {
    if (d.dir == 'down') aim += d.pos;
    if (d.dir == 'up') aim -= d.pos;
    if (d.dir == 'forward') {
      horizontal += d.pos;
      depth += aim * d.pos;
    }
  }

  return horizontal * depth;
}