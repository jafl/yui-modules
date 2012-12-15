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
_yuitest_coverage["build/gallery-matrix-background/gallery-matrix-background.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-matrix-background/gallery-matrix-background.js",
    code: []
};
_yuitest_coverage["build/gallery-matrix-background/gallery-matrix-background.js"].code=["YUI.add('gallery-matrix-background', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-matrix-background"," */","","// Based on my ancient JMatrixCtrl MFC widget","","/**"," * Node plugin to display falling text similar to what was used in the"," * credits for The Matrix.  If you plug into the body element, then it will"," * fill the viewport.  Otherwise, you must set a width and height for the"," * node."," * "," * @main gallery-matrix-background"," * @class MatrixBackground"," * @constructor"," * @param config {Object} Plugin configuration"," */","function MatrixBackground(config)","{","	this.timer   = {};","	this.cell_on = [];","","	MatrixBackground.superclass.constructor.call(this, config);","}","","MatrixBackground.NAME = 'MatrixBackgroundPlugin';","MatrixBackground.NS   = 'matrix';","","MatrixBackground.ATTRS =","{","	/**","	 * The range of Unicode characters to use for the background noise.","	 * ","	 * @attribute charRange","	 * @type {Array}","	 * @default ['\\u30A1', '\\u30FA']","	 */","	charRange:","	{","		value: ['\\u30A1', '\\u30FA'],","		validator: function(value)","		{","			return (Y.Lang.isArray(value) && value.length == 2 &&","					value[0].length == 1 && value[1].length == 1 &&","					value[0] < value[1]);","		}","	},","","	/**","	 * Set to `true` to force a monospace font.  This only works if the","	 * browser can find a monospace version of the character range which","	 * you are using.","	 *","	 * @attribute monospace","	 * @type {Boolean}","	 * @default false","	 */","	monospace:","	{","		value:     false,","		validator: Y.Lang.isBoolean","	},","","	/**","	 * If you do not have a monospace font for the charRange, set this to","	 * `true` to computer the widest character in the range.  Note that","	 * this can take a long time if you have a large charRange!","	 *","	 * @attribute computeWidestChar","	 * @type {Boolean}","	 * @default false","	 */","	computeWidestChar:","	{","		value:     false,","		validator: Y.Lang.isBoolean","	},","","	/**","	 * Fraction of total columns that have a spinning character.","	 * ","	 * @attribute spinFraction","	 * @type {Number}","	 * @default 0.2","	 */","	spinFraction:","	{","		value: 0.2,","		validator: function(value)","		{","			return (0.0 <= value && value <= 1.0);","		}","	}","};","","var interval =","	{","		spin: 10,","		drop: 80","	},","","	drop_bottom_offset = 3,		// minimum number of rows affected by column drop","","	min_spin_count = 300,","	max_spin_count = 800;","","function rnd(min, max)","{","	return min + Math.floor(Math.random() * (max - min));","}","","function getCharacterRange()","{","	var c_range = this.get('charRange');","	return [ c_range[0].charCodeAt(0), c_range[1].charCodeAt(0) ];","}","","function getCell(x,y)","{","	return Y.Node.getDOMNode(this.table).firstChild.childNodes[y].childNodes[x];","}","","function startTimer(id)","{","	stopTimer.call(this, id);","","	this.timer[id] = Y.later(interval[id], this, function()","	{","		this.fire(id);","	},","	null, true);","}","","function stopTimer(id)","{","	if (this.timer[id])","	{","		this.timer[id].cancel();","		delete this.timer[id];","	}","}","","function renderTable()","{","	if (this.table)","	{","		this.table.destroy();","	}","","	var c_range = getCharacterRange.call(this),","		c       = String.fromCharCode(c_range[0]);","	this.container.set('innerHTML',","		'<table><tr><td>' + c + '</td></tr></table>');","","	var table = this.container.one('table');","	if (this.get('computeWidestChar'))","	{","		var c_max = c_range[0],","			w_max = table.totalWidth(),","			c_end = c_range[1],","			cell  = Y.Node.getDOMNode(this.container).getElementsByTagName('td')[0];","		for (c=c_max+1; c<=c_end; c++)","		{","			cell.innerHTML = String.fromCharCode(c);","			var w          = table.totalWidth();","			if (w > w_max)","			{","				w_max = w;","				c_max = c;","			}","		}","","		cell.innerHTML = c = String.fromCharCode(c_max);","	}","","	var w = Math.ceil(this.container.totalWidth() / table.totalWidth()),","		h = Math.ceil(this.container.totalHeight() / table.totalHeight());","","	var row = '<tr>';","	for (var x=0; x<w; x++)","	{","		row += '<td>&nbsp;</td>';","	}","	row += '</tr>';","","	var s = '';","	for (var y=0; y<h; y++)","	{","		s += row;","	}","","	// force column widths with row outside bounds (&nbsp; forces row heights)","","	s += '<tr>';","	for (var x=0; x<w; x++)","	{","		s += '<td>' + c + '</td>';","	}","	s += '</tr>';","","	table.setContent('<tbody>' + s + '</tbody>');","","	this.table     = table;","	this.row_count = h;","	this.col_count = w;","","	this.drop_active = 0;","	this.drop_col    = [];","	for (var i=0; i<w; i++)","	{","		this.drop_col.push({ active: false });","	}","","	startTimer.call(this, 'drop');","","	initSpin.call(this);","	startTimer.call(this, 'spin');","}","","function initSpin()","{","	this.spin_count  = Math.floor(this.col_count * this.get('spinFraction'));","	this.spin_active = 0;","	this.spin        = [];","	for (var i=0; i<this.spin_count; i++)","	{","		this.spin.push({ active: false });","	}","}","","function initDropColumn(x)","{","	var col    = this.drop_col[x];","	col.active = true;","	col.y      = Math.random() < 0.5 ? rnd(0, this.row_count - drop_bottom_offset) : 0;","","	if (Math.random() < 0.5)","	{","		col.y_max = col.y + rnd(drop_bottom_offset, this.row_count - col.y - 1)","	}","	else","	{","		col.y_max = this.row_count - 1;","	}","","	if (Math.random() < 0.2)","	{","		col.c = '&nbsp;';","	}","	else","	{","		var c_range = getCharacterRange.call(this);","		col.c       = String.fromCharCode(rnd(c_range[0], c_range[1]+1));","	}","}","","function updateDrop()","{","	// increment all active columns","","	var count   = this.col_count,","		c_range = getCharacterRange.call(this);","	for (var i=0; i<count; i++)","	{","		var col = this.drop_col[i];","		if (col.active && col.y >= col.y_max)","		{","			col.active = false;","			this.drop_active--;","		}","		else","		{","			if (col.c != '&nbsp;')","			{","				col.c = String.fromCharCode(rnd(c_range[0], c_range[1]+1));","			}","			col.y++;","		}","	}","","	// activate another column","","	if (this.drop_active < this.col_count)","	{","		var safety = 0;","		do","		{","			var i = rnd(0, this.col_count);","			safety++;","		}","			while (this.drop_col[i].active && safety < this.col_count);","","		if (!this.drop_col[i].active)","		{","			initDropColumn.call(this, i);","			this.drop_active++;","		}","	}","","	update.call(this);","}","","function updateSpin()","{","	// activate another spinner","","	if (this.spin_active < this.spin_count && rnd(0,100) === 0)","	{","		var safety = 0;","		do","		{","			var i = rnd(0, this.spin_count);","			safety++;","		}","			while (this.spin[i].active && safety < this.spin_count);","","		if (!this.spin[i].active)","		{","			var x = rnd(0, this.col_count),","				y = rnd(0, this.row_count);","","			this.spin[i] =","			{","				active:  true,","				counter: rnd(min_spin_count, max_spin_count),","				cell:    getCell.call(this, x, y)","			};","","			this.spin_active++;","		}","	}","","	// increment all active spinners","","	var count   = this.spin_count,","		c_range = getCharacterRange.call(this);","	for (var i=0; i<count; i++)","	{","		var spin = this.spin[i];","		if (spin.active && spin.counter <= 0)","		{","			spin.active = false;","			spin.cell   = null;","			this.spin_active--;","		}","		else if (spin.active)","		{","			spin.c = String.fromCharCode(rnd(c_range[0], c_range[1]+1));","			spin.counter--;","		}","	}","","	update.call(this);","}","","function update()","{","	var count = this.cell_on.length;","	for (var i=0; i<count; i++)","	{","		Y.DOM.removeClass(this.cell_on[i], 'on');","	}","	this.cell_on = [];","","	var count = this.col_count;","	for (var i=0; i<count; i++)","	{","		var col = this.drop_col[i];","		if (col.active)","		{","			var cell = getCell.call(this, i, col.y);","			Y.DOM.addClass(cell, 'on');","			this.cell_on.push(cell);","			cell.innerHTML = col.c;","		}","	}","","	var count = this.spin_count;","	for (var i=0; i<count; i++)","	{","		var spin = this.spin[i];","		if (spin.active)","		{","			Y.DOM.addClass(spin.cell, 'on');","			this.cell_on.push(spin.cell);","			spin.cell.innerHTML = spin.c;","		}","	}","}","","function updateMonospace()","{","	if (this.get('monospace'))","	{","		this.container.addClass('monospace');","	}","	else","	{","		this.container.removeClass('monospace');","	}","}","","function resize()","{","	if (this.is_body)","	{","		this.container.setStyles(","		{","			width:  Y.DOM.winWidth() + 'px',","			height: Y.DOM.winHeight() + 'px'","		});","	}","	else","	{","		var host = this.get('host');","		this.container.setStyles(","		{","			width:  host.getStyle('width'),","			height: host.getStyle('height')","		});","	}","","	renderTable.call(this);","}","","Y.extend(MatrixBackground, Y.Plugin.Base,","{","	initializer: function(config)","	{","		var host = this.get('host');","		host.removeClass('yui3-matrixbkgd-loading');","","		this.container = Y.Node.create('<div class=\"yui3-matrixbkgd\"></div>');","		host.append(this.container);","","		updateMonospace.call(this);","		this.after('charRangeChange', renderTable);","		this.after('monospaceChange', updateMonospace);","		this.after('spinFractionChange', initSpin);","","		this.on('drop', updateDrop);","		this.on('spin', updateSpin);","","		if (host == Y.one('body'))","		{","			this.is_body = true;","			Y.on('windowresize', resize, host, this);","		}","","		this.afterHostMethod('setStyle', function(name, value)","		{","			if (name == 'width' || name == 'height')","			{","				resize.call(this);","			}","		});","","		this.afterHostMethod('setStyles', function(map)","		{","			if (map.width || map.height)","			{","				resize.call(this);","			}","		});","","		this.afterHostMethod('addClass', resize);","		this.afterHostMethod('removeClass', resize);","		this.afterHostMethod('replaceClass', resize);","","		resize.call(this);","	},","","	destructor: function()","	{","		stopTimer.call(this, 'drop');","		stopTimer.call(this, 'spin');","","		if (this.table)","		{","			this.table.destroy();","		}","	}","});","","Y.namespace(\"Plugin\");","Y.Plugin.MatrixBackground = MatrixBackground;","","// for use by gallery-matrix-credits","","Y.mix(Y.Plugin.MatrixBackground,","{","	rnd:        rnd,","	startTimer: startTimer,","	stopTimer:  stopTimer,","","	getCharacterRange: getCharacterRange","});","","","}, '@VERSION@', {","    \"skinnable\": \"true\",","    \"requires\": [","        \"node-pluginhost\",","        \"plugin\",","        \"gallery-dimensions\",","        \"node-screen\",","        \"event-resize\"","    ]","});"];
_yuitest_coverage["build/gallery-matrix-background/gallery-matrix-background.js"].lines = {"1":0,"3":0,"22":0,"24":0,"25":0,"27":0,"30":0,"31":0,"33":0,"47":0,"95":0,"100":0,"111":0,"113":0,"116":0,"118":0,"119":0,"122":0,"124":0,"127":0,"129":0,"131":0,"133":0,"138":0,"140":0,"142":0,"143":0,"147":0,"149":0,"151":0,"154":0,"156":0,"159":0,"160":0,"162":0,"166":0,"168":0,"169":0,"170":0,"172":0,"173":0,"177":0,"180":0,"183":0,"184":0,"186":0,"188":0,"190":0,"191":0,"193":0,"198":0,"199":0,"201":0,"203":0,"205":0,"207":0,"208":0,"209":0,"211":0,"212":0,"213":0,"215":0,"218":0,"220":0,"221":0,"224":0,"226":0,"227":0,"228":0,"229":0,"231":0,"235":0,"237":0,"238":0,"239":0,"241":0,"243":0,"247":0,"250":0,"252":0,"256":0,"257":0,"261":0,"265":0,"267":0,"269":0,"270":0,"272":0,"273":0,"277":0,"279":0,"281":0,"287":0,"289":0,"290":0,"292":0,"293":0,"297":0,"299":0,"300":0,"304":0,"307":0,"311":0,"313":0,"314":0,"316":0,"317":0,"321":0,"323":0,"326":0,"333":0,"339":0,"341":0,"343":0,"344":0,"346":0,"347":0,"348":0,"350":0,"352":0,"353":0,"357":0,"360":0,"362":0,"363":0,"365":0,"367":0,"369":0,"370":0,"372":0,"373":0,"375":0,"376":0,"377":0,"378":0,"382":0,"383":0,"385":0,"386":0,"388":0,"389":0,"390":0,"395":0,"397":0,"399":0,"403":0,"407":0,"409":0,"411":0,"419":0,"420":0,"427":0,"430":0,"434":0,"435":0,"437":0,"438":0,"440":0,"441":0,"442":0,"443":0,"445":0,"446":0,"448":0,"450":0,"451":0,"454":0,"456":0,"458":0,"462":0,"464":0,"466":0,"470":0,"471":0,"472":0,"474":0,"479":0,"480":0,"482":0,"484":0,"489":0,"490":0,"494":0};
_yuitest_coverage["build/gallery-matrix-background/gallery-matrix-background.js"].functions = {"MatrixBackground:22":0,"validator:45":0,"validator:93":0,"rnd:111":0,"getCharacterRange:116":0,"getCell:122":0,"(anonymous 2):131":0,"startTimer:127":0,"stopTimer:138":0,"renderTable:147":0,"initSpin:224":0,"initDropColumn:235":0,"updateDrop:261":0,"updateSpin:307":0,"update:360":0,"updateMonospace:395":0,"resize:407":0,"(anonymous 3):454":0,"(anonymous 4):462":0,"initializer:432":0,"destructor:477":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-matrix-background/gallery-matrix-background.js"].coveredLines = 183;
_yuitest_coverage["build/gallery-matrix-background/gallery-matrix-background.js"].coveredFunctions = 22;
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 1);
YUI.add('gallery-matrix-background', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 3);
"use strict";

