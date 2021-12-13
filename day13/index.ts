import _ from 'lodash';
import { AOCInput } from '../interfaces';

let transform = (rows: AOCInput) => {
  let dots: {x:number, y:number}[] = [];
  let instructions: {dir:'x'|'y', val: number}[] = [];

  let blank = false;
  for (let row of rows) {
    if (row.trim() == '') {
      blank = true;
      continue;
    }
    if (!blank) {
      let r = row.split(',');
      dots.push({x: parseInt(r[0]), y: parseInt(r[1])});
    } else {
      let match = row.match(/fold along ([a-z])\=(\d+)/);
      instructions.push({dir: <'x'|'y'>match[1], val: parseInt(match[2])})
    }
  }
  let maxX = _.maxBy(dots.map(x => x.x));
  let maxY = _.maxBy(dots.map(x => x.y));
  let graph: string[][] = [];
  for (let yy = 0; yy <= maxY; yy++) {
    let row = [];
    for (let xx = 0; xx <= maxX; xx++) {
      row.push('.');
    }
    graph.push(row);
  }
  for (let dot of dots) {
    graph[dot.y][dot.x] = '#';
  }
  return {dots, instructions, graph};
}

export let part1 = (rows: AOCInput) => {
  let data = transform(rows);
  let graph = data.graph;
  let instructions = data.instructions.slice(0, 1);

  for (let [iter, inst] of instructions.entries()) {
    graph = fold(graph, inst);
  }
  return graph.reduce((ycnt, yrow) => {
    return ycnt + yrow.reduce((xcnt, x) => {
      return xcnt + (x == '#' ? 1 : 0);
    }, 0);
  }, 0);
}

export let part2 = (rows: AOCInput) => {
  let data = transform(rows);
  let graph = data.graph;
  
  for (let inst of data.instructions) {
    graph = fold(graph, inst);
  }
  print(graph);
}

function fold(graph: string[][], inst: {dir: 'x'|'y', val: number}) {
  let fold = inst.val;
  if (inst.dir == 'y') {
    let moreOnTop = fold - 0 >= graph.length - (fold+1);
    if (moreOnTop) {
      for (let yy = fold+1; yy < graph.length; yy++) {
        let diff = yy - fold;
        for (let xx = 0; xx < graph[yy].length; xx++) {
          if (graph[yy][xx] == '#') {
            graph[fold-diff][xx] = '#';
          }
        }
      }
      graph = _.slice(graph, 0, fold);
    } else {
      for (let yy = 0; yy < fold; yy++) {
        let diff = fold - yy;
        for (let xx = 0; xx < graph[yy].length; xx++) {
          if (graph[yy][xx] == '#') {
            graph[fold+diff][xx] = '#';
          }
        }
      }
      graph = _.slice(graph, fold+1);
    }
  }
  else if (inst.dir == 'x') {
    let moreOnLeft = fold - 0 >= graph[0].length - (fold+1);
    if (moreOnLeft) {
      for (let xx = fold+1; xx < graph[0].length; xx++) {
        let diff = xx - fold;
        for (let yy = 0; yy < graph.length; yy++) {
          if (graph[yy][xx] == '#') {
            graph[yy][fold-diff] = '#';
          }
        }
      }
      for (let yy = 0; yy < graph.length; yy++) {
        graph[yy] = _.slice(graph[yy], 0, fold);
      }
    } else {
      for (let xx = 0; xx < fold; xx++) {
        let diff = fold - xx;
        for (let yy = 0; yy < graph.length; yy++) {
          if (graph[yy][xx] == '#') {
            graph[yy][fold+diff] = '#';
          }
        }
      }
      for (let yy = 0; yy < graph.length; yy++) {
        graph[yy] = _.slice(graph[yy], fold+1);
      }
    }
  }
  return graph;
}

function print(graph: string[][]) {
  console.log('\n');
  for (let yy = 0; yy < graph.length; yy++) {
    console.log(graph[yy].join(''));
  }
}