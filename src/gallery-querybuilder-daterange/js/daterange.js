/**
 * @module gallery-querybuilder
 * @submodule gallery-querybuilder-daterange
 */

/**********************************************************************
 * Plugin for accepting date/time range.
 * 
 * The `value` argument passed to `QueryBuilder.appendNew()` must be an
 * array with two elements: `[ start_date, end_date ]`.
 * 
 * `var_config` accepts `show_time`, `start_config`, `end_config`.  The
 * configs must define objects: `Calendar`, `InputCalendarSync`,
 * `DateTime`, `date_InputPopup`, `time_InputPopup`.
 * 
 * `op_list` must be an array: `[ greater_than, less_than ]`.
 * 
 * @namespace QueryBuilder
 * @class DateRange
 */

Y.QueryBuilder.DateRange = function(
	/* object */	query_builder,
	/* object */	config)
{
	this.qb = query_builder;

	this.start_date_input_name_pattern = config.field_prefix + 'start_date_{i}';
	this.start_time_input_name_pattern = config.field_prefix + 'start_time_{i}';
	this.end_date_input_name_pattern   = config.field_prefix + 'end_date_{i}';
	this.end_time_input_name_pattern   = config.field_prefix + 'end_time_{i}';
};

Y.QueryBuilder.DateRange.prototype =
{
	create: function(
		/* int */		query_index,
		/* object */	var_config,
		/* array */		op_list,
		/* array */		value)
	{
		this.db_query_gt = op_list[0];
		this.db_query_lt = op_list[1];

		this.start_id  = Y.guid();
		this.end_id    = Y.guid();
		this.show_time = var_config.show_time;

		var result    = [],
			separator = '&nbsp;&mdash;&nbsp;';

		var start_date_cell = this.qb._createContainer();
		start_date_cell.set('className', this.qb.getClassName('start-date'));
		start_date_cell.set('innerHTML',
			this._dateInput(this.start_id, this.dateName('start', query_index)) +
			(var_config.show_time ? '' : separator));
		this.start_date_input = start_date_cell.one('input');
		result.push(start_date_cell);

		if (this.show_time)
		{
			var start_time_cell = this.qb._createContainer();
			start_time_cell.set('className', this.qb.getClassName('start-time'));
			start_time_cell.set('innerHTML',
				this._timeInput(this.start_id, this.timeName('start', query_index)) +
				separator);
			this.start_time_input = start_time_cell.one('input');
			result.push(start_time_cell);
		}

		var end_date_cell = this.qb._createContainer();
		end_date_cell.set('className', this.qb.getClassName('end-date'));
		end_date_cell.set('innerHTML', this._dateInput(this.end_id, this.dateName('end', query_index)));
		this.end_date_input = end_date_cell.one('input');
		result.push(end_date_cell);

		if (this.show_time)
		{
			var end_time_cell = this.qb._createContainer();
			end_time_cell.set('className', this.qb.getClassName('end-time'));
			end_time_cell.set('innerHTML', this._timeInput(this.end_id, this.timeName('end', query_index)));
			this.end_time_input = end_time_cell.one('input');
			result.push(end_time_cell);
		}

		return result;
	},

	postCreate: function(
		/* int */		query_index,
		/* object */	var_config,
		/* array */		op_list,
		/* array */		value)
	{
		value = value || ['', ''];

		if (value[0])
		{
			Y.namespace.call(var_config, 'start_config.DateTime');
			var_config.start_config.DateTime.defaultDateTime = value[0];
		}
		this.start_widgets = this._attachDateTimeWidgets(this.start_id, var_config.start_config);
		if (value[0])
		{
			delete var_config.start_config.DateTime.defaultDateTime;
		}

		if (value[1])
		{
			Y.namespace.call(var_config, 'end_config.DateTime');
			var_config.end_config.DateTime.defaultDateTime = value[1];
		}
		this.end_widgets = this._attachDateTimeWidgets(this.end_id, var_config.end_config);
		if (value[1])
		{
			delete var_config.end_config.DateTime.defaultDateTime;
		}

		this.range = new Y.DateTimeRange(
		{
			startDateTime: this.start_widgets.datetime,
			endDateTime:   this.end_widgets.datetime
		});

		this.start_date_input.focus();

		this.start_date_input.on('valueSet', this.qb._notifyChanged, this.qb);
		this.end_date_input.on('valueSet', this.qb._notifyChanged, this.qb);

		if (this.show_time)
		{
			this.start_time_input.on('valueSet', this.qb._notifyChanged, this.qb);
			this.end_time_input.on('valueSet', this.qb._notifyChanged, this.qb);
		}
	},

	destroy: function()
	{
		this._destroyDateTimeWidgets(this.start_widgets, this.start_date_input);
		this._destroyDateTimeWidgets(this.end_widgets, this.end_date_input);

		this.start_date_input.remove(true);
		this.end_date_input.remove(true);
		if (this.show_time)
		{
			this.start_time_input.remove(true);
			this.end_time_input.remove(true);
		}

		this.start_date_input = null;
	},

	updateName: function(
		/* int */	new_index)
	{
		this.start_date_input.setAttribute('name', this.dateName('start', new_index));
		this.end_date_input.setAttribute('name', this.dateName('end', new_index));
		if (this.show_time)
		{
			this.start_time_input.setAttribute('name', this.timeName('start', new_index));
			this.end_time_input.setAttribute('name', this.timeName('end', new_index));
		}
	},

	toDatabaseQuery: function()
	{
		var start  = this.start_widgets.datetime.getDateTime(),
			end    = this.end_widgets.datetime.getDateTime(),
			result = [];

		if (start)
		{
			result.push([ this.db_query_gt, start ]);
		}

		if (end)
		{
			result.push([ this.db_query_lt, end ]);
		}

		return result;
	},

	_attachDateTimeWidgets: function(id, config)
	{
		config = config || {};

		var selector = '#' + id;

		// Calendar

		var c = config.Calendar || {};
		if (Y.Lang.isUndefined(c.width))
		{
			c.width = 300;
		}
		c.showPrevMonth = c.showNextMonth = true;

		var cal = new Y.Calendar(c);
		cal.render(selector + '-calendar');

		// InputCalendarSync

		c          = config.InputCalendarSync || {};
		c.calendar = cal;

		Y.one(selector + '-date').plug(Y.Plugin.InputCalendarSync, c);	// must be before Y.DateTime

		// Timepicker

		if (this.show_time)
		{
			var tp = new Y.Saw.Timepicker();
			tp.render(selector + '-timepicker');

			tp.on('cellclick', function()
			{
				Y.later(100, null, function()
				{
					Y.one(selector + '-time').set('value', tp.get('time').s24hour);
				});
			});
		}

		// DateTime

		c          = config.DateTime || {};
		c.dateInput = selector + '-date';

		if (this.show_time)
		{
			c.timeInput = selector + '-time';
		}

		var dt = new Y.DateTime(c);

		// date InputPopup

		c                = config.date_InputPopup || {};
		c.srcNode        = selector + '-popup-calendar';
		c.visible        = false;
		c.inputField     = selector + '-date';
		c.clickNodes     = Y.InputPopup.CalendarNodes;
		c.reparentToBody = true;

		if (Y.Lang.isUndefined(c.zIndex))
		{
			c.zIndex = 100;
		}

		var cal_popup = new Y.InputPopup(c);
		cal_popup.render();

		if (this.show_time)
		{
			c                = config.time_InputPopup || {};
			c.srcNode        = selector + '-popup-timepicker';
			c.visible        = false;
			c.inputField     = selector + '-time';
			c.clickNodes     = Y.InputPopup.SawTimepickerNodes;
			c.reparentToBody = true;

			if (Y.Lang.isUndefined(c.zIndex))
			{
				c.zIndex = 100;
			}

			var tp_popup = new Y.InputPopup(c);
			tp_popup.render();
		}

		var result =
		{
			calendar:         cal,
			timepicker:       tp,
			datetime:         dt,
			calendar_popup:   cal_popup,
			timepicker_popup: tp_popup
		};
		return result;
	},

	_destroyDateTimeWidgets: function(obj, input)
	{
		input.unplug(Y.Plugin.InputCalendarSync);

		obj.calendar.destroy();
		obj.datetime.destroy();
		obj.calendar_popup.destroy();

		if (this.show_time)
		{
			obj.timepicker.destroy();
			obj.timepicker_popup.destroy();
		}
	},

	/* *********************************************************************
	 * Form element names.
	 */

	dateName: function(
		/* string */	type,
		/* int */		i)
	{
		return Y.Lang.sub(this[ type + '_date_input_name_pattern' ], {i:i});
	},

	timeName: function(
		/* string */	type,
		/* int */		i)
	{
		return Y.Lang.sub(this[ type + '_time_input_name_pattern' ], {i:i});
	},

	//
	// Markup
	//

	_dateInput: function(
		/* string */ id,
		/* string */ input_name)
	{
		// This must use an input tag!

		var markup =
			'<input type="text" name="{n}" id="{id}-date" class="{f} {c} date"/>' +
			'<div id="{id}-popup-calendar" class="yui3-inputpopup-loading">' +
				'<div id="{id}-calendar"></div>' +
			'</div>';

		return Y.Lang.sub(markup,
		{
			id: id,
			n:  input_name,
			f:  Y.FormManager.field_marker_class,
			c:  this.qb.getClassName('field')
		});
	},

	_timeInput: function(
		/* string */ id,
		/* string */ input_name)
	{
		// This must use an input tag!

		var markup =
			'<input type="text" name="{n}" id="{id}-time" class="{f} {c} time"/>' +
			'<div id="{id}-popup-timepicker" class="popup-timepicker yui3-inputpopup-loading">' +
				'<div id="{id}-timepicker"></div>' +
			'</div>';

		return Y.Lang.sub(markup,
		{
			id: id,
			n:  input_name,
			f:  Y.FormManager.field_marker_class,
			c:  this.qb.getClassName('field')
		});
	}
};

Y.QueryBuilder.plugin_mapping[ 'daterange' ] = Y.QueryBuilder.DateRange;
