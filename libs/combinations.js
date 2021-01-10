function* iter(arr) { for (let i of arr) yield i; }

let it = gen => { for (let i of gen) console.log(i); };

function range(stop$start, stop = null, step = 1) {
    let arr = [];
    let con = (stop == null);
    for (let i = con ? 0 : stop$start; i < (con ? stop$start : stop); arr.push(i), i += step);
    return arr;
}

Array.prototype.Set = function(index, val) {
    for (let i = index; i < this.length; i++)
        this[i] = val[i];

};


function BaseNum(num, n) {
    let reverse = str => [...str].reverse().join('');
    let Changed = num ? '' : '0';

    while (num) {
        Changed += (num % n);
        num = Math.floor(num / n);
    }
    return reverse(Changed);
}

function BaseToNum(n, to) {

    let Numbers = [BaseNum(0, n)];
    for (let i = 1; Numbers[Numbers.length - 1].length <= to; i++)
        Numbers.push(BaseNum(i, n));

    Numbers = Numbers.slice(0, Numbers.length - 1);

    for (let i = 0; i < Numbers.length && Numbers[i].length != to; i++)
        while (Numbers[i].length != to)
            Numbers[i] = '0' + Numbers[i];

    return Numbers;
}


function Permutations(iterable, r) {

    let NoSimilar = str => [...new Set(str).keys()].length == str.length;

    r = (r == null ? iterable.length : r);
    var Perms = BaseToNum(iterable.length, r);
    var TransPerms = [];
    let Now = 0;
    do {
        if (NoSimilar(Perms[Now])) {
            TransPerms.push(Perms[Now]);
            for (var i = 0; i < iterable.length; i++) {
                while (TransPerms[TransPerms.length - 1].search(i) != -1)
                    TransPerms[TransPerms.length - 1] = TransPerms[TransPerms.length - 1].replace(i, iterable[i]);
            }
        }
        Now++;
    } while (Now != Perms.length);

    return TransPerms;
}



function Sorted(str) { // very important

    let Insert = (s, i, c) => s.slice(0, i) + c + s.slice(i + 1);

    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j < str.length; j++) {
            if (str.charCodeAt(i) > str.charCodeAt(j)) {
                let tmp = str[i];
                str = Insert(str, i, str[j]);
                str = Insert(str, j, tmp);
            }
        }
    }
    return str;
}

let Combinations = (iterable, r) => iter(Permutations(iterable, r).filter(prm => prm == Sorted(prm)).map(prm => [...prm]));


let perms = function*(iterable, r = null) {
    // # permutations('ABCD', 2) --> AB AC AD BA BC BD CA CB CD DA DB DC
    // # permutations(range(3)) --> 012 021 102 120 201 210
    pool = [...iterable];
    n = pool.length;
    r = (r === null) ? n : r;
    if (r > n) return;

    indices = range(n);
    cycles = range(n, n - r, -1);
    yield indices.slice(0, r).map(i => pool[i]);

    while (n) {
        let tobrk;
        for (let i of range(r).reverse()) {
            cycles[i] -= 1;
            if (cycles[i] == 0) {
                indices.Set(i, indices.slice(i + 1) + indices.slice(i, i + 1));
                cycles[i] = n - i;
                tobrk = true;
            } else {
                j = cycles[i];
                [indices[i], indices[indices.length - j]] = indices[indices.length - j], indices[i];
                yield indices.slice(0, r).map(i => pool[i]);
                tobrk = false;
                break;
            }
        }
        if (tobrk) return;
    }
};









it(Combinations('ABCD', 3));
console.log('\n');
it(Permutations('ABCD', 3));
console.log('\n');
it(perms('ABCD', 3));