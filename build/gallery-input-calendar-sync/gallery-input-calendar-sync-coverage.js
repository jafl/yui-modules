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
_yuitest_coverage["build/gallery-input-calendar-sync/gallery-input-calendar-sync.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-input-calendar-sync/gallery-input-calendar-sync.js",
    code: []
};
_yuitest_coverage["build/gallery-input-calendar-sync/gallery-input-calendar-sync.js"].code=["YUI.add('gallery-input-calendar-sync', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-input-calendar-sync"," */","","/**********************************************************************"," * Plugin for an input field which syncs the value with a calendar."," * "," * @main gallery-input-calendar-sync"," * @class InputCalendarSync"," * @namespace Plugin"," * @extends Plugin.Base"," * @constructor"," * @param config {Object} configuration"," */","function InputCalendarSync(","	/* object */ config)","{","	InputCalendarSync.superclass.constructor.call(this, config);","}","","InputCalendarSync.NAME = \"InputCalendarSyncPlugin\";","InputCalendarSync.NS   = \"calendarSync\";","","InputCalendarSync.ATTRS =","{","	/**","	 * Calendar with which to sync.","	 * ","	 * @attribute calendar","	 * @type {Calendar}","	 * @required","	 */","	calendar:","	{","		validator: function(value)","		{","			return (value instanceof Y.Calendar);","		}","	},","","	/**","	 * Set to false to require a date to be entered.","	 *","	 * @attribute allowBlank","	 * @type {Boolean}","	 * @default true","	 */","	allowBlank:","	{","		value:     true,","		validator: Y.Lang.isBoolean","	}","};","","function syncFromInput()","{","	if (this.ignore_value_change)","	{","		return;","	}","","	var host  = this.get('host'),","		cal   = this.get('calendar'),","		value = Y.Lang.trim(host.get('value'));","","	if (value.length > 0)","	{","		try","		{","			this.ignore_selection_change = true;","","			var result = Y.DateTimeUtils.normalize(Y.DateTimeUtils.parseDate(value), {hour:0, minute:0});","			cal.deselectDates();	// hack for http://yuilibrary.com/projects/yui3/ticket/2530928","			cal.selectDates(result.date);","			cal.set('date', result.date);","		}","		catch (ex)","		{","		}","		finally","		{","			this.ignore_selection_change = false;","		}","","		privateSyncFromCalendar.call(this);","	}","	else if (!this.get('allowBlank'))","	{","		privateSyncFromCalendar.call(this);","	}","	else","	{","		cal.deselectDates();","	}","}","","function syncFromCalendar()","{","	if (!this.ignore_selection_change)","	{","		this.get('host').focus();	// make it compatible with valuechange event","		privateSyncFromCalendar.call(this);","	}","}","","function privateSyncFromCalendar()","{","	this.ignore_value_change = true;","","	var date = this.get('calendar').get('selectedDates')[0];","	this.get('host').set('value', Y.DateTimeUtils.formatDate(date));","","	this.ignore_value_change = false;","}","","Y.extend(InputCalendarSync, Y.Plugin.Base,","{","	initializer: function(config)","	{","		var host = this.get('host');","","		this.handle =","		[","			host.on('change', syncFromInput, this),","			host.on('valueSet', syncFromInput, this),","			this.get('calendar').on('selectionChange', syncFromCalendar, this)","		];","","		this.get('calendar').set('selectionMode', 'single');","","		syncFromInput.call(this);","	},","","	destructor: function()","	{","		this.change_handle.detach();","		this.set_handle.detach();","		this.cal_handle.detach();","	}","});","","Y.namespace(\"Plugin\");","Y.Plugin.InputCalendarSync = InputCalendarSync;","","","}, '@VERSION@', {","    \"requires\": [","        \"node-pluginhost\",","        \"plugin\",","        \"gallery-datetime-utils\",","        \"calendar\",","        \"gallery-node-event-set\"","    ]","});"];
_yuitest_coverage["build/gallery-input-calendar-sync/gallery-input-calendar-sync.js"].lines = {"1":0,"3":0,"19":0,"22":0,"25":0,"26":0,"28":0,"41":0,"59":0,"61":0,"63":0,"66":0,"70":0,"72":0,"74":0,"76":0,"77":0,"78":0,"79":0,"86":0,"89":0,"91":0,"93":0,"97":0,"101":0,"103":0,"105":0,"106":0,"110":0,"112":0,"114":0,"115":0,"117":0,"120":0,"124":0,"126":0,"133":0,"135":0,"140":0,"141":0,"142":0,"146":0,"147":0};
_yuitest_coverage["build/gallery-input-calendar-sync/gallery-input-calendar-sync.js"].functions = {"InputCalendarSync:19":0,"validator:39":0,"syncFromInput:59":0,"syncFromCalendar:101":0,"privateSyncFromCalendar:110":0,"initializer:122":0,"destructor:138":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-input-calendar-sync/gallery-input-calendar-sync.js"].coveredLines = 43;
_yuitest_coverage["build/gallery-input-calendar-sync/gallery-input-calendar-sync.js"].coveredFunctions = 8;
_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 1);
YUI.add('gallery-input-calendar-sync', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 3);
"use strict";

