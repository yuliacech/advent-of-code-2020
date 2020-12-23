const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./001.txt'),
    output: process.stdout,
    console: false
});

const numbers = [];
let found;
readInterface.on('line', function(line) {
    if (found) {
        return;
    }
    const number1 = parseInt(line);

    // check if any 3 numbers in array sum up to 2020
    for (let i = 0; i < numbers.length; i++) {
        const number2 = numbers[i];
        for (let j = i + 1 ; j < numbers.length; j++) {
            const number3 = numbers[j];
            const sum = number1 + number2 + number3;
            if (sum === 2020) {
                console.log(`FOUND!!!`);
                found = number1 * number2 * number3;
                break;
            }
        }
    }
    numbers.push(number1);
});

readInterface.on('close', function () {
    console.log(found);
});
