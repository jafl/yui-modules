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
_yuitest_coverage["build/gallery-exprbuilder/gallery-exprbuilder.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-exprbuilder/gallery-exprbuilder.js",
    code: []
};
_yuitest_coverage["build/gallery-exprbuilder/gallery-exprbuilder.js"].code=["YUI.add('gallery-exprbuilder', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-exprbuilder"," */","","/**"," * Widget which helps user to build a query expression."," * "," * @main gallery-exprbuilder"," * @class ExpressionBuilder"," * @extends Widget"," * @constructor"," * @param config {Object} Widget configuration"," */","function ExpressionBuilder(config)","{","	ExpressionBuilder.superclass.constructor.call(this, config);","}","","ExpressionBuilder.NAME = \"exprbuilder\";","","ExpressionBuilder.ATTRS =","{","	/**","	 * The id of the textarea form field.","	 * ","	 * @attribute fieldId","	 * @type {String}","	 * @default Y.guid()","	 * @writeonce","	 */","	fieldId:","	{","		value:     Y.guid(),","		validator: Y.Lang.isString,","		writeOnce: true","	},","","	/**","	 * The name of the textarea form field.","	 * ","	 * @attribute fieldName","	 * @type {String}","	 * @default \"\"","	 * @writeonce","	 */","	fieldName:","	{","		value:     '',","		validator: Y.Lang.isString,","		writeOnce: true","	},","","	/**","	 * The FormManager to use when validating the constructed expression.","	 * ","	 * @attribute formMgr","	 * @type {Y.FormManager}","	 * @default null","	 * @writeonce","	 */","	formMgr:","	{","		validator: function(o) { return (!o || o instanceof Y.FormManager); },","		writeOnce: true","	},","","	/**","	 * The QueryBuilder to help the user construct the expression.  The","	 * widget must not be rendered.  For each variable type, the values of","	 * the configured operations must be the pattern to be inserted into","	 * the expression. {value} will be replaced by the value entered by the","	 * user.","	 * ","	 * @attribute queryBuilder","	 * @type {Y.QueryBuilder}","	 * @default null","	 * @required","	 * @writeonce","	 */","	queryBuilder:","	{","		validator: function(o) { return (!o || o instanceof Y.QueryBuilder); },","		writeOnce: true","	},","","	/**","	 * A map of QueryBuilder operators to objects defining","	 * {operator,pattern}.  This is needed if a variable type generates","	 * multiple values, and the values must be combined with something","	 * other than AND.","	 * ","	 * @attribute combinatorMap","	 * @type {Object}","	 * @default null","	 */","	combinatorMap:","	{","		validator: Y.Lang.isObject","	},","","	/**","	 * The label for the Insert Parentheses button.","	 * ","	 * @attribute parenLabel","	 * @type {String}","	 * @default \"()\"","	 * @writeonce","	 */","	parenLabel:","	{","		value:     '()',","		validator: Y.Lang.isString,","		writeOnce: true","	},","","	/**","	 * The label for the AND button.","	 * ","	 * @attribute andLabel","	 * @type {String}","	 * @default \"AND\"","	 * @writeonce","	 */","	andLabel:","	{","		value:     'AND',","		validator: Y.Lang.isString,","		writeOnce: true","	},","","	/**","	 * The label for the OR button.","	 * ","	 * @attribute orLabel","	 * @type {String}","	 * @default \"OR\"","	 * @writeonce","	 */","	orLabel:","	{","		value:     'OR',","		validator: Y.Lang.isString,","		writeOnce: true","	},","","	/**","	 * The label for the NOT button.","	 * ","	 * @attribute notLabel","	 * @type {String}","	 * @default \"NOT\"","	 * @writeonce","	 */","	notLabel:","	{","		value:     'NOT',","		validator: Y.Lang.isString,","		writeOnce: true","	},","","	/**","	 * The label for the Clear button.","	 * ","	 * @attribute clearLabel","	 * @type {String}","	 * @default \"Clear\"","	 * @writeonce","	 */","	clearLabel:","	{","		value:     'Clear',","		validator: Y.Lang.isString,","		writeOnce: true","	},","","	/**","	 * The label for the Insert button.","	 * ","	 * @attribute insertLabel","	 * @type {String}","	 * @default \"Insert\"","	 * @writeonce","	 */","	insertLabel:","	{","		value:     'Insert',","		validator: Y.Lang.isString,","		writeOnce: true","	},","","	/**","	 * The label for the Reset button.","	 * ","	 * @attribute resetLabel","	 * @type {String}","	 * @default \"Cancel\"","	 * @writeonce","	 */","	resetLabel:","	{","		value:     'Cancel',","		validator: Y.Lang.isString,","		writeOnce: true","	},","","	/**","	 * The error message for an unclosed parenthesis. <q>context</q> is","	 * replaced by the portion of the expression that generated the error.","	 * ","	 * @attribute tooManyParensError","	 * @type {String}","	 * @default 'The expression contains an extra closing parenthesis at \"{context}\".'","	 */","	tooManyParensError:","	{","		value:     'The expression contains an extra closing parenthesis at \"{context}...\".',","		validator: Y.Lang.isString","	},","","	/**","	 * The error message for an unmatched single quote.","	 * ","	 * @attribute unmatchedSingleQuoteError","	 * @type {String}","	 * @default 'The expression contains an unmatched single quote.'","	 */","	unmatchedSingleQuoteError:","	{","		value:     'The expression contains an unmatched single quote at \"{context}...\".',","		validator: Y.Lang.isString","	},","","	/**","	 * The error message for an unclosed parenthesis.","	 * ","	 * @attribute unclosedParenError","	 * @type {String}","	 * @default 'The expression contains an unclosed parenthesis.'","	 */","	unclosedParenError:","	{","		value:     'The expression contains an unclosed parenthesis at \"{context}...\".',","		validator: Y.Lang.isString","	},","","	/**","	 * The error message when the user forgets to select a variable for","	 * insertion.","	 * ","	 * @attribute noVariableSelectedError","	 * @type {String}","	 * @default 'Please choose a variable.'","	 */","	noVariableSelectedError:","	{","		value:     'Please choose a variable.',","		validator: Y.Lang.isString","	}","};","","function updateIERange()","{","	this.ie_range = document.selection.createRange();","}","","function insertText(text, offset)","{","	offset = offset || text.length;","","	this.field.focus();","	var el = Y.Node.getDOMNode(this.field);","","	if (el.setSelectionRange)		// For Mozilla/WebKit","	{","		var start = el.selectionStart;","		el.value =","			el.value.substring(0, start) +","			text +","			el.value.substring(el.selectionEnd, el.value.length);","","		var index = start + offset;","		el.setSelectionRange(index, index);","	}","	else if (document.selection)	// For IE","	{","		if (!this.ie_range)","		{","			this.ie_range = document.selection.createRange();","		}","","		var r  = this.ie_range.duplicate();","		r.text = text;","","		this.ie_range.move('character', offset);","		this.ie_range.select();","	}","}","","function paren(e)","{","	insertText.call(this, '()', 1);","	e.halt();","}","","function handler(key)","{","	return function(e)","	{","		insertText.call(this, ' ' + this.get(key+'Label') + ' ');","		e.halt();","	};","}","","function clear(e)","{","	this.clear();","	e.halt();","}","","function insertQB(e)","{","	var qb = this.get('queryBuilder');","	if (!qb.validateFields())","	{","		e.halt();","		return;","	}","","	var query = qb.toDatabaseQuery();","	if (query.length === 0)","	{","		var el = qb.get('contentBox').one('select');","		qb.displayFieldMessage(el, this.get('noVariableSelectedError'), 'error');","		e.halt();","		return;","	}","","	var map = this.get('combinatorMap');","","	var s     = '';","	var op    = ' ' + this.get('andLabel') + ' ';","	for (var i=0; i<query.length; i++)","	{","		var q = query[i];","","		if (i > 0)","		{","			s += op;","		}","		s += q[0];","","		var pattern = q[1];","		if (pattern.indexOf('{') == -1)","		{","			pattern += '{value}';","		}","","		var combinator = map && map[ q[1] ];","		if (combinator)","		{","			op      = combinator.operator;","			pattern = combinator.pattern;","		}","","		s += Y.Lang.substitute(pattern,","		{","			value: q[2].replace(/'/g, '\\\\\\'')","		});","	}","","	insertText.call(this, s);","	qb.reset();","	e.halt();","}","","function resetQB(e)","{","	this.get('queryBuilder').reset();","","	if (e)","	{","		e.halt();","	}","}","","function setValidation(f)","{","	if (!f)","	{","		return;","	}","","	var self = this;","","	var orig_validateForm = f.validateForm;","	f.validateForm = function()","	{","		resetQB.call(self);","		orig_validateForm.apply(this, arguments);","	};","","	f.setFunction(this.get('fieldId'), function(form, e)","	{","		return self._validateExpression(form, e, this);","	});","}","","Y.extend(ExpressionBuilder, Y.Widget,","{","	initializer: function(config)","	{","		// FormManager","","		setValidation.call(this, config.formMgr);","		this.after('formMgrChange', function(e)","		{","			if (e.prevVal)","			{","				e.prevVal.setFunction(this.get('fieldId'), null);","			}","","			setValidation.call(this, e.newVal);","		});","	},","","	renderUI: function()","	{","		var container = this.get('contentBox');","		container.set('innerHTML', this._field());","","		// textarea","","		this.field = container.one('#'+this.get('fieldId'));","","		if (document.selection)","		{","			this.field.on('change', updateIERange, this);","		}","","		// basic controls","","		container.one('.'+this.getClassName('paren')).on('click', paren, this);","","		var op = [ 'and', 'or', 'not' ];","		for (var i=0; i<op.length; i++)","		{","			container.one('.'+this.getClassName(op[i])).on('click', handler(op[i]), this);","		}","","		container.one('.'+this.getClassName('clear')).on('click', clear, this);","","		// QueryBuilder","","		var qb = this.get('queryBuilder');","		if (qb)","		{","			container.appendChild(Y.Node.create(this._query()));","","			qb.render(container.one('.'+this.getClassName('querybuilder')));","","			container.one('.'+this.getClassName('insert')).on('click', insertQB, this);","			container.one('.'+this.getClassName('reset')).on('click', resetQB, this);","		}","	},","","	destructor: function()","	{","		var qb = this.get('queryBuilder');","		if (qb)","		{","			qb.destroy();","		}","","		this.ie_range = null;","	},","","	/**","	 * Clears the expression.","	 * ","	 * @method clear","	 */","	clear: function()","	{","		this.field.set('value', '');","		this.field.focus();","	},","","	/**","	 * Validate the expression.","	 * ","	 * @method _validateExpression","	 * @protected","	 * @return {Boolean} <code>true</code> if the expression has balanced parens and single quotes","	 */","	_validateExpression: function(form, e, form_mgr)","	{","		var s     = e.get('value');","		var paren = 0;","		var pi    = -1;","		var quote = false;","		var qi    = -1;","		for (var i=0; i<s.length; i++)","		{","			var c = s.charAt(i);","			if (!quote && c == '(')","			{","				if (paren === 0)","				{","					pi = i;","				}","				paren++;","			}","			else if (!quote && c == ')')","			{","				paren--;","				if (paren < 0)","				{","					var msg = Y.Lang.substitute(this.get('tooManyParensError'),","					{","						context: s.substr(0,i+1)","					});","					form_mgr.displayMessage(e, msg, 'error');","					return false;","				}","			}","			else if (c == '\\'' && (i === 0 || s.charAt(i-1) != '\\\\'))","			{","				if (!quote)","				{","					qi = i;","				}","				quote = ! quote;","			}","		}","","		if (quote && (paren === 0 || qi < pi))","		{","			var msg = Y.Lang.substitute(this.get('unmatchedSingleQuoteError'),","			{","				context: s.substr(0,qi+1)","			});","			form_mgr.displayMessage(e, msg, 'error');","			return false;","		}","		else if (paren > 0)","		{","			var msg = Y.Lang.substitute(this.get('unclosedParenError'),","			{","				context: s.substr(0,pi+1)","			});","			form_mgr.displayMessage(e, msg, 'error');","			return false;","		}","","		return true;","	},","","	//","	// Markup","	//","","	/**","	 * @method _field","	 * @protected","	 * @return {String} markup for the textarea and basic buttons","	 */","	_field: function()","	{","		var markup =","			'<div class=\"{td}\">' +","				'<textarea id=\"{tid}\" name=\"{tn}\" class=\"{ff} {ta}\"></textarea>' +","			'</div>' +","			'<div class=\"{fctl}\">' +","				'<button class=\"yui3-button {pc}\">{paren}</button>' +","				'<button class=\"yui3-button {ac}\">{and}</button>' +","				'<button class=\"yui3-button {oc}\">{or}</button>' +","				'<button class=\"yui3-button {nc}\">{not}</button>' +","				'<button class=\"yui3-button {cc}\">{clear}</button>' +","			'</div>';","","		return Y.Lang.substitute(markup,","		{","			td:     this.getClassName('field-container'),","			ff:     Y.FormManager.field_marker_class,","			ta:     this.getClassName('field'),","			tid:    this.get('fieldId'),","			tn:     this.get('fieldName'),","			fctl:   this.getClassName('controls'),","			pc:     this.getClassName('paren'),","			ac:     this.getClassName('and'),","			oc:     this.getClassName('or'),","			nc:     this.getClassName('not'),","			cc:     this.getClassName('clear'),","			paren:  this.get('parenLabel'),","			and:    this.get('andLabel'),","			or:     this.get('orLabel'),","			not:    this.get('notLabel'),","			clear:  this.get('clearLabel')","		});","	},","","	/**","	 * @method _query","	 * @protected","	 * @return {String} markup for the QueryBuilder","	 */","	_query: function()","	{","		var markup =","			'<div class=\"{qb}\"></div>' +","			'<div class=\"{qbctl} {fr}\">' +","				'<button class=\"yui3-button {ic}\">{insert}</button>' +","				'<button class=\"yui3-button {rc}\">{reset}</button>' +","			'</div>';","","		return Y.Lang.substitute(markup,","		{","			qb:     this.getClassName('querybuilder'),","			qbctl:  this.getClassName('querybuilder-controls'),","			fr:     Y.FormManager.row_marker_class,","			ic:     this.getClassName('insert'),","			rc:     this.getClassName('reset'),","			insert: this.get('insertLabel'),","			reset:  this.get('resetLabel')","		});","	}","});","","Y.ExpressionBuilder = ExpressionBuilder;","","","}, '@VERSION@', {\"skinnable\": \"true\", \"requires\": [\"gallery-querybuilder\", \"gallery-formmgr\"]});"];
_yuitest_coverage["build/gallery-exprbuilder/gallery-exprbuilder.js"].lines = {"1":0,"3":0,"18":0,"20":0,"23":0,"25":0,"67":0,"86":0,"265":0,"267":0,"270":0,"272":0,"274":0,"275":0,"277":0,"279":0,"280":0,"285":0,"286":0,"288":0,"290":0,"292":0,"295":0,"296":0,"298":0,"299":0,"303":0,"305":0,"306":0,"309":0,"311":0,"313":0,"314":0,"318":0,"320":0,"321":0,"324":0,"326":0,"327":0,"329":0,"330":0,"333":0,"334":0,"336":0,"337":0,"338":0,"339":0,"342":0,"344":0,"345":0,"346":0,"348":0,"350":0,"352":0,"354":0,"356":0,"357":0,"359":0,"362":0,"363":0,"365":0,"366":0,"369":0,"375":0,"376":0,"377":0,"380":0,"382":0,"384":0,"386":0,"390":0,"392":0,"394":0,"397":0,"399":0,"400":0,"402":0,"403":0,"406":0,"408":0,"412":0,"418":0,"419":0,"421":0,"423":0,"426":0,"432":0,"433":0,"437":0,"439":0,"441":0,"446":0,"448":0,"449":0,"451":0,"454":0,"458":0,"459":0,"461":0,"463":0,"465":0,"466":0,"472":0,"473":0,"475":0,"478":0,"488":0,"489":0,"501":0,"502":0,"503":0,"504":0,"505":0,"506":0,"508":0,"509":0,"511":0,"513":0,"515":0,"517":0,"519":0,"520":0,"522":0,"526":0,"527":0,"530":0,"532":0,"534":0,"536":0,"540":0,"542":0,"546":0,"547":0,"549":0,"551":0,"555":0,"556":0,"559":0,"573":0,"585":0,"613":0,"620":0,"633":0};
_yuitest_coverage["build/gallery-exprbuilder/gallery-exprbuilder.js"].functions = {"ExpressionBuilder:18":0,"validator:67":0,"validator:86":0,"updateIERange:265":0,"insertText:270":0,"paren:303":0,"(anonymous 2):311":0,"handler:309":0,"clear:318":0,"insertQB:324":0,"resetQB:380":0,"validateForm:400":0,"(anonymous 3):406":0,"setValidation:390":0,"(anonymous 4):419":0,"initializer:414":0,"renderUI:430":0,"destructor:470":0,"clear:486":0,"_validateExpression:499":0,"_field:571":0,"_query:611":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-exprbuilder/gallery-exprbuilder.js"].coveredLines = 143;
_yuitest_coverage["build/gallery-exprbuilder/gallery-exprbuilder.js"].coveredFunctions = 23;
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 1);
YUI.add('gallery-exprbuilder', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 3);
"use strict";