/**
 * @module gallery-input-calendar-sync
 */

/**********************************************************************
 * Plugin for an input field which syncs the value with a calendar.
 * 
 * @main gallery-input-calendar-sync
 * @class InputCalendarSync
 * @namespace Plugin
 * @extends Plugin.Base
 * @constructor
 * @param config {Object} configuration
 */
_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 19);
function InputCalendarSync(
	/* object */ config)
{
	_yuitest_coverfunc("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", "InputCalendarSync", 19);
_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 22);
InputCalendarSync.superclass.constructor.call(this, config);
}

_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 25);
InputCalendarSync.NAME = "InputCalendarSyncPlugin";
_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 26);
InputCalendarSync.NS   = "calendarSync";

_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 28);
InputCalendarSync.ATTRS =
{
	/**
	 * Calendar with which to sync.
	 * 
	 * @attribute calendar
	 * @type {Calendar}
	 * @required
	 */
	calendar:
	{
		validator: function(value)
		{
			_yuitest_coverfunc("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", "validator", 39);
_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 41);
return (value instanceof Y.Calendar);
		}
	},

	/**
	 * Set to false to require a date to be entered.
	 *
	 * @attribute allowBlank
	 * @type {Boolean}
	 * @default true
	 */
	allowBlank:
	{
		value:     true,
		validator: Y.Lang.isBoolean
	}
};

_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 59);
function syncFromInput()
{
	_yuitest_coverfunc("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", "syncFromInput", 59);
_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 61);
if (this.ignore_value_change)
	{
		_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 63);
return;
	}

	_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 66);
var host  = this.get('host'),
		cal   = this.get('calendar'),
		value = Y.Lang.trim(host.get('value'));

	_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 70);
if (value.length > 0)
	{
		_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 72);
try
		{
			_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 74);
this.ignore_selection_change = true;

			_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 76);
var result = Y.DateTimeUtils.normalize(Y.DateTimeUtils.parseDate(value), {hour:0, minute:0});
			_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 77);
cal.deselectDates();	// hack for http://yuilibrary.com/projects/yui3/ticket/2530928
			_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 78);
cal.selectDates(result.date);
			_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 79);
cal.set('date', result.date);
		}
		catch (ex)
		{
		}
		finally
		{
			_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 86);
this.ignore_selection_change = false;
		}

		_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 89);
privateSyncFromCalendar.call(this);
	}
	else {_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 91);
if (!this.get('allowBlank'))
	{
		_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 93);
privateSyncFromCalendar.call(this);
	}
	else
	{
		_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 97);
cal.deselectDates();
	}}
}

_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 101);
function syncFromCalendar()
{
	_yuitest_coverfunc("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", "syncFromCalendar", 101);
_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 103);
if (!this.ignore_selection_change)
	{
		_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 105);
this.get('host').focus();	// make it compatible with valuechange event
		_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 106);
privateSyncFromCalendar.call(this);
	}
}

_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 110);
function privateSyncFromCalendar()
{
	_yuitest_coverfunc("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", "privateSyncFromCalendar", 110);
_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 112);
this.ignore_value_change = true;

	_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 114);
var date = this.get('calendar').get('selectedDates')[0];
	_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 115);
this.get('host').set('value', Y.DateTimeUtils.formatDate(date));

	_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 117);
this.ignore_value_change = false;
}

_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 120);
Y.extend(InputCalendarSync, Y.Plugin.Base,
{
	initializer: function(config)
	{
		_yuitest_coverfunc("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", "initializer", 122);
_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 124);
var host = this.get('host');

		_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 126);
this.handle =
		[
			host.on('change', syncFromInput, this),
			host.on('valueSet', syncFromInput, this),
			this.get('calendar').on('selectionChange', syncFromCalendar, this)
		];

		_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 133);
this.get('calendar').set('selectionMode', 'single');

		_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 135);
syncFromInput.call(this);
	},

	destructor: function()
	{
		_yuitest_coverfunc("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", "destructor", 138);
_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 140);
this.change_handle.detach();
		_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 141);
this.set_handle.detach();
		_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 142);
this.cal_handle.detach();
	}
});

_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 146);
Y.namespace("Plugin");
_yuitest_coverline("build/gallery-input-calendar-sync/gallery-input-calendar-sync.js", 147);
Y.Plugin.InputCalendarSync = InputCalendarSync;


}, '@VERSION@', {
    "requires": [
        "node-pluginhost",
        "plugin",
        "gallery-datetime-utils",
        "calendar",
        "gallery-node-event-set"
    ]
});
