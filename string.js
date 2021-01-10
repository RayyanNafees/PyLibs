const __name__ = 'string';
const __doc__ = 'A collection of string constants.\n\nPublic module variables:\n\nwhitespace -- a string containing all ASCII whitespace\nascii_lowercase -- a string containing all ASCII lowercase letters\nascii_uppercase -- a string containing all ASCII uppercase letters\nascii_letters -- a string containing all ASCII letters\ndigits -- a string containing all ASCII decimal digits\nhexdigits -- a string containing all ASCII hexadecimal digits\noctdigits -- a string containing all ASCII octal digits\npunctuation -- a string containing all ASCII punctuation characters\nprintable -- a string containing all ASCII characters considered printable\n\n';

//* Prerequisites: _______________
/*
class ValueError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'ValueError';
    }
}
*/
function* items(obj) {
    for (let k of Object.keys(obj))
        yield [k, obj[k]];
}

//*__________________________

const ascii_lowercase = 'abcdefghijklmnopqrstuvwxyz';
const ascii_uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ascii_letters = ascii_lowercase + ascii_uppercase;
const digits = '0123456789';
const hexdigits = '0123456789abcdefABCDEF';
const octdigits = '01234567';
const punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~.";
const whitespace = '\n\t\r\f\l'; // see their coddes online from docs

const capwords = function(s, sep = ' ') {
    let arr = [];
    for (let word of s.split(sep))
        arr.push(word[0].toUpperCase() + word.slice(1).toLowerCase());

    return arr.join(sep);
};

const printable = function() {};


const Formatter = class {
    constructor() {}
    format(format_string, ...args) {}
    vformat(format_string, args, kwargs) {}
    parse(format_string) {}
    get_field(field_name, args, kwargs) {}
    get_value(key, args, kwargs) {}
    check_unused_args(used_args, args, kwargs) {}
    format_field(value, format_spec) {}
    convert_field(value, conversion) {}
};

const Template = class {
    constructor(template) {
        this.temp = template;
        this.delimiter = '$';
    }

    substitute(mapping = {}) {}

    safe_substitute(mapping = {}) {
        let [st, d] = [this.temp, this.delimiter];
        for (let [k, v] of items(mapping))
            if (st.includes(d + k))
                st.replaceAll(d + k, v);
        return st;
    }
};