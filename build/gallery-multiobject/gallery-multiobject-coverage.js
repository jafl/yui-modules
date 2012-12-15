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
_yuitest_coverage["build/gallery-multiobject/gallery-multiobject.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-multiobject/gallery-multiobject.js",
    code: []
};
_yuitest_coverage["build/gallery-multiobject/gallery-multiobject.js"].code=["YUI.add('gallery-multiobject', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-multiobject"," */","","/**********************************************************************"," * <p>MultiObject exposes exactly the same API as each individual object,"," * both functions and events, and the state of all the objects is kept in"," * sync.  The objects must maintain all state via"," * Y.Attribute.<p>"," *"," * <p>MultiObject is similar to Y.ArrayList, except:</p>"," * <ul>"," * <li>All objects must be of the same type, since MultiObject is supposed"," *		to behave exactly like any single object.</li>"," * <li>MultiObject automatically delegates all methods.</li>"," * <li>By default, MultiObject returns the result from the first object"," *		in the list, not an array of results.</li>"," * <li>MultiObject propagates all events.</li>"," * </ul>"," *"," * <p>Internally, MultiObject delegates all methods by name, so it supports"," * Y.Do.before, Y.Do.after, etc.</p>"," *"," * <p>To avoid shadowing potential function names, we inherit from"," * Y.EventTarget and use multi_ as the prefix for our own functions.</p>"," * "," * @main gallery-multiobject"," * @class MultiObject"," * @extends EventTarget"," * @constructor"," * @param items {Array} initial set of items"," * @param config {Object} configuration"," * @param config.return_all_results=false {Boolean}"," * If this is true, then all delegated functions"," * will return an array of results instead of the result from the"," * primary item.  Note that functions which return `undefined` or"," * the item itself always cause the MultiObject to be returned,"," * to support chaining."," * @param config.primary_item_index=0 {Number}"," * When `return_all_results=false`, this is the index of"," * the item which generates the return result for all delegated"," * functions."," */","function MultiObject(","	/* array */		items,","	/* object */	config)","{","	this.items = Y.Array(items);","","	var item = this.items[0];","	for (var f in item)","	{","		if (Y.Lang.isFunction(item[f]) && !this[f])","		{","			this[f] = delegate.call(this, f);","		}","	}","","	this.args_adjuster = {};","","	config                  = config || {};","	this.primary_item_index = config.primary_item_index || 0;","	this.return_all_results = config.return_all_results;","","	Y.Array.each(this.items, installItem, this);","","	config.prefix = this.items[0].name;","	MultiObject.superclass.constructor.call(this, config);","}","","function delegate(","	/* string */	f)","{","	return function()","	{","		var args    = arguments;","		var results = [];","","		Y.Array.each(this.items, function(item, index)","		{","			var args1 = args;","			if (this.args_adjuster[f])","			{","				args1 = this.args_adjuster[f].call(item, index, Y.Array(args, 0, true));","			}","","			var result = item[f].apply(item, args1);","","			if (!Y.Lang.isUndefined(result) && result !== item)","			{","				results.push(result);","			}","		},","		this);","","		if (results.length === 0)","		{","			return this;	// chainable","		}","		else if (this.return_all_results)","		{","			return results;","		}","		else","		{","			return results[ this.primary_item_index ];","		}","	};","}","","function distributeValue(e, index, key)","{","	Y.Array.each(this.items, function(item, i)","	{","		if (i !== index)","		{","			item.set(key, e.newVal);","		}","	});","}","","function installItem(","	/* object */	item,","	/* int */		index)","{","	if (!item)","	{","		return;","	}","","	Y.Object.each(item.getAttrs(), function(value, key)","	{","		item.after(key+'Change', distributeValue, this, index, key);","	},","	this);","","	item.addTarget(this);","}","","function uninstallItem(","	/* object */	item,","	/* int */		index)","{","	if (!item)","	{","		return;","	}","","	Y.Object.each(item.getAttrs(), function(value, key)","	{","		item.detach(key+'Change', distributeValue, this);","	},","	this);","","	item.removeTarget(this);","}","","Y.extend(MultiObject, Y.EventTarget,","{","	/**","	 * Destroys the MultiObject, but not the individual objects.","	 * <code>destroy()</code> is, of course, delegated.","	 * ","	 * @method multi_destroy","	 */","	multi_destroy: function()","	{","		Y.Array.each(this.items, uninstallItem, this);","	},","","	/**","	 * @method multi_get_primary_item_index","	 * @return the index of the primary item","	 */","	multi_get_primary_item_index: function()","	{","		return this.primary_item_index;","	},","","	/**","	 * @method multi_set_primary_item_index","	 * @param index {int} the index of the primary item","	 */","	multi_set_primary_item_index: function(","		/* int */	index)","	{","		this.primary_item_index = index;","	},","","	/**","	 * @method multi_get_return_all_results","	 * @return true if all results will be returned by delegated functions","	 */","	multi_get_return_all_results: function()","	{","		return this.return_all_results;","	},","","	/**","	 * @method multi_set_return_all_results","	 * @param all {boolean} true if delegated functions should return all results","	 */","	multi_set_return_all_results: function(","		/* bool */	all)","	{","		this.return_all_results = all;","	},","","	/**","	 * Return an array of all the individual results from calling the","	 * specified function.  This is only useful if return_all_results=false.","	 *","	 * @method multi_get_all","	 * @param f {String} name of the function to invoke","	 * @param arg* {mixed} 0..n arguments to pass to the function","	 * @return {Array} results from delegating the named function","	 */","	multi_get_all: function(","		/* string */ f)","	{","		var args = Y.Array(arguments, 0, true);","		args.shift();","","		var all = this.return_all_results;","		this.return_all_results = true;","		var results = this[f].apply(this, args);","		this.return_all_results = all;","","		return results;","	}","","//	push, pop, shift, unshift, add, remove (index or object), splice","//	item, indexOf, size","});","","Y.MultiObject = MultiObject;","","","}, '@VERSION@', {\"requires\": [\"event-custom\"]});"];
_yuitest_coverage["build/gallery-multiobject/gallery-multiobject.js"].lines = {"1":0,"3":0,"48":0,"52":0,"54":0,"55":0,"57":0,"59":0,"63":0,"65":0,"66":0,"67":0,"69":0,"71":0,"72":0,"75":0,"78":0,"80":0,"81":0,"83":0,"85":0,"86":0,"88":0,"91":0,"93":0,"95":0,"100":0,"102":0,"104":0,"106":0,"110":0,"115":0,"117":0,"119":0,"121":0,"126":0,"130":0,"132":0,"135":0,"137":0,"141":0,"144":0,"148":0,"150":0,"153":0,"155":0,"159":0,"162":0,"172":0,"181":0,"191":0,"200":0,"210":0,"225":0,"226":0,"228":0,"229":0,"230":0,"231":0,"233":0,"240":0};
_yuitest_coverage["build/gallery-multiobject/gallery-multiobject.js"].functions = {"MultiObject:48":0,"(anonymous 3):83":0,"(anonymous 2):78":0,"delegate:75":0,"(anonymous 4):117":0,"distributeValue:115":0,"(anonymous 5):135":0,"installItem:126":0,"(anonymous 6):153":0,"uninstallItem:144":0,"multi_destroy:170":0,"multi_get_primary_item_index:179":0,"multi_set_primary_item_index:188":0,"multi_get_return_all_results:198":0,"multi_set_return_all_results:207":0,"multi_get_all:222":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-multiobject/gallery-multiobject.js"].coveredLines = 61;
_yuitest_coverage["build/gallery-multiobject/gallery-multiobject.js"].coveredFunctions = 17;
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 1);
YUI.add('gallery-multiobject', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 3);
"use strict";

