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
_yuitest_coverage["build/gallery-datetime/gallery-datetime.js"].code=["YUI.add('gallery-datetime', function (Y, NAME) {","","\"use strict\";","","var blackout_min_seconds = -40,","	blackout_max_seconds = +40,","	change_after_focus   = (0 < Y.UA.ie);","","/**"," * @module gallery-datetime"," */","","/**********************************************************************"," * Manages a date input field and an optional time field.  Calendars and"," * time selection widgets can be attached to these fields, but will not be"," * managed by this class."," * "," * Date/time values can be specified as either a Date object or an object"," * specifying year,month,day (all 1-based) or date_str and optionally"," * hour,minute or time_str.  Individual values take precedence over string"," * values.  Time resolution is in minutes."," * "," * @main gallery-datetime"," * @class DateTime"," * @extends Base"," * @constructor"," * @param config {Object}"," */","","function DateTime(config)","{","	DateTime.superclass.constructor.apply(this, arguments);","}","","DateTime.NAME = \"datetime\";","","function setNode(n)","{","	return Y.one(n) || Attribute.INVALID_VALUE;","}","","function setDateTime(value)","{","	return value ? Y.DateTimeUtils.normalize(value, this.get('blankTime')) : null;","};","","DateTime.ATTRS =","{","	/**","	 * Date input field to use.  Can be augmented with a Calendar via","	 * gallery-input-calendar-sync.","	 * ","	 * @attribute dateInput","	 * @type {Node|String}","	 * @required","	 * @writeonce","	 */","	dateInput:","	{","		setter:    setNode,","		writeOnce: true","	},","","	/**","	 * Time input field to use.  Can be enhanced with gallery-timepicker.","	 * ","	 * @attribute timeInput","	 * @type {Node|String}","	 * @writeonce","	 */","	timeInput:","	{","		setter:    setNode,","		writeOnce: true","	},","","	/**","	 * Default date and time, used during initialization and by resetDateTime().","	 * ","	 * @attribute defaultDateTime","	 * @type {Object}","	 */","	defaultDateTime:","	{","		setter: setDateTime","	},","","	/**","	 * Minimum date and time.","	 * ","	 * @attribute minDateTime","	 * @type {Object}","	 */","	minDateTime:","	{","		setter: setDateTime","	},","","	/**","	 * Maximum date and time.","	 * ","	 * @attribute minDateTime","	 * @type {Object}","	 */","	maxDateTime:","	{","		setter: setDateTime","	},","","	/**","	 * Time value to use when no time is specified, e.g., in a blackout date.","	 * ","	 * @attribute blankTime","	 * @type {Object}","	 * @default { hour:0, minute:0 }","	 */","	blankTime:","	{","		value:     { hour:0, minute:0 },","		validator: function(value)","		{","			return (Y.Lang.isObject(value) &&","					Y.Lang.isNumber(value.hour) &&","					Y.Lang.isNumber(value.minute));","		}","	},","","	/**","	 * Blackout ranges, specified as a list of objects, each defining start","	 * and end.  The data is overwritten, so this is a write-only value.","	 * ","	 * @attribute blackout","	 * @type {Array}","	 * @default []","	 */","	blackouts:","	{","		value:     [],","		validator: Y.Lang.isArray,","		setter:    function(ranges)","		{","			ranges = ranges || [];","","			// store ranges in ascending order of start time","","			var blackouts  = [],","				blank_time = this.get('blankTime');","			for (var i=0; i<ranges.length; i++)","			{","				var r   = ranges[i];","				r.start = Y.DateTimeUtils.normalize(r.start, blank_time);","				r.end   = Y.DateTimeUtils.normalize(r.end,   blank_time);","","				r =","				[","					new Date(r.start.year, r.start.month-1, r.start.day,","							 r.start.hour, r.start.minute, blackout_min_seconds)","							 .getTime(),","					new Date(r.end.year, r.end.month-1, r.end.day,","							 r.end.hour, r.end.minute, blackout_max_seconds)","							 .getTime()","				];","","				var inserted = false;","				for (var j=0; j<blackouts.length; j++)","				{","					var r1 = blackouts[j];","					if (r[0] <= r1[0])","					{","						if (j > 0 &&","							r[0] <  blackouts[j-1][1] &&","							r[1] <= blackouts[j-1][1])","						{","							// covered by prev","						}","						else if (j > 0 &&","								 r[0] - 60000 < blackouts[j-1][1] &&","								 r1[0] < r[1] + 60000)","						{","							// overlaps prev and next","							r = [ blackouts[j-1][0], r[1] ];","							blackouts.splice(j-1, 2, r);","						}","						else if (j > 0 &&","								 r[0] - 60000 < blackouts[j-1][1])","						{","							// overlaps prev","							blackouts[j-1][1] = r[1];","						}","						else if (r1[0] < r[1] + 60000)","						{","							// overlaps next","							r1[0] = r[0];","						}","						else","						{","							blackouts.splice(j, 0, r);","						}","						inserted = true;","						break;","					}","				}","","				// j == blackouts.length","","				if (!inserted && j > 0 &&","					r[0] <  blackouts[j-1][1] &&","					r[1] <= blackouts[j-1][1])","				{","					// covered by prev","				}","				else if (!inserted && j > 0 &&","						 r[0] - 60000 < blackouts[j-1][1])","				{","					// overlaps prev","					blackouts[j-1][1] = r[1];","				}","				else if (!inserted)","				{","					blackouts.push(r);","				}","			}","","			return blackouts;","		}","	},","","	/**","	 * The direction to push the selected date and time when the user","	 * selects a day with partial blackout.  The default value of zero","	 * means go to the nearest available time.","	 *","	 * @attribute blackoutSnapDirection","	 * @type {-1,0,+1}","	 * @default 0","	 */","	blackoutSnapDirection:","	{","		value:     0,","		validator: function(value)","		{","			return (value == -1 || value === 0 || value == +1);","		}","	},","","	/**","	 * Duration of visual ping in milliseconds when the value of an input","	 * field is modified because of a min/max or blackout restriction.  Set","	 * to zero to disable.","	 * ","	 * @attribute pingDuration","	 * @type {Number}","	 * @default 2000","	 */","	pingDuration:","	{","		value:     2000,","		validator: Y.Lang.isNumber","	},","","	/**","	 * CSS class applied to input field when it is pinged.","	 * ","	 * @attribute pingClass","	 * @type {String}","	 * @default \"yui3-datetime-ping\"","	 */","	pingClass:","	{","		value:     'yui3-datetime-ping',","		validator: Y.Lang.isString","	}","};","","/**"," * @event limitsEnforced"," * @description Fires after min/max and blackouts have been enforced."," */","","function checkEnforceDateTimeLimits()","{","	if (!this.ignore_value_set)","	{","		enforceDateTimeLimits.call(this, 'same-day');","	}","}","","function enforceDateTimeLimits(","	/* string */	algo)","{","	var date = this.getDateTime();","	if (!date)","	{","		return;","	}","	date = date.date;","","	var orig_date = new Date(date.getTime());","","	// blackout ranges","","	var blackouts = this.get('blackouts');","	if (blackouts.length > 0)","	{","		var t      = date.getTime(),","			orig_t = t,","			snap   = algo == 'same-day' ? 0 : this.get('blackoutSnapDirection');","","		for (var i=0; i<blackouts.length; i++)","		{","			var blackout = blackouts[i];","			if (blackout[0] < t && t < blackout[1])","			{","				if (snap > 0)","				{","					t = blackout[1] + 60000;","				}","				else if (snap < 0)","				{","					t = blackout[0];","				}","				else if (t - blackout[0] < blackout[1] - t)","				{","					t = blackout[0];","				}","				else","				{","					t = blackout[1] + 60000;","				}","","				break;","			}","		}","","		if (t != orig_t)","		{","			date = new Date(t);","		}","	}","","	// min/max last, shrink inward if blackout dates extend outside [min,max] range","","	var min = this.get('minDateTime');","	if (min)","	{","		var t = min.date.getTime();","","		if (blackouts.length > 0)","		{","			var orig_t = t;","			var i      = 0;","			while (i < blackouts.length && blackouts[i][0] < t)","			{","				t = Math.max(orig_t, blackouts[i][1]);","				i++;","			}","		}","","		if (date.getTime() < t)","		{","			date = new Date(t);","		}","	}","","	var max = this.get('maxDateTime');","	if (max)","	{","		var t = max.date.getTime();","","		if (blackouts.length > 0)","		{","			var orig_t = t;","			var i      = blackouts.length - 1;","			while (i >= 0 && t < blackouts[i][1])","			{","				t = Math.min(orig_t, blackouts[i][0]);","				i--;","			}","		}","","		if (t < date.getTime())","		{","			date = new Date(t);","		}","	}","","	// update controls that changed","","	if (date.getFullYear() !== orig_date.getFullYear() ||","		date.getMonth()    !== orig_date.getMonth()    ||","		date.getDate()     !== orig_date.getDate())","	{","		var timer       = getEnforceTimer.call(this);","		timer.dateInput = Y.DateTimeUtils.formatDate(date);","		timer.timeInput = Y.DateTimeUtils.formatTime(date);","	}","	else if (date.getHours() !== orig_date.getHours() ||","			 date.getMinutes() !== orig_date.getMinutes())","	{","		var timer       = getEnforceTimer.call(this);","		timer.timeInput = Y.DateTimeUtils.formatTime(date);","	}","	else","	{","		this.fire('limitsEnforced');","	}","}","","function getEnforceTimer()","{","	if (!this.enforce_timer)","	{","		this.enforce_timer = Y.later(0, this, enforceTimerCallback);","	}","	return this.enforce_timer;","}","","function enforceTimerCallback()","{","	var timer          = this.enforce_timer;","	this.enforce_timer = null;","","	var ping_list         = [];","	this.ignore_value_set = true;","","	Y.each(['dateInput', 'timeInput'], function(name)","	{","		if (timer[name])","		{","			this.get(name).set('value', timer[name]);","			ping_list.push(name);","		}","	},","	this);","","	this.ignore_value_set = false;","	ping.apply(this, ping_list);","","	this.fire('limitsEnforced');","}","","function updateRendering()","{","	if (!this.calendar)","	{","		return;","	}","","	function mkpath()","	{","		var obj = rules;","		Y.each(arguments, function(key)","		{","			if (!obj[key])","			{","				obj[key] = {};","			}","			obj = obj[key];","		});","	}","","	function set(date, type)","	{","		var y = date.getFullYear(),","			m = date.getMonth(),","			d = date.getDate();","","		mkpath(y, m, d);","","		rules[y][m][d] = type;","	}","","	function disableRemaining(date, delta)","	{","		var d = new Date(date);","		d.setDate(d.getDate() + delta);","","		while (d.getMonth() == date.getMonth())","		{","			set(d, 'disabled');","			d.setDate(d.getDate() + delta);","		}","	}","","	var blackouts = this.get('blackouts').slice(0),","		rules     = {};","","	var min = this.get('minDateTime');","	if (min)","	{","		if (blackouts.length > 0)","		{","			var t       = min.date.getTime();","			var changed = false;","			for (var i=0; i < blackouts.length; i++)","			{","				var blackout = blackouts[i];","				if (blackout[1] <= t)","				{","					blackouts.shift();","					i--;","				}","				else if (blackout[0] < t)","				{","					var start = new Date(blackout[0]);","					start.setHours(0);","					start.setMinutes(0);","					start.setSeconds(blackout_min_seconds);","					blackouts[i] = [ start.getTime(), blackout[1] ];","					changed      = true;","					break;","				}","			}","		}","","		if (!changed &&","			(min.hour > 0 || min.minute > 0))","		{","			set(min.date, 'partial');","		}","","		disableRemaining(min.date, -1);","	}","","	var max = this.get('maxDateTime');","	if (max)","	{","		if (blackouts.length > 0)","		{","			var t       = max.date.getTime();","			var changed = false;","			for (var i=blackouts.length-1; i>=0; i--)","			{","				var blackout = blackouts[i];","				if (t <= blackout[0])","				{","					blackouts.pop();","				}","				else if (t < blackout[1])","				{","					var end = new Date(blackout[1]);","					end.setHours(23);","					end.setMinutes(59);","					end.setSeconds(blackout_max_seconds);","					blackouts[i] = [ blackout[0], end.getTime() ];","					changed      = true;","					break;","				}","			}","		}","","		if (!changed &&","			(max.hour < 23 || max.minute < 59))","		{","			set(max.date, 'partial');","		}","","		disableRemaining(max.date, +1);","	}","","	for (var i=0; i<blackouts.length; i++)","	{","		var blackout = blackouts[i];","		var start    = new Date(blackout[0] + blackout_max_seconds*1000);","		var end      = new Date(blackout[1] + blackout_min_seconds*1000);","","		if (start.getHours() > 0 || start.getMinutes() > 0)","		{","			set(start, 'partial');","			start.setDate(start.getDate()+1);","			start.setHours(0);","		}","","		if (end.getHours() < 23 || end.getMinutes() < 59)","		{","			set(end, 'partial');","			end.setDate(end.getDate()-1);","			end.setHours(23);","		}","","		while (start.getTime() < end.getTime())","		{","			set(start, 'disabled');","			start.setDate(start.getDate()+1);","		}","	}","","	this.calendar.set('customRenderer',","	{","		rules:          rules,","		filterFunction: renderFilter","	});","}","","function renderFilter(date, node, rules)","{","	if (Y.Array.indexOf(rules, 'partial') >= 0)","	{","		node.addClass('yui3-datetime-partial');","	}","	else if (Y.Array.indexOf(rules, 'disabled') >= 0)","	{","		node.addClass('yui3-calendar-selection-disabled');","	}","}","","function ping()","{","	var duration = this.get('pingDuration');","	if (duration <= 0)","	{","		return;","	}","","	var nodes = new Y.NodeList(Y.reduce(arguments, [], function(list, name)","	{","		list.push(this.get(name));","		return list;","	},","	this));","","	var ping_class = this.get('pingClass');","	if (this.ping_task)","	{","		this.ping_task.nodes.removeClass(ping_class);","		this.ping_task.cancel();","		nodes = nodes.concat(this.ping_task.nodes);","	}","","	nodes.addClass(ping_class);","","	this.ping_task = Y.later(duration, this, function()","	{","		this.ping_task = null;","		nodes.removeClass(ping_class);","	});","","	this.ping_task.nodes = nodes;","}","","Y.extend(DateTime, Y.Base,","{","	initializer: function(","		/* object/string */	container,","		/* map */			config)","	{","		var date_input = this.get('dateInput');","		date_input.on('change', enforceDateTimeLimits, this);","		date_input.after('valueSet', checkEnforceDateTimeLimits, this);","","		var time_input = this.get('timeInput');","		if (time_input)","		{","			time_input.on('change', enforceDateTimeLimits, this);","			time_input.after('valueSet', checkEnforceDateTimeLimits, this);","		}","		else","		{","			time_input = Y.Node.create('<input type=\"hidden\"></input>');","			this.set('timeInput', time_input);","			time_input.set('value', Y.DateTimeUtils.formatTime(this.get('blankTime')));","			var created_time_input = true;","		}","","		var default_date_time = this.get('defaultDateTime');","		if (default_date_time)","		{","			date_input.set('value', Y.DateTimeUtils.formatDate(default_date_time));","			if (!created_time_input)","			{","				time_input.set('value', Y.DateTimeUtils.formatTime(default_date_time));","			}","		}","","		if (date_input.calendarSync)","		{","			this.calendar = date_input.calendarSync.get('calendar');","","			if (this.calendar && default_date_time)","			{","				this.calendar.set('date', default_date_time.date);","			}","","			var t = this.get('minDateTime');","			if (this.calendar && t)","			{","				this.calendar.set('minimumDate', t.date);","			}","","			t = this.get('maxDateTime');","			if (this.calendar && t)","			{","				this.calendar.set('maximumDate', t.date);","			}","		}","","		// black-out dates","","		updateRendering.call(this);","		this.on('blackoutsChange', updateRendering);","	},","","	/**","	 * Get the currently selected date and time.","	 * ","	 * @method getDateTime","	 * @return {Object} year,month,day,hour,minute,date,date_str,time_str","	 */","	getDateTime: function()","	{","		try","		{","			var date = Y.DateTimeUtils.parseDate(this.get('dateInput').get('value'));","			if (!date)","			{","				return false;","			}","		}","		catch (e)","		{","			return false;","		}","","		try","		{","			var time = Y.DateTimeUtils.parseTime(this.get('timeInput').get('value'));","			if (!time)","			{","				return false;","			}","		}","		catch (e)","		{","			return false;","		}","","		var result      = Y.DateTimeUtils.normalize(Y.mix(date, time));","		result.date_str = Y.DateTimeUtils.formatDate(result);","		result.time_str = Y.DateTimeUtils.formatTime(result);","		return result;","	},","// TODO","	setDateTime: function(","		/* object */	date_time)","	{","		this.rb[ this.rb.length-1 ].checked = true;","","		this.calendar.setDate(date_time);","","		if (date_time instanceof Date)","		{","			this.hour_menu.value   = date_time.getHours();","			this.minute_menu.value = date_time.getMinutes();","		}","		else if (date_time.time_str)","		{","			var obj                = DateTime.parseTime(date_time.time_str);","			this.hour_menu.value   = obj.hour;","			this.minute_menu.value = obj.minute;","		}","		else","		{","			this.hour_menu.value   = date_time.hour;","			this.minute_menu.value = date_time.minute;","		}","","		enforceDateTimeLimits.call(this);","	},","// TODO","	resetDateTime: function()","	{","		if (this.default_date_time)","		{","			this.calendar.setDate(this.default_date_time);","","			this.hour_menu.value   = this.default_date_time.hour;","			this.minute_menu.value = this.default_date_time.minute;","		}","		else","		{","			this.calendar.clearDate();","","			this.hour_menu.value   = this.blank_time.hour;","			this.minute_menu.value = this.blank_time.minute;","		}","","		enforceDateTimeLimits.call(this);","	},","","	/**","	 * Clear the date and time.","	 *","	 * @method clearDateTime","	 */","	clearDateTime: function()","	{","		this.get('dateInput').set('value', '');","","		var time_input = this.get('timeInput');","		if (time_input)","		{","			time_input.set('value', '');","		}","	},","// TODO: on minDateTimeChange","	setMinDateTime: function(","		/* object */	min)","	{","		if (min)","		{","			min = Y.DateTimeUtils.normalize(min, this.blank_time);","","			if (!this.min_date_time ||","				this.min_date_time.date.getTime() != min.date.getTime())","			{","				this.min_date_time = min;","				enforceDateTimeLimits.call(this);","				this.calendar.setMinDate(this.min_date_time);","","				updateRendering.call(this);","			}","		}","		else if (this.min_date_time)","		{","			this.min_date_time = null;","			this.calendar.clearMinDate();","			updateRendering.call(this);","		}","	},","// TODO: on maxDateTimeChange","	setMaxDateTime: function(","		/* object */	max)","	{","		if (max)","		{","			max = Y.DateTimeUtils.normalize(max, this.blank_time);","","			if (!this.max_date_time ||","				this.max_date_time.date.getTime() != max.date.getTime())","			{","				this.max_date_time = max;","				enforceDateTimeLimits.call(this);","				this.calendar.setMaxDate(this.max_date_time);","","				updateRendering.call(this);","			}","		}","		else if (this.max_date_time)","		{","			this.max_date_time = null;","			this.calendar.clearMaxDate();","			updateRendering.call(this);","		}","	}","});","","Y.DateTime = DateTime;","","","}, '@VERSION@', {","    \"skinnable\": \"true\",","    \"requires\": [","        \"base\",","        \"gallery-datetime-utils\",","        \"gallery-funcprog\"","    ],","    \"optional\": [","        \"calendar\",","        \"gallery-timepicker\"","    ]","});"];
_yuitest_coverage["build/gallery-datetime/gallery-datetime.js"].lines = {"1":0,"3":0,"5":0,"30":0,"32":0,"35":0,"37":0,"39":0,"42":0,"44":0,"45":0,"47":0,"122":0,"142":0,"146":0,"148":0,"150":0,"151":0,"152":0,"154":0,"164":0,"165":0,"167":0,"168":0,"170":0,"176":0,"181":0,"182":0,"184":0,"188":0,"190":0,"193":0,"197":0,"199":0,"200":0,"206":0,"212":0,"216":0,"218":0,"220":0,"224":0,"242":0,"280":0,"282":0,"284":0,"288":0,"291":0,"292":0,"294":0,"296":0,"298":0,"302":0,"303":0,"305":0,"309":0,"311":0,"312":0,"314":0,"316":0,"318":0,"320":0,"322":0,"324":0,"328":0,"331":0,"335":0,"337":0,"343":0,"344":0,"346":0,"348":0,"350":0,"351":0,"352":0,"354":0,"355":0,"359":0,"361":0,"365":0,"366":0,"368":0,"370":0,"372":0,"373":0,"374":0,"376":0,"377":0,"381":0,"383":0,"389":0,"393":0,"394":0,"395":0,"397":0,"400":0,"401":0,"405":0,"409":0,"411":0,"413":0,"415":0,"418":0,"420":0,"421":0,"423":0,"424":0,"426":0,"428":0,"430":0,"431":0,"436":0,"437":0,"439":0,"442":0,"444":0,"446":0,"449":0,"451":0,"452":0,"454":0,"456":0,"458":0,"462":0,"464":0,"468":0,"470":0,"473":0,"475":0,"476":0,"478":0,"480":0,"481":0,"485":0,"488":0,"489":0,"491":0,"493":0,"494":0,"495":0,"497":0,"498":0,"500":0,"501":0,"503":0,"505":0,"506":0,"507":0,"508":0,"509":0,"510":0,"511":0,"516":0,"519":0,"522":0,"525":0,"526":0,"528":0,"530":0,"531":0,"532":0,"534":0,"535":0,"537":0,"539":0,"541":0,"542":0,"543":0,"544":0,"545":0,"546":0,"547":0,"552":0,"555":0,"558":0,"561":0,"563":0,"564":0,"565":0,"567":0,"569":0,"570":0,"571":0,"574":0,"576":0,"577":0,"578":0,"581":0,"583":0,"584":0,"588":0,"595":0,"597":0,"599":0,"601":0,"603":0,"607":0,"609":0,"610":0,"612":0,"615":0,"617":0,"618":0,"622":0,"623":0,"625":0,"626":0,"627":0,"630":0,"632":0,"634":0,"635":0,"638":0,"641":0,"647":0,"648":0,"649":0,"651":0,"652":0,"654":0,"655":0,"659":0,"660":0,"661":0,"662":0,"665":0,"666":0,"668":0,"669":0,"671":0,"675":0,"677":0,"679":0,"681":0,"684":0,"685":0,"687":0,"690":0,"691":0,"693":0,"699":0,"700":0,"711":0,"713":0,"714":0,"716":0,"721":0,"724":0,"726":0,"727":0,"729":0,"734":0,"737":0,"738":0,"739":0,"740":0,"746":0,"748":0,"750":0,"752":0,"753":0,"755":0,"757":0,"758":0,"759":0,"763":0,"764":0,"767":0,"772":0,"774":0,"776":0,"777":0,"781":0,"783":0,"784":0,"787":0,"797":0,"799":0,"800":0,"802":0,"809":0,"811":0,"813":0,"816":0,"817":0,"818":0,"820":0,"823":0,"825":0,"826":0,"827":0,"834":0,"836":0,"838":0,"841":0,"842":0,"843":0,"845":0,"848":0,"850":0,"851":0,"852":0,"857":0};
_yuitest_coverage["build/gallery-datetime/gallery-datetime.js"].functions = {"DateTime:30":0,"setNode:37":0,"setDateTime:42":0,"validator:120":0,"setter:140":0,"validator:240":0,"checkEnforceDateTimeLimits:280":0,"enforceDateTimeLimits:288":0,"getEnforceTimer:409":0,"(anonymous 2):426":0,"enforceTimerCallback:418":0,"(anonymous 3):452":0,"mkpath:449":0,"set:462":0,"disableRemaining:473":0,"updateRendering:442":0,"renderFilter:595":0,"(anonymous 4):615":0,"(anonymous 5):632":0,"ping:607":0,"initializer:643":0,"getDateTime:709":0,"setDateTime:743":0,"resetDateTime:770":0,"clearDateTime:795":0,"setMinDateTime:806":0,"setMaxDateTime:831":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-datetime/gallery-datetime.js"].coveredLines = 302;
_yuitest_coverage["build/gallery-datetime/gallery-datetime.js"].coveredFunctions = 28;
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
 * @extends Base
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
function setNode(n)
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setNode", 37);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 39);
return Y.one(n) || Attribute.INVALID_VALUE;
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 42);
function setDateTime(value)
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setDateTime", 42);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 44);
return value ? Y.DateTimeUtils.normalize(value, this.get('blankTime')) : null;
}_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 45);
;

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 47);
DateTime.ATTRS =
{
	/**
	 * Date input field to use.  Can be augmented with a Calendar via
	 * gallery-input-calendar-sync.
	 * 
	 * @attribute dateInput
	 * @type {Node|String}
	 * @required
	 * @writeonce
	 */
	dateInput:
	{
		setter:    setNode,
		writeOnce: true
	},

	/**
	 * Time input field to use.  Can be enhanced with gallery-timepicker.
	 * 
	 * @attribute timeInput
	 * @type {Node|String}
	 * @writeonce
	 */
	timeInput:
	{
		setter:    setNode,
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
		setter: setDateTime
	},

	/**
	 * Minimum date and time.
	 * 
	 * @attribute minDateTime
	 * @type {Object}
	 */
	minDateTime:
	{
		setter: setDateTime
	},

	/**
	 * Maximum date and time.
	 * 
	 * @attribute minDateTime
	 * @type {Object}
	 */
	maxDateTime:
	{
		setter: setDateTime
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
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "validator", 120);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 122);
return (Y.Lang.isObject(value) &&
					Y.Lang.isNumber(value.hour) &&
					Y.Lang.isNumber(value.minute));
		}
	},

	/**
	 * Blackout ranges, specified as a list of objects, each defining start
	 * and end.  The data is overwritten, so this is a write-only value.
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
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setter", 140);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 142);
ranges = ranges || [];

			// store ranges in ascending order of start time

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 146);
var blackouts  = [],
				blank_time = this.get('blankTime');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 148);
for (var i=0; i<ranges.length; i++)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 150);
var r   = ranges[i];
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 151);
r.start = Y.DateTimeUtils.normalize(r.start, blank_time);
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 152);
r.end   = Y.DateTimeUtils.normalize(r.end,   blank_time);

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 154);
r =
				[
					new Date(r.start.year, r.start.month-1, r.start.day,
							 r.start.hour, r.start.minute, blackout_min_seconds)
							 .getTime(),
					new Date(r.end.year, r.end.month-1, r.end.day,
							 r.end.hour, r.end.minute, blackout_max_seconds)
							 .getTime()
				];

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 164);
var inserted = false;
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 165);
for (var j=0; j<blackouts.length; j++)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 167);
var r1 = blackouts[j];
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 168);
if (r[0] <= r1[0])
					{
						_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 170);
if (j > 0 &&
							r[0] <  blackouts[j-1][1] &&
							r[1] <= blackouts[j-1][1])
						{
							// covered by prev
						}
						else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 176);
if (j > 0 &&
								 r[0] - 60000 < blackouts[j-1][1] &&
								 r1[0] < r[1] + 60000)
						{
							// overlaps prev and next
							_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 181);
r = [ blackouts[j-1][0], r[1] ];
							_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 182);
blackouts.splice(j-1, 2, r);
						}
						else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 184);
if (j > 0 &&
								 r[0] - 60000 < blackouts[j-1][1])
						{
							// overlaps prev
							_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 188);
blackouts[j-1][1] = r[1];
						}
						else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 190);
if (r1[0] < r[1] + 60000)
						{
							// overlaps next
							_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 193);
r1[0] = r[0];
						}
						else
						{
							_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 197);
blackouts.splice(j, 0, r);
						}}}}
						_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 199);
inserted = true;
						_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 200);
break;
					}
				}

				// j == blackouts.length

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 206);
if (!inserted && j > 0 &&
					r[0] <  blackouts[j-1][1] &&
					r[1] <= blackouts[j-1][1])
				{
					// covered by prev
				}
				else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 212);
if (!inserted && j > 0 &&
						 r[0] - 60000 < blackouts[j-1][1])
				{
					// overlaps prev
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 216);
blackouts[j-1][1] = r[1];
				}
				else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 218);
if (!inserted)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 220);
blackouts.push(r);
				}}}
			}

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 224);
return blackouts;
		}
	},

	/**
	 * The direction to push the selected date and time when the user
	 * selects a day with partial blackout.  The default value of zero
	 * means go to the nearest available time.
	 *
	 * @attribute blackoutSnapDirection
	 * @type {-1,0,+1}
	 * @default 0
	 */
	blackoutSnapDirection:
	{
		value:     0,
		validator: function(value)
		{
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "validator", 240);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 242);
return (value == -1 || value === 0 || value == +1);
		}
	},

	/**
	 * Duration of visual ping in milliseconds when the value of an input
	 * field is modified because of a min/max or blackout restriction.  Set
	 * to zero to disable.
	 * 
	 * @attribute pingDuration
	 * @type {Number}
	 * @default 2000
	 */
	pingDuration:
	{
		value:     2000,
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

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 280);
function checkEnforceDateTimeLimits()
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "checkEnforceDateTimeLimits", 280);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 282);
if (!this.ignore_value_set)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 284);
enforceDateTimeLimits.call(this, 'same-day');
	}
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 288);
function enforceDateTimeLimits(
	/* string */	algo)
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "enforceDateTimeLimits", 288);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 291);
var date = this.getDateTime();
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 292);
if (!date)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 294);
return;
	}
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 296);
date = date.date;

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 298);
var orig_date = new Date(date.getTime());

	// blackout ranges

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 302);
var blackouts = this.get('blackouts');
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 303);
if (blackouts.length > 0)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 305);
var t      = date.getTime(),
			orig_t = t,
			snap   = algo == 'same-day' ? 0 : this.get('blackoutSnapDirection');

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 309);
for (var i=0; i<blackouts.length; i++)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 311);
var blackout = blackouts[i];
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 312);
if (blackout[0] < t && t < blackout[1])
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 314);
if (snap > 0)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 316);
t = blackout[1] + 60000;
				}
				else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 318);
