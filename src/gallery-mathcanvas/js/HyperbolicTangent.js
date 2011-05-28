/**********************************************************************
 * <p>Hyperbolic tangent.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.HyperbolicTangent
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 * @param f {Y.MathFunction}
 */

function MathHyperbolicTangent(
	/* MathFunction */	f)
{
	MathHyperbolicTangent.superclass.constructor.call(this, "tanh", f);
}

Y.extend(MathHyperbolicTangent, MathFunctionWithArgs,
{
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.tanh(this.args[0].evaluate(var_list));
	}
});

MathFunction.HyperbolicTangent = MathHyperbolicTangent;
