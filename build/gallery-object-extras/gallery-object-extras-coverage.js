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
_yuitest_coverage["build/gallery-object-extras/gallery-object-extras.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-object-extras/gallery-object-extras.js",
    code: []
};
_yuitest_coverage["build/gallery-object-extras/gallery-object-extras.js"].code=["YUI.add('gallery-object-extras', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-object-extras"," */","","/**"," * <p>Augments Y.Object with the same higher-order functions that"," * array-extras adds to Y.Array.  Note that, unlike Y.Array, iteration"," * order for objects is arbitrary, so be careful when applying"," * non-commutative operations!</p>"," * "," * @main gallery-object-extras"," * @class Object~extras"," */","","Y.mix(Y.Object,","{","	/**","	 * Executes the supplied function on each item in the object.","	 * Iteration stops if the supplied function does not return a truthy","	 * value.  The function receives the value, the key, and the object","	 * itself as parameters (in that order).","	 *","	 * By default, only properties owned by obj are enumerated. To include","	 * prototype properties, set the proto parameter to true.","	 *","	 * @method every","	 * @static","	 * @param o {Object} the object to iterate","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @param proto {Boolean} include prototype properties","	 * @return {Boolean} true if every item in the array returns true from the supplied function, false otherwise","	 */","	every: function(o, f, c, proto)","	{","		for (var k in o)","		{","			if ((proto || o.hasOwnProperty(k)) && !f.call(c, o[k], k, o))","			{","				return false;","			}","		}","","		return true;","	},","","	/**","	 * Executes the supplied function on each item in the object.  Returns","	 * a new object containing the items for which the supplied function","	 * returned a truthy value.  The function receives the value, the key,","	 * and the object itself as parameters (in that order).","	 *","	 * By default, only properties owned by obj are enumerated. To include","	 * prototype properties, set the proto parameter to true.","	 *","	 * @method filter","	 * @static","	 * @param o {Object} the object to iterate","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @param proto {Boolean} include prototype properties","	 * @return {Object} object of items for which the supplied function returned a truthy value (empty if it never returned a truthy value)","	 */","	filter: function(o, f, c, proto)","	{","		var result = {};","","		for (var k in o)","		{","			var v = o[k];","			if ((proto || o.hasOwnProperty(k)) && f.call(c, v, k, o))","			{","				result[k] = v;","			}","		}","","		return result;","	},","","	/**","	 * Executes the supplied function on each item in the object, searching","	 * for the first item that matches the supplied function.  The function","	 * receives the value, the key, and the object itself as parameters (in","	 * that order).","	 *","	 * By default, only properties owned by obj are enumerated. To include","	 * prototype properties, set the proto parameter to true.","	 *","	 * @method find","	 * @static","	 * @param o {Object} the object to iterate","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @param proto {Boolean} include prototype properties","	 * @return {Mixed} the first item for which the supplied function returns true, or null if it never returns true","	 */","	find: function(o, f, c, proto)","	{","		for (var k in o)","		{","			var v = o[k];","			if ((proto || o.hasOwnProperty(k)) && f.call(c, v, k, o))","			{","				return v;","			}","		}","","		return null;","	},","","	/**","	 * Executes the supplied function on each item in the object, searching","	 * for the first item that matches the supplied function.","	 *","	 * By default, only properties owned by obj are enumerated. To include","	 * prototype properties, set the proto parameter to true.","	 *","	 * @method keyOf","	 * @static","	 * @param o {Object} the object to iterate","	 * @param v {Mixed} the value to search for","	 * @param proto {Boolean} include prototype properties","	 * @return {String} key of an item strictly equal to v, or null if not found","	 */","	keyOf: function(o, v, proto)","	{","		for (var k in o)","		{","			if ((proto || o.hasOwnProperty(k)) && o[k] === v)","			{","				return k;","			}","		}","","		return null;","	},","","	/**","	 * Executes a named method on each item in the object. Items that do","	 * not have a function by that name will be skipped.","	 *","	 * @method invoke","	 * @static","	 * @param o {Object} the object to iterate","	 * @param f {String} the function to invoke","	 * @param args* {Any} any number of additional args are passed as parameters to the execution of the named method","	 * @return {Object} all return values, mapped according to the item key","	 */","	invoke: function(o, f)","	{","		var args = Y.Array(arguments, 2, true),","			result = {};","","		for (var k in o)","		{","			var v = o[k];","			if (o.hasOwnProperty(k) && Y.Lang.isFunction(v[f]))","			{","				result[k] = v[f].apply(v, args);","			}","		}","","		return result;","	},","","	/**","	 * Executes the supplied function on each item in the object and","	 * returns a new object with the results.  The function receives the","	 * value, the key, and the object itself as parameters (in that order).","	 *","	 * By default, only properties owned by obj are enumerated. To include","	 * prototype properties, set the proto parameter to true.","	 *","	 * @method map","	 * @static","	 * @param o {Object} the object to iterate","	 * @param f {String} the function to invoke","	 * @param c {Object} optional context object","	 * @param proto {Boolean} include prototype properties","	 * @return {Object} all return values, mapped according to the item key","	 */","	map: function(o, f, c, proto)","	{","		var result = {};","","		for (var k in o)","		{","			if (proto || o.hasOwnProperty(k))","			{","				result[k] = f.call(c, o[k], k, o);","			}","		}","","		return result;","	},","","	/**","	 * Partitions an object into two new objects, one with the items for","	 * which the supplied function returns true, and one with the items","	 * for which the function returns false.  The function receives the","	 * value, the key, and the object itself as parameters (in that order).","	 *","	 * By default, only properties owned by obj are enumerated. To include","	 * prototype properties, set the proto parameter to true.","	 *","	 * @method partition","	 * @static","	 * @param o {Object} the object to iterate","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @param proto {Boolean} include prototype properties","	 * @return {Object} object with two properties: matches and rejects. Each is an object containing the items that were selected or rejected by the test function (or an empty object if none).","	 */","	partition: function(o, f, c, proto)","	{","		var result =","		{","			matches: {},","			rejects: {}","		};","","		for (var k in o)","		{","			var v = o[k];","			if (proto || o.hasOwnProperty(k))","			{","				var set = f.call(c, v, k, o) ? result.matches : result.rejects;","				set[k]  = v;","			}","		}","","		return result;","	},","","	/**","	 * Executes the supplied function on each item in the object, folding","	 * the object into a single value.  The function receives the value","	 * returned by the previous iteration (or the initial value if this is","	 * the first iteration), the value being iterated, the key, and the","	 * object itself as parameters (in that order).  The function must","	 * return the updated value.","	 *","	 * By default, only properties owned by obj are enumerated. To include","	 * prototype properties, set the proto parameter to true.","	 *","	 * @method reduce","	 * @static","	 * @param o {Object} the object to iterate","	 * @param init {Mixed} the initial value","	 * @param f {String} the function to invoke","	 * @param c {Object} optional context object","	 * @param proto {Boolean} include prototype properties","	 * @return {Mixed} final result from iteratively applying the given function to each item in the object","	 */","	reduce: function(o, init, f, c, proto)","	{","		var result = init;","","		for (var k in o)","		{","			if (proto || o.hasOwnProperty(k))","			{","				result = f.call(c, result, o[k], k, o);","			}","		}","","		return result;","	},","","	/**","	 * Executes the supplied function on each item in the object.  Returns","	 * a new object containing the items for which the supplied function","	 * returned a falsey value.  The function receives the value, the key,","	 * and the object itself as parameters (in that order).","	 *","	 * By default, only properties owned by obj are enumerated. To include","	 * prototype properties, set the proto parameter to true.","	 *","	 * @method reject","	 * @static","	 * @param o {Object} the object to iterate","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @param proto {Boolean} include prototype properties","	 * @return {Object} object of items for which the supplied function returned a falsey value (empty if it never returned a falsey value)","	 */","	reject: function(o, f, c, proto)","	{","		return Y.Object.filter(o, function(v, k, o)","		{","			return !f.call(c, v, k, o);","		},","		c, proto);","	},","","	/**","	 * Creates an object by pairing the corresponding elements of two arrays.","	 *","	 * @method zip","	 * @static","	 * @param a1 {Array} the keys which must be strings","	 * @param a2 {Array} the values","	 * @return {Object} object formed by pairing each element of the first array with an item in the second array having the corresponding index","	 */","	zip: function(a1, a2)","	{","		var result = {};","","		Y.Array.each(a1, function(v, i)","		{","			result[ v.toString() ] = a2[i];","		});","","		return result;","	}","});","","/**"," * Executes the supplied function on each item in the object, starting at"," * the end and folding the object into a single value.  The function"," * receives the value returned by the previous iteration (or the initial"," * value if this is the first iteration), the value being iterated, the"," * key, and the object itself as parameters (in that order).  The function"," * must return the updated value."," *"," * By default, only properties owned by obj are enumerated. To include"," * prototype properties, set the proto parameter to true."," * "," * Since the order of iteration is undefined for objects, this is identical"," * to `reduce`."," *"," * @method reduceRight"," * @static"," * @param o {Object} the object to iterate"," * @param init {Mixed} the initial value"," * @param f {String} the function to invoke"," * @param c {Object} optional context object"," * @param proto {Boolean} include prototype properties"," * @return {Mixed} final result from iteratively applying the given function to each item in the object"," */","Y.Object.reduceRight = Y.Object.reduce;","/**"," * @module gallery-object-extras"," */","","/**"," * @class Array~object-extras"," */","","Y.mix(Y.Array,","{","	/**","	 * Converts the array of objects into a map of the same objects, keyed","	 * off a particular attribute.","	 *","	 * @method toObject","	 * @static","	 * @param a {Array} the array to iterate","	 * @param k {String} the attribute to key off","	 * @return {Object} map of the objects","	 */","	toObject: function(a, k)","	{","		var result = {};","","		Y.Array.each(a, function(v)","		{","			result[ v[k] ] = v;","		});","","		return result;","	}","});","","","}, '@VERSION@', {\"requires\": [\"\"], \"optional\": [\"gallery-funcprog\"]});"];
_yuitest_coverage["build/gallery-object-extras/gallery-object-extras.js"].lines = {"1":0,"3":0,"19":0,"40":0,"42":0,"44":0,"48":0,"70":0,"72":0,"74":0,"75":0,"77":0,"81":0,"103":0,"105":0,"106":0,"108":0,"112":0,"131":0,"133":0,"135":0,"139":0,"155":0,"158":0,"160":0,"161":0,"163":0,"167":0,"188":0,"190":0,"192":0,"194":0,"198":0,"220":0,"226":0,"228":0,"229":0,"231":0,"232":0,"236":0,"261":0,"263":0,"265":0,"267":0,"271":0,"293":0,"295":0,"311":0,"313":0,"315":0,"318":0,"345":0,"354":0,"368":0,"370":0,"372":0,"375":0};
_yuitest_coverage["build/gallery-object-extras/gallery-object-extras.js"].functions = {"every:38":0,"filter:68":0,"find:101":0,"keyOf:129":0,"invoke:153":0,"map:186":0,"partition:218":0,"reduce:259":0,"(anonymous 2):293":0,"reject:291":0,"(anonymous 3):313":0,"zip:309":0,"(anonymous 4):370":0,"toObject:366":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-object-extras/gallery-object-extras.js"].coveredLines = 57;
_yuitest_coverage["build/gallery-object-extras/gallery-object-extras.js"].coveredFunctions = 15;
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 1);
YUI.add('gallery-object-extras', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-object-extras/gallery-object-extras.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 3);
"use strict";

