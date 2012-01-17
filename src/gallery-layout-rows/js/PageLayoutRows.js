"use strict";

/**
 * Manages stacked rows on a page: header, body row, ..., body
 * row, footer.  Each row contains one or more modules.
 *
 * @class PageLayout
 * @extends Base
 * @constructor
 * @param config {Object}
 */

var Dom = YAHOO.util.Dom,
	SDom = YAHOO.SATG.Dom,
	Event = YAHOO.util.Event,
	CustomEvent = YAHOO.util.CustomEvent;

function PageLayout()
{
	PageLayout.superclass.constructor.apply(this, arguments);
}

PageLayout.NAME = "pagelayout";

PageLayout.ATTRS =
{
	/**
	 * FIT_TO_VIEWPORT sizes the rows to fit everything inside the
	 * browser's viewport.  FIT_TO_CONTENT sizes the rows to eliminate all
	 * scrollbars on module bodies.
	 *
	 * @config mode
	 * @type PageLayout.FIT_TO_VIEWPORT or PageLayout.FIT_TO_CONTENT
	 * @default PageLayout.FIT_TO_VIEWPORT
	 */
	mode:
	{
		value:     PageLayout.FIT_TO_VIEWPORT,
		validator: function(value)
		{
			return (value === PageLayout.FIT_TO_VIEWPORT || value === PageLayout.FIT_TO_CONTENT);
		}
	},

	/**
	 * Minimum page width in FIT_TO_VIEWPORT mode, measured in em's.  If
	 * the page content will not collapse narrower than this width.  If the
	 * viewport is smaller, the brower's horizontal scrollbar will appear.
	 * 
	 * @config minWidth
	 * @type {Number} em's
	 * @default 73 (em) 950px @ 13px font
	 */
	minWidth:
	{
		value:     73,
		validator: function(value)
		{
			return Y.Lang.isNumber(value) && value > 0
		}
	},

	/**
	 * Minimum page height in FIT_TO_VIEWPORT mode, measured in em's.  If
	 * the page content will not collapse lower than this height.  If the
	 * viewport is smaller, the brower's vertical scrollbar will appear.
	 * 
	 * @config minHeight
	 * @type {Number} em's
	 * @default 44 (em) 570px @ 13px font
	 */
	minHeight:
	{
		value:     44,
		validator: function(value)
		{
			return Y.Lang.isNumber(value) && value > 0
		}
	},

	/**
	 * In FIT_TO_CONTENT mode, set this to true to make the footer stick to
	 * the bottom of the viewport.  The default is for the footer to scroll
	 * along with the rest of the page content.
	 *
	 * @config stickyFooter
	 * @type {Boolean}
	 * @default false
	 */
	stickyFooter:
	{
		value:     false,
		validator: Y.Lang.isBoolean
	}
};

/**
 * @property Y.PageLayout.FIT_TO_VIEWPORT
 */
PageLayout.FIT_TO_VIEWPORT = 0;

/**
 * @property Y.PageLayout.FIT_TO_CONTENT
 */
PageLayout.FIT_TO_CONTENT  = 1;

var reflow_delay      = 100,	// ms
	min_module_height = 10,		// px
	unmanaged_size    = -1,		// smaller than any module size (collapsed size = - normal size)

	the_header_container = null,
	the_body_container   = null,
	the_body_horiz_mbp   = 0,
	the_body_vert_mbp    = 0,
	the_footer_container = null,
	the_resize_event     = null,

	the_body_rows =
	{
		viewport:    { w: 0, h: 0 },
		rows:        [],
		modules:     [],	// list of modules inside each row
		row_heights: [],	// list of percentages
		col_widths:  []		// list of lists of percentages
	},

	the_dd_targets = {},
	the_dd_nubs    = {};