/**
 * @module gallery-matrix-background
 */

// Based on my ancient JMatrixCtrl MFC widget

/**
 * Node plugin to display falling text similar to what was used in the
 * credits for The Matrix.  If you plug into the body element, then it will
 * fill the viewport.  Otherwise, you must set a width and height for the
 * node.
 * 
 * @main gallery-matrix-background
 * @class MatrixBackground
 * @constructor
 * @param config {Object} Plugin configuration
 */
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 22);
function MatrixBackground(config)
{
	_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "MatrixBackground", 22);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 24);
this.timer   = {};
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 25);
this.cell_on = [];

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 27);
MatrixBackground.superclass.constructor.call(this, config);
}

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 30);
MatrixBackground.NAME = 'MatrixBackgroundPlugin';
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 31);
MatrixBackground.NS   = 'matrix';

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 33);
MatrixBackground.ATTRS =
{
	/**
	 * The range of Unicode characters to use for the background noise.
	 * 
	 * @attribute charRange
	 * @type {Array}
	 * @default ['\u30A1', '\u30FA']
	 */
	charRange:
	{
		value: ['\u30A1', '\u30FA'],
		validator: function(value)
		{
			_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "validator", 45);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 47);
return (Y.Lang.isArray(value) && value.length == 2 &&
					value[0].length == 1 && value[1].length == 1 &&
					value[0] < value[1]);
		}
	},

	/**
	 * Set to `true` to force a monospace font.  This only works if the
	 * browser can find a monospace version of the character range which
	 * you are using.
	 *
	 * @attribute monospace
	 * @type {Boolean}
	 * @default false
	 */
	monospace:
	{
		value:     false,
		validator: Y.Lang.isBoolean
	},

	/**
	 * If you do not have a monospace font for the charRange, set this to
	 * `true` to computer the widest character in the range.  Note that
	 * this can take a long time if you have a large charRange!
	 *
	 * @attribute computeWidestChar
	 * @type {Boolean}
	 * @default false
	 */
	computeWidestChar:
	{
		value:     false,
		validator: Y.Lang.isBoolean
	},

	/**
	 * Fraction of total columns that have a spinning character.
	 * 
	 * @attribute spinFraction
	 * @type {Number}
	 * @default 0.2
	 */
	spinFraction:
	{
		value: 0.2,
		validator: function(value)
		{
			_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "validator", 93);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 95);
