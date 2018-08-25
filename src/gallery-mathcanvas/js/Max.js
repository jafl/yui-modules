/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Maximum.</p>
 * 
 * @namespace MathFunction
 * @class Max
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 */

function MathMax()
{
	MathMax.superclass.constructor.call(this, MathMax.NAME, new Y.Array(arguments));
}

MathMax.NAME = 'max';

Y.extend(MathMax, MathFunctionWithArgs,
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
		return Math.max.apply(null, this.evaluateArgs(var_list));
	}
});

MathFunction.Max = MathMax;

MathFunction.name_map[ MathMax.NAME ] =
{
	applyTo: function(f)
	{
		return new MathMax(f, new Y.MathFunction.Input());
	}
};
