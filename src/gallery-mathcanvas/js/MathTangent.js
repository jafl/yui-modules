/**********************************************************************
 * <p>Trigonometric tangent.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Tangent
 * @constructor
 * @param {number}
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
		return Y.ComplexMath.tan(this.args[0].evaluate());
	}
});

MathFunction.Tangent = MathTangent;
