YUI.add('gallery-popup', function (Y, NAME) {

/**********************************************************************
 * A widget showing a temporary, "popup" overlay.
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
		}
	}
});


}, '@VERSION@', {"skinnable": "true", "requires": ["overlay", "widget-autohide", "event-outside", "gallery-funcprog"]});
