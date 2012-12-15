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
_yuitest_coverage["build/gallery-datetime/gallery-datetime.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-datetime/gallery-datetime.js",
    code: []
};
_yuitest_coverage["build/gallery-datetime/gallery-datetime.js"].code=["YUI.add('gallery-datetime', function (Y, NAME) {","","\"use strict\";","","var blackout_min_seconds = -40,","	blackout_max_seconds = +40,","	change_after_focus   = (0 < Y.UA.ie);","","/**"," * @module gallery-datetime"," */","","/**********************************************************************"," * Manages a date input field and an optional time field.  Calendars and"," * time selection widgets can be attached to these fields, but will not be"," * managed by this class."," * "," * Date/time values can be specified as either a Date object or an object"," * specifying year,month,day (all 1-based) or date_str and optionally"," * hour,minute or time_str.  Individual values take precedence over string"," * values.  Time resolution is in minutes."," * "," * @main gallery-datetime"," * @class DateTime"," * @extends Widget"," * @constructor"," * @param config {Object}"," */","","function DateTime(config)","{","	DateTime.superclass.constructor.apply(this, arguments);","}","","DateTime.NAME = \"datetime\";","","function isInputNode(n)","{","	// allow Y.Node from a different sandbox","	return n && n._node && n._node.tagName == 'INPUT';","}","","DateTime.ATTRS =","{","	/**","	 * Date input field to use.  Can be augmented with a Calendar via","	 * gallery-input-calendar-sync.","	 * ","	 * @attribute dateInput","	 * @type {Node}","	 * @required","	 * @writeonce","	 */","	dateInput:","	{","		validator: isInputNode,","		writeOnce: true","	},","","	/**","	 * Time input field to use.  Can be enhanced with gallery-timepicker.","	 * ","	 * @attribute timeInput","	 * @type {Node}","	 * @writeonce","	 */","	timeInput:","	{","		validator: isInputNode,","		writeOnce: true","	},","","	/**","	 * Default date and time, used during initialization and by resetDateTime().","	 * ","	 * @attribute defaultDateTime","	 * @type {Object}","	 */","	defaultDateTime:","	{","		setter: function(value)","		{","			return value ? Y.DateTimeUtils.normalize(value, this.get('blankTime')) : null;","		}","	},","","	/**","	 * Minimum date and time.","	 * ","	 * @attribute minDateTime","	 * @type {Object}","	 */","	minDateTime:","	{","		setter: function(value)","		{","			return value ? Y.DateTimeUtils.normalize(value, this.get('blankTime')) : null;","		}","	},","","	/**","	 * Maximum date and time.","	 * ","	 * @attribute minDateTime","	 * @type {Object}","	 */","	maxDateTime:","	{","		setter: function(value)","		{","			return value ? Y.DateTimeUtils.normalize(value, this.get('blankTime')) : null;","		}","	},","","	/**","	 * Time value to use when no time is specified, e.g., in a blackout date.","	 * ","	 * @attribute blankTime","	 * @type {Object}","	 * @default { hour:0, minute:0 }","	 */","	blankTime:","	{","		value:     { hour:0, minute:0 },","		validator: function(value)","		{","			return (Y.Lang.isObject(value) &&","					Y.Lang.isNumber(value.hour) &&","					Y.Lang.isNumber(value.minute));","		}","	},","","	/**","	 * Blackout ranges, specified as a list of objects, each defining start","	 * and end.","	 * ","	 * @attribute blackout","	 * @type {Array}","	 * @default []","	 */","	blackouts:","	{","		value:     [],","		validator: Y.Lang.isArray,","		setter:    function(ranges)","		{","			// store ranges in ascending order of start time","","			var blackout   = [],","				blank_time = this.get('blankTime');","			for (var i=0; i<ranges.length; i++)","			{","				var r   = ranges[i];","				r.start = Y.DateTimeUtils.normalize(r.start, blank_time);","				r.end   = Y.DateTimeUtils.normalize(r.end,   blank_time);","","				r =","				[","					new Date(r.start.year, r.start.month-1, r.start.day,","							 r.start.hour, r.start.minute, blackout_min_seconds)","							 .getTime(),","					new Date(r.end.year, r.end.month-1, r.end.day,","							 r.end.hour, r.end.minute, blackout_max_seconds)","							 .getTime()","				];","","				var inserted = false;","				for (var j=0; j<blackout.length; j++)","				{","					var r1 = blackout[j];","					if (r[0] <= r1[0])","					{","						if (j > 0 &&","							r[0] <  blackout[j-1][1] &&","							r[1] <= blackout[j-1][1])","						{","							// covered by prev","						}","						else if (j > 0 &&","								 r[0] - 60000 < blackout[j-1][1] &&","								 r1[0] < r[1] + 60000)","						{","							// overlaps prev and next","							r = [ blackout[j-1][0], r[1] ];","							blackout.splice(j-1, 2, r);","						}","						else if (j > 0 &&","								 r[0] - 60000 < blackout[j-1][1])","						{","							// overlaps prev","							blackout[j-1][1] = r[1];","						}","						else if (r1[0] < r[1] + 60000)","						{","							// overlaps next","							r1[0] = r[0];","						}","						else","						{","							blackout.splice(j, 0, r);","						}","						inserted = true;","						break;","					}","				}","","				// j == blackout.length","","				if (!inserted && j > 0 &&","					r[0] <  blackout[j-1][1] &&","					r[1] <= blackout[j-1][1])","				{","					// covered by prev","				}","				else if (!inserted && j > 0 &&","						 r[0] - 60000 < blackout[j-1][1])","				{","					// overlaps prev","					blackout[j-1][1] = r[1];","				}","				else if (!inserted)","				{","					blackout.push(r);","				}","			}","","			return blackout;","		}","	},","","	/**","	 * The direction to push the selected date and time when the user","	 * selects a day with partial blackout.","	 *","	 * @attribute blackoutSnapDirection","	 * @type {-1,+1}","	 * @default +1","	 */","	blackoutSnapDirection:","	{","		'default': +1,","		validator: function(value)","		{","			return (value == -1 || value == +1);","		}","	},","","	/**","	 * Duration of visual ping in milliseconds when the value of an input","	 * field is modified because of a min/max or blackout restriction.  Set","	 * to zero to disable.","	 * ","	 * @attribute pingDuration","	 * @type {Number}","	 * @default 2","	 */","	pingDuration:","	{","		value:     2,","		validator: Y.Lang.isNumber","	},","","	/**","	 * CSS class applied to input field when it is pinged.","	 * ","	 * @attribute pingClass","	 * @type {String}","	 * @default \"yui3-datetime-ping\"","	 */","	pingClass:","	{","		value:     'yui3-datetime-ping',","		validator: Y.Lang.isString","	}","};","","/**"," * @event limitsEnforced"," * @description Fires after min/max and blackouts have been enforced."," */","","function checkEnforceDateTimeLimits()","{","	if (!this.ignore_value_set)","	{","		enforceDateTimeLimits.call(this, 'same-day');","	}","}","","function enforceDateTimeLimits(","	/* string */	algo)","{","	var date = this.getDateTime();","	if (!date)","	{","		return;","	}","	date = date.date;","","	var orig_date = new Date(date.getTime());","","	// blackout ranges","","	if (this.blackout.length > 0)","	{","		var t      = date.getTime(),","			orig_t = t,","			snap   = this.get('blackoutSnapDirection');","","		for (var i=0; i<this.blackout.length; i++)","		{","			var blackout = this.blackout[i];","			if (blackout[0] < t && t < blackout[1])","			{","				if (snap > 0)","				{","					t = blackout[1] + 60000;","				}","				else","				{","					t = blackout[0];","				}","","				if (algo == 'same-day')","				{","					var tmp = new Date(t);","					if (tmp.getDate()     != date.getDate()  ||","						tmp.getMonth()    != date.getMonth() ||","						tmp.getFullYear() != date.getFullYear())","					{","						t = snap > 0 ? blackout[0] : blackout[1] + 60000;","					}","				}","","				break;","			}","		}","","		if (t != orig_t)","		{","			date = new Date(t);","		}","	}","","	// min/max last, shrink inward if blackout dates extend outside [min,max] range","","	var min = this.get('minDateTime');","	if (min)","	{","		var t = this.min.date.getTime();","","		if (this.blackout.length > 0)","		{","			var orig_t = t;","			var i      = 0;","			while (i < this.blackout.length && this.blackout[i][0] < t)","			{","				t = Math.max(orig_t, this.blackout[i][1]);","				i++;","			}","		}","","		if (date.getTime() < t)","		{","			date = new Date(t);","		}","	}","","	var max = this.get('maxDateTime');","	if (max)","	{","		var t = this.max.date.getTime();","","		if (this.blackout.length > 0)","		{","			var orig_t = t;","			var i      = this.blackout.length - 1;","			while (i >= 0 && t < this.blackout[i][1])","			{","				t = Math.min(orig_t, this.blackout[i][0]);","				i--;","			}","		}","","		if (t < date.getTime())","		{","			date = new Date(t);","		}","	}","","	// update controls that changed","","	this.ignore_value_set = true;","","	if (date.getFullYear() !== orig_date.getFullYear() ||","		date.getMonth()    !== orig_date.getMonth()    ||","		date.getDate()     !== orig_date.getDate())","	{","		this.get('dateInput').set('value', Y.DateTimeUtils.formatDate(date));","		this.get('timeInput').set('value', Y.DateTimeUtils.formatTime(date));","		ping.call(this, 'dateInput', 'timeInput');","	}","	else if (date.getHours() !== orig_date.getHours() ||","			 date.getMinutes() !== orig_date.getMinutes())","	{","		this.get('timeInput').set('value', Y.DateTimeUtils.formatTime(date));","		ping.apply(this, 'timeInput');","	}","","	this.ignore_value_set = false;","","	this.fire('limitsEnforced');","}","","function updateRendering()","{","	return;","","	if (this.disabled)","	{","		return;","	}","","	this.calendar.calendar.removeRenderers();","","	var blackouts = this.blackout.slice(0);","","	if (this.min_date_time)","	{","		if (blackouts.length > 0)","		{","			var t       = this.min_date_time.date.getTime();","			var changed = false;","			for (var i=0; i < blackouts.length; i++)","			{","				var blackout = blackouts[i];","				if (blackout[1] <= t)","				{","					blackouts.shift();","					i--;","				}","				else if (blackout[0] < t)","				{","					var start = new Date(blackout[0]);","					start.setHours(0);","					start.setMinutes(0);","					start.setSeconds(blackout_min_seconds);","					blackouts[i] = [ start.getTime(), blackout[1] ];","					changed      = true;","					break;","				}","			}","		}","","		if (!changed &&","			(this.min_date_time.hour > 0 || this.min_date_time.minute > 0))","		{","			this.calendar.calendar.addRenderer(","				DateTime.formatDate(this.min_date_time.date),","				cellRenderer('satg-partial-blackout'));","		}","	}","","	if (this.max_date_time)","	{","		if (blackouts.length > 0)","		{","			var t       = this.max_date_time.date.getTime();","			var changed = false;","			for (var i=blackouts.length-1; i>=0; i--)","			{","				var blackout = blackouts[i];","				if (t <= blackout[0])","				{","					blackouts.pop();","				}","				else if (t < blackout[1])","				{","					var end = new Date(blackout[1]);","					end.setHours(23);","					end.setMinutes(59);","					end.setSeconds(blackout_max_seconds);","					blackouts[i] = [ blackout[0], end.getTime() ];","					changed      = true;","					break;","				}","			}","		}","","		if (!changed &&","			(this.max_date_time.hour < 23 || this.max_date_time.minute < 59))","		{","			this.calendar.calendar.addRenderer(","				DateTime.formatDate(this.max_date_time.date),","				cellRenderer('satg-partial-blackout'));","		}","	}","","	for (var i=0; i<blackouts.length; i++)","	{","		var blackout = blackouts[i];","		var start    = new Date(blackout[0] + blackout_max_seconds*1000);","		var end      = new Date(blackout[1] + blackout_min_seconds*1000);","","		if (start.getHours() > 0 || start.getMinutes() > 0)","		{","			this.calendar.calendar.addRenderer(","				DateTime.formatDate(start),","				cellRenderer('satg-partial-blackout'));","			start.setDate(start.getDate()+1);","			start.setHours(0);","		}","","		if (end.getHours() < 23 || end.getMinutes() < 59)","		{","			this.calendar.calendar.addRenderer(","				DateTime.formatDate(end),","				cellRenderer('satg-partial-blackout'));","			end.setDate(end.getDate()-1);","			end.setHours(23);","		}","","		if (start.getTime() < end.getTime())","		{","			var s = DateTime.formatDate(start),","				e = DateTime.formatDate(end);","			if (s != e)","			{","				s += YAHOO.SATG.Locale.Calendar.YUI_DATE_RANGE_DELIMITER + e;","			}","","			this.calendar.calendar.addRenderer(","				s, this.calendar.calendar.renderOutOfBoundsDate);","		}","	}","","	this.calendar.render();","}","","function cellRenderer(","	/* string */ css)","{","	return function(date, cell)","	{","		Dom.addClass(cell, css);","	};","}","function ping()","{","	var duration = this.get('pingDuration');","	if (duration <= 0)","	{","		return;","	}","","	var nodes = new Y.NodeList(Y.reduce(arguments, [], function(list, name)","	{","		list.push(this.get(name));","		return list;","	}));","","	var ping_class = this.get('pingClass');","	if (this.ping_task)","	{","		this.ping_task.nodes.removeClass(ping_class);","		this.ping_task.cancel();","		nodes = nodes.concat(this.ping_task.nodes);","	}","","	nodes.addClass(ping_class);","","	this.ping_task = Y.later(this.get('pingDuration'), this, function()","	{","		this.ping_task = null;","		nodes.removeClass(ping_class);","	});","","	this.ping_task.nodes = nodes;","}","","Y.extend(DateTime, Y.Base,","{","	initializer: function(","		/* object/string */	container,","		/* map */			config)","	{","		var date_input = this.get('dateInput');","		date_input.on('change', enforceDateTimeLimits, this);","		date_input.after('valueSet', checkEnforceDateTimeLimits, this);","","		var time_input = this.get('timeInput');","		if (time_input)","		{","			time_input.on('change', enforceDateTimeLimits, this);","			time_input.after('valueSet', checkEnforceDateTimeLimits, this);","		}","		else","		{","			time_input = Y.Node.create('<input type=\"hidden\"></input>');","			this.set('timeInput', time_input);","		}","","		var default_date_time = this.get('defaultDateTime');","		if (default_date_time)","		{","			date_input.set('value', Y.DateTimeUtils.formatDate(default_date_time));","			time_input.set('value', Y.DateTimeUtils.formatTime(default_date_time));","		}","","		if (date_input.calendarSync)","		{","			this.calendar = date_input.calendarSync.get('calendar');","","			if (this.calendar && default_date_time)","			{","				this.calendar.set('date', default_date_time.date);","			}","","			var t = this.get('minDateTime');","			if (this.calendar && t)","			{","				this.calendar.set('minimumDate', t.date);","			}","","			t = this.get('maxDateTime');","			if (this.calendar && t)","			{","				this.calendar.set('maximumDate', t.date);","			}","		}","","		// black-out dates","","		updateRendering.call(this);","		this.on('blackoutsChange', updateRendering);","	},","","	destroy: function()","	{","	},","","	/**","	 * Get the currently selected date and time.","	 * ","	 * @return {Object} year,month,day,hour,minute,date,date_str,time_str","	 */","	getDateTime: function()","	{","		try","		{","			var date = Y.DateTimeUtils.parseDate(this.get('dateInput').get('value'));","			if (!date)","			{","				return false;","			}","		}","		catch (e)","		{","			return false;","		}","","		var time_input = this.get('timeInput');","		if (time_input)","		{","			try","			{","				var time = Y.DateTimeUtils.parseTime(time_input.get('value'));","				if (!time)","				{","					return false;","				}","			}","			catch (e)","			{","				return false;","			}","		}","		else","		{","			var time = this.get('blankTime');","		}","","		var result      = Y.DateTimeUtils.normalize(Y.mix(date, time));","		result.date_str = Y.DateTimeUtils.formatDate(result);","		result.time_str = Y.DateTimeUtils.formatTime(result);","		return result;","	},","// TODO","	setDateTime: function(","		/* object */	date_time)","	{","		this.rb[ this.rb.length-1 ].checked = true;","","		this.calendar.setDate(date_time);","","		if (date_time instanceof Date)","		{","			this.hour_menu.value   = date_time.getHours();","			this.minute_menu.value = date_time.getMinutes();","		}","		else if (date_time.time_str)","		{","			var obj                = DateTime.parseTime(date_time.time_str);","			this.hour_menu.value   = obj.hour;","			this.minute_menu.value = obj.minute;","		}","		else","		{","			this.hour_menu.value   = date_time.hour;","			this.minute_menu.value = date_time.minute;","		}","","		enforceDateTimeLimits.call(this);","	},","// TODO","	resetDateTime: function()","	{","		if (this.default_date_time)","		{","			this.ignore_value_set = true;","			this.calendar.setDate(this.default_date_time);","			this.ignore_value_set = false;","","			this.hour_menu.value   = this.default_date_time.hour;","			this.minute_menu.value = this.default_date_time.minute;","		}","		else","		{","			this.calendar.clearDate();","","			this.hour_menu.value   = this.blank_time.hour;","			this.minute_menu.value = this.blank_time.minute;","		}","","		enforceDateTimeLimits.call(this);","	},","","	clearDateTime: function()","	{","		this.get('dateInput').set('value', '');","","		var time_input = this.get('timeInput');","		if (time_input)","		{","			time_input.set('value', '');","		}","	},","// TODO: onMinDateTimeChange","	setMinDateTime: function(","		/* object */	min)","	{","		if (min)","		{","			min = Y.DateTimeUtils.normalize(min, this.blank_time);","","			if (!this.min_date_time ||","				this.min_date_time.date.getTime() != min.date.getTime())","			{","				this.min_date_time = min;","				enforceDateTimeLimits.call(this);","				this.calendar.setMinDate(this.min_date_time);","","				updateRendering.call(this);","			}","		}","		else if (this.min_date_time)","		{","			this.min_date_time = null;","			this.calendar.clearMinDate();","			updateRendering.call(this);","		}","	},","// TODO: onMaxDateTimeChange","	setMaxDateTime: function(","		/* object */	max)","	{","		if (max)","		{","			max = Y.DateTimeUtils.normalize(max, this.blank_time);","","			if (!this.max_date_time ||","				this.max_date_time.date.getTime() != max.date.getTime())","			{","				this.max_date_time = max;","				enforceDateTimeLimits.call(this);","				this.calendar.setMaxDate(this.max_date_time);","","				updateRendering.call(this);","			}","		}","		else if (this.max_date_time)","		{","			this.max_date_time = null;","			this.calendar.clearMaxDate();","			updateRendering.call(this);","		}","	}","});","","","}, '@VERSION@', {","    \"requires\": [","        \"gallery-datetime-utils\",","        \"gallery-funcprog\"","    ],","    \"optional\": [","        \"calendar\",","        \"gallery-timepicker\"","    ]","});"];
_yuitest_coverage["build/gallery-datetime/gallery-datetime.js"].lines = {"1":0,"3":0,"5":0,"30":0,"32":0,"35":0,"37":0,"40":0,"43":0,"83":0,"97":0,"111":0,"127":0,"149":0,"151":0,"153":0,"154":0,"155":0,"157":0,"167":0,"168":0,"170":0,"171":0,"173":0,"179":0,"184":0,"185":0,"187":0,"191":0,"193":0,"196":0,"200":0,"202":0,"203":0,"209":0,"215":0,"219":0,"221":0,"223":0,"227":0,"244":0,"282":0,"284":0,"286":0,"290":0,"293":0,"294":0,"296":0,"298":0,"300":0,"304":0,"306":0,"310":0,"312":0,"313":0,"315":0,"317":0,"321":0,"324":0,"326":0,"327":0,"331":0,"335":0,"339":0,"341":0,"347":0,"348":0,"350":0,"352":0,"354":0,"355":0,"356":0,"358":0,"359":0,"363":0,"365":0,"369":0,"370":0,"372":0,"374":0,"376":0,"377":0,"378":0,"380":0,"381":0,"385":0,"387":0,"393":0,"395":0,"399":0,"400":0,"401":0,"403":0,"406":0,"407":0,"410":0,"412":0,"415":0,"417":0,"419":0,"421":0,"424":0,"426":0,"428":0,"430":0,"432":0,"433":0,"434":0,"436":0,"437":0,"439":0,"440":0,"442":0,"444":0,"445":0,"446":0,"447":0,"448":0,"449":0,"450":0,"455":0,"458":0,"464":0,"466":0,"468":0,"469":0,"470":0,"472":0,"473":0,"475":0,"477":0,"479":0,"480":0,"481":0,"482":0,"483":0,"484":0,"485":0,"490":0,"493":0,"499":0,"501":0,"502":0,"503":0,"505":0,"507":0,"510":0,"511":0,"514":0,"516":0,"519":0,"520":0,"523":0,"525":0,"527":0,"529":0,"532":0,"537":0,"540":0,"543":0,"545":0,"548":0,"550":0,"551":0,"553":0,"556":0,"558":0,"559":0,"562":0,"563":0,"565":0,"566":0,"567":0,"570":0,"572":0,"574":0,"575":0,"578":0,"581":0,"587":0,"588":0,"589":0,"591":0,"592":0,"594":0,"595":0,"599":0,"600":0,"603":0,"604":0,"606":0,"607":0,"610":0,"612":0,"614":0,"616":0,"619":0,"620":0,"622":0,"625":0,"626":0,"628":0,"634":0,"635":0,"649":0,"651":0,"652":0,"654":0,"659":0,"662":0,"663":0,"665":0,"667":0,"668":0,"670":0,"675":0,"680":0,"683":0,"684":0,"685":0,"686":0,"692":0,"694":0,"696":0,"698":0,"699":0,"701":0,"703":0,"704":0,"705":0,"709":0,"710":0,"713":0,"718":0,"720":0,"721":0,"722":0,"724":0,"725":0,"729":0,"731":0,"732":0,"735":0,"740":0,"742":0,"743":0,"745":0,"752":0,"754":0,"756":0,"759":0,"760":0,"761":0,"763":0,"766":0,"768":0,"769":0,"770":0,"777":0,"779":0,"781":0,"784":0,"785":0,"786":0,"788":0,"791":0,"793":0,"794":0,"795":0};
_yuitest_coverage["build/gallery-datetime/gallery-datetime.js"].functions = {"DateTime:30":0,"isInputNode:37":0,"setter:81":0,"setter:95":0,"setter:109":0,"validator:125":0,"setter:145":0,"validator:242":0,"checkEnforceDateTimeLimits:282":0,"enforceDateTimeLimits:290":0,"updateRendering:415":0,"(anonymous 2):543":0,"cellRenderer:540":0,"(anonymous 3):556":0,"(anonymous 4):572":0,"ping:548":0,"initializer:583":0,"getDateTime:647":0,"setDateTime:689":0,"resetDateTime:716":0,"clearDateTime:738":0,"setMinDateTime:749":0,"setMaxDateTime:774":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-datetime/gallery-datetime.js"].coveredLines = 269;
_yuitest_coverage["build/gallery-datetime/gallery-datetime.js"].coveredFunctions = 24;
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 1);
YUI.add('gallery-datetime', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 3);
"use strict";

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 5);
var blackout_min_seconds = -40,
	blackout_max_seconds = +40,
	change_after_focus   = (0 < Y.UA.ie);