if (snap < 0)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 320);
t = blackout[0];
				}
				else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 322);
if (t - blackout[0] < blackout[1] - t)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 324);
t = blackout[0];
				}
				else
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 328);
t = blackout[1] + 60000;
				}}}

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 331);
break;
			}
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 335);
if (t != orig_t)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 337);
date = new Date(t);
		}
	}

	// min/max last, shrink inward if blackout dates extend outside [min,max] range

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 343);
var min = this.get('minDateTime');
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 344);
if (min)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 346);
var t = min.date.getTime();

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 348);
if (blackouts.length > 0)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 350);
var orig_t = t;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 351);
var i      = 0;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 352);
while (i < blackouts.length && blackouts[i][0] < t)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 354);
t = Math.max(orig_t, blackouts[i][1]);
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 355);
i++;
			}
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 359);
if (date.getTime() < t)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 361);
date = new Date(t);
		}
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 365);
var max = this.get('maxDateTime');
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 366);
if (max)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 368);
var t = max.date.getTime();

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 370);
if (blackouts.length > 0)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 372);
var orig_t = t;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 373);
var i      = blackouts.length - 1;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 374);
while (i >= 0 && t < blackouts[i][1])
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 376);
t = Math.min(orig_t, blackouts[i][0]);
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 377);
i--;
			}
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 381);
if (t < date.getTime())
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 383);
date = new Date(t);
		}
	}

	// update controls that changed

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 389);
if (date.getFullYear() !== orig_date.getFullYear() ||
		date.getMonth()    !== orig_date.getMonth()    ||
		date.getDate()     !== orig_date.getDate())
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 393);
var timer       = getEnforceTimer.call(this);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 394);
timer.dateInput = Y.DateTimeUtils.formatDate(date);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 395);
timer.timeInput = Y.DateTimeUtils.formatTime(date);
	}
	else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 397);
