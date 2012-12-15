if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-layout-rows/gallery-layout-rows.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-layout-rows/gallery-layout-rows.js",
    code: []
};
_yuitest_coverage["build/gallery-layout-rows/gallery-layout-rows.js"].code=["YUI.add('gallery-layout-rows', function (Y, NAME) {","","\"use strict\";","","var has_no_recalc_auto_bug    = (0 < Y.UA.ie && Y.UA.ie < 8),","	has_explosive_modules_bug = (0 < Y.UA.ie && Y.UA.ie < 8),","	is_borked_dom_access      = (0 < Y.UA.ie && Y.UA.ie < 8);","","/**"," * PageLayout plugin for managing vertically stacked rows on a page,"," * sandwiched vertically between header and footer.  Each row contains one"," * or more modules."," * "," * @module gallery-layout"," * @submodule gallery-layout-rows"," */","","Y.namespace('PageLayoutRows');","","// must be done after defining Y.PageLayoutRows","","Y.PageLayoutRows.collapse_classes =","{","	vert_parent_class:       Y.PageLayout.module_rows_class,","	horiz_parent_class:      Y.PageLayout.module_class,","	collapse_parent_pattern: Y.PageLayout.expand_vert_nub_class","};","","function adjustHeight(","	/* int */		total_height,","	/* object */	children)","{","	var h = total_height;","","	if (is_borked_dom_access)","	{","		var access_dom_so_it_will_be_right_next_time = children.bd.get('offsetHeight');","	}","","	var b = children.root.get('offsetHeight') - children.bd.get('offsetHeight');","","	if (children.hd)","	{","		h -= children.hd.get('offsetHeight');","		b -= children.hd.get('offsetHeight');","	}","	if (children.ft)","	{","		h -= children.ft.get('offsetHeight');","		b -= children.ft.get('offsetHeight');","	}","","	h -= b;","","	h -= children.bd.vertMarginBorderPadding();","","	return Math.max(h, Y.PageLayout.min_module_height);","}","","function getWidth(","	/* int */		body_width,","	/* array */		col_widths,","	/* int */		row_index,","	/* int */		col_index,","	/* object */	module,","	/* object */	module_info)","{","	module_info.mbp = module.horizMarginBorderPadding();","	return Math.max(1, Math.floor(body_width * col_widths[ row_index ][ col_index ] / 100.0) - module_info.mbp);","}","","Y.PageLayoutRows.resize = function(","	/* PageLayout */	host,","	/* enum */			mode,","	/* int */			body_width,","	/* int */			body_height)","{","	var row_count = host.body_info.outers.size();","","	// reset module heights","	// adjust for horizontally collapsed or fixed width modules","","	var col_widths = [],","		row_widths = [];","	for (var i=0; i<row_count; i++)","	{","		var widths = host.body_info.inner_sizes[i].slice(0);","		col_widths.push(widths);","		row_widths.push(body_width);","","		var uncollapsed_count = 0,","			sum               = 0;","","		var modules = host.body_info.modules[i];","		var count   = modules.size();","		for (var j=0; j<count; j++)","		{","			var module = modules.item(j);","			module.setStyle('height', 'auto');","			if (module.hasClass(Y.PageLayout.collapsed_horiz_class))","			{","				if (has_no_recalc_auto_bug)","				{","					module.setStyle('display', 'none');","				}","				module.setStyle('width', 'auto');","				if (has_no_recalc_auto_bug)","				{","					module.setStyle('display', 'block');","				}","				widths[j]      = - module.get('offsetWidth');","				row_widths[i] -= module.totalWidth();","			}","			else if (widths[j] > 0)","			{","				uncollapsed_count++;","				sum += widths[j];","			}","		}","","		if (uncollapsed_count < count)","		{","			for (var j=0; j<count; j++)","			{","				if (widths[j] > 0)","				{","					widths[j] *= (100.0 / sum);","				}","			}","		}","	}","","	// smart fit:  if only one module, fit-to-content until it won't fit inside viewport","","	var module_info = {};","	if (host.single_module)","	{","		var module   = host.body_info.modules[0].item(0);","		var children = host._analyzeModule(module);","		if (children.bd)","		{","			var w  = getWidth(row_widths[0], col_widths, 0, 0, module, module_info);","			var w1 = Math.max(1, w - children.bd.horizMarginBorderPadding());","			host.fire('beforeResizeModule', { bd: children.bd, height: 'auto', width: w1 });","			host._setWidth(children, w);","			children.root.setStyle('height', 'auto');","			children.bd.setStyle('height', 'auto');","		}","","		var h = module.totalHeight();","		mode  = (h > body_height ? Y.PageLayout.FIT_TO_VIEWPORT : Y.PageLayout.FIT_TO_CONTENT);","","		host.body_container.removeClass('FIT_TO_[A-Z_]+');","	}","","	// fit-to-content:  compute height of each row; requires setting module widths","	// fit-to-viewport: adjust for vertically collapsed modules","","	if (mode === Y.PageLayout.FIT_TO_CONTENT)","	{","		var row_heights = [];","		for (var i=0; i<row_count; i++)","		{","			host.body_info.outers.item(i).setStyle('height', 'auto');","","			var modules    = host.body_info.modules[i];","			var h          = 0;","			var total_w    = 0;","			var open_count = modules.size();","			var count      = open_count;","			for (var j=0; j<count; j++)","			{","				var w      = col_widths[i][j];","				var module = modules.item(j);","				if (w < 0)","				{","					var total_w_hacked = false;","					if (w == Y.PageLayout.unmanaged_size && has_explosive_modules_bug)","					{","						var children = host._analyzeModule(module);","						if (children.bd)","						{","							var bd_w = children.bd.totalWidth();","							total_w += bd_w + module.horizMarginBorderPadding();","							total_w_hacked = true;","","							children.root.setStyle('width', bd_w+'px');","						}","					}","","					if (!total_w_hacked)","					{","						total_w += module.totalWidth();","					}","					open_count--;","				}","			}","","			var k = 0;","			for (var j=0; j<count; j++)","			{","				var w      = col_widths[i][j];","				var module = modules.item(j);","				if (w < 0)","				{","					if (w == Y.PageLayout.unmanaged_size)","					{","						var children = host._analyzeModule(module);","						if (children.bd)","						{","							children.root.setStyle('height', 'auto');","							children.bd.setStyle('height', 'auto');","						}","","						h = Math.max(h, module.get('offsetHeight'));","					}","					continue;","				}","				k++;","","				var children = host._analyzeModule(module);","				if (children.bd)","				{","					var w    = getWidth(row_widths[i], col_widths, i, j, module, module_info);","					total_w += w + module_info.mbp;","","					if (k == open_count)","					{","						w += body_width - total_w;","					}","","					var w1 = Math.max(1, w - children.bd.horizMarginBorderPadding());","					host.fire('beforeResizeModule', { bd: children.bd, height: 'auto', width: w1 });","					host._setWidth(children, w);","					children.root.setStyle('height', 'auto');","					children.bd.setStyle('height', 'auto');","				}","","				h = Math.max(h, module.get('offsetHeight'));","			}","","			row_heights.push(h);","		}","	}","	else","	{","		var row_heights = host.body_info.outer_sizes.slice(0);","","		var uncollapsed_count = 0,","			sum               = 0;","		for (var i=0; i<row_count; i++)","		{","			var row       = host.body_info.outers.item(i);","			var collapsed = row.hasClass(Y.PageLayout.collapsed_vert_class);","			if (collapsed || row_heights[i] < 0)","			{","				row_heights[i] = 0;","				if (collapsed)","				{","					row.setStyle('height', 'auto');","				}","","				// We cannot compute the height of row directly","				// because the row above might be wrapping.","","				body_height -= row.one('*').totalHeight();","				body_height -= row.vertMarginBorderPadding();","			}","			else","			{","				uncollapsed_count++;","				sum += row_heights[i];","			}","		}","","		if (uncollapsed_count < row_count)","		{","			for (var i=0; i<row_count; i++)","			{","				row_heights[i] *= (100.0 / sum);","			}","		}","	}","","	// set height of each row and size of each module","","	for (var i=0; i<row_count; i++)","	{","		if (mode === Y.PageLayout.FIT_TO_CONTENT)","		{","			var h = row_heights[i];","		}","		else","		{","			if (row_heights[i] === 0)","			{","				var module   = host.body_info.modules[i].item(0);","				var children = host._analyzeModule(module);","				if (children.bd)","				{","					var h1 = children.bd.insideHeight();","					var w  = getWidth(row_widths[i], col_widths, i, 0, module, module_info);","					var w1 = Math.max(1, w - children.bd.horizMarginBorderPadding());","					host.fire('beforeResizeModule', { bd: children.bd, height: h1, width: w1 });","					host._setWidth(children, w);","					host.fire('afterResizeModule', { bd: children.bd, height: h1, width: w1 });","				}","				continue;","			}","","			var h = Math.max(1, Math.floor(body_height * row_heights[i] / 100.0) - host.body_info.outers.item(i).vertMarginBorderPadding());","		}","		host.body_info.outers.item(i).setStyle('height', h+'px');","","		// adjust for horizontally collapsed or fixed width modules","","		var modules    = host.body_info.modules[i];","		var total_w    = 0;","		var open_count = modules.size();","		var count      = open_count;","		for (var j=0; j<count; j++)","		{","			var w      = col_widths[i][j];","			var module = modules.item(j);","			if (w < 0)","			{","				var total_w_hacked = false;","				if (w == Y.PageLayout.unmanaged_size)","				{","					var children = host._analyzeModule(module);","					if (children.bd)","					{","						var h1 = adjustHeight(h, children);","						var w1 = children.bd.insideWidth();","						host.fire('beforeResizeModule', { bd: children.bd, height: h1, width: w1 });","						children.bd.setStyle('height', h1+'px');","","						if (has_explosive_modules_bug)","						{","							var bd_w = children.bd.totalWidth();","							total_w += bd_w + module.horizMarginBorderPadding();","							total_w_hacked = true;","","							children.root.setStyle('width', bd_w+'px');","						}","","						host.fire('afterResizeModule', { bd: children.bd, height: h1, width: w1 });","					}","				}","				else","				{","					module.setStyle('height', Math.max(1, h - module.vertMarginBorderPadding())+'px');","				}","","				if (!total_w_hacked)","				{","					total_w += module.totalWidth();","				}","				open_count--;","			}","		}","","		// set the size of each module","","		var k = 0;","		for (var j=0; j<count; j++)","		{","			if (col_widths[i][j] < 0)","			{","				continue;","			}","			k++;","","			var module   = modules.item(j);","			var children = host._analyzeModule(module);","			if (children.bd)","			{","				var h1   = adjustHeight(h, children);","				var w    = getWidth(row_widths[i], col_widths, i, j, module, module_info);","				total_w += w + module_info.mbp;","","				if (k == open_count)","				{","					w += body_width - total_w;","				}","","				var w1 = Math.max(1, w - children.bd.horizMarginBorderPadding());","				if (mode === Y.PageLayout.FIT_TO_VIEWPORT)","				{","					host.fire('beforeResizeModule', { bd: children.bd, height: h1, width: w1 });","					host._setWidth(children, w);","				}","","				children.bd.setStyle('height', h1+'px');","","				host.fire('afterResizeModule', { bd: children.bd, height: h1, width: w1 });","			}","		}","	}","};","","","}, '@VERSION@', {\"requires\": [\"gallery-layout\"]});"];
_yuitest_coverage["build/gallery-layout-rows/gallery-layout-rows.js"].lines = {"1":0,"3":0,"5":0,"18":0,"22":0,"29":0,"33":0,"35":0,"37":0,"40":0,"42":0,"44":0,"45":0,"47":0,"49":0,"50":0,"53":0,"55":0,"57":0,"60":0,"68":0,"69":0,"72":0,"78":0,"83":0,"85":0,"87":0,"88":0,"89":0,"91":0,"94":0,"95":0,"96":0,"98":0,"99":0,"100":0,"102":0,"104":0,"106":0,"107":0,"109":0,"111":0,"112":0,"114":0,"116":0,"117":0,"121":0,"123":0,"125":0,"127":0,"135":0,"136":0,"138":0,"139":0,"140":0,"142":0,"143":0,"144":0,"145":0,"146":0,"147":0,"150":0,"151":0,"153":0,"159":0,"161":0,"162":0,"164":0,"166":0,"167":0,"168":0,"169":0,"170":0,"171":0,"173":0,"174":0,"175":0,"177":0,"178":0,"180":0,"181":0,"183":0,"184":0,"185":0,"187":0,"191":0,"193":0,"195":0,"199":0,"200":0,"202":0,"203":0,"204":0,"206":0,"208":0,"209":0,"211":0,"212":0,"215":0,"217":0,"219":0,"221":0,"222":0,"224":0,"225":0,"227":0,"229":0,"232":0,"233":0,"234":0,"235":0,"236":0,"239":0,"242":0,"247":0,"249":0,"251":0,"253":0,"254":0,"255":0,"257":0,"258":0,"260":0,"266":0,"267":0,"271":0,"272":0,"276":0,"278":0,"280":0,"287":0,"289":0,"291":0,"295":0,"297":0,"298":0,"299":0,"301":0,"302":0,"303":0,"304":0,"305":0,"306":0,"308":0,"311":0,"313":0,"317":0,"318":0,"319":0,"320":0,"321":0,"323":0,"324":0,"325":0,"327":0,"328":0,"330":0,"331":0,"333":0,"334":0,"335":0,"336":0,"338":0,"340":0,"341":0,"342":0,"344":0,"347":0,"352":0,"355":0,"357":0,"359":0,"365":0,"366":0,"368":0,"370":0,"372":0,"374":0,"375":0,"376":0,"378":0,"379":0,"380":0,"382":0,"384":0,"387":0,"388":0,"390":0,"391":0,"394":0,"396":0};
_yuitest_coverage["build/gallery-layout-rows/gallery-layout-rows.js"].functions = {"adjustHeight:29":0,"getWidth:60":0,"resize:72":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-layout-rows/gallery-layout-rows.js"].coveredLines = 191;
_yuitest_coverage["build/gallery-layout-rows/gallery-layout-rows.js"].coveredFunctions = 4;
_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 1);
YUI.add('gallery-layout-rows', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-layout-rows/gallery-layout-rows.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 3);
"use strict";

