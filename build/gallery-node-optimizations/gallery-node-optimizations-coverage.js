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
_yuitest_coverage["build/gallery-node-optimizations/gallery-node-optimizations.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-node-optimizations/gallery-node-optimizations.js",
    code: []
};
_yuitest_coverage["build/gallery-node-optimizations/gallery-node-optimizations.js"].code=["YUI.add('gallery-node-optimizations', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-node-optimizations"," */","","/**"," * Optimizations for searching DOM tree."," *"," * @main gallery-node-optimizations"," * @class Node~optimizations"," */","","var tag_class_name_re = /^([a-z]*)\\.([-_a-z0-9]+)$/i;","var class_name_re     = /^\\.([-_a-z0-9]+)$/i;","var tag_name_re       = /^[a-z]+$/i;","","/**"," * Useful when constructing regular expressions that match CSS classes."," *"," * @property class_re_prefix"," * @static"," * @type {String}"," * @value \"(?:^|\\\\s)(?:\""," */","Y.Node.class_re_prefix = '(?:^|\\\\s)(?:';","","/**"," * Useful when constructing regular expressions that match CSS classes."," *"," * @property class_re_suffix"," * @static"," * @type {String}"," * @value \")(?:\\\\s|$)\""," */","Y.Node.class_re_suffix = ')(?:\\\\s|$)';","","/**********************************************************************"," * <p>Patch to speed up search for a single class name or single tag name."," * To use a regular expression, call getAncestorByClassName().</p>"," * "," * @method ancestor"," * @param fn {String|Function} selector string or boolean method for testing elements"," * @param test_self {Boolean} pass true to include the element itself in the scan"," * @return {Node}"," */","","var orig_ancestor = Y.Node.prototype.ancestor;","","Y.Node.prototype.ancestor = function(","	/* string */	fn,","	/* bool */		test_self)","{","	if (Y.Lang.isString(fn))","	{","		var m = class_name_re.exec(fn);","		if (m && m.length)","		{","			return this.getAncestorByClassName(m[1], test_self);","		}","","		if (tag_name_re.test(fn))","		{","			return this.getAncestorByTagName(fn, test_self);","		}","	}","","	return orig_ancestor.apply(this, arguments);","};","","/**********************************************************************"," * <p>Searches for an ancestor by class name.  This is significantly faster"," * than using Y.node.ancestor('.classname'), and it accepts a regular"," * expression.</p>"," * "," * @method getAncestorByClassName"," * @param class_name {String|Regexp} class to search for"," * @param test_self {Boolean} pass true to include the element itself in the scan"," * @return {Node}"," */","","Y.Node.prototype.getAncestorByClassName = function(","	/* string */	class_name,","	/* bool */		test_self)","{","	var e = this._node;","	if (!test_self)","	{","		e = e.parentNode;","	}","","	while (e && !Y.DOM.hasClass(e, class_name))","	{","		e = e.parentNode;","		if (!e || !e.tagName)","		{","			return null;","		}","	}","	return Y.one(e);","};","","/**********************************************************************"," * <p>Searches for an ancestor by tag name.  This is significantly faster"," * than using Y.node.ancestor('tagname').</p>"," * "," * @method getAncestorByTagName"," * @param tag_name {String} tag name to search for"," * @param test_self {Boolean} pass true to include the element itself in the scan"," * @return {Node}"," */","","Y.Node.prototype.getAncestorByTagName = function(","	/* string */	tag_name,","	/* bool */		test_self)","{","	var e = this._node;","	if (!test_self)","	{","		e = e.parentNode;","	}","","	tag_name = tag_name.toLowerCase();","	while (e && e.tagName.toLowerCase() != tag_name)","	{","		e = e.parentNode;","		if (!e || !e.tagName)","		{","			return null;","		}","	}","	return Y.one(e);","};","","/*"," * <p>Patch to speed up search for a single class name or single tag name."," * To use a regular expression, call getElementsByClassName().</p>"," * "," * @method one"," * @param fn {String|Function} selector string or boolean method for testing elements"," * @return {Node}"," */","/*","var orig_one = Y.Node.prototype.one;","","Y.Node.prototype.one = function(selector)","{","	if (Y.Lang.isString(selector))","	{","		if (selector == '*')","		{","			return Y.one(Y.Node.getDOMNode(this).children[0]);","		}","","		var m = tag_class_name_re.exec(selector);","		if (m && m.length)","		{","			return this.getFirstElementByClassName(m[2], m[1]);","		}","","		if (tag_name_re.test(selector))","		{","			return this.getElementsByTagName(selector).item(0);","		}","	}","","	return orig_one.apply(this, arguments);","};","*/","/*"," * <p>Patch to speed up search for a single class name or single tag name."," * To use a regular expression, call getElementsByClassName().</p>"," * "," * @method all"," * @param fn {String|Function} selector string or boolean method for testing elements"," * @return {Node}"," */","/*","var orig_all = Y.Node.prototype.all;","","Y.Node.prototype.all = function(selector)","{","	if (Y.Lang.isString(selector))","	{","		var m = tag_class_name_re.exec(selector);","		if (m && m.length)","		{","			return this.getElementsByClassName(m[2], m[1]);","		}","","		if (tag_name_re.test(selector))","		{","			return this.getElementsByTagName(selector);","		}","	}","","	return orig_all.apply(this, arguments);","};","*/","/**********************************************************************"," * <p>Searches for descendants by class name.  Unlike Y.all(), this"," * function accepts a regular expression.</p>"," * "," * @method getElementsByClassName"," * @param class_name {String|Regexp} class to search for"," * @param tag_name {String} optional tag name to filter by"," * @return {NodeList}"," */","","Y.Node.prototype.getElementsByClassName = function(","	/* string */	class_name,","	/* string */	tag_name)","{","	var descendants = Y.Node.getDOMNode(this).getElementsByTagName(tag_name || '*');","","	var list = new Y.NodeList();","	for (var i=0; i<descendants.length; i++)","	{","		var e = descendants[i];","		if (Y.DOM.hasClass(e, class_name))","		{","			list.push(e);","		}","	}","","	return list;","};","","/**********************************************************************"," * <p>Searches for one descendant by class name.  Unlike Y.one(), this"," * function accepts a regular expression.  </p>"," * "," * @method getFirstElementByClassName"," * @param class_name {String|Regexp} class to search for"," * @param tag_name {String} optional tag name to filter by"," * @return {Node}"," */","","Y.Node.prototype.getFirstElementByClassName = function(","	/* string */	class_name,","	/* string */	tag_name)","{","	if (!tag_name || tag_name == '*' || tag_name == 'div')","	{","		// breadth first search","","		var list1 = [ Y.Node.getDOMNode(this) ], list2 = [];","		while (list1.length)","		{","			for (var i=0; i<list1.length; i++)","			{","				var root     = list1[i],","					children = root.children || root.childNodes;	// svg elements only have childNodes","				for (var j=0; j<children.length; j++)","				{","					var e = children[j];","					if (Y.DOM.hasClass(e, class_name))","					{","						return Y.one(e);","					}","","					list2.push(e);","				}","			}","","			list1 = list2;","			list2 = [];","		}","	}","	else","	{","		var descendants = Y.Node.getDOMNode(this).getElementsByTagName(tag_name || '*');","","		for (var i=0; i<descendants.length; i++)","		{","			var e = descendants[i];","			if (Y.DOM.hasClass(e, class_name))","			{","				return Y.one(e);","			}","		}","	}","","	return null;","};","","","}, '@VERSION@', {\"requires\": [\"node-base\"]});"];
_yuitest_coverage["build/gallery-node-optimizations/gallery-node-optimizations.js"].lines = {"1":0,"3":0,"16":0,"17":0,"18":0,"28":0,"38":0,"50":0,"52":0,"56":0,"58":0,"59":0,"61":0,"64":0,"66":0,"70":0,"84":0,"88":0,"89":0,"91":0,"94":0,"96":0,"97":0,"99":0,"102":0,"115":0,"119":0,"120":0,"122":0,"125":0,"126":0,"128":0,"129":0,"131":0,"134":0,"212":0,"216":0,"218":0,"219":0,"221":0,"222":0,"224":0,"228":0,"241":0,"245":0,"249":0,"250":0,"252":0,"254":0,"256":0,"258":0,"259":0,"261":0,"264":0,"268":0,"269":0,"274":0,"276":0,"278":0,"279":0,"281":0,"286":0};
_yuitest_coverage["build/gallery-node-optimizations/gallery-node-optimizations.js"].functions = {"ancestor:52":0,"getAncestorByClassName:84":0,"getAncestorByTagName:115":0,"getElementsByClassName:212":0,"getFirstElementByClassName:241":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-node-optimizations/gallery-node-optimizations.js"].coveredLines = 62;
_yuitest_coverage["build/gallery-node-optimizations/gallery-node-optimizations.js"].coveredFunctions = 6;
_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 1);
YUI.add('gallery-node-optimizations', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-node-optimizations/gallery-node-optimizations.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 3);
"use strict";

