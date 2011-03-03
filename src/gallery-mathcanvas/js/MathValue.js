/**********************************************************************
 * <p>Constant value</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Value
 * @constructor
 */

function MathValue(
	/* float */	value)
{
	MathValue.superclass.constructor.call(this);
	this.value = parseInt(value);	// do not force base, to allow hex
}

Y.extend(MathValue, MathFunction,
{
	evaluate: function()
	{
		return this.value;
	},

	toString: function()
	{
		return this.value;
	}
});

MathFunction.Value = MathValue;