_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 5);
var has_no_recalc_auto_bug    = (0 < Y.UA.ie && Y.UA.ie < 8),
	has_explosive_modules_bug = (0 < Y.UA.ie && Y.UA.ie < 8),
	is_borked_dom_access      = (0 < Y.UA.ie && Y.UA.ie < 8);

/**
 * PageLayout plugin for managing vertically stacked rows on a page,
 * sandwiched vertically between header and footer.  Each row contains one
 * or more modules.
 * 
 * @module gallery-layout
 * @submodule gallery-layout-rows
 */

_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 18);
Y.namespace('PageLayoutRows');

// must be done after defining Y.PageLayoutRows

_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 22);
Y.PageLayoutRows.collapse_classes =
{
	vert_parent_class:       Y.PageLayout.module_rows_class,
	horiz_parent_class:      Y.PageLayout.module_class,
	collapse_parent_pattern: Y.PageLayout.expand_vert_nub_class
};

_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 29);
function adjustHeight(
	/* int */		total_height,
	/* object */	children)
{
	_yuitest_coverfunc("build/gallery-layout-rows/gallery-layout-rows.js", "adjustHeight", 29);
_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 33);
var h = total_height;

	_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 35);
if (is_borked_dom_access)
	{
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 37);
var access_dom_so_it_will_be_right_next_time = children.bd.get('offsetHeight');
	}

	_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 40);