/**
 * @module gallery-exprbuilder
 */

/**
 * Widget which helps user to build a query expression.
 * 
 * @main gallery-exprbuilder
 * @class ExpressionBuilder
 * @extends Widget
 * @constructor
 * @param config {Object} Widget configuration
 */
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 18);
function ExpressionBuilder(config)
{
	_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "ExpressionBuilder", 18);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 20);
ExpressionBuilder.superclass.constructor.call(this, config);
}

_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 23);
ExpressionBuilder.NAME = "exprbuilder";

_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 25);
ExpressionBuilder.ATTRS =
{
	/**
	 * The id of the textarea form field.
	 * 
	 * @attribute fieldId
	 * @type {String}
	 * @default Y.guid()
	 * @writeonce
	 */
	fieldId:
	{
		value:     Y.guid(),
		validator: Y.Lang.isString,
		writeOnce: true
	},

	/**
	 * The name of the textarea form field.
	 * 
	 * @attribute fieldName
	 * @type {String}
	 * @default ""
	 * @writeonce
	 */
	fieldName:
	{
		value:     '',
		validator: Y.Lang.isString,
		writeOnce: true
	},

	/**
	 * The FormManager to use when validating the constructed expression.
	 * 
	 * @attribute formMgr
	 * @type {Y.FormManager}
	 * @default null
	 * @writeonce
	 */
	formMgr:
	{
		validator: function(o) { _yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "validator", 67);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 67);
return (!o || o instanceof Y.FormManager); },
		writeOnce: true
	},

	/**
	 * The QueryBuilder to help the user construct the expression.  The
	 * widget must not be rendered.  For each variable type, the values of
	 * the configured operations must be the pattern to be inserted into
	 * the expression. {value} will be replaced by the value entered by the
	 * user.
	 * 
	 * @attribute queryBuilder
	 * @type {Y.QueryBuilder}
	 * @default null
	 * @required
	 * @writeonce
	 */
	queryBuilder:
	{
		validator: function(o) { _yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "validator", 86);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 86);
