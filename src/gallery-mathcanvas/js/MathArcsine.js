/**********************************************************************
 * <p>Inverse trigonometric sine.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Arcsine
 * @constructor
 * @param {number}
 */

function MathArcsine(
	/* MathFunction */	f)
{
	MathArcsine.superclass.constructor.call(this, "arcsin", f);
}

Y.extend(MathArcsine, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Math.asin(this.args[0].evaluate());
	}
});

MathFunction.Arcsine = MathArcsine;
