YUI.add('gallery-linkedlist', function(Y) {

"use strict";

/**********************************************************************
 * Item stored by LinkedList.
 * 
 * @class LinkedListItem
 * @constructor
 * @param value {Mixed} value to store
 */

function LinkedListItem(
	/* object */	value)
{
	this.value = value;
	this._prev = this._next = null;
}

LinkedListItem.prototype =
{
	/**
	 * @return {LinkedListItem} previous item or null
	 */
	prev: function()
	{
		return this._prev;
	},

	/**
	 * @return {LinkedListItem} next item or null
	 */
	next: function()
	{
		return this._next;
	}
};

Y.LinkedListItem = LinkedListItem;
/**********************************************************************
 * Iterator for LinkedList.  Stable except when the next item is removed by
 * calling list.remove() instead of iter.removeNext().
 *
 * @class LinkedListIterator
 * @constructor
 * @param list {LinkedList}
 */

function LinkedListIterator(
	/* LinkedList */    list)
{
	this._list   = list;
	this._next   = list._head;
	this._at_end = false;
}

LinkedListIterator.prototype =
{
	/**
	 * @return {Boolean} true if at the beginning
	 */
	atBeginning: function()
	{
		return (!this._next || (!this._at_end && !this._next._prev));
	},

	/**
	 * @return {Boolean} true if at the end
	 */
	atEnd: function()
	{
		return (!this._next || this._at_end);
	},

	/**
	 * @return {Mixed} next value in the list or undefined if at the end
	 */
	next: function()
	{
		if (this._at_end)
		{
			return;
		}

		var result = this._next;
		if (this._next && this._next._next)
		{
			this._next = this._next._next;
		}
		else
		{
			this._at_end = true;
		}

		if (result)
		{
			return result.value;
		}
	},

	/**
	 * @return {Mixed} previous value in the list or undefined if at the beginning
	 */
	prev: function()
	{
		var result;
		if (this._at_end)
		{
			this._at_end = false;
			result       = this._next;
		}
		else if (this._next)
		{
			result = this._next._prev;
			if (result)
			{
				this._next = result;
			}
		}

		if (result)
		{
			return result.value;
		}
	},

	/**
	 * Insert the given value at the iteration position.  The inserted item
	 * will be returned by next().
	 * 
	 * @param value {Mixed} value to insert
	 * @return {LinkedListItem} inserted item
	 */
	insert: function(
		/* object */	value)
	{
		if (this._at_end || !this._next)
		{
			this._next = this._list.append(value);
		}
		else
		{
			this._next = this._list.insertBefore(value, this._next);
		}

		return this._next;
	},

	/**
	 * Remove the next item from the list.
	 * 
	 * @return {LinkedListItem} removed item or undefined if at the end
	 */
	removeNext: function()
	{
		var result;
		if (this._next && !this._at_end)
		{
			result = this._next;
			if (this._next && this._next._next)
			{
				this._next = this._next._next;
			}
			else
			{
				this._next   = this._next ? this._next._prev : null;
				this._at_end = true;
			}
		}

		if (result)
		{
			this._list.remove(result);
			return result;
		}
	},

	/**
	 * Remove the previous item from the list.
	 * 
	 * @return {LinkedListItem} removed item or undefined if at the end
	 */
	removePrev: function()
	{
		var result;
		if (this._at_end)
		{
			result = this._next;
			if (this._next)
			{
				this._next = this._next._prev;
			}
		}
		else if (this._next)
		{
			result = this._next._prev;
		}

		if (result)
		{
			this._list.remove(result);
			return result;
		}
	}
};

Y.LinkedListIterator = LinkedListIterator;
/**********************************************************************
 * Doubly linked list for storing items.  Supports iteration via
 * Y.LinkedListIterator or Y.each().  Also supports all the other
 * operations defined in gallery-funcprog.
 * 
 * @module gallery-linkedlist
 */

/**
 * @class LinkedList
 * @constructor
 * @param list {Mixed} (Optional) any scalar or iterable list
 */

function LinkedList(list)
{
	this._head = this._tail = null;

	if (arguments.length > 1)
	{
		list = Y.Array(arguments);
	}
	else if (!Y.Lang.isUndefined(list) && !Y.Array.test(list))
	{
		list = Y.Array(list);
	}

	if (!Y.Lang.isUndefined(list))
	{
		Y.each(list, function(value)
		{
			this.append(value);
		},
		this);
	}
}

function wrap(value)
{
	if (value instanceof LinkedListItem)
	{
		this.remove(value);
	}
	else
	{
		value = new LinkedListItem(value);
	}

	return value;
}

LinkedList.prototype =
{
	/**
	 * @return {Boolean} true if the list is empty
	 */
	isEmpty: function()
	{
		return (!this._head && !this._tail);
	},

	/**
	 * Warning:  This requires traversing the list!  Use isEmpty() whenever
	 * possible.
	 *
	 * @return {Number} the number of items in the list
	 */
	size: function()
	{
		var count = 0,
			item  = this._head;

		while (item)
		{
			count++;
			item = item._next;
		}

		return count;
	},

	/**
	 * Clear the list.
	 */
	clear: function()
	{
		this._head = this._tail = null;
	},

	/**
	 * @param value {Mixed} value to insert
	 * @param item {LinkedListItem} existing item
	 * @return {LinkedListItem} inserted item
	 */
	insertBefore: function(
		/* object */	value,
		/* item */		item)
	{
		value = wrap.call(this, value);

		value._prev = item._prev;
		value._next = item;

		if (item._prev)
		{
			item._prev._next = value;
		}
		else
		{
			this._head = value;
		}
		item._prev = value;

		return value;
	},

	/**
	 * @param item {LinkedListItem} existing item
	 * @param value {Mixed} value to insert
	 * @return {LinkedListItem} inserted item
	 */
	insertAfter: function(
		/* item */		item,
		/* object */	value)
	{
		value = wrap.call(this, value);

		value._prev = item;
		value._next = item._next;

		if (item._next)
		{
			item._next._prev = value;
		}
		else
		{
			this._tail = value;
		}
		item._next = value;

		return value;
	},

	/**
	 * @param value {Mixed} value to prepend
	 * @return {LinkedListItem} prepended item
	 */
	prepend: function(
		/* object */	value)
	{
		value = wrap.call(this, value);

		if (this.isEmpty())
		{
			this._head = this._tail = value;
		}
		else
		{
			this.insertBefore(value, this._head);
		}

		return value;
	},

	/**
	 * @param value {Mixed} value to append
	 * @return {LinkedListItem} appended item
	 */
	append: function(
		/* object */	value)
	{
		value = wrap.call(this, value);

		if (this.isEmpty())
		{
			this._head = this._tail = value;
		}
		else
		{
			this.insertAfter(this._tail, value);
		}

		return value;
	},

	/**
	 * Remove the item from the list.
	 */
	remove: function(
		/* item */	item)
	{
		if (item._prev)
		{
			item._prev._next = item._next;
		}
		else if (item === this._head)
		{
			this._head = item._next;
			if (item._next)
			{
				item._next._prev = null;
			}
		}

		if (item._next)
		{
			item._next._prev = item._prev;
		}
		else if (item === this._tail)
		{
			this._tail = item._prev;
			if (item._prev)
			{
				item._prev._next = null;
			}
		}

		item._prev = item._next = null;
	},

	/**
	 * Executes the supplied function on each item in the list.  The
	 * function receives the value, the index, and the list itself as
	 * parameters (in that order).
	 *
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @static
	 */
	each: function(f, c)
	{
		var iter = new LinkedListIterator(this), item, i = 0;
		while (item = iter.next())
		{
			f.call(c, item.value, i, this);
		}
	},

	/**
	 * Executes the supplied function on each item in the list.  Iteration
	 * stops if the supplied function does not return a truthy value.  The
	 * function receives the value, the index, and the list itself as
	 * parameters (in that order).
	 *
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @return {Boolean} true if every item in the array returns true from the supplied function, false otherwise
	 * @static
	 */
	every: function(f, c)
	{
		var iter = new LinkedListIterator(this), item, i = 0;
		while (item = iter.next())
		{
			if (!f.call(c, item.value, i, this))
			{
				return false;
			}
		}

		return true;
	},

	/**
	 * Executes the supplied function on each item in the list.  Iteration
	 * stops if the supplied function returns a truthy value.  The function
	 * receives the value, the index, and the list itself as parameters
	 * (in that order).
	 *
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @return {Boolean} true if the function returns a truthy value on any of the items in the array, false otherwise
	 * @static
	 */
	some: function(f, c)
	{
		var iter = new LinkedListIterator(this), item, i = 0;
		while (item = iter.next())
		{
			if (f.call(c, item.value, i, this))
			{
				return true;
			}
		}

		return false;
	}
};

Y.LinkedList = LinkedList;


}, '@VERSION@' ,{optional:['gallery-funcprog']});
