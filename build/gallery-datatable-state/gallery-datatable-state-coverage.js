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
_yuitest_coverage["build/gallery-datatable-state/gallery-datatable-state.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-datatable-state/gallery-datatable-state.js",
    code: []
};
_yuitest_coverage["build/gallery-datatable-state/gallery-datatable-state.js"].code=["YUI.add('gallery-datatable-state', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-datatable-state"," */","","/**********************************************************************"," * <p>Plugin for DataTable to preserve state, either on a single page or"," * across pages.</p>"," *"," * @main gallery-datatable-state"," * @class DataTableState"," * @namespace Plugin"," * @extends Plugin.Base"," * @constructor"," * @param config {Object} configuration"," */","function State(","	/* object */ config)","{","	State.superclass.constructor.call(this, config);","}","","State.NAME = \"DataTableStatePlugin\";","State.NS   = \"state\";","","State.ATTRS =","{","	/**","	 * Id of a column (usually not displayed) that yields a","	 * unique value for each record.  The saved state is index by the value","	 * of this column.","	 *","	 * @attribute uniqueIdKey","	 * @type {String}","	 * @required","	 */","	uniqueIdKey:","	{","		validator: Y.Lang.isString","	},","","	/**","	 * List of objects specifying the values to be saved before","	 * the table is re-rendered.  Each object must define:","	 * <dl>","	 * <dt>column</dt>","	 * <dd>the column key</dd>","	 * <dt>node or widget</dt>","	 * <dd>CSS selector to find either the node or the widget container inside a cell</dd>","	 * <dt>key</dt>","	 * <dd>the value to pass to get/set</dd>","	 * <dt>temp</dt>","	 * <dd>true if the state should be cleared when paginating</dd>","	 * </dl>","	 * If a value should not be maintained when paginating, specify temp:true.","	 *","	 * @attribute save","	 * @type {Array}","	 * @required","	 */","	save:","	{","		value:     [],","		validator: Y.Lang.isArray","	},","","	/**","	 * Paginator that triggers clearing of temporary state.  If","	 * this is not specified, temp:true will have no effect in the \"save\"","	 * configuration.","	 * ","	 * @attribute paginator","	 * @type {Paginator}","	 */","	paginator:","	{","		validator: function(value)","		{","			return (!value || Y.Lang.isObject(value));","		}","	}","};","","function removeKey(key, obj)","{","	delete obj[key];","}","","function clearState(key)","{","	Y.each(this.state, Y.bind(removeKey, null, key));","}","","function analyzeColumns()","{","	var list = this.get('host')._displayColumns;","","	Y.each(this.get('save'), function(item)","	{","		item.column_index = Y.Array.findIndexOf(list, function(c)","		{","			return c.key === item.column;","		});","","		if (item.column_index < 0)","		{","			clearState.call(this, item.column);","		}","	},","	this);","}","","function saveState()","{","	var host   = this.get('host');","	var count  = host.data.size();","	var id_key = this.get('uniqueIdKey');","	Y.each(this.get('save'), function(item)","	{","		if (item.column_index < 0)","		{","			return;","		}","","		for (var i=0; i<count; i++)","		{","			var value = null;","","			var cell = host.getCell([i, item.column_index]);","			if (cell)","			{","				if (item.node)","				{","					var node = cell.one(item.node);","					if (node)","					{","						value = node.get(item.key);","					}","				}","				else if (item.widget)","				{","					var widget = Y.Widget.getByNode(cell.one(item.widget));","					if (widget)","					{","						value = widget.get(item.key);","					}","				}","			}","","			var rec = host.getRecord(i);","			var id  = rec.get(id_key);","			if (!this.state[id])","			{","				this.state[id] = {};","			}","			this.state[ id ][ item.column ] = value;","		}","	},","	this);","}","","function restoreState()","{","	var host   = this.get('host');","	var count  = host.data.size();","	var id_key = this.get('uniqueIdKey');","	Y.each(this.get('save'), function(item)","	{","		if (item.column_index < 0)","		{","			return;","		}","","		for (var i=0; i<count; i++)","		{","			var rec   = host.getRecord(i);","			var state = this.state[ rec.get(id_key) ];","			if (state)","			{","				var value = state[ item.column ];","				var cell  = host.getCell([i, item.column_index]);","				if (cell)","				{","					if (item.node)","					{","						var node = cell.one(item.node);","						if (node)","						{","							node.set(item.key, value);","						}","					}","					else if (item.widget)","					{","						var widget = Y.Widget.getByNode(cell.one(item.widget));","						if (widget)","						{","							widget.set(item.key, value);","						}","					}","				}","			}","		}","	},","	this);","}","","function clearTempState()","{","	Y.each(this.get('save'), function(item)","	{","		if (item.column_index < 0 || item.temp)","		{","			clearState.call(this, item.column);","		}","	},","	this);","}","","function listenToPaginator(pg)","{","	pg.on('datatable-state-paginator|changeRequest', clearTempState, this);","}","","Y.extend(State, Y.Plugin.Base,","{","	initializer: function(config)","	{","		this.state = {};","		this.on('uniqueIdKeyChange', function()","		{","			this.state = {};","		});","","		if (config.paginator)","		{","			listenToPaginator.call(this, config.paginator)","		}","","		this.on('paginatorChange', function(e)","		{","			Y.detach('datatable-state-paginator|*');","","			if (e.newVal)","			{","				listenToPaginator.call(this, e.newVal);","			}","		});","","		analyzeColumns.call(this);","		this.after('saveChange', analyzeColumns);","		this.afterHostEvent('columnsChange', analyzeColumns);","","		var host        = this.get('host');","		var self        = this;","		var orig_syncUI = this.orig_syncUI = host.syncUI;","		host.syncUI = function()","		{","			saveState.call(self);","			orig_syncUI.apply(host, arguments);","			restoreState.call(self);","		}","","		this.onHostEvent('dataChange', saveState);","		this.afterHostEvent('dataChange', function()","		{","			Y.later(0, this, restoreState);","		});","	},","","	destructor: function()","	{","		this.get('host').syncUI = this.orig_syncUI;","	},","","	/**","	 * @method getState","	 * @return {Object} state for each row, indexed by uniqueIdKey and column key","	 */","	getState: function()","	{","		saveState.call(this);","		return this.state;","	}","});","","Y.namespace(\"Plugin\");","Y.Plugin.DataTableState = State;","","","}, '@VERSION@', {\"requires\": [\"datatable\", \"plugin\", \"gallery-funcprog\", \"gallery-node-optimizations\"]});"];
_yuitest_coverage["build/gallery-datatable-state/gallery-datatable-state.js"].lines = {"1":0,"3":0,"20":0,"23":0,"26":0,"27":0,"29":0,"82":0,"87":0,"89":0,"92":0,"94":0,"97":0,"99":0,"101":0,"103":0,"105":0,"108":0,"110":0,"116":0,"118":0,"119":0,"120":0,"121":0,"123":0,"125":0,"128":0,"130":0,"132":0,"133":0,"135":0,"137":0,"138":0,"140":0,"143":0,"145":0,"146":0,"148":0,"153":0,"154":0,"155":0,"157":0,"159":0,"165":0,"167":0,"168":0,"169":0,"170":0,"172":0,"174":0,"177":0,"179":0,"180":0,"181":0,"183":0,"184":0,"185":0,"187":0,"189":0,"190":0,"192":0,"195":0,"197":0,"198":0,"200":0,"210":0,"212":0,"214":0,"216":0,"222":0,"224":0,"227":0,"231":0,"232":0,"234":0,"237":0,"239":0,"242":0,"244":0,"246":0,"248":0,"252":0,"253":0,"254":0,"256":0,"257":0,"258":0,"259":0,"261":0,"262":0,"263":0,"266":0,"267":0,"269":0,"275":0,"284":0,"285":0,"289":0,"290":0};
_yuitest_coverage["build/gallery-datatable-state/gallery-datatable-state.js"].functions = {"State:20":0,"validator:80":0,"removeKey:87":0,"clearState:92":0,"(anonymous 3):103":0,"(anonymous 2):101":0,"analyzeColumns:97":0,"(anonymous 4):121":0,"saveState:116":0,"(anonymous 5):170":0,"restoreState:165":0,"(anonymous 6):212":0,"clearTempState:210":0,"listenToPaginator:222":0,"(anonymous 7):232":0,"(anonymous 8):242":0,"syncUI:259":0,"(anonymous 9):267":0,"initializer:229":0,"destructor:273":0,"getState:282":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-datatable-state/gallery-datatable-state.js"].coveredLines = 99;
_yuitest_coverage["build/gallery-datatable-state/gallery-datatable-state.js"].coveredFunctions = 22;
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 1);
YUI.add('gallery-datatable-state', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 3);
"use strict";

