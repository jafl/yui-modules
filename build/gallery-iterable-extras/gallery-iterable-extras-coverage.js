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
_yuitest_coverage["build/gallery-iterable-extras/gallery-iterable-extras.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-iterable-extras/gallery-iterable-extras.js",
    code: []
};
_yuitest_coverage["build/gallery-iterable-extras/gallery-iterable-extras.js"].code=["YUI.add('gallery-iterable-extras', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-iterable-extras"," */","","/**********************************************************************"," * <p>Functional programming support for iterable classes.  The class must"," * implement the `iterator` and `newInstance` methods.</p>"," * "," * <p>For most methods, the iterator only needs to implement `next` and"," * `atEnd`.  Backwards iterators like `reduceRight` require `prev` and"," * `atBeginning`.</p>"," * "," * <p>Iterable classes must mix these functions:  `Y.mix(SomeClass,"," * Y.Iterable, false, null, 4);`  Passing false as the third argument"," * allows your class to provide optimized implementations of individual"," * functions.</p>"," * "," * @main gallery-iterable-extras"," * @class Iterable"," */","","Y.Iterable =","{","	/**","	 * Executes the supplied function on each item in the list.  The","	 * function receives the value, the index, and the list itself as","	 * parameters (in that order).","	 *","	 * @method each","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 */","	each: function(f, c)","	{","		var iter = this.iterator(), i = 0;","		while (!iter.atEnd())","		{","			f.call(c, iter.next(), i, this);","			i++;","		}","	},","","	/**","	 * Executes the supplied function on each item in the list.  Iteration","	 * stops if the supplied function does not return a truthy value.  The","	 * function receives the value, the index, and the list itself as","	 * parameters (in that order).","	 *","	 * @method every","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @return {Boolean} true if every item in the array returns true from the supplied function, false otherwise","	 */","	every: function(f, c)","	{","		var iter = this.iterator(), i = 0;","		while (!iter.atEnd())","		{","			if (!f.call(c, iter.next(), i, this))","			{","				return false;","			}","			i++;","		}","","		return true;","	},","","	/**","	 * Executes the supplied function on each item in the list.  Returns a","	 * new list containing the items for which the supplied function","	 * returned a truthy value.  The function receives the value, the","	 * index, and the object itself as parameters (in that order).","	 *","	 * @method filter","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @return {Object} list of items for which the supplied function returned a truthy value (empty if it never returned a truthy value)","	 */","	filter: function(f, c)","	{","		var result = this.newInstance();","","		var iter = this.iterator(), i = 0;","		while (!iter.atEnd())","		{","			var item = iter.next();","			if (f.call(c, item, i, this))","			{","				result.append(item);","			}","			i++;","		}","","		return result;","	},","","	/**","	 * Executes the supplied function on each item in the list, searching","	 * for the first item that matches the supplied function.  The function","	 * receives the value, the index, and the object itself as parameters","	 * (in that order).","	 *","	 * @method find","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @return {Mixed} the first item for which the supplied function returns true, or null if it never returns true","	 */","	find: function(f, c)","	{","		var iter = this.iterator(), i = 0;","		while (!iter.atEnd())","		{","			var item = iter.next();","			if (f.call(c, item, i, this))","			{","				return item;","			}","			i++;","		}","","		return null;","	},","","	/**","	 * Executes the supplied function on each item in the list and returns","	 * a new list with the results.  The function receives the value, the","	 * index, and the object itself as parameters (in that order).","	 *","	 * @method map","	 * @param f {String} the function to invoke","	 * @param c {Object} optional context object","	 * @return {Object} list of all return values","	 */","	map: function(f, c)","	{","		var result = this.newInstance();","","		var iter = this.iterator(), i = 0;","		while (!iter.atEnd())","		{","			result.append(f.call(c, iter.next(), i, this));","			i++;","		}","","		return result;","	},","","	/**","	 * Partitions an list into two new list, one with the items for which","	 * the supplied function returns true, and one with the items for which","	 * the function returns false.  The function receives the value, the","	 * index, and the object itself as parameters (in that order).","	 *","	 * @method partition","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @return {Object} object with two properties: matches and rejects. Each is a list containing the items that were selected or rejected by the test function (or an empty object if none).","	 */","	partition: function(f, c)","	{","		var result =","		{","			matches: this.newInstance(),","			rejects: this.newInstance()","		};","","		var iter = this.iterator(), i = 0;","		while (!iter.atEnd())","		{","			var item = iter.next();","			result[ f.call(c, item, i, this) ? 'matches' : 'rejects' ].append(item);","			i++;","		}","","		return result;","	},","","	/**","	 * Executes the supplied function on each item in the list, folding the","	 * list into a single value.  The function receives the value returned","	 * by the previous iteration (or the initial value if this is the first","	 * iteration), the value being iterated, the index, and the list itself","	 * as parameters (in that order).  The function must return the updated","	 * value.","	 *","	 * @method reduce","	 * @param init {Mixed} the initial value","	 * @param f {String} the function to invoke","	 * @param c {Object} optional context object","	 * @return {Mixed} final result from iteratively applying the given function to each item in the list","	 */","	reduce: function(init, f, c)","	{","		var result = init;","","		var iter = this.iterator(), i = 0;","		while (!iter.atEnd())","		{","			result = f.call(c, result, iter.next(), i, this);","			i++;","		}","","		return result;","	},","","	/**","	 * Executes the supplied function on each item in the list, starting","	 * from the end and folding the list into a single value.  The function","	 * receives the value returned by the previous iteration (or the","	 * initial value if this is the first iteration), the value being","	 * iterated, the index, and the list itself as parameters (in that","	 * order).  The function must return the updated value.","	 *","	 * @method reduceRight","	 * @param init {Mixed} the initial value","	 * @param f {String} the function to invoke","	 * @param c {Object} optional context object","	 * @return {Mixed} final result from iteratively applying the given function to each item in the list","	 */","	reduceRight: function(init, f, c)","	{","		var result = init;","","		var iter = this.iterator(), i = 0;","		while (!iter.atEnd())","		{","			iter.next();","			i++;","		}","","		while (!iter.atBeginning())","		{","			i--;","			result = f.call(c, result, iter.prev(), i, this);","		}","","		return result;","	},","","	/**","	 * Executes the supplied function on each item in the list.  Returns a","	 * new list containing the items for which the supplied function","	 * returned a falsey value.  The function receives the value, the","	 * index, and the object itself as parameters (in that order).","	 *","	 * @method reject","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @return {Object} array or object of items for which the supplied function returned a falsey value (empty if it never returned a falsey value)","	 */","	reject: function(f, c)","	{","		var result = this.newInstance();","","		var iter = this.iterator(), i = 0;","		while (!iter.atEnd())","		{","			var item = iter.next();","			if (!f.call(c, item, i, this))","			{","				result.append(item);","			}","			i++;","		}","","		return result;","	},","","	/**","	 * Executes the supplied function on each item in the list.  Iteration","	 * stops if the supplied function returns a truthy value.  The function","	 * receives the value, the index, and the list itself as parameters","	 * (in that order).","	 *","	 * @method some","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @return {Boolean} true if the function returns a truthy value on any of the items in the array, false otherwise","	 */","	some: function(f, c)","	{","		var iter = this.iterator(), i = 0;","		while (!iter.atEnd())","		{","			if (f.call(c, iter.next(), i, this))","			{","				return true;","			}","			i++;","		}","","		return false;","	}","};","/**"," * @module gallery-iterable-extras"," */","","/**********************************************************************"," * Iterator for an array.  Useful for any class that manages an array and"," * wants to mix in `Y.Iterable`.  Safe, but not stable, when the array is"," * modified during iteration."," *"," * @class ArrayIterator"," * @method constructor"," * @param list {Array}"," */","","function ArrayIterator(","	/* array */    list)","{","	this._list = list;","	this.moveToBeginning();","}","","ArrayIterator.prototype =","{","	/**","	 * @method atBeginning","	 * @return {Boolean} true if at the beginning","	 */","	atBeginning: function()","	{","		return (this._next <= 0);","	},","","	/**","	 * @method atEnd","	 * @return {Boolean} true if at the end","	 */","	atEnd: function()","	{","		return (this._next >= this._list.length);","	},","","	/**","	 * Move to the beginning of the list.","	 * ","	 * @method moveToBeginning","	 */","	moveToBeginning: function()","	{","		this._next = 0;","	},","","	/**","	 * Move to the end of the list.","	 * ","	 * @method moveToEnd","	 */","	moveToEnd: function()","	{","		this._next = this._list.length;","	},","","	/**","	 * @method next","	 * @return {Mixed} next value in the list or undefined if at the end","	 */","	next: function()","	{","		if (this._next < this._list.length)","		{","			return this._list[ this._next++ ];","		}","	},","","	/**","	 * @method prev","	 * @return {Mixed} previous value in the list or undefined if at the beginning","	 */","	prev: function()","	{","		if (this._next > 0)","		{","			return this._list[ --this._next ];","		}","	}","};","","Y.ArrayIterator = ArrayIterator;","","","}, '@VERSION@', {\"requires\": [\"\"], \"optional\": [\"gallery-funcprog\"]});"];
_yuitest_coverage["build/gallery-iterable-extras/gallery-iterable-extras.js"].lines = {"1":0,"3":0,"26":0,"39":0,"40":0,"42":0,"43":0,"60":0,"61":0,"63":0,"65":0,"67":0,"70":0,"86":0,"88":0,"89":0,"91":0,"92":0,"94":0,"96":0,"99":0,"115":0,"116":0,"118":0,"119":0,"121":0,"123":0,"126":0,"141":0,"143":0,"144":0,"146":0,"147":0,"150":0,"166":0,"172":0,"173":0,"175":0,"176":0,"177":0,"180":0,"199":0,"201":0,"202":0,"204":0,"205":0,"208":0,"227":0,"229":0,"230":0,"232":0,"233":0,"236":0,"238":0,"239":0,"242":0,"258":0,"260":0,"261":0,"263":0,"264":0,"266":0,"268":0,"271":0,"287":0,"288":0,"290":0,"292":0,"294":0,"297":0,"314":0,"317":0,"318":0,"321":0,"329":0,"338":0,"348":0,"358":0,"367":0,"369":0,"379":0,"381":0,"386":0};
_yuitest_coverage["build/gallery-iterable-extras/gallery-iterable-extras.js"].functions = {"each:37":0,"every:58":0,"filter:84":0,"find:113":0,"map:139":0,"partition:164":0,"reduce:197":0,"reduceRight:225":0,"reject:256":0,"some:285":0,"ArrayIterator:314":0,"atBeginning:327":0,"atEnd:336":0,"moveToBeginning:346":0,"moveToEnd:356":0,"next:365":0,"prev:377":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-iterable-extras/gallery-iterable-extras.js"].coveredLines = 83;
_yuitest_coverage["build/gallery-iterable-extras/gallery-iterable-extras.js"].coveredFunctions = 18;
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 1);
YUI.add('gallery-iterable-extras', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 3);
"use strict";

