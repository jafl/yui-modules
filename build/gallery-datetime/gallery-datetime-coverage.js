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
_yuitest_coverage["build/gallery-datetime/gallery-datetime.js"].code=["YUI.add('gallery-datetime', function (Y, NAME) {","","\"use strict\";","","var blackout_min_seconds = -40,","	blackout_max_seconds = +40,","	change_after_focus   = (0 < Y.UA.ie);","","/**"," * @module gallery-datetime"," */","","/**********************************************************************"," * Manages a date input field and an optional time field.  Calendars and"," * time selection widgets can be attached to these fields, but will not be"," * managed by this class."," * "," * Date/time values can be specified as either a Date object or an object"," * specifying year,month,day (all 1-based) or date_str and optionally"," * hour,minute or time_str.  Individual values take precedence over string"," * values.  Time resolution is in minutes."," * "," * @main gallery-datetime"," * @class DateTime"," * @extends Base"," * @constructor"," * @param config {Object}"," */","","function DateTime(config)","{","	DateTime.superclass.constructor.apply(this, arguments);","}","","DateTime.NAME = \"datetime\";","","function setNode(n)","{","	return Y.one(n) || Attribute.INVALID_VALUE;","}","","DateTime.ATTRS =","{","	/**","	 * Date input field to use.  Can be augmented with a Calendar via","	 * gallery-input-calendar-sync.","	 * ","	 * @attribute dateInput","	 * @type {Node|String}","	 * @required","	 * @writeonce","	 */","	dateInput:","	{","		setter:    setNode,","		writeOnce: true","	},","","	/**","	 * Time input field to use.  Can be enhanced with gallery-timepicker.","	 * ","	 * @attribute timeInput","	 * @type {Node|String}","	 * @writeonce","	 */","	timeInput:","	{","		setter:    setNode,","		writeOnce: true","	},","","	/**","	 * Default date and time, used during initialization and by resetDateTime().","	 * ","	 * @attribute defaultDateTime","	 * @type {Object}","	 */","	defaultDateTime:","	{","		setter: function(value)","		{","			return value ? Y.DateTimeUtils.normalize(value, this.get('blankTime')) : null;","		}","	},","","	/**","	 * Minimum date and time.","	 * ","	 * @attribute minDateTime","	 * @type {Object}","	 */","	minDateTime:","	{","		setter: function(value)","		{","			return value ? Y.DateTimeUtils.normalize(value, this.get('blankTime')) : null;","		}","	},","","	/**","	 * Maximum date and time.","	 * ","	 * @attribute minDateTime","	 * @type {Object}","	 */","	maxDateTime:","	{","		setter: function(value)","		{","			return value ? Y.DateTimeUtils.normalize(value, this.get('blankTime')) : null;","		}","	},","","	/**","	 * Time value to use when no time is specified, e.g., in a blackout date.","	 * ","	 * @attribute blankTime","	 * @type {Object}","	 * @default { hour:0, minute:0 }","	 */","	blankTime:","	{","		value:     { hour:0, minute:0 },","		validator: function(value)","		{","			return (Y.Lang.isObject(value) &&","					Y.Lang.isNumber(value.hour) &&","					Y.Lang.isNumber(value.minute));","		}","	},","","	/**","	 * Blackout ranges, specified as a list of objects, each defining start","	 * and end.  The data is overwritten, so this is a write-only value.","	 * ","	 * @attribute blackout","	 * @type {Array}","	 * @default []","	 */","	blackouts:","	{","		value:     [],","		validator: Y.Lang.isArray,","		setter:    function(ranges)","		{","			ranges = ranges || [];","","			// store ranges in ascending order of start time","","			var blackouts  = [],","				blank_time = this.get('blankTime');","			for (var i=0; i<ranges.length; i++)","			{","				var r   = ranges[i];","				r.start = Y.DateTimeUtils.normalize(r.start, blank_time);","				r.end   = Y.DateTimeUtils.normalize(r.end,   blank_time);","","				r =","				[","					new Date(r.start.year, r.start.month-1, r.start.day,","							 r.start.hour, r.start.minute, blackout_min_seconds)","							 .getTime(),","					new Date(r.end.year, r.end.month-1, r.end.day,","							 r.end.hour, r.end.minute, blackout_max_seconds)","							 .getTime()","				];","","				var inserted = false;","				for (var j=0; j<blackouts.length; j++)","				{","					var r1 = blackouts[j];","					if (r[0] <= r1[0])","					{","						if (j > 0 &&","							r[0] <  blackouts[j-1][1] &&","							r[1] <= blackouts[j-1][1])","						{","							// covered by prev","						}","						else if (j > 0 &&","								 r[0] - 60000 < blackouts[j-1][1] &&","								 r1[0] < r[1] + 60000)","						{","							// overlaps prev and next","							r = [ blackouts[j-1][0], r[1] ];","							blackouts.splice(j-1, 2, r);","						}","						else if (j > 0 &&","								 r[0] - 60000 < blackouts[j-1][1])","						{","							// overlaps prev","							blackouts[j-1][1] = r[1];","						}","						else if (r1[0] < r[1] + 60000)","						{","							// overlaps next","							r1[0] = r[0];","						}","						else","						{","							blackouts.splice(j, 0, r);","						}","						inserted = true;","						break;","					}","				}","","				// j == blackouts.length","","				if (!inserted && j > 0 &&","					r[0] <  blackouts[j-1][1] &&","					r[1] <= blackouts[j-1][1])","				{","					// covered by prev","				}","				else if (!inserted && j > 0 &&","						 r[0] - 60000 < blackouts[j-1][1])","				{","					// overlaps prev","					blackouts[j-1][1] = r[1];","				}","				else if (!inserted)","				{","					blackouts.push(r);","				}","			}","","			return blackouts;","		}","	},","","	/**","	 * The direction to push the selected date and time when the user","	 * selects a day with partial blackout.  The default value of zero","	 * means go to the nearest available time.","	 *","	 * @attribute blackoutSnapDirection","	 * @type {-1,0,+1}","	 * @default 0","	 */","	blackoutSnapDirection:","	{","		value:     0,","		validator: function(value)","		{","			return (value == -1 || value === 0 || value == +1);","		}","	},","","	/**","	 * Duration of visual ping in milliseconds when the value of an input","	 * field is modified because of a min/max or blackout restriction.  Set","	 * to zero to disable.","	 * ","	 * @attribute pingDuration","	 * @type {Number}","	 * @default 2000","	 */","	pingDuration:","	{","		value:     2000,","		validator: Y.Lang.isNumber","	},","","	/**","	 * CSS class applied to input field when it is pinged.","	 * ","	 * @attribute pingClass","	 * @type {String}","	 * @default \"yui3-datetime-ping\"","	 */","	pingClass:","	{","		value:     'yui3-datetime-ping',","		validator: Y.Lang.isString","	}","};","","/**"," * @event limitsEnforced"," * @description Fires after min/max and blackouts have been enforced."," */","","function checkEnforceDateTimeLimits()","{","	if (!this.ignore_value_set)","	{","		enforceDateTimeLimits.call(this, 'same-day');","	}","}","","function enforceDateTimeLimits(","	/* string */	algo)","{","	var date = this.getDateTime();","	if (!date)","	{","		return;","	}","	date = date.date;","","	var orig_date = new Date(date.getTime());","","	// blackout ranges","","	var blackouts = this.get('blackouts');","	if (blackouts.length > 0)","	{","		var t      = date.getTime(),","			orig_t = t,","			snap   = algo == 'same-day' ? 0 : this.get('blackoutSnapDirection');","","		for (var i=0; i<blackouts.length; i++)","		{","			var blackout = blackouts[i];","			if (blackout[0] < t && t < blackout[1])","			{","				if (snap > 0)","				{","					t = blackout[1] + 60000;","				}","				else if (snap < 0)","				{","					t = blackout[0];","				}","				else if (t - blackout[0] < blackout[1] - t)","				{","					t = blackout[0];","				}","				else","				{","					t = blackout[1] + 60000;","				}","","				break;","			}","		}","","		if (t != orig_t)","		{","			date = new Date(t);","		}","	}","","	// min/max last, shrink inward if blackout dates extend outside [min,max] range","","	var min = this.get('minDateTime');","	if (min)","	{","		var t = min.date.getTime();","","		if (blackouts.length > 0)","		{","			var orig_t = t;","			var i      = 0;","			while (i < blackouts.length && blackouts[i][0] < t)","			{","				t = Math.max(orig_t, blackouts[i][1]);","				i++;","			}","		}","","		if (date.getTime() < t)","		{","			date = new Date(t);","		}","	}","","	var max = this.get('maxDateTime');","	if (max)","	{","		var t = max.date.getTime();","","		if (blackouts.length > 0)","		{","			var orig_t = t;","			var i      = blackouts.length - 1;","			while (i >= 0 && t < blackouts[i][1])","			{","				t = Math.min(orig_t, blackouts[i][0]);","				i--;","			}","		}","","		if (t < date.getTime())","		{","			date = new Date(t);","		}","	}","","	// update controls that changed","","	if (date.getFullYear() !== orig_date.getFullYear() ||","		date.getMonth()    !== orig_date.getMonth()    ||","		date.getDate()     !== orig_date.getDate())","	{","		var timer       = getEnforceTimer.call(this);","		timer.dateInput = Y.DateTimeUtils.formatDate(date);","		timer.timeInput = Y.DateTimeUtils.formatTime(date);","	}","	else if (date.getHours() !== orig_date.getHours() ||","			 date.getMinutes() !== orig_date.getMinutes())","	{","		var timer       = getEnforceTimer.call(this);","		timer.timeInput = Y.DateTimeUtils.formatTime(date);","	}","}","","function getEnforceTimer()","{","	if (!this.enforce_timer)","	{","		this.enforce_timer = Y.later(0, this, function()","		{","			var timer          = this.enforce_timer;","			this.enforce_timer = null;","","			var ping_list         = [];","			this.ignore_value_set = true;","","			Y.each(['dateInput', 'timeInput'], function(name)","			{","				if (timer[name])","				{","					this.get(name).set('value', timer[name]);","					ping_list.push(name);","				}","			},","			this);","","			this.ignore_value_set = false;","			ping.apply(this, ping_list);","","			this.fire('limitsEnforced');","		});","	}","","	return this.enforce_timer;","}","","function updateRendering()","{","	if (!this.calendar)","	{","		return;","	}","","	function mkpath()","	{","		var obj = rules;","		Y.each(arguments, function(key)","		{","			if (!obj[key])","			{","				obj[key] = {};","			}","			obj = obj[key];","		});","	}","","	function set(date, type)","	{","		var y = date.getFullYear(),","			m = date.getMonth(),","			d = date.getDate();","","		mkpath(y, m, d);","","		rules[y][m][d] = type;","	}","","	function disableRemaining(date, delta)","	{","		var d = new Date(date);","		d.setDate(d.getDate() + delta);","","		while (d.getMonth() == date.getMonth())","		{","			set(d, 'disabled');","			d.setDate(d.getDate() + delta);","		}","	}","","	var blackouts = this.get('blackouts').slice(0),","		rules     = {};","","	var min = this.get('minDateTime');","	if (min)","	{","		if (blackouts.length > 0)","		{","			var t       = min.date.getTime();","			var changed = false;","			for (var i=0; i < blackouts.length; i++)","			{","				var blackout = blackouts[i];","				if (blackout[1] <= t)","				{","					blackouts.shift();","					i--;","				}","				else if (blackout[0] < t)","				{","					var start = new Date(blackout[0]);","					start.setHours(0);","					start.setMinutes(0);","					start.setSeconds(blackout_min_seconds);","					blackouts[i] = [ start.getTime(), blackout[1] ];","					changed      = true;","					break;","				}","			}","		}","","		if (!changed &&","			(min.hour > 0 || min.minute > 0))","		{","			set(min.date, 'partial');","		}","","		disableRemaining(min.date, -1);","	}","","	var max = this.get('maxDateTime');","	if (max)","	{","		if (blackouts.length > 0)","		{","			var t       = max.date.getTime();","			var changed = false;","			for (var i=blackouts.length-1; i>=0; i--)","			{","				var blackout = blackouts[i];","				if (t <= blackout[0])","				{","					blackouts.pop();","				}","				else if (t < blackout[1])","				{","					var end = new Date(blackout[1]);","					end.setHours(23);","					end.setMinutes(59);","					end.setSeconds(blackout_max_seconds);","					blackouts[i] = [ blackout[0], end.getTime() ];","					changed      = true;","					break;","				}","			}","		}","","		if (!changed &&","			(max.hour < 23 || max.minute < 59))","		{","			set(max.date, 'partial');","		}","","		disableRemaining(max.date, +1);","	}","","	for (var i=0; i<blackouts.length; i++)","	{","		var blackout = blackouts[i];","		var start    = new Date(blackout[0] + blackout_max_seconds*1000);","		var end      = new Date(blackout[1] + blackout_min_seconds*1000);","","		if (start.getHours() > 0 || start.getMinutes() > 0)","		{","			set(start, 'partial');","			start.setDate(start.getDate()+1);","			start.setHours(0);","		}","","		if (end.getHours() < 23 || end.getMinutes() < 59)","		{","			set(end, 'partial');","			end.setDate(end.getDate()-1);","			end.setHours(23);","		}","","		while (start.getTime() < end.getTime())","		{","			set(start, 'disabled');","			start.setDate(start.getDate()+1);","		}","	}","","	this.calendar.set('customRenderer',","	{","		rules:          rules,","		filterFunction: renderFilter","	});","}","","function renderFilter(date, node, rules)","{","	if (Y.Array.indexOf(rules, 'partial') >= 0)","	{","		node.addClass('yui3-datetime-partial');","	}","	else if (Y.Array.indexOf(rules, 'disabled') >= 0)","	{","		node.addClass('yui3-calendar-selection-disabled');","	}","}","","function ping()","{","	var duration = this.get('pingDuration');","	if (duration <= 0)","	{","		return;","	}","","	var nodes = new Y.NodeList(Y.reduce(arguments, [], function(list, name)","	{","		list.push(this.get(name));","		return list;","	},","	this));","","	var ping_class = this.get('pingClass');","	if (this.ping_task)","	{","		this.ping_task.nodes.removeClass(ping_class);","		this.ping_task.cancel();","		nodes = nodes.concat(this.ping_task.nodes);","	}","","	nodes.addClass(ping_class);","","	this.ping_task = Y.later(duration, this, function()","	{","		this.ping_task = null;","		nodes.removeClass(ping_class);","	});","","	this.ping_task.nodes = nodes;","}","","Y.extend(DateTime, Y.Base,","{","	initializer: function(","		/* object/string */	container,","		/* map */			config)","	{","		var date_input = this.get('dateInput');","		date_input.on('change', enforceDateTimeLimits, this);","		date_input.after('valueSet', checkEnforceDateTimeLimits, this);","","		var time_input = this.get('timeInput');","		if (time_input)","		{","			time_input.on('change', enforceDateTimeLimits, this);","			time_input.after('valueSet', checkEnforceDateTimeLimits, this);","		}","		else","		{","			time_input = Y.Node.create('<input type=\"hidden\"></input>');","			this.set('timeInput', time_input);","			time_input.set('value', Y.DateTimeUtils.formatTime(this.get('blankTime')));","			var created_time_input = true;","		}","","		var default_date_time = this.get('defaultDateTime');","		if (default_date_time)","		{","			date_input.set('value', Y.DateTimeUtils.formatDate(default_date_time));","			if (!created_time_input)","			{","				time_input.set('value', Y.DateTimeUtils.formatTime(default_date_time));","			}","		}","","		if (date_input.calendarSync)","		{","			this.calendar = date_input.calendarSync.get('calendar');","","			if (this.calendar && default_date_time)","			{","				this.calendar.set('date', default_date_time.date);","			}","","			var t = this.get('minDateTime');","			if (this.calendar && t)","			{","				this.calendar.set('minimumDate', t.date);","			}","","			t = this.get('maxDateTime');","			if (this.calendar && t)","			{","				this.calendar.set('maximumDate', t.date);","			}","		}","","		// black-out dates","","		updateRendering.call(this);","		this.on('blackoutsChange', updateRendering);","	},","","	destroy: function()","	{","	},","","	/**","	 * Get the currently selected date and time.","	 * ","	 * @method getDateTime","	 * @return {Object} year,month,day,hour,minute,date,date_str,time_str","	 */","	getDateTime: function()","	{","		try","		{","			var date = Y.DateTimeUtils.parseDate(this.get('dateInput').get('value'));","			if (!date)","			{","				return false;","			}","		}","		catch (e)","		{","			return false;","		}","","		try","		{","			var time = Y.DateTimeUtils.parseTime(this.get('timeInput').get('value'));","			if (!time)","			{","				return false;","			}","		}","		catch (e)","		{","			return false;","		}","","		var result      = Y.DateTimeUtils.normalize(Y.mix(date, time));","		result.date_str = Y.DateTimeUtils.formatDate(result);","		result.time_str = Y.DateTimeUtils.formatTime(result);","		return result;","	},","// TODO","	setDateTime: function(","		/* object */	date_time)","	{","		this.rb[ this.rb.length-1 ].checked = true;","","		this.calendar.setDate(date_time);","","		if (date_time instanceof Date)","		{","			this.hour_menu.value   = date_time.getHours();","			this.minute_menu.value = date_time.getMinutes();","		}","		else if (date_time.time_str)","		{","			var obj                = DateTime.parseTime(date_time.time_str);","			this.hour_menu.value   = obj.hour;","			this.minute_menu.value = obj.minute;","		}","		else","		{","			this.hour_menu.value   = date_time.hour;","			this.minute_menu.value = date_time.minute;","		}","","		enforceDateTimeLimits.call(this);","	},","// TODO","	resetDateTime: function()","	{","		if (this.default_date_time)","		{","			this.calendar.setDate(this.default_date_time);","","			this.hour_menu.value   = this.default_date_time.hour;","			this.minute_menu.value = this.default_date_time.minute;","		}","		else","		{","			this.calendar.clearDate();","","			this.hour_menu.value   = this.blank_time.hour;","			this.minute_menu.value = this.blank_time.minute;","		}","","		enforceDateTimeLimits.call(this);","	},","","	clearDateTime: function()","	{","		this.get('dateInput').set('value', '');","","		var time_input = this.get('timeInput');","		if (time_input)","		{","			time_input.set('value', '');","		}","	},","// TODO: onMinDateTimeChange","	setMinDateTime: function(","		/* object */	min)","	{","		if (min)","		{","			min = Y.DateTimeUtils.normalize(min, this.blank_time);","","			if (!this.min_date_time ||","				this.min_date_time.date.getTime() != min.date.getTime())","			{","				this.min_date_time = min;","				enforceDateTimeLimits.call(this);","				this.calendar.setMinDate(this.min_date_time);","","				updateRendering.call(this);","			}","		}","		else if (this.min_date_time)","		{","			this.min_date_time = null;","			this.calendar.clearMinDate();","			updateRendering.call(this);","		}","	},","// TODO: onMaxDateTimeChange","	setMaxDateTime: function(","		/* object */	max)","	{","		if (max)","		{","			max = Y.DateTimeUtils.normalize(max, this.blank_time);","","			if (!this.max_date_time ||","				this.max_date_time.date.getTime() != max.date.getTime())","			{","				this.max_date_time = max;","				enforceDateTimeLimits.call(this);","				this.calendar.setMaxDate(this.max_date_time);","","				updateRendering.call(this);","			}","		}","		else if (this.max_date_time)","		{","			this.max_date_time = null;","			this.calendar.clearMaxDate();","			updateRendering.call(this);","		}","	}","});","","Y.DateTime = DateTime;","","","}, '@VERSION@', {","    \"skinnable\": \"true\",","    \"requires\": [","        \"base\",","        \"gallery-datetime-utils\",","        \"gallery-funcprog\"","    ],","    \"optional\": [","        \"calendar\",","        \"gallery-timepicker\"","    ]","});"];
_yuitest_coverage["build/gallery-datetime/gallery-datetime.js"].lines = {"1":0,"3":0,"5":0,"30":0,"32":0,"35":0,"37":0,"39":0,"42":0,"82":0,"96":0,"110":0,"126":0,"146":0,"150":0,"152":0,"154":0,"155":0,"156":0,"158":0,"168":0,"169":0,"171":0,"172":0,"174":0,"180":0,"185":0,"186":0,"188":0,"192":0,"194":0,"197":0,"201":0,"203":0,"204":0,"210":0,"216":0,"220":0,"222":0,"224":0,"228":0,"246":0,"284":0,"286":0,"288":0,"292":0,"295":0,"296":0,"298":0,"300":0,"302":0,"306":0,"307":0,"309":0,"313":0,"315":0,"316":0,"318":0,"320":0,"322":0,"324":0,"326":0,"328":0,"332":0,"335":0,"339":0,"341":0,"347":0,"348":0,"350":0,"352":0,"354":0,"355":0,"356":0,"358":0,"359":0,"363":0,"365":0,"369":0,"370":0,"372":0,"374":0,"376":0,"377":0,"378":0,"380":0,"381":0,"385":0,"387":0,"393":0,"397":0,"398":0,"399":0,"401":0,"404":0,"405":0,"409":0,"411":0,"413":0,"415":0,"416":0,"418":0,"419":0,"421":0,"423":0,"425":0,"426":0,"431":0,"432":0,"434":0,"438":0,"441":0,"443":0,"445":0,"448":0,"450":0,"451":0,"453":0,"455":0,"457":0,"461":0,"463":0,"467":0,"469":0,"472":0,"474":0,"475":0,"477":0,"479":0,"480":0,"484":0,"487":0,"488":0,"490":0,"492":0,"493":0,"494":0,"496":0,"497":0,"499":0,"500":0,"502":0,"504":0,"505":0,"506":0,"507":0,"508":0,"509":0,"510":0,"515":0,"518":0,"521":0,"524":0,"525":0,"527":0,"529":0,"530":0,"531":0,"533":0,"534":0,"536":0,"538":0,"540":0,"541":0,"542":0,"543":0,"544":0,"545":0,"546":0,"551":0,"554":0,"557":0,"560":0,"562":0,"563":0,"564":0,"566":0,"568":0,"569":0,"570":0,"573":0,"575":0,"576":0,"577":0,"580":0,"582":0,"583":0,"587":0,"594":0,"596":0,"598":0,"600":0,"602":0,"606":0,"608":0,"609":0,"611":0,"614":0,"616":0,"617":0,"621":0,"622":0,"624":0,"625":0,"626":0,"629":0,"631":0,"633":0,"634":0,"637":0,"640":0,"646":0,"647":0,"648":0,"650":0,"651":0,"653":0,"654":0,"658":0,"659":0,"660":0,"661":0,"664":0,"665":0,"667":0,"668":0,"670":0,"674":0,"676":0,"678":0,"680":0,"683":0,"684":0,"686":0,"689":0,"690":0,"692":0,"698":0,"699":0,"714":0,"716":0,"717":0,"719":0,"724":0,"727":0,"729":0,"730":0,"732":0,"737":0,"740":0,"741":0,"742":0,"743":0,"749":0,"751":0,"753":0,"755":0,"756":0,"758":0,"760":0,"761":0,"762":0,"766":0,"767":0,"770":0,"775":0,"777":0,"779":0,"780":0,"784":0,"786":0,"787":0,"790":0,"795":0,"797":0,"798":0,"800":0,"807":0,"809":0,"811":0,"814":0,"815":0,"816":0,"818":0,"821":0,"823":0,"824":0,"825":0,"832":0,"834":0,"836":0,"839":0,"840":0,"841":0,"843":0,"846":0,"848":0,"849":0,"850":0,"855":0};
_yuitest_coverage["build/gallery-datetime/gallery-datetime.js"].functions = {"DateTime:30":0,"setNode:37":0,"setter:80":0,"setter:94":0,"setter:108":0,"validator:124":0,"setter:144":0,"validator:244":0,"checkEnforceDateTimeLimits:284":0,"enforceDateTimeLimits:292":0,"(anonymous 3):421":0,"(anonymous 2):413":0,"getEnforceTimer:409":0,"(anonymous 4):451":0,"mkpath:448":0,"set:461":0,"disableRemaining:472":0,"updateRendering:441":0,"renderFilter:594":0,"(anonymous 5):614":0,"(anonymous 6):631":0,"ping:606":0,"initializer:642":0,"getDateTime:712":0,"setDateTime:746":0,"resetDateTime:773":0,"clearDateTime:793":0,"setMinDateTime:804":0,"setMaxDateTime:829":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-datetime/gallery-datetime.js"].coveredLines = 300;
_yuitest_coverage["build/gallery-datetime/gallery-datetime.js"].coveredFunctions = 30;
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
		setter: function(value)
		{
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setter", 80);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 82);
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
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setter", 94);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 96);
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
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setter", 108);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 110);
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
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "validator", 124);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 126);
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
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setter", 144);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 146);
ranges = ranges || [];

			// store ranges in ascending order of start time

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 150);
var blackouts  = [],
				blank_time = this.get('blankTime');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 152);
