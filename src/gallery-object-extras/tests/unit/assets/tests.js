YUI.add('gallery-object-extras-tests', function(Y) {
"use strict";

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'Object extras',

		testEvery: function()
		{
			var count = 0;
			Y.Assert.isTrue(Y.Object.every(
			{
				a: 1,
				b: 2
			},
			function(v, k)
			{
				count++;
				return true;
			}));
			Y.Assert.areEqual(2, count);

			var count = 0;
			Y.Assert.isFalse(Y.Object.every(
			{
				a: 1,
				b: 2
			},
			function(v, k)
			{
				count++;
				return false;
			}));
			Y.Assert.areEqual(1, count);
		},

		testFilter: function()
		{
			var o = Y.Object.filter({a:1,b:2,c:3,d:4}, function(v,k)
			{
				return v >= 3 || k == 'a';
			});

			Y.Assert.areEqual(3, Y.Object.keys(o).length);
			Y.ArrayAssert.containsItems(['a','c','d'], Y.Object.keys(o));
			Y.ArrayAssert.containsItems([1,3,4], Y.Object.values(o));
		},

		testFind: function()
		{
			Y.Assert.areEqual(3,
				Y.Object.find({a:1,b:2,c:3,d:4}, function(v,k)
				{
					return k == 'c';
				}));
		},

		testKeyOf: function()
		{
			Y.Assert.areEqual('c', Y.Object.keyOf({a:1,b:2,c:3,d:4}, 3));
		},

		testInvoke: function()
		{
			var count = 0;
			Y.Object.invoke(
			{
				a:
				{
					foo: function() { count++; }
				},
				b:
				{
					foo: function() { count += 2; }
				},
				c:
				{
					bar: function() { count++; }
				}
			},
			'foo');

			Y.Assert.areEqual(3, count);
		},

		testMap: function()
		{
			var o = Y.Object.map({a:1,b:2,c:3,d:4}, function(v,k)
			{
				return v*v;
			});

			Y.Assert.areEqual(4, Y.Object.keys(o).length);
			Y.ArrayAssert.containsItems(['a','b','c','d'], Y.Object.keys(o));
			Y.ArrayAssert.containsItems([1,4,9,16], Y.Object.values(o));
		},

		testPartition: function()
		{
			var o = Y.Object.partition({a:1,b:2,c:3,d:4}, function(v,k)
			{
				return v >= 3 || k == 'a';
			});

			Y.Assert.areEqual(3, Y.Object.keys(o.matches).length);
			Y.ArrayAssert.containsItems(['a','c','d'], Y.Object.keys(o.matches));
			Y.ArrayAssert.containsItems([1,3,4], Y.Object.values(o.matches));

			Y.Assert.areEqual(1, Y.Object.keys(o.rejects).length);
			Y.ArrayAssert.containsItems(['b'], Y.Object.keys(o.rejects));
			Y.ArrayAssert.containsItems([2], Y.Object.values(o.rejects));
		},

		testReduce: function()
		{
			Y.Assert.areEqual(10, Y.Object.reduce({a:1,b:2,c:3,d:4}, 0, function(s,v)
			{
				return s+v;
			}));
		},

		testReduceRight: function()
		{
			Y.Assert.areEqual(10, Y.Object.reduceRight({a:1,b:2,c:3,d:4}, 0, function(s,v)
			{
				return s+v;
			}));
		},

		testReject: function()
		{
			var o = Y.Object.reject({a:1,b:2,c:3,d:4}, function(v,k)
			{
				return v >= 3 || k == 'a';
			});

			Y.Assert.areEqual(1, Y.Object.keys(o).length);
			Y.ArrayAssert.containsItems(['b'], Y.Object.keys(o));
			Y.ArrayAssert.containsItems([2], Y.Object.values(o));
		},

		testZip: function()
		{
			var o = Y.Object.zip(['a', 'b', 3], [1, 2, 'c']);
			Y.Assert.areSame(1, o.a);
			Y.Assert.areSame(2, o.b);
			Y.Assert.areSame('c', o['3']);
		},

		testToObject: function()
		{
			var a =
			[
				{id:1,name:'foo'},
				{id:2,name:'bar'},
				{id:3,name:'baz'}
			];

			var o = Y.Array.toObject(a, 'id');
			Y.Assert.areSame(a[0], o[1]);
			Y.Assert.areSame(a[1], o[2]);
			Y.Assert.areSame(a[2], o[3]);
		},

		testEvalGet: function()
		{
			var o =
			{
				a: {id:1,name:'foo'},
				b: {id:2,name:'bar'},
				c: {id:3,name:'baz'},
				d:
				[
					{id:1,name:'foo'},
					{id:2,name:'bar'},
					{id:3,name:'baz'}
				]
			};

			Y.Assert.areSame(1, Y.Object.evalGet(o, '.a.id'));
			Y.Assert.areSame('bar', Y.Object.evalGet(o, '.b.name'));
			Y.Assert.areSame('foo', Y.Object.evalGet(o, '.d[0].name'));

			window.air = true;

			Y.Assert.areSame(1, Y.Object.evalGet(o, '.a.id'));
			Y.Assert.areSame('bar', Y.Object.evalGet(o, '.b.name'));

			delete window.air;
		},

		testEvalSet: function()
		{
			var o =
			{
				a: {id:1,name:'foo'},
				b: {id:2,name:'bar'},
				c: {id:3,name:'baz'},
				d:
				[
					{id:1,name:'foo'},
					{id:2,name:'bar'},
					{id:3,name:'baz'}
				]
			};

			Y.Object.evalSet(o, '.a.id', 4);
			Y.Assert.areSame(4, o.a.id);

			Y.Object.evalSet(o, '.b.name', 'shug');
			Y.Assert.areSame('shug', o.b.name);

			Y.Object.evalSet(o, '.d[0].name', 'shug');
			Y.Assert.areSame('shug', o.d[0].name);

			window.air = true;

			Y.Object.evalSet(o, '.a.id', -4);
			Y.Assert.areSame(-4, o.a.id);

			Y.Object.evalSet(o, '.b.name', 'root');
			Y.Assert.areSame('root', o.b.name);

			delete window.air;
		}
	}));

}, '@VERSION@', {requires:['gallery-object-extras','test']});
