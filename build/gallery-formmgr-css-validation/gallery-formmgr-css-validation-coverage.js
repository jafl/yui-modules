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
_yuitest_coverage["build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js",
    code: []
};
_yuitest_coverage["build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js"].code=["YUI.add('gallery-formmgr-css-validation', function (Y, NAME) {","","\"use strict\";","","/**********************************************************************"," * <p>FormManager CSS Validation provides basic functionality for"," * pre-validating user input based on CSS classes set on form elements.</p>"," *"," * <p>The following classes can be applied to a form element for"," * pre-validation:</p>"," *"," * <dl>"," * <dt><code>yiv-required</code></dt>"," * <dd>Value must not be empty.</dd>"," *"," * <dt><code>yiv-length:[x,y]</code></dt>"," * <dd>String must be at least x characters and at most y characters."," * At least one of x and y must be specified.</dd>"," *"," * <dt><code>yiv-integer:[x,y]</code></dt>"," * <dd>The integer value must be at least x and at most y."," * x and y are both optional.</dd>"," *"," * <dt><code>yiv-decimal:[x,y]</code></dt>"," * <dd>The decimal value must be at least x and at most y.  Exponents are"," * not allowed.  x and y are both optional.</dd>"," * </dl>"," *"," * <p>If we ever need to allow exponents, we can use yiv-float.</p>"," *"," * @module gallery-formmgr"," * @submodule gallery-formmgr-css-validation"," */","","/**"," * @class FormManager"," */","","Y.namespace('FormManager');","","// pre-validation classes","","var required_class    = 'yiv-required';","var length_class_re   = /(?:^|\\s+)yiv-length:\\[([0-9]+)?,([1-9][0-9]*)?\\](?:\\s+|$)/;","var integer_class_re  = /(?:^|\\s+)yiv-integer(?::\\[([-+]?[0-9]+)?,([-+]?[0-9]+)?\\])?(?:\\s+|$)/;","var decimal_class_re  = /(?:^|\\s+)yiv-decimal(?::\\[([-+]?(?:[0-9]+\\.?|[0-9]+\\.[0-9]+|\\.[0-9]+))?,([-+]?(?:[0-9]+\\.?|[0-9]+\\.[0-9]+|\\.[0-9]+))?\\])?(?:\\s+|$)/;","","/**"," * Regular expression used to determine if a value is an integer."," * This can be localized, e.g., allow for thousands separator."," * "," * @property integer_value_re"," * @type {RegExp}"," * @static"," */","Y.FormManager.integer_value_re = /^[-+]?[0-9]+$/;","","/**"," * Regular expression used to determine if a value is a decimal number."," * This can be localized, e.g., use the correct decimal separator."," * "," * @property decimal_value_re"," * @type {RegExp}"," * @static"," */","Y.FormManager.decimal_value_re = /^[-+]?(?:[0-9]+\\.?|[0-9]*\\.[0-9]+)$/;","","/**"," * <p>Map of localizable strings used by pre-validation.</p>"," * "," * <dl>"," * <dt>validation_error</dt>"," * <dd>Displayed in <code>status_node</code> by <code>notifyErrors()</code> when pre-validation fails.</dd>"," * <dt>required_string</dt>"," * <dd>Displayed when <code>yiv-required</code> fails on an input field.</dd>"," * <dt>required_menu</dt>"," * <dd>Displayed when <code>yiv-required</code> fails on a select element.</dd>"," * <dt>length_too_short, length_too_long, length_out_of_range</dt>"," * <dd>Displayed when <code>yiv-length</code> fails on an input field.</dd>"," * <dt>integer, integer_too_small, integer_too_large, integer_out_of_range</dt>"," * <dd>Displayed when <code>yiv-integer</code> fails on an input field.</dd>"," * <dt>decimal, decimal_too_small, decimal_too_large, decimal_out_of_range</dt>"," * <dd>Displayed when <code>yiv-decimal</code> fails on an input field.</dd>"," * </dl>"," * "," * @property Strings"," * @type {Object}"," * @static"," */","Y.FormManager.Strings =","{","	validation_error:     'Correct errors in the highlighted fields before continuing.',","","	required_string:      'This field requires a value.',","	required_menu:        'This field is required. Choose a value from the pull-down list.',","","	length_too_short:     'Enter text that is at least {min} characters or longer.',","	length_too_long:      'Enter text that is up to {max} characters long.',","	length_out_of_range:  'Enter text that is {min} to {max} characters long.',","","	integer:              'Enter a whole number (no decimal point).',","	integer_too_small:    'Enter a number that is {min} or higher (no decimal point).',","	integer_too_large:    'Enter a number that is {max} or lower (no decimal point).',","	integer_out_of_range: 'Enter a number between or including {min} and {max} (no decimal point).',","","	decimal:              'Enter a number.',","	decimal_too_small:    'Enter a number that is {min} or higher.',","	decimal_too_large:    'Enter a number that is {max} or lower.',","	decimal_out_of_range: 'Enter a number between or including {min} and {max}.'","};","","function hasLimit(","	/* string */	s)","{","	return (!Y.Lang.isUndefined(s) && s.length > 0);","}","","/**"," * Validate an input based on its CSS data."," * "," * @method validateFromCSSData"," * @static"," * @param e {Element|Node} The field to validate."," * @param [msg_list] {Map} Map of message types to custom messages."," * @return {Object} Status"," * <dl>"," * <dt>keepGoing</dt>"," * <dd>(Boolean) <code>true</code> if further validation should be done.</dd>"," * <dt>error</dt>"," * <dd>(String) The error message, if any.</dd>"," * </dl>"," */","Y.FormManager.validateFromCSSData = function(","	/* element */	e,","	/* map */		msg_list)","{","	var Strings = Y.FormManager.Strings;","","	if (e._node)","	{","		e = e._node;","	}","","	var required = Y.DOM.hasClass(e, required_class);","	if (required && e.value === '')","	{","		var msg = null;","		if (msg_list && msg_list.required)","		{","			msg = msg_list.required;","		}","		else if (e.tagName.toLowerCase() == 'select')","		{","			msg = Strings.required_menu;","		}","		else","		{","			msg = Strings.required_string;","		}","		return { keepGoing: false, error: msg };","	}","	else if (!required && e.value === '')","	{","		return { keepGoing: false };","	}","","	if (e.className)","	{","		var m = e.className.match(length_class_re);","		if (m && m.length)","		{","			if (hasLimit(m[1]) && hasLimit(m[2]) &&","				parseInt(m[1], 10) > parseInt(m[2], 10))","			{","				Y.error(e.name+' has min_length > max_length', null, 'FormManager');","			}","","			var msg     = null;","			var has_min = (hasLimit(m[1]) && m[1] !== '0');","			if (has_min && hasLimit(m[2]))","			{","				msg = Strings.length_out_of_range;","			}","			else if (has_min)","			{","				msg = Strings.length_too_short;","			}","			else if (hasLimit(m[2]))","			{","				msg = Strings.length_too_long;","			}","","			if (e.value && hasLimit(m[1]) &&","				e.value.length < parseInt(m[1], 10))","			{","				if (msg_list && msg_list.min_length)","				{","					msg = msg_list.min_length;","				}","				msg = Y.substitute(msg, {min: parseInt(m[1], 10), max: parseInt(m[2], 10)});","				return { keepGoing: false, error: msg };","			}","			if (e.value && hasLimit(m[2]) &&","				e.value.length > parseInt(m[2], 10))","			{","				if (msg_list && msg_list.max_length)","				{","					msg = msg_list.max_length;","				}","				msg = Y.substitute(msg, {min: parseInt(m[1], 10), max: parseInt(m[2], 10)});","				return { keepGoing: false, error: msg };","			}","		}","","		var m = e.className.match(integer_class_re);","		if (m && m.length)","		{","			if (hasLimit(m[1]) && hasLimit(m[2]) &&","				parseInt(m[1], 10) > parseInt(m[2], 10))","			{","				Y.error(e.name+' has min_value > max_value', null, 'FormManager');","			}","","			var value = parseInt(e.value, 10);","			if (e.value &&","				(!Y.FormManager.integer_value_re.test(e.value) ||","				 (hasLimit(m[1]) && value < parseInt(m[1], 10)) ||","				 (hasLimit(m[2]) && value > parseInt(m[2], 10))))","			{","				var msg = null;","				if (msg_list && msg_list.integer)","				{","					msg = msg_list.integer;","				}","				else if (hasLimit(m[1]) && hasLimit(m[2]))","				{","					msg = Strings.integer_out_of_range;","				}","				else if (hasLimit(m[1]))","				{","					msg = Strings.integer_too_small;","				}","				else if (hasLimit(m[2]))","				{","					msg = Strings.integer_too_large;","				}","				else","				{","					msg = Strings.integer;","				}","				msg = Y.substitute(msg, {min: parseInt(m[1], 10), max: parseInt(m[2], 10)});","				return { keepGoing: false, error: msg };","			}","		}","","		var m = e.className.match(decimal_class_re);","		if (m && m.length)","		{","			if (hasLimit(m[1]) && hasLimit(m[2]) &&","				parseFloat(m[1]) > parseFloat(m[2]))","			{","				Y.error(e.name+' has min_value > max_value', null, 'FormManager');","			}","","			var value = parseFloat(e.value);","			if (e.value &&","				(!Y.FormManager.decimal_value_re.test(e.value) ||","				 (hasLimit(m[1]) && value < parseFloat(m[1])) ||","				 (hasLimit(m[2]) && value > parseFloat(m[2]))))","			{","				var msg = null;","				if (msg_list && msg_list.decimal)","				{","					msg = msg_list.decimal;","				}","				else if (hasLimit(m[1]) &&","						 hasLimit(m[2]))","				{","					msg = Strings.decimal_out_of_range;","				}","				else if (hasLimit(m[1]))","				{","					msg = Strings.decimal_too_small;","				}","				else if (hasLimit(m[2]))","				{","					msg = Strings.decimal_too_large;","				}","				else","				{","					msg = Strings.decimal;","				}","				msg = Y.substitute(msg, {min: parseFloat(m[1], 10), max: parseFloat(m[2], 10)});","				return { keepGoing: false, error: msg };","			}","		}","	}","","	return { keepGoing: true };","};","","/**"," * Trim leading and trailing whitespace from the specified fields, except"," * when a field has the CSS class yiv-no-trim."," * "," * @method cleanValues"," * @static"," * @param e {Array} The fields to clean."," * @return {boolean} <code>true</code> if there are any file inputs."," */","Y.FormManager.cleanValues = function(","	/* array */	e)","{","	var has_file_inputs = false;","	for (var i=0; i<e.length; i++)","	{","		var input = e[i];","		var type  = input.type && input.type.toLowerCase();","		if (type == 'file')","		{","			has_file_inputs = true;","		}","		else if (type == 'select-multiple')","		{","			// don't change the value","		}","		else if (input.value && !Y.DOM.hasClass(input, 'yiv-no-trim'))","		{","			input.value = Y.Lang.trim(input.value);","		}","	}","","	return has_file_inputs;","};","","/**"," * <p>Names of supported status values, highest precedence first.</p>"," * "," * <p>This is static because it links to CSS rules that define the"," * appearance of each status type:  .formmgr-has{status}</p>"," * "," * @property status_order"," * @type {Array}"," * @default [ 'error', 'warn', 'success', 'info' ]"," * @static"," */","Y.FormManager.status_order =","[","	'error',","	'warn',","	'success',","	'info'","];","","/**"," * Get the precedence of the given status name."," * "," * @method getStatusPrecedence"," * @static"," * @param status {String} The name of the status value."," * @return {int} The position in the <code>status_order</code> array."," */","Y.FormManager.getStatusPrecedence = function(","	/* string */	status)","{","	for (var i=0; i<Y.FormManager.status_order.length; i++)","	{","		if (status == Y.FormManager.status_order[i])","		{","			return i;","		}","	}","","	return Y.FormManager.status_order.length;","};","","/**"," * Compare two status values."," * "," * @method statusTakesPrecedence"," * @static"," * @param orig_status {String} The name of the original status value."," * @param new_status {String} The name of the new status value."," * @return {boolean} <code>true</code> if <code>new_status</code> takes precedence over <code>orig_status</code>"," */","Y.FormManager.statusTakesPrecedence = function(","	/* string */	orig_status,","	/* string */	new_status)","{","	return (!orig_status || Y.FormManager.getStatusPrecedence(new_status) < Y.FormManager.getStatusPrecedence(orig_status));","};","","","}, '@VERSION@', {\"requires\": [\"substitute\"]});"];
_yuitest_coverage["build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js"].lines = {"1":0,"3":0,"39":0,"43":0,"44":0,"45":0,"46":0,"56":0,"66":0,"90":0,"112":0,"115":0,"133":0,"137":0,"139":0,"141":0,"144":0,"145":0,"147":0,"148":0,"150":0,"152":0,"154":0,"158":0,"160":0,"162":0,"164":0,"167":0,"169":0,"170":0,"172":0,"175":0,"178":0,"179":0,"180":0,"182":0,"184":0,"186":0,"188":0,"190":0,"193":0,"196":0,"198":0,"200":0,"201":0,"203":0,"206":0,"208":0,"210":0,"211":0,"215":0,"216":0,"218":0,"221":0,"224":0,"225":0,"230":0,"231":0,"233":0,"235":0,"237":0,"239":0,"241":0,"243":0,"245":0,"249":0,"251":0,"252":0,"256":0,"257":0,"259":0,"262":0,"265":0,"266":0,"271":0,"272":0,"274":0,"276":0,"279":0,"281":0,"283":0,"285":0,"287":0,"291":0,"293":0,"294":0,"299":0,"311":0,"314":0,"315":0,"317":0,"318":0,"319":0,"321":0,"323":0,"327":0,"329":0,"333":0,"347":0,"363":0,"366":0,"368":0,"370":0,"374":0,"386":0,"390":0};
_yuitest_coverage["build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js"].functions = {"hasLimit:112":0,"validateFromCSSData:133":0,"cleanValues:311":0,"getStatusPrecedence:363":0,"statusTakesPrecedence:386":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js"].coveredLines = 106;
_yuitest_coverage["build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js"].coveredFunctions = 6;
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 1);
YUI.add('gallery-formmgr-css-validation', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 3);
"use strict";

