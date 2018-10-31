YUI.add('gallery-node-event-set-tests', function(Y) {
"use strict";

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'Node Set event',

		setUp: function()
		{
			this.node = Y.one('#demo');
		},

		tearDown: function()
		{
			this.node.destroy();
			delete this.node;
		},

		testSet: function()
		{
			this.node.set('value', 'abc');

			var prev, curr;
			this.node.on('valueSet', function(e)
			{
				prev = e.prevVal;
				curr = e.newVal;
			});

			this.node.set('value', 'xyz');

			Y.Assert.areSame('abc', prev);
			Y.Assert.areSame('xyz', curr);
		},

		testSetMultiple: function()
		{
			this.node.set('value',     'abc');
			this.node.set('className', 'foo');

			var prev_val, curr_val;
			this.node.on('valueSet', function(e)
			{
				prev_val = e.prevVal;
				curr_val = e.newVal;
			});

			var prev_class, curr_class;
			this.node.on('classNameSet', function(e)
			{
				prev_class = e.prevVal;
				curr_class = e.newVal;
			});

			this.node.set('value',     'xyz');
			this.node.set('className', 'bar');

			Y.Assert.areSame('abc', prev_val);
			Y.Assert.areSame('xyz', curr_val);

			Y.Assert.areSame('foo', prev_class);
			Y.Assert.areSame('bar', curr_class);
		},

		testStyle: function()
		{
			this.node.setStyle('z-index', 2);

			var prev, curr;
			this.node.on('z-indexSet', function(e)
			{
				prev = e.prevVal;
				curr = e.newVal;
			});

			this.node.setStyle('z-index', 4);

			Y.Assert.areEqual(2, prev);
			Y.Assert.areEqual(4, curr);
		},

		testStyles: function()
		{
			this.node.setStyle('z-index',          2);
			this.node.setStyle('background-color', 'black');

			var prev_z, curr_z;
			this.node.on('z-indexSet', function(e)
			{
				prev_z = e.prevVal;
				curr_z = e.newVal;
			});

			var prev_c, curr_c;
			this.node.on('background-colorSet', function(e)
			{
				prev_c = e.prevVal;
				curr_c = e.newVal;
			});

			this.node.setStyle('z-index',          4);
			this.node.setStyle('background-color', 'white');

			Y.Assert.areEqual(2, prev_z);
			Y.Assert.areEqual(4, curr_z);

			Y.Assert.areSame('black', prev_c);
			Y.Assert.areSame('white', curr_c);
		},

		testAttribute: function()
		{
			this.node.setAttribute('id', 'foo');

			var prev, curr;
			this.node.on('idSet', function(e)
			{
				prev = e.prevVal;
				curr = e.newVal;
			});

			this.node.setAttribute('id', 'demo');

			Y.Assert.areSame('foo', prev);
			Y.Assert.areSame('demo', curr);
		},

		testDataSet: function()
		{
			this.node.setData('foo', 'bar');

			var key, prev, curr;
			this.node.on('dataSet', function(e)
			{
				key  = e.dataKey;
				prev = e.prevVal;
				curr = e.newVal;
			});

			this.node.setData('foo', 'baz');

			Y.Assert.areSame('foo', key);
			Y.Assert.areSame('bar', prev);
			Y.Assert.areSame('baz', curr);
		},

		testDataClear: function()
		{
			this.node.setData('foo', 'bar');

			var key, prev, curr;
			this.node.on('dataSet', function(e)
			{
				key  = e.dataKey;
				prev = e.prevVal;
				curr = e.newVal;
			});

			this.node.clearData('foo');

			Y.Assert.areSame('foo', key);
			Y.Assert.areSame('bar', prev);
			Y.Assert.isUndefined(curr);
		},

		testDataSetAll: function()
		{
			this.node.setData({ foo:'bar', bar:'foo' });

			var key = [], prev = [], curr = [];
			this.node.on('dataSet', function(e)
			{
				key.push(e.dataKey);
				prev.push(e.prevVal);
				curr.push(e.newVal);
			});

			this.node.setData({ foo:'baz', baz:'bork' });

			Y.Assert.areSame(3, key.length);
			Y.ArrayAssert.contains('foo', key);
			Y.ArrayAssert.contains('bar', key);
			Y.ArrayAssert.contains('baz', key);

			var i = Y.Array.indexOf(key, 'foo');
			Y.Assert.areSame('bar', prev[i]);
			Y.Assert.areSame('baz', curr[i]);

			i = Y.Array.indexOf(key, 'bar');
			Y.Assert.areSame('foo', prev[i]);
			Y.Assert.isUndefined(curr[i]);

			i = Y.Array.indexOf(key, 'baz');
			Y.Assert.isUndefined(prev[i]);
			Y.Assert.areSame('bork', curr[i]);
		},

		testDataClearAll: function()
		{
			this.node.setData({ foo:'bar', bar:'foo' });

			var key = [], prev = [], curr = [];
			this.node.on('dataSet', function(e)
			{
				key.push(e.dataKey);
				prev.push(e.prevVal);
				curr.push(e.newVal);
			});

			this.node.clearData();

			Y.Assert.areSame(2, key.length);
			Y.ArrayAssert.contains('foo', key);
			Y.ArrayAssert.contains('bar', key);

			var i = Y.Array.indexOf(key, 'foo');
			Y.Assert.areSame('bar', prev[i]);
			Y.Assert.isUndefined(curr[i]);

			i = Y.Array.indexOf(key, 'bar');
			Y.Assert.areSame('foo', prev[i]);
			Y.Assert.isUndefined(curr[i]);
		},

		testAddClass: function()
		{
			this.node.set('className', 'foo');

			var prev = [], curr = [], added = [];
			this.node.on('classNameSet', function(e)
			{
				prev.push(e.prevVal);
				curr.push(e.newVal);
				added.push(e.addedClass);
			});

			this.node.addClass('bar');
			this.node.addClass('bar');

			Y.Assert.areSame(1, prev.length);
			Y.Assert.areSame('foo', prev[0]);

			Y.Assert.areSame(1, curr.length);
			Y.Assert.areSame('foo bar', curr[0]);

			Y.Assert.areSame(1, added.length);
			Y.Assert.areSame('bar', added[0]);
		},

		testRemoveClass: function()
		{
			this.node.set('className', 'foo bar');

			var prev = [], curr = [], removed = [];
			this.node.on('classNameSet', function(e)
			{
				prev.push(e.prevVal);
				curr.push(e.newVal);
				removed.push(e.removedClass);
			});

			this.node.removeClass('bar');
			this.node.removeClass('bar');

			Y.Assert.areSame(1, prev.length);
			Y.Assert.areSame('foo bar', prev[0]);

			Y.Assert.areSame(1, curr.length);
			Y.Assert.areSame('foo', curr[0]);

			Y.Assert.areSame(1, removed.length);
			Y.Assert.areSame('bar', removed[0]);
		},

		testReplaceClass: function()
		{
			this.node.set('className', 'foo bar');

			var prev = [], curr = [], added = [], removed = [];
			this.node.on('classNameSet', function(e)
			{
				prev.push(e.prevVal);
				curr.push(e.newVal);
				added.push(e.addedClass);
				removed.push(e.removedClass);
			});

			this.node.replaceClass('bar', 'baz');
			this.node.replaceClass('bar', 'bork');

			Y.Assert.areSame(2, prev.length);
			Y.Assert.areSame('foo bar', prev[0]);
			Y.Assert.areSame('foo baz', prev[1]);

			Y.Assert.areSame(2, curr.length);
			Y.Assert.areSame('foo baz', curr[0]);
			Y.Assert.areSame('foo baz bork', curr[1]);

			Y.Assert.areSame(2, removed.length);
			Y.Assert.areSame('bar', removed[0]);
			Y.Assert.isUndefined(removed[1]);

			Y.Assert.areSame(2, added.length);
			Y.Assert.areSame('baz', added[0]);
			Y.Assert.areSame('bork', added[1]);
		},

		testXY: function()
		{
			var node = Y.one('#xy');

			var prev, curr;
			node.on('xySet', function(e)
			{
				prev = e.prevVal;
				curr = e.newVal;
			});

			node.setXY([300,100]);

			Y.Assert.areWithinEpsilon(0, prev[0], .5);
			Y.Assert.areWithinEpsilon(0, prev[1], .5);

			Y.Assert.areWithinEpsilon(300, curr[0], .5);
			Y.Assert.areWithinEpsilon(100, curr[1], .5);
		}
	}));

}, '@VERSION@', {requires:['gallery-node-event-set','node-screen','gallery-test-extras']});
