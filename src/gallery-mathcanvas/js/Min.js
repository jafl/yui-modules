/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Minimum.</p>
 * 
 * @namespace MathFunction
 * @class Min
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 */

function MathMin()
{
	MathMin.superclass.constructor.call(this, MathMin.NAME, new Y.Array(arguments));
}

MathMin.NAME = 'min';

Y.extend(MathMin, MathFunctionWithArgs,
{
	/**
	 * @method getMaxArgCount
	 * @return {int} maximum number of arguments
	 */
	getMaxArgCount: function()
	{
		return 1000;
	},

	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Math.min.apply(null, this.evaluateArgs(var_list));
	}
});

MathFunction.Min = MathMin;

MathFunction.name_map[ MathMin.NAME ] =
{
	applyTo: function(f)
	{
		return new MathMin(f, new Y.MathFunction.Input());
	}
};
