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
_yuitest_coverage["build/gallery-dimensions/gallery-dimensions.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-dimensions/gallery-dimensions.js",
    code: []
};
_yuitest_coverage["build/gallery-dimensions/gallery-dimensions.js"].code=["YUI.add('gallery-dimensions', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-dimensions"," */","","/**"," * Functions for measuring the size of a node."," * "," * @main gallery-dimensions"," * @class Node~dimensions"," */","","var em_div = null,","","	the_horiz_styles =","	[","		'marginLeft',","		'borderLeftWidth',","		'paddingLeft',","		'paddingRight',","		'borderRightWidth',","		'marginRight'","	],","","	the_vert_styles =","	[","		'marginTop',","		'borderTopWidth',","		'paddingTop',","		'paddingBottom',","		'borderBottomWidth',","		'marginBottom'","	];","","/**********************************************************************"," * @method emToPx"," * @static"," * @param em_count {Number} the number of em's to convert (defaults to 1)"," * @return {Number} the size of one em in pixels"," */","","Y.Node.emToPx = function(","	/* float */	em_count)","{","	if (!em_div)","	{","		em_div                  = Y.config.doc.createElement('div');","		em_div.style.position   = 'absolute';","		em_div.style.top        = '-10000px';","		em_div.style.left       = '-10000px';","		em_div.style.visibility = 'hidden';","		em_div.style.width      = '10em';","		em_div.style.height     = '10em';","		Y.config.doc.body.appendChild(em_div);","	}","	return (em_count || 1) * (em_div.offsetWidth / 10.0);","};","","/**********************************************************************"," * @method totalWidth"," * @return {Number} the total width used by the element, including margin, border, and padding  (Margin is not included in offsetWidth.)"," */","","Y.Node.prototype.totalWidth = function()","{","	return	this._node.offsetWidth +","			this.parseDimensionStyle('marginLeft') +","			this.parseDimensionStyle('marginRight');","};","","/**********************************************************************"," * @method totalHeight"," * @return {Number} the total height used by the element, including margin, border, and padding  (Margin is not included in offsetHeight.)"," */","","Y.Node.prototype.totalHeight = function()","{","	return	this._node.offsetHeight +","			this.parseDimensionStyle('marginTop') +","			this.parseDimensionStyle('marginBottom');","};","","/**********************************************************************"," * @method insideWidth"," * @return {Number} the available width inside the widget.  (Padding is included in clientWidth.)"," */","","Y.Node.prototype.insideWidth = function()","{","	return	this._node.clientWidth -","			this.parseDimensionStyle('paddingLeft') -","			this.parseDimensionStyle('paddingRight');","};","","/**********************************************************************"," * @method insideHeight"," * @return {Number} the available height inside the widget.  (Padding is included in clientHeight.)"," */","","Y.Node.prototype.insideHeight = function()","{","	return	this._node.clientHeight -","			this.parseDimensionStyle('paddingTop') -","			this.parseDimensionStyle('paddingBottom');","};","","/**********************************************************************"," * @method horizMarginBorderPadding"," * @return {Number} the width of everything surrounding the element's content"," */","","Y.Node.prototype.horizMarginBorderPadding = function()","{","	return Y.Array.reduce(the_horiz_styles, 0, function(w, style)","	{","		return w + this.parseDimensionStyle(style);","	},","	this);","};","","/**********************************************************************"," * @method vertMarginBorderPadding"," * @return {Number} the height of everything surrounding the element's content"," */","","Y.Node.prototype.vertMarginBorderPadding = function()","{","	return Y.Array.reduce(the_vert_styles, 0, function(h, style)","	{","		return h + this.parseDimensionStyle(style);","	},","	this);","};","","/**********************************************************************"," * @method parseDimensionStyle"," * @param style {String} the style to parse"," * @return {Number} the size of the style in pixels"," */","","Y.Node.prototype.parseDimensionStyle = function(","	/* string */	style)","{","	var s = this.getComputedStyle(style);","	if (!s || !/^[0-9]/.test(s))	// ignore values like \"medium\"","	{","		return 0;","	}","","	var v = parseFloat(s, 10);","	if (/em$/.test(s))","	{","		v *= Y.Node.emToPx(1);","	}","","	return Math.round(v);","};","","","}, '@VERSION@', {\"requires\": [\"node-style\", \"array-extras\"]});"];
_yuitest_coverage["build/gallery-dimensions/gallery-dimensions.js"].lines = {"1":0,"3":0,"16":0,"45":0,"48":0,"50":0,"51":0,"52":0,"53":0,"54":0,"55":0,"56":0,"57":0,"59":0,"67":0,"69":0,"79":0,"81":0,"91":0,"93":0,"103":0,"105":0,"115":0,"117":0,"119":0,"129":0,"131":0,"133":0,"144":0,"147":0,"148":0,"150":0,"153":0,"154":0,"156":0,"159":0};
_yuitest_coverage["build/gallery-dimensions/gallery-dimensions.js"].functions = {"emToPx:45":0,"totalWidth:67":0,"totalHeight:79":0,"insideWidth:91":0,"insideHeight:103":0,"(anonymous 2):117":0,"horizMarginBorderPadding:115":0,"(anonymous 3):131":0,"vertMarginBorderPadding:129":0,"parseDimensionStyle:144":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-dimensions/gallery-dimensions.js"].coveredLines = 36;
_yuitest_coverage["build/gallery-dimensions/gallery-dimensions.js"].coveredFunctions = 11;
_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 1);
YUI.add('gallery-dimensions', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-dimensions/gallery-dimensions.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 3);
"use strict";

/**
 * @module gallery-dimensions
 */

