YUI.add('gallery-mathcanvas', function (Y, NAME) {

"use strict";

/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Manages all the bounding rectangles for an expression.</p>
 * 
 * <p>Each item contains rect (top,left,bottom,right), midline,
 * font_size(%), func.</p>
 * 
 * @class RectList
 * @namespace MathCanvas
 * @constructor
 */

function RectList()
{
	this.list = [];
}

/**
 * @method width
 * @static
 * @param r {Rect} rectangle
 * @return width
 */
RectList.width = function(r)
{
	return r.right - r.left;
};

/**
 * @method height
 * @static
 * @param r {Rect} rectangle
 * @return height
 */
RectList.height = function(r)
{
	return r.bottom - r.top;
};

/**
 * @method xcenter
 * @static
 * @param r {Rect} rectangle
 * @return horizontal center
 */
RectList.xcenter = function(r)
{
	return Math.floor((r.left + r.right)/2);
};

/**
 * @method ycenter
 * @static
 * @param r {Rect} rectangle
 * @return vertical center
 */
RectList.ycenter = function(r)
{
	return Math.floor((r.top + r.bottom)/2);
};

/**
 * @method area
 * @static
 * @param r {Rect} rectangle
 * @return area
 */
RectList.area = function(r)
{
	return RectList.width(r) * RectList.height(r);
};

/**
 * @method containsPt
 * @static
 * @param r {Rect} rectangle
 * @param xy {point} point
 * @return true if rectangle contains point
 */
RectList.containsPt = function(r, xy)
{
	return (r.left <= xy[0] && xy[0] < r.right &&
			r.top  <= xy[1] && xy[1] < r.bottom);
};

/**
 * @method containsRect
 * @static
 * @param r1 {Rect}
 * @param r2 {Rect}
 * @return true if r1 contains r2
 */
RectList.containsRect = function(r1, r2)
{
	return (r1.left <= r2.left && r2.left <= r2.right && r2.right <= r1.right &&
			r1.top <= r2.top && r2.top <= r2.bottom && r2.bottom <= r1.bottom);
};

/**
 * @method cover
 * @static
 * @param r1 {Rect} rectangle
 * @param r2 {Rect} rectangle
 * @return rectangle convering both input arguments
 */
RectList.cover = function(r1, r2)
{
	var r =
	{
		top:    Math.min(r1.top, r2.top),
		left:   Math.min(r1.left, r2.left),
		bottom: Math.max(r1.bottom, r2.bottom),
		right:  Math.max(r1.right, r2.right)
	};
	return r;
};

RectList.prototype =
{
	/**
	 * @method add
	 * @param r {Rect}
	 * @param midline {int}
	 * @param font_size {int} percentage
	 * @param func {MathFunction}
	 * @return index of inserted item
	 */
	add: function(
		/* rect */			r,
		/* int */			midline,
		/* percentage */	font_size,
		/* MathFunction */	func)
	{
		this.list.push(
		{
			rect:      r,
			midline:   midline,
			font_size: font_size,
			func:      func
		});

		return this.list.length-1;
	},

	/**
	 * @method size
	 * @return number of items
	 */
	size: function()
	{
		return this.list.length;
	},

	/**
	 * @method get
	 * @param index {int}
	 * @return item at index
	 */
	get: function(
		/* int */	index)
	{
		return this.list[ index ];
	},

	/**
	 * @method find
	 * @param f {MathFunction} search target
	 * @return data for specified MathFunction, or null if not found
	 */
	find: function(
		/* MathFunction */	f)
	{
		return Y.Array.find(this.list, function(r)
		{
			return (r.func === f);
		});
	},

	/**
	 * @method findIndex
	 * @param f {MathFunction} search target
	 * @return index of item for specified MathFunction, or -1 if not found
	 */
	findIndex: function(
		/* MathFunction */	f)
	{
		return Y.Array.indexOf(this.list, this.find(f));
	},

	/**
	 * Shift the specified rect and all rects inside it.
	 * 
	 * @method shift
	 * @param index {int}
	 * @param dx {int} horizontal shift
	 * @param dy {int} vertical shift
	 */
	shift: function(
		/* int */	index,
		/* int */	dx,
		/* int */	dy)
	{
		if (dx === 0 && dy === 0)
		{
			return;
		}

		var info = this.list[ index ];
		var orig = Y.clone(info.rect, true);
		info.rect.top    += dy;
		info.rect.left   += dx;
		info.rect.bottom += dy;
		info.rect.right  += dx;
		info.midline     += dy;

		Y.Array.each(this.list, function(info1)
		{
			if (orig.left <= info1.rect.left && info1.rect.right <= orig.right &&
				orig.top <= info1.rect.top && info1.rect.bottom <= orig.bottom)
			{
				info1.rect.top    += dy;
				info1.rect.left   += dx;
				info1.rect.bottom += dy;
				info1.rect.right  += dx;
				info1.midline     += dy;
			}
		});
	},

	/**
	 * Set the midline of the specified rectangle.
	 * 
	 * @method setMidline
	 * @param index {int}
	 * @param y {int} midline
	 */
	setMidline: function(
		/* int */	index,
		/* int */	y)
	{
		this.shift(index, 0, y - this.list[index].midline);
	},

	/**
	 * @method getBounds
	 * @return the bounding rect of all the rects in the list
	 */
	getBounds: function()
	{
		return this.list[ this.list.length-1 ].rect;
	},

	/**
	 * Returns the index of the smallest rectangle that contains both
	 * startPt and currPt.  Returns -1 if there is no such rectangle.  If
	 * startPt is inside the bounding rectangle and currPt is outside, we
	 * return the index of the bounding rectangle.
	 * 	
	 * @method getSelection
	 * @param start_pt {point} point where the drag started
	 * @param curr_pt {point} current cursor location
	 */
	getSelection: function(
		/* point */	start_pt,
		/* point */	curr_pt)
	{
		// Check if start_pt is in the bounding rect.

		var bounds = this.getBounds();
		if (!RectList.containsPt(bounds, start_pt))
		{
			return -1;
		}

		// The bounding rect is the last rect in the list.

		var minArea = 0;
		var result  = this.list.length-1;
		Y.Array.each(this.list, function(info, i)
		{
			var area = RectList.area(info.rect);
			if (RectList.containsPt(info.rect, start_pt) &&
				RectList.containsPt(info.rect, curr_pt) &&
				(minArea === 0 || area < minArea))
			{
				result  = i;
				minArea = area;
			}
		});

		return result;
	},

	/**
	 * Returns the index of the smallest rectangle enclosing the given one.
	 * 
	 * @method getParent
	 * @param index {int}
	 */
	getParent: function(
		/* int */	index)
	{
		var small_rect = this.list[index].rect;
		for (var i=index+1; i<this.list.length; i++)
			{
			var big_rect = this.list[i].rect;
			if (RectList.containsRect(big_rect, small_rect))
				{
				return i;
				}
			}

		// The last element is always the largest, and includes all others.

		return this.list.length-1;
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Base class for all functions rendered by MathCanvas.</p>
 * 
 * <p>Derived classes must implement toString() and evaluate().  To override
 * the default rendering which displays the output from toString(), implement
 * layout() and render().</p>
 * 
 * @class MathFunction
 * @constructor
 */

function MathFunction()
{
	this.parent = null;
}

MathFunction.name_map = {};		// applyTo

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
	 * @method layout
	 * @param context {object} the drawing context
	 * @param top_left {point} x,y coordinates of the top left of the bounding box
	 * @param font_size {float} percentage of the base font size
	 * @param rect_list {RectList} layout information
	 * @return {int} index of this items info in rect_list
	 */
	layout: function(
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
	 * @param context {object} the drawing context
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
	 * Overridden by Input.
	 *
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
		if (c == '+')
		{
			this._applyNArgFunction(canvas, Y.MathFunction.Sum);
			return true;
		}
		else if (c == '-')
		{
			this._applyNArgFunction(canvas, Y.MathFunction.Sum, true);
			return true;
		}
		else if (c == '*')
		{
			this._applyNArgFunction(canvas, Y.MathFunction.Product);
			return true;
		}
		else if (c == '/')
		{
			this._apply2ArgFunction(canvas, Y.MathFunction.Quotient);
			return true;
		}
		else if (c == '^')
		{
			this._apply2ArgFunction(canvas, Y.MathFunction.Exponential);
			return true;
		}
		else if (c == ',')
		{
			const p = this.getParent();
			if (p != null && p.getArgCount() < p.getMaxArgCount())
			{
				const i = new Y.MathFunction.Input();
				p.insertArgAfter(i, this);
				canvas.selectFunction(i);
				return true;
			}
		}

		return false;
	},

	_apply2ArgFunction: function(
		/* MathCanvas */	canvas,
		/* function */		ctor)
	{
		const p = this.getParent(),		// before constructing new parent
			  i = new Y.MathFunction.Input(),
			  f = new ctor(this, i);

		if (p != null)
		{
			p.replaceArg(this, f);
		}
		else
		{
			canvas.set('func', f);
		}

		canvas.selectFunction(i);
	},

	_applyNArgFunction: function(
		/* MathCanvas */	canvas,
		/* function */		ctor,
		/* bool */			negate)
	{
		const i = new Y.MathFunction.Input(),
			  v = negate ? new Y.MathFunction.Negate(i) : i;

		var p = this.getParent(),
			a = this;
		if (p instanceof Y.MathFunction.Negate)
		{
			a = p;
			p = p.getParent();
		}

		if (this instanceof ctor)
		{
			this.appendArg(v);
		}
		else if (p instanceof ctor)
		{
			p.insertArgAfter(v, a);
		}
		else if (p != null)
		{
			p.replaceArg(a, new ctor(a, v));
		}
		else
		{
			canvas.set('func', new ctor(a, v));
		}

		canvas.selectFunction(i);
	},

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
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Constant value</p>
 * 
 * @namespace MathFunction
 * @class Value
 * @extends MathFunction
 * @constructor
 * @param value {number}
 */

function MathValue(
	/* float */	value)
{
	MathValue.superclass.constructor.call(this);

	var is_string = Y.Lang.isString(value);
	if (is_string &&
		(value.indexOf('.') >= 0 ||
		 (!/x/i.test(value) && /e/i.test(value))))
	{
		this.value = parseFloat(value);
	}
	else if (is_string)
	{
		this.value = parseInt(value);	// do not force base, to allow hex
	}
	else
	{
		this.value = value;
	}
}

Y.extend(MathValue, MathFunction,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function()
	{
		return this.value;
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

MathFunction.Value = MathValue;
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Variable value</p>
 * 
 * @namespace MathFunction
 * @class Variable
 * @extends MathFunction
 * @constructor
 * @param name {String}
 */

function MathVariable(
	/* string */	name)
{
	MathVariable.superclass.constructor.call(this);
	this.name = name;
}

Y.extend(MathVariable, MathFunction,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		var v = var_list[ this.name ];
		if (Y.Lang.isUndefined(v))
		{
			throw new Error("undefined variable: " + this.name);
		}

		return (v instanceof MathFunction ? v.evaluate(var_list) : v);
	},

	/**
	 * @method toString
	 * @return text representation of the function
	 */
	toString: function()
	{
		return this.name;
	}
});

MathFunction.Variable = MathVariable;
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Pi</p>
 * 
 * @namespace MathFunction
 * @class Pi
 * @extends MathFunction
 * @constructor
 */

function MathPi()
{
	MathPi.superclass.constructor.call(this);
}

Y.extend(MathPi, MathFunction,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function()
	{
		return Math.PI;
	},

	/**
	 * @method toString
	 * @return text representation of the function
	 */
	toString: function()
	{
		return '\u03c0';
	}
});

MathFunction.Pi = MathPi;
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>e</p>
 * 
 * @namespace MathFunction
 * @class E
 * @extends MathFunction
 * @constructor
 */

function MathE()
{
	MathE.superclass.constructor.call(this);
}

Y.extend(MathE, MathFunction,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function()
	{
		return Math.E;
	},

	/**
	 * @method toString
	 * @return text representation of the function
	 */
	toString: function()
	{
		return 'e';
	}
});

MathFunction.E = MathE;
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>i (square root of -1)</p>
 * 
 * @namespace MathFunction
 * @class I
 * @extends MathFunction
 * @constructor
 */

function MathI()
{
	MathI.superclass.constructor.call(this);
}

Y.extend(MathI, MathFunction,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function()
	{
		return Y.ComplexMath.I;
	},

	/**
	 * @method toString
	 * @return text representation of the function
	 */
	toString: function()
	{
		return 'i';
	}
});

MathFunction.I = MathI;
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

// sync with MathParson.jison
const number_pattern = /^0x[0-9a-f]+$|^-?[1-9][0-9]*(\.([0-9]+)?)?$|^-?([0-9]+)?\.[0-9]+?$|^0$/i,
	  name_pattern   = /^[a-z]/i;

/**
 * @method replace
 * @static
 * @param f {MathFunction} function to be replaced by Input
 */
MathInput.replace = function(
	/* MathCanvas */	canvas,
	/* MathFunction */	f)
{
	const p = f.getParent(),
		  i = new Y.MathFunction.Input();

	if (p != null)
	{
		p.replaceArg(f, i);
	}
	else
	{
		canvas.set('func', i);
	}

	return i;
};

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
	 * @method layout
	 * @param context {object} the drawing context
	 * @param top_left {point} x,y coordinates of the top left of the bounding box
	 * @param font_size {float} percentage of the base font size
	 * @param rect_list {RectList} layout information
	 * @return {int} index of this items info in rect_list
	 */
	layout: function(
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
	 * @param context {object} the drawing context
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

		const brackets = context.drawSquareBrackets(r);
		context.drawString(x, info.midline, info.font_size, this.text);

		if (!number_pattern.test(this.text) && !name_pattern.test(this.text))
		{
			brackets.forEach(function(n)
			{
				n.classList.add('invalid-input');
			});
		}
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
				alert(Y.Lang.sub(Y.MathCanvas.Strings.unknown_function,
				{
					name: this.text
				}));
			}
		}
		else if (c == 'e' && number_pattern.test(this.text))
		{
			this._applyNArgFunction(canvas, Y.MathFunction.Product);

			this.getParent().replaceArg(this, new Y.MathFunction.Exponential(new Y.MathFunction.Value(10), this));
			canvas.selectFunction(this);
		}
		else if (c == '+')
		{
			this._applyNArgFunction(canvas, Y.MathFunction.Sum);
		}
		else if (c == '-' && !this.isEmpty())
		{
			this._applyNArgFunction(canvas, Y.MathFunction.Sum);

			this.getParent().replaceArg(this, new Y.MathFunction.Negate(this));
			canvas.selectFunction(this);
		}
		else if (c == '*')
		{
			this._applyNArgFunction(canvas, Y.MathFunction.Product);
		}
		else if (c == '/')
		{
			this._apply2ArgFunction(canvas, Y.MathFunction.Quotient);
		}
		else if (c == '^')
		{
			this._apply2ArgFunction(canvas, Y.MathFunction.Exponential);
		}
		else if (c == ',')
		{
			const p = this.getParent();
			if (p != null && p.getArgCount() < p.getMaxArgCount())
			{
				const v = Y.MathCanvas.parse(this.text);
				p.insertArgBefore(v, this);
				this.clear();
				canvas.selectFunction(this);
			}
		}
		else if (c == ' ' || code == 13 || c == '=')
		{
			const v = Y.MathCanvas.parse(this.text),
				  p = this.getParent();

			if (p != null)
			{
				p.replaceArg(this, v);
			}
			else
			{
				canvas.set('func', v);
			}
		}
		else if (c.length == 1 && this.isEmpty())
		{
			this.text = c;
		}
		else if (c.length == 1)
		{
			this.text += c;
		}

		return true;
	},

	_apply2ArgFunction: function(
		/* MathCanvas */	canvas,
		/* function */		ctor)
	{
		const p = this.getParent(),		// before constructing new parent
			  f = new ctor(Y.MathCanvas.parse(this.text), this);

		if (p != null)
		{
			p.replaceArg(this, f);
		}
		else
		{
			canvas.set('func', f);
		}

		this.clear();
		canvas.selectFunction(this);
	},

	_applyNArgFunction: function(
		/* MathCanvas */	canvas,
		/* function */		ctor,
		/* bool */			negate)
	{
		const v = Y.MathCanvas.parse(this.text);

		var p = this.getParent();
		if (p instanceof Y.MathFunction.Negate)
		{
			const a = p;
			a.replaceArg(this, v);

			p = p.getParent();
			if (p instanceof ctor)
			{
				p.insertArgAfter(this, a);
			}
			else if (p != null)
			{
				p.replaceArg(a, new ctor(a, this));
			}
			else
			{
				canvas.set('func', new ctor(a, this));
			}
		}
		else if (p instanceof ctor)
		{
			p.insertArgBefore(v, this);
		}
		else if (p != null)
		{
			p.replaceArg(this, new ctor(v, this));
		}
		else
		{
			canvas.set('func', new ctor(v, this));
		}

		this.clear();
		canvas.selectFunction(this);
	}
});

