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
_yuitest_coverage["build/gallery-checkboxgroups/gallery-checkboxgroups.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-checkboxgroups/gallery-checkboxgroups.js",
    code: []
};
_yuitest_coverage["build/gallery-checkboxgroups/gallery-checkboxgroups.js"].code=["YUI.add('gallery-checkboxgroups', function (Y, NAME) {","","\"use strict\";","","/**********************************************************************"," * Various behaviors that can be attached to a group of checkboxes."," *"," * @module gallery-checkboxgroups"," * @main gallery-checkboxgroups"," */","","/**"," * <p>Base class for enforcing constraints on groups of checkboxes.</p>"," *"," * <p>Derived classes must override <code>enforceConstraints()</code>.</p>"," * "," * @class CheckboxGroup"," * @constructor"," * @param cb_list {String|Node|NodeList} The list of checkboxes to manage"," */","","function CheckboxGroup(","	/* string/Node/NodeList */	cb_list)","{","	this.cb_list = new Y.NodeList('');","	this.ev_list = [];","	this.splice(0, 0, cb_list);","","	this.ignore_change = false;","}","","function checkboxChanged(","	/* event */		e,","	/* object */	obj)","{","	this.checkboxChanged(e.target);","}","","CheckboxGroup.prototype =","{","	/**","	 * @method getCheckboxList","	 * @return {NodeList} List of managed checkboxes","	 */","	getCheckboxList: function()","	{","		return this.cb_list;","	},","","	/**","	 * Same functionality as <code>Array.splice()</code>.  Operates on the","	 * list of managed checkboxes.","	 * ","	 * @method splice","	 * @param start {Int} Insertion index","	 * @param delete_count {Int} Number of items to remove, starting from <code>start</code>","	 * @param cb_list {String|Node|NodeList} The list of checkboxes to insert at <code>start</code>","	 */","	splice: function(","		/* int */					start,","		/* int */					delete_count,","		/* string/Node/NodeList */	cb_list)","	{","		for (var i=start; i<delete_count; i++)","		{","			this.ev_list[i].detach();","		}","","		if (Y.Lang.isString(cb_list))","		{","			cb_list = Y.all(cb_list);","		}","","		if (cb_list instanceof Y.NodeList)","		{","			cb_list.each(function(cb, i)","			{","				var j=start+i, k=(i===0 ? delete_count : 0);","				this.cb_list.splice(j, k, cb);","				this.ev_list.splice(j, k, cb.on('click', checkboxChanged, this));","			},","			this);","		}","		else if (cb_list && cb_list._node)","		{","			this.cb_list.splice(start, delete_count, cb_list);","			this.ev_list.splice(start, delete_count, cb_list.on('click', checkboxChanged, this));","		}","		else","		{","			this.cb_list.splice(start, delete_count);","			this.ev_list.splice(start, delete_count);","		}","	},","","	/**","	 * Call this if you modify the checkbox programmatically, since that","	 * will not fire a click event.","	 * ","	 * @method checkboxChanged","	 * @param cb {Node|String} checkbox that was modified","	 */","	checkboxChanged: function(","		/* checkbox */	cb)","	{","		if (this.ignore_change || this.cb_list.isEmpty() || this.allDisabled())","		{","			return;","		}","","		cb = Y.one(cb);","","		this.cb_list.each(function(cb1, i)","		{","			if (cb1 == cb)","			{","				this.enforceConstraints(this.cb_list, i);","			}","		},","		this);","	},","","	/**","	 * Derived classes must override this function to implement the desired behavior.","	 * ","	 * @method enforceConstraints","	 * @param cb_list {String|Object|Array} The list of checkboxes","	 * @param index {Int} The index of the checkbox that changed","	 */","	enforceConstraints: function(","		/* NodeList */	cb_list,","		/* int */		index)","	{","	},","","	/**","	 * @method allChecked","	 * @return {boolean} <code>true</code> if all checkboxes are checked","	 */","	allChecked: function()","	{","		var count = this.cb_list.size();","		for (var i=0; i<count; i++)","		{","			var cb = this.cb_list.item(i);","			if (!cb.get('disabled') && !cb.get('checked'))","			{","				return false;","			}","		}","","		return true;","	},","","	/**","	 * @method allUnchecked","	 * @return {boolean} <code>true</code> if all checkboxes are unchecked","	 */","	allUnchecked: function()","	{","		var count = this.cb_list.size();","		for (var i=0; i<count; i++)","		{","			if (this.cb_list.item(i).get('checked'))","			{","				return false;","			}","		}","","		return true;","	},","","	/**","	 * @method allDisabled","	 * @return {boolean} <code>true</code> if all checkboxes are disabled","	 */","	allDisabled: function()","	{","		var count = this.cb_list.size();","		for (var i=0; i<count; i++)","		{","			if (!this.cb_list.item(i).get('disabled'))","			{","				return false;","			}","		}","","		return true;","	}","};","","Y.CheckboxGroup = CheckboxGroup;","/**"," * @module gallery-checkboxgroups"," */","","/**********************************************************************"," * At least one checkbox must be selected.  If the last one is turned off,"," * the active, adjacent one is turned on.  The exact algorithm is explained"," * in \"Tog on Interface\".  The checkboxes are assumed to be ordered in the"," * order they were added."," * "," * @class AtLeastOneCheckboxGroup"," * @extends CheckboxGroup"," * @constructor"," * @param cb_list {String|Node|NodeList} The list of checkboxes to manage"," */","","function AtLeastOneCheckboxGroup(","	/* string/Node/NodeList */	cb_list)","{","	this.direction = AtLeastOneDirection.SLIDE_UP;","	AtLeastOneCheckboxGroup.superclass.constructor.call(this, cb_list);","}","","var AtLeastOneDirection =","{","	SLIDE_UP:   0,","	SLIDE_DOWN: 1","};","","function getNextActiveIndex(","	/* NodeList */	cb_list,","	/* int */		index)","{","	if (cb_list.size() < 2)","		{","		return index;","		}","","	var new_index = index;","	do","		{","		if (new_index === 0)","			{","			this.direction = AtLeastOneDirection.SLIDE_DOWN;","			}","		else if (new_index == cb_list.size()-1)","			{","			this.direction = AtLeastOneDirection.SLIDE_UP;","			}","","		if (this.direction == AtLeastOneDirection.SLIDE_UP)","			{","			new_index = Math.max(0, new_index-1);","			}","		else","			{","			new_index = Math.min(cb_list.size()-1, new_index+1);","			}","		}","		while (cb_list.item(new_index).get('disabled'));","","	return new_index;","}","","Y.extend(AtLeastOneCheckboxGroup, CheckboxGroup,","{","	/**","	 * @method enforceConstraints","	 * @param cb_list {String|Object|Array} The list of checkboxes","	 * @param index {Int} The index of the checkbox that changed","	 */","	enforceConstraints: function(","		/* NodeList */	cb_list,","		/* int */		index)","	{","		if (cb_list.item(index).get('checked') || !this.allUnchecked())","		{","			this.direction = AtLeastOneDirection.SLIDE_UP;","			return;","		}","","		// slide to the adjacent checkbox, skipping over disabled ones","","		var new_index = getNextActiveIndex.call(this, cb_list, index);","		if (new_index == index)											// may have hit the end and bounced back","			{","			new_index = getNextActiveIndex.call(this, cb_list, index);	// if newID == id, then there is only one enabled","			}","","		// turn the new checkbox on","","		this.ignore_change = true;","		cb_list.item(new_index).set('checked', true);","		this.ignore_change = false;","	}","});","","Y.AtLeastOneCheckboxGroup = AtLeastOneCheckboxGroup;","/**"," * @module gallery-checkboxgroups"," */","","/**********************************************************************"," * At most one checkbox can be selected.  If one is turned on, the active"," * one is turned off."," * "," * @class AtMostOneCheckboxGroup"," * @extends CheckboxGroup"," * @constructor"," * @param cb_list {String|Node|NodeList} The list of checkboxes to manage"," */","","function AtMostOneCheckboxGroup(","	/* string/Node/NodeList */	cb_list)","{","	AtMostOneCheckboxGroup.superclass.constructor.call(this, cb_list);","}","","Y.extend(AtMostOneCheckboxGroup, CheckboxGroup,","{","	/**","	 * @method enforceConstraints","	 * @param cb_list {String|Object|Array} The list of checkboxes","	 * @param index {Int} The index of the checkbox that changed","	 */","	enforceConstraints: function(","		/* NodeList */	cb_list,","		/* int */	index)","	{","		if (!cb_list.item(index).get('checked'))","		{","			return;","		}","","		var count = cb_list.size();","		for (var i=0; i<count; i++)","		{","			if (i != index)","			{","				cb_list.item(i).set('checked', false);","			}","		}","	}","});","","Y.AtMostOneCheckboxGroup = AtMostOneCheckboxGroup;","/**"," * @module gallery-checkboxgroups"," */","","/**********************************************************************"," * All checkboxes can be selected and a select-all checkbox is available"," * to check all. This check-all box is automatically changed if any other"," * checkbox changes state."," * "," * @class SelectAllCheckboxGroup"," * @extends CheckboxGroup"," * @constructor"," * @param select_all_cb {String|Object} The checkbox that triggers \"select all\""," * @param cb_list {String|Node|NodeList} The list of checkboxes to manage"," */","","function SelectAllCheckboxGroup(","	/* string/Node */			select_all_cb,","	/* string/Node/NodeList */	cb_list)","{","	this.select_all_cb = Y.one(select_all_cb);","	this.select_all_cb.on('click', updateSelectAll, this);","","	SelectAllCheckboxGroup.superclass.constructor.call(this, cb_list);","}","","function updateSelectAll()","{","	var checked = this.select_all_cb.get('checked');","	var count   = this.cb_list.size();","	for (var i=0; i<count; i++)","	{","		var cb = this.cb_list.item(i);","		if (!cb.get('disabled'))","		{","			cb.set('checked', checked);","		}","	}","};","","Y.extend(SelectAllCheckboxGroup, CheckboxGroup,","{","	/**","	 * @method getSelectAllCheckbox","	 * @return {Node} checkbox that controls \"select all\"","	 */","	getSelectAllCheckbox: function()","	{","		return this.select_all_cb;","	},","","	/**","	 * Toggle the setting of the \"select all\" checkbox.","	 *","	 * @method toggleSelectAll","	 */","	toggleSelectAll: function()","	{","		this.select_call_cb.set('checked', !this.select_all_cb.get('checked'));","		updateSelectAll.call(this);","	},","","	/**","	 * @method enforceConstraints","	 * @param cb_list {String|Object|Array} The list of checkboxes","	 * @param index {Int} The index of the checkbox that changed","	 */","	enforceConstraints: function(","		/* NodeList */	cb_list,","		/* int */		index)","	{","		this.select_all_cb.set('checked', this.allChecked());","	}","});","","Y.SelectAllCheckboxGroup = SelectAllCheckboxGroup;","/**"," * @module gallery-checkboxgroups"," */","","/**********************************************************************"," * Enables the given list of nodes if any checkboxes are checked."," * "," * @class EnableIfAnyCheckboxGroup"," * @extends CheckboxGroup"," * @constructor"," * @param cb_list {String|Node|NodeList} The list of checkboxes to manage"," * @param nodes {String|NodeList} The nodes to enable/disable"," */","","function EnableIfAnyCheckboxGroup(","	/* string/Node/NodeList */	cb_list,","	/* string/NodeList */		nodes)","{","	this.nodes = Y.Lang.isString(nodes) ? Y.all(nodes) : nodes;","	EnableIfAnyCheckboxGroup.superclass.constructor.call(this, cb_list);","	this.enforceConstraints(this.cb_list, 0);","}","","Y.extend(EnableIfAnyCheckboxGroup, CheckboxGroup,","{","	/**","	 * @method enforceConstraints","	 * @param cb_list {String|Object|Array} The list of checkboxes","	 * @param index {Int} The index of the checkbox that changed","	 */","	enforceConstraints: function(","		/* NodeList */	cb_list,","		/* int */		index)","	{","		var disable = this.allUnchecked();","		this.nodes.each(function(node)","		{","			node.set('disabled', disable);","		});","	}","});","","Y.EnableIfAnyCheckboxGroup = EnableIfAnyCheckboxGroup;","","","}, '@VERSION@', {\"requires\": [\"node-base\"]});"];
_yuitest_coverage["build/gallery-checkboxgroups/gallery-checkboxgroups.js"].lines = {"1":0,"3":0,"22":0,"25":0,"26":0,"27":0,"29":0,"32":0,"36":0,"39":0,"47":0,"64":0,"66":0,"69":0,"71":0,"74":0,"76":0,"78":0,"79":0,"80":0,"84":0,"86":0,"87":0,"91":0,"92":0,"106":0,"108":0,"111":0,"113":0,"115":0,"117":0,"142":0,"143":0,"145":0,"146":0,"148":0,"152":0,"161":0,"162":0,"164":0,"166":0,"170":0,"179":0,"180":0,"182":0,"184":0,"188":0,"192":0,"209":0,"212":0,"213":0,"216":0,"222":0,"226":0,"228":0,"231":0,"232":0,"234":0,"236":0,"238":0,"240":0,"243":0,"245":0,"249":0,"254":0,"257":0,"268":0,"270":0,"271":0,"276":0,"277":0,"279":0,"284":0,"285":0,"286":0,"290":0,"305":0,"308":0,"311":0,"322":0,"324":0,"327":0,"328":0,"330":0,"332":0,"338":0,"355":0,"359":0,"360":0,"362":0,"365":0,"367":0,"368":0,"369":0,"371":0,"372":0,"374":0,"377":0,"379":0,"387":0,"397":0,"398":0,"410":0,"414":0,"429":0,"433":0,"434":0,"435":0,"438":0,"449":0,"450":0,"452":0,"457":0};
_yuitest_coverage["build/gallery-checkboxgroups/gallery-checkboxgroups.js"].functions = {"CheckboxGroup:22":0,"checkboxChanged:32":0,"getCheckboxList:45":0,"(anonymous 2):76":0,"splice:59":0,"(anonymous 3):113":0,"checkboxChanged:103":0,"allChecked:140":0,"allUnchecked:159":0,"allDisabled:177":0,"AtLeastOneCheckboxGroup:209":0,"getNextActiveIndex:222":0,"enforceConstraints:264":0,"AtMostOneCheckboxGroup:305":0,"enforceConstraints:318":0,"SelectAllCheckboxGroup:355":0,"updateSelectAll:365":0,"getSelectAllCheckbox:385":0,"toggleSelectAll:395":0,"enforceConstraints:406":0,"EnableIfAnyCheckboxGroup:429":0,"(anonymous 4):450":0,"enforceConstraints:445":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-checkboxgroups/gallery-checkboxgroups.js"].coveredLines = 113;
_yuitest_coverage["build/gallery-checkboxgroups/gallery-checkboxgroups.js"].coveredFunctions = 24;
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 1);
YUI.add('gallery-checkboxgroups', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 3);
"use strict";

