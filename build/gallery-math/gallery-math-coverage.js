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
_yuitest_coverage["build/gallery-math/gallery-math.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-math/gallery-math.js",
    code: []
};
_yuitest_coverage["build/gallery-math/gallery-math.js"].code=["YUI.add('gallery-math', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-math"," */","","/**********************************************************************"," * <p>Augments built-in JavaScript Math namespace with additional"," * mathematical functions.</p>"," * "," * @main gallery-math"," * @class Math"," */","","Y.mix(Math,","{","	/**","	 * @method sign","	 * @static","	 * @return {Number} +1 if value > 0, -1 if value < 0, else zero","	 */","	sign: function(v)","	{","		return (v < 0 ? -1 : (v > 0 ? +1 : 0));","	},","","	/**","	 * @method add","	 * @static","	 * @return {Number} sum of all the arguments (either passed separately or as an array)","	 */","	add: function()","	{","		return Y.Array.reduce(Y.Array(arguments), 0, function(s, v)","		{","			if (Y.Lang.isArray(v))","			{","				v = Math.add.apply(this, v);","			}","","			return s + v;","		});","	},","","	/**","	 * @method addReciprocals","	 * @static","	 * @return {Number} sum of the reciprocals of all the arguments (either passed separately or as an array)","	 */","	addReciprocals: function()","	{","		return Y.Array.reduce(Y.Array(arguments), 0, function(s, v)","		{","			if (Y.Lang.isArray(v))","			{","				return s + Math.addReciprocals.apply(this, v);","			}","			else","			{","				return s + 1/v;","			}","		});","	},","","	/**","	 * @method parallel","	 * @static","	 * @return {Number} net value of N resistors in parallel (either passed separately or as an array)","	 */","	parallel: function()","	{","		return 1/Math.addReciprocals.apply(this, arguments);","	},","","	/**","	 * @method multiply","	 * @static","	 * @return {Number} product of all the arguments (either passed separately or as an array)","	 */","	multiply: function()","	{","		return Y.Array.reduce(Y.Array(arguments), 1, function(p, v)","		{","			if (Y.Lang.isArray(v))","			{","				v = Math.multiply.apply(this, v);","			}","","			return p * v;","		});","	},","","	/**","	 * @method degreesToRadians","	 * @static","	 * @param a {Number} angle in degrees","	 * @return {Number} angle in radians","	 */","	degreesToRadians: function(a)","	{","		return a * Math.PI / 180;","	},","","	/**","	 * @method radiansToDegrees","	 * @static","	 * @param a {Number} angle in radians","	 * @return {Number} angle in degrees","	 */","	radiansToDegrees: function(a)","	{","		return a * 180 / Math.PI;","	},","","	/**","	 * @method acosh","	 * @static","	 * @param v {Number}","	 * @return {Number} inverse hyperbolic cosine","	 */","	acosh: function(v)","	{","		return Math.log(v + Math.sqrt(v*v-1));","	},","","	/**","	 * @method asinh","	 * @static","	 * @param v {Number}","	 * @return {Number} inverse hyperbolic sine","	 */","	asinh: function(v)","	{","		return Math.log(v + Math.sqrt(v*v+1));","	},","","	/**","	 * @method atanh","	 * @static","	 * @param v {Number}","	 * @return {Number} inverse hyperbolic tangent","	 */","	atanh: function(v)","	{","		return Math.log((1+v)/(1-v))/2;","	},","","	/**","	 * @method cosh","	 * @static","	 * @param v {Number}","	 * @return {Number} hyperbolic cosine","	 */","	cosh: function(v)","	{","		var e = Math.exp(v);","		return (e + 1/e)/2;","	},","","	/**","	 * @method sinh","	 * @static","	 * @param v {Number}","	 * @return {Number} hyperbolic sine","	 */","	sinh: function(v)","	{","		var e = Math.exp(v);","		return (e - 1/e)/2;","	},","","	/**","	 * @method tanh","	 * @static","	 * @param v {Number}","	 * @return {Number} hyperbolic sine","	 */","	tanh: function(v)","	{","		var e = Math.exp(2*v);","		return (e - 1)/(e + 1);","	}","});","","","}, '@VERSION@', {\"requires\": [\"array-extras\"]});"];
_yuitest_coverage["build/gallery-math/gallery-math.js"].lines = {"1":0,"3":0,"17":0,"26":0,"36":0,"38":0,"40":0,"43":0,"54":0,"56":0,"58":0,"62":0,"74":0,"84":0,"86":0,"88":0,"91":0,"103":0,"114":0,"125":0,"136":0,"147":0,"158":0,"159":0,"170":0,"171":0,"182":0,"183":0};
_yuitest_coverage["build/gallery-math/gallery-math.js"].functions = {"sign:24":0,"(anonymous 2):36":0,"add:34":0,"(anonymous 3):54":0,"addReciprocals:52":0,"parallel:72":0,"(anonymous 4):84":0,"multiply:82":0,"degreesToRadians:101":0,"radiansToDegrees:112":0,"acosh:123":0,"asinh:134":0,"atanh:145":0,"cosh:156":0,"sinh:168":0,"tanh:180":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-math/gallery-math.js"].coveredLines = 28;
_yuitest_coverage["build/gallery-math/gallery-math.js"].coveredFunctions = 17;
_yuitest_coverline("build/gallery-math/gallery-math.js", 1);
YUI.add('gallery-math', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-math/gallery-math.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-math/gallery-math.js", 3);
"use strict";

/**
 * @module gallery-math
 */

/**********************************************************************
 * <p>Augments built-in JavaScript Math namespace with additional
 * mathematical functions.</p>
 * 
 * @main gallery-math
 * @class Math
 */

_yuitest_coverline("build/gallery-math/gallery-math.js", 17);
Y.mix(Math,
{
	/**
	 * @method sign
	 * @static
	 * @return {Number} +1 if value > 0, -1 if value < 0, else zero
	 */
	sign: function(v)
	{
		_yuitest_coverfunc("build/gallery-math/gallery-math.js", "sign", 24);
_yuitest_coverline("build/gallery-math/gallery-math.js", 26);
return (v < 0 ? -1 : (v > 0 ? +1 : 0));
	},

	/**
	 * @method add
	 * @static
	 * @return {Number} sum of all the arguments (either passed separately or as an array)
	 */
	add: function()
	{
		_yuitest_coverfunc("build/gallery-math/gallery-math.js", "add", 34);
_yuitest_coverline("build/gallery-math/gallery-math.js", 36);
return Y.Array.reduce(Y.Array(arguments), 0, function(s, v)
		{
			_yuitest_coverfunc("build/gallery-math/gallery-math.js", "(anonymous 2)", 36);
_yuitest_coverline("build/gallery-math/gallery-math.js", 38);
if (Y.Lang.isArray(v))
			{
				_yuitest_coverline("build/gallery-math/gallery-math.js", 40);
v = Math.add.apply(this, v);
			}

			_yuitest_coverline("build/gallery-math/gallery-math.js", 43);
return s + v;
		});
	},

	/**
	 * @method addReciprocals
	 * @static
	 * @return {Number} sum of the reciprocals of all the arguments (either passed separately or as an array)
	 */
	addReciprocals: function()
	{
		_yuitest_coverfunc("build/gallery-math/gallery-math.js", "addReciprocals", 52);
_yuitest_coverline("build/gallery-math/gallery-math.js", 54);
return Y.Array.reduce(Y.Array(arguments), 0, function(s, v)
		{
			_yuitest_coverfunc("build/gallery-math/gallery-math.js", "(anonymous 3)", 54);
_yuitest_coverline("build/gallery-math/gallery-math.js", 56);
if (Y.Lang.isArray(v))
			{
				_yuitest_coverline("build/gallery-math/gallery-math.js", 58);
return s + Math.addReciprocals.apply(this, v);
			}
			else
			{
				_yuitest_coverline("build/gallery-math/gallery-math.js", 62);
return s + 1/v;
			}
		});
	},

	/**
	 * @method parallel
	 * @static
	 * @return {Number} net value of N resistors in parallel (either passed separately or as an array)
	 */
	parallel: function()
	{
		_yuitest_coverfunc("build/gallery-math/gallery-math.js", "parallel", 72);
_yuitest_coverline("build/gallery-math/gallery-math.js", 74);
return 1/Math.addReciprocals.apply(this, arguments);
	},

	/**
	 * @method multiply
	 * @static
	 * @return {Number} product of all the arguments (either passed separately or as an array)
	 */
	multiply: function()
	{
		_yuitest_coverfunc("build/gallery-math/gallery-math.js", "multiply", 82);
_yuitest_coverline("build/gallery-math/gallery-math.js", 84);
return Y.Array.reduce(Y.Array(arguments), 1, function(p, v)
		{
			_yuitest_coverfunc("build/gallery-math/gallery-math.js", "(anonymous 4)", 84);
_yuitest_coverline("build/gallery-math/gallery-math.js", 86);
if (Y.Lang.isArray(v))
			{
				_yuitest_coverline("build/gallery-math/gallery-math.js", 88);
v = Math.multiply.apply(this, v);
			}

			_yuitest_coverline("build/gallery-math/gallery-math.js", 91);
return p * v;
		});
	},

	/**
	 * @method degreesToRadians
	 * @static
	 * @param a {Number} angle in degrees
	 * @return {Number} angle in radians
	 */
	degreesToRadians: function(a)
	{
		_yuitest_coverfunc("build/gallery-math/gallery-math.js", "degreesToRadians", 101);
_yuitest_coverline("build/gallery-math/gallery-math.js", 103);
return a * Math.PI / 180;
	},

	/**
	 * @method radiansToDegrees
	 * @static
	 * @param a {Number} angle in radians
	 * @return {Number} angle in degrees
	 */
	radiansToDegrees: function(a)
	{
		_yuitest_coverfunc("build/gallery-math/gallery-math.js", "radiansToDegrees", 112);
_yuitest_coverline("build/gallery-math/gallery-math.js", 114);
return a * 180 / Math.PI;
	},

	/**
	 * @method acosh
	 * @static
	 * @param v {Number}
	 * @return {Number} inverse hyperbolic cosine
	 */
	acosh: function(v)
	{
		_yuitest_coverfunc("build/gallery-math/gallery-math.js", "acosh", 123);
_yuitest_coverline("build/gallery-math/gallery-math.js", 125);
return Math.log(v + Math.sqrt(v*v-1));
	},

	/**
	 * @method asinh
	 * @static
	 * @param v {Number}
	 * @return {Number} inverse hyperbolic sine
	 */
	asinh: function(v)
	{
		_yuitest_coverfunc("build/gallery-math/gallery-math.js", "asinh", 134);
_yuitest_coverline("build/gallery-math/gallery-math.js", 136);
return Math.log(v + Math.sqrt(v*v+1));
	},

	/**
	 * @method atanh
	 * @static
	 * @param v {Number}
	 * @return {Number} inverse hyperbolic tangent
	 */
	atanh: function(v)
	{
		_yuitest_coverfunc("build/gallery-math/gallery-math.js", "atanh", 145);
_yuitest_coverline("build/gallery-math/gallery-math.js", 147);
return Math.log((1+v)/(1-v))/2;
	},

	/**
	 * @method cosh
	 * @static
	 * @param v {Number}
	 * @return {Number} hyperbolic cosine
	 */
	cosh: function(v)
	{
		_yuitest_coverfunc("build/gallery-math/gallery-math.js", "cosh", 156);
_yuitest_coverline("build/gallery-math/gallery-math.js", 158);
var e = Math.exp(v);
		_yuitest_coverline("build/gallery-math/gallery-math.js", 159);
return (e + 1/e)/2;
	},

	/**
	 * @method sinh
	 * @static
	 * @param v {Number}
	 * @return {Number} hyperbolic sine
	 */
	sinh: function(v)
	{
		_yuitest_coverfunc("build/gallery-math/gallery-math.js", "sinh", 168);
_yuitest_coverline("build/gallery-math/gallery-math.js", 170);
var e = Math.exp(v);
		_yuitest_coverline("build/gallery-math/gallery-math.js", 171);
return (e - 1/e)/2;
	},

	/**
	 * @method tanh
	 * @static
	 * @param v {Number}
	 * @return {Number} hyperbolic sine
	 */
	tanh: function(v)
	{
		_yuitest_coverfunc("build/gallery-math/gallery-math.js", "tanh", 180);
_yuitest_coverline("build/gallery-math/gallery-math.js", 182);
var e = Math.exp(2*v);
		_yuitest_coverline("build/gallery-math/gallery-math.js", 183);
return (e - 1)/(e + 1);
	}
});


}, '@VERSION@', {"requires": ["array-extras"]});
