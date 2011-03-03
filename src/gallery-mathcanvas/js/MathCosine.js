/**********************************************************************
 * <p>Trigonometric cosine.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Cosine
 * @constructor
 */

function MathCosine(
	/* MathFunction */	f)
{
	MathCosine.superclass.constructor.call(this, "cos", f);
}

Y.extend(MathCosine, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Math.cos(this.args[0].evaluate());
	}
});

MathFunction.Cosine = MathCosine;