var b = children.root.get('offsetHeight') - children.bd.get('offsetHeight');

	_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 42);
if (children.hd)
	{
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 44);
h -= children.hd.get('offsetHeight');
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 45);
b -= children.hd.get('offsetHeight');
	}
	_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 47);
if (children.ft)
	{
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 49);
h -= children.ft.get('offsetHeight');
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 50);
b -= children.ft.get('offsetHeight');
	}

	_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 53);
h -= b;

	_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 55);
h -= children.bd.vertMarginBorderPadding();

	_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 57);
return Math.max(h, Y.PageLayout.min_module_height);
}

_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 60);
function getWidth(
	/* int */		body_width,
	/* array */		col_widths,
	/* int */		row_index,
	/* int */		col_index,
	/* object */	module,
	/* object */	module_info)
{
	_yuitest_coverfunc("build/gallery-layout-rows/gallery-layout-rows.js", "getWidth", 60);
_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 68);
module_info.mbp = module.horizMarginBorderPadding();
	_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 69);
return Math.max(1, Math.floor(body_width * col_widths[ row_index ][ col_index ] / 100.0) - module_info.mbp);
}

_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 72);
Y.PageLayoutRows.resize = function(
	/* PageLayout */	host,
	/* enum */			mode,
	/* int */			body_width,
	/* int */			body_height)
{
	_yuitest_coverfunc("build/gallery-layout-rows/gallery-layout-rows.js", "resize", 72);
_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 78);
var row_count = host.body_info.outers.size();

	// reset module heights
	// adjust for horizontally collapsed or fixed width modules

	_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 83);
