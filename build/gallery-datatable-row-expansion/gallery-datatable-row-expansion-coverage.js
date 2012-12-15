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
_yuitest_coverage["build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js",
    code: []
};
_yuitest_coverage["build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js"].code=["YUI.add('gallery-datatable-row-expansion', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-datatable-row-expansion"," */","","/**********************************************************************"," * <p>Plugin for DataTable to show additional information for each row via"," * a twistdown.  The result of the template is displayed spanning all the"," * columns beyond the twistdown column.</p>"," * "," * <p>This class patches `getCell` and `getRow` to ignore the additional"," * rows created by this plugin.</p>"," *"," * @main gallery-datatable-row-expansion"," * @class DataTableRowExpansion"," * @namespace Plugin"," * @extends Plugin.Base"," * @constructor"," * @param config {Object} configuration"," */","function RowExpansion(","	/* object */ config)","{","	RowExpansion.superclass.constructor.call(this, config);","}","","RowExpansion.NAME = \"DataTableRowExpansionPlugin\";","RowExpansion.NS   = \"rowexpander\";","","RowExpansion.ATTRS =","{","	/**","	 * String template or function that returns a string.","	 *","	 * @attribute template","	 * @type {String|Function}","	 * @required","	 */","	template:","	{","		value:     '',","		validator: function(value)","		{","			return (Y.Lang.isString(value) || Y.Lang.isFunction(value));","		}","	},","","	/**","	 * Id of a column (usually not displayed) that yields a","	 * unique value for each record.  Used to maintain the twistdown state","	 * when paginating.","	 *","	 * @attribute uniqueIdKey","	 * @type {String}","	 * @required","	 */","	uniqueIdKey:","	{","		value:     '',","		validator: Y.Lang.isString","	}","};","","/**"," * The key used to indicate which column contains the twistdown."," *"," * @property Y.RowExpansion.column_key"," * @type {String}"," * @value \"row-expander\""," */","RowExpansion.column_key = 'row-expander';","","/**"," * The class added to rows created by this plugin."," *"," * @property Y.RowExpansion.row_class"," * @type {String}"," * @value \"row-expansion\""," */","RowExpansion.row_class = 'row-expansion';","","function insertRow(o)","{","	var plugin = this.rowexpander;","","	var pre_cells = '';","	for (var i=0; i<=plugin.col_count.pre; i++)","	{","		pre_cells += '<td class=\"yui3-datatable-cell pre-row-expansion\">&nbsp;</td>';","	}","","	var tmpl = plugin.get('template');","	if (Y.Lang.isFunction(tmpl))","	{","		var s = tmpl.call(this, o.data);","	}","	else","	{","		var s = Y.Lang.sub(tmpl, o.data);","	}","","	var row       = o.cell.ancestor();","	var extra_row = Y.Lang.sub(","		'<tr class=\"{c}\">' +","			'{pre}' +","			'<td colspan=\"{post}\" class=\"yui3-datatable-cell post-row-expansion\">{tmpl}</td>' +","		'</tr>',","		{","			c:    row.get('className') + ' ' + RowExpansion.row_class,","			pre:  pre_cells,","			post: plugin.col_count.post,","			tmpl: s","		});","","	row.insert(extra_row, 'after');","}","","function formatTwistdown(o)","{","	var plugin = this.rowexpander,","		row_id = o.data[ plugin.get('uniqueIdKey') ],","		open   = plugin.open_rows[ row_id ];","","	o.td.addClass('row-toggle');","	o.td.replaceClass('row-(open|closed)', open ? 'row-open' : 'row-closed');","","	o.td.on('click', function()","	{","		var open = plugin.open_rows[ row_id ] = ! plugin.open_rows[ row_id ];","","		if (open)","		{","			insertRow.call(this, o);","		}","		else","		{","			o.cell.ancestor().next().remove();","		}","	},","	this);","","	o.cell.set('innerHTML', '<a class=\"row-expand-nub\" href=\"javascript:void(0);\"></a>');","","	if (open)","	{","		insertRow.call(this, o);","	}","}","","function analyzeColumns()","{","	function countColumns(result, col)","	{","		if (col.key == RowExpansion.column_key)","		{","			col.nodeFormatter = formatTwistdown;","			result.found      = true;","		}","		else if (col.children)","		{","			result = Y.reduce(col.children, result, countColumns);","		}","		else","		{","			result[ result.found ? 'post' : 'pre' ]++;","		}","		return result;","	}","","	this.col_count = Y.reduce(","		this.get('host').get('columns'),","		{ pre:0, post:0, found:false },","		countColumns);","}","","var shift_map =","{","	above:    [-1,  0],","	below:    [ 1,  0],","	next:     [ 0,  1],","	prev:     [ 0, -1],","	previous: [ 0, -1]","};","","/*","Returns the `<td>` Node from the given row and column index.  Alternately,","the `seed` can be a Node.  If so, the nearest ancestor cell is returned.","If the `seed` is a cell, it is returned.  If there is no cell at the given","coordinates, `null` is returned.","","Optionally, include an offset array or string to return a cell near the","cell identified by the `seed`.  The offset can be an array containing the","number of rows to shift followed by the number of columns to shift, or one","of \"above\", \"below\", \"next\", or \"previous\".","","<pre><code>// Previous cell in the previous row","var cell = table.getCell(e.target, [-1, -1]);","","// Next cell","var cell = table.getCell(e.target, 'next');","var cell = table.getCell(e.taregt, [0, 1];</pre></code>","","@method getCell","@param {Number[]|Node} seed Array of row and column indexes, or a Node that","   is either the cell itself or a descendant of one.","@param {Number[]|String} [shift] Offset by which to identify the returned","   cell Node","@return {Node}","@since 3.5.0","*/","function getCell(seed, shift)","{","	var tbody = this.tbodyNode,","		row, cell;","","	if (seed && tbody)","	{","		if (Y.Lang.isString(shift))","		{","			if (shift_map[shift])","			{","				shift = shift_map[shift];","			}","			else","			{","				throw Error('unknown shift in getCell: ' + shift);","			}","		}","","		if (Y.Lang.isArray(seed))","		{","			row  = tbody.get('children').item(0);","			cell = row && row.get('children').item(seed[1]);","			if (shift)","			{","				shift[0] += seed[0];","			}","			else","			{","				shift = [ seed[0], 0 ];","			}","		}","		else if (seed._node)","		{","			cell = seed.ancestor('.' + this.getClassName('cell'), true);","			if (cell.ancestor('tr.' + RowExpansion.row_class))","			{","				throw Error('getCell cannot be called with an element from an expansion row');","			}","		}","","		if (cell && shift)","		{","			var firstRowIndex = tbody.get('firstChild.rowIndex');","			if (Y.Lang.isArray(shift))","			{","				row       = cell.ancestor();","				var delta = Math.sign(shift[0]);","				if (delta !== 0)","				{","					var rows  = tbody.get('children');","					var index = row.get('rowIndex') - firstRowIndex;","					var count = Math.abs(shift[0]);","					for (var i=0; i<count && row; i++)","					{","						index += delta;","						row    = rows.item(index);","						if (row && row.hasClass(RowExpansion.row_class))","						{","							index += delta;","							row    = rows.item(index);","						}","					}","				}","","				index = cell.get('cellIndex') + shift[1];","				cell  = row && row.get('children').item(index);","			}","		}","	}","","	return (cell || null);","}","","/*","Returns the `<tr>` Node from the given row index, Model, or Model's","`clientId`.  If the rows haven't been rendered yet, or if the row can't be","found by the input, `null` is returned.","","@method getRow","@param {Number|String|Model} id Row index, Model instance, or clientId","@return {Node}","@since 3.5.0","*/","function getRow(id)","{","	var tbody = this.tbodyNode,","		row   = null;","","	if (tbody)","	{","		if (id)","		{","			id = this._idMap[id.get ? id.get('clientId') : id] || id;","		}","","		row = Y.one(Y.Lang.isNumber(id) ? this.getCell([id,0]).ancestor() : '#' + id);","	}","","	return row;","}","","function replaceGetters()","{","	var view = this.get('host').view;","	if (view instanceof Y.DataTable.TableView &&","		view.body instanceof Y.DataTable.BodyView)","	{","		var body = view.body;","","		this.orig_getCell = body.getCell;","		this.orig_getRow  = body.getRow;","","		body.getCell = getCell;","		body.getRow  = getRow;","	}","}","","function restoreGetters()","{","	var view = this.get('host').view;","	if (view.body && this.orig_getCell)","	{","		view.body.getCell = this.orig_getCell;","	}","","	if (view.body && this.orig_getRow)","	{","		view.body.getRow = this.orig_getRow;","	}","}","","Y.extend(RowExpansion, Y.Plugin.Base,","{","	initializer: function(config)","	{","		this.open_rows = {};","		this.on('uniqueIdKeyChange', function()","		{","			this.open_rows = {};","		});","","		analyzeColumns.call(this);","		this.afterHostEvent('columnsChange', analyzeColumns);","","		this.afterHostEvent('table:renderTable', replaceGetters);","	},","","	destructor: function()","	{","		restoreGetters.call(this);","	}","});","","Y.namespace(\"Plugin\");","Y.Plugin.DataTableRowExpansion = RowExpansion;","","","}, '@VERSION@', {","    \"skinnable\": \"true\",","    \"requires\": [","        \"datatable\",","        \"plugin\",","        \"gallery-funcprog\",","        \"gallery-node-optimizations\",","        \"gallery-math\"","    ]","});"];
_yuitest_coverage["build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js"].lines = {"1":0,"3":0,"24":0,"27":0,"30":0,"31":0,"33":0,"47":0,"74":0,"83":0,"85":0,"87":0,"89":0,"90":0,"92":0,"95":0,"96":0,"98":0,"102":0,"105":0,"106":0,"118":0,"121":0,"123":0,"127":0,"128":0,"130":0,"132":0,"134":0,"136":0,"140":0,"145":0,"147":0,"149":0,"153":0,"155":0,"157":0,"159":0,"160":0,"162":0,"164":0,"168":0,"170":0,"173":0,"179":0,"214":0,"216":0,"219":0,"221":0,"223":0,"225":0,"229":0,"233":0,"235":0,"236":0,"237":0,"239":0,"243":0,"246":0,"248":0,"249":0,"251":0,"255":0,"257":0,"258":0,"260":0,"261":0,"262":0,"264":0,"265":0,"266":0,"267":0,"269":0,"270":0,"271":0,"273":0,"274":0,"279":0,"280":0,"285":0,"298":0,"300":0,"303":0,"305":0,"307":0,"310":0,"313":0,"316":0,"318":0,"319":0,"322":0,"324":0,"325":0,"327":0,"328":0,"332":0,"334":0,"335":0,"337":0,"340":0,"342":0,"346":0,"350":0,"351":0,"353":0,"356":0,"357":0,"359":0,"364":0,"368":0,"369":0};
_yuitest_coverage["build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js"].functions = {"RowExpansion:24":0,"validator:45":0,"insertRow:85":0,"(anonymous 2):130":0,"formatTwistdown:121":0,"countColumns:155":0,"analyzeColumns:153":0,"getCell:214":0,"getRow:298":0,"replaceGetters:316":0,"restoreGetters:332":0,"(anonymous 3):351":0,"initializer:348":0,"destructor:362":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js"].coveredLines = 111;
_yuitest_coverage["build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js"].coveredFunctions = 15;
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 1);
YUI.add('gallery-datatable-row-expansion', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 3);
"use strict";