return (!o || o instanceof Y.QueryBuilder); },
		writeOnce: true
	},

	/**
	 * A map of QueryBuilder operators to objects defining
	 * {operator,pattern}.  This is needed if a variable type generates
	 * multiple values, and the values must be combined with something
	 * other than AND.
	 * 
	 * @attribute combinatorMap
	 * @type {Object}
	 * @default null
	 */
	combinatorMap:
	{
		validator: Y.Lang.isObject
	},

	/**
	 * The label for the Insert Parentheses button.
	 * 
	 * @attribute parenLabel
	 * @type {String}
	 * @default "()"
	 * @writeonce
	 */
	parenLabel:
	{
		value:     '()',
		validator: Y.Lang.isString,
		writeOnce: true
	},

	/**
	 * The label for the AND button.
	 * 
	 * @attribute andLabel
	 * @type {String}
	 * @default "AND"
	 * @writeonce
	 */
	andLabel:
	{
		value:     'AND',
		validator: Y.Lang.isString,
		writeOnce: true
	},

	/**
	 * The label for the OR button.
	 * 
	 * @attribute orLabel
	 * @type {String}
	 * @default "OR"
	 * @writeonce
	 */
	orLabel:
	{
		value:     'OR',
		validator: Y.Lang.isString,
		writeOnce: true
	},

	/**
	 * The label for the NOT button.
	 * 
	 * @attribute notLabel
	 * @type {String}
	 * @default "NOT"
	 * @writeonce
	 */
	notLabel:
	{
		value:     'NOT',
		validator: Y.Lang.isString,
		writeOnce: true
	},

	/**
	 * The label for the Clear button.
	 * 
	 * @attribute clearLabel
	 * @type {String}
	 * @default "Clear"
	 * @writeonce
	 */
	clearLabel:
	{
		value:     'Clear',
		validator: Y.Lang.isString,
		writeOnce: true
	},

	/**
	 * The label for the Insert button.
	 * 
	 * @attribute insertLabel
	 * @type {String}
	 * @default "Insert"
	 * @writeonce
	 */
	insertLabel:
	{
		value:     'Insert',
		validator: Y.Lang.isString,
		writeOnce: true
	},

	/**
	 * The label for the Reset button.
	 * 
	 * @attribute resetLabel
	 * @type {String}
	 * @default "Cancel"
	 * @writeonce
	 */
	resetLabel:
	{
		value:     'Cancel',
		validator: Y.Lang.isString,
		writeOnce: true
	},

	/**
	 * The error message for an unclosed parenthesis. <q>context</q> is
	 * replaced by the portion of the expression that generated the error.
	 * 
	 * @attribute tooManyParensError
	 * @type {String}
	 * @default 'The expression contains an extra closing parenthesis at "{context}".'
	 */
	tooManyParensError:
	{
		value:     'The expression contains an extra closing parenthesis at "{context}...".',
		validator: Y.Lang.isString
	},

	/**
	 * The error message for an unmatched single quote.
	 * 
	 * @attribute unmatchedSingleQuoteError
	 * @type {String}
	 * @default 'The expression contains an unmatched single quote.'
	 */
	unmatchedSingleQuoteError:
	{
		value:     'The expression contains an unmatched single quote at "{context}...".',
		validator: Y.Lang.isString
	},

	/**
	 * The error message for an unclosed parenthesis.
	 * 
	 * @attribute unclosedParenError
	 * @type {String}
	 * @default 'The expression contains an unclosed parenthesis.'
	 */
	unclosedParenError:
	{
		value:     'The expression contains an unclosed parenthesis at "{context}...".',
		validator: Y.Lang.isString
	},

	/**
	 * The error message when the user forgets to select a variable for
	 * insertion.
	 * 
	 * @attribute noVariableSelectedError
	 * @type {String}
	 * @default 'Please choose a variable.'
	 */
	noVariableSelectedError:
	{
		value:     'Please choose a variable.',
		validator: Y.Lang.isString
	}
};