for (var i=0; i<ranges.length; i++)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 154);
var r   = ranges[i];
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 155);
r.start = Y.DateTimeUtils.normalize(r.start, blank_time);
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 156);
r.end   = Y.DateTimeUtils.normalize(r.end,   blank_time);

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 158);
r =
				[
					new Date(r.start.year, r.start.month-1, r.start.day,
							 r.start.hour, r.start.minute, blackout_min_seconds)
							 .getTime(),
					new Date(r.end.year, r.end.month-1, r.end.day,
							 r.end.hour, r.end.minute, blackout_max_seconds)
							 .getTime()
				];

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 168);
var inserted = false;
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 169);
for (var j=0; j<blackouts.length; j++)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 171);
var r1 = blackouts[j];
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 172);
if (r[0] <= r1[0])
					{
						_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 174);
if (j > 0 &&
							r[0] <  blackouts[j-1][1] &&
							r[1] <= blackouts[j-1][1])
						{
							// covered by prev
						}
						else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 180);
if (j > 0 &&
								 r[0] - 60000 < blackouts[j-1][1] &&
								 r1[0] < r[1] + 60000)
						{
							// overlaps prev and next
							_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 185);
r = [ blackouts[j-1][0], r[1] ];
							_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 186);
blackouts.splice(j-1, 2, r);
						}
						else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 188);