/**
 * @module gallery-node-optimizations
 */

/**
 * Optimizations for searching DOM tree.
 *
 * @main gallery-node-optimizations
 * @class Node~optimizations
 */

_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 16);
var tag_class_name_re = /^([a-z]*)\.([-_a-z0-9]+)$/i;
_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 17);
var class_name_re     = /^\.([-_a-z0-9]+)$/i;
_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 18);
var tag_name_re       = /^[a-z]+$/i;

/**
 * Useful when constructing regular expressions that match CSS classes.
 *
 * @property class_re_prefix
 * @static
 * @type {String}
 * @value "(?:^|\\s)(?:"
 */
_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 28);
Y.Node.class_re_prefix = '(?:^|\\s)(?:';

/**
 * Useful when constructing regular expressions that match CSS classes.
 *
 * @property class_re_suffix
 * @static
 * @type {String}
 * @value ")(?:\\s|$)"
 */
_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 38);
Y.Node.class_re_suffix = ')(?:\\s|$)';

/**********************************************************************
 * <p>Patch to speed up search for a single class name or single tag name.
 * To use a regular expression, call getAncestorByClassName().</p>
 * 
 * @method ancestor
 * @param fn {String|Function} selector string or boolean method for testing elements
 * @param test_self {Boolean} pass true to include the element itself in the scan
 * @return {Node}
 */

