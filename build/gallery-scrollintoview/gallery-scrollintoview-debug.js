YUI.add('gallery-scrollintoview', function(Y) {

var em_div = null,

	the_horiz_styles =
	[
		'margin-left',
		'border-left-width',
		'padding-left',
		'padding-right',
		'border-right-width',
		'margin-right'
	],

	the_vert_styles =
	[
		'margin-top',
		'border-top-width',
		'padding-top',
		'padding-bottom',
		'border-bottom-width',
		'margin-bottom'
	];

/**********************************************************************
 * <p>Returns the size of one em in pixels.</p>
 * 
 * @method emToPx
 */

Y.emToPx = function(
	/* float */	em_count)
{
	if (!em_div)
	{
		em_div = document.createElement('div');
		em_div.style.position   = 'absolute';
		em_div.style.top        = '-10000px';
		em_div.style.left       = '-10000px';
		em_div.style.visibility = 'hidden';
		em_div.style.width      = '10em';
		em_div.style.height     = '10em';
		document.body.appendChild(em_div);
	}
	return em_count * (em_div.offsetWidth / 10.0);
}

/**********************************************************************
 * <p>Computes the size of everything surrounding the element's content.</p>
 * 
 * @method horizMarginBorderPadding
 */

Y.Node.prototype.horizMarginBorderPadding = function()
{
	var w = 0;

	Y.each(the_horiz_styles, function(style)
	{
		w += this.parseDimensionStyle(style);
	},
	this);

	return w;
}

/**********************************************************************
 * <p>Computes the size of everything surrounding the element's content.</p>
 * 
 * @method vertMarginBorderPadding
 */

Y.Node.prototype.vertMarginBorderPadding = function()
{
	var h = 0;

	Y.each(the_vert_styles, function(style)
	{
		h += this.parseDimensionStyle(style);
	},
	this);

	return h;
}

/**********************************************************************
 * <p>Returns the size of the style in pixels.</p>
 * 
 * @method parseDimensionStyle
 */

Y.Node.prototype.parseDimensionStyle = function(
	/* string */	style)
{
	var s = this.getStyle(style);
	if (!s || !/^[0-9]/.test(s))	// ignore values like "medium"
	{
		return 0;
	}

	var v = parseFloat(s, 10);
	if (/em$/.test(s))
	{
		v *= Y.emToPx(1);
	}

	return Math.round(v);
}
/**********************************************************************
 * <p>Only scrolls the browser if the object is not currently visible.</p>
 * 
 * <p>This requires that all scrollable elements have position:relative.
 * Otherwise, this algorithm will skip over them with unpredictable
 * results.</p>
 * 
 * @method scrollIntoView
 */

Y.Node.prototype.scrollIntoView = function()
{
	var ancestor = Y.Node.getDOMNode(this.get('offsetParent'));
	if (!ancestor)
	{
		return;
	}

	var r =
	{
		top:    this.get('offsetTop'),
		bottom: this.get('offsetTop') + this.get('offsetHeight'),
		left:   this.get('offsetLeft'),
		right:  this.get('offsetLeft') + this.get('offsetWidth')
	};

	r.move = function(
		/* int */	dx,
		/* int */	dy)
	{
		this.top    += dy;
		this.bottom += dy;
		this.left   += dx;
		this.right  += dx;
	};

	while (1)
	{
		while (1)
		{
			var hit_top = (ancestor.tagName.toLowerCase() == 'html');

			var a = Y.one(ancestor);
			if (ancestor.scrollWidth - a.horizMarginBorderPadding() > ancestor.clientWidth ||
				ancestor.scrollHeight - a.vertMarginBorderPadding() > ancestor.clientHeight)
			{
				break;
			}
			else if (hit_top)
			{
				return;
			}

			r.move(ancestor.offsetLeft - ancestor.scrollLeft, ancestor.offsetTop - ancestor.scrollTop);
			ancestor = ancestor.offsetParent || ancestor.parentNode;
		}

		var scrollX = (hit_top ? document.documentElement.scrollLeft || document.body.scrollLeft : ancestor.scrollLeft);
		var scrollY = (hit_top ? document.documentElement.scrollTop || document.body.scrollTop : ancestor.scrollTop);

		var d =
		{
			top:    scrollY,
			bottom: scrollY + ancestor.clientHeight,
			left:   scrollX,
			right:  scrollX + ancestor.clientWidth
		};

		var dy = 0;
		if (r.top < d.top)
		{
			dy = r.top - d.top;
		}
		else if (r.bottom > d.bottom)
		{
			dy = r.bottom - d.bottom;
		}

		var dx = 0;
		if (r.left < d.left)
		{
			dx = r.left - d.left;
		}
		else if (r.right > d.right)
		{
			dx = r.right - d.right;
		}

		if (hit_top)
		{
			if (dx || dy)
			{
				window.scrollBy(dx, dy);
			}
			break;
		}
		else
		{
			ancestor.scrollLeft += dx;
			ancestor.scrollTop  += dy;

			r.move(ancestor.offsetLeft - ancestor.scrollLeft, ancestor.offsetTop - ancestor.scrollTop);

			ancestor = ancestor.offsetParent;
		}
	}
}


}, '@VERSION@' ,{requires:['node-style']});
