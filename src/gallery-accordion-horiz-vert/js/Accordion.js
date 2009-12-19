"use strict";

var Anim = null,
	use_nonzero_empty_div = (0 < Y.UA.ie && Y.UA.ie < 8),
	section_min_size = (use_nonzero_empty_div ? 1 : 0);

/**********************************************************************
 * <p>Class to manage an accordion:</p>
 * <pre>
 * +-------+
 * ! title !
 * +-------+
 * !content!
 * +-------+
 * ! title !
 * +-------+
 * ! title !
 * +-------+
 * </pre>
 *
 * <p>Allows either multiple open sections or only a single open section.
 * Provides option to always force at lease one item to be open.</p>
 *
 * <p>When using a horizontal accordion:</p>
 * <ul>
 * <li>The widget's container must have a height.</li>
 * <li>The content of each title must have both a width and height.</li>
 * <li>Each section must have a width.</li>
 * </ul>
 * 
 * <p>IE doesn't accept zero height divs, so we use 1px height and zero
 * opacity.  IE6 doesn't always render correctly with opacity set, so if
 * animation is turned off, we don't use opacity at all.</p>
 * 
 * <p>Animation is optional.  If the anim module is not available,
 * animation is automatically turned off.</p>
 * 
 * @module gallery-accordion-horiz-vert
 * @class Accordion
 * @constructor
 * @param config {Object} Widget configuration
 * 		<dl>
 * 		<dt>horizontal</dt>
 * 		<dd><code>true</code> if the accordion should be horizontal</dd>
 * 		</dl>
 */

function Accordion(config)
{
	if (arguments.length == 0)	// derived class prototype
	{
		return;
	}

	this.horizontal          = config.horizontal;
	this.animate_insert      = (Anim != null);
	this.animate_open        = (Anim != null);

	this.slide_time   = 1;	// second
	this.slide_easing = Anim && YAHOO.util.Easing.easeOut;

	Accordion.superclass.constructor.apply(this, arguments);
};

Accordion.NAME = "accordion";

Accordion.ATTRS =
{
	allowAllClosed:
	{
		value:     false,
		validator: Y.Lang.isBoolean
	},

	allowMultipleOpen:
	{
		value:     false,
		validator: Y.Lang.isBoolean
	}
};

Accordion.HTML_PARSER =
{
};

var open_class   = Accordion.getClassName('open');
var closed_class = Accordion.getClassName('closed');

function cleanContainer(
	/* Node */	el)
{
	Y.Event.purgeElement(el, true);

	while (el.hasChildNodes())
	{
		el.removeChild(el.lastChild);
	}
}