if (date.getHours() !== orig_date.getHours() ||
			 date.getMinutes() !== orig_date.getMinutes())
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 400);
var timer       = getEnforceTimer.call(this);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 401);
timer.timeInput = Y.DateTimeUtils.formatTime(date);
	}
	else
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 405);
this.fire('limitsEnforced');
	}}
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 409);
function getEnforceTimer()
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "getEnforceTimer", 409);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 411);
if (!this.enforce_timer)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 413);
this.enforce_timer = Y.later(0, this, enforceTimerCallback);
	}
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 415);
return this.enforce_timer;
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 418);
function enforceTimerCallback()
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "enforceTimerCallback", 418);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 420);
var timer          = this.enforce_timer;
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 421);
this.enforce_timer = null;

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 423);
var ping_list         = [];
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 424);
this.ignore_value_set = true;

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 426);
Y.each(['dateInput', 'timeInput'], function(name)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "(anonymous 2)", 426);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 428);
if (timer[name])
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 430);
this.get(name).set('value', timer[name]);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 431);
ping_list.push(name);
		}
	},
	this);

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 436);
this.ignore_value_set = false;
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 437);
ping.apply(this, ping_list);

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 439);
this.fire('limitsEnforced');
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 442);
function updateRendering()
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "updateRendering", 442);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 444);
if (!this.calendar)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 446);
return;
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 449);
function mkpath()
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "mkpath", 449);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 451);
var obj = rules;
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 452);
Y.each(arguments, function(key)
		{
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "(anonymous 3)", 452);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 454);
if (!obj[key])
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 456);
obj[key] = {};
			}
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 458);
obj = obj[key];
		});
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 462);
function set(date, type)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "set", 462);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 464);
var y = date.getFullYear(),
			m = date.getMonth(),
			d = date.getDate();

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 468);
mkpath(y, m, d);

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 470);
rules[y][m][d] = type;
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 473);
function disableRemaining(date, delta)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "disableRemaining", 473);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 475);
var d = new Date(date);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 476);
d.setDate(d.getDate() + delta);

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 478);
while (d.getMonth() == date.getMonth())
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 480);
set(d, 'disabled');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 481);
d.setDate(d.getDate() + delta);
		}
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 485);
var blackouts = this.get('blackouts').slice(0),
		rules     = {};

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 488);
var min = this.get('minDateTime');
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 489);
if (min)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 491);
if (blackouts.length > 0)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 493);
var t       = min.date.getTime();
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 494);
var changed = false;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 495);
for (var i=0; i < blackouts.length; i++)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 497);
var blackout = blackouts[i];
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 498);
if (blackout[1] <= t)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 500);
blackouts.shift();
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 501);
i--;
				}
				else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 503);
