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
_yuitest_coverage["build/gallery-expiration-cache/gallery-expiration-cache.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-expiration-cache/gallery-expiration-cache.js",
    code: []
};
_yuitest_coverage["build/gallery-expiration-cache/gallery-expiration-cache.js"].code=["YUI.add('gallery-expiration-cache', function (Y, NAME) {","","/**"," * @module gallery-expiration-cache"," */","","/**"," * <p>Cache which drops items based on a user-defined expiration criterion,"," * e.g., age.  By default, expired items are only removed when they are"," * requested.  If you want to \"stop the world\" and clean out the cache,"," * call clean().</p>"," * "," * @main gallery-expiration-cache"," * @class ExpirationCache"," * @constructor"," * @param config {Object}"," * @param [config.store] {Object} Data store which implements get,put,remove,clear,keys.  If not specified, a new instance of `Y.InstanceManager` is created."," * @param [config.meta] {Function} Attaches meta data to an item when it is added to the cache.  It receives the value as an argument.  If not specified, the default is to timestamp the item."," * @param config.expire {Function} Returns true if the item has expired.  It receives the meta data and the value as arguments.  If a number is specified, it is assumed to be a duration in milliseconds."," * @param [config.stats] {Boolean} Pass true if you want to collect basic statistics.  Pass a function if you want to control what information is stored for each key.  The function receives the key, the value, and the stat object."," */","function ExpirationCache(config)","{","	this._store  = config.store || new Y.InstanceManager();","	this._meta   = config.meta  || timestamp;","	this._expire = Y.Lang.isNumber(config.expire) ? Y.rbind(expire, null, config.expire) : config.expire;","	this._stats  = config.stats ? initStats() : null;","","	if (Y.Lang.isFunction(config.stats))","	{","		this._stats_key_meta = config.stats;","	}","}","","function timestamp()","{","	return new Date().getTime();","}","","function expire(timestamp, value, delta)","{","	var elapsed = new Date().getTime() - timestamp;","	return (elapsed > delta);","}","","function initStats()","{","	return { gets: 0, keys: {} };","}","","function initKeyStats(keys, key)","{","	if (!keys[key])","	{","		keys[key] = { puts: 0, gets: 0 };","	}","}","","ExpirationCache.prototype =","{","	/**","	 * Retrieve a value.","	 * ","	 * @method get","	 * @param key {String} the key of the object to retrieve","	 * @return {Mixed} the stored object, or undefined if the slot is empty","	 */","	get: function(","		/* string */	key)","	{","		var obj = this._store.get(key);","		if (obj && this._expire(obj.meta, obj.data))","		{","			this._store.remove(key);","		}","		else if (obj)","		{","			if (this._stats)","			{","				this._stats.gets++;","","				initKeyStats(this._stats.keys, key);","				this._stats.keys[key].gets++;","			}","","			return obj.data;","		}","	},","","	/**","	 * Store a value.","	 * ","	 * @method put","	 * @param key {String} the key of the value","	 * @param value {Object} the value to store","	 * @return {boolean} false if the key has already been used","	 */","	put: function(","		/* string */	key,","		/* obj/fn */	value)","	{","		var obj =","		{","			data: value,","			meta: this._meta(value)","		};","","		if (!this._store.put(key, obj))","		{","			return false;","		}","","		if (this._stats)","		{","			initKeyStats(this._stats.keys, key);","			this._stats.keys[key].puts++;","","			if (this._stats_key_meta)","			{","				this._stats_key_meta(key, value, this._stats.keys[key]);","			}","		}","		return true;","	},","","	/**","	 * Store a value.","	 * ","	 * @method replace","	 * @param key {String} the key of the value","	 * @param value {Object} the value to store","	 * @return {Mixed} the original value that was in the slot, or undefined if the slot is empty","	 */","	replace: function(","		/* string */	key,","		/* obj/fn */	value)","	{","		var orig = this.remove(key);","		this.put(key, value);","		return orig;","	},","","	/**","	 * Remove an value.","	 * ","	 * @method remove","	 * @param key {String} the key of the value","	 * @return {mixed} the value that was removed, or undefined if the slot was empty","	 */","	remove: function(","		/* string */	key)","	{","		var orig = this._store.remove(key);","		if (orig)","		{","			return orig.data;","		}","	},","","	/**","	 * Remove all values.","	 * ","	 * @method clear","	 */","	clear: function()","	{","		this._store.clear();","	},","","	/**","	 * Remove all expired values.","	 * ","	 * @method clean","	 */","	clean: function()","	{","		Y.each(this._store.keys(), this.get, this);","	},","","	/**","	 * This resets all the values.","	 *","	 * @method dumpStats","	 * @return {Object} the current stats","	 */","	dumpStats: function()","	{","		var stats   = this._stats;","		this._stats = initStats();","		return stats;","	}","};","","Y.ExpirationCache = ExpirationCache;","","","}, '@VERSION@', {\"requires\": [\"gallery-instancemanager\"]});"];
_yuitest_coverage["build/gallery-expiration-cache/gallery-expiration-cache.js"].lines = {"1":0,"22":0,"24":0,"25":0,"26":0,"27":0,"29":0,"31":0,"35":0,"37":0,"40":0,"42":0,"43":0,"46":0,"48":0,"51":0,"53":0,"55":0,"59":0,"71":0,"72":0,"74":0,"76":0,"78":0,"80":0,"82":0,"83":0,"86":0,"102":0,"108":0,"110":0,"113":0,"115":0,"116":0,"118":0,"120":0,"123":0,"138":0,"139":0,"140":0,"153":0,"154":0,"156":0,"167":0,"177":0,"188":0,"189":0,"190":0,"194":0};
_yuitest_coverage["build/gallery-expiration-cache/gallery-expiration-cache.js"].functions = {"ExpirationCache:22":0,"timestamp:35":0,"expire:40":0,"initStats:46":0,"initKeyStats:51":0,"get:68":0,"put:98":0,"replace:134":0,"remove:150":0,"clear:165":0,"clean:175":0,"dumpStats:186":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-expiration-cache/gallery-expiration-cache.js"].coveredLines = 49;
_yuitest_coverage["build/gallery-expiration-cache/gallery-expiration-cache.js"].coveredFunctions = 13;
_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 1);
YUI.add('gallery-expiration-cache', function (Y, NAME) {

/**
 * @module gallery-expiration-cache
 */

/**
 * <p>Cache which drops items based on a user-defined expiration criterion,
 * e.g., age.  By default, expired items are only removed when they are
 * requested.  If you want to "stop the world" and clean out the cache,
 * call clean().</p>
 * 
 * @main gallery-expiration-cache
 * @class ExpirationCache
 * @constructor
 * @param config {Object}
 * @param [config.store] {Object} Data store which implements get,put,remove,clear,keys.  If not specified, a new instance of `Y.InstanceManager` is created.
 * @param [config.meta] {Function} Attaches meta data to an item when it is added to the cache.  It receives the value as an argument.  If not specified, the default is to timestamp the item.
 * @param config.expire {Function} Returns true if the item has expired.  It receives the meta data and the value as arguments.  If a number is specified, it is assumed to be a duration in milliseconds.
 * @param [config.stats] {Boolean} Pass true if you want to collect basic statistics.  Pass a function if you want to control what information is stored for each key.  The function receives the key, the value, and the stat object.
 */
_yuitest_coverfunc("build/gallery-expiration-cache/gallery-expiration-cache.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 22);
function ExpirationCache(config)
{
	_yuitest_coverfunc("build/gallery-expiration-cache/gallery-expiration-cache.js", "ExpirationCache", 22);
_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 24);
this._store  = config.store || new Y.InstanceManager();
	_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 25);
this._meta   = config.meta  || timestamp;
	_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 26);
this._expire = Y.Lang.isNumber(config.expire) ? Y.rbind(expire, null, config.expire) : config.expire;
	_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 27);
