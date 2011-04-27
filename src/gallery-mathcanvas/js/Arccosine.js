/**********************************************************************
 * <p>Inverse trigonometric cosine.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Arccosine
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 * @param f {Y.MathFunction}
 */

function MathArccosine(
	/* MathFunction */	f)
{
	MathArccosine.superclass.constructor.call(this, "arccos", f);
}

Y.extend(MathArccosine, MathFunctionWithArgs,
{
	evaluate: function(
		/* map */	var_list)
	{
		return Math.acos(this.args[0].evaluate(var_list));
	}
});

MathFunction.Arccosine = MathArccosine;
