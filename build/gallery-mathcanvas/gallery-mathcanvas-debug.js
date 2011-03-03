YUI.add('gallery-mathcanvas', function(Y) {

"use strict";

/**********************************************************************
 * <p>Manages all the bounding rectangles for an expression.</p>
 * 
 * <p>Each item contains rect (top,left,bottom,right), midline,
 * font_size(%), func.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathCanvas.RectList
 * @constructor
 */

function RectList()
{
	this.list = [];
}

/**
 * @param r {Rect} rectangle
 * @return horizontal center
 */
RectList.xcenter = function(r)
{
	return Math.floor((r.left + r.right)/2);
};

/**
 * @param r {Rect} rectangle
 * @return vertical center
 */
RectList.ycenter = function(r)
{
	return Math.floor((r.top + r.bottom)/2);
};

/**
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
	 * @param index {int}
	 * @return item at index
	 */
	get: function(
		/* int */	index)
	{
		return this.list[ index ];
	},

	/**
	 * @param f {MathFunction} search target
	 * @return index of item for specified MathFunction, or null if not found
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
	 * Shift the specified rect and all rects inside it.
	 * 
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
		var orig = Y.clone(info.rect);
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
	 * @return the bounding rect of all the rects in the list
	 */
	getBounds: function()
	{
		return this.list[ this.list.length-1 ].rect;
	}
};
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
/**********************************************************************
 * <p>Pi</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Pi
 * @constructor
 */

function MathPi()
{
	MathPi.superclass.constructor.call(this);
}

Y.extend(MathPi, MathFunction,
{
	evaluate: function()
	{
		return Math.PI;
	},

	toString: function()
	{
		return '\u03c0';
	}
});

MathFunction.Pi = MathPi;
/**********************************************************************
 * <p>e</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.E
 * @constructor
 */

function MathE()
{
	MathE.superclass.constructor.call(this);
}

Y.extend(MathE, MathFunction,
{
	evaluate: function()
	{
		return Math.E;
	},

	toString: function()
	{
		return 'e';
	}
});

MathFunction.E = MathE;
/**********************************************************************
 * <p>Function that takes one or more arguments.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.FunctionWithArgs
 * @constructor
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

	if (Y.Lang.isArray(args))
	{
		this.args = Y.Array(args);
	}
	else
	{
		this.args = [];
		for (var i=1; i<arguments.length; i++)
		{
			this.args.push(arguments[i]);
		}
	}
}

Y.extend(MathFunctionWithArgs, MathFunction,
{
	/**
	 * If origArg is an argument, replaces origArg with newArg.
	 * 
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
			this.args[i] = newArg;
		}
	},

	/**
	 * @return list of argument values, from calling evaluate()
	 */
	evaluateArgs: function()
	{
		var v;
		Y.Array.each(this.args, function(arg)
		{
			v.push(arg.evaluate());
		});

		return v;
	},

	prepareToRender: function(
		/* Context2d */		context,
		/* point */			top_left,
		/* percentage */	font_size,
		/* array */			rect_list)
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
			var j     = this.args[i].prepareToRender(context, arg_top_left, font_size, rect_list);
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

	render: function(
		/* Context2d */		context,
		/* array */			rect_list)
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

	toString: function()
	{
		return this.name + '(' + this.args.join(',') + ')';
	}
});

MathFunction.FunctionWithArgs = MathFunctionWithArgs;
/**********************************************************************
 * <p>Minimum.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Min
 * @constructor
 */

function MathMin()
{
	MathMin.superclass.constructor.call(this, "min", new Y.Array(arguments));
}

Y.extend(MathMin, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Math.min.apply(null, this.evaluateArgs());
	}
});

MathFunction.Min = MathMin;
/**********************************************************************
 * <p>Maximum.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Max
 * @constructor
 */

function MathMax()
{
	MathMax.superclass.constructor.call(this, "max", new Y.Array(arguments));
}

Y.extend(MathMax, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Math.max.apply(null, this.evaluateArgs());
	}
});

MathFunction.Max = MathMax;
/**********************************************************************
 * <p>Square root.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.SquareRoot
 * @constructor
 */

function MathSquareRoot(
	/* MathFunction */	f)
{
	MathSquareRoot.superclass.constructor.call(this, "sqrt", f);
}

