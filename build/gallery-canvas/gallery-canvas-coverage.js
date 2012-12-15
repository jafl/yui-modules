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
_yuitest_coverage["build/gallery-canvas/gallery-canvas.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-canvas/gallery-canvas.js",
    code: []
};
_yuitest_coverage["build/gallery-canvas/gallery-canvas.js"].code=["YUI.add('gallery-canvas', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-canvas"," */","","function mirror(r, s, name)","{","	r[name] = function()","	{","		return s[name].apply(s, arguments);","	};","}","","/**********************************************************************"," * <p>Wrapper for a canvas 2d context.  It exposes the exact same api as"," * the native 2d context, plus some extras, documented below.  Just like"," * Y.Node, use get() and set() to modify attributes.</p>"," * "," * @main gallery-canvas"," * @class Context2d"," * @namespace Canvas"," * @constructor"," * @param node {Y.Node} the canvas element"," * @param config {Object}"," * @param config.pixelAlign=true {Boolean} Pass true to get thinner, cleaner strokes. Pass false to get the default rendering."," */","function Context2d(node, config)","{","	this.context = node.invoke('getContext', '2d');","	if (!this.context)","	{","		Y.error('Canvas requires a canvas element.');","	}","","	config = config || {};","	this.set('pixelAlign', Y.Lang.isUndefined(config.pixelAlign) ? true : config.pixelAlign);","","	// expose all context functions on context","","	for (var f in this.context)","	{","		if (Y.Lang.isFunction(this.context[f]) && !this[f])","		{","			mirror(this, this.context, f);","		}","	}","}","","Context2d.NAME = \"canvas2dcontext\";","","Context2d.prototype =","{","	/**","	 * Get an attribute.  This accepts all attributes of the context and","	 * the special name \"pixelAlign\".","	 * ","	 * @method get","	 * @param name {String} the attribute name","	 * @return {Mixed} the attribute value","	 */","	get: function(","		/* string */ name)","	{","		if (name == 'pixelAlign')","		{","			return this.pixel_align;","		}","		else","		{","			return this.context[name];","		}","	},","","	/**","	 * Set an attribute.  This accepts all attributes of the context and","	 * the special name \"pixelAlign\".","	 * ","	 * @method set","	 * @param name {String} the attribute name","	 * @param value {Mixed} the attribute value","	 */","	set: function(","		/* string */	name,","		/* mixed */		value)","	{","		if (name == 'pixelAlign')","		{","			this.pixel_align  = value;","			this.pixel_offset = value ? 0.5 : 0;","		}","		else","		{","			this.context[name] = value;","		}","	},","","	moveTo: function(x,y)","	{","		this._x = x;","		this._y = y;","		this.context.moveTo(x + this.pixel_offset, y + this.pixel_offset);","	},","","	/**","	 * Move relative to the current pen location (set via moveTo or move).","	 * This only works when the transformation matrix is constant!","	 * ","	 * @method move","	 * @param dx {int}","	 * @param dy {int}","	 */","	move: function(dx,dy)","	{","		this.moveTo(this._x + dx, this._y + dy);","	},","","	lineTo: function(x,y)","	{","		this._x = x;","		this._y = y;","		this.context.lineTo(x + this.pixel_offset, y + this.pixel_offset);","	},","","	/**","	 * Move relative to the current pen location.","	 * This only works when the transformation matrix is constant!","	 * ","	 * @method line","	 * @param dx {int}","	 * @param dy {int}","	 */","	line: function(dx,dy)","	{","		this.lineTo(this._x + dx, this._y + dy);","	},","","	arc: function(x,y)","	{","		x += this.pixel_offset;","		y += this.pixel_offset;","		this.context.arc.apply(this.context, arguments);","	},","","	arcTo: function(x1,y1, x2,y2, radius)","	{","		this.context.arcTo(x1 + this.pixel_offset, y1 + this.pixel_offset, x2 + this.pixel_offset, y2 + this.pixel_offset, radius);","	},","","	bezierCurveTo: function(cp1x,cp1y, cp2x,cp2y, x,y)","	{","		x += this.pixel_offset;","		y += this.pixel_offset;","		this.context.bezierCurveTo.apply(this.context, arguments);","	},","","	quadraticCurveTo: function(cp1x,cp1y, x,y)","	{","		x += this.pixel_offset;","		y += this.pixel_offset;","		this.context.quadraticCurveTo.apply(this.context, arguments);","	},","","	/**","	 * Define a rectangle with rounded corners.  You must call stroke(),","	 * fill(), etc. afterwards.","	 * ","	 * @method roundedRect","	 * @param top {int}","	 * @param left {int}","	 * @param bottom {int}","	 * @param right {int}","	 * @param radius {int} radius of rounded corners","	 */","	roundedRect: function(top,left,bottom,right,radius)","	{","		this.beginPath();","","		var delta = this.pixel_offset;","","		this.moveTo(left + radius, top);","		this.lineTo(right - radius, top);","","		this.arcTo(right, top, right, bottom, radius);","","		this.moveTo(right, top + radius);","		this.lineTo(right, bottom - radius);","","		this.arcTo(right, bottom, left, bottom, radius);","","		this.moveTo(right - radius, bottom);","		this.lineTo(left + radius, bottom);","","		this.arcTo(left, bottom, left, top, radius);","","		this.moveTo(left, bottom - radius);","		this.lineTo(left, top + radius);","","		this.arcTo(left, top, right, top, radius);","	},","","	/**","	 * Draw a polygon from a set of deltas.  ","	 * ","	 * @method poly","	 * @param list {Array} List of deltas (dx,dy).  You can omit values that are zero.","	 */","	poly: function(list)","	{","		Y.Array.each(list, function(pt)","		{","			this.line(pt.dx || 0, pt.dy || 0);","		},","		this);","	}","};","","Y.namespace('Canvas');","Y.Canvas.Context2d = Context2d;","","","}, '@VERSION@', {\"requires\": [\"node-base\"], \"optional\": [\"\"]});"];
_yuitest_coverage["build/gallery-canvas/gallery-canvas.js"].lines = {"1":0,"3":0,"9":0,"11":0,"13":0,"30":0,"32":0,"33":0,"35":0,"38":0,"39":0,"43":0,"45":0,"47":0,"52":0,"54":0,"67":0,"69":0,"73":0,"89":0,"91":0,"92":0,"96":0,"102":0,"103":0,"104":0,"117":0,"122":0,"123":0,"124":0,"137":0,"142":0,"143":0,"144":0,"149":0,"154":0,"155":0,"156":0,"161":0,"162":0,"163":0,"179":0,"181":0,"183":0,"184":0,"186":0,"188":0,"189":0,"191":0,"193":0,"194":0,"196":0,"198":0,"199":0,"201":0,"212":0,"214":0,"220":0,"221":0};
_yuitest_coverage["build/gallery-canvas/gallery-canvas.js"].functions = {"]:11":0,"mirror:9":0,"Context2d:30":0,"get:64":0,"set:85":0,"moveTo:100":0,"move:115":0,"lineTo:120":0,"line:135":0,"arc:140":0,"arcTo:147":0,"bezierCurveTo:152":0,"quadraticCurveTo:159":0,"roundedRect:177":0,"(anonymous 2):212":0,"poly:210":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-canvas/gallery-canvas.js"].coveredLines = 59;
_yuitest_coverage["build/gallery-canvas/gallery-canvas.js"].coveredFunctions = 17;
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 1);
YUI.add('gallery-canvas', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 3);
"use strict";

