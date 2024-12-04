export default function MyStringToNumber (inpString) {
    let sign = 1;
    let it = 0;
    inpString = inpString.trim();

    if (!inpString.length) {
        return NaN;
    }

    if (inpString[0] === '-' || inpString[0] === '+') {
        sign *= (inpString[0] === '-') ? -1 : 1;
        it = 1;
    }

    let res = 0;
    let commaCount = 0;

    for (let i = 0; i < inpString.length; ++i) {
        if (inpString[i] === '.') {
            ++commaCount;
        }
    }

    if (commaCount > 1) {
        return NaN;
    }

    while (it < inpString.length && inpString[it] !== '.') {
        const charCode = inpString[it].charCodeAt();
        if (charCode < 48 || charCode > 57) {
            return NaN;
        }
        res = res * 10 + charCode - 48;
        ++it;
    }

    if (!commaCount) {
        return res;
    }

    ++it;
    let aftherComma = 0;

    while (it < inpString.length) {
        const charCode = inpString[it].charCodeAt();
        if (charCode < 48 || charCode > 57) {
            return NaN;
        }
        res = res * 10 + charCode - 48;
        ++it;
        ++aftherComma;
    }

    return res /= Math.pow(10, aftherComma);
}