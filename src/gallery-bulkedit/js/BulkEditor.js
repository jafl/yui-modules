"use strict";

var Dom = YAHOO.util.Dom,
	SDom = YAHOO.SATG.Dom,
	Event = YAHOO.util.Event,
	Util = YAHOO.SATG.Util,
	FormUtil = YAHOO.SATG.Util.Form,
	Form = YAHOO.SATG.Form;

/**
 * <p>BulkEditor provides the basic structure for editing all the records
 * in a BulkEditDataSource.  The fields for editing each record are
 * rendered into a separate "row".  This could be a div, a tbody, or
 * something else.</p>
 * 
 * <p>*All event handlers must be placed on the container, not individual
 * DOM elements.*</p>
 * 
 * <p>Errors must be returned from the server in the order in which records
 * are displayed.  Because of this, when data is sent to the server:</p>
 * <ul>
 * <li>If the server knows the ordering, you can send the diffs.</li>
 * <li>If the server doesn't know the ordering, you must send all the data.</li>
 * </ul>
 *
 * @module BulkEdit
 * @namespace YAHOO.SATG
 * @class YAHOO.SATG.BulkEditor
 * @constructor
 * @param container {String|Element} The container for the widget.
 * @param fields {Map} Configuration for each field: type (input|select|textarea),
 *		label, validation (css, regex, msg). Derived classes can require
 *		additional keys.
 * @param data_source {BulkEditDataSource} The container for the widget.
 * @param config {Object} Object literal of configuration values.
 *		<dl>
 *		<dt>paginator</dt>
 *		<dd>(optional) The instance of YUI Paginator to use.</dd>
 *		<dt>requestExtra</dt>
 *		<dd>(optional) {Object} Extra key/value pairs to pass in the
 *			DataSource request.</dd>
 *		</dl>
 */
YAHOO.SATG.BulkEditor = function(
	/* string/element */	container,
	/* map */				fields,
	/* DataSource */		data_source,
	/* object */			config)
{
	if (!(data_source instanceof YAHOO.util.BulkEditDataSource))
	{
		YAHOO.log('BulkEditor requires instance of YAHOO.util.BulkEditDataSource', 'error', 'BulkEditor');
		return;
	}

	Event.onDOMReady(function(type, args1, args2)
	{
		this._init.apply(this, args2);
	},
	arguments, this);
};

var BulkEditor = YAHOO.SATG.BulkEditor,

	default_page_size = 1e9,

	id_prefix = 'bulk-editor',
	id_separator = '__',
	id_regex = new RegExp('^' + id_prefix + id_separator + '(.+?)(?:' + id_separator + '(.+?))?$'),

	field_container_class        = 'satg-be-field-container',
	field_container_class_prefix = 'satg-be-field-container-',
	field_class_prefix           = 'satg-be-field-',

	status_prefix = 'satg-has',
	status_re     = new RegExp(SDom.class_re_prefix + status_prefix + '([a-z]+)' + SDom.class_re_suffix),

	record_status_prefix = 'satg-hasrecord',
	record_status_re     = new RegExp(SDom.class_re_prefix + record_status_prefix + '([a-z]+)' + SDom.class_re_suffix),

	message_container_class = 'satg-be-message-text',

	perl_flags_regex = /^\(\?([a-z]+)\)/;

BulkEditor.record_container_class     = 'satg-be-bd';
BulkEditor.record_msg_container_class = 'satg-be-record-message-container';

BulkEditor.fieldMarkup = function(key, record)
{
	var field = this.getFieldConfig(key);
	return BulkEditor.markup[ field.type || 'input' ].call(this, key, record[key], field, record);
};

function switchPage(state)
{
	this._saveChanges();

	this.pg.setTotalRecords(state.totalRecords, true);
	this.pg.setStartIndex(state.recordOffset, true);
	this.pg.setRowsPerPage(state.rowsPerPage, true);
	this.pg.setPage(state.page, true);
	this._updatePageStatus();
	this._reload();
}