/**********************************************************************
 * Various behaviors that can be attached to a group of checkboxes.
 *
 * @module gallery-checkboxgroups
 * @main gallery-checkboxgroups
 */

/**
 * <p>Base class for enforcing constraints on groups of checkboxes.</p>
 *
 * <p>Derived classes must override <code>enforceConstraints()</code>.</p>
 * 
 * @class CheckboxGroup
 * @constructor
 * @param cb_list {String|Node|NodeList} The list of checkboxes to manage
 */

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 22);
function CheckboxGroup(
	/* string/Node/NodeList */	cb_list)
{
	_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "CheckboxGroup", 22);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 25);
this.cb_list = new Y.NodeList('');
	_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 26);
this.ev_list = [];
	_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 27);
this.splice(0, 0, cb_list);

	_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 29);
this.ignore_change = false;
}

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 32);
function checkboxChanged(
	/* event */		e,
	/* object */	obj)
{
	_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "checkboxChanged", 32);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 36);
this.checkboxChanged(e.target);
}

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 39);
CheckboxGroup.prototype =
{
	/**
	 * @method getCheckboxList
	 * @return {NodeList} List of managed checkboxes
	 */
	getCheckboxList: function()
	{
		_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "getCheckboxList", 45);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 47);
return this.cb_list;
	},

	/**
	 * Same functionality as <code>Array.splice()</code>.  Operates on the
	 * list of managed checkboxes.
	 * 
	 * @method splice
	 * @param start {Int} Insertion index
	 * @param delete_count {Int} Number of items to remove, starting from <code>start</code>
	 * @param cb_list {String|Node|NodeList} The list of checkboxes to insert at <code>start</code>
	 */
	splice: function(
		/* int */					start,
		/* int */					delete_count,
		/* string/Node/NodeList */	cb_list)
	{
		_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "splice", 59);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 64);
