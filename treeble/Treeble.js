(function(){

var lang   = YAHOO.lang,
	util   = YAHOO.util,
	DS     = YAHOO.util.DataSourceBase,
	DT     = YAHOO.widget.DataTable;

DS.TYPE_TREELIST = 9;
/*

	Each element in this._open contains information about an openable,
	top-level node and is the root of a tree of open (or previously opened)
	items.  Each node in a tree contains the following data:

		index:      {Number} sorting key; the index of the node
		open:       null if never opened, true if open, false otherwise
		ds:         {DataSource} source for child nodes
		childTotal: {Number} total number of child nodes
		children:   {Array} (recursive) child nodes which are or have been opened

	Each level is sorted by index to allow simple traversal in display
	order.

 */

/**
 * TreebleDataSource class converts tree of data into a flat list of
 * visible items.  This list of items can then be paginated by DataTable.
 * The merged list must be paginated because the number of child nodes
 * might be very large.
 * 
 * The tree of DataSources must be homogeneous, i.e., all of the same type,
 * and they must all use the same schema.
 *
 * @namespace YAHOO.util
 * @class YAHOO.util.TreebleDataSource
 * @extends YAHOO.util.DataSourceBase 
 * @constructor
 * @param oLiveData {DataSource}  Pointer to root of the DataSource tree.
 * @param oConfigs {object} Object literal of configuration values.  Required params are:
 *		<dl>
 *		<dt>childNodesKey</dt>
 *		<dd>(required) The name of the key inside a node which contains the data
 *			used to construct the DataSource for retrieving the children.
 *			This data is passed <code>DataSource.parseDataSource()</code>.</dd>
 *		<dt>generateRequest</dt>
 *		<dd>(required) The function to convert the output from
 *			<code>DataTable.generateTreebleDataSourceRequest()</code> into
 *			a request usable by one of the actual DataSources.  This function
 *			takes two arguments: state {sort,dir,startIndex,results} and path
 *			(an array of node indices telling how to reach the node).
 *			</dd>
 *		<dt>startIndexExpr</dt>
 *		<dd>(optional) OGNL expression telling how to extract the startIndex
 *			from the received data, e.g., <code>.meta.startIndex</code>.
 *			If it is not provided, startIndex is always assumed to be zero.</dd>
 *		<dt>totalRecordsExpr</dt>
 *		<dd>(semi-optional) OGNL expression telling how to extract the total number
 *			of records from the received data, e.g., <code>.meta.totalRecords</code>.
 *			If this is not provided, <code>totalRecordsReturnExpr</code> must be
 *			specified.</dd>
 *		<dt>totalRecordsReturnExpr</dt>
 *		<dd>(semi-optional) OGNL expression telling where in the response to store
 *			the total number of records, e.g., <code>.meta.totalRecords</code>.
 *			This is only appropriate for DataSources that always return the
 *			entire data set.  If this is not provided,
 *			<code>totalRecordsExpr</code> must be specified.</dd>
 *		</dl>
 */
util.TreebleDataSource = function(oLiveData, oConfigs)
{
	if (!oLiveData instanceof util.DataSourceBase)
	{
		YAHOO.log('TreebleDataSource requires DataSource', 'error', 'TreebleDataSource');
		return;
	}

	if (!oConfigs || !oConfigs.childNodesKey)
	{
		YAHOO.log('TreebleDataSource requires childNodesKey configuration', 'error', 'TreebleDataSource');
		return;
	}

	if (!oConfigs || !oConfigs.generateRequest)
	{
		YAHOO.log('TreebleDataSource requires generateRequest configuration', 'error', 'TreebleDataSource');
		return;
	}

	this.dataType = DS.TYPE_TREELIST;
	this._open    = [];
	this._req     = [];
	util.TreebleDataSource.superclass.constructor.call(this, oLiveData, oConfigs);
};

function populateOpen(
	/* object */	parent,
	/* array */		open,
	/* array */		data,
	/* int */		startIndex,
	/* string */	childNodesKey)
{
	for (var j=0; j<open.length; j++)
	{
		if (open[j].index >= startIndex)
		{
			break;
		}
	}

	var result = true;
	for (var k=0; k<data.length; k++)
	{
		var i = startIndex + k;
		var ds = data[k][ childNodesKey ];
		if (!ds)
		{
			continue;
		}

		while (j < open.length && open[j].index < i)
		{
			open.splice(j, 1);
			result = false;
		}

		if (j >= open.length || open[j].index > i)
		{
			open.splice(j, 0,
			{
				index:    i,
				open:     null,
				ds:       ds,
				children: [],
				parent:   parent
			});
		}

		j++;
	}

	return result;
}

// TODO: worth switching to binary search?
function searchOpen(
	/* array */	list,
	/* int */	nodeIndex)
{
	for (var i=0; i<list.length; i++)
	{
		if (list[i].index == nodeIndex)
		{
			return list[i];
		}
	}

	return false;
}

function getNode(
	/* array */	path)
{
	var open = this._open;
	var last = path.length-1;
	for (var i=0; i<last; i++)
	{
		var node = searchOpen(open, path[i]);
		open     = node.children;
	}

	return searchOpen(open, path[last]);
}

function countVisibleNodes(

	// not sent by initiator

	/* array */ open)
{
	var total = 0;
	if (!open)
	{
		open  = this._open;
		total = this._topNodeTotal;
	}

	for (var i=0; i<open.length; i++)
	{
		var node = open[i];
		if (node.open)
		{
			total += node.childTotal;
			total += countVisibleNodes(node.children);
		}
	}

	return total;
}

function getVisibleSlices(
	/* int */			skip,
	/* int */			show,
	/* DataSource */	rootDS,
	/* array */			open,

	// not sent by initiator

	/* array */			path,
	/* node */			parent,
	/* int */			pre,
	/* bool */			send,
	/* array */			slices)
{
	if (!parent)
	{
		path   = [];
		parent = null;
		pre    = 0;
		send   = false;
		slices = [];
	}

	var ds = parent ? parent.ds : rootDS;

	open = open.concat(
	{
		index:      parent ? parent.childTotal : -1,
		open:       true,
		childTotal: 0,
		children:   null
	});

	var n = 0, m = 0, prev = -1;
	for (var i=0; i<open.length; i++)
	{
		var node = open[i];
		if (!node.open)
		{
			continue;
		}

		var delta = node.index - prev;
		if (node.children === null)
		{
			delta--;	// last item is off the end
		}

		if (pre + n + delta >= skip + show ||
			node.index == -1)
		{
			slices.push(
			{
				ds:    ds,
				path:  path.slice(0),
				start: m + (send ? 0 : skip - pre - n),
				end:   m + (skip + show - 1 - pre - n)
			});

			return slices;
		}
		else if (!send && pre + n + delta == skip)
		{
			send = true;
		}
		else if (pre + n + delta > skip)
		{
			slices.push(
			{
				ds:    ds,
				path:  path.slice(0),
				start: m + (send ? 0 : skip - pre - n),
				end:   m + delta - 1
			});
			send = true;
		}

		n += delta;
		m += delta;

		if (node.childTotal > 0)
		{
			var info = getVisibleSlices(skip, show, rootDS, node.children,
										path.concat(node.index),
										node, pre+n, send, slices);
			if (info instanceof Array)
			{
				return info;
			}
			else
			{
				n   += info.count;
				send = info.send;
			}
		}

		prev = node.index;
	}

	// only reached when parent != null

	var info =
	{
		count: n,
		send:  send
	}
	return info;
}

function requestSlices(
	/* object */	request)
{
	for (var i=0; i<this._slices.length; i++)
	{
		var slice = this._slices[i];
		var ds    = slice.ds;
		var req   = findRequest.call(this, ds);
		if (req)
		{
			if (YAHOO.widget.Logger)
			{
				if (req.end+1 < slice.start)
				{
					YAHOO.log('TreebleDataSource found discontinuous range', 'error', 'TreebleDataSource');
				}

				if (req.path.length != slice.path.length)
				{
					YAHOO.log('TreebleDataSource found path length mismatch', 'error', 'TreebleDataSource');
				}
				else
				{
					for (var i=0; i<slice.path.length; i++)
					{
						if (req.path[i] != slice.path[i])
						{
							YAHOO.log('TreebleDataSource found path mismatch', 'error', 'TreebleDataSource');
							break;
						}
					}
				}
			}

			req.end = slice.end;
		}
		else
		{
			this._req.push(
			{
				ds:    ds,
				path:  slice.path,
				start: slice.start,
				end:   slice.end
			});
		}
	}

	for (var i=0; i<this._req.length; i++)
	{
		var req            = this._req[i];
		request.startIndex = req.start;
		request.results    = req.end - req.start + 1;

		req.txId = req.ds.sendRequest(this.generateRequest(request, req.path),
		{
			success:  treeSuccess,
			failure:  treeFailure,
			scope:    this,
			argument: i
		});
	}
}

function findRequest(
	/* DataSource */	ds)
{
	for (var i=0; i<this._req.length; i++)
	{
		var req = this._req[i];
		if (ds == req.ds)
		{
			return req;
		}
	}

	return null;
}

function treeSuccess(oRequest, oParsedResponse, reqIndex)
{
	if (!oParsedResponse || oParsedResponse.error ||
		!(oParsedResponse.results instanceof Array))
	{
		treeFailure.apply(this, arguments);
		return;
	}

	var req = searchTxId(this._req, oParsedResponse.tId, reqIndex);
	if (!req)
	{
		return;		// cancelled request
	}

	if (!this._topResponse && req.ds == this.liveData)
	{
		this._topResponse = oParsedResponse;
	}

	req.txId  = null;
	req.resp  = oParsedResponse;
	req.error = false;

	// TODO: worth avoiding eval?
	var dataStartIndex = 0;
	if (this.startIndexExpr)
	{
		eval('dataStartIndex=req.resp'+this.startIndexExpr);
	}

	var sliceStartIndex = req.start - dataStartIndex;
	req.data            = oParsedResponse.results.slice(sliceStartIndex, req.end - dataStartIndex + 1);
	setNodeInfo(req.data, req.start, req.path);

	var parent = (req.path.length > 0 ? getNode.call(this, req.path) : null);
	var open   = (parent !== null ? parent.children : this._open);
	if (!populateOpen(parent, open, req.data, req.start, this.childNodesKey))
	{
		treeFailure.apply(this, arguments);
		return;
	}

	// TODO: worth avoiding eval?
	if (!parent && this.totalRecordsExpr)
	{
		eval('this._topNodeTotal=oParsedResponse'+this.totalRecordsExpr);
	}
	else if (!parent && this.totalRecordsReturnExpr)
	{
		this._topNodeTotal = oParsedResponse.results.length;
	}

	checkFinished.call(this);
}

function treeFailure(oRequest, oParsedResponse, reqIndex)
{
	var req = searchTxId(this._req, oParsedResponse.tId, reqIndex);
	if (!req)
	{
		return;		// cancelled request
	}

	this._cancelAllRequests();
	DS.issueCallback(this._callback.callback, [this._callback.request, oParsedResponse], true, this._callback.caller);
}

function setNodeInfo(
	/* array */	list,
	/* int */	offset,
	/* array */	path)
{
	var depth = path.length;
	for (var i=0; i<list.length; i++)
	{
		list[i]._yui_node_depth = depth;
		list[i]._yui_node_path  = path.concat(offset+i);
	}
}

function searchTxId(
	/* array */	req,
	/* int */	id,
	/* int */	fallbackIndex)
{
	for (var i=0; i<req.length; i++)
	{
		if (req[i].txId === id)
		{
			return req[i];
		}
	}

	// synch response arrives before setting txId

	if (fallbackIndex < req.length &&
		lang.isUndefined(req[ fallbackIndex ].txId))
	{
		return req[ fallbackIndex ];
	}

	return null;
}

function checkFinished()
{
	if (this._generating_requests)
	{
		return;
	}

	var count = this._req.length;
	for (var i=0; i<count; i++)
	{
		if (!this._req[i].resp)
		{
			return;
		}
	}

	var response = {};
	lang.augmentObject(response, this._topResponse);
	response.results = [];
	response         = cloneObject(response);

	count = this._slices.length;
	for (i=0; i<count; i++)
	{
		var slice = this._slices[i];
		var req   = findRequest.call(this, slice.ds);
		if (!req)
		{
			YAHOO.log('Failed to find request for a slice', 'error', 'TreebleDataSource');
			continue;
		}

		var j    = slice.start - req.start;
		var data = req.data.slice(j, j + slice.end - slice.start + 1);

		response.results = response.results.concat(data);
	}

	// TODO: worth avoiding eval?
	if (this.totalRecordsExpr)
	{
		eval('response'+this.totalRecordsExpr+'='+countVisibleNodes.call(this));
	}
	else if (this.totalRecordsReturnExpr)
	{
		eval('response'+this.totalRecordsReturnExpr+'='+countVisibleNodes.call(this));
	}

	DS.issueCallback(this._callback.callback, [this._callback.request, response], false, this._callback.caller);
}

function cloneObject(o)
{
	if (!lang.isValue(o))
	{
		return o;
	}

	var copy = {};

	if (o instanceof RegExp)
	{
		copy = new RegExp(o.source);
	}
	else if (lang.isFunction(o))
	{
		copy = o;
	}
	else if (lang.isArray(o))
	{
		var array = [];
		for (var i=0, len=o.length; i<len; i++)
		{
			array[i] = cloneObject(o[i]);
		}
		copy = array;
	}
	else if (lang.isObject(o))
	{
		for (var x in o)
		{
			if (lang.hasOwnProperty(o, x))
			{
				if ((lang.isValue(o[x]) && lang.isObject(o[x])) || lang.isArray(o[x]))
				{
					copy[x] = cloneObject(o[x]);
				}
				else
				{
					copy[x] = o[x];
				}
			}
		}
	}
	else
	{
		copy = o;
	}

	return copy;
}

function toggleSuccess(oRequest, oParsedResponse, args)
{
	var node       = args[0];
	var completion = args[1];

	// TODO: worth avoiding eval?
	if (this.totalRecordsExpr)
	{
		eval('node.childTotal=oParsedResponse'+this.totalRecordsExpr);
	}
	else if (this.totalRecordsReturnExpr)
	{
		node.childTotal = oParsedResponse.results.length;
	}

	node.open     = true;
	node.children = [];
	complete(completion);
}

function toggleFailure(oRequest, oParsedResponse, node)
{
	var node       = args[0];
	var completion = args[1];

	node.childTotal = 0;

	node.open     = true;
	node.children = [];
	complete(completion);
}

function complete(f)
{
	if (YAHOO.lang.isFunction(f))
	{
		f();
	}
	else if (f && f.fn)
	{
		f.fn.apply(f.scope || window, f.args);
	}
}

// TreebleDataSource extends DataSourceBase
lang.extend(util.TreebleDataSource, DS,
{
	/**
	 * @param path {Array} Path to node
	 * @return {boolean} true if the node is open
	 */
	isOpen: function(path)
	{
		var list = this._open;
		for (var i=0; i<path.length; i++)
		{
			var node = searchOpen.call(this, list, path[i]);
			if (!node || !node.open)
			{
				return false;
			}
			list = node.children;
		}

		return true;
	},

	/**
	 * Toggle the specified node between open and closed.  When a node is
	 * opened for the first time, this requires a request to the
	 * DataSource.  Any code that assumes the node has been opened must be
	 * passed in as a completion function.
	 * 
	 * @param path {Array} Path to the node
	 * @param request {Object} Request generated by DT.generateTreebleDataSourceRequest()
	 * @param completion {Function|Object} Function to call when the operation completes.  Can be object: {fn,scope,args}
	 * @return {boolean} false if the path to the node has not yet been fully explored or is not openable, true otherwise
	 */
	toggle: function(path, request, completion)
	{
		var list = this._open;
		for (var i=0; i<path.length; i++)
		{
			var node = searchOpen.call(this, list, path[i]);
			if (!node)
			{
				return false;
			}
			else if (node.open === null)
			{
				request.startIndex = 0;
				request.results    = 0;
				node.ds.sendRequest(this.generateRequest(request, path),
				{
					success:  toggleSuccess,
					failure:  toggleFailure,
					scope:    this,
					argument: [node, completion]
				});
				return true;
			}
			else if (!node.open)
			{
				node.open = true;
				complete(completion);
				return true;
			}
			list = node.children;
		}

		node.open = false;
		complete(completion);
		return true;
	},

	/**
	 * Overriding method generates queries to all visible DataSources.
	 *
	 * @method makeConnection
	 * @param oRequest {Object} Request object.
	 * @param oCallback {Object} Callback object literal.
	 * @param oCaller {Object} (deprecated) Use oCallback.scope.
	 * @return {Number} Transaction ID.
	 * @private
	 */
	makeConnection: function(oRequest, oCallback, oCaller)
	{
		var tId = DS._nTransactionId++;
		this.fireEvent("requestEvent", {tId:tId, request:oRequest,callback:oCallback,caller:oCaller});

		this._cancelAllRequests();

		this._callback =
		{
			request:  oRequest,
			callback: oCallback,
			caller:   oCaller
		};

		this._generating_requests = true;

		this._slices = getVisibleSlices(oRequest.startIndex, oRequest.results,
										this.liveData, this._open);

		requestSlices.call(this, oRequest);

		this._generating_requests = false;
		checkFinished.call(this);
	},

	_cancelAllRequests: function()
	{
		this._req = [];
	}
});

// Copy static members to TreebleDataSource class
lang.augmentObject(util.TreebleDataSource, DS);

/**
 * Converts data to a DataSource.  Data can be an object containing both
 * <code>dataType</code> and <code>liveData</code>, or it can be <q>free
 * form</q>, e.g., an array of records or an XHR URL.
 *
 * @method DataSourceBase.parseDataSource
 * @param oData {mixed} Data to convert.
 * @return {DataSource} The new data source.
 * @static
 */
DS.parseDataSource = function(oData)
{
	if (!oData)
	{
		return null;
	}
	else if (oData.dataType == DS.TYPE_JSFUNCTION)
	{
		var fn = oData.liveData, scope;
		if (lang.isString(fn))
		{
			fn = window[ fn ];
		}
		else if (fn.scope)
		{
			scope = fn.scope;
			fn    = fn.fn;
		}

		var ds = new util.FunctionDataSource(fn,
		{
			responseSchema:  this.ds.responseSchema,
			maxCacheEntries: this.ds.maxCacheEntries
		});

		if (scope)
		{
			ds.scope = scope;
		}
		return ds;
	}
	else if (!lang.isUndefined(oData.dataType))
	{
		return new util.DataSource(oData.liveData,
		{
			dataType:        oData.dataType,
			responseSchema:  this.ds.responseSchema,
			maxCacheEntries: this.ds.maxCacheEntries
		});
	}
	else
	{
		return new util.DataSource(oData,
		{
			responseSchema:  this.ds.responseSchema,
			maxCacheEntries: this.ds.maxCacheEntries
		});
	}
};

DS.Parser.datasource = DS.parseDataSource;

/**
 * Treeble extensions to DataTable.
 * 
 * We don't create a new DataTreeble class because that complicates
 * existing extensions to DataTable.  Existing extensions should work
 * transparently when given a TreebleDataSource.
 * 
 * @namespace YAHOO.widget
 * @class YAHOO.widget.DataTable
 */

/**
 * Check if a row is open.
 *
 * @method rowIsOpen
 * @param path {Array} Path to node.
 * @return {boolean} true if the row is open.
 */
DT.prototype.rowIsOpen = function(path)
{
	if (!this._oDataSource instanceof util.TreebleDataSource)
	{
		YAHOO.log('Treeble requires TreebleDataSource', 'error', 'Treeble');
		return false;
	}

	return this._oDataSource.isOpen(path);
};

/**
 * Toggle the state of a row.
 *
 * @method toggleRow
 * @param path {Array} Path to node.
 */
DT.prototype.toggleRow = function(path)
{
	if (!this._oDataSource instanceof util.TreebleDataSource)
	{
		YAHOO.log('Treeble requires TreebleDataSource', 'error', 'Treeble');
		return;
	}

	// Get current state
	var oState = this.getState();

	// Get the request for the new state
	var oRequest = this.get("generateRequest")(oState, this);

	// Update state of treelist
	this._oDataSource.toggle(path, oRequest,
	{
		scope: this,
		args: [oState, cloneObject(oRequest)],
		fn: function(oState, oRequest)
		{
			// Purge selections
			this.unselectAllRows();
			this.unselectAllCells();

			// Send request for new data
			var callback =
			{
				success : this.onDataReturnSetRows,
				failure : this.onDataReturnSetRows,
				argument : oState, // Pass along the new state to the callback
				scope : this
			};
			this._oDataSource.sendRequest(oRequest, callback);
		}
	});
};

/**
 * Generate the request object required by TreebleDataSource.
 *
 * @method DataTable.generateTreebleDataSourceRequest
 * @param oState {Object} Pagination and sorting state.
 * @param oSelf {DataTable} The data table.
 * @return {Object} Pagination and sorting state formatted for TreebleDataSource.
 * @static
 */
DT.generateTreebleDataSourceRequest = function(oState, oSelf)
{
	// Set defaults
	oState = oState || {pagination:null, sortedBy:null};
	var sort = encodeURIComponent((oState.sortedBy) ? oState.sortedBy.key : oSelf.getColumnSet().keys[0].getKey());
	var dir = (oState.sortedBy && oState.sortedBy.dir === YAHOO.widget.DataTable.CLASS_DESC) ? "desc" : "asc";
	var startIndex = (oState.pagination) ? oState.pagination.recordOffset : 0;
	var results = (oState.pagination) ? oState.pagination.rowsPerPage : null;

	// Build the request
	var state =
	{
		sort:       sort,
		dir:        dir,
		startIndex: startIndex,
		results:    results
	};
	return state;
};

})();