/**
 * @module gallery-datetime
 */

/**********************************************************************
 * Manages a date input field and an optional time field.  Calendars and
 * time selection widgets can be attached to these fields, but will not be
 * managed by this class.
 * 
 * Date/time values can be specified as either a Date object or an object
 * specifying year,month,day (all 1-based) or date_str and optionally
 * hour,minute or time_str.  Individual values take precedence over string
 * values.  Time resolution is in minutes.
 * 
 * @main gallery-datetime
 * @class DateTime
 * @extends Widget
 * @constructor
 * @param config {Object}
 */

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 30);
function DateTime(config)
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "DateTime", 30);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 32);
DateTime.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 35);
DateTime.NAME = "datetime";

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 37);
function isInputNode(n)
{
	// allow Y.Node from a different sandbox
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "isInputNode", 37);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 40);
return n && n._node && n._node.tagName == 'INPUT';
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 43);
DateTime.ATTRS =
{
	/**
	 * Date input field to use.  Can be augmented with a Calendar via
	 * gallery-input-calendar-sync.
	 * 
	 * @attribute dateInput
	 * @type {Node}
	 * @required
	 * @writeonce
	 */
	dateInput:
	{
		validator: isInputNode,
		writeOnce: true
	},

	/**
	 * Time input field to use.  Can be enhanced with gallery-timepicker.
	 * 
	 * @attribute timeInput
	 * @type {Node}
	 * @writeonce
	 */
	timeInput:
	{
		validator: isInputNode,
		writeOnce: true
	},

	/**
	 * Default date and time, used during initialization and by resetDateTime().
	 * 
	 * @attribute defaultDateTime
	 * @type {Object}
	 */
	defaultDateTime:
	{
		setter: function(value)
		{
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setter", 81);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 83);
return value ? Y.DateTimeUtils.normalize(value, this.get('blankTime')) : null;
		}
	},

	/**
	 * Minimum date and time.
	 * 
	 * @attribute minDateTime
	 * @type {Object}
	 */
	minDateTime:
	{
		setter: function(value)
		{
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setter", 95);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 97);
return value ? Y.DateTimeUtils.normalize(value, this.get('blankTime')) : null;
		}
	},

	/**
	 * Maximum date and time.
	 * 
	 * @attribute minDateTime
	 * @type {Object}
	 */
	maxDateTime:
	{
		setter: function(value)
		{
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setter", 109);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 111);
return value ? Y.DateTimeUtils.normalize(value, this.get('blankTime')) : null;
		}
	},

	/**
	 * Time value to use when no time is specified, e.g., in a blackout date.
	 * 
	 * @attribute blankTime
	 * @type {Object}
	 * @default { hour:0, minute:0 }
	 */
	blankTime:
	{
		value:     { hour:0, minute:0 },
		validator: function(value)
		{
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "validator", 125);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 127);
return (Y.Lang.isObject(value) &&
					Y.Lang.isNumber(value.hour) &&
					Y.Lang.isNumber(value.minute));
		}
	},

	/**
	 * Blackout ranges, specified as a list of objects, each defining start
	 * and end.
	 * 
	 * @attribute blackout
	 * @type {Array}
	 * @default []
	 */
	blackouts:
	{
		value:     [],
		validator: Y.Lang.isArray,
		setter:    function(ranges)
		{
			// store ranges in ascending order of start time

			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setter", 145);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 149);
var blackout   = [],
				blank_time = this.get('blankTime');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 151);
for (var i=0; i<ranges.length; i++)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 153);
var r   = ranges[i];
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 154);
r.start = Y.DateTimeUtils.normalize(r.start, blank_time);
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 155);
r.end   = Y.DateTimeUtils.normalize(r.end,   blank_time);

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 157);
r =
				[
					new Date(r.start.year, r.start.month-1, r.start.day,
							 r.start.hour, r.start.minute, blackout_min_seconds)
							 .getTime(),
					new Date(r.end.year, r.end.month-1, r.end.day,
							 r.end.hour, r.end.minute, blackout_max_seconds)
							 .getTime()
				];

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 167);
var inserted = false;
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 168);
for (var j=0; j<blackout.length; j++)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 170);
var r1 = blackout[j];
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 171);
if (r[0] <= r1[0])
					{
						_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 173);
