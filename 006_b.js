const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./006.txt'),
    output: process.stdout,
    console: false
});

let found = 0;
let count = 0;
let answers = [];

readInterface.on('line', function (line) {
    if (line) {
        count++;

        if (count < 2) {
            for (let letter of line) {
                answers.push(letter);
            }
        } else {
            answers = answers.filter(answer => line.includes(answer));
        }
    } else {
        found += answers.length;
        answers = [];
        count = 0;
    }

});

readInterface.on('close', function () {
    found += answers.length;
    answers = [];
    count = 0;
    console.log(found);
});