/**********************************************************************
 * <p>FormManager CSS Validation provides basic functionality for
 * pre-validating user input based on CSS classes set on form elements.</p>
 *
 * <p>The following classes can be applied to a form element for
 * pre-validation:</p>
 *
 * <dl>
 * <dt><code>yiv-required</code></dt>
 * <dd>Value must not be empty.</dd>
 *
 * <dt><code>yiv-length:[x,y]</code></dt>
 * <dd>String must be at least x characters and at most y characters.
 * At least one of x and y must be specified.</dd>
 *
 * <dt><code>yiv-integer:[x,y]</code></dt>
 * <dd>The integer value must be at least x and at most y.
 * x and y are both optional.</dd>
 *
 * <dt><code>yiv-decimal:[x,y]</code></dt>
 * <dd>The decimal value must be at least x and at most y.  Exponents are
 * not allowed.  x and y are both optional.</dd>
 * </dl>
 *
 * <p>If we ever need to allow exponents, we can use yiv-float.</p>
 *
 * @module gallery-formmgr
 * @submodule gallery-formmgr-css-validation
 */

/**
 * @class FormManager
 */

_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 39);
Y.namespace('FormManager');

// pre-validation classes

_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 43);
var required_class    = 'yiv-required';
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 44);
var length_class_re   = /(?:^|\s+)yiv-length:\[([0-9]+)?,([1-9][0-9]*)?\](?:\s+|$)/;
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 45);
var integer_class_re  = /(?:^|\s+)yiv-integer(?::\[([-+]?[0-9]+)?,([-+]?[0-9]+)?\])?(?:\s+|$)/;
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 46);
var decimal_class_re  = /(?:^|\s+)yiv-decimal(?::\[([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?,([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?\])?(?:\s+|$)/;

/**
 * Regular expression used to determine if a value is an integer.
 * This can be localized, e.g., allow for thousands separator.
 * 
 * @property integer_value_re
 * @type {RegExp}
 * @static
 */
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 56);
Y.FormManager.integer_value_re = /^[-+]?[0-9]+$/;

/**
 * Regular expression used to determine if a value is a decimal number.
 * This can be localized, e.g., use the correct decimal separator.
 * 
 * @property decimal_value_re
 * @type {RegExp}
 * @static
 */
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 66);
Y.FormManager.decimal_value_re = /^[-+]?(?:[0-9]+\.?|[0-9]*\.[0-9]+)$/;

/**
 * <p>Map of localizable strings used by pre-validation.</p>
 * 
 * <dl>
 * <dt>validation_error</dt>
 * <dd>Displayed in <code>status_node</code> by <code>notifyErrors()</code> when pre-validation fails.</dd>
 * <dt>required_string</dt>
 * <dd>Displayed when <code>yiv-required</code> fails on an input field.</dd>
 * <dt>required_menu</dt>
 * <dd>Displayed when <code>yiv-required</code> fails on a select element.</dd>
 * <dt>length_too_short, length_too_long, length_out_of_range</dt>
 * <dd>Displayed when <code>yiv-length</code> fails on an input field.</dd>
 * <dt>integer, integer_too_small, integer_too_large, integer_out_of_range</dt>
 * <dd>Displayed when <code>yiv-integer</code> fails on an input field.</dd>
 * <dt>decimal, decimal_too_small, decimal_too_large, decimal_out_of_range</dt>
 * <dd>Displayed when <code>yiv-decimal</code> fails on an input field.</dd>
 * </dl>
 * 
 * @property Strings
 * @type {Object}
 * @static
 */
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 90);
Y.FormManager.Strings =
{
	validation_error:     'Correct errors in the highlighted fields before continuing.',

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

_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 112);
function hasLimit(
	/* string */	s)
{
	_yuitest_coverfunc("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", "hasLimit", 112);
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 115);
return (!Y.Lang.isUndefined(s) && s.length > 0);
}

