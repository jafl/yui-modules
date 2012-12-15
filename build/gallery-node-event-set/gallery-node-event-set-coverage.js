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
_yuitest_coverage["build/gallery-node-event-set/gallery-node-event-set.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-node-event-set/gallery-node-event-set.js",
    code: []
};
_yuitest_coverage["build/gallery-node-event-set/gallery-node-event-set.js"].code=["YUI.add('gallery-node-event-set', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-node-event-set"," */","","/**********************************************************************"," * Patches Y.Node to provide \"set\" events for attributes and styles similar"," * to the \"change\" events provided by `Y.Attribute`.  Simply subscribe to"," * _attr_Set or _style_Set, e.g., valueSet, z-indexSet, or classSet."," * "," * IMPORTANT: \"set\" events will ONLY fire if changes are made through"," * Y.Node, NOT when directly operating on the DOM element.  Also NOT when a"," * different sandbox operates on a separate Y.Node instance for the same"," * element."," * "," * Note: The valuechange event provided by YUI captures all changes to the"," * element's value attribute, but only when the element has focus."," * "," * To minimize the performance impact, this module initially overrides only"," * Y.Node.on().  Patches are then applied to the appropriate functions on"," * individual instances when a \"set\" event is requested."," * "," * <dl>"," * <dt>set, setAttrs, setAttribute, setStyle, setStyles</dt>"," * <dd>Fires _attr_Set or _style_Set event with prevVal, newVal.</dd>"," * <dt>setData,clearData</dt>"," * <dd>Fires dataSet event with dataKey, prevVal, newVal.</dd>"," * <dt>addClass, removeClass, replaceClass</dt>"," * <dd>Fires classNameSet event with prevVal, newVal -- consistent with set('className', ...).  Also includes addedClass or removedClass, as appropriate.</dd>"," * <dt>setX, setY, setXY</dt>"," * <dd>Fires xySet event with prevVal and newVal defining x, y, or both.</dd>"," * "," * @main gallery-node-event-set"," * @class Node~event-set"," */","","function setValue(get, set, attr, val)","{","	var prev_val = get.call(this, attr);","	set.apply(this, Y.Array(arguments, 2));","","	// always fire because type conversion is too complicated","","	this.fire(attr + 'Set',","	{","		prevVal: prev_val,","		newVal:  val","	});","}","","function setValues(get, set, map)","{","	var prev_map = {};","	Y.each(map, function(value, key)","	{","		prev_map[ key ] = get.call(this, key);","	},","	this);","","	set.apply(this, Y.Array(arguments, 2));","","	// always fire because type conversion is too complicated","","	Y.each(map, function(value, key)","	{","		this.fire(key + 'Set',","		{","			prevVal: prev_map[ key ],","			newVal:  value","		});","	},","	this);","}","","function patchSet()","{","	this._event_set_patched_set = true;","","	this.set          = Y.bind(setValue,  this, this.get, this.set);","	this.setAttrs     = Y.bind(setValues, this, this.get, this.setAttrs);","	this.setAttribute = Y.bind(setValue,  this, this.getAttribute, this.setAttribute);","	this.setStyle     = Y.bind(setValue,  this, this.getStyle, this.setStyle);","	this.setStyles    = Y.bind(setValues, this, this.getStyle, this.setStyles);","}","","function patchData()","{","	this._event_set_patched_data = true;","","	var orig_setData = this.setData;","	this.setData = function(name, val)","	{","		if (arguments.length > 1)","		{","			var prev_val = this.getData(name);","		}","		else","		{","			var data_map = {};","			Y.each(this.getData(), function(value, key)","			{","				data_map[ key ] = { prevVal: value };","			});","		}","","		orig_setData.apply(this, arguments);","","		if (arguments.length > 1)","		{","			this.fire('dataSet',","			{","				dataKey: name,","				prevVal: prev_val,","				newVal:  val","			});","		}","		else","		{","			Y.each(name, function(value, key)","			{","				if (data_map[ key ])","				{","					data_map[ key ].newVal = value;","				}","				else","				{","					data_map[ key ] = { newVal: value };","				}","			});","","			Y.each(data_map, function(value, key)","			{","				this.fire('dataSet',","				{","					dataKey: key,","					prevVal: value.prevVal,","					newVal:  value.newVal","				});","			},","			this);","		}","	};","","	var orig_clearData = this.clearData;","	this.clearData = function(name)","	{","		if (name)","		{","			var prev_val = this.getData(name);","		}","		else","		{","			var prev_map = this.getData();","		}","","		orig_clearData.apply(this, arguments);","","		if (name)","		{","			this.fire('dataSet',","			{","				dataKey: name,","				prevVal: prev_val","			});","		}","		else","		{","			Y.each(prev_map, function(value, key)","			{","				this.fire('dataSet',","				{","					dataKey: key,","					prevVal: value","				});","			},","			this);","		}","	};","}","","function patchClass()","{","	this._event_set_patched_class = true;","","	var orig_addClass = this.addClass;","	this.addClass = function(className)","	{","		if (this.hasClass(className))","		{","			return;","		}","","		var prev_class = this.get('className');","		orig_addClass.apply(this, arguments);","","		if (!this._event_set_do_not_fire_add_remove_class)","		{","			this.fire('classNameSet',","			{","				prevVal:    prev_class,","				newVal:     this.get('className'),","				addedClass: className","			});","		}","	}","","	var orig_removeClass = this.removeClass;","	this.removeClass = function(className)","	{","		if (!this.hasClass(className))","		{","			return;","		}","","		var prev_class = this.get('className');","		orig_removeClass.apply(this, arguments);","","		if (!this._event_set_do_not_fire_add_remove_class)","		{","			this.fire('classNameSet',","			{","				prevVal:      prev_class,","				newVal:       this.get('className'),","				removedClass: className","			});","		}","	}","","	var orig_replaceClass = this.replaceClass;","	this.replaceClass = function(oldC, newC)","	{","		this._event_set_do_not_fire_add_remove_class = true;","","		var prev_class = this.get('className'),","			had_class  = this.hasClass(oldC);","","		orig_replaceClass.apply(this, arguments);","","		var event =","		{","			prevVal:    prev_class,","			newVal:     this.get('className'),","			addedClass: newC","		};","","		if (had_class)","		{","			event.removedClass = oldC;","		}","		this.fire('classNameSet', event);","","		this._event_set_do_not_fire_add_remove_class = false;","	}","}","","function setPos(set, xy)","{","	var prev_pt = this.getXY();","	set.apply(this, Y.Array(arguments, 1));","","	this.fire('xySet',","	{","		prevVal: prev_pt,","		newVal:  this.getXY()","	});","}","","function patchXY()","{","	this._event_set_patched_xy = true;","","	this.setX  = Y.bind(setPos, this, this.setX);","	this.setY  = Y.bind(setPos, this, this.setY);","	this.setXY = Y.bind(setPos, this, this.setXY);","}","","var orig_on = Y.Node.prototype.on;","Y.Node.prototype.on = function(type, fn, context)","{","	// manually check characters, because that is faster than a regexp","","	if (type.length > 3 && type.charAt &&","		type.charAt(type.length-3) == 'S' &&","		type.charAt(type.length-2) == 'e' &&","		type.charAt(type.length-1) == 't')","	{","		if (type == 'dataSet')","		{","			if (!this._event_set_patched_data)","			{","				patchData.call(this);","			}","		}","		else if (type == 'classNameSet')","		{","			if (!this._event_set_patched_class)	// add/remove/replace class","			{","				patchClass.call(this);","			}","","			if (!this._event_set_patched_set)	// set('className', ...)","			{","				patchSet.call(this);","			}","		}","		else if (type == 'xySet')","		{","			if (!this._event_set_patched_xy)","			{","				patchXY.call(this);","			}","		}","		else if (!this._event_set_patched_set)","		{","			patchSet.call(this);","		}","","		this.publish(type,","		{","			emitFacade: true","		});","	}","","	return orig_on.apply(this, arguments);","};","","","}, '@VERSION@', {","    \"requires\": [","        \"node-base\"","    ],","    \"optional\": [","        \"node-data\",","        \"node-screen\",","        \"node-style\",","        \"event-custom-complex\"","    ]","});"];
_yuitest_coverage["build/gallery-node-event-set/gallery-node-event-set.js"].lines = {"1":0,"3":0,"40":0,"42":0,"43":0,"47":0,"54":0,"56":0,"57":0,"59":0,"63":0,"67":0,"69":0,"78":0,"80":0,"82":0,"83":0,"84":0,"85":0,"86":0,"89":0,"91":0,"93":0,"94":0,"96":0,"98":0,"102":0,"103":0,"105":0,"109":0,"111":0,"113":0,"122":0,"124":0,"126":0,"130":0,"134":0,"136":0,"147":0,"148":0,"150":0,"152":0,"156":0,"159":0,"161":0,"163":0,"171":0,"173":0,"184":0,"186":0,"188":0,"189":0,"191":0,"193":0,"196":0,"197":0,"199":0,"201":0,"210":0,"211":0,"213":0,"215":0,"218":0,"219":0,"221":0,"223":0,"232":0,"233":0,"235":0,"237":0,"240":0,"242":0,"249":0,"251":0,"253":0,"255":0,"259":0,"261":0,"262":0,"264":0,"271":0,"273":0,"275":0,"276":0,"277":0,"280":0,"281":0,"285":0,"290":0,"292":0,"294":0,"297":0,"299":0,"301":0,"304":0,"306":0,"309":0,"311":0,"313":0,"316":0,"318":0,"321":0,"327":0};
_yuitest_coverage["build/gallery-node-event-set/gallery-node-event-set.js"].functions = {"setValue:40":0,"(anonymous 2):57":0,"(anonymous 3):67":0,"setValues:54":0,"patchSet:78":0,"(anonymous 4):103":0,"(anonymous 5):122":0,"(anonymous 6):134":0,"setData:94":0,"(anonymous 7):171":0,"clearData:148":0,"patchData:89":0,"addClass:189":0,"removeClass:211":0,"replaceClass:233":0,"patchClass:184":0,"setPos:259":0,"patchXY:271":0,"on:281":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-node-event-set/gallery-node-event-set.js"].coveredLines = 103;
_yuitest_coverage["build/gallery-node-event-set/gallery-node-event-set.js"].coveredFunctions = 20;
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 1);
YUI.add('gallery-node-event-set', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 3);
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

