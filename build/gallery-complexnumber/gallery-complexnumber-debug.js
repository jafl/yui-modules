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

ComplexNumber.prototype =
{
	/**
	 * Equivalent of += operator.
	 * @param v {number}
	 */
	add: function(v)
	{
		if (v instanceof ComplexNumber)
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
		if (v instanceof ComplexNumber)
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
		if (v instanceof ComplexNumber)
		{
			var x  = ComplexMath.multiply(this, v);
			this.r = x.r;
			this.i = x.i;
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
		if (v instanceof ComplexNumber)
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
	}
};

Y.ComplexNumber = ComplexNumber;
/**********************************************************************
 * <p>Wrapper for a canvas 2d context.  It exposes the exact same api as
 * the native 2d context, plus some extras, documented below.  Just like
 * Y.Node, use get() and set() to modify attributes.</p>
 * 
 * @module gallery-complexnumber
 * @class Y.ComplexMath
 */

Y.ComplexMath =
{
	/**
	 * Square root of -1.
	 */
	I: new ComplexNumber(0,1),

	/**
	 * @param v1 {number}
	 * @param v2 {number}
	 * @return {number} v1+v2
	 */
	add: function(v1, v2)
	{
		var c1 = v1 instanceof ComplexNumber,
			c2 = v2 instanceof ComplexNumber;
		if (c1 && c2)
		{
			return new ComplexNumber(v1.r+v2.r, v1.i+v2.i);
		}
		else if (c1)
		{
			return new ComplexNumber(v1.r+v2, v1.i);
		}
		else if (c2)
		{
			return new ComplexNumber(v1+v2.r, v2.i);
		}
		else
		{
			return v1+v2;
		}
	},

	/**
	 * @param v1 {number}
	 * @param v2 {number}
	 * @return {number} v1-v2
	 */
	subtract: function(v1, v2)
	{
		var c1 = v1 instanceof ComplexNumber,
			c2 = v2 instanceof ComplexNumber;
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
	 * @param v1 {number}
	 * @param v2 {number}
	 * @return {number} v1*v2
	 */
	multiply: function(v1, v2)
	{
		var c1 = v1 instanceof ComplexNumber,
			c2 = v2 instanceof ComplexNumber;
		if (c1 && c2)
		{
			return new ComplexNumber(v1.r*v2.r - v1.i*v2.i, v1.r*v2.i + v1.i*v2.r);
		}
		else if (c1)
		{
			return new ComplexNumber(v1.r*v2, v1.i*v2);
		}
		else if (c2)
		{
			return new ComplexNumber(v1*v2.r, v1*v2.i);
		}
		else
		{
			return v1*v2;
		}
	},

	/**
	 * @param v1 {number}
	 * @param v2 {number}
	 * @return {number} v1/v2
	 */
	divide: function(v1, v2)
	{
		var c1 = v1 instanceof ComplexNumber,
			c2 = v2 instanceof ComplexNumber;
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
		if (v instanceof ComplexNumber)
		{
			return Math.sqrt(v.r*v.r + v.i*v.i);
		}
		else
		{
			return Math.abs(v);
		}
	}
};

/*
acosh = ln(x+sqrt(x^2-1))
asinh = ln(x+sqrt(x^2+1))
atanh = ln((1+x)/(1-x))/2
cos(x)	Returns the cosine of x (x is in radians)
cosh = (e^x + e^-x)/2
exp(x)	Returns the value of Ex
log(x)	Returns the natural logarithm (base E) of x
parallel(x,y) x*y/(x+y)
pow(x,y)	Returns the value of x to the power of y
sin(x)	Returns the sine of x (x is in radians)
sinh = (e^x - e^-x)/2
sqrt(x)	Returns the square root of x
tan(x)	Returns the tangent of an angle
tanh = sinh / cosh
*/


}, '@VERSION@' );
