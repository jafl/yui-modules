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
InputCalendarSync.NS   = "sync";

InputCalendarSync.ATTRS =
{
	/**
	 * Calendar with which to sync.
	 * 
	 * @attribute calendar
	 * @type {CalendarBase}
	 * @required
	 */
	calendar:
	{
		validator: function(value)
		{
			return (calendar instanceof Y.CalendarBase);
		}
	}
};

function sync()
{
	var host  = this.get('host'),
		value = Y.Lang.trim(host.get('value'))
}

Y.extend(InputCalendarSync, Y.Plugin.Base,
{
	initializer: function(config)
	{
		var host           = this.get('host');
		this.change_handle = host.on('change', sync, this);
	},

	destructor: function()
	{
		this.change_handle.detach();
	}
});

Y.namespace("Plugin");
Y.Plugin.InputCalendarSync = InputCalendarSync;