/**
 * @module gallery-datatable-row-expansion
 */

/**********************************************************************
 * <p>Plugin for DataTable to show additional information for each row via
 * a twistdown.  The result of the template is displayed spanning all the
 * columns beyond the twistdown column.</p>
 * 
 * <p>This class patches `getCell` and `getRow` to ignore the additional
 * rows created by this plugin.</p>
 *
 * @main gallery-datatable-row-expansion
 * @class DataTableRowExpansion
 * @namespace Plugin
 * @extends Plugin.Base
 * @constructor
 * @param config {Object} configuration
 */
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 24);
function RowExpansion(
	/* object */ config)
{
	_yuitest_coverfunc("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", "RowExpansion", 24);
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 27);
RowExpansion.superclass.constructor.call(this, config);
}

_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 30);
RowExpansion.NAME = "DataTableRowExpansionPlugin";
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 31);
RowExpansion.NS   = "rowexpander";

_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 33);
RowExpansion.ATTRS =
{
	/**
	 * String template or function that returns a string.
	 *
	 * @attribute template
	 * @type {String|Function}
	 * @required
	 */
	template:
	{
		value:     '',
		validator: function(value)
		{
			_yuitest_coverfunc("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", "validator", 45);
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 47);
return (Y.Lang.isString(value) || Y.Lang.isFunction(value));
		}
	},

	/**
	 * Id of a column (usually not displayed) that yields a
	 * unique value for each record.  Used to maintain the twistdown state
	 * when paginating.
	 *
	 * @attribute uniqueIdKey
	 * @type {String}
	 * @required
	 */
	uniqueIdKey:
	{
		value:     '',
		validator: Y.Lang.isString
	}
};

