 const __name__ = 're';

 //* Module Contents:

 const compile = (patter, flags = 'g') => {};
 const A = ASCII = '';
 const DEBUG = '';

 const I = (IGNORECASE = 'i');
 const L = LOCALE = '';
 const M = MULTILINE = {};
 const S = DOTALL = {};
 const X = VERBOSE = {};

 // const enum = function() {};             

 const search = function(pattern, string, flags = 'g') {
     // string.match(pattern)
 };
 const match = (pattern, string, flags = 'g') => Boolean(string.match(RegExp(pattern, flags)));
 const fullmatch = function(pattern, string, flags = 'g') {};
 const split = function(pattern, string, maxsplit = 0, flags = 'g') {};
 const findall = function(pattern, string, flags = 'g') {};
 const finditer = function(pattern, string, flags = 'g') {};
 const sub = function(pattern, repl, string, count = 0, flags = 'g') {};
 const subn = function(pattern, repl, string, count = 0, flags = 'g') {};
 const escape = function(pattern) {};
 const purge = function() {};



 //* Regular Expression Objects:

 class RegexFlag {}

 class Pattern {
     constructor() {}
     search(string, pos = null, endpos = null) {}
     match(string, pos = null, endpos = null) {}
     fullmatch(string, pos = null, endpos = null) {}
     split() {}
     findall() {}
     finditer() {}
     sub() {}
     subn() {}
     flags() {}
     groups() {}
     groupindex() {}
     pattern() {}
 }

 class Match extends String {
     constructor() {
         this.pos = i;
         this.endpos = i;
         this.lastindex = i;
         this.lastgroup = i;
         this.re = i;
         this.string = i;
     }
     expand(template) {}
     group(...groups) {}
     groups(Default = null) {}
     groupdict(Default = null) {}
     start(group = null) {}
     end(group = null) {}
     span(group = null) {}
 }

 const error = function(msg, pattern = None, pos = None) {};

 const __doc__ = `
Support for regular expressions (RE).

This module provides regular expression matching operations similar to
those found in Perl.  It supports both 8-bit and Unicode strings; both
the pattern and the strings being processed can contain null bytes and
characters outside the US ASCII range.

Regular expressions can contain both special and ordinary characters.
Most ordinary characters, like "A", "a", or "0", are the simplest
regular expressions; they simply match themselves.  You can
concatenate ordinary characters, so last matches the string 'last'.

The special characters are:
    "."      Matches any character except a newline.
    "^"      Matches the start of the string.
    "$"      Matches the end of the string or just before the newline at
             the end of the string.
    "*"      Matches 0 or more (greedy) repetitions of the preceding RE.
             Greedy means that it will match as many repetitions as possible.
    "+"      Matches 1 or more (greedy) repetitions of the preceding RE.
    "?"      Matches 0 or 1 (greedy) of the preceding RE.
    *?,+?,?? Non-greedy versions of the previous three special characters.
    {m,n}    Matches from m to n repetitions of the preceding RE.
    {m,n}?   Non-greedy version of the above.
    "\\"     Either escapes special characters or signals a special sequence.
    []       Indicates a set of characters.
             A "^" as the first character indicates a complementing set.
    "|"      A|B, creates an RE that will match either A or B.
    (...)    Matches the RE inside the parentheses.
             The contents can be retrieved or matched later in the string.
    (?aiLmsux) The letters set the corresponding flags defined below.
    (?:...)  Non-grouping version of regular parentheses.
    (?P<name>...) The substring matched by the group is accessible by name.
    (?P=name)     Matches the text matched earlier by the group named name.
    (?#...)  A comment; ignored.
    (?=...)  Matches if ... matches next, but doesn't consume the string.
    (?!...)  Matches if ... doesn't match next.
    (?<=...) Matches if preceded by ... (must be fixed length).
    (?<!...) Matches if not preceded by ... (must be fixed length).
    (?(id/name)yes|no) Matches yes pattern if the group with id/name matched,
                       the (optional) no pattern otherwise.

The special sequences consist of "\\" and a character from the list
below.  If the ordinary character is not on the list, then the
resulting RE will match the second character.
    \number  Matches the contents of the group of the same number.
    \A       Matches only at the start of the string.
    \Z       Matches only at the end of the string.
    \b       Matches the empty string, but only at the start or end of a word.
    \B       Matches the empty string, but not at the start or end of a word.
    \d       Matches any decimal digit; equivalent to the set [0-9] in
             bytes patterns or string patterns with the ASCII flag.
             In string patterns without the ASCII flag, it will match the whole
             range of Unicode digits.
    \D       Matches any non-digit character; equivalent to [^\d].
    \s       Matches any whitespace character; equivalent to [ \t\n\r\f\v] in
             bytes patterns or string patterns with the ASCII flag.
             In string patterns without the ASCII flag, it will match the whole
             range of Unicode whitespace characters.
    \S       Matches any non-whitespace character; equivalent to [^\s].
    \w       Matches any alphanumeric character; equivalent to [a-zA-Z0-9_]
             in bytes patterns or string patterns with the ASCII flag.
             In string patterns without the ASCII flag, it will match the
             range of Unicode alphanumeric characters (letters plus digits
             plus underscore).
             With LOCALE, it will match the set [0-9_] plus characters defined
             as letters for the current locale.
    \W       Matches the complement of \w.
    \\       Matches a literal backslash.

This module s the following functions:
    match     Match a regular expression pattern to the beginning of a string.
    fullmatch Match a regular expression pattern to all of a string.
    search    Search a string for the presence of a pattern.
    sub       Substitute occurrences of a pattern found in a string.
    subn      Same as sub, but also return the number of substitutions made.
    split     Split a string by the occurrences of a pattern.
    findall   Find all occurrences of a pattern in a string.
    finditer  Return an iterator yielding a Match object for each match.
    compile   Compile a pattern into a Pattern object.
    purge     Clear the regular expression cache.
    escape    Backslash all non-alphanumerics in a string.

Each function other than purge and escape can take an optional 'flags' argument
consisting of one or more of the following module constants, joined by "|".
A, L, and U are mutually exclusive.
    A  ASCII       For string patterns, make \w, \W, \b, \B, \d, \D
                   match the corresponding ASCII character categories
                   (rather than the whole Unicode categories, which is the
                   default).
                   For bytes patterns, this flag is the only available
                   behaviour and needn't be specified.
    I  IGNORECASE  Perform case-insensitive matching.
    L  LOCALE      Make \w, \W, \b, \B, dependent on the current locale.
    M  MULTILINE   "^" matches the beginning of lines (after a newline)
                   as well as the string.
                   "$" matches the end of lines (before a newline) as well
                   as the end of the string.
    S  DOTALL      "." matches any character at all, including the newline.
    X  VERBOSE     Ignore whitespace and comments for nicer looking RE's.
    U  UNICODE     For compatibility only. Ignored for string patterns (it
                   is the default), and forbidden for bytes patterns.

This module also defines an exception 'error'.

`;




 /*
 *___________Out of use yet!_______________

  const Scanner = function() {};
  const T = function() {};
  const TEMPLATE = function() {};
  const U = function() {};
  const UNICODE = function() {};



  const copyreg = function() {};
  const _MAXCACHE = function() {};
  const __all__ = function() {};
  const __builtins__ = function() {};
  const __cached__ = function() {};

  const __file__ = function() {};
  const __loader__ = function() {};
  const __package__ = function() {};
  const __spec__ = function() {};
  const __version__ = function() {};
  const _cache = function() {};
  const _compile = function() {};
  const _compile_repl = function() {};
  const _expand = function() {};
  const _locale = function() {};
  const _pickle = function() {};
  const _special_chars_map = function() {};
  const _subx = function() {};
  const sre_compile = function() {};
  const sre_parse = function() {};
  const functools = function() {};
  const error = function(msg, pattern=None, pos=None) {};
  const template = function() {};
 */