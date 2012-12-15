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
_yuitest_coverage["build/gallery-mojito-rpc/gallery-mojito-rpc.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-mojito-rpc/gallery-mojito-rpc.js",
    code: []
};
_yuitest_coverage["build/gallery-mojito-rpc/gallery-mojito-rpc.js"].code=["YUI.add('gallery-mojito-rpc', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-mojito-rpc"," */","","/**********************************************************************"," * <p>RPC wrapper for Mojit proxy.  This allows you to use either"," * Y.RPC.JSON or Y.RPC.Mojito interchangeably.  The method in the Mojit"," * proxy receives the parameters as an array in <code>body.params</code>."," * You can pass this to the model as follows:"," * <code>model.getItems.apply(model,"," * ac.params.getFromBody().params)</code></p>"," *"," * @main gallery-mojito-rpc"," * @class Mojito"," * @namespace RPC"," * @constructor"," * @param config {Object}"," * @param config.url {Object} the mojit proxy (parameter named to match Y.jsonrpc)"," * @param config.methods {Array} (optional) method names, so you don't have to use `exec`"," */","","function MojitoRPC(config)","{","	this._mojit_proxy = config.url;","","	if (Y.Lang.isArray(config.methods))","	{","		Y.each(config.methods, Y.bind(MojitoRPC.addMethod, null, this));","	}","}","","/**"," * Adds the named method to the given rpc object."," * "," * @method addMethod"," * @static"," * @param rpc {RPC.Mojito} rpc object"," * @param name {String} name of method"," * @param force {Boolean} pass true to override existing method"," */","MojitoRPC.addMethod = function(rpc, name, force)","{","	if (rpc[name] && !force)","	{","		return;","	}","","	rpc[name] = function()","	{","		var args = Y.Array(arguments, 0, true),","			last = args[args.length - 1],","			callback;","","		if (Y.Lang.isFunction(last) ||","			(last && last.on && (last.on.success || last.on.failure)))","		{","			callback = args.pop();","		}","","		return this.exec(name, args, callback);","	};","};","","MojitoRPC.prototype =","{","	/**","	 * Executes the named method via the mojitProxy and invokes the callback","	 * when the result is received.","	 *","	 * @method exec","	 * @async","	 * @param method {String} the name of the function to execute via the mojitProxy","	 * @param params {Array} array of arguments for the method","	 * @param callback {Function|Object} (optional) function to call on success or object specifying {context,on:{success,failure}}","	 */","	exec: function(method, params, callback)","	{","		var p = { params: { body: { params: params } } };","","		if (Y.Lang.isFunction(callback))","		{","			callback = { on: { success: callback } };","		}","","		this._mojit_proxy.invoke(method, p, function(error, response)","		{","			var result =","			{","				id:     null,","				error:  null,","				result: response","			};","","			if (error && callback.on.failure)","			{","				result.error =","				{","					code:    -32000,","					message: error.message","				};","				callback.on.failure.call(callback.context, result);","			}","			else if (!error && callback)","			{","				callback.on.success.call(callback.context, result);","			}","		});","	}","};","","var RPC    = Y.namespace('RPC');","RPC.Mojito = MojitoRPC;","","/**"," * @method mojito"," * @static"," * @async"," * @param proxy {Object} the mojit proxy"," * @param method {String} the name of the function to execute via the mojitProxy"," * @param params {Array} array of arguments for the method"," * @param callback {Function|Object} (optional) function to call on success or object specifying {context,on:{success,failure}}"," * @param config {Object} config object passed to Y.RPC.Mojito constructo"," */","RPC.mojito = function(proxy, method, params, callback, config)","{","	if (proxy && method)","	{","		return new MojitoRPC(Y.mix({ url: proxy }, config))","			.exec(method, params, callback);","	}","};","","","}, '@VERSION@', {\"requires\": [\"oop\"]});"];
_yuitest_coverage["build/gallery-mojito-rpc/gallery-mojito-rpc.js"].lines = {"1":0,"3":0,"26":0,"28":0,"30":0,"32":0,"45":0,"47":0,"49":0,"52":0,"54":0,"58":0,"61":0,"64":0,"68":0,"82":0,"84":0,"86":0,"89":0,"91":0,"98":0,"100":0,"105":0,"107":0,"109":0,"115":0,"116":0,"128":0,"130":0,"132":0};
_yuitest_coverage["build/gallery-mojito-rpc/gallery-mojito-rpc.js"].functions = {"MojitoRPC:26":0,"]:52":0,"addMethod:45":0,"(anonymous 2):89":0,"exec:80":0,"mojito:128":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-mojito-rpc/gallery-mojito-rpc.js"].coveredLines = 30;
_yuitest_coverage["build/gallery-mojito-rpc/gallery-mojito-rpc.js"].coveredFunctions = 7;
_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 1);
YUI.add('gallery-mojito-rpc', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-mojito-rpc/gallery-mojito-rpc.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 3);
"use strict";

