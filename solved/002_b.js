const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./002.txt'),
    output: process.stdout,
    console: false
});

let found = 0;
readInterface.on('line', function (line) {
    const parts = line.trim().split(' ');
    const times = parts[0].split('-');
    const firstPosition = parseInt(times[0]) - 1;
    const secondPosition = parseInt(times[1]) - 1;
    const letter = parts[1][0];
    const password = parts[2];

    let actualTimes = 0;
    if ((password[firstPosition] === letter && password[secondPosition] !== letter)
        || (password[firstPosition] !== letter && password[secondPosition] === letter)) {
        found++;
    }


});

readInterface.on('close', function () {
    console.log(found);
});
