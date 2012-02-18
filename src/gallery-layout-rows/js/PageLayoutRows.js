"use strict";

var Dom = YAHOO.util.Dom,
	SDom = YAHOO.SATG.Dom,
	Event = YAHOO.util.Event,
	CustomEvent = YAHOO.util.CustomEvent;

var has_no_recalc_auto_bug    = (0 < YAHOO.env.ua.ie && YAHOO.env.ua.ie < 8),
	has_explosive_modules_bug = (0 < YAHOO.env.ua.ie && YAHOO.env.ua.ie < 8),
	is_borked_dom_access      = (0 < YAHOO.env.ua.ie && YAHOO.env.ua.ie < 8);

/**
 * Manages vertically stacked rows on a page, sandwiched vertically between
 * header and footer.  Each row contains one or more modules.
 *
 * @class PageLayoutRows
 * @extends Base
 * @constructor
 * @param config {Object}
 */

function PageLayoutRows()
{
	PageLayoutRows.superclass.constructor.apply(this, arguments);
}

PageLayoutRows.NAME = "pagelayoutrows";

PageLayoutRows.ATTRS =
{
};

PageLayoutRows.prototype =
{
	body_row_class:      'satg-module-row',

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
				if (has_no_recalc_auto_bug)
				{
					Dom.setStyle(module, 'display', 'none');
				}
				Dom.setStyle(module, 'width', 'auto');
				if (has_no_recalc_auto_bug)
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
					if (w == PageLayout.unmanaged_size && has_explosive_modules_bug)
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
					if (w == PageLayout.unmanaged_size)
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
				if (w == PageLayout.unmanaged_size)
				{
					var children = this._analyzeModule(modules[j]);
					if (children.bd)
					{
						var h1 = _adjustHeight.call(this, h, children);
						var w1 = SDom.insideWidth(children.bd);
						this.fire('beforeResizeModule', children.bd, h1, w1);
						Dom.setStyle(children.bd, 'height', h1+'px');

						if (has_explosive_modules_bug)
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

function _adjustHeight(
	/* int */		total_height,
	/* object */	children)
{
	var h = total_height;

	if (is_borked_dom_access)
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

	return Math.max(h, PageLayout.min_module_height);
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
