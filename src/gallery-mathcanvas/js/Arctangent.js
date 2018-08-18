/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Inverse trigonometric cosine.</p>
 * 
 * @namespace MathFunction
 * @class Arctangent
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathArctangent(
	/* MathFunction */	f)
{
	MathArctangent.superclass.constructor.call(this, MathArctangent.NAME, f);
}

MathArctangent.NAME = 'arctan';

Y.extend(MathArctangent, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Math.atan(this.args[0].evaluate(var_list));
	}
});

MathFunction.Arctangent = MathArctangent;

MathFunction.name_map[ MathArctangent.NAME ] =
{
	applyTo: function(f)
	{
		return new MathArctangent(f);
	}
};
