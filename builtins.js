const ord = char => char.charCodeAt(0);

const chr = String.fromCharCode;

const all = f((...conditions) => conditions.length > 1 ? !(conditions.map(i => Boolean(i)).includes(false)) : all(...conditions[0]));

const any = f((...conditions) => conditions.length > 1 ? conditions.map(i => Boolean(i)).includes(true) : all(...conditions[0]));

const bool = Boolean;

const exec = cmd => (new Function(cmd))(); // Can be blocked by some browsers... because of security issues

const type = obj => { typestr = typeof(obj); return eval(typestr[0].toUpperCase() + typestr.slice(1)); };

const abs = Math.abs;

const __all__ = arr => arr.map(f => exec('' + f));

const map = (func, iterable) => [...iter(iterable)].map(func);

const filter = (func, iterable) => [...iter(iterable)].filter(func);

//*_______________

function isiterable(struct) {
    try {
        for (let i of struct);
        return true;
    } catch (TypeError) {
        return false;
    }

}

function stringify(obj) {}

function map2obj() {}

function f(func) {
    function wrapper(...args) {
        if (args.length === 1)
            return func(...args[0]);
    }
    return wrapper;
}


function new_err(name, extension = Error, as_func = false) {
    class Exception extends extension {
        constructor(msg) {
            super(msg);
            this.name = String(name);
        }
    }
    return !as_func ? Exception : (msg => new Exception(msg));
}
//*___________________

//* Errors:
const Exception = new_arr('Exception');
const AssertionError = new_err('AssertionError');
const ValueError = new_err('ValueError');
const StopIteration = new_err('StopIteration');

const assert = (condition, errmsg) => !condition ? new AssertionError(errmsg) : undefined;
let r = String.raw;

const len = function(collection) {
    if (isiterable(collection)) {
        let ln = collection.length;
        if (!ln) {
            let count = 0;
            for (let i of collection) count++;
            return count;
        }
        return ln;
    }

    let count = 0;
    for (let i in collection)
        count++;
    return count;
};

const range = function(stop$start, stop = null, step = 1) {
    let arr = [];
    let con = (stop == null);
    for (let i = con ? 0 : stop$start; i < (con ? stop$start : stop); arr.push(i), i += step);
    return arr;
};

const dir = function(obj) {
    //* pass as type(obj) to get its attributes
    let arr = [];
    for (let i in obj)
        arr.push(i);
    if (arr.length)
        return arr;
};


const iter = function*(iterable) {
    if (typeof(iterable) === "object") {
        for (let i in iterable) yield i;

    } else {

        let _iterable = iterable.__iter__ ? iterable.__iter__() : iterable;
        for (let i of _iterable) yield i;
    }
};


const next = function(iterobj) {
    if (iterobj.__next__) return iterobj.__next__();

    if (!iterobj.next) return TypeError(`'${typeof iterobj}' object is not an iterator!`);

    while (true) {
        if (iterobj.next().done)
            return new StopIteration('');
        return iterobj.next().value;
    }
};

// Error Prones____________________________________

const max = function(...iterables) {
    if (iterables.length === 1)
        return max(...iterables[0]);
    let elem = (iterables[0]);
    if (type(elem) === Number)
        return Math.max(...iterables);
    else if (isiterable(elem) && len(elem) > -1)
        return Math.max(...map(i => len(i), iterables));
};

const min = function(...iterables) {
    let arr = [...iterables];
    for (let i = 1; i < iterables.length; i++)
        arr.splice(arr.indexOf(max(...iterables)));
    return [arr, arr[0]];
};
//max = Math.max ;;; min = Mah.min
//____________________________________________________


const zip = function*(...iterables) {

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
};

const enumerate = iterable => zip(range(iterable.length), iterable);
//    enumerate = iterable => iter([...iter(iterable)].map((i, n) => [n].concat(i)));

const reversed = iterable => zip([...iterable].reverse());

