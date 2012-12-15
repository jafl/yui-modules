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
_yuitest_coverage["build/gallery-treeble/gallery-treeble.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-treeble/gallery-treeble.js",
    code: []
};
_yuitest_coverage["build/gallery-treeble/gallery-treeble.js"].code=["YUI.add('gallery-treeble', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-treeble"," */","","/**********************************************************************"," * <p>Hierarchical data source.</p>"," *"," * <p>TreebleDataSource converts a tree of DataSources into a flat list of"," * visible items.  The merged list must be paginated if the number of child"," * nodes might be very large.  To turn on this feature, set"," * paginateChildren:true.</p>"," * "," * <p>The tree must be immutable.  The total number of items available from"," * each DataSource must remain constant.  (The one exception to this rule"," * is that filtering and sorting are allowed.  This is done by detecting"," * that the request parameters have changed.)</p>"," * "," * @namespace DataSource"," * @class Treeble"," * @extends DataSource.Local"," * @constructor"," * @param config {Object}"," */","","function TreebleDataSource()","{","	TreebleDataSource.superclass.constructor.apply(this, arguments);","}","","TreebleDataSource.NAME = \"treebleDataSource\";","","TreebleDataSource.ATTRS =","{","	/**","	 * <p>The root datasource.</p>","	 * ","	 * <p>You <em>must</em> directly set a <code>treeble_config</code>","	 * object on this datasource.  (You cannot use","	 * <code>set('treeble_config',...)</code>.) <code>treeble_config</code> can","	 * contain the following configuration:</p>","	 * ","	 * <dl>","	 * <dt>generateRequest</dt>","	 * <dd>(required) The function to convert the initial request into","	 *		a request usable by the actual DataSource.  This function takes","	 *		two arguments: state (sort,dir,startIndex,resultCount) and path","	 *		(an array of node indices telling how to reach the node).","	 *		</dd>","	 * <dt>requestCfg</dt>","	 * <dd>(optional) Configuration object passed as <code>cfg</code> to","	 *		<code>sendRequest</code>.</dd>","	 * <dt>schemaPluginConfig</dt>","	 * <dd>(required) Object to pass to <code>plug</code> to install a schema.</dd>","	 * <dt>cachePluginConfig</dt>","	 * <dd>(optional) Object to pass to <code>plug</code> to install a cache.</dd>","	 * <dt>childNodesKey</dt>","	 * <dd>(semi-optional) The name of the key inside a node which contains","	 *		the data used to construct the DataSource for retrieving the children.","	 *		This config is only required if you provide a custom parser.</dd>","	 * <dt>nodeOpenKey</dt>","	 * <dd>(optional) The name of the key inside a node which contains","	 *		the initial open state of the node.  If it is true, the node will","	 *		automatically be opened the first time it is shown.  (After that,","	 *		it will remember the state set by the user.)</dd>","	 * <dt>startIndexExpr</dt>","	 * <dd>(optional) OGNL expression telling how to extract the startIndex","	 *		from the received data, e.g., <code>.meta.startIndex</code>.","	 *		If it is not provided, startIndex is always assumed to be zero.</dd>","	 * <dt>totalRecordsExpr</dt>","	 * <dd>(semi-optional) OGNL expression telling how to extract the total number","	 *		of records from the received data, e.g., <code>.meta.totalRecords</code>.","	 *		If this is not provided, <code>totalRecordsReturnExpr</code> must be","	 *		specified.</dd>","	 * <dt>totalRecordsReturnExpr</dt>","	 * <dd>(semi-optional) OGNL expression telling where in the response to store","	 *		the total number of records, e.g., <code>.meta.totalRecords</code>.","	 *		This is only appropriate for DataSources that always return the","	 *		entire data set.  If this is not provided,","	 *		<code>totalRecordsExpr</code> must be specified.  If both are provided,","	 *		<code>totalRecordsExpr</code> takes priority.</dd>","	 * </dl>","	 * ","	 * @attribute root","	 * @type {DataSource}","	 * @writeonce","	 */","	root:","	{","		writeOnce: true","	},","","	/**","	 * Pass <code>true</code> to paginate the result after merging child","	 * nodes into the list.  The default (<code>false</code>) is to","	 * paginate only root nodes, so all children are visible.","	 * ","	 * @attribute paginateChildren","	 * @type {boolean}","	 * @default false","	 * @writeonce","	 */","	paginateChildren:","	{","		value:     false,","		validator: Y.Lang.isBoolean,","		writeOnce: true","	},","","	/**","	 * The key in each record that stores an identifier which is unique","	 * across the entire tree.  If this is not specified, then all nodes","	 * will close when the data is sorted.","	 * ","	 * @attribute uniqueIdKey","	 * @type {String}","	 */","	uniqueIdKey:","	{","		validator: Y.Lang.isString","	}","};","","/**"," * @event toggled"," * @description Fires after an element is opened or closed."," * @param path {Array} the path to the toggled element"," * @param open {Boolean} the new state of the element"," */","","/*","","	Each element in this._open contains information about an openable,","	top-level node and is the root of a tree of open (or previously opened)","	items.  Each node in a tree contains the following data:","","		index:      {Number} sorting key; the index of the node","		open:       null if never opened, true if open, false otherwise","		ds:         {DataSource} source for child nodes","		childTotal: {Number} total number of child nodes","		children:   {Array} (recursive) child nodes which are or have been opened","		parent:     {Object} parent item","","	Each level is sorted by index to allow simple traversal in display","	order.",""," */","","function populateOpen(","	/* object */	parent,","	/* array */		open,","	/* object */	req)","{","	var data          = req.data;","	var startIndex    = req.start;","	var childNodesKey = req.ds.treeble_config.childNodesKey;","	var nodeOpenKey   = req.ds.treeble_config.nodeOpenKey;","","	for (var j=0; j<open.length; j++)","	{","		if (open[j].index >= startIndex)","		{","			break;","		}","	}","","	var uniqueIdKey = this.get('uniqueIdKey');","","	var result = true;","	for (var k=0; k<data.length; k++)","	{","		var i = startIndex + k;","		var ds = data[k][ childNodesKey ];","		if (!ds)","		{","			continue;","		}","","		while (j < open.length && open[j].index < i)","		{","			open.splice(j, 1);","			result = false;","","			if (uniqueIdKey)","			{","				delete this._open_cache[ data[k][ uniqueIdKey ] ];","			}","		}","","		if (j >= open.length || open[j].index > i)","		{","			var item =","			{","				index:      i,","				open:       null,","				ds:         ds,","				children:   [],","				childTotal: 0,","				parent:     parent","			};","","			var cached_item = null;","			if (uniqueIdKey)","			{","				cached_item = this._open_cache[ data[k][ uniqueIdKey ] ];","				if (cached_item)","				{","					item.open       = cached_item.open;","					item.childTotal = cached_item.childTotal;","					this._redo      = this._redo || item.open;","				}","","				this._open_cache[ data[k][ uniqueIdKey ] ] = item;","			}","","			if (!cached_item && nodeOpenKey && data[k][ nodeOpenKey ])","			{","				this._toggle.push(req.path.concat(i));","			}","","			open.splice(j, 0, item);","		}","","		j++;","	}","","	return result;","}","","// TODO: worth switching to binary search?","function searchOpen(","	/* array */	list,","	/* int */	nodeIndex)","{","	for (var i=0; i<list.length; i++)","	{","		if (list[i].index == nodeIndex)","		{","			return list[i];","		}","	}","","	return false;","}","","function getNode(","	/* array */	path)","{","	var open = this._open;","	var last = path.length-1;","	for (var i=0; i<last; i++)","	{","		var node = searchOpen(open, path[i]);","		open     = node.children;","	}","","	return searchOpen(open, path[last]);","}","","function countVisibleNodes(","","	// not sent by initiator","","	/* array */ open)","{","	var total = 0;","	if (!open)","	{","		open  = this._open;","		total = this._topNodeTotal;","	}","","	if (this.get('paginateChildren'))","	{","		for (var i=0; i<open.length; i++)","		{","			var node = open[i];","			if (node.open)","			{","				total += node.childTotal;","				total += countVisibleNodes.call(this, node.children);","			}","		}","	}","","	return total;","}","","function requestTree(flush_toggle)","{","	if (!flush_toggle)","	{","		var save_toggle = this._toggle.slice(0);","	}","","	this._cancelAllRequests();","","	if (!flush_toggle)","	{","		this._toggle = save_toggle;","	}","","	this._redo                = false;","	this._generating_requests = true;","","	var req = this._callback.request;","	if (this.get('paginateChildren'))","	{","		this._slices = getVisibleSlicesPgAll(req.startIndex, req.resultCount,","											 this.get('root'), this._open);","	}","	else","	{","		this._slices = getVisibleSlicesPgTop(req.startIndex, req.resultCount,","											 this.get('root'), this._open);","	}","","	requestSlices.call(this, req);","","	this._generating_requests = false;","	checkFinished.call(this);","}","","function getVisibleSlicesPgTop(","	/* int */			skip,","	/* int */			show,","	/* DataSource */	ds,","	/* array */			open,","","	// not sent by initiator","","	/* array */			path)","{","	open = open.concat(","	{","		index:      -1,","		open:       true,","		childTotal: 0,","		children:   null","	});","","	if (!path)","	{","		path = [];","	}","","	var slices = [],","		send   = false;","","	var m = 0, prev = -1, presend = false;","	for (var i=0; i<open.length; i++)","	{","		var node = open[i];","		if (!node.open)","		{","			continue;","		}","","		var delta = node.index - prev;","","		if (m + delta >= skip + show ||","			node.index == -1)","		{","			slices.push(","			{","				ds:    ds,","				path:  path.slice(0),","				start: send ? m : skip,","				end:   skip + show - 1","			});","","			if (m + delta == skip + show && node.childTotal > 0)","			{","				slices = slices.concat(","					getVisibleSlicesPgTop(0, node.childTotal, node.ds,","										  node.children, path.concat(node.index)));","			}","","			return slices;","		}","		else if (!send && m + delta == skip)","		{","			presend = true;","		}","		else if (m + delta > skip)","		{","			slices.push(","			{","				ds:    ds,","				path:  path.slice(0),","				start: send ? prev + 1 : skip,","				end:   m + delta - 1","			});","			send = true;","		}","","		m += delta;","","		if (send && node.childTotal > 0)","		{","			slices = slices.concat(","				getVisibleSlicesPgTop(0, node.childTotal, node.ds,","									  node.children, path.concat(node.index)));","		}","","		prev = node.index;","		send = send || presend;","	}","}","","function getVisibleSlicesPgAll(","	/* int */			skip,","	/* int */			show,","	/* DataSource */	rootDS,","	/* array */			open,","","	// not sent by initiator","","	/* array */			path,","	/* node */			parent,","	/* int */			pre,","	/* bool */			send,","	/* array */			slices)","{","	if (!parent)","	{","		path   = [];","		parent = null;","		pre    = 0;","		send   = false;","		slices = [];","	}","","	var ds = parent ? parent.ds : rootDS;","","	open = open.concat(","	{","		index:      parent ? parent.childTotal : -1,","		open:       true,","		childTotal: 0,","		children:   null","	});","","	var n = 0, m = 0, prev = -1;","	for (var i=0; i<open.length; i++)","	{","		var node = open[i];","		if (!node.open)","		{","			continue;","		}","","		var delta = node.index - prev;","		if (node.children === null)","		{","			delta--;	// last item is off the end","		}","","		if (pre + n + delta >= skip + show ||","			node.index == -1)","		{","			slices.push(","			{","				ds:    ds,","				path:  path.slice(0),","				start: m + (send ? 0 : skip - pre - n),","				end:   m + (skip + show - 1 - pre - n)","			});","","			return slices;","		}","		else if (!send && pre + n + delta == skip)","		{","			send = true;","		}","		else if (pre + n + delta > skip)","		{","			slices.push(","			{","				ds:    ds,","				path:  path.slice(0),","				start: m + (send ? 0 : skip - pre - n),","				end:   m + delta - 1","			});","			send = true;","		}","","		n += delta;","		m += delta;","","		if (node.childTotal > 0)","		{","			var info = getVisibleSlicesPgAll(skip, show, rootDS, node.children,","											 path.concat(node.index),","											 node, pre+n, send, slices);","			if (Y.Lang.isArray(info))","			{","				return info;","			}","			else","			{","				n   += info.count;","				send = info.send;","			}","		}","","		prev = node.index;","	}","","	// only reached when parent != null","","	var info =","	{","		count: n,","		send:  send","	};","	return info;","}","","function requestSlices(","	/* object */	request)","{","	for (var i=0; i<this._slices.length; i++)","	{","		var slice = this._slices[i];","		var ds    = slice.ds;","		var req   = findRequest.call(this, ds);","		if (req)","		{","			if (Y.Console)","			{","				if (req.end+1 < slice.start)","				{","					Y.error('TreebleDataSource found discontinuous range');","				}","","				if (req.path.length != slice.path.length)","				{","					Y.error('TreebleDataSource found path length mismatch');","				}","				else","				{","					for (var j=0; j<slice.path.length; j++)","					{","						if (req.path[j] != slice.path[j])","						{","							Y.error('TreebleDataSource found path mismatch');","							break;","						}","					}","				}","			}","","			req.end = slice.end;","		}","		else","		{","			this._req.push(","			{","				ds:    ds,","				path:  slice.path,","				start: slice.start,","				end:   slice.end","			});","		}","	}","","	request = Y.clone(request, true);","	for (var i=0; i<this._req.length; i++)","	{","		var req             = this._req[i];","		request.startIndex  = req.start;","		request.resultCount = req.end - req.start + 1;","","		req.txId = req.ds.sendRequest(","		{","			request: req.ds.treeble_config.generateRequest(request, req.path),","			cfg:     req.ds.treeble_config.requestCfg,","			callback:","			{","				success: Y.rbind(treeSuccess, this, i),","				failure: Y.rbind(treeFailure, this, i)","			}","		});","	}","}","","function findRequest(","	/* DataSource */	ds)","{","	for (var i=0; i<this._req.length; i++)","	{","		var req = this._req[i];","		if (ds == req.ds)","		{","			return req;","		}","	}","","	return null;","}","","function treeSuccess(e, reqIndex)","{","	if (!e.response || e.error ||","		!Y.Lang.isArray(e.response.results))","	{","		treeFailure.apply(this, arguments);","		return;","	}","","	var req = searchTxId(this._req, e.tId, reqIndex);","	if (!req)","	{","		return;		// cancelled request","	}","","	if (!this._topResponse && req.ds == this.get('root'))","	{","		this._topResponse = e.response;","	}","","	req.txId  = null;","	req.resp  = e.response;","	req.error = false;","","	var dataStartIndex = 0;","	if (req.ds.treeble_config.startIndexExpr)","	{","		eval('dataStartIndex=req.resp'+req.ds.treeble_config.startIndexExpr);","	}","","	var sliceStartIndex = req.start - dataStartIndex;","	req.data            = e.response.results.slice(sliceStartIndex, req.end - dataStartIndex + 1);","	setNodeInfo(req.data, req.start, req.path, req.ds);","","	var parent = (req.path.length > 0 ? getNode.call(this, req.path) : null);","	var open   = (parent !== null ? parent.children : this._open);","	if (!populateOpen.call(this, parent, open, req))","	{","		treeFailure.apply(this, arguments);","		return;","	}","","	if (!parent && req.ds.treeble_config.totalRecordsExpr)","	{","		eval('this._topNodeTotal=e.response'+req.ds.treeble_config.totalRecordsExpr);","	}","	else if (!parent && req.ds.treeble_config.totalRecordsReturnExpr)","	{","		this._topNodeTotal = e.response.results.length;","	}","","	checkFinished.call(this);","}","","function treeFailure(e, reqIndex)","{","	var req = searchTxId(this._req, e.tId, reqIndex);","	if (!req)","	{","		return;		// cancelled request","	}","","	this._cancelAllRequests();","","	this._callback.error    = e.error;","	this._callback.response = e.response;","	this.fire('response', this._callback);","}","","function setNodeInfo(","	/* array */			list,","	/* int */			offset,","	/* array */			path,","	/* datasource */	ds)","{","	var depth = path.length;","	for (var i=0; i<list.length; i++)","	{","		list[i]._yui_node_depth = depth;","		list[i]._yui_node_path  = path.concat(offset+i);","		list[i]._yui_node_ds    = ds;","	}","}","","function searchTxId(","	/* array */	req,","	/* int */	id,","	/* int */	fallbackIndex)","{","	for (var i=0; i<req.length; i++)","	{","		if (req[i].txId === id)","		{","			return req[i];","		}","	}","","	// synch response arrives before setting txId","","	if (fallbackIndex < req.length &&","		Y.Lang.isUndefined(req[ fallbackIndex ].txId))","	{","		return req[ fallbackIndex ];","	}","","	return null;","}","","function checkFinished()","{","	if (this._generating_requests)","	{","		return;","	}","","	var count = this._req.length;","	for (var i=0; i<count; i++)","	{","		if (!this._req[i].resp)","		{","			return;","		}","	}","","	if (this._redo)","	{","		Y.Lang.later(0, this, requestTree);","		return;","	}","	else if (this._toggle.length > 0)","	{","		var t = this._toggle.shift();","		this.toggle(t, Y.clone(this._callback.request, true),","		{","			fn: function()","			{","				Y.Lang.later(0, this, requestTree);","			},","			scope: this","		});","		return;","	}","","	var response = { meta:{} };","	Y.mix(response, this._topResponse, true);","	response.results = [];","	response         = Y.clone(response, true);","","	count = this._slices.length;","	for (i=0; i<count; i++)","	{","		var slice = this._slices[i];","		var req   = findRequest.call(this, slice.ds);","		if (!req)","		{","			Y.error('Failed to find request for a slice');","			continue;","		}","","		var j    = slice.start - req.start;","		var data = req.data.slice(j, j + slice.end - slice.start + 1);","","		response.results = response.results.concat(data);","	}","","	var rootDS = this.get('root');","	if (rootDS.treeble_config.totalRecordsExpr)","	{","		eval('response'+rootDS.treeble_config.totalRecordsExpr+'='+countVisibleNodes.call(this));","	}","	else if (rootDS.treeble_config.totalRecordsReturnExpr)","	{","		eval('response'+rootDS.treeble_config.totalRecordsReturnExpr+'='+countVisibleNodes.call(this));","	}","","	this._callback.response = response;","	this.fire('response', this._callback);","}","","function toggleSuccess(e, node, completion, path)","{","	if (node.ds.treeble_config.totalRecordsExpr)","	{","		eval('node.childTotal=e.response'+node.ds.treeble_config.totalRecordsExpr);","	}","	else if (node.ds.treeble_config.totalRecordsReturnExpr)","	{","		node.childTotal = e.response.results.length;","	}","","	node.open     = true;","	node.children = [];","	complete(completion);","","	this.fire('toggled',","	{","		path: path,","		open: node.open","	});","}","","function toggleFailure(e, node, completion, path)","{","	node.childTotal = 0;","","	node.open     = true;","	node.children = [];","	complete(completion);","","	this.fire('toggled',","	{","		path: path,","		open: node.open","	});","}","","function complete(f)","{","	if (Y.Lang.isFunction(f))","	{","		f();","	}","	else if (f && f.fn)","	{","		f.fn.apply(f.scope || window, Y.Lang.isUndefined(f.args) ? [] : f.args);","	}","}","","function compareRequests(r1, r2)","{","	var k1 = Y.Object.keys(r1),","		k2 = Y.Object.keys(r2);","","	if (k1.length != k2.length)","	{","		return false;","	}","","	for (var i=0; i<k1.length; i++)","	{","		var k = k1[i];","		if (k != 'startIndex' && k != 'resultCount' && r1[k] !== r2[k])","		{","			return false;","		}","	}","","	return true;","}","","Y.extend(TreebleDataSource, Y.DataSource.Local,","{","	initializer: function(config)","	{","		if (!config.root)","		{","			Y.error('TreebleDataSource requires DataSource');","		}","","		if (!config.root.treeble_config.childNodesKey)","		{","			var fields = config.root.schema.get('schema').resultFields;","			if (!fields || !Y.Lang.isArray(fields))","			{","				Y.error('TreebleDataSource root DataSource requires schema.resultFields because treeble_config.childNodesKey was not specified.');","			}","","			for (var i=0; i<fields.length; i++)","			{","				if (Y.Lang.isObject(fields[i]) && fields[i].parser == 'treebledatasource')","				{","					config.root.treeble_config.childNodesKey = fields[i].key;","					break;","				}","			}","","			if (!config.root.treeble_config.childNodesKey)","			{","				Y.error('TreebleDataSource requires treeble_config.childNodesKey configuration to be set on root DataSource');","			}","		}","","		if (!config.root.treeble_config.generateRequest)","		{","			Y.error('TreebleDataSource requires treeble_config.generateRequest configuration to be set on root DataSource');","		}","","		if (!config.root.treeble_config.totalRecordsExpr && !config.root.treeble_config.totalRecordsReturnExpr)","		{","			Y.error('TreebleDataSource requires either treeble_config.totalRecordsExpr or treeble_config.totalRecordsReturnExpr configuration to be set on root DataSource');","		}","","		this._open       = [];","		this._open_cache = {};","		this._toggle     = [];","		this._req        = [];","	},","","	/**","	 * @method isOpen","	 * @param path {Array} Path to node","	 * @return {boolean} true if the node is open","	 */","	isOpen: function(path)","	{","		var list = this._open;","		for (var i=0; i<path.length; i++)","		{","			var node = searchOpen.call(this, list, path[i]);","			if (!node || !node.open)","			{","				return false;","			}","			list = node.children;","		}","","		return true;","	},","","	/**","	 * Toggle the specified node between open and closed.  When a node is","	 * opened for the first time, this requires a request to the","	 * DataSource.  Any code that assumes the node has been opened must be","	 * passed in as a completion function.","	 * ","	 * @method toggle","	 * @param path {Array} Path to the node","	 * @param request {Object} {sort,dir,startIndex,resultCount}","	 * @param completion {Function|Object} Function to call when the operation completes.  Can be object: {fn,scope,args}","	 * @return {boolean} false if the path to the node has not yet been fully explored or is not openable, true otherwise","	 */","	toggle: function(path, request, completion)","	{","		var list = this._open;","		for (var i=0; i<path.length; i++)","		{","			var node = searchOpen.call(this, list, path[i]);","			if (!node)","			{","				return false;","			}","			list = node.children;","		}","","		if (node.open === null)","		{","			request.startIndex  = 0;","			request.resultCount = 0;","			node.ds.sendRequest(","			{","				request: node.ds.treeble_config.generateRequest(request, path),","				cfg:     node.ds.treeble_config.requestCfg,","				callback:","				{","					success: Y.rbind(toggleSuccess, this, node, completion, path),","					failure: Y.rbind(toggleFailure, this, node, completion, path)","				}","			});","		}","		else","		{","			node.open = !node.open;","			complete(completion);","","			this.fire('toggled',","			{","				path: path,","				open: node.open","			});","		}","		return true;","	},","","	_defRequestFn: function(e)","	{","		// wipe out all state if the request parameters change","","		if (this._callback && !compareRequests(this._callback.request, e.request))","		{","			this._open = [];","		}","","		this._callback = e;","		requestTree.call(this, true);","	},","","	_cancelAllRequests: function()","	{","		this._req    = [];","		this._toggle = [];","		delete this._topResponse;","	}","});","","Y.TreebleDataSource = TreebleDataSource;","Y.namespace('DataSource').Treeble = TreebleDataSource;","/**"," * @module gallery-treeble"," */","","/**"," * <p>Converts data to a DataSource.  Data can be an object containing both"," * <code>dataType</code> and <code>liveData</code>, or it can be <q>free"," * form</q>, e.g., an array of records or an XHR URL.</p>"," *"," * @class Parsers"," */","","/**"," * @method treebledatasource"," * @static"," * @param oData {mixed} Data to convert."," * @return {DataSource} The new data source."," */","Y.namespace(\"Parsers\").treebledatasource = function(oData)","{","	if (!oData)","	{","		return null;","	}","","	var type = oData.dataType;","	if (type)","	{","		// use it","	}","	else if (Y.Lang.isString(oData))","	{","		type = 'IO';","	}","	else if (Y.Lang.isFunction(oData))","	{","		type = 'Function';","	}","	else","	{","		type = 'Local';","	}","","	var src            = oData.dataType ? oData.liveData : oData;","	var treeble_config = this.get('host').treeble_config;","	if (type == 'Local')","	{","		treeble_config = Y.clone(treeble_config, true);","		delete treeble_config.startIndexExpr;","		delete treeble_config.totalRecordsExpr;","	}","	else if (type == 'Function')","	{","		src = Y.Lang.isString(src) ? window[ src ] : src;","	}","","	var ds            = new Y.DataSource[ type ]({ source: src });","	ds.treeble_config = treeble_config;","","	if (ds.treeble_config.schemaPluginConfig)","	{","		ds.plug(Y.clone(ds.treeble_config.schemaPluginConfig, true));","	}","","	if (ds.treeble_config.cachePluginConfig)","	{","		ds.plug(Y.clone(ds.treeble_config.cachePluginConfig, true));","	}","","	return ds;","};","/**********************************************************************"," * Treeble displays a tree of data in a table."," *"," * @module gallery-treeble"," * @main gallery-treeble"," */","","/**"," * Extension to DataTable for displaying tree data."," *"," * @class Treeble"," * @extends DataTable"," * @constructor"," * @param config {Object}"," */","function Treeble()","{","	Treeble.superclass.constructor.apply(this, arguments);","}","","Treeble.NAME = \"datatable\";		// same styling","","/**"," * <p>Formatter for open/close twistdown.</p>"," *"," * @method twistdownFormatter"," * @static"," * @param sendRequest {Function} Function that reloads DataTable"," */","Treeble.buildTwistdownFormatter = function(sendRequest)","{","	return function(o)","	{","		o.td.addClass('treeble-nub');","","		var ds  = this.datasource.get('datasource');","		var key = ds.get('root').treeble_config.childNodesKey;","","		if (o.data[key])","		{","			var path = o.data._yui_node_path;","","			o.td.addClass('row-toggle');","			o.td.replaceClass('row-(open|closed)',","				ds.isOpen(path) ? 'row-open' : 'row-closed');","","			YUI.Env.add(Y.Node.getDOMNode(o.td), 'click', function()","			{","				ds.toggle(path, {}, sendRequest);","			});","","			o.cell.set('innerHTML', '<a class=\"treeble-expand-nub\" href=\"javascript:void(0);\"></a>');","		}","","		return false;	// discard Y.Node instances","	};","};","","/**"," * <p>Default formatter for indented column.</p>"," *"," * @method treeValueFormatter"," * @static"," */","Treeble.treeValueFormatter = function(o)","{","	var depth_class = 'treeble-depth-'+o.data._yui_node_depth;","	o.rowClass     += ' ' + depth_class;","	o.className    += ' treeble-value';","	return '<span class=\"'+depth_class+'\">'+o.value+'</span>';","};","","Y.extend(Treeble, Y.DataTable,","{","	plug: function(plugin, config)","	{","		if (plugin === Y.Plugin.DataTableDataSource)","		{","			var recordType = this.get('recordType');","			recordType.ATTRS[ config.datasource.get('root').treeble_config.childNodesKey ] = {};","			recordType.ATTRS._yui_node_path  = {};","			recordType.ATTRS._yui_node_depth = {};","		}","","		Treeble.superclass.plug.apply(this, arguments);","	}","});","","Y.Treeble = Treeble;","","","}, '@VERSION@', {\"skinnable\": \"true\", \"requires\": [\"datasource\", \"datatable\"]});"];
_yuitest_coverage["build/gallery-treeble/gallery-treeble.js"].lines = {"1":0,"3":0,"29":0,"31":0,"34":0,"36":0,"152":0,"157":0,"158":0,"159":0,"160":0,"162":0,"164":0,"166":0,"170":0,"172":0,"173":0,"175":0,"176":0,"177":0,"179":0,"182":0,"184":0,"185":0,"187":0,"189":0,"193":0,"195":0,"205":0,"206":0,"208":0,"209":0,"211":0,"212":0,"213":0,"216":0,"219":0,"221":0,"224":0,"227":0,"230":0,"234":0,"238":0,"240":0,"242":0,"246":0,"249":0,"252":0,"253":0,"254":0,"256":0,"257":0,"260":0,"263":0,"269":0,"270":0,"272":0,"273":0,"276":0,"278":0,"280":0,"281":0,"283":0,"284":0,"289":0,"292":0,"294":0,"296":0,"299":0,"301":0,"303":0,"306":0,"307":0,"309":0,"310":0,"312":0,"317":0,"321":0,"323":0,"324":0,"327":0,"337":0,"345":0,"347":0,"350":0,"353":0,"354":0,"356":0,"357":0,"359":0,"362":0,"364":0,"367":0,"375":0,"377":0,"382":0,"384":0,"386":0,"388":0,"390":0,"397":0,"400":0,"402":0,"404":0,"409":0,"410":0,"414":0,"428":0,"430":0,"431":0,"432":0,"433":0,"434":0,"437":0,"439":0,"447":0,"448":0,"450":0,"451":0,"453":0,"456":0,"457":0,"459":0,"462":0,"465":0,"473":0,"475":0,"477":0,"479":0,"481":0,"488":0,"491":0,"492":0,"494":0,"496":0,"499":0,"501":0,"505":0,"506":0,"510":0,"515":0,"520":0,"523":0,"526":0,"528":0,"529":0,"530":0,"531":0,"533":0,"535":0,"537":0,"540":0,"542":0,"546":0,"548":0,"550":0,"551":0,"557":0,"561":0,"571":0,"572":0,"574":0,"575":0,"576":0,"578":0,"591":0,"594":0,"596":0,"597":0,"599":0,"603":0,"606":0,"608":0,"611":0,"612":0,"615":0,"616":0,"618":0,"621":0,"623":0,"626":0,"627":0,"628":0,"630":0,"631":0,"633":0,"636":0,"637":0,"638":0,"640":0,"641":0,"642":0,"644":0,"645":0,"648":0,"650":0,"652":0,"654":0,"657":0,"660":0,"662":0,"663":0,"665":0,"668":0,"670":0,"671":0,"672":0,"675":0,"681":0,"682":0,"684":0,"685":0,"686":0,"690":0,"695":0,"697":0,"699":0,"705":0,"708":0,"711":0,"714":0,"716":0,"718":0,"721":0,"722":0,"724":0,"726":0,"730":0,"732":0,"733":0,"735":0,"737":0,"738":0,"742":0,"746":0,"749":0,"750":0,"751":0,"752":0,"754":0,"755":0,"757":0,"758":0,"759":0,"761":0,"762":0,"765":0,"766":0,"768":0,"771":0,"772":0,"774":0,"776":0,"778":0,"781":0,"782":0,"785":0,"787":0,"789":0,"791":0,"793":0,"796":0,"797":0,"798":0,"800":0,"807":0,"809":0,"811":0,"812":0,"813":0,"815":0,"822":0,"824":0,"826":0,"828":0,"830":0,"834":0,"836":0,"839":0,"841":0,"844":0,"846":0,"847":0,"849":0,"853":0,"856":0,"860":0,"862":0,"865":0,"867":0,"868":0,"870":0,"873":0,"875":0,"877":0,"878":0,"882":0,"884":0,"888":0,"890":0,"893":0,"895":0,"898":0,"899":0,"900":0,"901":0,"911":0,"912":0,"914":0,"915":0,"917":0,"919":0,"922":0,"939":0,"940":0,"942":0,"943":0,"945":0,"947":0,"950":0,"952":0,"953":0,"954":0,"967":0,"968":0,"970":0,"976":0,"983":0,"985":0,"988":0,"989":0,"994":0,"995":0,"996":0,"1000":0,"1001":0,"1020":0,"1022":0,"1024":0,"1027":0,"1028":0,"1032":0,"1034":0,"1036":0,"1038":0,"1042":0,"1045":0,"1046":0,"1047":0,"1049":0,"1050":0,"1051":0,"1053":0,"1055":0,"1058":0,"1059":0,"1061":0,"1063":0,"1066":0,"1068":0,"1071":0,"1088":0,"1090":0,"1093":0,"1102":0,"1104":0,"1106":0,"1108":0,"1109":0,"1111":0,"1113":0,"1115":0,"1116":0,"1119":0,"1121":0,"1124":0,"1127":0,"1137":0,"1139":0,"1140":0,"1141":0,"1142":0,"1145":0,"1149":0,"1151":0,"1152":0,"1153":0,"1154":0,"1157":0,"1161":0};
_yuitest_coverage["build/gallery-treeble/gallery-treeble.js"].functions = {"TreebleDataSource:29":0,"populateOpen:152":0,"searchOpen:234":0,"getNode:249":0,"countVisibleNodes:263":0,"requestTree:292":0,"getVisibleSlicesPgTop:327":0,"getVisibleSlicesPgAll:414":0,"requestSlices:523":0,"findRequest:591":0,"treeSuccess:606":0,"treeFailure:660":0,"setNodeInfo:675":0,"searchTxId:690":0,"fn:740":0,"checkFinished:714":0,"toggleSuccess:785":0,"toggleFailure:807":0,"complete:822":0,"compareRequests:834":0,"initializer:858":0,"isOpen:909":0,"toggle:937":0,"_defRequestFn:979":0,"_cancelAllRequests:992":0,"treebledatasource:1020":0,"Treeble:1088":0,"(anonymous 3):1119":0,"(anonymous 2):1104":0,"buildTwistdownFormatter:1102":0,"treeValueFormatter:1137":0,"plug:1147":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-treeble/gallery-treeble.js"].coveredLines = 390;
_yuitest_coverage["build/gallery-treeble/gallery-treeble.js"].coveredFunctions = 33;
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1);
YUI.add('gallery-treeble', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 3);
"use strict";

