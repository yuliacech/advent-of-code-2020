const fs = require('fs');
const readline = require('readline');
const decodeLine = require('./005_decode');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./005.txt'),
    output: process.stdout,
    console: false
});

let found = 0;


readInterface.on('line', function (line) {
    if (line) {
        const { row, column} = decodeLine(line);
        console.log({ row, column});
        const id = row * 8 + column;
        if (id > found) {
            found = id;
        }
    }

});

readInterface.on('close', function () {
    console.log(found);
});
