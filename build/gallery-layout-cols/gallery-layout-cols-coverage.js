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
_yuitest_coverage["build/gallery-layout-cols/gallery-layout-cols.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-layout-cols/gallery-layout-cols.js",
    code: []
};
_yuitest_coverage["build/gallery-layout-cols/gallery-layout-cols.js"].code=["YUI.add('gallery-layout-cols', function (Y, NAME) {","","\"use strict\";","","var has_explosive_modules_bug = (0 < Y.UA.ie && Y.UA.ie < 8);","","/**"," * PageLayout plugin for managing horizontally stacked columns on a page,"," * sandwiched vertically between header and footer.  Each column contains"," * one or more modules."," * "," * @module gallery-layout"," * @submodule gallery-layout-cols"," */","","Y.namespace('PageLayoutCols');","","// must be done after defining Y.PageLayoutCols","","Y.PageLayoutCols.collapse_classes =","{","	vert_parent_class:       Y.PageLayout.module_class,","	horiz_parent_class:      Y.PageLayout.module_cols_class,","	collapse_parent_pattern: '(' + Y.PageLayout.expand_left_nub_class + '|' + Y.PageLayout.expand_right_nub_class + ')'","};","","function adjustHeight(","	/* int */		total_height,","	/* object */	children)","{","	var h = total_height;","","	if (children.hd)","	{","		h -= children.hd.get('offsetHeight');","	}","	if (children.ft)","	{","		h -= children.ft.get('offsetHeight');","	}","","	h -= children.bd.vertMarginBorderPadding();","","	return Math.max(h, Y.PageLayout.min_module_height);","}","","function getHeight(","	/* int */		body_height,","	/* array */		row_heights,","	/* int */		col_index,","	/* int */		row_index,","	/* object */	module,","	/* object */	module_info)","{","	module_info.mbp = module.vertMarginBorderPadding();","	return Math.max(1, Math.floor(body_height * row_heights[ col_index ][ row_index ] / 100.0) - module_info.mbp);","}","","Y.PageLayoutCols.resize = function(","	/* PageLayout */	host,","	/* enum */			mode,","	/* int */			body_width,","	/* int */			body_height)","{","	var match_heights = host.get('matchColumnHeights');","	var col_count     = host.body_info.outers.size();","","	// fit-to-viewport: adjust for vertically collapsed modules","","	if (mode === Y.PageLayout.FIT_TO_VIEWPORT)","	{","		var row_heights = [],","			col_heights = [];","		for (var i=0; i<col_count; i++)","		{","			var heights = host.body_info.inner_sizes[i].slice(0);","			row_heights.push(heights);","			col_heights.push(body_height);","","			var uncollapsed_count = 0,","				sum               = 0;","","			var modules = host.body_info.modules[i];","			var count   = modules.size();","			for (var j=0; j<count; j++)","			{","				var module = modules.item(j);","				if (module.hasClass(Y.PageLayout.collapsed_vert_class))","				{","					module.setStyle('height', 'auto');","					heights[j]      = - module.get('offsetHeight');","					col_heights[i] -= module.totalHeight();","				}","				else if (heights[j] > 0)","				{","					uncollapsed_count++;","					sum += heights[j];","				}","			}","","			if (uncollapsed_count < count)","			{","				for (var j=0; j<count; j++)","				{","					if (heights[j] > 0)","					{","						heights[j] *= (100.0 / sum);","					}","				}","			}","		}","	}","","	// adjust for horizontally collapsed or fixed width modules","","	var module_info = {};","	var col_widths  = host.body_info.outer_sizes.slice(0);","","	var uncollapsed_count = 0,","		sum               = 0;","	for (var i=0; i<col_count; i++)","	{","		var col       = host.body_info.outers.item(i);","		var collapsed = col.hasClass(Y.PageLayout.collapsed_horiz_class);","		var modules   = host.body_info.modules[i];","		if (collapsed || col_widths[i] < 0)","		{","			col_widths[i] = 0;","			if (collapsed)","			{","				col.setStyle('width', 'auto');","				modules.item(0).setStyle('width', 'auto');","			}","			else if (has_explosive_modules_bug)","			{","				var children = host._analyzeModule(modules.item(0));","				if (children.bd)","				{","					var root_w = children.bd.totalWidth() + modules.item(j).horizMarginBorderPadding();","					children.root.setStyle('width', root_w+'px');","					col.setStyle('width', root_w+'px');","				}","			}","","			body_width -= col.totalWidth();","		}","		else","		{","			uncollapsed_count++;","			sum += col_widths[i];","","			if (modules.size() == 1)","			{","				modules.item(0).setStyle('height', 'auto');","			}","		}","	}","","	if (uncollapsed_count < col_count)","	{","		for (var i=0; i<col_count; i++)","		{","			col_widths[i] *= (100.0 / sum);","		}","	}","","	// set width of each column and size of each module","","	var total_w  = 0,","		m        = 0,","		ftc_size = [];","	for (var i=0; i<col_count; i++)","	{","		if (col_widths[i] == 0)","		{","			var module   = host.body_info.modules[i].item(0);","			var children = host._analyzeModule(module);","			if (mode === Y.PageLayout.FIT_TO_VIEWPORT)","			{","				var h = getHeight(col_heights[i], row_heights, i, 0, module, module_info);","				module.setStyle('height', h+'px');","","				if (children.bd)","				{","					var h1 = adjustHeight(h, children);","					var w1 = children.bd.insideWidth();","					host.fire('beforeResizeModule', { bd: children.bd, height: h1, width: w1 });","					children.bd.setStyle('height', h1+'px');","					host.fire('afterResizeModule', { bd: children.bd, height: h1, width: w1 });","				}","			}","			else if (children.bd)","			{","				host.fire('beforeResizeModule', { bd: children.bd, height: 'auto', width: 'auto' });","","				children.root.setStyle('height', 'auto');","				children.bd.setStyle('height', 'auto');","","				if (match_heights)","				{","					ftc_size.push([ [children.bd, children.bd.insideWidth()] ]);","				}","				else","				{","					host.fire('afterResizeModule',","					{","						bd:     children.bd,","						height: children.bd.insideHeight(),","						width:  children.bd.insideWidth()","					});","				}","			}","			continue;","		}","		m++;","","		var w    = Math.max(1, Math.floor(body_width * col_widths[i] / 100.0));","		total_w += w;","		if (m == uncollapsed_count)","		{","			w += body_width - total_w;","		}","","		w = Math.max(1, w - host.body_info.outers.item(i).horizMarginBorderPadding());","		host.body_info.outers.item(i).setStyle('width', w+'px');","		w = Math.max(1, w - host.body_info.modules[0].item(0).horizMarginBorderPadding());","","		var modules = host.body_info.modules[i];","		if (mode === Y.PageLayout.FIT_TO_VIEWPORT)","		{","			// adjust for vertically collapsed or fixed height modules","","			var total_h    = 0;","			var open_count = modules.size();","			var count      = open_count;","			for (var j=0; j<count; j++)","			{","				var h = row_heights[i][j];","				if (h < 0)","				{","					total_h += modules.item(j).totalHeight();","					open_count--;","				}","			}","","			// set the height of each module","","			var k = 0;","			for (var j=0; j<count; j++)","			{","				var module   = modules.item(j);","				var children = host._analyzeModule(module);","				if (row_heights[i][j] < 0)","				{","					var h1 = children.bd.insideHeight();","					var w1 = w - children.root.horizMarginBorderPadding() -","							 children.bd.horizMarginBorderPadding();","					host.fire('beforeResizeModule', { bd: children.bd, height: h1, width: w1 });","					module.setStyle('width', w+'px');","					host.fire('afterResizeModule', { bd: children.bd, height: h1, width: w1 });","					continue;","				}","				k++;","","				if (children.bd)","				{","					var h    = getHeight(col_heights[i], row_heights, i, j, module, module_info);","					var h1   = adjustHeight(h, children);","					total_h += h + module_info.mbp;","","					if (k == open_count)","					{","						h1 += body_height - total_h;","					}","","					var w1 = Math.max(1, w - children.bd.horizMarginBorderPadding());","					host.fire('beforeResizeModule', { bd: children.bd, height: h1, width: w1 });","					host._setWidth(children, w);","					children.bd.setStyle('height', h1+'px');","					host.fire('afterResizeModule', { bd: children.bd, height: h1, width: w1 });","				}","			}","		}","		else","		{","			// set the width of each module","			// clear the height of each module","","			ftc_size.push([]);","			var count = modules.size();","			for (var j=0; j<count; j++)","			{","				var children = host._analyzeModule(modules.item(j));","				if (children.bd)","				{","					var w1 = Math.max(1, w - children.bd.horizMarginBorderPadding());","					host.fire('beforeResizeModule', { bd: children.bd, height: 'auto', width: w1 });","					host._setWidth(children, w);","					children.root.setStyle('height', 'auto');","					children.bd.setStyle('height', 'auto');","","					if (match_heights)","					{","						ftc_size[i].push([children.bd, w1]);","					}","					else","					{","						host.fire('afterResizeModule',","						{","							bd:     children.bd,","							height: children.bd.insideHeight(),","							width:  w1","						});","					}","				}","			}","		}","	}","","	// set the height of the last module in each column","","	if (mode === Y.PageLayout.FIT_TO_CONTENT && match_heights)","	{","		var h = 0;","		for (var i=0; i<col_count; i++)","		{","			h = Math.max(h, host.body_info.outers.item(i).get('offsetHeight'));","		}","","		for (var i=0; i<col_count; i++)","		{","			var modules = host.body_info.modules[i],","				count   = modules.size(),","				module  = null,","				w1      = 0;","			for (var j=count-1; j>=0; j--)","			{","				var module1 = modules.item(j);","				if (count == 1 ||","					(!module &&","					 !module1.hasClass(Y.PageLayout.collapsed_vert_class) &&","					 host.body_info.inner_sizes[i][j] > 0))","				{","					module = module1;","					w1     = ftc_size[i][j][1];","				}","				else","				{","					var bd = ftc_size[i][j][0];","					host.fire('afterResizeModule',","					{","						bd:     bd,","						height: bd.insideHeight(),","						width:  ftc_size[i][j][1]","					});","				}","			}","","			if (module)","			{","				var delta = h - host.body_info.outers.item(i).get('offsetHeight');","				if (delta > 0 && module.get('parentNode').hasClass(Y.PageLayout.collapsed_horiz_class))","				{","					module.setStyle('height', (module.insideHeight() + delta)+'px');","				}","				else	// always fire afterResizeModule","				{","					var children = host._analyzeModule(module);","					if (children.bd)","					{","						var h1 = children.bd.insideHeight() + delta;","						module.setStyle('height', 'auto');","						children.bd.setStyle('height', h1+'px');","						host.fire('afterResizeModule', { bd: children.bd, height: h1, width: w1 });","					}","				}","			}","		}","	}","};","","","}, '@VERSION@', {\"requires\": [\"gallery-layout\"]});"];
_yuitest_coverage["build/gallery-layout-cols/gallery-layout-cols.js"].lines = {"1":0,"3":0,"5":0,"16":0,"20":0,"27":0,"31":0,"33":0,"35":0,"37":0,"39":0,"42":0,"44":0,"47":0,"55":0,"56":0,"59":0,"65":0,"66":0,"70":0,"72":0,"74":0,"76":0,"77":0,"78":0,"80":0,"83":0,"84":0,"85":0,"87":0,"88":0,"90":0,"91":0,"92":0,"94":0,"96":0,"97":0,"101":0,"103":0,"105":0,"107":0,"116":0,"117":0,"119":0,"121":0,"123":0,"124":0,"125":0,"126":0,"128":0,"129":0,"131":0,"132":0,"134":0,"136":0,"137":0,"139":0,"140":0,"141":0,"145":0,"149":0,"150":0,"152":0,"154":0,"159":0,"161":0,"163":0,"169":0,"172":0,"174":0,"176":0,"177":0,"178":0,"180":0,"181":0,"183":0,"185":0,"186":0,"187":0,"188":0,"189":0,"192":0,"194":0,"196":0,"197":0,"199":0,"201":0,"205":0,"213":0,"215":0,"217":0,"218":0,"219":0,"221":0,"224":0,"225":0,"226":0,"228":0,"229":0,"233":0,"234":0,"235":0,"236":0,"238":0,"239":0,"241":0,"242":0,"248":0,"249":0,"251":0,"252":0,"253":0,"255":0,"256":0,"258":0,"259":0,"260":0,"261":0,"263":0,"265":0,"267":0,"268":0,"269":0,"271":0,"273":0,"276":0,"277":0,"278":0,"279":0,"280":0,"289":0,"290":0,"291":0,"293":0,"294":0,"296":0,"297":0,"298":0,"299":0,"300":0,"302":0,"304":0,"308":0,"322":0,"324":0,"325":0,"327":0,"330":0,"332":0,"336":0,"338":0,"339":0,"344":0,"345":0,"349":0,"350":0,"359":0,"361":0,"362":0,"364":0,"368":0,"369":0,"371":0,"372":0,"373":0,"374":0};
_yuitest_coverage["build/gallery-layout-cols/gallery-layout-cols.js"].functions = {"adjustHeight:27":0,"getHeight:47":0,"resize:59":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-layout-cols/gallery-layout-cols.js"].coveredLines = 166;
_yuitest_coverage["build/gallery-layout-cols/gallery-layout-cols.js"].coveredFunctions = 4;
_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 1);
YUI.add('gallery-layout-cols', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-layout-cols/gallery-layout-cols.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 3);
"use strict";

