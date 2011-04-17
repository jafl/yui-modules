/**********************************************************************
 * <p>Inverse hyperbolic cosine.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.InverseHyperbolicCosine
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 * @param f {Y.MathFunction}
 */

function MathInverseHyperbolicCosine(
	/* MathFunction */	f)
{
	MathInverseHyperbolicCosine.superclass.constructor.call(this, "arccosh", f);
}

Y.extend(MathInverseHyperbolicCosine, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Y.ComplexMath.acosh(this.args[0].evaluate());
	}
});

MathFunction.InverseHyperbolicCosine = MathInverseHyperbolicCosine;