for (var i=start; i<delete_count; i++)
		{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 66);
this.ev_list[i].detach();
		}

		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 69);
if (Y.Lang.isString(cb_list))
		{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 71);
cb_list = Y.all(cb_list);
		}

		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 74);
if (cb_list instanceof Y.NodeList)
		{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 76);
cb_list.each(function(cb, i)
			{
				_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "(anonymous 2)", 76);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 78);
var j=start+i, k=(i===0 ? delete_count : 0);
				_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 79);
this.cb_list.splice(j, k, cb);
				_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 80);
this.ev_list.splice(j, k, cb.on('click', checkboxChanged, this));
			},
			this);
		}
		else {_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 84);
if (cb_list && cb_list._node)
		{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 86);
this.cb_list.splice(start, delete_count, cb_list);
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 87);
this.ev_list.splice(start, delete_count, cb_list.on('click', checkboxChanged, this));
		}
		else
		{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 91);
this.cb_list.splice(start, delete_count);
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 92);
this.ev_list.splice(start, delete_count);
		}}
	},

	/**
	 * Call this if you modify the checkbox programmatically, since that
	 * will not fire a click event.
	 * 
	 * @method checkboxChanged
	 * @param cb {Node|String} checkbox that was modified
	 */
	checkboxChanged: function(
		/* checkbox */	cb)
	{
		_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "checkboxChanged", 103);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 106);