/**
 * @module gallery-object-extras
 */

/**
 * <p>Augments Y.Object with the same higher-order functions that
 * array-extras adds to Y.Array.  Note that, unlike Y.Array, iteration
 * order for objects is arbitrary, so be careful when applying
 * non-commutative operations!</p>
 * 
 * @main gallery-object-extras
 * @class Object~extras
 */

_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 19);
Y.mix(Y.Object,
{
	/**
	 * Executes the supplied function on each item in the object.
	 * Iteration stops if the supplied function does not return a truthy
	 * value.  The function receives the value, the key, and the object
	 * itself as parameters (in that order).
	 *
	 * By default, only properties owned by obj are enumerated. To include
	 * prototype properties, set the proto parameter to true.
	 *
	 * @method every
	 * @static
	 * @param o {Object} the object to iterate
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @param proto {Boolean} include prototype properties
	 * @return {Boolean} true if every item in the array returns true from the supplied function, false otherwise
	 */
	every: function(o, f, c, proto)
	{
		_yuitest_coverfunc("build/gallery-object-extras/gallery-object-extras.js", "every", 38);
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 40);
for (var k in o)
		{
			_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 42);
if ((proto || o.hasOwnProperty(k)) && !f.call(c, o[k], k, o))
			{
				_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 44);
return false;
			}
		}

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 48);
return true;
	},

	/**
	 * Executes the supplied function on each item in the object.  Returns
	 * a new object containing the items for which the supplied function
	 * returned a truthy value.  The function receives the value, the key,
	 * and the object itself as parameters (in that order).
	 *
	 * By default, only properties owned by obj are enumerated. To include
	 * prototype properties, set the proto parameter to true.
	 *
	 * @method filter
	 * @static
	 * @param o {Object} the object to iterate
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @param proto {Boolean} include prototype properties
	 * @return {Object} object of items for which the supplied function returned a truthy value (empty if it never returned a truthy value)
	 */
	filter: function(o, f, c, proto)
	{
		_yuitest_coverfunc("build/gallery-object-extras/gallery-object-extras.js", "filter", 68);
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 70);
var result = {};

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 72);
for (var k in o)
		{
			_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 74);
