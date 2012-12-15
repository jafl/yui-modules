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
_yuitest_coverage["build/gallery-busyoverlay/gallery-busyoverlay.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-busyoverlay/gallery-busyoverlay.js",
    code: []
};
_yuitest_coverage["build/gallery-busyoverlay/gallery-busyoverlay.js"].code=["YUI.add('gallery-busyoverlay', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-busyoverlay"," */","","/**"," * A plugin for Y.Node or Y.Widget that creates an overlaying div."," * Especially useful for a widget that is waiting for an AJAX response."," * "," * @main gallery-busyoverlay"," * @class BusyOverlay"," * @namespace Plugin"," * @extends Plugin.Base"," * @constructor"," * @param config {Object} configuration"," */","function BusyOverlayPlugin(config)","{","	BusyOverlayPlugin.superclass.constructor.apply(this, arguments);","}","","BusyOverlayPlugin.NAME = \"BusyOverlayPlugin\";","BusyOverlayPlugin.NS   = \"busy\";","","BusyOverlayPlugin.ATTRS =","{","	/**","	 * CSS class to apply to the overlay.","	 *","	 * @attribute css","	 * @type {String}","	 * @default \"yui3-component-busy\"","	 */","	css:","	{","		value:     'yui3-component-busy',","		validator: Y.Lang.isString","	}","};","","function resizeOverlay()","{","	var r = this.getTargetNode().get('region');","	if (r &&","		(!this.target_region                    ||","		 r.top    !== this.target_region.top    ||","		 r.bottom !== this.target_region.bottom ||","		 r.left   !== this.target_region.left   ||","		 r.right  !== this.target_region.right))","	{","		this.target_region = r;","","		this.o.setXY([r.left, r.top]);","		this.o.setStyle('width',  r.width  + 'px');","		this.o.setStyle('height', r.height + 'px');","	}","}","","Y.extend(BusyOverlayPlugin, Y.Plugin.Base,","{","	initializer: function(config)","	{","		this.o = Y.Node.create('<div style=\"position:absolute;display:none;visibility:hidden;\"></div>');","		this.o.set('className', this.get('css'));","		this.getTargetNode().get('parentNode').appendChild(this.o);","","		this.on('cssChange', function(e)","		{","			this.o.set('className', e.newVal);","		});","	},","","	destructor: function()","	{","		this.o.remove(true);","	},","","	/**","	 * @method isVisible","	 * @return {Boolean} true if the overlay is visible","	 */","	isVisible: function()","	{","		return (this.o.getStyle('visibility') != 'hidden');","	},","","	/**","	 * Show the overlay.","	 * ","	 * @method show","	 */","	show: function()","	{","		this.setVisible(true);","	},","","	/**","	 * Hide the overlay.","	 * ","	 * @method hide","	 */","	hide: function()","	{","		this.setVisible(false);","	},","","	/**","	 * Toggle the visibility of the overlay.","	 * ","	 * @method toggleVisible","	 */","	toggleVisible: function()","	{","		this.setVisible(!this.isVisible());","	},","","	/**","	 * Set the visibility of the overlay.","	 * ","	 * @method setVisible","	 * @param visible {Boolean}","	 */","	setVisible: function(","		/* boolean */	visible)","	{","		this.target_region = null;","","		this.o.setStyle('display', (visible ? '' : 'none'));","		resizeOverlay.call(this);","		this.o.setStyle('visibility', (visible ? '' : 'hidden'));","","		if (visible)","		{","			if (!this.timer)","			{","				this.timer = Y.later(500, this, resizeOverlay, null, true);","			}","","			this.getTargetNode().addClass('yui3-busyoverlay-browser-hacks');","		}","		else","		{","			if (this.timer)","			{","				this.timer.cancel();","				this.timer = null;","			}","","			this.getTargetNode().removeClass('yui3-busyoverlay-browser-hacks');","		}","	},","","	/**","	 * @method getTargetNode","	 * @return {Node} node to overlay","	 */","	getTargetNode: function()","	{","		var host = this.get('host');","		return (Y.Widget && host instanceof Y.Widget ? host.get('boundingBox') : host);","	}","});","","Y.namespace(\"Plugin\");","Y.Plugin.BusyOverlay = BusyOverlayPlugin;","","","}, '@VERSION@', {\"skinnable\": \"true\", \"requires\": [\"plugin\", \"node-pluginhost\", \"node-screen\", \"node-style\"]});"];
_yuitest_coverage["build/gallery-busyoverlay/gallery-busyoverlay.js"].lines = {"1":0,"3":0,"20":0,"22":0,"25":0,"26":0,"28":0,"44":0,"46":0,"47":0,"54":0,"56":0,"57":0,"58":0,"62":0,"66":0,"67":0,"68":0,"70":0,"72":0,"78":0,"87":0,"97":0,"107":0,"117":0,"129":0,"131":0,"132":0,"133":0,"135":0,"137":0,"139":0,"142":0,"146":0,"148":0,"149":0,"152":0,"162":0,"163":0,"167":0,"168":0};
_yuitest_coverage["build/gallery-busyoverlay/gallery-busyoverlay.js"].functions = {"BusyOverlayPlugin:20":0,"resizeOverlay:44":0,"(anonymous 2):70":0,"initializer:64":0,"destructor:76":0,"isVisible:85":0,"show:95":0,"hide:105":0,"toggleVisible:115":0,"setVisible:126":0,"getTargetNode:160":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-busyoverlay/gallery-busyoverlay.js"].coveredLines = 41;
_yuitest_coverage["build/gallery-busyoverlay/gallery-busyoverlay.js"].coveredFunctions = 12;
_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 1);
YUI.add('gallery-busyoverlay', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-busyoverlay/gallery-busyoverlay.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 3);
"use strict";

