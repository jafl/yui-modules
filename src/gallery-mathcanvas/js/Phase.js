/**********************************************************************
 * <p>Phase of a complex number.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Phase
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 * @param f {Y.MathFunction}
 */

function MathPhase(
	/* MathFunction */	f)
{
	MathPhase.superclass.constructor.call(this, "phase", f);
}

Y.extend(MathPhase, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Y.ComplexMath.phase(this.args[0].evaluate());
	}
});

MathFunction.Phase = MathPhase;