Y.extend(PageLayout, Y.Base,
{
	page_header_marker_class:  'satg-hdb',
	page_content_marker_class: 'satg-content',
	page_footer_marker_class:  'satg-ftb',
	page_block_re:             new RegExp(SDom.class_re_prefix + 'satg-(hdb|content|ftb)' + SDom.class_re_suffix),

	body_row_class:      'satg-module-row',
	module_class:        'satg-module',
	module_header_class: 'satg-m-hd',
	module_body_class:   'satg-m-bd',
	module_footer_class: 'satg-m-ft',

	not_managed_class:        'satg-not-managed',
	collapse_horiz_nub_regex: /satg-layout-(left|right)-collapse-nub/,
	collapse_vert_nub_class:  'satg-layout-vert-collapse-nub',
	expand_horiz_nub_regex:   /satg-layout-(left|right)-expand-nub/,
	expand_vert_nub_class:    'satg-layout-vert-expand-nub',
	collapsed_vert_class:     'satg-collapsed-vert',
	collapsed_horiz_class:    'satg-collapsed-horiz',
	collapsed_any_regex:      /satg-collapsed-(horiz|vert)/,

	mode_regex:              /[A-Z_]*FIT_TO_[A-Z_]+/,
	row_height_class_re:     /(?:^|\s)height:([0-9]+)%/,
	col_width_class_re:      /(?:^|\s)width:([0-9]+)%/,

	dd_group_name:            'satg-layout-dd-group',
	drag_target_class:        'satg-layout-dd-target',
	drag_nub_class:           'satg-layout-dragnub',
	module_header_drag_class: 'satg-layout-draggable',
	module_no_drag_class:     'satg-layout-drag-disabled',
	bomb_sight_class:         'satg-layout-bomb-sight satg-layout-bomb-sight-rows',

	has_no_recalc_auto_bug:    (0 < YAHOO.env.ua.ie && YAHOO.env.ua.ie < 8),
	has_explosive_modules_bug: (0 < YAHOO.env.ua.ie && YAHOO.env.ua.ie < 8),
	is_borked_dom_access:      (0 < YAHOO.env.ua.ie && YAHOO.env.ua.ie < 8),

	/*
	 * Returns the height of the sticky header.
	 */

	getHeaderHeight: function()
	{
		return (the_header_container ? the_header_container.offsetHeight : 0);
	},

	_getHeaderContainer: function()
	{
		return the_header_container;
	},

	/*
	 * Returns the height of the scrolling body.
	 */

	getBodyHeight: function()
	{
		return the_body_container.offsetHeight;
	},

	_getBodyContainer: function()
	{
		return the_body_container;
	},

	/*
	 * Returns the height of the sticky footer.
	 */

	getFooterHeight: function()
	{
		return (the_sticky_footer_flag && the_footer_container ?
				the_footer_container.offsetHeight : 0);
	},

	_getFooterContainer: function()
	{
		return the_footer_container;
	},

	/*
	 * Sets the percentage sizes of all the rows in the body of the page.
	 */

	setRowHeights: function(
		/* array */	row_heights)
	{
		if (row_heights.length != the_body_rows.row_heights.length)
		{
			throw Error('Wrong number of row heights.  Expected ' + the_body_rows.row_heights.length);
		}

		var sum = 0;
		for (var i=0; i<row_heights.length; i++)
		{
			sum += row_heights[i];
		}

		if (Math.round(sum) != 100)
		{
			throw Error('Row heights must add up to 100%');
		}

		the_body_rows.row_heights = row_heights;
		resize.call(this);
	},

	/*
	 * Sets the percentage sizes of all the columns in one row of the page.
	 */

	setColumnWidths: function(
		/* int */	row_index,
		/* array */	col_widths)
	{
		var w = the_body_rows.col_widths[ row_index ];
		if (col_widths.length != w.length)
		{
			throw Error('Wrong number of column widths.  Expected ' + w.length);
		}

		var sum = 0;
		for (var i=0; i<col_widths.length; i++)
		{
			sum += col_widths[i];
		}

		if (Math.round(sum) != 100)
		{
			throw Error('Column widths must add up to 100%');
		}

		w = col_widths;
		resize.call(this);
	},

	/*
	 * Returns an event that, when fired, causes the sizing of all modules
	 * to be recalculated.
	 */

	getResizeEvent: function()
	{
		if (!the_resize_event)
		{
			the_resize_event = new CustomEvent('resize', this);
			the_resize_event.subscribe(resize, null, this);
		}
		return the_resize_event;
	},

	/*
	 * Attaches a listener to the given element.
	 */

	_registerExpandNub: function(
		/* string */	id)
	{
		Event.on(id, 'click', PageLayout._expandSection,
				 [id, this.body_row_class, this.module_class], this);
	},

	_registerCollapseNub: function(
		/* string */	id)
	{
		Event.on(id, 'click', PageLayout._collapseSection,
				 [id, this.body_row_class, this.module_class], this);
	},

	/*
	 * Expand/collapse a section.
	 */

	sectionIsCollapsed: function(
		/* string */	id)
	{
		var e = Y.one('#'+id);
		if (e.one('.'+this.expand_vert_nub_class))
		{
			var collapsed = e.get('parentNode').hasClass(this.collapsed_any_regex);
		}
		else
		{
			var collapsed = e.hasClass(this.collapsed_any_regex);
		}

		return collapsed;
	},

	expandSection: function(
		/* string */	id)
	{
		var e   = Y.one('#'+id);
		var nub = e.one('.'+this.expand_vert_nub_class);
		if (!nub)
		{
			nub = e.one('.'+this.expand_horiz_nub_regex);
		}

		if (nub)
		{
			PageLayout._expandSection.call(this, null, [nub, this.body_row_class, this.module_class]);
		}
	},

	collapseSection: function(
		/* string */	id)
	{
		var e   = Y.one('#'+id);
		var nub = e.one(this.collapse_vert_nub_class);
		if (!nub)
		{
			nub = e.one(this.collapse_horiz_nub_regex);
		}

		if (nub)
		{
			PageLayout._collapseSection.call(this, null, [nub, this.body_row_class, this.module_class]);
		}
	},

	toggleSection: function(
		/* string */	id)
	{
		if (this.sectionIsCollapsed(id))
		{
			this.expandSection(id);
		}
		else
		{
			this.collapseSection(id);
		}
	},

	/*
	 * Updates the layout which contains the specified element.
	 */

	elementResized: function(
		/* string/object */	el)
	{
		el = Y.one(el);

		if (the_header_container.contains(el) ||
			the_body_container.contains(el) ||
			the_footer_container.contains(el))
		{
			if (this.refresh_timer != null)
			{
				this.refresh_timer.cancel();
			}

			var t1 = (new Date()).getTime();
			this.refresh_timer = Y.later(reflow_delay, this, function()
			{
				this.refresh_timer = null;

				// if JS is really busy, wait a bit longer

				var t2 = (new Date()).getTime();
				if (t2 > t1 + 2*reflow_delay)
				{
					Y.log('deferred reflow: ' + (t2-t1), 'info', 'layout-rows');
					this.elementResized(el);
					return;
				}

				this.getResizeEvent().fire();
			});

			return true;
		}
		else
		{
			return false;
		}
	},

	/*
	 * Scan the DOM for the elements we care about.  Called automatically
	 * after the page loads.
	 */

	_init: function(
		/* array */	page_blocks)
	{
		this.after('modeChange', function()
		{
			updateFitClass.call(this);

			if (the_body_container)
			{
				the_body_container.scrollTop = 0;
			}

			reparentFooter.call(this);
			resize.call(this);
		});

		this.after('minWidthChange', resize);
		this.after('minHeightChange', resize);

		this.after('stickyFooterChange', function()
		{
			reparentFooter.call(this);
			resize.call(this);
		});

		if (!page_blocks)
		{
			page_blocks = Y.one('body').getElementsByClassName(this.page_block_re, 'div');
		}

		var list = page_blocks.filter('.'+this.page_header_marker_class);
		if (list.size() > 1)
		{
			throw Error('There must be at most one div with class ' + this.page_header_marker_class);
		}
		the_header_container = (list.isEmpty() ? null : list.item(0));

		list = page_blocks.filter('.'+this.page_content_marker_class);
		if (list.size() != 1)
		{
			throw Error('There must be exactly one div with class ' + this.page_content_marker_class);
		}
		the_body_container = list.item(0);

		the_body_horiz_mbp = the_body_container.horizMarginBorderPadding();
		the_body_vert_mbp  = the_body_container.vertMarginBorderPadding();

		var m = the_body_container.className.match(this.mode_regex);
		if (m && m.length)
		{
			the_mode = PageLayout[ m[0] ];
		}

		list = page_blocks.filter('.'+this.page_footer_marker_class);
		if (list.size() > 1)
		{
			throw Error('There must be at most one div with class ' + this.page_footer_marker_class);
		}
		the_footer_container = (list.isEmpty() ? null : list.item(0));

		updateFitClass.call(this);
		reparentFooter.call(this);
		this._rescanBody();

		var w = Y.one(Y.config.win);
		w.on('resize', resize, this);
		SDom.textResizeEvent.subscribe(resize, null, this);

		w.on('load', resize, this);		// after images load
	},

	/*
	 * Call this after manually adding or removing modules on the page.
	 */

	_rescanBody: function(
		/* bool */	rescan_sizes)
	{
		var saved_row_heights = the_body_rows.row_heights;
		var saved_col_widths  = the_body_rows.col_widths;

		the_body_rows.rows        = the_body_container.all('div.' + this.body_row_class);
		the_body_rows.modules     = [];
		the_body_rows.row_heights = [];
		the_body_rows.col_widths  = [];

		var row_count = the_body_rows.rows.length;
		for (var i=0; i<row_count; i++)
		{
			var row = the_body_rows.rows[i];
			row.generateId();
			the_body_rows.row_heights.push(100.0/row_count);

			var list = row.all('div.' + this.module_class);
			if (list.isEmpty())
			{
				the_body_rows.rows        = [];
				the_body_rows.modules     = [];
				the_body_rows.row_heights = [];
				throw Error('There must be at least one ' + this.module_class + ' inside ' + this.body_row_class + '.');
			}

			the_body_rows.modules.push(list);
/*
			if (PageLayoutDDProxy)
			{
				var col_count = list.length;
				var has_nubs  = false;
				for (var j=0; j<col_count; j++)
				{
					var module = list[j];
					Dom.generateId(module, this.module_class+'-');
					Dom.removeClass(module, this.module_no_drag_class);

					if (the_dd_nubs[ module.id ])
					{
						has_nubs = (the_dd_nubs[ module.id ] != 'none');
					}
					else
					{
						var nub = Dom.getElementsByClassName(this.drag_nub_class, null, module)[0];
						if (nub)
						{
							var children = this._analyzeModule(module);
							if (children.hd)
							{
								Dom.addClass(children.hd, this.module_header_drag_class);
								the_dd_nubs[ module.id ] =
									new PageLayoutDDProxy(this, module.id, children.hd, this.dd_group_name);
								has_nubs = true;
							}
						}

						if (!the_dd_nubs[ module.id ])
						{
							the_dd_nubs[ module.id ] = 'none';
						}
					}
				}

				if (!the_dd_targets[ row.id ] &&
					(has_nubs || Dom.hasClass(row, this.drag_target_class)))
				{
					the_dd_targets[ row.id ] = new DDTarget(row.id, this.dd_group_name);
				}

				if (col_count == 1)
				{
					Dom.addClass(list[0], this.module_no_drag_class);
				}
			}
*/
			// restore saved widths, if possible

			if (!rescan_sizes && saved_col_widths[i] && saved_col_widths[i].length == list.size())
			{
				the_body_rows.col_widths.push(saved_col_widths[i]);
			}
			else
			{
				the_body_rows.col_widths.push(
					PageLayout._normalizeSizes.call(this, list, this.col_width_class_re));
			}
		}

		// restore saved heights, if possible

		if (!rescan_sizes && saved_row_heights.length == the_body_rows.row_heights.length)
		{
			the_body_rows.row_heights = saved_row_heights;
		}
		else
		{
			the_body_rows.row_heights =
				PageLayout._normalizeSizes.call(this, the_body_rows.rows, this.row_height_class_re);
		}

		resize.call(this);
	},

	/*
	 * Adjusts the module body height so that the total module (hd,bd,ft)
	 * has the specified height.
	 */

	_setModuleHeight: function(
		/* string/object */	module,
		/* int */			h)
	{
		var children = this._analyzeModule(module);
		if (children.bd)
		{
			var h1 = _adjustHeight.call(this, h, children);
			children.bd.setStyle('height', h1+'px');
		}
	},

	/*
	 * Clears the height of the module, so it expands to fit its content.
	 */

	_clearModuleHeight: function(
		/* string/object */	module)
	{
		if (!module)
		{
			return;
		}

		if (module.root && module.bd)
		{
			var children = module;
		}
		else
		{
			var children = this._analyzeModule(module);
		}

		if (children.bd)
		{
			children.bd.setStyle('height', 'auto');
			this.fire('beforeResizeModule', children.bd, 'auto', children.bd.insideWidth());
		}
	},

	/*
	 * Clears the height of the module, so it expands to fit its content.
	 */

	_notifyModuleSizeChanged: function(
		/* string/object */	module_bd)
	{
		var h = module_bd.insideHeight();
		var w = module_bd.insideWidth();

		this.fire('beforeResizeModule', module_bd, h, w);
		this.fire('afterResizeModule', module_bd, h, w);
	},

	/*
	 * Returns the components of the module.
	 */

	_analyzeModule: function(
		/* node */	root)
	{
		var result =
		{
			root: root,
			hd:   null,
			bd:   null,
			ft:   null
		};

		// two step process avoid scanning into the module body

		var bd = root.one('.'+this.module_body_class);
		if (!bd)
		{
			return result;
		}

		var list = bd.siblings().filter('.'+this.module_body_class);
		list.push(bd);
		for (var i=0; i<list.size(); i++)
		{
			if (!list.item(i).hasClass(SDom.hide_class) &&
				!list.item(i).hasClass(SDom.force_hide_class))
			{
				result.bd = list[i];
				break;
			}
		}

		if (result.bd)
		{
			result.hd = result.bd.siblings().filter('.'+this.module_header_class);
			result.ft = result.bd.siblings().filter('.'+this.module_footer_class);
		}

		return result;
	}
});

