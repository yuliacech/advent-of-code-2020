const fs = require('fs');
const readline = require('readline');
const validatePass = require('./004_config');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./004.txt'),
    output: process.stdout,
    console: false
});

let found = 0;

let pass = {};

readInterface.on('line', function (line) {
    if (line) {
        const parts = line.trim().split(' ');
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const values = part.split(':');
            pass[values[0]] = values[1];
        }
    } else {
        if (validatePass(pass)) {
            found++;
        }
        pass = {};
    }

});

readInterface.on('close', function () {
    console.log(found);
});


