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
_yuitest_coverage["build/gallery-instancemanager/gallery-instancemanager.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-instancemanager/gallery-instancemanager.js",
    code: []
};
_yuitest_coverage["build/gallery-instancemanager/gallery-instancemanager.js"].code=["YUI.add('gallery-instancemanager', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-instancemanager"," */","","/**********************************************************************"," * <p>Stores instances of JavaScript components.  Allows a constructor or"," * factory method to be passed in place of an instance.  This enables lazy"," * construction on demand.</p>"," * "," * <p>One use is to create a global repository of JavaScript components"," * attached to DOM id's, e.g., YUI Buttons built on top of HTML"," * buttons.</p>"," * "," * @main gallery-instancemanager"," * @class InstanceManager"," * @constructor"," */","function InstanceManager()","{","	this._map          = { };","	this._constructors = { };","}","","InstanceManager.prototype =","{","	/**","	 * Retrieve an object.","	 * ","	 * @method get","	 * @param id {String} the id of the object to retrieve","	 * @return {Mixed} the stored object, or false if the slot is empty","	 */","	get: function(","		/* string */	id)","	{","		if (this._map[ id ] === null && this._constructors[ id ])","		{","			var c           = this._constructors[ id ];","			var instance    = c.fn.prototype ? Y.Object(c.fn.prototype) : null;","			var obj         = c.fn.apply(instance, c.args);","			this._map[ id ] = Y.Lang.isUndefined(obj) ? instance : obj;","		}","","		return this._map[ id ] || false;","	},","","	/**","	 * Retrieve an object only if it has already been constructed.","	 * ","	 * @method getIfConstructed","	 * @param id {String} the id of the object to retrieve","	 * @return {Mixed} the stored object, or false if the slot is empty","	 */","	getIfConstructed: function(","		/* string */	id)","	{","		return this._map[ id ] || false;","	},","","	/**","	 * Store an object or ctor+args.","	 * ","	 * @method put","	 * @param id {String} the id of the object","	 * @param objOrCtor {Object|Function} the object or the object's constructor or a factory method","	 * @param args {Array} the array of arguments to pass to the constructor","	 * @return {Boolean} false if the id has already been used","	 */","	put: function(","		/* string */	id,","		/* obj/fn */	objOrCtor,","		/* array */		args)","	{","		if (this._map[ id ])","		{","			return false;","		}","		else if (Y.Lang.isFunction(objOrCtor))","		{","			this._constructors[ id ] =","			{","				fn:   objOrCtor,","				args: Y.Lang.isArray(args) ? args : [args]","			};","","			this._map[ id ] = null;","			return true;","		}","		else","		{","			this._map[ id ] = objOrCtor;","			return true;","		}","	},","","	/**","	 * Remove an object.","	 * ","	 * @method remove","	 * @param id {String} the id of the object","	 * @return {mixed} the object that was removed, or false if the slot was empty","	 */","	remove: function(","		/* string */	id)","	{","		if (this._map[ id ])","		{","			var obj = this._map[ id ];","			delete this._map[ id ];","			return obj;","		}","		else","		{","			return false;","		}","	},","","	/**","	 * Remove all objects.","	 * ","	 * @method clear","	 */","	clear: function()","	{","		this._map = {};","	},","","	/**","	 * Returns list of all stored keys.","	 * ","	 * @method keys","	 */","	keys: function()","	{","		return Y.Object.keys(this._map);","	},","","	/**","	 * Call a function on every object.","	 * ","	 * @method applyToAll","	 * @param behavior {Function|String|Object} the function to call or the name of the function or an object {fn:,scope:}","	 * @param arguments {Array} the arguments to pass to the function","	 * @param skip_unconstructed {boolean} Optional.  Pass <code>true</code> to skip unconstructed slots.","	 */","	applyToAll: function(","		/* string/fn/object */	behavior,","		/* array */				args,","		/* bool */				skip_unconstructed)","	{","		var map        = this._map,","			isFunction = Y.Lang.isFunction(behavior),","			isObject   = Y.Lang.isObject(behavior);","","		Y.Object.each(map, function(item, name)","		{","			if (!item && skip_unconstructed)","			{","				return;","			}","			else if (!item)","			{","				item = this.get(name);","			}","","			if (isFunction || isObject)","			{","				// apply the function and pass the map item as an argument","","				var fn    = isFunction ? behavior : behavior.fn,","					scope = isFunction ? window : behavior.scope;","","				fn.apply(scope, [ { key:name, value:item } ].concat( args ) );","			}","			else if (item && Y.Lang.isFunction(item[ behavior ]))","			{","				// the string is the name of a method","","				item[ behavior ].apply(item, args);","			}","		},","		this);","	}","};","","Y.InstanceManager = InstanceManager;","","","}, '@VERSION@');"];
_yuitest_coverage["build/gallery-instancemanager/gallery-instancemanager.js"].lines = {"1":0,"3":0,"22":0,"24":0,"25":0,"28":0,"40":0,"42":0,"43":0,"44":0,"45":0,"48":0,"61":0,"78":0,"80":0,"82":0,"84":0,"90":0,"91":0,"95":0,"96":0,"110":0,"112":0,"113":0,"114":0,"118":0,"129":0,"139":0,"155":0,"159":0,"161":0,"163":0,"165":0,"167":0,"170":0,"174":0,"177":0,"179":0,"183":0,"190":0};
_yuitest_coverage["build/gallery-instancemanager/gallery-instancemanager.js"].functions = {"InstanceManager:22":0,"get:37":0,"getIfConstructed:58":0,"put:73":0,"remove:107":0,"clear:127":0,"keys:137":0,"(anonymous 2):159":0,"applyToAll:150":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-instancemanager/gallery-instancemanager.js"].coveredLines = 40;
_yuitest_coverage["build/gallery-instancemanager/gallery-instancemanager.js"].coveredFunctions = 10;
_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 1);
YUI.add('gallery-instancemanager', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-instancemanager/gallery-instancemanager.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 3);
"use strict";

