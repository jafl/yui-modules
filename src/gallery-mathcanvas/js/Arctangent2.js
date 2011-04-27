/**********************************************************************
 * <p>Inverse trigonometric cosine.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Arctangent2
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 * @param y {Y.MathFunction}
 * @param x {Y.MathFunction}
 */

function MathArctangent2(
	/* MathFunction */	y,
	/* MathFunction */	x)
{
	MathArctangent2.superclass.constructor.call(this, "arctan2", y, x);
}

Y.extend(MathArctangent2, MathFunctionWithArgs,
{
	evaluate: function(
		/* map */	var_list)
	{
		return Math.atan2(this.args[0].evaluate(var_list),
						  this.args[1].evaluate(var_list));
	}
});

MathFunction.Arctangent2 = MathArctangent2;
