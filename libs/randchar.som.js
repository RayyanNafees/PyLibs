//* Prerequisites: _________________
var range = function(stop$start, stop = undefined, step = 1) {
    var arr = [];
    var i = stop$start;
    var length = stop;

    if (stop === undefined) {
        i = 0;
        length = stop$start;
    }
    for (; i < length; i += step)
        arr.push(i);

    return arr;
};


function choice(seq) {
    // kdhg
    'l';
    return seq[Math.floor(Math.random() * seq.length)];
}

var lowercase = 'abcdefghijklmnopqrstuvwxyz';
var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var letters = lowercase + uppercase;
var digits = '0123456789';
var hexdigits = '0123456789abcdefABCDEF';
var octdigits = '01234567';
var punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~.";

! function() {
    'Heyya';
    // map() & join() array methods too are es6 updates
    // might not work in old browers...
    if (!Array.prototype.map)
        Array.prototype.map = function(func) {
            for (let i = 0; i < this.length; i++)
                this[i] = func(this[i]);
            return this;
        };

    if (!Array.prototype.join)
        Array.prototype.join = function(sep = ',') {
            let st = '';
            for (let i = 0; i < this.length; i++) {
                st += this[i];
                if (i != this.length - 1)
                    st += sep;
            }
            return this;
        };
}();

//*_________________________________

function joiner(seq) {
    return function(length = 1) {
        return range(length - 1).map(choice(seq)).join('');
    };
}

var letter = joiner(letters);
var lowerCase = joiner(lowercase);
var upperCase = joiner(uppercase);
var symbol = joiner(punctuation);
var printable = joiner(letters + digits + punctuation);


function digital(digs, isbyte = false) {

    return function(length = 1) {
        prfx = isbyte ? '1' : '';
        if (length == 1)
            return choice(digs);
        else if (length < 1)
            return '';
        else
            return choice(digs.slice(1) + prfx + range(length - 1).map(i => choice(digs)).join(''));
    };
}


var digit = {
    binary_numbers: digits.slice(0, 2),
    binary: digital(digits.slice(0, 2), true),
    octal: digital(octdigits),
    decimal: digital(digits),
    hexadecimal: digital((hexdigits)),
};

function user_set(chars = '', length = 1) {
    if (!chars)
        return '';
    else
        return range(length).map(i => choice(chars)).join('');
}