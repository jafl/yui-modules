/**********************************************************************
 * <p>Natural logarithm.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.NaturalLog
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 * @param f {Y.MathFunction}
 */

function MathNaturalLog(
	/* MathFunction */	f)
{
	MathNaturalLog.superclass.constructor.call(this, "ln", f);
}

Y.extend(MathNaturalLog, MathFunctionWithArgs,
{
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.log(this.args[0].evaluate(var_list));
	}
});

MathFunction.NaturalLog = MathNaturalLog;
