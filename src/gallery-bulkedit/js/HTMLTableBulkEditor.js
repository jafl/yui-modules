(function(){
"use strict";

var Dom = YAHOO.util.Dom,
	Event = YAHOO.util.Event,
	Util = YAHOO.SATG.Util;

/**
 * <p>HTMLTableBulkEditor builds an HTML table with one tbody for each
 * record.</p>
 *
 * @module BulkEdit
 * @namespace YAHOO.APEX
 * @class YAHOO.SATG.HTMLTableBulkEditor
 * @extends YAHOO.SATG.BulkEditor 
 * @constructor
 * @param columns {Array} The configuration for each column:
 *		key, label, formatter, etc.
 * @param config {Object} Object literal of configuration values.
 *		<dl>
 *		<dt>events</dt>
 *		<dd>(optional) Map of event names to functions that will be attached
 *			to the container.  (Attaching events to the container before the
 *			table is created does not work.)</dd>
 *		</dl>
 */
YAHOO.SATG.HTMLTableBulkEditor = function(
	/* string/element */	container,
	/* array */				columns,
	/* map */				fields,
	/* DataSource */		data_source,
	/* object */			config)
{
	this.columns = columns.slice(0);
	TableBulkEditor.superclass.constructor.call(this, container, fields, data_source, config);
};

var TableBulkEditor = YAHOO.SATG.HTMLTableBulkEditor,
	BulkEditor = YAHOO.SATG.BulkEditor,
	cell_class_prefix = 'satg-be-cell-';

TableBulkEditor.selectFormatter = function(cell, key, value, field, column, record)
{
	cell.innerHTML = BulkEditor.markup.select.call(this, key, value, field, record);
};

TableBulkEditor.inputFormatter = function(cell, key, value, field, column, record)
{
	cell.innerHTML = BulkEditor.markup.input.call(this, key, value, field, record);
};

TableBulkEditor.textareaFormatter = function(cell, key, value, field, column, record)
{
	cell.innerHTML = BulkEditor.markup.textarea.call(this, key, value, field, record);
};

TableBulkEditor.defaults =
{
	input:
	{
		formatter: TableBulkEditor.inputFormatter
	},

	select:
	{
		formatter: TableBulkEditor.selectFormatter
	},

	textarea:
	{
		formatter: TableBulkEditor.textareaFormatter
	}
};

function moveFocus(e)
{
	var key = Event.getCharCode(e);
	if (e.ctrlKey && (key == 38 || key == 40))	// Ctrl-up/down
	{
		Event.stopEvent(e);

		var target = Event.getTarget(e);
		var info   = this.getRecordAndFieldKey(target);
		if (!info)
		{
			return;
		}

		var bd = this.getRecordContainer(target);
		if (bd && key == 38)
		{
			bd = bd.previousSibling;
		}
		else if (bd)
		{
			bd = bd.nextSibling;
		}

		var id = bd && this.getRecordId(bd);
		if (id)
		{
			var field = this.getFieldElement(id, info.field_key);
			if (field)
			{
				try
				{
					field.focus();
					field.select();
				}
				catch (ex)
				{
					// no way to determine in IE if focus will fail
					// no way to determine if browser allows focus to select elements
				}
			}
		}
	}
}

YAHOO.lang.extend(TableBulkEditor, BulkEditor,
{
	_init: function(
		/* string/element */	container,
		/* map */				fields,
		/* DataSource */		data_source,
		/* object */			config)
	{
		TableBulkEditor.superclass._init.apply(this, arguments);
		this.events = config.events;
	},

	_renderContainer: function(
		/* element */	container)
	{
		if (!this.table ||
			container.firstChild.tagName.toLowerCase() != 'table' ||
			!Dom.hasClass(container.firstChild, 'satg-be'))
		{
			var s = '<table class="satg-be"><thead class="satg-be-hd"><tr>';

			var row_markup = '<th class="satg-be-cell {prefix}{key}">{label}</th>';

			for (var i=0; i<this.columns.length; i++)
			{
				var column = this.columns[i];
				s += YAHOO.lang.substitute(row_markup,
				{
					prefix: cell_class_prefix,
					key:    column.key,
					label:  column.label || '&nbsp;'
				});
			}

			s += '</tr></thead></table>';

			container.innerHTML = s;
			this.table          = container.firstChild;

			Event.on(this.table, 'keydown', moveFocus, null, this);

			for (var name in this.events)
			{
				if (YAHOO.lang.hasOwnProperty(this.events, name))
				{
					Event.on(this.table, name, this.events[name], null, this);
				}
			}
		}
		else
		{
			while (this.table.childNodes.length > 1)
			{
				this.table.removeChild(this.table.lastChild);
			}
		}
	},

	_renderRecordContainer: function(
		/* element */	container,
		/* object */	record)
	{
		var body       = document.createElement('tbody');
		body.id        = this.getRecordContainerId(record);
		body.className =
			BulkEditor.record_container_class + ' ' +
			((this.table.childNodes.length % 2) ? 'satg-be-odd' : 'satg-be-even');	// accounts for th row

		var msg_row       = document.createElement('tr');
		msg_row.className = BulkEditor.record_msg_container_class;

		var msg_cell       = document.createElement('td');
		msg_cell.colSpan   = this.columns.length;
		msg_cell.className = 'satg-be-record-message';
		msg_cell.innerHTML = BulkEditor.error_msg_markup;

		msg_row.appendChild(msg_cell);
		body.appendChild(msg_row);

		var row = document.createElement('tr');
		body.appendChild(row);

		this.table.appendChild(body);
		return row;
	},

	_renderRecord: function(
		/* element */	row,
		/* object */	record)
	{
		for (var i=0; i<this.columns.length; i++)
		{
			var column = this.columns[i];
			var key    = column.key;
			var field  = this.getFieldConfig(key);

			// create cell

			var cell       = document.createElement('td');
			cell.className = 'satg-be-cell ' + cell_class_prefix + key;

			// create liner

			var liner       = document.createElement('div');
			liner.className = 'satg-be-liner';

			// fill in liner

			var f = null;
			if (YAHOO.lang.isFunction(column.formatter))
			{
				f = column.formatter;
			}
			else if (field.type && TableBulkEditor.defaults[ field.type ])
			{
				f = TableBulkEditor.defaults[ field.type ].formatter;
			}
			else
			{
				if (field.type)
				{
					YAHOO.log('HTMLTableBulkEditor: no defaults for type ' + field.type + ', using type "input"', 'error', 'HTMLTableBulkEditor');
				}

				f = TableBulkEditor.defaults.input.formatter;
			}

			if (f)
			{
				f.call(this, liner, key, record[key], field, column, record);
			}

			// append cell

			cell.appendChild(liner);
			row.appendChild(cell);
		}
	}
});

})();
