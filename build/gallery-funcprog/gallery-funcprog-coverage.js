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
_yuitest_coverage["build/gallery-funcprog/gallery-funcprog.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-funcprog/gallery-funcprog.js",
    code: []
};
_yuitest_coverage["build/gallery-funcprog/gallery-funcprog.js"].code=["YUI.add('gallery-funcprog', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-funcprog"," */","","/**********************************************************************"," * <p>Augments global Y object with the same higher-order functions that"," * array-extras adds to Y.Array.  Note that, unlike arrays and NodeLists,"," * iteration order for an object is arbitrary, so be careful when applying"," * non-commutative operations!</p>"," *"," * @main gallery-funcprog"," * @class YUI~funcprog"," */","","// adjusted from YUI's oop.js","function dispatch(action, o)","{","	var args = Y.Array(arguments, 1, true);","","	switch (Y.Array.test(o))","	{","		case 1:","			return Y.Array[action].apply(null, args);","		case 2:","			args[0] = Y.Array(o, 0, true);","			return Y.Array[action].apply(null, args);","		default:","			if (o && o[action] && o !== Y)","			{","				args.shift();","				return o[action].apply(o, args);","			}","			else","			{","				return Y.Object[action].apply(null, args);","			}","	}","}","","Y.mix(Y,","{","	/**","	 * Executes the supplied function on each item in the object.","	 * Iteration stops if the supplied function does not return a truthy","	 * value.  The function receives the value, the key, and the object","	 * itself as parameters (in that order).","	 *","	 * Supports arrays, objects, and NodeLists.","	 *","	 * @method every","	 * @static","	 * @param o {Mixed} the object to iterate","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @param proto {Boolean} if true, prototype properties are iterated on objects","	 * @return {Boolean} true if every item in the array returns true from the supplied function, false otherwise","	 */","	every: function(o, f, c, proto)","	{","		return dispatch('every', o, f, c, proto);","	},","","	/**","	 * Executes the supplied function on each item in the object.  Returns","	 * a new object containing the items for which the supplied function","	 * returned a truthy value.  The function receives the value, the key,","	 * and the object itself as parameters (in that order).","	 *","	 * Supports arrays, objects, and NodeLists.","	 *","	 * @method filter","	 * @static","	 * @param o {Mixed} the object to iterate","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @param proto {Boolean} if true, prototype properties are iterated on objects","	 * @return {Object} array or object of items for which the supplied function returned a truthy value (empty if it never returned a truthy value)","	 */","	filter: function(o, f, c, proto)","	{","		return dispatch('filter', o, f, c, proto);","	},","","	/**","	 * Executes the supplied function on each item in the object, searching","	 * for the first item that matches the supplied function.  The function","	 * receives the value, the key, and the object itself as parameters (in","	 * that order).","	 *","	 * Supports arrays, objects, and NodeLists.","	 *","	 * @method find","	 * @static","	 * @param o {Mixed} the object to iterate","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @param proto {Boolean} if true, prototype properties are iterated on objects","	 * @return {Mixed} the first item for which the supplied function returns true, or null if it never returns true","	 */","	find: function(o, f, c, proto)","	{","		return dispatch('find', o, f, c, proto);","	},","","	/**","	 * Executes the supplied function on each item in the object and","	 * returns a new object with the results.  The function receives the","	 * value, the key, and the object itself as parameters (in that order).","	 *","	 * Supports arrays, objects, and NodeLists.","	 *","	 * @method map","	 * @static","	 * @param o {Mixed} the object to iterate","	 * @param f {String} the function to invoke","	 * @param c {Object} optional context object","	 * @param proto {Boolean} if true, prototype properties are iterated on objects","	 * @return {Object} array or object of all return values, mapped according to the item key","	 */","	map: function(o, f, c, proto)","	{","		return dispatch('map', o, f, c, proto);","	},","","	/**","	 * Partitions an object into two new objects, one with the items for","	 * which the supplied function returns true, and one with the items","	 * for which the function returns false.  The function receives the","	 * value, the key, and the object itself as parameters (in that order).","	 *","	 * Supports arrays, objects, and NodeLists.","	 *","	 * @method partition","	 * @static","	 * @param o {Mixed} the object to iterate","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @param proto {Boolean} if true, prototype properties are iterated on objects","	 * @return {Object} object with two properties: matches and rejects. Each is an array or object containing the items that were selected or rejected by the test function (or an empty object if none).","	 */","	partition: function(o, f, c, proto)","	{","		return dispatch('partition', o, f, c, proto);","	},","","	/**","	 * Executes the supplied function on each item in the object, folding","	 * the object into a single value.  The function receives the value","	 * returned by the previous iteration (or the initial value if this is","	 * the first iteration), the value being iterated, the key, and the","	 * object itself as parameters (in that order).  The function must","	 * return the updated value.","	 *","	 * Supports arrays, objects, and NodeLists.","	 *","	 * @method reduce","	 * @static","	 * @param o {Mixed} the object to iterate","	 * @param init {Mixed} the initial value","	 * @param f {String} the function to invoke","	 * @param c {Object} optional context object","	 * @param proto {Boolean} if true, prototype properties are iterated on objects","	 * @return {Mixed} final result from iteratively applying the given function to each item in the object","	 */","	reduce: function(o, init, f, c, proto)","	{","		return dispatch('reduce', o, init, f, c, proto);","	},","","	/**","	 * Executes the supplied function on each item in the object, starting","	 * from the \"end\" and folding the object into a single value.  The","	 * function receives the value returned by the previous iteration (or","	 * the initial value if this is the first iteration), the value being","	 * iterated, the key, and the object itself as parameters (in that","	 * order).  The function must return the updated value.","	 *","	 * Supports arrays, objects, and NodeLists.","	 *","	 * @method reduceRight","	 * @static","	 * @param o {Mixed} the object to iterate","	 * @param init {Mixed} the initial value","	 * @param f {String} the function to invoke","	 * @param c {Object} optional context object","	 * @param proto {Boolean} if true, prototype properties are iterated on objects","	 * @return {Mixed} final result from iteratively applying the given function to each item in the object","	 */","	reduceRight: function(o, init, f, c, proto)","	{","		return dispatch('reduceRight', o, init, f, c, proto);","	},","","	/**","	 * Executes the supplied function on each item in the object.  Returns","	 * a new object containing the items for which the supplied function","	 * returned a falsey value.  The function receives the value, the key,","	 * and the object itself as parameters (in that order).","	 *","	 * Supports arrays, objects, and NodeLists.","	 *","	 * @method reject","	 * @static","	 * @param o {Mixed} the object to iterate","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @param proto {Boolean} if true, prototype properties are iterated on objects","	 * @return {Object} array or object of items for which the supplied function returned a falsey value (empty if it never returned a falsey value)","	 */","	reject: function(o, f, c, proto)","	{","		return dispatch('reject', o, f, c, proto);","	}","});","/**"," * @module gallery-funcprog"," */","","/**"," * @class Array~funcprog-extras"," */","","Y.mix(Y.Array,","{","	/**","	 * Executes the supplied function on each item in the array, searching","	 * for the first item that matches the supplied function.  The function","	 * receives the value, the index, and the array itself as parameters","	 * (in that order).","	 *","	 * @method findIndexOf","	 * @static","	 * @param a {Array} the array to iterate","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @return {Number} index of the first item for which the supplied function returns true, or -1 if it never returns true","	 */","	findIndexOf: function(a, f, c)","	{","		var index = -1;","","		Y.Array.some(a, function(v, i)","		{","			if (f.call(c, v, i, a))","			{","				index = i;","				return true;","			}","		});","","		return index;","	}","});","","/**"," * Executes the supplied function on each item in the array, starting"," * from the end and folding the list into a single value.  The function"," * receives the value returned by the previous iteration (or the"," * initial value if this is the first iteration), the value being"," * iterated, the index, and the list itself as parameters (in that"," * order).  The function must return the updated value."," *"," * @method reduceRight"," * @param init {Mixed} the initial value"," * @param f {String} the function to invoke"," * @param c {Object} optional context object"," * @return {Mixed} final result from iteratively applying the given function to each item in the array"," */","Y.Array.reduceRight = Y.Lang._isNative(Array.prototype.reduceRight) ?","	function(a, init, f, c)","	{","		return Array.prototype.reduceRight.call(a, function(init, item, i, a)","		{","			return f.call(c, init, item, i, a);","		},","		init);","	}","	:","	function(a, init, f, c)","	{","		var result = init;","		for (var i=a.length-1; i>=0; i--)","		{","			result = f.call(c, result, a[i], i, a);","		}","","		return result;","	};","","","}, '@VERSION@', {\"requires\": [\"oop\", \"array-extras\", \"gallery-object-extras\"], \"optional\": [\"gallery-nodelist-extras2\"]});"];
_yuitest_coverage["build/gallery-funcprog/gallery-funcprog.js"].lines = {"1":0,"3":0,"20":0,"22":0,"24":0,"27":0,"29":0,"30":0,"32":0,"34":0,"35":0,"39":0,"44":0,"64":0,"85":0,"106":0,"126":0,"147":0,"171":0,"195":0,"216":0,"227":0,"244":0,"246":0,"248":0,"250":0,"251":0,"255":0,"273":0,"276":0,"278":0,"285":0,"286":0,"288":0,"291":0};
_yuitest_coverage["build/gallery-funcprog/gallery-funcprog.js"].functions = {"dispatch:20":0,"every:62":0,"filter:83":0,"find:104":0,"map:124":0,"partition:145":0,"reduce:169":0,"reduceRight:193":0,"reject:214":0,"(anonymous 2):246":0,"findIndexOf:242":0,"(anonymous 4):276":0,"(anonymous 3):274":0,"}:283":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-funcprog/gallery-funcprog.js"].coveredLines = 35;
_yuitest_coverage["build/gallery-funcprog/gallery-funcprog.js"].coveredFunctions = 15;
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 1);
YUI.add('gallery-funcprog', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-funcprog/gallery-funcprog.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 3);
"use strict";

