import * as fs from 'fs';

const inputLines = fs.readFileSync('input.txt', 'utf8').split('\n');
/**
 * Pour chaque fragment de chaque ligne regarder si c'est une string
 * si c'est une string
 *  Regarder si elle contient un ou plusieurs pattern de spelledLettre
 *  Pour chaque pattern trouvé retourner la valeur numéraire qui lui correspond
 * si c'est un nombre
 *  retourner le nombre
 */

const spelledNumbers = [
    { name: 'one', value: 1 },
    { name: 'two', value: 2 },
    { name: 'three', value: 3 },
    { name: 'four', value: 4 },
    { name: 'five', value: 5 },
    { name: 'six', value: 6 },
    { name: 'seven', value: 7 },
    { name: 'eight', value: 8 },
    { name: 'nine', value: 9 }
];

const separateLettersFromNumbers = (line) => {
    let string = '';
    const characters = line.split('');
    const values = [];
    characters.forEach((character) => {
        if (isNaN(character)) {
            string = string + character;
        } else {
            if (string) {
                values.push(string);
                string = '';
            }
            values.push(parseInt(character));
        }
    });
    if (string) {
        values.push(string);
    }
    return values;
};

const filterAllNumbers = (list) => {
    return list.map((line) => {
        const filteredValues = separateLettersFromNumbers(line);

        const truc = filteredValues.map((value) => {
            if (isNaN(value)) {
                let replacedStrings = value;
                spelledNumbers.forEach((pattern) => {
                    replacedStrings = replacedStrings.replace(
                        pattern.name,
                        pattern.value
                    );
                });
                return replacedStrings
                    .split('')
                    .filter((character) => !isNaN(character))
                    .map((character) => parseInt(character));
            } else {
                return value;
            }
        });

        return truc.flat();
    });
};

const createCombination = (array) => {
    return parseInt(`${array.at(0)}${array.at(-1)}`);
};

const sanitize = (string) => string.match(/(one|two)/g);

const totalCombination = (data) =>
    data
        .map(createCombination)
        .reduce((acc, currentValue) => acc + currentValue, 0);

console.log(totalCombination(filterAllNumbers(inputLines)));
