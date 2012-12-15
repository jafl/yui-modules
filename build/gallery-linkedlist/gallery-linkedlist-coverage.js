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
_yuitest_coverage["build/gallery-linkedlist/gallery-linkedlist.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-linkedlist/gallery-linkedlist.js",
    code: []
};
_yuitest_coverage["build/gallery-linkedlist/gallery-linkedlist.js"].code=["YUI.add('gallery-linkedlist', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-linkedlist"," */","","/**********************************************************************"," * Item stored by LinkedList."," * "," * @class LinkedListItem"," * @method constructor"," * @private"," * @param value {Mixed} value to store"," */","","function LinkedListItem(","	/* object */	value)","{","	this.value = value;","	this._prev = this._next = null;","}","","LinkedListItem.prototype =","{","	/**","	 * @method prev","	 * @return {LinkedListItem} previous item or null","	 */","	prev: function()","	{","		return this._prev;","	},","","	/**","	 * @method next","	 * @return {LinkedListItem} next item or null","	 */","	next: function()","	{","		return this._next;","	}","};","","Y.LinkedListItem = LinkedListItem;","/**"," * @module gallery-linkedlist"," */","","/**********************************************************************"," * Iterator for LinkedList.  Stable except when the next item is removed by"," * calling list.remove() instead of iter.removeNext().  When items are"," * inserted into an empty list, the pointer remains at the end, not the"," * beginning."," *"," * @class LinkedListIterator"," * @method constructor"," * @private"," * @param list {LinkedList}"," */","","function LinkedListIterator(","	/* LinkedList */    list)","{","	this._list = list;","	this.moveToBeginning();","}","","LinkedListIterator.prototype =","{","	/**","	 * @method atBeginning","	 * @return {Boolean} true if at the beginning","	 */","	atBeginning: function()","	{","		return (!this._next || (!this._at_end && !this._next._prev));","	},","","	/**","	 * @method atEnd","	 * @return {Boolean} true if at the end","	 */","	atEnd: function()","	{","		return (!this._next || this._at_end);","	},","","	/**","	 * Move to the beginning of the list.","	 * ","	 * @method moveToBeginning","	 */","	moveToBeginning: function()","	{","		this._next   = this._list._head;","		this._at_end = !this._next;","	},","","	/**","	 * Move to the end of the list.","	 * ","	 * @method moveToEnd","	 */","	moveToEnd: function()","	{","		this._next   = this._list._tail;","		this._at_end = true;","	},","","	/**","	 * @method next","	 * @return {Mixed} next value in the list or undefined if at the end","	 */","	next: function()","	{","		if (this._at_end)","		{","			return;","		}","","		var result = this._next;","		if (this._next && this._next._next)","		{","			this._next = this._next._next;","		}","		else","		{","			this._at_end = true;","		}","","		if (result)","		{","			return result.value;","		}","	},","","	/**","	 * @method prev","	 * @return {Mixed} previous value in the list or undefined if at the beginning","	 */","	prev: function()","	{","		var result;","		if (this._at_end)","		{","			this._at_end = false;","			result       = this._next;","		}","		else if (this._next)","		{","			result = this._next._prev;","			if (result)","			{","				this._next = result;","			}","		}","","		if (result)","		{","			return result.value;","		}","	},","","	/**","	 * Insert the given value at the iteration position.  The inserted item","	 * will be returned by next().","	 * ","	 * @method insert","	 * @param value {Mixed} value to insert","	 * @return {LinkedListItem} inserted item","	 */","	insert: function(","		/* object */	value)","	{","		if (this._at_end || !this._next)","		{","			this._next = this._list.append(value);","		}","		else","		{","			this._next = this._list.insertBefore(value, this._next);","		}","","		return this._next;","	},","","	/**","	 * Remove the previous item from the list.","	 * ","	 * @method removePrev","	 * @return {LinkedListItem} removed item or undefined if at the end","	 */","	removePrev: function()","	{","		var result;","		if (this._at_end)","		{","			result = this._next;","			if (this._next)","			{","				this._next = this._next._prev;","			}","		}","		else if (this._next)","		{","			result = this._next._prev;","		}","","		if (result)","		{","			this._list.remove(result);","			return result;","		}","	},","","	/**","	 * Remove the next item from the list.","	 * ","	 * @method removeNext","	 * @return {LinkedListItem} removed item or undefined if at the end","	 */","	removeNext: function()","	{","		var result;","		if (this._next && !this._at_end)","		{","			result = this._next;","			if (this._next && this._next._next)","			{","				this._next = this._next._next;","			}","			else","			{","				this._next   = this._next ? this._next._prev : null;","				this._at_end = true;","			}","		}","","		if (result)","		{","			this._list.remove(result);","			return result;","		}","	}","};","/**"," * @module gallery-linkedlist"," */","","/**********************************************************************"," * <p>Doubly linked list for storing items.  Supports iteration via"," * LinkedListIterator (returned by this.iterator()) or Y.each().  Also"," * supports all the other operations defined in gallery-funcprog.</p>"," * "," * <p>Direct indexing into the list is not supported, as a reminder that it"," * is an expensive operation.  Instead, use find() with a function that"," * checks the index.</p>"," * "," * @main gallery-linkedlist"," * @class LinkedList"," * @constructor"," * @param [list] {Mixed} any scalar or iterable list"," */","","function LinkedList(list)","{","	this._head = this._tail = null;","","	if (arguments.length > 1)","	{","		list = Y.Array(arguments);","	}","	else if (!Y.Lang.isUndefined(list) && !(list instanceof LinkedList) && !Y.Array.test(list))","	{","		list = Y.Array(list);","	}","","	if (!Y.Lang.isUndefined(list))","	{","		Y.each(list, function(value)","		{","			this.append(value);","		},","		this);","	}","}","","function wrap(value)","{","	if (value instanceof LinkedListItem)","	{","		this.remove(value);","	}","	else","	{","		value = new LinkedListItem(value);","	}","","	return value;","}","","LinkedList.prototype =","{","	/**","	 * @method isEmpty","	 * @return {Boolean} true if the list is empty","	 */","	isEmpty: function()","	{","		return (!this._head && !this._tail);","	},","","	/**","	 * Warning:  This requires traversing the list!  Use isEmpty() whenever","	 * possible.","	 *","	 * @method size","	 * @return {Number} the number of items in the list","	 */","	size: function()","	{","		var count = 0,","			item  = this._head;","","		while (item)","		{","			count++;","			item = item._next;","		}","","		return count;","	},","","	/**","	 * @method iterator","	 * @return {LinkedListIterator}","	 */","	iterator: function()","	{","		return new LinkedListIterator(this);","	},","","	/**","	 * Creates a new, empty LinkedList.","	 *","	 * @method newInstance","	 * @return {LinkedList}","	 */","	newInstance: function()","	{","		return new LinkedList();","	},","","	/**","	 * @method head","	 * @return {LinkedListItem} the first item in the list, or null if the list is empty","	 */","	head: function()","	{","		return this._head;","	},","","	/**","	 * @method tail","	 * @return {LinkedListItem} the last item in the list, or null if the list is empty","	 */","	tail: function()","	{","		return this._tail;","	},","","	/**","	 * @method indexOf","	 * @param needle {Mixed} the item to search for","	 * @return {Number} first index of the needle, or -1 if not found","	 */","	indexOf: function(needle)","	{","		var iter = this.iterator(), i = 0;","		while (!iter.atEnd())","		{","			if (iter.next() === needle)","			{","				return i;","			}","			i++;","		}","","		return -1;","	},","","	/**","	 * @method lastIndexOf","	 * @param needle {Mixed} the item to search for","	 * @return {Number} last index of the needle, or -1 if not found","	 */","	lastIndexOf: function(needle)","	{","		var iter = this.iterator(), i = this.size();","		iter.moveToEnd();","		while (!iter.atBeginning())","		{","			i--;","			if (iter.prev() === needle)","			{","				return i;","			}","		}","","		return -1;","	},","","	/**","	 * Clear the list.","	 * ","	 * @method clear","	 */","	clear: function()","	{","		this._head = this._tail = null;","	},","","	/**","	 * @method insertBefore","	 * @param value {Mixed} value to insert","	 * @param item {LinkedListItem} existing item","	 * @return {LinkedListItem} inserted item","	 */","	insertBefore: function(","		/* object */	value,","		/* item */		item)","	{","		value = wrap.call(this, value);","","		value._prev = item._prev;","		value._next = item;","","		if (item._prev)","		{","			item._prev._next = value;","		}","		else","		{","			this._head = value;","		}","		item._prev = value;","","		return value;","	},","","	/**","	 * @method insertAfter","	 * @param item {LinkedListItem} existing item","	 * @param value {Mixed} value to insert","	 * @return {LinkedListItem} inserted item","	 */","	insertAfter: function(","		/* item */		item,","		/* object */	value)","	{","		value = wrap.call(this, value);","","		value._prev = item;","		value._next = item._next;","","		if (item._next)","		{","			item._next._prev = value;","		}","		else","		{","			this._tail = value;","		}","		item._next = value;","","		return value;","	},","","	/**","	 * @method prepend","	 * @param value {Mixed} value to prepend","	 * @return {LinkedListItem} prepended item","	 */","	prepend: function(","		/* object */	value)","	{","		value = wrap.call(this, value);","","		if (this.isEmpty())","		{","			this._head = this._tail = value;","		}","		else","		{","			this.insertBefore(value, this._head);","		}","","		return value;","	},","","	/**","	 * @method append","	 * @param value {Mixed} value to append","	 * @return {LinkedListItem} appended item","	 */","	append: function(","		/* object */	value)","	{","		value = wrap.call(this, value);","","		if (this.isEmpty())","		{","			this._head = this._tail = value;","		}","		else","		{","			this.insertAfter(this._tail, value);","		}","","		return value;","	},","","	/**","	 * Remove the item from the list.","	 * ","	 * @method remove","	 */","	remove: function(","		/* item */	item)","	{","		if (item._prev)","		{","			item._prev._next = item._next;","		}","		else if (item === this._head)","		{","			this._head = item._next;","			if (item._next)","			{","				item._next._prev = null;","			}","		}","","		if (item._next)","		{","			item._next._prev = item._prev;","		}","		else if (item === this._tail)","		{","			this._tail = item._prev;","			if (item._prev)","			{","				item._prev._next = null;","			}","		}","","		item._prev = item._next = null;","	},","","	/**","	 * Reverses the items in place.","	 * ","	 * @method reverse","	 */","	reverse: function()","	{","		var list = new LinkedList();","		var iter = this.iterator();","		while (!iter.atEnd())","		{","			var item = iter.removeNext();","			list.prepend(item);","		}","","		this._head = list._head;","		this._tail = list._tail;","	},","","	/**","	 * @method toArray","	 * @return {Array}","	 */","	toArray: function()","	{","		var result = [],","			item   = this._head;","","		while (item)","		{","			result.push(item.value);","			item = item._next;","		}","","		return result;","	}","};","","Y.mix(LinkedList, Y.Iterable, false, null, 4);","","	/**","	 * Executes the supplied function on each item in the list.  The","	 * function receives the value, the index, and the list itself as","	 * parameters (in that order).","	 *","	 * @method each","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 */","","	/**","	 * Executes the supplied function on each item in the list.  Iteration","	 * stops if the supplied function does not return a truthy value.  The","	 * function receives the value, the index, and the list itself as","	 * parameters (in that order).","	 *","	 * @method every","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @return {Boolean} true if every item in the array returns true from the supplied function, false otherwise","	 */","","	/**","	 * Executes the supplied function on each item in the list.  Returns a","	 * new list containing the items for which the supplied function","	 * returned a truthy value.  The function receives the value, the","	 * index, and the object itself as parameters (in that order).","	 *","	 * @method filter","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @return {Object} list of items for which the supplied function returned a truthy value (empty if it never returned a truthy value)","	 */","","	/**","	 * Executes the supplied function on each item in the list, searching","	 * for the first item that matches the supplied function.  The function","	 * receives the value, the index, and the object itself as parameters","	 * (in that order).","	 *","	 * @method find","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @return {Mixed} the first item for which the supplied function returns true, or null if it never returns true","	 */","","	/**","	 * Executes the supplied function on each item in the list and returns","	 * a new list with the results.  The function receives the value, the","	 * index, and the object itself as parameters (in that order).","	 *","	 * @method map","	 * @param f {String} the function to invoke","	 * @param c {Object} optional context object","	 * @return {Object} list of all return values","	 */","","	/**","	 * Partitions an list into two new list, one with the items for which","	 * the supplied function returns true, and one with the items for which","	 * the function returns false.  The function receives the value, the","	 * index, and the object itself as parameters (in that order).","	 *","	 * @method partition","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @return {Object} object with two properties: matches and rejects. Each is a list containing the items that were selected or rejected by the test function (or an empty object if none).","	 */","","	/**","	 * Executes the supplied function on each item in the list, folding the","	 * list into a single value.  The function receives the value returned","	 * by the previous iteration (or the initial value if this is the first","	 * iteration), the value being iterated, the index, and the list itself","	 * as parameters (in that order).  The function must return the updated","	 * value.","	 *","	 * @method reduce","	 * @param init {Mixed} the initial value","	 * @param f {String} the function to invoke","	 * @param c {Object} optional context object","	 * @return {Mixed} final result from iteratively applying the given function to each item in the list","	 */","","	/**","	 * Executes the supplied function on each item in the list.  Returns a","	 * new list containing the items for which the supplied function","	 * returned a falsey value.  The function receives the value, the","	 * index, and the object itself as parameters (in that order).","	 *","	 * @method reject","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @return {Object} array or object of items for which the supplied function returned a falsey value (empty if it never returned a falsey value)","	 */","","	/**","	 * Executes the supplied function on each item in the list.  Iteration","	 * stops if the supplied function returns a truthy value.  The function","	 * receives the value, the index, and the list itself as parameters","	 * (in that order).","	 *","	 * @method some","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @return {Boolean} true if the function returns a truthy value on any of the items in the array, false otherwise","	 */","","Y.LinkedList = LinkedList;","","","}, '@VERSION@', {\"requires\": [\"gallery-iterable-extras\"], \"optional\": [\"gallery-funcprog\"]});"];
_yuitest_coverage["build/gallery-linkedlist/gallery-linkedlist.js"].lines = {"1":0,"3":0,"18":0,"21":0,"22":0,"25":0,"33":0,"42":0,"46":0,"63":0,"66":0,"67":0,"70":0,"78":0,"87":0,"97":0,"98":0,"108":0,"109":0,"118":0,"120":0,"123":0,"124":0,"126":0,"130":0,"133":0,"135":0,"145":0,"146":0,"148":0,"149":0,"151":0,"153":0,"154":0,"156":0,"160":0,"162":0,"177":0,"179":0,"183":0,"186":0,"197":0,"198":0,"200":0,"201":0,"203":0,"206":0,"208":0,"211":0,"213":0,"214":0,"226":0,"227":0,"229":0,"230":0,"232":0,"236":0,"237":0,"241":0,"243":0,"244":0,"267":0,"269":0,"271":0,"273":0,"275":0,"277":0,"280":0,"282":0,"284":0,"290":0,"292":0,"294":0,"298":0,"301":0,"304":0,"312":0,"324":0,"327":0,"329":0,"330":0,"333":0,"342":0,"353":0,"362":0,"371":0,"381":0,"382":0,"384":0,"386":0,"388":0,"391":0,"401":0,"402":0,"403":0,"405":0,"406":0,"408":0,"412":0,"422":0,"435":0,"437":0,"438":0,"440":0,"442":0,"446":0,"448":0,"450":0,"463":0,"465":0,"466":0,"468":0,"470":0,"474":0,"476":0,"478":0,"489":0,"491":0,"493":0,"497":0,"500":0,"511":0,"513":0,"515":0,"519":0,"522":0,"533":0,"535":0,"537":0,"539":0,"540":0,"542":0,"546":0,"548":0,"550":0,"552":0,"553":0,"555":0,"559":0,"569":0,"570":0,"571":0,"573":0,"574":0,"577":0,"578":0,"587":0,"590":0,"592":0,"593":0,"596":0,"600":0,"710":0};
_yuitest_coverage["build/gallery-linkedlist/gallery-linkedlist.js"].functions = {"LinkedListItem:18":0,"prev:31":0,"next:40":0,"LinkedListIterator:63":0,"atBeginning:76":0,"atEnd:85":0,"moveToBeginning:95":0,"moveToEnd:106":0,"next:116":0,"prev:143":0,"insert:174":0,"removePrev:195":0,"removeNext:224":0,"(anonymous 2):282":0,"LinkedList:267":0,"wrap:290":0,"isEmpty:310":0,"size:322":0,"iterator:340":0,"newInstance:351":0,"head:360":0,"tail:369":0,"indexOf:379":0,"lastIndexOf:399":0,"clear:420":0,"insertBefore:431":0,"insertAfter:459":0,"prepend:486":0,"append:508":0,"remove:530":0,"reverse:567":0,"toArray:585":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-linkedlist/gallery-linkedlist.js"].coveredLines = 153;
_yuitest_coverage["build/gallery-linkedlist/gallery-linkedlist.js"].coveredFunctions = 33;
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 1);
YUI.add('gallery-linkedlist', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 3);
"use strict";