/**
 * The key used to indicate which column contains the twistdown.
 *
 * @property Y.RowExpansion.column_key
 * @type {String}
 * @value "row-expander"
 */
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 74);
RowExpansion.column_key = 'row-expander';

/**
 * The class added to rows created by this plugin.
 *
 * @property Y.RowExpansion.row_class
 * @type {String}
 * @value "row-expansion"
 */
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 83);
RowExpansion.row_class = 'row-expansion';

_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 85);
function insertRow(o)
{
	_yuitest_coverfunc("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", "insertRow", 85);
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 87);
var plugin = this.rowexpander;

	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 89);
var pre_cells = '';
	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 90);
for (var i=0; i<=plugin.col_count.pre; i++)
	{
		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 92);
pre_cells += '<td class="yui3-datatable-cell pre-row-expansion">&nbsp;</td>';
	}

	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 95);
var tmpl = plugin.get('template');
	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 96);
if (Y.Lang.isFunction(tmpl))
	{
		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 98);
var s = tmpl.call(this, o.data);
	}
	else
	{
		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 102);
var s = Y.Lang.sub(tmpl, o.data);
	}

	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 105);
var row       = o.cell.ancestor();
	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 106);
var extra_row = Y.Lang.sub(
		'<tr class="{c}">' +
			'{pre}' +
			'<td colspan="{post}" class="yui3-datatable-cell post-row-expansion">{tmpl}</td>' +
		'</tr>',
		{
			c:    row.get('className') + ' ' + RowExpansion.row_class,
			pre:  pre_cells,
			post: plugin.col_count.post,
			tmpl: s
		});

	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 118);
