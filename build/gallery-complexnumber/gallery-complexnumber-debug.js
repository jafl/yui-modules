YUI.add('gallery-complexnumber', function(Y) {

"use strict";

/**********************************************************************
 * <p>Class for representing a complex number.</p>
 * 
 * @module gallery-complexnumber
 * @class Y.ComplexNumber
 * @constructor
 * @param real {number} the real component
 * @param imag {number} the imaginary component
 */

function ComplexNumber(real, imag)
{
	this.r = real;
	this.i = imag;
}

/**
 * Construct a ComplexNumber from polar coordinates.
 * 
 * @static
 * @param magnitude {number}
 * @param phase {number}
 * @return ComplexNumber
 */
ComplexNumber.fromPolar = function(magnitude, phase)
{
	return new ComplexNumber(
		magnitude * Math.cos(phase),
		magnitude * Math.sin(phase));
};

ComplexNumber.prototype =
{
	/**
	 * @return {number} real component
	 */
	real: function()
	{
		return this.r;
	},

	/**
	 * @return {number} imaginary component
	 */
	imag: function()
	{
		return this.i;
	},

	/**
	 * @return {number} length of the vector in the complex plane
	 */
	magnitude: function()
	{
		return ComplexMath.abs(this);
	},

	/**
	 * @return {number} angle of the vector (in radians) in the complex plane relative to the positive real axis
	 */
	phase: function()
	{
		return Math.atan2(this.i, this.r);
	},

	/**
	 * Equivalent of += operator.
	 * @param v {number}
	 */
	add: function(v)
	{
		if (ComplexMath.isComplexNumber(v))
		{
			this.r += v.r;
			this.i += v.i;
		}
		else
		{
			this.r += v;
		}
	},

	/**
	 * Equivalent of -= operator.
	 * @param v {number}
	 */
	subtract: function(v)
	{
		if (ComplexMath.isComplexNumber(v))
		{
			this.r -= v.r;
			this.i -= v.i;
		}
		else
		{
			this.r -= v;
		}
	},

	/**
	 * Equivalent of *= operator.
	 * @param v {number}
	 */
	multiply: function(v)
	{
		if (ComplexMath.isComplexNumber(v))
		{
			var r = this.r*v.r - this.i*v.i;
			var i = this.r*v.i + this.i*v.r;

			this.r = r;
			this.i = i;
		}
		else
		{
			this.r *= v;
			this.i *= v;
		}
	},

	/**
	 * Equivalent of /= operator.
	 * @param v {number}
	 */
	divide: function(v)
	{
		if (ComplexMath.isComplexNumber(v))
		{
			var x  = ComplexMath.divide(this, v);
			this.r = x.r;
			this.i = x.i;
		}
		else
		{
			this.r /= v;
			this.i /= v;
		}
	},

	toString: function()
	{
		if (this.i === 0)
		{
			return this.r.toString();
		}
		else if (this.r === 0)
		{
			return this.i + 'i';
		}
		else
		{
			return this.r + '+' + this.i + 'i';
		}
	}
};

Y.ComplexNumber = ComplexNumber;
/**********************************************************************
 * <p>This collection of functions provides the complex number equivalent
 * of the built-in JavaScript Math namespace, along with the basic
 * arithmetic operations (since JavaScript does not support operator
 * overloading).</p>
 * 
 * @module gallery-complexnumber
 * @class Y.ComplexMath
 */

var ComplexMath =
{
	/**
	 * Square root of -1.
	 */
	I: new ComplexNumber(0,1),

	/**
	 * @return {boolean} true if the argument is a ComplexNumber
	 */
	isComplexNumber: function(v)
	{
		return ((v instanceof ComplexNumber) ||
				(v.hasOwnProperty("r") && v.hasOwnProperty("i")));
	},

	/**
	 * @return {number} sum of all the arguments
	 */
	add: function()
	{
		var s = new ComplexNumber(0,0);
		Y.Array.each(arguments, function(v)
		{
			s.add(v);
		});

		return (s.i === 0 ? s.r : s);
	},

	/**
	 * @param v1 {number}
	 * @param v2 {number}
	 * @return {number} v1-v2
	 */
	subtract: function(v1, v2)
	{
		var c1 = ComplexMath.isComplexNumber(v1),
			c2 = ComplexMath.isComplexNumber(v2);
		if (c1 && c2)
		{
			return new ComplexNumber(v1.r-v2.r, v1.i-v2.i);
		}
		else if (c1)
		{
			return new ComplexNumber(v1.r-v2, v1.i);
		}
		else if (c2)
		{
			return new ComplexNumber(v1-v2.r, -v2.i);
		}
		else
		{
			return v1-v2;
		}
	},

	/**
	 * @return {number} product of all the arguments
	 */
	multiply: function()
	{
		var s = new ComplexNumber(1, 0);
		Y.Array.each(arguments, function(v)
		{
			s.multiply(v);
		});

		return (s.i === 0 ? s.r : s);
	},

	/**
	 * @param v1 {number}
	 * @param v2 {number}
	 * @return {number} v1/v2
	 */
	divide: function(v1, v2)
	{
		var c1 = ComplexMath.isComplexNumber(v1),
			c2 = ComplexMath.isComplexNumber(v2);
		if (c1 && c2)
		{
			var d = v2.r*v2.r + v2.i*v2.i;
			return new ComplexNumber(
				(v1.r*v2.r + v1.i*v2.i)/d,
				(v1.i*v2.r - v1.r*v2.i)/d);
		}
		else if (c1)
		{
			return new ComplexNumber(v1.r/v2, v1.i/v2);
		}
		else if (c2)
		{
			var d = v2.r*v2.r + v2.i*v2.i;
			return new ComplexNumber((v1*v2.r)/d, (-v1*v2.i)/d);
		}
		else
		{
			return v1/v2;
		}
	},

	/**
	 * @param v {number}
	 * @return {number} absolute value (magnitude) of the argument
	 */
	abs: function(v)
	{
		if (ComplexMath.isComplexNumber(v))
		{
			return Math.sqrt(v.r*v.r + v.i*v.i);
		}
		else
		{
			return Math.abs(v);
		}
	},

	/**
	 * @param v {number}
	 * @return {number} cosine of the argument
	 */
	cos: function(v)
	{
		if (ComplexMath.isComplexNumber(v))
		{
			return new ComplexNumber(
				 Math.cos(v.r)*Math.cosh(v.i),
				-Math.sin(v.r)*Math.sinh(v.i));
		}
		else
		{
			return Math.cos(v);
		}
	},

	/**
	 * @param v1 {number}
	 * @param v2 {number}
	 * @return {number} net value of two impedances in parallel
	 */
	parallel: function(v1, v2)
	{
		if (ComplexMath.isComplexNumber(v1) || ComplexMath.isComplexNumber(v2))
		{
			return ComplexMath.divide(
				ComplexMath.multiply(v1, v2),
				ComplexMath.add(v1, v2));
		}
		else
		{
			return Math.parallel(v1, v2);
		}
	},

	/**
	 * @param v {number} value
	 * @param e {number} exponent
	 * @return {number} value raised to the exponent
	 */
	pow: function(v, e)
	{
		if (ComplexMath.isComplexNumber(v) ||
			ComplexMath.isComplexNumber(e))
		{
			return ComplexNumber.fromPolar(
				Math.pow(v.magnitude(), e),
				v.phase() * e);
		}
		else
		{
			return Math.pow(v,e);
		}
	},

	/**
	 * @param v {number}
	 * @return {number} sine of the argument
	 */
	sin: function(v)
	{
		if (ComplexMath.isComplexNumber(v))
		{
			return new ComplexNumber(
				Math.sin(v.r)*Math.cosh(v.i),
				Math.cos(v.r)*Math.sinh(v.i));
		}
		else
		{
			return Math.cos(v);
		}
	},

	/**
	 * @param v {number}
	 * @return {number} square root of the argument
	 */
	sqrt: function(v)
	{

		return v1.i === 0 ? v1.r : v1;
	},

	/**
	 * @param v {number}
	 * @return {number} tangent of the argument
	 */
	tan: function(v)
	{
		if (ComplexMath.isComplexNumber(v))
		{
			return ComplexMath.divide(ComplexMath.sin(v), ComplexMath.cos(v));
		}
		else
		{
			return Math.tan(v);
		}
	}
};

/*
acosh = ln(x+sqrt(x^2-1))
asinh = ln(x+sqrt(x^2+1))
atanh = ln((1+x)/(1-x))/2
cosh = (e^x + e^-x)/2
exp(x)	Returns the value of Ex
log(x)	Returns the natural logarithm (base E) of x
sinh = (e^x - e^-x)/2
tanh = sinh / cosh
*/

Y.ComplexMath = ComplexMath;


}, '@VERSION@' ,{requires:['gallery-math']});
