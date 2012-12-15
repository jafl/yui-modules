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
_yuitest_coverage["build/gallery-anim-class/gallery-anim-class.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-anim-class/gallery-anim-class.js",
    code: []
};
_yuitest_coverage["build/gallery-anim-class/gallery-anim-class.js"].code=["YUI.add('gallery-anim-class', function (Y, NAME) {","","\"use strict\";","","/**********************************************************************"," * <p>Adds CSS class animation to `Y.Anim`, so you can specify `cssClass`"," * in `from` and/or `to`.  At the end of the animation, the `from` class is"," * replaced by the `to` class, and all the individual styles used during"," * the animation are removed.</p>"," * "," * <p>Explicit entries in `from` or `to` override values set by cssClass.</p>"," * "," * @module gallery-anim-class"," */","","var css_attribute =","[","	\"top\",\"bottom\",\"left\",\"right\",\"width\",\"height\",","	\"maxHeight\",\"maxWidth\",\"minHeight\",\"minWidth\",","","	\"color\",\"fontSize\",\"fontSizeAdjust\",\"fontWeight\",","	\"textIndent\",\"textShadow\",\"wordSpacing\",","","	\"backgroundColor\",\"backgroundPosition\",\"backgroundSize\",","	\"outlineColor\",\"outlineWidth\",","","	\"marginTop\",\"marginRight\",\"marginBottom\",\"marginLeft\",","","	\"borderTopWidth\",\"borderRightWidth\",\"borderBottomWidth\",\"borderLeftWidth\",","	\"borderTopLeftRadius\",\"borderTopRightRadius\",\"borderBottomLeftRadius\",\"borderBottomRightRadius\",","	\"borderTopColor\",\"borderRightColor\",\"borderBottomColor\",\"borderLeftColor\",","	\"borderSpacing\",","","	\"paddingTop\",\"paddingRight\",\"paddingBottom\",\"paddingLeft\",","","	\"zIndex\",\"opacity\",","","	\"boxShadow\",","	\"letterSpacing\",\"lineHeight\",","	\"markerOffset\",","	\"orphans\",\"widows\",","	\"size\",","","	\"fillOpacity\",","	\"outlineOffset\",","	\"floodColor\",\"floodOpacity\",\"lightingColor\",\"stopColor\",\"stopOpacity\",","	\"stroke\",\"strokeDashoffset\",\"strokeMiterlimit\",\"strokeOpacity\",\"strokeWidth\"","];","","function updateBehaviors()","{","	if (!Y.Anim.behaviors.outlineColor)","	{","		Y.Anim.behaviors.outlineColor = Y.Anim.behaviors.color;","	}","}","","function getStyles(node)","{","	return Y.map(css_attribute, function(attr)","	{","		return node.getStyle(attr);","	});","}","","function isValidAttributeValue(s)","{","	return /[#0-9]/.test(s);	// # covers colors like #AABBCC","}","","function initialState(node, from, to)","{","	if (to.cssClass)","	{","		node.removeClass(to.cssClass);","	}","	if (from.cssClass)","	{","		node.addClass(from.cssClass);","	}","}","","function finalState(node, from, to)","{","	if (from.cssClass)","	{","		node.removeClass(from.cssClass);","	}","	if (to.cssClass)","	{","		node.addClass(to.cssClass);","	}","}","","var orig_start = Y.Anim.prototype._start;","Y.Anim.prototype._start = function()","{","	var node = this.get('node'),","		from = this.get('from') || {},","		to   = this.get('to')   || {};","","	updateBehaviors();	// patch after anim extensions are loaded","","	delete this._class_diff_attr;","	if (from.cssClass || to.cssClass)","	{","		finalState(node, from, to);","		var new_style = getStyles(node);","","		// second, so initial state is correct in forward case","","		initialState(node, from, to);","		var orig_style = getStyles(node);","","		if (this.get('reverse'))","		{","			finalState(node, from, to);","		}","","		this._class_diff_attr =","		{","			fromClass: from.cssClass,","			from:      [],","			toClass:   to.cssClass,","			to:        []","		};","		Y.each(new_style, function(style, i)","		{","			var orig = orig_style[i];","			if (style !== orig)","			{","				var attr = css_attribute[i];","				if (!from[attr] && isValidAttributeValue(orig))","				{","					this._class_diff_attr.from.push(attr);","					from[attr] = orig;","				}","				if (!to[attr] && isValidAttributeValue(style))","				{","					this._class_diff_attr.to.push(attr);","					to[attr] = style;","				}","			}","		},","		this);","","		delete from.cssClass;","		this.set('from', from);","","		delete to.cssClass;","		this.set('to', to);","	}","","	orig_start.apply(this, arguments);","};","","var orig_runFrame = Y.Anim.prototype._runFrame;","Y.Anim.prototype._runFrame = function()","{","	// The first frame doesn't happen immediately, so _start() has to leave","	// the original class in place.","","	var reverse = this.get('reverse');","	if (!reverse && this._class_diff_attr && this._class_diff_attr.fromClass)","	{","		this.get('node').removeClass(this._class_diff_attr.fromClass);","	}","	else if (reverse && this._class_diff_attr && this._class_diff_attr.toClass)","	{","		this.get('node').removeClass(this._class_diff_attr.toClass);","	}","","	orig_runFrame.apply(this, arguments);","};","","var orig_end = Y.Anim.prototype._end;","Y.Anim.prototype._end = function()","{","	if (this._class_diff_attr)","	{","		var node = this.get('node'),","			from = this.get('from') || {},","			to   = this.get('to')   || {};","","		Y.each(this._class_diff_attr.from, function(attr)","		{","			delete from[attr];","		});","","		from.cssClass = this._class_diff_attr.fromClass;","		this.set('from', from);","","		Y.each(this._class_diff_attr.to, function(attr)","		{","			delete to[attr];","			node.setStyle(attr, '');","		});","","		to.cssClass = this._class_diff_attr.toClass;","		this.set('to', to);","","		if (this.get('reverse'))","		{","			initialState(node, from, to);","		}","		else","		{","			finalState(node, from, to);","		}","	}","","	orig_end.apply(this, arguments);","};","","","}, '@VERSION@', {\"requires\": [\"anim-base\", \"node-style\", \"gallery-funcprog\"], \"optional\": [\"\"]});"];
_yuitest_coverage["build/gallery-anim-class/gallery-anim-class.js"].lines = {"1":0,"3":0,"16":0,"50":0,"52":0,"54":0,"58":0,"60":0,"62":0,"66":0,"68":0,"71":0,"73":0,"75":0,"77":0,"79":0,"83":0,"85":0,"87":0,"89":0,"91":0,"95":0,"96":0,"98":0,"102":0,"104":0,"105":0,"107":0,"108":0,"112":0,"113":0,"115":0,"117":0,"120":0,"127":0,"129":0,"130":0,"132":0,"133":0,"135":0,"136":0,"138":0,"140":0,"141":0,"147":0,"148":0,"150":0,"151":0,"154":0,"157":0,"158":0,"163":0,"164":0,"166":0,"168":0,"170":0,"173":0,"176":0,"177":0,"179":0,"181":0,"185":0,"187":0,"190":0,"191":0,"193":0,"195":0,"196":0,"199":0,"200":0,"202":0,"204":0,"208":0,"212":0};
_yuitest_coverage["build/gallery-anim-class/gallery-anim-class.js"].functions = {"updateBehaviors:50":0,"(anonymous 2):60":0,"getStyles:58":0,"isValidAttributeValue:66":0,"initialState:71":0,"finalState:83":0,"(anonymous 3):127":0,"_start:96":0,"_runFrame:158":0,"(anonymous 4):185":0,"(anonymous 5):193":0,"_end:177":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-anim-class/gallery-anim-class.js"].coveredLines = 74;
_yuitest_coverage["build/gallery-anim-class/gallery-anim-class.js"].coveredFunctions = 13;
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 1);
YUI.add('gallery-anim-class', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-anim-class/gallery-anim-class.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 3);
"use strict";