_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 50);
var orig_ancestor = Y.Node.prototype.ancestor;

_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 52);
Y.Node.prototype.ancestor = function(
	/* string */	fn,
	/* bool */		test_self)
{
	_yuitest_coverfunc("build/gallery-node-optimizations/gallery-node-optimizations.js", "ancestor", 52);
_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 56);
if (Y.Lang.isString(fn))
	{
		_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 58);
var m = class_name_re.exec(fn);
		_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 59);
if (m && m.length)
		{
			_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 61);
return this.getAncestorByClassName(m[1], test_self);
		}

		_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 64);
if (tag_name_re.test(fn))
		{
			_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 66);
return this.getAncestorByTagName(fn, test_self);
		}
	}

	_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 70);
return orig_ancestor.apply(this, arguments);
};

/**********************************************************************
 * <p>Searches for an ancestor by class name.  This is significantly faster
 * than using Y.node.ancestor('.classname'), and it accepts a regular
 * expression.</p>
 * 
 * @method getAncestorByClassName
 * @param class_name {String|Regexp} class to search for
 * @param test_self {Boolean} pass true to include the element itself in the scan
 * @return {Node}
 */

_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 84);
Y.Node.prototype.getAncestorByClassName = function(
	/* string */	class_name,
	/* bool */		test_self)
{
	_yuitest_coverfunc("build/gallery-node-optimizations/gallery-node-optimizations.js", "getAncestorByClassName", 84);
_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 88);
var e = this._node;
	_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 89);
if (!test_self)
	{
		_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 91);
e = e.parentNode;
	}

	_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 94);
while (e && !Y.DOM.hasClass(e, class_name))
	{
		_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 96);
e = e.parentNode;
		_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 97);
if (!e || !e.tagName)
		{
			_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 99);
return null;
		}
	}
	_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 102);
return Y.one(e);
};

/**********************************************************************
 * <p>Searches for an ancestor by tag name.  This is significantly faster
 * than using Y.node.ancestor('tagname').</p>
 * 
 * @method getAncestorByTagName
 * @param tag_name {String} tag name to search for
 * @param test_self {Boolean} pass true to include the element itself in the scan
 * @return {Node}
 */

_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 115);
Y.Node.prototype.getAncestorByTagName = function(
	/* string */	tag_name,
	/* bool */		test_self)
{
	_yuitest_coverfunc("build/gallery-node-optimizations/gallery-node-optimizations.js", "getAncestorByTagName", 115);
_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 119);
var e = this._node;
	_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 120);
if (!test_self)
	{
		_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 122);
e = e.parentNode;
	}

	_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 125);
tag_name = tag_name.toLowerCase();
	_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 126);
while (e && e.tagName.toLowerCase() != tag_name)
	{
		_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 128);
e = e.parentNode;
		_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 129);
if (!e || !e.tagName)
		{
			_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 131);
return null;
		}
	}
	_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 134);
return Y.one(e);
};

