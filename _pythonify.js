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
    return (...args) => args.length === 1 && isiterable(args[0]) ? func(...args[0]) : func(...args);
}


function new_err(name, extension = Error, as_func = false) {
    class Exception extends extension {
        constructor(msg) {
            this(msg);
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
const KeyError = new_err('KeyError');

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

const max = f(function(...iterables) {

    let elem = (iterables[0]);
    if (type(elem) === Number)
        return Math.max(...iterables);
    else if (isiterable(elem) && len(elem) > -1) {

        let ln = Math.max(...iterables.map(i => len(i)));
        for (let iterable of iterables)
            if (len(iterable) == ln)
                return iterable;
    }
});

const min = f(function(...iterables) {

    let elem = (iterables[0]);
    if (type(elem) === Number)
        return Math.min(...iterables);

    else if (isiterable(elem) && len(elem) > -1) {

        let ln = Math.min(...iterables.map(i => len(i)));
        for (let iterable of iterables)
            if (len(iterable) == ln)
                return iterable;
    }
});
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

//* Array methods:

Array.prototype.toString = function() { return JSON.stringify(this); };

Array.prototype.__repr__ = function() { this.toString(); };

Array.prototype.count = function(obj) {
    let occurance = 0;
    for (let i of this)
        if (obj === i)
            occurance++;
    return occurance;
};

Array.prototype.clear = function() { for (let i of this) this.pop(); };

Array.prototype.copy = function() { return this.copyWithin(); };

Array.prototype.append = function(obj) { this.push(obj); };

Array.prototype.extend = function(iterable) { this.concat([...iterable]); };

Array.prototype.insert = function(index, obj) { this.splice(index, 0, obj); };

Array.prototype.pop = function(index = 0) { return this.splice(index, 1)[0]; };

Array.prototype.remove = function(obj) { this.pop(this.indexOf(obj)); };

Array.prototype.index = function(obj) { return this.indexOf(obj); };



//* <class 'object'>

Object.prototype.constructor = function(iterable) { this(iterable); };
Object.prototype[Symbol.iterator] = Object.keys;
Object.items = function(self) {
    let arr = [];
    for (let k in this) arr.push([k, this[k]]);
    return arr;
};

Object.pop = function(self, key) {};
Object.popitem = function(self, item) {};
Object.setdefault = function(self, k, v) { self[k] = v; };
Object.update = function(self, obj) {
    for (let k in obj)
        self[k] = obj[k];
};
Object.copy = function(self) { return new Object(self); };
Object.fromkeys = function() {};

Object.get = function(val, alter) { return (this[val] || alter); };
Object.clear = function() { this.prototype = {}; };
Object.__repr__ = function() { return JSON.stringify(this); };
Object.__str__ = function() { return this.__repr__(); };
Object.toString = function() { return this.__repr__(); };


//* <class 'set'>

Set.prototype.constructor = function(iterable) { return new Set(iterable); };
Set.prototype[Symbol.iterator] = function() { return this.values(); };
Set.prototype.__repr__ = function() { return '{' + this.values().join(',') + '}'; };
Set.prototype.toString = function() { return '{' + this.values().join(',') + '}'; };
Set.prototype.copy = function() { return new Set(this.values()); };

Set.prototype.difference = function(set) {
    let new_set = new Set(this.values());
    for (let i of set)
        if (new_set.has(i))
            new_set.delete(i);
    return new_set;
};

Set.prototype.difference_update = function() {};
Set.prototype.discard = function(elem) { if (this.has(elem)) this.delete(elem); };

Set.prototype.intersection = function(set) {
    let new_set = new Set();
    for (let i of set.values())
        if (this.has(i))
            new_set.add(i);
    return new_set;
};

Set.prototype.intersection_update = function() {};

Set.prototype.isdisjoint = function(set) {
    for (let i of this.values())
        if (set.has(i))
            return false;
    return true;
};

Set.prototype.issubset = function(set) {
    for (let i of this.values())
        if (!set.has(i))
            return false;
    return true;
};
Set.prototype.issuperset = function(set) {
    for (let i of set.values())
        if (!this.has(i))
            return false;
    return true;
};

Set.prototype.pop = function() {
    vals = this.values();
    this.delete(item = vals[vals.length - 1]);
    return item;
};

Set.prototype.remove = function(val) {
    return (!this.has(val)) ? new KeyError('Element not found') : this.delete(val);
};

Set.prototype.symmetric_difference = function() {};
Set.prototype.symmetric_difference_update = function() {};

Set.prototype.union = function(...others) {
    for (let set of others)
        for (let i of set)
            this.add(i);
};

Set.prototype.update = function() {};


//* <class 'int'>

Number.constructor = function(iterable, base = 10) { this(iterable); };
Number.prototype.__repr__ = function() {};
Number.prototype.__str__ = function() {};
Number.prototype.as_integer_ratio = function() {};
Number.prototype.bit_length = function() {};
Number.prototype.conjugate = function() {};
Number.prototype.denominator = function() {};
Number.prototype.from_bytes = function() {};
Number.prototype.imag = function() {};
Number.prototype.numerator = function() {};
Number.prototype.real = function() {};
Number.prototype.to_bytes = function() {};



//* <class 'float'>

Number.constructor = function(st) { return Number(st); };
Number.prototype.__repr__ = function() {};
Number.prototype.__str__ = function() {};
Number.prototype.as_integer_ratio = function() {};
Number.prototype.conjugate = function() {};
Number.prototype.fromhex = function() {};
Number.prototype.hex = function() {};
Number.prototype.imag = function() {};
Number.prototype.is_integer = function() {};
Number.prototype.real = function() {};



//* Customise toString() method to override console.log behaviour


String.constructor = function(obj) {
    let func = obj.__str__ || JSON.stringify;
    obj = (x = func(obj)).length > 2 ? x : String(obj);
    return String(obj);
};

String.prototype.join = function(iterable) { return [...iter(iterable)].join(this); };
String.prototype.startswith = function(chars) { return this.startsWith(chars); };
String.prototype.endswith = function(chars) { return this.endsWith(chars); };

String.prototype.__repr__ = function() { return this.sup; };

String.prototype.strip = function() { return this.trim(); };
String.prototype.lstrip = function() { return this.trimLeft(); };
String.prototype.rstrip = function() { return this.trimRight(); };

String.prototype.capitalize = function() { return this[0].toUppercase() + this.slice(1).toLowerCase(); };
String.prototype.title = function() { return this.capitalize(); };
String.prototype.lower = function() { return this.toLowerCase(); };
String.prototype.upper = function() { return this.toUpperCase(); };

String.prototype.count = function(char, start = 0, end = -1) { return filter(i => i == char, this.slice(start, end)).length; };

String.prototype.center = function(width, fillchar = ' ') { return this.length > width ? fillchar.repeat(width) + this + fillchar.repeat(width) : this; };
String.prototype.ljust = function(width, fillchar = ' ') { return this.length > width ? fillchar.repeat(width) + this : this; };
String.prototype.rjust = function(width, fillchar = ' ') { return this.length > width ? this + fillchar.repeat(width) : this; };

String.prototype.find = function(sub, start = 0, end = -1) { return this.slice(start, end + 1).indexOf(sub); };
String.prototype.rfind = function(sub, start = 0, end = -1) { return this.slice(start, end + 1).lastIndexOf(sub); };
String.prototype.index = function(sub, start = 0, end = -1) { return (ind = this.find(sub, start, end)) !== -1 ? ind : ValueError('substring not found'); };
String.prototype.rindex = function(sub, start = 0, end = -1) { return (ind = this.rfind(sub, start, end)) !== -1 ? ind : ValueError('substring not found'); };

String.prototype.isascii = function() {};
String.prototype.isprintable = function() {};
String.prototype.isidentifier = function() {};

String.prototype.isdigit = function() {};
String.prototype.isdecimal = function() {};
String.prototype.isnumeric = function() {};
String.prototype.isalpha = function() { return all(...map(i => range(65, 123).includes(ord(i)), this)); };
String.prototype.isalnum = function() { return all(this.isalpha(), this.isdecimal(), this.isdigit(), this.isnumeric()); };

String.prototype.isspace = function() { return all(...map((i => ['\n', '\t', ' '].includes(i)), this)); };

String.prototype.islower = function() { return this === this.lower(); };
String.prototype.isupper = function() { return this === this.upper(); };
String.prototype.istitle = function() { return this === this.title(); };

String.prototype.partition = function(sep) {
    return !this.includes(sep) ? [this, '', ''] : [this.slice(0, this.index(sep)), sep, this.slice(this.lastIndexOf(sep), -1)];
};
String.prototype.rpartition = function(sep) {
    return !this.includes(sep) ? ['', '', this] : [this.slice(0, this.lastIndexOf(sep)), sep, this.slice(this.index(sep), -1)];
};
String.prototype.replace = function(old, New, count = -1) {
        return (count <= -1 || this.count(old) === count) ? this.replaceAll(old, New) :
            eval(`this${`.replace(${old},${New})`.repeat(count)}`);
    };

    //* Yet to work on__________________

    String.prototype.swapcase= function() {
        let s = '';
        let inds = range(65, 123);
        let f = c => inds.includes(ord(c));

        for (let i of this) {
            if (all(...map(f, this)))
                s += i === i.toUpperCase() ? i.toLowerCase() : i.toUpperCase();
            else s += i;
        }
        return s;
    };

    String.prototype.zfill= function(width) {
        if (width <= this.length)
            return this;

        let has_sign = this[0] === '+' || this[0] === '-' ? true : false;

        return has_sign ? this[0] + '0'.repeat(width) + this.slice(1) : '0'.repeat(width) + this;
    };



    String.prototype.casefold= function() { };
    String.prototype.encode= function() { };
    String.prototype.expandtabs= function() { };

    String.prototype.split= function(sep = ' ', maxsplit = -1) {
        if (maxsplit < 0)
            return this.split(sep);
    };

    String.prototype.rsplit= function(sep = null, maxsplit = -1) { };
    String.prototype.splitlines= function(keepends = null) { };

    String.prototype.maketrans= function(x, y = null, z = null) { };
    String.prototype.translate= function(table) { };

    String.prototype.format= function() { };
    String.prototype.format_map= function(object) { };