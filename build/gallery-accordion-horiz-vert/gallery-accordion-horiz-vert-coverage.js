if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js",
    code: []
};
_yuitest_coverage["build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js"].code=["YUI.add('gallery-accordion-horiz-vert', function (Y, NAME) {","","\"use strict\";","","var use_nonzero_empty_div = (0 < Y.UA.ie && Y.UA.ie < 8),","	browser_can_animate = !(0 < Y.UA.ie && Y.UA.ie < 8),","	section_min_size = (use_nonzero_empty_div ? 1 : 0);","","/**********************************************************************"," * Widget to manage an accordion, either horizontally or vertically."," * Allows either multiple open sections or only a single open section."," * Provides option to always force at least one item to be open."," * "," * @module gallery-accordion-horiz-vert"," * @main gallery-accordion-horiz-vert"," */","","/**"," * <p>An accordion can be constructed from existing markup or from strings"," * containing HTML.  Existing markup can be provided either by setting"," * `contentBox` or by specifying CSS selectors.  See the `titles` and"," * `sections` attributes.</p>"," * "," * <p>When constructing from existing markup via `contentBox`, use an"," * unordered list (&lt;ul&gt;).  Each item must contain two &lt;div&gt;'s."," * The first one is used as the section title, and the second one is used"," * as the section content.</p>"," * "," * <p>Animation is optional.  If the anim module is not available,"," * animation is automatically turned off.</p>"," *"," * <p>When using a horizontal accordion:</p>"," * <ul>"," * <li>The widget's container must have a height.</li>"," * <li>Each title must have both a width and height.</li>"," * <li>Each section must have a width.</li>"," * </ul>"," * "," * <p>IE doesn't accept zero height divs, so we use 1px height and zero"," * opacity.  IE6 doesn't always render correctly with opacity set, so if"," * animation is turned off, we don't use opacity at all.</p>"," * "," * @class Accordion"," * @constructor"," * @param config {Object} Widget configuration"," */","function Accordion(config)","{","	config = config || {};","	if (Y.Lang.isUndefined(config.tabIndex))","	{","		config.tabIndex = null;","	}","	if (Y.Lang.isUndefined(config.horizontal))","	{","		config.horizontal = false;","	}","","	Accordion.superclass.constructor.call(this, config);","}","","function initAnimationFlag()","{","	return !Y.Lang.isUndefined(Y.Anim);","}","","function filterAnimationFlag(value)","{","	return (value && browser_can_animate && !Y.Lang.isUndefined(Y.Anim));","}","","Accordion.NAME = \"accordion\";","","Accordion.ATTRS =","{","	/**","	 * Whether or not the accordion is horizontal.","	 * ","	 * @attribute horizontal","	 * @type {boolean}","	 * @default false","	 * @writeonce","	 */","	horizontal:","	{","		value:     false,","		writeOnce: true","	},","","	/**","	 * A CSS selector for locating nodes, an array of nodes, or an array","	 * of strings containing markup.  This is used to define the initial","	 * set of section titles.","	 * ","	 * @attribute titles","	 * @type {String|Array}","	 * @writeonce","	 */","	titles:","	{","		writeOnce: true","	},","","	/**","	 * Whether or not to replace the default title container node, when the","	 * supplied title is a node.  (If the supplied title is markup, it is","	 * always inserted inside the default title container.)","	 * ","	 * @attribute replaceTitleContainer","	 * @type {boolean}","	 * @default true","	 */","	replaceTitleContainer:","	{","		value:     true,","		validator: Y.Lang.isBoolean","	},","","	/**","	 * A CSS selector for locating nodes, an array of nodes, or an array","	 * of strings containing markup.  This is used to define the initial","	 * set of section contents.","	 * ","	 * @attribute sections","	 * @type {String|Array}","	 * @writeonce","	 */","	sections:","	{","		writeOnce: true","	},","","	/**","	 * Whether or not to replace the default section container node, when","	 * the supplied title is a node.  (If the supplied content is markup,","	 * it is always inserted inside the default section container.)","	 * ","	 * @attribute replaceSectionContainer","	 * @type {boolean}","	 * @default true","	 */","	replaceSectionContainer:","	{","		value:     true,","		validator: Y.Lang.isBoolean","	},","","	/**","	 * Whether or not to allow all sections to be closed at the same time.","	 * If not, at least one section will always be open.","	 * ","	 * @attribute allowAllClosed","	 * @type {boolean}","	 * @default false","	 */","	allowAllClosed:","	{","		value:     false,","		validator: Y.Lang.isBoolean,","		setter: function(value)","		{","			// save internally so it can be modified without recursion","			this.allow_all_closed = value;","			return value;","		}","	},","","	/**","	 * Whether or not to allow multiple sections to be open at the same","	 * time.  If not, at most one section at a time will be open.","	 * ","	 * @attribute allowMultipleOpen","	 * @type {boolean}","	 * @default false","	 */","	allowMultipleOpen:","	{","		value:     false,","		validator: Y.Lang.isBoolean","	},","","	/**","	 * Whether or not to animate the initial rendering of the widget.","	 * ","	 * @attribute animateRender","	 * @type {boolean}","	 * @default false","	 */","	animateRender:","	{","		value:     false,","		writeOnce: true,","		validator: Y.Lang.isBoolean,","		setter:    filterAnimationFlag","	},","","	/**","	 * Whether or not to animate insertion and removal of sections.","	 * ","	 * @attribute animateInsertRemove","	 * @type {boolean}","	 * @default true","	 */","	animateInsertRemove:","	{","		valueFn:   initAnimationFlag,","		validator: Y.Lang.isBoolean,","		setter:    filterAnimationFlag","	},","","	/**","	 * Whether or not to animate opening and closing of sections.","	 * ","	 * @attribute animateOpenClose","	 * @type {boolean}","	 * @default true","	 */","	animateOpenClose:","	{","		valueFn:   initAnimationFlag,","		validator: Y.Lang.isBoolean,","		setter:    filterAnimationFlag","	},","","	/**","	 * Duration of all animations.","	 * ","	 * @attribute animateDuration","	 * @type {int}","	 * @default whatever Y.Anim default is","	 */","	animateDuration:","	{","		value:     null,		// accept Y.Anim default","		validator: function(value)","		{","			return (value === null || Y.Lang.isNumber(value));","		}","	},","","	/**","	 * Easing applied to all animations.","	 * ","	 * @attribute animateEasing","	 * @type {function}","	 * @default whatever Y.Anim default is","	 */","	animateEasing:","	{","		value:     null,		// accept Y.Anim default","		validator: function(value)","		{","			return (value === null || Y.Lang.isFunction(value));","		}","	}","};","","Accordion.HTML_PARSER =","{","	titles: function(content_box)","	{","		return content_box.all('> li > div:nth-child(1)');","	},","","	sections: function(content_box)","	{","		return content_box.all('> li > div:nth-child(2)');","	}","};","","/**"," * @event beforeInsert"," * @description Fires before a section is inserted."," * @param index {int} the insertion index"," */","/**"," * @event insert"," * @description Fires after a section is inserted."," * @param index {int} the insertion index"," * @param size {int} the final size of the section title, after animation (if any)"," */","","/**"," * @event beforeRemove"," * @description Fires before a section is removed."," * @param index {int} the section index"," */","/**"," * @event remove"," * @description Fires after a section is removed."," * @param index {int} the section index"," */","","/**"," * @event beforeOpen"," * @description Fires before a section is opened."," * @param index {int} the section index"," */","/**"," * @event open"," * @description Fires after a section is opened."," * @param index {int} the section index"," */","","/**"," * @event beforeClose"," * @description Fires before a section is closed."," * @param index {int} the section index"," */","/**"," * @event close"," * @description Fires after a section is closed."," * @param index {int} the section index"," */","","var open_class   = Y.ClassNameManager.getClassName(Accordion.NAME, 'open');","var closed_class = Y.ClassNameManager.getClassName(Accordion.NAME, 'closed');","","function cleanContainer(","	/* Node */	el)","{","	Y.Event.purgeElement(el, true);","","	while (el.hasChildNodes())","	{","		el.removeChild(el.get('lastChild'));","	}","}","","Y.extend(Accordion, Y.Widget,","{","	initializer: function(config)","	{","		this.section_list = [];","","		this.get('allowAllClosed');	// force init of this.allow_all_closed","","		if (this.get('horizontal'))","		{","			this.slide_style_name = 'width';","			this.slide_size_name  = 'offsetWidth';","			this.fixed_style_name = 'height';","			this.fixed_size_name  = 'offsetHeight';","		}","		else	// vertical","		{","			this.slide_style_name = 'height';","			this.slide_size_name  = 'offsetHeight';","			this.fixed_style_name = 'width';","			this.fixed_size_name  = 'offsetWidth';","		}","","		this.after('allowMultipleOpenChange', function(e)","		{","			if (this.section_list && this.section_list.length > 0 &&","				!e.newVal)","			{","				this.closeAllSections();","			}","		});","","		this.after('allowAllClosedChange', function(e)","		{","			if (this.section_list && this.section_list.length > 0 &&","				!e.newVal && this.allSectionsClosed())","			{","				this.toggleSection(0);","			}","		});","	},","","	renderUI: function()","	{","		this.get('boundingBox').addClass(","			this.getClassName(this.get('horizontal') ? 'horiz' : 'vert'));","","		var titles = this.get('titles');","		if (Y.Lang.isString(titles))","		{","			titles = Y.all(titles);","		}","","		var sections = this.get('sections');","		if (Y.Lang.isString(sections))","		{","			sections = Y.all(sections);","		}","","		if (titles instanceof Y.NodeList && sections instanceof Y.NodeList &&","			titles.size() == sections.size())","		{","			var save_animate_insert = this.get('animateInsertRemove');","			this.set('animateInsertRemove', this.get('animateRender'));","","			var count = titles.size();","			for (var i=0; i<count; i++)","			{","				this.appendSection(titles.item(i), sections.item(i));","			}","","			this.set('animateInsertRemove', save_animate_insert);","		}","		else if (titles instanceof Array && sections instanceof Array &&","				 titles.length == sections.length)","		{","			var save_animate_insert = this.get('animateInsertRemove');","			this.set('animateInsertRemove', this.get('animateRender'));","","			var count = titles.length;","			for (var i=0; i<count; i++)","			{","				this.appendSection(titles[i], sections[i]);","			}","","			this.set('animateInsertRemove', save_animate_insert);","		}","		else","		{","		}","","		this.get('contentBox').all('> li').remove(true);","	},","","	/**","	 * @method getSectionCount","	 * @return {int} total number of sections","	 */","	getSectionCount: function()","	{","		return this.section_list.length;","	},","","	/**","	 * @method getTitle","	 * @param index {int} the section index","	 * @return {Node} the container for the section title","	 */","	getTitle: function(","		/* int */	index)","	{","		return this.section_list[index].title;","	},","","	/**","	 * Sets the contents of the specified section title.","	 * ","	 * @method setTitle","	 * @param index {int} the section index","	 * @param title {String|Node} the title content","	 */","	setTitle: function(","		/* int */			index,","		/* string/object */	title)","	{","		var t = this.section_list[index].title;","		cleanContainer(t);","","		var el;","		if (Y.Lang.isString(title))","		{","			var el = Y.one(title);","			if (!el)","			{","				t.set('innerHTML', title);","			}","		}","		else","		{","			el = title;","		}","","		if (el && this.get('replaceTitleContainer'))","		{","			var p = t.get('parentNode');","			var n = t.get('nextSibling');","			p.removeChild(t);","			if (n)","			{","				p.insertBefore(el, n);","			}","			else","			{","				p.appendChild(el);","			}","","			this.section_list[index].title = el;","","			el.addClass(this.getClassName('title'));","			el.addClass(this.section_list[index].open ? open_class : closed_class);","		}","		else if (el)","		{","			t.appendChild(el);","		}","","		if (use_nonzero_empty_div)","		{","			t.setStyle('display', t.get('innerHTML') ? '' : 'none');","		}","	},","","	/**","	 * @method getSection","	 * @param index {int} the section index","	 * @return {Node} the container for the section content","	 */","	getSection: function(","		/* int */	index)","	{","		return this.section_list[index].content;","	},","","	/**","	 * Sets the contents of the specified section.","	 * ","	 * @method setSection","	 * @param index {int} the section index","	 * @param content {String|Node} the section content","	 */","	setSection: function(","		/* int */			index,","		/* string/object */	content)","	{","		var d = this.section_list[index].content;","		cleanContainer(d);","","		var el;","		if (Y.Lang.isString(content))","		{","			var el = Y.one(content);","			if (!el)","			{","				d.set('innerHTML', content);","			}","		}","		else","		{","			el = content;","		}","","		if (el && this.get('replaceSectionContainer'))","		{","			var display = d.getStyle('display');","","			var p = d.get('parentNode');","			var n = d.get('nextSibling');","			p.removeChild(d);","			if (n)","			{","				p.insertBefore(el, n);","			}","			else","			{","				p.appendChild(el);","			}","","			this.section_list[index].content = el;","","			el.addClass(this.getClassName('section'));","			el.addClass(this.section_list[index].open ? open_class : closed_class);","			el.setStyle('display', display);","		}","		else if (el)","		{","			d.appendChild(el);","		}","	},","","	/**","	 * @method _getClip","	 * @protected","	 * @param index {int} the section index","	 * @return {Node} the clipping container for the section content","	 */","	_getClip: function(","		/* int */	index)","	{","		return this.section_list[index].clip;","	},","","	/**","	 * Prepends the section to the accordion.","	 * ","	 * @method prependSection","	 * @param title {String|Node} the section title content","	 * @param content {String|Node} the section content","	 */","	prependSection: function(","		/* string/object */	title,","		/* string/object */	content)","	{","		return this.insertSection(0, title, content);","	},","","	/**","	 * Appends the section to the accordion.","	 * ","	 * @method appendSection","	 * @param title {String|Node} the section title content","	 * @param content {String|Node} the section content","	 */","	appendSection: function(","		/* string/object */	title,","		/* string/object */	content)","	{","		return this.insertSection(this.section_list.length, title, content);","	},","","	/**","	 * Inserts the section into the accordion at the specified location.","	 * ","	 * @method insertSection","	 * @param index {int} the insertion index","	 * @param title {String|Node} the section title content","	 * @param content {String|Node} the section content","	 */","	insertSection: function(","		/* int */			index,","		/* string/object */	title,","		/* string/object */ content)","	{","		this.fire('beforeInsert', index);","","		// create title","","		var t = Y.Node.create('<div/>');","		t.addClass(this.getClassName('title'));","		t.addClass(closed_class);","","		// create content clipping","","		var c = Y.Node.create('<div/>');","		c.addClass(this.getClassName('section-clip'));","		c.setStyle(this.slide_style_name, section_min_size+'px');","		if (this.get('animateOpenClose'))","		{","			c.setStyle('opacity', 0);","		}","","		// create content","","		var d = Y.Node.create('<div/>');","		d.addClass(this.getClassName('section'));","		d.addClass(closed_class);","		d.setStyle('display', 'none');","		c.appendChild(d);","","		// save in our list","","		this.section_list.splice(index, 0,","		{","			title:   t,","			clip:    c,","			content: d,","			open:    false,","			anim:    null","		});","","		// insert and show title","","		if (index < this.section_list.length-1)","		{","			this.get('contentBox').insertBefore(t, this.section_list[index+1].title);","		}","		else","		{","			this.get('contentBox').appendChild(t);","		}","","		this.setTitle(index, title);","		t = this.section_list[index].title;","","		var size = t.get(this.slide_size_name);","		if (this.get('animateInsertRemove'))","		{","			t.setStyle(this.slide_style_name, section_min_size+'px');","","			var params =","			{","				node: t,","				from:","				{","					opacity: 0","				},","				to:","				{","					opacity: 1","				}","			};","","			params.to[ this.slide_style_name ] = size;","","			var anim = this._createAnimator(params);","","			anim.on('end', function(type, index)","			{	","				this.section_list[index].title.setStyle(this.slide_style_name, 'auto');","			},","			this, index);","","			anim.run();","		}","","		// insert content container","","		if (content)","		{","			this.setSection(index, content);","			d = this.section_list[index].content;","		}","","		if (index < this.section_list.length-1)","		{","			this.get('contentBox').insertBefore(c, this.section_list[index+1].title);","		}","		else","		{","			this.get('contentBox').appendChild(c);","		}","","		// post processing","","		this.fire('insert', index, size);","","		if (!this.allow_all_closed && this.allSectionsClosed())","		{","			this.toggleSection(0);","		}","","		// return containers for futher manipulation","","		return { title: t, content: d };","	},","","	/**","	 * Removes the specified section.","	 * ","	 * @method removeSection","	 * @param index {int} the section index","	 */","	removeSection: function(","		/* int */	index)","	{","		this.fire('beforeRemove', index);","","		function onCompleteRemoveSection(type, args)","		{","			args[0].removeChild(args[1]);","			args[0].removeChild(args[2]);","","			if (args[3])","			{","				this.fire('remove', index);","			}","		}","","		var onCompleteArgs =","		[","			this.get('contentBox'),","			this.section_list[index].title,","			this.section_list[index].clip,","			true","		];","","		if (this.get('animateInsertRemove'))","		{","			var params =","			{","				node: this.section_list[index].clip,","				from:","				{","					opacity: 1","				},","				to:","				{","					opacity: 0","				}","			};","","			params.to[ this.slide_style_name ] = section_min_size;","","			if (this.section_list[index].open)","			{","				this._startAnimator(index, params);","			}","","			params.node = this.section_list[index].title;","			var anim    = this._createAnimator(params);","			anim.on('end', onCompleteRemoveSection, this, onCompleteArgs);","			anim.run();","		}","		else","		{","			onCompleteArgs[3] = false;","			onCompleteRemoveSection.call(this, null, onCompleteArgs);","		}","","		this.section_list.splice(index, 1);","","		if (!onCompleteArgs[3])","		{","			this.fire('remove', index);","		}","","		if (!this.allow_all_closed && this.allSectionsClosed())","		{","			this.toggleSection(0);","		}","	},","","	/**","	 * @method findSection","	 * @param {String|Node} any element inside the section or title","	 * @return {int} the index of the containing section, or -1 if not found","	 */","	findSection: function(","		/* string|element */	el)","	{","		el = Y.Node.getDOMNode(Y.one(el));","","		var count = this.section_list.length;","		for (var i=0; i<count; i++)","		{","			var title   = Y.Node.getDOMNode(this.section_list[i].title);","			var content = Y.Node.getDOMNode(this.section_list[i].content);","			if (el == title   || Y.DOM.contains(title, el) ||","				el == content || Y.DOM.contains(content, el))","			{","				return i;","			}","		}","","		return -1;","	},","","	/**","	 * @method isSectionOpen","	 * @return {boolean} <code>true</code> if the section is open","	 */","	isSectionOpen: function(","		/* int */	index)","	{","		return this.section_list[index].open;","	},","","	/**","	 * Open the specified section.","	 * ","	 * @method openSection","	 * @param index {int} the section index","	 */","	openSection: function(","		/* int */	index)","	{","		if (!this.section_list[index].open)","		{","			this.toggleSection(index);","		}","	},","","	/**","	 * Close the specified section.","	 * ","	 * @method closeSection","	 * @param index {int} the section index","	 */","	closeSection: function(","		/* int */	index)","	{","		if (this.section_list[index].open)","		{","			this.toggleSection(index);","		}","	},","","	/**","	 * @method allSectionsOpen","	 * @return {boolean} <code>true</code> if all sections are open","	 */","	allSectionsOpen: function()","	{","		var count = this.section_list.length;","		for (var i=0; i<count; i++)","		{","			if (!this.section_list[i].open)","			{","				return false;","			}","		}","","		return true;","	},","","	/**","	 * @method allSectionsClosed","	 * @return {boolean} <code>true</code> if all sections are closed","	 */","	allSectionsClosed: function()","	{","		var count = this.section_list.length;","		for (var i=0; i<count; i++)","		{","			if (this.section_list[i].open)","			{","				return false;","			}","		}","","		return true;","	},","","	/**","	 * Show/hide the section content.","	 * ","	 * @method toggleSection","	 * @param index {int} the section index","	 */","	toggleSection: function(","		/* int */	index)","	{","		if (!this.section_list[index].open && !this.get('allowMultipleOpen'))","		{","			var save              = this.allow_all_closed;","			this.allow_all_closed = true;","			this.closeAllSections();","			this.allow_all_closed = save;","		}","		else if (this.section_list[index].open && !this.allow_all_closed)","		{","			this.section_list[index].open = false;","			if (this.allSectionsClosed())","			{","				this.section_list[index].open = true;","				return;","			}","			this.section_list[index].open = true;","		}","","		function onCompleteOpenSection(type, index)","		{","			this.section_list[index].clip.setStyle(this.slide_style_name, 'auto');","			this.fire('open', index);","		}","","		function onCompleteCloseSection(type, index)","		{","			this.section_list[index].content.setStyle('display', 'none');","			this.fire('close', index);","		}","","		if (!this.section_list[index].open)","		{","			this.section_list[index].content.setStyle('display', 'block');","","			this.fire('beforeOpen', index);","","			this.section_list[index].open = true;","			this.section_list[index].title.replaceClass(closed_class, open_class);","			this.section_list[index].content.replaceClass(closed_class, open_class);","","			var size = this.section_list[index].content.get(this.slide_size_name);","			if (this.get('animateOpenClose'))","			{","				var params =","				{","					node: this.section_list[index].clip,","					from:","					{","						opacity: 0","					},","					to:","					{","						opacity: 1","					}","				};","","				params.to[ this.slide_style_name ] = size;","","				var anim = this._startAnimator(index, params);","				anim.on('end', onCompleteOpenSection, this, index);","			}","			else","			{","				var clip = this.section_list[index].clip;","				if (clip.getStyle('opacity') == '0')","				{","					clip.setStyle('opacity', 1);","				}","				onCompleteOpenSection.call(this, null, index);","			}","		}","		else","		{","			this.fire('beforeClose', index);","","			this.section_list[index].open = false;","			this.section_list[index].title.replaceClass(open_class, closed_class);","			this.section_list[index].content.replaceClass(open_class, closed_class);","","			if (this.get('animateOpenClose'))","			{","				var params =","				{","					node: this.section_list[index].clip,","					from:","					{","						opacity: 1","					},","					to:","					{","						opacity: 0","					}","				};","","				params.to[ this.slide_style_name ] = section_min_size;","","				var anim = this._startAnimator(index, params);","				anim.on('end', onCompleteCloseSection, this, index);","			}","			else","			{","				this.section_list[index].clip.setStyle(this.slide_style_name, section_min_size+'px');","				onCompleteCloseSection.call(this, null, index);","			}","		}","	},","","	/**","	 * Open all sections, if possible.","	 * ","	 * @method openAllSections","	 */","	openAllSections: function()","	{","		if (this.get('allowMultipleOpen'))","		{","			var count = this.section_list.length;","			for (var i=0; i<count; i++)","			{","				if (!this.section_list[i].open)","				{","					this.toggleSection(i);","				}","			}","		}","	},","","	/**","	 * Close all sections, if possible.","	 * ","	 * @method closeAllSections","	 */","	closeAllSections: function()","	{","		var count = this.section_list.length;","		var first = true;","		for (var i=0; i<count; i++)","		{","			if (this.section_list[i].open)","			{","				if (!this.allow_all_closed && first)","				{","					first = false;","				}","				else","				{","					this.toggleSection(i);","				}","			}","		}","","		if (!this.allow_all_closed && first)","		{","			this.toggleSection(0);","		}","	},","","	// create an animator with our configured duration and easing","","	_createAnimator: function(","		/* object */	params)","	{","		var duration = this.get('animateDuration');","		if (duration !== null)","		{","			params.duration = duration;","		}","","		var easing = this.get('animateEasing');","		if (easing !== null)","		{","			params.easing = easing;","		}","","		return new Y.Anim(params);","	},","","	// Register the animator for a section and start it.","","	_startAnimator: function(","		/* int */		index,","		/* object */	params)","	{","		var anim = this.section_list[index].anim;","		if (anim)","		{","			anim.stop(true);","		}","","		this.section_list[index].anim = anim = this._createAnimator(params);","","		anim.on('end', function(type, index, anim)","		{","			if (index < this.section_list.length &&","				this.section_list[ index ].anim == anim)","			{","				this.section_list[ index ].anim = null;","			}","		},","		this, index, anim);","","		anim.run();","","		return anim;","	}","});","","Y.Accordion = Accordion;","/**"," * @module gallery-accordion-horiz-vert"," */","","/**********************************************************************"," * <p>Plugin for Y.Accordion that detects that the widget has a fixed size"," * in the relevant dimension (width or height) and adjusts the open"," * sections to fit.</p>"," * "," * <p>If/when the widget is given a fixed size, all animations are turned"," * off.</p>"," * "," * @class FixedSizeAccordion"," * @namespace Plugin"," * @constructor"," */","function FixedSizeAccordionPlugin()","{","	FixedSizeAccordionPlugin.superclass.constructor.apply(this, arguments);","}","","FixedSizeAccordionPlugin.NAME = \"FixedSizeAccordionPlugin\";","FixedSizeAccordionPlugin.NS   = \"fixedsize\";","","FixedSizeAccordionPlugin.ATTRS =","{","};","","var animation_attrs =","[","	'animateRender',","	'animateInsertRemove',","	'animateOpenClose'","];","","var total_size =","{","	width:  'totalWidth',","	height: 'totalHeight'","};","","var overflow =","{","	width:  'overflowX',","	height: 'overflowY'","};","","var surrounding =","{","	width:  'horizMarginBorderPadding',","	height: 'vertMarginBorderPadding'","};","","function off(","	/* string */	name)","{","	this.set(name, false);","	this.modifyAttr(name, { readOnly: true });","}","","function adjust()","{","	var host = this.get('host');","	if (!this.init_fixed_size)","	{","		Y.Array.each(animation_attrs, off, host);","","		if (!host.get('rendered'))","		{","			this.afterHostEvent('render', adjust, this);","		}","","		this.onHostEvent('insert', function()","		{","			Y.later(1, this, adjust);	// may be modified after insertion","		},","		this);","","		this.onHostEvent('remove', adjust, this);","		this.onHostEvent('open', adjust, this);","		this.onHostEvent('close', adjust, this);","","		this.init_fixed_size = true;","	}","","	var dim   = host.slide_style_name;","	var total = host.get('boundingBox').parseDimensionStyle(dim);","	var count = host.getSectionCount();","	var open  = [];","	for (var i=0; i<count; i++)","	{","		total -= host.getTitle(i)[ total_size[dim] ]();","		if (host.isSectionOpen(i))","		{","			open.push(i);","		}","	}","","	count     = open.length;","	var size  = Math.floor(total / count);","	var extra = total % count;","	for (i=0; i<count; i++)","	{","		var section = host.getSection(open[i]);","		var size1   = size - section[ surrounding[dim] ]();","		if (i === count-1)","		{","			size1 += extra;","		}","","		section.setStyle(dim, size1+'px');","		section.setStyle(overflow[dim], 'auto');","	}","}","","Y.extend(FixedSizeAccordionPlugin, Y.Plugin.Base,","{","	initializer: function(config)","	{","		var host = this.get('host');","		var dim  = host.slide_style_name;","","		this.init_fixed_size = false;","		if (host.get(dim))","		{","			adjust.call(this);","		}","","		this.afterHostEvent(dim+'Change', function()","		{","			Y.later(1, this, adjust);","		},","		this);","	}","});","","Y.namespace(\"Plugin\");","Y.Plugin.FixedSizeAccordion = FixedSizeAccordionPlugin;","","","}, '@VERSION@', {","    \"skinnable\": \"true\",","    \"requires\": [","        \"widget\",","        \"selector-css3\",","        \"plugin\",","        \"gallery-dimensions\"","    ],","    \"optional\": [","        \"anim-base\"","    ]","});"];
_yuitest_coverage["build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js"].lines = {"1":0,"3":0,"5":0,"47":0,"49":0,"50":0,"52":0,"54":0,"56":0,"59":0,"62":0,"64":0,"67":0,"69":0,"72":0,"74":0,"163":0,"164":0,"237":0,"253":0,"258":0,"262":0,"267":0,"316":0,"317":0,"319":0,"322":0,"324":0,"326":0,"330":0,"334":0,"336":0,"338":0,"340":0,"341":0,"342":0,"343":0,"347":0,"348":0,"349":0,"350":0,"353":0,"355":0,"358":0,"362":0,"364":0,"367":0,"374":0,"377":0,"378":0,"380":0,"383":0,"384":0,"386":0,"389":0,"392":0,"393":0,"395":0,"396":0,"398":0,"401":0,"403":0,"406":0,"407":0,"409":0,"410":0,"412":0,"415":0,"421":0,"430":0,"441":0,"455":0,"456":0,"458":0,"459":0,"461":0,"462":0,"464":0,"469":0,"472":0,"474":0,"475":0,"476":0,"477":0,"479":0,"483":0,"486":0,"488":0,"489":0,"491":0,"493":0,"496":0,"498":0,"510":0,"524":0,"525":0,"527":0,"528":0,"530":0,"531":0,"533":0,"538":0,"541":0,"543":0,"545":0,"546":0,"547":0,"548":0,"550":0,"554":0,"557":0,"559":0,"560":0,"561":0,"563":0,"565":0,"578":0,"592":0,"606":0,"622":0,"626":0,"627":0,"628":0,"632":0,"633":0,"634":0,"635":0,"637":0,"642":0,"643":0,"644":0,"645":0,"646":0,"650":0,"661":0,"663":0,"667":0,"670":0,"671":0,"673":0,"674":0,"676":0,"678":0,"691":0,"693":0,"695":0,"697":0,"701":0,"706":0,"708":0,"709":0,"712":0,"714":0,"718":0,"723":0,"725":0,"727":0,"732":0,"744":0,"746":0,"748":0,"749":0,"751":0,"753":0,"757":0,"765":0,"767":0,"780":0,"782":0,"784":0,"787":0,"788":0,"789":0,"790":0,"794":0,"795":0,"798":0,"800":0,"802":0,"805":0,"807":0,"819":0,"821":0,"822":0,"824":0,"825":0,"826":0,"829":0,"833":0,"843":0,"855":0,"857":0,"870":0,"872":0,"882":0,"883":0,"885":0,"887":0,"891":0,"900":0,"901":0,"903":0,"905":0,"909":0,"921":0,"923":0,"924":0,"925":0,"926":0,"928":0,"930":0,"931":0,"933":0,"934":0,"936":0,"939":0,"941":0,"942":0,"945":0,"947":0,"948":0,"951":0,"953":0,"955":0,"957":0,"958":0,"959":0,"961":0,"962":0,"964":0,"977":0,"979":0,"980":0,"984":0,"985":0,"987":0,"989":0,"994":0,"996":0,"997":0,"998":0,"1000":0,"1002":0,"1015":0,"1017":0,"1018":0,"1022":0,"1023":0,"1035":0,"1037":0,"1038":0,"1040":0,"1042":0,"1055":0,"1056":0,"1057":0,"1059":0,"1061":0,"1063":0,"1067":0,"1072":0,"1074":0,"1083":0,"1084":0,"1086":0,"1089":0,"1090":0,"1092":0,"1095":0,"1104":0,"1105":0,"1107":0,"1110":0,"1112":0,"1114":0,"1117":0,"1122":0,"1124":0,"1128":0,"1145":0,"1147":0,"1150":0,"1151":0,"1153":0,"1157":0,"1164":0,"1170":0,"1176":0,"1182":0,"1185":0,"1186":0,"1189":0,"1191":0,"1192":0,"1194":0,"1196":0,"1198":0,"1201":0,"1203":0,"1207":0,"1208":0,"1209":0,"1211":0,"1214":0,"1215":0,"1216":0,"1217":0,"1218":0,"1220":0,"1221":0,"1223":0,"1227":0,"1228":0,"1229":0,"1230":0,"1232":0,"1233":0,"1234":0,"1236":0,"1239":0,"1240":0,"1244":0,"1248":0,"1249":0,"1251":0,"1252":0,"1254":0,"1257":0,"1259":0,"1265":0,"1266":0};
_yuitest_coverage["build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js"].functions = {"Accordion:47":0,"initAnimationFlag:62":0,"filterAnimationFlag:67":0,"setter:160":0,"validator:235":0,"validator:251":0,"titles:260":0,"sections:265":0,"cleanContainer:319":0,"(anonymous 2):353":0,"(anonymous 3):362":0,"initializer:332":0,"renderUI:372":0,"getSectionCount:428":0,"getTitle:438":0,"setTitle:451":0,"getSection:507":0,"setSection:520":0,"_getClip:575":0,"prependSection:588":0,"appendSection:602":0,"(anonymous 4):695":0,"insertSection:617":0,"onCompleteRemoveSection:746":0,"removeSection:741":0,"findSection:816":0,"isSectionOpen:840":0,"openSection:852":0,"closeSection:867":0,"allSectionsOpen:880":0,"allSectionsClosed:898":0,"onCompleteOpenSection:939":0,"onCompleteCloseSection:945":0,"toggleSection:918":0,"openAllSections:1033":0,"closeAllSections:1053":0,"_createAnimator:1080":0,"(anonymous 5):1112":0,"_startAnimator:1100":0,"FixedSizeAccordionPlugin:1145":0,"off:1182":0,"(anonymous 6):1201":0,"adjust:1189":0,"(anonymous 7):1257":0,"initializer:1246":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js"].coveredLines = 331;
_yuitest_coverage["build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js"].coveredFunctions = 46;
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1);
YUI.add('gallery-accordion-horiz-vert', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 3);
"use strict";

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 5);
var use_nonzero_empty_div = (0 < Y.UA.ie && Y.UA.ie < 8),
	browser_can_animate = !(0 < Y.UA.ie && Y.UA.ie < 8),
	section_min_size = (use_nonzero_empty_div ? 1 : 0);