if (this.ignore_change || this.cb_list.isEmpty() || this.allDisabled())
		{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 108);
return;
		}

		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 111);
cb = Y.one(cb);

		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 113);
this.cb_list.each(function(cb1, i)
		{
			_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "(anonymous 3)", 113);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 115);
if (cb1 == cb)
			{
				_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 117);
this.enforceConstraints(this.cb_list, i);
			}
		},
		this);
	},

	/**
	 * Derived classes must override this function to implement the desired behavior.
	 * 
	 * @method enforceConstraints
	 * @param cb_list {String|Object|Array} The list of checkboxes
	 * @param index {Int} The index of the checkbox that changed
	 */
	enforceConstraints: function(
		/* NodeList */	cb_list,
		/* int */		index)
	{
	},

	/**
	 * @method allChecked
	 * @return {boolean} <code>true</code> if all checkboxes are checked
	 */
	allChecked: function()
	{
		_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "allChecked", 140);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 142);
var count = this.cb_list.size();
		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 143);
for (var i=0; i<count; i++)
		{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 145);
var cb = this.cb_list.item(i);
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 146);
if (!cb.get('disabled') && !cb.get('checked'))
			{
				_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 148);
return false;
			}
		}

		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 152);
return true;
	},

	/**
	 * @method allUnchecked
	 * @return {boolean} <code>true</code> if all checkboxes are unchecked
	 */
	allUnchecked: function()
	{
		_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "allUnchecked", 159);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 161);
