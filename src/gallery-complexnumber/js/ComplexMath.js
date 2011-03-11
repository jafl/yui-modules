/**********************************************************************
 * <p>This collection of functions provides the complex number equivalent
 * of the built-in JavaScript Math namespace, along with the basic
 * arithmetic operations (since JavaScript does not support operator
 * overloading).</p>
 * 
 * @module gallery-complexnumber
 * @class Y.ComplexMath
 */

/**
 * @private
 * @param v1 {number}
 * @param v2 {number}
 * @return {number} v1*v2
 */
function multiply2(v1, v2)
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
}

ComplexMath =
{
	/**
	 * Square root of -1.
	 */
	I: new ComplexNumber(0,1),

	/**
	 * @return {number} sum of all the arguments
	 */
	add: function()
	{
		var s = new ComplexNumber(0,0);
		Y.Array.each(arguments, function(v)
		{
			if (v instanceof ComplexNumber)
			{
				s.r += v.r;
				s.i += v.i;
			}
			else
			{
				s.r += v;
			}
		});

		return s;
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
	 * @return {number} product of all the arguments
	 */
	multiply: function()
	{
		var s = 1;
		Y.Array.each(arguments, function(v)
		{
			s = multiply2(s, v);
		});

		return s;
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
	},

	/**
	 * @param v {number}
	 * @return {number} cosine of the argument
	 */
	cos: function(v)
	{
		if (v instanceof ComplexNumber)
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
		if (v1 instanceof ComplexNumber || v2 instanceof ComplexNumber)
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
		if (v instanceof ComplexNumber)
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
		if (v instanceof ComplexNumber)
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
		if (v instanceof ComplexNumber)
		{
			return ComplexNumber.fromPolar(
				Math.sqrt(v.magnitude()),
				v.phase() / 2);
		}
		else
		{
			return Math.sqrt(v);
		}
	},

	/**
	 * @param v {number}
	 * @return {number} tangent of the argument
	 */
	tan: function(v)
	{
		if (v instanceof ComplexNumber)
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