/**
 * Validate an input based on its CSS data.
 * 
 * @method validateFromCSSData
 * @static
 * @param e {Element|Node} The field to validate.
 * @param [msg_list] {Map} Map of message types to custom messages.
 * @return {Object} Status
 * <dl>
 * <dt>keepGoing</dt>
 * <dd>(Boolean) <code>true</code> if further validation should be done.</dd>
 * <dt>error</dt>
 * <dd>(String) The error message, if any.</dd>
 * </dl>
 */
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 133);
Y.FormManager.validateFromCSSData = function(
	/* element */	e,
	/* map */		msg_list)
{
	_yuitest_coverfunc("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", "validateFromCSSData", 133);
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 137);
var Strings = Y.FormManager.Strings;

	_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 139);
if (e._node)
	{
		_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 141);
e = e._node;
	}

	_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 144);
var required = Y.DOM.hasClass(e, required_class);
	_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 145);
if (required && e.value === '')
	{
		_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 147);
var msg = null;
		_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 148);
if (msg_list && msg_list.required)
		{
			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 150);
msg = msg_list.required;
		}
		else {_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 152);
if (e.tagName.toLowerCase() == 'select')
		{
			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 154);
msg = Strings.required_menu;
		}
		else
		{
			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 158);
msg = Strings.required_string;
		}}
		_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 160);