_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 40);
function setValue(get, set, attr, val)
{
	_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "setValue", 40);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 42);
var prev_val = get.call(this, attr);
	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 43);
set.apply(this, Y.Array(arguments, 2));

	// always fire because type conversion is too complicated

	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 47);
this.fire(attr + 'Set',
	{
		prevVal: prev_val,
		newVal:  val
	});
}

_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 54);
function setValues(get, set, map)
{
	_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "setValues", 54);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 56);
var prev_map = {};
	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 57);
Y.each(map, function(value, key)
	{
		_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "(anonymous 2)", 57);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 59);
prev_map[ key ] = get.call(this, key);
	},
	this);

	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 63);
set.apply(this, Y.Array(arguments, 2));

	// always fire because type conversion is too complicated

	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 67);
Y.each(map, function(value, key)
	{
		_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "(anonymous 3)", 67);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 69);
this.fire(key + 'Set',
		{
			prevVal: prev_map[ key ],
			newVal:  value
		});
	},
	this);
}

_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 78);
function patchSet()
{
	_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "patchSet", 78);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 80);
this._event_set_patched_set = true;

	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 82);
this.set          = Y.bind(setValue,  this, this.get, this.set);
	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 83);
this.setAttrs     = Y.bind(setValues, this, this.get, this.setAttrs);
	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 84);