/**
 * @module gallery-instancemanager
 */

/**********************************************************************
 * <p>Stores instances of JavaScript components.  Allows a constructor or
 * factory method to be passed in place of an instance.  This enables lazy
 * construction on demand.</p>
 * 
 * <p>One use is to create a global repository of JavaScript components
 * attached to DOM id's, e.g., YUI Buttons built on top of HTML
 * buttons.</p>
 * 
 * @main gallery-instancemanager
 * @class InstanceManager
 * @constructor
 */
_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 22);
function InstanceManager()
{
	_yuitest_coverfunc("build/gallery-instancemanager/gallery-instancemanager.js", "InstanceManager", 22);
_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 24);
this._map          = { };
	_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 25);
this._constructors = { };
}

_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 28);
InstanceManager.prototype =
{
	/**
	 * Retrieve an object.
	 * 
	 * @method get
	 * @param id {String} the id of the object to retrieve
	 * @return {Mixed} the stored object, or false if the slot is empty
	 */
	get: function(
		/* string */	id)
	{
		_yuitest_coverfunc("build/gallery-instancemanager/gallery-instancemanager.js", "get", 37);
_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 40);
if (this._map[ id ] === null && this._constructors[ id ])
		{
			_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 42);
var c           = this._constructors[ id ];
			_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 43);
var instance    = c.fn.prototype ? Y.Object(c.fn.prototype) : null;
			_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 44);
var obj         = c.fn.apply(instance, c.args);
			_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 45);
this._map[ id ] = Y.Lang.isUndefined(obj) ? instance : obj;
		}

		_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 48);
