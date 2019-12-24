"use strict";

Y.namespace('air');

/**
 * Implements read-only configuration data, loaded from `app:/config.json`.
 *
 * This is a singleton because there should only be one application configuration.
 *
 * @module gallery-adobe-air-config
 */

var file = air.File.applicationDirectory.resolvePath('conf.json'),
	data = {};

if (file.exists)
{
	var stream = new air.FileStream();
	stream.open(file, air.FileMode.READ);
	var s = stream.readUTFBytes(stream.bytesAvailable);
	stream.close();

	data = Y.JSON.parse(s);
}

Y.air.Config =
{
	get: function(key)
	{
		return data[ key ];
	},

	set: function(key, value)
	{
		data[ key ] = value;
	}
};