/**
 * @module gallery-linkedlist
 */

/**********************************************************************
 * Item stored by LinkedList.
 * 
 * @class LinkedListItem
 * @method constructor
 * @private
 * @param value {Mixed} value to store
 */

_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 18);
function LinkedListItem(
	/* object */	value)
{
	_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "LinkedListItem", 18);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 21);
this.value = value;
	_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 22);
this._prev = this._next = null;
}

_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 25);
LinkedListItem.prototype =
{
	/**
	 * @method prev
	 * @return {LinkedListItem} previous item or null
	 */
	prev: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "prev", 31);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 33);
return this._prev;
	},

	/**
	 * @method next
	 * @return {LinkedListItem} next item or null
	 */
	next: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "next", 40);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 42);
return this._next;
	}
};

_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 46);
Y.LinkedListItem = LinkedListItem;
/**
 * @module gallery-linkedlist
 */

/**********************************************************************
 * Iterator for LinkedList.  Stable except when the next item is removed by
 * calling list.remove() instead of iter.removeNext().  When items are
 * inserted into an empty list, the pointer remains at the end, not the
 * beginning.
 *
 * @class LinkedListIterator
 * @method constructor
 * @private
 * @param list {LinkedList}
 */

_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 63);
function LinkedListIterator(
	/* LinkedList */    list)
{
	_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "LinkedListIterator", 63);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 66);