return this._map[ id ] || false;
	},

	/**
	 * Retrieve an object only if it has already been constructed.
	 * 
	 * @method getIfConstructed
	 * @param id {String} the id of the object to retrieve
	 * @return {Mixed} the stored object, or false if the slot is empty
	 */
	getIfConstructed: function(
		/* string */	id)
	{
		_yuitest_coverfunc("build/gallery-instancemanager/gallery-instancemanager.js", "getIfConstructed", 58);
_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 61);
return this._map[ id ] || false;
	},

	/**
	 * Store an object or ctor+args.
	 * 
	 * @method put
	 * @param id {String} the id of the object
	 * @param objOrCtor {Object|Function} the object or the object's constructor or a factory method
	 * @param args {Array} the array of arguments to pass to the constructor
	 * @return {Boolean} false if the id has already been used
	 */
	put: function(
		/* string */	id,
		/* obj/fn */	objOrCtor,
		/* array */		args)
	{
		_yuitest_coverfunc("build/gallery-instancemanager/gallery-instancemanager.js", "put", 73);
_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 78);
if (this._map[ id ])
		{
			_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 80);
return false;
		}
		else {_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 82);
if (Y.Lang.isFunction(objOrCtor))
		{
			_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 84);
this._constructors[ id ] =
			{
				fn:   objOrCtor,
				args: Y.Lang.isArray(args) ? args : [args]
			};

			_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 90);
this._map[ id ] = null;
			_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 91);
return true;
		}
		else
		{
			_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 95);
this._map[ id ] = objOrCtor;
			_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 96);
return true;
		}}
	},

	/**
	 * Remove an object.
	 * 
	 * @method remove
	 * @param id {String} the id of the object
	 * @return {mixed} the object that was removed, or false if the slot was empty
	 */
	remove: function(
		/* string */	id)
	{
		_yuitest_coverfunc("build/gallery-instancemanager/gallery-instancemanager.js", "remove", 107);
_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 110);
if (this._map[ id ])
		{
			_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 112);
var obj = this._map[ id ];
			_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 113);
delete this._map[ id ];
			_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 114);
return obj;
		}
		else
		{
			_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 118);
return false;
		}
	},

	/**
	 * Remove all objects.
	 * 
	 * @method clear
	 */
	clear: function()
	{
		_yuitest_coverfunc("build/gallery-instancemanager/gallery-instancemanager.js", "clear", 127);
_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 129);
this._map = {};
	},

	/**
	 * Returns list of all stored keys.
	 * 
	 * @method keys
	 */
	keys: function()
	{
		_yuitest_coverfunc("build/gallery-instancemanager/gallery-instancemanager.js", "keys", 137);
_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 139);
return Y.Object.keys(this._map);
	},

	/**
	 * Call a function on every object.
	 * 
	 * @method applyToAll
	 * @param behavior {Function|String|Object} the function to call or the name of the function or an object {fn:,scope:}
	 * @param arguments {Array} the arguments to pass to the function
	 * @param skip_unconstructed {boolean} Optional.  Pass <code>true</code> to skip unconstructed slots.
	 */
	applyToAll: function(
		/* string/fn/object */	behavior,
		/* array */				args,
		/* bool */				skip_unconstructed)
	{
		_yuitest_coverfunc("build/gallery-instancemanager/gallery-instancemanager.js", "applyToAll", 150);
_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 155);
var map        = this._map,
			isFunction = Y.Lang.isFunction(behavior),
			isObject   = Y.Lang.isObject(behavior);

		_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 159);
Y.Object.each(map, function(item, name)
		{
			_yuitest_coverfunc("build/gallery-instancemanager/gallery-instancemanager.js", "(anonymous 2)", 159);
_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 161);
if (!item && skip_unconstructed)
			{
				_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 163);
return;
			}
			else {_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 165);
if (!item)
			{
				_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 167);
item = this.get(name);
			}}

			_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 170);
if (isFunction || isObject)
			{
				// apply the function and pass the map item as an argument

				_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 174);
var fn    = isFunction ? behavior : behavior.fn,
					scope = isFunction ? window : behavior.scope;

				_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 177);
fn.apply(scope, [ { key:name, value:item } ].concat( args ) );
			}
			else {_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 179);
if (item && Y.Lang.isFunction(item[ behavior ]))
			{
				// the string is the name of a method

				_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 183);
item[ behavior ].apply(item, args);
			}}
		},
		this);
	}
};

_yuitest_coverline("build/gallery-instancemanager/gallery-instancemanager.js", 190);
Y.InstanceManager = InstanceManager;


}, '@VERSION@');