_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 265);
function updateIERange()
{
	_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "updateIERange", 265);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 267);
this.ie_range = document.selection.createRange();
}

_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 270);
function insertText(text, offset)
{
	_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "insertText", 270);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 272);
offset = offset || text.length;

	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 274);
this.field.focus();
	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 275);
var el = Y.Node.getDOMNode(this.field);

	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 277);
if (el.setSelectionRange)		// For Mozilla/WebKit
	{
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 279);
var start = el.selectionStart;
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 280);
el.value =
			el.value.substring(0, start) +
			text +
			el.value.substring(el.selectionEnd, el.value.length);

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 285);
var index = start + offset;
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 286);
el.setSelectionRange(index, index);
	}
	else {_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 288);
if (document.selection)	// For IE
	{
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 290);
if (!this.ie_range)
		{
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 292);
this.ie_range = document.selection.createRange();
		}

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 295);
var r  = this.ie_range.duplicate();
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 296);
r.text = text;

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 298);
this.ie_range.move('character', offset);
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 299);
this.ie_range.select();
	}}
}

_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 303);
function paren(e)
{
	_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "paren", 303);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 305);
insertText.call(this, '()', 1);
	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 306);
e.halt();
}

_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 309);
function handler(key)
{
	_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "handler", 309);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 311);
