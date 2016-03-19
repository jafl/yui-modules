"use strict";

/**
 * @module gallery-table-utils
 */

/**
 * <p>Utilities for tables.</p>
 * 
 * @main gallery-table-utils
 */

/**
 * Saves the current vertical scroll position and listens for the
 * appropriate event to trigger restoring the position.
 *
 * @method preserveScrollPosition
 * @static
 * @param table {Widget} DataTable or BulkEditor
 * @param type {String} "table" or "bulkeditor"
 */
Y.preserveScrollPosition = function(table, type)
{
	var n = table.get('contentBox').one('.yui3-datatable-y-scroller');
	if (n)
	{
		type = 'table';
	}
	else if (type == 'bulkeditor')
	{
		n = table.get('boundingBox').ancestor();
	}
	else
	{
		return;
	}

	var pos =
	{
		x: n.get('scrollLeft'),
		y: n.get('scrollTop')
	};

	if (type == 'table')
	{
		var h1 = table.datasource.get('datasource').once('response', function()
		{
			h2.detach();
			restoreScrollPosition(table, pos, type);
		});

		var h2 = table.once('renderView', function()
		{
			h1.detach();
			restoreScrollPosition(table, pos, type);
		});
	}
	else if (type == 'bulkeditor')
	{
		table.once('pageRendered', function()
		{
			restoreScrollPosition(table, pos, type);
		});
	}
}

function restoreScrollPosition(table, pos, type)
{
	Y.later(0, null, function()
	{
		if (type == 'table')
		{
			var n = table.get('contentBox').one('.yui3-datatable-y-scroller');
		}
		else if (type == 'bulkeditor')
		{
			var n = table.get('boundingBox').ancestor();
		}

		if (n)
		{
			n.set('scrollLeft', pos.x);
			n.set('scrollTop',  pos.y);
		}
	});
}