var col_widths = [],
		row_widths = [];
	_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 85);
for (var i=0; i<row_count; i++)
	{
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 87);
var widths = host.body_info.inner_sizes[i].slice(0);
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 88);
col_widths.push(widths);
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 89);
row_widths.push(body_width);

		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 91);
var uncollapsed_count = 0,
			sum               = 0;

		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 94);
var modules = host.body_info.modules[i];
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 95);
var count   = modules.size();
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 96);
for (var j=0; j<count; j++)
		{
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 98);
var module = modules.item(j);
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 99);
module.setStyle('height', 'auto');
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 100);
if (module.hasClass(Y.PageLayout.collapsed_horiz_class))
			{
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 102);
if (has_no_recalc_auto_bug)
				{
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 104);
module.setStyle('display', 'none');
				}
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 106);
module.setStyle('width', 'auto');
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 107);
if (has_no_recalc_auto_bug)
				{
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 109);
module.setStyle('display', 'block');
				}
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 111);
widths[j]      = - module.get('offsetWidth');
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 112);
row_widths[i] -= module.totalWidth();
			}
			else {_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 114);
if (widths[j] > 0)
			{
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 116);
uncollapsed_count++;
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 117);
sum += widths[j];
			}}
		}

		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 121);
if (uncollapsed_count < count)
		{
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 123);
for (var j=0; j<count; j++)
			{
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 125);
if (widths[j] > 0)
				{
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 127);
widths[j] *= (100.0 / sum);
				}
			}
		}
	}

	// smart fit:  if only one module, fit-to-content until it won't fit inside viewport

	_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 135);
