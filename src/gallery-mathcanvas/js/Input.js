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

	this.clear();
}

Y.extend(MathInput, MathFunction,
{
	/**
	 * @method isEmpty
	 * @return true if function is empty
	 */
	isEmpty: function()
	{
		return this.text == '?';
	},

	/**
	 * @method isEmpty
	 * @return true if function is empty
	 */
	clear: function()
	{
		this.text = '?';
	},

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
		var r =
		{
			top:    top_left.y,
			left:   top_left.x,
			bottom: top_left.y + context.getLineHeight(font_size),
			right:  top_left.x + context.getStringWidth(font_size, this.text)
		};

		this.bracket_width = context.getSquareBracketWidth(r);
		r.right           += 2 * this.bracket_width;

		return rect_list.add(r, RectList.ycenter(r), font_size, this);
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
		const info = rect_list.find(this),
			  x    = info.rect.left + this.bracket_width,
			  r    = Y.clone(info.rect, true);

		r.left  += this.bracket_width;
		r.right -= this.bracket_width;

		context.drawSquareBrackets(r);
		context.drawString(x, info.midline, info.font_size, this.text);
	},

	/**
	 * @method toString
	 * @return text representation of the function
	 */
	toString: function()
	{
		return this.text;
	},

	/**
	 * @method handleKeyPress
	 * @param canvas {MathCanvas}
	 * @param code {int} character code
	 * @param c {string} character
	 * @return true if function changed
	 */
	handleKeyPress: function(
		/* MathCanvas */	canvas,
		/* int */			code,
		/* char */			c)
	{
		if (code == 8 && this.isEmpty())
		{
			canvas.deleteFunction(this);
		}
		else if (code == 8)
		{
			this.text = this.text.substr(0, this.text.length-1);
			if (this.text.length === 0)
			{
				this.clear();
			}
		}
		else if (c == '(')
		{
			if (this.isEmpty())
			{
				// ignore
			}
			else if (canvas.applyFunctionToSelection(this.text))
			{
				this.clear();
			}
			else
			{
				alert('invalid function: ' + this.text);	// XXX
			}
		}
		else if (this.isEmpty())
		{
			this.text = c;
		}
		else if (c.length == 1 && c != ' ')
		{
			this.text += c;
		}

		return true;
	}
});

MathFunction.Input = MathInput;