if (blackout[0] < t)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 505);
var start = new Date(blackout[0]);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 506);
start.setHours(0);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 507);
start.setMinutes(0);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 508);
start.setSeconds(blackout_min_seconds);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 509);
blackouts[i] = [ start.getTime(), blackout[1] ];
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 510);
changed      = true;
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 511);
break;
				}}
			}
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 516);
if (!changed &&
			(min.hour > 0 || min.minute > 0))
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 519);
set(min.date, 'partial');
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 522);
disableRemaining(min.date, -1);
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 525);
var max = this.get('maxDateTime');
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 526);
if (max)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 528);
if (blackouts.length > 0)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 530);
var t       = max.date.getTime();
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 531);
var changed = false;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 532);
for (var i=blackouts.length-1; i>=0; i--)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 534);
var blackout = blackouts[i];
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 535);
if (t <= blackout[0])
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 537);
blackouts.pop();
				}
				else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 539);
if (t < blackout[1])
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 541);
var end = new Date(blackout[1]);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 542);
end.setHours(23);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 543);
end.setMinutes(59);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 544);
end.setSeconds(blackout_max_seconds);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 545);
blackouts[i] = [ blackout[0], end.getTime() ];
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 546);
changed      = true;
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 547);
break;
				}}
			}
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 552);
if (!changed &&
			(max.hour < 23 || max.minute < 59))
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 555);
set(max.date, 'partial');
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 558);
disableRemaining(max.date, +1);
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 561);
for (var i=0; i<blackouts.length; i++)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 563);
var blackout = blackouts[i];
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 564);
var start    = new Date(blackout[0] + blackout_max_seconds*1000);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 565);
var end      = new Date(blackout[1] + blackout_min_seconds*1000);

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 567);
if (start.getHours() > 0 || start.getMinutes() > 0)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 569);
set(start, 'partial');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 570);
start.setDate(start.getDate()+1);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 571);
start.setHours(0);
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 574);
if (end.getHours() < 23 || end.getMinutes() < 59)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 576);
set(end, 'partial');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 577);
end.setDate(end.getDate()-1);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 578);
end.setHours(23);
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 581);
while (start.getTime() < end.getTime())
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 583);
set(start, 'disabled');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 584);
start.setDate(start.getDate()+1);
		}
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 588);
this.calendar.set('customRenderer',
	{
		rules:          rules,
		filterFunction: renderFilter
	});
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 595);
function renderFilter(date, node, rules)
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "renderFilter", 595);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 597);
if (Y.Array.indexOf(rules, 'partial') >= 0)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 599);
node.addClass('yui3-datetime-partial');
	}
	else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 601);