/**
 * @module gallery-funcprog
 */

/**********************************************************************
 * <p>Augments global Y object with the same higher-order functions that
 * array-extras adds to Y.Array.  Note that, unlike arrays and NodeLists,
 * iteration order for an object is arbitrary, so be careful when applying
 * non-commutative operations!</p>
 *
 * @main gallery-funcprog
 * @class YUI~funcprog
 */

// adjusted from YUI's oop.js
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 20);
function dispatch(action, o)
{
	_yuitest_coverfunc("build/gallery-funcprog/gallery-funcprog.js", "dispatch", 20);
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 22);
var args = Y.Array(arguments, 1, true);

	_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 24);
switch (Y.Array.test(o))
	{
		case 1:
			_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 27);
return Y.Array[action].apply(null, args);
		case 2:
			_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 29);
args[0] = Y.Array(o, 0, true);
			_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 30);
return Y.Array[action].apply(null, args);
		default:
			_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 32);
if (o && o[action] && o !== Y)
			{
				_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 34);
args.shift();
				_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 35);
return o[action].apply(o, args);
			}
			else
			{
				_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 39);
return Y.Object[action].apply(null, args);
			}
	}
}

_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 44);
Y.mix(Y,
{
	/**
	 * Executes the supplied function on each item in the object.
	 * Iteration stops if the supplied function does not return a truthy
	 * value.  The function receives the value, the key, and the object
	 * itself as parameters (in that order).
	 *
	 * Supports arrays, objects, and NodeLists.
	 *
	 * @method every
	 * @static
	 * @param o {Mixed} the object to iterate
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @param proto {Boolean} if true, prototype properties are iterated on objects
	 * @return {Boolean} true if every item in the array returns true from the supplied function, false otherwise
	 */
	every: function(o, f, c, proto)
	{
		_yuitest_coverfunc("build/gallery-funcprog/gallery-funcprog.js", "every", 62);
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 64);
return dispatch('every', o, f, c, proto);
	},

	/**
	 * Executes the supplied function on each item in the object.  Returns
	 * a new object containing the items for which the supplied function
	 * returned a truthy value.  The function receives the value, the key,
	 * and the object itself as parameters (in that order).
	 *
	 * Supports arrays, objects, and NodeLists.
	 *
	 * @method filter
	 * @static
	 * @param o {Mixed} the object to iterate
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @param proto {Boolean} if true, prototype properties are iterated on objects
	 * @return {Object} array or object of items for which the supplied function returned a truthy value (empty if it never returned a truthy value)
	 */
	filter: function(o, f, c, proto)
	{
		_yuitest_coverfunc("build/gallery-funcprog/gallery-funcprog.js", "filter", 83);
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 85);
return dispatch('filter', o, f, c, proto);
	},

	/**
	 * Executes the supplied function on each item in the object, searching
	 * for the first item that matches the supplied function.  The function
	 * receives the value, the key, and the object itself as parameters (in
	 * that order).
	 *
	 * Supports arrays, objects, and NodeLists.
	 *
	 * @method find
	 * @static
	 * @param o {Mixed} the object to iterate
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @param proto {Boolean} if true, prototype properties are iterated on objects
	 * @return {Mixed} the first item for which the supplied function returns true, or null if it never returns true
	 */
	find: function(o, f, c, proto)
	{
		_yuitest_coverfunc("build/gallery-funcprog/gallery-funcprog.js", "find", 104);
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 106);
return dispatch('find', o, f, c, proto);
	},

	/**
	 * Executes the supplied function on each item in the object and
	 * returns a new object with the results.  The function receives the
	 * value, the key, and the object itself as parameters (in that order).
	 *
	 * Supports arrays, objects, and NodeLists.
	 *
	 * @method map
	 * @static
	 * @param o {Mixed} the object to iterate
	 * @param f {String} the function to invoke
	 * @param c {Object} optional context object
	 * @param proto {Boolean} if true, prototype properties are iterated on objects
	 * @return {Object} array or object of all return values, mapped according to the item key
	 */
	map: function(o, f, c, proto)
	{
		_yuitest_coverfunc("build/gallery-funcprog/gallery-funcprog.js", "map", 124);
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 126);
return dispatch('map', o, f, c, proto);
	},

	/**
	 * Partitions an object into two new objects, one with the items for
	 * which the supplied function returns true, and one with the items
	 * for which the function returns false.  The function receives the
	 * value, the key, and the object itself as parameters (in that order).
	 *
	 * Supports arrays, objects, and NodeLists.
	 *
	 * @method partition
	 * @static
	 * @param o {Mixed} the object to iterate
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @param proto {Boolean} if true, prototype properties are iterated on objects
	 * @return {Object} object with two properties: matches and rejects. Each is an array or object containing the items that were selected or rejected by the test function (or an empty object if none).
	 */
	partition: function(o, f, c, proto)
	{
		_yuitest_coverfunc("build/gallery-funcprog/gallery-funcprog.js", "partition", 145);
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 147);
return dispatch('partition', o, f, c, proto);
	},

	/**
	 * Executes the supplied function on each item in the object, folding
	 * the object into a single value.  The function receives the value
	 * returned by the previous iteration (or the initial value if this is
	 * the first iteration), the value being iterated, the key, and the
	 * object itself as parameters (in that order).  The function must
	 * return the updated value.
	 *
	 * Supports arrays, objects, and NodeLists.
	 *
	 * @method reduce
	 * @static
	 * @param o {Mixed} the object to iterate
	 * @param init {Mixed} the initial value
	 * @param f {String} the function to invoke
	 * @param c {Object} optional context object
	 * @param proto {Boolean} if true, prototype properties are iterated on objects
	 * @return {Mixed} final result from iteratively applying the given function to each item in the object
	 */
	reduce: function(o, init, f, c, proto)
	{
		_yuitest_coverfunc("build/gallery-funcprog/gallery-funcprog.js", "reduce", 169);
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 171);
return dispatch('reduce', o, init, f, c, proto);
	},

	/**
	 * Executes the supplied function on each item in the object, starting
	 * from the "end" and folding the object into a single value.  The
	 * function receives the value returned by the previous iteration (or
	 * the initial value if this is the first iteration), the value being
	 * iterated, the key, and the object itself as parameters (in that
	 * order).  The function must return the updated value.
	 *
	 * Supports arrays, objects, and NodeLists.
	 *
	 * @method reduceRight
	 * @static
	 * @param o {Mixed} the object to iterate
	 * @param init {Mixed} the initial value
	 * @param f {String} the function to invoke
	 * @param c {Object} optional context object
	 * @param proto {Boolean} if true, prototype properties are iterated on objects
	 * @return {Mixed} final result from iteratively applying the given function to each item in the object
	 */
	reduceRight: function(o, init, f, c, proto)
	{
		_yuitest_coverfunc("build/gallery-funcprog/gallery-funcprog.js", "reduceRight", 193);
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 195);
return dispatch('reduceRight', o, init, f, c, proto);
	},

	/**
	 * Executes the supplied function on each item in the object.  Returns
	 * a new object containing the items for which the supplied function
	 * returned a falsey value.  The function receives the value, the key,
	 * and the object itself as parameters (in that order).
	 *
	 * Supports arrays, objects, and NodeLists.
	 *
	 * @method reject
	 * @static
	 * @param o {Mixed} the object to iterate
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @param proto {Boolean} if true, prototype properties are iterated on objects
	 * @return {Object} array or object of items for which the supplied function returned a falsey value (empty if it never returned a falsey value)
	 */
	reject: function(o, f, c, proto)
	{
		_yuitest_coverfunc("build/gallery-funcprog/gallery-funcprog.js", "reject", 214);
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 216);
return dispatch('reject', o, f, c, proto);
	}
});
/**
 * @module gallery-funcprog
 */

