const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./004.txt'),
    output: process.stdout,
    console: false
});

let found = 0;
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
let passFields = [];

readInterface.on('line', function (line) {
    if (line) {
        const parts = line.trim().split(' ');
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            passFields.push(part.split(':')[0]);
        }
    } else {
        if (requiredFields.every(field => passFields.includes(field))) {
            found++;
        }
        passFields = [];
    }

});

readInterface.on('close', function () {
    console.log(found);
});