YAHOO.lang.extend(BulkEditor, YAHOO.util.EventProvider,
{
	_init: function(
		/* string/element */	container,
		/* map */				fields,
		/* DataSource */		data_source,
		/* object */			config)
	{
		this.container     = Dom.get(container);
		this.fields        = fields;
		this.ds            = data_source;
		this.request_extra = config.requestExtra || {};

		this.createEvent('notifyErrors');
		this.createEvent('clearErrorNotification');

		if (config.paginator)
		{
			this.setPaginator(config.paginator, true);
		}

		this.clearServerErrors();
		YAHOO.lang.later(0, this, this._reload);	// allow derived class to _init
	},

	_reload: function()
	{
		var request =
		{
			startIndex:  this.pg ? this.pg.getStartIndex() : 0,
			resultCount: this.pg ? this.pg.getRowsPerPage() : default_page_size
		};
		YAHOO.lang.augmentObject(request, this.request_extra);

		var callback =
		{
			success: function(request, response)
			{
				this.busy_overlay.hide();
				if (this.pg && this.pg.getStartIndex() >= this.ds.getRecordCount())
				{
					this.pg.setPage(this.pg.getPreviousPage());
					return;
				}

				this._render(response);
				this._updatePaginator(response);
				this.scroll_to_index = -1;
			},
			error: function()
			{
				YAHOO.SATG.Debug.alert('error loading data in BulkEditor');

				this.busy_overlay.hide();
				this.scroll_to_index = -1;
			},
			scope: this
		};

		if (!this.busy_overlay)
		{
			this.busy_overlay = new YAHOO.SATG.BusyOverlay(this.container);
		}
		this.busy_overlay.show();

		this.ds.sendRequest(request, callback);
	},

	setPaginator: function(
		/* Paginator */	paginator,
		/* string */	silent)
	{
		if (this.pg)
		{
			this.pg.unsubscribe('changeRequest', switchPage, this);
			this.pg = null;
		}

		if (paginator)
		{
			this.pg = paginator;
			this.pg.subscribe('changeRequest', switchPage, this, true);
				// By not using (...,null,this), we can unsubscribe cleanly.
		}

		if (!silent)
		{
			this._reload();
		}
	},

	// data

	_saveChanges: function()
	{
		var records = this.ds.getCurrentRecords();
		var id_key  = this.ds.getUniqueIdKey();
		for (var key in this.fields)
		{
			if (YAHOO.lang.hasOwnProperty(this.fields, key))
			{
				for (var i=0; i<records.length; i++)
				{
					var r  = records[i];
					var el = this.getFieldElement(r, key);
					this.ds.updateValue(r[ id_key ], key, el.value);
				}
			}
		}
	},

	/**
	 * Do not call this if you use server-side pagination.
	 */
	getAllValues: function(callback)
	{
		var request =
		{
			startIndex:  0,
			resultCount: this.ds.getRecordCount()
		};
		YAHOO.lang.augmentObject(request, this.request_extra);

		this.ds.sendRequest(request, callback);
	},

	getChanges: function()
	{
		return this.ds.getChanges();
	},

	/**
	 * You *must* _reload() the widget after calling this function!
	 */
	insertRecord: function(
		/* int */		index,
		/* object */	record)
	{
		var record_id = this.ds.insertRecord(index, record);
		if (index <= this.server_errors.records.length)
		{
			this.server_errors.records.splice(index,0, { id: record_id });
			// leave entry in record_map undefined
			this._updatePageStatus();
		}
		return record_id;
	},

	/**
	 * You *must* _reload() the widget after calling this function!
	 */
	removeRecord: function(
		/* int */ index)
	{
		if (this.ds.removeRecord(index))
		{
			if (index < this.server_errors.records.length)
			{
				var rec = this.server_errors.records[index];
				this.server_errors.records.splice(index,1);
				delete this.server_errors.record_map[ rec[ this.ds.getUniqueIdKey() ] ];
				this._updatePageStatus();
			}
			return true;
		}
		else
		{
			return false;
		}
	},

	// find stuff

	getContainer: function()
	{
		return this.container;
	},

	getFieldConfig: function(
		/* string */	key)
	{
		return this.fields[key] || {};
	},

	getRecordContainerId: function(
		/* string/object */ record)
	{
		if (YAHOO.lang.isString(record))
		{
			return id_prefix + id_separator + record;
		}
		else
		{
			return id_prefix + id_separator + record[ this.ds.getUniqueIdKey() ];
		}
	},

	getFieldId: function(
		/* string/object */	record,
		/* string */		key)
	{
		return this.getRecordContainerId(record) + id_separator + key;
	},

	getRecordAndFieldKey: function(
		/* string/element */	field)
	{
		var m = id_regex.exec(YAHOO.lang.isString(field) ? field : field.id);
		if (m && m.length > 0)
		{
			return { record: this.ds.getCurrentRecordMap()[ m[1] ], field_key: m[2] };
		}
	},

	getRecordId: function(
		/* object/element */	el)
	{
		if (YAHOO.lang.isObject(el) && !el.tagName)
		{
			return el[ this.ds.getUniqueIdKey() ];
		}

		if (!Dom.hasClass(el, BulkEditor.record_container_class))
		{
			el = Dom.getAncestorByClassName(el, BulkEditor.record_container_class);
		}

		if (el)
		{
			var m  = id_regex.exec(el.id);
			if (m && m.length > 0)
			{
				return m[1];
			}
		}
	},

	getRecordContainer: function(
		/* string/object/element */ record)
	{
		if (YAHOO.lang.isString(record))
		{
			var id = id_prefix + id_separator + record;
		}
		else if (record.tagName)
		{
			return Dom.hasClass(record, BulkEditor.record_container_class) ?
					record : Dom.getAncestorByClassName(record, BulkEditor.record_container_class);
		}
		else	// record object
		{
			var id = this.getRecordContainerId(record);
		}

		return Dom.get(id);
	},

	getFieldContainer: function(
		/* string/object/element */	record,
		/* string */				key)
	{
		var field = this.getFieldElement(record, key);
		return Dom.hasClass(field, field_container_class) ?
				field : Dom.getAncestorByClassName(field, field_container_class);
	},

	getFieldElement: function(
		/* string/object/element */	record,
		/* string */				key)
	{
		if (record.tagName)
		{
			record = this.getRecordId(record);
		}
		return Dom.get(this.getFieldId(record, key));
	},

	showRecordIndex: function(
		/* int */ index)
	{
		if (index < 0 || this.ds.getRecordCount() <= index)
		{
			return;
		}

		var start = this.pg ? this.pg.getStartIndex() : 0;
		var count = this.pg ? this.pg.getRowsPerPage() : default_page_size;
		if (start <= index && index < start+count)
		{
			SDom.scrollIntoView(
				this.getRecordContainer(this.ds.getCurrentRecords()[ index - start ]));
		}
		else if (this.pg)
		{
			this.scroll_to_index = index;
			this.pg.setPage(1 + Math.floor(index / count));
		}
	},

	showRecordId: function(
		/* string */ id)
	{
		var index = this.ds.recordIdToIndex(id);
		if (index !== false)
		{
			this.showRecordIndex(index);
		}
	},

	// rendering

	_render: function(response)
	{
		YAHOO.SATG.Debug.alert('_render');

		Event.purgeElement(this.container);
		this._renderContainer(this.container);
		this.container.scrollTop = this.container.scrollLeft = 0;

		var data = response.results;
		for (var i=0; i<data.length; i++)
		{
			var el  = this._renderRecordContainer(this.container, data[i]);
			this._renderRecord(el, data[i]);
		}

		if (this.auto_validate)
		{
			this.validate();
		}

		if (this.scroll_to_index >= 0)
		{
			this.showRecordIndex(this.scroll_to_index);
			this.scroll_to_index = -1;
		}
	},

	_renderContainer: function(
		/* element */	container)
	{
		container.innerHTML = '';
	},

	_renderRecordContainer: function(
		/* element */	container,
		/* object */	record)
	{
		return null;
	},

	_renderRecord: function(
		/* element */	container,
		/* object */	record)
	{
		for (var key in this.fields)
		{
			if (YAHOO.lang.hasOwnProperty(this.fields, key))
			{
				this._renderField(container, key, record[key], this.fields[key], record);
			}
		}
	},

	_renderField: function(
		/* element */	container,
		/* string */	key,
		/* mixed */		value,
		/* object */	field,
		/* object */	record)
	{
	},

	_updatePaginator: function(response)
	{
		if (this.pg)
		{
			this.pg.setTotalRecords(this.ds.getRecordCount(), true);
		}
	},

	// server errors

	clearServerErrors: function()
	{
		if (this.server_errors && this.server_errors.page &&
			this.server_errors.page.length)
		{
			this.fireEvent('clearErrorNotification');
		}

		this.server_errors =
		{
			page:       [],
			records:    [],
			record_map: {}
		};

		if (this.pg)
		{
			this.pg.set('pageStatus', []);
		}
		this.first_error_page = -1;

		this.clearValidationMessages();
	},

	setServerErrors: function(
		/* array */	page_errors,
		/* array */	record_field_errors)
	{
		if (this.server_errors.page.length &&
			(!page_errors || !page_errors.length))
		{
			this.fireEvent('clearErrorNotification');
		}

		this.server_errors =
		{
			page:       page_errors || [],
			records:    record_field_errors || [],
			record_map: {}
		};

		var r = this.server_errors.records;
		for (var i=0; i<r.length; i++)
		{
			this.server_errors.record_map[ r[i].id ] = r[i];
		}

		this._updatePageStatus();

		if (!this.pg || this.pg.getCurrentPage() === this.first_error_page)
		{
			this.validate();
		}
		else
		{
			this.auto_validate = true;
			this.pg.setPage(this.first_error_page);
		}
	},

	_updatePageStatus: function()
	{
		if (!this.pg)
		{
			return;
		}

		var page_size = this.pg ? this.pg.getRowsPerPage() : default_page_size;
		var status    = this.page_status.slice(0);

		this.first_error_page = -1;

		var r = this.server_errors.records;
		for (var i=0; i<r.length; i++)
		{
			if (r[i].recordError || r[i].fieldErrors)
			{
				var j     = Math.floor(i / page_size);
				status[j] = 'error';
				if (this.first_error_page == -1)
				{
					this.first_error_page = i;
				}
			}
		}

		this.pg.set('pageStatus', status);
	},

	// validation

	validate: function()
	{
		this.auto_validate = true;
		this._saveChanges();

		this.clearValidationMessages();

		var status = this._validateVisibleFields();
		if (!status && this.pg)
		{
			this.page_status[ this.pg.getCurrentPage()-1 ] = 'error';
		}

		status = this._validateAllPages() && status;	// status last to guarantee call

		if (!status || this.server_errors.page.length)
		{
			var err = this.server_errors.page.slice(0);
			if (err.length === 0)
			{
				err.push(YAHOO.SATG.Locale.SATGForm.yiv_submit_error);
			}
			this.fireEvent('notifyErrors', err);

			var found = false;
			Dom.getElementsByClassName(BulkEditor.record_container_class, null, this.container, function(e)
			{
				if (!found && Dom.hasClass(e, status_re))
				{
					SDom.scrollIntoView(e);
					found = true;
				}
			});
		}

		this._updatePageStatus();
		return status;
	},

	_validateVisibleFields: function()
	{
		var status = true;

		// fields

		var e1 = this.container.getElementsByTagName('input');
		var e2 = this.container.getElementsByTagName('textarea');
		var e3 = this.container.getElementsByTagName('select');

		FormUtil.cleanValues(e1);
		FormUtil.cleanValues(e2);

		status = this._validateElements(e1) && status;	// status last to guarantee call
		status = this._validateElements(e2) && status;
		status = this._validateElements(e3) && status;

		// records -- after fields, since field class regex would wipe out record class

		Dom.getElementsByClassName(BulkEditor.record_container_class, null, this.container, function(e)
		{
			var id  = this.getRecordId(e);
			var err = this.server_errors.record_map[id];
			if (err && err.recordError)
			{
				err = err.recordError;
				if (YAHOO.lang.isString(err))
				{
					var msg  = err;
					var type = 'error';
				}
				else
				{
					var msg  = err.msg;
					var type = err.type;
				}
				this.displayRecordMessage(id, msg, type, false);
				status = status && !(type == 'error' || type == 'warn');
			}
		},
		this, true);

		return status;
	},

	_validateElements: function(
		/* array */ e)
	{
		var status = true;
		for (var i=0; i<e.length; i++)
		{
			var field_info = this.getRecordAndFieldKey(e[i]);
			if (!field_info)
			{
				continue;
			}

			var field    = this.getFieldConfig(field_info.field_key);
			var msg_list = field.validation && field.validation.msg;

			var info = Form.validateFromCSSData(e[i], msg_list);
			if (info.error)
			{
				this.displayFieldMessage(e[i], info.error, 'error', false);
				status = false;
				continue;
			}

			if (info.keepGoing)
			{
				if (field.validation && YAHOO.lang.isString(field.validation.regex))
				{
					var flags = '';
					var m     = perl_flags_regex.exec(field.validation.regex);
					if (m && m.length == 2)
					{
						flags                  = m[1];
						field.validation.regex = field.validation.regex.replace(perl_flags_regex, '');
					}
					field.validation.regex = new RegExp(field.validation.regex, flags);
				}

				if (field.validation &&
					field.validation.regex instanceof RegExp &&
					!field.validation.regex.test(e[i].value))
				{
					this.displayFieldMessage(e[i], msg_list && msg_list.regex, 'error', false);
					status = false;
					continue;
				}
			}

			if (field.validation &&
				YAHOO.lang.isFunction(field.validation.fn) &&
				!field.validation.fn.call(this, e[i]))
			{
				status = false;
				continue;
			}

			var err = this.server_errors.record_map[ this.getRecordId(field_info.record) ];
			if (err && err.fieldErrors)
			{
				var f = err.fieldErrors[ field_info.field_key ];
				if (f)
				{
					if (YAHOO.lang.isString(f))
					{
						var msg  = f;
						var type = 'error';
					}
					else
					{
						var msg  = f.msg;
						var type = f.type;
					}
					this.displayFieldMessage(e[i], msg, type, false);
					status = status && !(type == 'error' || type == 'warn');
				}
				continue;
			}
		}

		return status;
	},

	_validateAllPages: function()
	{
		if (!this.pg || !this.ds._dataIsLocal())
		{
			return true;
		}

		if (!this.validation_el)
		{
			this.validation_el = document.createElement(input);
		}

		if (!this.validation_keys)
		{
			this.validation_keys = [];
			for (var key in this.fields)
			{
				if (YAHOO.lang.hasOwnPropety(this.fields, key) &&
					this.fields[key].validation)
				{
					this.validation_keys.push(key);
				}
			}
		}

		var count = this.ds.getRecordCount();
		for (var i=0; i<count; i++)
		{
			for (var j=0; j<this.validation_keys.length; j++)
			{
				var key   = this.validation_keys[j];
				var value = this.ds.getValue(i, key);
			}
		}

		return true;
	},

	clearValidationMessages: function()
	{
		this.has_validation_messages = false;
		this.page_status             = [];

		this.fireEvent('clearErrorNotification');

		var list = Dom.getElementsByClassName(status_re, null, this.container, function(e)
		{
			Dom.removeClass(e, status_re);
		});

		var list = Dom.getElementsByClassName(record_status_re, null, this.container, function(e)
		{
			Dom.removeClass(e, record_status_re);
		});

		Dom.getElementsByClassName(message_container_class, null, this.container, function(e)
		{
			e.innerHTML = '';
		})
	},

	displayFieldMessage: function(
		/* element */	e,
		/* string */	msg,
		/* string */	type,
		/* boolean */	scroll)
	{
		var bd = this.getRecordContainer(e);
		this._updateRecordStatus(bd, type, status_re, status_prefix, scroll);

		bd = Dom.getAncestorByClassName(e, field_container_class);
		if (Form.statusTakesPrecendence(this._getElementStatus(bd, status_re), type))
		{
			if (msg)
			{
				var m = Dom.getElementsByClassName(message_container_class, null, bd);
				if (m && m.length > 0)
				{
					m[0].innerHTML = msg;
				}
			}

			Dom.replaceClass(bd, status_re, status_prefix + type);
			this.has_validation_messages = true;
		}
	},

	displayRecordMessage: function(
		/* string */	id,
		/* string */	msg,
		/* string */	type,
		/* boolean */	scroll)
	{
		var bd = this.getRecordContainer(id);
		this._updateRecordStatus(bd, type, status_re, status_prefix, scroll);
		if (this._updateRecordStatus(bd, type, record_status_re, record_status_prefix, scroll) &&
			msg)	// msg last to guarantee call
		{
			bd = Dom.getElementsByClassName(BulkEditor.record_msg_container_class, null, bd)[0];
			if (bd)
			{
				var m = Dom.getElementsByClassName(message_container_class, null, bd);
				if (m && m.length > 0)
				{
					m[0].innerHTML = msg;
				}
			}
		}
	},

	_getElementStatus: function(
		/* string/object */ e,
		/* regex */			r)
	{
		var m = r.exec(e.className);
		return ((m && m.length) ? m[1] : false);
	},

	_updateRecordStatus: function(
		/* element */	bd,
		/* string */	type,
		/* regex */		r,
		/* string */	prefix,
		/* boolean */	scroll)
	{
		if (YAHOO.lang.isUndefined(scroll))
		{
			scroll = !this.has_validation_messages;
		}

		if (Form.statusTakesPrecendence(this._getElementStatus(bd, r), type))
		{
			if (scroll)
			{
				SDom.scrollIntoView(bd);
			}

			Dom.replaceClass(bd, r, prefix + type);
			this.has_validation_messages = true;
			return true;
		}

		return false;
	}
});