if (Y.Array.indexOf(rules, 'disabled') >= 0)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 603);
node.addClass('yui3-calendar-selection-disabled');
	}}
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 607);
function ping()
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "ping", 607);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 609);
var duration = this.get('pingDuration');
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 610);
if (duration <= 0)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 612);
return;
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 615);
var nodes = new Y.NodeList(Y.reduce(arguments, [], function(list, name)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "(anonymous 4)", 615);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 617);
list.push(this.get(name));
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 618);
return list;
	},
	this));

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 622);
var ping_class = this.get('pingClass');
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 623);
if (this.ping_task)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 625);
this.ping_task.nodes.removeClass(ping_class);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 626);
this.ping_task.cancel();
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 627);
nodes = nodes.concat(this.ping_task.nodes);
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 630);
nodes.addClass(ping_class);

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 632);
this.ping_task = Y.later(duration, this, function()
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "(anonymous 5)", 632);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 634);
this.ping_task = null;
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 635);
nodes.removeClass(ping_class);
	});

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 638);
this.ping_task.nodes = nodes;
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 641);
Y.extend(DateTime, Y.Base,
{
	initializer: function(
		/* object/string */	container,
		/* map */			config)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "initializer", 643);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 647);
var date_input = this.get('dateInput');
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 648);
date_input.on('change', enforceDateTimeLimits, this);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 649);
date_input.after('valueSet', checkEnforceDateTimeLimits, this);

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 651);
var time_input = this.get('timeInput');
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 652);
if (time_input)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 654);
time_input.on('change', enforceDateTimeLimits, this);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 655);
time_input.after('valueSet', checkEnforceDateTimeLimits, this);
		}
		else
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 659);
time_input = Y.Node.create('<input type="hidden"></input>');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 660);
this.set('timeInput', time_input);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 661);
time_input.set('value', Y.DateTimeUtils.formatTime(this.get('blankTime')));
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 662);
var created_time_input = true;
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 665);
var default_date_time = this.get('defaultDateTime');
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 666);
if (default_date_time)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 668);
date_input.set('value', Y.DateTimeUtils.formatDate(default_date_time));
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 669);
if (!created_time_input)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 671);
time_input.set('value', Y.DateTimeUtils.formatTime(default_date_time));
			}
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 675);
if (date_input.calendarSync)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 677);
this.calendar = date_input.calendarSync.get('calendar');

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 679);
if (this.calendar && default_date_time)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 681);
this.calendar.set('date', default_date_time.date);
			}

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 684);
var t = this.get('minDateTime');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 685);
if (this.calendar && t)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 687);
this.calendar.set('minimumDate', t.date);
			}

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 690);
t = this.get('maxDateTime');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 691);
if (this.calendar && t)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 693);
this.calendar.set('maximumDate', t.date);
			}
		}

		// black-out dates

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 699);
updateRendering.call(this);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 700);
this.on('blackoutsChange', updateRendering);
	},

	/**
	 * Get the currently selected date and time.
	 * 
	 * @method getDateTime
	 * @return {Object} year,month,day,hour,minute,date,date_str,time_str
	 */
	getDateTime: function()
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "getDateTime", 709);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 711);
try
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 713);
var date = Y.DateTimeUtils.parseDate(this.get('dateInput').get('value'));
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 714);
if (!date)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 716);
return false;
			}
		}
		catch (e)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 721);
