YUI.add('gallery-nodelist-extras2-tests', function(Y) {
"use strict";

	var list = Y.all('#test div');

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'NodeList extras 2',

		testEvery: function()
		{
			var count = 0;
			Y.Assert.isTrue(list.every(function(v, k)
			{
				count++;
				return true;
			}));
			Y.Assert.areEqual(3, count);

			var count = 0;
			Y.Assert.isFalse(list.every(function(v, k)
			{
				count++;
				return false;
			}));
			Y.Assert.areEqual(1, count);
		},

		testFind: function()
		{
			Y.Assert.areSame(list.item(1),
				list.find(function(n)
				{
					return n.hasClass('bb');
				}));
		},

		testMap: function()
		{
			Y.ArrayAssert.itemsAreEqual(['a','b','c'],
				list.map(function(n)
				{
					return n.get('id');
				}));
		},

		testPartition: function()
		{
			var o = list.partition(function(n)
			{
				return n.hasClass('bb');
			});

			Y.Assert.areEqual(1, o.matches.size());
			Y.Assert.areSame(list.item(1), o.matches.item(0));

			Y.Assert.areEqual(2, o.rejects.size());
			Y.Assert.areSame(list.item(0), o.rejects.item(0));
			Y.Assert.areSame(list.item(2), o.rejects.item(1));
		},

		testReduce: function()
		{
			Y.Assert.areEqual('abc', list.reduce('',
				function(s,n)
				{
					return s + n.get('id');
				}));
		},

		testReduceRight: function()
		{
			Y.Assert.areEqual('cba', list.reduceRight('',
				function(s,n)
				{
					return s + n.get('id');
				}));
		}
	}));

}, '@VERSION@', {requires:['gallery-nodelist-extras2','test']});