//
// Markup
//

BulkEditor.error_msg_markup =
	'<div class="satg-be-message-icon"></div>' +
	'<div class="satg-be-message-text"></div>';

BulkEditor.labelMarkup = function(key, value, field, record)
{
	var label = '<label for="{id}">{label}</label>';

	return YAHOO.lang.substitute(label,
	{
		id:    this.getFieldId(record, key),
		label: field.label
	});
};

BulkEditor.markup =
{
	input: function(key, value, field, record)
	{
		var input =
			'<div class="{cont}{key}">' +
				'{label}{msg1}' +
				'<input type="text" id="{id}" value="{value}" class="{field}{key} {yiv}" />' +
				'{msg2}' +
			'</div>';

		var label = field && field.label ? BulkEditor.labelMarkup.call(this, key, value, field, record) : '';

		return YAHOO.lang.substitute(input,
		{
			cont:  field_container_class + ' ' + field_container_class_prefix,
			field: field_class_prefix,
			key:   key,
			id:    this.getFieldId(record, key),
			label: label,
			value: Util.cleanHTML(value),
			yiv:   (field && field.validation && field.validation.css) || '',
			msg1:  label ? BulkEditor.error_msg_markup : '',
			msg2:  label ? '' : BulkEditor.error_msg_markup
		});
	},

	select: function(key, value, field, record)
	{
		var select =
			'<div class="{cont}{key}">' +
				'{label}{msg1}' +
				'<select id="{id}" class="{field}{key}">{options}</select>' +
				'{msg2}' +
			'</div>';

		var option = '<option value="{value}" {selected}>{text}</option>';

		var options = '';
		for (var i=0; i<field.values.length; i++)
		{
			var v = field.values[i];
			options += YAHOO.lang.substitute(option,
			{
				value:    v.value,
				text:     Util.cleanHTML(v.text),
				selected: value && value.toString() === v.value ? 'selected' : ''
			});
		}

		var label = field && field.label ? BulkEditor.labelMarkup.call(this, key, value, field, record) : '';

		return YAHOO.lang.substitute(select,
		{
			cont:  	 field_container_class + ' ' + field_container_class_prefix,
			field:   field_class_prefix,
			key:     key,
			id:      this.getFieldId(record, key),
			label:   label,
			options: options,
			yiv:     (field && field.validation && field.validation.css) || '',
			msg1:    label ? BulkEditor.error_msg_markup : '',
			msg2:    label ? '' : BulkEditor.error_msg_markup
		});
	},

	textarea: function(key, value, field, record)
	{
		var textarea =
			'<div class="{cont}{key}">' +
				'{label}{msg1}' +
				'<textarea id="{id}" class="satg-textarea-field {prefix}{key} {yiv}">{value}</textarea>' +
				'{msg2}' +
			'</div>';

		var label = field && field.label ? BulkEditor.labelMarkup.call(this, key, value, field, record) : '';

		return YAHOO.lang.substitute(textarea,
		{
			cont:   field_container_class + ' ' + field_container_class_prefix,
			prefix: field_class_prefix,
			key:    key,
			id:     this.getFieldId(record, key),
			label:  label,
			value:  Util.cleanHTML(value),
			yiv:    (field && field.validation && field.validation.css) || '',
			msg1:   label ? BulkEditor.error_msg_markup : '',
			msg2:   label ? '' : BulkEditor.error_msg_markup
		});
	}
};
