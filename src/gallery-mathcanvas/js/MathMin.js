/**********************************************************************
 * <p>Minimum.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Min
 * @constructor
 */

function MathMin()
{
	MathMin.superclass.constructor.call(this, "min", new Y.Array(arguments));
}

Y.extend(MathMin, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Math.min.apply(null, this.evaluateArgs());
	}
});

MathFunction.Min = MathMin;
