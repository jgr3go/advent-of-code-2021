import _ from 'lodash';
import { AOCInput } from '../interfaces';



let transform = (rows: AOCInput) => rows.map(row => row.split('-'));

export let part1 = (rows: AOCInput) => {
  let data = transform(rows);
  let graph = new Graph(data);
  let visited = [];
  let validPaths = [];
  let total = traversePart1(graph.start, visited, validPaths);
  return total;
};

export let part2 = (rows: AOCInput) => {
  let data = transform(rows);
  let graph = new Graph(data);
  let visited = {hasRepeat: false, visited: []};
  let validPaths: Node[][] = [];
  let total = traversePart2(graph.start, visited, validPaths);
  console.log(validPaths.map(x => x.map(x => x.val).join()))
  return total;
}

function traversePart1(node: Node, visited: Node[], validPaths: Node[][]): number {
  visited = _.cloneDeep(visited);
  visited.push(node);
  let count = 0;
  for (let next of node.nodes) {
    if (next.val == 'end') {
      count += 1;
      validPaths.push(_.cloneDeep(visited));
    } else if (next.big || (!next.big && !visited.map(x => x.val).includes(next.val))) {
      count += traversePart1(next, visited, validPaths);
    }
  }

  return count;
}

function traversePart2(node: Node, visited: {hasRepeat: boolean, visited: Node[]}, validPaths: Node[][]): number {
  visited = _.cloneDeep(visited);
  if (node.small && !node.isEnd && visited.visited.map(x => x.val).includes(node.val)) {
    visited.hasRepeat = true;
  }
  visited.visited.push(node);
  let count = 0;
  for (let next of node.nodes) {
    let smallRepeat = next.small && !next.isEnd && visited.visited.map(x => x.val).includes(next.val);
    let canTraverseSmall = !visited.hasRepeat;

    if (next.val == 'end') {
      count += 1;
      validPaths.push(_.cloneDeep(visited.visited));
    } else if (next.big) {
      count += traversePart2(next, visited, validPaths);
    } else if (next.val == 'start') {
      // do nothing
    } else if (smallRepeat ? canTraverseSmall : true) {
      count += traversePart2(next, visited, validPaths);
    }
  }

  return count;
}

class Graph {
  byVal: {[val: string]: Node} = {};
  start: Node;
  end: Node;

  constructor(data: string[][]){
    for (let d of data) {
      let first: Node, second: Node;
      if (!this.byVal[d[0]]) {
        first = new Node(d[0]);
        this.byVal[first.val] = first;
      } else {
        first = this.byVal[d[0]]
      }
      if (!this.byVal[d[1]]) {
        second = new Node(d[1]);
        this.byVal[second.val] = second;
      } else {
        second = this.byVal[d[1]];
      }
      first.add(second);
      second.add(first);

      if (first.val == 'start') this.start = first;
      if (second.val == 'end') this.end = second;
    }
  }
}
class Node {
  val: string;
  big: boolean;
  small: boolean;
  isEnd: boolean;
  nodes: Node[];

  constructor(val: string) {
    this.val = val;
    this.big = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(val[0]);
    this.small = !this.big;
    this.nodes = [];
  }

  add(node: Node) {
    this.nodes.push(node);
  }

  toString() {
    return this.val;
  }
}