return function(e)
	{
		_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "(anonymous 2)", 311);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 313);
insertText.call(this, ' ' + this.get(key+'Label') + ' ');
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 314);
e.halt();
	};
}

_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 318);
function clear(e)
{
	_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "clear", 318);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 320);
this.clear();
	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 321);
e.halt();
}

_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 324);
function insertQB(e)
{
	_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "insertQB", 324);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 326);
var qb = this.get('queryBuilder');
	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 327);
if (!qb.validateFields())
	{
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 329);
e.halt();
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 330);
return;
	}

	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 333);
var query = qb.toDatabaseQuery();
	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 334);
if (query.length === 0)
	{
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 336);
var el = qb.get('contentBox').one('select');
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 337);
qb.displayFieldMessage(el, this.get('noVariableSelectedError'), 'error');
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 338);
e.halt();
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 339);
return;
	}

	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 342);
var map = this.get('combinatorMap');

	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 344);
var s     = '';
	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 345);
var op    = ' ' + this.get('andLabel') + ' ';
	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 346);
for (var i=0; i<query.length; i++)
	{
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 348);
var q = query[i];

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 350);
if (i > 0)
		{
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 352);
s += op;
		}
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 354);
s += q[0];

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 356);
var pattern = q[1];
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 357);
if (pattern.indexOf('{') == -1)
		{
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 359);
pattern += '{value}';
		}

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 362);
var combinator = map && map[ q[1] ];
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 363);
if (combinator)
		{
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 365);
op      = combinator.operator;
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 366);
pattern = combinator.pattern;
		}

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 369);
s += Y.Lang.substitute(pattern,
		{
			value: q[2].replace(/'/g, '\\\'')
		});
	}

	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 375);
