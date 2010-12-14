"use strict";

var lang   = YAHOO.lang,
	util   = YAHOO.util,
	DS     = YAHOO.util.DataSourceBase;

DS.TYPE_BULKEDIT = 10;

/**
 * <p>BulkEditDataSource manages a YUI DataSource + diffs (changes to
 * values, insertions, removals).</p>
 * 
 * <p>The YUI DataSource must be immutable, e.g., if it is an XHR
 * datasource, the data must not change.</p>
 * 
 * <p>By using a DataSource, we can support both client-side pagination
 * (all data pre-loaded, best-effort save allowed) and server-side
 * pagination (load data when needed, only all-or-nothing save allowed).
 * Server-side pagination is useful when editing a large amount of existing
 * records or after uploading a large number of new records (store them in
 * a scratch space, so everything does not have to be sent back to the
 * client after parsing).  In the case of bulk upload, server-side
 * validation will catch errors in unviewed records.</p>
 * 
 * <p>The responseSchema passed to the YUI DataSource must include a
 * comparator for each field that should not be treated like a string.
 * This comparator can either be 'integer', 'decimal', or a function which
 * takes two arguments.</p>
 *
 * @module BulkEdit
 * @namespace YAHOO.util
 * @class YAHOO.util.BulkEditDataSource
 * @extends YAHOO.util.DataSourceBase 
 * @constructor
 * @param oLiveData {DataSource}  The DataSource with the original data.
 * @param oConfigs {Object} Object literal of configuration values.
 *		<dl>
 *		<dt>generateRequest</dt>
 *		<dd>(required) The function to convert the initial request into a
 *			request usable by the underlying DataSource.  This function
 *			takes one argument: state (startIndex,resultCount,...).</dd>
 *		<dt>uniqueIdKey</dt>
 *		<dd>(required) The name of the key in each record that stores an
 *			identifier which is unique across the entire data set.</dd>
 *		<dt>generateUniqueId</dt>
 *		<dd>(optional) The function to call to generate a unique id for a
 *			new record.</dd>
 *		<dt>startIndexExpr</dt>
 *		<dd>(optional) OGNL expression telling how to extract the startIndex
 *			from the received data, e.g., <code>.meta.startIndex</code>.
 *			If it is not provided, startIndex is always assumed to be zero.</dd>
 *		<dt>totalRecordsReturnExpr</dt>
 *		<dd>(optional) OGNL expression telling where in the response to store
 *			the total number of records, e.g., <code>.meta.totalRecords</code>.
 *			This is only appropriate for DataSources that always return the
 *			entire data set.</dd>
 *		<dt>extractTotalRecords</dt>
 *		<dd>(required) The function to call to extract the total number of
 *			records from the response.</dd>
 *		</dl>
 */
util.BulkEditDataSource = function(oLiveData, oConfigs)
{
	if (!(oLiveData instanceof util.DataSourceBase))
	{
		YAHOO.log('BulkEditDataSource requires DataSource', 'error', 'BulkEditDataSource');
		return;
	}

	if (!lang.isFunction(oConfigs.generateRequest))
	{
		YAHOO.log('BulkEditDataSource requires generateRequest function', 'error', 'BulkEditDataSource');
		return;
	}

	if (!oConfigs.uniqueIdKey)
	{
		YAHOO.log('BulkEditDataSource requires oConfigs.uniqueIdKey configuration', 'error', 'BulkEditDataSource');
		return;
	}

	if (!oConfigs.totalRecordsExpr && !oConfigs.totalRecordsReturnExpr)
	{
		YAHOO.log('BulkEditDataSource requires either oConfigs.totalRecordsExpr or oConfigs.totalRecordsReturnExpr configuration', 'error', 'BulkEditDataSource');
		return;
	}

	if (!YAHOO.lang.isFunction(oConfigs.extractTotalRecords))
	{
		YAHOO.log('BulkEditDataSource requires extractTotalRecords function', 'error', 'BulkEditDataSource');
		return;
	}

	oConfigs.generateUniqueId = oConfigs.generateUniqueId || generateUniqueId;

	this.dataType = DS.TYPE_BULKEDIT;
	this._index   = null;
	this._count   = 0;
	this._new     = {};
	this._diff    = {};
	util.BulkEditDataSource.superclass.constructor.call(this, oLiveData, oConfigs);
};

var uniqueIdPrefix = 'bulk-edit-new-id-',
	idCounter = 0,

	inserted_prefix = 'be-ds-i:',
	inserted_re     = /^be-ds-i:/,
	removed_prefix  = 'be-ds-r:',
	removed_re      = /^be-ds-r:/;