return (0.0 <= value && value <= 1.0);
		}
	}
};

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 100);
var interval =
	{
		spin: 10,
		drop: 80
	},

	drop_bottom_offset = 3,		// minimum number of rows affected by column drop

	min_spin_count = 300,
	max_spin_count = 800;

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 111);
function rnd(min, max)
{
	_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "rnd", 111);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 113);
return min + Math.floor(Math.random() * (max - min));
}

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 116);
function getCharacterRange()
{
	_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "getCharacterRange", 116);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 118);
var c_range = this.get('charRange');
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 119);
return [ c_range[0].charCodeAt(0), c_range[1].charCodeAt(0) ];
}

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 122);
function getCell(x,y)
{
	_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "getCell", 122);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 124);
return Y.Node.getDOMNode(this.table).firstChild.childNodes[y].childNodes[x];
}

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 127);
function startTimer(id)
{
	_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "startTimer", 127);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 129);
stopTimer.call(this, id);

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 131);
this.timer[id] = Y.later(interval[id], this, function()
	{
		_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "(anonymous 2)", 131);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 133);
this.fire(id);
	},
	null, true);
}

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 138);
function stopTimer(id)
{
	_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "stopTimer", 138);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 140);
if (this.timer[id])
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 142);
this.timer[id].cancel();
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 143);
delete this.timer[id];
	}
}

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 147);
function renderTable()
{
	_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "renderTable", 147);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 149);
