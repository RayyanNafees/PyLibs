export const __name__ = 'math';
export const __doc__ = 'This module provides access to the mathematical functions\ndefined by the C standard.';
export const __package__ = '';


//* Number-theoretic and representation functions:

export const ceil = Math.ceil;
export const fabs = Math.abs;
export const floor = Math.floor;
export const trunc = Math.trunc;
export const isfinite = isFinite;
export const isnan = isNaN;

export const comb = (n, r) => r <= n ? factorial(n) / (factorial(r) * factorial(n - r)) : 0;
export const isinf = n => !isFinite(n);
export const isqrt = n => Math.floor(Math.sqrt(n));

export const copysign = (x, y) => Math.abs(x) * Math.sign(y);
export const fmod = function() {};
export const frexp = function() {};
export const fsum = function() {};
export const gcd = function(...integers) {};
export const isclose = function() {};

export const ldexp = () => x * (2 ** i);

export const modf = function() {};
export const perm = (n, r = 0) => r <= n ? factorial(n) / factorial(n - r) : 0

export const remainder = function() {};

export const factorial = function(m) {
    if (!m) return 1;
    if (m < 0) return TypeError('factorial() not defined for negative values');
    return m !== 1 ? m * factorial(m - 1) : m;
};

export const prod = function(iterable, start = 1) {
    for (let i of iterable) start *= i;
    return start;
};


//* Power and logarithmic functions:
export const exp = Math.exp;
export const expm1 = Math.expm1;

export const log = Math.log;
export const log1p = Math.log1p;
export const log2 = Math.log2;
export const log10 = Math.log10;
export const pow = Math.pow;
export const sqrt = Math.sqrt;


//* Trigonometric functions:
export const acos = Math.acos;
export const asin = Math.asin;
export const atan = Math.atan;
export const atan2 = Math.atan2;

export const cos = Math.cos;
export const sin = Math.sin;
export const tan = Math.tan;

export const dist = function(p, q) {
    // sqrt(sum((px - qx) ** 2.0 for px, qx in zip(p, q)))
    let sum = 0
    for (let [px, qx] of zip(p, q))
        sum += ((px - qx) ** 2);

    return sqrt(sum)
};

export const hypot = Math.hypot;


//* Angular conversion:
export const degrees = x => x / pi * 180;
export const radians = x => x / 180 * pi;


//* Hyperbolic functions:
export const acosh = Math.acosh;
export const asinh = Math.asinh;
export const atanh = Math.atanh;

export const cosh = Math.cosh;
export const sinh = Math.sinh;
export const tanh = Math.tanh;


//* Special functions
export const erf = function() {};
export const erfc = function() {};
export const gamma = function() {};
export const lgamma = function() {};


//* Constants:
export const tau = 2 * Math.PI;
export const pi = Math.PI;
export const e = Math.E;
export const inf = Infinity;
export const nan = NaN;