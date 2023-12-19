"use strict";

var __PS_MV_REG;

function inBrowserP() {
    __PS_MV_REG = [];
    return !inNodeP();
};

function inNodeP() {
    return typeof window === 'undefined';
};

var util;

var inspect;

if (inNodeP()) {
    util = require('util');
    inspect = function (x) {
        return util.inspect(x);
    };
} else {
    inspect = function (x) {
        if (x === null) {
            return 'null';
        } else if (typeof x === 'undefined') {
            return 'undefined';
        } else if (typeof x === 'string') {
            return JSON.stringify(x);
        } else if (Array.isArray(x)) {
            return '[' + x.map(inspect, x).join(', ') + ']';
        } else if (consp(x)) {
            __PS_MV_REG = [];
            return x.toString();
        } else if (typeof x === 'object' && x.constructor.name === 'Object') {
            __PS_MV_REG = [];
            return '{' + Object.keys(x).map(function (key) {
                __PS_MV_REG = [];
                return key + ': ' + inspect(x[key]);
            }).join(', ') + '}';
        } else if (typeof x === 'object') {
            __PS_MV_REG = [];
            return x.constructor.name;
        } else {
            __PS_MV_REG = [];
            return x.toString();
        };
    };
    window.devtoolsFormatters = [{ 'header' : function (obj) {
        if (!consp(obj)) {
            __PS_MV_REG = [];
            return null;
        };
        __PS_MV_REG = [];
        return ['div', {  }, inspect(obj)];
    }, 'hasBody' : function () {
        return false;
    } }];
};

var mytests = {  };





function MyTestFailure() {
    var tmp = Error.apply(this, arguments);
    this.name = 'MyTestFailure';
    tmp.name = this.name;
    this.message = tmp.message;
    Object.defineProperty(this, 'stack', { 'get' : function () {
        return tmp.stack;
    } });
    return this;
};

function runTests() {
    var results = [];
    var failures = [];
    var checks = 0;
    var pass = 0;
    var fail = 0;
    var emit = function (x) {
        return results.push(x);
    };
    var pass5 = function () {
        ++checks;
        return ++pass;
    };
    var fail6 = function (test, reason) {
        ++checks;
        ++fail;
        return failures.push({ 'test' : test, 'reason' : reason });
    };
    for (var key in mytests) {
        try {
            mytests[key](pass5);
        } catch (e) {
            fail6(key, e.message);
        };
    };
    emit('Did ' + checks + ' checks.');
    emit('Pass: ' + pass + ', Fail: ' + fail);
    for (var failure = null, _js_idx7 = 0; _js_idx7 < failures.length; _js_idx7 += 1) {
        failure = failures[_js_idx7];
        emit(failure.test + ': ' + failure.reason);
    };
    __PS_MV_REG = [];
    return results;
};

function pr() {
    var args = Array.prototype.slice.call(arguments, 0);
    __PS_MV_REG = [];
    return console.log.apply(console, args);
};

function Cons(a, b) {
    this.percentcar = a;
    this.percentcdr = b;
    return;
};

function percentinspectCons() {
    var listToArray = function (list) {
        var result = [];
        var list = list;
        while (true) {
            loopContinue424: {
                if (list === null) {
                    return result;
                } else {
                    result.push(car(list));
                    var _js8 = cdr(list);
                    list = _js8;
                    __PS_MV_REG = [];
                    break loopContinue424;
                };
            };
        };
    };
    if (trueListp(this)) {
        __PS_MV_REG = [];
        return '(' + listToArray(this).map(inspect).join(' ') + ')';
    } else {
        __PS_MV_REG = [];
        return '(' + inspect(this.percentcar) + ' . ' + inspect(this.percentcdr) + ')';
    };
};

if (inNodeP()) {
    Cons.prototype[util.inspect.custom] = percentinspectCons;
} else {
    Cons.prototype.toString = percentinspectCons;
};

Cons.prototype.car = function () {
    return this.percentcar;
};

Cons.prototype.cdr = function () {
    return this.percentcdr;
};

function cons(a, b) {
    __PS_MV_REG = [];
    return new Cons(a, b);
};

function car(x) {
    return x.car();
};

function cdr(x) {
    return x.cdr();
};

function consp(x) {
    return (x instanceof Cons);
};

function atom(x) {
    __PS_MV_REG = [];
    return !consp(x);
};

