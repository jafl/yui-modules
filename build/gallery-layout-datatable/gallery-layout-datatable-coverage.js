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
_yuitest_coverage["build/gallery-layout-datatable/gallery-layout-datatable.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-layout-datatable/gallery-layout-datatable.js",
    code: []
};
_yuitest_coverage["build/gallery-layout-datatable/gallery-layout-datatable.js"].code=["YUI.add('gallery-layout-datatable', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-layout-datatable"," */","","/**********************************************************************"," * <p>Plugin for scrolling DataTable to make it fit inside a PageLayout"," * module.  After you plug it in, it automatically detects the PageLayout"," * module, so you don't have to do anything.</p>"," * "," * @main gallery-layout-datatable"," * @class PageLayoutDataTableModule"," * @namespace Plugin"," * @extends Plugin.Base"," * @constructor"," * @param config {Object} configuration"," */","","function PLDTModule(","	/* object */ config)","{","	PLDTModule.superclass.constructor.call(this, config);","}","","PLDTModule.NAME = \"PageLayoutDataTableModulePlugin\";","PLDTModule.NS   = \"layout\";","","PLDTModule.ATTRS =","{","	/**","	 * Instance of Y.PageLayout","	 * ","	 * @attribute layout","	 * @type {PageLayout}","	 * @required","	 * @writeonce","	 */","	layout:","	{","		value:     null,","		writeonce: true","	}","};","","Y.extend(PLDTModule, Y.Plugin.Base,","{","	initializer: function(config)","	{","		this.afterHostMethod('render', function()","		{","			var table  = this.get('host'),","				layout = this.get('layout'),","","				module_bd =","				table.get('boundingBox')","					 .ancestor('.' + Y.PageLayout.module_body_class);","","			module_bd.generateID();","","			layout.on('beforeResizeModule', function(e)","			{","				if (e.bd.get('id') == module_bd.get('id') && e.height == 'auto')","				{","					table.set('height', 'auto');","					table.set('scrollable', 'x');","				}","			});","","			layout.on('afterResizeModule', function(e)","			{","				if (e.bd.get('id') == module_bd.get('id'))","				{","					table.set('height', e.height+'px');","					table.set('scrollable', true);","				}","			});","		});","	}","});","","Y.namespace(\"Plugin\");","Y.Plugin.PageLayoutDataTableModule = PLDTModule;","","","}, '@VERSION@', {\"requires\": [\"gallery-layout\", \"datatable-scroll\", \"plugin\"]});"];
_yuitest_coverage["build/gallery-layout-datatable/gallery-layout-datatable.js"].lines = {"1":0,"3":0,"22":0,"25":0,"28":0,"29":0,"31":0,"48":0,"52":0,"54":0,"61":0,"63":0,"65":0,"67":0,"68":0,"72":0,"74":0,"76":0,"77":0,"84":0,"85":0};
_yuitest_coverage["build/gallery-layout-datatable/gallery-layout-datatable.js"].functions = {"PLDTModule:22":0,"(anonymous 3):63":0,"(anonymous 4):72":0,"(anonymous 2):52":0,"initializer:50":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-layout-datatable/gallery-layout-datatable.js"].coveredLines = 21;
_yuitest_coverage["build/gallery-layout-datatable/gallery-layout-datatable.js"].coveredFunctions = 6;
_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 1);
YUI.add('gallery-layout-datatable', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-layout-datatable/gallery-layout-datatable.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 3);
"use strict";

/**
 * @module gallery-layout-datatable
 */

/**********************************************************************
 * <p>Plugin for scrolling DataTable to make it fit inside a PageLayout
 * module.  After you plug it in, it automatically detects the PageLayout
 * module, so you don't have to do anything.</p>
 * 
 * @main gallery-layout-datatable
 * @class PageLayoutDataTableModule
 * @namespace Plugin
 * @extends Plugin.Base
 * @constructor
 * @param config {Object} configuration
 */

_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 22);
function PLDTModule(
	/* object */ config)
{
	_yuitest_coverfunc("build/gallery-layout-datatable/gallery-layout-datatable.js", "PLDTModule", 22);
_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 25);
PLDTModule.superclass.constructor.call(this, config);
}

_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 28);
PLDTModule.NAME = "PageLayoutDataTableModulePlugin";
_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 29);
PLDTModule.NS   = "layout";

_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 31);
PLDTModule.ATTRS =
{
	/**
	 * Instance of Y.PageLayout
	 * 
	 * @attribute layout
	 * @type {PageLayout}
	 * @required
	 * @writeonce
	 */
	layout:
	{
		value:     null,
		writeonce: true
	}
};

_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 48);
Y.extend(PLDTModule, Y.Plugin.Base,
{
	initializer: function(config)
	{
		_yuitest_coverfunc("build/gallery-layout-datatable/gallery-layout-datatable.js", "initializer", 50);
_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 52);
this.afterHostMethod('render', function()
		{
			_yuitest_coverfunc("build/gallery-layout-datatable/gallery-layout-datatable.js", "(anonymous 2)", 52);
_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 54);
var table  = this.get('host'),
				layout = this.get('layout'),

				module_bd =
				table.get('boundingBox')
					 .ancestor('.' + Y.PageLayout.module_body_class);

			_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 61);
module_bd.generateID();

			_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 63);
layout.on('beforeResizeModule', function(e)
			{
				_yuitest_coverfunc("build/gallery-layout-datatable/gallery-layout-datatable.js", "(anonymous 3)", 63);
_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 65);
if (e.bd.get('id') == module_bd.get('id') && e.height == 'auto')
				{
					_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 67);
table.set('height', 'auto');
					_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 68);
table.set('scrollable', 'x');
				}
			});

			_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 72);
layout.on('afterResizeModule', function(e)
			{
				_yuitest_coverfunc("build/gallery-layout-datatable/gallery-layout-datatable.js", "(anonymous 4)", 72);
_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 74);
if (e.bd.get('id') == module_bd.get('id'))
				{
					_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 76);
table.set('height', e.height+'px');
					_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 77);
table.set('scrollable', true);
				}
			});
		});
	}
});

_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 84);
Y.namespace("Plugin");
_yuitest_coverline("build/gallery-layout-datatable/gallery-layout-datatable.js", 85);
Y.Plugin.PageLayoutDataTableModule = PLDTModule;


}, '@VERSION@', {"requires": ["gallery-layout", "datatable-scroll", "plugin"]});