if (this.table)
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 151);
this.table.destroy();
	}

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 154);
var c_range = getCharacterRange.call(this),
		c       = String.fromCharCode(c_range[0]);
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 156);
this.container.set('innerHTML',
		'<table><tr><td>' + c + '</td></tr></table>');

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 159);
var table = this.container.one('table');
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 160);
if (this.get('computeWidestChar'))
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 162);
var c_max = c_range[0],
			w_max = table.totalWidth(),
			c_end = c_range[1],
			cell  = Y.Node.getDOMNode(this.container).getElementsByTagName('td')[0];
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 166);
for (c=c_max+1; c<=c_end; c++)
		{
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 168);
cell.innerHTML = String.fromCharCode(c);
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 169);
var w          = table.totalWidth();
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 170);
if (w > w_max)
			{
				_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 172);
w_max = w;
				_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 173);
c_max = c;
			}
		}

		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 177);
cell.innerHTML = c = String.fromCharCode(c_max);
	}

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 180);
var w = Math.ceil(this.container.totalWidth() / table.totalWidth()),
		h = Math.ceil(this.container.totalHeight() / table.totalHeight());

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 183);
var row = '<tr>';
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 184);
for (var x=0; x<w; x++)
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 186);
row += '<td>&nbsp;</td>';
	}
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 188);
row += '</tr>';

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 190);
var s = '';
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 191);
for (var y=0; y<h; y++)
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 193);
s += row;
	}

	// force column widths with row outside bounds (&nbsp; forces row heights)

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 198);
s += '<tr>';
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 199);
for (var x=0; x<w; x++)
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 201);
s += '<td>' + c + '</td>';
	}
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 203);
s += '</tr>';

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 205);
table.setContent('<tbody>' + s + '</tbody>');

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 207);
this.table     = table;
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 208);
this.row_count = h;
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 209);
this.col_count = w;

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 211);
this.drop_active = 0;
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 212);
this.drop_col    = [];
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 213);
for (var i=0; i<w; i++)
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 215);
this.drop_col.push({ active: false });
	}

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 218);
startTimer.call(this, 'drop');

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 220);
initSpin.call(this);
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 221);
startTimer.call(this, 'spin');
}

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 224);
function initSpin()
{
	_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "initSpin", 224);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 226);