/**
 * @module gallery-treeble
 */

/**********************************************************************
 * <p>Hierarchical data source.</p>
 *
 * <p>TreebleDataSource converts a tree of DataSources into a flat list of
 * visible items.  The merged list must be paginated if the number of child
 * nodes might be very large.  To turn on this feature, set
 * paginateChildren:true.</p>
 * 
 * <p>The tree must be immutable.  The total number of items available from
 * each DataSource must remain constant.  (The one exception to this rule
 * is that filtering and sorting are allowed.  This is done by detecting
 * that the request parameters have changed.)</p>
 * 
 * @namespace DataSource
 * @class Treeble
 * @extends DataSource.Local
 * @constructor
 * @param config {Object}
 */

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 29);
function TreebleDataSource()
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "TreebleDataSource", 29);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 31);
TreebleDataSource.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 34);
TreebleDataSource.NAME = "treebleDataSource";

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 36);
TreebleDataSource.ATTRS =
{
	/**
	 * <p>The root datasource.</p>
	 * 
	 * <p>You <em>must</em> directly set a <code>treeble_config</code>
	 * object on this datasource.  (You cannot use
	 * <code>set('treeble_config',...)</code>.) <code>treeble_config</code> can
	 * contain the following configuration:</p>
	 * 
	 * <dl>
	 * <dt>generateRequest</dt>
	 * <dd>(required) The function to convert the initial request into
	 *		a request usable by the actual DataSource.  This function takes
	 *		two arguments: state (sort,dir,startIndex,resultCount) and path
	 *		(an array of node indices telling how to reach the node).
	 *		</dd>
	 * <dt>requestCfg</dt>
	 * <dd>(optional) Configuration object passed as <code>cfg</code> to
	 *		<code>sendRequest</code>.</dd>
	 * <dt>schemaPluginConfig</dt>
	 * <dd>(required) Object to pass to <code>plug</code> to install a schema.</dd>
	 * <dt>cachePluginConfig</dt>
	 * <dd>(optional) Object to pass to <code>plug</code> to install a cache.</dd>
	 * <dt>childNodesKey</dt>
	 * <dd>(semi-optional) The name of the key inside a node which contains
	 *		the data used to construct the DataSource for retrieving the children.
	 *		This config is only required if you provide a custom parser.</dd>
	 * <dt>nodeOpenKey</dt>
	 * <dd>(optional) The name of the key inside a node which contains
	 *		the initial open state of the node.  If it is true, the node will
	 *		automatically be opened the first time it is shown.  (After that,
	 *		it will remember the state set by the user.)</dd>
	 * <dt>startIndexExpr</dt>
	 * <dd>(optional) OGNL expression telling how to extract the startIndex
	 *		from the received data, e.g., <code>.meta.startIndex</code>.
	 *		If it is not provided, startIndex is always assumed to be zero.</dd>
	 * <dt>totalRecordsExpr</dt>
	 * <dd>(semi-optional) OGNL expression telling how to extract the total number
	 *		of records from the received data, e.g., <code>.meta.totalRecords</code>.
	 *		If this is not provided, <code>totalRecordsReturnExpr</code> must be
	 *		specified.</dd>
	 * <dt>totalRecordsReturnExpr</dt>
	 * <dd>(semi-optional) OGNL expression telling where in the response to store
	 *		the total number of records, e.g., <code>.meta.totalRecords</code>.
	 *		This is only appropriate for DataSources that always return the
	 *		entire data set.  If this is not provided,
	 *		<code>totalRecordsExpr</code> must be specified.  If both are provided,
	 *		<code>totalRecordsExpr</code> takes priority.</dd>
	 * </dl>
	 * 
	 * @attribute root
	 * @type {DataSource}
	 * @writeonce
	 */
	root:
	{
		writeOnce: true
	},

	/**
	 * Pass <code>true</code> to paginate the result after merging child
	 * nodes into the list.  The default (<code>false</code>) is to
	 * paginate only root nodes, so all children are visible.
	 * 
	 * @attribute paginateChildren
	 * @type {boolean}
	 * @default false
	 * @writeonce
	 */
	paginateChildren:
	{
		value:     false,
		validator: Y.Lang.isBoolean,
		writeOnce: true
	},

	/**
	 * The key in each record that stores an identifier which is unique
	 * across the entire tree.  If this is not specified, then all nodes
	 * will close when the data is sorted.
	 * 
	 * @attribute uniqueIdKey
	 * @type {String}
	 */
	uniqueIdKey:
	{
		validator: Y.Lang.isString
	}
};