/**********************************************************************
 * Widget to manage an accordion, either horizontally or vertically.
 * Allows either multiple open sections or only a single open section.
 * Provides option to always force at least one item to be open.
 * 
 * @module gallery-accordion-horiz-vert
 * @main gallery-accordion-horiz-vert
 */

/**
 * <p>An accordion can be constructed from existing markup or from strings
 * containing HTML.  Existing markup can be provided either by setting
 * `contentBox` or by specifying CSS selectors.  See the `titles` and
 * `sections` attributes.</p>
 * 
 * <p>When constructing from existing markup via `contentBox`, use an
 * unordered list (&lt;ul&gt;).  Each item must contain two &lt;div&gt;'s.
 * The first one is used as the section title, and the second one is used
 * as the section content.</p>
 * 
 * <p>Animation is optional.  If the anim module is not available,
 * animation is automatically turned off.</p>
 *
 * <p>When using a horizontal accordion:</p>
 * <ul>
 * <li>The widget's container must have a height.</li>
 * <li>Each title must have both a width and height.</li>
 * <li>Each section must have a width.</li>
 * </ul>
 * 
 * <p>IE doesn't accept zero height divs, so we use 1px height and zero
 * opacity.  IE6 doesn't always render correctly with opacity set, so if
 * animation is turned off, we don't use opacity at all.</p>
 * 
 * @class Accordion
 * @constructor
 * @param config {Object} Widget configuration
 */
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 47);
function Accordion(config)
{
	_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "Accordion", 47);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 49);