_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 5);
var has_explosive_modules_bug = (0 < Y.UA.ie && Y.UA.ie < 8);

/**
 * PageLayout plugin for managing horizontally stacked columns on a page,
 * sandwiched vertically between header and footer.  Each column contains
 * one or more modules.
 * 
 * @module gallery-layout
 * @submodule gallery-layout-cols
 */

_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 16);
Y.namespace('PageLayoutCols');

// must be done after defining Y.PageLayoutCols

_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 20);
Y.PageLayoutCols.collapse_classes =
{
	vert_parent_class:       Y.PageLayout.module_class,
	horiz_parent_class:      Y.PageLayout.module_cols_class,
	collapse_parent_pattern: '(' + Y.PageLayout.expand_left_nub_class + '|' + Y.PageLayout.expand_right_nub_class + ')'
};

_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 27);
function adjustHeight(
	/* int */		total_height,
	/* object */	children)
{
	_yuitest_coverfunc("build/gallery-layout-cols/gallery-layout-cols.js", "adjustHeight", 27);
_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 31);
var h = total_height;

	_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 33);
if (children.hd)
	{
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 35);
h -= children.hd.get('offsetHeight');
	}
	_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 37);
if (children.ft)
	{
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 39);
h -= children.ft.get('offsetHeight');
	}

	_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 42);
