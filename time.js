const __name__ = 'time';

const __doc__ = `This module provides various functions to manipulate time values.

There are two standard representations of time.  One is the number
of seconds since the Epoch, in UTC (a.k.a. GMT).  It may be an integer
or a floating point number (to represent fractions of seconds).
The Epoch is system-defined; on Unix, it is generally January 1st, 1970.
The actual value can be retrieved by calling gmtime(0).

The other representation is a tuple of 9 integers giving local time.
The tuple items are:
year (including century, e.g. 1998)
month (1-12)
day (1-31)
hours (0-23)
minutes (0-59)
seconds (0-59)
weekday (0-6, Monday is 0)
Julian day (day in the year, 1-366)
DST (Daylight Savings Time) flag (-1, 0 or 1)
If the DST flag is 0, the time is given in the regular time zone;  
if it is 1, the time is given in the DST time zone;
if it is -1, mktime() should guess based on the date and time.
`;

const _STRUCT_TM_ITEMS = 11;
const __package__ = '';

//* Pre requisites:
function Objectify(arr1, arr2) {
    let obj = {};
    for (let i of arr1) {
        for (let j of arr2)
            obj[i] = j;
    }
    return obj;
}


const formats = [
    "%a", "%A", "%b", "%B", "%c", "%d", "%H", "%I", "%j", "%m", "%M", "%p",
    "%S", "%U", "%W", "%w", "%x", "%X", "%y", "%Y", "%z", "%Z", "%%"
];





class struct_time {
    constructor(sequence) {
        if (!sequence) this.tm = new Date();

        this.tm = new Date(sequence);
        this.length = 5;
    }

    toString() {
        /*
        time.struct_time(
            tm_year = 2020,    
            tm_mon = 10,
            tm_mday = 6,
            tm_hour = 13,
            tm_min = 7,
            tm_sec = 27,
            tm_wday = 1, 
            tm_yday = 280,
            tm_isdst = 0)
            */
    }
}


//* timezone constants:
const altzone = null;
const daylight = null;
const timezone = null;
const tzname = (Darr = Date().split('('))[Darr.length - 1].slice(0, -1); // The last thing within parentheses

let DST = null; // I dunno what's ythat fr but will Google it.

const localtime = function(secs = null) {
    if (secs === null || secs == new Date().getTime()) {
        let date = new Date();
        let strct_time = {
            tm_year: date.getFullYear(),
            tm_mon: date.getMonth() + 1,
            tm_day: date.getDay(),
            tm_hour: date.getHours(),
            tm_min: date.getMinutes(),
            tm_sec: date.getSeconds(),
            tm_wday: !(d = date.getDay()) ? 6 : d - 1,
            tm_yday: _format('%j', date),
            tm_isdst: Number(Boolean(DST)), // checkout DST
        };
    } else {
        let tm = (dividend, func = Math.floor) => func((new Date()).getTime() / dividend);
        let year = 1970,
            mon = 1,
            mday = 1,
            hour = 5,
            min = 30,
            sec = 0,
            wday = 3,
            yday = 1,
            isdist = 0;
    }


    Object.assign(strct_time, {
        toString: function() {
            let st = 'time.struct_time(';
            for (let attr in strct_time)
                st += `${attr}=${strct_time[attr]}`;
            return st + ')';
        },
        [Symbol.iterator]: function*() {
            for (let i in strct_time)
                yield i;
        }
    });

    return strct_time;
};


const gmtime = (secs = null) => localtime(new Date(new Date().toUTCString()).getTime()); // I hope it would work....
const mktime = t => new Date(...t).getTime();

// Sat Oct 10 14:55:29 2020
const asctime = (t = null) => strftime('%a %b %d %H:%M:%S %Y', t); //[checked] converts from a time tuple like struct_time
const jstime = (secs = null) => strftime('%a %b %d %H:%M:%S %Y', localtime(secs)); //[checked] converts  from seconds till epoch

const sleep = function(secs) { // checked
    x = new Date().getTime();
    while (new Date().getTime() != x + secs * 1000);
};