row.insert(extra_row, 'after');
}

_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 121);
function formatTwistdown(o)
{
	_yuitest_coverfunc("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", "formatTwistdown", 121);
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 123);
var plugin = this.rowexpander,
		row_id = o.data[ plugin.get('uniqueIdKey') ],
		open   = plugin.open_rows[ row_id ];

	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 127);
o.td.addClass('row-toggle');
	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 128);
o.td.replaceClass('row-(open|closed)', open ? 'row-open' : 'row-closed');

	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 130);
o.td.on('click', function()
	{
		_yuitest_coverfunc("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", "(anonymous 2)", 130);
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 132);
var open = plugin.open_rows[ row_id ] = ! plugin.open_rows[ row_id ];

		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 134);
if (open)
		{
			_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 136);
insertRow.call(this, o);
		}
		else
		{
			_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 140);
o.cell.ancestor().next().remove();
		}
	},
	this);

	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 145);
o.cell.set('innerHTML', '<a class="row-expand-nub" href="javascript:void(0);"></a>');

	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 147);
if (open)
	{
		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 149);
insertRow.call(this, o);
	}
}

_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 153);
function analyzeColumns()
{
	_yuitest_coverfunc("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", "analyzeColumns", 153);
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 155);
function countColumns(result, col)
	{
		_yuitest_coverfunc("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", "countColumns", 155);
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 157);
if (col.key == RowExpansion.column_key)
		{
			_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 159);