/*
 * <p>Patch to speed up search for a single class name or single tag name.
 * To use a regular expression, call getElementsByClassName().</p>
 * 
 * @method one
 * @param fn {String|Function} selector string or boolean method for testing elements
 * @return {Node}
 */
/*
var orig_one = Y.Node.prototype.one;

Y.Node.prototype.one = function(selector)
{
	if (Y.Lang.isString(selector))
	{
		if (selector == '*')
		{
			return Y.one(Y.Node.getDOMNode(this).children[0]);
		}

		var m = tag_class_name_re.exec(selector);
		if (m && m.length)
		{
			return this.getFirstElementByClassName(m[2], m[1]);
		}

		if (tag_name_re.test(selector))
		{
			return this.getElementsByTagName(selector).item(0);
		}
	}

	return orig_one.apply(this, arguments);
};
*/
/*
 * <p>Patch to speed up search for a single class name or single tag name.
 * To use a regular expression, call getElementsByClassName().</p>
 * 
 * @method all
 * @param fn {String|Function} selector string or boolean method for testing elements
 * @return {Node}
 */
/*
var orig_all = Y.Node.prototype.all;

Y.Node.prototype.all = function(selector)
{
	if (Y.Lang.isString(selector))
	{
		var m = tag_class_name_re.exec(selector);
		if (m && m.length)
		{
			return this.getElementsByClassName(m[2], m[1]);
		}

		if (tag_name_re.test(selector))
		{
			return this.getElementsByTagName(selector);
		}
	}

	return orig_all.apply(this, arguments);
};
*/
/**********************************************************************
 * <p>Searches for descendants by class name.  Unlike Y.all(), this
 * function accepts a regular expression.</p>
 * 
 * @method getElementsByClassName
 * @param class_name {String|Regexp} class to search for
 * @param tag_name {String} optional tag name to filter by
 * @return {NodeList}
 */

_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 212);
Y.Node.prototype.getElementsByClassName = function(
	/* string */	class_name,
	/* string */	tag_name)
{
	_yuitest_coverfunc("build/gallery-node-optimizations/gallery-node-optimizations.js", "getElementsByClassName", 212);
_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 216);
var descendants = Y.Node.getDOMNode(this).getElementsByTagName(tag_name || '*');

	_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 218);
var list = new Y.NodeList();
	_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 219);
for (var i=0; i<descendants.length; i++)
	{
		_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 221);
var e = descendants[i];
		_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 222);
if (Y.DOM.hasClass(e, class_name))
		{
			_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 224);
list.push(e);
		}
	}

	_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 228);
return list;
};

/**********************************************************************
 * <p>Searches for one descendant by class name.  Unlike Y.one(), this
 * function accepts a regular expression.  </p>
 * 
 * @method getFirstElementByClassName
 * @param class_name {String|Regexp} class to search for
 * @param tag_name {String} optional tag name to filter by
 * @return {Node}
 */

_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 241);
Y.Node.prototype.getFirstElementByClassName = function(
	/* string */	class_name,
	/* string */	tag_name)
{
	_yuitest_coverfunc("build/gallery-node-optimizations/gallery-node-optimizations.js", "getFirstElementByClassName", 241);
_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 245);
if (!tag_name || tag_name == '*' || tag_name == 'div')
	{
		// breadth first search

		_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 249);
var list1 = [ Y.Node.getDOMNode(this) ], list2 = [];
		_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 250);
while (list1.length)
		{
			_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 252);
for (var i=0; i<list1.length; i++)
			{
				_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 254);
var root     = list1[i],
					children = root.children || root.childNodes;	// svg elements only have childNodes
				_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 256);
for (var j=0; j<children.length; j++)
				{
					_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 258);
var e = children[j];
					_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 259);
if (Y.DOM.hasClass(e, class_name))
					{
						_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 261);
return Y.one(e);
					}

					_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 264);
list2.push(e);
				}
			}

			_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 268);
list1 = list2;
			_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 269);
list2 = [];
		}
	}
	else
	{
		_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 274);
var descendants = Y.Node.getDOMNode(this).getElementsByTagName(tag_name || '*');

		_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 276);
for (var i=0; i<descendants.length; i++)
		{
			_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 278);
var e = descendants[i];
			_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 279);
if (Y.DOM.hasClass(e, class_name))
			{
				_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 281);
return Y.one(e);
			}
		}
	}

	_yuitest_coverline("build/gallery-node-optimizations/gallery-node-optimizations.js", 286);
return null;
};


}, '@VERSION@', {"requires": ["node-base"]});