/**
 * @module gallery-datatable-state
 */

/**********************************************************************
 * <p>Plugin for DataTable to preserve state, either on a single page or
 * across pages.</p>
 *
 * @main gallery-datatable-state
 * @class DataTableState
 * @namespace Plugin
 * @extends Plugin.Base
 * @constructor
 * @param config {Object} configuration
 */
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 20);
function State(
	/* object */ config)
{
	_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "State", 20);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 23);
State.superclass.constructor.call(this, config);
}

_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 26);
State.NAME = "DataTableStatePlugin";
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 27);
State.NS   = "state";

_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 29);
State.ATTRS =
{
	/**
	 * Id of a column (usually not displayed) that yields a
	 * unique value for each record.  The saved state is index by the value
	 * of this column.
	 *
	 * @attribute uniqueIdKey
	 * @type {String}
	 * @required
	 */
	uniqueIdKey:
	{
		validator: Y.Lang.isString
	},

	/**
	 * List of objects specifying the values to be saved before
	 * the table is re-rendered.  Each object must define:
	 * <dl>
	 * <dt>column</dt>
	 * <dd>the column key</dd>
	 * <dt>node or widget</dt>
	 * <dd>CSS selector to find either the node or the widget container inside a cell</dd>
	 * <dt>key</dt>
	 * <dd>the value to pass to get/set</dd>
	 * <dt>temp</dt>
	 * <dd>true if the state should be cleared when paginating</dd>
	 * </dl>
	 * If a value should not be maintained when paginating, specify temp:true.
	 *
	 * @attribute save
	 * @type {Array}
	 * @required
	 */
	save:
	{
		value:     [],
		validator: Y.Lang.isArray
	},

	/**
	 * Paginator that triggers clearing of temporary state.  If
	 * this is not specified, temp:true will have no effect in the "save"
	 * configuration.
	 * 
	 * @attribute paginator
	 * @type {Paginator}
	 */
	paginator:
	{
		validator: function(value)
		{
			_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "validator", 80);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 82);
return (!value || Y.Lang.isObject(value));
		}
	}
};

