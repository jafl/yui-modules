/**********************************************************************
 * <p>Pi</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Pi
 * @extends Y.MathFunction
 * @constructor
 */

function MathPi()
{
	MathPi.superclass.constructor.call(this);
}

Y.extend(MathPi, MathFunction,
{
	evaluate: function()
	{
		return Math.PI;
	},

	toString: function()
	{
		return '\u03c0';
	}
});

MathFunction.Pi = MathPi;