config = config || {};
	_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 50);
if (Y.Lang.isUndefined(config.tabIndex))
	{
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 52);
config.tabIndex = null;
	}
	_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 54);
if (Y.Lang.isUndefined(config.horizontal))
	{
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 56);
config.horizontal = false;
	}

	_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 59);
Accordion.superclass.constructor.call(this, config);
}

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 62);
function initAnimationFlag()
{
	_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "initAnimationFlag", 62);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 64);
return !Y.Lang.isUndefined(Y.Anim);
}

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 67);
function filterAnimationFlag(value)
{
	_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "filterAnimationFlag", 67);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 69);
return (value && browser_can_animate && !Y.Lang.isUndefined(Y.Anim));
}

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 72);
Accordion.NAME = "accordion";

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 74);
Accordion.ATTRS =
{
	/**
	 * Whether or not the accordion is horizontal.
	 * 
	 * @attribute horizontal
	 * @type {boolean}
	 * @default false
	 * @writeonce
	 */
	horizontal:
	{
		value:     false,
		writeOnce: true
	},

	/**
	 * A CSS selector for locating nodes, an array of nodes, or an array
	 * of strings containing markup.  This is used to define the initial
	 * set of section titles.
	 * 
	 * @attribute titles
	 * @type {String|Array}
	 * @writeonce
	 */
	titles:
	{
		writeOnce: true
	},

	/**
	 * Whether or not to replace the default title container node, when the
	 * supplied title is a node.  (If the supplied title is markup, it is
	 * always inserted inside the default title container.)
	 * 
	 * @attribute replaceTitleContainer
	 * @type {boolean}
	 * @default true
	 */
	replaceTitleContainer:
	{
		value:     true,
		validator: Y.Lang.isBoolean
	},

	/**
	 * A CSS selector for locating nodes, an array of nodes, or an array
	 * of strings containing markup.  This is used to define the initial
	 * set of section contents.
	 * 
	 * @attribute sections
	 * @type {String|Array}
	 * @writeonce
	 */
	sections:
	{
		writeOnce: true
	},

	/**
	 * Whether or not to replace the default section container node, when
	 * the supplied title is a node.  (If the supplied content is markup,
	 * it is always inserted inside the default section container.)
	 * 
	 * @attribute replaceSectionContainer
	 * @type {boolean}
	 * @default true
	 */
	replaceSectionContainer:
	{
		value:     true,
		validator: Y.Lang.isBoolean
	},

	/**
	 * Whether or not to allow all sections to be closed at the same time.
	 * If not, at least one section will always be open.
	 * 
	 * @attribute allowAllClosed
	 * @type {boolean}
	 * @default false
	 */
	allowAllClosed:
	{
		value:     false,
		validator: Y.Lang.isBoolean,
		setter: function(value)
		{
			// save internally so it can be modified without recursion
			_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "setter", 160);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 163);
this.allow_all_closed = value;
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 164);
return value;
		}
	},

	/**
	 * Whether or not to allow multiple sections to be open at the same
	 * time.  If not, at most one section at a time will be open.
	 * 
	 * @attribute allowMultipleOpen
	 * @type {boolean}
	 * @default false
	 */
	allowMultipleOpen:
	{
		value:     false,
		validator: Y.Lang.isBoolean
	},

	/**
	 * Whether or not to animate the initial rendering of the widget.
	 * 
	 * @attribute animateRender
	 * @type {boolean}
	 * @default false
	 */
	animateRender:
	{
		value:     false,
		writeOnce: true,
		validator: Y.Lang.isBoolean,
		setter:    filterAnimationFlag
	},

	/**
	 * Whether or not to animate insertion and removal of sections.
	 * 
	 * @attribute animateInsertRemove
	 * @type {boolean}
	 * @default true
	 */
	animateInsertRemove:
	{
		valueFn:   initAnimationFlag,
		validator: Y.Lang.isBoolean,
		setter:    filterAnimationFlag
	},

	/**
	 * Whether or not to animate opening and closing of sections.
	 * 
	 * @attribute animateOpenClose
	 * @type {boolean}
	 * @default true
	 */
	animateOpenClose:
	{
		valueFn:   initAnimationFlag,
		validator: Y.Lang.isBoolean,
		setter:    filterAnimationFlag
	},

	/**
	 * Duration of all animations.
	 * 
	 * @attribute animateDuration
	 * @type {int}
	 * @default whatever Y.Anim default is
	 */
	animateDuration:
	{
		value:     null,		// accept Y.Anim default
		validator: function(value)
		{
			_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "validator", 235);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 237);
