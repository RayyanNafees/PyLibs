//* Prerequisites: _________________
const range = function(stop$start, stop = null, step = 1) {
    let arr = [];
    for (let i = !stop ? 0 : stop$start; i < (!stop ? stop$start : stop); arr.push(i), i += step);
    return arr;
};


const choice = seq => seq[Math.floor(Math.random() * seq.length)];

const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letters = lowercase + uppercase;
const digits = '0123456789';
const hexdigits = '0123456789abcdefABCDEF';
const octdigits = '01234567';
const punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~.";


//*_________________________________

const joiner = seq => (length = 1) => range(length - 1).map(choice(seq)).join('');

const letter = joiner(letters);
const lowerCase = joiner(lowercase);
const upperCase = joiner(uppercase);
const symbol = joiner(punctuation);
const printable = joiner(letters + digits + punctuation);


const digital = (digs, isbyte = false) => (length = 1) => {
    prfx = isbyte ? '1' : '';
    if (length == 1)
        return choice(digs);
    else
        return length < 1 ? '' : choice(digs.slice(1) + prfx + range(length - 1).map(i => choice(digs)).join(''));
};

/*
class Digit {
    constructor() {
        this.binary = digital(digits.slice(0, 2), true);
        this.octal = digital(octdigits);
        this.decimal = digital(digits);
        this.hexadecimal = digital((hexdigits));
    }
}

const digit = Digit();
*/

const digit = {
    binary_numbers: digits.slice(0, 2),
    binary: digital(digits.slice(0, 2), true),
    octal: digital(octdigits),
    decimal: digital(digits),
    hexadecimal: digital((hexdigits)),
};

const user_set = (chars = '', length = 1) => !chars ? '' : range(length).map(i => choice(chars)).join('');