/**
 * @module gallery-mojito-rpc
 */

/**********************************************************************
 * <p>RPC wrapper for Mojit proxy.  This allows you to use either
 * Y.RPC.JSON or Y.RPC.Mojito interchangeably.  The method in the Mojit
 * proxy receives the parameters as an array in <code>body.params</code>.
 * You can pass this to the model as follows:
 * <code>model.getItems.apply(model,
 * ac.params.getFromBody().params)</code></p>
 *
 * @main gallery-mojito-rpc
 * @class Mojito
 * @namespace RPC
 * @constructor
 * @param config {Object}
 * @param config.url {Object} the mojit proxy (parameter named to match Y.jsonrpc)
 * @param config.methods {Array} (optional) method names, so you don't have to use `exec`
 */

_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 26);
function MojitoRPC(config)
{
	_yuitest_coverfunc("build/gallery-mojito-rpc/gallery-mojito-rpc.js", "MojitoRPC", 26);
_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 28);
this._mojit_proxy = config.url;

	_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 30);
if (Y.Lang.isArray(config.methods))
	{
		_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 32);
Y.each(config.methods, Y.bind(MojitoRPC.addMethod, null, this));
	}
}

/**
 * Adds the named method to the given rpc object.
 * 
 * @method addMethod
 * @static
 * @param rpc {RPC.Mojito} rpc object
 * @param name {String} name of method
 * @param force {Boolean} pass true to override existing method
 */
_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 45);
MojitoRPC.addMethod = function(rpc, name, force)
{
	_yuitest_coverfunc("build/gallery-mojito-rpc/gallery-mojito-rpc.js", "addMethod", 45);
_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 47);
if (rpc[name] && !force)
	{
		_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 49);
return;
	}

	_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 52);
rpc[name] = function()
	{
		_yuitest_coverfunc("build/gallery-mojito-rpc/gallery-mojito-rpc.js", "]", 52);
_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 54);
var args = Y.Array(arguments, 0, true),
			last = args[args.length - 1],
			callback;

		_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 58);
if (Y.Lang.isFunction(last) ||
			(last && last.on && (last.on.success || last.on.failure)))
		{
			_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 61);
callback = args.pop();
		}

		_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 64);
return this.exec(name, args, callback);
	};
};

_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 68);
MojitoRPC.prototype =
{
	/**
	 * Executes the named method via the mojitProxy and invokes the callback
	 * when the result is received.
	 *
	 * @method exec
	 * @async
	 * @param method {String} the name of the function to execute via the mojitProxy
	 * @param params {Array} array of arguments for the method
	 * @param callback {Function|Object} (optional) function to call on success or object specifying {context,on:{success,failure}}
	 */
	exec: function(method, params, callback)
	{
		_yuitest_coverfunc("build/gallery-mojito-rpc/gallery-mojito-rpc.js", "exec", 80);
_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 82);
var p = { params: { body: { params: params } } };

		_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 84);
if (Y.Lang.isFunction(callback))
		{
			_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 86);
callback = { on: { success: callback } };
		}

		_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 89);
this._mojit_proxy.invoke(method, p, function(error, response)
		{
			_yuitest_coverfunc("build/gallery-mojito-rpc/gallery-mojito-rpc.js", "(anonymous 2)", 89);
_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 91);
var result =
			{
				id:     null,
				error:  null,
				result: response
			};

			_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 98);
if (error && callback.on.failure)
			{
				_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 100);
result.error =
				{
					code:    -32000,
					message: error.message
				};
				_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 105);
callback.on.failure.call(callback.context, result);
			}
			else {_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 107);
if (!error && callback)
			{
				_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 109);
callback.on.success.call(callback.context, result);
			}}
		});
	}
};

_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 115);
var RPC    = Y.namespace('RPC');
_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 116);
RPC.Mojito = MojitoRPC;

/**
 * @method mojito
 * @static
 * @async
 * @param proxy {Object} the mojit proxy
 * @param method {String} the name of the function to execute via the mojitProxy
 * @param params {Array} array of arguments for the method
 * @param callback {Function|Object} (optional) function to call on success or object specifying {context,on:{success,failure}}
 * @param config {Object} config object passed to Y.RPC.Mojito constructo
 */
_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 128);
RPC.mojito = function(proxy, method, params, callback, config)
{
	_yuitest_coverfunc("build/gallery-mojito-rpc/gallery-mojito-rpc.js", "mojito", 128);
_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 130);
if (proxy && method)
	{
		_yuitest_coverline("build/gallery-mojito-rpc/gallery-mojito-rpc.js", 132);
return new MojitoRPC(Y.mix({ url: proxy }, config))
			.exec(method, params, callback);
	}
};


}, '@VERSION@', {"requires": ["oop"]});