this._list = list;
	_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 67);
this.moveToBeginning();
}

_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 70);
LinkedListIterator.prototype =
{
	/**
	 * @method atBeginning
	 * @return {Boolean} true if at the beginning
	 */
	atBeginning: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "atBeginning", 76);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 78);
return (!this._next || (!this._at_end && !this._next._prev));
	},

	/**
	 * @method atEnd
	 * @return {Boolean} true if at the end
	 */
	atEnd: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "atEnd", 85);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 87);
return (!this._next || this._at_end);
	},

	/**
	 * Move to the beginning of the list.
	 * 
	 * @method moveToBeginning
	 */
	moveToBeginning: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "moveToBeginning", 95);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 97);
this._next   = this._list._head;
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 98);
this._at_end = !this._next;
	},

	/**
	 * Move to the end of the list.
	 * 
	 * @method moveToEnd
	 */
	moveToEnd: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "moveToEnd", 106);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 108);
this._next   = this._list._tail;
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 109);
this._at_end = true;
	},

	/**
	 * @method next
	 * @return {Mixed} next value in the list or undefined if at the end
	 */
	next: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "next", 116);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 118);
if (this._at_end)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 120);
return;
		}

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 123);
var result = this._next;
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 124);
if (this._next && this._next._next)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 126);
this._next = this._next._next;
		}
		else
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 130);
this._at_end = true;
		}

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 133);
if (result)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 135);
return result.value;
		}
	},

	/**
	 * @method prev
	 * @return {Mixed} previous value in the list or undefined if at the beginning
	 */
	prev: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "prev", 143);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 145);
