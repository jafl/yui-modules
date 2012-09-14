YUI.add('gallery-mru-cache-tests', function(Y) {
"use strict";

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'MRU Cache',

		testSize: function()
		{
			var cache = new Y.MRUCache(
			{
				metric: function(value)
				{
					return value.length;
				},
				limit: 60
			});

			cache.put('01', '0123456789');
			cache.put('02', '1234567890');
			cache.put('03', '2345678901');
			cache.put('04', '3456789012');
			cache.put('05', '4567890123');
			Y.Assert.areSame('0123456789', cache.get('01'));
			cache.put('06', '5678901234');
			cache.put('07', '6789012345');
			cache.put('08', '7890123456');
			cache.put('09', '8901234567');
			cache.put('10', '9012345678');

			Y.Assert.areSame('0123456789', cache.get('01'));
			Y.Assert.isUndefined(cache.get('02'));
			Y.Assert.isUndefined(cache.get('03'));
			Y.Assert.isUndefined(cache.get('04'));
			Y.Assert.isUndefined(cache.get('05'));
			Y.Assert.areSame('5678901234', cache.get('06'));
			Y.Assert.areSame('6789012345', cache.get('07'));
			Y.Assert.areSame('7890123456', cache.get('08'));
			Y.Assert.areSame('8901234567', cache.get('09'));
			Y.Assert.areSame('9012345678', cache.get('10'));
		},

		testCount: function()
		{
			var cache = new Y.MRUCache(
			{
				metric: function(value)
				{
					return +1;
				},
				limit: 6,
				stats: true
			});

			cache.put('01', '0123456789');
			cache.put('02', '1234567890');
			cache.put('03', '2345678901');
			cache.put('04', '3456789012');
			cache.put('05', '4567890123');
			Y.Assert.areSame('0123456789', cache.get('01'));
			cache.put('06', '5678901234');
			cache.put('07', '6789012345');
			cache.put('08', '7890123456');
			cache.put('09', '8901234567');
			cache.put('10', '9012345678');

			Y.Assert.areSame('0123456789', cache.get('01'));
			Y.Assert.isUndefined(cache.get('02'));
			Y.Assert.isUndefined(cache.get('03'));
			Y.Assert.isUndefined(cache.get('04'));
			Y.Assert.isUndefined(cache.get('05'));
			Y.Assert.areSame('5678901234', cache.get('06'));
			Y.Assert.areSame('6789012345', cache.get('07'));
			Y.Assert.areSame('7890123456', cache.get('08'));
			Y.Assert.areSame('8901234567', cache.get('09'));
			Y.Assert.areSame('9012345678', cache.get('10'));

			var stats = cache.dumpStats();
			Y.Assert.areSame(7, stats.gets);
			Y.each(['01','02','03','04','05','06','07','08','09','10'], function(key)
			{
				Y.Assert.areSame(1, stats.keys[key].puts);
			});

			Y.Assert.areSame(2, stats.keys['01'].gets);
			Y.Assert.areSame(0, stats.keys['02'].gets);
			Y.Assert.areSame(0, stats.keys['03'].gets);
			Y.Assert.areSame(0, stats.keys['04'].gets);
			Y.Assert.areSame(0, stats.keys['05'].gets);
			Y.Assert.areSame(1, stats.keys['06'].gets);
			Y.Assert.areSame(1, stats.keys['07'].gets);
			Y.Assert.areSame(1, stats.keys['08'].gets);
			Y.Assert.areSame(1, stats.keys['09'].gets);
			Y.Assert.areSame(1, stats.keys['10'].gets);
		}
	}));

}, '@VERSION@', {requires:['gallery-mru-cache','test']});
