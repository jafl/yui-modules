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
_yuitest_coverage["build/gallery-complexnumber/gallery-complexnumber.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-complexnumber/gallery-complexnumber.js",
    code: []
};
_yuitest_coverage["build/gallery-complexnumber/gallery-complexnumber.js"].code=["YUI.add('gallery-complexnumber', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-complexnumber"," */","","/**********************************************************************"," * Class for representing a complex number."," * "," * @class ComplexNumber"," * @constructor"," * @param real=0 {number} the real component"," * @param imag=0 {number} the imaginary component"," */","function ComplexNumber(real, imag)","{","	this.r = real || 0;","	this.i = imag || 0;","}","","/**"," * Construct a ComplexNumber from polar coordinates."," * "," * @method fromPolar"," * @static"," * @param magnitude {number}"," * @param phase {number}"," * @return ComplexNumber"," */","ComplexNumber.fromPolar = function(magnitude, phase)","{","	return new ComplexNumber(","		magnitude * Math.cos(phase),","		magnitude * Math.sin(phase));","};","","ComplexNumber.prototype =","{","	/**","	 * @method real","	 * @return {number} real component","	 */","	real: function()","	{","		return this.r;","	},","","	/**","	 * @method imag","	 * @return {number} imaginary component","	 */","	imag: function()","	{","		return this.i;","	},","","	/**","	 * @method magnitude","	 * @return {number} length of the vector in the complex plane","	 */","	magnitude: function()","	{","		return Math.sqrt(this.r*this.r + this.i*this.i);","	},","","	/**","	 * @method phase","	 * @return {number} angle of the vector (in radians) in the complex plane relative to the positive real axis","	 */","	phase: function()","	{","		return Math.atan2(this.i, this.r);","	},","","	/**","	 * Equivalent of += operator.","	 * ","	 * @method add","	 * @param v {number}","	 * @chainable","	 */","	add: function(v)","	{","		failIfConstant(this);","","		if (ComplexMath.isComplexNumber(v))","		{","			this.r += v.r;","			this.i += v.i;","		}","		else","		{","			this.r += v;","		}","","		return this;","	},","","	/**","	 * Equivalent of -= operator.","	 * ","	 * @method subtract","	 * @param v {number}","	 * @chainable","	 */","	subtract: function(v)","	{","		failIfConstant(this);","","		if (ComplexMath.isComplexNumber(v))","		{","			this.r -= v.r;","			this.i -= v.i;","		}","		else","		{","			this.r -= v;","		}","","		return this;","	},","","	/**","	 * Equivalent of *= operator.","	 * ","	 * @method multiply","	 * @param v {number}","	 * @chainable","	 */","	multiply: function(v)","	{","		failIfConstant(this);","","		if (ComplexMath.isComplexNumber(v))","		{","			var r = this.r*v.r - this.i*v.i;","			var i = this.r*v.i + this.i*v.r;","","			this.r = r;","			this.i = i;","		}","		else","		{","			this.r *= v;","			this.i *= v;","		}","","		return this;","	},","","	/**","	 * Equivalent of /= operator.","	 * ","	 * @method divide","	 * @chainable","	 * @param v {number}","	 */","	divide: function(v)","	{","		failIfConstant(this);","","		if (ComplexMath.isComplexNumber(v))","		{","			var x  = ComplexMath.divide(this, v);","			this.r = x.r;","			this.i = x.i;","		}","		else","		{","			this.r /= v;","			this.i /= v;","		}","","		return this;","	},","","	/**","	 * Equivalent of unary minus operator.","	 * ","	 * @method negate","	 * @chainable","	 */","	negate: function()","	{","		failIfConstant(this);","","		this.r = - this.r;","		this.i = - this.i;","","		return this;","	},","","	/**","	 * Negates the imaginary part.","	 * ","	 * @method conjugate","	 * @chainable","	 */","	conjugate: function()","	{","		failIfConstant(this);","","		this.i = - this.i;","","		return this;","	},","","	/**","	 * Rotates the number around the origin by the specified angle in radians.","	 * ","	 * @method rotate","	 * @chainable","	 * @param angle {number}","	 */","	rotate: function(","		/* float */	angle)","	{","		failIfConstant(this);","","		this.multiply(ComplexNumber.fromPolar(1, angle));","","		return this;","	},","","	toString: function()","	{","		function i(v)","		{","			return  v ===  1 ?  'i' :","					v === -1 ? '-i' :","					v + 'i';","		}","","		if (this.i === 0)","		{","			return this.r.toString();","		}","		else if (this.r === 0)","		{","			return i(this.i);","		}","		else","		{","			return this.r + (this.i > 0 ? '+' : '') + i(this.i);","		}","	}","};","","Y.ComplexNumber = ComplexNumber;","/**********************************************************************"," * Support for complex numbers."," *"," * @module gallery-complexnumber"," * @main gallery-complexnumber"," */","","/**"," * This collection of functions provides the complex number equivalent of"," * the built-in JavaScript Math namespace, along with the basic arithmetic"," * operations (since JavaScript does not support operator overloading)."," * "," * @class ComplexMath"," */","","function failIfConstant(v)","{","	if (v === ComplexMath.ZERO || v === ComplexMath.I)","	{","		throw Error('You cannot modify ZERO or I');","	}","}","","var ComplexMath =","{","	/**","	 * Zero.","	 * ","	 * @property ZERO","	 * @type {ComplexNumber}","	 * @static","	 * @final","	 */","	ZERO: new ComplexNumber(),","","	/**","	 * Square root of -1.","	 * ","	 * @property I","	 * @type {ComplexNumber}","	 * @static","	 * @final","	 */","	I: new ComplexNumber(0,1),","","	/**","	 * @method isComplexNumber","	 * @static","	 * @return {boolean} true if the argument is a ComplexNumber","	 */","	isComplexNumber: function(v)","	{","		return ((v instanceof ComplexNumber) ||","				(v.hasOwnProperty(\"r\") && v.hasOwnProperty(\"i\")));","	},","","	/**","	 * @method add","	 * @static","	 * @return {number} sum of all the arguments (either passed separately or as an array)","	 */","	add: function()","	{","		var s = new ComplexNumber();","		Y.Array.each(arguments, function(v)","		{","			if (Y.Lang.isArray(v))","			{","				v = ComplexMath.add.apply(this, v);","			}","","			s.add(v);","		});","","		return s;","	},","","	/**","	 * @method addReciprocals","	 * @static","	 * @return {number} sum of the reciprocals of all the arguments (either passed separately or as an array)","	 */","	addReciprocals: function()","	{","		var s = new ComplexNumber();","		Y.Array.each(arguments, function(v)","		{","			if (Y.Lang.isArray(v))","			{","				s.add(ComplexMath.addReciprocals.apply(this, v));","			}","			else","			{","				s.add(ComplexMath.divide(1,v));","			}","		});","","		return s;","	},","","	/**","	 * @method parallel","	 * @static","	 * @return {number} net value of N impedances in parallel (either passed separately or as an array)","	 */","	parallel: function()","	{","		return ComplexMath.divide(1, ComplexMath.addReciprocals.apply(this, arguments));","	},","","	/**","	 * @method subtract","	 * @static","	 * @param v1 {number}","	 * @param v2 {number}","	 * @return {number} v1-v2","	 */","	subtract: function(v1, v2)","	{","		var c1 = ComplexMath.isComplexNumber(v1),","			c2 = ComplexMath.isComplexNumber(v2);","		if (c1 && c2)","		{","			return new ComplexNumber(v1.r-v2.r, v1.i-v2.i);","		}","		else if (c1)","		{","			return new ComplexNumber(v1.r-v2, v1.i);","		}","		else if (c2)","		{","			return new ComplexNumber(v1-v2.r, -v2.i);","		}","		else","		{","			return new ComplexNumber(v1-v2, 0);","		}","	},","","	/**","	 * @method multiply","	 * @static","	 * @return {number} product of all the arguments (either passed separately or as an array)","	 */","	multiply: function()","	{","		var s = new ComplexNumber(1, 0);","		Y.Array.each(arguments, function(v)","		{","			if (Y.Lang.isArray(v))","			{","				v = ComplexMath.multiply.apply(this, v);","			}","","			s.multiply(v);","		});","","		return s;","	},","","	/**","	 * @method divide","	 * @static","	 * @param v1 {number}","	 * @param v2 {number}","	 * @return {number} v1/v2","	 */","	divide: function(v1, v2)","	{","		var c1 = ComplexMath.isComplexNumber(v1),","			c2 = ComplexMath.isComplexNumber(v2);","		if (c1 && c2)","		{","			var d = v2.r*v2.r + v2.i*v2.i;","			return new ComplexNumber(","				(v1.r*v2.r + v1.i*v2.i)/d,","				(v1.i*v2.r - v1.r*v2.i)/d);","		}","		else if (c1)","		{","			return new ComplexNumber(v1.r/v2, v1.i/v2);","		}","		else if (c2)","		{","			var d = v2.r*v2.r + v2.i*v2.i;","			return new ComplexNumber((v1*v2.r)/d, (-v1*v2.i)/d);","		}","		else","		{","			return new ComplexNumber(v1/v2, 0);","		}","	},","","	/**","	 * @method negative","	 * @static","	 * @param v {number}","	 * @return {number} negative of the argument","	 */","	negative: function(v)","	{","		if (ComplexMath.isComplexNumber(v))","		{","			return new ComplexNumber(-v.r, -v.i);","		}","		else","		{","			return new ComplexNumber(-v, 0);","		}","	},","","	/**","	 * @method abs","	 * @static","	 * @param v {number}","	 * @return {number} absolute value (magnitude) of the argument","	 */","	abs: function(v)","	{","		if (ComplexMath.isComplexNumber(v))","		{","			return new ComplexNumber(Math.sqrt(v.r*v.r + v.i*v.i), 0);","		}","		else","		{","			return new ComplexNumber(Math.abs(v), 0);","		}","	},","","	/**","	 * @method phase","	 * @static","	 * @param v {number}","	 * @return {number} phase of the argument","	 */","	phase: function(v)","	{","		if (ComplexMath.isComplexNumber(v))","		{","			return new ComplexNumber(Math.atan2(v.i, v.r), 0);","		}","		else","		{","			return new ComplexNumber();","		}","	},","","	/**","	 * @method conjugate","	 * @static","	 * @param v {number}","	 * @return {number} complex conjugate of the argument","	 */","	conjugate: function(v)","	{","		if (ComplexMath.isComplexNumber(v))","		{","			return new ComplexNumber(v.r, -v.i);","		}","		else","		{","			return new ComplexNumber(v, 0);","		}","	},","","	/**","	 * @method rotate","	 * @static","	 * @param v {number}","	 * @param a {number} angle in radians","	 * @return {number} phase of the argument","	 */","	rotate: function(v,a)","	{","		return ComplexMath.multiply(v, ComplexNumber.fromPolar(1, a));","	},","","	/**","	 * @method acosh","	 * @static","	 * @param v {number}","	 * @return {number} inverse hyperbolic cosine of the argument","	 */","	acosh: function(v)","	{","		if (ComplexMath.isComplexNumber(v))","		{","			return ComplexMath.log(","				ComplexMath.add(v,","					ComplexMath.multiply(","						ComplexMath.sqrt(new ComplexNumber(v.r+1, v.i)),","						ComplexMath.sqrt(new ComplexNumber(v.r-1, v.i)))));","		}","		else","		{","			return new ComplexNumber(Math.acosh(v), 0);","		}","	},","","	/**","	 * @method asinh","	 * @static","	 * @param v {number}","	 * @return {number} inverse hyperbolic sine of the argument","	 */","	asinh: function(v)","	{","		if (ComplexMath.isComplexNumber(v))","		{","			var v1 = ComplexMath.multiply(v,v);","			return ComplexMath.log(","				ComplexMath.add(v,","					ComplexMath.sqrt(new ComplexNumber(v1.r+1, v1.i))));","		}","		else","		{","			return new ComplexNumber(Math.asinh(v), 0);","		}","	},","","	/**","	 * @method atanh","	 * @static","	 * @param v {number}","	 * @return {number} inverse hyperbolic tangent of the argument","	 */","	atanh: function(v)","	{","		if (ComplexMath.isComplexNumber(v))","		{","			var v1 = ComplexMath.subtract(","				ComplexMath.log(new ComplexNumber(1+v.r,  v.i)),","				ComplexMath.log(new ComplexNumber(1-v.r, -v.i)));","			return new ComplexNumber(v1.r/2, v1.i/2);","		}","		else","		{","			return new ComplexNumber(Math.atanh(v), 0);","		}","	},","","	/**","	 * @method cos","	 * @static","	 * @param v {number}","	 * @return {number} cosine of the argument","	 */","	cos: function(v)","	{","		if (ComplexMath.isComplexNumber(v))","		{","			return new ComplexNumber(","				 Math.cos(v.r)*Math.cosh(v.i),","				-Math.sin(v.r)*Math.sinh(v.i));","		}","		else","		{","			return new ComplexNumber(Math.cos(v), 0);","		}","	},","","	/**","	 * @method cosh","	 * @static","	 * @param v {number}","	 * @return {number} hyperbolic cosine of the argument","	 */","	cosh: function(v)","	{","		if (ComplexMath.isComplexNumber(v))","		{","			var v1 = ComplexMath.add(","				ComplexMath.exp(v),","				ComplexMath.exp(new ComplexNumber(-v.r, -v.i)));","			return new ComplexNumber(v1.r/2, v1.i/2);","		}","		else","		{","			return new ComplexNumber(Math.cosh(v), 0);","		}","	},","","	/**","	 * @method exp","	 * @static","	 * @param v {number}","	 * @return {number} e raised to the argument","	 */","	exp: function(v)","	{","		if (ComplexMath.isComplexNumber(v))","		{","			var v1 = new ComplexNumber(Math.cos(v.i), Math.sin(v.i));","			v1.multiply(Math.exp(v.r));","			return v1;","		}","		else","		{","			return new ComplexNumber(Math.exp(v), 0);","		}","	},","","	/**","	 * @method log","	 * @static","	 * @param v {number}","	 * @return {number} natural logarithm of the argument","	 */","	log: function(v)","	{","		if (ComplexMath.isComplexNumber(v))","		{","			return new ComplexNumber(Math.log(v.magnitude()), v.phase());","		}","		else","		{","			return new ComplexNumber(Math.log(v), 0);","		}","	},","","	/**","	 * @method pow","	 * @static","	 * @param v {number} value","	 * @param e {number} exponent","	 * @return {number} value raised to the exponent","	 */","	pow: function(v, e)","	{","		var c1 = ComplexMath.isComplexNumber(v);","		if ((c1 && v.r === 0 && v.i === 0) || (!c1 && v === 0))","		{","			var c2 = ComplexMath.isComplexNumber(e);","			if ((c2 && e.r === 0 && e.i === 0) || (!c2 && e === 0))","			{","				return new ComplexNumber(1);	// 0 ^ 0","			}","			else","			{","				return new ComplexNumber();		// 0 ^ x, x != 0","			}","		}","		else","		{","			return ComplexMath.exp(ComplexMath.multiply(ComplexMath.log(v), e));","		}","	},","","	/**","	 * @method sin","	 * @static","	 * @param v {number}","	 * @return {number} sine of the argument","	 */","	sin: function(v)","	{","		if (ComplexMath.isComplexNumber(v))","		{","			return new ComplexNumber(","				Math.sin(v.r)*Math.cosh(v.i),","				Math.cos(v.r)*Math.sinh(v.i));","		}","		else","		{","			return new ComplexNumber(Math.sin(v), 0);","		}","	},","","	/**","	 * @method sinh","	 * @static","	 * @param v {number}","	 * @return {number} hyperbolic sine of the argument","	 */","	sinh: function(v)","	{","		if (ComplexMath.isComplexNumber(v))","		{","			var v1 = ComplexMath.subtract(","				ComplexMath.exp(v),","				ComplexMath.exp(new ComplexNumber(-v.r, -v.i)));","			return new ComplexNumber(v1.r/2, v1.i/2);","		}","		else","		{","			return new ComplexNumber(Math.sinh(v), 0);","		}","	},","","	/**","	 * @method sqrt","	 * @static","	 * @param v {number}","	 * @return {number} square root of the argument","	 */","	sqrt: function(v)","	{","		var c = ComplexMath.isComplexNumber(v);","		return ComplexNumber.fromPolar(","			Math.sqrt(c ? v.magnitude() : Math.abs(v)),","			(c ? v.phase() : v < 0 ? Math.PI : 0) / 2);","	},","","	/**","	 * @method tan","	 * @static","	 * @param v {number}","	 * @return {number} tangent of the argument","	 */","	tan: function(v)","	{","		if (ComplexMath.isComplexNumber(v))","		{","			return ComplexMath.divide(ComplexMath.sin(v), ComplexMath.cos(v));","		}","		else","		{","			return new ComplexNumber(Math.tan(v), 0);","		}","	},","","	/**","	 * @method tanh","	 * @static","	 * @param v {number}","	 * @return {number} hyperbolic tangent of the argument","	 */","	tanh: function(v)","	{","		if (ComplexMath.isComplexNumber(v))","		{","			var e = ComplexMath.exp(new ComplexNumber(2*v.r, 2*v.i));","			return ComplexMath.divide(","				new ComplexNumber(e.r-1, e.i),","				new ComplexNumber(e.r+1, e.i));","		}","		else","		{","			return new ComplexNumber(Math.tanh(v), 0);","		}","	}","};","","Y.ComplexMath = ComplexMath;","","","}, '@VERSION@', {\"requires\": [\"gallery-math\"]});"];
_yuitest_coverage["build/gallery-complexnumber/gallery-complexnumber.js"].lines = {"1":0,"3":0,"17":0,"19":0,"20":0,"32":0,"34":0,"39":0,"47":0,"56":0,"65":0,"74":0,"86":0,"88":0,"90":0,"91":0,"95":0,"98":0,"110":0,"112":0,"114":0,"115":0,"119":0,"122":0,"134":0,"136":0,"138":0,"139":0,"141":0,"142":0,"146":0,"147":0,"150":0,"162":0,"164":0,"166":0,"167":0,"168":0,"172":0,"173":0,"176":0,"187":0,"189":0,"190":0,"192":0,"203":0,"205":0,"207":0,"220":0,"222":0,"224":0,"229":0,"231":0,"236":0,"238":0,"240":0,"242":0,"246":0,"251":0,"267":0,"269":0,"271":0,"275":0,"304":0,"315":0,"316":0,"318":0,"320":0,"323":0,"326":0,"336":0,"337":0,"339":0,"341":0,"345":0,"349":0,"359":0,"371":0,"373":0,"375":0,"377":0,"379":0,"381":0,"383":0,"387":0,"398":0,"399":0,"401":0,"403":0,"406":0,"409":0,"421":0,"423":0,"425":0,"426":0,"430":0,"432":0,"434":0,"436":0,"437":0,"441":0,"453":0,"455":0,"459":0,"471":0,"473":0,"477":0,"489":0,"491":0,"495":0,"507":0,"509":0,"513":0,"526":0,"537":0,"539":0,"547":0,"559":0,"561":0,"562":0,"568":0,"580":0,"582":0,"585":0,"589":0,"601":0,"603":0,"609":0,"621":0,"623":0,"626":0,"630":0,"642":0,"644":0,"645":0,"646":0,"650":0,"662":0,"664":0,"668":0,"681":0,"682":0,"684":0,"685":0,"687":0,"691":0,"696":0,"708":0,"710":0,"716":0,"728":0,"730":0,"733":0,"737":0,"749":0,"750":0,"763":0,"765":0,"769":0,"781":0,"783":0,"784":0,"790":0,"795":0};
_yuitest_coverage["build/gallery-complexnumber/gallery-complexnumber.js"].functions = {"ComplexNumber:17":0,"fromPolar:32":0,"real:45":0,"imag:54":0,"magnitude:63":0,"phase:72":0,"add:84":0,"subtract:108":0,"multiply:132":0,"divide:160":0,"negate:185":0,"conjugate:201":0,"rotate:217":0,"i:229":0,"toString:227":0,"failIfConstant:267":0,"isComplexNumber:302":0,"(anonymous 2):316":0,"add:313":0,"(anonymous 3):337":0,"addReciprocals:334":0,"parallel:357":0,"subtract:369":0,"(anonymous 4):399":0,"multiply:396":0,"divide:419":0,"negative:451":0,"abs:469":0,"phase:487":0,"conjugate:505":0,"rotate:524":0,"acosh:535":0,"asinh:557":0,"atanh:578":0,"cos:599":0,"cosh:619":0,"exp:640":0,"log:660":0,"pow:679":0,"sin:706":0,"sinh:726":0,"sqrt:747":0,"tan:761":0,"tanh:779":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-complexnumber/gallery-complexnumber.js"].coveredLines = 164;
_yuitest_coverage["build/gallery-complexnumber/gallery-complexnumber.js"].coveredFunctions = 45;
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 1);
YUI.add('gallery-complexnumber', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 3);
"use strict";