function listbang() {
    var args = Array.prototype.slice.call(arguments, 0);
    __PS_MV_REG = [];
    return args.reduceRight(function (acc, x) {
        __PS_MV_REG = [];
        return cons(x, acc);
    }, null);
};

function trueListp(x) {
    var x = x;
    while (true) {
        loopContinue435: {
            if (x === null) {
                return true;
            } else if (consp(x)) {
                var _js8 = cdr(x);
                x = _js8;
                __PS_MV_REG = [];
                break loopContinue435;
            } else {
                __PS_MV_REG = [];
                return false;
            };
        };
    };
};

mytests['consp.1'] = function (pass) {
    var result = consp(cons(1, 2));
    var expectedValue = true;
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (CONSP (CONS 1 2)) to eval to T, but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    var result8 = consp(123);
    var expectedValue9 = false;
    if (expectedValue9 === result8) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message10 = 'Expected (CONSP 123) to eval to F (of value ' + inspect(expectedValue9) + '), but it was ' + inspect(result8);
        throw new MyTestFailure(message10);
    };
};

mytests['test.1'] = function (pass) {
    var result = inspect(cons(1, 2));
    var expectedValue = '(1 . 2)';
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (INSPECT (CONS 1 2)) to eval to \"(1 . 2)\", but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    var result11 = inspect(car(cons(1, 2)));
    var expectedValue12 = '1';
    if (expectedValue12 === result11) {
        pass();
    } else {
        var message13 = 'Expected (INSPECT (CAR (CONS 1 2))) to eval to \"1\", but it was ' + inspect(result11);
        throw new MyTestFailure(message13);
    };
    var result14 = inspect(car(cons(cons(11, 12), 2)));
    var expectedValue15 = '(11 . 12)';
    if (expectedValue15 === result14) {
        pass();
    } else {
        var message16 = 'Expected (INSPECT (CAR (CONS (CONS 11 12) 2))) to eval to \"(11 . 12)\", but it was ' + inspect(result14);
        throw new MyTestFailure(message16);
    };
    var result17 = inspect(cdr(cons(1, 2)));
    var expectedValue18 = '2';
    if (expectedValue18 === result17) {
        pass();
    } else {
        var message19 = 'Expected (INSPECT (CDR (CONS 1 2))) to eval to \"2\", but it was ' + inspect(result17);
        throw new MyTestFailure(message19);
    };
    var result20 = inspect(cdr(cons(1, 123)));
    var expectedValue21 = '123';
    if (expectedValue21 === result20) {
        pass();
    } else {
        var message22 = 'Expected (INSPECT (CDR (CONS 1 123))) to eval to \"123\", but it was ' + inspect(result20);
        throw new MyTestFailure(message22);
    };
    var result23 = inspect(cdr(cons(1, cons(2, 3))));
    var expectedValue24 = '(2 . 3)';
    if (expectedValue24 === result23) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message25 = 'Expected (INSPECT (CDR (CONS 1 (CONS 2 3)))) to eval to \"(2 . 3)\", but it was ' + inspect(result23);
        throw new MyTestFailure(message25);
    };
};

mytests['test.2'] = function (pass) {
    var result = trueListp(null);
    var expectedValue = true;
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (TRUE-LISTP NIL) to eval to T, but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    var result26 = trueListp(cons(1, 2));
    var expectedValue27 = false;
    if (expectedValue27 === result26) {
        pass();
    } else {
        var message28 = 'Expected (TRUE-LISTP (CONS 1 2)) to eval to F (of value ' + inspect(expectedValue27) + '), but it was ' + inspect(result26);
        throw new MyTestFailure(message28);
    };
    var result29 = trueListp(cons(1, null));
    var expectedValue30 = true;
    if (expectedValue30 === result29) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message31 = 'Expected (TRUE-LISTP (CONS 1 NIL)) to eval to T, but it was ' + inspect(result29);
        throw new MyTestFailure(message31);
    };
};

