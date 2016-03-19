"use strict";

/**
 * @module gallery-layout-anywidget
 */

/**********************************************************************
 * <p>Plugin for any Y.Widget to make it fit inside a PageLayout module.
 * After you plug it in, it automatically detects the PageLayout module, so
 * you don't have to do anything.</p>
 * 
 * @main gallery-layout-anywidget
 * @class PageLayoutAnyWidgetModule
 * @namespace Plugin
 * @extends Plugin.Base
 * @constructor
 * @param config {Object} configuration
 */

function PLAWModule(
	/* object */ config)
{
	PLAWModule.superclass.constructor.call(this, config);
}

PLAWModule.NAME = "PageLayoutAnyWidgetModulePlugin";
PLAWModule.NS   = "layout";

PLAWModule.ATTRS =
{
	/**
	 * Instance of Y.PageLayout
	 * 
	 * @attribute layout
	 * @type {PageLayout}
	 * @required
	 * @writeonce
	 */
	layout:
	{
		value:     null,
		writeonce: true
	}
};

Y.extend(PLAWModule, Y.Plugin.Base,
{
	initializer: function(config)
	{
		this.afterHostMethod('render', function()
		{
			var widget = this.get('host'),
				layout = this.get('layout'),

				module_bd =
					widget.get('boundingBox')
						  .ancestor('.' + Y.PageLayout.module_body_class),

				scroll_top = 0;

			module_bd.generateID();

			module_bd.ancestor('.'+Y.PageLayout.page_body_class)
				.addClass(Y.PageLayout.force_fit_class);

			layout.on('afterResizeModule', function(e)
			{
				if (e.bd.get('id') == module_bd.get('id'))
				{
					widget.set('width', e.width);
					widget.set('height', e.height);
					module_bd.set('scrollTop', 0);
				}
			},
			this);
		});
	}
});

Y.namespace("Plugin");
Y.Plugin.PageLayoutAnyWidgetModule = PLAWModule;