/**
 * @module gallery-complexnumber
 */

/**********************************************************************
 * Class for representing a complex number.
 * 
 * @class ComplexNumber
 * @constructor
 * @param real=0 {number} the real component
 * @param imag=0 {number} the imaginary component
 */
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 17);
function ComplexNumber(real, imag)
{
	_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "ComplexNumber", 17);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 19);
this.r = real || 0;
	_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 20);
this.i = imag || 0;
}

/**
 * Construct a ComplexNumber from polar coordinates.
 * 
 * @method fromPolar
 * @static
 * @param magnitude {number}
 * @param phase {number}
 * @return ComplexNumber
 */
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 32);
ComplexNumber.fromPolar = function(magnitude, phase)
{
	_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "fromPolar", 32);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 34);
return new ComplexNumber(
		magnitude * Math.cos(phase),
		magnitude * Math.sin(phase));
};

_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 39);
ComplexNumber.prototype =
{
	/**
	 * @method real
	 * @return {number} real component
	 */
	real: function()
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "real", 45);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 47);
return this.r;
	},

	/**
	 * @method imag
	 * @return {number} imaginary component
	 */
	imag: function()
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "imag", 54);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 56);
return this.i;
	},

	/**
	 * @method magnitude
	 * @return {number} length of the vector in the complex plane
	 */
	magnitude: function()
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "magnitude", 63);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 65);
return Math.sqrt(this.r*this.r + this.i*this.i);
	},

	/**
	 * @method phase
	 * @return {number} angle of the vector (in radians) in the complex plane relative to the positive real axis
	 */
	phase: function()
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "phase", 72);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 74);
return Math.atan2(this.i, this.r);
	},

	/**
	 * Equivalent of += operator.
	 * 
	 * @method add
	 * @param v {number}
	 * @chainable
	 */
	add: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "add", 84);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 86);