return (value === null || Y.Lang.isNumber(value));
		}
	},

	/**
	 * Easing applied to all animations.
	 * 
	 * @attribute animateEasing
	 * @type {function}
	 * @default whatever Y.Anim default is
	 */
	animateEasing:
	{
		value:     null,		// accept Y.Anim default
		validator: function(value)
		{
			_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "validator", 251);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 253);
return (value === null || Y.Lang.isFunction(value));
		}
	}
};

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 258);
Accordion.HTML_PARSER =
{
	titles: function(content_box)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "titles", 260);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 262);
return content_box.all('> li > div:nth-child(1)');
	},

	sections: function(content_box)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "sections", 265);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 267);
return content_box.all('> li > div:nth-child(2)');
	}
};

/**
 * @event beforeInsert
 * @description Fires before a section is inserted.
 * @param index {int} the insertion index
 */
/**
 * @event insert
 * @description Fires after a section is inserted.
 * @param index {int} the insertion index
 * @param size {int} the final size of the section title, after animation (if any)
 */

/**
 * @event beforeRemove
 * @description Fires before a section is removed.
 * @param index {int} the section index
 */
/**
 * @event remove
 * @description Fires after a section is removed.
 * @param index {int} the section index
 */

/**
 * @event beforeOpen
 * @description Fires before a section is opened.
 * @param index {int} the section index
 */
