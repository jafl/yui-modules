/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Base class for all functions rendered by MathCanvas.</p>
 * 
 * <p>Derived classes must implement toString() and evaluate().  To override
 * the default rendering which displays the output from toString(), implement
 * prepareToRender() and render().</p>
 * 
 * @class MathFunction
 * @constructor
 */

function MathFunction()
{
	this.parent = null;
}

MathFunction.prototype =
{
	/**
	 * @method getParent
	 * @return {MathFunction} parent function or null
	 */
	getParent: function()
	{
		return this.parent;
	},

	/**
	 * Add the layout information for this object and its descendants to
	 * rect_list.
	 *
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
	 * @method render
	 * @param canvas {MathCanvas} the drawing canvas
	 * @param rect_list {RectList} layout information
	 */
	render: function(
		/* Context2d */	context,
		/* RectList */	rect_list)
	{
		var info = rect_list.find(this);
		context.drawString(info.rect.left, info.midline, info.font_size, this.toString());
	},

	/**
	 * Must be implemented by derived classes.
	 *
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */

	/**
	 * Must be implemented by derived classes.
	 *
	 * @method toString
	 * @return text representation of the function
	 */

	/**
	 * @method parenthesizeForPrint
	 * @protected
	 * @param f {MathFunction}
	 * @return {boolean} true if f needs to parenthesize us
	 */
	parenthesizeForPrint: function(
		/* MathFunction */	f)
	{
		const data =
		{
			MathExponential: [1, 1, 1, 1, 1, 1],
			MathNegate:      [0, 1, 0, 0, 1, 1],
			MathProduct:     [0, 1, 0, 0, 1, 1],
			MathQuotient:    [1, 1, 1, 1, 1, 1],
			MathSum:         [0, 0, 0, 0, 0, 1],
			negative:        [0, 0, 0, 0, 0, 0],
		};

		return this._needParentheses(f, data);
	},

	/**
	 * @method parenthesizeForRender
	 * @protected
	 * @param f {MathFunction}
	 * @return {boolean} true if f needs to parenthesize us
	 */
	parenthesizeForRender: function(
		/* MathFunction */	f)
	{
		const data =
		{
			MathExponential: [1, 1, 1, 1, 1, 1],
			MathNegate:      [0, 1, 0, 0, 1, 1],
			MathProduct:     [0, 1, 1, 0, 1, 1],
			MathQuotient:    [0, 0, 0, 0, 0, 0],
			MathSum:         [0, 0, 0, 0, 1, 1],
			negative:        [0, 0, 0, 0, 0, 0],
		};

		return this._needParentheses(f, data);
	},

	_needParentheses: function(
		/* MathFunction */	f,
		/* map */			data)
	{
		const ftype = f.constructor.name;
		if (!data[ftype])
			{
			return false;
			}

		var type = this.constructor.name;
		if (type == 'MathValue' && this.evaluate() < 0)
			{
			type = 'negative';
			}

		if (!data[type])
			{
			return false;
			}

		const keys = Y.Object.keys(data).sort(),
			  i    = Y.Array.indexOf(keys, type);

		return data[ftype][i];
	}
};

// jison utility functions

MathFunction.updateSum = function(
	/* MathFunction */	f1,
	/* MathFunction */	f2)
{
	if (f1 instanceof MathSum)
	{
		f1.appendArg(f2);
		return f1;
	}
	else
	{
		return new MathSum(f1, f2);
	}
};

MathFunction.updateProduct = function(
	/* MathFunction */	f1,
	/* MathFunction */	f2)
{
	if (f1 instanceof MathProduct)
	{
		f1.appendArg(f2);
		return f1;
	}
	else
	{
		return new MathProduct(f1, f2);
	}
};

Y.MathFunction = MathFunction;