failIfConstant(this);

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 88);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 90);
this.r += v.r;
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 91);
this.i += v.i;
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 95);
this.r += v;
		}

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 98);
return this;
	},

	/**
	 * Equivalent of -= operator.
	 * 
	 * @method subtract
	 * @param v {number}
	 * @chainable
	 */
	subtract: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "subtract", 108);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 110);
failIfConstant(this);

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 112);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 114);
this.r -= v.r;
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 115);
this.i -= v.i;
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 119);
this.r -= v;
		}

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 122);
return this;
	},

	/**
	 * Equivalent of *= operator.
	 * 
	 * @method multiply
	 * @param v {number}
	 * @chainable
	 */
	multiply: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "multiply", 132);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 134);
failIfConstant(this);

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 136);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 138);
var r = this.r*v.r - this.i*v.i;
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 139);
var i = this.r*v.i + this.i*v.r;

			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 141);
this.r = r;
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 142);
this.i = i;
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 146);
this.r *= v;
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 147);
this.i *= v;
		}

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 150);
return this;
	},

	/**
	 * Equivalent of /= operator.
	 * 
	 * @method divide
	 * @chainable
	 * @param v {number}
	 */
	divide: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "divide", 160);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 162);
failIfConstant(this);

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 164);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 166);
var x  = ComplexMath.divide(this, v);
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 167);
this.r = x.r;
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 168);
this.i = x.i;
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 172);
this.r /= v;
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 173);
this.i /= v;
		}

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 176);
return this;
	},

	/**
	 * Equivalent of unary minus operator.
	 * 
	 * @method negate
	 * @chainable
	 */
	negate: function()
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "negate", 185);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 187);
failIfConstant(this);

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 189);
this.r = - this.r;
		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 190);