/**
 * @module gallery-multiobject
 */

/**********************************************************************
 * <p>MultiObject exposes exactly the same API as each individual object,
 * both functions and events, and the state of all the objects is kept in
 * sync.  The objects must maintain all state via
 * Y.Attribute.<p>
 *
 * <p>MultiObject is similar to Y.ArrayList, except:</p>
 * <ul>
 * <li>All objects must be of the same type, since MultiObject is supposed
 *		to behave exactly like any single object.</li>
 * <li>MultiObject automatically delegates all methods.</li>
 * <li>By default, MultiObject returns the result from the first object
 *		in the list, not an array of results.</li>
 * <li>MultiObject propagates all events.</li>
 * </ul>
 *
 * <p>Internally, MultiObject delegates all methods by name, so it supports
 * Y.Do.before, Y.Do.after, etc.</p>
 *
 * <p>To avoid shadowing potential function names, we inherit from
 * Y.EventTarget and use multi_ as the prefix for our own functions.</p>
 * 
 * @main gallery-multiobject
 * @class MultiObject
 * @extends EventTarget
 * @constructor
 * @param items {Array} initial set of items
 * @param config {Object} configuration
 * @param config.return_all_results=false {Boolean}
 * If this is true, then all delegated functions
 * will return an array of results instead of the result from the
 * primary item.  Note that functions which return `undefined` or
 * the item itself always cause the MultiObject to be returned,
 * to support chaining.
 * @param config.primary_item_index=0 {Number}
 * When `return_all_results=false`, this is the index of
 * the item which generates the return result for all delegated
 * functions.
 */
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 48);
function MultiObject(
	/* array */		items,
	/* object */	config)
{
	_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "MultiObject", 48);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 52);
this.items = Y.Array(items);

	_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 54);
var item = this.items[0];
	_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 55);
for (var f in item)
	{
		_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 57);
if (Y.Lang.isFunction(item[f]) && !this[f])
		{
			_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 59);
this[f] = delegate.call(this, f);
		}
	}

	_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 63);
this.args_adjuster = {};

	_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 65);
config                  = config || {};
	_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 66);
this.primary_item_index = config.primary_item_index || 0;
	_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 67);