util.BulkEditDataSource.comparator =
{
	string: function(a,b)
	{
		return (lang.trim(a.toString()) === lang.trim(b.toString()));
	},

	integer: function(a,b)
	{
		return (parseInt(a,10) === parseInt(b,10));
	},

	decimal: function(a,b)
	{
		return (parseFloat(a,10) === parseFloat(b,10));
	}
};

function generateUniqueId()
{
	idCounter++;
	return uniqueIdPrefix + idCounter;
}

function fromDisplayIndex(
	/* int */ index)
{
	var count = -1;
	for (var i=0; i<this._index.length; i++)
	{
		var j = this._index[i];
		if (!removed_re.test(j))
		{
			count++;
			if (count === index)
			{
				return i;
			}
		}
	}

	return false;
}

function adjustRequest()
{
	var r = this._callback.request;
	this._callback.adjust =
	{
		origStart: r.startIndex,
		origCount: r.resultCount
	};

	if (!this._index)
	{
		return;
	}

	// find index of first record to request

	var start = Math.min(r.startIndex, this._index.length);
	var end   = 0;
	for (var i=0; i<start; i++)
	{
		var j = this._index[i];
		if (!inserted_re.test(j))
		{
			end++;
		}

		if (removed_re.test(j))
		{
			start++;
		}
	}

	r.startIndex = end;

	this._callback.adjust.indexStart = i;

	// adjust number of records to request

	var count = 0;
	while (i < this._index.length && count < this._callback.adjust.origCount)
	{
		var j = this._index[i];
		if (inserted_re.test(j))
		{
			r.resultCount--;
		}

		if (removed_re.test(j))
		{
			r.resultCount++;
		}
		else
		{
			count++;
		}

		i++;
	}

	this._callback.adjust.indexEnd = i;
}

function internalSuccess(oRequest, oParsedResponse)
{
	if (!oParsedResponse || oParsedResponse.error ||
		!(oParsedResponse.results instanceof Array))
	{
		internalFailure.apply(this, arguments);
		return;
	}

	// synch response arrives before setting txId

	if (!lang.isUndefined(this._callback.txId) &&
		oParsedResponse.tId !== this._callback.txId)
	{
		return; 	// cancelled request
	}

	this._callback.response = oParsedResponse;
	checkFinished.call(this);
}

function internalFailure(oRequest, oParsedResponse)
{
	if (oParsedResponse.tId === this._callback.txId)
	{
		DS.issueCallback(this._callback.callback, [this._callback.request, oParsedResponse], true, this._callback.caller);
	}
}