var v = o[k];
			_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 75);
if ((proto || o.hasOwnProperty(k)) && f.call(c, v, k, o))
			{
				_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 77);
result[k] = v;
			}
		}

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 81);
return result;
	},

	/**
	 * Executes the supplied function on each item in the object, searching
	 * for the first item that matches the supplied function.  The function
	 * receives the value, the key, and the object itself as parameters (in
	 * that order).
	 *
	 * By default, only properties owned by obj are enumerated. To include
	 * prototype properties, set the proto parameter to true.
	 *
	 * @method find
	 * @static
	 * @param o {Object} the object to iterate
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @param proto {Boolean} include prototype properties
	 * @return {Mixed} the first item for which the supplied function returns true, or null if it never returns true
	 */
	find: function(o, f, c, proto)
	{
		_yuitest_coverfunc("build/gallery-object-extras/gallery-object-extras.js", "find", 101);
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 103);
for (var k in o)
		{
			_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 105);
var v = o[k];
			_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 106);
if ((proto || o.hasOwnProperty(k)) && f.call(c, v, k, o))
			{
				_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 108);
return v;
			}
		}

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 112);
return null;
	},

	/**
	 * Executes the supplied function on each item in the object, searching
	 * for the first item that matches the supplied function.
	 *
	 * By default, only properties owned by obj are enumerated. To include
	 * prototype properties, set the proto parameter to true.
	 *
	 * @method keyOf
	 * @static
	 * @param o {Object} the object to iterate
	 * @param v {Mixed} the value to search for
	 * @param proto {Boolean} include prototype properties
	 * @return {String} key of an item strictly equal to v, or null if not found
	 */
	keyOf: function(o, v, proto)
	{
		_yuitest_coverfunc("build/gallery-object-extras/gallery-object-extras.js", "keyOf", 129);
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 131);
for (var k in o)
		{
			_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 133);