insertText.call(this, s);
	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 376);
qb.reset();
	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 377);
e.halt();
}

_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 380);
function resetQB(e)
{
	_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "resetQB", 380);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 382);
this.get('queryBuilder').reset();

	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 384);
if (e)
	{
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 386);
e.halt();
	}
}

_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 390);
function setValidation(f)
{
	_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "setValidation", 390);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 392);
if (!f)
	{
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 394);
return;
	}

	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 397);
var self = this;

	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 399);
var orig_validateForm = f.validateForm;
	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 400);
f.validateForm = function()
	{
		_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "validateForm", 400);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 402);
resetQB.call(self);
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 403);
orig_validateForm.apply(this, arguments);
	};

	_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 406);
f.setFunction(this.get('fieldId'), function(form, e)
	{
		_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "(anonymous 3)", 406);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 408);
return self._validateExpression(form, e, this);
	});
}

_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 412);
Y.extend(ExpressionBuilder, Y.Widget,
{
	initializer: function(config)
	{
		// FormManager

		_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "initializer", 414);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 418);
setValidation.call(this, config.formMgr);
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 419);
this.after('formMgrChange', function(e)
		{
			_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "(anonymous 4)", 419);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 421);
if (e.prevVal)
			{
				_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 423);
e.prevVal.setFunction(this.get('fieldId'), null);
			}

			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 426);
