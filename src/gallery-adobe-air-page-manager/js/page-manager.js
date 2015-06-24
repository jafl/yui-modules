"use strict";

Y.namespace('air');

/**
 * Implements simple page manager for Adobe AIR.  Page HTML is loaded from
 * the modules directory, and JavaScript is loaded using the module prefix
 * and the page name.
 *
 * This is a singleton because there should only be one page manager.
 *
 * @module gallery-adobe-air-page-manager
 */

var module_prefix,
	dom_containers,
	dom_root,
	use_layout,
	page_layout,
	page_map = {},
	current_page;

function show(page_name)
{
	if (current_page)
	{
		page_map[ current_page ].root.remove();
	}

	current_page = page_name;
	Y.one(dom_root).prepend(page_map[ current_page ].root);

	if (use_layout && !page_layout)
	{
		page_layout = new Y.PageLayout();
	}
	else if (use_layout)
	{
		page_layout.rescanBody();
	}

	page_map[ current_page ].prepare();
}

Y.air.PageManager =
{
	init: function(config)
	{
		module_prefix  = config.module_prefix;
		dom_containers = config.dom_containers;
		dom_root       = config.dom_root;
		use_layout     = config.use_layout;
	},

	getPageLayout: function()
	{
		return page_layout;
	},

	getCurrentPage: function()
	{
		return current_page;
	},

	show: function(page_name, callback)
	{
		Y.log('Showing ' + page_name, 'info', 'air-page-manager');

		if (page_map[ page_name ])
		{
			show(page_name);
			if (Y.Lang.isFunction(callback))
			{
				callback();
			}
			return;
		}

		var file = air.File.applicationDirectory.resolvePath('modules/' + page_name + '.html');
		if (!file.exists)
		{
			throw page_name + ' not found';
		}

		var stream = new air.FileStream();
		stream.open(file, air.FileMode.READ);
		var markup = stream.readUTFBytes(stream.bytesAvailable);
		stream.close();

		var c = Y.all(dom_containers);
		c.setStyle('visibility', 'hidden');		// avoid multiple redraws

		Y.use(module_prefix + page_name, function(Y)
		{
			var p = page_map[ page_name ];
			p.root.set('innerHTML', markup);
			air.Localizer.localizer.update();	// insert text into nodes
			p.init();
			p.root.remove();

			c.setStyle('visibility', '');

			show(page_name);

			if (Y.Lang.isFunction(callback))
			{
				callback();
			}
		});
	},

	registerPage: function(name, init, prepare)
	{
		page_map[ name ] =
		{
			init:    init,
			prepare: prepare,
			root:    Y.one('#' + name + '-page')
		};
	}
};
