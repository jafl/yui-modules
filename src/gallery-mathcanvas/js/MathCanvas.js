/**
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

function setSize(
	/* width/height */	type)
{
	var c = type.charAt(0).toUpperCase() + type.substr(1);
	var v = Math.max(this.get('min'+c), this[ 'render_'+type ]+5);
	this.set(type, v+'px');
	this.canvas.setAttribute(type, v);
}

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
			alert('Parse error:\n' + s[1] + '\n' + s[2]);	// XXX
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

		// http://www.thegalaxytabforum.com/index.php?/topic/621-detecting-android-tablets-with-javascript

		var agent    = navigator.userAgent.toLowerCase();
		var platform = navigator.platform;
		// We need to eliminate Symbian, Series 60, Windows Mobile and Blackberry
		// browsers for this quick and dirty check. This can be done with the user agent.
		var otherBrowser = agent.indexOf("series60")   != -1 ||
						   agent.indexOf("symbian")    != -1 ||
						   agent.indexOf("windows ce") != -1 ||
						   agent.indexOf("blackberry") != -1;
		// If the screen orientation is defined we are in a modern mobile OS
		var mobileOS = typeof orientation != 'undefined';
		// If touch events are defined we are in a modern touch screen OS
		var touchOS = 'ontouchstart' in document.documentElement;
		// iPhone and iPad can be reliably identified with the navigator.platform
		// string, which is currently only available on these devices.
		var iOS = platform.indexOf("iPhone") != -1 || platform.indexOf("iPad") != -1;
		// If the user agent string contains "android" then it's Android. If it
		// doesn't but it's not another browser, not an iOS device and we're in
		// a mobile and touch OS then we can be 99% certain that it's Android.
		var android = agent.indexOf("android") != -1 || (!iOS && !otherBrowser && touchOS && mobileOS);

		 // navigator.platform doesn't work for iPhoney
		this.touch = touchOS || agent.indexOf("iphone") != -1;
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
			'<svg width="' + w + '" height="' + h + '" tabindex="0" xmlns="http://www.w3.org/2000/svg"></svg>');
		if (!this.canvas)
		{
			throw Error("This browser does not support svg rendering.");
		}

		container.appendChild(this.canvas);

		this.context             = math_rendering;
		this.context.math_canvas = this;

		this._renderExpression();

		// input (for mobile)

		if (this.touch || YUI.config.debug_mathcanvas_keyboard)
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
		if (this.selection >= 0 &&
			this.rect_list.get(this.selection).func.handleKeyPress(this, code, c))
		{
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
		else if (this.selection >= 0 && c != '=')
		{
			const i = Y.MathFunction.Input.replace(this.rect_list.get(this.selection).func);
			i.handleKeyPress(this, code, c);

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
			const i = Y.MathFunction.Input.replace(f);

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
		this.canvas_root = Y.Node(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
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
		var n = document.createElementNS('http://www.w3.org/2000/svg', type);

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