function updateFitClass()
{
	the_body_container.replaceClass(/(^|\s)FIT_TO_(VIEWPORT|CONTENT)(\s|$)/,
		the_mode == PageLayout.FIT_TO_VIEWPORT ? 'FIT_TO_VIEWPORT' : 'FIT_TO_CONTENT');
};

function reparentFooter()
{
	if (!the_footer_container)
	{
		return;
	}

	if (the_mode == PageLayout.FIT_TO_VIEWPORT || the_sticky_footer_flag)
	{
		the_body_container.('parentNode').insertBefore(the_footer_container, Dom.getNextSiblingBy(the_body_container, function(node)
		{
			return node.tagName.toLowerCase() != 'script';
		}));
	}
	else
	{
		the_body_container.appendChild(the_footer_container);
	}
};

PageLayout._expandSection = function(
	/* event */	e,	// can be null
	/* array */	args)
{
	var id = args[0],
		vert_parent_class = args[1],
		horiz_parent_class = args[2];

	if (Dom.hasClass(id, this.expand_vert_nub_class))
	{
		var p = Dom.getAncestorByClassName(id, vert_parent_class);
		if (p)
		{
			var children = this._analyzeModule(p);
			this.fire('beforeExpandModule', children.bd);

			Dom.removeClass(p, this.collapsed_vert_class);
			this.getResizeEvent().fire();

			this.fire('afterExpandModule', children.bd);
		}
	}
	else
	{
		var p = Dom.getAncestorByClassName(id, horiz_parent_class);
		if (p)
		{
			var children = this._analyzeModule(p);
			this.fire('beforeExpandModule', children.bd);

			Dom.removeClass(p, this.collapsed_horiz_class);
			this.getResizeEvent().fire();

			this.fire('afterExpandModule', children.bd);
		}
	}
};