/**
 * @module gallery-busyoverlay
 */

/**
 * A plugin for Y.Node or Y.Widget that creates an overlaying div.
 * Especially useful for a widget that is waiting for an AJAX response.
 * 
 * @main gallery-busyoverlay
 * @class BusyOverlay
 * @namespace Plugin
 * @extends Plugin.Base
 * @constructor
 * @param config {Object} configuration
 */
_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 20);
function BusyOverlayPlugin(config)
{
	_yuitest_coverfunc("build/gallery-busyoverlay/gallery-busyoverlay.js", "BusyOverlayPlugin", 20);
_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 22);
BusyOverlayPlugin.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 25);
BusyOverlayPlugin.NAME = "BusyOverlayPlugin";
_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 26);
BusyOverlayPlugin.NS   = "busy";

_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 28);
BusyOverlayPlugin.ATTRS =
{
	/**
	 * CSS class to apply to the overlay.
	 *
	 * @attribute css
	 * @type {String}
	 * @default "yui3-component-busy"
	 */
	css:
	{
		value:     'yui3-component-busy',
		validator: Y.Lang.isString
	}
};

_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 44);
function resizeOverlay()
{
	_yuitest_coverfunc("build/gallery-busyoverlay/gallery-busyoverlay.js", "resizeOverlay", 44);
_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 46);
var r = this.getTargetNode().get('region');
	_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 47);
if (r &&
		(!this.target_region                    ||
		 r.top    !== this.target_region.top    ||
		 r.bottom !== this.target_region.bottom ||
		 r.left   !== this.target_region.left   ||
		 r.right  !== this.target_region.right))
	{
		_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 54);
this.target_region = r;

		_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 56);
this.o.setXY([r.left, r.top]);
		_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 57);
this.o.setStyle('width',  r.width  + 'px');
		_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 58);
this.o.setStyle('height', r.height + 'px');
	}
}

