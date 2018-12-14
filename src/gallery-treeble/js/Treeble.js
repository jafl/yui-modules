/**********************************************************************
 * Treeble displays a tree of data in a table.
 *
 * @module gallery-treeble
 * @main gallery-treeble
 */

/**
 * Extension to DataTable for displaying tree data.
 *
 * @class Treeble
 * @extends DataTable
 * @constructor
 * @param config {Object}
 */
function Treeble()
{
	Treeble.superclass.constructor.apply(this, arguments);
}

Treeble.NAME = "datatable";		// same styling

Treeble.ATTRS =
{
	/**
	 * Object returned by saveOpenState(), used to initialize the open
	 * elements.
	 * 
	 * @attribute openState
	 * @type Object
	 * @writeonce
	 */
	openState:
	{
		writeOnce: true
	},

	/**
	 * Message displayed below the last row if paginating children.  The
	 * message must include `&lt;a href="{href}" class="{css}"&gt;` to
	 * provide a link to go to the next page.
	 * 
	 * @attribute moreRowsMessage
	 * @type String
	 */
	moreRowsMessage:
	{
		validator: function(s)
		{
			return (Y.Lang.isString(s) &&
					s.indexOf('<a href="{href}" class="{css}">') >= 0);
		}
	}
};

/**
 * The class added to rows created by this plugin.
 *
 * @property Y.RowExpansion.row_class
 * @type {String}
 * @value "row-expansion"
 */
Treeble.more_row_class = 'row-more-items';

/**
 * Formatter for open/close twistdown.
 *
 * @method twistdownFormatter
 * @static
 * @param send_request {Function} Function that reloads DataTable
 */
Treeble.buildTwistdownFormatter = function(send_request)
{
	return function(o)
	{
		o.td.addClass('treeble-nub');

		var ds  = this.datasource.get('datasource');
		var key = ds.get('root').treeble_config.childNodesKey;

		if (o.data[key])
		{
			var path = o.data._yui_node_path;

			o.td.addClass('row-toggle');
			o.td.replaceClass('row-(open|closed)',
				ds.isOpen(path) ? 'row-open' : 'row-closed');

			YUI.Env.add(o.td.getDOMNode(), 'click', function()
			{
				ds.toggle(path, {}, send_request);
			});

			o.cell.set('innerHTML', '<a class="treeble-expand-nub" href="javascript:void(0);"></a>');
		}

		var more_rows_msg = this.get('moreRowsMessage');
		if (o.rowIndex === 0 && more_rows_msg && ds.get('paginateChildren') &&
			this.paginator && this.paginator.get('paginator').hasNextPage())
		{
			var self  = this,
				tbody = o.td.ancestor('tbody');

			if (this._treeble_more_rows_task)
			{
				this._treeble_more_rows_task.cancel();
			}

			this._treeble_more_rows_task = Y.Lang.later(0, null, function()
			{
				self._treeble_more_rows_task = null;

				var row = tbody.get('lastElementChild'),
					c   = self.getClassName('next-page');

				var row_class =
					row.get('className').indexOf('-even') >= 0 ?
						'yui3-datatable-odd' : 'yui3-datatable-even';

				var more_row = Y.Lang.sub(
					'<tr class="{css}">' +
						'<td colspan="{span}" class="yui3-datatable-cell">{text}</td>' +
					'</tr>',
					{
						css:  row_class + ' ' + Treeble.more_row_class,
						span: row.get('childElementCount'),
						text: Y.Lang.sub(more_rows_msg,
						{
							href: 'javascript:void(0);',
							css:  c
						})
					});

				tbody.append(more_row);

				tbody.one('a.' + c).on('click', function(e)
				{
					e.halt();

					var pg = self.paginator.get('paginator');
					pg.setPage(pg.getCurrentPage() + 1);
				});
			});
		}

		return false;	// discard Y.Node instances
	};
};

/**
 * Default formatter for indented column.
 *
 * @method treeValueFormatter
 * @static
 */
Treeble.treeValueFormatter = function(o)
{
	var depth_class = 'treeble-depth-'+o.data._yui_node_depth;
	o.rowClass     += ' ' + depth_class;
	o.className    += ' treeble-value';
	return '<span class="'+depth_class+'">'+o.value+'</span>';
};

/**
 * Add node id's to an existing openState object.
 *
 * @method augmentOpenState
 * @static
 * @param open_state {Object} opaque object containing the open state of all the nodes
 * @param ids {Array} list of ids to add to the open state
 */
Treeble.initOpenState = function(open_state, ids)
{
	var result =
	{
		ids: []
	};
	return result;
};

/**
 * Add node id's to an existing openState object.
 *
 * @method augmentOpenState
 * @static
 * @param open_state {Object} opaque object containing the open state of all the nodes
 * @param ids {Array} list of ids to add to the open state
 */
Treeble.augmentOpenState = function(open_state, ids)
{
	if (open_state && Y.Lang.isArray(open_state.ids))
	{
		open_state.ids = open_state.ids.concat(ids);
	}
};

Y.extend(Treeble, Y.DataTable,
{
	plug: function(plugin, config)
	{
		if (plugin.NAME === Y.Plugin.DataTableDataSource.NAME)
		{
			var recordType = this.get('recordType');
			recordType.ATTRS[ config.datasource.get('root').treeble_config.childNodesKey ] = {};
			recordType.ATTRS._yui_node_path  = {};
			recordType.ATTRS._yui_node_depth = {};

			var open_state = this.get('openState');
			if (open_state && Y.Lang.isArray(open_state.ids))
			{
				config.datasource.setOpenNodeIds(open_state.ids);
			}
		}

		Treeble.superclass.plug.apply(this, arguments);
	},

	/**
	 * @method saveOpenState
	 * @return {Object} opaque object containing the open state of all the nodes
	 */
	saveOpenState: function()
	{
		var state =
		{
			ids: this.datasource.get('datasource').getOpenNodeIds()
		};
		return state;
	}
});

Y.Treeble = Treeble;