return false;
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 724);
try
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 726);
var time = Y.DateTimeUtils.parseTime(this.get('timeInput').get('value'));
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 727);
if (!time)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 729);
return false;
			}
		}
		catch (e)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 734);
return false;
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 737);
var result      = Y.DateTimeUtils.normalize(Y.mix(date, time));
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 738);
result.date_str = Y.DateTimeUtils.formatDate(result);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 739);
result.time_str = Y.DateTimeUtils.formatTime(result);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 740);
return result;
	},
// TODO
	setDateTime: function(
		/* object */	date_time)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setDateTime", 743);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 746);
this.rb[ this.rb.length-1 ].checked = true;

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 748);
this.calendar.setDate(date_time);

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 750);
if (date_time instanceof Date)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 752);
this.hour_menu.value   = date_time.getHours();
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 753);
this.minute_menu.value = date_time.getMinutes();
		}
		else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 755);
if (date_time.time_str)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 757);
var obj                = DateTime.parseTime(date_time.time_str);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 758);
this.hour_menu.value   = obj.hour;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 759);
this.minute_menu.value = obj.minute;
		}
		else
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 763);
this.hour_menu.value   = date_time.hour;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 764);
this.minute_menu.value = date_time.minute;
		}}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 767);
enforceDateTimeLimits.call(this);
	},
