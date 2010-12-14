"use strict";

/**********************************************************************
 * Adds per-page error notification to Paginator.ui.PageLinks.
 */

var Dom = YAHOO.util.Dom,
	Event = YAHOO.util.Event,
	Paginator = YAHOO.widget.Paginator;

Paginator.ui.SATGValidationPageLinks = function(
	/* Paginator */	p)
{
	Paginator.ui.SATGValidationPageLinks.superclass.constructor.call(this, p);

    this.paginator.subscribe('pageStatusChange', this.rebuild, null, this);
};

var status_prefix = 'satg-has';

Paginator.ui.SATGValidationPageLinks.init = function(p)
{
	/**
	 * Array of status strings for each page.
	 * @attribute pageStatus
	 */
	p.setAttributeConfig('pageStatus',
	{
		value:     [],
		validator: YAHOO.lang.isArray
	});
};

YAHOO.lang.extend(Paginator.ui.SATGValidationPageLinks, Paginator.ui.PageLinks, 
{ 
	update: function(e)
	{
		if (e && e.prevValue === e.newValue)
		{
			return;
		}

		var currentPage	= this.paginator.getCurrentPage();

		var curr_markup = '<span class="{link} {curr} {status}">{label}</span>';
		var link_markup = '<a href="#" class="{link} {status}" page="{page}">{label}</a>';

		if (this.current !== currentPage || !currentPage || e.rebuild)
		{
			var linkClass    = this.paginator.get('pageLinkClass');
			var status       = this.paginator.get('pageStatus');
			var labelBuilder = this.paginator.get('pageLabelBuilder');

			var range =
				Paginator.ui.PageLinks.calculateRange(
					currentPage, this.paginator.getTotalPages(), this.paginator.get('pageLinks'));

			var content = '';
			for (var i=range[0]; i<=range[1]; i++)
			{
				content +=  YAHOO.lang.substitute(i === currentPage ? curr_markup : link_markup,
				{
					link:   linkClass,
					curr:   (i === currentPage ? this.paginator.get('currentPageClass') : ''),
					status: status[i-1] ? status_prefix + status[i-1] : '',
					page:   i,
					label:  labelBuilder(i, this.paginator)
				});
			}

			this.container.innerHTML = content;
		}
	}
	
});