/**
 * @event open
 * @description Fires after a section is opened.
 * @param index {int} the section index
 */

/**
 * @event beforeClose
 * @description Fires before a section is closed.
 * @param index {int} the section index
 */
/**
 * @event close
 * @description Fires after a section is closed.
 * @param index {int} the section index
 */

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 316);
var open_class   = Y.ClassNameManager.getClassName(Accordion.NAME, 'open');
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 317);
var closed_class = Y.ClassNameManager.getClassName(Accordion.NAME, 'closed');

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 319);
function cleanContainer(
	/* Node */	el)
{
	_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "cleanContainer", 319);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 322);
Y.Event.purgeElement(el, true);

	_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 324);
while (el.hasChildNodes())
	{
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 326);
el.removeChild(el.get('lastChild'));
	}
}

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 330);
Y.extend(Accordion, Y.Widget,
{
	initializer: function(config)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "initializer", 332);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 334);
this.section_list = [];

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 336);
this.get('allowAllClosed');	// force init of this.allow_all_closed

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 338);
if (this.get('horizontal'))
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 340);
this.slide_style_name = 'width';
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 341);
this.slide_size_name  = 'offsetWidth';
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 342);
this.fixed_style_name = 'height';
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 343);
this.fixed_size_name  = 'offsetHeight';
		}
		else	// vertical
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 347);
this.slide_style_name = 'height';
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 348);
this.slide_size_name  = 'offsetHeight';
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 349);
this.fixed_style_name = 'width';
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 350);
this.fixed_size_name  = 'offsetWidth';
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 353);
this.after('allowMultipleOpenChange', function(e)
		{
			_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "(anonymous 2)", 353);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 355);