if (j > 0 &&
							r[0] <  blackout[j-1][1] &&
							r[1] <= blackout[j-1][1])
						{
							// covered by prev
						}
						else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 179);
if (j > 0 &&
								 r[0] - 60000 < blackout[j-1][1] &&
								 r1[0] < r[1] + 60000)
						{
							// overlaps prev and next
							_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 184);
r = [ blackout[j-1][0], r[1] ];
							_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 185);
blackout.splice(j-1, 2, r);
						}
						else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 187);
if (j > 0 &&
								 r[0] - 60000 < blackout[j-1][1])
						{
							// overlaps prev
							_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 191);
blackout[j-1][1] = r[1];
						}
						else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 193);
if (r1[0] < r[1] + 60000)
						{
							// overlaps next
							_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 196);
r1[0] = r[0];
						}
						else
						{
							_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 200);
blackout.splice(j, 0, r);
						}}}}
						_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 202);
inserted = true;
						_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 203);
break;
					}
				}

				// j == blackout.length

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 209);
if (!inserted && j > 0 &&
					r[0] <  blackout[j-1][1] &&
					r[1] <= blackout[j-1][1])
				{
					// covered by prev
				}
				else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 215);
if (!inserted && j > 0 &&
						 r[0] - 60000 < blackout[j-1][1])
				{
					// overlaps prev
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 219);
blackout[j-1][1] = r[1];
				}
				else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 221);
