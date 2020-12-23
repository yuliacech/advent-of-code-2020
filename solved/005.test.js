const decodeLine = require('./005_decode');

describe('decoder', () => {
    test('FBFBBFFRLR', () => {
        const {row, column} = decodeLine('FBFBBFFRLR');
        expect(row).toBe(44);
        expect(column).toBe(5);
    });

    test('BFFFBBFRRR', () => {
        const {row, column} = decodeLine('BFFFBBFRRR');
        expect(row).toBe(70);
        expect(column).toBe(7);
    });

    test('FFFBBBFRRR', () => {
        const {row, column} = decodeLine('FFFBBBFRRR');
        expect(row).toBe(14);
        expect(column).toBe(7);
    });

    test('BBFFBBFRLL', () => {
        const {row, column} = decodeLine('BBFFBBFRLL');
        expect(row).toBe(102);
        expect(column).toBe(4);
    });
});