return { keepGoing: false, error: msg };
	}
	else {_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 162);
if (!required && e.value === '')
	{
		_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 164);
return { keepGoing: false };
	}}

	_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 167);
if (e.className)
	{
		_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 169);
var m = e.className.match(length_class_re);
		_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 170);
if (m && m.length)
		{
			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 172);
if (hasLimit(m[1]) && hasLimit(m[2]) &&
				parseInt(m[1], 10) > parseInt(m[2], 10))
			{
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 175);
Y.error(e.name+' has min_length > max_length', null, 'FormManager');
			}

			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 178);
var msg     = null;
			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 179);
var has_min = (hasLimit(m[1]) && m[1] !== '0');
			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 180);
if (has_min && hasLimit(m[2]))
			{
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 182);
msg = Strings.length_out_of_range;
			}
			else {_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 184);
if (has_min)
			{
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 186);
msg = Strings.length_too_short;
			}
			else {_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 188);
if (hasLimit(m[2]))
			{
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 190);
msg = Strings.length_too_long;
			}}}

			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 193);
if (e.value && hasLimit(m[1]) &&
				e.value.length < parseInt(m[1], 10))
			{
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 196);
if (msg_list && msg_list.min_length)
				{
					_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 198);
msg = msg_list.min_length;
				}
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 200);
msg = Y.substitute(msg, {min: parseInt(m[1], 10), max: parseInt(m[2], 10)});
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 201);
return { keepGoing: false, error: msg };
			}
			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 203);
