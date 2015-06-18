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
	dom_root,
	use_layout,
	page_layout,
	page_map = {},
	current_page;

function show(page_name)
{
	if (current_page)
	{
		current_page.root.remove();
	}

	current_page = page_map[ page_name ];
	Y.one(dom_root).prepend(current_page.root);

	if (use_layout && !page_layout)
	{
		page_layout = new Y.PageLayout();
	}
	else if (use_layout)
	{
		page_layout.rescanBody();
	}

	current_page.prepare();
}

Y.air.PageManager =
{
	init: function(
		/* string */		_module_prefix,
		/* string/node */	_dom_root,
		/* bool */			_use_layout)
	{
		module_prefix = _module_prefix;
		dom_root      = _dom_root;
		use_layout    = _use_layout;
	},

	getPageLayout: function()
	{
		return page_layout;
	},

	show: function(page_name)
	{
		Y.log('Showing ' + page_name, 'info', 'air-page-manager');

		if (page_map[ page_name ])
		{
			show(page_name);
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

		Y.use(module_prefix + page_name, function(Y)
		{
			var p = page_map[ page_name ];
			p.root.set('innerHTML', markup);
			air.Localizer.localizer.update();	// insert text into nodes
			p.init();
			p.root.remove();
			show(page_name);
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