MathFunction.Input = MathInput;
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Function that takes one or more arguments.</p>
 * 
 * @namespace MathFunction
 * @class FunctionWithArgs
 * @extends MathFunction
 * @constructor
 * @param name {String} the name of the function
 * @param args {MathFunction|Array} the arguments
 */

function MathFunctionWithArgs(
	/* string */		name,
	/* MathFunction */	args)
{
	MathFunctionWithArgs.superclass.constructor.call(this);
	this.name = name;

	if (Y.Lang.isArray(args) && Y.Lang.isArray(args[0]))
	{
		args = args[0];
	}

	this.args = [];
	if (Y.Lang.isArray(args))
	{
		for (var i=0; i<args.length; i++)
		{
			this.appendArg(args[i]);
		}
	}
	else
	{
		for (var i=1; i<arguments.length; i++)
		{
			this.appendArg(arguments[i]);
		}
	}
}

Y.extend(MathFunctionWithArgs, MathFunction,
{
	/**
	 * By default, we assume the number of arguments is fixed.  Derived
	 * classes can override.
	 *
	 * @method getMaxArgCount
	 * @return {int} maximum number of arguments
	 */
	getMaxArgCount: function()
	{
		return this.args.length;
	},

	/**
	 * @method getArgCount
	 * @return {int} number of arguments
	 */
	getArgCount: function()
	{
		return this.args.length;
	},

	/**
	 * @method getArg
	 * @return {MathFunction} requested argument, or undefined
	 */
	getArg: function(
		/* int */ index)
	{
		return this.args[index];
	},

	/**
	 * @method getArgs
	 * @return {Array} array of arguments
	 */
	getArgs: function()
	{
		return this.args;
	},

	/**
	 * @method insertArgBefore
	 * @param f {MathFunction}
	 * @param before {MathFunction}
	 */
	insertArgBefore: function(
		/* MathFunction */	f,
		/* MathFunction */	before)
	{
		var i = Y.Array.indexOf(this.args, before);
		if (i >= 0)
		{
			f.parent = this;
			this.args.splice(i, 0, f);
		}
		else
		{
			this.appendArg(f);
		}
	},

	/**
	 * @method insertArgAfter
	 * @param f {MathFunction}
	 * @param after {MathFunction}
	 */
	insertArgAfter: function(
		/* MathFunction */	f,
		/* MathFunction */	after)
	{
		var i = Y.Array.indexOf(this.args, after);
		if (i >= 0)
		{
			f.parent = this;
			this.args.splice(i+1, 0, f);
		}
		else
		{
			this.appendArg(f);
		}
	},

	/**
	 * @method appendArg
	 * @param f {MathFunction}
	 */
	appendArg: function(
		/* MathFunction */	f)
	{
		f.parent = this;
		this.args.push(f);
	},

	/**
	 * @method removeArg
	 * @param f {MathFunction}
	 */
	removeArg: function(
		/* MathFunction */	f)
	{
		var i = Y.Array.indexOf(this.args, f);
		if (i >= 0)
		{
			f.parent = null;
			this.args.splice(i,1);
		}
	},

	/**
	 * If origArg is an argument, replaces origArg with newArg.
	 * 
	 * @method replaceArg
	 * @param origArg {MathFunction} original argument
	 * @param newArg {MathFunction} new argument
	 */
	replaceArg: function(
		/* MathFunction */	origArg,
		/* MathFunction */	newArg)
	{
		var i = Y.Array.indexOf(this.args, origArg);
		if (i >= 0)
		{
			if (origArg.parent == this)		// might already have moved
				{
				origArg.parent = null;
				}
			newArg.parent = this;
			this.args[i]  = newArg;
		}
	},

	/**
	 * @method evaluateArgs
	 * @protected
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return list of argument values, from calling evaluate()
	 */
	evaluateArgs: function(
		/* map */	var_list)
	{
		return Y.Array.map(this.args, function(arg)
		{
			return arg.evaluate(var_list);
		});
	},

	/**
	 * @method layout
	 * @param context {object} the drawing context
	 * @param top_left {point} x,y coordinates of the top left of the bounding box
	 * @param font_size {float} percentage of the base font size
	 * @param rect_list {RectList} layout information
	 * @return {int} index of this items info in rect_list
	 */
	layout: function(
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
			right:  top_left.x + context.getStringWidth(font_size, this.name)
		};

		var midline = RectList.ycenter(r);

		// get rectangle for each argument

		var orig_midline = midline;

		var arg_top_left = { x: r.right, y: r.top };
		var sep_width    = context.getStringWidth(font_size, ', ');
		var arg_count    = this.args.length;

		var arg_i = [];
		for (var i=0; i<arg_count; i++)
		{
			var j     = this.args[i].layout(context, arg_top_left, font_size, rect_list);
			var info  = rect_list.get(j);
			var arg_r = info.rect;

			arg_top_left.x = arg_r.right + sep_width;
			r              = RectList.cover(r, arg_r);

			midline = Math.max(midline, info.midline);
			arg_i.push(j);
		}

		// adjust the argument rectangles so all the midlines are the same
		// (our midline is guaranteed to stay constant)

		if (arg_count > 1 && midline > orig_midline)
		{
			for (var i=0; i<arg_count; i++)
			{
				var j = arg_i[i];
				rect_list.setMidline(j, midline);
				r = RectList.cover(r, rect_list.get(j).rect);
			}
		}

		// Now that the midlines are the same, the height of our rectangle is
		// the height of the parentheses.  We have to shift all the arguments
		// to the right to make space for the left parenthesis.  By shifting
		// the rightmost one first, we avoid overlapping anything.

		var paren_w = context.getParenthesisWidth(r);

		for (var i=0; i<arg_count; i++)
		{
			rect_list.shift(arg_i[i], paren_w, 0);
		}

		// make space for 2 parentheses

		r.right += 2 * paren_w;

		return rect_list.add(r, midline, font_size, this);
	},

	/**
	 * @method render
	 * @param context {object} the drawing context
	 * @param rect_list {RectList} layout information
	 */
	render: function(
		/* Context2d */	context,
		/* RectList */	rect_list)
	{
		var info = rect_list.find(this);
		context.drawString(info.rect.left, info.midline, info.font_size, this.name);

		var r  =
		{
			top:    info.rect.top,
			bottom: info.rect.bottom
		};

		for (var i=0; i<this.args.length; i++)
		{
			this.args[i].render(context, rect_list);

			var info  = rect_list.find(this.args[i]);
			var arg_r = info.rect;
			if (i === 0)
			{
				r.left = arg_r.left;
			}

			if (i < this.args.length-1)
			{
				context.drawString(arg_r.right, info.midline, info.font_size, ',');
			}
			else
			{
				r.right = arg_r.right;
				context.drawParentheses(r);
			}
		}
	},

	/**
	 * @method toString
	 * @return text representation of the function
	 */
	toString: function()
	{
		return this.name + '(' + this.args.join(',') + ')';
	},

	/**
	 * Print an argument, with parentheses if necessary.
	 * 
	 * @method _printArg
	 * @protected
	 * @param index {number|MathFunction} argument index or MathFunction
	 * @return {string} the string representation of the argument
	 */
	_printArg: function(
		/* int */	index)
	{
		var arg = index instanceof MathFunction ? index : this.args[index];
		if (arg.parenthesizeForPrint(this))
		{
			return '(' + arg + ')';
		}
		else
		{
			return arg.toString();
		}
	}
});

MathFunction.FunctionWithArgs = MathFunctionWithArgs;
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Negate a number.</p>
 * 
 * @namespace MathFunction
 * @class Negate
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathNegate(
	/* MathFunction */	f)
{
	MathNegate.superclass.constructor.call(this, MathNegate.NAME, f);
}

MathNegate.NAME = 'negate';

