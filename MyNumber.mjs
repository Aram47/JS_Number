import MyToNumber from "./MyToNumber.mjs";

export default function MyNumber(inpValue) {
    if (!new.target) {
        return arguments.length ? MyToNumber(inpValue) : 0;
    }

    let _value = MyToNumber(inpValue);

    MyNumber.parseInt = function (input, radix) {
        if (typeof input !== 'string') input = String(input);

        input = input.trim();
    
        if (radix === undefined) {
            if (input.startsWith('0x') || input.startsWith('0X')) {
                radix = 16;
                input = input.slice(2);
            } else {
                radix = 10;
            }
        }
    
        if (radix < 2 || radix > 36) {
            return NaN;
        }
    
        let result = 0;
        let sign = 1;
        let index = 0;
    
        if (input[0] === '-') {
            sign = -1;
            ++index;
        } else if (input[0] === '+') {
            ++index;
        }
    
        const digitChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let validDigitFound = false;
    
        while (index < input.length) {
            const char = input[index].toUpperCase();
            const digit = digitChars.indexOf(char);
    
            if (digit === -1 || digit >= radix) {
                break;
            }
    
            validDigitFound = true;
            result = result * radix + digit;
            ++index;
        }
    
        if (!validDigitFound) {
            return NaN;
        }
    
        return sign * result;
    }

    MyNumber.parseFloat = function (input) {
        if (typeof input !== 'string') input = String(input);

        input = input.trim();

        let result = 0;
        let sign = 1;
        let index = 0;
        let decimalFound = false;
        let decimalFactor = 0.1;

        if (input[0] === '-') {
            sign = -1;
            ++index;
        } else if (input[0] === '+') {
            ++index;
        }

        const length = input.length;
        while (index < length) {
            const char = input[index];

            if (char === '.' && !decimalFound) {
                decimalFound = true;
            } else if (char >= '0' && char <= '9') {
                const digit = char - '0';
                if (!decimalFound) {
                    result = result * 10 + digit;
                } else {
                    result += digit * decimalFactor;
                    decimalFactor *= 0.1;
                }
            } else {
                break;
            }

            ++index;
        }

        if (index === 0 || (index === 1 && (input[0] === '+' || input[0] === '-'))) {
            return NaN;
        }

        return sign * result;
    }

    MyNumber.prototype = {}

    const numericObject = {
        toExponential: function (fractionDigits) {
            const value = this.valueOf();
            if (typeof value !== "number") {
                throw new TypeError("Invalid value for toExponential");
            }
            return value.toExponential(fractionDigits);
        },
        toFixed: function (digits) {
            const value = this.valueOf();
            if (typeof value !== "number") {
                throw new TypeError("Invalid value for toFixed");
            }
            return value.toFixed(digits);
        },
        toLocaleString: function (locales, options) {
            const value = this.valueOf();
            if (typeof value !== "number") {
                throw new TypeError("Invalid value for toLocaleString");
            }
            return value.toLocaleString(locales, options);
        },
        toPrecision: function (precision) {
            const value = this.valueOf();
            if (typeof value !== "number") {
                throw new TypeError("Invalid value for toPrecision");
            }
            return value.toPrecision(precision);
        },
        toString: function (radix) {
            const value = this.valueOf();
            if (typeof value !== "number") {
                throw new TypeError("Invalid value for toString");
            }
            return value.toString(radix);
        },
        valueOf: function () {
            if (typeof _value !== "number") {
                throw new TypeError("Invalid value for valueOf");
            }
            return _value;
        }
    }
    Object.setPrototypeOf(numericObject, MyNumber.prototype);
    return numericObject;
}
new MyNumber();