/**
 * @module gallery-iterable-extras
 */

/**********************************************************************
 * <p>Functional programming support for iterable classes.  The class must
 * implement the `iterator` and `newInstance` methods.</p>
 * 
 * <p>For most methods, the iterator only needs to implement `next` and
 * `atEnd`.  Backwards iterators like `reduceRight` require `prev` and
 * `atBeginning`.</p>
 * 
 * <p>Iterable classes must mix these functions:  `Y.mix(SomeClass,
 * Y.Iterable, false, null, 4);`  Passing false as the third argument
 * allows your class to provide optimized implementations of individual
 * functions.</p>
 * 
 * @main gallery-iterable-extras
 * @class Iterable
 */

_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 26);
Y.Iterable =
{
	/**
	 * Executes the supplied function on each item in the list.  The
	 * function receives the value, the index, and the list itself as
	 * parameters (in that order).
	 *
	 * @method each
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 */
	each: function(f, c)
	{
		_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "each", 37);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 39);
var iter = this.iterator(), i = 0;
		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 40);
while (!iter.atEnd())
		{
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 42);
f.call(c, iter.next(), i, this);
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 43);
i++;
		}
	},

	/**
	 * Executes the supplied function on each item in the list.  Iteration
	 * stops if the supplied function does not return a truthy value.  The
	 * function receives the value, the index, and the list itself as
	 * parameters (in that order).
	 *
	 * @method every
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @return {Boolean} true if every item in the array returns true from the supplied function, false otherwise
	 */
	every: function(f, c)
	{
		_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "every", 58);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 60);