/**********************************************************************
 * <p>Adds CSS class animation to `Y.Anim`, so you can specify `cssClass`
 * in `from` and/or `to`.  At the end of the animation, the `from` class is
 * replaced by the `to` class, and all the individual styles used during
 * the animation are removed.</p>
 * 
 * <p>Explicit entries in `from` or `to` override values set by cssClass.</p>
 * 
 * @module gallery-anim-class
 */

_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 16);
var css_attribute =
[
	"top","bottom","left","right","width","height",
	"maxHeight","maxWidth","minHeight","minWidth",

	"color","fontSize","fontSizeAdjust","fontWeight",
	"textIndent","textShadow","wordSpacing",

	"backgroundColor","backgroundPosition","backgroundSize",
	"outlineColor","outlineWidth",

	"marginTop","marginRight","marginBottom","marginLeft",

	"borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth",
	"borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius",
	"borderTopColor","borderRightColor","borderBottomColor","borderLeftColor",
	"borderSpacing",

	"paddingTop","paddingRight","paddingBottom","paddingLeft",

	"zIndex","opacity",

	"boxShadow",
	"letterSpacing","lineHeight",
	"markerOffset",
	"orphans","widows",
	"size",

	"fillOpacity",
	"outlineOffset",
	"floodColor","floodOpacity","lightingColor","stopColor","stopOpacity",
	"stroke","strokeDashoffset","strokeMiterlimit","strokeOpacity","strokeWidth"
];

