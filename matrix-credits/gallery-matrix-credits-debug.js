YUI.add('gallery-matrix-credits', function(Y) {

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

function resize()
{
	this.set('width', Y.DOM.winWidth());
	this.set('height', Y.DOM.winHeight());
}

Y.extend(MatrixCredits, Y.Widget,
{
	initializer: function(config)
	{
	},

	destructor: function()
	{
		stopTimer.call(this, 'cursor');
	},

	bindUI: function()
	{
		if (this.get('boundingBox').ancestor() == Y.one('body'))
		{
			resize.call(this);
			Y.on('windowresize', resize, this);
		}
	},

	syncUI: function()
	{
		// now the size has been applied to bounding box

		var container = this.get('boundingBox');
		container.plug(Y.Plugin.MatrixBackground);
		this.bkgd = container.matrix;
	}
});

Y.MatrixCredits = MatrixCredits;


}, '@VERSION@' ,{requires:['widget','gallery-matrix-background'], skinnable:true});
