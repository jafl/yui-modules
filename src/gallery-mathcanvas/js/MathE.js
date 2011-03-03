/**********************************************************************
 * <p>e</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.E
 * @constructor
 */

function MathE()
{
	MathE.superclass.constructor.call(this);
}

Y.extend(MathE, MathFunction,
{
	evaluate: function()
	{
		return Math.E;
	},

	toString: function()
	{
		return 'e';
	}
});

MathFunction.E = MathE;