/**
 * @event toggled
 * @description Fires after an element is opened or closed.
 * @param path {Array} the path to the toggled element
 * @param open {Boolean} the new state of the element
 */

/*

	Each element in this._open contains information about an openable,
	top-level node and is the root of a tree of open (or previously opened)
	items.  Each node in a tree contains the following data:

		index:      {Number} sorting key; the index of the node
		open:       null if never opened, true if open, false otherwise
		ds:         {DataSource} source for child nodes
		childTotal: {Number} total number of child nodes
		children:   {Array} (recursive) child nodes which are or have been opened
		parent:     {Object} parent item

	Each level is sorted by index to allow simple traversal in display
	order.

 */

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 152);
function populateOpen(
	/* object */	parent,
	/* array */		open,
	/* object */	req)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "populateOpen", 152);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 157);
var data          = req.data;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 158);
var startIndex    = req.start;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 159);
var childNodesKey = req.ds.treeble_config.childNodesKey;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 160);
var nodeOpenKey   = req.ds.treeble_config.nodeOpenKey;

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 162);
for (var j=0; j<open.length; j++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 164);
if (open[j].index >= startIndex)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 166);
break;
		}
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 170);
var uniqueIdKey = this.get('uniqueIdKey');

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 172);
var result = true;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 173);
for (var k=0; k<data.length; k++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 175);
var i = startIndex + k;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 176);
var ds = data[k][ childNodesKey ];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 177);
if (!ds)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 179);
continue;
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 182);
while (j < open.length && open[j].index < i)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 184);
open.splice(j, 1);
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 185);
result = false;

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 187);
if (uniqueIdKey)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 189);
delete this._open_cache[ data[k][ uniqueIdKey ] ];
			}
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 193);
if (j >= open.length || open[j].index > i)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 195);
var item =
			{
				index:      i,
				open:       null,
				ds:         ds,
				children:   [],
				childTotal: 0,
				parent:     parent
			};

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 205);
var cached_item = null;
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 206);
if (uniqueIdKey)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 208);
cached_item = this._open_cache[ data[k][ uniqueIdKey ] ];
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 209);
if (cached_item)
				{
					_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 211);
