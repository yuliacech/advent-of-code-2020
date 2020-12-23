const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./006.txt'),
    output: process.stdout,
    console: false
});

let found = 0;
let answers = new Set();

readInterface.on('line', function (line) {
    if (line) {
        for (let letter of line) {
            answers = answers.add(letter);
        }
    } else {
        found += answers.size;
        answers = new Set();
    }

});

readInterface.on('close', function () {
    found += answers.size;
    console.log(found);
});
