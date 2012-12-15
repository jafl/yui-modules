if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-sort-extras/gallery-sort-extras.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-sort-extras/gallery-sort-extras.js",
    code: []
};
_yuitest_coverage["build/gallery-sort-extras/gallery-sort-extras.js"].code=["YUI.add('gallery-sort-extras', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-sort-extras"," */","","/**"," * <p>Utilities for sorting.</p>"," * "," * @main gallery-sort-extras"," * @class Sort"," */","","var isArray = Y.Lang.isArray;","","var Sort = Y.namespace('Sort');","","/**"," * Utility function for extracting the same value from both comparator"," * arguments."," *"," * @method drill"," * @static"," * @param key {Array} path to element stored in both a and b"," * @param a {Object} first object to compare"," * @param b {Object} second object to compare"," * @return {Array} values extracted from a and b"," */","Sort.drill = function(key, a,b)","{","	// optimize for speed, so don't use Y.each","","	var count = key.length;","	for (var i=0; i<count; i++)","	{","		var k = key[i];","		a     = a[k];","		b     = b[k];","	}","","	return [a,b];","};","","/**"," * The default behavior for sorting strings.  Provided for cases where one"," * needs to compare object members."," *"," * @method compareAsString"," * @static"," * @param a {String} first string to compare"," * @param b {String} second string to compare"," * @return {Number} -1,0,+1 based on comparing the strings"," */","Sort.compareAsString = function(a,b)","{","	return (a < b ? -1 : a > b ? +1 : 0);","};","","/**"," * @method compareAsStringNoCase"," * @static"," * @param a {String} first string to compare"," * @param b {String} second string to compare"," * @return {Number} -1,0,+1 based on comparing the strings when ignoring case"," */","Sort.compareAsStringNoCase = function(a,b)","{","	a = a.toLowerCase();","	b = b.toLowerCase();","	return (a < b ? -1 : a > b ? +1 : 0);	// duplicate Sort.compareAsString() for speed","};","","/**"," * The default behavior for sorting numbers.  Provided for cases where one"," * needs to compare object members."," *"," * @method compareAsNumber"," * @static"," * @param a {Number} first number to compare"," * @param b {Number} second number to compare"," * @return {Number} -1,0,+1 based on comparing the values"," */","Sort.compareAsNumber = function(a,b)","{","	return a - b;","};","","/**"," * <p>Sort by an object member:"," * `sort(Y.bind(Y.Sort.compareKey, null, Y.Sort.compareAs*, key_or_path))`</p>"," * "," * <p>Key can be an array, to drill deep inside the objects, e.g.,"," * `['foo','bar','baz']` translates to a.foo.bar.baz</p>"," *"," * @method compareKey"," * @static"," * @param f {Function} comparator"," * @param key {String|Array} object key or path to the value which should be compared"," * @return {Number} -1,0,+1 based on comparing the values"," */","Sort.compareKey = function(f, key, a,b)","{","	if (isArray(key))","	{","		var v = Sort.drill(key, a,b);","		return f(v[0], v[1]);","	}","	else","	{","		return f(a[key], b[key]);","	}","};","","/**"," * Flip the sort order:  `sort(Y.Sort.flip(comparator))`"," *"," * @method flip"," * @static"," * @param f {Function} original comparator which takes 2 arguments"," * @return {Function} new comparator that inverts the sort order"," */","Sort.flip = function(f)","{","	return function(a,b)","	{","		return f(b,a);","	};","};","","","}, '@VERSION@', {\"requires\": [\"oop\"]});"];
_yuitest_coverage["build/gallery-sort-extras/gallery-sort-extras.js"].lines = {"1":0,"3":0,"16":0,"18":0,"31":0,"35":0,"36":0,"38":0,"39":0,"40":0,"43":0,"56":0,"58":0,"68":0,"70":0,"71":0,"72":0,"85":0,"87":0,"103":0,"105":0,"107":0,"108":0,"112":0,"124":0,"126":0,"128":0};
_yuitest_coverage["build/gallery-sort-extras/gallery-sort-extras.js"].functions = {"drill:31":0,"compareAsString:56":0,"compareAsStringNoCase:68":0,"compareAsNumber:85":0,"compareKey:103":0,"(anonymous 2):126":0,"flip:124":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-sort-extras/gallery-sort-extras.js"].coveredLines = 27;
_yuitest_coverage["build/gallery-sort-extras/gallery-sort-extras.js"].coveredFunctions = 8;
_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 1);
YUI.add('gallery-sort-extras', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-sort-extras/gallery-sort-extras.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 3);
"use strict";