var module_info = {};
	_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 136);
if (host.single_module)
	{
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 138);
var module   = host.body_info.modules[0].item(0);
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 139);
var children = host._analyzeModule(module);
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 140);
if (children.bd)
		{
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 142);
var w  = getWidth(row_widths[0], col_widths, 0, 0, module, module_info);
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 143);
var w1 = Math.max(1, w - children.bd.horizMarginBorderPadding());
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 144);
host.fire('beforeResizeModule', { bd: children.bd, height: 'auto', width: w1 });
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 145);
host._setWidth(children, w);
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 146);
children.root.setStyle('height', 'auto');
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 147);
children.bd.setStyle('height', 'auto');
		}

		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 150);
var h = module.totalHeight();
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 151);
mode  = (h > body_height ? Y.PageLayout.FIT_TO_VIEWPORT : Y.PageLayout.FIT_TO_CONTENT);

		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 153);
host.body_container.removeClass('FIT_TO_[A-Z_]+');
	}

	// fit-to-content:  compute height of each row; requires setting module widths
	// fit-to-viewport: adjust for vertically collapsed modules

	_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 159);
if (mode === Y.PageLayout.FIT_TO_CONTENT)
	{
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 161);
var row_heights = [];
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 162);
for (var i=0; i<row_count; i++)
		{
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 164);
host.body_info.outers.item(i).setStyle('height', 'auto');

			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 166);