var result;
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 146);
if (this._at_end)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 148);
this._at_end = false;
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 149);
result       = this._next;
		}
		else {_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 151);
if (this._next)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 153);
result = this._next._prev;
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 154);
if (result)
			{
				_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 156);
this._next = result;
			}
		}}

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 160);
if (result)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 162);
return result.value;
		}
	},

	/**
	 * Insert the given value at the iteration position.  The inserted item
	 * will be returned by next().
	 * 
	 * @method insert
	 * @param value {Mixed} value to insert
	 * @return {LinkedListItem} inserted item
	 */
	insert: function(
		/* object */	value)
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "insert", 174);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 177);
if (this._at_end || !this._next)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 179);
this._next = this._list.append(value);
		}
		else
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 183);
this._next = this._list.insertBefore(value, this._next);
		}

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 186);
return this._next;
	},

	/**
	 * Remove the previous item from the list.
	 * 
	 * @method removePrev
	 * @return {LinkedListItem} removed item or undefined if at the end
	 */
	removePrev: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "removePrev", 195);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 197);
var result;
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 198);
if (this._at_end)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 200);
result = this._next;
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 201);
if (this._next)
			{
				_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 203);
this._next = this._next._prev;
			}
		}
		else {_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 206);
if (this._next)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 208);
result = this._next._prev;
		}}

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 211);
if (result)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 213);
this._list.remove(result);
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 214);
return result;
		}
	},

	/**
	 * Remove the next item from the list.
	 * 
	 * @method removeNext
	 * @return {LinkedListItem} removed item or undefined if at the end
	 */
	removeNext: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "removeNext", 224);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 226);
