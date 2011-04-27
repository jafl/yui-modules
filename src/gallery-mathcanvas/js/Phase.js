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
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.phase(this.args[0].evaluate(var_list));
	}
});

MathFunction.Phase = MathPhase;
