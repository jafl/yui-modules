"use strict";

var Dom = YAHOO.util.Dom,
	SDom = YAHOO.SATG.Dom,
	Event = YAHOO.util.Event;

/**
 * <p>Manages header (layout-hd), body (layout-bd), footer (layout-ft)
 * stacked vertically to either fit inside the viewport (fit-to-viewport)
 * or adjust to the size of the body content (fit-to-content).</p>
 * 
 * <p>The body content is sub-divided into modules, arranged either in rows
 * or columns.  The layout is automatically detected based on the marker
 * classes attached to the two layers of divs inside layout-bd:  either
 * layout-row > layout-col or layout-col > layout-row</p>
 * 
 * <p>Each module has an optional header (layout-m-hd), a body
 * (layout-m-bd), and an optional footer (layout-m-ft).  You can have
 * multiple layout-m-bd's, but only one can be visible at a time.  If you
 * change the DOM in any way that affects the height of any module header,
 * body, or footer, or if you switch bodies, you must call
 * <code>elementResized()</code> to reflow the layout.  (Technically, you
 * do not have to call <code>elementResized()</code> if you modify a module
 * body in fit-to-viewport mode, but if you later decide to switch to
 * fit-to-content, your optimization will cause trouble.)</p>
 * 
 * <p>If the body content is a single module, it expands as the content
 * expands (fit-to-content) until it would push the footer below the fold.
 * Then it switches to fit-to-content so the scrollbar appears on the
 * module instead of the entire viewport.</p>
 *
 * @class PageLayout
 * @extends Base
 * @constructor
 * @param config {Object}
 */

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
	},

	/**
	 * When organizing modules into columns in FIT_TO_CONTENT mode, set
	 * this to false to allow each column to be a different height.
	 *
	 * @config matchColumnHeights
	 * @type {Boolean}
	 * @default true
	 */
	matchColumnHeights:
	{
		value:     true,
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
PageLayout.FIT_TO_CONTENT = 1;

/**
 * @property Y.PageLayout.page_header_marker_class
 * @type {String}
 * @default "layout-hd"
 */
PageLayout.page_header_marker_class = 'layout-hd';

/**
 * @property Y.PageLayout.page_content_marker_class
 * @type {String}
 * @default "layout-bd"
 */
PageLayout.page_content_marker_class = 'layout-bd',

/**
 * @property Y.PageLayout.page_footer_marker_class
 * @type {String}
 * @default "layout-ft"
 */
PageLayout.page_footer_marker_class = 'layout-ft',

/**
 * @property Y.PageLayout.not_managed_class
 * @type {String}
 * @default "layout-not-managed"
 */
PageLayout.not_managed_class = 'layout-not-managed',

/**
 * @property Y.PageLayout.min_module_height
 * @type {Number}
 * @default 10 (px)
 */
PageLayout.min_module_height = 10; // px

PageLayout.unmanaged_size = -1; // smaller than any module size (collapsed size = - normal size)

var mode_regex          = /\bFIT_TO_[A-Z_]+/,
	row_height_class_re = /(?:^|\s)height:([0-9]+)%/,
	col_width_class_re  = /(?:^|\s)width:([0-9]+)%/,

	reflow_delay = 100, // ms

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


	module_class:        'satg-module',
	module_header_class: 'satg-m-hd',
	module_body_class:   'satg-m-bd',
	module_footer_class: 'satg-m-ft',

	collapse_horiz_nub_regex: /satg-layout-(left|right)-collapse-nub/,
	collapse_vert_nub_class:  'satg-layout-vert-collapse-nub',
	expand_horiz_nub_regex:   /satg-layout-(left|right)-expand-nub/,
	expand_vert_nub_class:    'satg-layout-vert-expand-nub',
	collapsed_vert_class:     'satg-collapsed-vert',
	collapsed_horiz_class:    'satg-collapsed-horiz',
	collapsed_any_regex:      /satg-collapsed-(horiz|vert)/,
/*
	dd_group_name:            'satg-layout-dd-group',
	drag_target_class:        'satg-layout-dd-target',
	drag_nub_class:           'satg-layout-dragnub',
	module_header_drag_class: 'satg-layout-draggable',
	module_no_drag_class:     'satg-layout-drag-disabled',
	bomb_sight_class:         'satg-layout-bomb-sight satg-layout-bomb-sight-rows',
*/

function normalizeSizes(
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
		if (Dom.hasClass(list[i], not_managed_class))
		{
			sizes.push(unmanaged_size);
		}
		else if (m && m.length)
		{
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
}

Y.extend(PageLayout, Y.Base,
{
	initializer: function()
	{
		// find header, body, footer

		var page_blocks = Y.one('body').getElementsByClassName(
			new Regex('(?:^|\s+)(?:' +
				PageLayout.page_header_marker_class + '|' +
				PageLayout.page_content_marker_class + '|' +
				PageLayout.page_footer_marker_class +
				')(?:\s+|$)'),
			'div');

		var list = page_blocks.filter('.'+page_header_marker_class);
		if (list.size() > 1)
		{
			throw Error('There must be at most one div with class ' + page_header_marker_class);
		}
		this.header_container = (list.isEmpty() ? null : list.item(0));

		list = page_blocks.filter('.'+page_content_marker_class);
		if (list.size() != 1)
		{
			throw Error('There must be exactly one div with class ' + page_content_marker_class);
		}
		this.body_container = list.item(0);

		this.body_horiz_mbp = this.body_container.horizMarginBorderPadding();
		this.body_vert_mbp  = this.body_container.vertMarginBorderPadding();

		var m = this.body_container.className.match(this.mode_regex);
		if (m && m.length)
		{
			this.set('mode', PageLayout[ m[0] ]);
		}

		list = page_blocks.filter('.'+page_footer_marker_class);
		if (list.size() > 1)
		{
			throw Error('There must be at most one div with class ' + page_footer_marker_class);
		}
		this.footer_container = (list.isEmpty() ? null : list.item(0));

		updateFitClass.call(this);
		reparentFooter.call(this);
		this.rescanBody();

		var w = Y.one(Y.config.win);
		w.on('resize', resize, this);
		SDom.textResizeEvent.subscribe(resize, null, this);

		w.on('load', resize, this);		// after images load

		// stay in sync

		this.after('modeChange', function()
		{
			updateFitClass.call(this);

			if (this.body_container)
			{
				this.body_container.scrollTop = 0;
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

		this.after('matchColumnHeightsChange', function()
		{
			resize.call(this);
		});
	},

	/**
	 * Call this after manually adding or removing modules on the page.
	 */
	rescanBody: function()
	{
		the_body_rows.rows        = this.body_container.all('div.' + this.body_row_class);
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
			the_body_rows.col_widths.push(
				normalizeSizes(list, this.col_width_class_re));
		}

		the_body_rows.row_heights =
			normalizeSizes(the_body_rows.rows, this.row_height_class_re);

		resize.call(this);
	},

	/**
	 * @return {Number} the height of the sticky header in pixels
	 */
	getHeaderHeight: function()
	{
		return (this.header_container ? this.header_container.offsetHeight : 0);
	},

	/**
	 * @return {Node} the header container (layout-hd) or null if there is no header
	 */
	getHeaderContainer: function()
	{
		return this.header_container;
	},

	/**
	 * @return {Number} the height of the scrolling body in pixels
	 */
	getBodyHeight: function()
	{
		return this.body_container.offsetHeight;
	},

	/**
	 * @return {Node} the body container (layout-bd)
	 */
	getBodyContainer: function()
	{
		return this.body_container;
	},

	/**
	 * @return {Number} the height of the sticky footer in pixels or zero if the footer is not sticky
	 */
	getFooterHeight: function()
	{
		return (this.get('stickyFooter') && this.footer_container ?
				this.footer_container.offsetHeight : 0);
	},

	/**
	 * @return {Node} the footer container (layout-ft), or null if there is no footer
	 */
	getFooterContainer: function()
	{
		return this.footer_container;
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

		if (this.header_container.contains(el) ||
			this.body_container.contains(el) ||
			this.footer_container.contains(el))
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

				this.resize();
			});

			return true;
		}
		else
		{
			return false;
		}
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
	this.body_container.replaceClass(/(^|\s)FIT_TO_(VIEWPORT|CONTENT)(\s|$)/,
		this.get('mode') == PageLayout.FIT_TO_VIEWPORT ? 'FIT_TO_VIEWPORT' : 'FIT_TO_CONTENT');
};

function reparentFooter()
{
	if (!this.footer_container)
	{
		return;
	}

	if (this.get('mode') == PageLayout.FIT_TO_VIEWPORT || this.get('stickyFooter'))
	{
		this.body_container.get('parentNode').insertBefore(this.footer_container, Dom.getNextSiblingBy(this.body_container, function(node)
		{
			return node.tagName.toLowerCase() != 'script';
		}));
	}
	else
	{
		this.body_container.appendChild(this.footer_container);
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
			this.resize();

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
			this.resize();

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
			this.resize();

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
			this.resize();

			this.fire('afterCollapseModule', children.bd);
		}
	}
};

function checkViewportSize()
{
	if (Dom.getViewportWidth()          != the_body_rows.viewport.w ||
		Dom.getViewportHeight()         != the_body_rows.viewport.h ||
		this.body_container.clientWidth != the_body_rows.viewport.bcw)
	{
		resize.call(this);
	}
	else
	{
		this.fire('afterReflow');
	}
};

function setWidth(
	/* object */	children,
	/* int */		w)
{
	Dom.setStyle(children.root, 'width', w+'px');
};