Y.extend(MathNegate, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.subtract(0, this.args[0].evaluate(var_list));
	},

	/**
	 * @method layout
	 * @param context {object} the drawing context
	 * @param top_left {point} x,y coordinates of the top left of the bounding box
	 * @param font_size {float} percentage of the base font size
	 * @param rect_list {RectList} layout information
	 * @return {int} index of this items info in rect_list
	 */
	layout: function(
		/* Context2d */		context,
		/* point */			top_left,
		/* percentage */	font_size,
		/* RectList */		rect_list)
	{
		var arg_top_left = Y.clone(top_left, true);
		arg_top_left.x  += context.getStringWidth(font_size, '-');

		var arg = this.args[0];
		if (arg instanceof MathQuotient)
		{
			arg_top_left.x += context.getSpaceWidth(font_size);
		}

		var total_rect =
		{
			top:    top_left.y,
			left:   top_left.x,
			bottom: top_left.y + context.getLineHeight(font_size),
			right:  arg_top_left.x
		};

		var arg_index = arg.layout(context, arg_top_left, font_size, rect_list);
		var arg_info  = rect_list.get(arg_index);

		if (arg.parenthesizeForRender(this))
		{
			var paren_width = context.getParenthesisWidth(arg_info.rect);
			rect_list.shift(arg_index, paren_width, 0);
			total_rect.right = arg_info.rect.right + paren_width;
		}

		total_rect = RectList.cover(total_rect, arg_info.rect);

		return rect_list.add(total_rect, arg_info.midline, font_size, this);
	},

	/**
	 * @method render
	 * @param context {object} the drawing context
	 * @param rect_list {RectList} layout information
	 */
	render: function(
		/* Context2d */	context,
		/* RectList */	rect_list)
	{
		var info = rect_list.find(this);
		context.drawString(info.rect.left, info.midline, info.font_size, '-');

		var arg = this.args[0];
		arg.render(context, rect_list);

		if (arg.parenthesizeForRender(this))
		{
			var arg_info = rect_list.find(arg);
			context.drawParentheses(arg_info.rect);
		}
	},

	/**
	 * @method toString
	 * @return text representation of the function
	 */
	toString: function()
	{
		return '-' + this._printArg(0);
	}
});

MathFunction.Negate = MathNegate;

MathFunction.name_map[ MathNegate.NAME ] =
{
	applyTo: function(f)
	{
		return new MathNegate(f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Sum of values.</p>
 * 
 * @namespace MathFunction
 * @class Sum
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 */

function MathSum()
{
	MathMax.superclass.constructor.call(this, "+", new Y.Array(arguments));
}

Y.extend(MathSum, MathFunctionWithArgs,
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
		return Y.ComplexMath.add(this.evaluateArgs(var_list));
	},

	/**
	 * @method layout
	 * @param context {object} the drawing context
	 * @param top_left {point} x,y coordinates of the top left of the bounding box
	 * @param font_size {float} percentage of the base font size
	 * @param rect_list {RectList} layout information
	 * @return {int} index of this items info in rect_list
	 */
	layout: function(
		/* Context2d */		context,
		/* point */			top_left,
		/* percentage */	font_size,
		/* RectList */		rect_list)
	{
		var arg_top_left = Y.clone(top_left, true);

		var total_rect =
		{
			top:    top_left.y,
			left:   top_left.x,
			bottom: top_left.y + context.getLineHeight(font_size),
			right:  top_left.x
		};

		var total_midline = RectList.ycenter(total_rect);
		var orig_midline  = total_midline;

		var space_width = context.getSpaceWidth(font_size);
		var plus_width  = context.getStringWidth(font_size, '+');
		var minus_width = context.getStringWidth(font_size, '-');

		Y.Array.each(this.args, function(arg, index)
		{
			var f = this;
			if (arg instanceof MathNegate)
			{
				if (index > 0)
				{
					arg_top_left.x += space_width;
				}
				arg_top_left.x += minus_width + space_width;

				f   = arg;
				arg = arg.args[0];
			}
			else if (index > 0)
			{
				arg_top_left.x += plus_width + 2*space_width;
			}

			var arg_index  = arg.layout(context, arg_top_left, font_size, rect_list);
			var arg_info   = rect_list.get(arg_index);
			arg_top_left.x = arg_info.rect.right;

			if (arg.parenthesizeForRender(f))
			{
				var paren_width = context.getParenthesisWidth(arg_info.rect);
				rect_list.shift(arg_index, paren_width, 0);
				arg_top_left.x  += 2*paren_width;
				total_rect.right = arg_info.rect.right + paren_width;
			}

			total_rect    = RectList.cover(total_rect, arg_info.rect);
			total_midline = Math.max(total_midline, arg_info.midline);
		},
		this);

		// adjust the argument rectangles so all the midlines are the same
		// (ourMidline is guaranteed to stay constant)

		if (this.args.length > 1 && total_midline > orig_midline)
		{
			Y.Array.each(this.args, function(arg)
			{
				if (arg instanceof MathNegate)
				{
					arg = arg.args[0];
				}

				var index = rect_list.findIndex(arg);
				rect_list.setMidline(index, total_midline);
				total_rect = RectList.cover(total_rect, rect_list.get(index).rect);
			});
		}

		return rect_list.add(total_rect, total_midline, font_size, this);
	},

	/**
	 * @method render
	 * @param context {object} the drawing context
	 * @param rect_list {RectList} layout information
	 */
	render: function(
		/* Context2d */	context,
		/* RectList */	rect_list)
	{
		var info        = rect_list.find(this);
		var x           = info.rect.left;
		var space_width = context.getSpaceWidth(info.font_size);

		Y.Array.each(this.args, function(arg, index)
		{
			var f = this;
			if (arg instanceof MathNegate)
			{
				context.drawString(x, info.midline, info.font_size, '-');
				f   = arg;
				arg = arg.args[0];
			}
			else if (index > 0)
			{
				context.drawString(x, info.midline, info.font_size, '+');
			}

			arg.render(context, rect_list);

			var arg_info = rect_list.find(arg);
			x            = arg_info.rect.right;

			if (arg.parenthesizeForRender(f))
			{
				context.drawParentheses(arg_info.rect);
				x += context.getParenthesisWidth(arg_info.rect);
			}

			x += space_width;
		},
		this);
	},

	/**
	 * @method toString
	 * @return text representation of the function
	 */
	toString: function()
	{
		return Y.Array.reduce(this.args, '', function(s, arg, index)
		{
			if (arg instanceof MathNegate)
			{
				s += '-';
				arg = arg.args[0];
			}
			else if (index > 0)
			{
				s += '+';
			}

			return s + this._printArg(arg);
		},
		this);
	}
});

MathFunction.Sum = MathSum;
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Product of values.</p>
 * 
 * @namespace MathFunction
 * @class Product
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 */

function MathProduct()
{
	MathMax.superclass.constructor.call(this, "*", new Y.Array(arguments));
}

Y.extend(MathProduct, MathFunctionWithArgs,
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
		return Y.ComplexMath.multiply(this.evaluateArgs(var_list));
	},

	/**
	 * @method layout
	 * @param context {object} the drawing context
	 * @param top_left {point} x,y coordinates of the top left of the bounding box
	 * @param font_size {float} percentage of the base font size
	 * @param rect_list {RectList} layout information
	 * @return {int} index of this items info in rect_list
	 */
	layout: function(
		/* Context2d */		context,
		/* point */			top_left,
		/* percentage */	font_size,
		/* RectList */		rect_list)
	{
		var arg_top_left = Y.clone(top_left, true);

		var total_rect =
		{
			top:    top_left.y,
			left:   top_left.x,
			bottom: top_left.y + context.getLineHeight(font_size),
			right:  top_left.x
		};

		var total_midline = RectList.ycenter(total_rect);
		var orig_midline  = total_midline;

		var times_width = context.getStringWidth(font_size, '\u00b7');

		Y.Array.each(this.args, function(arg, index)
		{
			var arg_index  = arg.layout(context, arg_top_left, font_size, rect_list);
			var arg_info   = rect_list.get(arg_index);
			arg_top_left.x = arg_info.rect.right + times_width;

			if (arg.parenthesizeForRender(this))
			{
				var paren_width = context.getParenthesisWidth(arg_info.rect);
				rect_list.shift(arg_index, paren_width, 0);
				arg_top_left.x  += 2*paren_width;
				total_rect.right = arg_info.rect.right + paren_width;
			}

			total_rect    = RectList.cover(total_rect, arg_info.rect);
			total_midline = Math.max(total_midline, arg_info.midline);
		},
		this);

		// adjust the argument rectangles so all the midlines are the same
		// (ourMidline is guaranteed to stay constant)

		if (this.args.length > 1 && total_midline > orig_midline)
		{
			Y.Array.each(this.args, function(arg)
			{
				var index = rect_list.findIndex(arg);
				rect_list.setMidline(index, total_midline);
				total_rect = RectList.cover(total_rect, rect_list.get(index).rect);
			});
		}

		return rect_list.add(total_rect, total_midline, font_size, this);
	},

	/**
	 * @method render
	 * @param context {object} the drawing context
	 * @param rect_list {RectList} layout information
	 */
	render: function(
		/* Context2d */	context,
		/* RectList */	rect_list)
	{
		var info = rect_list.find(this);
		var x    = info.rect.left;

		Y.Array.each(this.args, function(arg, index)
		{
			if (index > 0)
			{
				context.drawString(x, info.midline, info.font_size, '\u00b7');
			}

			arg.render(context, rect_list);

			var arg_info = rect_list.find(arg);
			x            = arg_info.rect.right;

			if (arg.parenthesizeForRender(this))
			{
				context.drawParentheses(arg_info.rect);
				x += context.getParenthesisWidth(arg_info.rect);
			}
		},
		this);
	},

	/**
	 * @method toString
	 * @return text representation of the function
	 */
	toString: function()
	{
		return Y.Array.reduce(this.args, '', function(s, arg, index)
		{
			if (index > 0)
			{
				s += '*';
			}

			return s + this._printArg(index);
		},
		this);
	}
});

MathFunction.Product = MathProduct;
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Quotient of values.</p>
 * 
 * @namespace MathFunction
 * @class Quotient
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param n {MathFunction} numerator
 * @param d {MathFunction} denominator
 */

function MathQuotient(
	/* MathFunction */	n,
	/* MathFunction */	d)
{
	MathQuotient.superclass.constructor.call(this, "/", n, d);
}

Y.extend(MathQuotient, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.divide(this.args[0].evaluate(var_list),
									this.args[1].evaluate(var_list));
	},

	/**
	 * @method layout
	 * @param context {object} the drawing context
	 * @param top_left {point} x,y coordinates of the top left of the bounding box
	 * @param font_size {float} percentage of the base font size
	 * @param rect_list {RectList} layout information
	 * @return {int} index of this items info in rect_list
	 */
	layout: function(
		/* Context2d */		context,
		/* point */			top_left,
		/* percentage */	font_size,
		/* RectList */		rect_list)
	{
		var total_rect =
		{
			top:    top_left.y,
			left:   top_left.x,
			bottom: top_left.y,
			right:  top_left.x
		};

		var space_width = context.getSpaceWidth(font_size);

		var arg_top_left = Y.clone(top_left, true);
		arg_top_left.x += space_width;

		// get rectangle for numerator

		var n_arg_index = this.args[0].layout(context, arg_top_left, font_size, rect_list);
		var n_arg_info  = rect_list.get(n_arg_index);
		arg_top_left.y  = n_arg_info.rect.bottom;
		total_rect      = RectList.cover(total_rect, n_arg_info.rect);

		// create space for division line

		var bar_height    = context.getHorizontalBarHeight();
		var total_midline = arg_top_left.y + bar_height/2;
		arg_top_left.y   += bar_height;

		// get rectangle for denominator

		var d_arg_index = this.args[1].layout(context, arg_top_left, font_size, rect_list);
		var d_arg_info  = rect_list.get(d_arg_index);
		total_rect      = RectList.cover(total_rect, d_arg_info.rect);

		// align centers of numerator and denominator horizontally
		// (this is guaranteed to leave ourRect constant)

		var dx = (n_arg_info.rect.right - d_arg_info.rect.right)/2;
		if (dx > 0)
		{
			rect_list.shift(d_arg_index, dx, 0);
		}
		else if (dx < 0)
		{
			rect_list.shift(n_arg_index, -dx, 0);
		}

		// add one extra space at the right so division line is wider than arguments

		total_rect.right += space_width;

		return rect_list.add(total_rect, total_midline, font_size, this);
	},

	/**
	 * @method render
	 * @param context {object} the drawing context
	 * @param rect_list {RectList} layout information
	 */
	render: function(
		/* Context2d */	context,
		/* RectList */	rect_list)
	{
		var info = rect_list.find(this);

		var bar_height = context.getHorizontalBarHeight();
		var bar_rect =
		{
			top:    info.midline - bar_height/2,
			left:   info.rect.left,
			bottom: info.midline + bar_height/2,
			right:  info.rect.right
		};

		this.args[0].render(context, rect_list);
		context.drawHorizontalBar(bar_rect);
		this.args[1].render(context, rect_list);
	},

	/**
	 * @method toString
	 * @return text representation of the function
	 */
	toString: function()
	{
		return this._printArg(0) + '/' + this._printArg(1);
	}
});