h -= children.bd.vertMarginBorderPadding();

	_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 44);
return Math.max(h, Y.PageLayout.min_module_height);
}

_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 47);
function getHeight(
	/* int */		body_height,
	/* array */		row_heights,
	/* int */		col_index,
	/* int */		row_index,
	/* object */	module,
	/* object */	module_info)
{
	_yuitest_coverfunc("build/gallery-layout-cols/gallery-layout-cols.js", "getHeight", 47);
_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 55);
module_info.mbp = module.vertMarginBorderPadding();
	_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 56);
return Math.max(1, Math.floor(body_height * row_heights[ col_index ][ row_index ] / 100.0) - module_info.mbp);
}

_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 59);
Y.PageLayoutCols.resize = function(
	/* PageLayout */	host,
	/* enum */			mode,
	/* int */			body_width,
	/* int */			body_height)
{
	_yuitest_coverfunc("build/gallery-layout-cols/gallery-layout-cols.js", "resize", 59);
_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 65);
var match_heights = host.get('matchColumnHeights');
	_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 66);
var col_count     = host.body_info.outers.size();

	// fit-to-viewport: adjust for vertically collapsed modules

	_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 70);
if (mode === Y.PageLayout.FIT_TO_VIEWPORT)
	{
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 72);
var row_heights = [],
			col_heights = [];
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 74);
for (var i=0; i<col_count; i++)
		{
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 76);
var heights = host.body_info.inner_sizes[i].slice(0);
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 77);
row_heights.push(heights);
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 78);
col_heights.push(body_height);

			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 80);