_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 62);
Y.extend(BusyOverlayPlugin, Y.Plugin.Base,
{
	initializer: function(config)
	{
		_yuitest_coverfunc("build/gallery-busyoverlay/gallery-busyoverlay.js", "initializer", 64);
_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 66);
this.o = Y.Node.create('<div style="position:absolute;display:none;visibility:hidden;"></div>');
		_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 67);
this.o.set('className', this.get('css'));
		_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 68);
this.getTargetNode().get('parentNode').appendChild(this.o);

		_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 70);
this.on('cssChange', function(e)
		{
			_yuitest_coverfunc("build/gallery-busyoverlay/gallery-busyoverlay.js", "(anonymous 2)", 70);
_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 72);
this.o.set('className', e.newVal);
		});
	},

	destructor: function()
	{
		_yuitest_coverfunc("build/gallery-busyoverlay/gallery-busyoverlay.js", "destructor", 76);
_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 78);
this.o.remove(true);
	},

	/**
	 * @method isVisible
	 * @return {Boolean} true if the overlay is visible
	 */
	isVisible: function()
	{
		_yuitest_coverfunc("build/gallery-busyoverlay/gallery-busyoverlay.js", "isVisible", 85);
_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 87);
return (this.o.getStyle('visibility') != 'hidden');
	},

	/**
	 * Show the overlay.
	 * 
	 * @method show
	 */
	show: function()
	{
		_yuitest_coverfunc("build/gallery-busyoverlay/gallery-busyoverlay.js", "show", 95);
_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 97);
this.setVisible(true);
	},

	/**
	 * Hide the overlay.
	 * 
	 * @method hide
	 */
	hide: function()
	{
		_yuitest_coverfunc("build/gallery-busyoverlay/gallery-busyoverlay.js", "hide", 105);
_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 107);
this.setVisible(false);
	},

	/**
	 * Toggle the visibility of the overlay.
	 * 
	 * @method toggleVisible
	 */
	toggleVisible: function()
	{
		_yuitest_coverfunc("build/gallery-busyoverlay/gallery-busyoverlay.js", "toggleVisible", 115);
_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 117);
this.setVisible(!this.isVisible());
	},

	/**
	 * Set the visibility of the overlay.
	 * 
	 * @method setVisible
	 * @param visible {Boolean}
	 */
	setVisible: function(
		/* boolean */	visible)
	{
		_yuitest_coverfunc("build/gallery-busyoverlay/gallery-busyoverlay.js", "setVisible", 126);
_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 129);
this.target_region = null;

		_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 131);
this.o.setStyle('display', (visible ? '' : 'none'));
		_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 132);
resizeOverlay.call(this);
		_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 133);
this.o.setStyle('visibility', (visible ? '' : 'hidden'));

		_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 135);
if (visible)
		{
			_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 137);
if (!this.timer)
			{
				_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 139);
this.timer = Y.later(500, this, resizeOverlay, null, true);
			}

			_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 142);
this.getTargetNode().addClass('yui3-busyoverlay-browser-hacks');
		}
		else
		{
			_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 146);
if (this.timer)
			{
				_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 148);
this.timer.cancel();
				_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 149);
this.timer = null;
			}

			_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 152);
this.getTargetNode().removeClass('yui3-busyoverlay-browser-hacks');
		}
	},

	/**
	 * @method getTargetNode
	 * @return {Node} node to overlay
	 */
	getTargetNode: function()
	{
		_yuitest_coverfunc("build/gallery-busyoverlay/gallery-busyoverlay.js", "getTargetNode", 160);
_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 162);
var host = this.get('host');
		_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 163);
return (Y.Widget && host instanceof Y.Widget ? host.get('boundingBox') : host);
	}
});

_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 167);
Y.namespace("Plugin");
_yuitest_coverline("build/gallery-busyoverlay/gallery-busyoverlay.js", 168);
Y.Plugin.BusyOverlay = BusyOverlayPlugin;


}, '@VERSION@', {"skinnable": "true", "requires": ["plugin", "node-pluginhost", "node-screen", "node-style"]});
