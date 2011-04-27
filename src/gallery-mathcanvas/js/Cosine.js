/**********************************************************************
 * <p>Trigonometric cosine.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Cosine
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 * @param f {Y.MathFunction}
 */

function MathCosine(
	/* MathFunction */	f)
{
	MathCosine.superclass.constructor.call(this, "cos", f);
}

Y.extend(MathCosine, MathFunctionWithArgs,
{
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.cos(this.args[0].evaluate(var_list));
	}
});

MathFunction.Cosine = MathCosine;