if (!inserted)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 223);
blackout.push(r);
				}}}
			}

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 227);
return blackout;
		}
	},

	/**
	 * The direction to push the selected date and time when the user
	 * selects a day with partial blackout.
	 *
	 * @attribute blackoutSnapDirection
	 * @type {-1,+1}
	 * @default +1
	 */
	blackoutSnapDirection:
	{
		'default': +1,
		validator: function(value)
		{
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "validator", 242);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 244);
return (value == -1 || value == +1);
		}
	},

	/**
	 * Duration of visual ping in milliseconds when the value of an input
	 * field is modified because of a min/max or blackout restriction.  Set
	 * to zero to disable.
	 * 
	 * @attribute pingDuration
	 * @type {Number}
	 * @default 2
	 */
	pingDuration:
	{
		value:     2,
		validator: Y.Lang.isNumber
	},

	/**
	 * CSS class applied to input field when it is pinged.
	 * 
	 * @attribute pingClass
	 * @type {String}
	 * @default "yui3-datetime-ping"
	 */
	pingClass:
	{
		value:     'yui3-datetime-ping',
		validator: Y.Lang.isString
	}
};

/**
 * @event limitsEnforced
 * @description Fires after min/max and blackouts have been enforced.
 */

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 282);
function checkEnforceDateTimeLimits()
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "checkEnforceDateTimeLimits", 282);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 284);
if (!this.ignore_value_set)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 286);
enforceDateTimeLimits.call(this, 'same-day');
	}
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 290);
function enforceDateTimeLimits(
	/* string */	algo)
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "enforceDateTimeLimits", 290);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 293);
var date = this.getDateTime();
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 294);
if (!date)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 296);
return;
	}
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 298);
date = date.date;

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 300);
var orig_date = new Date(date.getTime());

	// blackout ranges

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 304);
if (this.blackout.length > 0)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 306);
var t      = date.getTime(),
			orig_t = t,
			snap   = this.get('blackoutSnapDirection');

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 310);
for (var i=0; i<this.blackout.length; i++)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 312);
var blackout = this.blackout[i];
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 313);
if (blackout[0] < t && t < blackout[1])
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 315);
if (snap > 0)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 317);
t = blackout[1] + 60000;
				}
				else
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 321);
t = blackout[0];
				}

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 324);
if (algo == 'same-day')
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 326);
var tmp = new Date(t);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 327);
if (tmp.getDate()     != date.getDate()  ||
						tmp.getMonth()    != date.getMonth() ||
						tmp.getFullYear() != date.getFullYear())
					{
						_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 331);
