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
_yuitest_coverage["build/gallery-datetime-range/gallery-datetime-range.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-datetime-range/gallery-datetime-range.js",
    code: []
};
_yuitest_coverage["build/gallery-datetime-range/gallery-datetime-range.js"].code=["YUI.add('gallery-datetime-range', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-datetime-range"," */","","/**********************************************************************"," * Manages a pair of Y.DateTime instances.  The ending date is constrained"," * by the min, max, and blackout ranges configured on the startDateTime"," * instance.  The range is not allowed to span a blackout, so if the start"," * date is between two blackout ranges, then the end date must be after the"," * start date and before the start of the next blackout range."," * "," * @main gallery-datetime-range"," * @class DateTimeRange"," * @extends Base"," * @constructor"," * @param config {Object}"," */","","function DateTimeRange(config)","{","	DateTimeRange.superclass.constructor.apply(this, arguments);","}","","DateTimeRange.NAME = \"datetimerange\";","","function isDateTime(v)","{","	return (v instanceof Y.DateTime);","}","","DateTimeRange.ATTRS =","{","	/**","	 * Instance of `Y.DateTime` that stores the start time.  The min and","	 * max dates and any blackout ranges must be configured on this object.","	 * ","	 * @attribute startDateTime","	 * @type {DateTime}","	 * @required","	 * @writeonce","	 */","	startDateTime:","	{","		validator: isDateTime,","		writeOnce: true","	},","","	/**","	 * Instance of `Y.DateTime` that stores the end time.","	 * ","	 * @attribute endDateTime","	 * @type {DateTime}","	 * @required","	 * @writeonce","	 */","	endDateTime:","	{","		validator: isDateTime,","		writeOnce: true","	}","};","","function updateEndDateTime()","{","	var sdt = this.get('startDateTime'),","","		min_date_time = sdt.getDateTime() || sdt.get('minDateTime'),","		max_date_time = sdt.get('maxDateTime'),","","		min_t = min_date_time ? min_date_time.date.getTime() : 0,","		max_t = max_date_time ? max_date_time.date.getTime() : 0,","","		blackouts = sdt.get('blackouts').slice(0);","","	// adjust max_t based on blackouts","","	var found = false;","","	blackouts.push([max_t, max_t]);","	for (var i=blackouts.length-2; i>=0; i--)","	{","		if (blackouts[i][1] < min_t)","		{","			max_t = blackouts[i+1][0];","			found = true;","			break;","		}","	}","","	if (!found)","	{","		max_t = blackouts[0][0];","	}","","	// set min/max on endDateTime","","	var edt = this.get('endDateTime'),","		max = edt.get('maxDateTime');","","	if (!max || min_t < max.date.getTime())","	{","		edt.set('minDateTime', min_date_time);","		min_t = -1;","	}","","	edt.set('maxDateTime', max_t > 0 ? max_t : null);","","	if (min_t > 0)","	{","		edt.set('minDateTime', min_date_time);","	}","}","","Y.extend(DateTimeRange, Y.Base,","{","	initializer: function()","	{","		var self = this,","			sdt  = this.get('startDateTime');","","		var origSClearDateTime = sdt.clearDateTime;","		sdt.clearDateTime = function()","		{","			origSClearDateTime.apply(this, arguments);","			updateEndDateTime.call(self);","		};","","		// constraints","","		sdt.on('limitsEnforced', updateEndDateTime, this);","		sdt.on('minDateTimeChange', updateEndDateTime, this);","		sdt.on('maxDateTimeChange', updateEndDateTime, this);","		sdt.on('blackoutsChange', updateEndDateTime, this);","","		updateEndDateTime.call(this);","	}","});","","Y.DateTimeRange = DateTimeRange;","","","}, '@VERSION@', {\"requires\": [\"gallery-datetime\"]});"];
_yuitest_coverage["build/gallery-datetime-range/gallery-datetime-range.js"].lines = {"1":0,"3":0,"23":0,"25":0,"28":0,"30":0,"32":0,"35":0,"67":0,"69":0,"81":0,"83":0,"84":0,"86":0,"88":0,"89":0,"90":0,"94":0,"96":0,"101":0,"104":0,"106":0,"107":0,"110":0,"112":0,"114":0,"118":0,"122":0,"125":0,"126":0,"128":0,"129":0,"134":0,"135":0,"136":0,"137":0,"139":0,"143":0};
_yuitest_coverage["build/gallery-datetime-range/gallery-datetime-range.js"].functions = {"DateTimeRange:23":0,"isDateTime:30":0,"updateEndDateTime:67":0,"clearDateTime:126":0,"initializer:120":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-datetime-range/gallery-datetime-range.js"].coveredLines = 38;
_yuitest_coverage["build/gallery-datetime-range/gallery-datetime-range.js"].coveredFunctions = 6;
_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 1);
YUI.add('gallery-datetime-range', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-datetime-range/gallery-datetime-range.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 3);
"use strict";

