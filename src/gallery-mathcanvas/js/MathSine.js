/**********************************************************************
 * <p>Trigonometric sine.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Sine
 * @constructor
 */

function MathSine(
	/* MathFunction */	f)
{
	MathSine.superclass.constructor.call(this, "sin", f);
}

Y.extend(MathSine, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Math.sin(this.args[0].evaluate());
	}
});

MathFunction.Sine = MathSine;