var count = this.cb_list.size();
		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 162);
for (var i=0; i<count; i++)
		{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 164);
if (this.cb_list.item(i).get('checked'))
			{
				_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 166);
return false;
			}
		}

		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 170);
return true;
	},

	/**
	 * @method allDisabled
	 * @return {boolean} <code>true</code> if all checkboxes are disabled
	 */
	allDisabled: function()
	{
		_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "allDisabled", 177);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 179);
var count = this.cb_list.size();
		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 180);
for (var i=0; i<count; i++)
		{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 182);
if (!this.cb_list.item(i).get('disabled'))
			{
				_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 184);
return false;
			}
		}

		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 188);
return true;
	}
};

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 192);
Y.CheckboxGroup = CheckboxGroup;
/**
 * @module gallery-checkboxgroups
 */

/**********************************************************************
 * At least one checkbox must be selected.  If the last one is turned off,
 * the active, adjacent one is turned on.  The exact algorithm is explained
 * in "Tog on Interface".  The checkboxes are assumed to be ordered in the
 * order they were added.
 * 
 * @class AtLeastOneCheckboxGroup
 * @extends CheckboxGroup
 * @constructor
 * @param cb_list {String|Node|NodeList} The list of checkboxes to manage
 */

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 209);
function AtLeastOneCheckboxGroup(
	/* string/Node/NodeList */	cb_list)
{
	_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "AtLeastOneCheckboxGroup", 209);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 212);
