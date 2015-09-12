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