mytests['test.3'] = function (pass) {
    var result = inspect(listbang(1));
    var expectedValue = '(1)';
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (INSPECT (LIST! 1)) to eval to \"(1)\", but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    var result32 = inspect(listbang(1, 2));
    var expectedValue33 = '(1 2)';
    if (expectedValue33 === result32) {
        pass();
    } else {
        var message34 = 'Expected (INSPECT (LIST! 1 2)) to eval to \"(1 2)\", but it was ' + inspect(result32);
        throw new MyTestFailure(message34);
    };
    var result35 = inspect(listbang(1, 2, 3));
    var expectedValue36 = '(1 2 3)';
    if (expectedValue36 === result35) {
        pass();
    } else {
        var message37 = 'Expected (INSPECT (LIST! 1 2 3)) to eval to \"(1 2 3)\", but it was ' + inspect(result35);
        throw new MyTestFailure(message37);
    };
    var result38 = inspect(listbang(listbang(1, 2), listbang(3, 4), listbang(5, 6)));
    var expectedValue39 = '((1 2) (3 4) (5 6))';
    if (expectedValue39 === result38) {
        pass();
    } else {
        var message40 = 'Expected (INSPECT (LIST! (LIST! 1 2) (LIST! 3 4) (LIST! 5 6))) to eval to \"((1 2) (3 4) (5 6))\", but it was ' + inspect(result38);
        throw new MyTestFailure(message40);
    };
    if (inNodeP()) {
        var result41 = inspect(listbang('foo', 'bar'));
        var expectedValue42 = '(\'foo\' \'bar\')';
        if (expectedValue42 === result41) {
            pass();
        } else {
            var message43 = 'Expected (INSPECT (LIST! \"foo\" \"bar\")) to eval to \"(\'foo\' \'bar\')\", but it was ' + inspect(result41);
            throw new MyTestFailure(message43);
        };
    } else {
        var result44 = inspect(listbang('foo', 'bar'));
        var expectedValue45 = '(foo bar)';
        if (expectedValue45 === result44) {
            pass();
        } else {
            var message46 = 'Expected (INSPECT (LIST! \"foo\" \"bar\")) to eval to \"(foo bar)\", but it was ' + inspect(result44);
            throw new MyTestFailure(message46);
        };
    };
    if (inNodeP()) {
        var result47 = inspect(listbang({ 'foo' : 1, 'bar' : 2 }));
        var expectedValue48 = '({ foo: 1, bar: 2 })';
        if (expectedValue48 === result47) {
            pass();
        } else {
            var message49 = 'Expected (INSPECT (LIST! (CREATE :FOO 1 :BAR 2))) to eval to \"({ foo: 1, bar: 2 })\", but it was ' + inspect(result47);
            throw new MyTestFailure(message49);
        };
    } else {
        var result50 = inspect(listbang({ 'foo' : 1, 'bar' : 2 }));
        var expectedValue51 = '([object Object])';
        if (expectedValue51 === result50) {
            pass();
        } else {
            var message52 = 'Expected (INSPECT (LIST! (CREATE :FOO 1 :BAR 2))) to eval to \"([object Object])\", but it was ' + inspect(result50);
            throw new MyTestFailure(message52);
        };
    };
    if (inNodeP()) {
        var result53 = inspect(listbang({ 'foo' : listbang(1, 2, 3), 'bar' : listbang(10, 20) }));
        var expectedValue54 = '({ foo: (1 2 3), bar: (10 20) })';
        if (expectedValue54 === result53) {
            __PS_MV_REG = [];
            return pass();
        } else {
            var message55 = 'Expected (INSPECT (LIST! (CREATE :FOO (LIST! 1 2 3) :BAR (LIST! 10 20)))) to eval to \"({ foo: (1 2 3), bar: (10 20) })\", but it was ' + inspect(result53);
            throw new MyTestFailure(message55);
        };
    };
};

mytests['true-listp/no-stack-overflow.1'] = function (pass) {
    var result = trueListp(makeList(60000, 1));
    var expectedValue = true;
    if (expectedValue === result) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message = 'Expected (TRUE-LISTP (MAKE-LIST 60000 1)) to eval to T, but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
};

function map(fn, list) {
    __PS_MV_REG = [];
    return list === null ? null : cons(fn(car(list)), map(fn, cdr(list)));
};