if (j > 0 &&
								 r[0] - 60000 < blackouts[j-1][1])
						{
							// overlaps prev
							_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 192);
blackouts[j-1][1] = r[1];
						}
						else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 194);
if (r1[0] < r[1] + 60000)
						{
							// overlaps next
							_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 197);
r1[0] = r[0];
						}
						else
						{
							_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 201);
blackouts.splice(j, 0, r);
						}}}}
						_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 203);
inserted = true;
						_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 204);
break;
					}
				}

				// j == blackouts.length

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 210);
if (!inserted && j > 0 &&
					r[0] <  blackouts[j-1][1] &&
					r[1] <= blackouts[j-1][1])
				{
					// covered by prev
				}
				else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 216);
if (!inserted && j > 0 &&
						 r[0] - 60000 < blackouts[j-1][1])
				{
					// overlaps prev
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 220);
blackouts[j-1][1] = r[1];
				}
				else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 222);
if (!inserted)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 224);
blackouts.push(r);
				}}}
			}

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 228);
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
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "validator", 244);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 246);
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

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 284);
function checkEnforceDateTimeLimits()
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "checkEnforceDateTimeLimits", 284);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 286);
if (!this.ignore_value_set)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 288);
enforceDateTimeLimits.call(this, 'same-day');
	}
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 292);
function enforceDateTimeLimits(
	/* string */	algo)
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "enforceDateTimeLimits", 292);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 295);
var date = this.getDateTime();
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 296);
if (!date)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 298);
return;
	}
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 300);
date = date.date;

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 302);
var orig_date = new Date(date.getTime());

	// blackout ranges

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 306);
var blackouts = this.get('blackouts');
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 307);
if (blackouts.length > 0)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 309);
var t      = date.getTime(),
			orig_t = t,
			snap   = algo == 'same-day' ? 0 : this.get('blackoutSnapDirection');

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 313);
for (var i=0; i<blackouts.length; i++)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 315);
var blackout = blackouts[i];
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 316);
if (blackout[0] < t && t < blackout[1])
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 318);
if (snap > 0)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 320);
t = blackout[1] + 60000;
				}
				else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 322);