var result;
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 227);
if (this._next && !this._at_end)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 229);
result = this._next;
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 230);
if (this._next && this._next._next)
			{
				_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 232);
this._next = this._next._next;
			}
			else
			{
				_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 236);
this._next   = this._next ? this._next._prev : null;
				_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 237);
this._at_end = true;
			}
		}

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 241);
if (result)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 243);
this._list.remove(result);
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 244);
return result;
		}
	}
};
/**
 * @module gallery-linkedlist
 */

/**********************************************************************
 * <p>Doubly linked list for storing items.  Supports iteration via
 * LinkedListIterator (returned by this.iterator()) or Y.each().  Also
 * supports all the other operations defined in gallery-funcprog.</p>
 * 
 * <p>Direct indexing into the list is not supported, as a reminder that it
 * is an expensive operation.  Instead, use find() with a function that
 * checks the index.</p>
 * 
 * @main gallery-linkedlist
 * @class LinkedList
 * @constructor
 * @param [list] {Mixed} any scalar or iterable list
 */

_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 267);
function LinkedList(list)
{
	_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "LinkedList", 267);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 269);
this._head = this._tail = null;

	_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 271);
if (arguments.length > 1)
	{
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 273);
list = Y.Array(arguments);
	}
	else {_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 275);
if (!Y.Lang.isUndefined(list) && !(list instanceof LinkedList) && !Y.Array.test(list))
	{
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 277);
list = Y.Array(list);
	}}

	_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 280);
