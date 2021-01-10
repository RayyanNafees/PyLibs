function reverse(a) {
    rev = "";
    for (let i = a.length - 1; i >= 0; i--)
        rev += a[i];

    return rev;
}

function* iter(arr) { for (let i of arr) yield i; }
let it = gen => { for (let i of gen) console.log(i); };

function BaseNum(num, n) {
    let Changed = "";
    if (num == 0)
        Changed = "0";
    while (num != 0) {
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

function NoSimilar(str) {
    for (let i = 0; i < str.length; i++)
        for (let j = i + 1; j < str.length; j++)
            if (str[i] == str[j])
                return false;
    return true;
}

function Permutations(iterable, r) {
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

function Insert(s, i, c) {
    s = s.slice(0, i) + c + s.slice(i + 1);
    return s;
}
// let insert = (s, i, c) => s.slice(0, i) + c + s.slice(i + 1);


function Sorted(str) { // very important
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

function Combinations(iterable, r) {
    var Perms = Permutations(iterable, r);
    var CombPerm = [];

    for (let prm of Perms)
        if (prm == Sorted(prm))
            CombPerm.push([...prm]);

    return iter(CombPerm);
}

console.log(Insert('abcdef', 3, '|'));
it(Combinations("ABCD", 3));
console.log('\n')