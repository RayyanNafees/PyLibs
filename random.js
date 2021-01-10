export const __name__ = 'random';

export const __doc__ = `
Random variable generators.

    integers
    --------
           uniform within range

    sequences
    ---------
           pick random element
           pick random sample
           pick weighted random sample
           generate random permutation

    distributions on the real line:
    ------------------------------
           uniform
           triangular
           normal (Gaussian)
           lognormal
           negative exponential
           gamma
           beta
           pareto
           Weibull

    distributions on the circle (angles 0 to 2pi)
    ---------------------------------------------
           circular uniform
           von Mises

General notes on the underlying Mersenne Twister core generator:

* The period is 2**19937-1.
* It is one of the most extensively tested generators in existence.
* The random() method is implemented in js, executes in a single Python step,
  and is, therefore, threadsafe.

`;


//*Bookkeeping Functions:

export const seed = (a = null, version = 2) => {};
export const getstate = () => {};
export const setstate = state => {};
export const getrandbits = k => {};


//* Functions for integers:

export const randrange = function(start, stop = null, step = 1, _int = Number) {
    // Need Adjustments!!________________________________________
    if (String(start).includes('.') || String(stop).includes('.'))
        return TypeError('Requires an integer recieved float');

    let place = Number('1' + '0'.repeat(String(stop).length));
    let ints = [];
    for (let i = start; i < stop; i += step)
        ints.push(i);

    let indx = Math.floor(Math.random() * place);
    return indx < ints.length ? ints[indx] : randint(start, stop);
};

export const randint = (a, b) => randrange(a, b + 1);


//* Functions for sequences:

export const choice = seq => seq[Math.floor(Math.random() * seq.length)];
export const choices = (population, weights = null, cum_weights = null, k = 1) => {};
export const shuffle = (x, random = null) => {};
export const sample = (population, k) => {};


//* Real-valued Distributions:

export const random = Math.random;
export const uniform = (a, b) => {};
export const triangular = (low, high, mod) => {};
export const betavariate = (alpha, beta) => {};
export const expovariate = lambda => {};
export const gammavariate = (alpha, beta) => {};
export const gauss = (mu, sigma) => {};
export const lognormvariate = (mu, sigma) => {};
export const normalvariate = (mu, sigma) => {};
export const vonmisesvariate = (mu, kappa) => {};
export const paretovariate = alpha => {};
export const weibullvariate = (alpha, beta) => {};


//* Alternative Generator:

export class Random { constructor(seed = null) {} }
export class SystemRandom { constructor(seed = null) {} }


/*
*___________Out of use yet!_______________
export const BPF = function() {};
export const LOG4 = function() {};
export const NV_MAGICCONST = function() {};
export const RECIP_BPF = function() {};
export const SG_MAGICCONST = function() {};
export const TWOPI = function() {};
export const _Sequence = function() {};
export const _Set = function() {};
export const __all__ = function() {};
export const __builtins__ = function() {};
export const __cached__ = function() {};
export const __file__ = function() {};
export const __loader__ = function() {};
export const __package__ = function() {};
export const __spec__ = function() {};
export const _accumulate = function() {};
export const _acos = Math.acos;
export const _bisect = function() {};
export const _ceil = Math.ceil;
export const _cos = Math.cos;
export const _e = Math.E;
export const _exp = Math.exp;
export const _inst = function() {};
export const _log = Math.log;
export const _os = function() {};
export const _pi = Math.PI;
export const _random = Math.random;
export const _repeat = function() {};
export const _sha512 = function() {};
export const _sin = Math.sin;
export const _sqrt = Math.sqrt;
export const _test = function() {};
export const _test_generator = function() {};
export const _urandom = function() {};
export const _warn = function() {};
*/