if ((proto || o.hasOwnProperty(k)) && o[k] === v)
			{
				_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 135);
return k;
			}
		}

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 139);
return null;
	},

	/**
	 * Executes a named method on each item in the object. Items that do
	 * not have a function by that name will be skipped.
	 *
	 * @method invoke
	 * @static
	 * @param o {Object} the object to iterate
	 * @param f {String} the function to invoke
	 * @param args* {Any} any number of additional args are passed as parameters to the execution of the named method
	 * @return {Object} all return values, mapped according to the item key
	 */
	invoke: function(o, f)
	{
		_yuitest_coverfunc("build/gallery-object-extras/gallery-object-extras.js", "invoke", 153);
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 155);
var args = Y.Array(arguments, 2, true),
			result = {};

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 158);
for (var k in o)
		{
			_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 160);
var v = o[k];
			_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 161);
if (o.hasOwnProperty(k) && Y.Lang.isFunction(v[f]))
			{
				_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 163);
result[k] = v[f].apply(v, args);
			}
		}

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 167);
return result;
	},

	/**
	 * Executes the supplied function on each item in the object and
	 * returns a new object with the results.  The function receives the
	 * value, the key, and the object itself as parameters (in that order).
	 *
	 * By default, only properties owned by obj are enumerated. To include
	 * prototype properties, set the proto parameter to true.
	 *
	 * @method map
	 * @static
	 * @param o {Object} the object to iterate
	 * @param f {String} the function to invoke
	 * @param c {Object} optional context object
	 * @param proto {Boolean} include prototype properties
	 * @return {Object} all return values, mapped according to the item key
	 */
	map: function(o, f, c, proto)
	{
		_yuitest_coverfunc("build/gallery-object-extras/gallery-object-extras.js", "map", 186);
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 188);
var result = {};

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 190);
for (var k in o)
		{
			_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 192);
