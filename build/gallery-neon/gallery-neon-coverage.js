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
_yuitest_coverage["build/gallery-neon/gallery-neon.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-neon/gallery-neon.js",
    code: []
};
_yuitest_coverage["build/gallery-neon/gallery-neon.js"].code=["YUI.add('gallery-neon', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-neon"," */","","/**********************************************************************"," * Overrides Y.Node.show() to make it look like a flickering neon sign."," * "," * @main gallery-neon"," * @class Neon"," * @namespace Plugin"," * @extends Plugin.Base"," * @constructor"," * @param config {Object} configuration"," */","function Neon(","	/* object */ config)","{","	Neon.superclass.constructor.call(this, config);","}","","Neon.NAME = \"NeonPlugin\";","Neon.NS   = \"neon\";","","Neon.ATTRS =","{","	/**","	 * Background (starting) color.  Must be parseable by Y.Color.toRGB().","	 * ","	 * @attribute backgroundColor","	 * @type {String}","	 */","	backgroundColor:","	{","		validator: Y.Lang.isString","	},","","	/**","	 * Text (ending) color.  Must be parseable by Y.Color.toRGB().","	 * ","	 * @attribute textColor","	 * @type {String}","	 */","	textColor:","	{","		validator: Y.Lang.isString","	},","","	/**","	 * Text shadow *template* for setting text-shadow CSS3 property.  Use","	 * {color} to mark where color should be inserted.","	 * ","	 * @attribute textShadow","	 * @type {String}","	 */","	textShadow:","	{","		validator: Y.Lang.isString","	},","","	/**","	 * The number of flickers before the text stays visible.","	 * ","	 * @attribute flickerCount","	 * @type {int}","	 * @default 10","	 */","	flickerCount:","	{","		value:     10,","		validator: Y.Lang.isNumber","	},","","	/**","	 * The easing to apply to the color animation.","	 * ","	 * @attribute easing","	 * @type {Function}","	 * @default Y.Easing.easeIn","	 */","	easing:","	{","		value:     Y.Easing.easeIn,","		validator: Y.Lang.isFunction","	}","};","","function neonOff()","{","	Y.later(Math.round(Math.random()*1000/(this.flicker_max - this.flicker_count)), this, neonOn);","","	this.node.setStyle('display', 'none');","}","","function neonOn()","{","	this.flicker_count--;","	if (this.flicker_count > 0)","	{","		var fn = this.get('easing');","		var color =","		{","			r: fn(this.flicker_count, parseInt(this.end_color[1],10), this.start_color[1]-this.end_color[1], this.flicker_max),","			g: fn(this.flicker_count, parseInt(this.end_color[2],10), this.start_color[2]-this.end_color[2], this.flicker_max),","			b: fn(this.flicker_count, parseInt(this.end_color[3],10), this.start_color[3]-this.end_color[3], this.flicker_max)","		};","","		Y.later(Math.round(Math.random()*1000/this.flicker_count), this, neonOff);","	}","	else","	{","		var color =","		{","			r: this.end_color[1],","			g: this.end_color[2],","			b: this.end_color[3]","		};","	}","","	color = 'rgb('+Math.round(color.r)+','+Math.round(color.g)+','+Math.round(color.b)+')';","	this.node.setStyle('color', color);","","	var shadow = this.get('textShadow');","	if (shadow)","	{","		this.node.setStyle('textShadow', Y.Lang.sub(shadow, { color: Y.Color.toHex(color) }));","	}","","	this.node.setStyle('display', '');","","	if (this.flicker_count === 0)","	{","		this.node.fire('neon:finished');","	}","}","","function show()","{","	if (!this._isHidden())","	{","		return;","	}","","	var plugin           = this.neon;","	plugin.node          = this;","	plugin.flicker_max   = Math.max(0, plugin.get('flickerCount'));","	plugin.flicker_count = plugin.flicker_max;","	plugin.start_color   = Y.Color.re_RGB.exec(Y.Color.toRGB(plugin.get('backgroundColor')));","	plugin.end_color     = Y.Color.re_RGB.exec(Y.Color.toRGB(plugin.get('textColor')));","","	neonOn.call(plugin);","}","","Y.extend(Neon, Y.Plugin.Base,","{","	initializer: function(config)","	{","		var host       = this.get('host');","		this.orig_show = host.show;","		host.show      = show;","	},","","	destructor: function()","	{","		this.get('host').show = this.orig_show;","	}","});","","Y.namespace(\"Plugin\");","Y.Plugin.Neon = Neon;","","","}, '@VERSION@', {\"requires\": [\"node-style\", \"node-pluginhost\", \"anim-easing\", \"plugin\"]});"];
_yuitest_coverage["build/gallery-neon/gallery-neon.js"].lines = {"1":0,"3":0,"19":0,"22":0,"25":0,"26":0,"28":0,"91":0,"93":0,"95":0,"98":0,"100":0,"101":0,"103":0,"104":0,"111":0,"115":0,"123":0,"124":0,"126":0,"127":0,"129":0,"132":0,"134":0,"136":0,"140":0,"142":0,"144":0,"147":0,"148":0,"149":0,"150":0,"151":0,"152":0,"154":0,"157":0,"161":0,"162":0,"163":0,"168":0,"172":0,"173":0};
_yuitest_coverage["build/gallery-neon/gallery-neon.js"].functions = {"Neon:19":0,"neonOff:91":0,"neonOn:98":0,"show:140":0,"initializer:159":0,"destructor:166":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-neon/gallery-neon.js"].coveredLines = 42;
_yuitest_coverage["build/gallery-neon/gallery-neon.js"].coveredFunctions = 7;
_yuitest_coverline("build/gallery-neon/gallery-neon.js", 1);
YUI.add('gallery-neon', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-neon/gallery-neon.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-neon/gallery-neon.js", 3);
"use strict";

/**
 * @module gallery-neon
 */

/**********************************************************************
 * Overrides Y.Node.show() to make it look like a flickering neon sign.
 * 
 * @main gallery-neon
 * @class Neon
 * @namespace Plugin
 * @extends Plugin.Base
 * @constructor
 * @param config {Object} configuration
 */
_yuitest_coverline("build/gallery-neon/gallery-neon.js", 19);
function Neon(
	/* object */ config)
{
	_yuitest_coverfunc("build/gallery-neon/gallery-neon.js", "Neon", 19);
_yuitest_coverline("build/gallery-neon/gallery-neon.js", 22);
Neon.superclass.constructor.call(this, config);
}

_yuitest_coverline("build/gallery-neon/gallery-neon.js", 25);
Neon.NAME = "NeonPlugin";
_yuitest_coverline("build/gallery-neon/gallery-neon.js", 26);
Neon.NS   = "neon";

_yuitest_coverline("build/gallery-neon/gallery-neon.js", 28);
Neon.ATTRS =
{
	/**
	 * Background (starting) color.  Must be parseable by Y.Color.toRGB().
	 * 
	 * @attribute backgroundColor
	 * @type {String}
	 */
	backgroundColor:
	{
		validator: Y.Lang.isString
	},

	/**
	 * Text (ending) color.  Must be parseable by Y.Color.toRGB().
	 * 
	 * @attribute textColor
	 * @type {String}
	 */
	textColor:
	{
		validator: Y.Lang.isString
	},

	/**
	 * Text shadow *template* for setting text-shadow CSS3 property.  Use
	 * {color} to mark where color should be inserted.
	 * 
	 * @attribute textShadow
	 * @type {String}
	 */
	textShadow:
	{
		validator: Y.Lang.isString
	},

	/**
	 * The number of flickers before the text stays visible.
	 * 
	 * @attribute flickerCount
	 * @type {int}
	 * @default 10
	 */
	flickerCount:
	{
		value:     10,
		validator: Y.Lang.isNumber
	},

	/**
	 * The easing to apply to the color animation.
	 * 
	 * @attribute easing
	 * @type {Function}
	 * @default Y.Easing.easeIn
	 */
	easing:
	{
		value:     Y.Easing.easeIn,
		validator: Y.Lang.isFunction
	}
};

_yuitest_coverline("build/gallery-neon/gallery-neon.js", 91);
function neonOff()
{
	_yuitest_coverfunc("build/gallery-neon/gallery-neon.js", "neonOff", 91);
_yuitest_coverline("build/gallery-neon/gallery-neon.js", 93);
Y.later(Math.round(Math.random()*1000/(this.flicker_max - this.flicker_count)), this, neonOn);

	_yuitest_coverline("build/gallery-neon/gallery-neon.js", 95);
this.node.setStyle('display', 'none');
}

_yuitest_coverline("build/gallery-neon/gallery-neon.js", 98);
function neonOn()
{
	_yuitest_coverfunc("build/gallery-neon/gallery-neon.js", "neonOn", 98);
_yuitest_coverline("build/gallery-neon/gallery-neon.js", 100);
this.flicker_count--;
	_yuitest_coverline("build/gallery-neon/gallery-neon.js", 101);
if (this.flicker_count > 0)
	{
		_yuitest_coverline("build/gallery-neon/gallery-neon.js", 103);
var fn = this.get('easing');
		_yuitest_coverline("build/gallery-neon/gallery-neon.js", 104);
var color =
		{
			r: fn(this.flicker_count, parseInt(this.end_color[1],10), this.start_color[1]-this.end_color[1], this.flicker_max),
			g: fn(this.flicker_count, parseInt(this.end_color[2],10), this.start_color[2]-this.end_color[2], this.flicker_max),
			b: fn(this.flicker_count, parseInt(this.end_color[3],10), this.start_color[3]-this.end_color[3], this.flicker_max)
		};

		_yuitest_coverline("build/gallery-neon/gallery-neon.js", 111);
Y.later(Math.round(Math.random()*1000/this.flicker_count), this, neonOff);
	}
	else
	{
		_yuitest_coverline("build/gallery-neon/gallery-neon.js", 115);
var color =
		{
			r: this.end_color[1],
			g: this.end_color[2],
			b: this.end_color[3]
		};
	}

	_yuitest_coverline("build/gallery-neon/gallery-neon.js", 123);
color = 'rgb('+Math.round(color.r)+','+Math.round(color.g)+','+Math.round(color.b)+')';
	_yuitest_coverline("build/gallery-neon/gallery-neon.js", 124);
this.node.setStyle('color', color);

	_yuitest_coverline("build/gallery-neon/gallery-neon.js", 126);
var shadow = this.get('textShadow');
	_yuitest_coverline("build/gallery-neon/gallery-neon.js", 127);
if (shadow)
	{
		_yuitest_coverline("build/gallery-neon/gallery-neon.js", 129);
this.node.setStyle('textShadow', Y.Lang.sub(shadow, { color: Y.Color.toHex(color) }));
	}

	_yuitest_coverline("build/gallery-neon/gallery-neon.js", 132);
this.node.setStyle('display', '');

	_yuitest_coverline("build/gallery-neon/gallery-neon.js", 134);
if (this.flicker_count === 0)
	{
		_yuitest_coverline("build/gallery-neon/gallery-neon.js", 136);
this.node.fire('neon:finished');
	}
}

_yuitest_coverline("build/gallery-neon/gallery-neon.js", 140);
function show()
{
	_yuitest_coverfunc("build/gallery-neon/gallery-neon.js", "show", 140);
_yuitest_coverline("build/gallery-neon/gallery-neon.js", 142);
if (!this._isHidden())
	{
		_yuitest_coverline("build/gallery-neon/gallery-neon.js", 144);
return;
	}

	_yuitest_coverline("build/gallery-neon/gallery-neon.js", 147);
var plugin           = this.neon;
	_yuitest_coverline("build/gallery-neon/gallery-neon.js", 148);
plugin.node          = this;
	_yuitest_coverline("build/gallery-neon/gallery-neon.js", 149);
plugin.flicker_max   = Math.max(0, plugin.get('flickerCount'));
	_yuitest_coverline("build/gallery-neon/gallery-neon.js", 150);
plugin.flicker_count = plugin.flicker_max;
	_yuitest_coverline("build/gallery-neon/gallery-neon.js", 151);
plugin.start_color   = Y.Color.re_RGB.exec(Y.Color.toRGB(plugin.get('backgroundColor')));
	_yuitest_coverline("build/gallery-neon/gallery-neon.js", 152);
plugin.end_color     = Y.Color.re_RGB.exec(Y.Color.toRGB(plugin.get('textColor')));

	_yuitest_coverline("build/gallery-neon/gallery-neon.js", 154);
neonOn.call(plugin);
}

_yuitest_coverline("build/gallery-neon/gallery-neon.js", 157);
Y.extend(Neon, Y.Plugin.Base,
{
	initializer: function(config)
	{
		_yuitest_coverfunc("build/gallery-neon/gallery-neon.js", "initializer", 159);
_yuitest_coverline("build/gallery-neon/gallery-neon.js", 161);
var host       = this.get('host');
		_yuitest_coverline("build/gallery-neon/gallery-neon.js", 162);
this.orig_show = host.show;
		_yuitest_coverline("build/gallery-neon/gallery-neon.js", 163);
host.show      = show;
	},

	destructor: function()
	{
		_yuitest_coverfunc("build/gallery-neon/gallery-neon.js", "destructor", 166);
_yuitest_coverline("build/gallery-neon/gallery-neon.js", 168);
this.get('host').show = this.orig_show;
	}
});

_yuitest_coverline("build/gallery-neon/gallery-neon.js", 172);
Y.namespace("Plugin");
_yuitest_coverline("build/gallery-neon/gallery-neon.js", 173);
Y.Plugin.Neon = Neon;


}, '@VERSION@', {"requires": ["node-style", "node-pluginhost", "anim-easing", "plugin"]});