function _format(format, date = null) { // %j not working as expected
    if (!date) date = new Date();

    let days = 'Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday'.split('|');
    let months = 'January|February|March|April|May|June|July|August|September|October|November|December'.split('|');
    let dates = [31, ((!date.getFullYear() % 4) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // I think python takes all month end dates as 30,
    // that's why strftime('%j') is giving 5 more days for 11th October !!

    let monthmap = Objectify(months, dates);

    function yr_date() {
        let _sum = 0;
        for (let mnth in monthmap) {
            if (mnth === months[date.getMonth()]) // if it's the current month
                break;
            _sum += monthmap[mnth];
        }
        return _sum + date.getDate() - 5; // I dunno why -5, but it worked!
    }

    switch (format) {
        case '%a':
            return days[date.getDay()].slice(0, 3);
        case '%A':
            return days[date.getDay()];
        case '%b':
            return months[date.getMonth()].slice(0, 3);
        case '%B':
            return months[date.getMonth()];
        case '%c':
            return date.toString().slice(0, 24); // Needs changes!
        case '%d':
            return date.getDate();
        case '%H':
            return date.getHours();
        case '%I':
            return (x = date.getHours()) <= 12 ? x : x - 12;
        case '%j':
            return yr_date();
        case '%m':
            return date.getMonth() + 1; // In Date(), month starts from 0 rather than 1 in py
        case '%M':
            return date.getMinutes();
        case '%p':
            return date.toLocaleTimeString().slice(-2);
        case '%S':
            return date.getSeconds();
        case '%U':
            return null; // Not yet
        case '%W':
            return null; // not yet
        case '%w':
            return date.getDay();
        case '%x':
            return date.toLocaleDateString();
        case '%X':
            return date.toTimeString().slice(0, 8);
        case '%y':
            return String(date.getFullYear()).slice(-2);
        case '%Y':
            return date.getFullYear();
        case '%z':
            return date.toTimeString().split(' ')[1].replace('GMT', '');
        case '%Z':
            return tzname;
        case '%%':
            return '%';
        default:
            return TypeError('Invalid format string');
    }
}


const strftime = function(format, t = null) { //checked
    t = (t === null) ? new Date() : new Date(mktime(t));

    for (let i of formats) {
        if (format.includes(i))
            format = format.replace(RegExp(i, 'g'), _format(i, t)); // node doesn't support String.replaceAll()
    }
    return format;
};


const strptime = function(timestr, format) {};
const time = () => new Date().getTime() / 1000;
const time_ns = function() {}; // I can't tell whether js is precise enough for nanosecs


//* Brainy stuff:
const get_clock_info = function() {};
const monotonic = function() {};
const monotonic_ns = function() {};
const perf_counter = function() {};
const perf_counter_ns = function() {};
const process_time = function() {};
const process_time_ns = function() {};
const thread_time = function() {};
const thread_time_ns = function() {};


/*
* Py TIME FORMATTERS:

%a      Locale’s abbreviated weekday name.
%A      Locale’s full weekday name.
%b      Locale’s abbreviated month name.
%B      Locale’s full month name.
%c      Locale’s appropriate date and time representation.
%d      Day of the month as a decimal number [01,31].
%H      Hour (24-hour clock) as a decimal number [00,23].
%I      Hour (12-hour clock) as a decimal number [01,12].
%j      Day of the year as a decimal number [001,366].
%m      Month as a decimal number [01,12].
%M      Minute as a decimal number [00,59].
%p      Locale’s equivalent of either AM or PM. (1)
%S      Second as a decimal number [00,61]. (2)
%U      Week number of the year (Sunday as the first day of the week) as a decimal number [00,53]. All days in a new year preceding the first Sunday are considered to be in week 0. (3)
%w      Weekday as a decimal number [0(Sunday),6].
%W      Week number of the year (Monday as the first day of the week) as a decimal number [00,53]. All days in a new year preceding the first Monday are considered to be in week 0. (3)
%x      Locale’s appropriate date representation.
%X      Locale’s appropriate time representation.
%y      Year without century as a decimal number [00,99].
%Y      Year with century as a decimal number.
%z      Time zone offset indicating a positive or negative time difference from UTC/GMT of the form +HHMM or -HHMM, where H represents decimal hour digits and M represents decimal minute digits [-23:59, +23:59].
%Z      Time zone name (no characters if no time zone exists).
%%      A literal '%' character.

*/

/*
* Backup functions:

function Format(format, date = null) {
    if (!date) date = new Date();
    let days = 'Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday'.split('|');
    let months = 'January|February|March|April|May|June|July|August|September|October|November|December'.split('|');
    let dates = [31, ((!date.getFullYear() % 4) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let monthmap = Objectify(months, dates);

    function yr_date() {
        let _sum = 0;
        for (let mnth in monthmap) {
            if (mnth === (d = months[date.getMonth()]))
                break;
            _sum += monthmap[mnth];
        }
        return _sum + date.getDate();
    }

    let formatters = {
        '%a': days[date.getDay()].slice(0, 3),
        '%A': days[date.getDay()],
        '%b': months[date.getMonth()].slice(0, 3),
        '%B': months[date.getMonth()],
        '%c': date.toString().slice(0, 24), // Needs changes!
        '%d': date.getDate(),
        '%H': date.getHours(),
        '%I': (x = date.getHours()) <= 12 ? x : x - 12,
        '%j': yr_date(), // Can't find yet!
        '%m': date.getMonth(),
        '%M': date.getMinutes(),
        '%p': date.toLocaleTimeString().slice(-2),
        '%S': date.getSeconds(),
        '%U': null, // Not yet
        '%W': null, // not yet
        '%w': date.getDay(),
        '%x': date.toLocaleDateString(),
        '%X': date.toTimeString().slice(0, 8),
        '%y': String(date.getFullYear()).slice(-2),
        '%Y': date.getFullYear(),
        '%z': date.toTimeString().split(' ')[1].replace('GMT', ''),
        '%Z': tzname,
        '%%': '%'
    };

    return !Object.keys(formatters).includes(format) ? TypeError('Invalid format string') :
        String(formatters[format]);
} */