this.return_all_results = config.return_all_results;

	_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 69);
Y.Array.each(this.items, installItem, this);

	_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 71);
config.prefix = this.items[0].name;
	_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 72);
MultiObject.superclass.constructor.call(this, config);
}

_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 75);
function delegate(
	/* string */	f)
{
	_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "delegate", 75);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 78);
return function()
	{
		_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "(anonymous 2)", 78);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 80);
var args    = arguments;
		_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 81);
var results = [];

		_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 83);
Y.Array.each(this.items, function(item, index)
		{
			_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "(anonymous 3)", 83);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 85);
var args1 = args;
			_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 86);
if (this.args_adjuster[f])
			{
				_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 88);
args1 = this.args_adjuster[f].call(item, index, Y.Array(args, 0, true));
			}

			_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 91);
var result = item[f].apply(item, args1);

			_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 93);
if (!Y.Lang.isUndefined(result) && result !== item)
			{
				_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 95);
results.push(result);
			}
		},
		this);

		_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 100);
if (results.length === 0)
		{
			_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 102);
return this;	// chainable
		}
		else {_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 104);
if (this.return_all_results)
		{
			_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 106);
return results;
		}
		else
		{
			_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 110);
return results[ this.primary_item_index ];
		}}
	};
}

_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 115);
function distributeValue(e, index, key)
{
	_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "distributeValue", 115);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 117);
Y.Array.each(this.items, function(item, i)
	{
		_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "(anonymous 4)", 117);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 119);
if (i !== index)
		{
			_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 121);
item.set(key, e.newVal);
		}
	});
}

_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 126);
function installItem(
	/* object */	item,
	/* int */		index)
{
	_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "installItem", 126);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 130);
if (!item)
	{
		_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 132);
return;
	}

	_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 135);
Y.Object.each(item.getAttrs(), function(value, key)
	{
		_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "(anonymous 5)", 135);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 137);
item.after(key+'Change', distributeValue, this, index, key);
	},
	this);

	_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 141);
item.addTarget(this);
}

_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 144);
function uninstallItem(
	/* object */	item,
	/* int */		index)
{
	_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "uninstallItem", 144);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 148);
if (!item)
	{
		_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 150);
return;
	}

	_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 153);
Y.Object.each(item.getAttrs(), function(value, key)
	{
		_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "(anonymous 6)", 153);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 155);
item.detach(key+'Change', distributeValue, this);
	},
	this);

	_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 159);
item.removeTarget(this);
}

_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 162);
Y.extend(MultiObject, Y.EventTarget,
{
	/**
	 * Destroys the MultiObject, but not the individual objects.
	 * <code>destroy()</code> is, of course, delegated.
	 * 
	 * @method multi_destroy
	 */
	multi_destroy: function()
	{
		_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "multi_destroy", 170);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 172);
Y.Array.each(this.items, uninstallItem, this);
	},

	/**
	 * @method multi_get_primary_item_index
	 * @return the index of the primary item
	 */
	multi_get_primary_item_index: function()
	{
		_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "multi_get_primary_item_index", 179);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 181);
return this.primary_item_index;
	},

	/**
	 * @method multi_set_primary_item_index
	 * @param index {int} the index of the primary item
	 */
	multi_set_primary_item_index: function(
		/* int */	index)
	{
		_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "multi_set_primary_item_index", 188);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 191);
this.primary_item_index = index;
	},

	/**
	 * @method multi_get_return_all_results
	 * @return true if all results will be returned by delegated functions
	 */
	multi_get_return_all_results: function()
	{
		_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "multi_get_return_all_results", 198);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 200);
return this.return_all_results;
	},

	/**
	 * @method multi_set_return_all_results
	 * @param all {boolean} true if delegated functions should return all results
	 */
	multi_set_return_all_results: function(
		/* bool */	all)
	{
		_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "multi_set_return_all_results", 207);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 210);
this.return_all_results = all;
	},

	/**
	 * Return an array of all the individual results from calling the
	 * specified function.  This is only useful if return_all_results=false.
	 *
	 * @method multi_get_all
	 * @param f {String} name of the function to invoke
	 * @param arg* {mixed} 0..n arguments to pass to the function
	 * @return {Array} results from delegating the named function
	 */
	multi_get_all: function(
		/* string */ f)
	{
		_yuitest_coverfunc("build/gallery-multiobject/gallery-multiobject.js", "multi_get_all", 222);
_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 225);
var args = Y.Array(arguments, 0, true);
		_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 226);
args.shift();

		_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 228);
var all = this.return_all_results;
		_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 229);
this.return_all_results = true;
		_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 230);
var results = this[f].apply(this, args);
		_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 231);
this.return_all_results = all;

		_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 233);
return results;
	}

//	push, pop, shift, unshift, add, remove (index or object), splice
//	item, indexOf, size
});

_yuitest_coverline("build/gallery-multiobject/gallery-multiobject.js", 240);
Y.MultiObject = MultiObject;


}, '@VERSION@', {"requires": ["event-custom"]});
