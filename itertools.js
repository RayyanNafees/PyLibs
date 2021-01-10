const __name__ = 'itertools';
const __loader__ = function() {};
const __package__ = '';
const __spec__ = function() {};
const _grouper = function() {};
const _tee = function() {};
const _tee_dataobject = function() {};

//* Prerequisites____________________

// class StopIteration extends Error {}

let enumerate = iterable => zip(range(iterable.length), iterable);

let add = (a, b) => a + b;

let it = iterable => { for (let i of iterable) console.log(i); };

let sorted = arr => { arr.sort(); return arr; };

let reverse = arr => { arr.reverse(); return arr; };

function eq(arr1, arr2) {
    for (let [i, j] of zip(arr1, arr2)) {
        if (i != j) return false;
    }
    return true;
}

function* iter(iterable) {
    if (!iterable.__iter__) {
        for (let i of iterable) yield i;
    } else {
        for (let i of iterable.__iter__()) yield i;
    }
}


function next(iterobj) {
    if (iterobj.__next__)
        iterobj.__next__();
    else {
        if (!iterobj.next)
            return TypeError(`'${typeof(iterobj)}' object is not an iterator!`);
        while (true) {
            if (iterobj.next().done)
                return Error('Strop Iteration');
            return iterobj.next().value;
        }
    }
}


function range(stop$start, stop = null, step = 1) {
    let arr = [];
    for (let i = !stop ? 0 : stop$start; i < (!stop ? stop$start : stop); arr.push(i), i += step);
    return arr;
}


function* zip(...iterables) {

    if (iterables.length === 1) {
        for (let i of iterables[0]) yield i;
    }

    let smallest_len = Math.min(...[...iterables].map(i => i.length));
    let iter_items = [];

    for (let i in iterables)
        iterables[i] = [...iterables[i]]; //Make every iterable an array

    for (let i = 0; i < smallest_len; i++) {
        for (let iterable of iterables)
            iter_items.push(iterable[i]);
        yield iter_items;
        iter_items = [];
    }
}

function mul(arr, rep) {
    if (rep === 1) return arr;

    let newarr = [];
    for (let i of range(rep))
        newarr.push(...arr);
    return newarr;
}

function set(iterable) {
    let arr = [];
    for (let i of iterable) {
        if (!arr.includes(i))
            arr.push(i);
    }
    return arr;
}


//* ____________________________________ 



//* Infinite Iterators: (All tested)

const count = function*(start = 0, step = 1) {
    while (true) {
        yield start;
        start += step;
    }
};

const cycle = function*(iterable) {
    // cycle('ABCD') --> A B C D A B C D A B C D ...
    let saved = [];
    for (let element of iterable) {
        yield element;
        saved.push(element);
    }
    while (saved) {
        for (let element in saved)
            yield element;
    }
};


const repeat = function*(obj, times = null) {
    // repeat(10, 3) --> 10 10 10
    if (times === null) {
        while (true)
            yield obj;
    } else {
        for (let i = 0; i < times; i++)
            yield obj;
    }
};



//* Iterators terminating on the shortest input sequence: 
//*         (filetr_false, compress, chain, chain.from_iterable tested)

const accumulate = function*(iterable, func = add, initial = null) { // behaves differently then that of python
    //* Return running totals
    // accumulate([1,2,3,4,5]) --> 1 3 6 10 15
    // accumulate([1,2,3,4,5], initial=100) --> 100 101 103 106 110 115
    // accumulate([1,2,3,4,5], operator.mul) --> 1 2 6 24 120
    let it = iter(iterable);
    let total = initial;
    if (initial === null) {
        try { total = next(it); } catch (e) { return; }
    }

    yield total;
    for (let element of it) {
        total = func(total, element);
        yield total;
    }

};
const chain = function*(...iterables) { //checked
    // chain('ABC', 'DEF') --> A B C D E F
    for (let it of iterables) {
        for (let element of it)
            yield element;
    }


};

chain.from_iterable = function*(iterables) { //checked
    // chain.from_iterable(['ABC', 'DEF']) --> A B C D E F
    for (let it of iterables) {
        for (let element of it)
            yield element;
    }
};

const compress = function*(data, selectors) { //checked
    // compress('ABCDEF', [1,0,1,0,1,1]) --> A C E F
    for (let [d, s] of zip(data, selectors)) {
        if (s) yield d;
    }
};

const dropwhile = function*(predicate, iterable) { // error
    // dropwhile(lambda x: x<5, [1,4,6,4,1]) --> 6 4 1
    iterable = iter(iterable);
    for (let x of iterable) {
        if (!predicate(x)) {
            yield x;
            break;
        }
    }
    for (let x of iterable)
        yield x;

};

const filterfalse = function*(predicate, iterable) { //checked
    // filterfalse(lambda x: x%2, range(10)) --> 0 2 4 6 8
    if (predicate === null)
        predicate = Boolean;
    for (let x of iterable) {
        if (!predicate(x))
            yield x;
    }
};