col.nodeFormatter = formatTwistdown;
			_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 160);
result.found      = true;
		}
		else {_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 162);
if (col.children)
		{
			_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 164);
result = Y.reduce(col.children, result, countColumns);
		}
		else
		{
			_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 168);
result[ result.found ? 'post' : 'pre' ]++;
		}}
		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 170);
return result;
	}

	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 173);
this.col_count = Y.reduce(
		this.get('host').get('columns'),
		{ pre:0, post:0, found:false },
		countColumns);
}

_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 179);
var shift_map =
{
	above:    [-1,  0],
	below:    [ 1,  0],
	next:     [ 0,  1],
	prev:     [ 0, -1],
	previous: [ 0, -1]
};

/*
Returns the `<td>` Node from the given row and column index.  Alternately,
the `seed` can be a Node.  If so, the nearest ancestor cell is returned.
If the `seed` is a cell, it is returned.  If there is no cell at the given
coordinates, `null` is returned.

Optionally, include an offset array or string to return a cell near the
cell identified by the `seed`.  The offset can be an array containing the
number of rows to shift followed by the number of columns to shift, or one
of "above", "below", "next", or "previous".

<pre><code>// Previous cell in the previous row
var cell = table.getCell(e.target, [-1, -1]);

// Next cell
var cell = table.getCell(e.target, 'next');
var cell = table.getCell(e.taregt, [0, 1];</pre></code>

@method getCell
@param {Number[]|Node} seed Array of row and column indexes, or a Node that
   is either the cell itself or a descendant of one.
@param {Number[]|String} [shift] Offset by which to identify the returned
   cell Node
@return {Node}
@since 3.5.0
*/
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 214);
function getCell(seed, shift)
{
	_yuitest_coverfunc("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", "getCell", 214);
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 216);
var tbody = this.tbodyNode,
		row, cell;

	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 219);
if (seed && tbody)
	{
		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 221);
if (Y.Lang.isString(shift))
		{
			_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 223);
if (shift_map[shift])
			{
				_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 225);
shift = shift_map[shift];
			}
			else
			{
				_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 229);
throw Error('unknown shift in getCell: ' + shift);
			}
		}

		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 233);
if (Y.Lang.isArray(seed))
		{
			_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 235);
row  = tbody.get('children').item(0);
			_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 236);
cell = row && row.get('children').item(seed[1]);
			_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 237);
if (shift)
			{
				_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 239);
shift[0] += seed[0];
			}
			else
			{
				_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 243);
shift = [ seed[0], 0 ];
			}
		}
		else {_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 246);
if (seed._node)
		{
			_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 248);
cell = seed.ancestor('.' + this.getClassName('cell'), true);
			_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 249);
if (cell.ancestor('tr.' + RowExpansion.row_class))
			{
				_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 251);
throw Error('getCell cannot be called with an element from an expansion row');
			}
		}}

		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 255);
if (cell && shift)
		{
			_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 257);
var firstRowIndex = tbody.get('firstChild.rowIndex');
			_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 258);