/**
 * @module gallery-sort-extras
 */

/**
 * <p>Utilities for sorting.</p>
 * 
 * @main gallery-sort-extras
 * @class Sort
 */

_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 16);
var isArray = Y.Lang.isArray;

_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 18);
var Sort = Y.namespace('Sort');

/**
 * Utility function for extracting the same value from both comparator
 * arguments.
 *
 * @method drill
 * @static
 * @param key {Array} path to element stored in both a and b
 * @param a {Object} first object to compare
 * @param b {Object} second object to compare
 * @return {Array} values extracted from a and b
 */
_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 31);
Sort.drill = function(key, a,b)
{
	// optimize for speed, so don't use Y.each

	_yuitest_coverfunc("build/gallery-sort-extras/gallery-sort-extras.js", "drill", 31);
_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 35);
var count = key.length;
	_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 36);
for (var i=0; i<count; i++)
	{
		_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 38);
var k = key[i];
		_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 39);
a     = a[k];
		_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 40);
b     = b[k];
	}

	_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 43);
return [a,b];
};

/**
 * The default behavior for sorting strings.  Provided for cases where one
 * needs to compare object members.
 *
 * @method compareAsString
 * @static
 * @param a {String} first string to compare
 * @param b {String} second string to compare
 * @return {Number} -1,0,+1 based on comparing the strings
 */
_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 56);
Sort.compareAsString = function(a,b)
{
	_yuitest_coverfunc("build/gallery-sort-extras/gallery-sort-extras.js", "compareAsString", 56);
_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 58);
return (a < b ? -1 : a > b ? +1 : 0);
};

/**
 * @method compareAsStringNoCase
 * @static
 * @param a {String} first string to compare
 * @param b {String} second string to compare
 * @return {Number} -1,0,+1 based on comparing the strings when ignoring case
 */
_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 68);
Sort.compareAsStringNoCase = function(a,b)
{
	_yuitest_coverfunc("build/gallery-sort-extras/gallery-sort-extras.js", "compareAsStringNoCase", 68);
_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 70);
a = a.toLowerCase();
	_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 71);
b = b.toLowerCase();
	_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 72);
return (a < b ? -1 : a > b ? +1 : 0);	// duplicate Sort.compareAsString() for speed
};

/**
 * The default behavior for sorting numbers.  Provided for cases where one
 * needs to compare object members.
 *
 * @method compareAsNumber
 * @static
 * @param a {Number} first number to compare
 * @param b {Number} second number to compare
 * @return {Number} -1,0,+1 based on comparing the values
 */
_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 85);
Sort.compareAsNumber = function(a,b)
{
	_yuitest_coverfunc("build/gallery-sort-extras/gallery-sort-extras.js", "compareAsNumber", 85);
_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 87);
return a - b;
};

/**
 * <p>Sort by an object member:
 * `sort(Y.bind(Y.Sort.compareKey, null, Y.Sort.compareAs*, key_or_path))`</p>
 * 
 * <p>Key can be an array, to drill deep inside the objects, e.g.,
 * `['foo','bar','baz']` translates to a.foo.bar.baz</p>
 *
 * @method compareKey
 * @static
 * @param f {Function} comparator
 * @param key {String|Array} object key or path to the value which should be compared
 * @return {Number} -1,0,+1 based on comparing the values
 */
_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 103);
Sort.compareKey = function(f, key, a,b)
{
	_yuitest_coverfunc("build/gallery-sort-extras/gallery-sort-extras.js", "compareKey", 103);
_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 105);
if (isArray(key))
	{
		_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 107);
var v = Sort.drill(key, a,b);
		_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 108);
return f(v[0], v[1]);
	}
	else
	{
		_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 112);
return f(a[key], b[key]);
	}
};

/**
 * Flip the sort order:  `sort(Y.Sort.flip(comparator))`
 *
 * @method flip
 * @static
 * @param f {Function} original comparator which takes 2 arguments
 * @return {Function} new comparator that inverts the sort order
 */
_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 124);
Sort.flip = function(f)
{
	_yuitest_coverfunc("build/gallery-sort-extras/gallery-sort-extras.js", "flip", 124);
_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 126);
return function(a,b)
	{
		_yuitest_coverfunc("build/gallery-sort-extras/gallery-sort-extras.js", "(anonymous 2)", 126);
_yuitest_coverline("build/gallery-sort-extras/gallery-sort-extras.js", 128);
return f(b,a);
	};
};


}, '@VERSION@', {"requires": ["oop"]});