if (this.section_list && this.section_list.length > 0 &&
				!e.newVal)
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 358);
this.closeAllSections();
			}
		});

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 362);
this.after('allowAllClosedChange', function(e)
		{
			_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "(anonymous 3)", 362);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 364);
if (this.section_list && this.section_list.length > 0 &&
				!e.newVal && this.allSectionsClosed())
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 367);
this.toggleSection(0);
			}
		});
	},

	renderUI: function()
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "renderUI", 372);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 374);
this.get('boundingBox').addClass(
			this.getClassName(this.get('horizontal') ? 'horiz' : 'vert'));

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 377);
var titles = this.get('titles');
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 378);
if (Y.Lang.isString(titles))
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 380);
titles = Y.all(titles);
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 383);
var sections = this.get('sections');
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 384);
if (Y.Lang.isString(sections))
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 386);
sections = Y.all(sections);
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 389);
if (titles instanceof Y.NodeList && sections instanceof Y.NodeList &&
			titles.size() == sections.size())
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 392);
var save_animate_insert = this.get('animateInsertRemove');
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 393);
this.set('animateInsertRemove', this.get('animateRender'));

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 395);
var count = titles.size();
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 396);
for (var i=0; i<count; i++)
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 398);
this.appendSection(titles.item(i), sections.item(i));
			}

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 401);
this.set('animateInsertRemove', save_animate_insert);
		}
		else {_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 403);
if (titles instanceof Array && sections instanceof Array &&
				 titles.length == sections.length)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 406);
var save_animate_insert = this.get('animateInsertRemove');
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 407);
this.set('animateInsertRemove', this.get('animateRender'));

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 409);
var count = titles.length;
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 410);
for (var i=0; i<count; i++)
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 412);
this.appendSection(titles[i], sections[i]);
			}

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 415);
this.set('animateInsertRemove', save_animate_insert);
		}
		else
		{
		}}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 421);
this.get('contentBox').all('> li').remove(true);
	},

	/**
	 * @method getSectionCount
	 * @return {int} total number of sections
	 */
	getSectionCount: function()
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "getSectionCount", 428);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 430);
return this.section_list.length;
	},

	/**
	 * @method getTitle
	 * @param index {int} the section index
	 * @return {Node} the container for the section title
	 */
	getTitle: function(
		/* int */	index)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "getTitle", 438);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 441);
return this.section_list[index].title;
	},

	/**
	 * Sets the contents of the specified section title.
	 * 
	 * @method setTitle
	 * @param index {int} the section index
	 * @param title {String|Node} the title content
	 */
	setTitle: function(
		/* int */			index,
		/* string/object */	title)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "setTitle", 451);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 455);
var t = this.section_list[index].title;
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 456);
cleanContainer(t);

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 458);
var el;
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 459);
if (Y.Lang.isString(title))
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 461);
var el = Y.one(title);
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 462);
if (!el)
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 464);
t.set('innerHTML', title);
			}
		}
		else
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 469);
el = title;
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 472);
if (el && this.get('replaceTitleContainer'))
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 474);
var p = t.get('parentNode');
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 475);
var n = t.get('nextSibling');
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 476);
p.removeChild(t);
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 477);
if (n)
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 479);
p.insertBefore(el, n);
			}
			else
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 483);
p.appendChild(el);
			}

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 486);
this.section_list[index].title = el;

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 488);
el.addClass(this.getClassName('title'));
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 489);
el.addClass(this.section_list[index].open ? open_class : closed_class);
		}
		else {_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 491);
if (el)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 493);
t.appendChild(el);
		}}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 496);
if (use_nonzero_empty_div)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 498);
t.setStyle('display', t.get('innerHTML') ? '' : 'none');
		}
	},

	/**
	 * @method getSection
	 * @param index {int} the section index
	 * @return {Node} the container for the section content
	 */
	getSection: function(
		/* int */	index)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "getSection", 507);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 510);
return this.section_list[index].content;
	},

	/**
	 * Sets the contents of the specified section.
	 * 
	 * @method setSection
	 * @param index {int} the section index
	 * @param content {String|Node} the section content
	 */
	setSection: function(
		/* int */			index,
		/* string/object */	content)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "setSection", 520);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 524);
var d = this.section_list[index].content;
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 525);
cleanContainer(d);

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 527);
var el;
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 528);
if (Y.Lang.isString(content))
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 530);
var el = Y.one(content);
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 531);
if (!el)
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 533);
d.set('innerHTML', content);
			}
		}
		else
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 538);
el = content;
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 541);
if (el && this.get('replaceSectionContainer'))
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 543);
var display = d.getStyle('display');

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 545);
var p = d.get('parentNode');
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 546);
var n = d.get('nextSibling');
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 547);
p.removeChild(d);
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 548);
if (n)
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 550);
p.insertBefore(el, n);
			}
			else
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 554);
p.appendChild(el);
			}

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 557);
this.section_list[index].content = el;

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 559);
el.addClass(this.getClassName('section'));
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 560);
el.addClass(this.section_list[index].open ? open_class : closed_class);
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 561);
el.setStyle('display', display);
		}
		else {_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 563);
if (el)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 565);
d.appendChild(el);
		}}
	},

	/**
	 * @method _getClip
	 * @protected
	 * @param index {int} the section index
	 * @return {Node} the clipping container for the section content
	 */
	_getClip: function(
		/* int */	index)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "_getClip", 575);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 578);
return this.section_list[index].clip;
	},

	/**
	 * Prepends the section to the accordion.
	 * 
	 * @method prependSection
	 * @param title {String|Node} the section title content
	 * @param content {String|Node} the section content
	 */
	prependSection: function(
		/* string/object */	title,
		/* string/object */	content)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "prependSection", 588);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 592);
return this.insertSection(0, title, content);
	},

	/**
	 * Appends the section to the accordion.
	 * 
	 * @method appendSection
	 * @param title {String|Node} the section title content
	 * @param content {String|Node} the section content
	 */
	appendSection: function(
		/* string/object */	title,
		/* string/object */	content)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "appendSection", 602);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 606);
