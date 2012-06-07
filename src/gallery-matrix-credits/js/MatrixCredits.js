"use strict";

/**
 * @module gallery-matrix-credits
 */

// Based on my ancient JMatrixCtrl MFC widget

/**
 * Widget to display text similar to what was used in the credits for The
 * Matrix.  If you render the widget into the body, then it will fill the
 * viewport.  Otherwise, you must specify a width and height for the
 * widget.
 * 
 * @main gallery-matrix-credits
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
	 * The sequence of messages to display.  Each item defines `intro`, a
	 * list of strings to display immediately, `lines`, a list of strings
	 * to phase in one at a time, and (optional) `pause`, the number of
	 * milliseconds to wait before continuing to the next item in the
	 * sequence.
	 *
	 * @attribute textSequence
	 * @type {Array}
	 */
	textSequence:
	{
		value:     [],
		validator: Y.Lang.isArray
	},

	/**
	 * Milliseconds to wait before starting the text sequence.
	 *
	 * @attribute introDelay
	 * @type {Number}
	 * @default 5000
	 */
	introDelay:
	{
		value:     5000,
		validator: Y.Lang.isNumber
	},

	/**
	 * Overridden by `pause` values in `textSequence`.
	 *
	 * @attribute framePause
	 * @type {Number}
	 * @default 2000
	 */
	framePause:
	{
		value:     2000,
		validator: Y.Lang.isNumber
	},

	/**
	 * Milliseconds to wait before restarting the text sequence.
	 * Overridden by `pause` value of last item in `textSequence`.
	 *
	 * @attribute restartDelay
	 * @type {Number}
	 * @default 5000
	 */
	restartDelay:
	{
		value:     5000,
		validator: Y.Lang.isNumber
	},

	/**
	 * <dl>
	 * <dt>none</dt><dd>Each line is drawn all at once and then begins to phase in.</dd>
	 * <dt>block</dt><dd>The text appears as a block cursor (\u2588) scans across the container.</dd>
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
	 * The range of Unicode characters to use for spinning characters.  For
	 * most interesting results, all the characters in textSequence should
	 * be in this range.
	 * 
	 * @attribute charRange
	 * @type {Array}
	 * @default ['!', '~']
	 */
	charRange:
	{
		value: ['!', '~'],
		validator: function(value)
		{
			return (Y.Lang.isArray(value) && value.length == 2 &&
					value[0].length == 1 && value[1].length == 1 &&
					value[0] < value[1]);
		}
	},

	/**
	 * Configuration for Y.MatrixBackground
	 *
	 * @attribute backgroundConfig
	 * @type {Object}
	 * @writeonce
	 */
	backgroundConfig:
	{
		writeOnce: true
	}
};

var interval =
	{
		cursor: 30
		// background's spin interval is used for text
	};

var rnd        = Y.Plugin.MatrixBackground.rnd;
var startTimer = Y.Plugin.MatrixBackground.startTimer;
var stopTimer  = Y.Plugin.MatrixBackground.stopTimer;

function scheduleNextFrame()
{
	var frames = this.get('textSequence');
	var frame  = frames[ this.frame_index ];
	var key    = (this.frame_index == frames.length - 1) ? 'restartDelay' : 'framePause';
	Y.later(frame.pause || this.get(key), this, nextFrame);
}

function nextFrame()
{
	var frames = this.get('textSequence');

	this.frame_index++;
	if (this.frame_index >= frames.length)
	{
		this.frame_index = 0;
	}

	var frame = frames[ this.frame_index ];

	var intro = Y.reduce(frame.intro || [], '', function(s, line)
	{
		return s + '<p>' + (line || '&nbsp;') + '</p>';
	});

	var lines = Y.reduce(frame.lines || [], '', function(s, line)
	{
		s += '<p><span>x';
		for (var i=0; i<line.length; i++)
		{
			s += '&nbsp;';
		}
		return s + 'x</span></p>';
	});

	this.frame.setContent(intro + lines);
	this.frame_top = Math.floor((this.get('height') - this.frame.totalHeight())/2);
	this.frame.setStyle('top', this.frame_top + 'px')

	if (frame.lines)
	{
		this.frame_lines      = this.frame.all('span');
		this.frame_line_index = { row: 0, col: -1 };

		this.cursor.removeClass('hidden');
		this.cursor_top = this.frame_top - this.frame.totalHeight();
		startTimer.call(this, 'cursor');
		this.spin_handle = this.bkgd.on('spin', updateSpin, this);
	}
	else
	{
		scheduleNextFrame.call(this);
	}
}

function updateCursor()
{
	this.frame_line_index.col++;
	if (parseInt(this.cursor.getStyle('left'), 10) > this.get('width'))
	{
		this.frame_line_index.col = 0;
		this.frame_line_index.row++;
		if (this.frame_line_index.row >= this.frame_lines.size())
		{
			this.cursor.addClass('hidden');
			this.cursor.setStyles({ top: 0, left: 0 });
			stopTimer.call(this, 'cursor');
			scheduleNextFrame.call(this);
			return;
		}
	}

	this.cursor.setStyles(
	{
		top:  (this.cursor_top + this.frame_lines.item(this.frame_line_index.row).get('offsetTop'))+'px',
		left: (this.cursor_width * this.frame_line_index.col) + 'px'
	});

	
}

function updateSpin()
{
	if (this.timer.cursor && this.get('cursor') == 'char')
	{
		var c_range = Y.Plugin.MatrixBackground.getCharacterRange.call(this.bkgd);
		this.cursor.set('innerHTML', String.fromCharCode(rnd(c_range[0], c_range[1]+1)));
	}
}

function updateCursorAppearance()
{
	var type = this.get('cursor');
	if (type == 'block')
	{
		this.cursor.set('innerHTML', '\u2588');
	}
	else
	{
		this.cursor.set('innerHTML', '&nbsp;');
	}

	this.cursor_width = this.cursor.get('offsetWidth');
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
		if (this.get('boundingBox').ancestor() == Y.one('body'))
		{
			resize.call(this);
			Y.on('windowresize', resize, this);
		}

		this.on('cursor', updateCursor);
	},

	destructor: function()
	{
		stopTimer.call(this, 'cursor');
	},

	syncUI: function()
	{
		// now the size has been applied to bounding box

		var container = this.get('boundingBox');
		container.plug(Y.Plugin.MatrixBackground, this.get('backgroundConfig'));
		this.bkgd = container.matrix;

		this.frame = Y.Node.create('<div class="frame"></div>');
		this.get('contentBox').append(this.frame);

		this.cursor = Y.Node.create('<span class="cursor hidden"></span>');
		this.get('contentBox').append(this.cursor);
		updateCursorAppearance.call(this);
		this.after('cursorChange', updateCursorAppearance);

		this.frame_index = -1;	// incremented by nextFrame
		Y.later(this.get('introDelay'), this, nextFrame);
	}
});

Y.MatrixCredits = MatrixCredits;
