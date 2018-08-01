/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Input field</p>
 * 
 * @namespace MathFunction
 * @class Input
 * @extends MathFunction
 * @constructor
 */

function MathInput()
{
	MathInput.superclass.constructor.call(this);
}

Y.extend(MathInput, MathFunction,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function()
	{
		return 0;
	},

	/**
	 * @method prepareToRender
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
		/* RectList */		rect_list)
	{
		var total_rect =
		{
			top:    top_left.y,
			left:   top_left.x,
			bottom: top_left.y + context.getLineHeight(font_size),
			right:  top_left.x + 10*context.getSpaceWidth(font_size)
		};

		return rect_list.add(total_rect, total_rect.ycenter(), font_size, this);
	},

	/**
	 * @method render
	 * @param canvas {MathCanvas} the drawing canvas
	 * @param rect_list {RectList} layout information
	 */
	render: function(
		/* Context2d */	context,
		/* RectList */	rect_list)
	{
		var info = rect_list.find(this);

		var root = context._createNode('foreignObject',
		{
			x:      info.rect.left,
			y:      info.rect.top,
			width:  RectList.width(info.rect),
			height: RectList.height(info.rect)
		});

		root.appendChild(document.createElement('input'));
	},

	/**
	 * @method toString
	 * @return text representation of the function
	 */
	toString: function()
	{
		return this.value;
	}
});

MathFunction.Input = MathInput;