if (e.value && hasLimit(m[2]) &&
				e.value.length > parseInt(m[2], 10))
			{
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 206);
if (msg_list && msg_list.max_length)
				{
					_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 208);
msg = msg_list.max_length;
				}
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 210);
msg = Y.substitute(msg, {min: parseInt(m[1], 10), max: parseInt(m[2], 10)});
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 211);
return { keepGoing: false, error: msg };
			}
		}

		_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 215);
var m = e.className.match(integer_class_re);
		_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 216);
if (m && m.length)
		{
			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 218);
if (hasLimit(m[1]) && hasLimit(m[2]) &&
				parseInt(m[1], 10) > parseInt(m[2], 10))
			{
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 221);
Y.error(e.name+' has min_value > max_value', null, 'FormManager');
			}

			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 224);
var value = parseInt(e.value, 10);
			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 225);
if (e.value &&
				(!Y.FormManager.integer_value_re.test(e.value) ||
				 (hasLimit(m[1]) && value < parseInt(m[1], 10)) ||
				 (hasLimit(m[2]) && value > parseInt(m[2], 10))))
			{
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 230);
var msg = null;
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 231);
if (msg_list && msg_list.integer)
				{
					_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 233);
msg = msg_list.integer;
				}
				else {_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 235);
if (hasLimit(m[1]) && hasLimit(m[2]))
				{
					_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 237);