// TODO
	resetDateTime: function()
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "resetDateTime", 770);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 772);
if (this.default_date_time)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 774);
this.calendar.setDate(this.default_date_time);

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 776);
this.hour_menu.value   = this.default_date_time.hour;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 777);
this.minute_menu.value = this.default_date_time.minute;
		}
		else
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 781);
this.calendar.clearDate();

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 783);
this.hour_menu.value   = this.blank_time.hour;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 784);
this.minute_menu.value = this.blank_time.minute;
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 787);
enforceDateTimeLimits.call(this);
	},

	/**
	 * Clear the date and time.
	 *
	 * @method clearDateTime
	 */
	clearDateTime: function()
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "clearDateTime", 795);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 797);
this.get('dateInput').set('value', '');

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 799);
var time_input = this.get('timeInput');
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 800);
if (time_input)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 802);
time_input.set('value', '');
		}
	},
// TODO: on minDateTimeChange
	setMinDateTime: function(
		/* object */	min)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setMinDateTime", 806);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 809);
if (min)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 811);
min = Y.DateTimeUtils.normalize(min, this.blank_time);

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 813);
if (!this.min_date_time ||
				this.min_date_time.date.getTime() != min.date.getTime())
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 816);
this.min_date_time = min;
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 817);
enforceDateTimeLimits.call(this);
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 818);
this.calendar.setMinDate(this.min_date_time);

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 820);
updateRendering.call(this);
			}
		}
		else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 823);
if (this.min_date_time)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 825);
this.min_date_time = null;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 826);
this.calendar.clearMinDate();
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 827);
updateRendering.call(this);
		}}
	},
// TODO: on maxDateTimeChange
	setMaxDateTime: function(
		/* object */	max)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setMaxDateTime", 831);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 834);
if (max)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 836);
max = Y.DateTimeUtils.normalize(max, this.blank_time);

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 838);
if (!this.max_date_time ||
				this.max_date_time.date.getTime() != max.date.getTime())
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 841);
this.max_date_time = max;
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 842);
enforceDateTimeLimits.call(this);
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 843);
this.calendar.setMaxDate(this.max_date_time);

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 845);
updateRendering.call(this);
			}
		}
		else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 848);
if (this.max_date_time)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 850);
this.max_date_time = null;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 851);
this.calendar.clearMaxDate();
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 852);
updateRendering.call(this);
		}}
	}
});

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 857);
Y.DateTime = DateTime;


}, '@VERSION@', {
    "skinnable": "true",
    "requires": [
        "base",
        "gallery-datetime-utils",
        "gallery-funcprog"
    ],
    "optional": [
        "calendar",
        "gallery-timepicker"
    ]
});
