const fs = require('fs');
const readline = require('readline');
const decodeLine = require('./005_decode');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./005.txt'),
    output: process.stdout,
    console: false
});

let found = [];
const maxId = 126 * 8 + 7;
const minId = 1 * 8 + 0;
let ids = [];
for (let i = minId; i <= maxId; i++) {
    ids.push(i);
}
console.log(ids);


readInterface.on('line', function (line) {
    if (line) {
        const { row, column} = decodeLine(line);
        console.log({ row, column});
        const currentId = row * 8 + column;
        ids = ids.filter(id => id != currentId);
    }

});

readInterface.on('close', function () {
    console.log(ids);
});
