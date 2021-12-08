import _ from 'lodash';
import { AOCInput } from '../interfaces';


let transform = (rows: AOCInput) => rows.map(row => {
  let parts = row.split('|');
  return {
    input: parts[0].split(' ').map(x => x.trim()).map(x => x.split('').sort().join('')).filter(x => !!x),
    output: parts[1].split(' ').map(x => x.trim()).map(x => x.split('').sort().join('')).filter(x => !!x)
  };
});

export let part1 = (rows: AOCInput) => {
  let unique = [
    2, // one
    4, // four
    3, // 7
    7, // 8
  ];

  let data = transform(rows);
  return data.reduce((count, row) => {
    let display = row.output;
    return count + display.reduce((rowtotal, val) => {
      return rowtotal + (unique.includes(val.length) ? 1 : 0);
    }, 0);
  }, 0);
};

export let part2 = (rows: AOCInput) => {
  let data = transform(rows);

  return data.reduce((sum, row) => {
    let mapping = determine(row.input);
    let result = row.output.map(x => mapping[x]).join('');
    return sum + parseInt(result);
  }, 0);

}



function determine(combos: string[]) {
  let comboletters = combos.map(c => c.split(''))
  let one = comboletters.find(x => x.length == 2);
  let four = comboletters.find(x => x.length == 4);
  let seven = comboletters.find(x => x.length == 3);
  let eight = comboletters.find(x => x.length == 7);

  let undefinedSixLetters = comboletters.filter(x => x.length == 6);
  let nine = undefinedSixLetters
                          .filter(x => _.intersection(x, four).length == 4)
                          .shift();
  undefinedSixLetters = undefinedSixLetters.filter(x => x.join('') != nine.join(''));

  let zero = undefinedSixLetters
                        .filter(x => _.intersection(x, one).length == 2)
                        .shift();
  undefinedSixLetters = undefinedSixLetters.filter(x => x.join('') != zero.join(''));
  let six = undefinedSixLetters.shift();

  let undefinedFiveLetters = comboletters.filter(x => x.length == 5);
  let five = undefinedFiveLetters
                          .filter(x => _.intersection(x, six).length == 5)
                          .shift();
  undefinedFiveLetters = undefinedFiveLetters.filter(x => x.join('') != five.join(''));

  let three = undefinedFiveLetters 
                          .filter(x => _.intersection(x, nine).length == 5)
                          .shift();
  let two = undefinedFiveLetters
                          .filter(x => x.join('') != three.join(''))
                          .shift();

  return {
    [zero.join('')]: '0',
    [one.join('')]: '1',
    [two.join('')]: '2',
    [three.join('')]: '3',
    [four.join('')]: '4',
    [five.join('')]: '5',
    [six.join('')]: '6',
    [seven.join('')]: '7',
    [eight.join('')]: '8',
    [nine.join('')]: '9',
  };


}