this.direction = AtLeastOneDirection.SLIDE_UP;
	_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 213);
AtLeastOneCheckboxGroup.superclass.constructor.call(this, cb_list);
}

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 216);
var AtLeastOneDirection =
{
	SLIDE_UP:   0,
	SLIDE_DOWN: 1
};

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 222);
function getNextActiveIndex(
	/* NodeList */	cb_list,
	/* int */		index)
{
	_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "getNextActiveIndex", 222);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 226);
if (cb_list.size() < 2)
		{
		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 228);
return index;
		}

	_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 231);
var new_index = index;
	_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 232);
do
		{
		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 234);
if (new_index === 0)
			{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 236);
this.direction = AtLeastOneDirection.SLIDE_DOWN;
			}
		else {_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 238);
if (new_index == cb_list.size()-1)
			{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 240);
this.direction = AtLeastOneDirection.SLIDE_UP;
			}}

		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 243);
if (this.direction == AtLeastOneDirection.SLIDE_UP)
			{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 245);
new_index = Math.max(0, new_index-1);
			}
		else
			{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 249);
new_index = Math.min(cb_list.size()-1, new_index+1);
			}
		}while (cb_list.item(new_index).get('disabled'));

	_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 254);
return new_index;
}

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 257);
Y.extend(AtLeastOneCheckboxGroup, CheckboxGroup,
{
	/**
	 * @method enforceConstraints
	 * @param cb_list {String|Object|Array} The list of checkboxes
	 * @param index {Int} The index of the checkbox that changed
	 */
	enforceConstraints: function(
		/* NodeList */	cb_list,
		/* int */		index)
	{
		_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "enforceConstraints", 264);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 268);
if (cb_list.item(index).get('checked') || !this.allUnchecked())
		{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 270);
this.direction = AtLeastOneDirection.SLIDE_UP;
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 271);
return;
		}

		// slide to the adjacent checkbox, skipping over disabled ones

		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 276);
var new_index = getNextActiveIndex.call(this, cb_list, index);
		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 277);
if (new_index == index)											// may have hit the end and bounced back
			{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 279);
new_index = getNextActiveIndex.call(this, cb_list, index);	// if newID == id, then there is only one enabled
			}

		// turn the new checkbox on

		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 284);
this.ignore_change = true;
		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 285);
cb_list.item(new_index).set('checked', true);
		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 286);
this.ignore_change = false;
	}
});

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 290);
Y.AtLeastOneCheckboxGroup = AtLeastOneCheckboxGroup;
/**
 * @module gallery-checkboxgroups
 */

/**********************************************************************
 * At most one checkbox can be selected.  If one is turned on, the active
 * one is turned off.
 * 
 * @class AtMostOneCheckboxGroup
 * @extends CheckboxGroup
 * @constructor
 * @param cb_list {String|Node|NodeList} The list of checkboxes to manage
 */

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 305);
function AtMostOneCheckboxGroup(
	/* string/Node/NodeList */	cb_list)
{
	_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "AtMostOneCheckboxGroup", 305);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 308);
AtMostOneCheckboxGroup.superclass.constructor.call(this, cb_list);
}

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 311);
Y.extend(AtMostOneCheckboxGroup, CheckboxGroup,
{
	/**
	 * @method enforceConstraints
	 * @param cb_list {String|Object|Array} The list of checkboxes
	 * @param index {Int} The index of the checkbox that changed
	 */
	enforceConstraints: function(
		/* NodeList */	cb_list,
		/* int */	index)
	{
		_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "enforceConstraints", 318);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 322);
if (!cb_list.item(index).get('checked'))
		{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 324);
return;
		}

		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 327);
var count = cb_list.size();
		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 328);
for (var i=0; i<count; i++)
		{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 330);
if (i != index)
			{
				_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 332);
cb_list.item(i).set('checked', false);
			}
		}
	}
});

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 338);
Y.AtMostOneCheckboxGroup = AtMostOneCheckboxGroup;
/**
 * @module gallery-checkboxgroups
 */