PageLayout._collapseSection = function(
	/* event */	e,	// can be null
	/* array */	args)
{
	var id = args[0],
		vert_parent_class = args[1],
		horiz_parent_class = args[2];

	if (Dom.hasClass(id, this.collapse_vert_nub_class))
	{
		var p = Dom.getAncestorByClassName(id, vert_parent_class);
		if (p)
		{
			var children = this._analyzeModule(p);
			this.fire('beforeCollapseModule', children.bd);

			Dom.addClass(p, this.collapsed_vert_class);
			this.getResizeEvent().fire();

			this.fire('afterCollapseModule', children.bd);
		}
	}
	else
	{
		var p = Dom.getAncestorByClassName(id, horiz_parent_class);
		if (p)
		{
			var children = this._analyzeModule(p);
			this.fire('beforeCollapseModule', children.bd);

			Dom.addClass(p, this.collapsed_horiz_class);
			this.getResizeEvent().fire();

			this.fire('afterCollapseModule', children.bd);
		}
	}
};

function resize()
{
	if (!the_body_container)
	{
		return;
	}

	Dom.setStyle(the_body_container, 'overflow-x',
		the_mode == PageLayout.FIT_TO_CONTENT ? 'auto' : 'hidden');
	Dom.setStyle(the_body_container, 'overflow-y',
		the_mode == PageLayout.FIT_TO_CONTENT ? 'scroll' : 'hidden');

	var viewport =
	{
		w: Dom.getViewportWidth(),
		h: Dom.getViewportHeight()
	};

	var resize_event = arguments[0] && arguments[0].type == 'resize';	// IE7 generates no-op's
	if (resize_event &&
		(viewport.w === the_body_rows.viewport.w &&
		 viewport.h === the_body_rows.viewport.h))
	{
		return;
	}

	the_body_rows.viewport = viewport;

	SDom.hideFloaters();	// after confirming that viewport really has changed

	var min_width  = this.get('minWidth') * SDom.getEmToPx();
	var body_width = Math.max(the_body_rows.viewport.w, min_width);
	Dom.setStyle(the_header_container, 'width', body_width+'px');
	Dom.setStyle(the_body_container,   'width', (body_width - the_body_horiz_mbp)+'px');
	Dom.setStyle(the_footer_container, 'width', the_sticky_footer_flag ? body_width+'px' : 'auto');
	body_width = the_body_container.clientWidth - the_body_horiz_mbp;

	the_body_rows.viewport.bcw = the_body_container.clientWidth;

	var h     = the_body_rows.viewport.h;
	var h_min = this.get('minHeight') * SDom.getEmToPx();
	if (the_mode == PageLayout.FIT_TO_VIEWPORT && h < h_min)
	{
		h = h_min;
		Dom.setStyle(document.documentElement, 'overflow-y', 'auto');
	}
	else if (!window.console || !window.console.apex_firebug_lite)	// remove inactive vertical scrollbar in IE
	{
		Dom.setStyle(document.documentElement, 'overflow-y', 'hidden');
	}

	if (the_header_container)
	{
		h -= the_header_container.offsetHeight;
	}
	if (the_footer_container &&
		(the_mode == PageLayout.FIT_TO_VIEWPORT || the_sticky_footer_flag))
	{
		h -= the_footer_container.offsetHeight;
	}

	if (the_mode == PageLayout.FIT_TO_VIEWPORT)
	{
		var body_height = h - the_body_vert_mbp;
	}
	else if (h < 0)							// FIT_TO_CONTENT doesn't enforce min height
	{
		h = 10 + the_body_vert_mbp;			// arbitrary, positive number
	}

	Dom.setStyle(the_body_container, 'height', (h - the_body_vert_mbp)+'px');

	var row_count = the_body_rows.rows.length;

	// reset module heights
	// adjust for horizontally collapsed or fixed width modules

	var col_widths = [],
		row_widths = [];
	for (var i=0; i<row_count; i++)
	{
		var widths = the_body_rows.col_widths[i].slice(0);
		col_widths.push(widths);
		row_widths.push(body_width);

		var uncollapsed_count = 0,
			sum               = 0;

		var modules = the_body_rows.modules[i];
		for (var j=0; j<modules.length; j++)
		{
			var module = modules[j];
			Dom.setStyle(module, 'height', 'auto');
			if (Dom.hasClass(module, this.collapsed_horiz_class))
			{
				if (this.has_no_recalc_auto_bug)
				{
					Dom.setStyle(module, 'display', 'none');
				}
				Dom.setStyle(module, 'width', 'auto');
				if (this.has_no_recalc_auto_bug)
				{
					Dom.setStyle(module, 'display', 'block');
				}
				widths[j]      = - module.offsetWidth;
				row_widths[i] -= SDom.width(module);
			}
			else if (widths[j] > 0)
			{
				uncollapsed_count++;
				sum += widths[j];
			}
		}

		if (uncollapsed_count < modules.length)
		{
			for (var j=0; j<modules.length; j++)
			{
				if (widths[j] > 0)
				{
					widths[j] *= (100.0 / sum);
				}
			}
		}
	}

	// fit-to-content:  compute height of each row; requires setting module widths
	// fit-to-viewport: adjust for vertically collapsed modules

	var module_info = {};
	if (the_mode == PageLayout.FIT_TO_CONTENT)
	{
		var row_heights = [];
		for (var i=0; i<row_count; i++)
		{
			Dom.setStyle(the_body_rows.rows[i], 'height', 'auto');

			var modules = the_body_rows.modules[i];
			var h       = 0;
			var total_w = 0;
			var open_count = modules.length;
			for (var j=0; j<modules.length; j++)
			{
				var w = col_widths[i][j];
				if (w < 0)
				{
					var total_w_hacked = false;
					if (w == unmanaged_size && this.has_explosive_modules_bug)
					{
						var children = this._analyzeModule(modules[j]);
						if (children.bd)
						{
							var bd_w = SDom.width(children.bd);
							total_w += bd_w + SDom.horizMarginBorderPadding(modules[j]);
							total_w_hacked = true;

							Dom.setStyle(children.root, 'width', bd_w+'px');
						}
					}

					if (!total_w_hacked)
					{
						total_w += SDom.width(modules[j]);
					}
					open_count--;
				}
			}

			var k = 0;
			for (var j=0; j<modules.length; j++)
			{
				var w = col_widths[i][j];
				if (w < 0)
				{
					if (w == unmanaged_size)
					{
						var children = this._analyzeModule(modules[j]);
						if (children.bd)
						{
							Dom.setStyle(children.root, 'height', 'auto');
							Dom.setStyle(children.bd, 'height', 'auto');
						}

						h = Math.max(h, modules[j].offsetHeight);
					}
					continue;
				}
				k++;

				var children = this._analyzeModule(modules[j]);
				if (children.bd)
				{
					var w    = getWidth(row_widths[i], col_widths, i, j, modules[j], module_info);
					total_w += w + module_info.mbp;

					if (k == open_count)
					{
						w += body_width - total_w;
					}

					var w1 = Math.max(1, w - SDom.horizMarginBorderPadding(children.bd));
					this.fire('beforeResizeModule', children.bd, 'auto', w1);
					setWidth.call(this, children, w);
					Dom.setStyle(children.root, 'height', 'auto');
					Dom.setStyle(children.bd, 'height', 'auto');
				}

				h = Math.max(h, modules[j].offsetHeight);
			}

			row_heights.push(h);
		}
	}
	else
	{
		var row_heights = the_body_rows.row_heights.slice(0);

		var uncollapsed_count = 0,
			sum               = 0;
		for (var i=0; i<row_count; i++)
		{
			var row       = the_body_rows.rows[i];
			var collapsed = Dom.hasClass(row, this.collapsed_vert_class);
			if (collapsed || row_heights[i] < 0)
			{
				row_heights[i] = 0;
				if (collapsed)
				{
					Dom.setStyle(row, 'height', 'auto');
				}

				// We cannot compute the height of row directly
				// because the row above might be wrapping.

				body_height -= SDom.height(Dom.getFirstChild(row));
				body_height -= SDom.vertMarginBorderPadding(row);
			}
			else
			{
				uncollapsed_count++;
				sum += row_heights[i];
			}
		}

		if (uncollapsed_count < row_count)
		{
			for (var i=0; i<row_count; i++)
			{
				row_heights[i] *= (100.0 / sum);
			}
		}
	}

	// set height of each row and size of each module

	for (var i=0; i<row_count; i++)
	{
		if (the_mode == PageLayout.FIT_TO_CONTENT)
		{
			var h = row_heights[i];
		}
		else
		{
			if (row_heights[i] == 0)
			{
				var module   = the_body_rows.modules[i][0];
				var children = this._analyzeModule(module);
				if (children.bd)
				{
					var h1 = SDom.insideHeight(children.bd);
					var w  = getWidth(row_widths[i], col_widths, i, 0, module, module_info);
					var w1 = Math.max(1, w - SDom.horizMarginBorderPadding(children.bd));
					this.fire('beforeResizeModule', children.bd, h1, w1);
					setWidth.call(this, children, w);
					this.fire('afterResizeModule', children.bd, h1, w1);
				}
				continue;
			}

			var h = Math.max(1, Math.floor(body_height * row_heights[i] / 100.0) - SDom.vertMarginBorderPadding(the_body_rows.rows[i]));
		}
		Dom.setStyle(the_body_rows.rows[i], 'height', h+'px');

		// adjust for horizontally collapsed or fixed width modules

		var modules    = the_body_rows.modules[i];
		var total_w    = 0;
		var open_count = modules.length;
		for (var j=0; j<modules.length; j++)
		{
			var w = col_widths[i][j];
			if (w < 0)
			{
				var total_w_hacked = false;
				if (w == unmanaged_size)
				{
					var children = this._analyzeModule(modules[j]);
					if (children.bd)
					{
						var h1 = _adjustHeight.call(this, h, children);
						var w1 = SDom.insideWidth(children.bd);
						this.fire('beforeResizeModule', children.bd, h1, w1);
						Dom.setStyle(children.bd, 'height', h1+'px');

						if (this.has_explosive_modules_bug)
						{
							var bd_w = SDom.width(children.bd);
							total_w += bd_w + SDom.horizMarginBorderPadding(modules[j]);
							total_w_hacked = true;

							Dom.setStyle(children.root, 'width', bd_w+'px');
						}

						this.fire('afterResizeModule', children.bd, h1, w1);
					}
				}
				else
				{
					Dom.setStyle(modules[j], 'height', Math.max(1, h - SDom.vertMarginBorderPadding(modules[j]))+'px');
				}

				if (!total_w_hacked)
				{
					total_w += SDom.width(modules[j]);
				}
				open_count--;
			}
		}

		// set the size of each module

		var k = 0;
		for (var j=0; j<modules.length; j++)
		{
			if (col_widths[i][j] < 0)
			{
				continue;
			}
			k++;

			var children = this._analyzeModule(modules[j]);
			if (children.bd)
			{
				var h1   = _adjustHeight.call(this, h, children);
				var w    = getWidth(row_widths[i], col_widths, i, j, modules[j], module_info);
				total_w += w + module_info.mbp;

				if (k == open_count)
				{
					w += body_width - total_w;
				}

				var w1 = Math.max(1, w - SDom.horizMarginBorderPadding(children.bd));
				if (the_mode == PageLayout.FIT_TO_VIEWPORT)
				{
					this.fire('beforeResizeModule', children.bd, h1, w1);
					setWidth.call(this, children, w);
				}

				Dom.setStyle(children.bd, 'height', h1+'px');

				this.fire('afterResizeModule', children.bd, h1, w1);
			}
		}
	}

	Dom.setStyle(the_body_container, 'visibility', 'visible');

	YAHOO.lang.later(100, this, checkViewportSize);
};