_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 87);
function removeKey(key, obj)
{
	_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "removeKey", 87);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 89);
delete obj[key];
}

_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 92);
function clearState(key)
{
	_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "clearState", 92);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 94);
Y.each(this.state, Y.bind(removeKey, null, key));
}

_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 97);
function analyzeColumns()
{
	_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "analyzeColumns", 97);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 99);
var list = this.get('host')._displayColumns;

	_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 101);
Y.each(this.get('save'), function(item)
	{
		_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "(anonymous 2)", 101);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 103);
item.column_index = Y.Array.findIndexOf(list, function(c)
		{
			_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "(anonymous 3)", 103);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 105);
return c.key === item.column;
		});

		_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 108);
if (item.column_index < 0)
		{
			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 110);
clearState.call(this, item.column);
		}
	},
	this);
}

_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 116);
function saveState()
{
	_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "saveState", 116);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 118);
var host   = this.get('host');
	_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 119);
var count  = host.data.size();
	_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 120);
var id_key = this.get('uniqueIdKey');
	_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 121);
Y.each(this.get('save'), function(item)
	{
		_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "(anonymous 4)", 121);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 123);
if (item.column_index < 0)
		{
			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 125);
return;
		}

		_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 128);
for (var i=0; i<count; i++)
		{
			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 130);
var value = null;

			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 132);
var cell = host.getCell([i, item.column_index]);
			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 133);
if (cell)
			{
				_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 135);
if (item.node)
				{
					_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 137);
var node = cell.one(item.node);
					_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 138);
if (node)
					{
						_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 140);
value = node.get(item.key);
					}
				}
				else {_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 143);
if (item.widget)
				{
					_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 145);
var widget = Y.Widget.getByNode(cell.one(item.widget));
					_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 146);
if (widget)
					{
						_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 148);
value = widget.get(item.key);
					}
				}}
			}

			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 153);
var rec = host.getRecord(i);
			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 154);