if (!Y.Lang.isUndefined(list))
	{
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 282);
Y.each(list, function(value)
		{
			_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "(anonymous 2)", 282);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 284);
this.append(value);
		},
		this);
	}
}

_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 290);
function wrap(value)
{
	_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "wrap", 290);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 292);
if (value instanceof LinkedListItem)
	{
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 294);
this.remove(value);
	}
	else
	{
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 298);
value = new LinkedListItem(value);
	}

	_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 301);
return value;
}

_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 304);
LinkedList.prototype =
{
	/**
	 * @method isEmpty
	 * @return {Boolean} true if the list is empty
	 */
	isEmpty: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "isEmpty", 310);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 312);
return (!this._head && !this._tail);
	},

	/**
	 * Warning:  This requires traversing the list!  Use isEmpty() whenever
	 * possible.
	 *
	 * @method size
	 * @return {Number} the number of items in the list
	 */
	size: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "size", 322);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 324);
var count = 0,
			item  = this._head;

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 327);
while (item)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 329);
count++;
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 330);
item = item._next;
		}

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 333);
return count;
	},

	/**
	 * @method iterator
	 * @return {LinkedListIterator}
	 */
	iterator: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "iterator", 340);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 342);
return new LinkedListIterator(this);
	},

	/**
	 * Creates a new, empty LinkedList.
	 *
	 * @method newInstance
	 * @return {LinkedList}
	 */
	newInstance: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "newInstance", 351);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 353);
return new LinkedList();
	},

	/**
	 * @method head
	 * @return {LinkedListItem} the first item in the list, or null if the list is empty
	 */
	head: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "head", 360);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 362);
return this._head;
	},

	/**
	 * @method tail
	 * @return {LinkedListItem} the last item in the list, or null if the list is empty
	 */
	tail: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "tail", 369);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 371);
return this._tail;
	},

	/**
	 * @method indexOf
	 * @param needle {Mixed} the item to search for
	 * @return {Number} first index of the needle, or -1 if not found
	 */
	indexOf: function(needle)
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "indexOf", 379);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 381);
var iter = this.iterator(), i = 0;
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 382);
while (!iter.atEnd())
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 384);
if (iter.next() === needle)
			{
				_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 386);
return i;
			}
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 388);
i++;
		}

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 391);
return -1;
	},

	/**
	 * @method lastIndexOf
	 * @param needle {Mixed} the item to search for
	 * @return {Number} last index of the needle, or -1 if not found
	 */
	lastIndexOf: function(needle)
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "lastIndexOf", 399);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 401);
var iter = this.iterator(), i = this.size();
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 402);
iter.moveToEnd();
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 403);
while (!iter.atBeginning())
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 405);
i--;
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 406);
if (iter.prev() === needle)
			{
				_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 408);