this.spin_count  = Math.floor(this.col_count * this.get('spinFraction'));
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 227);
this.spin_active = 0;
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 228);
this.spin        = [];
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 229);
for (var i=0; i<this.spin_count; i++)
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 231);
this.spin.push({ active: false });
	}
}

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 235);
function initDropColumn(x)
{
	_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "initDropColumn", 235);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 237);
var col    = this.drop_col[x];
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 238);
col.active = true;
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 239);
col.y      = Math.random() < 0.5 ? rnd(0, this.row_count - drop_bottom_offset) : 0;

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 241);
if (Math.random() < 0.5)
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 243);
col.y_max = col.y + rnd(drop_bottom_offset, this.row_count - col.y - 1)
	}
	else
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 247);
col.y_max = this.row_count - 1;
	}

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 250);
if (Math.random() < 0.2)
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 252);
col.c = '&nbsp;';
	}
	else
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 256);
var c_range = getCharacterRange.call(this);
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 257);
col.c       = String.fromCharCode(rnd(c_range[0], c_range[1]+1));
	}
}

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 261);
function updateDrop()
{
	// increment all active columns

	_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "updateDrop", 261);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 265);
var count   = this.col_count,
		c_range = getCharacterRange.call(this);
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 267);
for (var i=0; i<count; i++)
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 269);
var col = this.drop_col[i];
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 270);
if (col.active && col.y >= col.y_max)
		{
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 272);
col.active = false;
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 273);
this.drop_active--;
		}
		else
		{
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 277);
if (col.c != '&nbsp;')
			{
				_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 279);
