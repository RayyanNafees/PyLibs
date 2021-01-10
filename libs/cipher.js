//* Prerequisites: ______________________

function range(stop$start, stop = null, step = 1) {
    let arr = [];
    for (let i = !stop ? 0 : stop$start; i < (!stop ? stop$start : stop); arr.push(i), i += step);
    return arr;
}

function* zip(...iterables) {

    if (iterables.length === 1) {
        for (let i of iterables[0]) yield i;
    }

    let smallest_len = Math.min(...map(i => len(i), iterables));
    let iter_items = [];

    for (let i of iterables)
        iterables[i] = [...iterables[i]]; //Make every iterable an array

    for (let i = 0; i < smallest_len; i++) {
        for (let iterable of iterables)
            iter_items.push(iterable[i]);
        yield iter_items;
        iter_items = [];
    }
}

function __make_eq(l, m) {
    let [small, big] = l.length < m.length ? [l, m] : [m, l];
    small = small.repeat(Math.floor((a = big.length) / (b = small.length)));
    small += range(a % b).map(i => small[i]).join('');
    return small == l ? [small, big] : [big, small];
}
//*___________________________________________________


let veginere = function(text, key) {
    [text, key] = __make_eq(text, key);
    Alpha = range(65, 65 + 26).map(i => String.fromCharCode(i)).join('');
    alpha = Alpha.toLowerCase();

    let [a, A] = [alpha.indexOf, Alpha.indexOf];

    let encr = [];
    for (let [t, k] of zip(text, key)) {
        if (alpha.includes(t))
            encr.push(alpha[a(t) + (a(k) - 26)]); // Since, alpha.length = 26
        else if (Alpha.includes(t))
            encr.push(Alpha[A(t) + (A(k) - 26)]); // Since, Alpha.length = 26
        else
            encr.push(t);
    }

    return encr;
};

let caeser = (text, key) => [...text].map(i => String.fromCharCode(i.charCodeAt(0) + Number(key))).join('');

let binary = (text, sep = ' ') => [...text].map(c => Number(c.charCodeAt(0)).toString(2)).join(sep);

const morses = {
    'a': '.-',
    'b': '-...',
    'c': '-.-.',
    'd': '-..',
    'e': '.',
    'f': '..-.',
    'g': '--.',
    'h': '....',
    'i': '..',
    'j': '.---',
    'k': '-.-',
    'l': '.-..',
    'm': '--',
    'n': '-.',
    'o': '---',
    'p': '.--.',
    'q': '--.-',
    'r': '.-.',
    's': '...',
    't': '-',
    'u': '..-',
    'v': '...-',
    'w': '.--',
    'x': '-..-',
    'y': '-.--',
    'z': '--..',
    '0': '-----',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '+': '.-.-.',
    '-': '-....-',
    '=': '-...-',
    '_': '..--.-',
    '!': '-.-.--',
    '@': '.--.-.',
    '$': '...-..-',
    '/': '-..-.',
    '(': '-.--.',
    ')': '-.--.-',
    "'": '.----.',
    ':': '---...',
    ';': '-.-.-.',
    ',': '--..--',
    '?': '..--..'
};

let morse = (text, sep = ' ') => [...text.toLowerCase().replaceAll(' ', '!:;')].map(ch => morses[ch] || ch).join(sep);



//*_______________________ <decrypt> __________________________

let uncaeser = (text, key) => [...text].map(i => String.fromCharCode(i.charCodeAt(0) - Number(key))).join('');

let unbinary = (bin, sep = ' ') => bin.split(sep).map(i => String.fromCharCode(parseInt(i, 2))).join('');

let deveginere = function(text, key) {
    [text, key] = __make_eq(text, key);
    Alpha = range(65, 65 + 26).map(i => String.fromCharCode(i)).join('');
    alpha = Alpha.toLowerCase();

    let [a, A] = [alpha.indexOf, Alpha.indexOf];

    let encr = [];
    for (let [t, k] of zip(text, key)) {
        if (alpha.includes(t))
            encr.push(alpha[a(t) - (a(k) - 26)]); // Since, alpha.length = 26
        else if (Alpha.includes(t))
            encr.push(Alpha[A(t) - (A(k) - 26)]); // Since, Alpha.length = 26
        else
            encr.push(t);
    }

    return encr;
};

let unmorse = function(code, sep = ' ') {
    let unmorses = {};
    for (let [k, v] of zip(Object.keys(morses), Object.values(morses)))
        unmorses[v] = k;

    return code.split(sep).map(bits => unmorses[bits] || bits).join('').replaceAll('!:;', ' ');
};