this.i = - this.i;

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 192);
return this;
	},

	/**
	 * Negates the imaginary part.
	 * 
	 * @method conjugate
	 * @chainable
	 */
	conjugate: function()
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "conjugate", 201);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 203);
failIfConstant(this);

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 205);
this.i = - this.i;

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 207);
return this;
	},

	/**
	 * Rotates the number around the origin by the specified angle in radians.
	 * 
	 * @method rotate
	 * @chainable
	 * @param angle {number}
	 */
	rotate: function(
		/* float */	angle)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "rotate", 217);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 220);
failIfConstant(this);

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 222);
this.multiply(ComplexNumber.fromPolar(1, angle));

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 224);
return this;
	},

	toString: function()
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "toString", 227);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 229);
function i(v)
		{
			_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "i", 229);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 231);
return  v ===  1 ?  'i' :
					v === -1 ? '-i' :
					v + 'i';
		}

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 236);
if (this.i === 0)
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 238);
return this.r.toString();
		}
		else {_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 240);
if (this.r === 0)
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 242);
return i(this.i);
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 246);
return this.r + (this.i > 0 ? '+' : '') + i(this.i);
		}}
	}
};

_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 251);
Y.ComplexNumber = ComplexNumber;
/**********************************************************************
 * Support for complex numbers.
 *
 * @module gallery-complexnumber
 * @main gallery-complexnumber
 */