function checkViewportSize()
{
	if (Dom.getViewportWidth()         != the_body_rows.viewport.w ||
		Dom.getViewportHeight()        != the_body_rows.viewport.h ||
		the_body_container.clientWidth != the_body_rows.viewport.bcw)
	{
		resize.call(this);
	}
	else
	{
		this.fire('afterReflow');
	}
};

function _adjustHeight(
	/* int */		total_height,
	/* object */	children)
{
	var h = total_height;

	if (this.is_borked_dom_access)
	{
		var access_dom_so_it_will_be_right_next_time = children.bd.offsetHeight;
	}

	var b = children.root.offsetHeight - children.bd.offsetHeight;

	if (children.hd)
	{
		h -= children.hd.offsetHeight;
		b -= children.hd.offsetHeight;
	}
	if (children.ft)
	{
		h -= children.ft.offsetHeight;
		b -= children.ft.offsetHeight;
	}

	h -= b;

	h -= SDom.vertMarginBorderPadding(children.bd);

	return Math.max(h, min_module_height);
};

function getWidth(
	/* int */		body_width,
	/* array */		col_widths,
	/* int */		row_index,
	/* int */		col_index,
	/* object */	module,
	/* object */	module_info)
{
	module_info.mbp = SDom.horizMarginBorderPadding(module);
	return Math.max(1, Math.floor(body_width * col_widths[ row_index ][ col_index ] / 100.0) - module_info.mbp);
};

