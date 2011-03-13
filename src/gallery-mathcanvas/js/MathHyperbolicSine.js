/**********************************************************************
 * <p>Hyperbolic sine.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.HyperbolicSine
 * @constructor
 * @param {number}
 */

function MathHyperbolicSine(
	/* MathFunction */	f)
{
	MathHyperbolicSine.superclass.constructor.call(this, "sinh", f);
}

Y.extend(MathHyperbolicSine, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Y.ComplexMath.sinh(this.args[0].evaluate());
	}
});

MathFunction.HyperbolicSine = MathHyperbolicSine;
