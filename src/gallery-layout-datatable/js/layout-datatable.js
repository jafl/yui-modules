"use strict";

/**
 * @module gallery-layout-datatable
 */

/**********************************************************************
 * <p>Plugin for scrolling DataTable to make it fit inside a PageLayout
 * module.  After you plug it in, it automatically detects the PageLayout
 * module, so you don't have to do anything.</p>
 * 
 * @main gallery-layout-datatable
 * @class PageLayoutDataTableModule
 * @namespace Plugin
 * @extends Plugin.Base
 * @constructor
 * @param config {Object} configuration
 */

function PLDTModule(
	/* object */ config)
{
	PLDTModule.superclass.constructor.call(this, config);
}

PLDTModule.NAME = "PageLayoutDataTableModulePlugin";
PLDTModule.NS   = "layout";

PLDTModule.ATTRS =
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

Y.extend(PLDTModule, Y.Plugin.Base,
{
	initializer: function(config)
	{
		this.afterHostMethod('render', function()
		{
			var table  = this.get('host'),
				layout = this.get('layout'),

				module_bd =
					table.get('boundingBox')
						 .ancestor('.' + Y.PageLayout.module_body_class),

				scroll_top = 0;

			module_bd.generateID();

			layout.on('beforeResizeModule', function(e)
			{
				if (e.bd.get('id') == module_bd.get('id'))
				{
					if (table._yScrollNode)
					{
						scroll_top = table._yScrollNode.get('scrollTop');
					}

					if (e.height == 'auto')
					{
						table.set('height', 'auto');
						table.set('scrollable', 'x');
					}
				}
			},
			this);

			layout.on('afterResizeModule', function(e)
			{
				if (e.bd.get('id') == module_bd.get('id'))
				{
					var w = e.width - (layout.single_module ? Y.DOM.getScrollbarWidth() : 0);
					table.set('width', w+'px');
					table.set('height', e.height+'px');
					table.set('scrollable', true);

					if (table._yScrollNode)
					{
						table._yScrollNode.set('scrollTop',
							this.ignore_scroll_top ? 0 : scroll_top);
					}
					this.ignore_scroll_top = false;
				}
			},
			this);

			table.on('dataChange', function()
			{
				layout.elementResized(table.get('contentBox'));
			});
		});
	},

	/**
	 * By default, the scroll position is restored after Y.PageLayout
	 * reflows the page.  In certain cases, e.g., switching to a different
	 * page of data, the scroll position should be reset instead.  Call
	 * this function to request that the scroll position be reset after the
	 * next layout reflow.
	 * 
	 * @method resetScroll
	 */
	resetScroll: function()
	{
		this.ignore_scroll_top = true;
	}
});

Y.namespace("Plugin");
Y.Plugin.PageLayoutDataTableModule = PLDTModule;
