const createValidator = require('./004_validators');
const validatePass = require('./004_config');

describe('validators', () => {
    describe('minMax', () => {
        const minMaxValidator = createValidator('minMax', 20, 30);

        test('both correct', () => {
            const result = minMaxValidator(25);
            expect(result).toBeTruthy();
        });

        test('larger than max', () => {
            const result = minMaxValidator(31);
            expect(result).toBeFalsy();
        });

        test('equals max', () => {
            const result = minMaxValidator(30);
            expect(result).toBeTruthy();
        });

        test('smaller than min', () => {
            const result = minMaxValidator(19);
            expect(result).toBeFalsy();
        });

        test('equals min', () => {
            const result = minMaxValidator(20);
            expect(result).toBeTruthy();
        });

        test('works with string', () => {
            const result = minMaxValidator('25');
            expect(result).toBeTruthy();
        });

        test('fails with non number string prefix', () => {
            const result = minMaxValidator('test25');
            expect(result).toBeFalsy();
        });

        test('fails with non number string suffix without substring param', () => {
            const result = minMaxValidator('25test');
            expect(result).toBeFalsy();
        });

        test('works with non number string suffix with substring param', () => {
            const minMaxWithSuffixValidator = createValidator('minMax', 20, 30, -4);
            const result = minMaxWithSuffixValidator('25test');
            expect(result).toBeTruthy();
        });

    });

    describe('oneOf', () => {
        const oneOfValidator = createValidator('oneOf', ['one', 'two', 'three']);
        test('is one of', () => {
            const result = oneOfValidator('two');
            expect(result).toBeTruthy();
        });

        test('is not one of', () => {
            const result = oneOfValidator('four');
            expect(result).toBeFalsy();
        });
    });

    describe('or', () => {
        test('one is correct', () => {
            const orValidator = createValidator('or', [createValidator('minMax', 1, 5), createValidator('minMax', 8, 10)]);
            const result = orValidator(9);
            expect(result).toBeTruthy();
        });
        test('none is correct', () => {
            const orValidator = createValidator('or', [createValidator('minMax', 1, 5), createValidator('minMax', 8, 10)]);
            const result = orValidator(7);
            expect(result).toBeFalsy();
        });

        test('both are correct', () => {
            const orValidator = createValidator('or', [createValidator('minMax', 1, 10), createValidator('minMax', 8, 10)]);
            const result = orValidator(9);
            expect(result).toBeTruthy();
        });
    });

    describe('and', () => {
        test('one is correct', () => {
            const validator = createValidator('and', [createValidator('minMax', 1, 5), createValidator('minMax', 8, 10)]);
            const result = validator(9);
            expect(result).toBeFalsy();
        });
        test('none is correct', () => {
            const validator = createValidator('and', [createValidator('minMax', 1, 5), createValidator('minMax', 8, 10)]);
            const result = validator(7);
            expect(result).toBeFalsy();
        });

        test('both are correct', () => {
            const validator = createValidator('and', [createValidator('minMax', 1, 10), createValidator('minMax', 8, 10)]);
            const result = validator(9);
            expect(result).toBeTruthy();
        });
    });

    describe('suffix', () => {
        const suffixValidator = createValidator('suffix', 'end');

        test('works with null', () => {
            const result = suffixValidator(null);
            expect(result).toBeFalsy();
        });

        test('works with empty string', () => {
            const result = suffixValidator('');
            expect(result).toBeFalsy();
        });

        test('ends with suffix', () => {
            const result = suffixValidator('this-end');
            expect(result).toBeTruthy();
        });

        test(`doesn't end with suffix`, () => {
            const result = suffixValidator('thisEnd');
            expect(result).toBeFalsy();
        });

    });

    describe('prefix', () => {
        const prefixValidator = createValidator('prefix', 'start');

        test('works with null', () => {
            const result = prefixValidator(null);
            expect(result).toBeFalsy();
        });

        test('works with empty string', () => {
            const result = prefixValidator('');
            expect(result).toBeFalsy();
        });

        test('starts with prefix', () => {
            const result = prefixValidator('start-this');
            expect(result).toBeTruthy();
        });

        test(`doesn't start with prefix`, () => {
            const result = prefixValidator('no-start');
            expect(result).toBeFalsy();
        });

        describe('length', () => {
            const lengthValidator = createValidator('length', 5);

            test('works with null', () => {
                const result = lengthValidator(null);
                expect(result).toBeFalsy();
            });

            test('works with empty string', () => {
                const result = lengthValidator('');
                expect(result).toBeFalsy();
            });

            test('has correct length', () => {
                const result = lengthValidator('12345');
                expect(result).toBeTruthy();
            });

            test(`doesn't have correct length`, () => {
                const result = lengthValidator('123456');
                expect(result).toBeFalsy();
            });
        });

    });

    describe('chars', () => {
        const charsValidator = createValidator('chars', ['a', 'b', 'c']);
        test('consists of only allowed chars', () => {
            const result = charsValidator('abbccbccaaa');
            expect(result).toBeTruthy();
        });
        test('consists on not allowed chars', () => {
            const result = charsValidator('abbccwwbccaaa');
            expect(result).toBeFalsy();
        });
    });

});

describe('passports', () => {
    test('valid passports', () => {
        let pass = {
            pid: '087499704',
            hgt: '74in',
            ecl: 'grn',
            iyr: '2012',
            eyr: '2030',
            byr: '1980',
            hcl: '#623a2f',
        };
        let result = validatePass(pass);

        expect(result).toBeTruthy();

        pass = {
            eyr: '2029',
            ecl: 'blu',
            cid: '129',
            byr: '1989',
            iyr: '2014',
            pid: '896056539',
            hcl: '#a97842',
            hgt: '165cm',
        }

        result = validatePass(pass);

        expect(result).toBeTruthy();

        pass = {
            hcl: '#888785',
            hgt: '164cm', byr: '2001', iyr: '2015', cid: '88',
            pid: '545766238', ecl: 'hzl',
            eyr: '2022',
        };
        result = validatePass(pass);

        expect(result).toBeTruthy();

        pass = {
            iyr: '2010', hgt: '158cm', hcl: '#b6652a', ecl: 'blu', byr: '1944', eyr: '2021', pid: '093154719',
        };
        result = validatePass(pass);

        expect(result).toBeTruthy();

    });

    test('invalid passports', () => {
        let passport = {
            eyr: '1972', cid: '100',
            hcl: '#18171d', ecl: 'amb', hgt: '170', pid: '186cm', iyr: '2018', byr: '1926',
        };
        let result = validatePass(passport);
        expect(result).toBeFalsy();

        passport = {
            iyr: '2019',
            hcl: '#602927', eyr: '1967', hgt: '170cm',
            ecl: 'grn', pid: '012533040', byr: '1946',
        };
        result = validatePass(passport);
        expect(result).toBeFalsy();

        passport = {
            hcl: 'dab227', iyr: '2012',
            ecl: 'brn', hgt: '182cm', pid: '021572410', eyr: '2020', byr: '1992', cid: '277'
        };
        result = validatePass(passport);
        expect(result).toBeFalsy();

        passport = {
            hgt: '59cm', ecl: 'zzz',
            eyr: '2038', hcl: '74454a', iyr: '2023',
            pid: '3556412378', byr: '2007',
        };
        result = validatePass(passport);
        expect(result).toBeFalsy();
    });
});