mytests['map.1'] = function (pass) {
    var result = map(function (x) {
        return x;
    }, null);
    var expectedValue = null;
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (MAP (LAMBDA (X) X) NIL) to eval to NIL, but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    var result56 = inspect(map(function (x) {
        return x + 1;
    }, listbang(1)));
    var expectedValue57 = '(2)';
    if (expectedValue57 === result56) {
        pass();
    } else {
        var message58 = 'Expected (INSPECT (MAP (LAMBDA (X) (1+ X)) (LIST! 1))) to eval to \"(2)\", but it was ' + inspect(result56);
        throw new MyTestFailure(message58);
    };
    var result59 = inspect(map(function (x) {
        return x + 1;
    }, listbang(0, 1, 2)));
    var expectedValue60 = '(1 2 3)';
    if (expectedValue60 === result59) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message61 = 'Expected (INSPECT (MAP (LAMBDA (X) (1+ X)) (LIST! 0 1 2))) to eval to \"(1 2 3)\", but it was ' + inspect(result59);
        throw new MyTestFailure(message61);
    };
};

mytests['evenp/oddp.1'] = function (pass) {
    var result = !(0 % 2);
    var expectedValue = true;
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (EVENP 0) to eval to T, but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    var result62 = 0 % 2 || false;
    var expectedValue63 = false;
    if (expectedValue63 === result62) {
        pass();
    } else {
        var message64 = 'Expected (OR (ODDP 0) F) to eval to F (of value ' + inspect(expectedValue63) + '), but it was ' + inspect(result62);
        throw new MyTestFailure(message64);
    };
    var result65 = !(2 % 2);
    var expectedValue66 = true;
    if (expectedValue66 === result65) {
        pass();
    } else {
        var message67 = 'Expected (EVENP 2) to eval to T, but it was ' + inspect(result65);
        throw new MyTestFailure(message67);
    };
    var result68 = !(3 % 2);
    var expectedValue69 = false;
    if (expectedValue69 === result68) {
        pass();
    } else {
        var message70 = 'Expected (EVENP 3) to eval to F (of value ' + inspect(expectedValue69) + '), but it was ' + inspect(result68);
        throw new MyTestFailure(message70);
    };
    var result71 = 3 % 2 && true;
    var expectedValue72 = true;
    if (expectedValue72 === result71) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message73 = 'Expected (AND (ODDP 3) T) to eval to T, but it was ' + inspect(result71);
        throw new MyTestFailure(message73);
    };
};

function filter(fn, list) {
    var rev = function (list) {
        var list = list;
        var acc = null;
        while (true) {
            loopContinue641: {
                if (list === null) {
                    return acc;
                } else {
                    var _js76 = cdr(list);
                    var _js77 = cons(car(list), acc);
                    list = _js76;
                    acc = _js77;
                    __PS_MV_REG = [];
                    break loopContinue641;
                };
            };
        };
    };
    var rec = function (list, acc) {
        var list = list;
        var acc = acc;
        while (true) {
            loopContinue657: {
                if (list === null) {
                    __PS_MV_REG = [];
                    return rev(acc);
                } else {
                    if (fn(car(list))) {
                        var _js76 = cdr(list);
                        var _js77 = cons(car(list), acc);
                        list = _js76;
                        acc = _js77;
                        __PS_MV_REG = [];
                        break loopContinue657;
                    } else {
                        var _js78 = cdr(list);
                        var _js79 = acc;
                        list = _js78;
                        acc = _js79;
                        __PS_MV_REG = [];
                        break loopContinue657;
                    };
                };
            };
        };
    };
    __PS_MV_REG = [];
    return rec(list, null);
};

mytests['filter.1'] = function (pass) {
    var result = inspect(filter(function (x) {
        return !(x % 2);
    }, listbang(0, 7, 8, 8, 43, -4)));
    var expectedValue = '(0 8 8 -4)';
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (INSPECT (FILTER (LAMBDA (X) (EVENP X)) (LIST! 0 7 8 8 43 -4))) to eval to \"(0 8 8 -4)\", but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    var result74 = inspect(filter(function (x) {
        return !(x % 2);
    }, makeList(60000, 1)));
    var expectedValue75 = 'null';
    if (expectedValue75 === result74) {
        pass();
    } else {
        var message76 = 'Expected (INSPECT (FILTER (LAMBDA (X) (EVENP X)) (MAKE-LIST 60000 1))) to eval to \"null\", but it was ' + inspect(result74);
        throw new MyTestFailure(message76);
    };
    var result77 = inspect(filter(function (x) {
        return !(x % 2);
    }, cons(2, makeList(60000, 1))));
    var expectedValue78 = '(2)';
    if (expectedValue78 === result77) {
        pass();
    } else {
        var message79 = 'Expected (INSPECT (FILTER (LAMBDA (X) (EVENP X)) (CONS 2 (MAKE-LIST 60000 1)))) to eval to \"(2)\", but it was ' + inspect(result77);
        throw new MyTestFailure(message79);
    };
    var result80 = inspect(lengthbang(filter(function (x) {
        return !(x % 2);
    }, makeList(60000, 0))));
    var expectedValue81 = '60000';
    if (expectedValue81 === result80) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message82 = 'Expected (INSPECT (LENGTH! (FILTER (LAMBDA (X) (EVENP X)) (MAKE-LIST 60000 0)))) to eval to \"60000\", but it was ' + inspect(result80);
        throw new MyTestFailure(message82);
    };
};