var iter = this.iterator(), i = 0;
		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 61);
while (!iter.atEnd())
		{
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 63);
if (!f.call(c, iter.next(), i, this))
			{
				_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 65);
return false;
			}
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 67);
i++;
		}

		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 70);
return true;
	},

	/**
	 * Executes the supplied function on each item in the list.  Returns a
	 * new list containing the items for which the supplied function
	 * returned a truthy value.  The function receives the value, the
	 * index, and the object itself as parameters (in that order).
	 *
	 * @method filter
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @return {Object} list of items for which the supplied function returned a truthy value (empty if it never returned a truthy value)
	 */
	filter: function(f, c)
	{
		_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "filter", 84);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 86);
var result = this.newInstance();

		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 88);
var iter = this.iterator(), i = 0;
		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 89);
while (!iter.atEnd())
		{
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 91);
var item = iter.next();
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 92);
if (f.call(c, item, i, this))
			{
				_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 94);
result.append(item);
			}
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 96);
i++;
		}

		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 99);
return result;
	},

	/**
	 * Executes the supplied function on each item in the list, searching
	 * for the first item that matches the supplied function.  The function
	 * receives the value, the index, and the object itself as parameters
	 * (in that order).
	 *
	 * @method find
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @return {Mixed} the first item for which the supplied function returns true, or null if it never returns true
	 */
	find: function(f, c)
	{
		_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "find", 113);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 115);
