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
_yuitest_coverage["build/gallery-datasource-async-function/gallery-datasource-async-function.js"].code=["YUI.add('gallery-datasource-async-function', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-datasource-async-function"," */","","/**********************************************************************"," * <p>Data source that calls an asynchronous function.</p>"," *"," * @main gallery-datasource-async-function"," * @class AsyncFunction"," * @namespace DataSource"," * @extends DataSource.Local"," * @constructor"," * @param config {Object}"," */","function AsyncFunctionDataSource()","{","	AsyncFunctionDataSource.superclass.constructor.apply(this, arguments);","}","","AsyncFunctionDataSource.NAME = \"asyncFunctionDataSource\";","","AsyncFunctionDataSource.ATTRS =","{","	/**","	 * <p>The function that will be called to retrieve the data.  This","	 * function is called with the DataSource as the scope and arguments","	 * (callback,request,ds,e).  The function must invoke callback, passing","	 * (error,response).</p>","	 *","	 * @attribute source","	 * @type {Function}","	 */","	source:","	{","		validator: Y.Lang.isFunction","	}","};","","Y.extend(AsyncFunctionDataSource, Y.DataSource.Local,","{","	/**","	 * Passes request to source. Fires <code>data</code> event when","	 * response is received asynchronously.","	 *","	 * @method _defRequestFn","	 * @param e {Event.Facade} Event Facade","	 * @param e.tId {Number} Unique transaction ID","	 * @param e.request {Object} The request","	 * @param e.callback {Object} The callback object","	 * @param e.callback.success {Function} Success handler","	 * @param e.callback.failure {Function} Failure handler","	 * @param e.cfg {Object} Configuration object","	 * @protected","	 */","	_defRequestFn: function(e)","	{","		var fn = this.get(\"source\"),","			payload = e.details[0];","","		function callback(error, response)		// NodeJS signature","		{","			if (error)","			{","				payload.error = error;","			}","			else if (response.data && response.meta)","			{","				payload.data = response.data;","				payload.meta = response.meta;","			}","			else","			{","				payload.data = response;","			}","","			this.fire('data', payload);","		}","","		if (fn)","		{","			try","			{","				fn(Y.bind(callback, this), e.request, this, e);","			}","			catch (ex)","			{","				payload.error = ex;","				this.fire('data', payload);","			}","		}","		else","		{","			payload.error = new Error('Function was not configured for AsyncFunctionDataSource');","			this.fire('data', payload);","		}","","		return e.tId;","	}","});","","Y.DataSource.AsyncFunction = AsyncFunctionDataSource;","","","}, '@VERSION@', {\"requires\": [\"datasource-local\"]});"];
_yuitest_coverage["build/gallery-datasource-async-function/gallery-datasource-async-function.js"].lines = {"1":0,"3":0,"19":0,"21":0,"24":0,"26":0,"43":0,"61":0,"64":0,"66":0,"68":0,"70":0,"72":0,"73":0,"77":0,"80":0,"83":0,"85":0,"87":0,"91":0,"92":0,"97":0,"98":0,"101":0,"105":0};
_yuitest_coverage["build/gallery-datasource-async-function/gallery-datasource-async-function.js"].functions = {"AsyncFunctionDataSource:19":0,"callback:64":0,"_defRequestFn:59":0,"(anonymous 1):1":0};
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
	 * @param e {Event.Facade} Event Facade
	 * @param e.tId {Number} Unique transaction ID
	 * @param e.request {Object} The request
	 * @param e.callback {Object} The callback object
	 * @param e.callback.success {Function} Success handler
	 * @param e.callback.failure {Function} Failure handler
	 * @param e.cfg {Object} Configuration object
	 * @protected
	 */
	_defRequestFn: function(e)
	{
		_yuitest_coverfunc("build/gallery-datasource-async-function/gallery-datasource-async-function.js", "_defRequestFn", 59);
_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 61);
var fn = this.get("source"),
			payload = e.details[0];

		_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 64);
function callback(error, response)		// NodeJS signature
		{
			_yuitest_coverfunc("build/gallery-datasource-async-function/gallery-datasource-async-function.js", "callback", 64);
_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 66);
if (error)
			{
				_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 68);
payload.error = error;
			}
			else {_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 70);
if (response.data && response.meta)
			{
				_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 72);
payload.data = response.data;
				_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 73);
payload.meta = response.meta;
			}
			else
			{
				_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 77);
payload.data = response;
			}}

			_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 80);
this.fire('data', payload);
		}

		_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 83);
if (fn)
		{
			_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 85);
try
			{
				_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 87);
fn(Y.bind(callback, this), e.request, this, e);
			}
			catch (ex)
			{
				_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 91);
payload.error = ex;
				_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 92);
this.fire('data', payload);
			}
		}
		else
		{
			_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 97);
payload.error = new Error('Function was not configured for AsyncFunctionDataSource');
			_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 98);
this.fire('data', payload);
		}

		_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 101);
return e.tId;
	}
});

_yuitest_coverline("build/gallery-datasource-async-function/gallery-datasource-async-function.js", 105);
Y.DataSource.AsyncFunction = AsyncFunctionDataSource;


}, '@VERSION@', {"requires": ["datasource-local"]});