setValidation.call(this, e.newVal);
		});
	},

	renderUI: function()
	{
		_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "renderUI", 430);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 432);
var container = this.get('contentBox');
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 433);
container.set('innerHTML', this._field());

		// textarea

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 437);
this.field = container.one('#'+this.get('fieldId'));

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 439);
if (document.selection)
		{
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 441);
this.field.on('change', updateIERange, this);
		}

		// basic controls

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 446);
container.one('.'+this.getClassName('paren')).on('click', paren, this);

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 448);
var op = [ 'and', 'or', 'not' ];
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 449);
for (var i=0; i<op.length; i++)
		{
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 451);
container.one('.'+this.getClassName(op[i])).on('click', handler(op[i]), this);
		}

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 454);
container.one('.'+this.getClassName('clear')).on('click', clear, this);

		// QueryBuilder

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 458);
var qb = this.get('queryBuilder');
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 459);
if (qb)
		{
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 461);
container.appendChild(Y.Node.create(this._query()));

			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 463);
qb.render(container.one('.'+this.getClassName('querybuilder')));

			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 465);
container.one('.'+this.getClassName('insert')).on('click', insertQB, this);
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 466);
container.one('.'+this.getClassName('reset')).on('click', resetQB, this);
		}
	},

	destructor: function()
	{
		_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "destructor", 470);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 472);
var qb = this.get('queryBuilder');
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 473);
if (qb)
		{
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 475);
qb.destroy();
		}

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 478);
this.ie_range = null;
	},

	/**
	 * Clears the expression.
	 * 
	 * @method clear
	 */
	clear: function()
	{
		_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "clear", 486);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 488);
this.field.set('value', '');
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 489);
this.field.focus();
	},

	/**
	 * Validate the expression.
	 * 
	 * @method _validateExpression
	 * @protected
	 * @return {Boolean} <code>true</code> if the expression has balanced parens and single quotes
	 */
	_validateExpression: function(form, e, form_mgr)
	{
		_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "_validateExpression", 499);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 501);
var s     = e.get('value');
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 502);
var paren = 0;
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 503);
var pi    = -1;
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 504);
var quote = false;
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 505);
var qi    = -1;
		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 506);
