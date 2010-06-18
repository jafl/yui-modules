"use strict";

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
 * @module gallery-multiobject
 * @class MultiObject
 * @constructor
 * @param items {Array} initial set of items
 * @param config {Object} configuration
 *		<dl>
 *		<dt>return_all_results</dt>
 *		<dd>Default: false.  If this is true, then all delegated functions
 *			will return an array of results instead of the result from the
 *			primary item.  Note that functions which return "undefined" or
 *			the item itself always cause the MultiObject to be returned,
 *			to support chaining.</dd>
 *		<dt>primary_item_index</dt>
 *		<dd>Default: 0.  When return_all_results=false, this is the index of
 *			the item which generates the return result for all delegated
 *			functions.</dd>
 *		</dl>
 */

function MultiObject(
	/* array */		items,
	/* object */	config)
{
	this.items = Y.Array(items);

	var item = this.items[0];
	for (var f in item)
	{
		if (Y.Lang.isFunction(item[f]) && !this[f])
		{
			this[f] = delegate.call(this, f);
		}
	}

	this.args_adjuster = {};

	config                  = config || {};
	this.primary_item_index = config.primary_item_index || 0;
	this.return_all_results = config.return_all_results;

	Y.Array.each(this.items, installItem, this);

	config.prefix = this.items[0].name;
    MultiObject.superclass.constructor.call(this, config);
}

function delegate(
	/* string */	f)
{
	return function()
	{
		var args    = arguments;
		var results = [];

		Y.Array.each(this.items, function(item, index)
		{
			var args1 = args;
			if (this.args_adjuster[f])
			{
				args1 = this.args_adjuster[f].call(item, index, Y.Array(args, 0, true));
			}

			var result = item[f].apply(item, args1);

			if (!Y.Lang.isUndefined(result) && result !== item)
			{
				results.push(result);
			}
		},
		this);

		if (results.length === 0)
		{
			return this;	// chainable
		}
		else if (this.return_all_results)
		{
			return results;
		}
		else
		{
			return results[ this.primary_item_index ];
		}
	};
}

function distributeValue(e, index, key)
{
	Y.Array.each(this.items, function(item, i)
	{
		if (i !== index)
		{
			item.set(key, e.newVal);
		}
	});
}

function installItem(
	/* object */	item,
	/* int */		index)
{
	if (!item)
	{
		return;
	}

	Y.Object.each(item.getAttrs(), function(value, key)
	{
		item.after(key+'Change', distributeValue, this, index, key);
	},
	this);

	item.addTarget(this);
}

function uninstallItem(
	/* object */	item,
	/* int */		index)
{
	if (!item)
	{
		return;
	}

	Y.Object.each(item.getAttrs(), function(value, key)
	{
		item.detach(key+'Change', distributeValue, this);
	},
	this);

	item.removeTarget(this);
}

Y.extend(MultiObject, Y.EventTarget,
{
	/**
	 * Destroys the MultiObject, but not the individual objects.
	 * <code>destroy()</code> is, of course, delegated.
	 */
	multi_destroy: function()
	{
		Y.Array.each(this.items, uninstallItem, this);
	},

	/**
	 * @return the index of the primary item
	 */
	multi_get_primary_item_index: function()
	{
		return this.primary_item_index;
	},

	/**
	 * @param index {int} the index of the primary item
	 */
	multi_set_primary_item_index: function(
		/* int */	index)
	{
		this.primary_item_index = index;
	},

	/**
	 * @return true if all results will be returned by delegated functions
	 */
	multi_get_return_all_results: function()
	{
		return this.return_all_results;
	},

	/**
	 * @param all {boolean} true if delegated functions should return all results
	 */
	multi_set_return_all_results: function(
		/* bool */	all)
	{
		this.return_all_results = all;
	},

	/**
	 * Return an array of all the individual results from calling the
	 * specified function.  This is only useful if return_all_results=false.
	 * 
	 * @param f {String} name of the function to invoke
	 * @param arg* {mixed} 0..n arguments to pass to the function
	 * @return {Array} results from delegating the named function
	 */
	multi_get_all: function(
		/* string */ f)
	{
		var args = Y.Array(arguments, 0, true);
		args.shift();

		var all = this.return_all_results;
		this.return_all_results = true;
		var results = this[f].apply(this, args);
		this.return_all_results = all;

		return results;
	}

//	push, pop, shift, unshift, add, remove (index or object), splice
//	item, indexOf, size
});

Y.MultiObject = MultiObject;
