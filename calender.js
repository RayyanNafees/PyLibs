const __name__ = 'calendar';

const __doc__ = `
Calendar printing functions

Note when comparing these calendars to the ones printed by cal(1): By
default, these calendars have Monday as the first day of the week, and
Sunday as the last (the European convention). Use setfirstweekday() to
set the first day of the week (0=Monday, 6=Sunday).`;


// pre-requisites__________

function range(stop$start, stop = null, step = 1) {
    let arr = [];
    for (let i = !stop ? 0 : stop$start; i < (!stop ? stop$start : stop); arr.push(i), i += step);
    return arr;
}

function* iter(iterable) {
    let _iterable = iterable.__iter__ ? iterable.__iter__() : iterable;
    for (let i of _iterable) yield i;
}

let any = f((...conditions) => conditions.length > 1 ? conditions.map(i => Boolean(i)).includes(true) : all(...conditions[0]));

function f(func) {
    function wrapper(...args) {
        if (args.length === 1)
            return func(...args[0]);
    }
    return wrapper;
}

function dayof(date) {
    let today = new Date();
    today.setDate(date);
    return today.getDay();
}

function new_err(name) {
    let err = class extends Error {
        constructor(msg) {
            super(msg);
            this.name = String(name);
        }
    };
    return err;
}

//_________________________

let _firstweekday = 0;

//* Classes of calendar:

class Calendar {
    constructor(firstweekday = 0) { this.firstweekday = firstweekday; }
    getfirstweekday() { return this.firstweekday; }
    setfirstweekday(firstweekday) { this.firstweekday = firstweekday; }

    iterweekdays() { return iter([...range(this.firstweekday, 7), ...range(this.firstweekday)]); }

    itermonthdates() {}

    itermonthdays(year, month) {
        let stop = 31;
        if (month === 2) stop = !year % 4 ? 29 : 28;
        else if (null);
        let dates = range(1, stop);
    }
    itermonthdays2(year, month) {}
    itermonthdays3(year, month) {}
    itermonthdays4(year, month) {}

    monthdatescalendar(year, month) {}
    yeardatescalendar(year, width = 3) {}

    monthdayscalendar(year, month) {}
    monthdays2calendar(year, month) {}

    yeardayscalendar(year, width = 3) {}
    yeardays2calendar(year, width = 3) {}
}

class TextCalendar extends Calendar {
    constructor(firstweekday = 0) { super(firstweekday); }
    formatmonth(theyear, themonth, w = 0, l = 0) {}
    formatyear(theyear, w = 2, l = 1, c = 6, m = 3) {}
    prmonth(theyear, themonth, w = 0, l = 0) {}
    pryear(theyear, w = 2, l = 1, c = 6, m = 3) {}
}

class HTMLCalendar extends Calendar {
    constructor(firstweekday = 0) {
        super(firstweekday);
        this.cssclasses = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
        /*
        * Attributes to add :
            cssclass_noday
            cssclasses_weekday_head
            cssclass_month_head
            cssclass_month
            cssclass_year
            cssclass_year_head
        */
    }

    formatmonth(theyear, themonth, withyear = true) {}
    formatyear(theyear, width = 3) {}
    formatyearpage(theyear, width = 3, css = 'calendar.css', encoding = null) {}

}

class LocaleTextCalendar extends TextCalendar { constructor(firstweekday = 0, locale = null) {} }
class LocaleHTMLCalendar extends HTMLCalendar { constructor(firstweekday = 0, locale = null) {} }

//*Errors:
const IllegalMonthError = new_err('IllegalMonthError', 'Month indices valid within range (1-12)');
const IllegalWeekdayError = new_err('IllegalWeekdayError', 'Weekdays valid within range (0-6)');


const firstweekday = () => _firstweekday;

const setfirstweekday = weekday => { _firstweekday = weekday; };

const leapdays = function(y1, y2) {
    let leapcount = 0;
    for (let i of range(y1, y2, 4)) {
        if (!i % 4) leapcount++;
    }
    return leapcount;
};

const isleap = year => Boolean((new Date(year, ...range(6))).getFullYear() % 4);

const timegm = tuple => (new Date(...tuple)).getTime();

const weekday = (year, month, day) => !(d = new Date(`${year}-${month}-${day}`).getDay()) ? 6 : d - 1;

const weekheader = function(width) {
    if (width < 0 && width > -3) width += 3;
    else if (width < -2 || width == 0) return '      ';

    let days = 'Mon Tue Wed Thu Fri Sat Sun'.split(' ');

    return width <= 3 ? days.map(s => s.slice(0, width)).join(' ') : days.join(' '.repeat(width - 2));

    //* Output similar, but not same as that of python !
};


//* Constants/Attributes:
const [January, February] = [1, 2];
const [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY] = range(7);

const day_abbr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const day_name = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const month_abbr = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const month_name = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


//* Calendar prints:
const month = function() {};
const calendar = function() {};

const monthcalendar = function() {};
const monthrange = function() {};

const prcal = function() {};
const prmonth = function() {};
const prweek = function() {};


/*
* Not needed pythonic stuff:

const EPOCH = null;
const _EPOCH_ORD = function() {};
const __all__ = function() {};
const __builtins__ = function() {};
const __cached__ = function() {};
const __file__ = function() {};
const __loader__ = function() {};
const __package__ = function() {};
const __spec__ = function() {};
const _colwidth = function() {};
const _locale = function() {};
const _localized_day = function() {};
const _localized_month = function() {};
const _monthlen = function() {};
const _nextmonth = function() {};
const _prevmonth = function() {};
const _spacing = function() {}; 

* Functions:
const c = function() {};
const week = function() {};
const repeat = function() {};
const formatstring = function() {};
const datetime = function() {};
const different_locale = function() {};
const error = function() {};
const format = function() {};
const main = function() {};
const mdays = function() {};
const sys = function() {}; 

*/