/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Trigonometric sine.</p>
 * 
 * @namespace MathFunction
 * @class Sine
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathSine(
	/* MathFunction */	f)
{
	MathSine.superclass.constructor.call(this, MathSine.NAME, f);
}

MathSine.NAME = 'sin';

Y.extend(MathSine, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.sin(this.args[0].evaluate(var_list));
	}
});

MathFunction.Sine = MathSine;

MathFunction.name_map[ MathSine.NAME ] =
{
	applyTo: function(f)
	{
		return new MathSine(f);
	}
};
