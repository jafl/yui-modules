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
_yuitest_coverage["build/gallery-mru-cache/gallery-mru-cache.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-mru-cache/gallery-mru-cache.js",
    code: []
};
_yuitest_coverage["build/gallery-mru-cache/gallery-mru-cache.js"].code=["YUI.add('gallery-mru-cache', function (Y, NAME) {","","/**"," * @module gallery-mru-cache"," */","","/**********************************************************************"," * <p>Cache which drops items based on \"most recently used.\"  Items are"," * dropped when a user-defined criterion is exceeded, e.g., total size or"," * number of items.</p>"," * "," * <p>The items are stored in a map of {data,mru_item_ref}.  The MRU items"," * are stored in a doubly linked list (which stores the map keys) to allow"," * easy re-ordering and dropping of items.  Every cache hit moves the"," * associated MRU item to the front of the list.</p>"," * "," * @main gallery-mru-cache"," * @class MRUCache"," * @constructor"," * @param config {Object}"," * @param config.metric {Function} Computes the metric for an item.  It receives the value as an argument and must return a positive number."," * @param config.limit {Number} Maximum allowed value of the metric.  Items are dropped off the end of the MRU list until the metric is less than or equal to the limit."," * @param [config.meta] {Function} Attaches meta data to an item when it is added to the cache.  It receives the value as an argument."," * @param [config.stats] {Boolean} Pass true if you want to collect basic statistics.  Pass a function if you want to control what information is stored for each key.  The function receives the key, the value, and the stat object."," */","function MRUCache(config)","{","	this._metric_fn = config.metric;","	this._limit     = config.limit;","	this._meta      = config.meta;","	this._stats     = config.stats ? initStats() : null;","","	if (Y.Lang.isFunction(config.stats))","	{","		this._stats_key_meta = config.stats;","	}","","	this.clear();","}","","function initStats()","{","	return { gets: 0, keys: {} };","}","","function initKeyStats(keys, key)","{","	if (!keys[key])","	{","		keys[key] = { puts: 0, gets: 0 };","	}","}","","MRUCache.prototype =","{","	/**","	 * Retrieve a value.","	 * ","	 * @method get","	 * @param key {String} the key of the object to retrieve","	 * @return {Mixed} the stored object, or undefined if the slot is empty","	 */","	get: function(","		/* string */	key)","	{","		var obj = this._store[key];","		if (obj)","		{","			this._mru.prepend(obj.mru);","","			if (this._stats)","			{","				this._stats.gets++;","","				initKeyStats(this._stats.keys, key);","				this._stats.keys[key].gets++;","			}","","			return obj.data;","		}","	},","","	/**","	 * Store a value.","	 * ","	 * @method put","	 * @param key {String} the key of the value","	 * @param value {Object} the value to store","	 * @return {boolean} false if the key has already been used","	 */","	put: function(","		/* string */	key,","		/* obj/fn */	value)","	{","		var exists = !Y.Lang.isUndefined(this._store[key]);","		if (exists)","		{","			return false;","		}","","		var obj =","		{","			data: value,","			mru:  this._mru.prepend(key)","		};","","		if (this._meta)","		{","			obj.meta = this._meta(value);","		}","","		this._store[key] = obj;","","		this._metric += this._metric_fn(value);","		while (this._metric > this._limit)","		{","			this.remove(this._mru.tail().value);","		}","","		if (this._stats)","		{","			initKeyStats(this._stats.keys, key);","			this._stats.keys[key].puts++;","","			if (this._stats_key_meta)","			{","				this._stats_key_meta(key, value, this._stats.keys[key]);","			}","		}","","		return true;","	},","","	/**","	 * Store a value.","	 * ","	 * @method replace","	 * @param key {String} the key of the value","	 * @param value {Object} the value to store","	 * @return {Mixed} the original value that was in the slot, or undefined if the slot is empty","	 */","	replace: function(","		/* string */	key,","		/* obj/fn */	value)","	{","		var orig = this.remove(key);","		this.put(key, value);","		return orig;","	},","","	/**","	 * Remove an value.","	 * ","	 * @method remove","	 * @param key {String} the key of the value","	 * @return {mixed} the value that was removed, or undefined if the slot was empty","	 */","	remove: function(","		/* string */	key)","	{","		var orig = this._store[key];","		delete this._store[key];","		if (orig)","		{","			this._mru.remove(orig.mru);","			this._metric -= this._metric_fn(orig.data);","			return orig.data;","		}","	},","","	/**","	 * Remove all values.","	 * ","	 * @method clear","	 */","	clear: function()","	{","		this._store  = {};","		this._mru    = new Y.LinkedList();","		this._metric = 0;","	},","","	/**","	 * This resets all the values.","	 *","	 * @method dumpStats","	 * @return {Object} the current stats","	 */","	dumpStats: function()","	{","		var stats   = this._stats;","		this._stats = initStats();","		return stats;","	}","};","","Y.MRUCache = MRUCache;","","","}, '@VERSION@', {\"requires\": [\"gallery-linkedlist\"]});"];
_yuitest_coverage["build/gallery-mru-cache/gallery-mru-cache.js"].lines = {"1":0,"26":0,"28":0,"29":0,"30":0,"31":0,"33":0,"35":0,"38":0,"41":0,"43":0,"46":0,"48":0,"50":0,"54":0,"66":0,"67":0,"69":0,"71":0,"73":0,"75":0,"76":0,"79":0,"95":0,"96":0,"98":0,"101":0,"107":0,"109":0,"112":0,"114":0,"115":0,"117":0,"120":0,"122":0,"123":0,"125":0,"127":0,"131":0,"146":0,"147":0,"148":0,"161":0,"162":0,"163":0,"165":0,"166":0,"167":0,"178":0,"179":0,"180":0,"191":0,"192":0,"193":0,"197":0};
_yuitest_coverage["build/gallery-mru-cache/gallery-mru-cache.js"].functions = {"MRUCache:26":0,"initStats:41":0,"initKeyStats:46":0,"get:63":0,"put:91":0,"replace:142":0,"remove:158":0,"clear:176":0,"dumpStats:189":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-mru-cache/gallery-mru-cache.js"].coveredLines = 55;
_yuitest_coverage["build/gallery-mru-cache/gallery-mru-cache.js"].coveredFunctions = 10;
_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 1);
YUI.add('gallery-mru-cache', function (Y, NAME) {

/**
 * @module gallery-mru-cache
 */

/**********************************************************************
 * <p>Cache which drops items based on "most recently used."  Items are
 * dropped when a user-defined criterion is exceeded, e.g., total size or
 * number of items.</p>
 * 
 * <p>The items are stored in a map of {data,mru_item_ref}.  The MRU items
 * are stored in a doubly linked list (which stores the map keys) to allow
 * easy re-ordering and dropping of items.  Every cache hit moves the
 * associated MRU item to the front of the list.</p>
 * 
 * @main gallery-mru-cache
 * @class MRUCache
 * @constructor
 * @param config {Object}
 * @param config.metric {Function} Computes the metric for an item.  It receives the value as an argument and must return a positive number.
 * @param config.limit {Number} Maximum allowed value of the metric.  Items are dropped off the end of the MRU list until the metric is less than or equal to the limit.
 * @param [config.meta] {Function} Attaches meta data to an item when it is added to the cache.  It receives the value as an argument.
 * @param [config.stats] {Boolean} Pass true if you want to collect basic statistics.  Pass a function if you want to control what information is stored for each key.  The function receives the key, the value, and the stat object.
 */
_yuitest_coverfunc("build/gallery-mru-cache/gallery-mru-cache.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 26);
function MRUCache(config)
{
	_yuitest_coverfunc("build/gallery-mru-cache/gallery-mru-cache.js", "MRUCache", 26);
_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 28);
this._metric_fn = config.metric;
	_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 29);
this._limit     = config.limit;
	_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 30);
this._meta      = config.meta;
	_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 31);