function slice(start, stop, step) {
    switch ((arg = arguments).length) {
        case 0:
            return TypeError('Requires at least one value of start, stop and step');
        case 1:
            return { start: null, stop: arg[0], step: null };
        case 2:
            return { start: arg[0], stop: arg[1], step: null };
        case 3:
            return { start: arg[0], stop: arg[1], step: arg[2] };
        default:
            return slice(arguments.slice(0, 3));
    }
}

const islice = function*(iterable, ...args) { //notworking
    // islice('ABCDEFG', 2) --> A B
    // islice('ABCDEFG', 2, 4) --> C D
    // islice('ABCDEFG', 2, None) --> C D E F G
    // islice('ABCDEFG', 0, None, 2) --> A C E G
    let s = slice(...args);
    let [start, stop, step] = [s.start || 0, s.stop || iterable.length, s.step || 1];
    let it = iter(range(start, stop, step));

    try {
        nexti = next(it);
    } catch (err) {
        // Consume *iterable* up to the *start* position.
        for (let [i, element] of zip(range(start), iterable));
        return;
    }
    try {
        for (let [i, element] of enumerate(iterable)) {
            if (i == nexti) {
                yield element;
                nexti = next(it);
            }
        }
    } catch (err) {
        // Consume to *stop*.
        for (var [i, element] of zip(range(i + 1, _stop), iterable));
    }
};

const starmap = function*(func, iterable) {
    // starmap(pow, [(2,5), (3,2), (10,3)]) --> 32 9 1000
    for (let args of iterable)
        yield func(...args);
};

const takewhile = function*(predicate, iterable) {
    // takewhile(lambda x: x<5, [1,4,6,4,1]) --> 1 4
    for (let x of iterable)
        if (predicate(x))
            yield x;
        else
            break;
};


const tee = function(iterable, n = 2) { // requires collections.deque()
    let it = iter(iterable);
    let deques = [];
    for (let i of range(n))
        deques.push(collections.deque());

    function* gen(mydeque) {
        while (True) {
            if (!mydeque) { // when the local deque is empty
                try {
                    newval = next(it); // fetch a new value and
                } catch (err) { return; }
                for (let d of deques) // load it to all the deques
                    d.append(newval);
            }
            yield mydeque.popleft();
        }
    }

    let tup = [];
    for (let d of deques)
        tup.push(gen(d));

    return tup;
};


const zip_longest = function*(fillvalue = null, ...args) {
    // zip_longest(fillvalue = '-', 'ABCD', 'xy') --> Ax By C- D-

    let iterators = args.map(it => iter(it));
    let num_active = iterators.length;
    if (!num_active)
        return;
    while (True) {
        let values = [];
        for (let [i, it] of enumerate(iterators)) {
            try { value = next(it); } catch (err) {
                num_active--;
                if (!num_active)
                    return;
                iterators[i] = repeat(fillvalue);
                value = fillvalue;
            }
            values.push(value);
        }
        yield [...values];
    }
};


//* Combinatoric iterators: (permutations() and product() tested)

const product = function*(...args) { //checked
    // product('ABCD', 'xy') --> Ax Ay Bx By Cx Cy Dx Dy
    // product(range(2), repeat=3) --> 000 001 010 011 100 101 110 111'

    let rep = 1;

    if (typeof(r = args[args.length - 1]) === "number") {
        rep = r;
        args = args.slice(0, -1);
        product(mul(args, r));
    }

    let tup = [];
    for (let pool of args)
        tup.push([...pool]);

    let pools = mul(tup, rep);
    let result = [
        []
    ];
    for (let pool of pools) {

        let res = [];
        for (let x of result) {
            for (let y of pool)
                res.push(x.concat([y]));
        }
        result = res;
    }

    for (let prod of result) yield [...prod];
};




const groupby = class {
    // [k for k, g in groupby('AAAABBBCCDAABBB')] --> A B C D A B
    // [list(g) for k, g in groupby('AAAABBBCCD')] --> AAAA BBB CC D
    constructor(iterable, key = null) {
        if (key === null)
            key = x => x;
        this.keyfunc = key;
        this.it = iter(iterable);
        this.tgtkey = this.currkey = this.currvalue = object();
    }

    __iter__() { return this; }

    __next__() {
        this.id = object();
        while (this.currkey == this.tgtkey) {
            this.currvalue = next(this.it); // Exit on StopIteration
            this.currkey = this.keyfunc(this.currvalue);
        }
        this.tgtkey = this.currkey;
        return (this.currkey, this._grouper(this.tgtkey, this.id));
    }

    *
    _grouper(tgtkey, id) {
        while (this.id === id && this.currkey == tgtkey) {
            yield this.currvalue;
            try { this.currvalue = next(this.it); } catch (err) {
                return;
            }
            this.currkey = this.keyfunc(this.currvalue);
        }
    }
};