var iter = this.iterator(), i = 0;
		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 116);
while (!iter.atEnd())
		{
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 118);
var item = iter.next();
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 119);
if (f.call(c, item, i, this))
			{
				_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 121);
return item;
			}
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 123);
i++;
		}

		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 126);
return null;
	},

	/**
	 * Executes the supplied function on each item in the list and returns
	 * a new list with the results.  The function receives the value, the
	 * index, and the object itself as parameters (in that order).
	 *
	 * @method map
	 * @param f {String} the function to invoke
	 * @param c {Object} optional context object
	 * @return {Object} list of all return values
	 */
	map: function(f, c)
	{
		_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "map", 139);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 141);
var result = this.newInstance();

		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 143);
var iter = this.iterator(), i = 0;
		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 144);
while (!iter.atEnd())
		{
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 146);
result.append(f.call(c, iter.next(), i, this));
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 147);
i++;
		}

		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 150);
return result;
	},

	/**
	 * Partitions an list into two new list, one with the items for which
	 * the supplied function returns true, and one with the items for which
	 * the function returns false.  The function receives the value, the
	 * index, and the object itself as parameters (in that order).
	 *
	 * @method partition
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @return {Object} object with two properties: matches and rejects. Each is a list containing the items that were selected or rejected by the test function (or an empty object if none).
	 */
	partition: function(f, c)
	{
		_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "partition", 164);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 166);
var result =
		{
			matches: this.newInstance(),
			rejects: this.newInstance()
		};

		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 172);
var iter = this.iterator(), i = 0;
		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 173);
while (!iter.atEnd())
		{
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 175);
var item = iter.next();
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 176);
result[ f.call(c, item, i, this) ? 'matches' : 'rejects' ].append(item);
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 177);
i++;
		}

		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 180);
return result;
	},

	/**
	 * Executes the supplied function on each item in the list, folding the
	 * list into a single value.  The function receives the value returned
	 * by the previous iteration (or the initial value if this is the first
	 * iteration), the value being iterated, the index, and the list itself
	 * as parameters (in that order).  The function must return the updated
	 * value.
	 *
	 * @method reduce
	 * @param init {Mixed} the initial value
	 * @param f {String} the function to invoke
	 * @param c {Object} optional context object
	 * @return {Mixed} final result from iteratively applying the given function to each item in the list
	 */
	reduce: function(init, f, c)
	{
		_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "reduce", 197);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 199);
var result = init;

		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 201);
var iter = this.iterator(), i = 0;
		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 202);
while (!iter.atEnd())
		{
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 204);
result = f.call(c, result, iter.next(), i, this);
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 205);
i++;
		}

		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 208);