var uncollapsed_count = 0,
				sum               = 0;

			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 83);
var modules = host.body_info.modules[i];
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 84);
var count   = modules.size();
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 85);
for (var j=0; j<count; j++)
			{
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 87);
var module = modules.item(j);
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 88);
if (module.hasClass(Y.PageLayout.collapsed_vert_class))
				{
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 90);
module.setStyle('height', 'auto');
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 91);
heights[j]      = - module.get('offsetHeight');
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 92);
col_heights[i] -= module.totalHeight();
				}
				else {_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 94);
if (heights[j] > 0)
				{
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 96);
uncollapsed_count++;
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 97);
sum += heights[j];
				}}
			}

			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 101);
if (uncollapsed_count < count)
			{
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 103);
for (var j=0; j<count; j++)
				{
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 105);
if (heights[j] > 0)
					{
						_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 107);
heights[j] *= (100.0 / sum);
					}
				}
			}
		}
	}

	// adjust for horizontally collapsed or fixed width modules

	_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 116);
var module_info = {};
	_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 117);
var col_widths  = host.body_info.outer_sizes.slice(0);

	_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 119);
var uncollapsed_count = 0,
		sum               = 0;
	_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 121);
for (var i=0; i<col_count; i++)
	{
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 123);
var col       = host.body_info.outers.item(i);
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 124);
var collapsed = col.hasClass(Y.PageLayout.collapsed_horiz_class);
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 125);
var modules   = host.body_info.modules[i];
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 126);
if (collapsed || col_widths[i] < 0)
		{
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 128);
col_widths[i] = 0;
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 129);
if (collapsed)
			{
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 131);
col.setStyle('width', 'auto');
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 132);
modules.item(0).setStyle('width', 'auto');
			}
			else {_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 134);
