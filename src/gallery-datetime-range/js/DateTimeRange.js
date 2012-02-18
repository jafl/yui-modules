"use strict";

var Dom = YAHOO.util.Dom,
	SDom = YAHOO.SATG.Dom,
	Event = YAHOO.util.Event;

/**********************************************************************
 * Manages a pair of DateTime's.
 */

YAHOO.SATG.DateTimePair = function(
	/* object/string/DateTime */	s_container,
	/* object/string/DateTime */	e_container,
	/* map */						s_config,
	/* map */						e_config)
{
	var hide_class = 'satg-date-time-pair-hide-no-date';
	if (s_config && e_config &&
		!s_config.allow_no_date_time && !e_config.allow_no_date_time)
	{
		hide_class = SDom.hide_class;
	}

	this.s_init = this.e_init = false;

	// start

	if (s_container instanceof DateTime)
	{
		this.s_date_time = s_container;
	}
	else
	{
		s_config = s_config || {};
		if (!s_config.label)
		{
			s_config.label =
			[
				YAHOO.SATG.Locale.Calendar.start_date_time_label1,
				YAHOO.SATG.Locale.Calendar.start_date_time_label2
			];

			s_config.hook =
			[
				'clearDateTime',
				'resetDateTime'
			];
		}

		s_config.hide_no_date_class = hide_class;
		s_config.do_not_clear_float = true;
		s_config.hide_legend        = true;

		this.s_date_time = new YAHOO.SATG.DateTime(s_container, s_config);

		Event.onDOMReady(function()
		{
			Dom.addClass(s_container, 'satg-date-time-start-container');
		});
	}

	this.s_date_time.subscribe('init', function()
	{
		this.s_init = true;
		this._init();
	},
	null, this);

	// end

	if (e_container instanceof DateTime)
	{
		this.e_date_time = e_container;
	}
	else
	{
		e_config = e_config || {};
		if (!e_config.label)
		{
			e_config.label =
			[
				YAHOO.SATG.Locale.Calendar.end_date_time_label1,
				YAHOO.SATG.Locale.Calendar.end_date_time_label2
			];

			e_config.hook =
			[
				'clearDateTime',
				'resetDateTime'
			];
		}

		e_config.hide_no_date_class = hide_class;
		e_config.blank_time         = { hour: 23, minute: 59 };
		e_config.hide_legend        = true;

		this.e_date_time = new YAHOO.SATG.DateTime(e_container, e_config);

		Event.onDOMReady(function()
		{
			Dom.addClass(e_container, 'satg-date-time-end-container');
		});

		if (e_config.max_date_time)
		{
			this.max_date_time = e_config.max_date_time;
			normalizeDateTime(this.max_date_time, e_config.blank_time);
		}
	}

	this.e_date_time.subscribe('init', function()
	{
		this.e_init = true;
		this._init();
	},
	null, this);
};

var DateTimePair = YAHOO.SATG.DateTimePair;

function updateEndDateTime()
{
	if (this.s_date_time.isDisabled() && !this.s_date_time.default_date_time)
	{
		this.e_date_time.setMinDateTime(this.s_date_time.min_date_time);
		return;
	}
	else if (!this.s_date_time.isDisabled())
	{
		this.s_date_time.setMaxDateTime(this.max_date_time);
	}

	var min_date_time = this.s_date_time.getDateTime();
	if (!min_date_time.year)
	{
		if (YAHOO.lang.isNumber(min_date_time) &&
			this.s_date_time.rb_hook[ min_date_time ] == 'resetDateTime' &&
			this.s_date_time.default_date_time)
		{
			min_date_time = this.s_date_time.default_date_time;
		}
		else if (this.s_date_time.min_date_time)
		{
			min_date_time = this.s_date_time.min_date_time;
		}
		else
		{
			return;
		}
	}

	var min_t = new Date(min_date_time.year, min_date_time.month-1, min_date_time.day,
						 min_date_time.hour, min_date_time.minute).getTime();

	var max_t = 0;
	if (this.max_date_time)
	{
		normalizeDateTime(this.max_date_time, this.e_date_time.blank_time);
		max_t = this.max_date_time.date.getTime();
	}

	var blackout = this.s_date_time.blackout.slice(0);
	blackout.push([max_t, max_t]);

	var found = false;
	for (var i=blackout.length-2; i>=0; i--)
	{
		if (blackout[i][1] < min_t)
		{
			max_t = blackout[i+1][0];
			found = true;
			break;
		}
	}

	if (!found)
	{
		max_t = blackout[0][0];
	}

	if (!this.e_date_time.max_date_time || min_t < this.e_date_time.max_date_time.date.getTime())
	{
		this.e_date_time.setMinDateTime(min_date_time);
		min_t = -1;
	}

	if (max_t > 0)
	{
		var e = new Date(max_t);
		this.e_date_time.setMaxDateTime(
		{
			year:   e.getFullYear(),
			month:  e.getMonth()+1,
			day:    e.getDate(),
			hour:   e.getHours(),
			minute: e.getMinutes()
		});
	}
	else
	{
		this.e_date_time.clearMaxDateTime();
	}

	if (min_t > 0)
	{
		this.e_date_time.setMinDateTime(min_date_time);
	}
}

