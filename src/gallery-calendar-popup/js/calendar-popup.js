/**********************************************************************
 * A popup tuned to contain a `Y.Calendar` instance attached to an input
 * field.
 *
 * @module gallery-calendar-popup
 * @main gallery-calendar-popup
 */

/**
 * <p>A popup tuned to contain a `Y.Calendar` instance attached to an input
 * field.</p>
 *
 * @class CalendarPopup
 * @extends Popup
 * @constructor
 */
var CalendarPopup = function(config)
{
	if (Y.Lang.isUndefined(config.align))
	{
		config.align =
		{
			node:   config.dateInput,
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
			node:      config.dateInput,
			eventName: 'focus'
		},
		{
			node:      config.dateInput,
			eventName: 'click'		// re-show after esc
		}
	];

	config.stayOpenOn =
	[
		{
			node:      config.dateInput,
			eventName: 'click'
		}
	];

	CalendarPopup.superclass.constructor.apply(this, arguments);
};

CalendarPopup.NAME = "calendarpopup";

CalendarPopup.ATTRS =
{
	/**
	 * Date input field to use.
	 * 
	 * @attribute dateInput
	 * @type {Node|String}
	 * @required
	 * @writeonce
	 */
	dateInput:
	{
		setter: function(n)
		{
			return Y.one(n) || Attribute.INVALID_VALUE;
		},
		writeOnce: true
	}
};

Y.extend(CalendarPopup, Y.Popup,
{
	initializer: function(config)
	{
		this.after('render', function()
		{
			var input = this.get('dateInput'),
				box   = this.get('boundingBox');

			// close after selecting a date

			Y.delegate('click', function()
			{
				this.hide();
				Y.later(1, input, input.focus);
			},
			box, '.yui3-calendar-grid tbody td', this);

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

Y.CalendarPopup = CalendarPopup;
