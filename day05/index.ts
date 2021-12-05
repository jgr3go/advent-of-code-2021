import _ from 'lodash';
import { AOCInput } from '../interfaces';


let transform = (rows: AOCInput) => rows.map(row => {
  let coords = row.match(/(\d+),(\d+) -> (\d+),(\d+)/);
  return {
    x1: parseInt(coords[1]), y1: parseInt(coords[2]),
    x2: parseInt(coords[3]), y2: parseInt(coords[4])
  };
});


export let part1 = (rows: AOCInput) => {
  let data = transform(rows);
  let matrix = new SparseMatrix();
  for (let d of data) {
    if (d.x1 == d.x2) {
      let start: number, end: number;
      if (d.y1 < d.y2) { start = d.y1; end = d.y2; }
      else { start = d.y2; end = d.y1; }
      for (let y = start; y <= end; y++) {
        matrix.add(d.x1, y);
      }
    }
    else if (d.y1 == d.y2) {
      let start: number, end: number;
      if (d.x1 < d.x2) { start = d.x1; end = d.x2; }
      else { start = d.x2; end = d.x1; }
      for (let x = start; x <= end; x++) {
        matrix.add(x, d.y1);
      }
    }
  }

  return matrix.count();
}

export let part2 = (rows: AOCInput) => {
  let data = transform(rows);
  let matrix = new SparseMatrix();
  for (let d of data) {
    let x = d.x1, y = d.y1;
    matrix.add(x, y);
    while (true) {
      if (x < d.x2) x++;
      else if (x > d.x2) x--;
      if (y < d.y2) y++;
      else if (y > d.y2) y--;
      matrix.add(x, y);
      if (x == d.x2 && y == d.y2) break;
    }
  }

  return matrix.count();
}

class SparseMatrix {
  data: number[][] = [];

  add(x, y) {
    if (!this.data[x]) this.data[x] = [];
    this.data[x][y] = (this.data[x][y] || 0) + 1;
  }

  count() {
    return this.data.reduce((xcount, arr) => {
      return xcount + arr.reduce((ycount, val) => {
        if (val > 1) return ycount + 1;
        return ycount;
      }, 0);
    }, 0);
  }
}