/**********************************************************************
 * <p>Maximum.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Max
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 */

function MathMax()
{
	MathMax.superclass.constructor.call(this, "max", new Y.Array(arguments));
}

Y.extend(MathMax, MathFunctionWithArgs,
{
	evaluate: function(
		/* map */	var_list)
	{
		return Math.max.apply(null, this.evaluateArgs(var_list));
	}
});

MathFunction.Max = MathMax;
