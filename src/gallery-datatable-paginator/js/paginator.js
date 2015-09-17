"use strict";

/**
 * @module gallery-datatable-paginator
 */

/**********************************************************************
 * Plugin for DataTable to connect a paginator.
 *
 * @main gallery-datatable-paginator
 * @class DataTablePaginator
 * @namespace Plugin
 * @extends Plugin.Base
 * @constructor
 * @param config {Object} configuration
 */
function PaginatorPlugin(
	/* object */ config)
{
	PaginatorPlugin.superclass.constructor.call(this, config);
}

PaginatorPlugin.NAME = "DataTablePaginatorPlugin";
PaginatorPlugin.NS   = "paginator";

PaginatorPlugin.ATTRS =
{
	/**
	 * @attribute paginator
	 * @type {Paginator}
	 * @required
	 */
	paginator:
	{
		validator: function(o)
		{
			return (o instanceof Y.Paginator);
		}
	},

	/**
	 * Function that builds the `request` data for
	 * `table.datasource.load()`.  If this is not provided, `sendRequest`
	 * is required.
	 *
	 * @attribute buildRequest
	 * @type {Function}
	 */
	buildRequest:
	{
		validator: Y.Lang.isFunction
	},

	/**
	 * Function that invokes `table.datasource.load()`.  If this is not
	 * provided, `buildRequest` is required.
	 *
	 * @attribute sendRequest
	 * @type {Function}
	 */
	sendRequest:
	{
		validator: Y.Lang.isFunction
	}
};

function switchPage(state)
{
	var table = this.get('host');
	if (table.layout)
	{
		table.layout.resetScroll();
	}

	var pg = this.get('paginator');
	pg.setPage(state.page, true);
	pg.setRowsPerPage(state.rowsPerPage, true);
	pg.setTotalRecords(state.totalRecords, true);

	var send  = this.get('sendRequest'),
		build = this.get('buildRequest');
	if (send)
	{
		send();
	}
	else if (build)
	{
		table.datasource.load(
		{
			request: build()
		});
	}
}

function listenToPaginator(pg)
{
	pg.on('datatable-paginator|changeRequest', switchPage, this);
}

Y.extend(State, Y.Plugin.Base,
{
	initializer: function(config)
	{
		if (config.paginator)
		{
			listenToPaginator.call(this, config.paginator)
		}

		this.on('paginatorChange', function(e)
		{
			Y.detach('datatable-paginator|*');

			if (e.newVal)
			{
				listenToPaginator.call(this, e.newVal);
			}
		});
	},

	destructor: function()
	{
		Y.detach('datatable-paginator|*');
	}
});

Y.namespace("Plugin");
Y.Plugin.DataTablePaginator = PaginatorPlugin;