item.open       = cached_item.open;
					_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 212);
item.childTotal = cached_item.childTotal;
					_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 213);
this._redo      = this._redo || item.open;
				}

				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 216);
this._open_cache[ data[k][ uniqueIdKey ] ] = item;
			}

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 219);
if (!cached_item && nodeOpenKey && data[k][ nodeOpenKey ])
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 221);
this._toggle.push(req.path.concat(i));
			}

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 224);
open.splice(j, 0, item);
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 227);
j++;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 230);
return result;
}

// TODO: worth switching to binary search?
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 234);
function searchOpen(
	/* array */	list,
	/* int */	nodeIndex)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "searchOpen", 234);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 238);
for (var i=0; i<list.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 240);
if (list[i].index == nodeIndex)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 242);
return list[i];
		}
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 246);
return false;
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 249);
function getNode(
	/* array */	path)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "getNode", 249);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 252);
var open = this._open;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 253);
var last = path.length-1;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 254);
for (var i=0; i<last; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 256);
var node = searchOpen(open, path[i]);
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 257);
open     = node.children;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 260);
return searchOpen(open, path[last]);
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 263);
function countVisibleNodes(

	// not sent by initiator

	/* array */ open)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "countVisibleNodes", 263);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 269);
var total = 0;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 270);
if (!open)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 272);
open  = this._open;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 273);
total = this._topNodeTotal;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 276);
if (this.get('paginateChildren'))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 278);
for (var i=0; i<open.length; i++)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 280);
var node = open[i];
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 281);
if (node.open)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 283);
total += node.childTotal;
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 284);
total += countVisibleNodes.call(this, node.children);
			}
		}
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 289);
return total;
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 292);
function requestTree(flush_toggle)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "requestTree", 292);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 294);
if (!flush_toggle)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 296);
var save_toggle = this._toggle.slice(0);
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 299);
this._cancelAllRequests();

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 301);
if (!flush_toggle)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 303);
this._toggle = save_toggle;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 306);
this._redo                = false;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 307);
this._generating_requests = true;

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 309);
var req = this._callback.request;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 310);
if (this.get('paginateChildren'))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 312);
this._slices = getVisibleSlicesPgAll(req.startIndex, req.resultCount,
											 this.get('root'), this._open);
	}
	else
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 317);
this._slices = getVisibleSlicesPgTop(req.startIndex, req.resultCount,
											 this.get('root'), this._open);
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 321);
requestSlices.call(this, req);

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 323);
this._generating_requests = false;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 324);
checkFinished.call(this);
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 327);
function getVisibleSlicesPgTop(
	/* int */			skip,
	/* int */			show,
	/* DataSource */	ds,
	/* array */			open,

	// not sent by initiator

	/* array */			path)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "getVisibleSlicesPgTop", 327);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 337);