YAHOO.lang.extend(DateTimePair, YAHOO.util.EventProvider,
{
	_init: function()
	{
		if (!this.s_init || !this.e_init)
		{
			return;
		}

		this.max_date_time = this.e_date_time.max_date_time;

		var self               = this;
		var origSClearDateTime = this.s_date_time.clearDateTime;
		this.s_date_time.clearDateTime = function()
		{
			origSClearDateTime.apply(this, arguments);
			updateEndDateTime.call(self);
		};

		// legend

		this.legend_div           = document.createElement('div');
		this.legend_div.className = 'satg-date-time-legend';
		this.legend_div.innerHTML = dateTimeLegend();
		this.s_date_time.container.appendChild(this.legend_div);

		// CalendarPair

		var pair = new YAHOO.SATG.CalendarPair(this.s_date_time.calendar, this.e_date_time.calendar);

		// constraints

		this.s_date_time.subscribe('limitsEnforced', updateEndDateTime, null, this);
		updateEndDateTime.call(this);
	},

	destroy: function()
	{
		this.s_date_time.destroy();
		this.e_date_time.destroy();
	},

	getDateTimeRange: function()
	{
		var result = {};

		if (!this.s_date_time.isDisabled())
		{
			result.s = this.s_date_time.getDateTime();
		}
		
		if (!this.e_date_time.isDisabled())
		{
			result.e = this.e_date_time.getDateTime();
		}
		
		return result;
	},

	setDateTime: function(
		/* s,e */		name,
		/* object */	date_time)
	{
		this[ name+'_date_time' ].setDateTime(date_time);
	},

	resetDateTime: function(
		/* s,e */ name)
	{
		if (name)
		{
			this[ name+'_date_time' ].resetDateTime();
		}
		else
		{
			this.s_date_time.resetDateTime();
			this.e_date_time.resetDateTime();
		}
	},

	clearDateTime: function(
		/* s,e */ name)
	{
		if (name)
		{
			this[ name+'_date_time' ].clearDateTime();
		}
		else
		{
			this.s_date_time.clearDateTime();
			this.e_date_time.clearDateTime();
		}
	},

	setDefaultDateTime: function(
		/* s,e */		name,
		/* object */	date_time)
	{
		this[ name+'_date_time' ].setDefaultDateTime(date_time);
		updateEndDateTime.call(this);
	},

	clearDefaultDateTime: function(
		/* s,e */ name)
	{
		if (name)
		{
			this[ name+'_date_time' ].clearDefaultDateTime();
		}
		else
		{
			this.s_date_time.clearDefaultDateTime();
			this.e_date_time.clearDefaultDateTime();
		}

		updateEndDateTime.call(this);
	},

	setMinDateTime: function(
		/* object */	date_time)
	{
		this.s_date_time.setMinDateTime(date_time);
		updateEndDateTime.call(this);
	},

	clearMinDateTime: function()
	{
		this.s_date_time.clearMinDateTime();
		this.e_date_time.clearMinDateTime();
		updateEndDateTime.call(this);
	},

	setMaxDateTime: function(
		/* object */	date_time)
	{
		normalizeDateTime(date_time, this.e_date_time.blank_time);
		this.max_date_time = date_time;

		if (!this.e_date_time.max_date_time ||
			date_time.date.getTime() < this.e_date_time.max_date_time.date.getTime())
		{
			updateEndDateTime.call(this);
		}

		this.e_date_time.setMaxDateTime(date_time);
		updateEndDateTime.call(this);
	},

	clearMaxDateTime: function()
	{
		this.s_date_time.clearMaxDateTime();
		this.e_date_time.clearMaxDateTime();
		updateEndDateTime.call(this);
	},

	isDisabled: function(
		/* s,e */ name)
	{
		return this[ name+'_date_time' ].isDisabled();
	},

	setDisabled: function(
		/* s,e */	name,
		/* bool */	disabled)
	{
		this[ name+'_date_time' ].setDisabled(disabled);
		updateEndDateTime.call(this);
	}
});
