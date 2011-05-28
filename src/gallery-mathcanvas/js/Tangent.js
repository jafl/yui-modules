/**********************************************************************
 * <p>Trigonometric tangent.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Tangent
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 * @param f {Y.MathFunction}
 */

function MathTangent(
	/* MathFunction */	f)
{
	MathTangent.superclass.constructor.call(this, "tan", f);
}

Y.extend(MathTangent, MathFunctionWithArgs,
{
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.tan(this.args[0].evaluate(var_list));
	}
});

MathFunction.Tangent = MathTangent;