/**
 * @module gallery-canvas
 */

_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 9);
function mirror(r, s, name)
{
	_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "mirror", 9);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 11);
r[name] = function()
	{
		_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "]", 11);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 13);
return s[name].apply(s, arguments);
	};
}

/**********************************************************************
 * <p>Wrapper for a canvas 2d context.  It exposes the exact same api as
 * the native 2d context, plus some extras, documented below.  Just like
 * Y.Node, use get() and set() to modify attributes.</p>
 * 
 * @main gallery-canvas
 * @class Context2d
 * @namespace Canvas
 * @constructor
 * @param node {Y.Node} the canvas element
 * @param config {Object}
 * @param config.pixelAlign=true {Boolean} Pass true to get thinner, cleaner strokes. Pass false to get the default rendering.
 */
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 30);
function Context2d(node, config)
{
	_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "Context2d", 30);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 32);
this.context = node.invoke('getContext', '2d');
	_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 33);
if (!this.context)
	{
		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 35);
Y.error('Canvas requires a canvas element.');
	}

	_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 38);
config = config || {};
	_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 39);
this.set('pixelAlign', Y.Lang.isUndefined(config.pixelAlign) ? true : config.pixelAlign);

	// expose all context functions on context

	_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 43);
for (var f in this.context)
	{
		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 45);
if (Y.Lang.isFunction(this.context[f]) && !this[f])
		{
			_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 47);
mirror(this, this.context, f);
		}
	}
}

_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 52);
Context2d.NAME = "canvas2dcontext";

_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 54);
Context2d.prototype =
{
	/**
	 * Get an attribute.  This accepts all attributes of the context and
	 * the special name "pixelAlign".
	 * 
	 * @method get
	 * @param name {String} the attribute name
	 * @return {Mixed} the attribute value
	 */
	get: function(
		/* string */ name)
	{
		_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "get", 64);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 67);
if (name == 'pixelAlign')
		{
			_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 69);
return this.pixel_align;
		}
		else
		{
			_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 73);