if (proto || o.hasOwnProperty(k))
			{
				_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 194);
result[k] = f.call(c, o[k], k, o);
			}
		}

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 198);
return result;
	},

	/**
	 * Partitions an object into two new objects, one with the items for
	 * which the supplied function returns true, and one with the items
	 * for which the function returns false.  The function receives the
	 * value, the key, and the object itself as parameters (in that order).
	 *
	 * By default, only properties owned by obj are enumerated. To include
	 * prototype properties, set the proto parameter to true.
	 *
	 * @method partition
	 * @static
	 * @param o {Object} the object to iterate
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @param proto {Boolean} include prototype properties
	 * @return {Object} object with two properties: matches and rejects. Each is an object containing the items that were selected or rejected by the test function (or an empty object if none).
	 */
	partition: function(o, f, c, proto)
	{
		_yuitest_coverfunc("build/gallery-object-extras/gallery-object-extras.js", "partition", 218);
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 220);
var result =
		{
			matches: {},
			rejects: {}
		};

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 226);
for (var k in o)
		{
			_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 228);
var v = o[k];
			_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 229);
if (proto || o.hasOwnProperty(k))
			{
				_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 231);
var set = f.call(c, v, k, o) ? result.matches : result.rejects;
				_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 232);
set[k]  = v;
			}
		}

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 236);
return result;
	},

	/**
	 * Executes the supplied function on each item in the object, folding
	 * the object into a single value.  The function receives the value
	 * returned by the previous iteration (or the initial value if this is
	 * the first iteration), the value being iterated, the key, and the
	 * object itself as parameters (in that order).  The function must
	 * return the updated value.
	 *
	 * By default, only properties owned by obj are enumerated. To include
	 * prototype properties, set the proto parameter to true.
	 *
	 * @method reduce
	 * @static
	 * @param o {Object} the object to iterate
	 * @param init {Mixed} the initial value
	 * @param f {String} the function to invoke
	 * @param c {Object} optional context object
	 * @param proto {Boolean} include prototype properties
	 * @return {Mixed} final result from iteratively applying the given function to each item in the object
	 */
	reduce: function(o, init, f, c, proto)
	{
		_yuitest_coverfunc("build/gallery-object-extras/gallery-object-extras.js", "reduce", 259);
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 261);
var result = init;

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 263);
for (var k in o)
		{
			_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 265);