MathFunction.Quotient = MathQuotient;
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Magnitude (absolute value) of a number.</p>
 * 
 * @namespace MathFunction
 * @class Magnitude
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathMagnitude(
	/* MathFunction */	f)
{
	MathMagnitude.superclass.constructor.call(this, MathMagnitude.NAME, f);
}

MathMagnitude.NAME = 'abs';

Y.extend(MathMagnitude, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.abs(this.args[0].evaluate(var_list));
	},

	/**
	 * @method layout
	 * @param context {object} the drawing context
	 * @param top_left {point} x,y coordinates of the top left of the bounding box
	 * @param font_size {float} percentage of the base font size
	 * @param rect_list {RectList} layout information
	 * @return {int} index of this items info in rect_list
	 */
	layout: function(
		/* Context2d */		context,
		/* point */			top_left,
		/* percentage */	font_size,
		/* RectList */		rect_list)
	{
		var bar_width = context.getVerticalBarWidth();

		var arg       = this.args[0];
		var arg_index = arg.layout(context, top_left, font_size, rect_list);
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

	/**
	 * @method render
	 * @param context {object} the drawing context
	 * @param rect_list {RectList} layout information
	 */
	render: function(
		/* Context2d */	context,
		/* RectList */	rect_list)
	{
		var info = rect_list.find(this);
		context.drawVerticalBar(info.rect);

		this.args[0].render(context, rect_list);

		var r  = Y.clone(info.rect, true);
		r.left = r.right - context.getVerticalBarWidth();
		context.drawVerticalBar(r);
	}
});

MathFunction.Magnitude = MathMagnitude;