col.c = String.fromCharCode(rnd(c_range[0], c_range[1]+1));
			}
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 281);
col.y++;
		}
	}

	// activate another column

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 287);
if (this.drop_active < this.col_count)
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 289);
var safety = 0;
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 290);
do
		{
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 292);
var i = rnd(0, this.col_count);
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 293);
safety++;
		}while (this.drop_col[i].active && safety < this.col_count);

		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 297);
if (!this.drop_col[i].active)
		{
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 299);
initDropColumn.call(this, i);
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 300);
this.drop_active++;
		}
	}

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 304);
update.call(this);
}

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 307);
function updateSpin()
{
	// activate another spinner

	_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "updateSpin", 307);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 311);
if (this.spin_active < this.spin_count && rnd(0,100) === 0)
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 313);
var safety = 0;
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 314);
do
		{
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 316);
var i = rnd(0, this.spin_count);
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 317);
safety++;
		}while (this.spin[i].active && safety < this.spin_count);

		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 321);
if (!this.spin[i].active)
		{
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 323);
var x = rnd(0, this.col_count),
				y = rnd(0, this.row_count);

			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 326);
this.spin[i] =
			{
				active:  true,
				counter: rnd(min_spin_count, max_spin_count),
				cell:    getCell.call(this, x, y)
			};

			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 333);
this.spin_active++;
		}
	}

	// increment all active spinners

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 339);
var count   = this.spin_count,
		c_range = getCharacterRange.call(this);
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 341);
for (var i=0; i<count; i++)
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 343);
var spin = this.spin[i];
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 344);
if (spin.active && spin.counter <= 0)
		{
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 346);
spin.active = false;
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 347);
spin.cell   = null;
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 348);
this.spin_active--;
		}
		else {_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 350);
if (spin.active)
		{
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 352);
spin.c = String.fromCharCode(rnd(c_range[0], c_range[1]+1));
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 353);
spin.counter--;
		}}
	}

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 357);
update.call(this);
}

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 360);
function update()
{
	_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "update", 360);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 362);