/**
 * Functions for measuring the size of a node.
 * 
 * @main gallery-dimensions
 * @class Node~dimensions
 */

_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 16);
var em_div = null,

	the_horiz_styles =
	[
		'marginLeft',
		'borderLeftWidth',
		'paddingLeft',
		'paddingRight',
		'borderRightWidth',
		'marginRight'
	],

	the_vert_styles =
	[
		'marginTop',
		'borderTopWidth',
		'paddingTop',
		'paddingBottom',
		'borderBottomWidth',
		'marginBottom'
	];

/**********************************************************************
 * @method emToPx
 * @static
 * @param em_count {Number} the number of em's to convert (defaults to 1)
 * @return {Number} the size of one em in pixels
 */

_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 45);
Y.Node.emToPx = function(
	/* float */	em_count)
{
	_yuitest_coverfunc("build/gallery-dimensions/gallery-dimensions.js", "emToPx", 45);
_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 48);
if (!em_div)
	{
		_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 50);
em_div                  = Y.config.doc.createElement('div');
		_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 51);
em_div.style.position   = 'absolute';
		_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 52);
em_div.style.top        = '-10000px';
		_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 53);
em_div.style.left       = '-10000px';
		_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 54);
em_div.style.visibility = 'hidden';
		_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 55);
em_div.style.width      = '10em';
		_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 56);
em_div.style.height     = '10em';
		_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 57);
Y.config.doc.body.appendChild(em_div);
	}
	_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 59);
return (em_count || 1) * (em_div.offsetWidth / 10.0);
};

/**********************************************************************
 * @method totalWidth
 * @return {Number} the total width used by the element, including margin, border, and padding  (Margin is not included in offsetWidth.)
 */

_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 67);
Y.Node.prototype.totalWidth = function()
{
	_yuitest_coverfunc("build/gallery-dimensions/gallery-dimensions.js", "totalWidth", 67);
_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 69);
return	this._node.offsetWidth +
			this.parseDimensionStyle('marginLeft') +
			this.parseDimensionStyle('marginRight');
};

/**********************************************************************
 * @method totalHeight
 * @return {Number} the total height used by the element, including margin, border, and padding  (Margin is not included in offsetHeight.)
 */

_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 79);
Y.Node.prototype.totalHeight = function()
{
	_yuitest_coverfunc("build/gallery-dimensions/gallery-dimensions.js", "totalHeight", 79);
_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 81);
return	this._node.offsetHeight +
			this.parseDimensionStyle('marginTop') +
			this.parseDimensionStyle('marginBottom');
};

/**********************************************************************
 * @method insideWidth
 * @return {Number} the available width inside the widget.  (Padding is included in clientWidth.)
 */

_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 91);
Y.Node.prototype.insideWidth = function()
{
	_yuitest_coverfunc("build/gallery-dimensions/gallery-dimensions.js", "insideWidth", 91);
_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 93);
return	this._node.clientWidth -
			this.parseDimensionStyle('paddingLeft') -
			this.parseDimensionStyle('paddingRight');
};

/**********************************************************************
 * @method insideHeight
 * @return {Number} the available height inside the widget.  (Padding is included in clientHeight.)
 */

_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 103);
Y.Node.prototype.insideHeight = function()
{
	_yuitest_coverfunc("build/gallery-dimensions/gallery-dimensions.js", "insideHeight", 103);
_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 105);
return	this._node.clientHeight -
			this.parseDimensionStyle('paddingTop') -
			this.parseDimensionStyle('paddingBottom');
};

/**********************************************************************
 * @method horizMarginBorderPadding
 * @return {Number} the width of everything surrounding the element's content
 */

_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 115);
Y.Node.prototype.horizMarginBorderPadding = function()
{
	_yuitest_coverfunc("build/gallery-dimensions/gallery-dimensions.js", "horizMarginBorderPadding", 115);
_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 117);
return Y.Array.reduce(the_horiz_styles, 0, function(w, style)
	{
		_yuitest_coverfunc("build/gallery-dimensions/gallery-dimensions.js", "(anonymous 2)", 117);
_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 119);
return w + this.parseDimensionStyle(style);
	},
	this);
};

/**********************************************************************
 * @method vertMarginBorderPadding
 * @return {Number} the height of everything surrounding the element's content
 */

_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 129);
Y.Node.prototype.vertMarginBorderPadding = function()
{
	_yuitest_coverfunc("build/gallery-dimensions/gallery-dimensions.js", "vertMarginBorderPadding", 129);
_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 131);
return Y.Array.reduce(the_vert_styles, 0, function(h, style)
	{
		_yuitest_coverfunc("build/gallery-dimensions/gallery-dimensions.js", "(anonymous 3)", 131);
_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 133);
return h + this.parseDimensionStyle(style);
	},
	this);
};

/**********************************************************************
 * @method parseDimensionStyle
 * @param style {String} the style to parse
 * @return {Number} the size of the style in pixels
 */

_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 144);
Y.Node.prototype.parseDimensionStyle = function(
	/* string */	style)
{
	_yuitest_coverfunc("build/gallery-dimensions/gallery-dimensions.js", "parseDimensionStyle", 144);
_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 147);
var s = this.getComputedStyle(style);
	_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 148);
if (!s || !/^[0-9]/.test(s))	// ignore values like "medium"
	{
		_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 150);
return 0;
	}

	_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 153);
var v = parseFloat(s, 10);
	_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 154);
if (/em$/.test(s))
	{
		_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 156);
v *= Y.Node.emToPx(1);
	}

	_yuitest_coverline("build/gallery-dimensions/gallery-dimensions.js", 159);
return Math.round(v);
};


}, '@VERSION@', {"requires": ["node-style", "array-extras"]});
