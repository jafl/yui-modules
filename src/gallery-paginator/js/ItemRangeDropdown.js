/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
*/

/**
 * ui Component to display a menu for selecting the range of items to display.
 *
 * @module gallery-paginator
 * @namespace Y.Paginator.ui
 * @class ItemRangeDropdown
 * @for Y.Paginator
 * @constructor
 * @param p {Pagintor} Paginator instance to attach to
 */
Paginator.ui.ItemRangeDropdown = function(
	/* Paginator */	p)
{
	this.paginator = p;

	p.on('destroy',            this.destroy, this);
	p.on('recordOffsetChange', this.update,  this);
	p.on('rowsPerPageChange',  this.update,  this);
	p.on('totalRecordsChange', this.update,  this);

	p.on('itemRangeDropdownClassChange', this.update, this);
};

/**
 * Decorates Paginator instances with new attributes. Called during
 * Paginator instantiation.
 * @method init
 * @param p {Paginator} Paginator instance to decorate
 * @static
 */
Paginator.ui.ItemRangeDropdown.init = function(
	/* Paginator */	p)
{
	/**
	 * CSS class assigned to the span
	 * @attribute itemRangeDropdownClass
	 * @default 'yui-paginator-ir-dropdown'
	 */
	p.addAttr('itemRangeDropdownClass', {
		value : Y.ClassNameManager.getClassName(Paginator.NAME, 'ir-dropdown'),
		validator : Y.Lang.isString
	});

	/**
	 * Used as innerHTML for the span.
	 * @attribute itemRangeDropdownTemplate
	 * @default '{currentRange} of {totalItems}'
	 */
	p.addAttr('itemRangeDropdownTemplate', {
		value : '{currentRange} of {totalItems}',
		validator : Y.Lang.isString
	});
};

Paginator.ui.ItemRangeDropdown.prototype =
{
	/**
	 * Removes the link/span node and clears event listeners.
	 * @method destroy
	 * @private
	 */
	destroy: function()
	{
		this.span.remove(true);
		this.span       = null;
		this.menu       = null;
		this.page_count = null;
	},

	/**
	 * Generate the nodes and return the appropriate node given the current
	 * pagination state.
	 * @method render
	 * @param id_base {string} used to create unique ids for generated nodes
	 * @return {HTMLElement}
	 */
	render: function(
		id_base)
	{
		this.span = Y.Node.create(
			'<span id="'+id_base+'-item-range">' +
			Y.substitute(this.paginator.get('itemRangeDropdownTemplate'),
			{
				N: '<select class="yui-current-item-range"></select>',
				M: '<span class="yui-item-count"></span>'
			}) +
			'</span>');
		this.span.set('className', this.paginator.get('itemRangeDropdownClass'));

		this.menu = this.span.one('select');
		this.menu.on('change', this._onChange, this);

		this.page_count = this.span.one('span.yui-item-count');

		this.update();

		return this.span;
	},

	/**
	 * Swap the link and span nodes if appropriate.
	 * @method update
	 * @param e {CustomEvent} The calling change event
	 */
	update: function(
		/* CustomEvent */ e)
	{
		if (e && e.prevValue === e.newValue)
		{
			return;
		}

		var page    = this.paginator.getCurrentPage();
		var count   = this.paginator.getTotalPages();
		var options = this.menu.get('options');

		options.length = 0;
		for (var i=1; i<=count; i++)
		{
			var range = this.paginator.getPageRecords(i);

			options[i-1] = new Option((range[0]+1) + ' - ' + (range[1]+1), i);
			if (i == page)
			{
				this.menu.set('selectedIndex', i-1);
			}
		}

		this.span.set('className', this.paginator.get('itemRangeDropdownClass'));
		this.page_count.set('innerHTML', this.paginator.getTotalRecords());
	},

	_onChange: function(e)
	{
		this.paginator.setPage(parseInt(this.menu.get('value'), 10));
	}
};
