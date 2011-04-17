/**********************************************************************
 * <p>Magnitude (absolute value) of a number.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Magnitude
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 * @param f {Y.MathFunction}
 */

function MathMagnitude(
	/* MathFunction */	f)
{
	MathMagnitude.superclass.constructor.call(this, "abs", f);
}

Y.extend(MathMagnitude, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Y.ComplexMath.abs(this.args[0].evaluate());
	},

	prepareToRender: function(
		/* Context2d */		context,
		/* point */			top_left,
		/* percentage */	font_size,
		/* array */			rect_list)
	{
		var bar_width = context.getVerticalBarWidth();

		var arg       = this.args[0];
		var arg_index = arg.prepareToRender(context, top_left, font_size, rect_list);
		var arg_info  = rect_list.get(arg_index);

		rect_list.shift(arg_index, bar_width, 0);		// make space for leading bar

		var r =
		{
			top:    top_left.y,
			left:   top_left.x,
			bottom: arg_info.rect.bottom,
			right:  arg_info.rect.right + bar_width
		};

		return rect_list.add(r, arg_info.midline, font_size, this);
	},

	render: function(
		/* Context2d */		context,
		/* array */			rect_list)
	{
		var info = rect_list.find(this);
		context.drawVerticalBar(info.rect);

		this.args[0].render(context, rect_list);

		var r  = Y.clone(info.rect);
		r.left = r.right - context.getVerticalBarWidth();
		context.drawVerticalBar(r);
	}
});

MathFunction.Magnitude = MathMagnitude;
