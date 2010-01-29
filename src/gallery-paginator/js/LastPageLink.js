/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
*/

/**
 * ui Component to generate the link to jump to the last page.
 *
 * @module gallery-paginator
 * @namespace Y.Paginator.ui
 * @class LastPageLink
 * @for Y.Paginator
 * @constructor
 * @param p {Pagintor} Paginator instance to attach to
 */
Paginator.ui.LastPageLink = function (p) {
    this.paginator = p;

    p.on('destroy',this.destroy,this);
    p.on('recordOffsetChange',this.update,this);
    p.on('rowsPerPageChange',this.update,this);
    p.on('totalRecordsChange',this.update,this);

	p.on('lastPageLinkClassChange', this.rebuild, this);
	p.on('lastPageLinkLabelChange', this.rebuild, this);
};

/**
 * Decorates Paginator instances with new attributes. Called during
 * Paginator instantiation.
 * @method init
 * @param paginator {Paginator} Paginator instance to decorate
 * @static
 */
Paginator.ui.LastPageLink.init = function (p) {

    /**
     * CSS class assigned to the link/span
     * @attribute lastPageLinkClass
     * @default 'yui-paginator-last'
     */
    p.addAttr('lastPageLinkClass', {
        value : Y.ClassNameManager.getClassName(Paginator.NAME, 'last'),
        validator : Y.Lang.isString
    });

    /**
     * Used as innerHTML for the last page link/span.
     * @attribute lastPageLinkLabel
     * @default 'last &gt;&gt;'
     */
    p.addAttr('lastPageLinkLabel', {
        value : 'last &gt;&gt;',
        validator : Y.Lang.isString
    });
};

Paginator.ui.LastPageLink.prototype = {

    /**
     * Currently placed HTMLElement node
     * @property current
     * @type HTMLElement
     * @private
     */
    current   : null,

    /**
     * Link HTMLElement node
     * @property link
     * @type HTMLElement
     * @private
     */
    link      : null,

    /**
     * Span node (inactive link)
     * @property span
     * @type HTMLElement
     * @private
     */
    span      : null,

    /**
     * Empty place holder node for when the last page link is inappropriate to
     * display in any form (unlimited paging).
     * @property na
     * @type HTMLElement
     * @private
     */
    na        : null,


    /**
     * Removes the link/span node and clears event listeners
     * @method destroy
     * @private
     */
    destroy : function () {
        this.link.remove(true);
        this.span.remove(true);
        this.na.remove(true);
        this.current = this.link = this.span = this.na = null;
    },

    /**
     * Generate the nodes and return the appropriate node given the current
     * pagination state.
     * @method render
     * @param id_base {string} used to create unique ids for generated nodes
     * @return {HTMLElement}
     */
    render : function (id_base) {
        var p     = this.paginator,
            c     = p.get('lastPageLinkClass'),
            label = p.get('lastPageLinkLabel'),
            last  = p.getTotalPages();

        this.link = Y.Node.create(
            '<a href="#" id="'+id_base+'-last-link">'+label+'</a>');
        this.link.set('className', c);
        this.link.on('click',this.onClick,this);

        this.span = Y.Node.create(
            '<span id="'+id_base+'-last-span">'+label+'</span>');
        this.span.set('className', c);

        this.na = Y.Node.create(
            '<span id="'+id_base+'-last-na"></span>');

        switch (last) {
            case Paginator.VALUE_UNLIMITED :
                this.current = this.na;
                break;

            case p.getCurrentPage() :
                this.current = this.span;
                break;

            default :
                this.current = this.link;
        }

        return this.current;
    },

    /**
     * Swap the link, span, and na nodes if appropriate.
     * @method update
     * @param e {CustomEvent} The calling change event (ignored)
     */
    update : function (e) {
        if (e && e.prevValue === e.newValue) {
            return;
        }

        var par   = this.current ? this.current.parentNode : null,
            after = this.link;

        if (par) {
            switch (this.paginator.getTotalPages()) {
                case Paginator.VALUE_UNLIMITED :
                    after = this.na;
                    break;

                case this.paginator.getCurrentPage() :
                    after = this.span;
                    break;
            }

            if (this.current !== after) {
                par.replaceChild(after,this.current);
                this.current = after;
            }
        }
    },

    /**
     * Rebuild the markup.
     * @method update
     * @param e {CustomEvent} The calling change event (ignored)
     */
    rebuild : function (e) {
        if (e && e.prevValue === e.newValue) {
            return;
        }

        var p     = this.paginator,
            c     = p.get('lastPageLinkClass'),
            label = p.get('lastPageLinkLabel');

        this.link.set('className', c);
        this.link.set('innerHTML', label);

        this.span.set('className', c);
        this.span.set('innerHTML', label);
    },

    /**
     * Listener for the link's onclick event.  Passes to setPage method.
     * @method onClick
     * @param e {DOMEvent} The click event
     */
    onClick : function (e) {
        e.halt();
        this.paginator.setPage(this.paginator.getTotalPages());
    }
};