/**
 * @class Array~funcprog-extras
 */

_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 227);
Y.mix(Y.Array,
{
	/**
	 * Executes the supplied function on each item in the array, searching
	 * for the first item that matches the supplied function.  The function
	 * receives the value, the index, and the array itself as parameters
	 * (in that order).
	 *
	 * @method findIndexOf
	 * @static
	 * @param a {Array} the array to iterate
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @return {Number} index of the first item for which the supplied function returns true, or -1 if it never returns true
	 */
	findIndexOf: function(a, f, c)
	{
		_yuitest_coverfunc("build/gallery-funcprog/gallery-funcprog.js", "findIndexOf", 242);
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 244);
var index = -1;

		_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 246);
Y.Array.some(a, function(v, i)
		{
			_yuitest_coverfunc("build/gallery-funcprog/gallery-funcprog.js", "(anonymous 2)", 246);
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 248);
if (f.call(c, v, i, a))
			{
				_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 250);
index = i;
				_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 251);
return true;
			}
		});

		_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 255);
return index;
	}
});

/**
 * Executes the supplied function on each item in the array, starting
 * from the end and folding the list into a single value.  The function
 * receives the value returned by the previous iteration (or the
 * initial value if this is the first iteration), the value being
 * iterated, the index, and the list itself as parameters (in that
 * order).  The function must return the updated value.
 *
 * @method reduceRight
 * @param init {Mixed} the initial value
 * @param f {String} the function to invoke
 * @param c {Object} optional context object
 * @return {Mixed} final result from iteratively applying the given function to each item in the array
 */
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 273);
Y.Array.reduceRight = Y.Lang._isNative(Array.prototype.reduceRight) ?
	function(a, init, f, c)
	{
		_yuitest_coverfunc("build/gallery-funcprog/gallery-funcprog.js", "(anonymous 3)", 274);
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 276);
return Array.prototype.reduceRight.call(a, function(init, item, i, a)
		{
			_yuitest_coverfunc("build/gallery-funcprog/gallery-funcprog.js", "(anonymous 4)", 276);
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 278);
return f.call(c, init, item, i, a);
		},
		init);
	}
	:
	function(a, init, f, c)
	{
		_yuitest_coverfunc("build/gallery-funcprog/gallery-funcprog.js", "}", 283);
_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 285);
var result = init;
		_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 286);
for (var i=a.length-1; i>=0; i--)
		{
			_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 288);
result = f.call(c, result, a[i], i, a);
		}

		_yuitest_coverline("build/gallery-funcprog/gallery-funcprog.js", 291);
return result;
	};


}, '@VERSION@', {"requires": ["oop", "array-extras", "gallery-object-extras"], "optional": ["gallery-nodelist-extras2"]});