if (has_explosive_modules_bug)
			{
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 136);
var children = host._analyzeModule(modules.item(0));
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 137);
if (children.bd)
				{
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 139);
var root_w = children.bd.totalWidth() + modules.item(j).horizMarginBorderPadding();
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 140);
children.root.setStyle('width', root_w+'px');
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 141);
col.setStyle('width', root_w+'px');
				}
			}}

			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 145);
body_width -= col.totalWidth();
		}
		else
		{
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 149);
uncollapsed_count++;
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 150);
sum += col_widths[i];

			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 152);
if (modules.size() == 1)
			{
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 154);
modules.item(0).setStyle('height', 'auto');
			}
		}
	}

	_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 159);
if (uncollapsed_count < col_count)
	{
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 161);
for (var i=0; i<col_count; i++)
		{
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 163);
col_widths[i] *= (100.0 / sum);
		}
	}

	// set width of each column and size of each module

	_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 169);
var total_w  = 0,
		m        = 0,
		ftc_size = [];
	_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 172);
for (var i=0; i<col_count; i++)
	{
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 174);
if (col_widths[i] == 0)
		{
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 176);
var module   = host.body_info.modules[i].item(0);
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 177);
var children = host._analyzeModule(module);
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 178);
if (mode === Y.PageLayout.FIT_TO_VIEWPORT)
			{
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 180);
var h = getHeight(col_heights[i], row_heights, i, 0, module, module_info);
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 181);
module.setStyle('height', h+'px');

				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 183);
if (children.bd)
				{
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 185);
var h1 = adjustHeight(h, children);
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 186);
var w1 = children.bd.insideWidth();
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 187);
host.fire('beforeResizeModule', { bd: children.bd, height: h1, width: w1 });
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 188);
children.bd.setStyle('height', h1+'px');
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 189);
host.fire('afterResizeModule', { bd: children.bd, height: h1, width: w1 });
				}
			}
			else {_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 192);
if (children.bd)
			{
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 194);
host.fire('beforeResizeModule', { bd: children.bd, height: 'auto', width: 'auto' });

				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 196);
children.root.setStyle('height', 'auto');
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 197);
children.bd.setStyle('height', 'auto');

				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 199);
if (match_heights)
				{
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 201);
ftc_size.push([ [children.bd, children.bd.insideWidth()] ]);
				}
				else
				{
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 205);
host.fire('afterResizeModule',
					{
						bd:     children.bd,
						height: children.bd.insideHeight(),
						width:  children.bd.insideWidth()
					});
				}
			}}
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 213);
continue;
		}
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 215);
m++;

		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 217);
var w    = Math.max(1, Math.floor(body_width * col_widths[i] / 100.0));
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 218);
total_w += w;
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 219);
if (m == uncollapsed_count)
		{
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 221);
w += body_width - total_w;
		}

		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 224);
w = Math.max(1, w - host.body_info.outers.item(i).horizMarginBorderPadding());
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 225);
host.body_info.outers.item(i).setStyle('width', w+'px');
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 226);
w = Math.max(1, w - host.body_info.modules[0].item(0).horizMarginBorderPadding());

		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 228);
var modules = host.body_info.modules[i];
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 229);
if (mode === Y.PageLayout.FIT_TO_VIEWPORT)
		{
			// adjust for vertically collapsed or fixed height modules

			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 233);
var total_h    = 0;
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 234);
var open_count = modules.size();
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 235);
var count      = open_count;
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 236);
for (var j=0; j<count; j++)
			{
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 238);
var h = row_heights[i][j];
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 239);
if (h < 0)
				{
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 241);
total_h += modules.item(j).totalHeight();
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 242);
open_count--;
				}
			}

			// set the height of each module

			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 248);
