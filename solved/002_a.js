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
    const minTimes = parseInt(times[0]);
    const maxTimes = parseInt(times[1]);
    const letter = parts[1][0];
    const password = parts[2];

    let actualTimes = 0;
    for (let i = 0; i < password.length; i++) {
        if (password[i] === letter) {
            actualTimes++;
            if (actualTimes > maxTimes) {
                break;
            }
        }
    }
    if (actualTimes >= minTimes && actualTimes <= maxTimes) {
        found++;
    }
});

readInterface.on('close', function () {
    console.log(found);
});