this._stats  = config.stats ? initStats() : null;

	_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 29);
if (Y.Lang.isFunction(config.stats))
	{
		_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 31);
this._stats_key_meta = config.stats;
	}
}

_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 35);
function timestamp()
{
	_yuitest_coverfunc("build/gallery-expiration-cache/gallery-expiration-cache.js", "timestamp", 35);
_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 37);
return new Date().getTime();
}

_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 40);
function expire(timestamp, value, delta)
{
	_yuitest_coverfunc("build/gallery-expiration-cache/gallery-expiration-cache.js", "expire", 40);
_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 42);
var elapsed = new Date().getTime() - timestamp;
	_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 43);
return (elapsed > delta);
}

_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 46);
function initStats()
{
	_yuitest_coverfunc("build/gallery-expiration-cache/gallery-expiration-cache.js", "initStats", 46);
_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 48);
return { gets: 0, keys: {} };
}

_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 51);
function initKeyStats(keys, key)
{
	_yuitest_coverfunc("build/gallery-expiration-cache/gallery-expiration-cache.js", "initKeyStats", 51);
_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 53);
if (!keys[key])
	{
		_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 55);
keys[key] = { puts: 0, gets: 0 };
	}
}

_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 59);
ExpirationCache.prototype =
{
	/**
	 * Retrieve a value.
	 * 
	 * @method get
	 * @param key {String} the key of the object to retrieve
	 * @return {Mixed} the stored object, or undefined if the slot is empty
	 */
	get: function(
		/* string */	key)
	{
		_yuitest_coverfunc("build/gallery-expiration-cache/gallery-expiration-cache.js", "get", 68);
_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 71);
var obj = this._store.get(key);
		_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 72);
