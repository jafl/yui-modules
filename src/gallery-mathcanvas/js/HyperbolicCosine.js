/**********************************************************************
 * <p>Hyperbolic cosine.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.HyperbolicCosine
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 * @param f {Y.MathFunction}
 */

function MathHyperbolicCosine(
	/* MathFunction */	f)
{
	MathHyperbolicCosine.superclass.constructor.call(this, "cosh", f);
}

Y.extend(MathHyperbolicCosine, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Y.ComplexMath.cosh(this.args[0].evaluate());
	}
});

MathFunction.HyperbolicCosine = MathHyperbolicCosine;
