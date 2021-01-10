let kwdlist = ['false',
    'null',
    'true',
    //'and',
    'as',
    //'assert',
    'async',
    'await',
    'break',
    'class',
    'extends',
    'continue',
    'delete',
    //'elif',
    'function',
    'else',
    'except',
    //'finally',
    'for',
    'from',
    'globalThis',
    'if',
    'import',
    'export',
    'in',

    'of',
    'new',
    'switch',
    'case',
    'default',
    'let',
    'const',
    'var',
    //'is',
    //'lambda',
    //'nonlocal',
    //'not',
    //'or',
    //'pass',
    'throw',
    'return',
    'this',
    'try',
    'while',
    //'with',
    'yield'
];
kwdlist.sort();

export const kwlist = kwdlist;

export function iskeyword(s) {
    try {
        (new Function(`let ${s} = true`))();
        return false;
    } catch (err) {
        return true;
    }
}