function makeList(n, fill) {
    var list = null;
    for (var _js83 = 0; _js83 < n; _js83 += 1) {
        list = cons(fill, list);
    };
    __PS_MV_REG = [];
    return list;
};

mytests['make-list.1'] = function (pass) {
    var result = inspect(makeList(3, 1));
    var expectedValue = '(1 1 1)';
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (INSPECT (MAKE-LIST 3 1)) to eval to \"(1 1 1)\", but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    if (inNodeP()) {
        var result84 = inspect(makeList(5, {  }));
        var expectedValue85 = '({} {} {} {} {})';
        if (expectedValue85 === result84) {
            __PS_MV_REG = [];
            return pass();
        } else {
            var message86 = 'Expected (INSPECT (MAKE-LIST 5 (CREATE))) to eval to \"({} {} {} {} {})\", but it was ' + inspect(result84);
            throw new MyTestFailure(message86);
        };
    } else {
        var result87 = inspect(makeList(5, {  }));
        var expectedValue88 = '([object Object] [object Object] [object Object] [object Object] [object Object])';
        if (expectedValue88 === result87) {
            __PS_MV_REG = [];
            return pass();
        } else {
            var message89 = 'Expected (INSPECT (MAKE-LIST 5 (CREATE))) to eval to \"([object Object] [object Object] [object Object] [object Object] [object Object])\", but it was ' + inspect(result87);
            throw new MyTestFailure(message89);
        };
    };
};

function lengthbang(list) {
    var rec = function (list) {
        var list = list;
        var count = 0;
        while (true) {
            loopContinue728: {
                if (list === null) {
                    return count;
                } else {
                    var _js92 = cdr(list);
                    var _js93 = count + 1;
                    list = _js92;
                    count = _js93;
                    __PS_MV_REG = [];
                    break loopContinue728;
                };
            };
        };
    };
    __PS_MV_REG = [];
    return rec(list);
};

mytests['length!.1'] = function (pass) {
    var result = inspect(lengthbang(listbang()));
    var expectedValue = '0';
    if (expectedValue === result) {
        pass();
    } else {
        var message = 'Expected (INSPECT (LENGTH! (LIST!))) to eval to \"0\", but it was ' + inspect(result);
        throw new MyTestFailure(message);
    };
    var result90 = inspect(lengthbang(listbang(1)));
    var expectedValue91 = '1';
    if (expectedValue91 === result90) {
        pass();
    } else {
        var message92 = 'Expected (INSPECT (LENGTH! (LIST! 1))) to eval to \"1\", but it was ' + inspect(result90);
        throw new MyTestFailure(message92);
    };
    var result93 = inspect(lengthbang(listbang(1, 2, 3)));
    var expectedValue94 = '3';
    if (expectedValue94 === result93) {
        pass();
    } else {
        var message95 = 'Expected (INSPECT (LENGTH! (LIST! 1 2 3))) to eval to \"3\", but it was ' + inspect(result93);
        throw new MyTestFailure(message95);
    };
    var result96 = inspect(lengthbang(makeList(60000, 1)));
    var expectedValue97 = '60000';
    if (expectedValue97 === result96) {
        __PS_MV_REG = [];
        return pass();
    } else {
        var message98 = 'Expected (INSPECT (LENGTH! (MAKE-LIST 60000 1))) to eval to \"60000\", but it was ' + inspect(result96);
        throw new MyTestFailure(message98);
    };
};

pr(runTests());
export {
  inspect,
  cons,
  car,
  cdr,
  listbang,
  atom,
  consp,
  map,
  filter,
  makeList,
};