_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 50);
function updateBehaviors()
{
	_yuitest_coverfunc("build/gallery-anim-class/gallery-anim-class.js", "updateBehaviors", 50);
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 52);
if (!Y.Anim.behaviors.outlineColor)
	{
		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 54);
Y.Anim.behaviors.outlineColor = Y.Anim.behaviors.color;
	}
}

_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 58);
function getStyles(node)
{
	_yuitest_coverfunc("build/gallery-anim-class/gallery-anim-class.js", "getStyles", 58);
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 60);
return Y.map(css_attribute, function(attr)
	{
		_yuitest_coverfunc("build/gallery-anim-class/gallery-anim-class.js", "(anonymous 2)", 60);
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 62);
return node.getStyle(attr);
	});
}

_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 66);
function isValidAttributeValue(s)
{
	_yuitest_coverfunc("build/gallery-anim-class/gallery-anim-class.js", "isValidAttributeValue", 66);
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 68);
return /[#0-9]/.test(s);	// # covers colors like #AABBCC
}

_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 71);
function initialState(node, from, to)
{
	_yuitest_coverfunc("build/gallery-anim-class/gallery-anim-class.js", "initialState", 71);
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 73);
if (to.cssClass)
	{
		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 75);
node.removeClass(to.cssClass);
	}
	_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 77);
if (from.cssClass)
	{
		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 79);
node.addClass(from.cssClass);
	}
}

_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 83);
function finalState(node, from, to)
{
	_yuitest_coverfunc("build/gallery-anim-class/gallery-anim-class.js", "finalState", 83);
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 85);
if (from.cssClass)
	{
		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 87);
node.removeClass(from.cssClass);
	}
	_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 89);
if (to.cssClass)
	{
		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 91);
node.addClass(to.cssClass);
	}
}

_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 95);
var orig_start = Y.Anim.prototype._start;
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 96);
Y.Anim.prototype._start = function()
{
	_yuitest_coverfunc("build/gallery-anim-class/gallery-anim-class.js", "_start", 96);
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 98);
var node = this.get('node'),
		from = this.get('from') || {},
		to   = this.get('to')   || {};

	_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 102);
updateBehaviors();	// patch after anim extensions are loaded

	_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 104);
delete this._class_diff_attr;
	_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 105);