/**
 * This collection of functions provides the complex number equivalent of
 * the built-in JavaScript Math namespace, along with the basic arithmetic
 * operations (since JavaScript does not support operator overloading).
 * 
 * @class ComplexMath
 */

_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 267);
function failIfConstant(v)
{
	_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "failIfConstant", 267);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 269);
if (v === ComplexMath.ZERO || v === ComplexMath.I)
	{
		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 271);
throw Error('You cannot modify ZERO or I');
	}
}

_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 275);
var ComplexMath =
{
	/**
	 * Zero.
	 * 
	 * @property ZERO
	 * @type {ComplexNumber}
	 * @static
	 * @final
	 */
	ZERO: new ComplexNumber(),

	/**
	 * Square root of -1.
	 * 
	 * @property I
	 * @type {ComplexNumber}
	 * @static
	 * @final
	 */
	I: new ComplexNumber(0,1),

	/**
	 * @method isComplexNumber
	 * @static
	 * @return {boolean} true if the argument is a ComplexNumber
	 */
	isComplexNumber: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "isComplexNumber", 302);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 304);
return ((v instanceof ComplexNumber) ||
				(v.hasOwnProperty("r") && v.hasOwnProperty("i")));
	},

	/**
	 * @method add
	 * @static
	 * @return {number} sum of all the arguments (either passed separately or as an array)
	 */
	add: function()
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "add", 313);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 315);
var s = new ComplexNumber();
		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 316);
