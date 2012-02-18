"use strict";

var Dom = YAHOO.util.Dom,
	SDom = YAHOO.SATG.Dom,
	Event = YAHOO.util.Event,
	CustomEvent = YAHOO.util.CustomEvent;

var has_explosive_modules_bug = (0 < YAHOO.env.ua.ie && YAHOO.env.ua.ie < 8);

/*
 * Manages horizontally stacked columns on a page, sandwiched vertically
 * between header and footer.  Each row contains one or more modules.
 *
 * @class PageLayoutCols
 * @extends Base
 * @constructor
 * @param config {Object}
 */

YAHOO.SATG.PageLayoutCols = function()
{
};

PageLayoutCols.prototype =
{
	body_col_class: 'satg-module-col',

	/*
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

	/*
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
		(viewport.w === the_body_cols.viewport.w &&
		 viewport.h === the_body_cols.viewport.h))
	{
		return;
	}

	the_body_cols.viewport = viewport;

	SDom.hideFloaters();	// after confirming that viewport really has changed

	var min_width = the_min_page_width * SDom.getEmToPx();

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
};

function _adjustHeight(
	/* int */		total_height,
	/* object */	children)
{
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