open = open.concat(
	{
		index:      -1,
		open:       true,
		childTotal: 0,
		children:   null
	});

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 345);
if (!path)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 347);
path = [];
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 350);
var slices = [],
		send   = false;

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 353);
var m = 0, prev = -1, presend = false;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 354);
for (var i=0; i<open.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 356);
var node = open[i];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 357);
if (!node.open)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 359);
continue;
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 362);
var delta = node.index - prev;

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 364);
if (m + delta >= skip + show ||
			node.index == -1)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 367);
slices.push(
			{
				ds:    ds,
				path:  path.slice(0),
				start: send ? m : skip,
				end:   skip + show - 1
			});

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 375);
if (m + delta == skip + show && node.childTotal > 0)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 377);
slices = slices.concat(
					getVisibleSlicesPgTop(0, node.childTotal, node.ds,
										  node.children, path.concat(node.index)));
			}

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 382);
return slices;
		}
		else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 384);
if (!send && m + delta == skip)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 386);
presend = true;
		}
		else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 388);
if (m + delta > skip)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 390);
slices.push(
			{
				ds:    ds,
				path:  path.slice(0),
				start: send ? prev + 1 : skip,
				end:   m + delta - 1
			});
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 397);
send = true;
		}}}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 400);
m += delta;

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 402);
if (send && node.childTotal > 0)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 404);
slices = slices.concat(
				getVisibleSlicesPgTop(0, node.childTotal, node.ds,
									  node.children, path.concat(node.index)));
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 409);
prev = node.index;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 410);
send = send || presend;
	}
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 414);
function getVisibleSlicesPgAll(
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
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "getVisibleSlicesPgAll", 414);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 428);
if (!parent)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 430);
path   = [];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 431);
parent = null;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 432);
pre    = 0;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 433);
send   = false;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 434);
slices = [];
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 437);
var ds = parent ? parent.ds : rootDS;

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 439);
open = open.concat(
	{
		index:      parent ? parent.childTotal : -1,
		open:       true,
		childTotal: 0,
		children:   null
	});

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 447);
var n = 0, m = 0, prev = -1;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 448);
for (var i=0; i<open.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 450);
var node = open[i];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 451);
if (!node.open)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 453);
continue;
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 456);
var delta = node.index - prev;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 457);
if (node.children === null)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 459);
delta--;	// last item is off the end
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 462);
if (pre + n + delta >= skip + show ||
			node.index == -1)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 465);