Y.Array.each(arguments, function(v)
		{
			_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "(anonymous 2)", 316);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 318);
if (Y.Lang.isArray(v))
			{
				_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 320);
v = ComplexMath.add.apply(this, v);
			}

			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 323);
s.add(v);
		});

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 326);
return s;
	},

	/**
	 * @method addReciprocals
	 * @static
	 * @return {number} sum of the reciprocals of all the arguments (either passed separately or as an array)
	 */
	addReciprocals: function()
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "addReciprocals", 334);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 336);
var s = new ComplexNumber();
		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 337);
Y.Array.each(arguments, function(v)
		{
			_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "(anonymous 3)", 337);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 339);
if (Y.Lang.isArray(v))
			{
				_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 341);
s.add(ComplexMath.addReciprocals.apply(this, v));
			}
			else
			{
				_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 345);
s.add(ComplexMath.divide(1,v));
			}
		});

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 349);
return s;
	},

	/**
	 * @method parallel
	 * @static
	 * @return {number} net value of N impedances in parallel (either passed separately or as an array)
	 */
	parallel: function()
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "parallel", 357);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 359);
return ComplexMath.divide(1, ComplexMath.addReciprocals.apply(this, arguments));
	},

	/**
	 * @method subtract
	 * @static
	 * @param v1 {number}
	 * @param v2 {number}
	 * @return {number} v1-v2
	 */
	subtract: function(v1, v2)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "subtract", 369);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 371);
var c1 = ComplexMath.isComplexNumber(v1),
			c2 = ComplexMath.isComplexNumber(v2);
		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 373);
if (c1 && c2)
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 375);
return new ComplexNumber(v1.r-v2.r, v1.i-v2.i);
		}
		else {_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 377);
if (c1)
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 379);
return new ComplexNumber(v1.r-v2, v1.i);
		}
		else {_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 381);