var count = this.cell_on.length;
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 363);
for (var i=0; i<count; i++)
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 365);
Y.DOM.removeClass(this.cell_on[i], 'on');
	}
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 367);
this.cell_on = [];

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 369);
var count = this.col_count;
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 370);
for (var i=0; i<count; i++)
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 372);
var col = this.drop_col[i];
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 373);
if (col.active)
		{
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 375);
var cell = getCell.call(this, i, col.y);
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 376);
Y.DOM.addClass(cell, 'on');
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 377);
this.cell_on.push(cell);
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 378);
cell.innerHTML = col.c;
		}
	}

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 382);
var count = this.spin_count;
	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 383);
for (var i=0; i<count; i++)
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 385);
var spin = this.spin[i];
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 386);
if (spin.active)
		{
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 388);
Y.DOM.addClass(spin.cell, 'on');
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 389);
this.cell_on.push(spin.cell);
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 390);
spin.cell.innerHTML = spin.c;
		}
	}
}

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 395);
function updateMonospace()
{
	_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "updateMonospace", 395);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 397);
if (this.get('monospace'))
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 399);
this.container.addClass('monospace');
	}
	else
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 403);
this.container.removeClass('monospace');
	}
}

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 407);
function resize()
{
	_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "resize", 407);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 409);
if (this.is_body)
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 411);
this.container.setStyles(
		{
			width:  Y.DOM.winWidth() + 'px',
			height: Y.DOM.winHeight() + 'px'
		});
	}
	else
	{
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 419);
var host = this.get('host');
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 420);
this.container.setStyles(
		{
			width:  host.getStyle('width'),
			height: host.getStyle('height')
		});
	}

	_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 427);
renderTable.call(this);
}

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 430);
Y.extend(MatrixBackground, Y.Plugin.Base,
{
	initializer: function(config)
	{
		_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "initializer", 432);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 434);
var host = this.get('host');
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 435);
host.removeClass('yui3-matrixbkgd-loading');

		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 437);
this.container = Y.Node.create('<div class="yui3-matrixbkgd"></div>');
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 438);
host.append(this.container);

		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 440);
updateMonospace.call(this);
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 441);
this.after('charRangeChange', renderTable);
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 442);
this.after('monospaceChange', updateMonospace);
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 443);
this.after('spinFractionChange', initSpin);

		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 445);
this.on('drop', updateDrop);
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 446);
this.on('spin', updateSpin);

		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 448);
if (host == Y.one('body'))
		{
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 450);
this.is_body = true;
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 451);
Y.on('windowresize', resize, host, this);
		}

		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 454);
this.afterHostMethod('setStyle', function(name, value)
		{
			_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "(anonymous 3)", 454);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 456);
if (name == 'width' || name == 'height')
			{
				_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 458);
resize.call(this);
			}
		});

		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 462);
this.afterHostMethod('setStyles', function(map)
		{
			_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "(anonymous 4)", 462);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 464);
if (map.width || map.height)
			{
				_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 466);
resize.call(this);
			}
		});

		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 470);
this.afterHostMethod('addClass', resize);
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 471);
this.afterHostMethod('removeClass', resize);
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 472);
this.afterHostMethod('replaceClass', resize);

		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 474);
resize.call(this);
	},

	destructor: function()
	{
		_yuitest_coverfunc("build/gallery-matrix-background/gallery-matrix-background.js", "destructor", 477);
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 479);
stopTimer.call(this, 'drop');
		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 480);
stopTimer.call(this, 'spin');

		_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 482);
if (this.table)
		{
			_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 484);
this.table.destroy();
		}
	}
});

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 489);
Y.namespace("Plugin");
_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 490);
Y.Plugin.MatrixBackground = MatrixBackground;

// for use by gallery-matrix-credits

_yuitest_coverline("build/gallery-matrix-background/gallery-matrix-background.js", 494);
Y.mix(Y.Plugin.MatrixBackground,
{
	rnd:        rnd,
	startTimer: startTimer,
	stopTimer:  stopTimer,

	getCharacterRange: getCharacterRange
});


}, '@VERSION@', {
    "skinnable": "true",
    "requires": [
        "node-pluginhost",
        "plugin",
        "gallery-dimensions",
        "node-screen",
        "event-resize"
    ]
});
