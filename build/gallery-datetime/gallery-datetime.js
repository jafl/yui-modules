YUI.add('gallery-datetime', function (Y, NAME) {

"use strict";

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

function DateTime(config)
{
	DateTime.superclass.constructor.apply(this, arguments);
}

DateTime.NAME = "datetime";

function setNode(n)
{
	return Y.one(n) || Attribute.INVALID_VALUE;
}

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
			ranges = ranges || [];

			// store ranges in ascending order of start time

			var blackouts  = [],
				blank_time = this.get('blankTime');
			for (var i=0; i<ranges.length; i++)
			{
				var r   = ranges[i];
				r.start = Y.DateTimeUtils.normalize(r.start, blank_time);
				r.end   = Y.DateTimeUtils.normalize(r.end,   blank_time);

				r =
				[
					new Date(r.start.year, r.start.month-1, r.start.day,
							 r.start.hour, r.start.minute, blackout_min_seconds)
							 .getTime(),
					new Date(r.end.year, r.end.month-1, r.end.day,
							 r.end.hour, r.end.minute, blackout_max_seconds)
							 .getTime()
				];

				var inserted = false;
				for (var j=0; j<blackouts.length; j++)
				{
					var r1 = blackouts[j];
					if (r[0] <= r1[0])
					{
						if (j > 0 &&
							r[0] <  blackouts[j-1][1] &&
							r[1] <= blackouts[j-1][1])
						{
							// covered by prev
						}
						else if (j > 0 &&
								 r[0] - 60000 < blackouts[j-1][1] &&
								 r1[0] < r[1] + 60000)
						{
							// overlaps prev and next
							r = [ blackouts[j-1][0], r[1] ];
							blackouts.splice(j-1, 2, r);
						}
						else if (j > 0 &&
								 r[0] - 60000 < blackouts[j-1][1])
						{
							// overlaps prev
							blackouts[j-1][1] = r[1];
						}
						else if (r1[0] < r[1] + 60000)
						{
							// overlaps next
							r1[0] = r[0];
						}
						else
						{
							blackouts.splice(j, 0, r);
						}
						inserted = true;
						break;
					}
				}

				// j == blackouts.length

				if (!inserted && j > 0 &&
					r[0] <  blackouts[j-1][1] &&
					r[1] <= blackouts[j-1][1])
				{
					// covered by prev
				}
				else if (!inserted && j > 0 &&
						 r[0] - 60000 < blackouts[j-1][1])
				{
					// overlaps prev
					blackouts[j-1][1] = r[1];
				}
				else if (!inserted)
				{
					blackouts.push(r);
				}
			}

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

function checkEnforceDateTimeLimits()
{
	if (!this.ignore_value_set)
	{
		enforceDateTimeLimits.call(this, 'same-day');
	}
}

function enforceDateTimeLimits(
	/* string */	algo)
{
	var date = this.getDateTime();
	if (!date)
	{
		return;
	}
	date = date.date;

	var orig_date = new Date(date.getTime());

	// blackout ranges

	var blackouts = this.get('blackouts');
	if (blackouts.length > 0)
	{
		var t      = date.getTime(),
			orig_t = t,
			snap   = algo == 'same-day' ? 0 : this.get('blackoutSnapDirection');

		for (var i=0; i<blackouts.length; i++)
		{
			var blackout = blackouts[i];
			if (blackout[0] < t && t < blackout[1])
			{
				if (snap > 0)
				{
					t = blackout[1] + 60000;
				}
				else if (snap < 0)
				{
					t = blackout[0];
				}
				else if (t - blackout[0] < blackout[1] - t)
				{
					t = blackout[0];
				}
				else
				{
					t = blackout[1] + 60000;
				}

				break;
			}
		}

		if (t != orig_t)
		{
			date = new Date(t);
		}
	}

	// min/max last, shrink inward if blackout dates extend outside [min,max] range

	var min = this.get('minDateTime');
	if (min)
	{
		var t = min.date.getTime();

		if (blackouts.length > 0)
		{
			var orig_t = t;
			var i      = 0;
			while (i < blackouts.length && blackouts[i][0] < t)
			{
				t = Math.max(orig_t, blackouts[i][1]);
				i++;
			}
		}

		if (date.getTime() < t)
		{
			date = new Date(t);
		}
	}

	var max = this.get('maxDateTime');
	if (max)
	{
		var t = max.date.getTime();

		if (blackouts.length > 0)
		{
			var orig_t = t;
			var i      = blackouts.length - 1;
			while (i >= 0 && t < blackouts[i][1])
			{
				t = Math.min(orig_t, blackouts[i][0]);
				i--;
			}
		}

		if (t < date.getTime())
		{
			date = new Date(t);
		}
	}

	// update controls that changed

	this.ignore_value_set = true;

	if (date.getFullYear() !== orig_date.getFullYear() ||
		date.getMonth()    !== orig_date.getMonth()    ||
		date.getDate()     !== orig_date.getDate())
	{
		var timer       = getEnforceTimer.call(this);
		timer.dateInput = Y.DateTimeUtils.formatDate(date);
		timer.timeInput = Y.DateTimeUtils.formatTime(date);
	}
	else if (date.getHours() !== orig_date.getHours() ||
			 date.getMinutes() !== orig_date.getMinutes())
	{
		var timer       = getEnforceTimer.call(this);
		timer.timeInput = Y.DateTimeUtils.formatTime(date);
	}

	this.ignore_value_set = false;

	this.fire('limitsEnforced');
}

function getEnforceTimer()
{
	if (!this.enforce_timer)
	{
		this.enforce_timer = Y.later(0, this, function()
		{
			var ping_list = [];

			Y.each(['dateInput', 'timeInput'], function(name)
			{
				if (this.enforce_timer[name])
				{
					this.get(name).set('value', this.enforce_timer[name]);
					ping_list.push(name);
				}
			},
			this);

			ping.apply(this, ping_list);
			this.enforce_timer = null;
		});
	}

	return this.enforce_timer;
}

function updateRendering()
{
	if (!this.calendar)
	{
		return;
	}

	function mkpath()
	{
		var obj = rules;
		Y.each(arguments, function(key)
		{
			if (!obj[key])
			{
				obj[key] = {};
			}
			obj = obj[key];
		});
	}

	function set(date, type)
	{
		var y = date.getFullYear(),
			m = date.getMonth(),
			d = date.getDate();

		mkpath(y, m, d);

		rules[y][m][d] = type;
	}

	function disableRemaining(date, delta)
	{
		var d = new Date(date);
		d.setDate(d.getDate() + delta);

		while (d.getMonth() == date.getMonth())
		{
			set(d, 'disabled');
			d.setDate(d.getDate() + delta);
		}
	}

	var blackouts = this.get('blackouts').slice(0),
		rules     = {};

	var min = this.get('minDateTime');
	if (min)
	{
		if (blackouts.length > 0)
		{
			var t       = min.date.getTime();
			var changed = false;
			for (var i=0; i < blackouts.length; i++)
			{
				var blackout = blackouts[i];
				if (blackout[1] <= t)
				{
					blackouts.shift();
					i--;
				}
				else if (blackout[0] < t)
				{
					var start = new Date(blackout[0]);
					start.setHours(0);
					start.setMinutes(0);
					start.setSeconds(blackout_min_seconds);
					blackouts[i] = [ start.getTime(), blackout[1] ];
					changed      = true;
					break;
				}
			}
		}

		if (!changed &&
			(min.hour > 0 || min.minute > 0))
		{
			set(min.date, 'partial');
		}

		disableRemaining(min.date, -1);
	}

	var max = this.get('maxDateTime');
	if (max)
	{
		if (blackouts.length > 0)
		{
			var t       = max.date.getTime();
			var changed = false;
			for (var i=blackouts.length-1; i>=0; i--)
			{
				var blackout = blackouts[i];
				if (t <= blackout[0])
				{
					blackouts.pop();
				}
				else if (t < blackout[1])
				{
					var end = new Date(blackout[1]);
					end.setHours(23);
					end.setMinutes(59);
					end.setSeconds(blackout_max_seconds);
					blackouts[i] = [ blackout[0], end.getTime() ];
					changed      = true;
					break;
				}
			}
		}

		if (!changed &&
			(max.hour < 23 || max.minute < 59))
		{
			set(max.date, 'partial');
		}

		disableRemaining(max.date, +1);
	}

	for (var i=0; i<blackouts.length; i++)
	{
		var blackout = blackouts[i];
		var start    = new Date(blackout[0] + blackout_max_seconds*1000);
		var end      = new Date(blackout[1] + blackout_min_seconds*1000);

		if (start.getHours() > 0 || start.getMinutes() > 0)
		{
			set(start, 'partial');
			start.setDate(start.getDate()+1);
			start.setHours(0);
		}

		if (end.getHours() < 23 || end.getMinutes() < 59)
		{
			set(end, 'partial');
			end.setDate(end.getDate()-1);
			end.setHours(23);
		}

		while (start.getTime() < end.getTime())
		{
			set(start, 'disabled');
			start.setDate(start.getDate()+1);
		}
	}

	this.calendar.set('customRenderer',
	{
		rules:          rules,
		filterFunction: renderFilter
	});
}

function renderFilter(date, node, rules)
{
	if (Y.Array.indexOf(rules, 'partial') >= 0)
	{
		node.addClass('yui3-datetime-partial');
	}
	else if (Y.Array.indexOf(rules, 'disabled') >= 0)
	{
		node.addClass('yui3-calendar-selection-disabled');
	}
}

function ping()
{
	var duration = this.get('pingDuration');
	if (duration <= 0)
	{
		return;
	}

	var nodes = new Y.NodeList(Y.reduce(arguments, [], function(list, name)
	{
		list.push(this.get(name));
		return list;
	},
	this));

	var ping_class = this.get('pingClass');
	if (this.ping_task)
	{
		this.ping_task.nodes.removeClass(ping_class);
		this.ping_task.cancel();
		nodes = nodes.concat(this.ping_task.nodes);
	}

	nodes.addClass(ping_class);

	this.ping_task = Y.later(duration, this, function()
	{
		this.ping_task = null;
		nodes.removeClass(ping_class);
	});

	this.ping_task.nodes = nodes;
}

Y.extend(DateTime, Y.Base,
{
	initializer: function(
		/* object/string */	container,
		/* map */			config)
	{
		var date_input = this.get('dateInput');
		date_input.on('change', enforceDateTimeLimits, this);
		date_input.after('valueSet', checkEnforceDateTimeLimits, this);

		var time_input = this.get('timeInput');
		if (time_input)
		{
			time_input.on('change', enforceDateTimeLimits, this);
			time_input.after('valueSet', checkEnforceDateTimeLimits, this);
		}
		else
		{
			time_input = Y.Node.create('<input type="hidden"></input>');
			this.set('timeInput', time_input);
			time_input.set('value', Y.DateTimeUtils.formatTime(this.get('blankTime')));
			var created_time_input = true;
		}

		var default_date_time = this.get('defaultDateTime');
		if (default_date_time)
		{
			date_input.set('value', Y.DateTimeUtils.formatDate(default_date_time));
			if (!created_time_input)
			{
				time_input.set('value', Y.DateTimeUtils.formatTime(default_date_time));
			}
		}

		if (date_input.calendarSync)
		{
			this.calendar = date_input.calendarSync.get('calendar');

			if (this.calendar && default_date_time)
			{
				this.calendar.set('date', default_date_time.date);
			}

			var t = this.get('minDateTime');
			if (this.calendar && t)
			{
				this.calendar.set('minimumDate', t.date);
			}

			t = this.get('maxDateTime');
			if (this.calendar && t)
			{
				this.calendar.set('maximumDate', t.date);
			}
		}

		// black-out dates

		updateRendering.call(this);
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
		try
		{
			var date = Y.DateTimeUtils.parseDate(this.get('dateInput').get('value'));
			if (!date)
			{
				return false;
			}
		}
		catch (e)
		{
			return false;
		}

		try
		{
			var time = Y.DateTimeUtils.parseTime(this.get('timeInput').get('value'));
			if (!time)
			{
				return false;
			}
		}
		catch (e)
		{
			return false;
		}

		var result      = Y.DateTimeUtils.normalize(Y.mix(date, time));
		result.date_str = Y.DateTimeUtils.formatDate(result);
		result.time_str = Y.DateTimeUtils.formatTime(result);
		return result;
	},
// TODO
	setDateTime: function(
		/* object */	date_time)
	{
		this.rb[ this.rb.length-1 ].checked = true;

		this.calendar.setDate(date_time);

		if (date_time instanceof Date)
		{
			this.hour_menu.value   = date_time.getHours();
			this.minute_menu.value = date_time.getMinutes();
		}
		else if (date_time.time_str)
		{
			var obj                = DateTime.parseTime(date_time.time_str);
			this.hour_menu.value   = obj.hour;
			this.minute_menu.value = obj.minute;
		}
		else
		{
			this.hour_menu.value   = date_time.hour;
			this.minute_menu.value = date_time.minute;
		}

		enforceDateTimeLimits.call(this);
	},
// TODO
	resetDateTime: function()
	{
		if (this.default_date_time)
		{
			this.calendar.setDate(this.default_date_time);

			this.hour_menu.value   = this.default_date_time.hour;
			this.minute_menu.value = this.default_date_time.minute;
		}
		else
		{
			this.calendar.clearDate();

			this.hour_menu.value   = this.blank_time.hour;
			this.minute_menu.value = this.blank_time.minute;
		}

		enforceDateTimeLimits.call(this);
	},

	clearDateTime: function()
	{
		this.get('dateInput').set('value', '');

		var time_input = this.get('timeInput');
		if (time_input)
		{
			time_input.set('value', '');
		}
	},
// TODO: onMinDateTimeChange
	setMinDateTime: function(
		/* object */	min)
	{
		if (min)
		{
			min = Y.DateTimeUtils.normalize(min, this.blank_time);

			if (!this.min_date_time ||
				this.min_date_time.date.getTime() != min.date.getTime())
			{
				this.min_date_time = min;
				enforceDateTimeLimits.call(this);
				this.calendar.setMinDate(this.min_date_time);

				updateRendering.call(this);
			}
		}
		else if (this.min_date_time)
		{
			this.min_date_time = null;
			this.calendar.clearMinDate();
			updateRendering.call(this);
		}
	},
// TODO: onMaxDateTimeChange
	setMaxDateTime: function(
		/* object */	max)
	{
		if (max)
		{
			max = Y.DateTimeUtils.normalize(max, this.blank_time);

			if (!this.max_date_time ||
				this.max_date_time.date.getTime() != max.date.getTime())
			{
				this.max_date_time = max;
				enforceDateTimeLimits.call(this);
				this.calendar.setMaxDate(this.max_date_time);

				updateRendering.call(this);
			}
		}
		else if (this.max_date_time)
		{
			this.max_date_time = null;
			this.calendar.clearMaxDate();
			updateRendering.call(this);
		}
	}
});

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
