/**********************************************************************
 * <p>Maximum.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Max
 * @constructor
 */

function MathMax()
{
	MathMax.superclass.constructor.call(this, "max", new Y.Array(arguments));
}

Y.extend(MathMax, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Math.max.apply(null, this.evaluateArgs());
	}
});

MathFunction.Max = MathMax;