return this.insertSection(this.section_list.length, title, content);
	},

	/**
	 * Inserts the section into the accordion at the specified location.
	 * 
	 * @method insertSection
	 * @param index {int} the insertion index
	 * @param title {String|Node} the section title content
	 * @param content {String|Node} the section content
	 */
	insertSection: function(
		/* int */			index,
		/* string/object */	title,
		/* string/object */ content)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "insertSection", 617);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 622);
this.fire('beforeInsert', index);

		// create title

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 626);
var t = Y.Node.create('<div/>');
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 627);
t.addClass(this.getClassName('title'));
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 628);
t.addClass(closed_class);

		// create content clipping

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 632);
var c = Y.Node.create('<div/>');
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 633);
c.addClass(this.getClassName('section-clip'));
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 634);
c.setStyle(this.slide_style_name, section_min_size+'px');
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 635);
if (this.get('animateOpenClose'))
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 637);
c.setStyle('opacity', 0);
		}

		// create content

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 642);
var d = Y.Node.create('<div/>');
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 643);
d.addClass(this.getClassName('section'));
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 644);
d.addClass(closed_class);
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 645);
d.setStyle('display', 'none');
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 646);
c.appendChild(d);

		// save in our list

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 650);
this.section_list.splice(index, 0,
		{
			title:   t,
			clip:    c,
			content: d,
			open:    false,
			anim:    null
		});

		// insert and show title

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 661);
if (index < this.section_list.length-1)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 663);
this.get('contentBox').insertBefore(t, this.section_list[index+1].title);
		}
		else
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 667);
this.get('contentBox').appendChild(t);
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 670);
this.setTitle(index, title);
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 671);
t = this.section_list[index].title;

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 673);
var size = t.get(this.slide_size_name);
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 674);
if (this.get('animateInsertRemove'))
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 676);
t.setStyle(this.slide_style_name, section_min_size+'px');

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 678);
var params =
			{
				node: t,
				from:
				{
					opacity: 0
				},
				to:
				{
					opacity: 1
				}
			};

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 691);
params.to[ this.slide_style_name ] = size;

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 693);
var anim = this._createAnimator(params);

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 695);
anim.on('end', function(type, index)
			{	
				_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "(anonymous 4)", 695);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 697);
this.section_list[index].title.setStyle(this.slide_style_name, 'auto');
			},
			this, index);

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 701);
anim.run();
		}

		// insert content container

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 706);
if (content)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 708);
this.setSection(index, content);
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 709);
d = this.section_list[index].content;
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 712);
if (index < this.section_list.length-1)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 714);
this.get('contentBox').insertBefore(c, this.section_list[index+1].title);
		}
		else
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 718);
this.get('contentBox').appendChild(c);
		}

		// post processing

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 723);
this.fire('insert', index, size);

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 725);
if (!this.allow_all_closed && this.allSectionsClosed())
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 727);
this.toggleSection(0);
		}

		// return containers for futher manipulation

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 732);
return { title: t, content: d };
	},

	/**
	 * Removes the specified section.
	 * 
	 * @method removeSection
	 * @param index {int} the section index
	 */
	removeSection: function(
		/* int */	index)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "removeSection", 741);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 744);
this.fire('beforeRemove', index);

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 746);
function onCompleteRemoveSection(type, args)
		{
			_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "onCompleteRemoveSection", 746);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 748);
args[0].removeChild(args[1]);
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 749);
args[0].removeChild(args[2]);

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 751);
if (args[3])
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 753);
this.fire('remove', index);
			}
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 757);
var onCompleteArgs =
		[
			this.get('contentBox'),
			this.section_list[index].title,
			this.section_list[index].clip,
			true
		];

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 765);
if (this.get('animateInsertRemove'))
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 767);
var params =
			{
				node: this.section_list[index].clip,
				from:
				{
					opacity: 1
				},
				to:
				{
					opacity: 0
				}
			};

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 780);
params.to[ this.slide_style_name ] = section_min_size;

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 782);
if (this.section_list[index].open)
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 784);
this._startAnimator(index, params);
			}

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 787);
params.node = this.section_list[index].title;
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 788);
var anim    = this._createAnimator(params);
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 789);
anim.on('end', onCompleteRemoveSection, this, onCompleteArgs);
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 790);
anim.run();
		}
		else
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 794);
onCompleteArgs[3] = false;
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 795);
onCompleteRemoveSection.call(this, null, onCompleteArgs);
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 798);
this.section_list.splice(index, 1);

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 800);
if (!onCompleteArgs[3])
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 802);
this.fire('remove', index);
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 805);
if (!this.allow_all_closed && this.allSectionsClosed())
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 807);
this.toggleSection(0);
		}
	},

	/**
	 * @method findSection
	 * @param {String|Node} any element inside the section or title
	 * @return {int} the index of the containing section, or -1 if not found
	 */
	findSection: function(
		/* string|element */	el)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "findSection", 816);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 819);
el = Y.Node.getDOMNode(Y.one(el));

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 821);
var count = this.section_list.length;
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 822);
for (var i=0; i<count; i++)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 824);
var title   = Y.Node.getDOMNode(this.section_list[i].title);
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 825);
var content = Y.Node.getDOMNode(this.section_list[i].content);
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 826);
if (el == title   || Y.DOM.contains(title, el) ||
				el == content || Y.DOM.contains(content, el))
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 829);
return i;
			}
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 833);
return -1;
	},

	/**
	 * @method isSectionOpen
	 * @return {boolean} <code>true</code> if the section is open
	 */
	isSectionOpen: function(
		/* int */	index)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "isSectionOpen", 840);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 843);
return this.section_list[index].open;
	},

	/**
	 * Open the specified section.
	 * 
	 * @method openSection
	 * @param index {int} the section index
	 */
	openSection: function(
		/* int */	index)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "openSection", 852);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 855);
if (!this.section_list[index].open)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 857);
this.toggleSection(index);
		}
	},

	/**
	 * Close the specified section.
	 * 
	 * @method closeSection
	 * @param index {int} the section index
	 */
	closeSection: function(
		/* int */	index)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "closeSection", 867);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 870);
if (this.section_list[index].open)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 872);
this.toggleSection(index);
		}
	},

	/**
	 * @method allSectionsOpen
	 * @return {boolean} <code>true</code> if all sections are open
	 */
	allSectionsOpen: function()
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "allSectionsOpen", 880);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 882);
var count = this.section_list.length;
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 883);
for (var i=0; i<count; i++)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 885);
if (!this.section_list[i].open)
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 887);
return false;
			}
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 891);
return true;
	},

	/**
	 * @method allSectionsClosed
	 * @return {boolean} <code>true</code> if all sections are closed
	 */
	allSectionsClosed: function()
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "allSectionsClosed", 898);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 900);
var count = this.section_list.length;
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 901);
for (var i=0; i<count; i++)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 903);
if (this.section_list[i].open)
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 905);
return false;
			}
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 909);
return true;
	},

	/**
	 * Show/hide the section content.
	 * 
	 * @method toggleSection
	 * @param index {int} the section index
	 */
	toggleSection: function(
		/* int */	index)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "toggleSection", 918);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 921);
if (!this.section_list[index].open && !this.get('allowMultipleOpen'))
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 923);
var save              = this.allow_all_closed;
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 924);
this.allow_all_closed = true;
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 925);
this.closeAllSections();
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 926);
this.allow_all_closed = save;
		}
		else {_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 928);
if (this.section_list[index].open && !this.allow_all_closed)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 930);
this.section_list[index].open = false;
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 931);
if (this.allSectionsClosed())
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 933);
this.section_list[index].open = true;
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 934);
return;
			}
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 936);
this.section_list[index].open = true;
		}}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 939);
function onCompleteOpenSection(type, index)
		{
			_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "onCompleteOpenSection", 939);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 941);
this.section_list[index].clip.setStyle(this.slide_style_name, 'auto');
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 942);
this.fire('open', index);
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 945);
function onCompleteCloseSection(type, index)
		{
			_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "onCompleteCloseSection", 945);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 947);
