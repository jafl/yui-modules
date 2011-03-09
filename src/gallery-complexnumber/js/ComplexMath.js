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
