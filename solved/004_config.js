const createValidator = require('./004_validators');

const passValidation = {
    byr: createValidator('minMax', 1920, 2002),
    iyr: createValidator('minMax', 2010, 2020),
    eyr: createValidator('minMax', 2020, 2030),
    hgt: createValidator('or', [
        createValidator('and', [
            createValidator('suffix', 'cm'),
            createValidator('minMax', 150, 193, -2),
        ]),
        createValidator('and', [
            createValidator('suffix', 'in'),
            createValidator('minMax', 59, 76, -2),
        ]),
    ]),
    hcl: createValidator('and', [
        createValidator('prefix', '#'),
        createValidator('length', 7),
        createValidator('chars', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9','a', 'b', 'c', 'd', 'e', 'f'], 1),

    ]),
    ecl: createValidator('oneOf', ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']),
    pid: createValidator('and', [
        createValidator('length', 9),
        createValidator('chars', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
    ]),
};

const validatePass = (pass) => {
    const fields = Object.keys(passValidation);

    for (let i = 0; i < fields.length; i++) {
        const validator = passValidation[fields[i]];
        const value = pass[fields[i]];

        if (!validator(value)) {
            return false;
        }
    }

    return true;
}
module.exports = validatePass;