if (Y.Lang.isArray(shift))
			{
				_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 260);
row       = cell.ancestor();
				_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 261);
var delta = Math.sign(shift[0]);
				_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 262);
if (delta !== 0)
				{
					_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 264);
var rows  = tbody.get('children');
					_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 265);
var index = row.get('rowIndex') - firstRowIndex;
					_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 266);
var count = Math.abs(shift[0]);
					_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 267);
for (var i=0; i<count && row; i++)
					{
						_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 269);
index += delta;
						_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 270);
row    = rows.item(index);
						_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 271);
if (row && row.hasClass(RowExpansion.row_class))
						{
							_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 273);
index += delta;
							_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 274);
row    = rows.item(index);
						}
					}
				}

				_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 279);
index = cell.get('cellIndex') + shift[1];
				_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 280);
cell  = row && row.get('children').item(index);
			}
		}
	}

	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 285);
return (cell || null);
}

/*
Returns the `<tr>` Node from the given row index, Model, or Model's
`clientId`.  If the rows haven't been rendered yet, or if the row can't be
found by the input, `null` is returned.

@method getRow
@param {Number|String|Model} id Row index, Model instance, or clientId
@return {Node}
@since 3.5.0
*/
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 298);
function getRow(id)
{
	_yuitest_coverfunc("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", "getRow", 298);
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 300);
var tbody = this.tbodyNode,
		row   = null;

	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 303);
if (tbody)
	{
		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 305);
if (id)
		{
			_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 307);
id = this._idMap[id.get ? id.get('clientId') : id] || id;
		}

		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 310);
row = Y.one(Y.Lang.isNumber(id) ? this.getCell([id,0]).ancestor() : '#' + id);
	}

	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 313);
return row;
}

_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 316);
function replaceGetters()
{
	_yuitest_coverfunc("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", "replaceGetters", 316);
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 318);
var view = this.get('host').view;
	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 319);
if (view instanceof Y.DataTable.TableView &&
		view.body instanceof Y.DataTable.BodyView)
	{
		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 322);
var body = view.body;

		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 324);
this.orig_getCell = body.getCell;
		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 325);
this.orig_getRow  = body.getRow;

		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 327);
body.getCell = getCell;
		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 328);
body.getRow  = getRow;
	}
}

_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 332);
function restoreGetters()
{
	_yuitest_coverfunc("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", "restoreGetters", 332);
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 334);
var view = this.get('host').view;
	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 335);
if (view.body && this.orig_getCell)
	{
		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 337);
view.body.getCell = this.orig_getCell;
	}

	_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 340);
if (view.body && this.orig_getRow)
	{
		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 342);
view.body.getRow = this.orig_getRow;
	}
}

_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 346);
Y.extend(RowExpansion, Y.Plugin.Base,
{
	initializer: function(config)
	{
		_yuitest_coverfunc("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", "initializer", 348);
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 350);
this.open_rows = {};
		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 351);
this.on('uniqueIdKeyChange', function()
		{
			_yuitest_coverfunc("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", "(anonymous 3)", 351);
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 353);
this.open_rows = {};
		});

		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 356);
analyzeColumns.call(this);
		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 357);
this.afterHostEvent('columnsChange', analyzeColumns);

		_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 359);
this.afterHostEvent('table:renderTable', replaceGetters);
	},

	destructor: function()
	{
		_yuitest_coverfunc("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", "destructor", 362);
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 364);
restoreGetters.call(this);
	}
});

_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 368);
Y.namespace("Plugin");
_yuitest_coverline("build/gallery-datatable-row-expansion/gallery-datatable-row-expansion.js", 369);
Y.Plugin.DataTableRowExpansion = RowExpansion;


}, '@VERSION@', {
    "skinnable": "true",
    "requires": [
        "datatable",
        "plugin",
        "gallery-funcprog",
        "gallery-node-optimizations",
        "gallery-math"
    ]
});
