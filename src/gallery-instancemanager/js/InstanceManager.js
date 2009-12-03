(function(){

/**********************************************************************
 * Stores instances of javascript components.
 *
 * PatchId: 20090129-00
 */

YAHOO.SATG.InstanceManager = function()
{
	this._map          = { };
	this._constructors = { };
};

var InstanceManager = YAHOO.SATG.InstanceManager;

InstanceManager.prototype =
{
	get: function(
		/* string */	id)
	{
		if (this._map[ id ] === null && this._constructors[ id ])
		{
			var c = this._constructors[ id ];

			var s = 'new ' + (YAHOO.lang.isFunction(c.fn) ? 'c.fn' : c.fn) + '(';
			if (c.args && c.args.length)
			{
				for (var i=0; i<c.args.length; i++)
				{
					if (i > 0)
					{
						s += ',';
					}
					s += 'c.args[' + i + ']';
				}
			}
			s += ')';

			this._map[ id ] = eval(s);
		}

		return this._map[ id ] || false;
	},

	put: function(
		/* string */	id,
		/* obj/fn */	objOrCtor,
		/* array */		args)
	{
		if (this._map[ id ])
		{
			return false;
		}
		else if (YAHOO.lang.isFunction(objOrCtor) ||
				 YAHOO.lang.isString(objOrCtor))
		{
			this._constructors[ id ] =
			{
				fn:   objOrCtor,
				args: YAHOO.lang.isArray(args) ? args : [args]
			};

			this._map[ id ] = null;
			return true;
		}
		else
		{
			this._map[ id ] = objOrCtor;
			return true;
		}
	},

	remove: function(
		/* string */	id)
	{
		if (this._map[ id ])
		{
			delete this._map[ id ];
			return true;
		}
		else
		{
			return false;
		}
	},

	clear: function()
	{
		this._map = {};
	},

	applyToAll: function(
		/* string/fn/object */	behavior,
		/* array */				arguments)
	{
		var map        = this._map,
			isFunction = lang.isFunction(behavior),
			isObject   = lang.isObject(behavior);

		for (var name in map)
		{
			if (map.hasOwnProperty(name))
			{
				var item = map[ name ];
				if (isFunction || isObject)
				{
					// apply the function and pass the map item as an argument

					var fn    = isFunction ? behavior : behavior.fn,
						scope = isFunction ? window : behavior.scope;

					fn.apply(scope, [ { key:name, value:item } ].concat( arguments ) );
				}
				else if (item && lang.isFunction(item[ behavior ]))
				{
					// the string is the name of a method

					item[ behavior ].apply(item, arguments);
				}
			}
		}
	}
};

// global repository for page-level objects (id of every element must be unique anyway)

YAHOO.SATG.PageInstanceManager = new YAHOO.SATG.InstanceManager();

}());