Y.extend(MathSquareRoot, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Math.sqrt(this.args[0].evaluate());
	},

	prepareToRender: function(
		/* Context2d */		context,
		/* point */			top_left,
		/* percentage */	font_size,
		/* array */			rect_list)
	{
		var arg       = this.args[0];
		var arg_index = arg.prepareToRender(context, top_left, font_size, rect_list);

		var arg_info = rect_list.get(arg_index);
		var arg_h    = arg_info.rect.bottom - arg_info.rect.top;

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

	render: function(
		/* Context2d */		context,
		/* array */			rect_list)
	{
		var info = rect_list.find(this);
		this._drawSquareRoot(context, info.rect);
		this.args[0].render(context, rect_list);
	},

	_drawSquareRoot: function(
		/* Context2d */		context,
		/* rect */			rect)
	{
		var h = rect.bottom - rect.top;
		var x = rect.left;
		var y = rect.top + Math.round(3.0*h/4.0);
		var w = Math.round((h-3)/(4.0*Math.sqrt(3.0)));

		context.beginPath();
		context.moveTo(x,y);
		x += w;
		y  = rect.bottom - 1;
		context.lineTo(x,y);
		x += w;
		y  = rect.top+2;
		context.lineTo(x,y);
		x  = rect.right-1;
		context.lineTo(x,y);
		context.line(0, Math.round(h/8.0));
		context.stroke();
	}
});

MathFunction.SquareRoot = MathSquareRoot;
/**********************************************************************
 * <p>Trigonometric sine.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Sine
 * @constructor
 */

function MathSine(
	/* MathFunction */	f)
{
	MathSine.superclass.constructor.call(this, "sin", f);
}

Y.extend(MathSine, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Math.sin(this.args[0].evaluate());
	}
});

MathFunction.Sine = MathSine;
/**********************************************************************
 * <p>Trigonometric cosine.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Cosine
 * @constructor
 */

function MathCosine(
	/* MathFunction */	f)
{
	MathCosine.superclass.constructor.call(this, "cos", f);
}

Y.extend(MathCosine, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Math.cos(this.args[0].evaluate());
	}
});

MathFunction.Cosine = MathCosine;
/**********************************************************************
 * <p>Trigonometric tangent.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathFunction.Tangent
 * @constructor
 */

function MathTangent(
	/* MathFunction */	f)
{
	MathTangent.superclass.constructor.call(this, "tan", f);
}

Y.extend(MathTangent, MathFunctionWithArgs,
{
	evaluate: function()
	{
		return Math.tan(this.args[0].evaluate());
	}
});