for (var i=0; i<s.length; i++)
		{
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 508);
var c = s.charAt(i);
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 509);
if (!quote && c == '(')
			{
				_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 511);
if (paren === 0)
				{
					_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 513);
pi = i;
				}
				_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 515);
paren++;
			}
			else {_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 517);
if (!quote && c == ')')
			{
				_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 519);
paren--;
				_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 520);
if (paren < 0)
				{
					_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 522);
var msg = Y.Lang.substitute(this.get('tooManyParensError'),
					{
						context: s.substr(0,i+1)
					});
					_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 526);
form_mgr.displayMessage(e, msg, 'error');
					_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 527);
return false;
				}
			}
			else {_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 530);
if (c == '\'' && (i === 0 || s.charAt(i-1) != '\\'))
			{
				_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 532);
if (!quote)
				{
					_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 534);
qi = i;
				}
				_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 536);
quote = ! quote;
			}}}
		}

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 540);
if (quote && (paren === 0 || qi < pi))
		{
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 542);
var msg = Y.Lang.substitute(this.get('unmatchedSingleQuoteError'),
			{
				context: s.substr(0,qi+1)
			});
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 546);
form_mgr.displayMessage(e, msg, 'error');
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 547);
return false;
		}
		else {_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 549);
if (paren > 0)
		{
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 551);
var msg = Y.Lang.substitute(this.get('unclosedParenError'),
			{
				context: s.substr(0,pi+1)
			});
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 555);
form_mgr.displayMessage(e, msg, 'error');
			_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 556);
return false;
		}}

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 559);
return true;
	},

	//
	// Markup
	//

	/**
	 * @method _field
	 * @protected
	 * @return {String} markup for the textarea and basic buttons
	 */
	_field: function()
	{
		_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "_field", 571);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 573);
var markup =
			'<div class="{td}">' +
				'<textarea id="{tid}" name="{tn}" class="{ff} {ta}"></textarea>' +
			'</div>' +
			'<div class="{fctl}">' +
				'<button class="yui3-button {pc}">{paren}</button>' +
				'<button class="yui3-button {ac}">{and}</button>' +
				'<button class="yui3-button {oc}">{or}</button>' +
				'<button class="yui3-button {nc}">{not}</button>' +
				'<button class="yui3-button {cc}">{clear}</button>' +
			'</div>';

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 585);
return Y.Lang.substitute(markup,
		{
			td:     this.getClassName('field-container'),
			ff:     Y.FormManager.field_marker_class,
			ta:     this.getClassName('field'),
			tid:    this.get('fieldId'),
			tn:     this.get('fieldName'),
			fctl:   this.getClassName('controls'),
			pc:     this.getClassName('paren'),
			ac:     this.getClassName('and'),
			oc:     this.getClassName('or'),
			nc:     this.getClassName('not'),
			cc:     this.getClassName('clear'),
			paren:  this.get('parenLabel'),
			and:    this.get('andLabel'),
			or:     this.get('orLabel'),
			not:    this.get('notLabel'),
			clear:  this.get('clearLabel')
		});
	},

	/**
	 * @method _query
	 * @protected
	 * @return {String} markup for the QueryBuilder
	 */
	_query: function()
	{
		_yuitest_coverfunc("build/gallery-exprbuilder/gallery-exprbuilder.js", "_query", 611);
_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 613);
var markup =
			'<div class="{qb}"></div>' +
			'<div class="{qbctl} {fr}">' +
				'<button class="yui3-button {ic}">{insert}</button>' +
				'<button class="yui3-button {rc}">{reset}</button>' +
			'</div>';

		_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 620);
return Y.Lang.substitute(markup,
		{
			qb:     this.getClassName('querybuilder'),
			qbctl:  this.getClassName('querybuilder-controls'),
			fr:     Y.FormManager.row_marker_class,
			ic:     this.getClassName('insert'),
			rc:     this.getClassName('reset'),
			insert: this.get('insertLabel'),
			reset:  this.get('resetLabel')
		});
	}
});

_yuitest_coverline("build/gallery-exprbuilder/gallery-exprbuilder.js", 633);
Y.ExpressionBuilder = ExpressionBuilder;


}, '@VERSION@', {"skinnable": "true", "requires": ["gallery-querybuilder", "gallery-formmgr"]});
