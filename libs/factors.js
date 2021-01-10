//* Prerequisitres:_______

function range(stop$start, stop = null, step = 1) {
    let arr = [];
    for (let i = !stop ? 0 : stop$start; i < (!stop ? stop$start : stop); arr.push(i), i += step);
    return arr;
}

function* items(obj) {
    for (let k of Object.keys(obj))
        yield [k, obj[k]];
}

let count = (item, seq) => seq.filter(i => i === item).length;

function obj(arr, func) {
    let keys = arr.map(func);
    let ob = {};
    for (let i of arr)
        ob[i] = keys[i];
    return ob;
}
//* ________

let prod = function(nums) {
    let prod = 1;
    for (let i of nums)
        prod *= i;

    return prod;
};

let factorial = num => num > 1 ? prod(range(1, num + 1)) : 1;

let factorise = num => range(2, num).filter(i => !num % i);

let isprime = num => !factorise(num).length;

let primes_till = num => range(2, num).filter(isprime);

let primes_in = num => !isprime(num) ? factorise(num).filter(isprime) : num;

let nearest_prime = function(prime, direct = 1) {
    while (true) {
        prime += Math.sign(direct); // +1/-1
        if (isprime(prime)) break;
    }
    return prime;
};

let pf = function prime_factorise(num) {
    let factors = [];

    for (let i of primes_in(num))
        while (!num % i) {
            factors.push(i);
            num = Math.floor(num / i);
        }

    return factors.sort();
};

let fact_count = num => obj(arr = pf(num), count(f, arr));

let fact_counts = (...nums) => obj(nums, fact_count);

let factorisation = (...nums) => obj(primes_in(prod(nums)), f => Object.values(fact_counts(...nums)).map(i => i[f] || 0));


let lcm = function(...nums) {
    factors = [];

    for (let [k, v] of items(factorisation(...nums)))
        factors.push(k ** Math.max(v));

    return prod(factors);
};

let hcf = function(...nums) {
    factors = [];

    for (let [k, v] of items(factorisation(...nums)))
        if (v.length == nums.length)
            factors.push(k ** Math.min(v));

    return prod(factors);
};