"use strict";

/**
 * @module gallery-datatable-datasource-busy
 */

/**********************************************************************
 * <p>Extension to datatable-datasource to show that the datasource is busy
 * loading.</p>
 *
 * @main gallery-datatable-datasource-busy
 * @class DataTableDataSourceBusy
 * @namespace Plugin
 * @extends Plugin.DataTableDataSource
 * @constructor
 * @param config {Object} configuration
 */
function DataSourceBusy(
	/* object */ config)
{
	DataSourceBusy.superclass.constructor.call(this, config);
}

DataSourceBusy.NAME = Y.Plugin.DataTableDataSource.NAME;
DataSourceBusy.NS   = Y.Plugin.DataTableDataSource.NS;

DataSourceBusy.ATTRS =
{
	/**
	 * Number of milliseconds to wait before showing the busy indicator.
	 *
	 * @attribute showDelay
	 * @type {Number}
	 */
	showDelay:
	{
		value:     500,
		validator: Y.Lang.isNumber
	},
};

Y.extend(DataSourceBusy, Y.Plugin.DataTableDataSource,
{
	destructor: function()
	{
		this.get('host').unplug(Y.Plugin.BusyOverlay);
	},

	load: function()
	{
		var table = this.get('host');
		if (!table.busy)
		{
			table.plug(Y.Plugin.BusyOverlay);
		}

		this.busy_handler = Y.later(this.get('showDelay'), this, this.showBusy);
		DataSourceBusy.superclass.load.apply(this, arguments);
	},

	onDataReturnInitializeTable: function()
	{
		this.busy_handler.cancel();
		delete this.busy_handler;

		DataSourceBusy.superclass.onDataReturnInitializeTable.apply(this, arguments);
		this.hideBusy();
	},

	showBusy: function()
	{
		this.get('host').busy.show();
	},

	hideBusy: function()
	{
		this.get('host').busy.hide();
	}
});

Y.namespace("Plugin");
Y.Plugin.DataTableDataSourceBusy = DataSourceBusy;
