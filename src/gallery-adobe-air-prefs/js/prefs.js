"use strict";

Y.namespace('air');

/**
 * Implements read-write preferences data, loaded from `app-storage:/prefs.json`.
 *
 * This is a singleton because there should only be one set of application preferences.
 *
 * @module gallery-adobe-air-prefs
 */

var file = air.File.applicationStorageDirectory.resolvePath('prefs.json'),
	data = {};

if (file.exists)
{
	load();
}

function load()
{
	var stream = new air.FileStream();
	stream.open(file, air.FileMode.READ);
	var s = stream.readUTFBytes(stream.bytesAvailable);
	stream.close();

	data = Y.JSON.parse(s);
}

function save()
{
	var stream = new air.FileStream();
	stream.open(file, air.FileMode.WRITE);
	stream.writeUTFBytes(Y.JSON.stringify(data));
	stream.close();
}

Y.air.Prefs =
{
	get: function(key)
	{
		return data[ key ];
	},

	set: function(key, value)
	{
		data[ key ] = value;
		save();
	}
};
