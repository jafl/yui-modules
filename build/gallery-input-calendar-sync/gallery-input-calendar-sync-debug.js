YUI.add('gallery-input-calendar-sync', function(Y) {

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
function InputCalendarSync(
	/* object */ config)
{
	InputCalendarSync.superclass.constructor.call(this, config);
}

InputCalendarSync.NAME = "InputCalendarSyncPlugin";
InputCalendarSync.NS   = "calendarSync";

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
			return (value instanceof Y.Calendar);
		}
	}
};

function syncFromInput()
{
	var host  = this.get('host'),
		cal   = this.get('calendar'),
		value = Y.Lang.trim(host.get('value'));

	if (value)
	{
		try
		{
			this.ignore_selection_change = true;

			var result = Y.DateTimeUtils.normalize(Y.DateTimeUtils.parseDate(value), {hour:0, minute:0});
			cal.deselectDates();	// hack for http://yuilibrary.com/projects/yui3/ticket/2530928
			cal.selectDates(result.date);
			cal.set('date', result.date);
		}
		catch (ex)
		{
			Y.log('invalid date, falling back to selected date', 'debug', 'InputCalendarSync');
		}
		finally
		{
			this.ignore_selection_change = false;
		}
	}

	privateSyncFromCalendar.call(this);
}

function syncFromCalendar()
{
	if (!this.ignore_selection_change)
	{
		this.get('host').focus();	// make it compatible with valuechange event
		privateSyncFromCalendar.call(this);
	}
}

function privateSyncFromCalendar()
{
	var date = this.get('calendar').get('selectedDates')[0];
	this.get('host').set('value', Y.DateTimeUtils.formatDate(date));
}

Y.extend(InputCalendarSync, Y.Plugin.Base,
{
	initializer: function(config)
	{
		var host = this.get('host');

		this.handle =
		[
			host.on('change', syncFromInput, this),
			host.on('valueSet', syncFromInput, this),
			this.get('calendar').on('selectionChange', syncFromCalendar, this)
		];

		this.get('calendar').set('selectionMode', 'single');

		syncFromInput.call(this);
	},

	destructor: function()
	{
		this.change_handle.detach();
		this.set_handle.detach();
		this.cal_handle.detach();
	}
});

Y.namespace("Plugin");
Y.Plugin.InputCalendarSync = InputCalendarSync;


}, '@VERSION@' ,{requires:['node-pluginhost','plugin','gallery-datetime-utils','calendar','gallery-node-event-set']});