if (proto || o.hasOwnProperty(k))
			{
				_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 267);
result = f.call(c, result, o[k], k, o);
			}
		}

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 271);
return result;
	},

	/**
	 * Executes the supplied function on each item in the object.  Returns
	 * a new object containing the items for which the supplied function
	 * returned a falsey value.  The function receives the value, the key,
	 * and the object itself as parameters (in that order).
	 *
	 * By default, only properties owned by obj are enumerated. To include
	 * prototype properties, set the proto parameter to true.
	 *
	 * @method reject
	 * @static
	 * @param o {Object} the object to iterate
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @param proto {Boolean} include prototype properties
	 * @return {Object} object of items for which the supplied function returned a falsey value (empty if it never returned a falsey value)
	 */
	reject: function(o, f, c, proto)
	{
		_yuitest_coverfunc("build/gallery-object-extras/gallery-object-extras.js", "reject", 291);
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 293);
return Y.Object.filter(o, function(v, k, o)
		{
			_yuitest_coverfunc("build/gallery-object-extras/gallery-object-extras.js", "(anonymous 2)", 293);
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 295);
return !f.call(c, v, k, o);
		},
		c, proto);
	},

	/**
	 * Creates an object by pairing the corresponding elements of two arrays.
	 *
	 * @method zip
	 * @static
	 * @param a1 {Array} the keys which must be strings
	 * @param a2 {Array} the values
	 * @return {Object} object formed by pairing each element of the first array with an item in the second array having the corresponding index
	 */
	zip: function(a1, a2)
	{
		_yuitest_coverfunc("build/gallery-object-extras/gallery-object-extras.js", "zip", 309);
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 311);
var result = {};

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 313);
Y.Array.each(a1, function(v, i)
		{
			_yuitest_coverfunc("build/gallery-object-extras/gallery-object-extras.js", "(anonymous 3)", 313);
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 315);
result[ v.toString() ] = a2[i];
		});

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 318);
return result;
	}
});

/**
 * Executes the supplied function on each item in the object, starting at
 * the end and folding the object into a single value.  The function
 * receives the value returned by the previous iteration (or the initial
 * value if this is the first iteration), the value being iterated, the
 * key, and the object itself as parameters (in that order).  The function
 * must return the updated value.
 *
 * By default, only properties owned by obj are enumerated. To include
 * prototype properties, set the proto parameter to true.
 * 
 * Since the order of iteration is undefined for objects, this is identical
 * to `reduce`.
 *
 * @method reduceRight
 * @static
 * @param o {Object} the object to iterate
 * @param init {Mixed} the initial value
 * @param f {String} the function to invoke
 * @param c {Object} optional context object
 * @param proto {Boolean} include prototype properties
 * @return {Mixed} final result from iteratively applying the given function to each item in the object
 */
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 345);
Y.Object.reduceRight = Y.Object.reduce;
/**
 * @module gallery-object-extras
 */

/**
 * @class Array~object-extras
 */

_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 354);
Y.mix(Y.Array,
{
	/**
	 * Converts the array of objects into a map of the same objects, keyed
	 * off a particular attribute.
	 *
	 * @method toObject
	 * @static
	 * @param a {Array} the array to iterate
	 * @param k {String} the attribute to key off
	 * @return {Object} map of the objects
	 */
	toObject: function(a, k)
	{
		_yuitest_coverfunc("build/gallery-object-extras/gallery-object-extras.js", "toObject", 366);
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 368);
var result = {};

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 370);
Y.Array.each(a, function(v)
		{
			_yuitest_coverfunc("build/gallery-object-extras/gallery-object-extras.js", "(anonymous 4)", 370);
_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 372);
result[ v[k] ] = v;
		});

		_yuitest_coverline("build/gallery-object-extras/gallery-object-extras.js", 375);
return result;
	}
});


}, '@VERSION@', {"requires": [""], "optional": ["gallery-funcprog"]});
