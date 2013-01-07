YUI.add('gallery-expiration-cache-tests', function(Y) {
"use strict";

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'Expiration Cache',

		testDefault: function()
		{
			var cache = new Y.ExpirationCache(
			{
				expire: 1000
			});

			cache.put('foo', 'bar');

			this.wait(function()
			{
				Y.Assert.areSame('bar', cache.get('foo'));

				this.wait(function()
				{
					Y.Assert.isUndefined(cache.get('foo'));

					Y.Assert.isTrue(cache.put('foo', 'bar'));
					this.wait(function()
					{
						cache.clean();
						Y.ObjectAssert.ownsNoKeys(cache._store._map);
					},
					1100);
				},
				600);
			},
			500);
		},

		testCustom: function()
		{
			var cache = new Y.ExpirationCache(
			{
				meta: function(value)
				{
					return {counter:0};
				},
				expire: function(meta, value)
				{
					meta.counter++;
					return (meta.counter >= 3);
				},
				stats: function(key, value, stats)
				{
					stats.size = value.length;
				}
			});

			cache.put('foo', 'bar');
			Y.Assert.areSame('bar', cache.get('foo'));
			Y.Assert.areSame('bar', cache.get('foo'));
			Y.Assert.isUndefined(cache.get('foo'));

			Y.Assert.isTrue(cache.put('foo', 'bar'));
			Y.Assert.isFalse(cache.put('foo', 'baz'));
			Y.Assert.areSame('bar', cache.replace('foo', 'baz'));
			cache.clear();
			Y.Assert.isUndefined(cache.get('foo'));

			Y.Assert.isTrue(cache.put('foo', 'bar'));
			Y.Assert.areSame('bar', cache.remove('foo'));
			Y.Assert.isUndefined(cache.get('foo'));

			var stats = cache.dumpStats();
			Y.Assert.areSame(2, stats.gets);
			Y.Assert.areSame(4, stats.keys.foo.puts);
			Y.Assert.areSame(2, stats.keys.foo.gets);
			Y.Assert.areSame(3, stats.keys.foo.size);
		}
	}));

}, '@VERSION@', {requires:['gallery-expiration-cache','test','gallery-instancemanager','gallery-test-extras']});