var k = 0;
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 249);
for (var j=0; j<count; j++)
			{
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 251);
var module   = modules.item(j);
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 252);
var children = host._analyzeModule(module);
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 253);
if (row_heights[i][j] < 0)
				{
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 255);
var h1 = children.bd.insideHeight();
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 256);
var w1 = w - children.root.horizMarginBorderPadding() -
							 children.bd.horizMarginBorderPadding();
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 258);
host.fire('beforeResizeModule', { bd: children.bd, height: h1, width: w1 });
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 259);
module.setStyle('width', w+'px');
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 260);
host.fire('afterResizeModule', { bd: children.bd, height: h1, width: w1 });
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 261);
continue;
				}
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 263);
k++;

				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 265);
if (children.bd)
				{
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 267);
var h    = getHeight(col_heights[i], row_heights, i, j, module, module_info);
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 268);
var h1   = adjustHeight(h, children);
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 269);
total_h += h + module_info.mbp;

					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 271);
if (k == open_count)
					{
						_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 273);
h1 += body_height - total_h;
					}

					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 276);
var w1 = Math.max(1, w - children.bd.horizMarginBorderPadding());
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 277);
host.fire('beforeResizeModule', { bd: children.bd, height: h1, width: w1 });
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 278);
host._setWidth(children, w);
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 279);
children.bd.setStyle('height', h1+'px');
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 280);
host.fire('afterResizeModule', { bd: children.bd, height: h1, width: w1 });
				}
			}
		}
		else
		{
			// set the width of each module
			// clear the height of each module

			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 289);
ftc_size.push([]);
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 290);
var count = modules.size();
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 291);
for (var j=0; j<count; j++)
			{
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 293);
var children = host._analyzeModule(modules.item(j));
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 294);
if (children.bd)
				{
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 296);
var w1 = Math.max(1, w - children.bd.horizMarginBorderPadding());
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 297);
host.fire('beforeResizeModule', { bd: children.bd, height: 'auto', width: w1 });
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 298);
host._setWidth(children, w);
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 299);
children.root.setStyle('height', 'auto');
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 300);
children.bd.setStyle('height', 'auto');

					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 302);
if (match_heights)
					{
						_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 304);
ftc_size[i].push([children.bd, w1]);
					}
					else
					{
						_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 308);
host.fire('afterResizeModule',
						{
							bd:     children.bd,
							height: children.bd.insideHeight(),
							width:  w1
						});
					}
				}
			}
		}
	}

	// set the height of the last module in each column

	_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 322);
if (mode === Y.PageLayout.FIT_TO_CONTENT && match_heights)
	{
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 324);
var h = 0;
		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 325);
for (var i=0; i<col_count; i++)
		{
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 327);
h = Math.max(h, host.body_info.outers.item(i).get('offsetHeight'));
		}

		_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 330);
for (var i=0; i<col_count; i++)
		{
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 332);
var modules = host.body_info.modules[i],
				count   = modules.size(),
				module  = null,
				w1      = 0;
			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 336);
for (var j=count-1; j>=0; j--)
			{
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 338);
var module1 = modules.item(j);
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 339);
if (count == 1 ||
					(!module &&
					 !module1.hasClass(Y.PageLayout.collapsed_vert_class) &&
					 host.body_info.inner_sizes[i][j] > 0))
				{
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 344);
module = module1;
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 345);
w1     = ftc_size[i][j][1];
				}
				else
				{
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 349);
var bd = ftc_size[i][j][0];
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 350);
host.fire('afterResizeModule',
					{
						bd:     bd,
						height: bd.insideHeight(),
						width:  ftc_size[i][j][1]
					});
				}
			}

			_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 359);
if (module)
			{
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 361);
var delta = h - host.body_info.outers.item(i).get('offsetHeight');
				_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 362);
if (delta > 0 && module.get('parentNode').hasClass(Y.PageLayout.collapsed_horiz_class))
				{
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 364);
module.setStyle('height', (module.insideHeight() + delta)+'px');
				}
				else	// always fire afterResizeModule
				{
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 368);
var children = host._analyzeModule(module);
					_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 369);
if (children.bd)
					{
						_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 371);
var h1 = children.bd.insideHeight() + delta;
						_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 372);
module.setStyle('height', 'auto');
						_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 373);
children.bd.setStyle('height', h1+'px');
						_yuitest_coverline("build/gallery-layout-cols/gallery-layout-cols.js", 374);
host.fire('afterResizeModule', { bd: children.bd, height: h1, width: w1 });
					}
				}
			}
		}
	}
};


}, '@VERSION@', {"requires": ["gallery-layout"]});
