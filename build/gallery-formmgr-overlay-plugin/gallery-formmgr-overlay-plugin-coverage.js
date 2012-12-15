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
_yuitest_coverage["build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js",
    code: []
};
_yuitest_coverage["build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js"].code=["YUI.add('gallery-formmgr-overlay-plugin', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-formmgr-overlay-plugin"," */","","/**"," * A simple plugin for Y.Overlay which attaches a Y.FormManager to the"," * &lt;form&gt; inside the overlay.  Before the overlay is shown,"," * prepareForm() is called to insert the default values.  (If this returns"," * false, the overlay is not shown.)  After the overlay is shown, focus is"," * set to the first field."," *"," * @main gallery-formmgr-overlay-plugin"," * @class OverlayForm"," * @namespace Plugin"," * @extends Plugin.Base"," */","function OverlayFormPlugin()","{","	OverlayFormPlugin.superclass.constructor.apply(this, arguments);","}","","OverlayFormPlugin.NAME = \"OverlayFormPlugin\";","OverlayFormPlugin.NS   = \"form\";","","OverlayFormPlugin.ATTRS =","{","	/**","	 * @attribute formmgr","	 * @type {Y.FormManager}","	 * @writeonce","	 */","	formmgr:","	{","		writeOnce: true","	}","};","","Y.extend(OverlayFormPlugin, Y.Plugin.Base,","{","	initializer: function(config)","	{","		var f = this.get('host').get('contentBox').one('form');","		if (!f.get('name'))","		{","			f.set('name', Y.guid('form-overlay-'));","		}","		this.set('formmgr', new Y.FormManager(f.get('name')));","","		this.onHostEvent('visibleChange', function(e)","		{","			if (e.newVal &&		// visible","				!this.get('formmgr').prepareForm())","			{","				e.halt();","			}","		});","","		this.afterHostEvent('visibleChange', function(e)","		{","			if (e.newVal)	// visible","			{","				this.get('formmgr').initFocus();","			}","			else			// hidden","			{","				this.get('formmgr').clearForm();","			}","		});","	}","});","","Y.namespace(\"Plugin\");","Y.Plugin.OverlayForm = OverlayFormPlugin;","","","}, '@VERSION@', {\"requires\": [\"plugin\", \"overlay\", \"gallery-formmgr\"]});"];
_yuitest_coverage["build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js"].lines = {"1":0,"3":0,"21":0,"23":0,"26":0,"27":0,"29":0,"42":0,"46":0,"47":0,"49":0,"51":0,"53":0,"55":0,"58":0,"62":0,"64":0,"66":0,"70":0,"76":0,"77":0};
_yuitest_coverage["build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js"].functions = {"OverlayFormPlugin:21":0,"(anonymous 2):53":0,"(anonymous 3):62":0,"initializer:44":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js"].coveredLines = 21;
_yuitest_coverage["build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js"].coveredFunctions = 5;
_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 1);
YUI.add('gallery-formmgr-overlay-plugin', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 3);
"use strict";

/**
 * @module gallery-formmgr-overlay-plugin
 */

/**
 * A simple plugin for Y.Overlay which attaches a Y.FormManager to the
 * &lt;form&gt; inside the overlay.  Before the overlay is shown,
 * prepareForm() is called to insert the default values.  (If this returns
 * false, the overlay is not shown.)  After the overlay is shown, focus is
 * set to the first field.
 *
 * @main gallery-formmgr-overlay-plugin
 * @class OverlayForm
 * @namespace Plugin
 * @extends Plugin.Base
 */
_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 21);
function OverlayFormPlugin()
{
	_yuitest_coverfunc("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", "OverlayFormPlugin", 21);
_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 23);
OverlayFormPlugin.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 26);
OverlayFormPlugin.NAME = "OverlayFormPlugin";
_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 27);
OverlayFormPlugin.NS   = "form";

_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 29);
OverlayFormPlugin.ATTRS =
{
	/**
	 * @attribute formmgr
	 * @type {Y.FormManager}
	 * @writeonce
	 */
	formmgr:
	{
		writeOnce: true
	}
};

_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 42);
Y.extend(OverlayFormPlugin, Y.Plugin.Base,
{
	initializer: function(config)
	{
		_yuitest_coverfunc("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", "initializer", 44);
_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 46);
var f = this.get('host').get('contentBox').one('form');
		_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 47);
if (!f.get('name'))
		{
			_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 49);
f.set('name', Y.guid('form-overlay-'));
		}
		_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 51);
this.set('formmgr', new Y.FormManager(f.get('name')));

		_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 53);
this.onHostEvent('visibleChange', function(e)
		{
			_yuitest_coverfunc("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", "(anonymous 2)", 53);
_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 55);
if (e.newVal &&		// visible
				!this.get('formmgr').prepareForm())
			{
				_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 58);
e.halt();
			}
		});

		_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 62);
this.afterHostEvent('visibleChange', function(e)
		{
			_yuitest_coverfunc("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", "(anonymous 3)", 62);
_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 64);
if (e.newVal)	// visible
			{
				_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 66);
this.get('formmgr').initFocus();
			}
			else			// hidden
			{
				_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 70);
this.get('formmgr').clearForm();
			}
		});
	}
});

_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 76);
Y.namespace("Plugin");
_yuitest_coverline("build/gallery-formmgr-overlay-plugin/gallery-formmgr-overlay-plugin.js", 77);
Y.Plugin.OverlayForm = OverlayFormPlugin;


}, '@VERSION@', {"requires": ["plugin", "overlay", "gallery-formmgr"]});
