/**********************************************************************
 * <p>Base class for all functions rendered by MathCanvas.</p>
 * 
 * <p>Derived classes must implement toString() and evaluate().  To override
 * the default rendering which displays the output from toString(), implement
 * prepareToRender() and render().</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction
 * @constructor
 */

function MathFunction()
{
}

MathFunction.prototype =
{
	/**
	 * Add the layout information for this object and its descendants to
	 * rect_list.
	 *
	 * @param canvas {MathCanvas} the drawing canvas
	 * @param top_left {point} x,y coordinates of the top left of the bounding box
	 * @param font_size {float} percentage of the base font size
	 * @param rect_list {RectList} layout information
	 * @return {int} index of this items info in rect_list
	 */
	prepareToRender: function(
		/* Context2d */		context,
		/* point */			top_left,
		/* percentage */	font_size,
		/* array */			rect_list)
	{
		var s = this.toString();

		var r =
		{
			top:    top_left.y,
			left:   top_left.x,
			bottom: top_left.y + context.getLineHeight(font_size),
			right:  top_left.x + context.getStringWidth(font_size, s)
		};

		return rect_list.add(r, RectList.ycenter(r), font_size, this);
	},

	/**
	 * Draw this object and its descendants.
	 * 
	 * @param canvas {MathCanvas} the drawing canvas
	 * @param rect_list {RectList} layout information
	 */
	render: function(
		/* Context2d */		context,
		/* array */			rect_list)
	{
		var info = rect_list.find(this);
		context.drawString(info.rect.left, info.midline, info.font_size, this.toString());
	}

	/**
	 * Must be implemented by derived classes.
	 *
	 * @method evaluate
	 * @return the value of the function
	 */

	/**
	 * Must be implemented by derived classes.
	 *
	 * @method toString
	 * @return text representation of the function
	 */
};

Y.MathFunction = MathFunction;