this.section_list[index].content.setStyle('display', 'none');
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 948);
this.fire('close', index);
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 951);
if (!this.section_list[index].open)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 953);
this.section_list[index].content.setStyle('display', 'block');

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 955);
this.fire('beforeOpen', index);

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 957);
this.section_list[index].open = true;
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 958);
this.section_list[index].title.replaceClass(closed_class, open_class);
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 959);
this.section_list[index].content.replaceClass(closed_class, open_class);

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 961);
var size = this.section_list[index].content.get(this.slide_size_name);
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 962);
if (this.get('animateOpenClose'))
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 964);
var params =
				{
					node: this.section_list[index].clip,
					from:
					{
						opacity: 0
					},
					to:
					{
						opacity: 1
					}
				};

				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 977);
params.to[ this.slide_style_name ] = size;

				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 979);
var anim = this._startAnimator(index, params);
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 980);
anim.on('end', onCompleteOpenSection, this, index);
			}
			else
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 984);
var clip = this.section_list[index].clip;
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 985);
if (clip.getStyle('opacity') == '0')
				{
					_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 987);
clip.setStyle('opacity', 1);
				}
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 989);
onCompleteOpenSection.call(this, null, index);
			}
		}
		else
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 994);
this.fire('beforeClose', index);

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 996);
this.section_list[index].open = false;
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 997);
this.section_list[index].title.replaceClass(open_class, closed_class);
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 998);
this.section_list[index].content.replaceClass(open_class, closed_class);

			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1000);
if (this.get('animateOpenClose'))
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1002);
var params =
				{
					node: this.section_list[index].clip,
					from:
					{
						opacity: 1
					},
					to:
					{
						opacity: 0
					}
				};

				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1015);
params.to[ this.slide_style_name ] = section_min_size;

				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1017);
var anim = this._startAnimator(index, params);
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1018);
anim.on('end', onCompleteCloseSection, this, index);
			}
			else
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1022);
this.section_list[index].clip.setStyle(this.slide_style_name, section_min_size+'px');
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1023);
onCompleteCloseSection.call(this, null, index);
			}
		}
	},

	/**
	 * Open all sections, if possible.
	 * 
	 * @method openAllSections
	 */
	openAllSections: function()
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "openAllSections", 1033);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1035);
if (this.get('allowMultipleOpen'))
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1037);
var count = this.section_list.length;
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1038);
for (var i=0; i<count; i++)
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1040);
if (!this.section_list[i].open)
				{
					_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1042);
this.toggleSection(i);
				}
			}
		}
	},

	/**
	 * Close all sections, if possible.
	 * 
	 * @method closeAllSections
	 */
	closeAllSections: function()
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "closeAllSections", 1053);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1055);
var count = this.section_list.length;
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1056);
var first = true;
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1057);
for (var i=0; i<count; i++)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1059);
if (this.section_list[i].open)
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1061);
if (!this.allow_all_closed && first)
				{
					_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1063);
first = false;
				}
				else
				{
					_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1067);
this.toggleSection(i);
				}
			}
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1072);
if (!this.allow_all_closed && first)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1074);
this.toggleSection(0);
		}
	},

	// create an animator with our configured duration and easing

	_createAnimator: function(
		/* object */	params)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "_createAnimator", 1080);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1083);
var duration = this.get('animateDuration');
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1084);
if (duration !== null)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1086);
params.duration = duration;
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1089);
var easing = this.get('animateEasing');
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1090);
if (easing !== null)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1092);
params.easing = easing;
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1095);
return new Y.Anim(params);
	},

	// Register the animator for a section and start it.

	_startAnimator: function(
		/* int */		index,
		/* object */	params)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "_startAnimator", 1100);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1104);
var anim = this.section_list[index].anim;
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1105);
if (anim)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1107);
anim.stop(true);
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1110);
this.section_list[index].anim = anim = this._createAnimator(params);

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1112);
anim.on('end', function(type, index, anim)
		{
			_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "(anonymous 5)", 1112);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1114);
if (index < this.section_list.length &&
				this.section_list[ index ].anim == anim)
			{
				_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1117);
this.section_list[ index ].anim = null;
			}
		},
		this, index, anim);

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1122);
anim.run();

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1124);
return anim;
	}
});

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1128);
Y.Accordion = Accordion;
/**
 * @module gallery-accordion-horiz-vert
 */

/**********************************************************************
 * <p>Plugin for Y.Accordion that detects that the widget has a fixed size
 * in the relevant dimension (width or height) and adjusts the open
 * sections to fit.</p>
 * 
 * <p>If/when the widget is given a fixed size, all animations are turned
 * off.</p>
 * 
 * @class FixedSizeAccordion
 * @namespace Plugin
 * @constructor
 */
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1145);
function FixedSizeAccordionPlugin()
{
	_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "FixedSizeAccordionPlugin", 1145);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1147);
FixedSizeAccordionPlugin.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1150);
FixedSizeAccordionPlugin.NAME = "FixedSizeAccordionPlugin";
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1151);
FixedSizeAccordionPlugin.NS   = "fixedsize";

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1153);
FixedSizeAccordionPlugin.ATTRS =
{
};

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1157);
var animation_attrs =
[
	'animateRender',
	'animateInsertRemove',
	'animateOpenClose'
];

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1164);
var total_size =
{
	width:  'totalWidth',
	height: 'totalHeight'
};

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1170);
var overflow =
{
	width:  'overflowX',
	height: 'overflowY'
};

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1176);
var surrounding =
{
	width:  'horizMarginBorderPadding',
	height: 'vertMarginBorderPadding'
};

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1182);
function off(
	/* string */	name)
{
	_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "off", 1182);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1185);
this.set(name, false);
	_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1186);
this.modifyAttr(name, { readOnly: true });
}

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1189);
function adjust()
{
	_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "adjust", 1189);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1191);
var host = this.get('host');
	_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1192);
if (!this.init_fixed_size)
	{
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1194);
Y.Array.each(animation_attrs, off, host);

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1196);
if (!host.get('rendered'))
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1198);
this.afterHostEvent('render', adjust, this);
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1201);
this.onHostEvent('insert', function()
		{
			_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "(anonymous 6)", 1201);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1203);
Y.later(1, this, adjust);	// may be modified after insertion
		},
		this);

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1207);
this.onHostEvent('remove', adjust, this);
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1208);
this.onHostEvent('open', adjust, this);
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1209);
this.onHostEvent('close', adjust, this);

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1211);
this.init_fixed_size = true;
	}

	_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1214);
var dim   = host.slide_style_name;
	_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1215);
var total = host.get('boundingBox').parseDimensionStyle(dim);
	_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1216);
var count = host.getSectionCount();
	_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1217);
var open  = [];
	_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1218);
for (var i=0; i<count; i++)
	{
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1220);
total -= host.getTitle(i)[ total_size[dim] ]();
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1221);
if (host.isSectionOpen(i))
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1223);
open.push(i);
		}
	}

	_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1227);
count     = open.length;
	_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1228);
var size  = Math.floor(total / count);
	_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1229);
var extra = total % count;
	_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1230);
for (i=0; i<count; i++)
	{
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1232);
var section = host.getSection(open[i]);
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1233);
var size1   = size - section[ surrounding[dim] ]();
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1234);
if (i === count-1)
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1236);
size1 += extra;
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1239);
section.setStyle(dim, size1+'px');
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1240);
section.setStyle(overflow[dim], 'auto');
	}
}

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1244);
Y.extend(FixedSizeAccordionPlugin, Y.Plugin.Base,
{
	initializer: function(config)
	{
		_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "initializer", 1246);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1248);
var host = this.get('host');
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1249);
var dim  = host.slide_style_name;

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1251);
this.init_fixed_size = false;
		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1252);
if (host.get(dim))
		{
			_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1254);
adjust.call(this);
		}

		_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1257);
this.afterHostEvent(dim+'Change', function()
		{
			_yuitest_coverfunc("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", "(anonymous 7)", 1257);
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1259);
Y.later(1, this, adjust);
		},
		this);
	}
});

_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1265);
Y.namespace("Plugin");
_yuitest_coverline("build/gallery-accordion-horiz-vert/gallery-accordion-horiz-vert.js", 1266);
Y.Plugin.FixedSizeAccordion = FixedSizeAccordionPlugin;


}, '@VERSION@', {
    "skinnable": "true",
    "requires": [
        "widget",
        "selector-css3",
        "plugin",
        "gallery-dimensions"
    ],
    "optional": [
        "anim-base"
    ]
});
