import _, { pick } from 'lodash';
import { AOCInput } from '../interfaces';

let transform = (rows: AOCInput) => {
  let pickems = rows[0].split(',').map(x => parseInt(x));
  let boards: Bingo[] = [];
  for (let ii = 2; ii < rows.length; ii += 6) {
    let board = [];
    board.push(rows[ii].split(' ').filter(x => !!x).map(x => parseInt(x)));
    board.push(rows[ii+1].split(' ').filter(x => !!x).map(x => parseInt(x)));
    board.push(rows[ii+2].split(' ').filter(x => !!x).map(x => parseInt(x)));
    board.push(rows[ii+3].split(' ').filter(x => !!x).map(x => parseInt(x)));
    board.push(rows[ii+4].split(' ').filter(x => !!x).map(x => parseInt(x)));
    let bingo = new Bingo(board);
    boards.push(bingo);
  }
  return {pickems, boards};
}



export let part1 = (rows: AOCInput) => {
  let data = transform(rows);

  let boards = data.boards;
  let winnerWinnerChickenDinner: Bingo;

  for (let pickem of data.pickems) {
    for (let board of boards) {
      board.check(pickem);
      if (board.won()) {
        winnerWinnerChickenDinner = board;
        
        let answer = winnerWinnerChickenDinner.sumAndMultUnmarked(pickem);
        return answer;
      }
    }
  }
};

export let part2 = (rows: AOCInput) => {
  let data = transform(rows);

  let boards = data.boards;
  let loserLoserChickenBoozer: Bingo;

  for (let pickem of data.pickems) {
    let boardsToRemove = [];
    for (let board of boards) {
      board.check(pickem);
      if (board.won()) {
        boardsToRemove.push(board);
        loserLoserChickenBoozer = board;
      }
    }
    for (let rb of boardsToRemove) {
      _.remove(boards, rb);
    }
    if (boards.length == 0) {
      let answer = loserLoserChickenBoozer.sumAndMultUnmarked(pickem);
      return answer;
    }
  }
}


class Bingo {
  private raw: number[][];
  private checked: boolean[][];

  constructor(numbers: number[][]) {
    this.raw = numbers;
    this.checked = Array.from({length: 5}, () => Array.from({length: 5}, () => false));
  }

  toString() {
    return JSON.stringify({raw: this.raw, checked: this.checked});
  }

  check(number) {
    for (let ii = 0; ii < 5; ii++) {
      for (let jj = 0; jj < 5; jj++) {
        if (this.raw[ii][jj] == number) {
          this.checked[ii][jj] = true;
        }
      }
    }
  }

  won() {
    for (let idx = 0; idx < 5; idx++) {
      if (this.checked[idx].every(x => x == true)) return true;
      if (this.checked.map(row => row[idx]).every(x => x == true)) return true;
    }
    return false;
  }

  sumAndMultUnmarked(mult: number) {
    let sum = 0;
    for (let ii = 0; ii < 5; ii++) {
      for (let jj = 0; jj < 5; jj++) {
        if (!this.checked[ii][jj]) sum += this.raw[ii][jj];
      }
    }
    return sum * mult;
  }
}