function checkFinished()
{
	if (this._generatingRequest || !this._callback.response)
	{
		return;
	}

	if (!this._fields)
	{
		this._fields = {};
		var fields   = this.liveData.responseSchema.fields;
		for (var i=0; i<fields.length; i++)
		{
			this._fields[ fields[i].key ] = fields[i];
		}
	}

	var response = {};
	lang.augmentObject(response, this._callback.response);
	response.results = [];
	response         = cloneObject(response);

	var dataStartIndex = 0;
	if (this.startIndexExpr)
	{
		eval('dataStartIndex=this._callback.response'+this.startIndexExpr);
	}

	var startIndex   = this._callback.request.startIndex - dataStartIndex
	response.results = this._callback.response.results.slice(startIndex, startIndex + this._callback.request.resultCount);

	// insertions/removals

	if (!this._index)
	{
		if (this.totalRecordsReturnExpr)
		{
			eval('response'+this.totalRecordsReturnExpr+'='+this._callback.response.results.length);
		}
		this._count = this.extractTotalRecords(response);

		this._index = [];
		for (var i=0; i<this._count; i++)
		{
			this._index.push(i);
		}
	}
	else
	{
		var adjust = this._callback.adjust;
		for (var i=adjust.indexStart, k=0; i<adjust.indexEnd; i++, k++)
		{
			var j = this._index[i];
			if (inserted_re.test(j))
			{
				var id = j.substr(inserted_prefix.length);
				response.results.splice(k,0, cloneObject(this._new[id]));
			}
			else if (removed_re.test(j))
			{
				response.results.splice(k,1);
				k--;
			}
		}
	}

	// save results so we can refer to them later

	this._records   = [];
	this._recordMap = {};

	for (var i=0; i<response.results.length; i++)
	{
		var rec = cloneObject(response.results[i]);
		this._records.push(rec);
		this._recordMap[ rec[ this.uniqueIdKey ] ] = rec;
	}

	// merge in diffs

	for (var i=0; i<response.results.length; i++)
	{
		var rec  = response.results[i];
		var diff = this._diff[ rec[ this.uniqueIdKey ] ] || {};
		for (var key in diff)
		{
			if (lang.hasOwnProperty(diff, key))
			{
				rec[key] = diff[key];
			}
		}
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

	if ((o instanceof RegExp) || lang.isFunction(o))
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

// BulkEditDataSource extends DataSourceBase
lang.extend(util.BulkEditDataSource, DS,
{
	_dataIsLocal: function()
	{
		return (this.liveData.responseType === DS.TYPE_JSARRAY);
	},

	getUniqueIdKey: function()
	{
		return this.uniqueIdKey;
	},

	// use this instead of any meta information in response

	getRecordCount: function()
	{
		return this._count;
	},

	getCurrentRecords: function()
	{
		return this._records;
	},

	getCurrentRecordMap: function()
	{
		return this._recordMap;
	},

	/**
	 * Returns the current value of the specified item in the specified record.
	 */
	getValue: function(
		/* int */		record_index,
		/* string */	key)
	{
		if (!this._dataIsLocal())
		{
			YAHOO.log('BulkEditDataSource.getValue() can only be called when using a local datasource', 'error', 'BulkEditDataSource');
			return;
		}

		var j = fromDisplayIndex.call(this, record_index);
		if (j === false)
		{
			return false;
		}

		j = this._index[j];
		if (inserted_re.test(j))
		{
			var record_id = j.substr(inserted_prefix.length);
			var record    = this._new[ record_id ];
		}
		else
		{
			var record    = this.liveData.liveData[j];
			var record_id = record[ this.uniqueIdKey ];
		}

		if (this._diff[ record_id ] &&
			!lang.isUndefined(this._diff[ record_id ][ key ]))
		{
			return this._diff[ record_id ][ key ];
		}
		else
		{
			return record[key];
		}
	},

	/**
	 * When using a remote datasource, this will include changes made to
	 * deleted records.
	 */
	getChanges: function()
	{
		return this._diff;
	},

	getRemovedRecordIndexes: function()
	{
		var list = [];
		for (var i=0; i<this._index.length; i++)
		{
			var j = this._index[i];
			if (removed_re.test(j))
			{
				list.push(parseInt(j.substr(removed_prefix.length), 10));
			}
		}

		return list;
	},

	/**
	 * You *must* _reload() the widget after calling this function!
	 */
	insertRecord: function(
		/* int */		index,
		/* object */	record)
	{
		this._count++;

		var record_id = this.generateUniqueId();

		this._new[ record_id ]                     = {};
		this._new[ record_id ][ this.uniqueIdKey ] = record_id;

		var j = fromDisplayIndex.call(this, index);
		if (j === false)
		{
			j = this._index.length;
		}
		this._index.splice(j, 0, inserted_prefix+record_id);

		// insert initial values into _diff

		if (YAHOO.lang.isString(record))
		{
			record = this._recordMap[ record ];
		}

		if (record)
		{
			for (var key in record)
			{
				if (key != this.uniqueIdKey &&
					lang.hasOwnProperty(record, key))
				{
					this.updateValue(record_id, key, record[key]);
				}
			}
		}

		return record_id;
	},

	/**
	 * You *must* _reload() the widget after calling this function!
	 */
	removeRecord: function(
		/* int */ index)
	{
		var j = fromDisplayIndex.call(this, index);
		if (j === false)
		{
			return false;
		}

		this._count--;

		if (inserted_re.test(this._index[j]))
		{
			var record_id = this._index[j].substr(inserted_prefix.length);
			delete this._new[ record_id ];
			this._index.splice(j,1);
		}
		else
		{
			if (this._dataIsLocal())
			{
				var record_id = this.liveData.liveData[ this._index[j] ][ this.uniqueIdKey ].toString();
			}

			this._index[j] = removed_prefix + this._index[j];
		}

		if (record_id)
		{
			delete this._diff[ record_id ];
		}

		return true;
	},

	updateValue: function(
		/* string */	record_id,
		/* string */	key,
		/* string */	value)
	{
		var record = this._recordMap[ record_id ];
		if (record && this._getComparator(key)(record[key] || '', value || ''))
		{
			if (this._diff[ record_id ])
			{
				delete this._diff[ record_id ][ key ];
			}
		}
		else	// might be new record
		{
			if (!this._diff[ record_id ])
			{
				this._diff[ record_id ] = {};
			}
			this._diff[ record_id ][ key ] = value;
		}
	},

	_getComparator: function(
		/* string */ key)
	{
		var f = (this._fields[key] && this._fields[key].comparator) || 'string';
		if (lang.isFunction(f))
		{
			return f;
		}
		else if (util.BulkEditDataSource.comparator[f])
		{
			return util.BulkEditDataSource.comparator[f];
		}
		else
		{
			return util.BulkEditDataSource.comparator.string;
		}
	},

	mergeChanges: function(
		/* string */ record_id)
	{
		if (!this._dataIsLocal())
		{
			YAHOO.log('BulkEditDataSource.mergeChanges() can only be called when using a local datasource', 'error', 'BulkEditDataSource');
			return;
		}

		function merge(rec)
		{
			if (rec[ this.uniqueIdKey ].toString() === record_id.toString())
			{
				var diff = this._diff[ record_id ];
				if (diff)
				{
					for (var key in diff)
					{
						if (lang.hasOwnProperty(diff, key))
						{
							rec[key] = diff[key];
						}
					}

					delete this._diff[ record_id ];
				}
				return true;
			}
		}

		var found = false;

		this.liveData.flushCache();

		var records = this.liveData.liveData;
		for (var i=0; i<records.length; i++)
		{
			var rec = records[i];
			if (merge.call(this, records[i]))
			{
				found = true;
				break;
			}
		}

		if (!found)
		{
			for (var id in this._new)
			{
				if (lang.hasOwnProperty(this._new, id) &&
					merge.call(this, this._new[id]))
				{
					found = true;
					break;
				}
			}
		}
	},

	/**
	 * Only for use after best-effort save.
	 * You *must* _reload() the widget after calling this function!
	 */
	killRecord: function(
		/* string */ record_id)
	{
		if (!this._dataIsLocal())
		{
			YAHOO.log('BulkEditDataSource.killRecord() can only be called when using a local datasource', 'error', 'BulkEditDataSource');
			return;
		}

		this.liveData.flushCache();

		var records = this.liveData.liveData;
		for (var i=0; i<records.length; i++)
		{
			var rec = records[i];
			if (rec[ this.uniqueIdKey ].toString() === record_id.toString())
			{
				records.splice(i,1);
				delete this._diff[ record_id ];
				break;
			}
		}
	},

	/**
	 * You *must* _reload() the widget after calling this function!
	 */
	updateRecordId: function(
		/* string */	orig_record_id,
		/* string */	new_record_id)
	{
		if (!this._dataIsLocal())
		{
			YAHOO.log('BulkEditDataSource.updateRecordId() can only be called when using a local datasource', 'error', 'BulkEditDataSource');
			return;
		}

		this.liveData.flushCache();

		var records = this.liveData.liveData;
		for (var i=0; i<records.length; i++)
		{
			var rec = records[i];
			if (rec[ this.uniqueIdKey ].toString() === orig_record_id.toString())
			{
				rec[ this.uniqueIdKey ] = new_record_id;
				if (this._diff[ orig_record_id ])
				{
					this._diff[ new_record_id ] = this._diff[ orig_record_id ];
					delete this._diff[ orig_record_id ];
				}
				break;
			}
		}
	},

	recordIdToIndex: function(
		/* string */ record_id)
	{
		if (!this._dataIsLocal())
		{
			YAHOO.log('BulkEditDataSource.recordIdToIndex() can only be called when using a local datasource', 'error', 'BulkEditDataSource');
			return false;
		}

		record_id = record_id.toString();

		var records = this.liveData.liveData;
		var count   = 0;
		for (var i=0; i<this._index.length; i++)
		{
			var j   = this._index[i];
			var ins = inserted_re.test(j);
			var del = removed_re.test(j);
			if ((ins &&
				 j.substr(inserted_prefix.length) === record_id) ||
				(!ins && !del &&
				 records[j][ this.uniqueIdKey ].toString() === record_id))
			{
				return count;
			}

			if (!del)
			{
				count++;
			}
		}

		return false;
	},

	/**
	 * Overriding method merges edits into data and returns result.
	 *
	 * @method makeConnection
	 * @param oRequest {Object} Request object: (startIndex,resultCount,...)
	 * @param oCallback {Object} Callback object literal.
	 * @param oCaller {Object} (deprecated) Use oCallback.scope.
	 * @return {Number} Transaction ID.
	 * @private
	 */
	makeConnection: function(oRequest, oCallback, oCaller)
	{
		var tId = DS._nTransactionId++;
		this.fireEvent("requestEvent", {tId:tId, request:oRequest,callback:oCallback,caller:oCaller});

		this._callback =
		{
			request:  cloneObject(oRequest),
			callback: oCallback,
			caller:   oCaller
		};
		adjustRequest.call(this);

		this._generatingRequest = true;

		this._callback.txId = this.liveData.sendRequest(this.generateRequest(this._callback.request),
		{
			success: internalSuccess,
			failure: internalFailure,
			scope:   this
		});

		this._generatingRequest = false;
		checkFinished.call(this);

		return tId;
	}
});

// Copy static members to BulkEditDataSource class
lang.augmentObject(util.BulkEditDataSource, DS);
