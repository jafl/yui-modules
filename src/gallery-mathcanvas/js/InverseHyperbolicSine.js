/**********************************************************************
 * <p>Inverse hyperbolic sine.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.InverseHyperbolicSine
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 * @param f {Y.MathFunction}
 */

function MathInverseHyperbolicSine(
	/* MathFunction */	f)
{
	MathInverseHyperbolicSine.superclass.constructor.call(this, "arcsinh", f);
}

Y.extend(MathInverseHyperbolicSine, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Y.ComplexMath.asinh(this.args[0].evaluate());
	}
});

MathFunction.InverseHyperbolicSine = MathInverseHyperbolicSine;