const sum = function(iterable) {
    let n = 0;
    for (let i of iterable)
        n += i;
    return n;
};


const print = function(...vals) {

    //* Keyword stuff!
    let sep = ' ';
    let end = '\n';
    let file = console;
    let last = vals[vals.length - 1];

    if (
        typeof(last) === 'object' &&
        len(last) <= 3 &&
        any(['sep', 'end', 'file'].map((i) => i in last))
    ) {
        let props = vals[vals.length - 1];
        sep = props.sep || ' ';
        end = props.end || '\n';
        file = props.file || console;
        vals.pop();
    }

    //* Stringification
    for (let i in range(len(vals))) {
        try {
            vals[i] = vals[i].__repr__();
        } catch (TypeError) {
            let strobj = JSON.stringify(vals[i]);
            vals[i] = len(strobj) > 2 ? strobj : JSON.constructor(vals[i]);
        }
    }

    let str = [...vals].join(sep) + end;
    return dir(file).includes('log') ? file.log(str) : file.write(str);
};




//* Built-in Data Structs_____________________

class list extends Array {

    constructor(iterable = []) {
        super(...iterable);
        this.arr = iterable ? [...iterable] : [];
        this.length = this.arr.length;
    }
    toString() { return JSON.stringify(this.arr); }
    __repr__() { this.toString(); }

    count(obj) {
        let occurance = 0;
        for (let i of this.arr)
            obj === i ? occurance++ : null;
        return occurance;
    }

    clear() { this.arr = []; }

    copy() { return this.arr.copyWithin(); }

    append(obj) { this.arr.push(obj); }

    extend(iterable) { this.arr = [...this.arr, ...iterable]; }

    insert(index, obj) { this.arr.splice(index, 0, obj); }

    pop(index = 0) { return this.arr.splice(index, 1)[0]; }

    remove(obj) { this.pop(this.arr.indexOf(obj)); }

    index(obj) { return this.arr.indexOf(obj); }

    reverse() { return this.arr.reverse(); }

    sort() { this.arr.sort(); }


}

class dict extends Object {
    constructor(iterable) {
        super(iterable);
    }

    items() {
        let arr = [];
        for (let k in this) arr.push([k, this[k]]);
        return arr;
    }

    pop() {}
    popitem() {}
    setdefault() {}
    update() {}
    copy() {}
    fromkeys() {}

    get(val, alter) { return (this[val] || alter); }
    clear() { this.prototype = {}; }
    keys() { return Object.keys(this); }
    values() { return Object.values(this); }
    __repr__() { return JSON.stringify(this); }
    __str__() { return this.__repr__(); }
    toString() { return this.__repr__(); }
}

class set extends Set {
    constructor(iterable) { super(iterable); }

    __repr__() {}
    __str__() {}
    add() {}
    clear() {}
    copy() {}
    difference() {}
    difference_update() {}
    discard() {}
    intersection() {}
    intersection_update() {}
    isdisjoint() {}
    issubset() {}
    issuperset() {}
    pop() {}
    remove() {}
    symmetric_difference() {}
    symmetric_difference_update() {}
    union() {}
    update() {}
}



class int extends Number {
    constructor(iterable, base = 10) { super(iterable); }

    __repr__() {}
    __str__() {}
    as_integer_ratio() {}
    bit_length() {}
    conjugate() {}
    denominator() {}
    from_bytes() {}
    imag() {}
    numerator() {}
    real() {}
    to_bytes() {}
}



class float extends Number {
    constructor(iterable) { super(iterable); }

    __repr__() {}
    __str__() {}
    as_integer_ratio() {}
    conjugate() {}
    fromhex() {}
    hex() {}
    imag() {}
    is_integer() {}
    real() {}
}


//* Customise toString() method to override console.log behaviour
class str extends String {

    constructor(obj) {
        let func = obj.__str__ || JSON.stringify;
        this.strs = (x = func(obj)).length > 2 ? x : String(obj);
        this.sup = super(obj);
    }