this._stats     = config.stats ? initStats() : null;

	_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 33);
if (Y.Lang.isFunction(config.stats))
	{
		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 35);
this._stats_key_meta = config.stats;
	}

	_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 38);
this.clear();
}

_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 41);
function initStats()
{
	_yuitest_coverfunc("build/gallery-mru-cache/gallery-mru-cache.js", "initStats", 41);
_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 43);
return { gets: 0, keys: {} };
}

_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 46);
function initKeyStats(keys, key)
{
	_yuitest_coverfunc("build/gallery-mru-cache/gallery-mru-cache.js", "initKeyStats", 46);
_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 48);
if (!keys[key])
	{
		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 50);
keys[key] = { puts: 0, gets: 0 };
	}
}

_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 54);
MRUCache.prototype =
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
		_yuitest_coverfunc("build/gallery-mru-cache/gallery-mru-cache.js", "get", 63);
_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 66);
var obj = this._store[key];
		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 67);
if (obj)
		{
			_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 69);
this._mru.prepend(obj.mru);

			_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 71);
if (this._stats)
			{
				_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 73);
this._stats.gets++;

				_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 75);
initKeyStats(this._stats.keys, key);
				_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 76);
this._stats.keys[key].gets++;
			}

			_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 79);
return obj.data;
		}
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
		_yuitest_coverfunc("build/gallery-mru-cache/gallery-mru-cache.js", "put", 91);