t = snap > 0 ? blackout[0] : blackout[1] + 60000;
					}
				}

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 335);
break;
			}
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 339);
if (t != orig_t)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 341);
date = new Date(t);
		}
	}

	// min/max last, shrink inward if blackout dates extend outside [min,max] range

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 347);
var min = this.get('minDateTime');
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 348);
if (min)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 350);
var t = this.min.date.getTime();

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 352);
if (this.blackout.length > 0)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 354);
var orig_t = t;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 355);
var i      = 0;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 356);
while (i < this.blackout.length && this.blackout[i][0] < t)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 358);
t = Math.max(orig_t, this.blackout[i][1]);
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 359);
i++;
			}
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 363);
if (date.getTime() < t)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 365);
date = new Date(t);
		}
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 369);
var max = this.get('maxDateTime');
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 370);
if (max)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 372);
var t = this.max.date.getTime();

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 374);
if (this.blackout.length > 0)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 376);
var orig_t = t;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 377);
var i      = this.blackout.length - 1;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 378);
while (i >= 0 && t < this.blackout[i][1])
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 380);
t = Math.min(orig_t, this.blackout[i][0]);
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 381);
i--;
			}
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 385);
if (t < date.getTime())
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 387);
date = new Date(t);
		}
	}

	// update controls that changed

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 393);
this.ignore_value_set = true;

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 395);
if (date.getFullYear() !== orig_date.getFullYear() ||
		date.getMonth()    !== orig_date.getMonth()    ||
		date.getDate()     !== orig_date.getDate())
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 399);
this.get('dateInput').set('value', Y.DateTimeUtils.formatDate(date));
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 400);
this.get('timeInput').set('value', Y.DateTimeUtils.formatTime(date));
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 401);
ping.call(this, 'dateInput', 'timeInput');
	}
	else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 403);