/**********************************************************************
 * All checkboxes can be selected and a select-all checkbox is available
 * to check all. This check-all box is automatically changed if any other
 * checkbox changes state.
 * 
 * @class SelectAllCheckboxGroup
 * @extends CheckboxGroup
 * @constructor
 * @param select_all_cb {String|Object} The checkbox that triggers "select all"
 * @param cb_list {String|Node|NodeList} The list of checkboxes to manage
 */

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 355);
function SelectAllCheckboxGroup(
	/* string/Node */			select_all_cb,
	/* string/Node/NodeList */	cb_list)
{
	_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "SelectAllCheckboxGroup", 355);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 359);
this.select_all_cb = Y.one(select_all_cb);
	_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 360);
this.select_all_cb.on('click', updateSelectAll, this);

	_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 362);
SelectAllCheckboxGroup.superclass.constructor.call(this, cb_list);
}

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 365);
function updateSelectAll()
{
	_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "updateSelectAll", 365);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 367);
var checked = this.select_all_cb.get('checked');
	_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 368);
var count   = this.cb_list.size();
	_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 369);
for (var i=0; i<count; i++)
	{
		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 371);
var cb = this.cb_list.item(i);
		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 372);
if (!cb.get('disabled'))
		{
			_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 374);
cb.set('checked', checked);
		}
	}
}_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 377);
;

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 379);
Y.extend(SelectAllCheckboxGroup, CheckboxGroup,
{
	/**
	 * @method getSelectAllCheckbox
	 * @return {Node} checkbox that controls "select all"
	 */
	getSelectAllCheckbox: function()
	{
		_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "getSelectAllCheckbox", 385);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 387);
return this.select_all_cb;
	},

	/**
	 * Toggle the setting of the "select all" checkbox.
	 *
	 * @method toggleSelectAll
	 */
	toggleSelectAll: function()
	{
		_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "toggleSelectAll", 395);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 397);
this.select_call_cb.set('checked', !this.select_all_cb.get('checked'));
		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 398);
updateSelectAll.call(this);
	},

	/**
	 * @method enforceConstraints
	 * @param cb_list {String|Object|Array} The list of checkboxes
	 * @param index {Int} The index of the checkbox that changed
	 */
	enforceConstraints: function(
		/* NodeList */	cb_list,
		/* int */		index)
	{
		_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "enforceConstraints", 406);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 410);
this.select_all_cb.set('checked', this.allChecked());
	}
});

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 414);
Y.SelectAllCheckboxGroup = SelectAllCheckboxGroup;
/**
 * @module gallery-checkboxgroups
 */

/**********************************************************************
 * Enables the given list of nodes if any checkboxes are checked.
 * 
 * @class EnableIfAnyCheckboxGroup
 * @extends CheckboxGroup
 * @constructor
 * @param cb_list {String|Node|NodeList} The list of checkboxes to manage
 * @param nodes {String|NodeList} The nodes to enable/disable
 */

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 429);
function EnableIfAnyCheckboxGroup(
	/* string/Node/NodeList */	cb_list,
	/* string/NodeList */		nodes)
{
	_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "EnableIfAnyCheckboxGroup", 429);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 433);
this.nodes = Y.Lang.isString(nodes) ? Y.all(nodes) : nodes;
	_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 434);
EnableIfAnyCheckboxGroup.superclass.constructor.call(this, cb_list);
	_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 435);
this.enforceConstraints(this.cb_list, 0);
}

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 438);
Y.extend(EnableIfAnyCheckboxGroup, CheckboxGroup,
{
	/**
	 * @method enforceConstraints
	 * @param cb_list {String|Object|Array} The list of checkboxes
	 * @param index {Int} The index of the checkbox that changed
	 */
	enforceConstraints: function(
		/* NodeList */	cb_list,
		/* int */		index)
	{
		_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "enforceConstraints", 445);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 449);
var disable = this.allUnchecked();
		_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 450);
this.nodes.each(function(node)
		{
			_yuitest_coverfunc("build/gallery-checkboxgroups/gallery-checkboxgroups.js", "(anonymous 4)", 450);
_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 452);
node.set('disabled', disable);
		});
	}
});

_yuitest_coverline("build/gallery-checkboxgroups/gallery-checkboxgroups.js", 457);
Y.EnableIfAnyCheckboxGroup = EnableIfAnyCheckboxGroup;


}, '@VERSION@', {"requires": ["node-base"]});