_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 95);
var exists = !Y.Lang.isUndefined(this._store[key]);
		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 96);
if (exists)
		{
			_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 98);
return false;
		}

		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 101);
var obj =
		{
			data: value,
			mru:  this._mru.prepend(key)
		};

		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 107);
if (this._meta)
		{
			_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 109);
obj.meta = this._meta(value);
		}

		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 112);
this._store[key] = obj;

		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 114);
this._metric += this._metric_fn(value);
		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 115);
while (this._metric > this._limit)
		{
			_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 117);
this.remove(this._mru.tail().value);
		}

		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 120);
if (this._stats)
		{
			_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 122);
initKeyStats(this._stats.keys, key);
			_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 123);
this._stats.keys[key].puts++;

			_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 125);
if (this._stats_key_meta)
			{
				_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 127);
this._stats_key_meta(key, value, this._stats.keys[key]);
			}
		}

		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 131);
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
		_yuitest_coverfunc("build/gallery-mru-cache/gallery-mru-cache.js", "replace", 142);
_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 146);
var orig = this.remove(key);
		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 147);
this.put(key, value);
		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 148);
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
		_yuitest_coverfunc("build/gallery-mru-cache/gallery-mru-cache.js", "remove", 158);
_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 161);
var orig = this._store[key];
		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 162);
delete this._store[key];
		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 163);
if (orig)
		{
			_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 165);
this._mru.remove(orig.mru);
			_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 166);
this._metric -= this._metric_fn(orig.data);
			_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 167);
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
		_yuitest_coverfunc("build/gallery-mru-cache/gallery-mru-cache.js", "clear", 176);
_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 178);
this._store  = {};
		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 179);
this._mru    = new Y.LinkedList();
		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 180);
this._metric = 0;
	},

	/**
	 * This resets all the values.
	 *
	 * @method dumpStats
	 * @return {Object} the current stats
	 */
	dumpStats: function()
	{
		_yuitest_coverfunc("build/gallery-mru-cache/gallery-mru-cache.js", "dumpStats", 189);
_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 191);
var stats   = this._stats;
		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 192);
this._stats = initStats();
		_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 193);
return stats;
	}
};

_yuitest_coverline("build/gallery-mru-cache/gallery-mru-cache.js", 197);
Y.MRUCache = MRUCache;


}, '@VERSION@', {"requires": ["gallery-linkedlist"]});
