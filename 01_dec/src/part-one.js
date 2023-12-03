import * as fs from 'fs';

const values = fs.readFileSync('input.txt', 'utf8').split('\n');

const calibrationValue = values
    .map((value) => {
        const numbers = value.split('').filter(Number);
        return parseInt(`${numbers[0]}${numbers.slice(-1)[0]}`);
    })
    .reduce((acc, currentValue) => acc + currentValue, 0);
    
console.log('calibration value', calibrationValue);
