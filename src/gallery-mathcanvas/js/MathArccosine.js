/**********************************************************************
 * <p>Inverse trigonometric cosine.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Arccosine
 * @constructor
 * @param {number}
 */

function MathArccosine(
	/* MathFunction */	f)
{
	MathArccosine.superclass.constructor.call(this, "arccos", f);
}

Y.extend(MathArccosine, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Math.acos(this.args[0].evaluate());
	}
});

MathFunction.Arccosine = MathArccosine;
