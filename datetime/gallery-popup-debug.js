YUI.add('gallery-popup', function (Y, NAME) {

/**********************************************************************
 * Widgets for showing a temporary, "popup" overlay.
 *
 * @module gallery-popup
 * @main gallery-popup
 */

var visible_popup;

/**
 * <p>Popup provides an overlay which opens on a definable set of events,
 * closes on ESC or clicks outside the popup, and which can block the
 * overlay from closing based on a definable set of events which take
 * precendence over the default close events.</p>
 *
 * @class Popup
 * @extends Overlay
 * @uses WidgetAutohide
 * @constructor
 */
Y.Popup = Y.Base.create('popup', Y.Overlay, [Y.WidgetAutohide],
{
	initializer: function(config)
	{
		this.appendHideOn({ eventName: 'clickoutside' });

		Y.after(this._attachUIHandlesPopup, this, 'bindUI');

		if (this.get('reparentToBody'))
		{
			Y.after(function()
			{
				Y.one('body').append(this.get('boundingBox'));
			},
			this, 'renderUI');
		}

		this.after('showOnChange', this._resetUIHandlesPopup);
		this.after('stayOpenOnChange', this._resetUIHandlesPopup);

		this.on('visibleChange', function(e)
		{
			if (e.newVal)
			{
				if (visible_popup && visible_popup != this)
				{
					visible_popup.hide();
				}
				visible_popup = this;
			}
			else if (visible_popup == this)
			{
				visible_popup = null;
			}
		});
	},

	destructor: function()
	{
		this._detachUIHandlesPopup();
	},

	/**
	 * Add an additional event which should hide the popup.
	 * 
	 * @method appendHideOn
	 * @chainable
	 * @param o {Object} The event description (node, eventName, keyCode)
	 */
	appendHideOn: function(o)
	{
		var hide = this.get('hideOn');
		hide.push(o);
		this.set('hideOn', hide);
		return this;
	},

	_resetUIHandlesPopup: function()
	{
		this._detachUIHandlesPopup();
		this._attachUIHandlesPopup();
	},

	_attachUIHandlesPopup: function()
	{
		this._uiHandlesPopup = [].concat(

			Y.map(this.get('showOn'), function(o)
			{
				this._attachUIEventPopup(o, this.show);
			},
			this),

			Y.map(this.get('stayOpenOn'), function(o)
			{
				this._attachUIEventPopup(o, this._blockUIEventPopup);
			},
			this));
	},

	_attachUIEventPopup: function(o, f)
	{
		if (o.keyCode)
		{
			return Y.one(o.node).on(o.eventName, Y.bind(f, this), o.keyCode);
		}
		else
		{
			return Y.one(o.node).on(o.eventName, f, this);
		}
	},

	_detachUIHandlesPopup: function()
	{
		if (this._uiHandlesPopup)
		{
			Y.Array.invoke(this._uiHandlesPopup, 'detach');
			this._uiHandlesPopup = null;
		}
	},

	_blockUIEventPopup: function(e)
	{
		if (this.get('visible'))
		{
			e.halt();
		}
	}
},
{
	ATTRS:
	{
		/**
		 * List of { node, eventName, keyCode } describing the events that
		 * should trigger showing the popup.  `node` and `eventName` are
		 * required.
		 *
		 * @attribute showOn
		 * @type {Array}
		 */
		showOn:
		{
			validator: Y.Lang.isArray,
			value:     []
		},

		/**
		 * List of { node, eventName, keyCode } describing the events that
		 * should keep the popup open.  These block hideOn from being
		 * triggered.  `node` and `eventName` are required.
		 *
		 * @attribute stayOpenOn
		 * @type {Array}
		 */
		stayOpenOn:
		{
			validator: Y.Lang.isArray,
			value:     []
		},

		/**
		 * Set to `true` to reparent the popup to the body element.
		 *
		 * @attribute reparentToBody
		 * @type {Boolean}
		 * @default false
		 * @writeonce
		 */
		reparentToBody:
		{
			validator: Y.Lang.isBoolean,
			writeOnce: true,
			value:     false
		}
	}
});
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

	InputPopup.superclass.constructor.call(this, config);
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
InputPopup.CalendarNodes = '.yui3-calendar-grid .yui3-calendar-day';

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
			var input   = this.get('inputField'),
				bound   = this.get('boundingBox'),
				content = this.get('contentBox');

			// close after selecting a value

			Y.delegate('click', function()
			{
				input.focus();
				this.hide();
			},
			bound, this.get('clickNodes'), this);

			// close when focus shifts to another element outside popup

			content.set('tabIndex', 1);

			input.on('blur', function(e)
			{
				if (!e.relatedTarget ||
					!Y.DOM.contains(bound.getDOMNode(), e.relatedTarget.getDOMNode()))
				{
					this.hide();
				}
			},
			this);
		});
	},

	show: function()
	{
		if (!this.get('align'))
		{
			this.set('align',
			{
				node:   this.get('inputField'),
				points: [ Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL ]
			});

			this.set('preventOverlap', true);
		}

		InputPopup.superclass.show.apply(this, arguments);
	}
});

Y.InputPopup = InputPopup;


}, '@VERSION@', {
    "skinnable": "true",
    "requires": [
        "overlay",
        "widget-autohide",
        "event-outside",
        "gallery-funcprog",
        "array-invoke"
    ]
});
