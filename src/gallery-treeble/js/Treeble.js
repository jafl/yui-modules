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
	 * Object returned by saveOpenState()
	 * 
	 * @attribute openState
	 * @type Object
	 * @writeonce
	 */
	openState:
	{
		writeOnce: true
	},
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

		if (o.rowIndex === 0 && this.paginator)
		{
			var self  = this,
				tbody = o.td.ancestor('tbody');
			Y.Lang.later(0, null, function()
			{
				var row = tbody.get('lastElementChild'),
					c   = self.getClassName('next-page');

				var more_row = Y.Lang.sub(
					'<tr class="{c}">' +
						'<td colspan="{span}" class="yui3-datatable-cell post-row-expansion">{text}</td>' +
					'</tr>',
					{
						c:    row.get('className') + ' ' + Treeble.more_row_class,
						span: row.get('childElementCount'),
						text: Y.Lang.sub('See more rows on the <a href="javascript:void(0);" class="{c}">next page</a>.', { c:c })
					});

				tbody.append(more_row);

				tbody.one('a.' + c).on('click', function(e)
				{
					e.halt();

					var pg = self.paginator.get('paginator');
					pg.setPage(pg.getPage() + 1);
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
 * @method augementOpenState
 * @static
 * @param open_state {Object} opaque object containing the open state of all the nodes
 * @param ids {Array} list of ids to add to the open state
 */
Treeble.augementOpenState = function(open_state, ids)
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
		if (plugin === Y.Plugin.DataTableDataSource)
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