slices.push(
			{
				ds:    ds,
				path:  path.slice(0),
				start: m + (send ? 0 : skip - pre - n),
				end:   m + (skip + show - 1 - pre - n)
			});

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 473);
return slices;
		}
		else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 475);
if (!send && pre + n + delta == skip)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 477);
send = true;
		}
		else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 479);
if (pre + n + delta > skip)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 481);
slices.push(
			{
				ds:    ds,
				path:  path.slice(0),
				start: m + (send ? 0 : skip - pre - n),
				end:   m + delta - 1
			});
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 488);
send = true;
		}}}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 491);
n += delta;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 492);
m += delta;

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 494);
if (node.childTotal > 0)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 496);
var info = getVisibleSlicesPgAll(skip, show, rootDS, node.children,
											 path.concat(node.index),
											 node, pre+n, send, slices);
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 499);
if (Y.Lang.isArray(info))
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 501);
return info;
			}
			else
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 505);
n   += info.count;
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 506);
send = info.send;
			}
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 510);
prev = node.index;
	}

	// only reached when parent != null

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 515);
var info =
	{
		count: n,
		send:  send
	};
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 520);
return info;
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 523);
function requestSlices(
	/* object */	request)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "requestSlices", 523);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 526);
for (var i=0; i<this._slices.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 528);
var slice = this._slices[i];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 529);
var ds    = slice.ds;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 530);
var req   = findRequest.call(this, ds);
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 531);
if (req)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 533);
if (Y.Console)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 535);
if (req.end+1 < slice.start)
				{
					_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 537);
Y.error('TreebleDataSource found discontinuous range');
				}

				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 540);
if (req.path.length != slice.path.length)
				{
					_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 542);
Y.error('TreebleDataSource found path length mismatch');
				}
				else
				{
					_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 546);
for (var j=0; j<slice.path.length; j++)
					{
						_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 548);
if (req.path[j] != slice.path[j])
						{
							_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 550);
Y.error('TreebleDataSource found path mismatch');
							_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 551);
break;
						}
					}
				}
			}

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 557);
req.end = slice.end;
		}
		else
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 561);
this._req.push(
			{
				ds:    ds,
				path:  slice.path,
				start: slice.start,
				end:   slice.end
			});
		}
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 571);
request = Y.clone(request, true);
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 572);
for (var i=0; i<this._req.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 574);
var req             = this._req[i];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 575);
request.startIndex  = req.start;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 576);
request.resultCount = req.end - req.start + 1;

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 578);
req.txId = req.ds.sendRequest(
		{
			request: req.ds.treeble_config.generateRequest(request, req.path),
			cfg:     req.ds.treeble_config.requestCfg,
			callback:
			{
				success: Y.rbind(treeSuccess, this, i),
				failure: Y.rbind(treeFailure, this, i)
			}
		});
	}
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 591);
function findRequest(
	/* DataSource */	ds)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "findRequest", 591);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 594);
