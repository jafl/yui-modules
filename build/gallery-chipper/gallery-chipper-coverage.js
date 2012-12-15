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
_yuitest_coverage["build/gallery-chipper/gallery-chipper.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-chipper/gallery-chipper.js",
    code: []
};
_yuitest_coverage["build/gallery-chipper/gallery-chipper.js"].code=["YUI.add('gallery-chipper', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-chipper"," */","","/**********************************************************************"," * <p>Destroys objects asynchronously.</p>"," * "," * @main gallery-chipper"," * @class Chipper"," */","","var list  = [],","	timer = null;","","function spinUp()","{","	if (!timer)","	{","		timer = Y.later(100, null, function()","		{","			if (list.length > 0)","			{","				var obj = list.pop();","				if (Y.Lang.isFunction(obj.destroy))","				{","					obj.destroy();","				}","			}","			else","			{","				timer.cancel();","				timer = null;","			}","		},","		null, true);","	}","}","","Y.Chipper =","{","	/**","	 * Throw objects into the chipper.  If an object does not implement","	 * destroy(), it is ignored.","	 * ","	 * @method destroy","	 * @static","	 * @param objs {Object/Array} The object(s) to destroy.","	 */","	destroy: function(","		/* object/array */	objs)","	{","		list = list.concat(objs);","		spinUp();","	}","};","","","}, '@VERSION@', {\"requires\": [\"yui-later\"]});"];
_yuitest_coverage["build/gallery-chipper/gallery-chipper.js"].lines = {"1":0,"3":0,"16":0,"19":0,"21":0,"23":0,"25":0,"27":0,"28":0,"30":0,"35":0,"36":0,"43":0,"56":0,"57":0};
_yuitest_coverage["build/gallery-chipper/gallery-chipper.js"].functions = {"(anonymous 2):23":0,"spinUp:19":0,"destroy:53":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-chipper/gallery-chipper.js"].coveredLines = 15;
_yuitest_coverage["build/gallery-chipper/gallery-chipper.js"].coveredFunctions = 4;
_yuitest_coverline("build/gallery-chipper/gallery-chipper.js", 1);
YUI.add('gallery-chipper', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-chipper/gallery-chipper.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-chipper/gallery-chipper.js", 3);
"use strict";

/**
 * @module gallery-chipper
 */

/**********************************************************************
 * <p>Destroys objects asynchronously.</p>
 * 
 * @main gallery-chipper
 * @class Chipper
 */

_yuitest_coverline("build/gallery-chipper/gallery-chipper.js", 16);
var list  = [],
	timer = null;

_yuitest_coverline("build/gallery-chipper/gallery-chipper.js", 19);
function spinUp()
{
	_yuitest_coverfunc("build/gallery-chipper/gallery-chipper.js", "spinUp", 19);
_yuitest_coverline("build/gallery-chipper/gallery-chipper.js", 21);
if (!timer)
	{
		_yuitest_coverline("build/gallery-chipper/gallery-chipper.js", 23);
timer = Y.later(100, null, function()
		{
			_yuitest_coverfunc("build/gallery-chipper/gallery-chipper.js", "(anonymous 2)", 23);
_yuitest_coverline("build/gallery-chipper/gallery-chipper.js", 25);
if (list.length > 0)
			{
				_yuitest_coverline("build/gallery-chipper/gallery-chipper.js", 27);
var obj = list.pop();
				_yuitest_coverline("build/gallery-chipper/gallery-chipper.js", 28);
if (Y.Lang.isFunction(obj.destroy))
				{
					_yuitest_coverline("build/gallery-chipper/gallery-chipper.js", 30);
obj.destroy();
				}
			}
			else
			{
				_yuitest_coverline("build/gallery-chipper/gallery-chipper.js", 35);
timer.cancel();
				_yuitest_coverline("build/gallery-chipper/gallery-chipper.js", 36);
timer = null;
			}
		},
		null, true);
	}
}

_yuitest_coverline("build/gallery-chipper/gallery-chipper.js", 43);
Y.Chipper =
{
	/**
	 * Throw objects into the chipper.  If an object does not implement
	 * destroy(), it is ignored.
	 * 
	 * @method destroy
	 * @static
	 * @param objs {Object/Array} The object(s) to destroy.
	 */
	destroy: function(
		/* object/array */	objs)
	{
		_yuitest_coverfunc("build/gallery-chipper/gallery-chipper.js", "destroy", 53);
_yuitest_coverline("build/gallery-chipper/gallery-chipper.js", 56);
list = list.concat(objs);
		_yuitest_coverline("build/gallery-chipper/gallery-chipper.js", 57);
spinUp();
	}
};


}, '@VERSION@', {"requires": ["yui-later"]});