if (date.getHours() !== orig_date.getHours() ||
			 date.getMinutes() !== orig_date.getMinutes())
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 406);
this.get('timeInput').set('value', Y.DateTimeUtils.formatTime(date));
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 407);
ping.apply(this, 'timeInput');
	}}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 410);
this.ignore_value_set = false;

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 412);
this.fire('limitsEnforced');
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 415);
function updateRendering()
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "updateRendering", 415);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 417);
return;

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 419);
if (this.disabled)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 421);
return;
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 424);
this.calendar.calendar.removeRenderers();

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 426);
var blackouts = this.blackout.slice(0);

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 428);
if (this.min_date_time)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 430);
if (blackouts.length > 0)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 432);
var t       = this.min_date_time.date.getTime();
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 433);
var changed = false;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 434);
for (var i=0; i < blackouts.length; i++)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 436);
var blackout = blackouts[i];
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 437);
if (blackout[1] <= t)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 439);
blackouts.shift();
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 440);
i--;
				}
				else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 442);
if (blackout[0] < t)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 444);
var start = new Date(blackout[0]);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 445);
start.setHours(0);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 446);
start.setMinutes(0);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 447);
start.setSeconds(blackout_min_seconds);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 448);
blackouts[i] = [ start.getTime(), blackout[1] ];
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 449);
changed      = true;
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 450);
break;
				}}
			}
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 455);
if (!changed &&
			(this.min_date_time.hour > 0 || this.min_date_time.minute > 0))
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 458);
this.calendar.calendar.addRenderer(
				DateTime.formatDate(this.min_date_time.date),
				cellRenderer('satg-partial-blackout'));
		}
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 464);
if (this.max_date_time)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 466);
if (blackouts.length > 0)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 468);
var t       = this.max_date_time.date.getTime();
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 469);
var changed = false;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 470);
for (var i=blackouts.length-1; i>=0; i--)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 472);
var blackout = blackouts[i];
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 473);
if (t <= blackout[0])
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 475);
blackouts.pop();
				}
				else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 477);