if (c2)
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 383);
return new ComplexNumber(v1-v2.r, -v2.i);
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 387);
return new ComplexNumber(v1-v2, 0);
		}}}
	},

	/**
	 * @method multiply
	 * @static
	 * @return {number} product of all the arguments (either passed separately or as an array)
	 */
	multiply: function()
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "multiply", 396);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 398);
var s = new ComplexNumber(1, 0);
		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 399);
Y.Array.each(arguments, function(v)
		{
			_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "(anonymous 4)", 399);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 401);
if (Y.Lang.isArray(v))
			{
				_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 403);
v = ComplexMath.multiply.apply(this, v);
			}

			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 406);
s.multiply(v);
		});

		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 409);
return s;
	},

	/**
	 * @method divide
	 * @static
	 * @param v1 {number}
	 * @param v2 {number}
	 * @return {number} v1/v2
	 */
	divide: function(v1, v2)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "divide", 419);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 421);
var c1 = ComplexMath.isComplexNumber(v1),
			c2 = ComplexMath.isComplexNumber(v2);
		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 423);
if (c1 && c2)
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 425);
var d = v2.r*v2.r + v2.i*v2.i;
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 426);
return new ComplexNumber(
				(v1.r*v2.r + v1.i*v2.i)/d,
				(v1.i*v2.r - v1.r*v2.i)/d);
		}
		else {_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 430);
if (c1)
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 432);
return new ComplexNumber(v1.r/v2, v1.i/v2);
		}
		else {_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 434);
if (c2)
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 436);
var d = v2.r*v2.r + v2.i*v2.i;
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 437);
return new ComplexNumber((v1*v2.r)/d, (-v1*v2.i)/d);
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 441);
return new ComplexNumber(v1/v2, 0);
		}}}
	},

	/**
	 * @method negative
	 * @static
	 * @param v {number}
	 * @return {number} negative of the argument
	 */
	negative: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "negative", 451);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 453);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 455);
return new ComplexNumber(-v.r, -v.i);
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 459);
return new ComplexNumber(-v, 0);
		}
	},

	/**
	 * @method abs
	 * @static
	 * @param v {number}
	 * @return {number} absolute value (magnitude) of the argument
	 */
	abs: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "abs", 469);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 471);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 473);
return new ComplexNumber(Math.sqrt(v.r*v.r + v.i*v.i), 0);
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 477);
return new ComplexNumber(Math.abs(v), 0);
		}
	},

	/**
	 * @method phase
	 * @static
	 * @param v {number}
	 * @return {number} phase of the argument
	 */
	phase: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "phase", 487);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 489);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 491);
return new ComplexNumber(Math.atan2(v.i, v.r), 0);
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 495);
return new ComplexNumber();
		}
	},

	/**
	 * @method conjugate
	 * @static
	 * @param v {number}
	 * @return {number} complex conjugate of the argument
	 */
	conjugate: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "conjugate", 505);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 507);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 509);
return new ComplexNumber(v.r, -v.i);
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 513);
return new ComplexNumber(v, 0);
		}
	},

	/**
	 * @method rotate
	 * @static
	 * @param v {number}
	 * @param a {number} angle in radians
	 * @return {number} phase of the argument
	 */
	rotate: function(v,a)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "rotate", 524);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 526);
return ComplexMath.multiply(v, ComplexNumber.fromPolar(1, a));
	},

	/**
	 * @method acosh
	 * @static
	 * @param v {number}
	 * @return {number} inverse hyperbolic cosine of the argument
	 */
	acosh: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "acosh", 535);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 537);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 539);
return ComplexMath.log(
				ComplexMath.add(v,
					ComplexMath.multiply(
						ComplexMath.sqrt(new ComplexNumber(v.r+1, v.i)),
						ComplexMath.sqrt(new ComplexNumber(v.r-1, v.i)))));
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 547);
return new ComplexNumber(Math.acosh(v), 0);
		}
	},

	/**
	 * @method asinh
	 * @static
	 * @param v {number}
	 * @return {number} inverse hyperbolic sine of the argument
	 */
	asinh: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "asinh", 557);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 559);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 561);
var v1 = ComplexMath.multiply(v,v);
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 562);
return ComplexMath.log(
				ComplexMath.add(v,
					ComplexMath.sqrt(new ComplexNumber(v1.r+1, v1.i))));
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 568);
return new ComplexNumber(Math.asinh(v), 0);
		}
	},

	/**
	 * @method atanh
	 * @static
	 * @param v {number}
	 * @return {number} inverse hyperbolic tangent of the argument
	 */
	atanh: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "atanh", 578);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 580);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 582);
var v1 = ComplexMath.subtract(
				ComplexMath.log(new ComplexNumber(1+v.r,  v.i)),
				ComplexMath.log(new ComplexNumber(1-v.r, -v.i)));
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 585);
return new ComplexNumber(v1.r/2, v1.i/2);
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 589);
return new ComplexNumber(Math.atanh(v), 0);
		}
	},

	/**
	 * @method cos
	 * @static
	 * @param v {number}
	 * @return {number} cosine of the argument
	 */
	cos: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "cos", 599);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 601);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 603);