function setWidth(
	/* object */	children,
	/* int */		w)
{
	Dom.setStyle(children.root, 'width', w+'px');
};

PageLayout._normalizeSizes = function(
	/* array */	list,
	/* regex */	pattern)
{
	var sizes = [];

	// collect sizes

	var count = list.length;
	var blank_count = 0, sum = 0;
	for (var i=0; i<count; i++)
	{
		var m = list[i].className.match(pattern);
		if (Dom.hasClass(list[i], this.not_managed_class))
		{
			sizes.push(unmanaged_size);
		}
		else if (m && m.length)
		{
			Dom.removeClass(list[i], pattern);
			var size  = parseInt(m[1], 10);
			sum      += size;
			sizes.push(size);
		}
		else
		{
			sizes.push(0);
			blank_count++;
		}
	}

	// fill in blanks

	if (blank_count > 0)
	{
		var blank_size = Math.max((100 - sum) / blank_count, 10);
		sum            = 0;
		for (var i=0; i<count; i++)
		{
			if (sizes[i] < 0)
			{
				continue;
			}

			if (sizes[i] == 0)
			{
				sizes[i] = blank_size;
			}
			sum += sizes[i];
		}
	}

	// normalize sizes

	for (var i=0; i<count; i++)
	{
		if (sizes[i] > 0)
		{
			sizes[i] *= (100.0 / sum);
		}
	}

	return sizes;
};