msg = Strings.integer_out_of_range;
				}
				else {_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 239);
if (hasLimit(m[1]))
				{
					_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 241);
msg = Strings.integer_too_small;
				}
				else {_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 243);
if (hasLimit(m[2]))
				{
					_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 245);
msg = Strings.integer_too_large;
				}
				else
				{
					_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 249);
msg = Strings.integer;
				}}}}
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 251);
msg = Y.substitute(msg, {min: parseInt(m[1], 10), max: parseInt(m[2], 10)});
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 252);
return { keepGoing: false, error: msg };
			}
		}

		_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 256);
var m = e.className.match(decimal_class_re);
		_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 257);
if (m && m.length)
		{
			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 259);
if (hasLimit(m[1]) && hasLimit(m[2]) &&
				parseFloat(m[1]) > parseFloat(m[2]))
			{
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 262);
Y.error(e.name+' has min_value > max_value', null, 'FormManager');
			}

			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 265);
var value = parseFloat(e.value);
			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 266);
if (e.value &&
				(!Y.FormManager.decimal_value_re.test(e.value) ||
				 (hasLimit(m[1]) && value < parseFloat(m[1])) ||
				 (hasLimit(m[2]) && value > parseFloat(m[2]))))
			{
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 271);
var msg = null;
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 272);
if (msg_list && msg_list.decimal)
				{
					_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 274);
