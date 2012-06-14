YUI.add('gallery-node-event-set', function(Y) {

"use strict";

/**
 * @module gallery-node-event-set
 */

/**********************************************************************
 * Patches Y.Node to provide "set" events for attributes and styles similar
 * to the "change" events provided by `Y.Attribute`.  Simply subscribe to
 * _attr_Set or _style_Set, e.g., valueSet, z-indexSet, or classSet.
 * 
 * IMPORTANT: "set" events will ONLY fire if changes are made through
 * Y.Node, NOT when directly operating on the DOM element.  Also NOT when a
 * different sandbox operates on a separate Y.Node instance for the same
 * element.
 * 
 * Note: The valuechange event provided by YUI captures all changes to the
 * element's value attribute, but only when the element has focus.
 * 
 * To minimize the performance impact, this module initially overrides only
 * Y.Node.on().  Patches are then applied to the appropriate functions on
 * individual instances when a "set" event is requested.
 * 
 * <dl>
 * <dt>set, setAttrs, setAttribute, setStyle, setStyles</dt>
 * <dd>Fires _attr_Set or _style_Set event with prevVal, newVal.</dd>
 * <dt>setData,clearData</dt>
 * <dd>Fires dataSet event with dataKey, prevVal, newVal.</dd>
 * <dt>addClass, removeClass, replaceClass</dt>
 * <dd>Fires classNameSet event with prevVal, newVal -- consistent with set('className', ...).  Also includes addedClass or removedClass, as appropriate.</dd>
 * <dt>setX, setY, setXY</dt>
 * <dd>Fires xySet event with prevVal and newVal defining x, y, or both.</dd>
 * 
 * @main gallery-node-event-set
 * @class Node~event-set
 */

function setValue(get, set, attr, val)
{
	var prev_val = get.call(this, attr);
	set.apply(this, Y.Array(arguments, 2));

	// always fire because type conversion is too complicated

	this.fire(attr + 'Set',
	{
		prevVal: prev_val,
		newVal:  val
	});
}

function setValues(get, set, map)
{
	var prev_map = {};
	Y.each(map, function(value, key)
	{
		prev_map[ key ] = get.call(this, key);
	},
	this);

	set.apply(this, Y.Array(arguments, 2));

	// always fire because type conversion is too complicated

	Y.each(map, function(value, key)
	{
		this.fire(key + 'Set',
		{
			prevVal: prev_map[ key ],
			newVal:  value
		});
	},
	this);
}

function patchSet()
{
	this._event_set_patched_set = true;

	this.set          = Y.bind(setValue,  this, this.get, this.set);
	this.setAttrs     = Y.bind(setValues, this, this.get, this.setAttrs);
	this.setAttribute = Y.bind(setValue,  this, this.getAttribute, this.setAttribute);
	this.setStyle     = Y.bind(setValue,  this, this.getStyle, this.setStyle);
	this.setStyles    = Y.bind(setValues, this, this.getStyle, this.setStyles);
}

function patchData()
{
	this._event_set_patched_data = true;

	var orig_setData = this.setData;
	this.setData = function(name, val)
	{
		if (arguments.length > 1)
		{
			var prev_val = this.getData(name);
		}
		else
		{
			var data_map = {};
			Y.each(this.getData(), function(value, key)
			{
				data_map[ key ] = { prevVal: value };
			});
		}

		orig_setData.apply(this, arguments);

		if (arguments.length > 1)
		{
			this.fire('dataSet',
			{
				dataKey: name,
				prevVal: prev_val,
				newVal:  val
			});
		}
		else
		{
			Y.each(name, function(value, key)
			{
				if (data_map[ key ])
				{
					data_map[ key ].newVal = value;
				}
				else
				{
					data_map[ key ] = { newVal: value };
				}
			});

			Y.each(data_map, function(value, key)
			{
				this.fire('dataSet',
				{
					dataKey: key,
					prevVal: value.prevVal,
					newVal:  value.newVal
				});
			},
			this);
		}
	};

	var orig_clearData = this.clearData;
	this.clearData = function(name)
	{
		if (name)
		{
			var prev_val = this.getData(name);
		}
		else
		{
			var prev_map = this.getData();
		}

		orig_clearData.apply(this, arguments);

		if (name)
		{
			this.fire('dataSet',
			{
				dataKey: name,
				prevVal: prev_val
			});
		}
		else
		{
			Y.each(prev_map, function(value, key)
			{
				this.fire('dataSet',
				{
					dataKey: key,
					prevVal: value
				});
			},
			this);
		}
	};
}

function patchClass()
{
	this._event_set_patched_class = true;

	var orig_addClass = this.addClass;
	this.addClass = function(className)
	{
		if (this.hasClass(className))
		{
			return;
		}

		var prev_class = this.get('className');
		orig_addClass.apply(this, arguments);

		if (!this._event_set_do_not_fire_add_remove_class)
		{
			this.fire('classNameSet',
			{
				prevVal:    prev_class,
				newVal:     this.get('className'),
				addedClass: className
			});
		}
	}

	var orig_removeClass = this.removeClass;
	this.removeClass = function(className)
	{
		if (!this.hasClass(className))
		{
			return;
		}

		var prev_class = this.get('className');
		orig_removeClass.apply(this, arguments);

		if (!this._event_set_do_not_fire_add_remove_class)
		{
			this.fire('classNameSet',
			{
				prevVal:      prev_class,
				newVal:       this.get('className'),
				removedClass: className
			});
		}
	}

	var orig_replaceClass = this.replaceClass;
	this.replaceClass = function(oldC, newC)
	{
		this._event_set_do_not_fire_add_remove_class = true;

		var prev_class = this.get('className'),
			had_class  = this.hasClass(oldC);

		orig_replaceClass.apply(this, arguments);

		var event =
		{
			prevVal:    prev_class,
			newVal:     this.get('className'),
			addedClass: newC
		};

		if (had_class)
		{
			event.removedClass = oldC;
		}
		this.fire('classNameSet', event);

		this._event_set_do_not_fire_add_remove_class = false;
	}
}

function setPos(set, xy)
{
	var prev_pt = this.getXY();
	set.apply(this, Y.Array(arguments, 1));

	this.fire('xySet',
	{
		prevVal: prev_pt,
		newVal:  this.getXY()
	});
}

function patchXY()
{
	this._event_set_patched_xy = true;

	this.setX  = Y.bind(setPos, this, this.setX);
	this.setY  = Y.bind(setPos, this, this.setY);
	this.setXY = Y.bind(setPos, this, this.setXY);
}

var orig_on = Y.Node.prototype.on;
Y.Node.prototype.on = function(type, fn, context)
{
	// manually check characters, because that is faster than a regexp

	if (type.length > 3 && type.charAt &&
		type.charAt(type.length-3) == 'S' &&
		type.charAt(type.length-2) == 'e' &&
		type.charAt(type.length-1) == 't')
	{
		if (type == 'dataSet')
		{
			if (!this._event_set_patched_data)
			{
				patchData.call(this);
			}
		}
		else if (type == 'classNameSet')
		{
			if (!this._event_set_patched_class)	// add/remove/replace class
			{
				patchClass.call(this);
			}

			if (!this._event_set_patched_set)	// set('className', ...)
			{
				patchSet.call(this);
			}
		}
		else if (type == 'xySet')
		{
			if (!this._event_set_patched_xy)
			{
				patchXY.call(this);
			}
		}
		else if (!this._event_set_patched_set)
		{
			patchSet.call(this);
		}

		this.publish(type,
		{
			emitFacade: true
		});
	}

	return orig_on.apply(this, arguments);
};


}, '@VERSION@' ,{requires:['node-base'], optional:['node-data','node-screen','node-style','event-custom-complex']});