if (from.cssClass || to.cssClass)
	{
		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 107);
finalState(node, from, to);
		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 108);
var new_style = getStyles(node);

		// second, so initial state is correct in forward case

		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 112);
initialState(node, from, to);
		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 113);
var orig_style = getStyles(node);

		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 115);
if (this.get('reverse'))
		{
			_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 117);
finalState(node, from, to);
		}

		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 120);
this._class_diff_attr =
		{
			fromClass: from.cssClass,
			from:      [],
			toClass:   to.cssClass,
			to:        []
		};
		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 127);
Y.each(new_style, function(style, i)
		{
			_yuitest_coverfunc("build/gallery-anim-class/gallery-anim-class.js", "(anonymous 3)", 127);
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 129);
var orig = orig_style[i];
			_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 130);
if (style !== orig)
			{
				_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 132);
var attr = css_attribute[i];
				_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 133);
if (!from[attr] && isValidAttributeValue(orig))
				{
					_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 135);
this._class_diff_attr.from.push(attr);
					_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 136);
from[attr] = orig;
				}
				_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 138);
if (!to[attr] && isValidAttributeValue(style))
				{
					_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 140);
this._class_diff_attr.to.push(attr);
					_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 141);
to[attr] = style;
				}
			}
		},
		this);

		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 147);
delete from.cssClass;
		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 148);
this.set('from', from);

		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 150);
delete to.cssClass;
		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 151);
this.set('to', to);
	}

	_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 154);
orig_start.apply(this, arguments);
};

_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 157);
var orig_runFrame = Y.Anim.prototype._runFrame;
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 158);
Y.Anim.prototype._runFrame = function()
{
	// The first frame doesn't happen immediately, so _start() has to leave
	// the original class in place.

	_yuitest_coverfunc("build/gallery-anim-class/gallery-anim-class.js", "_runFrame", 158);
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 163);
var reverse = this.get('reverse');
	_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 164);
if (!reverse && this._class_diff_attr && this._class_diff_attr.fromClass)
	{
		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 166);
this.get('node').removeClass(this._class_diff_attr.fromClass);
	}
	else {_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 168);
if (reverse && this._class_diff_attr && this._class_diff_attr.toClass)
	{
		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 170);
this.get('node').removeClass(this._class_diff_attr.toClass);
	}}

	_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 173);
orig_runFrame.apply(this, arguments);
};

_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 176);
var orig_end = Y.Anim.prototype._end;
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 177);
Y.Anim.prototype._end = function()
{
	_yuitest_coverfunc("build/gallery-anim-class/gallery-anim-class.js", "_end", 177);
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 179);
if (this._class_diff_attr)
	{
		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 181);
var node = this.get('node'),
			from = this.get('from') || {},
			to   = this.get('to')   || {};

		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 185);
Y.each(this._class_diff_attr.from, function(attr)
		{
			_yuitest_coverfunc("build/gallery-anim-class/gallery-anim-class.js", "(anonymous 4)", 185);
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 187);
delete from[attr];
		});

		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 190);
from.cssClass = this._class_diff_attr.fromClass;
		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 191);
this.set('from', from);

		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 193);
Y.each(this._class_diff_attr.to, function(attr)
		{
			_yuitest_coverfunc("build/gallery-anim-class/gallery-anim-class.js", "(anonymous 5)", 193);
_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 195);
delete to[attr];
			_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 196);
node.setStyle(attr, '');
		});

		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 199);
to.cssClass = this._class_diff_attr.toClass;
		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 200);
this.set('to', to);

		_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 202);
if (this.get('reverse'))
		{
			_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 204);
initialState(node, from, to);
		}
		else
		{
			_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 208);
finalState(node, from, to);
		}
	}

	_yuitest_coverline("build/gallery-anim-class/gallery-anim-class.js", 212);
orig_end.apply(this, arguments);
};


}, '@VERSION@', {"requires": ["anim-base", "node-style", "gallery-funcprog"], "optional": [""]});