if (obj && this._expire(obj.meta, obj.data))
		{
			_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 74);
this._store.remove(key);
		}
		else {_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 76);
if (obj)
		{
			_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 78);
if (this._stats)
			{
				_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 80);
this._stats.gets++;

				_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 82);
initKeyStats(this._stats.keys, key);
				_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 83);
this._stats.keys[key].gets++;
			}

			_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 86);
return obj.data;
		}}
	},

	/**
	 * Store a value.
	 * 
	 * @method put
	 * @param key {String} the key of the value
	 * @param value {Object} the value to store
	 * @return {boolean} false if the key has already been used
	 */
	put: function(
		/* string */	key,
		/* obj/fn */	value)
	{
		_yuitest_coverfunc("build/gallery-expiration-cache/gallery-expiration-cache.js", "put", 98);
_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 102);
var obj =
		{
			data: value,
			meta: this._meta(value)
		};

		_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 108);
if (!this._store.put(key, obj))
		{
			_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 110);
return false;
		}

		_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 113);
if (this._stats)
		{
			_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 115);
initKeyStats(this._stats.keys, key);
			_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 116);
this._stats.keys[key].puts++;

			_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 118);
if (this._stats_key_meta)
			{
				_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 120);
this._stats_key_meta(key, value, this._stats.keys[key]);
			}
		}
		_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 123);
return true;
	},

	/**
	 * Store a value.
	 * 
	 * @method replace
	 * @param key {String} the key of the value
	 * @param value {Object} the value to store
	 * @return {Mixed} the original value that was in the slot, or undefined if the slot is empty
	 */
	replace: function(
		/* string */	key,
		/* obj/fn */	value)
	{
		_yuitest_coverfunc("build/gallery-expiration-cache/gallery-expiration-cache.js", "replace", 134);
_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 138);
var orig = this.remove(key);
		_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 139);
this.put(key, value);
		_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 140);
return orig;
	},

	/**
	 * Remove an value.
	 * 
	 * @method remove
	 * @param key {String} the key of the value
	 * @return {mixed} the value that was removed, or undefined if the slot was empty
	 */
	remove: function(
		/* string */	key)
	{
		_yuitest_coverfunc("build/gallery-expiration-cache/gallery-expiration-cache.js", "remove", 150);
_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 153);
var orig = this._store.remove(key);
		_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 154);
if (orig)
		{
			_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 156);
return orig.data;
		}
	},

	/**
	 * Remove all values.
	 * 
	 * @method clear
	 */
	clear: function()
	{
		_yuitest_coverfunc("build/gallery-expiration-cache/gallery-expiration-cache.js", "clear", 165);
_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 167);
this._store.clear();
	},

	/**
	 * Remove all expired values.
	 * 
	 * @method clean
	 */
	clean: function()
	{
		_yuitest_coverfunc("build/gallery-expiration-cache/gallery-expiration-cache.js", "clean", 175);
_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 177);
Y.each(this._store.keys(), this.get, this);
	},

	/**
	 * This resets all the values.
	 *
	 * @method dumpStats
	 * @return {Object} the current stats
	 */
	dumpStats: function()
	{
		_yuitest_coverfunc("build/gallery-expiration-cache/gallery-expiration-cache.js", "dumpStats", 186);
_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 188);
var stats   = this._stats;
		_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 189);
this._stats = initStats();
		_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 190);
return stats;
	}
};

_yuitest_coverline("build/gallery-expiration-cache/gallery-expiration-cache.js", 194);
Y.ExpirationCache = ExpirationCache;


}, '@VERSION@', {"requires": ["gallery-instancemanager"]});
