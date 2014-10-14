YUI.add('gallery-collapse-toggle', function (Y, NAME) {

"use strict";

/**********************************************************************
 * Widget which allows collapsing a chunk of content, e.g., a form, down to
 * a much smaller summary.
 * 
 * @module gallery-collapse-toggle
 */

/**********************************************************************
 * Overrides Y.Node.show() to make it look like a flickering neon sign.
 * 
 * @main gallery-collapse-toggle
 * @class CollapseToggle
 * @extends Widget
 * @constructor
 * @param config {Object} configuration
 */
function CollapseToggle(
	/* object */ config)
{
	CollapseToggle.superclass.constructor.call(this, config);
}

CollapseToggle.NAME = "collapsetoggle";

CollapseToggle.ATTRS =
{
	/**
	 * State of the widget.
	 * 
	 * @attribute collapsed
	 * @type {Boolean}
	 */
	collapsed:
	{
		value:     false,
		validator: Y.Lang.isBoolean
	}
};

CollapseToggle.HTML_PARSER =
{
	summary: function(content_box)
	{
		return content_box.one('> .summary');
	},

	content: function(content_box)
	{
		return content_box.one('> .content');
	}
};

Y.extend(CollapseToggle, Y.Widget,
{
	renderUI: function()
	{
		this.get('contentBox').prepend('<div class="toggle"></div>');
	},

	bindUI: function()
	{
		this.get('contentBox').one('> .toggle').on('click', function()
		{
			this.set('collapsed', !this.get('collapsed'));
			this.syncUI();
		},
		this);
	},

	syncUI: function()
	{
		this.get('contentBox').replaceClass('collapsed|expanded', this.get('collapsed') ? 'collapsed' : 'expanded');
	}
});

Y.CollapseToggle = CollapseToggle;


}, '@VERSION@', {"skinnable": "true", "requires": ["widget"]});