return i;
			}
		}

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 412);
return -1;
	},

	/**
	 * Clear the list.
	 * 
	 * @method clear
	 */
	clear: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "clear", 420);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 422);
this._head = this._tail = null;
	},

	/**
	 * @method insertBefore
	 * @param value {Mixed} value to insert
	 * @param item {LinkedListItem} existing item
	 * @return {LinkedListItem} inserted item
	 */
	insertBefore: function(
		/* object */	value,
		/* item */		item)
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "insertBefore", 431);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 435);
value = wrap.call(this, value);

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 437);
value._prev = item._prev;
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 438);
value._next = item;

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 440);
if (item._prev)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 442);
item._prev._next = value;
		}
		else
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 446);
this._head = value;
		}
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 448);
item._prev = value;

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 450);
return value;
	},

	/**
	 * @method insertAfter
	 * @param item {LinkedListItem} existing item
	 * @param value {Mixed} value to insert
	 * @return {LinkedListItem} inserted item
	 */
	insertAfter: function(
		/* item */		item,
		/* object */	value)
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "insertAfter", 459);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 463);
value = wrap.call(this, value);

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 465);
value._prev = item;
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 466);
value._next = item._next;

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 468);
if (item._next)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 470);
item._next._prev = value;
		}
		else
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 474);
this._tail = value;
		}
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 476);
item._next = value;

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 478);
return value;
	},

	/**
	 * @method prepend
	 * @param value {Mixed} value to prepend
	 * @return {LinkedListItem} prepended item
	 */
	prepend: function(
		/* object */	value)
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "prepend", 486);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 489);
value = wrap.call(this, value);

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 491);
if (this.isEmpty())
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 493);
this._head = this._tail = value;
		}
		else
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 497);
this.insertBefore(value, this._head);
		}

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 500);
return value;
	},

	/**
	 * @method append
	 * @param value {Mixed} value to append
	 * @return {LinkedListItem} appended item
	 */
	append: function(
		/* object */	value)
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "append", 508);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 511);
value = wrap.call(this, value);

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 513);
if (this.isEmpty())
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 515);
this._head = this._tail = value;
		}
		else
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 519);
this.insertAfter(this._tail, value);
		}

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 522);
return value;
	},

	/**
	 * Remove the item from the list.
	 * 
	 * @method remove
	 */
	remove: function(
		/* item */	item)
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "remove", 530);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 533);
if (item._prev)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 535);
item._prev._next = item._next;
		}
		else {_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 537);
if (item === this._head)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 539);
this._head = item._next;
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 540);
if (item._next)
			{
				_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 542);
item._next._prev = null;
			}
		}}

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 546);
if (item._next)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 548);
item._next._prev = item._prev;
		}
		else {_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 550);
if (item === this._tail)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 552);
this._tail = item._prev;
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 553);
if (item._prev)
			{
				_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 555);
item._prev._next = null;
			}
		}}

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 559);
item._prev = item._next = null;
	},

	/**
	 * Reverses the items in place.
	 * 
	 * @method reverse
	 */
	reverse: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "reverse", 567);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 569);
var list = new LinkedList();
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 570);
var iter = this.iterator();
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 571);
while (!iter.atEnd())
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 573);
var item = iter.removeNext();
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 574);
list.prepend(item);
		}

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 577);
this._head = list._head;
		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 578);
this._tail = list._tail;
	},

	/**
	 * @method toArray
	 * @return {Array}
	 */
	toArray: function()
	{
		_yuitest_coverfunc("build/gallery-linkedlist/gallery-linkedlist.js", "toArray", 585);
_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 587);
var result = [],
			item   = this._head;

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 590);
while (item)
		{
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 592);
result.push(item.value);
			_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 593);
item = item._next;
		}

		_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 596);
return result;
	}
};

_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 600);
Y.mix(LinkedList, Y.Iterable, false, null, 4);

	/**
	 * Executes the supplied function on each item in the list.  The
	 * function receives the value, the index, and the list itself as
	 * parameters (in that order).
	 *
	 * @method each
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 */

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

_yuitest_coverline("build/gallery-linkedlist/gallery-linkedlist.js", 710);
Y.LinkedList = LinkedList;


}, '@VERSION@', {"requires": ["gallery-iterable-extras"], "optional": ["gallery-funcprog"]});
