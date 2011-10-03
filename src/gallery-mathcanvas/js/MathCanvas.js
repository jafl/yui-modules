/**********************************************************************
 * Displays an arithmetical expression the way you would write it on paper.
 * 
 * @module gallery-mathcanvas
 * @namespace
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
	 * @config fontName
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
	 * @config fontSize
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
	 * @config minWidth
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
	 * @config minHeight
	 * @type {Integer}
	 */
	minHeight:
	{
		value:     100,
		validator: Y.Lang.isNumber
	}
};

function setSize(
	/* width/height */	type)
{
	var c = type.charAt(0).toUpperCase() + type.substr(1);
	var v = Math.max(this.get('min'+c), this[ 'render_'+type ]+5);
	this.set(type, v+'px');
	this.canvas.setAttribute(type, v);
}

Y.extend(MathCanvas, Y.Widget,
{
	initializer: function(config)
	{
		this.after('funcChange', this._renderExpression);
		this.after('fontNameChange', this._renderExpression);
		this.after('fontSizeChange', this._renderExpression);
		this.after('minWidthChange', this._renderExpression);
		this.after('minHeightChange', this._renderExpression);
	},

	renderUI: function()
	{
		var container = this.get('contentBox');

		var w = this.get('minWidth');
		this.set('width', w+'px');

		var h = this.get('minHeight');
		this.set('height', w+'px');

		this.canvas = Y.Node.create(
			'<canvas width="' + w + '" height="' + h + '" tabindex="0"></canvas>');
		if (!this.canvas)
		{
			throw Error("This browser does not support canvas rendering.");
		}

		container.appendChild(this.canvas);

		this.context = new Y.Canvas.Context2d(this.canvas);
		Y.mix(this.context, math_rendering);
		this.context.math_canvas = this;

		this._renderExpression();

		// input (for mobile)

		this.input = Y.Node.create('<input type="text" style="position:absolute;top:-10px;left:-10px;width:1px;height:1px;"></input>');
		container.appendChild(this.input);
	},

	bindUI: function()
	{
		this.canvas.on('mousedown', function(e)
		{
			function select(e)
			{
				var xy = this.canvas.getXY();
				var pt =
				[
					Math.round(e.pageX - xy[0]) - offset[0],
					Math.round(e.pageY - xy[1]) - offset[1]
				];

				this.selection = this.rect_list.getSelection(anchor, pt);
				this._renderExpression();
			}

			var bounds = this.rect_list.getBounds();
			var offset =
			[
				Math.floor((this.canvas.getAttribute('width') - RectList.width(bounds)) / 2),
				Math.floor((this.canvas.getAttribute('height') - RectList.height(bounds)) / 2)
			];

			var xy = this.canvas.getXY();
			var anchor =
			[
				Math.round(e.pageX - xy[0]) - offset[0],
				Math.round(e.pageY - xy[1]) - offset[1]
			];

			select.call(this, e);
			var handler = this.canvas.on('mousemove', select, this);

			Y.one(Y.config.doc).once('mouseup', function(e)
			{
				handler.detach();
				this.input.focus();
			},
			this);
		},
		this);

		this.input.on('keydown', function(e)
		{
//			console.log(e.charCode);

			if (e.charCode == 32 && this.selection >= 0)	// expand
			{
				var p = this.rect_list.get(this.selection).func.getParent();
				if (p)
				{
					this.selection = this.rect_list.findIndex(p);
					this._renderExpression();
				}
			}
			else if (e.charCode == 8 && this.selection >= 0)	// delete
			{
				this.deleteFunction(this.rect_list.get(this.selection).func);
			}
		},
		this);
	},

	destructor: function()
	{
		this.canvas  = null;
		this.context = null;
	},

	/**
	 * @param f {MathFunction} function to remove from the overall expression
	 */
	deleteFunction: function(
		/* MathFunction */ f)
	{
		var p = f.getParent();
		var s = p;
		if (!p)
		{
			this.selection = 0;
			this.set('func', '0');
			return;
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

	/*
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

		this.render_width  = RectList.width(bounds);
		setSize.call(this, 'width');

		this.render_height = RectList.height(bounds);
		setSize.call(this, 'height');

		this.context.save();
		this.context.translate(
			Math.floor((this.canvas.getAttribute('width') - RectList.width(bounds)) / 2),
			Math.floor((this.canvas.getAttribute('height') - RectList.height(bounds)) / 2));

		if (this.selection >= 0)
		{
			var r = this.rect_list.get(this.selection).rect;
			this.context.save();
			this.context.set('fillStyle', '#99FFFF');
			this.context.fillRect(r.left, r.top, RectList.width(r), RectList.height(r));
			this.context.restore();
		}

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
		return (13 * this.math_canvas.get('fontSize') * font_size/100.0);
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
			(this.math_canvas.get('fontSize') * font_size/100.0) + 'em ' +
			 this.math_canvas.get('fontName'));
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
		return RectList.height(r)/2;
	},

	getSubscriptDepth: function(
		/* rect */	r)
	{
		return RectList.height(r)/2;
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
	},

	drawVerticalBar: function(
		/* rect */	r)
	{
		this.moveTo(r.left+1, r.top);
		this.lineTo(r.left+1, r.bottom);
		this.stroke();
	},

	getVerticalBarWidth: function()
	{
		return 3;
	},

	drawHorizontalBar: function(
		/* rect */	r)
	{
		var y = r.top+1;
		this.moveTo(r.left, y);
		this.lineTo(r.right-1, y);
		this.stroke();
	},

	getHorizontalBarHeight: function()
	{
		return 3;
	}
};

MathParser.yy.MathFunction = Y.MathFunction;

Y.MathCanvas          = MathCanvas;
Y.MathCanvas.RectList = RectList;
Y.MathCanvas.Parser   = MathParser;

/**********************************************************************
 * Parser used to convert a string expression into Y.MathFunction
 * 
 * @namespace MathCanvas
 * @class Parser
 */

/**
 * Parses a string into a Y.MathFunction.
 * 
 * @method parse
 * @static
 * @param expr {String} expression to parse
 * @return {MathFunction}
 */