const permutations = function*(iterable, r = null) { //checked
    // permutations('ABCD', 2) --> AB AC AD BA BC BD CA CB CD DA DB DC
    // permutations(range(3)) --> 012 021 102 120 201 210

    let pool = [...iterable];
    let n = pool.length;
    r = r === null ? n : r;
    for (let indices of product(range(n), rep = r)) {
        if (set(indices).length == r) {
            let tup = [];
            for (let i of indices)
                tup.push(pool[i]);
            yield tup;
        }
    }

};


const combinations = function*(iterable, r) { //Similar output.. But not functioning right
    // combinations('ABCD', 2) --> AB AC AD BC BD CD
    // combinations(range(4), 3) --> 012 013 023 123
    let pool = [...iterable];
    let n = pool.length;
    for (let indices of permutations(range(n), r)) {
        if (eq(sorted(indices), [...indices])) {
            let tup = [];
            for (let i of indices) tup.push(pool[i]);
            yield tup;
        }
    }
};

function* Combinations(iterable, r) {
    // combinations('ABCD', 2) --> AB AC AD BC BD CD
    // combinations(range(4), 3) --> 012 013 023 123
    let pool = [...iterable];
    let n = pool.length;
    if (r > n) return;

    let indices = [...range(r)];

    let tup = [];
    for (let i of indices) tup.push(pool[i]);
    yield tup;

    while (true) {
        for (let i of range(r).reverse()) {
            if (indices[i] != i + n - r) break;
        }

        indices[i] += 1;
        for (let j of range(i + 1, r))
            indices[j] = indices[j - 1] + 1;

        let tup = [];
        for (let i of indices) tup.push(pool[i]);
        yield tup;
    }

}
const combinations_with_replacement = function*(iterable, r) {
    //  combinations_with_replacement('ABC', 2) --> AA AB AC BB BC CC
    let pool = [...iterable];
    let n = pool.length;
    for (let indices of product(range(n), r)) {
        if (eq(sorted(indices), [...indices])) {
            let tup = [];
            for (let i of indices) tup.push(pool[i]);
            yield tup;
        }
    }
};

function* Combinations_with_replacement(iterable, r) {
    //  combinations_with_replacement('ABC', 2) --> AA AB AC BB BC CC
    let pool = [...iterable];
    let n = pool.length;
    if (!n && r) return;

    let indices = mul([0], r);

    let tup = [];
    for (let i of indices) tup.push(pool[i]);
    yield tup;

    while (true) {
        for (i of range(r).reverse()) {
            if (indices[i] != n - 1) break;

            for (let j = i; j < indices.length; j++)
                indice[i] = mul([indices[i] + 1], (r - i));
        }

        for (let j = i; j < indices.length; j++)
            indice[i] = mul([indices[i] + 1], (r - i));
        let tup = [];
        for (let i of indices) tup.push(pool[i]);
        yield tup;
    }
}


/*
product('ABCD', repeat=2)                   AA AB AC AD BA BB BC BD CA CB CC CD DA DB DC DD 
permutations('ABCD', 2)                     AB AC AD BA BC BD CA CB CD DA DB DC 
combinations('ABCD', 2)                     AB AC AD BC BD CD 
combinations_with_replacement('ABCD', 2)    AA AB AC AD BB BC BD CC CD DD 

*/


const __doc__ = `
Functional tools for creating and using iterators.

Infinite iterators:
count(start=0, step=1) --> start, start+step, start+2*step, ...
cycle(p) --> p0, p1, ... plast, p0, p1, ...
repeat(elem [,n]) --> elem, elem, elem, ... endlessly or up to n times

Iterators terminating on the shortest input sequence:
accumulate(p[, func]) --> p0, p0+p1, p0+p1+p2
chain(p, q, ...) --> p0, p1, ... plast, q0, q1, ...
chain.from_iterable([p, q, ...]) --> p0, p1, ... plast, q0, q1, ...
compress(data, selectors) --> (d[0] if s[0]), (d[1] if s[1]), ...
dropwhile(pred, seq) --> seq[n], seq[n+1], starting when pred fails
groupby(iterable[, keyfunc]) --> sub-iterators grouped by value of keyfunc(v)
filterfalse(pred, seq) --> elements of seq where pred(elem) is False
islice(seq, [start,] stop [, step]) --> elements from
       seq[start:stop:step]
starmap(fun, seq) --> fun(*seq[0]), fun(*seq[1]), ...
tee(it, n=2) --> (it1, it2 , ... itn) splits one iterator into n
takewhile(pred, seq) --> seq[0], seq[1], until pred fails
zip_longest(p, q, ...) --> (p[0], q[0]), (p[1], q[1]), ...

Combinatoric generators:
product(p, q, ... [repeat=1]) --> cartesian product
permutations(p[, r])
combinations(p, r)
combinations_with_replacement(p, r)
`;