if (snap < 0)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 324);
t = blackout[0];
				}
				else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 326);
if (t - blackout[0] < blackout[1] - t)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 328);
t = blackout[0];
				}
				else
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 332);
t = blackout[1] + 60000;
				}}}

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
var t = min.date.getTime();

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 352);
if (blackouts.length > 0)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 354);
var orig_t = t;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 355);
var i      = 0;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 356);
while (i < blackouts.length && blackouts[i][0] < t)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 358);
t = Math.max(orig_t, blackouts[i][1]);
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
var t = max.date.getTime();

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 374);
if (blackouts.length > 0)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 376);
var orig_t = t;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 377);
var i      = blackouts.length - 1;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 378);
while (i >= 0 && t < blackouts[i][1])
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 380);
t = Math.min(orig_t, blackouts[i][0]);
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
if (date.getFullYear() !== orig_date.getFullYear() ||
		date.getMonth()    !== orig_date.getMonth()    ||
		date.getDate()     !== orig_date.getDate())
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 397);
var timer       = getEnforceTimer.call(this);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 398);
timer.dateInput = Y.DateTimeUtils.formatDate(date);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 399);
timer.timeInput = Y.DateTimeUtils.formatTime(date);
	}
	else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 401);
if (date.getHours() !== orig_date.getHours() ||
			 date.getMinutes() !== orig_date.getMinutes())
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 404);
var timer       = getEnforceTimer.call(this);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 405);
timer.timeInput = Y.DateTimeUtils.formatTime(date);
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
this.enforce_timer = Y.later(0, this, function()
		{
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "(anonymous 2)", 413);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 415);
var timer          = this.enforce_timer;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 416);
this.enforce_timer = null;

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 418);
var ping_list         = [];
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 419);
this.ignore_value_set = true;

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 421);
Y.each(['dateInput', 'timeInput'], function(name)
			{
				_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "(anonymous 3)", 421);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 423);
