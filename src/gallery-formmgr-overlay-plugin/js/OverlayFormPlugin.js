"use strict";

/**
 * @module gallery-formmgr-overlay-plugin
 */

/**
 * A simple plugin for Y.Overlay which attaches a Y.FormManager to the
 * &lt;form&gt; inside the overlay.  Before the overlay is shown,
 * prepareForm() is called to insert the default values.  (If this returns
 * false, the overlay is not shown.)  After the overlay is shown, focus is
 * set to the first field.
 *
 * @main gallery-formmgr-overlay-plugin
 * @class OverlayForm
 * @namespace Plugin
 * @extends Plugin.Base
 */
function OverlayFormPlugin()
{
	OverlayFormPlugin.superclass.constructor.apply(this, arguments);
}

OverlayFormPlugin.NAME = "OverlayFormPlugin";
OverlayFormPlugin.NS   = "form";

OverlayFormPlugin.ATTRS =
{
	/**
	 * @attribute formmgr
	 * @type {Y.FormManager}
	 * @writeonce
	 */
	formmgr:
	{
		writeOnce: true
	},

	/**
	 * Configuration passed to Y.FormManager ctor.
	 *
	 * @attribute formmgrConfig
	 * @type {Object}
	 * @writeonce
	 */
	formmgrConfig:
	{
		writeOnce: true
	}
};

Y.extend(OverlayFormPlugin, Y.Plugin.Base,
{
	initializer: function(config)
	{
		if (!this.get('formmgr'))
		{
			var f = this.get('host').get('contentBox').one('form');
			if (!f.get('name'))
			{
				f.set('name', Y.guid('form-overlay-'));
			}
			this.set('formmgr', new Y.FormManager(f.get('name'), this.get('formmgrConfig')));
		}

		this.onHostEvent('visibleChange', function(e)
		{
			if (e.newVal &&		// visible
				!this.get('formmgr').prepareForm())
			{
				e.halt();
			}
		});

		this.afterHostEvent('visibleChange', function(e)
		{
			if (e.newVal)	// visible
			{
				this.get('formmgr').initFocus();
			}
			else			// hidden
			{
				this.get('formmgr').clearForm();
			}
		});
	}
});

Y.namespace("Plugin");
Y.Plugin.OverlayForm = OverlayFormPlugin;
