YUI.add('gallery-formmgr', function(Y) {

/**********************************************************************
 * Base class for validating/submitting a form.
 *
 * The following classes can be applied to a form element for validation:
 *
 *	yiv-required
 *		Value must not be empty.
 *
 *	yiv-length:[x,y]
 *		String must be at least x characters and at most y characters.
 *		At least one of x and y must be specified.
 *
 *	yiv-integer:[x,y]
 *		The integer value must be at least x and at most y.
 *		x and y are both optional.
 *
 *	yiv-decimal:[x,y]
 *		The decimal value must be at least x and at most y.  Exponents are
 *		not allowed.  x and y are both optional.
 *
 *	If we ever need to allow exponents, we can use yiv-float.
 *
 * The following functions allow additional validation to be attached to
 * individual form elements:
 *
 *	setRegex()
 *		Sets the regular expression that must match in order for the value
 *		to be acceptable.
 *
 *	setFunction()
 *		Sets the function that must return true in order for the value to
 *		be acceptable.  The function is called in the scope of the Form
 *		object with the arguments:  the form and the element.
 *
 * setErrorMessage() specifies the error message to be displayed when a
 * validation check fails.  The valid error message types are:
 *
 *	required
 *	min_length, max_length
 *		{min} and {max} are replaced
 *	integer
 *		{min} and {max} are replaced
 *	decimal
 *		{min} and {max} are replaced
 *	regex
 *
 * Functions are expected to call displayMessage() directly.
 *
 * More complex validations can be added by overriding postValidateForm(),
 * described below.
 *
 * Derived classes may also override the following functions:
 *
 *	prePrepareForm(arguments passed to prepareForm)
 *		Called before filling in default values for the form elements.
 *		Return false to cancel dialog.
 *
 *	postPrepareForm(arguments passed to prepareForm)
 *		Called after filling in default values for the form elements.
 *
 *	postValidateForm(form)
 *		Called after performing the basic validations.  Returns true if the
 *		form contents are acceptable.  Reports error if there is a problem.
 */

function FormManager(
	/* string */	form_name,
	/* object */	config)		// {status_node, default_value_map}
{
	if (arguments.length === 0)	// derived class prototype
	{
		return;
	}

	if (!config)
	{
		config = {};
	}

	this.form_name   = form_name;
	this.status_node = Y.one(config.status_node);
	this.enabled     = true;

	// default values for form elements

	this.default_value_map = config.default_value_map;

	// validation methods

	this.validation =
	{
		fn:    {},	// function for validating each element id
		regex: {}	// regex for validating each element id
	};

	// error messages

	this.validation_msgs = {};		// message list, keyed on type, for each element id

	this.has_messages = false;
	this.has_errors   = false;

	// buttons -- disabled during submission

	this.button_list      = [];
	this.user_button_list = [];

	// file uploading is nasty

	this.has_file_inputs = false;
}

var class_re_prefix = '(?:^|\\s)(?:';
var class_re_suffix = ')(?:\\s|$)';

// validation classes

FormManager.required_class    = 'yiv-required';
FormManager.length_class_re   = /(?:^|\s+)yiv-length:\[([0-9]+)?,([1-9][0-9]*)?\](?:\s+|$)/;
FormManager.integer_class_re  = /(?:^|\s+)yiv-integer(?::\[([-+]?[0-9]+)?,([-+]?[0-9]+)?\])?(?:\s+|$)/;
FormManager.decimal_class_re  = /(?:^|\s+)yiv-decimal(?::\[([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?,([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?\])?(?:\s+|$)/;

FormManager.integer_value_re = /^[-+]?[0-9]+$/;
FormManager.decimal_value_re = /^[-+]?(?:[0-9]+\.?|[0-9]*\.[0-9]+)$/;

// marker classes

FormManager.row_marker_class      = 'formmgr-row';
FormManager.status_none_class     = 'formmgr-status-hidden';
FormManager.status_success_class  = 'formmgr-status-success';
FormManager.status_failure_class  = 'formmgr-status-failure';
var status_pattern                = FormManager.status_success_class+'|'+FormManager.status_failure_class;
FormManager.row_status_prefix     = 'formmgr-has';
var row_status_pattern            = FormManager.row_status_prefix + '([^\\s]+)';
var row_status_regex              = new RegExp(class_re_prefix + row_status_pattern + class_re_suffix);
FormManager.status_marker_class   = 'formmgr-message-text';

// localizable strings

FormManager.Strings =
{
	submit_error: 'Correct errors in the highlighted fields before continuing.',

	required_string:      'This field requires a value.',
	required_menu:        'This field is required. Choose a value from the pull-down list.',

	length_too_short:     'Enter text that is at least {min} characters or longer.',
	length_too_long:      'Enter text that is up to {max} characters long.',
	length_out_of_range:  'Enter text that is {min} to {max} characters long.',

	integer:              'Enter a whole number (no decimal point).',
	integer_too_small:    'Enter a number that is {min} or higher (no decimal point).',
	integer_too_large:    'Enter a number that is {max} or lower (no decimal point).',
	integer_out_of_range: 'Enter a number between or including {min} and {max} (no decimal point).',

	decimal:              'Enter a number.',
	decimal_too_small:    'Enter a number that is {min} or higher.',
	decimal_too_large:    'Enter a number that is {max} or lower.',
	decimal_out_of_range: 'Enter a number between or including {min} and {max}.'
};

// customizable status precedence

FormManager.status_order =
[
	'error',
	'warn',
	'success',
	'info'
];

FormManager.getStatusPrecedence = function(
	/* string */	status)
{
	for (var i=0; i<FormManager.status_order.length; i++)
	{
		if (status == FormManager.status_order[i])
		{
			return i;
		}
	}

	return FormManager.status_order.length;
};

FormManager.statusTakesPrecendence = function(
	/* string */	orig_status,
	/* string */	new_status)
{
	return (!orig_status || FormManager.getStatusPrecedence(new_status) < FormManager.getStatusPrecedence(orig_status));
};

FormManager.getElementStatus = function(
	/* string/object */	e)
{
	var m = Y.one(e).get('className').match(row_status_regex);
	if (m && m.length)
	{
		return m[1];
	}
	else
	{
		return false;
	}
};

function getId(
	/* string/Node/object */	e)
{
	if (Y.Lang.isString(e))
	{
		return e.replace(/^#/, '');
	}
	else if (e instanceof Y.Node)
	{
		return e.get('id');
	}
	else
	{
		return e.id;
	}
}

function hasLimit(
	/* string */	s)
{
	return (!Y.Lang.isUndefined(s) && s.length > 0);
}

function populateForm1()
{
	var collect_buttons = (this.button_list.length === 0);

	for (var i=0; i<this.form.elements.length; i++)
	{
		var e = this.form.elements[i];

		var type = (e.type ? e.type.toLowerCase() : null);
		if (collect_buttons &&
			(type == 'submit' || type == 'reset' || type == 'button'))
		{
			this.button_list.push(e);
		}

		if (!e.name)
		{
			continue;
		}

		var name = e.tagName.toLowerCase();

		var v = this.default_value_map[ e.name ];
		if (name == 'input' && type == 'file')
		{
			e.value = '';
		}
		else if (Y.Lang.isUndefined(v))
		{
			// save value for next time

			if (name == 'input' &&
				(type == 'password' || type == 'text'))
			{
				this.default_value_map[ e.name ] = e.value;
			}
			else if (name == 'input' && type == 'checkbox')
			{
				this.default_value_map[ e.name ] = (e.checked ? e.value : '');
			}
			else if (name == 'input' && type == 'radio')
			{
				var rb = this.form[ e.name ];	// null if dynamically generated in IE
				if (rb && !rb.length)
				{
					this.default_value_map[ e.name ] = rb.value;
				}
				else if (rb)
				{
					this.default_value_map[ e.name ] = rb[0].value;

					for (var j=0; j<rb.length; j++)
					{
						if (rb[j].checked)
						{
							this.default_value_map[ e.name ] = rb[j].value;
							break;
						}
					}
				}
			}
			else if ((name == 'select' && type == 'select-one') ||
					 name == 'textarea')
			{
				this.default_value_map[ e.name ] = e.value;
			}
		}
		else if (name == 'input' &&
				 (type == 'password' || type == 'text'))
		{
			e.value = v;
		}
		else if (name == 'input' &&
				 (type == 'checkbox' || type == 'radio'))
		{
			e.checked = (e.value == v);
		}
		else if (name == 'select' && type == 'select-one')
		{
			e.value = v;
			if (e.selectedIndex >= 0 && e.options[ e.selectedIndex ].value !== v)
			{
				e.selectedIndex = -1;
			}
		}
		else if (name == 'textarea')
		{
			e.value = v;
		}
	}
}

FormManager.prototype =
{
	/**********************************************************************
	 * Access functions.
	 */

	getForm: function()
	{
		if (!this.form)
		{
			this.form = document.forms[ this.form_name ];
		}
		return this.form;
	},

	hasFileInputs: function()
	{
		return this.has_file_inputs;
	},

	setDefaultValues: function(
		/* object */	default_value_map)
	{
		this.default_value_map = default_value_map;
	},

	setDefaultValue: function(
		/* string*/		field_name,
		/* string */	default_value)
	{
		this.default_value_map[ field_name ] = default_value;
	},

	saveCurrentValuesAsDefault: function()
	{
		this.default_value_map = {};
		this.button_list       = [];
		populateForm1.call(this);
	},

	/**********************************************************************
	 * Validation control
	 */

	setFunction: function(
		/* string */	id,
		/* function */	f)
	{
		this.validation.fn[ getId(id) ] = f;
	},

	setRegex: function(
		/* string */		id,
		/* string/RegExp */	regex,
		/* string */		flags)		// ignored if regex is RegExp object
	{
		id = getId(id);

		if (Y.Lang.isString(regex))
		{
			this.validation.regex[id] = new RegExp(regex, flags);
		}
		else
		{
			this.validation.regex[id] = regex;
		}

		if (!this.validation_msgs[id] || !this.validation_msgs[id].regex)
		{
		}
	},

	setErrorMessage: function(
		/* string */	id,
		/* object */	map)
	{
		this.validation_msgs[ getId(id) ] = map;
	},

	addErrorMessage: function(
		/* string */	id,
		/* string */	error_type,
		/* string */	msg)
	{
		id = getId(id);
		if (!this.validation_msgs[id])
		{
			this.validation_msgs[id] = {};
		}
		this.validation_msgs[id][error_type] = msg;
	},

	/**********************************************************************
	 * Clear all values.
	 */

	clearForm: function()
	{
		this.clearMessages();
		this.form.reset();
		this.postPopulateForm();
	},

	/**********************************************************************
	 * Reset all values to their defaults.
	 */

	populateForm: function()
	{
		if (!this.default_value_map)
		{
			this.default_value_map = {};
		}

		this.clearMessages();

		populateForm1.call(this);

		// let derived class adjust

		this.postPopulateForm();
	},

	postPopulateForm: function()
	{
	},

	/**********************************************************************
	 * Returns false if all form elements have their default values.
	 */

	isChanged: function()
	{
		for (var i=0; i<this.form.elements.length; i++)
		{
			var e = this.form.elements[i];
			if (!e.name)
			{
				continue;
			}

			var type = (e.type ? e.type.toLowerCase() : null);
			var name = e.tagName.toLowerCase();
			var v    = this.default_value_map[ e.name ];
			if (v === null || typeof v === 'undefined')
			{
				v = "";
			}

			if (name == 'input' && type == 'file')
			{
				if (e.value)
				{
					return true;
				}
			}
			else if (name == 'input' &&
					 (type == 'password' || type == 'text' || type == 'file'))
			{
				if (e.value != v)
				{
					return true;
				}
			}
			else if (name == 'input' &&
					 (type == 'checkbox' || type == 'radio'))
			{
				var checked = (e.value == v);
				if ((checked && !e.checked) || (!checked && e.checked))
				{
					return true;
				}
			}
			else if ((name == 'select' && type == 'select-one') ||
					 name == 'textarea')
			{
				if (e.value != v)
				{
					return true;
				}
			}
		}

		return false;
	},

	/**********************************************************************
	 * Prepare the form for display.
	 */

	prepareForm: function()
	{
		this.getForm();

		if (!this.prePrepareForm.apply(this, arguments))
		{
			return false;
		}

		// clear all errors

		this.clearMessages();

		// fill in starting values

		this.populateForm();

		if (!this.postPrepareForm.apply(this, arguments))
		{
			return false;
		}

		return true;
	},

	prePrepareForm: function()
	{
		return true;
	},

	postPrepareForm: function()
	{
		return true;
	},

	/**********************************************************************
	 * Set focus to first viable element.
	 */

	initFocus: function()
	{
		for (var i=0; i<this.form.elements.length; i++)
		{
			var e = this.form.elements[i];
			if (e.disabled || e.offsetHeight === 0)
			{
				continue;
			}

			var name = e.tagName.toLowerCase();
			var type = (e.type ? e.type.toLowerCase() : null);

			if ((name == 'input' &&
				 (type == 'file' || type == 'password' || type == 'text')) ||
				name == 'textarea')
			{
				try
				{
					e.focus();
				}
				catch (ex)
				{
					// no way to determine in IE if this will fail
				}
				e.select();
				break;
			}
		}
	},

	/**********************************************************************
	 * Validate the form.
	 */

	validateForm: function()
	{
		this.clearMessages();
		var status = true;

		this.has_file_inputs = false;

		var e = this.form.elements;
		for (var i=0; i<e.length; i++)
		{
			if (e[i].type && e[i].type.toLowerCase() == 'file')
			{
				this.has_file_inputs = true;
			}
			else if (e[i].type && e[i].type.toLowerCase() == 'select-multiple')
			{
				// don't change the value
			}
			else if (e[i].value)
			{
				e[i].value = Y.Lang.trim(e[i].value);
			}
		}

		for (i=0; i<e.length; i++)
		{
			var e_id     = e[i].id;
			var msg_list = this.validation_msgs[e_id];

			var required = Y.one(e[i]).hasClass(FormManager.required_class);
			if (required && e[i].value === '')
			{
				var msg = null;
				if (msg_list && msg_list.required)
				{
					msg = msg_list.required;
				}
				else if (e[i].tagName.toLowerCase() == 'select')
				{
					msg = FormManager.Strings.required_menu;
				}
				else
				{
					msg = FormManager.Strings.required_string;
				}
				this.displayMessage(e[i], msg, 'error');
				status = false;
				continue;
			}
			else if (!required && e[i].value === '')
			{
				continue;
			}

			if (e[i].className)
			{
				var m = e[i].className.match(FormManager.length_class_re);
				if (m && m.length)
				{
					var msg     = null;
					var has_min = (hasLimit(m[1]) && m[1] !== '0');
					if (has_min && hasLimit(m[2]))
					{
						msg = FormManager.Strings.length_out_of_range;
					}
					else if (has_min)
					{
						msg = FormManager.Strings.length_too_short;
					}
					else if (hasLimit(m[2]))
					{
						msg = FormManager.Strings.length_too_long;
					}

					if (hasLimit(m[1]) &&
						hasLimit(m[2]) &&
						parseInt(m[1], 10) > parseInt(m[2], 10))
					{
					}

					if (e[i].value && hasLimit(m[1]) &&
						e[i].value.length < parseInt(m[1], 10))
					{
						if (msg_list && msg_list.min_length)
						{
							msg = msg_list.min_length;
						}
						msg = Y.substitute(msg, {min: parseInt(m[1], 10), max: parseInt(m[2], 10)});

						this.displayMessage(e[i], msg, 'error');
						status = false;
						continue;
					}
					if (e[i].value && hasLimit(m[2]) &&
						e[i].value.length > parseInt(m[2], 10))
					{
						if (msg_list && msg_list.max_length)
						{
							msg = msg_list.max_length;
						}
						msg = Y.substitute(msg, {min: parseInt(m[1], 10), max: parseInt(m[2], 10)});

						this.displayMessage(e[i], msg, 'error');
						status = false;
						continue;
					}
				}

				var m = e[i].className.match(FormManager.integer_class_re);
				if (m && m.length)
				{
					var msg = null;
					if (msg_list && msg_list.integer)
					{
						msg = msg_list.integer;
					}
					else if (hasLimit(m[1]) &&
							 hasLimit(m[2]))
					{
						if (parseInt(m[1], 10) > parseInt(m[2], 10))
						{
						}

						msg = FormManager.Strings.integer_out_of_range;
					}
					else if (hasLimit(m[1]))
					{
						msg = FormManager.Strings.integer_too_small;
					}
					else if (hasLimit(m[2]))
					{
						msg = FormManager.Strings.integer_too_large;
					}
					else
					{
						msg = FormManager.Strings.integer;
					}
					msg = Y.substitute(msg, {min: parseInt(m[1], 10), max: parseInt(m[2], 10)});

					var value = parseInt(e[i].value, 10);
					if (e[i].value &&
						(!FormManager.integer_value_re.test(e[i].value) ||
						 (hasLimit(m[1]) && value < parseInt(m[1], 10)) ||
						 (hasLimit(m[2]) && value > parseInt(m[2], 10))))
					{
						this.displayMessage(e[i], msg, 'error');
						status = false;
						continue;
					}
				}

				var m = e[i].className.match(FormManager.decimal_class_re);
				if (m && m.length)
				{
					var msg = null;
					if (msg_list && msg_list.decimal)
					{
						msg = msg_list.decimal;
					}
					else if (hasLimit(m[1]) &&
							 hasLimit(m[2]))
					{
						if (parseFloat(m[1]) > parseFloat(m[2]))
						{
						}

						msg = FormManager.Strings.decimal_out_of_range;
					}
					else if (hasLimit(m[1]))
					{
						msg = FormManager.Strings.decimal_too_small;
					}
					else if (hasLimit(m[2]))
					{
						msg = FormManager.Strings.decimal_too_large;
					}
					else
					{
						msg = FormManager.Strings.decimal;
					}
					msg = Y.substitute(msg, {min: parseFloat(m[1], 10), max: parseFloat(m[2], 10)});

					var value = parseFloat(e[i].value);
					if (e[i].value &&
						(!FormManager.decimal_value_re.test(e[i].value) ||
						 (hasLimit(m[1]) && value < parseFloat(m[1])) ||
						 (hasLimit(m[2]) && value > parseFloat(m[2]))))
					{
						this.displayMessage(e[i], msg, 'error');
						status = false;
						continue;
					}
				}
			}

			if (this.validation.regex[e_id] &&
				!this.validation.regex[e_id].test(e[i].value))
			{
				this.displayMessage(e[i], msg_list ? msg_list.regex : null, 'error');
				status = false;
				continue;
			}

			var f = this.validation.fn[e_id];
			if (Y.Lang.isFunction(f))
			{
				var scope = this;
			}
			else if (Y.Lang.isString(f))
			{
				var scope = this;
				f         = scope[f];
			}
			else if (f && f.scope)
			{
				var scope = f.scope;
				f         = (Y.Lang.isString(f.fn) ? scope[f.fn] : f.fn);
			}
			else
			{
				f = null;
			}

			if (f && !f.call(scope, this.form, Y.one(e[i])))
			{
				status = false;
				continue;
			}
		}

		if (!this.postValidateForm(this.form))
		{
			status = false;
		}

		if (!status)
		{
			this.notifyErrors();
		}

		return status;
	},

	postValidateForm: function(
		/* DOM element */	form)
	{
		return true;
	},

	/**********************************************************************
	 * Register buttons that should be disabled during submission.
	 */

	registerButton: function(
		/* string/object */ el)
	{
		var info =
		{
			e: Y.one(el)
		};

		this.user_button_list.push(info);
	},

	/**********************************************************************
	 * Form is disabled during submission
	 */

	enableForm: function()
	{
		this.setFormEnabled(true);
	},

	disableForm: function()
	{
		this.setFormEnabled(false);
	},

	setFormEnabled: function(
		/* boolean */	enabled)
	{
		this.enabled = enabled;

		var disabled = ! enabled;
		for (var i=0; i<this.button_list.length; i++)
		{
			this.button_list[i].disabled = disabled;
		}

		for (i=0; i<this.user_button_list.length; i++)
		{
			var info = this.user_button_list[i];
			info.e.set('disabled', disabled);
		}
	},

	/**********************************************************************
	 * Message display
	 */

	hasMessages: function()
	{
		return this.has_messages;
	},

	hasErrors: function()
	{
		return this.has_errors;
	},

	getRowStatus: function(
		/* id/object */	e)
	{
		var p = Y.one(e).ancestor('.'+FormManager.row_marker_class);
		return FormManager.getElementStatus(p);
	},

	clearMessages: function()
	{
		this.has_messages = false;
		this.has_errors   = false;

		if (this.status_node)
		{
			this.status_node.set('innerHTML', '');
			this.status_node.replaceClass(status_pattern, FormManager.status_none_class);
		}

		for (var i=0; i<this.form.elements.length; i++)
		{
			var e = this.form.elements[i];
			var p = Y.one(e).ancestor('.'+FormManager.row_marker_class);
			if (p && p.hasClass(row_status_pattern))
			{
				p.all('.'+FormManager.status_marker_class).set('innerHTML', '');
				p.removeClass(row_status_pattern);
			}
		}

		Y.one(this.form).all('fieldset').removeClass(row_status_pattern);
	},

	displayMessage: function(
		/* id/object */	e,
		/* string */	msg,
		/* string */	type,
		/* boolean */	scroll)
	{
		if (Y.Lang.isUndefined(scroll))
		{
			scroll = true;
		}

		e     = Y.one(e);
		var p = e.ancestor('.'+FormManager.row_marker_class);
		if (p && FormManager.statusTakesPrecendence(FormManager.getElementStatus(p), type))
		{
			if (msg)
			{
				p.all('.'+FormManager.status_marker_class).set('innerHTML', msg);
			}

			p.removeClass(row_status_pattern);
			p.addClass(FormManager.row_status_prefix + type);

			var fieldset = e.ancestor('fieldset');
			if (fieldset && FormManager.statusTakesPrecendence(FormManager.getElementStatus(fieldset), type))
			{
				fieldset.removeClass(row_status_pattern);
				fieldset.addClass(FormManager.row_status_prefix + type);
			}

			if (!this.has_messages && scroll && e.get('offsetHeight') > 0)
			{
				p.scrollIntoView();
				try
				{
					e.focus();
				}
				catch (ex)
				{
					// no way to determine in IE if this will fail
				}
			}

			this.has_messages = true;
			if (type == 'error')
			{
				this.has_errors = true;
			}
		}
	},

	notifyErrors: function()
	{
		this.displayFormMessage(FormManager.Strings.submit_error, true, false);
	},

	displayFormMessage: function(
		/* string */	msg,
		/* boolean */	error,
		/* boolean */	scroll)
	{
		if (Y.Lang.isUndefined(scroll))
		{
			scroll = true;
		}

		if (this.status_node)
		{
			if (!this.status_node.innerHTML)
			{
				this.status_node.replaceClass(
					FormManager.status_none_class,
					(error ? FormManager.status_failure_class :
							 FormManager.status_success_class));
				this.status_node.set('innerHTML', msg);
			}

			if (scroll)
			{
				this.status_node.scrollIntoView();
			}
		}
		else
		{
		}
	}
};

Y.FormManager = FormManager;


}, '@VERSION@' ,{requires:['node-base','substitute']});
