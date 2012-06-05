YUI.add('gallery-matrix-credits', function(Y) {

"use strict";

/**
 * Widget to display text similar to what was used in the credits for The
 * Matrix.  If you render the widget into the body, then it will fill the
 * viewport.  Otherwise, you must specify a width and height for the
 * widget.
 * 
 * Based on my ancient JMatrixCtrl MFC widget.
 * 
 * @module gallery-matrix-credits
 * @main gallery-matrix-credits
 */

/**
 * @class MatrixCredits
 * @constructor
 * @param config {Object} Widget configuration
 */
function MatrixCredits(config)
{
	this.timer   = {};
	this.bkgd_on = [];

	MatrixCredits.superclass.constructor.call(this, config);
}

MatrixCredits.NAME = 'matrixcredits';

MatrixCredits.ATTRS =
{
	/**
	 * <dl>
	 * <dt>none</dt><dd>Each line is drawn all at once and then begins to phase in.</dd>
	 * <dt>block</dt><dd>The text appears as a block cursor scans across the container.</dd>
	 * <dt>char</dt><dd>The text appears as a randomly changing character scans across the container.</dd>
	 * </dl>
	 *
	 * @attribute cursor
	 * @type {String}
	 * @default "block"
	 */
	cursor:
	{
		value: 'block',
		validator: function(value)
		{
			return value == 'none' || value == 'block' || value == 'char';
		}
	},

	/**
	 * The maximum number of iterations before a character is forced to the
	 * final value.  Each character stops changing when it hits the correct value
	 * or exceeds the maximum.  Specify zero to simply display the text.
	 *
	 * @attribute maxPhaseCount
	 * @type {Number}
	 * @default 20
	 */
	maxPhaseCount:
	{
		value:     20,
		validator: Y.Lang.isNumber
	},

	/**
	 * The range of Unicode characters to use for the background noise.
	 * 
	 * @attribute backgroundRange
	 * @type {Array}
	 * @default ['\u30A1', '\u30FA']
	 */
	backgroundRange:
	{
		value: ['\u30A1', '\u30FA'],
		validator: function(value)
		{
			return (Y.Lang.isArray(value) && value.length == 2 &&
					value[0].length == 1 && value[1].length == 1 &&
					value[0] < value[1]);
		}
	},

	/**
	 * Fraction of total columns that have a spinning character.
	 * 
	 * @attribute spinFraction
	 * @type {Number}
	 * @default 0.2
	 */
	spinFraction:
	{
		value: 0.2,
		validator: function(value)
		{
			return (0.0 <= value && value <= 1.0);
		}
	}
};

var interval =
	{
		spin:   10,	// also used for text
		cursor: 30,
		bkgd:   80
	},

	bkgd_bottom_offset = 3,		// minimum number of rows affected by column drop

	min_spin_count = 300,
	max_spin_count = 800;

function rnd(min, max)
{
	return min + Math.floor(Math.random() * (max - min));
}

function getBackgroundRange()
{
	var bg_range = this.get('backgroundRange');
	return [ bg_range[0].charCodeAt(0), bg_range[1].charCodeAt(0) ];
}

function getBackgroundCell(x,y)
{
	return Y.Node.getDOMNode(this.bkgd_table).firstChild.childNodes[y].childNodes[x];
}

function startTimer(id)
{
	stopTimer.call(this, id);

	this.timer[id] = Y.later(interval[id], this, function()
	{
		this.fire(id);
	},
	null, true);
}

function stopTimer(id)
{
	if (this.timer[id])
	{
		this.timer[id].cancel();
		delete this.timer[id];
	}
}

function renderBackground()
{
	var container = this.get('contentBox');

	if (this.bkgd_table)
	{
		this.bkgd_table.destroy();
	}

	var bg_range = getBackgroundRange.call(this),
		c        = String.fromCharCode(bg_range[0]);
	container.set('innerHTML',
		'<table class="background"><tr><td>' + c + '</td></tr></table>');

	var table = container.one('table'),
		w     = Math.ceil(container.totalWidth() / table.totalWidth()),
		h     = Math.ceil(this.get('height') / table.totalHeight());

	var row = '<tr>';
	for (var x=0; x<w; x++)
	{
		row += '<td>&nbsp;</td>';
	}
	row += '</tr>';

	var s = '';
	for (var y=0; y<h; y++)
	{
		s += row;
	}

	// force column widths with row outside bounds (&nbsp; forces row heights)

	s += '<tr>';
	for (var x=0; x<w; x++)
	{
		s += '<td>' + c + '</td>';
	}
	s += '</tr>';

	table.set('innerHTML', s);

	this.bkgd_table = table;
	this.row_count  = h;
	this.col_count  = w;

	this.bkgd_active = 0;
	this.bkgd_col    = [];
	for (var i=0; i<w; i++)
	{
		this.bkgd_col.push({ active: false });
	}

	startTimer.call(this, 'bkgd');

	this.spin_count  = Math.floor(w * this.get('spinFraction'));
	this.spin_active = 0;
	this.spin        = [];
	for (var i=0; i<this.spin_count; i++)
	{
		this.spin.push({ active: false });
	}

	startTimer.call(this, 'spin');
}

function initBackgroundColumn(x)
{
	var col    = this.bkgd_col[x];
	col.active = true;
	col.y      = Math.random() < 0.5 ? rnd(0, this.row_count - bkgd_bottom_offset) : 0;

	if (Math.random() < 0.5)
	{
		col.y_max = col.y + rnd(bkgd_bottom_offset, this.row_count - col.y - 1)
	}
	else
	{
		col.y_max = this.row_count - 1;
	}

	if (Math.random() < 0.2)
	{
		col.c = '&nbsp;';
	}
	else
	{
		var bg_range = getBackgroundRange.call(this);
		col.c        = String.fromCharCode(rnd(bg_range[0], bg_range[1]+1));
	}
}

function updateBackground()
{
	// increment all active columns

	var count    = this.col_count,
		bg_range = getBackgroundRange.call(this);
	for (var i=0; i<count; i++)
	{
		var col = this.bkgd_col[i];
		if (col.active && col.y >= col.y_max)
		{
			col.active = false;
			this.bkgd_active--;
		}
		else
		{
			if (col.c != '&nbsp;')
			{
				col.c = String.fromCharCode(rnd(bg_range[0], bg_range[1]+1));
			}
			col.y++;
		}
	}

	// activate another column

	if (this.bkgd_active < this.col_count)
	{
		var safety = 0;
		do
		{
			var i = rnd(0, this.col_count);
			safety++;
		}
			while (this.bkgd_col[i].active && safety < this.col_count);

		if (!this.bkgd_col[i].active)
		{
			initBackgroundColumn.call(this, i);
			this.bkgd_active++;
		}
	}

	update.call(this);
}

function updateSpin()
{
	// activate another spinner

	if (this.spin_active < this.spin_count && rnd(0,100) === 0)
	{
		var safety = 0;
		do
		{
			var i = rnd(0, this.spin_count);
			safety++;
		}
			while (this.spin[i].active && safety < this.spin_count);

		if (!this.spin[i].active)
		{
			var x = rnd(0, this.col_count),
				y = rnd(0, this.row_count);

			this.spin[i] =
			{
				active:  true,
				counter: rnd(min_spin_count, max_spin_count),
				cell:    getBackgroundCell.call(this, x, y)
			};

			this.spin_active++;
		}
	}

	// increment all active spinners

	var count    = this.spin_count,
		bg_range = getBackgroundRange.call(this);
	for (var i=0; i<count; i++)
	{
		var spin = this.spin[i];
		if (spin.active && spin.counter <= 0)
		{
			spin.active = false;
			spin.cell   = null;
			this.spin_active--;
		}
		else if (spin.active)
		{
			spin.c = String.fromCharCode(rnd(bg_range[0], bg_range[1]+1));
			spin.counter--;
		}
	}

	update.call(this);
}

function update()
{
	var count = this.bkgd_on.length;
	for (var i=0; i<count; i++)
	{
		Y.DOM.removeClass(this.bkgd_on[i], 'on');
	}
	this.bkgd_on = [];

	var count = this.col_count;
	for (var i=0; i<count; i++)
	{
		var col = this.bkgd_col[i];
		if (col.active)
		{
			var cell = getBackgroundCell.call(this, i, col.y);
			Y.DOM.addClass(cell, 'on');
			this.bkgd_on.push(cell);
			cell.innerHTML = col.c;
		}
	}

	var count = this.spin_count;
	for (var i=0; i<count; i++)
	{
		var spin = this.spin[i];
		if (spin.active)
		{
			Y.DOM.addClass(spin.cell, 'on');
			this.bkgd_on.push(spin.cell);
			spin.cell.innerHTML = spin.c;
		}
	}
}

function resize()
{
	this.set('width', Y.DOM.winWidth());
	this.set('height', Y.DOM.winHeight());
}

Y.extend(MatrixCredits, Y.Widget,
{
	initializer: function(config)
	{
		this.on('bkgd', updateBackground);
		this.on('spin', updateSpin);
	},

	destructor: function()
	{
		stopTimer.call(this, 'bkgd');
		stopTimer.call(this, 'spin');
	},

	bindUI: function()
	{
		if (this.get('boundingBox').ancestor() == Y.one('body'))
		{
			resize.call(this);
			Y.one(Y.config.win).on('resize', resize, this);
		}

		this.on('widthChange', renderBackground);
		this.on('heightChange', renderBackground);
	},

	syncUI: function()
	{
		renderBackground.call(this);
	}
});

Y.MatrixCredits = MatrixCredits;


}, '@VERSION@' ,{requires:['widget','gallery-dimensions','node-screen'], skinnable:true});
