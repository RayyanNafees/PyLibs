export const __name__ = 'fnmatch';
export const __loader__ = `\
Filename matching with shell patterns.

fnmatch(FILENAME, PATTERN) matches according to the local convention.
fnmatchcase(FILENAME, PATTERN) always takes case in account.

The functions operate by translating the pattern into a regular
expression.
They cache the compiled regular expressions for speed.

The function translate(PATTERN) returns a regular expression
corresponding to PATTERN.  (It does not compile it.)
`;

export const filter = function() {};
export const fnmatch = function() {};
export const fnmatchcase = function() {};
export const functools = function() {};
export const posixpath = function() {};
export const translate = function() {};


/*
export const os = function() {};
export const re = function() {};

export const __all__ = function() {};
export const __builtins__ = function() {};
export const __cached__ = function() {};
export const __doc__ = function() {};
export const __file__ = function() {};
export const __package__ = function() {};
export const __spec__ = function() {};
export const _compile_pattern = function() {};*/