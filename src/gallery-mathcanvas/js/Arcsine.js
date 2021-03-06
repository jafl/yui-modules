/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Inverse trigonometric sine.</p>
 * 
 * @namespace MathFunction
 * @class Arcsine
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathArcsine(
	/* MathFunction */	f)
{
	MathArcsine.superclass.constructor.call(this, MathArcsine.NAME, f);
}

MathArcsine.NAME = 'arcsin';

Y.extend(MathArcsine, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Math.asin(this.args[0].evaluate(var_list));
	}
});

MathFunction.Arcsine = MathArcsine;

MathFunction.name_map[ MathArcsine.NAME ] =
{
	applyTo: function(f)
	{
		return new MathArcsine(f);
	}
};