return result;
	},

	/**
	 * Executes the supplied function on each item in the list, starting
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
	 * @return {Mixed} final result from iteratively applying the given function to each item in the list
	 */
	reduceRight: function(init, f, c)
	{
		_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "reduceRight", 225);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 227);
var result = init;

		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 229);
var iter = this.iterator(), i = 0;
		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 230);
while (!iter.atEnd())
		{
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 232);
iter.next();
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 233);
i++;
		}

		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 236);
while (!iter.atBeginning())
		{
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 238);
i--;
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 239);
result = f.call(c, result, iter.prev(), i, this);
		}

		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 242);
return result;
	},

	/**
	 * Executes the supplied function on each item in the list.  Returns a
	 * new list containing the items for which the supplied function
	 * returned a falsey value.  The function receives the value, the
	 * index, and the object itself as parameters (in that order).
	 *
	 * @method reject
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @return {Object} array or object of items for which the supplied function returned a falsey value (empty if it never returned a falsey value)
	 */
	reject: function(f, c)
	{
		_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "reject", 256);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 258);
var result = this.newInstance();

		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 260);
var iter = this.iterator(), i = 0;
		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 261);
while (!iter.atEnd())
		{
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 263);
var item = iter.next();
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 264);
if (!f.call(c, item, i, this))
			{
				_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 266);
result.append(item);
			}
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 268);
i++;
		}

		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 271);
return result;
	},

	/**
	 * Executes the supplied function on each item in the list.  Iteration
	 * stops if the supplied function returns a truthy value.  The function
	 * receives the value, the index, and the list itself as parameters
	 * (in that order).
	 *
	 * @method some
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @return {Boolean} true if the function returns a truthy value on any of the items in the array, false otherwise
	 */
	some: function(f, c)
	{
		_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "some", 285);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 287);
var iter = this.iterator(), i = 0;
		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 288);
while (!iter.atEnd())
		{
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 290);
if (f.call(c, iter.next(), i, this))
			{
				_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 292);
return true;
			}
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 294);
i++;
		}

		_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 297);
return false;
	}
};
/**
 * @module gallery-iterable-extras
 */

/**********************************************************************
 * Iterator for an array.  Useful for any class that manages an array and
 * wants to mix in `Y.Iterable`.  Safe, but not stable, when the array is
 * modified during iteration.
 *
 * @class ArrayIterator
 * @method constructor
 * @param list {Array}
 */

_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 314);
function ArrayIterator(
	/* array */    list)
{
	_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "ArrayIterator", 314);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 317);
this._list = list;
	_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 318);
this.moveToBeginning();
}

_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 321);
ArrayIterator.prototype =
{
	/**
	 * @method atBeginning
	 * @return {Boolean} true if at the beginning
	 */
	atBeginning: function()
	{
		_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "atBeginning", 327);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 329);
return (this._next <= 0);
	},

	/**
	 * @method atEnd
	 * @return {Boolean} true if at the end
	 */
	atEnd: function()
	{
		_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "atEnd", 336);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 338);
return (this._next >= this._list.length);
	},

	/**
	 * Move to the beginning of the list.
	 * 
	 * @method moveToBeginning
	 */
	moveToBeginning: function()
	{
		_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "moveToBeginning", 346);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 348);
this._next = 0;
	},

	/**
	 * Move to the end of the list.
	 * 
	 * @method moveToEnd
	 */
	moveToEnd: function()
	{
		_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "moveToEnd", 356);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 358);
this._next = this._list.length;
	},

	/**
	 * @method next
	 * @return {Mixed} next value in the list or undefined if at the end
	 */
	next: function()
	{
		_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "next", 365);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 367);
if (this._next < this._list.length)
		{
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 369);
return this._list[ this._next++ ];
		}
	},

	/**
	 * @method prev
	 * @return {Mixed} previous value in the list or undefined if at the beginning
	 */
	prev: function()
	{
		_yuitest_coverfunc("build/gallery-iterable-extras/gallery-iterable-extras.js", "prev", 377);
_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 379);
if (this._next > 0)
		{
			_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 381);
return this._list[ --this._next ];
		}
	}
};

_yuitest_coverline("build/gallery-iterable-extras/gallery-iterable-extras.js", 386);
Y.ArrayIterator = ArrayIterator;


}, '@VERSION@', {"requires": [""], "optional": ["gallery-funcprog"]});