for (var i=0; i<this._req.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 596);
var req = this._req[i];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 597);
if (ds == req.ds)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 599);
return req;
		}
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 603);
return null;
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 606);
function treeSuccess(e, reqIndex)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "treeSuccess", 606);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 608);
if (!e.response || e.error ||
		!Y.Lang.isArray(e.response.results))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 611);
treeFailure.apply(this, arguments);
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 612);
return;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 615);
var req = searchTxId(this._req, e.tId, reqIndex);
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 616);
if (!req)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 618);
return;		// cancelled request
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 621);
if (!this._topResponse && req.ds == this.get('root'))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 623);
this._topResponse = e.response;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 626);
req.txId  = null;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 627);
req.resp  = e.response;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 628);
req.error = false;

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 630);
var dataStartIndex = 0;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 631);
if (req.ds.treeble_config.startIndexExpr)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 633);
eval('dataStartIndex=req.resp'+req.ds.treeble_config.startIndexExpr);
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 636);
var sliceStartIndex = req.start - dataStartIndex;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 637);
req.data            = e.response.results.slice(sliceStartIndex, req.end - dataStartIndex + 1);
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 638);
setNodeInfo(req.data, req.start, req.path, req.ds);

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 640);
var parent = (req.path.length > 0 ? getNode.call(this, req.path) : null);
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 641);
var open   = (parent !== null ? parent.children : this._open);
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 642);
if (!populateOpen.call(this, parent, open, req))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 644);
treeFailure.apply(this, arguments);
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 645);
return;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 648);
if (!parent && req.ds.treeble_config.totalRecordsExpr)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 650);
eval('this._topNodeTotal=e.response'+req.ds.treeble_config.totalRecordsExpr);
	}
	else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 652);
if (!parent && req.ds.treeble_config.totalRecordsReturnExpr)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 654);
this._topNodeTotal = e.response.results.length;
	}}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 657);
checkFinished.call(this);
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 660);
function treeFailure(e, reqIndex)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "treeFailure", 660);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 662);
var req = searchTxId(this._req, e.tId, reqIndex);
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 663);
if (!req)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 665);
return;		// cancelled request
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 668);
this._cancelAllRequests();

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 670);
this._callback.error    = e.error;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 671);
this._callback.response = e.response;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 672);
this.fire('response', this._callback);
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 675);
function setNodeInfo(
	/* array */			list,
	/* int */			offset,
	/* array */			path,
	/* datasource */	ds)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "setNodeInfo", 675);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 681);
var depth = path.length;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 682);
for (var i=0; i<list.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 684);
list[i]._yui_node_depth = depth;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 685);
list[i]._yui_node_path  = path.concat(offset+i);
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 686);
list[i]._yui_node_ds    = ds;
	}
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 690);
function searchTxId(
	/* array */	req,
	/* int */	id,
	/* int */	fallbackIndex)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "searchTxId", 690);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 695);
for (var i=0; i<req.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 697);
if (req[i].txId === id)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 699);
return req[i];
		}
	}

	// synch response arrives before setting txId

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 705);
if (fallbackIndex < req.length &&
		Y.Lang.isUndefined(req[ fallbackIndex ].txId))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 708);
return req[ fallbackIndex ];
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 711);
return null;
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 714);
function checkFinished()
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "checkFinished", 714);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 716);
if (this._generating_requests)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 718);
return;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 721);
var count = this._req.length;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 722);
for (var i=0; i<count; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 724);
if (!this._req[i].resp)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 726);
return;
		}
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 730);
if (this._redo)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 732);
Y.Lang.later(0, this, requestTree);
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 733);
return;
	}
	else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 735);
if (this._toggle.length > 0)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 737);
var t = this._toggle.shift();
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 738);
this.toggle(t, Y.clone(this._callback.request, true),
		{
			fn: function()
			{
				_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "fn", 740);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 742);
Y.Lang.later(0, this, requestTree);
			},
			scope: this
		});
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 746);
return;
	}}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 749);
var response = { meta:{} };
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 750);
Y.mix(response, this._topResponse, true);
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 751);
response.results = [];
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 752);
response         = Y.clone(response, true);

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 754);
count = this._slices.length;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 755);
for (i=0; i<count; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 757);
var slice = this._slices[i];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 758);
var req   = findRequest.call(this, slice.ds);
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 759);
if (!req)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 761);
Y.error('Failed to find request for a slice');
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 762);
continue;
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 765);
var j    = slice.start - req.start;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 766);
var data = req.data.slice(j, j + slice.end - slice.start + 1);

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 768);
response.results = response.results.concat(data);
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 771);
var rootDS = this.get('root');
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 772);
if (rootDS.treeble_config.totalRecordsExpr)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 774);
eval('response'+rootDS.treeble_config.totalRecordsExpr+'='+countVisibleNodes.call(this));
	}
	else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 776);
if (rootDS.treeble_config.totalRecordsReturnExpr)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 778);
eval('response'+rootDS.treeble_config.totalRecordsReturnExpr+'='+countVisibleNodes.call(this));
	}}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 781);
this._callback.response = response;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 782);
this.fire('response', this._callback);
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 785);
function toggleSuccess(e, node, completion, path)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "toggleSuccess", 785);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 787);
if (node.ds.treeble_config.totalRecordsExpr)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 789);
eval('node.childTotal=e.response'+node.ds.treeble_config.totalRecordsExpr);
	}
	else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 791);
if (node.ds.treeble_config.totalRecordsReturnExpr)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 793);
node.childTotal = e.response.results.length;
	}}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 796);
node.open     = true;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 797);
node.children = [];
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 798);
complete(completion);

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 800);
this.fire('toggled',
	{
		path: path,
		open: node.open
	});
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 807);
function toggleFailure(e, node, completion, path)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "toggleFailure", 807);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 809);
node.childTotal = 0;

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 811);
node.open     = true;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 812);
node.children = [];
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 813);
complete(completion);

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 815);
this.fire('toggled',
	{
		path: path,
		open: node.open
	});
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 822);
function complete(f)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "complete", 822);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 824);
if (Y.Lang.isFunction(f))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 826);
f();
	}
	else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 828);
if (f && f.fn)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 830);
f.fn.apply(f.scope || window, Y.Lang.isUndefined(f.args) ? [] : f.args);
	}}
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 834);
function compareRequests(r1, r2)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "compareRequests", 834);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 836);
var k1 = Y.Object.keys(r1),
		k2 = Y.Object.keys(r2);

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 839);
if (k1.length != k2.length)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 841);
return false;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 844);
for (var i=0; i<k1.length; i++)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 846);
var k = k1[i];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 847);
if (k != 'startIndex' && k != 'resultCount' && r1[k] !== r2[k])
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 849);
return false;
		}
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 853);
return true;
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 856);
Y.extend(TreebleDataSource, Y.DataSource.Local,
{
	initializer: function(config)
	{
		_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "initializer", 858);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 860);
if (!config.root)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 862);
Y.error('TreebleDataSource requires DataSource');
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 865);
if (!config.root.treeble_config.childNodesKey)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 867);
var fields = config.root.schema.get('schema').resultFields;
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 868);
if (!fields || !Y.Lang.isArray(fields))
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 870);
Y.error('TreebleDataSource root DataSource requires schema.resultFields because treeble_config.childNodesKey was not specified.');
			}

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 873);
for (var i=0; i<fields.length; i++)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 875);
if (Y.Lang.isObject(fields[i]) && fields[i].parser == 'treebledatasource')
				{
					_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 877);
config.root.treeble_config.childNodesKey = fields[i].key;
					_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 878);