var modules    = host.body_info.modules[i];
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 167);
var h          = 0;
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 168);
var total_w    = 0;
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 169);
var open_count = modules.size();
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 170);
var count      = open_count;
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 171);
for (var j=0; j<count; j++)
			{
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 173);
var w      = col_widths[i][j];
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 174);
var module = modules.item(j);
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 175);
if (w < 0)
				{
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 177);
var total_w_hacked = false;
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 178);
if (w == Y.PageLayout.unmanaged_size && has_explosive_modules_bug)
					{
						_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 180);
var children = host._analyzeModule(module);
						_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 181);
if (children.bd)
						{
							_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 183);
var bd_w = children.bd.totalWidth();
							_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 184);
total_w += bd_w + module.horizMarginBorderPadding();
							_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 185);
total_w_hacked = true;

							_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 187);
children.root.setStyle('width', bd_w+'px');
						}
					}

					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 191);
if (!total_w_hacked)
					{
						_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 193);
total_w += module.totalWidth();
					}
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 195);
open_count--;
				}
			}

			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 199);
var k = 0;
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 200);
for (var j=0; j<count; j++)
			{
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 202);
var w      = col_widths[i][j];
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 203);
var module = modules.item(j);
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 204);
if (w < 0)
				{
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 206);
if (w == Y.PageLayout.unmanaged_size)
					{
						_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 208);
var children = host._analyzeModule(module);
						_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 209);
if (children.bd)
						{
							_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 211);
children.root.setStyle('height', 'auto');
							_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 212);
children.bd.setStyle('height', 'auto');
						}

						_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 215);
h = Math.max(h, module.get('offsetHeight'));
					}
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 217);
continue;
				}
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 219);
k++;

				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 221);
var children = host._analyzeModule(module);
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 222);
if (children.bd)
				{
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 224);
var w    = getWidth(row_widths[i], col_widths, i, j, module, module_info);
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 225);
total_w += w + module_info.mbp;

					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 227);
if (k == open_count)
					{
						_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 229);
w += body_width - total_w;
					}

					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 232);
var w1 = Math.max(1, w - children.bd.horizMarginBorderPadding());
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 233);
host.fire('beforeResizeModule', { bd: children.bd, height: 'auto', width: w1 });
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 234);
host._setWidth(children, w);
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 235);
children.root.setStyle('height', 'auto');
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 236);
children.bd.setStyle('height', 'auto');
				}

				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 239);
h = Math.max(h, module.get('offsetHeight'));
			}

			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 242);
row_heights.push(h);
		}
	}
	else
	{
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 247);
var row_heights = host.body_info.outer_sizes.slice(0);

		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 249);
var uncollapsed_count = 0,
			sum               = 0;
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 251);
for (var i=0; i<row_count; i++)
		{
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 253);
var row       = host.body_info.outers.item(i);
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 254);
var collapsed = row.hasClass(Y.PageLayout.collapsed_vert_class);
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 255);
if (collapsed || row_heights[i] < 0)
			{
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 257);
row_heights[i] = 0;
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 258);
if (collapsed)
				{
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 260);
row.setStyle('height', 'auto');
				}

				// We cannot compute the height of row directly
				// because the row above might be wrapping.

				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 266);
body_height -= row.one('*').totalHeight();
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 267);
body_height -= row.vertMarginBorderPadding();
			}
			else
			{
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 271);
uncollapsed_count++;
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 272);
sum += row_heights[i];
			}
		}

		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 276);
if (uncollapsed_count < row_count)
		{
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 278);
for (var i=0; i<row_count; i++)
			{
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 280);
row_heights[i] *= (100.0 / sum);
			}
		}
	}

	// set height of each row and size of each module

	_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 287);