MathFunction.Tangent = MathTangent;
/* Jison generated parser */
var MathParser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expressions":3,"e":4,"EOF":5,"NUMBER":6,"E":7,"PI":8,"(":9,")":10,"+":11,"-":12,"*":13,"/":14,"^":15,"SQRT":16,"SIN":17,"COS":18,"TAN":19,"MIN":20,"arglist":21,"MAX":22,",":23,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"NUMBER",7:"E",8:"PI",9:"(",10:")",11:"+",12:"-",13:"*",14:"/",15:"^",16:"SQRT",17:"SIN",18:"COS",19:"TAN",20:"MIN",22:"MAX",23:","},
productions_: [0,[3,2],[4,1],[4,1],[4,1],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,2],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[21,1],[21,3]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:return $$[$0-1];
break;
case 2:this.$ = new yy.MathFunction.Value(yytext);
break;
case 3:this.$ = new yy.MathFunction.E();
break;
case 4:this.$ = new yy.MathFunction.Pi();
break;
case 5:this.$ = $$[$0-1];
break;
case 6:this.$ = $$[$0-2]+$$[$0];
break;
case 7:this.$ = $$[$0-2]-$$[$0];
break;
case 8:this.$ = $$[$0-2]*$$[$0];
break;
case 9:this.$ = $$[$0-2]/$$[$0];
break;
case 10:this.$ = Math.pow($$[$0-2], $$[$0]);
break;
case 11:this.$ = -$$[$0];
break;
case 12:this.$ = new yy.MathFunction.SquareRoot($$[$0-1]);
break;
case 13:this.$ = new yy.MathFunction.Sine($$[$0-1]);
break;
case 14:this.$ = new yy.MathFunction.Cosine($$[$0-1]);
break;
case 15:this.$ = new yy.MathFunction.Tangent($$[$0-1]);
break;
case 16:this.$ = new yy.MathFunction.Min($$[$0-1]);
break;
case 17:this.$ = new yy.MathFunction.Max($$[$0-1]);
break;
case 18:this.$ = [ $$[$0] ];
break;
case 19:this.$ = $$[$0-2].concat($$[$0]);
break;
}
},
table: [{3:1,4:2,6:[1,3],7:[1,4],8:[1,5],9:[1,6],12:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],22:[1,13]},{1:[3]},{5:[1,14],11:[1,15],12:[1,16],13:[1,17],14:[1,18],15:[1,19]},{5:[2,2],10:[2,2],11:[2,2],12:[2,2],13:[2,2],14:[2,2],15:[2,2],23:[2,2]},{5:[2,3],10:[2,3],11:[2,3],12:[2,3],13:[2,3],14:[2,3],15:[2,3],23:[2,3]},{5:[2,4],10:[2,4],11:[2,4],12:[2,4],13:[2,4],14:[2,4],15:[2,4],23:[2,4]},{4:20,6:[1,3],7:[1,4],8:[1,5],9:[1,6],12:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],22:[1,13]},{4:21,6:[1,3],7:[1,4],8:[1,5],9:[1,6],12:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],22:[1,13]},{9:[1,22]},{9:[1,23]},{9:[1,24]},{9:[1,25]},{9:[1,26]},{9:[1,27]},{1:[2,1]},{4:28,6:[1,3],7:[1,4],8:[1,5],9:[1,6],12:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],22:[1,13]},{4:29,6:[1,3],7:[1,4],8:[1,5],9:[1,6],12:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],22:[1,13]},{4:30,6:[1,3],7:[1,4],8:[1,5],9:[1,6],12:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],22:[1,13]},{4:31,6:[1,3],7:[1,4],8:[1,5],9:[1,6],12:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],22:[1,13]},{4:32,6:[1,3],7:[1,4],8:[1,5],9:[1,6],12:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],22:[1,13]},{10:[1,33],11:[1,15],12:[1,16],13:[1,17],14:[1,18],15:[1,19]},{5:[2,11],10:[2,11],11:[2,11],12:[2,11],13:[2,11],14:[2,11],15:[2,11],23:[2,11]},{4:34,6:[1,3],7:[1,4],8:[1,5],9:[1,6],12:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],22:[1,13]},{4:35,6:[1,3],7:[1,4],8:[1,5],9:[1,6],12:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],22:[1,13]},{4:36,6:[1,3],7:[1,4],8:[1,5],9:[1,6],12:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],22:[1,13]},{4:37,6:[1,3],7:[1,4],8:[1,5],9:[1,6],12:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],22:[1,13]},{4:39,6:[1,3],7:[1,4],8:[1,5],9:[1,6],12:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],21:38,22:[1,13]},{4:39,6:[1,3],7:[1,4],8:[1,5],9:[1,6],12:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],21:40,22:[1,13]},{5:[2,6],10:[2,6],11:[2,6],12:[2,6],13:[1,17],14:[1,18],15:[1,19],23:[2,6]},{5:[2,7],10:[2,7],11:[2,7],12:[2,7],13:[1,17],14:[1,18],15:[1,19],23:[2,7]},{5:[2,8],10:[2,8],11:[2,8],12:[2,8],13:[2,8],14:[2,8],15:[1,19],23:[2,8]},{5:[2,9],10:[2,9],11:[2,9],12:[2,9],13:[2,9],14:[2,9],15:[1,19],23:[2,9]},{5:[2,10],10:[2,10],11:[2,10],12:[2,10],13:[2,10],14:[2,10],15:[2,10],23:[2,10]},{5:[2,5],10:[2,5],11:[2,5],12:[2,5],13:[2,5],14:[2,5],15:[2,5],23:[2,5]},{10:[1,41],11:[1,15],12:[1,16],13:[1,17],14:[1,18],15:[1,19]},{10:[1,42],11:[1,15],12:[1,16],13:[1,17],14:[1,18],15:[1,19]},{10:[1,43],11:[1,15],12:[1,16],13:[1,17],14:[1,18],15:[1,19]},{10:[1,44],11:[1,15],12:[1,16],13:[1,17],14:[1,18],15:[1,19]},{10:[1,45],23:[1,46]},{10:[2,18],11:[1,15],12:[1,16],13:[1,17],14:[1,18],15:[1,19],23:[2,18]},{10:[1,47],23:[1,46]},{5:[2,12],10:[2,12],11:[2,12],12:[2,12],13:[2,12],14:[2,12],15:[2,12],23:[2,12]},{5:[2,13],10:[2,13],11:[2,13],12:[2,13],13:[2,13],14:[2,13],15:[2,13],23:[2,13]},{5:[2,14],10:[2,14],11:[2,14],12:[2,14],13:[2,14],14:[2,14],15:[2,14],23:[2,14]},{5:[2,15],10:[2,15],11:[2,15],12:[2,15],13:[2,15],14:[2,15],15:[2,15],23:[2,15]},{5:[2,16],10:[2,16],11:[2,16],12:[2,16],13:[2,16],14:[2,16],15:[2,16],23:[2,16]},{4:48,6:[1,3],7:[1,4],8:[1,5],9:[1,6],12:[1,7],16:[1,8],17:[1,9],18:[1,10],19:[1,11],20:[1,12],22:[1,13]},{5:[2,17],10:[2,17],11:[2,17],12:[2,17],13:[2,17],14:[2,17],15:[2,17],23:[2,17]},{10:[2,19],11:[1,15],12:[1,16],13:[1,17],14:[1,18],15:[1,19],23:[2,19]}],
defaultActions: {14:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    };

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+'\nExpecting '+expected.join(', ');
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }
            
            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column,
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};/* Jison generated lexer */
var lexer = (function(){var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);
            if (match) {
                lines = match[0].match(/\n.*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match.length}
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                if (token) return token;
                else return;
            }
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    }});
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 6;
break;
case 2:return 13;
break;
case 3:return 14;
break;
case 4:return 12;
break;
case 5:return 11;
break;
case 6:return 15;
break;
case 7:return 9;
break;
case 8:return 10;
break;
case 9:return 8;
break;
case 10:return 7;
break;
case 11:return 23;
break;
case 12:return 22;
break;
case 13:return 20;
break;
case 14:return 17;
break;
case 15:return 18;
break;
case 16:return 19;
break;
case 17:return 16;
break;
case 18:return 5;
break;
}
};
lexer.rules = [/^\s+/,/^[0-9]+(\.[0-9]+)?\b\b/,/^\*/,/^\//,/^-/,/^\+/,/^\^/,/^\(/,/^\)/,/^pi\b/,/^e\b/,/^,/,/^max\b/,/^min\b/,/^sin\b/,/^cos\b/,/^tan\b/,/^sqrt\b/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = MathParser;
exports.parse = function () { return MathParser.parse.apply(MathParser, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}
/**********************************************************************
 * <p>Displays an arithmetical expression the way you would write it on
 * paper.</p>
 * 
 * @module gallery-mathcanvas
 * @class Y.MathCanvas
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
	 * @config func
	 * @type {Y.MathFunction|String}
	 */
	func:
	{
		value: new Y.MathFunction.Value(0),
		setter: function(value)
		{
			return Y.Lang.isString(value) ?
				Y.MathCanvas.Parser.parse(value) : value;
		}
	},

	/**
	 * The font name to use.
	 * 
	 * @config fontname
	 * @type {String}
	 */
	fontname:
	{
		value:     'sans-serif',
		validator: Y.Lang.isString
	},

	/**
	 * The font size to use, in em's.
	 * 
	 * @config fontsize
	 * @type {Integer}
	 */
	fontsize:
	{
		value:     1,
		validator: Y.Lang.isNumber
	}
};

function setSize(
	/* event */			e,
	/* width/height */	type)
{
	if (e.newVal.toString().search(/px$/))
	{
		this.canvas.setAttribute(type, parseInt(e.newVal, 10));
	}
	else
	{
		e.preventDefault();
	}
}

Y.extend(MathCanvas, Y.Widget,
{
	initializer: function(config)
	{
		this.after('funcChange', this._renderExpression);
	},

	renderUI: function()
	{
		var container = this.get('contentBox');

		this.canvas = Y.Node.create('<canvas width="100" height="100" tabindex="0"></canvas>');
		container.appendChild(this.canvas);

		this.context = new Y.Canvas.Context2d(this.canvas);
		Y.mix(this.context, math_rendering);
		this.context.math_canvas = this;

		var w = this.get('width');
		if (w)
		{
			this.canvas.setAttribute('width', parseInt(w, 10));
		}
		this.on('widthChange', setSize, this, 'width');

		var h = this.get('height');
		if (h)
		{
			this.canvas.setAttribute('height', parseInt(h, 10));
		}
		this.on('heightChange', setSize, this, 'height');

		this._renderExpression();
	},

	destructor: function()
	{
		this.canvas  = null;
		this.context = null;
	},

	/**
	 * Renders the expression.
	 */
	_renderExpression: function()
	{
		this.context.clearRect(0,0,
			this.canvas.getAttribute('width'),
			this.canvas.getAttribute('height'));

		var f = this.get('func');
		if (!f)
		{
			return;
		}

		this.rect_list = new RectList();

		var top_left = { x:0, y:0 };
		f.prepareToRender(this.context, top_left, 100, this.rect_list);

		var bounds = this.rect_list.getBounds();

		this.context.save();
		this.context.translate(
			Math.floor((this.canvas.getAttribute('width') - (bounds.right - bounds.left)) / 2),
			Math.floor((this.canvas.getAttribute('height') - (bounds.bottom - bounds.top)) / 2));

		f.render(this.context, this.rect_list);

		this.context.restore();
	}
});

var paren_angle = Math.PI/6;	// 30 degrees

var math_rendering =
{
	drawString: function(
		/* int */			left,
		/* int */			midline,
		/* percentage */	font_size,
		/* string */		s)
	{
		var h = this.getLineHeight(font_size);
		this._setFont(font_size);
		this.set('textBaseline', 'top');
		this.fillText(s, left, Math.floor(midline - h/2));
	},

	getLineHeight: function(
		/* percentage */	font_size)
	{
		return (13 * this.math_canvas.get('fontsize') * font_size/100.0);
	},

	getStringWidth: function(
		/* percentage */	font_size,
		/* string */		text)
	{
		this.save();
		this._setFont(font_size);
		var w = this.measureText(text).width;
		this.restore();
		return w;
	},

	_setFont: function(
		/* percentage */	font_size)
	{
		this.set('font',
			(this.math_canvas.get('fontsize') * font_size/100.0) + 'em ' +
			 this.math_canvas.get('fontname'));
	},

	drawSquareBrackets: function(
		/* rect */	r)
	{
		var h = r.bottom - r.top;
		var w = this.getSquareBracketWidth(r)-2;

		this.moveTo(r.left-2, r.top);
		this.line(-w,0);
		this.line(0,h-1);
		this.line(w,0);
		this.stroke();

		this.moveTo(r.right+1, r.top);
		this.line(w,0);
		this.line(0,h-1);
		this.line(-w,0);
		this.stroke();
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
		var h       = r.bottom - r.top;
		var radius  = h/(2.0*Math.sin(paren_angle));
		var radius1 = Math.round(radius);
		var yc      = RectList.ycenter(r);
		var pw      = this.getParenthesisWidth(r);

		this.beginPath();
		this.arc(r.left - pw + radius, yc, radius1, Math.PI-paren_angle, Math.PI+paren_angle, false);
		this.stroke();

		this.beginPath();
		this.arc(r.right + pw - radius, yc, radius1, paren_angle, -paren_angle, true);
		this.stroke();
	},

	getParenthesisWidth: function(
		/* rect */	r)
	{
		var h = r.bottom - r.top;
		return 2+Math.round(0.5 + (h * (1.0 - Math.cos(paren_angle)))/(2.0 * Math.sin(paren_angle)));
	}
};

MathParser.yy.MathFunction = Y.MathFunction;

Y.MathCanvas          = MathCanvas;
Y.MathCanvas.RectList = RectList;
Y.MathCanvas.Parser   = MathParser;


}, '@VERSION@' ,{requires:['widget','collection','gallery-canvas']});
