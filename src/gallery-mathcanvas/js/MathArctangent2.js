/**********************************************************************
 * <p>Inverse trigonometric cosine.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Arctangent2
 * @constructor
 * @param {number} y
 * @param {number} x
 */

function MathArctangent2(
	/* MathFunction */	y)
	/* MathFunction */	x)
{
	MathArctangent2.superclass.constructor.call(this, "arctan2", y, x);
}

Y.extend(MathArctangent2, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Math.atan2(this.args[0].evaluate(), this.args[1].evaluate());
	}
});

MathFunction.Arctangent2 = MathArctangent2;