this.setAttribute = Y.bind(setValue,  this, this.getAttribute, this.setAttribute);
	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 85);
this.setStyle     = Y.bind(setValue,  this, this.getStyle, this.setStyle);
	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 86);
this.setStyles    = Y.bind(setValues, this, this.getStyle, this.setStyles);
}

_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 89);
function patchData()
{
	_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "patchData", 89);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 91);
this._event_set_patched_data = true;

	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 93);
var orig_setData = this.setData;
	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 94);
this.setData = function(name, val)
	{
		_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "setData", 94);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 96);
if (arguments.length > 1)
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 98);
var prev_val = this.getData(name);
		}
		else
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 102);
var data_map = {};
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 103);
Y.each(this.getData(), function(value, key)
			{
				_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "(anonymous 4)", 103);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 105);
data_map[ key ] = { prevVal: value };
			});
		}

		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 109);
orig_setData.apply(this, arguments);

		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 111);
if (arguments.length > 1)
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 113);
this.fire('dataSet',
			{
				dataKey: name,
				prevVal: prev_val,
				newVal:  val
			});
		}
		else
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 122);
Y.each(name, function(value, key)
			{
				_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "(anonymous 5)", 122);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 124);
if (data_map[ key ])
				{
					_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 126);
data_map[ key ].newVal = value;
				}
				else
				{
					_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 130);
data_map[ key ] = { newVal: value };
				}
			});

			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 134);
Y.each(data_map, function(value, key)
			{
				_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "(anonymous 6)", 134);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 136);
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

	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 147);
var orig_clearData = this.clearData;
	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 148);
this.clearData = function(name)
	{
		_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "clearData", 148);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 150);
if (name)
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 152);
var prev_val = this.getData(name);
		}
		else
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 156);
var prev_map = this.getData();
		}

		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 159);
orig_clearData.apply(this, arguments);

		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 161);
