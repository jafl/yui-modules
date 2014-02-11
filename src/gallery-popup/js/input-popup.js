/**
 * @module gallery-popup
 */

/**
 * <p>A popup tuned to attach to an input field and contain a clickable
 * value selector, e.g., `Y.Calendar` or `Y.Saw.Timepicker`.</p>
 *
 * @class InputPopup
 * @extends Popup
 * @constructor
 */
var InputPopup = function(config)
{
	if (Y.Lang.isUndefined(config.align))
	{
		config.align =
		{
			node:   config.inputField,
			points: [ Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL ]
		};

		config.preventOverlap = true;
	}

	if (Y.Lang.isUndefined(config.constrain))
	{
		config.constrain = true;
	}

	config.showOn =
	[
		{
			node:      config.inputField,
			eventName: 'focus'
		},
		{
			node:      config.inputField,
			eventName: 'click'		// re-show after esc
		}
	];

	config.stayOpenOn =
	[
		{
			node:      config.inputField,
			eventName: 'click'
		}
	];

	InputPopup.superclass.constructor.apply(this, arguments);
};

InputPopup.NAME = "inputpopup";

InputPopup.ATTRS =
{
	/**
	 * Input field to use.
	 * 
	 * @attribute inputField
	 * @type {Node|String}
	 * @required
	 * @writeonce
	 */
	inputField:
	{
		setter: function(n)
		{
			return Y.one(n) || Attribute.INVALID_VALUE;
		},
		writeOnce: true
	},

	/**
	 * Selector for clickable elements inside the popup that should close it.
	 * 
	 * @attribute clickNodes
	 * @type {String}
	 * @required
	 * @writeonce
	 */
	clickNodes:
	{
		validator: Y.Lang.isString,
		writeOnce: true
	}
};

/**
 * Selector for clickable nodes in a `Y.Calendar` instance.
 *
 * @property CalendarNodes
 * @type {String}
 * @static
 */
InputPopup.CalendarNodes = '.yui3-calendar-grid tbody td';

/**
 * Selector for clickable nodes in a `Y.Saw.Timepicker` instance.
 *
 * @property TimePickerNodes
 * @type {String}
 * @static
 */
InputPopup.SawTimepickerNodes = '.yui3-timepicker-cell';

Y.extend(InputPopup, Y.Popup,
{
	initializer: function(config)
	{
		this.after('render', function()
		{
			var input = this.get('inputField'),
				box   = this.get('boundingBox');

			// close after selecting a date

			Y.delegate('click', function()
			{
				this.hide();
				Y.later(1, input, input.focus);
			},
			box, this.get('clickNodes'), this);

			// close when focus shifts to another element outside popup

			input.on('blur', function()
			{
				Y.later(10, this, function()
				{
					if (!Y.DOM.contains(Y.Node.getDOMNode(box), document.activeElement))
					{
						this.hide();
					}
				});
			},
			this);
		});
	}
});

Y.InputPopup = InputPopup;