MathFunction.name_map[ MathMagnitude.NAME ] =
{
	applyTo: function(f)
	{
		return new MathMagnitude(f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Phase of a complex number.</p>
 * 
 * @namespace MathFunction
 * @class Phase
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathPhase(
	/* MathFunction */	f)
{
	MathPhase.superclass.constructor.call(this, MathPhase.NAME, f);
}

MathPhase.NAME = 'arg';

Y.extend(MathPhase, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.phase(this.args[0].evaluate(var_list));
	}
});

MathFunction.Phase = MathPhase;

MathFunction.name_map[ MathPhase.NAME ] =
{
	applyTo: function(f)
	{
		return new MathPhase(f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Conjugate of a complex number.</p>
 * 
 * @namespace MathFunction
 * @class Conjugate
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathConjugate(
	/* MathFunction */	f)
{
	MathConjugate.superclass.constructor.call(this, MathConjugate.NAME, f);
}

MathConjugate.NAME = 'conjugate';

Y.extend(MathConjugate, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.conjugate(this.args[0].evaluate(var_list));
	},

	/**
	 * @method layout
	 * @param context {object} the drawing context
	 * @param top_left {point} x,y coordinates of the top left of the bounding box
	 * @param font_size {float} percentage of the base font size
	 * @param rect_list {RectList} layout information
	 * @return {int} index of this items info in rect_list
	 */
	layout: function(
		/* Context2d */		context,
		/* point */			top_left,
		/* percentage */	font_size,
		/* RectList */		rect_list)
	{
		var bar_height = context.getHorizontalBarHeight();

		var arg_top_left = Y.clone(top_left, true);
		arg_top_left.y  += bar_height;

		var arg_index = this.args[0].layout(context, arg_top_left, font_size, rect_list);
		var arg_info  = rect_list.get(arg_index);

		var r  = Y.clone(arg_info.rect, true);
		r.top -= bar_height;

		return rect_list.add(r, arg_info.midline, font_size, this);
	},

	/**
	 * @method render
	 * @param context {object} the drawing context
	 * @param rect_list {RectList} layout information
	 */
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

MathFunction.name_map[ MathConjugate.NAME ] =
{
	applyTo: function(f)
	{
		return new MathConjugate(f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Rotate a complex number around the origin.</p>
 * 
 * @namespace MathFunction
 * @class Rotate
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathRotate(
	/* MathFunction */	v,
	/* MathFunction */	a)
{
	MathRotate.superclass.constructor.call(this, MathRotate.NAME, v, a);
}

MathRotate.NAME = 'rotate';

Y.extend(MathRotate, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.rotate(this.args[0].evaluate(var_list),
									this.args[1].evaluate(var_list));
	}
});

MathFunction.Rotate = MathRotate;

MathFunction.name_map[ MathRotate.NAME ] =
{
	applyTo: function(f)
	{
		return new MathRotate(f, new Y.MathFunction.Input());
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Real part of a complex number.</p>
 * 
 * @namespace MathFunction
 * @class RealPart
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathRealPart(
	/* MathFunction */	f)
{
	MathRealPart.superclass.constructor.call(this, MathRealPart.NAME, f);
}

MathRealPart.NAME = 're';

Y.extend(MathRealPart, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		var value = this.args[0].evaluate(var_list);
		return Y.ComplexMath.isComplexNumber(value) ? value.real() : value;
	}
});

MathFunction.RealPart = MathRealPart;

MathFunction.name_map[ MathRealPart.NAME ] =
{
	applyTo: function(f)
	{
		return new MathRealPart(f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Imaginary part of a complex number.</p>
 * 
 * @namespace MathFunction
 * @class ImaginaryPart
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathImaginaryPart(
	/* MathFunction */	f)
{
	MathImaginaryPart.superclass.constructor.call(this, MathImaginaryPart.NAME, f);
}

MathImaginaryPart.NAME = 'im';

Y.extend(MathImaginaryPart, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		var value = this.args[0].evaluate(var_list);
		return Y.ComplexMath.isComplexNumber(value) ? value.imag() : 0;
	}
});

MathFunction.ImaginaryPart = MathImaginaryPart;

MathFunction.name_map[ MathImaginaryPart.NAME ] =
{
	applyTo: function(f)
	{
		return new MathImaginaryPart(f);
	}
};
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
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Square root.</p>
 * 
 * @namespace MathFunction
 * @class SquareRoot
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathSquareRoot(
	/* MathFunction */	f)
{
	MathSquareRoot.superclass.constructor.call(this, MathSquareRoot.NAME, f);
}

MathSquareRoot.NAME = 'sqrt';

Y.extend(MathSquareRoot, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.sqrt(this.args[0].evaluate(var_list));
	},

	/**
	 * @method layout
	 * @param context {object} the drawing context
	 * @param top_left {point} x,y coordinates of the top left of the bounding box
	 * @param font_size {float} percentage of the base font size
	 * @param rect_list {RectList} layout information
	 * @return {int} index of this items info in rect_list
	 */
	layout: function(
		/* Context2d */		context,
		/* point */			top_left,
		/* percentage */	font_size,
		/* RectList */		rect_list)
	{
		var arg_index = this.args[0].layout(context, top_left, font_size, rect_list);
		var arg_info  = rect_list.get(arg_index);
		var arg_h     = RectList.height(arg_info.rect);

		var leading  = 1+Math.round(2.0*arg_h/(4.0*Math.sqrt(3.0)));
		var trailing = 3;
		var extra    = 4;

		rect_list.shift(arg_index, leading, extra);		// make space for square root sign

		var r =
		{
			top:    top_left.y,
			left:   top_left.x,
			bottom: arg_info.rect.bottom,
			right:  arg_info.rect.right + trailing
		};

		return rect_list.add(r, arg_info.midline, font_size, this);
	},

	/**
	 * @method render
	 * @param context {object} the drawing context
	 * @param rect_list {RectList} layout information
	 */
	render: function(
		/* Context2d */	context,
		/* RectList */	rect_list)
	{
		var info = rect_list.find(this);
		this._drawSquareRoot(context, info.rect);
		this.args[0].render(context, rect_list);
	},

	/**
	 * @method _drawSquareRoot
	 * @private
	 * @param context {Context2d}
	 * @param rect {Object}
	 */
	_drawSquareRoot: function(
		/* Context2d */		context,
		/* rect */			rect)
	{
		var h = RectList.height(rect),
			w = Math.round((h-3)/(4.0*Math.sqrt(3.0)));

		context.drawLines(
			rect.left,     rect.top + Math.round(3.0*h/4.0),
			'd', w,        rect.bottom - 1,
			'd', w,        rect.top+2,
			rect.right-1,  null,
			null,          'd', Math.round(h/8.0));
	}
});

MathFunction.SquareRoot = MathSquareRoot;

MathFunction.name_map[ MathSquareRoot.NAME ] =
{
	applyTo: function(f)
	{
		return new MathSquareRoot(f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Exponential.</p>
 * 
 * @namespace MathFunction
 * @class Exponential
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param b {MathFunction} base
 * @param e {MathFunction} exponent
 */

function MathExponential(
	/* MathFunction */	b,
	/* MathFunction */	e)
{
	MathExponential.superclass.constructor.call(this, MathExponential.NAME, b, e);
}

MathExponential.NAME = 'exp';

Y.extend(MathExponential, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.pow(this.args[0].evaluate(var_list),
								 this.args[1].evaluate(var_list));
	},

	/**
	 * @method layout
	 * @param context {object} the drawing context
	 * @param top_left {point} x,y coordinates of the top left of the bounding box
	 * @param font_size {float} percentage of the base font size
	 * @param rect_list {RectList} layout information
	 * @return {int} index of this items info in rect_list
	 */
	layout: function(
		/* Context2d */		context,
		/* point */			top_left,
		/* percentage */	font_size,
		/* RectList */		rect_list)
	{
		var space_width = context.getSpaceWidth(font_size);

		var arg_top_left = Y.clone(top_left, true);
		arg_top_left.x += space_width;

		// get rectangle for base

		var b_arg_index = this.args[0].layout(context, arg_top_left, font_size, rect_list);
		var b_arg_info  = rect_list.get(b_arg_index);
		arg_top_left.x  = b_arg_info.rect.right;

		if (this.args[0].parenthesizeForRender(this))
		{
			var paren_width = context.getParenthesisWidth(b_arg_info.rect);
			rect_list.shift(b_arg_index, paren_width, 0);
			arg_top_left.x += 2*paren_width;
		}

		// get rectangle for exponent

		var e_font_size = context.getSuperSubFontSize(font_size);

		var e_arg_index = this.args[1].layout(context, arg_top_left, e_font_size, rect_list);
		var e_arg_info  = rect_list.get(e_arg_index);

		// calculate our rectangle

		var total_rect =
		{
			top:    top_left.y,
			left:   top_left.x,
			bottom: top_left.y + RectList.height(e_arg_info.rect) + context.getSuperscriptHeight(b_arg_info.rect),
			right:  e_arg_info.rect.right
		};

		// shift the base down to the correct position inside ourRect

		if (total_rect.bottom > b_arg_info.rect.bottom)
		{
			rect_list.shift(b_arg_index, 0, total_rect.bottom - b_arg_info.rect.bottom);
		}
		else
		{
			total_rect.bottom = b_arg_info.rect.bottom;
		}

		return rect_list.add(total_rect, b_arg_info.midline, font_size, this);
	},

	/**
	 * @method render
	 * @param context {object} the drawing context
	 * @param rect_list {RectList} layout information
	 */
	render: function(
		/* Context2d */	context,
		/* RectList */	rect_list)
	{
		if (this.args[0].parenthesizeForRender(this))
		{
			var info = rect_list.find(this.args[0]);
			context.drawParentheses(info.rect);
		}

		this.args[0].render(context, rect_list);
		this.args[1].render(context, rect_list);
	},

	/**
	 * @method toString
	 * @return text representation of the function
	 */
	toString: function()
	{
		return this._printArg(0) + '^' + this._printArg(1);
	}
});

MathFunction.Exponential = MathExponential;

MathFunction.name_map[ MathExponential.NAME ] =
{
	applyTo: function(f)
	{
		return new MathExponential(f, new Y.MathFunction.Input());
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Logarithm.</p>
 * 
 * @namespace MathFunction
 * @class Logarithm
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param b {MathFunction} base
 * @param v {MathFunction} value
 */

function MathLogarithm(
	/* MathFunction */	b,
	/* MathFunction */	v)
{
	MathLogarithm.superclass.constructor.call(this, MathLogarithm.NAME, b, v);
}

MathLogarithm.NAME = 'log';

Y.extend(MathLogarithm, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.divide(
			Y.ComplexMath.log(this.args[1].evaluate(var_list)),
			Y.ComplexMath.log(this.args[0].evaluate(var_list)));
	},

	/**
	 * @method layout
	 * @param context {object} the drawing context
	 * @param top_left {point} x,y coordinates of the top left of the bounding box
	 * @param font_size {float} percentage of the base font size
	 * @param rect_list {RectList} layout information
	 * @return {int} index of this items info in rect_list
	 */
	layout: function(
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
			right:  top_left.x + context.getStringWidth(font_size, 'log')
		};

		var arg_top_left =
		{
			x: total_rect.right,
			y: total_rect.top
		};

		// get rectangle for base

		var b_font_size = context.getSuperSubFontSize(font_size);

		var b_arg_index = this.args[0].layout(context, arg_top_left, b_font_size, rect_list);
		var b_arg_info  = rect_list.get(b_arg_index);
		arg_top_left.x  = b_arg_info.rect.right;

		// get rectangle for value -- gives our midline

		var v_arg_index = this.args[1].layout(context, arg_top_left, font_size, rect_list);
		var v_arg_info  = rect_list.get(v_arg_index);
		total_rect      = RectList.cover(total_rect, v_arg_info.rect);

		// shift argument to make space for left parenthesis

		var paren_width = context.getParenthesisWidth(v_arg_info.rect);
		rect_list.shift(v_arg_index, paren_width, 0);

		// we need space for two parentheses

		total_rect.right += 2*paren_width;

		// shift the base down

		rect_list.shift(b_arg_index, 0, v_arg_info.midline - total_rect.top);
		total_rect = RectList.cover(total_rect, b_arg_info.rect);

		return rect_list.add(total_rect, v_arg_info.midline, font_size, this);
	},

	/**
	 * @method render
	 * @param context {object} the drawing context
	 * @param rect_list {RectList} layout information
	 */
	render: function(
		/* Context2d */	context,
		/* RectList */	rect_list)
	{
		var info = rect_list.find(this);
		context.drawString(info.rect.left, info.midline, info.font_size, 'log');

		this.args[0].render(context, rect_list);
		this.args[1].render(context, rect_list);

		var v_info = rect_list.find(this.args[1]);
		context.drawParentheses(v_info.rect);
	}
});

MathFunction.Logarithm = MathLogarithm;

MathFunction.name_map[ MathLogarithm.NAME ] =
{
	applyTo: function(f)
	{
		return new MathLogarithm(new Y.MathFunction.Input(), f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Natural logarithm.</p>
 * 
 * @namespace MathFunction
 * @class NaturalLog
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathNaturalLog(
	/* MathFunction */	f)
{
	MathNaturalLog.superclass.constructor.call(this, MathNaturalLog.NAME, f);
}

MathNaturalLog.NAME = 'ln';

Y.extend(MathNaturalLog, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.log(this.args[0].evaluate(var_list));
	}
});

MathFunction.NaturalLog = MathNaturalLog;

MathFunction.name_map[ MathNaturalLog.NAME ] =
{
	applyTo: function(f)
	{
		return new MathNaturalLog(f);
	}
};
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
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Trigonometric cosine.</p>
 * 
 * @namespace MathFunction
 * @class Cosine
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathCosine(
	/* MathFunction */	f)
{
	MathCosine.superclass.constructor.call(this, MathCosine.NAME, f);
}

MathCosine.NAME = 'cos';

Y.extend(MathCosine, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.cos(this.args[0].evaluate(var_list));
	}
});

MathFunction.Cosine = MathCosine;

MathFunction.name_map[ MathCosine.NAME ] =
{
	applyTo: function(f)
	{
		return new MathCosine(f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Trigonometric tangent.</p>
 * 
 * @namespace MathFunction
 * @class Tangent
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathTangent(
	/* MathFunction */	f)
{
	MathTangent.superclass.constructor.call(this, MathTangent.NAME, f);
}

MathTangent.NAME = 'tan';

Y.extend(MathTangent, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.tan(this.args[0].evaluate(var_list));
	}
});

MathFunction.Tangent = MathTangent;

MathFunction.name_map[ MathTangent.NAME ] =
{
	applyTo: function(f)
	{
		return new MathTangent(f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Inverse trigonometric sine.</p>
 * 
 * @namespace MathFunction
 * @class Arcsine
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathArcsine(
	/* MathFunction */	f)
{
	MathArcsine.superclass.constructor.call(this, MathArcsine.NAME, f);
}

MathArcsine.NAME = 'arcsin';

Y.extend(MathArcsine, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Math.asin(this.args[0].evaluate(var_list));
	}
});

MathFunction.Arcsine = MathArcsine;

MathFunction.name_map[ MathArcsine.NAME ] =
{
	applyTo: function(f)
	{
		return new MathArcsine(f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Inverse trigonometric cosine.</p>
 * 
 * @namespace MathFunction
 * @class Arccosine
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathArccosine(
	/* MathFunction */	f)
{
	MathArccosine.superclass.constructor.call(this, MathArccosine.NAME, f);
}

MathArccosine.NAME = 'arccos';

Y.extend(MathArccosine, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Math.acos(this.args[0].evaluate(var_list));
	}
});

MathFunction.Arccosine = MathArccosine;

MathFunction.name_map[ MathArccosine.NAME ] =
{
	applyTo: function(f)
	{
		return new MathArccosine(f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Inverse trigonometric cosine.</p>
 * 
 * @namespace MathFunction
 * @class Arctangent
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathArctangent(
	/* MathFunction */	f)
{
	MathArctangent.superclass.constructor.call(this, MathArctangent.NAME, f);
}

MathArctangent.NAME = 'arctan';

Y.extend(MathArctangent, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Math.atan(this.args[0].evaluate(var_list));
	}
});

MathFunction.Arctangent = MathArctangent;

MathFunction.name_map[ MathArctangent.NAME ] =
{
	applyTo: function(f)
	{
		return new MathArctangent(f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Inverse trigonometric cosine.</p>
 * 
 * @namespace MathFunction
 * @class Arctangent2
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param y {MathFunction}
 * @param x {MathFunction}
 */

function MathArctangent2(
	/* MathFunction */	y,
	/* MathFunction */	x)
{
	MathArctangent2.superclass.constructor.call(this, MathArctangent2.NAME, y, x);
}

MathArctangent2.NAME = 'arctan2';

Y.extend(MathArctangent2, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Math.atan2(this.args[0].evaluate(var_list),
						  this.args[1].evaluate(var_list));
	}
});

MathFunction.Arctangent2 = MathArctangent2;

MathFunction.name_map[ MathArctangent2.NAME ] =
{
	applyTo: function(f)
	{
		return new MathArctangent2(f, new Y.MathFunction.Input());
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Hyperbolic cosine.</p>
 * 
 * @namespace MathFunction
 * @class HyperbolicCosine
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathHyperbolicCosine(
	/* MathFunction */	f)
{
	MathHyperbolicCosine.superclass.constructor.call(this, MathHyperbolicCosine.NAME, f);
}

MathHyperbolicCosine.NAME = 'cosh';

Y.extend(MathHyperbolicCosine, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.cosh(this.args[0].evaluate(var_list));
	}
});

MathFunction.HyperbolicCosine = MathHyperbolicCosine;

MathFunction.name_map[ MathHyperbolicCosine.NAME ] =
{
	applyTo: function(f)
	{
		return new MathHyperbolicCosine(f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Hyperbolic sine.</p>
 * 
 * @namespace MathFunction
 * @class HyperbolicSine
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathHyperbolicSine(
	/* MathFunction */	f)
{
	MathHyperbolicSine.superclass.constructor.call(this, MathHyperbolicSine.NAME, f);
}

MathHyperbolicSine.NAME = 'sinh';

Y.extend(MathHyperbolicSine, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.sinh(this.args[0].evaluate(var_list));
	}
});

MathFunction.HyperbolicSine = MathHyperbolicSine;

MathFunction.name_map[ MathHyperbolicSine.NAME ] =
{
	applyTo: function(f)
	{
		return new MathHyperbolicSine(f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Hyperbolic tangent.</p>
 * 
 * @namespace MathFunction
 * @class HyperbolicTangent
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathHyperbolicTangent(
	/* MathFunction */	f)
{
	MathHyperbolicTangent.superclass.constructor.call(this, MathHyperbolicTangent.NAME, f);
}

MathHyperbolicTangent.NAME = 'tanh';

Y.extend(MathHyperbolicTangent, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.tanh(this.args[0].evaluate(var_list));
	}
});

MathFunction.HyperbolicTangent = MathHyperbolicTangent;

MathFunction.name_map[ MathHyperbolicTangent.NAME ] =
{
	applyTo: function(f)
	{
		return new MathHyperbolicTangent(f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Inverse hyperbolic cosine.</p>
 * 
 * @namespace MathFunction
 * @class InverseHyperbolicCosine
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathInverseHyperbolicCosine(
	/* MathFunction */	f)
{
	MathInverseHyperbolicCosine.superclass.constructor.call(this, MathInverseHyperbolicCosine.NAME, f);
}

MathInverseHyperbolicCosine.NAME = 'arccosh';

Y.extend(MathInverseHyperbolicCosine, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.acosh(this.args[0].evaluate(var_list));
	}
});

MathFunction.InverseHyperbolicCosine = MathInverseHyperbolicCosine;

MathFunction.name_map[ MathInverseHyperbolicCosine.NAME ] =
{
	applyTo: function(f)
	{
		return new MathInverseHyperbolicCosine(f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Inverse hyperbolic sine.</p>
 * 
 * @namespace MathFunction
 * @class InverseHyperbolicSine
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathInverseHyperbolicSine(
	/* MathFunction */	f)
{
	MathInverseHyperbolicSine.superclass.constructor.call(this, MathInverseHyperbolicSine.NAME, f);
}

MathInverseHyperbolicSine.NAME = 'arcsinh';

Y.extend(MathInverseHyperbolicSine, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.asinh(this.args[0].evaluate(var_list));
	}
});

MathFunction.InverseHyperbolicSine = MathInverseHyperbolicSine;

MathFunction.name_map[ MathInverseHyperbolicSine.NAME ] =
{
	applyTo: function(f)
	{
		return new MathInverseHyperbolicSine(f);
	}
};
/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * <p>Inverse hyperbolic tangent.</p>
 * 
 * @namespace MathFunction
 * @class InverseHyperbolicTangent
 * @extends MathFunction.FunctionWithArgs
 * @constructor
 * @param f {MathFunction}
 */

function MathInverseHyperbolicTangent(
	/* MathFunction */	f)
{
	MathInverseHyperbolicTangent.superclass.constructor.call(this, MathInverseHyperbolicTangent.NAME, f);
}

MathInverseHyperbolicTangent.NAME = 'arctanh';

Y.extend(MathInverseHyperbolicTangent, MathFunctionWithArgs,
{
	/**
	 * @method evaluate
	 * @param var_list {Object} map of variable names to values or MathFunctions
	 * @return the value of the function
	 */
	evaluate: function(
		/* map */	var_list)
	{
		return Y.ComplexMath.atanh(this.args[0].evaluate(var_list));
	}
});

MathFunction.InverseHyperbolicTangent = MathInverseHyperbolicTangent;

MathFunction.name_map[ MathInverseHyperbolicTangent.NAME ] =
{
	applyTo: function(f)
	{
		return new MathInverseHyperbolicTangent(f);
	}
};
/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var MathParser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,3],$V1=[1,5],$V2=[1,11],$V3=[1,4],$V4=[1,6],$V5=[1,7],$V6=[1,8],$V7=[1,9],$V8=[1,10],$V9=[1,12],$Va=[1,13],$Vb=[1,14],$Vc=[1,15],$Vd=[1,16],$Ve=[1,17],$Vf=[1,18],$Vg=[1,19],$Vh=[1,20],$Vi=[1,21],$Vj=[1,22],$Vk=[1,23],$Vl=[1,24],$Vm=[1,25],$Vn=[1,26],$Vo=[1,27],$Vp=[1,28],$Vq=[1,29],$Vr=[1,30],$Vs=[1,31],$Vt=[1,32],$Vu=[1,33],$Vv=[1,34],$Vw=[1,35],$Vx=[1,36],$Vy=[1,37],$Vz=[1,39],$VA=[1,40],$VB=[1,41],$VC=[1,42],$VD=[1,43],$VE=[5,8,9,16,17,18,19,24],$VF=[5,8,9,16,24],$VG=[5,8,9,16,17,18,24],$VH=[1,117],$VI=[16,24];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expression":3,"e":4,"EOF":5,"NUMBER":6,"E":7,"+":8,"-":9,"HEX":10,"PI":11,"I":12,"VARIABLE":13,"INPUT":14,"(":15,")":16,"*":17,"/":18,"^":19,"ABS":20,"ARG":21,"CONJUGATE":22,"ROTATE":23,",":24,"RE":25,"IM":26,"MIN":27,"arglist":28,"MAX":29,"SQRT":30,"LOG":31,"LOG2":32,"LOG10":33,"LN":34,"ARCSIN":35,"ARCCOS":36,"ARCTAN":37,"ARCTAN2":38,"SIN":39,"COS":40,"TAN":41,"SINH":42,"COSH":43,"TANH":44,"ARCSINH":45,"ARCCOSH":46,"ARCTANH":47,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"NUMBER",7:"E",8:"+",9:"-",10:"HEX",11:"PI",12:"I",13:"VARIABLE",14:"INPUT",15:"(",16:")",17:"*",18:"/",19:"^",20:"ABS",21:"ARG",22:"CONJUGATE",23:"ROTATE",24:",",25:"RE",26:"IM",27:"MIN",29:"MAX",30:"SQRT",31:"LOG",32:"LOG2",33:"LOG10",34:"LN",35:"ARCSIN",36:"ARCCOS",37:"ARCTAN",38:"ARCTAN2",39:"SIN",40:"COS",41:"TAN",42:"SINH",43:"COSH",44:"TANH",45:"ARCSINH",46:"ARCCOSH",47:"ARCTANH"},
productions_: [0,[3,2],[4,1],[4,4],[4,4],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,2],[4,4],[4,4],[4,4],[4,6],[4,4],[4,4],[4,4],[4,4],[4,4],[4,6],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,6],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[28,1],[28,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
return $$[$0-1];
break;
case 2:

		var s = yytext.toLowerCase().split('e', 2);
		if (s.length == 2)
		{
			this.$ = new yy.MathFunction.Product();
			this.$.appendArg(new yy.MathFunction.Value(s[0]));
			this.$.appendArg(new yy.MathFunction.Exponential(
				new yy.MathFunction.Value(10), new yy.MathFunction.Value(s[1])));
		}
		else
		{
			this.$ = new yy.MathFunction.Value(yytext);
		}
	
break;
case 3:

		this.$ = new yy.MathFunction.Product();
		this.$.appendArg(new yy.MathFunction.Value($$[$0-3]));
		this.$.appendArg(new yy.MathFunction.Exponential(
			new yy.MathFunction.Value(10), new yy.MathFunction.Value($$[$0])));
	
break;
case 4:

		this.$ = new yy.MathFunction.Product();
		this.$.appendArg(new yy.MathFunction.Value($$[$0-3]));
		this.$.appendArg(new yy.MathFunction.Exponential(
			new yy.MathFunction.Value(10),
			new yy.MathFunction.Negate(new yy.MathFunction.Value($$[$0]))));
	
break;
case 5:
this.$ = new yy.MathFunction.Value(yytext);
break;
case 6:
this.$ = new yy.MathFunction.E();
break;
case 7:
this.$ = new yy.MathFunction.Pi();
break;
case 8:
this.$ = new yy.MathFunction.I();
break;
case 9:
this.$ = new yy.MathFunction.Variable(yytext);
break;
case 10:
this.$ = new yy.MathFunction.Input(yytext);
break;
case 11:
this.$ = $$[$0-1];
break;
case 12:
this.$ = yy.MathFunction.updateSum($$[$0-2], $$[$0]);
break;
case 13:
this.$ = yy.MathFunction.updateSum($$[$0-2], new yy.MathFunction.Negate($$[$0]));
break;
case 14:
this.$ = yy.MathFunction.updateProduct($$[$0-2], $$[$0]);
break;
case 15:
this.$ = new yy.MathFunction.Quotient($$[$0-2], $$[$0]);
break;
case 16:
this.$ = new yy.MathFunction.Exponential($$[$0-2], $$[$0]);
break;
case 17:
this.$ = new yy.MathFunction.Negate($$[$0]);
break;
case 18:
this.$ = new yy.MathFunction.Magnitude($$[$0-1]);
break;
case 19:
this.$ = new yy.MathFunction.Phase($$[$0-1]);
break;
case 20:
this.$ = new yy.MathFunction.Conjugate($$[$0-1]);
break;
case 21:
this.$ = new yy.MathFunction.Rotate($$[$0-3], $$[$0-1]);
break;
case 22:
this.$ = new yy.MathFunction.RealPart($$[$0-1]);
break;
case 23:
this.$ = new yy.MathFunction.ImaginaryPart($$[$0-1]);
break;
case 24:
this.$ = new yy.MathFunction.Min($$[$0-1]);
break;
case 25:
this.$ = new yy.MathFunction.Max($$[$0-1]);
break;
case 26:
this.$ = new yy.MathFunction.SquareRoot($$[$0-1]);
break;
case 27:
this.$ = new yy.MathFunction.Logarithm($$[$0-3], $$[$0-1]);
break;
case 28:
this.$ = new yy.MathFunction.Logarithm(new yy.MathFunction.Value(2), $$[$0-1]);
break;
case 29:
this.$ = new yy.MathFunction.Logarithm(new yy.MathFunction.Value(10), $$[$0-1]);
break;
case 30:
this.$ = new yy.MathFunction.NaturalLog($$[$0-1]);
break;
case 31:
this.$ = new yy.MathFunction.Arcsine($$[$0-1]);
break;
case 32:
this.$ = new yy.MathFunction.Arccosine($$[$0-1]);
break;
case 33:
this.$ = new yy.MathFunction.Arctangent($$[$0-1]);
break;
case 34:
this.$ = new yy.MathFunction.Arctangent2($$[$0-3], $$[$0-1]);
break;
case 35:
this.$ = new yy.MathFunction.Sine($$[$0-1]);
break;
case 36:
this.$ = new yy.MathFunction.Cosine($$[$0-1]);
break;
case 37:
this.$ = new yy.MathFunction.Tangent($$[$0-1]);
break;
case 38:
this.$ = new yy.MathFunction.HyperbolicSine($$[$0-1]);
break;
case 39:
this.$ = new yy.MathFunction.HyperbolicCosine($$[$0-1]);
break;
case 40:
this.$ = new yy.MathFunction.HyperbolicTangent($$[$0-1]);
break;
case 41:
this.$ = new yy.MathFunction.InverseHyperbolicSine($$[$0-1]);
break;
case 42:
this.$ = new yy.MathFunction.InverseHyperbolicCosine($$[$0-1]);
break;
case 43:
this.$ = new yy.MathFunction.InverseHyperbolicTangent($$[$0-1]);
break;
case 44:
this.$ = [ $$[$0] ];
break;
case 45:
this.$ = $$[$0-2].concat($$[$0]);
break;
}
},
table: [{3:1,4:2,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{1:[3]},{5:[1,38],8:$Vz,9:$VA,17:$VB,18:$VC,19:$VD},o($VE,[2,2],{7:[1,44]}),o($VE,[2,5]),o($VE,[2,6]),o($VE,[2,7]),o($VE,[2,8]),o($VE,[2,9]),o($VE,[2,10]),{4:45,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:46,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{15:[1,47]},{15:[1,48]},{15:[1,49]},{15:[1,50]},{15:[1,51]},{15:[1,52]},{15:[1,53]},{15:[1,54]},{15:[1,55]},{15:[1,56]},{15:[1,57]},{15:[1,58]},{15:[1,59]},{15:[1,60]},{15:[1,61]},{15:[1,62]},{15:[1,63]},{15:[1,64]},{15:[1,65]},{15:[1,66]},{15:[1,67]},{15:[1,68]},{15:[1,69]},{15:[1,70]},{15:[1,71]},{15:[1,72]},{1:[2,1]},{4:73,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:74,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:75,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:76,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:77,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{8:[1,78],9:[1,79]},{8:$Vz,9:$VA,16:[1,80],17:$VB,18:$VC,19:$VD},o($VE,[2,17]),{4:81,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:82,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:83,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:84,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:85,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:86,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:88,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,28:87,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:88,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,28:89,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:90,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:91,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:92,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:93,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:94,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:95,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:96,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:97,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:98,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:99,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:100,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:101,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:102,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:103,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:104,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:105,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:106,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},{4:107,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},o($VF,[2,12],{17:$VB,18:$VC,19:$VD}),o($VF,[2,13],{17:$VB,18:$VC,19:$VD}),o($VG,[2,14],{19:$VD}),o($VG,[2,15],{19:$VD}),o($VG,[2,16],{19:$VD}),{6:[1,108]},{6:[1,109]},o($VE,[2,11]),{8:$Vz,9:$VA,16:[1,110],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,111],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,112],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,17:$VB,18:$VC,19:$VD,24:[1,113]},{8:$Vz,9:$VA,16:[1,114],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,115],17:$VB,18:$VC,19:$VD},{16:[1,116],24:$VH},o($VI,[2,44],{8:$Vz,9:$VA,17:$VB,18:$VC,19:$VD}),{16:[1,118],24:$VH},{8:$Vz,9:$VA,16:[1,119],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,17:$VB,18:$VC,19:$VD,24:[1,120]},{8:$Vz,9:$VA,16:[1,121],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,122],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,123],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,124],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,125],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,126],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,17:$VB,18:$VC,19:$VD,24:[1,127]},{8:$Vz,9:$VA,16:[1,128],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,129],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,130],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,131],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,132],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,133],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,134],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,135],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,136],17:$VB,18:$VC,19:$VD},o($VE,[2,3]),o($VE,[2,4]),o($VE,[2,18]),o($VE,[2,19]),o($VE,[2,20]),{4:137,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},o($VE,[2,22]),o($VE,[2,23]),o($VE,[2,24]),{4:138,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},o($VE,[2,25]),o($VE,[2,26]),{4:139,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},o($VE,[2,28]),o($VE,[2,29]),o($VE,[2,30]),o($VE,[2,31]),o($VE,[2,32]),o($VE,[2,33]),{4:140,6:$V0,7:$V1,9:$V2,10:$V3,11:$V4,12:$V5,13:$V6,14:$V7,15:$V8,20:$V9,21:$Va,22:$Vb,23:$Vc,25:$Vd,26:$Ve,27:$Vf,29:$Vg,30:$Vh,31:$Vi,32:$Vj,33:$Vk,34:$Vl,35:$Vm,36:$Vn,37:$Vo,38:$Vp,39:$Vq,40:$Vr,41:$Vs,42:$Vt,43:$Vu,44:$Vv,45:$Vw,46:$Vx,47:$Vy},o($VE,[2,35]),o($VE,[2,36]),o($VE,[2,37]),o($VE,[2,38]),o($VE,[2,39]),o($VE,[2,40]),o($VE,[2,41]),o($VE,[2,42]),o($VE,[2,43]),{8:$Vz,9:$VA,16:[1,141],17:$VB,18:$VC,19:$VD},o($VI,[2,45],{8:$Vz,9:$VA,17:$VB,18:$VC,19:$VD}),{8:$Vz,9:$VA,16:[1,142],17:$VB,18:$VC,19:$VD},{8:$Vz,9:$VA,16:[1,143],17:$VB,18:$VC,19:$VD},o($VE,[2,21]),o($VE,[2,27]),o($VE,[2,34])],
defaultActions: {38:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 10;		/* hex */
break;
case 1:return 6;	/* decimal w/ exponent */
break;
case 2:return 6;	/* decimal w/ exponent */
break;
case 3:return 6;	/* zero */
break;
case 4:return 6;	/* decimal integer */
break;
case 5:return 17;
break;
case 6:return 18;
break;
case 7:return 9;
break;
case 8:return 8;
break;
case 9:return 19;
break;
case 10:return 15;
break;
case 11:return 16;
break;
case 12:return 24;
break;
case 13:return 25;
break;
case 14:return 26;
break;
case 15:return 20;
break;
case 16:return 21;
break;
case 17:return 22;
break;
case 18:return 23;
break;
case 19:return 29;
break;
case 20:return 27;
break;
case 21:return 30;
break;
case 22:return 31;
break;
case 23:return 32;
break;
case 24:return 33;
break;
case 25:return 34;
break;
case 26:return 35;
break;
case 27:return 36;
break;
case 28:return 37;
break;
case 29:return 38;
break;
case 30:return 39;
break;
case 31:return 40;
break;
case 32:return 41;
break;
case 33:return 42;
break;
case 34:return 43;
break;
case 35:return 44;
break;
case 36:return 45;
break;
case 37:return 46;
break;
case 38:return 47;
break;
case 39:return 11;
break;
case 40:return 11;
break;
case 41:return 7;
break;
case 42:return 12;
break;
case 43:return 14;
break;
case 44:return 13;
break;
case 45:/* skip whitespace */
break;
case 46:return 5;
break;
}
},
rules: [/^(?:0[xX][0-9a-fA-F]+)/,/^(?:[0-9]+\.([0-9]+)?([eE][0-9]+)?)/,/^(?:([0-9]+)?\.[0-9]+([eE][0-9]+)?)/,/^(?:0([eE][0-9]+)?)/,/^(?:[1-9][0-9]*([eE][0-9]+)?)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:\^)/,/^(?:\()/,/^(?:\))/,/^(?:,)/,/^(?:re\b)/,/^(?:im\b)/,/^(?:abs\b)/,/^(?:arg\b)/,/^(?:conjugate\b)/,/^(?:rotate\b)/,/^(?:max\b)/,/^(?:min\b)/,/^(?:sqrt\b)/,/^(?:log\b)/,/^(?:log2\b)/,/^(?:log10\b)/,/^(?:ln\b)/,/^(?:arcsin\b)/,/^(?:arccos\b)/,/^(?:arctan\b)/,/^(?:arctan2\b)/,/^(?:sin\b)/,/^(?:cos\b)/,/^(?:tan\b)/,/^(?:sinh\b)/,/^(?:cosh\b)/,/^(?:tanh\b)/,/^(?:arcsinh\b)/,/^(?:arccosh\b)/,/^(?:arctanh\b)/,/^(?:pi\b)/,/^(?:\u03c0)/,/^(?:e\b)/,/^(?:[iIjJ])/,/^(?:\?)/,/^(?:[a-zA-Z][a-zA-Z0-9_]*)/,/^(?:\s+)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = MathParser;
exports.Parser = MathParser.Parser;
exports.parse = function () { return MathParser.parse.apply(MathParser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}/**
 * @module gallery-mathcanvas
 */

/**********************************************************************
 * Displays an arithmetical expression the way you would write it on paper.
 *
 * @main gallery-mathcanvas
 * @class MathCanvas
 * @extends Widget
 * @constructor
 * @param config {Object} Widget configuration
 */
function MathCanvas(
	/* object */	config)
{
	MathCanvas.superclass.constructor.call(this, config);
}

MathCanvas.NAME = "MathCanvas";

MathCanvas.ATTRS =
{
	/**
	 * The function to display.
	 *
	 * @attribute func
	 * @type {Y.MathFunction|String}
	 */
	func:
	{
		value: new Y.MathFunction.Input(),
		setter: function(value)
		{
			return Y.Lang.isString(value) ?
				Y.MathCanvas.parse(value) : value;
		}
	},

	/**
	 * The font name to use.
	 *
	 * @attribute fontName
	 * @type {String}
	 */
	fontName:
	{
		value:     'sans-serif',
		validator: Y.Lang.isString
	},

	/**
	 * The font size to use, in em's.
	 *
	 * @attribute fontSize
	 * @type {number}
	 */
	fontSize:
	{
		value:     1,
		validator: Y.Lang.isNumber
	},

	/**
	 * The minimum width of the canvas.  If the expression is wider, the
	 * width will increase to fit.
	 *
	 * @attribute minWidth
	 * @type {Integer}
	 */
	minWidth:
	{
		value:     100,
		validator: Y.Lang.isNumber
	},

	/**
	 * The minimum height of the canvas.  If the expression is taller, the
	 * height will increase to fit.
	 *
	 * @attribute minHeight
	 * @type {Integer}
	 */
	minHeight:
	{
		value:     100,
		validator: Y.Lang.isNumber
	}
};

/**
 * <p>Map of localizable strings.</p>
 *
 * <dl>
 * <dt>parse_error</dt>
 * <dd>Displayed by `MathCanvas.parse()` when expression parsing fails.</dd>
 * <dt>unknown_function</dt>
 * <dd>Displayed when the user enters an unknown function name.</dd>
 * </dl>
 *
 * @property Strings
 * @type {Object}
 * @static
 */
MathCanvas.Strings =
{
	parse_error:      'The expression contains an error:\n{line1}\n{line2}',
	unknown_function: 'There is no function named "{name}"'
};

/**
 * @method parse
 * @static
 * @param expr {string}
 * @return {MathFunction}
 */
MathCanvas.parse = function(
	/* string */ expr)
{
	try
	{
		return MathParser.parse(expr);
	}
	catch (e)
	{
		if (e.message.startsWith('Parse error'))
		{
			const s = e.message.split('\n');
			alert(Y.Lang.sub(Y.MathCanvas.Strings.parse_error,
			{
				line1: s[1],
				line2: s[2]
			}));
		}
		throw e;
	}
};

Y.extend(MathCanvas, Y.Widget,
{
	initializer: function(config)
	{
		this.after('funcChange', function()
		{
			this.selection = -1;
			this._renderExpression();
		});
		this.after('fontNameChange', this._renderExpression);
		this.after('fontSizeChange', this._renderExpression);
		this.after('minWidthChange', this._renderExpression);
		this.after('minHeightChange', this._renderExpression);
	},

	destructor: function()
	{
		this.canvas  = null;
		this.context = null;
	},

	renderUI: function()
	{
		var container = this.get('contentBox');

		var w = this.get('minWidth');
		this.set('width', w+'px');

		var h = this.get('minHeight');
		this.set('height', w+'px');

		this.canvas = Y.Node.create(
			'<svg width="' + w + '" height="' + h + '" tabindex="0" xmlns="https://www.w3.org/2000/svg"></svg>');
		if (!this.canvas)
		{
			throw Error("This browser does not support svg rendering.");
		}

		container.appendChild(this.canvas);

		this.context             = math_rendering;
		this.context.math_canvas = this;

		this._renderExpression();

		// input (for mobile)

		if (Y.UA.touchEnabled || YUI.config.debug_mathcanvas_keyboard)
		{
			const fn_names = Object.keys(Y.MathFunction.name_map).sort();

			this.keyboard = Y.Node.create(Y.Lang.sub(
				'<div class="{clazz}-keyboard">' +
					'<div class="operators">' +
						'<button value="+">+</button>' +
						'<button value="-">&ndash;</button>' +
						'<button value="*">&times;</button>' +
						'<button value="/">/</button>' +
						'<button value="^">^</button>' +
						'<button value=",">,</button>' +
					'</div>' +
					'<div class="digits">' +
						'<button class="number" value="1">1</button>' +
						'<button class="number" value="2">2</button>' +
						'<button class="number" value="3">3</button>' +
						'<button class="number" value="4">4</button>' +
						'<button class="number" value="5">5</button>' +
						'<button class="number" value="6">6</button>' +
						'<button class="number" value="7">7</button>' +
						'<button class="number" value="8">8</button>' +
						'<button class="number" value="9">9</button>' +
						'<select class="functions">' +
							'<option>\u0192</option>' +
							'<optgroup>' +
								fn_names.reduce(function(s, n)
								{
									return s + '<option>' + n + '</option>';
								},
								'') +
							'</optgroup>' +
						'</select>' +
						'<button class="number" value="0">0</button>' +
						'<button class="number" value=".">.</button>' +
					'</div>' +
					'<div class="misc">' +
						'<button value="\u03c0">\u03c0</button>' +
						'<button value="e">e</button>' +
						'<button value="i">i</button>' +
						'<button value="=">=</button>' +
						'<button class="delete" value="delete">\u232b</button>' +
					'</div>' +
				'</div>',
			{
				clazz: this.getClassName()
			}));
			container.appendChild(this.keyboard);

			this.keyboard.setStyle('bottom', (-this.keyboard.get('offsetHeight'))+'px');
		}
	},

	bindUI: function()
	{
		this.canvas.on('mousedown', this._handleMouseDown, this);
		Y.one(Y.config.doc).on('keydown', this._handleKeyDown, this);

		if (this.keyboard)
		{
			this.keyboard.delegate('click', this._handleKeyboard, 'button', this);

			this.keyboard.one('.functions').on('change', function(e)
			{
				this.applyFunctionToSelection(e.currentTarget.get('value'));
				e.currentTarget.set('selectedIndex', 0);	// clear menu
				this.canvas.focus();
			},
			this);
		}
	},

	_handleMouseDown: function(e)
	{
		function getMousePosition(e)
		{
			const CTM = e.currentTarget.getDOMNode().getScreenCTM();
			return [
				((e.clientX - CTM.e) / CTM.a) - this.canvas_offset.x,
				((e.clientY - CTM.f) / CTM.d) - this.canvas_offset.y
			];
		};

		function select(e)
		{
			this._deactivateSelection();
			this.selection = this.rect_list.getSelection(anchor, getMousePosition.call(this, e));
			this._renderExpression();
		}

		var anchor = getMousePosition.call(this, e);

		select.call(this, e);
		var handler = this.canvas.on('mousemove', select, this);

		Y.one(Y.config.doc).once('mouseup', function(e)
		{
			handler.detach();
			if (this.selection >= 0)
			{
				this.showKeyboard();
			}
			else
			{
				this.hideKeyboard();
			}
		},
		this);
	},

	_handleKeyDown: function(e)
	{
		if (!e.altKey && !e.ctrlKey && !e.metaKey && this.selection >= 0)
		{
			this._handleKeyPress(e.charCode, e._event.key);
			e.halt();
		}
	},

	_handleKeyboard: function(e)
	{
		var op = e.currentTarget.get('value');
		if (op == 'hide')
		{
			this.hideKeyboard();
		}
		else if (op == 'expand')
		{
			this.expandSelection();
		}
		else if (op == 'delete')
		{
			this.deleteSelection();
		}
		else
		{
			this._handleKeyPress(0, op);
		}
	},

	_handleKeyPress: function(
		/* int */	code,
		/* char */	c)
	{
		if (code == 9 && this.selection >= 0)
		{
			this.focusNextInput(this.rect_list.get(this.selection).func);
		}
		else if (this.selection >= 0 &&
				 this.rect_list.get(this.selection).func.handleKeyPress(this, code, c))
		{
			if (!this.rect_list.get(this.selection))
			{
				this.selection = -1;
			}
			this._renderExpression();
		}
		else if (c == ' ')
		{
			this.expandSelection();
		}
		else if (code == 8)
		{
			this.deleteSelection();
		}
		else if (this.selection >= 0 && c.length == 1 && c != '=')
		{
			const i = Y.MathFunction.Input.replace(this, this.rect_list.get(this.selection).func);
			i.handleKeyPress(this, code, c);

			this.selection = -1;
			this._renderExpression();
			this.selection = this.rect_list.findIndex(i);	// selectFunction() deactivates Input
			this._renderExpression();
		}

		if (c == '=')
		{
			this.fire('evaluate');
			this.hideKeyboard();
		}
	},

	/**
	 * Shows touch keyboard.
	 *
	 * @method showKeyboard
	 */
	showKeyboard: function()
	{
		if (!this.keyboard)
		{
			return;
		}

		if (this.keyboard_anim)
		{
			this.keyboard_anim.stop();
		}

		this.keyboard_anim = new Y.Anim(
		{
			node: this.keyboard,
			to:
			{
				bottom: 0
			},
			easing:   Y.Easing.easeOut,
			duration: 0.5
		});

		this.keyboard_anim.run();
	},

	/**
	 * Hides touch keyboard.
	 *
	 * @method hideKeyboard
	 */
	hideKeyboard: function()
	{
		if (!this.keyboard)
		{
			return;
		}

		if (this.keyboard_anim)
		{
			this.keyboard_anim.stop();
		}

		this.keyboard_anim = new Y.Anim(
		{
			node: this.keyboard,
			to:
			{
				bottom: -this.keyboard.get('offsetHeight')
			},
			easing:   Y.Easing.easeOut,
			duration: 0.5
		});

		this.keyboard_anim.run();
	},

	/**
	 * Expands the selection up one level of the parse tree.
	 *
	 * @method expandSelection
	 */
	expandSelection: function()
	{
		if (this.selection == -1)
		{
			return;
		}

		this._deactivateSelection();

		var p = this.rect_list.get(this.selection).func.getParent();
		if (p)
		{
			do
			{
				this.selection = this.rect_list.findIndex(p);
				p              = p.getParent();
			}
			while (this.selection == -1);

			this._renderExpression();
		}
	},

	/**
	 * Selects the specified function, if it can be found.
	 *
	 * @method selectFunction
	 * @param f {MathFunction}
	 * @return true if selected
	 */
	selectFunction: function(
		/* MathFunction */	f)
	{
		this._renderExpression();		// update rect_list

		const i = this.rect_list.findIndex(f);
		if (i >= 0)
		{
			this._deactivateSelection();
			this.selection = i;
			this._renderExpression();
			return true;
		}
		else
		{
			return false;
		}
	},

	/**
	 * Switches focus to the next Input, if it can find one.
	 *
	 * @method focusNextInput
	 */
	focusNextInput: function(
		/* Input */	f)
	{
		const i = this.rect_list.findIndex(f);
		if (i < 0)
		{
			return;
		}

		function checkForInput()
		{
			const info = this.rect_list.get(j);
			if (info.func instanceof Y.MathFunction.Input)
			{
				this._deactivateSelection();
				this.selection = j;
				this._renderExpression();
				return true;
			}
		}

		const count = this.rect_list.size();
		for (var j=i+1; j<count; j++)
		{
			if (checkForInput.call(this))
			{
				return;
			}
		}

		for (var j=0; j<i; j++)
		{
			if (checkForInput.call(this))
			{
				return;
			}
		}
	},

	/**
	 * Deletes the selected sub-expression.
	 *
	 * @method deleteSelection
	 */
	deleteSelection: function()
	{
		if (this.selection == -1)
		{
			return;
		}

		const f = this.rect_list.get(this.selection).func;
		if (f instanceof Y.MathFunction.Input && !f.isEmpty())
			{
			f.clear();
			this._renderExpression();
			}
		else if (f instanceof Y.MathFunction.Input)
			{
			this.deleteFunction(f);
			}
		else
			{
			const i = Y.MathFunction.Input.replace(this, f);

			this.selection = -1;
			this._renderExpression();
			this.selection = this.rect_list.findIndex(i);	// selectFunction() deactivates Input
			this._renderExpression();
			}
	},

	/**
	 * @method applyFunctionToSelection
	 * @param fn_name {string} name of function to apply
	 * @return true if function name is valid
	 */
	applyFunctionToSelection: function(
		/* string */ fn_name)
	{
		if (this.selection == -1 || !Y.MathFunction.name_map[ fn_name ])
		{
			return false;
		}

		const f = this.rect_list.get(this.selection).func,
			  p = f.getParent(),
			  v = Y.MathFunction.name_map[ fn_name ].applyTo(f);

		if (p != null)
		{
			p.replaceArg(f, v);
		}
		else
		{
			this.set('func', v);
		}

		this.selection = -1;
		this._renderExpression();		// update rect_list

		var select_f = f.getParent();	// parent changed
		select_f.getArgs().some(function(a)
		{
			if (a instanceof Y.MathFunction.Input)
			{
				select_f = a;
				return true;
			}
		});

		this.selection = this.rect_list.findIndex(select_f);
		this._renderExpression();
		return true;
	},

	/**
	 * @method deleteFunction
	 * @param f {MathFunction} function to remove from the overall expression
	 */
	deleteFunction: function(
		/* MathFunction */ f)
	{
		var p = f.getParent();
		var s = p;
		if (!p)
		{
			s = new Y.MathFunction.Input();
			this.set('func', s);
		}
		else if (p.getArgCount() == 1)
		{
			this.deleteFunction(p);
			return;
		}
		else if (p.getArgCount() == 2)
		{
			var s  = (p.getArg(0) == f ? p.getArg(1) : p.getArg(0));
			var p1 = p.getParent();
			if (p1)
			{
				p1.replaceArg(p, s);
			}
			else
			{
				this.selection = -1;
				s.parent       = null;
				this.set('func', s);
			}
		}
		else
		{
			p.removeArg(f);
		}

		this.selection = -1;
		this._renderExpression();	// update rect_list
		this.selection = this.rect_list.findIndex(s);
		this._renderExpression();
	},

	_deactivateSelection: function()
	{
		if (this.selection >= 0)
		{
			const f = this.rect_list.get(this.selection).func;
			if (f instanceof Y.MathFunction.Input)
			{
				f.handleKeyPress(this, 13, '\n');
			}
		}
	},

	/**
	 * Renders the expression.
	 *
	 * @method _renderExpression
	 * @protected
	 */
	_renderExpression: function()
	{
		if (this.canvas_root)
		{
			this.canvas_root.remove(true);
		}
		this.canvas_root = Y.Node(document.createElementNS('https://www.w3.org/2000/svg', 'g'));
		this.canvas.appendChild(this.canvas_root);

		var f = this.get('func');
		if (!f)
		{
			return;
		}

		this.rect_list = new RectList();

		var top_left = { x:0, y:0 };
		f.layout(this.context, top_left, 100, this.rect_list);

		var bounds = this.rect_list.getBounds();

		function setSize(
			/* width/height */	type)
		{
			var c = type.charAt(0).toUpperCase() + type.substr(1);
			var v = Math.max(this.get('min'+c), this[ 'render_'+type ]+5);
			this.set(type, v+'px');
			this.canvas.setAttribute(type, v);
		}

		this.render_width  = RectList.width(bounds);
		setSize.call(this, 'width');

		this.render_height = RectList.height(bounds);
		setSize.call(this, 'height');

		this.canvas_offset =
		{
			x: Math.floor((this.canvas.getAttribute('width') - RectList.width(bounds)) / 2),
			y: Math.floor((this.canvas.getAttribute('height') - RectList.height(bounds)) / 2)
		};

		this.canvas_root.setAttribute('transform', Y.Lang.sub('translate({x},{y})', this.canvas_offset));

		if (this.selection >= 0)
		{
			this.context.drawSelection(this.rect_list.get(this.selection).rect);
		}

		f.render(this.context, this.rect_list);
	}
});

var paren_angle = Math.PI/6;	// 30 degrees

var math_rendering =
{
	_text_node: null,

	drawString: function(
		/* int */			left,
		/* int */			midline,
		/* percentage */	font_size,
		/* string */		s)
	{
		var n = this._createNode('text',
		{
			x:                   left,
			y:                   midline,
			'dominant-baseline': 'middle',
			clazz:               'text'
		});

		this._setFont(n, font_size);
		n.innerHTML = s;
		return n;
	},

	getLineHeight: function(
		/* percentage */	font_size)
	{
		this._createTextNode();
		this._setFont(this._text_node, font_size);
		this._text_node.innerHTML = "Mg";
		return this._text_node.getBBox().height;
	},

	getStringWidth: function(
		/* percentage */	font_size,
		/* string */		text)
	{
		this._createTextNode();
		this._setFont(this._text_node, font_size);
		this._text_node.innerHTML = text;
		return this._text_node.getComputedTextLength()*1.1;
	},

	getSpaceWidth: function(
		/* percentage */	font_size)
	{
		return this.getStringWidth(font_size, '&nbsp;');
	},

	_createTextNode: function()
	{
		if (!this._text_node)
		{
			this._text_node = this._createNode('text',
			{
				x:          0,
				y:          -1000,
				visibility: 'hidden'
			});
			this.math_canvas.canvas.appendChild(this._text_node);
		}
	},

	_setFont: function(
		/* Node */			node,
		/* percentage */	font_size)
	{
		node.setAttribute('font-family', this.math_canvas.get('fontName'));
		node.setAttribute('font-size', (this.math_canvas.get('fontSize') * font_size/100.0) + 'em');
	},

	getSuperSubFontSize: function(
		/* percentage */	font_size)
	{
		var v = font_size * 0.6;
		return Math.max(v, 40);
	},

	getSuperscriptHeight: function(
		/* rect */	r)
	{
		return RectList.height(r)*2/3;
	},

	getSubscriptDepth: function(
		/* rect */	r)
	{
		return RectList.height(r)/2;
	},

	drawSquareBrackets: function(
		/* rect */	r)
	{
		var h = r.bottom - r.top,
			w = this.getSquareBracketWidth(r)-2;

		return [
			this.drawLines(
				r.left-2, r.top,
				'd', -w,  null,
				null,     'd', h-1,
				'd', w,   null),

			this.drawLines(
				r.right+1, r.top,
				'd', w,    null,
				null,      'd', h-1,
				'd', -w,   null)
		];
	},

	getSquareBracketWidth: function(
		/* rect */	r)
	{
		var h = r.bottom - r.top;
		return Math.round(3+((h-1)/10));
	},

	drawParentheses: function(
		/* rect */	r)
	{
		var h      = r.bottom - r.top,
			radius = h/(2.0*Math.sin(paren_angle)),
			yc     = RectList.ycenter(r),
			pw     = this.getParenthesisWidth(r);

		return [
			this.drawArc(r.left - pw + radius, yc, radius, Math.PI-paren_angle, Math.PI+paren_angle, false),
			this.drawArc(r.right + pw - radius, yc, radius, paren_angle, -paren_angle, true)
		];
	},

	getParenthesisWidth: function(
		/* rect */	r)
	{
		var h = r.bottom - r.top;
		return 2+Math.round(0.5 + (h * (1.0 - Math.cos(paren_angle)))/(2.0 * Math.sin(paren_angle)));
	},

	drawVerticalBar: function(
		/* rect */	r)
	{
		return this.drawLines(
			r.left+1, r.top,
			null,     r.bottom);
	},

	getVerticalBarWidth: function()
	{
		return 3;
	},

	drawHorizontalBar: function(
		/* rect */	r)
	{
		return this.drawLines(
			r.left,    r.top+1,
			r.right-1, null);
	},

	getHorizontalBarHeight: function()
	{
		return 3;
	},

	drawLines: function(/* x,y,...,x,y */)
	{
		var x = arguments[0],
			y = arguments[1];

		var d = 'M ' + x + ' ' + y;

		var i = 2;
		while (i < arguments.length)
		{
			var z  = this._parseLineValue(arguments[i], arguments[i+1], x);
			var x1 = z[0];
			i     += z[1];

			z = this._parseLineValue(arguments[i], arguments[i+1], y);
			var y1 = z[0];
			i     += z[1];

			d += ' L ' + x1 + ' ' + y1;
			x  = x1;
			y  = y1;
		}

		return this._createNode('path',
		{
			d:     d,
			clazz: 'path'
		});
	},

	_parseLineValue: function(a1, a2, v)
	{
		if (a1 === null)
		{
			return [v, 1];
		}
		else if (a1 === 'd')
		{
			return [v + a2, 2];
		}
		else
		{
			return [a1, 1];
		}
	},

	// from https://github.com/gliffy/canvas2svg

	drawArc: function(xc, yc, radius, startAngle, endAngle, counterClockwise)
	{
		var startX       = xc+radius*Math.cos(startAngle),
			startY       = yc+radius*Math.sin(startAngle),
			endX         = xc+radius*Math.cos(endAngle),
			endY         = yc+radius*Math.sin(endAngle),
			largeArcFlag = 0,
			diff         = endAngle - startAngle;

		if (diff < 0)
		{
			diff += 2*Math.PI;
		}

		if (counterClockwise)
		{
			largeArcFlag = diff > Math.PI ? 0 : 1;
		}
		else
		{
			largeArcFlag = diff > Math.PI ? 1 : 0;
		}

		return this._createNode('path',
		{
			d: Y.Lang.sub('M {x1} {y1} A {r} {r} 0 {a} {s} {x2} {y2}',
			{
				x1: startX,
				y1: startY,
				r:  radius,
				a:  largeArcFlag,
				s:  counterClockwise ? 0 : 1,
				x2: endX,
				y2: endY
			}),
			clazz: 'path'
		});
	},

	drawSelection: function(
		/* map */	r)
	{
		return this._createNode('rect',
		{
			x:      r.left,
			y:      r.top,
			width:  RectList.width(r),
			height: RectList.height(r),
			clazz:  'selection'
		});
	},

	_createNode: function(
		/* string */	type,
		/* map */		attr)
	{
		var n = document.createElementNS('https://www.w3.org/2000/svg', type);

		var clazz = this.math_canvas.getClassName('node');
		if (attr.clazz)
			{
			clazz += ' ' + attr.clazz;
			delete attr.clazz;
			}
		n.setAttribute('class', clazz);

		Y.each(attr, function(value, name)
		{
			n.setAttribute(name, value);
		});

		this.math_canvas.canvas_root.appendChild(n);
		return n;
	}
};

MathParser.yy.MathFunction = Y.MathFunction;

Y.MathCanvas          = MathCanvas;
Y.MathCanvas.RectList = RectList;

/**********************************************************************
 * Parser used to convert a string expression into Y.MathFunction
 *
 * @class Parser
 * @namespace MathCanvas
 */

/**
 * Parses a string into a Y.MathFunction.
 *
 * @method parse
 * @static
 * @param expr {String} expression to parse
 * @return {MathFunction}
 */


}, '@VERSION@', {
    "skinnable": "true",
    "requires": [
        "widget",
        "collection",
        "node-screen",
        "gallery-complexnumber",
        "gallery-node-optimizations",
        "anim",
        "array-extras"
    ],
    "optional": [
        ""
    ]
});
