"use strict";

/**
 * Implements transport protocol for Adobe AIR.  Based on YUI io-nodejs module.
 *
 * @module gallery-io-adobe-air
 */

/**
Flatten headers object
@method flatten
@protected
@for IO
@param {Object} o The headers object
@return {String} The flattened headers object
*/
function flatten(o)
{
	var str = [];
	Y.each(o, function(value, key)
	{
		str.push(name + ': ' + o[name]);
	});
	return str.join('\n');
}

Y.log('Loading Adobe AIR Request Transport', 'info', 'io');

/**
Adboe AIR IO transport, uses the URLLoader class under the hood to perform
all network IO.

@method transports.adobe-air
@for IO
@static
@return {Object} This object contains only a `send` method that accepts a
`transaction object`, `uri` and the `config object`.
*/

Y.IO.transports['adobe-air'] = function()
{
	return {
		send: function (transaction, uri, config)
		{
			Y.log('Starting URLLoader Transaction', 'info', 'io');
			config.notify('start', transaction, config);
			config.method = (config.method || 'GET').toUpperCase();

			var body = '';
			if (config.data)
			{
				if (Y.Lang.isString(config.data))
				{
					body = config.data;
				}

				if (body && config.method === 'GET')
				{
					uri += (uri.indexOf('?') == -1 ? '?' : '&') + body;
					body = '';
				}
			}

			Y.log('Initiating ' + config.method + ' request to: ' + uri, 'info', 'io');

			var request    = new air.URLRequest(uri);
			request.method = air.URLRequestMethod[ config.method ];
			request.data  = body;

			if (config.headers)
			{
				if (config.headers['Content-Type'])
				{
					request.contentType = config.headers['Content-Type'];
					delete config.headers['Content-Type'];
				}

				request.requestHeaders = config.headers;
			}

			if (config.request)
			{
				Y.each(config.request, function(value, key)
				{
					request[key] = value;
				});
			}

			var loader      = new air.URLLoader(),
				status_code = 0;

			loader.addEventListener('httpStatus', function(event)
			{
				status_code = event.status;
			});

			loader.addEventListener(air.Event.COMPLETE, function(event)
			{
				Y.log('Request Transaction Complete', 'info', 'io');

				var data = event.target.data;
				if (data)
				{
					transaction.c =
					{
						status:       status_code,
						statusCode:   status_code,
						statusText:   '',
						headers:      [],
						responseText: data || '',
						responseXML:  null,

						getResponseHeader: function(name)
						{
							return this.headers[name];
						},
						getAllResponseHeaders: function()
						{
							return flatten(this.headers);
						}
					};
				}

				config.notify('complete', transaction, config);
				config.notify(((data && (data.statusCode >= 200 && data.statusCode <= 299)) ? 'success' : 'failure'), transaction, config);
			});

			loader.addEventListener('ioError', function(event)
			{
				Y.log('An IO error occurred', 'warn', 'io');

				transaction.c =
				{
					status:       status_code,
					statusCode:   status_code,
					statusText:   event.text,
					errorCode:    event.errorID
				};
				config.notify('failure', transaction, config);
			});

			try
			{
				loader.load(request);
			}
			catch (error)
			{
				Y.later(0, null, function()
				{
					Y.log('Unable to load URL (' + uri + '): ' + error, 'error', 'io');
					transaction.c = error;
					config.notify('failure', transaction, config);
				});
			}

			var result =
			{
				io: transaction
			};
			return result;
		}
	};
};

Y.IO.defaultTransport('adobe-air');
