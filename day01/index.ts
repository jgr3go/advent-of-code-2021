import * as path from 'path';
import * as fs from 'fs';

let rows = fs.readFileSync(path.join(__dirname, process.argv[2] ? 'sample.txt' : 'data.txt')).toString().split('\r\n');
let data = rows.map(x => parseInt(x));

const part1 = () => {
  let count = data.reduce((prev: [number, number], cur) => {
    if (prev[0] === null) return [cur, 0];
    return prev[0] < cur ? [cur, ++prev[1]] : [cur, prev[1]];
  }, [null, 0]);

  console.log("round 1", count[1]);
}


const part2 = () => {
  let prev = data[0] + data[1] + data[2];
  let count = 0;
  for (let ii = 3; ii < data.length; ii++) {
    let cur = data[ii-2] + data[ii-1] + data[ii];
    if (cur > prev) count++;
    prev = cur;
  }

  console.log("round 2", count);

};

part1();
part2();