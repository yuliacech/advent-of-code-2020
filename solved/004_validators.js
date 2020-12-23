
const createValidator = (validatorName, ...args) => {
    switch (validatorName) {
        case 'minMax': {
            return minMaxValidator(args[0], args[1], args[2]);
        }
        case 'oneOf': {
            return oneOfValidator(args[0]);
        }
        case 'or': {
            return orValidator(args[0]);
        }
        case 'and': {
            return andValidator(args[0]);
        }
        case 'suffix': {
            return suffixValidator(args[0]);
        }
        case 'prefix': {
            return prefixValidator(args[0]);
        }
        case 'length': {
            return lengthValidator(args[0]);
        }
        case 'chars': {
            return charsValidator(args[0], args[1]);
        }
    }
}

const minMaxValidator = (minNumber, maxNumber, substringParam = 0) => {
    return (value) => {
        const aNumber = transformString(value, substringParam);
        return aNumber >= minNumber && aNumber <= maxNumber;
    }
}

const oneOfValidator = (options) => {
    return (aWord) => {
        return options.includes(aWord);
    }
}

const orValidator = (validators) => {
    return (value) => {
        return validators.some(validator => validator(value));
    }
}

const andValidator = (validators) => {
    return (value) => {
        return validators.every(validator => validator(value));
    }
}

const suffixValidator = (suffix) => {
    return (value) => {
        return value && value.endsWith(suffix);
    }
}

const prefixValidator = (prefix) => {
    return (value) => {
        return value && value.startsWith(prefix);
    }
}

const lengthValidator = (length) => {
    return (value) => {
        return value && value.length === length;
    }
}

const transformString = (value, substringParam) => {
    if (substringParam) {
        value = substringParam > 0 ? value.substring(substringParam) : value.substring(0, value.length + substringParam);
    }
    return value;
}

const charsValidator = (allowedChars, substringParam = 0) => {
    return (value) => {
        value = transformString(value, substringParam);
        return value && value.split('').every(aChar => allowedChars.includes(aChar));
    }
}

module.exports = createValidator;
