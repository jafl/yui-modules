/**********************************************************************
 * <p>Trigonometric tangent.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Tangent
 * @constructor
 */

function MathTangent(
	/* MathFunction */	f)
{
	MathTangent.superclass.constructor.call(this, "tan", f);
}

Y.extend(MathTangent, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Math.tan(this.args[0].evaluate());
	}
});

MathFunction.Tangent = MathTangent;
