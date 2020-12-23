const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./001.txt'),
    output: process.stdout,
    console: false
});

const numbers = [];
let found;
readInterface.on('line', function (line) {
    if (found) {
        return;
    }
    const number1 = parseInt(line);

    // check if any numbers in array sum up to 2020
    for (let i = 0; i < numbers.length; i++) {
        const sum = number1 + numbers[i];
        //console.log(`sum is ${sum}`);
        if (sum == 2020) {
            console.log(`FOUND!!! ${number1} * ${numbers[i]} = ${number1 * numbers[i]}`);
            found = number1 * numbers[i];
            break;
        }
    }
    numbers.push(number1);
});

readInterface.on('close', function () {
    console.log(found);
});