msg = msg_list.decimal;
				}
				else {_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 276);
if (hasLimit(m[1]) &&
						 hasLimit(m[2]))
				{
					_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 279);
msg = Strings.decimal_out_of_range;
				}
				else {_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 281);
if (hasLimit(m[1]))
				{
					_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 283);
msg = Strings.decimal_too_small;
				}
				else {_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 285);
if (hasLimit(m[2]))
				{
					_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 287);
msg = Strings.decimal_too_large;
				}
				else
				{
					_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 291);
msg = Strings.decimal;
				}}}}
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 293);
msg = Y.substitute(msg, {min: parseFloat(m[1], 10), max: parseFloat(m[2], 10)});
				_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 294);
return { keepGoing: false, error: msg };
			}
		}
	}

	_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 299);
return { keepGoing: true };
};

/**
 * Trim leading and trailing whitespace from the specified fields, except
 * when a field has the CSS class yiv-no-trim.
 * 
 * @method cleanValues
 * @static
 * @param e {Array} The fields to clean.
 * @return {boolean} <code>true</code> if there are any file inputs.
 */
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 311);
Y.FormManager.cleanValues = function(
	/* array */	e)
{
	_yuitest_coverfunc("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", "cleanValues", 311);
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 314);
var has_file_inputs = false;
	_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 315);
for (var i=0; i<e.length; i++)
	{
		_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 317);
var input = e[i];
		_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 318);
var type  = input.type && input.type.toLowerCase();
		_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 319);
if (type == 'file')
		{
			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 321);
has_file_inputs = true;
		}
		else {_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 323);
if (type == 'select-multiple')
		{
			// don't change the value
		}
		else {_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 327);
if (input.value && !Y.DOM.hasClass(input, 'yiv-no-trim'))
		{
			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 329);
input.value = Y.Lang.trim(input.value);
		}}}
	}

	_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 333);
return has_file_inputs;
};

/**
 * <p>Names of supported status values, highest precedence first.</p>
 * 
 * <p>This is static because it links to CSS rules that define the
 * appearance of each status type:  .formmgr-has{status}</p>
 * 
 * @property status_order
 * @type {Array}
 * @default [ 'error', 'warn', 'success', 'info' ]
 * @static
 */
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 347);
Y.FormManager.status_order =
[
	'error',
	'warn',
	'success',
	'info'
];

/**
 * Get the precedence of the given status name.
 * 
 * @method getStatusPrecedence
 * @static
 * @param status {String} The name of the status value.
 * @return {int} The position in the <code>status_order</code> array.
 */
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 363);
Y.FormManager.getStatusPrecedence = function(
	/* string */	status)
{
	_yuitest_coverfunc("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", "getStatusPrecedence", 363);
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 366);
for (var i=0; i<Y.FormManager.status_order.length; i++)
	{
		_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 368);
if (status == Y.FormManager.status_order[i])
		{
			_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 370);
return i;
		}
	}

	_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 374);
return Y.FormManager.status_order.length;
};

/**
 * Compare two status values.
 * 
 * @method statusTakesPrecedence
 * @static
 * @param orig_status {String} The name of the original status value.
 * @param new_status {String} The name of the new status value.
 * @return {boolean} <code>true</code> if <code>new_status</code> takes precedence over <code>orig_status</code>
 */
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 386);
Y.FormManager.statusTakesPrecedence = function(
	/* string */	orig_status,
	/* string */	new_status)
{
	_yuitest_coverfunc("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", "statusTakesPrecedence", 386);
_yuitest_coverline("build/gallery-formmgr-css-validation/gallery-formmgr-css-validation.js", 390);
return (!orig_status || Y.FormManager.getStatusPrecedence(new_status) < Y.FormManager.getStatusPrecedence(orig_status));
};


}, '@VERSION@', {"requires": ["substitute"]});