if (timer[name])
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 425);
this.get(name).set('value', timer[name]);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 426);
ping_list.push(name);
				}
			},
			this);

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 431);
this.ignore_value_set = false;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 432);
ping.apply(this, ping_list);

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 434);
this.fire('limitsEnforced');
		});
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 438);
return this.enforce_timer;
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 441);
function updateRendering()
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "updateRendering", 441);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 443);
if (!this.calendar)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 445);
return;
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 448);
function mkpath()
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "mkpath", 448);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 450);
var obj = rules;
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 451);
Y.each(arguments, function(key)
		{
			_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "(anonymous 4)", 451);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 453);
if (!obj[key])
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 455);
obj[key] = {};
			}
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 457);
obj = obj[key];
		});
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 461);
function set(date, type)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "set", 461);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 463);
var y = date.getFullYear(),
			m = date.getMonth(),
			d = date.getDate();

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 467);
mkpath(y, m, d);

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 469);
rules[y][m][d] = type;
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 472);
function disableRemaining(date, delta)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "disableRemaining", 472);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 474);
var d = new Date(date);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 475);
d.setDate(d.getDate() + delta);

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 477);
while (d.getMonth() == date.getMonth())
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 479);
set(d, 'disabled');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 480);
d.setDate(d.getDate() + delta);
		}
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 484);
var blackouts = this.get('blackouts').slice(0),
		rules     = {};

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 487);
var min = this.get('minDateTime');
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 488);
if (min)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 490);
if (blackouts.length > 0)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 492);
var t       = min.date.getTime();
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 493);
var changed = false;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 494);
for (var i=0; i < blackouts.length; i++)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 496);
var blackout = blackouts[i];
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 497);
if (blackout[1] <= t)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 499);
blackouts.shift();
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 500);
i--;
				}
				else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 502);