return new ComplexNumber(
				 Math.cos(v.r)*Math.cosh(v.i),
				-Math.sin(v.r)*Math.sinh(v.i));
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 609);
return new ComplexNumber(Math.cos(v), 0);
		}
	},

	/**
	 * @method cosh
	 * @static
	 * @param v {number}
	 * @return {number} hyperbolic cosine of the argument
	 */
	cosh: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "cosh", 619);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 621);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 623);
var v1 = ComplexMath.add(
				ComplexMath.exp(v),
				ComplexMath.exp(new ComplexNumber(-v.r, -v.i)));
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 626);
return new ComplexNumber(v1.r/2, v1.i/2);
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 630);
return new ComplexNumber(Math.cosh(v), 0);
		}
	},

	/**
	 * @method exp
	 * @static
	 * @param v {number}
	 * @return {number} e raised to the argument
	 */
	exp: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "exp", 640);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 642);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 644);
var v1 = new ComplexNumber(Math.cos(v.i), Math.sin(v.i));
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 645);
v1.multiply(Math.exp(v.r));
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 646);
return v1;
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 650);
return new ComplexNumber(Math.exp(v), 0);
		}
	},

	/**
	 * @method log
	 * @static
	 * @param v {number}
	 * @return {number} natural logarithm of the argument
	 */
	log: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "log", 660);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 662);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 664);
return new ComplexNumber(Math.log(v.magnitude()), v.phase());
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 668);
return new ComplexNumber(Math.log(v), 0);
		}
	},

	/**
	 * @method pow
	 * @static
	 * @param v {number} value
	 * @param e {number} exponent
	 * @return {number} value raised to the exponent
	 */
	pow: function(v, e)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "pow", 679);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 681);
var c1 = ComplexMath.isComplexNumber(v);
		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 682);
if ((c1 && v.r === 0 && v.i === 0) || (!c1 && v === 0))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 684);
var c2 = ComplexMath.isComplexNumber(e);
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 685);
if ((c2 && e.r === 0 && e.i === 0) || (!c2 && e === 0))
			{
				_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 687);
return new ComplexNumber(1);	// 0 ^ 0
			}
			else
			{
				_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 691);
return new ComplexNumber();		// 0 ^ x, x != 0
			}
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 696);
return ComplexMath.exp(ComplexMath.multiply(ComplexMath.log(v), e));
		}
	},

	/**
	 * @method sin
	 * @static
	 * @param v {number}
	 * @return {number} sine of the argument
	 */
	sin: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "sin", 706);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 708);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 710);
return new ComplexNumber(
				Math.sin(v.r)*Math.cosh(v.i),
				Math.cos(v.r)*Math.sinh(v.i));
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 716);
return new ComplexNumber(Math.sin(v), 0);
		}
	},

	/**
	 * @method sinh
	 * @static
	 * @param v {number}
	 * @return {number} hyperbolic sine of the argument
	 */
	sinh: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "sinh", 726);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 728);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 730);
var v1 = ComplexMath.subtract(
				ComplexMath.exp(v),
				ComplexMath.exp(new ComplexNumber(-v.r, -v.i)));
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 733);
return new ComplexNumber(v1.r/2, v1.i/2);
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 737);
return new ComplexNumber(Math.sinh(v), 0);
		}
	},

	/**
	 * @method sqrt
	 * @static
	 * @param v {number}
	 * @return {number} square root of the argument
	 */
	sqrt: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "sqrt", 747);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 749);
var c = ComplexMath.isComplexNumber(v);
		_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 750);
return ComplexNumber.fromPolar(
			Math.sqrt(c ? v.magnitude() : Math.abs(v)),
			(c ? v.phase() : v < 0 ? Math.PI : 0) / 2);
	},

	/**
	 * @method tan
	 * @static
	 * @param v {number}
	 * @return {number} tangent of the argument
	 */
	tan: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "tan", 761);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 763);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 765);
return ComplexMath.divide(ComplexMath.sin(v), ComplexMath.cos(v));
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 769);
return new ComplexNumber(Math.tan(v), 0);
		}
	},

	/**
	 * @method tanh
	 * @static
	 * @param v {number}
	 * @return {number} hyperbolic tangent of the argument
	 */
	tanh: function(v)
	{
		_yuitest_coverfunc("build/gallery-complexnumber/gallery-complexnumber.js", "tanh", 779);
_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 781);
if (ComplexMath.isComplexNumber(v))
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 783);
var e = ComplexMath.exp(new ComplexNumber(2*v.r, 2*v.i));
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 784);
return ComplexMath.divide(
				new ComplexNumber(e.r-1, e.i),
				new ComplexNumber(e.r+1, e.i));
		}
		else
		{
			_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 790);
return new ComplexNumber(Math.tanh(v), 0);
		}
	}
};

_yuitest_coverline("build/gallery-complexnumber/gallery-complexnumber.js", 795);
Y.ComplexMath = ComplexMath;


}, '@VERSION@', {"requires": ["gallery-math"]});
