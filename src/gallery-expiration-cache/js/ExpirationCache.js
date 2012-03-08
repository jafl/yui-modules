/**********************************************************************
 * <p>Cache which drops items based on a user-defined expiration criterion,
 * e.g., age.  By default, expired items are only removed when they are
 * requested.  If you want to "stop the world" and clean out the cache,
 * call clean().</p>
 * 
 * @module gallery-expiration-cache
 * @class ExpirationCache
 * @constructor
 * @param config {Object}
 *	<dl>
 *	<dt>store</dt>
 *	<dd>Data store which implements get,put,remove,clear,keys.  If not specified, a new instance of Y.InstanceManager is created.</dd>
 *	<dt>meta</dt>
 *	<dd>Function which attaches meta data to an item when it is added to the cache, receives the value as an argument.  If not specified, the default is to timestamp the item.</dd>
 *	<dt>expire</dt>
 *	<dd>Function which returns true if the item has expired, receives the meta data and the value as arguments.  If a number is specified, it is assumed to be a duration in milliseconds.</dd>
 *	</dl>
 */

function ExpirationCache(config)
{
	this._store  = config.store || new Y.InstanceManager();
	this._meta   = config.meta  || timestamp;
	this._expire = Y.Lang.isNumber(config.expire) ? Y.rbind(expire, null, config.expire) : config.expire;
}

function timestamp()
{
	return new Date().getTime();
}

function expire(timestamp, value, delta)
{
	var elapsed = new Date().getTime() - timestamp;
	return (elapsed > delta);
}

ExpirationCache.prototype =
{
	/**
	 * Retrieve a value.
	 * 
	 * @param id {String} the id of the object to retrieve
	 * @return {Mixed} the stored object, or undefined if the slot is empty
	 */
	get: function(
		/* string */	id)
	{
		var obj = this._store.get(id);
		if (obj && this._expire(obj.meta, obj.data))
		{
			this._store.remove(id);
		}
		else if (obj)
		{
			return obj.data;
		}
	},

	/**
	 * Store a value.
	 * 
	 * @param id {String} the id of the value
	 * @param value {Object} the value to store
	 * @return {boolean} false if the id has already been used
	 */
	put: function(
		/* string */	id,
		/* obj/fn */	value)
	{
		var obj =
		{
			data: value,
			meta: this._meta(value)
		};
		return this._store.put(id, obj);
	},

	/**
	 * Store a value.
	 * 
	 * @param id {String} the id of the value
	 * @param value {Object} the value to store
	 * @return {Mixed} the original value that was in the slot, or undefined if the slot is empty
	 */
	replace: function(
		/* string */	id,
		/* obj/fn */	value)
	{
		var orig = this._store.remove(id);
		this.put(id, value);
		if (orig)
		{
			return orig.data;
		}
	},

	/**
	 * Remove an value.
	 * 
	 * @param id {String} the id of the value
	 * @return {mixed} the value that was removed, or undefined if the slot was empty
	 */
	remove: function(
		/* string */	id)
	{
		var orig = this._store.remove(id);
		if (orig)
		{
			return orig.data;
		}
	},

	/**
	 * Remove all values.
	 */
	clear: function()
	{
		this._store.clear();
	},

	/**
	 * Remove all expired values.
	 */
	clean: function()
	{
		Y.each(this._store.keys(), this.get, this);
	}
};

Y.ExpirationCache = ExpirationCache;
