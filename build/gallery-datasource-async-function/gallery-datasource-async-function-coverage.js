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
_yuitest_coverage["build/gallery-datasource-async-function/gallery-datasource-async-function.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-datasource-async-function/gallery-datasource-async-function.js",
    code: []
};
_yuitest_coverage["build/gallery-datasource-async-function/gallery-datasource-async-function.js"].code=["YUI.add('gallery-datasource-async-function', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-datasource-async-function"," */","","/**********************************************************************"," * <p>Data source that calls an asynchronous function.</p>"," *"," * @main gallery-datasource-async-function"," * @class AsyncFunction"," * @namespace DataSource"," * @extends DataSource.Local"," * @constructor"," * @param config {Object}"," */","function AsyncFunctionDataSource()","{","	AsyncFunctionDataSource.superclass.constructor.apply(this, arguments);","}","","AsyncFunctionDataSource.NAME = \"asyncFunctionDataSource\";","","AsyncFunctionDataSource.ATTRS =","{","	/**","	 * <p>The function that will be called to retrieve the data.  This","	 * function is called with the DataSource as the scope and arguments","	 * (callback,request,ds,e).  The function must invoke callback, passing","	 * (error,response).</p>","	 *","	 * @attribute source","	 * @type {Function}","	 */","	source:","	{","		validator: Y.Lang.isFunction","	}","};","","Y.extend(AsyncFunctionDataSource, Y.DataSource.Local,","{","	/**","	 * Passes request to source. Fires <code>data</code> event when","	 * response is received asynchronously.","	 *","	 * @method _defRequestFn","	 * @param e {Event.Facade} Event Facade with the following properties:","	 * <dl>","	 * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>","	 * <dt>request (Object)</dt> <dd>The request.</dd>","	 * <dt>callback (Object)</dt> <dd>The callback object with the following properties:","	 *     <dl>","	 *         <dt>success (Function)</dt> <dd>Success handler.</dd>","	 *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>","	 *     </dl>","	 * </dd>","	 * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>","	 * </dl>","	 * @protected","	 */","	_defRequestFn: function(e)","	{","		var fn = this.get(\"source\"),","			payload = e.details[0];","","		function callback(error, response)		// NodeJS signature","		{","			if (error)","			{","				payload.error = error;","			}","			else if (response.data && response.meta)","			{","				payload.data = response.data;","				payload.meta = response.meta;","			}","			else","			{","				payload.data = response;","			}","","			this.fire('data', payload);","		}","","		if (fn)","		{","			try","			{","				fn(Y.bind(callback, this), e.request, this, e);","			}","			catch (ex)","			{","				payload.error = ex;","				this.fire('data', payload);","			}","		}","		else","		{","			payload.error = new Error('Function was not configured for AsyncFunctionDataSource');","			this.fire('data', payload);","		}","","		return e.tId;","	}","});","","Y.DataSource.AsyncFunction = AsyncFunctionDataSource;","","","}, '@VERSION@', {\"requires\": [\"datasource-local\"]});"];
_yuitest_coverage["build/gallery-datasource-async-function/gallery-datasource-async-function.js"].lines = {"1":0,"3":0,"19":0,"21":0,"24":0,"26":0,"43":0,"66":0,"69":0,"71":0,"73":0,"75":0,"77":0,"78":0,"82":0,"85":0,"88":0,"90":0,"92":0,"96":0,"97":0,"102":0,"103":0,"106":0,"110":0};
_yuitest_coverage["build/gallery-datasource-async-function/gallery-datasource-async-function.js"].functions = {"AsyncFunctionDataSource:19":0,"callback:69":0,"_defRequestFn:64":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-datasource-async-function/gallery-datasource-async-function.js"].coveredLines = 25;
_yuitest_coverage["build/gallery-datasource-async-function/gallery-datasource-async-function.js"].coveredFunctions = 4;
_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 1);
YUI.add('gallery-datasource-async-function', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-datasource-async-function/gallery-datasource-async-function.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 3);
"use strict";

/**
 * @module gallery-datasource-async-function
 */

/**********************************************************************
 * <p>Data source that calls an asynchronous function.</p>
 *
 * @main gallery-datasource-async-function
 * @class AsyncFunction
 * @namespace DataSource
 * @extends DataSource.Local
 * @constructor
 * @param config {Object}
 */
_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 19);
function AsyncFunctionDataSource()
{
	_yuitest_coverfunc("build/gallery-datasource-async-function/gallery-datasource-async-function.js", "AsyncFunctionDataSource", 19);
_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 21);
AsyncFunctionDataSource.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 24);
AsyncFunctionDataSource.NAME = "asyncFunctionDataSource";

_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 26);
AsyncFunctionDataSource.ATTRS =
{
	/**
	 * <p>The function that will be called to retrieve the data.  This
	 * function is called with the DataSource as the scope and arguments
	 * (callback,request,ds,e).  The function must invoke callback, passing
	 * (error,response).</p>
	 *
	 * @attribute source
	 * @type {Function}
	 */
	source:
	{
		validator: Y.Lang.isFunction
	}
};

_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 43);
Y.extend(AsyncFunctionDataSource, Y.DataSource.Local,
{
	/**
	 * Passes request to source. Fires <code>data</code> event when
	 * response is received asynchronously.
	 *
	 * @method _defRequestFn
	 * @param e {Event.Facade} Event Facade with the following properties:
	 * <dl>
	 * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
	 * <dt>request (Object)</dt> <dd>The request.</dd>
	 * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
	 *     <dl>
	 *         <dt>success (Function)</dt> <dd>Success handler.</dd>
	 *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
	 *     </dl>
	 * </dd>
	 * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>
	 * </dl>
	 * @protected
	 */
	_defRequestFn: function(e)
	{
		_yuitest_coverfunc("build/gallery-datasource-async-function/gallery-datasource-async-function.js", "_defRequestFn", 64);
_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 66);
var fn = this.get("source"),
			payload = e.details[0];

		_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 69);
function callback(error, response)		// NodeJS signature
		{
			_yuitest_coverfunc("build/gallery-datasource-async-function/gallery-datasource-async-function.js", "callback", 69);
_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 71);
if (error)
			{
				_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 73);
payload.error = error;
			}
			else {_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 75);
if (response.data && response.meta)
			{
				_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 77);
payload.data = response.data;
				_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 78);
payload.meta = response.meta;
			}
			else
			{
				_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 82);
payload.data = response;
			}}

			_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 85);
this.fire('data', payload);
		}

		_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 88);
if (fn)
		{
			_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 90);
try
			{
				_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 92);
fn(Y.bind(callback, this), e.request, this, e);
			}
			catch (ex)
			{
				_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 96);
payload.error = ex;
				_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 97);
this.fire('data', payload);
			}
		}
		else
		{
			_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 102);
payload.error = new Error('Function was not configured for AsyncFunctionDataSource');
			_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 103);
this.fire('data', payload);
		}

		_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 106);
return e.tId;
	}
});

_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 110);
Y.DataSource.AsyncFunction = AsyncFunctionDataSource;


}, '@VERSION@', {"requires": ["datasource-local"]});
