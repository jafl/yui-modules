/**********************************************************************
 * <p>Conjugate of a complex number.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Conjugate
 * @extends Y.MathFunction.FunctionWithArgs
 * @constructor
 * @param f {Y.MathFunction}
 */

function MathConjugate(
	/* MathFunction */	f)
{
	MathConjugate.superclass.constructor.call(this, "conjugate", f);
}

Y.extend(MathConjugate, MathFunctionWithArgs,
{
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.conjugate(this.args[0].evaluate(var_list));
	},

	prepareToRender: function(
		/* Context2d */		context,
		/* point */			top_left,
		/* percentage */	font_size,
		/* RectList */		rect_list)
	{
		var bar_height = context.getHorizontalBarHeight();

		var arg_top_left = Y.clone(top_left);
		arg_top_left.y  += bar_height;

		var arg_index = this.args[0].prepareToRender(context, arg_top_left, font_size, rect_list);
		var arg_info  = rect_list.get(arg_index);

		var r  = Y.clone(arg_info.rect);
		r.top -= bar_height;

		return rect_list.add(r, arg_info.midline, font_size, this);
	},

	render: function(
		/* Context2d */	context,
		/* RectList */	rect_list)
	{
		var info = rect_list.find(this);
		context.drawHorizontalBar(info.rect);
		this.args[0].render(context, rect_list);
	}
});

MathFunction.Conjugate = MathConjugate;