Y.extend(Accordion, Y.Widget,
{
	initializer: function(config)
	{
		this.section_list = [];

		if (this.horizontal)
		{
			this.slide_style_name   = 'width';
			this.slide_size_name    = 'offsetWidth';
			this.fixed_style_name   = 'height';
			this.fixed_size_name    = 'offsetHeight';
		}
		else	// vertical
		{
			this.slide_style_name   = 'height';
			this.slide_size_name    = 'offsetHeight';
			this.fixed_style_name   = 'width';
			this.fixed_size_name    = 'offsetWidth';
		}

		this.after('allowAllClosedChange', function(e)
		{
			if (this.section_list &&  this.section_list.length > 0 &&
				!e.get('newVal'))
			{
				this.closeAllSections();
			}
		});

		this.after('allowMultipleOpenChange', function(e)
		{
			if (this.section_list && this.section_list.length > 0 &&
				!e.get('newVal') && this.allSectionsClosed())
			{
				this.toggleContent(0);
			}
		});
	},

	renderUI: function()
	{
		this.get('boundingBox').addClass(
			this.getClassName(this.horizontal ? 'horiz' : 'vert'));

		var save_animate_insert = this.get('animateInsertion');
		this.set('animateInsertion', false);

		if (title_list)
		{
			var count = title_list.length;
			for (var i=0; i<count; i++)
			{
				this.appendSection(title_list[i]);
			}
		}

		this.set('animateInsertion', save_animate_insert);
	},

	/**
	 * @return {boolean} <code>true</code> if the accordion is horizontal
	 */
	isHorizontal: function()
	{
		return this.horizontal;
	},

	/**********************************************************************
	 * Animation controls
	 */

	willAnimateInsertRemove: function()
	{
		return this.animate_insert;
	},

	shouldAnimateInsertRemove: function(
		/* bool */	animate)
	{
		this.animate_insert = (animate && Anim != null);
	},

	willAnimateOpenClose: function()
	{
		return this.animate_open;
	},

	shouldAnimateOpenClose: function(
		/* bool */	animate)
	{
		this.animate_open = (animate && Anim != null);
	},

	getAnimationParams: function()
	{
		var result =
		{
			interval: this.slide_time,
			easing:   this.slide_easing
		};
		return result;
	},

	setAnimationParams: function(
		/* int */		interval,
		/* object */	easing)
	{
		this.slide_time   = interval;
		this.slide_easing = easing;
	},

	/**********************************************************************
	 * Title container
	 */

	getTitle: function(
		/* int */	index)
	{
		return this.section_list[index].title;
	},

	setTitle: function(
		/* int */			index,
		/* string/object */	title)
	{
		var t = this.section_list[index].title;
		if (title)
		{
			if (typeof title == 'string')
			{
				var el = document.getElementById(title)
				if (el)
				{
					cleanContainer(t);
					t.appendChild(el);
				}
				else
				{
					t.innerHTML = title;
				}
			}
			else
			{
				cleanContainer(t);
				t.appendChild(title);
			}
		}

		if (use_nonzero_empty_div)
		{
			Dom.setStyle(t, 'display', t.innerHTML ? '' : 'none');
		}
	},

	placeTitle: function(
		/* int */	index,
		/* bool */	top_left)
	{
		var title = this.section_list[index].title;
		var clip  = this.section_list[index].clip;

		if (top_left)
		{
			clip.parentNode.insertBefore(title, clip);
		}
		else if (index == this.section_list.length-1)
		{
			clip.parentNode.appendChild(title);
		}
		else
		{
			clip.parentNode.insertBefore(title, this.section_list[index+1].clip);
		}
	},

	/**********************************************************************
	 * Content container
	 */

	getSectionCount: function()
	{
		return this.section_list.length;
	},

	isSectionOpen: function(
		/* int */	index)
	{
		return this.section_list[index].open;
	},

	getSection: function(
		/* int */	index)
	{
		return this.section_list[index].content;
	},

	setSection: function(
		/* int */			index,
		/* string/object */	content)
	{
		var d = this.section_list[index].content;
		if (typeof content == 'string')
		{
			var el = document.getElementById(content);
			if (el)
			{
				cleanContainer(d);
				d.appendChild(el);
			}
			else
			{
				d.innerHTML = content;
			}
		}
		else
		{
			cleanContainer(d);
			d.appendChild(content);
		}
	},

	_getClip: function(
		/* int */	index)
	{
		return this.section_list[index].clip;
	},

	/**********************************************************************
	 * insertSection
	 */

	prependSection: function(
		/* string/object */	title,
		/* string/object */	content)
	{
		return this.insertSection(0, title, content);
	},

	appendSection: function(
		/* string/object */	title,
		/* string/object */	content)
	{
		return this.insertSection(this.section_list.length, title, content);
	},

	insertSection: function(
		/* int */			index,
		/* string/object */	title,
		/* string/object */ content)
	{
		this.fireEvent(Accordion.BEFORE_INSERT, index);

		// create title

		var t = document.createElement('div');
		Dom.addClass(t, this.getClassName('title'));
		Dom.addClass(t, closed_class);

		// create content clipping

		var c = document.createElement('div');
		Dom.addClass(c, this.getClassName('content-clip'));
		Dom.setStyle(c, this.slide_style_name, section_min_size+'px');
		if (this.animate_open)
		{
			Dom.setStyle(c, 'opacity', '0');
		}

		// create content

		var d = document.createElement('div');
		Dom.addClass(d, this.getClassName('content'));
		Dom.addClass(t, closed_class);
//		Dom.setStyle(d, 'display', 'none');
		c.appendChild(d);

		// save in our list

		this.section_list.splice(index, 0,
		{
			title:   t,
			clip:    c,
			content: d,
			open:    false,
			anim:    null
		});

		// insert and show title

		this.setTitle(index, title);

		if (index < this.section_list.length-1)
		{
			this.container.insertBefore(t, this.section_list[index+1].title);
		}
		else
		{
			this.container.appendChild(t);
		}

		var size = t[this.slide_size_name];
		if (this.animate_insert)
		{
			Dom.setStyle(t, this.slide_style_name, section_min_size+'px');

			var params =
			{
				opacity:
				{
					from: 0,
					to:   1
				}
			};

			params[ this.slide_style_name ] =
			{
				to: size
			};

			var anim = new Anim(t, params, this.slide_time, this.slide_easing);

			anim.onComplete.subscribe(function(type, args1, index)
			{	
				Dom.setStyle(this.section_list[index].title, this.slide_style_name, 'auto');
			},
			index, this);

			anim.animate();
		}

		// insert content container

		if (content)
		{
			this.setSection(index, content);
		}

		if (index < this.section_list.length-1)
		{
			this.container.insertBefore(c, this.section_list[index+1].title);
		}
		else
		{
			this.container.appendChild(c);
		}

		// post processing

		this.fireEvent(Accordion.AFTER_INSERT, index, size);

		if (!this.allow_all_closed && this.allSectionsClosed())
		{
			this.toggleContent(0);
		}

		// return containers for futher manipulation

		var result =
		{
			title:   t,
			content: d
		};
		return result;
	},

	/**********************************************************************
	 * removeSection
	 */

	removeSection: function(
		/* int */	index)
	{
		this.fireEvent(Accordion.BEFORE_REMOVE, index);

		function onCompleteRemoveSection(type, args1, args2)
		{
			args2[0].removeChild(args2[1]);
			args2[0].removeChild(args2[2]);
		};

		var onCompleteArgs =
		[
			this.container,
			this.section_list[index].title,
			this.section_list[index].clip
		];

		if (this.animate_insert)
		{
			var params =
			{
				opacity:
				{
					from: 1,
					to:   0
				}
			};

			params[ this.slide_style_name ] =
			{
				to: section_min_size
			};

			if (this.section_list[index].open)
			{
				var anim = new Anim(this.section_list[index].clip, params, this.slide_time, this.slide_easing);
				this.startAnimator(index, anim);
			}

			var anim = new Anim(this.section_list[index].title, params, this.slide_time, this.slide_easing);

			anim.onComplete.subscribe(onCompleteRemoveSection, onCompleteArgs);

			anim.animate();
		}
		else
		{
			onCompleteRemoveSection(null, null, onCompleteArgs);
		}

		this.section_list.splice(index, 1);

		if (!this.allow_all_closed && this.allSectionsClosed())
		{
			this.toggleContent(0);
		}

		this.fireEvent(Accordion.AFTER_REMOVE, index);
	},

	/**********************************************************************
	 * findSection
	 */

	findSection: function(
		/* content */	section_content)
	{
		var count = this.section_list.length;
		for (var i=0; i<count; i++)
		{
			if (this.section_list[i].content == section_content)
			{
				return i;
			}
		}

		return null;
	},

	/**********************************************************************
	 * Open/close section
	 */

	sectionIsOpen: function(
		/* int */	index)
	{
		return this.section_list[index].open;
	},

	openSection: function(
		/* int */	index)
	{
		if (!this.section_list[index].open)
		{
			this.toggleContent(index);
		}
	},

	closeSection: function(
		/* int */	index)
	{
		if (this.section_list[index].open)
		{
			this.toggleContent(index);
		}
	},

	allSectionsClosed: function()
	{
		var count = this.section_list.length;
		for (var i=0; i<count; i++)
		{
			if (this.section_list[i].open)
			{
				return false;
			}
		}

		return true;
	},

	/**********************************************************************
	 * Handler
	 */

	setHandler: function(
		/* int */		index,
		/* object */	handler)
	{
		this.section_list[index].handler = handler;
		if (handler && handler.init && typeof handler.init == 'function')
		{
			handler.init(this, index);
		}
	},

	/**********************************************************************
	 * Convenience function to toggle the visibility of a section when
	 * something in its title was clicked.
	 */

	onTitleClicked: function(
		/* object */	e)
	{
		var t     = Event.getTarget(e);
		var count = this.section_list.length;
		for (var i=0; i<count; i++)
		{
			if (Dom.isAncestor(this.section_list[i].title, t))
			{
				this.toggleContent(i);
				break;
			}
		}
	},

	/**********************************************************************
	 * Show/hide the content.
	 */

	toggleContent: function(
		/* int */	index)
	{
		if (!this.section_list[index].open && !this.allow_multiple_open)
		{
			var save              = this.allow_all_closed;
			this.allow_all_closed = true;
			this.closeAllSections();
			this.allow_all_closed = save;
		}
		else if (this.section_list[index].open && !this.allow_all_closed)
		{
			this.section_list[index].open = false;
			if (this.allSectionsClosed())
			{
				this.section_list[index].open = true;
				return;
			}
			this.section_list[index].open = true;
		}

		if (!this.section_list[index].open)
		{
//			Dom.setStyle(this.section_list[index].content, 'display', 'block');

			this.fireEvent(Accordion.BEFORE_OPEN, index);

			var h = this.section_list[index].handler;
			if (h && h.onShow && typeof h.onShow == 'function')
			{
				h.onShow();
			}

			this.section_list[index].open = true;
			Dom.replaceClass(this.section_list[index].title,
				closed_class, open_class);
			Dom.replaceClass(this.section_list[index].content,
				closed_class, open_class);

			function onCompleteOpenSection(type, args1, index)
			{
				Dom.setStyle(this.section_list[index].clip, this.slide_style_name, 'auto');
				this.fireEvent(Accordion.AFTER_OPEN, index);
			};

			var size = this.section_list[index].content[ this.slide_size_name ];
			if (this.animate_open)
			{
				var params =
				{
					opacity:
					{
						from: 0,
						to:   1
					}
				};

				params[ this.slide_style_name ] =
				{
					to: size
				};

				var anim = new Anim(this.section_list[index].clip, params, this.slide_time, this.slide_easing);

				anim.onComplete.subscribe(onCompleteOpenSection, index, this);

				this.startAnimator(index, anim);
			}
			else
			{
				var clip = this.section_list[index].clip;
				if (Dom.getStyle(clip, 'opacity') == 0)
				{
					Dom.setStyle(clip, 'opacity', 1);
				}
//				Dom.setStyle(clip, this.slide_style_name, size+'px');
				onCompleteOpenSection.call(this, null, null, index);
			}
		}
		else
		{
			this.fireEvent(Accordion.BEFORE_CLOSE, index);

			this.section_list[index].open = false;
			Dom.replaceClass(this.section_list[index].title,
				open_class, closed_class);
			Dom.replaceClass(this.section_list[index].content,
				open_class, closed_class);

			function onCompleteCloseSection(type, args1, args2)
			{
//				Dom.setStyle(args2[1], 'display', 'none');
				this.fireEvent(Accordion.AFTER_CLOSE, args2[0]);

				if (args2[2] && args2[2].onShow && typeof args2[2].onShow == 'function')
				{
					args2[2].onHide();
				}
			};

			var onCompleteArgs =
			[
				index,
				this.section_list[index].content,
				this.section_list[index].handler
			];

			if (this.animate_open)
			{
				var params =
				{
					opacity:
					{
						from: 1,
						to:   0
					}
				};

				params[ this.slide_style_name ] =
				{
					to: section_min_size
				};

				var anim = new Anim(this.section_list[index].clip, params, this.slide_time, this.slide_easing);

				anim.onComplete.subscribe(onCompleteCloseSection, onCompleteArgs, this);

				this.startAnimator(index, anim);
			}
			else
			{
				var clip = this.section_list[index].clip;
//				Dom.setStyle(clip, 'opacity', 0);
				Dom.setStyle(clip, this.slide_style_name, section_min_size+'px');
				onCompleteCloseSection.call(this, null, null, onCompleteArgs);
			}
		}
	},

	/**********************************************************************
	 * Show all the content.
	 */

	openAllSections: function()
	{
		if (!this.allow_multiple_open)
		{
			return;
		}

		var count = this.section_list.length;
		var first = true;
		for (var i=0; i<count; i++)
		{
			if (!this.section_list[i].open)
			{
				this.toggleContent(i);
			}
		}
	},

	/**********************************************************************
	 * Hide all the content.
	 */

	closeAllSections: function()
	{
		var count = this.section_list.length;
		var first = true;
		for (var i=0; i<count; i++)
		{
			if (this.section_list[i].open)
			{
				if (!this.allow_all_closed && first)
				{
					first = false;
				}
				else
				{
					this.toggleContent(i);
				}
			}
		}

		if (!this.allow_all_closed && first)
		{
			this.toggleContent(0);
		}
	},

	/**********************************************************************
	 * Register the animator for a section and start it.
	 */

	startAnimator: function(
		/* int */		index,
		/* object */	anim)
	{
		var a = this.section_list[index].anim;
		if (a)
		{
			a.stop(true);
		}

		this.section_list[index].anim = anim;

		if (anim)
		{
			anim.onComplete.subscribe(function(type, args1, args2)
			{
				if (args2[0] < this.section_list.length &&
					this.section_list[ args2[0] ].anim == args2[1])
				{
					this.section_list[ args2[0] ].anim = null;
				}
			},
			[index, anim], this);

			anim.animate();
		}
	}
});

Y.Accordion = Accordion;