/**
 * @module gallery-datetime-range
 */

/**********************************************************************
 * Manages a pair of Y.DateTime instances.  The ending date is constrained
 * by the min, max, and blackout ranges configured on the startDateTime
 * instance.  The range is not allowed to span a blackout, so if the start
 * date is between two blackout ranges, then the end date must be after the
 * start date and before the start of the next blackout range.
 * 
 * @main gallery-datetime-range
 * @class DateTimeRange
 * @extends Base
 * @constructor
 * @param config {Object}
 */

_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 23);
function DateTimeRange(config)
{
	_yuitest_coverfunc("build/gallery-datetime-range/gallery-datetime-range.js", "DateTimeRange", 23);
_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 25);
DateTimeRange.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 28);
DateTimeRange.NAME = "datetimerange";

_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 30);
function isDateTime(v)
{
	_yuitest_coverfunc("build/gallery-datetime-range/gallery-datetime-range.js", "isDateTime", 30);
_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 32);
return (v instanceof Y.DateTime);
}

_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 35);
DateTimeRange.ATTRS =
{
	/**
	 * Instance of `Y.DateTime` that stores the start time.  The min and
	 * max dates and any blackout ranges must be configured on this object.
	 * 
	 * @attribute startDateTime
	 * @type {DateTime}
	 * @required
	 * @writeonce
	 */
	startDateTime:
	{
		validator: isDateTime,
		writeOnce: true
	},

	/**
	 * Instance of `Y.DateTime` that stores the end time.
	 * 
	 * @attribute endDateTime
	 * @type {DateTime}
	 * @required
	 * @writeonce
	 */
	endDateTime:
	{
		validator: isDateTime,
		writeOnce: true
	}
};

_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 67);
function updateEndDateTime()
{
	_yuitest_coverfunc("build/gallery-datetime-range/gallery-datetime-range.js", "updateEndDateTime", 67);
_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 69);
var sdt = this.get('startDateTime'),

		min_date_time = sdt.getDateTime() || sdt.get('minDateTime'),
		max_date_time = sdt.get('maxDateTime'),

		min_t = min_date_time ? min_date_time.date.getTime() : 0,
		max_t = max_date_time ? max_date_time.date.getTime() : 0,

		blackouts = sdt.get('blackouts').slice(0);

	// adjust max_t based on blackouts

	_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 81);
var found = false;

	_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 83);
blackouts.push([max_t, max_t]);
	_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 84);
for (var i=blackouts.length-2; i>=0; i--)
	{
		_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 86);
if (blackouts[i][1] < min_t)
		{
			_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 88);
max_t = blackouts[i+1][0];
			_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 89);
found = true;
			_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 90);
break;
		}
	}

	_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 94);
if (!found)
	{
		_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 96);
max_t = blackouts[0][0];
	}

	// set min/max on endDateTime

	_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 101);
var edt = this.get('endDateTime'),
		max = edt.get('maxDateTime');

	_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 104);
if (!max || min_t < max.date.getTime())
	{
		_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 106);
edt.set('minDateTime', min_date_time);
		_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 107);
min_t = -1;
	}

	_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 110);
edt.set('maxDateTime', max_t > 0 ? max_t : null);

	_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 112);
if (min_t > 0)
	{
		_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 114);
edt.set('minDateTime', min_date_time);
	}
}

_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 118);
Y.extend(DateTimeRange, Y.Base,
{
	initializer: function()
	{
		_yuitest_coverfunc("build/gallery-datetime-range/gallery-datetime-range.js", "initializer", 120);
_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 122);
var self = this,
			sdt  = this.get('startDateTime');

		_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 125);
var origSClearDateTime = sdt.clearDateTime;
		_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 126);
sdt.clearDateTime = function()
		{
			_yuitest_coverfunc("build/gallery-datetime-range/gallery-datetime-range.js", "clearDateTime", 126);
_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 128);
origSClearDateTime.apply(this, arguments);
			_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 129);
updateEndDateTime.call(self);
		};

		// constraints

		_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 134);
sdt.on('limitsEnforced', updateEndDateTime, this);
		_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 135);
sdt.on('minDateTimeChange', updateEndDateTime, this);
		_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 136);
sdt.on('maxDateTimeChange', updateEndDateTime, this);
		_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 137);
sdt.on('blackoutsChange', updateEndDateTime, this);

		_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 139);
updateEndDateTime.call(this);
	}
});

_yuitest_coverline("build/gallery-datetime-range/gallery-datetime-range.js", 143);
Y.DateTimeRange = DateTimeRange;


}, '@VERSION@', {"requires": ["gallery-datetime"]});