if (blackout[0] < t)
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 504);
var start = new Date(blackout[0]);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 505);
start.setHours(0);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 506);
start.setMinutes(0);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 507);
start.setSeconds(blackout_min_seconds);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 508);
blackouts[i] = [ start.getTime(), blackout[1] ];
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 509);
changed      = true;
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 510);
break;
				}}
			}
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 515);
if (!changed &&
			(min.hour > 0 || min.minute > 0))
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 518);
set(min.date, 'partial');
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 521);
disableRemaining(min.date, -1);
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 524);
var max = this.get('maxDateTime');
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 525);
if (max)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 527);
if (blackouts.length > 0)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 529);
var t       = max.date.getTime();
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 530);
var changed = false;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 531);
for (var i=blackouts.length-1; i>=0; i--)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 533);
var blackout = blackouts[i];
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 534);
if (t <= blackout[0])
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 536);
blackouts.pop();
				}
				else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 538);
if (t < blackout[1])
				{
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 540);
var end = new Date(blackout[1]);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 541);
end.setHours(23);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 542);
end.setMinutes(59);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 543);
end.setSeconds(blackout_max_seconds);
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 544);
blackouts[i] = [ blackout[0], end.getTime() ];
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 545);
changed      = true;
					_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 546);
break;
				}}
			}
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 551);
if (!changed &&
			(max.hour < 23 || max.minute < 59))
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 554);
set(max.date, 'partial');
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 557);
disableRemaining(max.date, +1);
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 560);
for (var i=0; i<blackouts.length; i++)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 562);
var blackout = blackouts[i];
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 563);
var start    = new Date(blackout[0] + blackout_max_seconds*1000);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 564);
var end      = new Date(blackout[1] + blackout_min_seconds*1000);

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 566);
if (start.getHours() > 0 || start.getMinutes() > 0)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 568);
set(start, 'partial');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 569);
start.setDate(start.getDate()+1);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 570);
start.setHours(0);
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 573);
if (end.getHours() < 23 || end.getMinutes() < 59)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 575);
set(end, 'partial');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 576);
end.setDate(end.getDate()-1);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 577);
end.setHours(23);
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 580);
while (start.getTime() < end.getTime())
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 582);
set(start, 'disabled');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 583);
start.setDate(start.getDate()+1);
		}
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 587);
this.calendar.set('customRenderer',
	{
		rules:          rules,
		filterFunction: renderFilter
	});
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 594);
function renderFilter(date, node, rules)
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "renderFilter", 594);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 596);
if (Y.Array.indexOf(rules, 'partial') >= 0)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 598);
node.addClass('yui3-datetime-partial');
	}
	else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 600);
