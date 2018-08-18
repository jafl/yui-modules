/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Inverse trigonometric cosine.</p>
 * 
 * @namespace MathFunction
 * @class Arctangent2
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param y {MathFunction}
 * @param x {MathFunction}
 */

function MathArctangent2(
	/* MathFunction */	y,
	/* MathFunction */	x)
{
	MathArctangent2.superclass.constructor.call(this, MathArctangent2.NAME, y, x);
}

MathArctangent2.NAME = 'arctan2';

Y.extend(MathArctangent2, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Math.atan2(this.args[0].evaluate(var_list),
						  this.args[1].evaluate(var_list));
	}
});

MathFunction.Arctangent2 = MathArctangent2;

MathFunction.name_map[ MathArctangent2.NAME ] =
{
	applyTo: function(f)
	{
		return new MathArctangent2(f, new Y.MathFunction.Input());
	}
};