return this.context[name];
		}
	},

	/**
	 * Set an attribute.  This accepts all attributes of the context and
	 * the special name "pixelAlign".
	 * 
	 * @method set
	 * @param name {String} the attribute name
	 * @param value {Mixed} the attribute value
	 */
	set: function(
		/* string */	name,
		/* mixed */		value)
	{
		_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "set", 85);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 89);
if (name == 'pixelAlign')
		{
			_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 91);
this.pixel_align  = value;
			_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 92);
this.pixel_offset = value ? 0.5 : 0;
		}
		else
		{
			_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 96);
this.context[name] = value;
		}
	},

	moveTo: function(x,y)
	{
		_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "moveTo", 100);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 102);
this._x = x;
		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 103);
this._y = y;
		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 104);
this.context.moveTo(x + this.pixel_offset, y + this.pixel_offset);
	},

	/**
	 * Move relative to the current pen location (set via moveTo or move).
	 * This only works when the transformation matrix is constant!
	 * 
	 * @method move
	 * @param dx {int}
	 * @param dy {int}
	 */
	move: function(dx,dy)
	{
		_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "move", 115);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 117);
this.moveTo(this._x + dx, this._y + dy);
	},

	lineTo: function(x,y)
	{
		_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "lineTo", 120);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 122);
this._x = x;
		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 123);
this._y = y;
		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 124);
this.context.lineTo(x + this.pixel_offset, y + this.pixel_offset);
	},

	/**
	 * Move relative to the current pen location.
	 * This only works when the transformation matrix is constant!
	 * 
	 * @method line
	 * @param dx {int}
	 * @param dy {int}
	 */
	line: function(dx,dy)
	{
		_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "line", 135);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 137);
this.lineTo(this._x + dx, this._y + dy);
	},

	arc: function(x,y)
	{
		_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "arc", 140);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 142);
x += this.pixel_offset;
		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 143);
y += this.pixel_offset;
		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 144);
this.context.arc.apply(this.context, arguments);
	},

	arcTo: function(x1,y1, x2,y2, radius)
	{
		_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "arcTo", 147);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 149);
this.context.arcTo(x1 + this.pixel_offset, y1 + this.pixel_offset, x2 + this.pixel_offset, y2 + this.pixel_offset, radius);
	},

	bezierCurveTo: function(cp1x,cp1y, cp2x,cp2y, x,y)
	{
		_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "bezierCurveTo", 152);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 154);
x += this.pixel_offset;
		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 155);
y += this.pixel_offset;
		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 156);
this.context.bezierCurveTo.apply(this.context, arguments);
	},

	quadraticCurveTo: function(cp1x,cp1y, x,y)
	{
		_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "quadraticCurveTo", 159);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 161);
x += this.pixel_offset;
		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 162);
y += this.pixel_offset;
		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 163);
this.context.quadraticCurveTo.apply(this.context, arguments);
	},

	/**
	 * Define a rectangle with rounded corners.  You must call stroke(),
	 * fill(), etc. afterwards.
	 * 
	 * @method roundedRect
	 * @param top {int}
	 * @param left {int}
	 * @param bottom {int}
	 * @param right {int}
	 * @param radius {int} radius of rounded corners
	 */
	roundedRect: function(top,left,bottom,right,radius)
	{
		_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "roundedRect", 177);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 179);
this.beginPath();

		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 181);
var delta = this.pixel_offset;

		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 183);
this.moveTo(left + radius, top);
		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 184);
this.lineTo(right - radius, top);

		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 186);
this.arcTo(right, top, right, bottom, radius);

		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 188);
this.moveTo(right, top + radius);
		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 189);
this.lineTo(right, bottom - radius);

		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 191);
this.arcTo(right, bottom, left, bottom, radius);

		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 193);
this.moveTo(right - radius, bottom);
		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 194);
this.lineTo(left + radius, bottom);

		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 196);
this.arcTo(left, bottom, left, top, radius);

		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 198);
this.moveTo(left, bottom - radius);
		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 199);
this.lineTo(left, top + radius);

		_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 201);
this.arcTo(left, top, right, top, radius);
	},

	/**
	 * Draw a polygon from a set of deltas.  
	 * 
	 * @method poly
	 * @param list {Array} List of deltas (dx,dy).  You can omit values that are zero.
	 */
	poly: function(list)
	{
		_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "poly", 210);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 212);
Y.Array.each(list, function(pt)
		{
			_yuitest_coverfunc("build/gallery-canvas/gallery-canvas.js", "(anonymous 2)", 212);
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 214);
this.line(pt.dx || 0, pt.dy || 0);
		},
		this);
	}
};

_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 220);
Y.namespace('Canvas');
_yuitest_coverline("build/gallery-canvas/gallery-canvas.js", 221);
Y.Canvas.Context2d = Context2d;


}, '@VERSION@', {"requires": ["node-base"], "optional": [""]});