break;
				}
			}

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 882);
if (!config.root.treeble_config.childNodesKey)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 884);
Y.error('TreebleDataSource requires treeble_config.childNodesKey configuration to be set on root DataSource');
			}
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 888);
if (!config.root.treeble_config.generateRequest)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 890);
Y.error('TreebleDataSource requires treeble_config.generateRequest configuration to be set on root DataSource');
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 893);
if (!config.root.treeble_config.totalRecordsExpr && !config.root.treeble_config.totalRecordsReturnExpr)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 895);
Y.error('TreebleDataSource requires either treeble_config.totalRecordsExpr or treeble_config.totalRecordsReturnExpr configuration to be set on root DataSource');
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 898);
this._open       = [];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 899);
this._open_cache = {};
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 900);
this._toggle     = [];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 901);
this._req        = [];
	},

	/**
	 * @method isOpen
	 * @param path {Array} Path to node
	 * @return {boolean} true if the node is open
	 */
	isOpen: function(path)
	{
		_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "isOpen", 909);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 911);
var list = this._open;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 912);
for (var i=0; i<path.length; i++)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 914);
var node = searchOpen.call(this, list, path[i]);
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 915);
if (!node || !node.open)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 917);
return false;
			}
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 919);
list = node.children;
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 922);
return true;
	},

	/**
	 * Toggle the specified node between open and closed.  When a node is
	 * opened for the first time, this requires a request to the
	 * DataSource.  Any code that assumes the node has been opened must be
	 * passed in as a completion function.
	 * 
	 * @method toggle
	 * @param path {Array} Path to the node
	 * @param request {Object} {sort,dir,startIndex,resultCount}
	 * @param completion {Function|Object} Function to call when the operation completes.  Can be object: {fn,scope,args}
	 * @return {boolean} false if the path to the node has not yet been fully explored or is not openable, true otherwise
	 */
	toggle: function(path, request, completion)
	{
		_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "toggle", 937);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 939);
var list = this._open;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 940);
for (var i=0; i<path.length; i++)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 942);
var node = searchOpen.call(this, list, path[i]);
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 943);
if (!node)
			{
				_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 945);
return false;
			}
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 947);
list = node.children;
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 950);
if (node.open === null)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 952);
request.startIndex  = 0;
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 953);
request.resultCount = 0;
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 954);
node.ds.sendRequest(
			{
				request: node.ds.treeble_config.generateRequest(request, path),
				cfg:     node.ds.treeble_config.requestCfg,
				callback:
				{
					success: Y.rbind(toggleSuccess, this, node, completion, path),
					failure: Y.rbind(toggleFailure, this, node, completion, path)
				}
			});
		}
		else
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 967);
node.open = !node.open;
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 968);
complete(completion);

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 970);
this.fire('toggled',
			{
				path: path,
				open: node.open
			});
		}
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 976);
return true;
	},

	_defRequestFn: function(e)
	{
		// wipe out all state if the request parameters change

		_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "_defRequestFn", 979);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 983);
if (this._callback && !compareRequests(this._callback.request, e.request))
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 985);
this._open = [];
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 988);
this._callback = e;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 989);
requestTree.call(this, true);
	},

	_cancelAllRequests: function()
	{
		_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "_cancelAllRequests", 992);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 994);
this._req    = [];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 995);
this._toggle = [];
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 996);
delete this._topResponse;
	}
});

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1000);
Y.TreebleDataSource = TreebleDataSource;
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1001);
Y.namespace('DataSource').Treeble = TreebleDataSource;
/**
 * @module gallery-treeble
 */

/**
 * <p>Converts data to a DataSource.  Data can be an object containing both
 * <code>dataType</code> and <code>liveData</code>, or it can be <q>free
 * form</q>, e.g., an array of records or an XHR URL.</p>
 *
 * @class Parsers
 */

/**
 * @method treebledatasource
 * @static
 * @param oData {mixed} Data to convert.
 * @return {DataSource} The new data source.
 */
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1020);
Y.namespace("Parsers").treebledatasource = function(oData)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "treebledatasource", 1020);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1022);
if (!oData)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1024);
return null;
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1027);
var type = oData.dataType;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1028);
if (type)
	{
		// use it
	}
	else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1032);
if (Y.Lang.isString(oData))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1034);
type = 'IO';
	}
	else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1036);
if (Y.Lang.isFunction(oData))
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1038);
type = 'Function';
	}
	else
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1042);
type = 'Local';
	}}}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1045);
var src            = oData.dataType ? oData.liveData : oData;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1046);
var treeble_config = this.get('host').treeble_config;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1047);
if (type == 'Local')
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1049);
treeble_config = Y.clone(treeble_config, true);
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1050);
delete treeble_config.startIndexExpr;
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1051);
delete treeble_config.totalRecordsExpr;
	}
	else {_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1053);
if (type == 'Function')
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1055);
src = Y.Lang.isString(src) ? window[ src ] : src;
	}}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1058);
var ds            = new Y.DataSource[ type ]({ source: src });
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1059);
ds.treeble_config = treeble_config;

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1061);
if (ds.treeble_config.schemaPluginConfig)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1063);
ds.plug(Y.clone(ds.treeble_config.schemaPluginConfig, true));
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1066);
if (ds.treeble_config.cachePluginConfig)
	{
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1068);
ds.plug(Y.clone(ds.treeble_config.cachePluginConfig, true));
	}

	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1071);
return ds;
};
/**********************************************************************
 * Treeble displays a tree of data in a table.
 *
 * @module gallery-treeble
 * @main gallery-treeble
 */

/**
 * Extension to DataTable for displaying tree data.
 *
 * @class Treeble
 * @extends DataTable
 * @constructor
 * @param config {Object}
 */
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1088);
function Treeble()
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "Treeble", 1088);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1090);
Treeble.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1093);
Treeble.NAME = "datatable";		// same styling

/**
 * <p>Formatter for open/close twistdown.</p>
 *
 * @method twistdownFormatter
 * @static
 * @param sendRequest {Function} Function that reloads DataTable
 */
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1102);
Treeble.buildTwistdownFormatter = function(sendRequest)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "buildTwistdownFormatter", 1102);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1104);
return function(o)
	{
		_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "(anonymous 2)", 1104);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1106);
o.td.addClass('treeble-nub');

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1108);
var ds  = this.datasource.get('datasource');
		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1109);
var key = ds.get('root').treeble_config.childNodesKey;

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1111);
if (o.data[key])
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1113);
var path = o.data._yui_node_path;

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1115);
o.td.addClass('row-toggle');
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1116);
o.td.replaceClass('row-(open|closed)',
				ds.isOpen(path) ? 'row-open' : 'row-closed');

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1119);
YUI.Env.add(Y.Node.getDOMNode(o.td), 'click', function()
			{
				_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "(anonymous 3)", 1119);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1121);
ds.toggle(path, {}, sendRequest);
			});

			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1124);
o.cell.set('innerHTML', '<a class="treeble-expand-nub" href="javascript:void(0);"></a>');
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1127);
return false;	// discard Y.Node instances
	};
};

/**
 * <p>Default formatter for indented column.</p>
 *
 * @method treeValueFormatter
 * @static
 */
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1137);
Treeble.treeValueFormatter = function(o)
{
	_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "treeValueFormatter", 1137);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1139);
var depth_class = 'treeble-depth-'+o.data._yui_node_depth;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1140);
o.rowClass     += ' ' + depth_class;
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1141);
o.className    += ' treeble-value';
	_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1142);
return '<span class="'+depth_class+'">'+o.value+'</span>';
};

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1145);
Y.extend(Treeble, Y.DataTable,
{
	plug: function(plugin, config)
	{
		_yuitest_coverfunc("build/gallery-treeble/gallery-treeble.js", "plug", 1147);
_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1149);
if (plugin === Y.Plugin.DataTableDataSource)
		{
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1151);
var recordType = this.get('recordType');
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1152);
recordType.ATTRS[ config.datasource.get('root').treeble_config.childNodesKey ] = {};
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1153);
recordType.ATTRS._yui_node_path  = {};
			_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1154);
recordType.ATTRS._yui_node_depth = {};
		}

		_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1157);
Treeble.superclass.plug.apply(this, arguments);
	}
});

_yuitest_coverline("build/gallery-treeble/gallery-treeble.js", 1161);
Y.Treeble = Treeble;


}, '@VERSION@', {"skinnable": "true", "requires": ["datasource", "datatable"]});