if (name)
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 163);
this.fire('dataSet',
			{
				dataKey: name,
				prevVal: prev_val
			});
		}
		else
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 171);
Y.each(prev_map, function(value, key)
			{
				_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "(anonymous 7)", 171);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 173);
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

_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 184);
function patchClass()
{
	_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "patchClass", 184);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 186);
this._event_set_patched_class = true;

	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 188);
var orig_addClass = this.addClass;
	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 189);
this.addClass = function(className)
	{
		_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "addClass", 189);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 191);
if (this.hasClass(className))
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 193);
return;
		}

		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 196);
var prev_class = this.get('className');
		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 197);
orig_addClass.apply(this, arguments);

		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 199);
if (!this._event_set_do_not_fire_add_remove_class)
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 201);
this.fire('classNameSet',
			{
				prevVal:    prev_class,
				newVal:     this.get('className'),
				addedClass: className
			});
		}
	}

	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 210);
var orig_removeClass = this.removeClass;
	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 211);
this.removeClass = function(className)
	{
		_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "removeClass", 211);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 213);
if (!this.hasClass(className))
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 215);
return;
		}

		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 218);
var prev_class = this.get('className');
		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 219);
orig_removeClass.apply(this, arguments);

		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 221);
if (!this._event_set_do_not_fire_add_remove_class)
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 223);
this.fire('classNameSet',
			{
				prevVal:      prev_class,
				newVal:       this.get('className'),
				removedClass: className
			});
		}
	}

	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 232);
var orig_replaceClass = this.replaceClass;
	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 233);
this.replaceClass = function(oldC, newC)
	{
		_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "replaceClass", 233);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 235);
this._event_set_do_not_fire_add_remove_class = true;

		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 237);
var prev_class = this.get('className'),
			had_class  = this.hasClass(oldC);

		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 240);
orig_replaceClass.apply(this, arguments);

		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 242);
var event =
		{
			prevVal:    prev_class,
			newVal:     this.get('className'),
			addedClass: newC
		};

		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 249);
if (had_class)
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 251);
event.removedClass = oldC;
		}
		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 253);
this.fire('classNameSet', event);

		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 255);
this._event_set_do_not_fire_add_remove_class = false;
	}
}

_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 259);
function setPos(set, xy)
{
	_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "setPos", 259);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 261);
var prev_pt = this.getXY();
	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 262);
set.apply(this, Y.Array(arguments, 1));

	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 264);
this.fire('xySet',
	{
		prevVal: prev_pt,
		newVal:  this.getXY()
	});
}

_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 271);
function patchXY()
{
	_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "patchXY", 271);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 273);
this._event_set_patched_xy = true;

	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 275);
this.setX  = Y.bind(setPos, this, this.setX);
	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 276);
this.setY  = Y.bind(setPos, this, this.setY);
	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 277);
this.setXY = Y.bind(setPos, this, this.setXY);
}

_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 280);
var orig_on = Y.Node.prototype.on;
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 281);
Y.Node.prototype.on = function(type, fn, context)
{
	// manually check characters, because that is faster than a regexp

	_yuitest_coverfunc("build/gallery-node-event-set/gallery-node-event-set.js", "on", 281);
_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 285);
if (type.length > 3 && type.charAt &&
		type.charAt(type.length-3) == 'S' &&
		type.charAt(type.length-2) == 'e' &&
		type.charAt(type.length-1) == 't')
	{
		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 290);
if (type == 'dataSet')
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 292);
if (!this._event_set_patched_data)
			{
				_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 294);
patchData.call(this);
			}
		}
		else {_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 297);
if (type == 'classNameSet')
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 299);
if (!this._event_set_patched_class)	// add/remove/replace class
			{
				_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 301);
patchClass.call(this);
			}

			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 304);
if (!this._event_set_patched_set)	// set('className', ...)
			{
				_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 306);
patchSet.call(this);
			}
		}
		else {_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 309);
if (type == 'xySet')
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 311);
if (!this._event_set_patched_xy)
			{
				_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 313);
patchXY.call(this);
			}
		}
		else {_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 316);
if (!this._event_set_patched_set)
		{
			_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 318);
patchSet.call(this);
		}}}}

		_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 321);
this.publish(type,
		{
			emitFacade: true
		});
	}

	_yuitest_coverline("build/gallery-node-event-set/gallery-node-event-set.js", 327);
return orig_on.apply(this, arguments);
};


}, '@VERSION@', {
    "requires": [
        "node-base"
    ],
    "optional": [
        "node-data",
        "node-screen",
        "node-style",
        "event-custom-complex"
    ]
});
