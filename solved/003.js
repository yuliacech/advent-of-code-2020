const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('./003.txt'),
    output: process.stdout,
    console: false
});

// config for a
// const configs = [[1, 3]];

// config for b
const configs = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]];
const founds = configs.map(_ => 0);
const checks = configs.map(([row, column]) => [0 + row, 0 + column])
let count = 0;

readInterface.on('line', function (line) {
    for (let i = 0; i < configs.length; i++) {
        let [configRow, configColumn] = configs[i];
        let found = founds[i];
        let [checkRow, checkColumn] = checks[i];

        if (count === checkRow) {
            const tile = line[checkColumn % line.length];
            if (tile === '#') {
                found++;
                founds[i] = found;
            }
            checkRow += configRow;
            checkColumn += configColumn;
            checks[i] = [checkRow, checkColumn];
        }
    }

    count++;

});

readInterface.on('close', function () {
    const reducer = (accumulator, currentValue) => accumulator * currentValue;
    console.log(founds);
    console.log(founds.reduce(reducer, 1));
});