if (Y.Array.indexOf(rules, 'disabled') >= 0)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 602);
node.addClass('yui3-calendar-selection-disabled');
	}}
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 606);
function ping()
{
	_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "ping", 606);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 608);
var duration = this.get('pingDuration');
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 609);
if (duration <= 0)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 611);
return;
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 614);
var nodes = new Y.NodeList(Y.reduce(arguments, [], function(list, name)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "(anonymous 5)", 614);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 616);
list.push(this.get(name));
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 617);
return list;
	},
	this));

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 621);
var ping_class = this.get('pingClass');
	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 622);
if (this.ping_task)
	{
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 624);
this.ping_task.nodes.removeClass(ping_class);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 625);
this.ping_task.cancel();
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 626);
nodes = nodes.concat(this.ping_task.nodes);
	}

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 629);
nodes.addClass(ping_class);

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 631);
this.ping_task = Y.later(duration, this, function()
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "(anonymous 6)", 631);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 633);
this.ping_task = null;
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 634);
nodes.removeClass(ping_class);
	});

	_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 637);
this.ping_task.nodes = nodes;
}

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 640);
Y.extend(DateTime, Y.Base,
{
	initializer: function(
		/* object/string */	container,
		/* map */			config)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "initializer", 642);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 646);
var date_input = this.get('dateInput');
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 647);
date_input.on('change', enforceDateTimeLimits, this);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 648);
date_input.after('valueSet', checkEnforceDateTimeLimits, this);

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 650);
var time_input = this.get('timeInput');
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 651);
if (time_input)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 653);
time_input.on('change', enforceDateTimeLimits, this);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 654);
time_input.after('valueSet', checkEnforceDateTimeLimits, this);
		}
		else
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 658);
time_input = Y.Node.create('<input type="hidden"></input>');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 659);
this.set('timeInput', time_input);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 660);
time_input.set('value', Y.DateTimeUtils.formatTime(this.get('blankTime')));
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 661);
var created_time_input = true;
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 664);
var default_date_time = this.get('defaultDateTime');
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 665);
if (default_date_time)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 667);
date_input.set('value', Y.DateTimeUtils.formatDate(default_date_time));
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 668);
if (!created_time_input)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 670);
time_input.set('value', Y.DateTimeUtils.formatTime(default_date_time));
			}
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 674);
if (date_input.calendarSync)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 676);
this.calendar = date_input.calendarSync.get('calendar');

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 678);
if (this.calendar && default_date_time)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 680);
this.calendar.set('date', default_date_time.date);
			}

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 683);
var t = this.get('minDateTime');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 684);
if (this.calendar && t)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 686);
this.calendar.set('minimumDate', t.date);
			}

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 689);
t = this.get('maxDateTime');
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 690);
if (this.calendar && t)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 692);
this.calendar.set('maximumDate', t.date);
			}
		}

		// black-out dates

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 698);
updateRendering.call(this);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 699);
this.on('blackoutsChange', updateRendering);
	},

	destroy: function()
	{
	},

	/**
	 * Get the currently selected date and time.
	 * 
	 * @method getDateTime
	 * @return {Object} year,month,day,hour,minute,date,date_str,time_str
	 */
	getDateTime: function()
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "getDateTime", 712);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 714);
try
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 716);
var date = Y.DateTimeUtils.parseDate(this.get('dateInput').get('value'));
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 717);
if (!date)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 719);
return false;
			}
		}
		catch (e)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 724);