var id  = rec.get(id_key);
			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 155);
if (!this.state[id])
			{
				_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 157);
this.state[id] = {};
			}
			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 159);
this.state[ id ][ item.column ] = value;
		}
	},
	this);
}

_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 165);
function restoreState()
{
	_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "restoreState", 165);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 167);
var host   = this.get('host');
	_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 168);
var count  = host.data.size();
	_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 169);
var id_key = this.get('uniqueIdKey');
	_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 170);
Y.each(this.get('save'), function(item)
	{
		_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "(anonymous 5)", 170);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 172);
if (item.column_index < 0)
		{
			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 174);
return;
		}

		_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 177);
for (var i=0; i<count; i++)
		{
			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 179);
var rec   = host.getRecord(i);
			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 180);
var state = this.state[ rec.get(id_key) ];
			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 181);
if (state)
			{
				_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 183);
var value = state[ item.column ];
				_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 184);
var cell  = host.getCell([i, item.column_index]);
				_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 185);
if (cell)
				{
					_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 187);
if (item.node)
					{
						_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 189);
var node = cell.one(item.node);
						_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 190);
if (node)
						{
							_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 192);
node.set(item.key, value);
						}
					}
					else {_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 195);
if (item.widget)
					{
						_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 197);
var widget = Y.Widget.getByNode(cell.one(item.widget));
						_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 198);
if (widget)
						{
							_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 200);
widget.set(item.key, value);
						}
					}}
				}
			}
		}
	},
	this);
}

_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 210);
function clearTempState()
{
	_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "clearTempState", 210);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 212);
Y.each(this.get('save'), function(item)
	{
		_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "(anonymous 6)", 212);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 214);
if (item.column_index < 0 || item.temp)
		{
			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 216);
clearState.call(this, item.column);
		}
	},
	this);
}

_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 222);
function listenToPaginator(pg)
{
	_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "listenToPaginator", 222);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 224);
pg.on('datatable-state-paginator|changeRequest', clearTempState, this);
}

_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 227);
Y.extend(State, Y.Plugin.Base,
{
	initializer: function(config)
	{
		_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "initializer", 229);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 231);
this.state = {};
		_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 232);
this.on('uniqueIdKeyChange', function()
		{
			_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "(anonymous 7)", 232);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 234);
this.state = {};
		});

		_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 237);
if (config.paginator)
		{
			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 239);
listenToPaginator.call(this, config.paginator)
		}

		_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 242);
this.on('paginatorChange', function(e)
		{
			_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "(anonymous 8)", 242);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 244);
Y.detach('datatable-state-paginator|*');

			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 246);
if (e.newVal)
			{
				_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 248);
listenToPaginator.call(this, e.newVal);
			}
		});

		_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 252);
analyzeColumns.call(this);
		_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 253);
this.after('saveChange', analyzeColumns);
		_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 254);
this.afterHostEvent('columnsChange', analyzeColumns);

		_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 256);
var host        = this.get('host');
		_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 257);
var self        = this;
		_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 258);
var orig_syncUI = this.orig_syncUI = host.syncUI;
		_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 259);
host.syncUI = function()
		{
			_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "syncUI", 259);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 261);
saveState.call(self);
			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 262);
orig_syncUI.apply(host, arguments);
			_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 263);
restoreState.call(self);
		}

		_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 266);
this.onHostEvent('dataChange', saveState);
		_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 267);
this.afterHostEvent('dataChange', function()
		{
			_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "(anonymous 9)", 267);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 269);
Y.later(0, this, restoreState);
		});
	},

	destructor: function()
	{
		_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "destructor", 273);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 275);
this.get('host').syncUI = this.orig_syncUI;
	},

	/**
	 * @method getState
	 * @return {Object} state for each row, indexed by uniqueIdKey and column key
	 */
	getState: function()
	{
		_yuitest_coverfunc("build/gallery-datatable-state/gallery-datatable-state.js", "getState", 282);
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 284);
saveState.call(this);
		_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 285);
return this.state;
	}
});

_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 289);
Y.namespace("Plugin");
_yuitest_coverline("build/gallery-datatable-state/gallery-datatable-state.js", 290);
Y.Plugin.DataTableState = State;


}, '@VERSION@', {"requires": ["datatable", "plugin", "gallery-funcprog", "gallery-node-optimizations"]});