    join(iterable) { return [...iter(iterable)].join(this.strs); }
    startswith(chars) { return super.startsWith(chars); }
    endswith(chars) { return super.endsWith(chars); }

    __repr__() { return this.sup; }

    strip() { return super.trim(); }
    lstrip() { return super.trimLeft(); }
    rstrip() { return super.trimRight(); }

    capitalize() { return this[0].toUppercase() + super.slice(1).toLowerCase(); }
    title() { return this.capitalize(); }
    lower() { return super.toLowerCase(); }
    upper() { return super.toUpperCase(); }

    count(char, start = 0, end = -1) { return filter(i => i == char, super.slice(start, end)).length; }

    center(width, fillchar = ' ') { return super.length > width ? fillchar.repeat(width) + this.strs + fillchar.repeat(width) : this.strs; }
    ljust(width, fillchar = ' ') { return super.length > width ? fillchar.repeat(width) + this.strs : this.strs; }
    rjust(width, fillchar = ' ') { return super.length > width ? this.strs + fillchar.repeat(width) : this.strs; }

    find(sub, start = 0, end = -1) { return super.slice(start, end + 1).indexOf(sub); }
    rfind(sub, start = 0, end = -1) { return super.slice(start, end + 1).lastIndexOf(sub); }
    index(sub, start = 0, end = -1) { return (ind = this.find(sub, start, end)) !== -1 ? ind : ValueError('substring not found'); }
    rindex(sub, start = 0, end = -1) { return (ind = this.rfind(sub, start, end)) !== -1 ? ind : ValueError('substring not found'); }

    isascii() {}
    isprintable() {}
    isidentifier() {}

    isdigit() {}
    isdecimal() {}
    isnumeric() {}

    isalpha() { return all(...map(i => range(65, 123).includes(ord(i)), this.strs)); }
    isalnum() { return all(this.isalpha(), this.isdecimal(), this.isdigit(), this.isnumeric()); }

    isspace() { return all(...map((i => ['\n', '\t', ' '].includes(i)), this.strs)); }

    islower() { return this.strs === this.lower(); }
    isupper() { return this.strs === this.upper(); }
    istitle() { return this.strs === this.title(); }

    partition(sep) {
        return !super.includes(sep) ? [this.strs, '', ''] : [super.slice(0, this.index(sep)), sep, super.slice(super.lastIndexOf(sep), -1)];
    }
    rpartition(sep) {
        return !super.includes(sep) ? ['', '', this.strs] : [super.slice(0, super.lastIndexOf(sep)), sep, super.slice(super.index(sep), -1)];
    }

    replace(old, New, count = -1) {
            return (count <= -1 || this.count(old) === count) ? super.replaceAll(old, New) :
                eval(`super${`.replace(${old},${New})`.repeat(count)}`);
    }

    //* Yet to work on__________________

    swapcase() {
        let s = '';
        let inds = range(65, 123);
        let f = c => inds.includes(ord(c));

        for (let i of this.strs) {
            if (all(...map(f, this.strs)))
                s += i === i.toUpperCase() ? i.toLowerCase() : i.toUpperCase();
            else s += i;
        }
        return s;
    }

    zfill(width) {
        if (width <= super.length)
            return this.strs;

        let has_sign = this.strs[0] === '+' || this.strs[0] === '-' ? true : false;

        return has_sign ? this.strs[0] + '0'.repeat(width) + this.strs.slice(1) : '0'.repeat(width) + this.strs;
    }



    casefold() { }
    encode() { }
    expandtabs() { }

    split(sep = ' ', maxsplit = -1) {
        if (maxsplit < 0)
            return super.split(sep);
    }

    rsplit(sep = null, maxsplit = -1) { }
    splitlines(keepends = null) { }

    maketrans(x, y = null, z = null) { }
    translate(table) { }

    format() { }
    format_map(object) { }
}