for (var i=0; i<row_count; i++)
	{
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 289);
if (mode === Y.PageLayout.FIT_TO_CONTENT)
		{
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 291);
var h = row_heights[i];
		}
		else
		{
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 295);
if (row_heights[i] === 0)
			{
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 297);
var module   = host.body_info.modules[i].item(0);
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 298);
var children = host._analyzeModule(module);
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 299);
if (children.bd)
				{
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 301);
var h1 = children.bd.insideHeight();
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 302);
var w  = getWidth(row_widths[i], col_widths, i, 0, module, module_info);
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 303);
var w1 = Math.max(1, w - children.bd.horizMarginBorderPadding());
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 304);
host.fire('beforeResizeModule', { bd: children.bd, height: h1, width: w1 });
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 305);
host._setWidth(children, w);
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 306);
host.fire('afterResizeModule', { bd: children.bd, height: h1, width: w1 });
				}
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 308);
continue;
			}

			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 311);
var h = Math.max(1, Math.floor(body_height * row_heights[i] / 100.0) - host.body_info.outers.item(i).vertMarginBorderPadding());
		}
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 313);
host.body_info.outers.item(i).setStyle('height', h+'px');

		// adjust for horizontally collapsed or fixed width modules

		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 317);
var modules    = host.body_info.modules[i];
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 318);
var total_w    = 0;
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 319);
var open_count = modules.size();
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 320);
var count      = open_count;
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 321);
for (var j=0; j<count; j++)
		{
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 323);
var w      = col_widths[i][j];
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 324);
var module = modules.item(j);
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 325);
if (w < 0)
			{
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 327);
var total_w_hacked = false;
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 328);
if (w == Y.PageLayout.unmanaged_size)
				{
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 330);
var children = host._analyzeModule(module);
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 331);
if (children.bd)
					{
						_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 333);
var h1 = adjustHeight(h, children);
						_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 334);
var w1 = children.bd.insideWidth();
						_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 335);
host.fire('beforeResizeModule', { bd: children.bd, height: h1, width: w1 });
						_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 336);
children.bd.setStyle('height', h1+'px');

						_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 338);
if (has_explosive_modules_bug)
						{
							_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 340);
var bd_w = children.bd.totalWidth();
							_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 341);
total_w += bd_w + module.horizMarginBorderPadding();
							_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 342);
total_w_hacked = true;

							_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 344);
children.root.setStyle('width', bd_w+'px');
						}

						_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 347);
host.fire('afterResizeModule', { bd: children.bd, height: h1, width: w1 });
					}
				}
				else
				{
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 352);
module.setStyle('height', Math.max(1, h - module.vertMarginBorderPadding())+'px');
				}

				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 355);
if (!total_w_hacked)
				{
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 357);
total_w += module.totalWidth();
				}
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 359);
open_count--;
			}
		}

		// set the size of each module

		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 365);
var k = 0;
		_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 366);
for (var j=0; j<count; j++)
		{
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 368);
if (col_widths[i][j] < 0)
			{
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 370);
continue;
			}
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 372);
k++;

			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 374);
var module   = modules.item(j);
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 375);
var children = host._analyzeModule(module);
			_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 376);
if (children.bd)
			{
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 378);
var h1   = adjustHeight(h, children);
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 379);
var w    = getWidth(row_widths[i], col_widths, i, j, module, module_info);
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 380);
total_w += w + module_info.mbp;

				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 382);
if (k == open_count)
				{
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 384);
w += body_width - total_w;
				}

				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 387);
var w1 = Math.max(1, w - children.bd.horizMarginBorderPadding());
				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 388);
if (mode === Y.PageLayout.FIT_TO_VIEWPORT)
				{
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 390);
host.fire('beforeResizeModule', { bd: children.bd, height: h1, width: w1 });
					_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 391);
host._setWidth(children, w);
				}

				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 394);
children.bd.setStyle('height', h1+'px');

				_yuitest_coverline("build/gallery-layout-rows/gallery-layout-rows.js", 396);
host.fire('afterResizeModule', { bd: children.bd, height: h1, width: w1 });
			}
		}
	}
};


}, '@VERSION@', {"requires": ["gallery-layout"]});