if (t < blackout[1])
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 479);
var end = new Date(blackout[1]);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 480);
end.setHours(23);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 481);
end.setMinutes(59);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 482);
end.setSeconds(blackout_max_seconds);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 483);
blackouts[i] = [ blackout[0], end.getTime() ];
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 484);
changed      = true;
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 485);
break;
				}}
			}
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 490);
if (!changed &&
			(this.max_date_time.hour < 23 || this.max_date_time.minute < 59))
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 493);
this.calendar.calendar.addRenderer(
				DateTime.formatDate(this.max_date_time.date),
				cellRenderer('satg-partial-blackout'));
		}
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 499);
for (var i=0; i<blackouts.length; i++)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 501);
var blackout = blackouts[i];
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 502);
var start    = new Date(blackout[0] + blackout_max_seconds*1000);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 503);
var end      = new Date(blackout[1] + blackout_min_seconds*1000);

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 505);
if (start.getHours() > 0 || start.getMinutes() > 0)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 507);
this.calendar.calendar.addRenderer(
				DateTime.formatDate(start),
				cellRenderer('satg-partial-blackout'));
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 510);
start.setDate(start.getDate()+1);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 511);
start.setHours(0);
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 514);
if (end.getHours() < 23 || end.getMinutes() < 59)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 516);
this.calendar.calendar.addRenderer(
				DateTime.formatDate(end),
				cellRenderer('satg-partial-blackout'));
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 519);
end.setDate(end.getDate()-1);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 520);
end.setHours(23);
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 523);
if (start.getTime() < end.getTime())
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 525);
var s = DateTime.formatDate(start),
				e = DateTime.formatDate(end);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 527);
if (s != e)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 529);
s += YAHOO.SATG.Locale.Calendar.YUI_DATE_RANGE_DELIMITER + e;
			}

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 532);
this.calendar.calendar.addRenderer(
				s, this.calendar.calendar.renderOutOfBoundsDate);
		}
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 537);
this.calendar.render();
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 540);
function cellRenderer(
	/* string */ css)
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "cellRenderer", 540);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 543);
return function(date, cell)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "(anonymous 2)", 543);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 545);
Dom.addClass(cell, css);
	};
}
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 548);
function ping()
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "ping", 548);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 550);
var duration = this.get('pingDuration');
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 551);
if (duration <= 0)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 553);
return;
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 556);
var nodes = new Y.NodeList(Y.reduce(arguments, [], function(list, name)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "(anonymous 3)", 556);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 558);
list.push(this.get(name));
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 559);
return list;
	}));

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 562);
var ping_class = this.get('pingClass');
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 563);
if (this.ping_task)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 565);
this.ping_task.nodes.removeClass(ping_class);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 566);
this.ping_task.cancel();
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 567);
nodes = nodes.concat(this.ping_task.nodes);
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 570);
nodes.addClass(ping_class);

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 572);
this.ping_task = Y.later(this.get('pingDuration'), this, function()
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "(anonymous 4)", 572);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 574);
this.ping_task = null;
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 575);
nodes.removeClass(ping_class);
	});

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 578);
this.ping_task.nodes = nodes;
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 581);
Y.extend(DateTime, Y.Base,
{
	initializer: function(
		/* object/string */	container,
		/* map */			config)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "initializer", 583);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 587);