return false;
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 727);
try
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 729);
var time = Y.DateTimeUtils.parseTime(this.get('timeInput').get('value'));
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 730);
if (!time)
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 732);
return false;
			}
		}
		catch (e)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 737);
return false;
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 740);
var result      = Y.DateTimeUtils.normalize(Y.mix(date, time));
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 741);
result.date_str = Y.DateTimeUtils.formatDate(result);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 742);
result.time_str = Y.DateTimeUtils.formatTime(result);
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 743);
return result;
	},
// TODO
	setDateTime: function(
		/* object */	date_time)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setDateTime", 746);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 749);
this.rb[ this.rb.length-1 ].checked = true;

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 751);
this.calendar.setDate(date_time);

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 753);
if (date_time instanceof Date)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 755);
this.hour_menu.value   = date_time.getHours();
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 756);
this.minute_menu.value = date_time.getMinutes();
		}
		else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 758);
if (date_time.time_str)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 760);
var obj                = DateTime.parseTime(date_time.time_str);
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 761);
this.hour_menu.value   = obj.hour;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 762);
this.minute_menu.value = obj.minute;
		}
		else
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 766);
this.hour_menu.value   = date_time.hour;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 767);
this.minute_menu.value = date_time.minute;
		}}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 770);
enforceDateTimeLimits.call(this);
	},
// TODO
	resetDateTime: function()
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "resetDateTime", 773);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 775);
if (this.default_date_time)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 777);
this.calendar.setDate(this.default_date_time);

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 779);
this.hour_menu.value   = this.default_date_time.hour;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 780);
this.minute_menu.value = this.default_date_time.minute;
		}
		else
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 784);
this.calendar.clearDate();

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 786);
this.hour_menu.value   = this.blank_time.hour;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 787);
this.minute_menu.value = this.blank_time.minute;
		}

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 790);
enforceDateTimeLimits.call(this);
	},

	clearDateTime: function()
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "clearDateTime", 793);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 795);
this.get('dateInput').set('value', '');

		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 797);
var time_input = this.get('timeInput');
		_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 798);
if (time_input)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 800);
time_input.set('value', '');
		}
	},
// TODO: onMinDateTimeChange
	setMinDateTime: function(
		/* object */	min)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setMinDateTime", 804);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 807);
if (min)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 809);
min = Y.DateTimeUtils.normalize(min, this.blank_time);

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 811);
if (!this.min_date_time ||
				this.min_date_time.date.getTime() != min.date.getTime())
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 814);
this.min_date_time = min;
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 815);
enforceDateTimeLimits.call(this);
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 816);
this.calendar.setMinDate(this.min_date_time);

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 818);
updateRendering.call(this);
			}
		}
		else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 821);
if (this.min_date_time)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 823);
this.min_date_time = null;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 824);
this.calendar.clearMinDate();
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 825);
updateRendering.call(this);
		}}
	},
// TODO: onMaxDateTimeChange
	setMaxDateTime: function(
		/* object */	max)
	{
		_yuitest_coverfunc("build/gallery-datetime/gallery-datetime.js", "setMaxDateTime", 829);
_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 832);
if (max)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 834);
max = Y.DateTimeUtils.normalize(max, this.blank_time);

			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 836);
if (!this.max_date_time ||
				this.max_date_time.date.getTime() != max.date.getTime())
			{
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 839);
this.max_date_time = max;
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 840);
enforceDateTimeLimits.call(this);
				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 841);
this.calendar.setMaxDate(this.max_date_time);

				_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 843);
updateRendering.call(this);
			}
		}
		else {_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 846);
if (this.max_date_time)
		{
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 848);
this.max_date_time = null;
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 849);
this.calendar.clearMaxDate();
			_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 850);
updateRendering.call(this);
		}}
	}
});

_yuitest_coverline("build/gallery-datetime/gallery-datetime.js", 855);
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
