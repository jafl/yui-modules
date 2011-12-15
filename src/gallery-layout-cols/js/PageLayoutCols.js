(function(){
"use strict";

/**********************************************************************
 * Manages the stacked columns on a page between header and footer:
 *		header, body column, body column, ..., body column, footer
 *
 * This class must be used as a singleton.
 */

var Dom = YAHOO.util.Dom,
	SDom = YAHOO.SATG.Dom,
	Event = YAHOO.util.Event,
	CustomEvent = YAHOO.util.CustomEvent,
	PageLayout = YAHOO.SATG.PageLayout,
	DDTarget = YAHOO.util.DDTarget,
	PageLayoutDDProxy = YAHOO.SATG.PageLayoutDDProxy,
	Prof = YAHOO.tool.Profiler;

YAHOO.SATG.PageLayoutT = function()
{
};

var PageLayoutT = YAHOO.SATG.PageLayoutT,

	the_mode                       = null,
	the_init_flag                  = false,
	the_sticky_footer_flag         = false,
	the_match_content_heights_flag = true,

	the_min_page_height = PageLayout.min_page_height,	// em
	the_min_page_width  = PageLayout.min_page_width,	// em

	the_max_search_depth = 5,
	reflow_delay = 100,

	the_header_container = null,
	the_body_container   = null,
	the_body_horiz_mbp   = 0,		// compute once; required for bug in Safari 3.1.2
	the_body_vert_mbp    = 0,		// compute once; required for bug in Safari 3.1.2
	the_footer_container = null,
	the_resize_event     = null,

	the_body_cols =
	{
		viewport:    { w: 0, h: 0 },
		cols:        [],
		modules:     [],	// list of modules inside each column
		col_widths:  [],	// list of percentages
		row_heights: []		// list of lists of percentages
	},

	the_dd_targets = {},
	the_dd_nubs    = {};

PageLayoutT.prototype =
{
	horizontal: false,

	page_header_marker_class:  PageLayout.prototype.page_header_marker_class,
	page_content_marker_class: PageLayout.prototype.page_content_marker_class,
	page_footer_marker_class:  PageLayout.prototype.page_footer_marker_class,
	page_block_re:             PageLayout.prototype.page_block_re,

	body_col_class:      'satg-module-col',
	module_class:        PageLayout.prototype.module_class,
	module_header_class: PageLayout.prototype.module_header_class,
	module_body_class:   PageLayout.prototype.module_body_class,
	module_footer_class: PageLayout.prototype.module_footer_class,

	not_managed_class:        PageLayout.prototype.not_managed_class,
	collapse_horiz_nub_regex: PageLayout.prototype.collapse_horiz_nub_regex,
	collapse_vert_nub_class:  PageLayout.prototype.collapse_vert_nub_class,
	expand_horiz_nub_regex:   PageLayout.prototype.expand_horiz_nub_regex,
	expand_vert_nub_class:    PageLayout.prototype.expand_vert_nub_class,
	collapsed_vert_class:     PageLayout.prototype.collapsed_vert_class,
	collapsed_horiz_class:    PageLayout.prototype.collapsed_horiz_class,
	collapsed_any_regex:      PageLayout.prototype.collapsed_any_regex,

	mode_regex:              PageLayout.prototype.mode_regex,
	col_width_class_re:      PageLayout.prototype.col_width_class_re,
	row_height_class_re:     PageLayout.prototype.row_height_class_re,

	dd_group_name:            PageLayout.prototype.dd_group_name,
	drag_target_class:        PageLayout.prototype.drag_target_class,
	drag_nub_class:           PageLayout.prototype.drag_nub_class,
	module_header_drag_class: PageLayout.prototype.module_header_drag_class,
	module_no_drag_class:     PageLayout.prototype.module_no_drag_class,
	bomb_sight_class:         'satg-layout-bomb-sight satg-layout-bomb-sight-cols',

	has_explosive_modules_bug: (0 < YAHOO.env.ua.ie && YAHOO.env.ua.ie < 8),
	is_borked_browser:         false,//(7 <= YAHOO.env.ua.ie && YAHOO.env.ua.ie < 8),

	onBeforeResizeModule: PageLayout.prototype.onBeforeResizeModule,
	onAfterResizeModule:  PageLayout.prototype.onAfterResizeModule,

	onBeforeCollapseModule: PageLayout.prototype.onBeforeCollapseModule,
	onAfterCollapseModule:  PageLayout.prototype.onAfterCollapseModule,
	onBeforeExpandModule:   PageLayout.prototype.onBeforeExpandModule,
	onAfterExpandModule:    PageLayout.prototype.onAfterExpandModule,

	onAfterReflow:     PageLayout.prototype.onAfterReflow,
	onAfterModeChange: PageLayout.prototype.onAfterModeChange,

	/**********************************************************************
	 * Returns true after initialization is complete.
	 */

	hasInitialized: function()
	{
		return the_init_flag;
	},

	/**********************************************************************
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

	/**********************************************************************
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

	/**********************************************************************
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

	/**********************************************************************
	 * Returns the current behavior of the layout.
	 */

	getMode: function()
	{
		return the_mode;
	},

	/**********************************************************************
	 * Call this to change the behavior of the layout.
	 */

	setMode: function(
		/* mode */ mode)
	{
		if (mode !== the_mode)
		{
			the_mode = mode;
			updateFitClass.call(this);

			if (the_body_container)
			{
				the_body_container.scrollTop = 0;
			}

			reparentFooter.call(this);
			resize.call(this);

			this.onAfterModeChange.fire();
		}
	},

	/**********************************************************************
	 * Call this to change the behavior of the footer in FIT_TO_CONTENT.
	 */

	setStickyFooter: function(
		/* bool */ sticky)
	{
		the_sticky_footer_flag = sticky;
		reparentFooter.call(this);
		resize.call(this);
	},

	/**********************************************************************
	 * Call this to turn column height matching on or off.
	 */

	setMatchColumnHeights: function(
		/* bool */ match)
	{
		the_match_content_heights_flag = match;
		resize.call(this);
	},

	/**********************************************************************
	 * Sets the minimum allowed size of the viewport in *em*.
	 */

	setMinViewportSize: function(
		/* int */	w,
		/* int */	h)
	{
		the_min_page_width  = w;
		the_min_page_height = h;
		resize.call(this);
	},

	/**********************************************************************
	 * Sets the percentage sizes of all the columns in the body of the page.
	 */

	setColumnWidths: function(
		/* array */	col_widths)
	{
		if (col_widths.length != the_body_cols.col_widths.length)
		{
			throw Error('Wrong number of column widths.  Expected ' + the_body_cols.col_widths.length);
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

		the_body_cols.col_widths = col_widths;
		resize.call(this);
	},

	/**********************************************************************
	 * Sets the percentage sizes of all the rows in one column of the page.
	 */

	setRowHeights: function(
		/* int */	col_index,
		/* array */	row_heights)
	{
		var w = the_body_cols.row_heights[ col_index ];
		if (row_heights.length != w.length)
		{
			throw Error('Wrong number of row heights.  Expected ' + w.length);
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

		w = row_heights;
		resize.call(this);
	},

	/**********************************************************************
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

	/**********************************************************************
	 * Attaches a listener to the given element.
	 */

	_registerExpandNub: function(
		/* string */	id)
	{
		Event.on(id, 'click', PageLayout._expandSection,
				 [id, this.module_class, this.body_col_class], this);
	},

	_registerCollapseNub: function(
		/* string */	id)
	{
		Event.on(id, 'click', PageLayout._collapseSection,
				 [id, this.module_class, this.body_col_class], this);
	},

	/**********************************************************************
	 * Expand/collapse a section.
	 */

	sectionIsCollapsed: function(
		/* string */	id)
	{
		var e = Dom.get(id);
		if (SDom.getFirstElementByClassName(e, this.expand_horiz_nub_regex, the_max_search_depth))
		{
			var collapsed = Dom.hasClass(e.parentNode, this.collapsed_any_regex);
		}
		else
		{
			var collapsed = Dom.hasClass(e, this.collapsed_any_regex);
		}

		return collapsed;
	},

	expandSection: function(
		/* string/object */	id)
	{
		var e   = Dom.get(id);
		var nub = SDom.getFirstElementByClassName(e, this.expand_vert_nub_class, the_max_search_depth);
		if (!nub)
		{
			nub = SDom.getFirstElementByClassName(e, this.expand_horiz_nub_regex, the_max_search_depth);
		}

		if (nub)
		{
			PageLayout._expandSection.call(this, null, [nub, this.module_class, this.body_col_class]);
		}
	},

	collapseSection: function(
		/* string/object */	id)
	{
		var e   = Dom.get(id);
		var nub = SDom.getFirstElementByClassName(e, this.collapse_vert_nub_class, the_max_search_depth);
		if (!nub)
		{
			nub = SDom.getFirstElementByClassName(e, this.collapse_horiz_nub_regex, the_max_search_depth);
		}

		if (nub)
		{
			PageLayout._collapseSection.call(this, null, [nub, this.module_class, this.body_col_class]);
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

	/**********************************************************************
	 * Updates the layout which contains the specified element.
	 */

	elementResized: function(
		/* string/object */	el)
	{
		if (el._node)	// allow Y.Node
		{
			el = el._node;
		}

		if (Dom.isAncestor(the_header_container, el) ||
			Dom.isAncestor(the_body_container,   el) ||
			Dom.isAncestor(the_footer_container, el))
		{
			if (this.refresh_timer != null)
			{
				this.refresh_timer.cancel();
			}

			var t1 = (new Date()).getTime();
			this.refresh_timer = YAHOO.lang.later(reflow_delay, this, function()
			{
				this.refresh_timer = null;

				// if JS is really busy, wait a bit longer

				var t2 = (new Date()).getTime();
				if (t2 > t1 + 2*reflow_delay)
				{
					YAHOO.SATG.Debug.alert('deferred reflow: ' + (t2-t1));
					this.elementResized(el);
					return;
				}

				this.need_borked_browser_hack = true;
				this.getResizeEvent().fire();
				this.need_borked_browser_hack = false;
			});

			return true;
		}
		else
		{
			return false;
		}
	},

	/**********************************************************************
	 * For use before _init() is called.  Copies settings from another
	 * instance of PageLayout.  This is intentionally opaque.
	 */

	_copySettings: function(
		/* object */	pl)
	{
		var list               = pl._getSettings();
		the_mode               = list[0];
		the_sticky_footer_flag = list[1];
		the_min_page_height    = list[2];
		the_min_page_width     = list[3];
		the_resize_event       = list[4];

		if (the_resize_event)
		{
			the_resize_event.subscribe(resize, null, this);
		}
	},

	/**********************************************************************
	 * Scan the DOM for the elements we care about.  Called automatically
	 * after the page loads.
	 */

	_init: function(
		/* array */	page_blocks)
	{
		Prof.startBlock("SATG.PageLayoutT._init");

		if (!the_mode)
		{
			the_mode = PageLayout.FIT_TO_VIEWPORT;
		}

		if (!page_blocks)
		{
			page_blocks = Dom.getElementsByClassName(this.page_block_re, 'div');
		}

		var list = SDom.filterByClassName(page_blocks, this.page_header_marker_class);
		if (list.length > 1)
		{
			Prof.endBlock();
			throw Error('There must be at most one div with class ' + this.page_header_marker_class);
		}
		the_header_container = (list.length ? list[0] : null);

		list = SDom.filterByClassName(page_blocks, this.page_content_marker_class);
		if (list.length != 1)
		{
			Prof.endBlock();
			throw Error('There must be exactly one div with class ' + this.page_content_marker_class);
		}
		the_body_container = list[0];

		the_body_horiz_mbp = SDom.horizMarginBorderPadding(the_body_container);
		the_body_vert_mbp  = SDom.vertMarginBorderPadding(the_body_container);

		var m = the_body_container.className.match(this.mode_regex);
		if (m && m.length)
		{
			the_mode = PageLayout[ m[0] ];
		}

		list = SDom.filterByClassName(page_blocks, this.page_footer_marker_class);
		if (list.length > 1)
		{
			Prof.endBlock();
			throw Error('There must be at most one div with class ' + this.page_footer_marker_class);
		}
		the_footer_container = (list.length ? list[0] : null);

		updateFitClass.call(this);
		reparentFooter.call(this);
		this._rescanBody();

		Event.on(window, 'resize', resize, null, this);
		SDom.textResizeEvent.subscribe(resize, null, this);

		Event.on(window, 'load', resize, null, this);	// after images load

		the_init_flag = true;

		Prof.endBlock();
	},

	/**********************************************************************
	 * Call this after manually adding or removing modules on the page.
	 */

	_rescanBody: function(
		/* bool */	rescan_sizes)
	{
		Prof.startBlock("SATG.PageLayout._rescanBody");

		var saved_col_widths  = the_body_cols.col_widths;
		var saved_row_heights = the_body_cols.row_heights;

		the_body_cols.cols        = Dom.getElementsByClassName(this.body_col_class, 'div', the_body_container);
		the_body_cols.modules     = [];
		the_body_cols.col_widths  = [];
		the_body_cols.row_heights = [];

		var col_count = the_body_cols.cols.length;
		for (var i=0; i<col_count; i++)
		{
			var col = the_body_cols.cols[i];
			Dom.generateId(col, this.body_col_class+'-');
			the_body_cols.col_widths.push(100.0/col_count);

			var list = Dom.getElementsByClassName(this.module_class, 'div', col);
			if (list.length == 0)
			{
				the_body_cols.cols       = [];
				the_body_cols.modules    = [];
				the_body_cols.col_widths = [];
				Prof.endBlock();
				throw Error('There must be at least one ' + this.module_class + ' inside ' + this.body_col_class + '.');
			}

			the_body_cols.modules.push(list);
/*
			if (PageLayoutDDProxy)
			{
				var row_count = list.length;
				var has_nubs  = false;
				for (var j=0; j<row_count; j++)
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

				if (!the_dd_targets[ col.id ] &&
					(has_nubs || Dom.hasClass(col, this.drag_target_class)))
				{
					the_dd_targets[ col.id ] = new DDTarget(col.id, this.dd_group_name);
				}

				if (row_count == 1)
				{
					Dom.addClass(list[0], this.module_no_drag_class);
				}
			}
*/
			// restore saved widths, if possible

			if (!rescan_sizes && saved_row_heights[i] && saved_row_heights[i].length == list.length)
			{
				the_body_cols.row_heights.push(saved_row_heights[i]);
			}
			else
			{
				the_body_cols.row_heights.push(
					PageLayout._normalizeSizes.call(this, list, this.row_height_class_re));
			}
		}

		// restore saved heights, if possible

		if (!rescan_sizes && saved_col_widths.length == the_body_cols.col_widths.length)
		{
			the_body_cols.col_widths = saved_col_widths;
		}
		else
		{
			the_body_cols.col_widths =
				PageLayout._normalizeSizes.call(this, the_body_cols.cols, this.col_width_class_re);
		}

		resize.call(this);

		Prof.endBlock();
	},

	/**********************************************************************
	 * Adjusts the module body height so that the total module (hd,bd,ft)
	 * has the specified height.
	 */

	_setModuleHeight: PageLayout.prototype._setModuleHeight,

	/**********************************************************************
	 * Clears the height of the module, so it expands to fit its content.
	 */

	_clearModuleHeight: PageLayout.prototype._clearModuleHeight,

	/**********************************************************************
	 * Clears the height of the module, so it expands to fit its content.
	 */

	_notifyModuleSizeChanged: PageLayout.prototype._notifyModuleSizeChanged,

	/**********************************************************************
	 * Returns the components of the module.
	 */

	_analyzeModule: PageLayout.prototype._analyzeModule
};

function updateFitClass()
{
	Dom.replaceClass(the_body_container, /(^|\s)FIT_TO_(VIEWPORT|CONTENT)(\s|$)/,
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
		the_body_container.parentNode.insertBefore(the_footer_container, Dom.getNextSiblingBy(the_body_container, function(node)
		{
			return node.tagName.toLowerCase() != 'script';
		}));
	}
	else
	{
		the_body_container.appendChild(the_footer_container);
	}
};

function resize()
{
	Prof.startBlock("SATG.PageLayoutT.resize");

	if (!the_body_container)
	{
		Prof.endBlock();
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
		(viewport.w === the_body_cols.viewport.w &&
		 viewport.h === the_body_cols.viewport.h))
	{
		Prof.endBlock();
		return;
	}

	the_body_cols.viewport = viewport;

	SDom.hideFloaters();	// after confirming that viewport really has changed

	var min_width = the_min_page_width * SDom.getEmToPx();
	if (this.is_borked_browser && this.need_borked_browser_hack)
	{
		the_body_cols.viewport.w -= 5;
		min_width                -= 5;
	}

	var body_width = Math.max(the_body_cols.viewport.w, min_width);
	Dom.setStyle(the_header_container, 'width', body_width+'px');
	Dom.setStyle(the_body_container,   'width', (body_width - the_body_horiz_mbp)+'px');
	Dom.setStyle(the_footer_container, 'width', the_sticky_footer_flag ? body_width+'px' : 'auto');
	body_width = the_body_container.clientWidth - the_body_horiz_mbp;

	the_body_cols.viewport.bcw = the_body_container.clientWidth;

	var h     = the_body_cols.viewport.h;
	var h_min = the_min_page_height * SDom.getEmToPx();
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
	else if (h < 0)						// FIT_TO_CONTENT doesn't enforce min height
	{
		h = 10 + the_body_vert_mbp;		// arbitrary, positive number
	}

	Dom.setStyle(the_body_container, 'height', (h - the_body_vert_mbp)+'px');

	var col_count = the_body_cols.cols.length;

	// fit-to-viewport: adjust for vertically collapsed modules

	if (the_mode == PageLayout.FIT_TO_VIEWPORT)
	{
		var row_heights = [],
			col_heights = [];
		for (var i=0; i<col_count; i++)
		{
			var heights = the_body_cols.row_heights[i].slice(0);
			row_heights.push(heights);
			col_heights.push(body_height);

			var uncollapsed_count = 0,
				sum               = 0;

			var modules = the_body_cols.modules[i];
			for (var j=0; j<modules.length; j++)
			{
				var module = modules[j];
				if (Dom.hasClass(module, this.collapsed_vert_class))
				{
					Dom.setStyle(module, 'height', 'auto');
					heights[j]      = - module.offsetHeight;
					col_heights[i] -= SDom.height(module);
				}
				else if (heights[j] > 0)
				{
					uncollapsed_count++;
					sum += heights[j];
				}
			}

			if (uncollapsed_count < modules.length)
			{
				for (var j=0; j<modules.length; j++)
				{
					if (heights[j] > 0)
					{
						heights[j] *= (100.0 / sum);
					}
				}
			}
		}
	}

	// adjust for horizontally collapsed or fixed width modules

	var module_info = {};
	var col_widths  = the_body_cols.col_widths.slice(0);

	var uncollapsed_count = 0,
		sum               = 0;
	for (var i=0; i<col_count; i++)
	{
		var col       = the_body_cols.cols[i];
		var collapsed = Dom.hasClass(col, this.collapsed_horiz_class);
		var modules   = the_body_cols.modules[i];
		if (collapsed || col_widths[i] < 0)
		{
			col_widths[i] = 0;
			if (collapsed)
			{
				Dom.setStyle(col, 'width', 'auto');
				Dom.setStyle(modules[0], 'width', 'auto');
			}
			else if (this.has_explosive_modules_bug)
			{
				var children = this._analyzeModule(modules[0]);
				if (children.bd)
				{
					var root_w = SDom.width(children.bd) + SDom.horizMarginBorderPadding(modules[j]);
					Dom.setStyle(children.root, 'width', root_w+'px');
					Dom.setStyle(col, 'width', root_w+'px');
				}
			}

			body_width -= SDom.width(col);
		}
		else
		{
			uncollapsed_count++;
			sum += col_widths[i];

			if (modules.length == 1)
			{
				Dom.setStyle(modules[0], 'height', 'auto');
			}
		}
	}

	if (uncollapsed_count < col_count)
	{
		for (var i=0; i<col_count; i++)
		{
			col_widths[i] *= (100.0 / sum);
		}
	}

	// set width of each column and size of each module

	var total_w  = 0,
		m        = 0,
		ftc_size = [];
	for (var i=0; i<col_count; i++)
	{
		if (col_widths[i] == 0)
		{
			var module   = the_body_cols.modules[i][0];
			var children = this._analyzeModule(module);
			if (the_mode == PageLayout.FIT_TO_VIEWPORT)
			{
				var h = getHeight(col_heights[i], row_heights, i, 0, module, module_info);
				Dom.setStyle(module, 'height', h+'px');

				if (children.bd)
				{
					var h1 = _adjustHeight.call(this, h, children);
					var w1 = SDom.insideWidth(children.bd);
					this.onBeforeResizeModule.fire(children.bd, h1, w1);
					Dom.setStyle(children.bd, 'height', h1+'px');
					this.onAfterResizeModule.fire(children.bd, h1, w1);
				}
			}
			else if (children.bd)
			{
				this.onBeforeResizeModule.fire(children.bd, 'auto', 'auto');

				Dom.setStyle(children.root, 'height', 'auto');
				Dom.setStyle(children.bd, 'height', 'auto');

				if (the_match_content_heights_flag)
				{
					ftc_size.push([ [children.bd, SDom.insideWidth(children.bd)] ]);
				}
				else
				{
					this.onAfterResizeModule.fire(
						children.bd,
						SDom.insideHeight(children.bd),
						SDom.insideWidth(children.bd));
				}
			}
			continue;
		}
		m++;

		var w    = Math.max(1, Math.floor(body_width * col_widths[i] / 100.0));
		total_w += w;
		if (m == uncollapsed_count)
		{
			w += body_width - total_w;
		}

		w = Math.max(1, w - SDom.horizMarginBorderPadding(the_body_cols.cols[i]));
		Dom.setStyle(the_body_cols.cols[i], 'width', w+'px');
		w = Math.max(1, w - SDom.horizMarginBorderPadding(the_body_cols.modules[0][0]));

		var modules = the_body_cols.modules[i];
		if (the_mode == PageLayout.FIT_TO_VIEWPORT)
		{
			// adjust for vertically collapsed or fixed height modules

			var total_h    = 0;
			var open_count = modules.length;
			for (var j=0; j<modules.length; j++)
			{
				var h = row_heights[i][j];
				if (h < 0)
				{
					total_h += SDom.height(modules[j]);
					open_count--;
				}
			}

			// set the height of each module

			var k = 0;
			for (var j=0; j<modules.length; j++)
			{
				var children = this._analyzeModule(modules[j]);
				if (row_heights[i][j] < 0)
				{
					var h1 = SDom.insideHeight(children.bd);
					var w1 = w - SDom.horizMarginBorderPadding(children.root) -
							 SDom.horizMarginBorderPadding(children.bd);
					this.onBeforeResizeModule.fire(children.bd, h1, w1);
					Dom.setStyle(modules[j], 'width', w+'px');
					this.onAfterResizeModule.fire(children.bd, h1, w1);
					continue;
				}
				k++;

				if (children.bd)
				{
					var h    = getHeight(col_heights[i], row_heights, i, j, modules[j], module_info);
					var h1   = _adjustHeight.call(this, h, children);
					total_h += h + module_info.mbp;

					if (k == open_count)
					{
						h1 += body_height - total_h;
					}

					var w1 = Math.max(1, w - SDom.horizMarginBorderPadding(children.bd));
					this.onBeforeResizeModule.fire(children.bd, h1, w1);
					setWidth.call(this, children, w);
					Dom.setStyle(children.bd, 'height', h1+'px');
					this.onAfterResizeModule.fire(children.bd, h1, w1);
				}
			}
		}
		else
		{
			// set the width of each module
			// clear the height of each module

			ftc_size.push([]);
			for (var j=0; j<modules.length; j++)
			{
				var children = this._analyzeModule(modules[j]);
				if (children.bd)
				{
					var w1 = Math.max(1, w - SDom.horizMarginBorderPadding(children.bd));
					this.onBeforeResizeModule.fire(children.bd, 'auto', w1);
					setWidth.call(this, children, w);
					Dom.setStyle(children.root, 'height', 'auto');
					Dom.setStyle(children.bd, 'height', 'auto');

					if (the_match_content_heights_flag)
					{
						ftc_size[i].push([children.bd, w1]);
					}
					else
					{
						this.onAfterResizeModule.fire(children.bd, SDom.insideHeight(children.bd), w1);
					}
				}
			}
		}
	}

	// set the height of the last module in each column

	if (the_mode == PageLayout.FIT_TO_CONTENT && the_match_content_heights_flag)
	{
		var h = 0;
		for (var i=0; i<col_count; i++)
		{
			h = Math.max(h, the_body_cols.cols[i].offsetHeight);
		}

		for (var i=0; i<col_count; i++)
		{
			var modules = the_body_cols.modules[i],
				module  = null,
				w1      = 0;
			for (var j=modules.length-1; j>=0; j--)
			{
				if (modules.length == 1 ||
					(!module &&
					 !Dom.hasClass(modules[j], this.collapsed_vert_class) &&
					 the_body_cols.row_heights[i][j] > 0))
				{
					module = modules[j];
					w1     = ftc_size[i][j][1];
				}
				else
				{
					var bd = ftc_size[i][j][0];
					this.onAfterResizeModule.fire(bd, SDom.insideHeight(bd), ftc_size[i][j][1]);
				}
			}

			if (module)
			{
				var delta = h - the_body_cols.cols[i].offsetHeight;
				if (delta > 0 && Dom.hasClass(module.parentNode, this.collapsed_horiz_class))
				{
					Dom.setStyle(module, 'height', (SDom.insideHeight(module) + delta)+'px');
				}
				else	// always fire afterResizeModule
				{
					var children = this._analyzeModule(module);
					if (children.bd)
					{
						var h1 = SDom.insideHeight(children.bd) + delta;
						Dom.setStyle(module, 'height', 'auto');
						Dom.setStyle(children.bd, 'height', h1+'px');
						this.onAfterResizeModule.fire(children.bd, h1, w1);
					}
				}
			}
		}
	}

	Dom.setStyle(the_body_container, 'visibility', 'visible');

	YAHOO.lang.later(100, this, checkViewportSize);

	Prof.endBlock();
};

function checkViewportSize()
{
	if (Dom.getViewportWidth()         != the_body_cols.viewport.w ||
		Dom.getViewportHeight()        != the_body_cols.viewport.h ||
		the_body_container.clientWidth != the_body_cols.viewport.bcw)
	{
		resize.call(this);
	}
	else
	{
		this.onAfterReflow.fire();
	}
};

function _adjustHeight(
	/* int */		total_height,
	/* object */	children)
{
//Prof.startBlock("_adjustHeight");
//try {
	var h = total_height;

	if (children.hd)
	{
		h -= children.hd.offsetHeight;
	}
	if (children.ft)
	{
		h -= children.ft.offsetHeight;
	}

	h -= SDom.vertMarginBorderPadding(children.bd);

	return Math.max(h, PageLayout.min_module_height);
//}
//finally { Prof.endBlock(); }
};

function getHeight(
	/* int */		body_height,
	/* array */		row_heights,
	/* int */		col_index,
	/* int */		row_index,
	/* object */	module,
	/* object */	module_info)
{
	module_info.mbp = SDom.vertMarginBorderPadding(module);
	return Math.max(1, Math.floor(body_height * row_heights[ col_index ][ row_index ] / 100.0) - module_info.mbp);
};

function setWidth(
	/* object */	children,
	/* int */		w)
{
	Dom.setStyle(children.root, 'width', w+'px');
};

})();