var date_input = this.get('dateInput');
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 588);
date_input.on('change', enforceDateTimeLimits, this);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 589);
date_input.after('valueSet', checkEnforceDateTimeLimits, this);

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 591);
var time_input = this.get('timeInput');
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 592);
if (time_input)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 594);
time_input.on('change', enforceDateTimeLimits, this);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 595);
time_input.after('valueSet', checkEnforceDateTimeLimits, this);
		}
		else
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 599);
time_input = Y.Node.create('<input type="hidden"></input>');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 600);
this.set('timeInput', time_input);
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 603);
var default_date_time = this.get('defaultDateTime');
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 604);
if (default_date_time)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 606);
date_input.set('value', Y.DateTimeUtils.formatDate(default_date_time));
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 607);
time_input.set('value', Y.DateTimeUtils.formatTime(default_date_time));
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 610);
if (date_input.calendarSync)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 612);
this.calendar = date_input.calendarSync.get('calendar');

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 614);
if (this.calendar && default_date_time)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 616);
this.calendar.set('date', default_date_time.date);
			}

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 619);
var t = this.get('minDateTime');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 620);
if (this.calendar && t)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 622);
this.calendar.set('minimumDate', t.date);
			}

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 625);
t = this.get('maxDateTime');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 626);
if (this.calendar && t)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 628);
this.calendar.set('maximumDate', t.date);
			}
		}

		// black-out dates

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 634);
updateRendering.call(this);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 635);
this.on('blackoutsChange', updateRendering);
	},

	destroy: function()
	{
	},

	/**
	 * Get the currently selected date and time.
	 * 
	 * @return {Object} year,month,day,hour,minute,date,date_str,time_str
	 */
	getDateTime: function()
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "getDateTime", 647);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 649);
try
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 651);
var date = Y.DateTimeUtils.parseDate(this.get('dateInput').get('value'));
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 652);
if (!date)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 654);
return false;
			}
		}
		catch (e)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 659);
return false;
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 662);
var time_input = this.get('timeInput');
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 663);
if (time_input)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 665);
try
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 667);
var time = Y.DateTimeUtils.parseTime(time_input.get('value'));
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 668);
if (!time)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 670);
return false;
				}
			}
			catch (e)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 675);
return false;
			}
		}
		else
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 680);
var time = this.get('blankTime');
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 683);
var result      = Y.DateTimeUtils.normalize(Y.mix(date, time));
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 684);
result.date_str = Y.DateTimeUtils.formatDate(result);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 685);
result.time_str = Y.DateTimeUtils.formatTime(result);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 686);
return result;
	},
// TODO
	setDateTime: function(
		/* object */	date_time)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setDateTime", 689);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 692);
this.rb[ this.rb.length-1 ].checked = true;

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 694);
this.calendar.setDate(date_time);

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 696);
if (date_time instanceof Date)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 698);
this.hour_menu.value   = date_time.getHours();
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 699);
this.minute_menu.value = date_time.getMinutes();
		}
		else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 701);
if (date_time.time_str)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 703);
var obj                = DateTime.parseTime(date_time.time_str);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 704);
this.hour_menu.value   = obj.hour;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 705);
this.minute_menu.value = obj.minute;
		}
		else
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 709);
this.hour_menu.value   = date_time.hour;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 710);
this.minute_menu.value = date_time.minute;
		}}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 713);
enforceDateTimeLimits.call(this);
	},
// TODO
	resetDateTime: function()
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "resetDateTime", 716);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 718);
if (this.default_date_time)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 720);
this.ignore_value_set = true;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 721);
this.calendar.setDate(this.default_date_time);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 722);
this.ignore_value_set = false;

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 724);
this.hour_menu.value   = this.default_date_time.hour;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 725);
this.minute_menu.value = this.default_date_time.minute;
		}
		else
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 729);
this.calendar.clearDate();

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 731);
this.hour_menu.value   = this.blank_time.hour;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 732);
this.minute_menu.value = this.blank_time.minute;
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 735);
enforceDateTimeLimits.call(this);
	},

	clearDateTime: function()
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "clearDateTime", 738);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 740);
this.get('dateInput').set('value', '');

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 742);
var time_input = this.get('timeInput');
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 743);
if (time_input)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 745);
time_input.set('value', '');
		}
	},
// TODO: onMinDateTimeChange
	setMinDateTime: function(
		/* object */	min)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setMinDateTime", 749);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 752);
if (min)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 754);
min = Y.DateTimeUtils.normalize(min, this.blank_time);

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 756);
if (!this.min_date_time ||
				this.min_date_time.date.getTime() != min.date.getTime())
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 759);
this.min_date_time = min;
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 760);
enforceDateTimeLimits.call(this);
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 761);
this.calendar.setMinDate(this.min_date_time);

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 763);
updateRendering.call(this);
			}
		}
		else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 766);
if (this.min_date_time)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 768);
this.min_date_time = null;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 769);
this.calendar.clearMinDate();
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 770);
updateRendering.call(this);
		}}
	},
// TODO: onMaxDateTimeChange
	setMaxDateTime: function(
		/* object */	max)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setMaxDateTime", 774);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 777);
if (max)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 779);
max = Y.DateTimeUtils.normalize(max, this.blank_time);

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 781);
if (!this.max_date_time ||
				this.max_date_time.date.getTime() != max.date.getTime())
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 784);
this.max_date_time = max;
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 785);
enforceDateTimeLimits.call(this);
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 786);
this.calendar.setMaxDate(this.max_date_time);

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 788);
updateRendering.call(this);
			}
		}
		else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 791);
if (this.max_date_time)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 793);
this.max_date_time = null;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 794);
this.calendar.clearMaxDate();
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 795);
updateRendering.call(this);
		}}
	}
});


}, '@VERSION@', {
    "requires": [
        "gallery-datetime-utils",
        "gallery-funcprog"
    ],
    "optional": [
        "calendar",
        "gallery-timepicker"
    ]
});
