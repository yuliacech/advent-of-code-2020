const decodeLine = (line) => {
    let bottom = 1;
    let top = 128;
    let left = 1;
    let right = 8;

    for (let i = 0; i < 10; i++) {
        const letter = line[i];
        if (letter === 'F') {
            top = top - ((top - bottom + 1) / 2);
        } else if (letter === 'B') {
            bottom = bottom + ((top - bottom + 1)/2);
        } else if (letter === 'L') {
            right = right - (right - left + 1 )/2;
        } else {
            left = left + (right - left + 1)/2;
        }
    }
    return {row: top - 1, column: left - 1};
}

module.exports = decodeLine;
