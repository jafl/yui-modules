"use strict";

var Dom = YAHOO.util.Dom,
	Event = YAHOO.util.Event,

var blackout_min_seconds = -40,
	blackout_max_seconds = +40,
	change_after_focus = (0 < YAHOO.env.ua.ie);

/**
 * @module gallery-datetime
 */

/**********************************************************************
 * Manages an optional set of radio buttons (for "no date", etc.), a date
 * input field + hour and minute menus, a calendar for selecting the date
 * (either inline or as a popup tied to the date input field), and a legend
 * explaining the ways in which a day can be marked, based on blackouts.
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

function DateTime = function(config)
{
	DateTime.superclass.constructor.apply(this, arguments);
};

DateTime.NAME = "datetime";

function isInputNode(n)
{
	// allow Y.Node from a different sandbox
	return n && n._node && n._node.tagName == 'INPUT';
}

DateTime.ATTRS =
{
	/**
	 * Date input field to use.  Can be augmented with a Calendar via
	 * gallery-input-calendar-sync.
	 * 
	 * @attribute calendar
	 * @type {Calendar}
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
	 * @required
	 * @writeonce
	 */
	timeInput:
	{
		validator: isInputNode,
		writeOnce: true
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
		value: { hour:0, minute:0 };
		validator: function(value)
		{
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
		setter: function(ranges)
		{
			// store ranges in ascending order of start time

			blackout   = [];
			blank_time = this.get('blankTime');
			for (var i=0; i<ranges.length; i++)
			{
				var r   = ranges[i];
				r.start = DateTime.normalize(r.start, blank_time);
				r.end   = DateTime.normalize(r.end,   blank_time);

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
				for (var j=0; j<blackout.length; j++)
				{
					var r1 = blackout[j];
					if (r[0] <= r1[0])
					{
						if (j > 0 &&
							r[0] <  blackout[j-1][1] &&
							r[1] <= blackout[j-1][1])
						{
							// covered by prev
						}
						else if (j > 0 &&
								 r[0] - 60000 < blackout[j-1][1] &&
								 r1[0] < r[1] + 60000)
						{
							// overlaps prev and next
							r = [ blackout[j-1][0], r[1] ];
							blackout.splice(j-1, 2, r);
						}
						else if (j > 0 &&
								 r[0] - 60000 < blackout[j-1][1])
						{
							// overlaps prev
							blackout[j-1][1] = r[1];
						}
						else if (r1[0] < r[1] + 60000)
						{
							// overlaps next
							r1[0] = r[0];
						}
						else
						{
							blackout.splice(j, 0, r);
						}
						inserted = true;
						break;
					}
				}

				// j == blackout.length

				if (!inserted && j > 0 &&
					r[0] <  blackout[j-1][1] &&
					r[1] <= blackout[j-1][1])
				{
					// covered by prev
				}
				else if (!inserted && j > 0 &&
						 r[0] - 60000 < blackout[j-1][1])
				{
					// overlaps prev
					blackout[j-1][1] = r[1];
				}
				else if (!inserted)
				{
					blackout.push(r);
				}
			}

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
		default: +1,
		validator: function(value)
		{
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
}

function handleCalendarSelection()
{
	if (!this.ignore_date_selection)
	{
		var node = this.get('timeInput');
		if (!node.get('value'))
		{
			node.set('value', utils.formatTime(this.get('blankTime')));
		}

		this.ping_input = this.should_ping_input;
		enforceDateTimeLimits.call(this, 'same-day');
	}
}

function enforceDateTimeLimits(
	/* string */	algo)
{
	var date = this.calendar.getDate();
	if (!date)
	{
		return;
	}

	date.setHours(parseInt(this.hour_menu.value, 10));
	date.setMinutes(parseInt(this.minute_menu.value, 10));
	date.setSeconds(0);
	date.setMilliseconds(0);
	var orig_date = new Date(date.getTime());

	// blackout ranges

	if (this.blackout.length > 0)
	{
		var t      = date.getTime(),
			orig_t = t,
			snap   = this.get('blackoutSnapDirection');

		for (var i=0; i<this.blackout.length; i++)
		{
			var blackout = this.blackout[i];
			if (blackout[0] < t && t < blackout[1])
			{
				if (snap > 0)
				{
					t = blackout[1] + 60000;
				}
				else
				{
					t = blackout[0];
				}

				if (algo == 'same-day')
				{
					var tmp = new Date(t);
					if (tmp.getDate()     != date.getDate()  ||
						tmp.getMonth()    != date.getMonth() ||
						tmp.getFullYear() != date.getFullYear())
					{
						t = snap > 0 ? blackout[0] : blackout[1] + 60000;
					}
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

	if (this.min_date_time)
	{
		var t = this.min_date_time.date.getTime();

		if (this.blackout.length > 0)
		{
			var orig_t = t;
			var i      = 0;
			while (i < this.blackout.length && this.blackout[i][0] < t)
			{
				t = Math.max(orig_t, this.blackout[i][1]);
				i++;
			}
		}

		if (date.getTime() < t)
		{
			date = new Date(t);
		}
	}

	if (this.max_date_time)
	{
		var t = this.max_date_time.date.getTime();

		if (this.blackout.length > 0)
		{
			var orig_t = t;
			var i      = this.blackout.length - 1;
			while (i >= 0 && t < this.blackout[i][1])
			{
				t = Math.min(orig_t, this.blackout[i][0]);
				i--;
			}
		}

		if (t < date.getTime())
		{
			date = new Date(t);
		}
	}

	// update controls that changed

	var pings = [];
	if (this.ping_input)
	{
		pings.push(this.input);
	}

	if (date.getFullYear() !== orig_date.getFullYear() ||
		date.getMonth()    !== orig_date.getMonth()    ||
		date.getDate()     !== orig_date.getDate())
	{
		this.calendar.setDate(date);
		this.hour_menu.value   = date.getHours();
		this.minute_menu.value = date.getMinutes();
		ping.call(this, this.input, this.hour_menu, this.minute_menu);
	}
	else if (date.getHours() !== orig_date.getHours())
	{
		this.hour_menu.value   = date.getHours();
		this.minute_menu.value = date.getMinutes();
		ping.apply(this, pings.concat(this.hour_menu, this.minute_menu));
	}
	else if (date.getMinutes() !== orig_date.getMinutes())
	{
		this.minute_menu.value = date.getMinutes();
		ping.apply(this, pings.concat(this.minute_menu));
	}
	else if (pings.length > 0)
	{
		ping.apply(this, pings);
	}

	this.fire('limitsEnforced');
}

function updateRendering()
{
	if (this.disabled)
	{
		return;
	}

	this.calendar.calendar.removeRenderers();

	var blackouts = this.blackout.slice(0);

	if (this.min_date_time)
	{
		if (blackouts.length > 0)
		{
			var t       = this.min_date_time.date.getTime();
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
			(this.min_date_time.hour > 0 || this.min_date_time.minute > 0))
		{
			this.calendar.calendar.addRenderer(
				DateTime.formatDate(this.min_date_time.date),
				cellRenderer('satg-partial-blackout'));
		}
	}

	if (this.max_date_time)
	{
		if (blackouts.length > 0)
		{
			var t       = this.max_date_time.date.getTime();
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
			(this.max_date_time.hour < 23 || this.max_date_time.minute < 59))
		{
			this.calendar.calendar.addRenderer(
				DateTime.formatDate(this.max_date_time.date),
				cellRenderer('satg-partial-blackout'));
		}
	}

	for (var i=0; i<blackouts.length; i++)
	{
		var blackout = blackouts[i];
		var start    = new Date(blackout[0] + blackout_max_seconds*1000);
		var end      = new Date(blackout[1] + blackout_min_seconds*1000);

		if (start.getHours() > 0 || start.getMinutes() > 0)
		{
			this.calendar.calendar.addRenderer(
				DateTime.formatDate(start),
				cellRenderer('satg-partial-blackout'));
			start.setDate(start.getDate()+1);
			start.setHours(0);
		}

		if (end.getHours() < 23 || end.getMinutes() < 59)
		{
			this.calendar.calendar.addRenderer(
				DateTime.formatDate(end),
				cellRenderer('satg-partial-blackout'));
			end.setDate(end.getDate()-1);
			end.setHours(23);
		}

		if (start.getTime() < end.getTime())
		{
			var s = DateTime.formatDate(start),
				e = DateTime.formatDate(end);
			if (s != e)
			{
				s += YAHOO.SATG.Locale.Calendar.YUI_DATE_RANGE_DELIMITER + e;
			}

			this.calendar.calendar.addRenderer(
				s, this.calendar.calendar.renderOutOfBoundsDate);
		}
	}

	this.calendar.render();
}

function cellRenderer(
	/* string */ css)
{
	return function(date, cell)
	{
		Dom.addClass(cell, css);
	};
}
function ping()
{
	var duration = this.get('pingDuration');
	if (duration <= 0)
	{
		return;
	}

	var nodes = new Y.NodeList(arguments.length > 1 ? arguments : arguments[0]);

	var ping_class = this.get('pingClass');
	if (this.ping_task)
	{
		this.ping_task.nodes.removeClass(ping_class);
		this.ping_task.cancel();
		nodes = nodes.concat(this.ping_task.nodes);
	}

	nodes.addClass(ping_class);

	this.ping_task = Y.later(this.get('pingDuration'), this, function()
	{
		this.ping_task = null;
		nodes.removeClass(ping_class);
	});

	this.ping_task.nodes = nodes;
}

YAHOO.lang.extend(DateTime, YAHOO.util.EventProvider,
{
	_init: function(
		/* object/string */	container,
		/* map */			config)
	{
		this.min_date_time = config.min_date_time;
		if (this.min_date_time)
		{
			this.min_date_time = DateTime.normalize(this.min_date_time, this.blank_time);
		}

		this.max_date_time = config.max_date_time;
		if (this.max_date_time)
		{
			this.max_date_time = DateTime.normalize(this.max_date_time, this.blank_time);
		}

		this.default_date_time = config.default_date_time;
		if (this.default_date_time)
		{
			this.default_date_time = DateTime.normalize(this.default_date_time, this.blank_time);
		}

		// calendar

		this.calendar = new YAHOO.SATG.Calendar(this.cal_div,
		{
			input:        this.input,
			initial_date: config.default_date_time,
			min_date:     config.min_date_time,
			max_date:     config.max_date_time
		});

		// listen for changes

		this.get('dateInput')

		this.get('timeInput')
		Event.on(this.hour_menu, 'change', enforceDateTimeLimits, null, this);
		Event.on(this.minute_menu, 'change', enforceDateTimeLimits, null, this);

		// black-out dates

		updateRendering.call(this);
		this.on('blackoutsChange', updateRendering);
	},

	destroy: function()
	{
		this.calendar.destroy();
	},

	getDateTime: function()
	{
		var date = this.calendar.getDate();
		if (!date)
		{
			return false;
		}

		var result =
		{
			year:   date.getFullYear(),
			month:  date.getMonth()+1,
			day:    date.getDate(),

			date_str: DateTime.formatDate(date)
		};

		if (!this.no_time)
		{
			result.hour     = parseInt(this.hour_menu.value, 10);
			result.minute   = parseInt(this.minute_menu.value, 10);
			result.time_str = DateTime.formatTime({ hour: this.hour_menu.value, minute: this.minute_menu.value });
		}

		return result;
	},

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

	resetDateTime: function()
	{
		if (this.default_date_time)
		{
			this.ignore_date_selection = true;
			this.calendar.setDate(this.default_date_time);
			this.ignore_date_selection = false;

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
		this.calendar.clearDate();
		this.hour_menu.selectedIndex   = -1;
		this.minute_menu.selectedIndex = -1;
	},

	setDefaultDateTime: function(
		/* object */	date_time)
	{
		this.default_date_time = date_time;
		if (this.default_date_time)
		{
			this.default_date_time = DateTime.normalize(this.default_date_time, this.blank_time);
		}
	},

	clearDefaultDateTime: function()
	{
		this.default_date_time = null;
	},

	setMinDateTime: function(
		/* object */	min)
	{
		if (min)
		{
			min = DateTime.normalize(min, this.blank_time);

			if (!this.min_date_time ||
				this.min_date_time.date.getTime() != min.date.getTime())
			{
				this.min_date_time = min;
				this.should_ping_input = true;
				this.calendar.setMinDate(this.min_date_time);
				enforceDateTimeLimits.call(this);
				this.should_ping_input = this.ping_input = false;

				updateRendering.call(this);
			}
		}
		else
		{
			this.clearMinDateTime();
		}
	},

	clearMinDateTime: function()
	{
		if (this.min_date_time)
		{
			this.min_date_time = null;
			this.calendar.clearMinDate();
			updateRendering.call(this);
		}
	},

	setMaxDateTime: function(
		/* object */	max)
	{
		if (max)
		{
			max = DateTime.normalize(max, this.blank_time);

			if (!this.max_date_time ||
				this.max_date_time.date.getTime() != max.date.getTime())
			{
				this.max_date_time = max;
				this.should_ping_input = true;
				this.calendar.setMaxDate(this.max_date_time);
				enforceDateTimeLimits.call(this);
				this.should_ping_input = this.ping_input = false;

				updateRendering.call(this);
			}
		}
		else
		{
			this.clearMaxDateTime();
		}
	},

	clearMaxDateTime: function()
	{
		if (this.max_date_time)
		{
			this.max_date_time = null;
			this.calendar.clearMaxDate();
			updateRendering.call(this);
		}
	}
});
