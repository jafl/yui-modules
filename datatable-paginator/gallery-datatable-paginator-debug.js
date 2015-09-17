YUI.add('gallery-datatable-paginator', function (Y, NAME) {

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
	},

	/**
	 * OGNL expression telling how to extract the total number of records
	 * from the received data, e.g., `.meta.totalRecords`.
	 * 
	 * @attribute totalRecordsExpr
	 * @type {String}
	 */
	totalRecordsExpr:
	{
		validator: Y.Lang.isString
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

	this.sendRequest();
}

function updateDataSource(e)
{
	if (this.ds_response_handler)
	{
		this.ds_response_handler.detach();
		this.ds_response_handler = null;
	}

	if (e.newVal)
	{
		this.ds_response_handler = e.newVal.on('response', updateTotalRecords, this);
	}
}

function updateTotalRecords(e)
{
	var expr = this.get('totalRecordsExpr');
	if (expr)
	{
		var pg = this.get('paginator');
		pg.setTotalRecords(Y.Object.evalGet(e, '.response' + expr), true);
		pg.render();
	}
}

function listenToPaginator(pg)
{
	this.pg_event_handler = pg.on('changeRequest', switchPage, this);
}

function listenToDataSource()
{
	if (this.ds_change_handler)
	{
		this.ds_change_handler.detach();
		this.ds_change_handler = null;
	}

	if (this.ds_response_handler)
	{
		this.ds_response_handler.detach();
		this.ds_response_handler = null;
	}

	var ds = this.get('host').datasource;
	if (ds)
	{
		this.ds_change_handler = ds.on('datasourceChange', updateDataSource, this);

		ds = ds.get('datasource');
		if (ds)
		{
			this.ds_response_handler = ds.on('response', updateTotalRecords, this);
		}
	}
}

function plug(self, plugin, config)
{
	self.orig_plug.apply(this, Y.Array(arguments, 1));

	if (plugin === Y.Plugin.DataTableDataSource)
	{
		listenToDataSource.call(self);
	}
}

Y.extend(PaginatorPlugin, Y.Plugin.Base,
{
	initializer: function(config)
	{
		if (config.paginator)
		{
			listenToPaginator.call(this, config.paginator)
		}

		this.on('paginatorChange', function(e)
		{
			if (this.pg_event_handler)
			{
				this.pg_event_handler.detach();
				this.pg_event_handler = null;
			}

			if (e.newVal)
			{
				listenToPaginator.call(this, e.newVal);
			}
		});

		listenToDataSource.call(this);

		var host       = this.get('host');
		this.orig_plug = host.plug;
		host.plug      = Y.bind(plug, host, this);
	},

	destructor: function()
	{
		this.get('host').plug = this.orig_plug;

		if (this.pg_event_handler)
		{
			this.pg_event_handler.detach();
		}

		if (this.ds_change_handler)
		{
			this.ds_change_handler.detach();
		}

		if (this.ds_response_handler)
		{
			this.ds_response_handler.detach();
		}
	},

	/**
	 * Sends a request to the datatable to load the current page.
	 */
	sendRequest: function()
	{
		var send  = this.get('sendRequest'),
			build = this.get('buildRequest');
		if (send)
		{
			send();
		}
		else if (build)
		{
			this.get('host').datasource.load(
			{
				request: build()
			});
		}
	}
});

Y.namespace("Plugin");
Y.Plugin.DataTablePaginator = PaginatorPlugin;


}, '@VERSION@', {"requires": ["plugin", "datatable", "gallery-paginator", "oop", "gallery-object-extras"]});
