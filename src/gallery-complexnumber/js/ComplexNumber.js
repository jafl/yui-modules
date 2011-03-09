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
