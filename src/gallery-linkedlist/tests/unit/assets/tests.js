YUI.add('gallery-linkedlist-tests', function(Y) {
"use strict";

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'Linked List',

		testInsert: function()
		{
			var list = new Y.LinkedList();
			Y.Assert.isTrue(list.isEmpty());
			Y.Assert.areSame(0, list.size());

			var last = list.append(4);
			Y.Assert.isFalse(list.isEmpty());
			Y.Assert.areSame(1, list.size());
			Y.ArrayAssert.itemsAreSame([4], list.toArray());

			var first = list.prepend(1);
			Y.Assert.areSame(2, list.size());
			Y.ArrayAssert.itemsAreSame([1,4], list.toArray());

			list.insertAfter(first, 2);
			list.insertBefore(3, last);
			Y.Assert.areSame(4, list.size());
			Y.ArrayAssert.itemsAreSame([1,2,3,4], list.toArray());

			list.clear();
			Y.Assert.isTrue(list.isEmpty());
			Y.Assert.areSame(0, list.size());

			var first = list.prepend(1);
			Y.Assert.areSame(1, list.size());
			Y.ArrayAssert.itemsAreSame([1], list.toArray());

			var last = list.append(4);
			Y.Assert.areSame(2, list.size());
			Y.ArrayAssert.itemsAreSame([1,4], list.toArray());

			list.insertAfter(first, 2);
			list.insertBefore(3, last);
			Y.Assert.areSame(4, list.size());
			Y.ArrayAssert.itemsAreSame([1,2,3,4], list.toArray());
		},

		testRemove: function()
		{
			var list = new Y.LinkedList();
			var last = list.append(1);
			list.remove(last);
			Y.Assert.isTrue(list.isEmpty());
			Y.Assert.areSame(0, list.size());

			var v1 = list.append(1);
			var v2 = list.append(2);
			Y.ArrayAssert.itemsAreSame([1,2], list.toArray());
			list.remove(v1);
			Y.ArrayAssert.itemsAreSame([2], list.toArray());
			list.remove(v2);
			Y.Assert.isTrue(list.isEmpty());
			Y.Assert.areSame(0, list.size());

			var v1 = list.append(1);
			var v2 = list.append(2);
			Y.ArrayAssert.itemsAreSame([1,2], list.toArray());
			list.remove(v2);
			Y.ArrayAssert.itemsAreSame([1], list.toArray());
			list.remove(v1);
			Y.Assert.isTrue(list.isEmpty());
			Y.Assert.areSame(0, list.size());

			var v1 = list.append(1);
			var v2 = list.append(2);
			var v3 = list.append(3);
			Y.ArrayAssert.itemsAreSame([1,2,3], list.toArray());
			list.remove(v1);
			Y.ArrayAssert.itemsAreSame([2,3], list.toArray());
			list.remove(v2);
			Y.ArrayAssert.itemsAreSame([3], list.toArray());
			list.remove(v3);
			Y.Assert.isTrue(list.isEmpty());
			Y.Assert.areSame(0, list.size());

			var v1 = list.append(1);
			var v2 = list.append(2);
			var v3 = list.append(3);
			Y.ArrayAssert.itemsAreSame([1,2,3], list.toArray());
			list.remove(v1);
			Y.ArrayAssert.itemsAreSame([2,3], list.toArray());
			list.remove(v3);
			Y.ArrayAssert.itemsAreSame([2], list.toArray());
			list.remove(v2);
			Y.Assert.isTrue(list.isEmpty());
			Y.Assert.areSame(0, list.size());

			var v1 = list.append(1);
			var v2 = list.append(2);
			var v3 = list.append(3);
			Y.ArrayAssert.itemsAreSame([1,2,3], list.toArray());
			list.remove(v2);
			Y.ArrayAssert.itemsAreSame([1,3], list.toArray());
			list.remove(v1);
			Y.ArrayAssert.itemsAreSame([3], list.toArray());
			list.remove(v3);
			Y.Assert.isTrue(list.isEmpty());
			Y.Assert.areSame(0, list.size());

			var v1 = list.append(1);
			var v2 = list.append(2);
			var v3 = list.append(3);
			Y.ArrayAssert.itemsAreSame([1,2,3], list.toArray());
			list.remove(v2);
			Y.ArrayAssert.itemsAreSame([1,3], list.toArray());
			list.remove(v3);
			Y.ArrayAssert.itemsAreSame([1], list.toArray());
			list.remove(v1);
			Y.Assert.isTrue(list.isEmpty());
			Y.Assert.areSame(0, list.size());

			var v1 = list.append(1);
			var v2 = list.append(2);
			var v3 = list.append(3);
			Y.ArrayAssert.itemsAreSame([1,2,3], list.toArray());
			list.remove(v3);
			Y.ArrayAssert.itemsAreSame([1,2], list.toArray());
			list.remove(v1);
			Y.ArrayAssert.itemsAreSame([2], list.toArray());
			list.remove(v2);
			Y.Assert.isTrue(list.isEmpty());
			Y.Assert.areSame(0, list.size());

			var v1 = list.append(1);
			var v2 = list.append(2);
			var v3 = list.append(3);
			Y.ArrayAssert.itemsAreSame([1,2,3], list.toArray());
			list.remove(v3);
			Y.ArrayAssert.itemsAreSame([1,2], list.toArray());
			list.remove(v2);
			Y.ArrayAssert.itemsAreSame([1], list.toArray());
			list.remove(v1);
			Y.Assert.isTrue(list.isEmpty());
			Y.Assert.areSame(0, list.size());
		},

		testCtor: function()
		{
			var list = new Y.LinkedList(1,2,3);
			Y.ArrayAssert.itemsAreSame([1,2,3], list.toArray());

			var list = new Y.LinkedList(list);
			Y.ArrayAssert.itemsAreSame([1,2,3], list.toArray());

			var list = new Y.LinkedList([1,2,3]);
			Y.ArrayAssert.itemsAreSame([1,2,3], list.toArray());

			var list = new Y.LinkedList(1);
			Y.ArrayAssert.itemsAreSame([1], list.toArray());
		},

		testIterator: function()
		{
			var list = new Y.LinkedList();
			var iter = list.iterator();
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			Y.Assert.isUndefined(iter.prev());
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			Y.Assert.isUndefined(iter.next());
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			Y.Assert.isUndefined(iter.prev());
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());

			var list = new Y.LinkedList(1);
			var iter = list.iterator();
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.isUndefined(iter.prev());
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.areSame(1, iter.next());
			Y.Assert.isFalse(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			Y.Assert.isUndefined(iter.next());
			Y.Assert.isFalse(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			Y.Assert.areSame(1, iter.prev());
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.isUndefined(iter.prev());
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());

			var list = new Y.LinkedList(1,2);
			var iter = list.iterator();
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.isUndefined(iter.prev());
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.areSame(1, iter.next());
			Y.Assert.isFalse(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.areSame(2, iter.next());
			Y.Assert.isFalse(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			Y.Assert.isUndefined(iter.next());
			Y.Assert.isFalse(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			Y.Assert.areSame(2, iter.prev());
			Y.Assert.isFalse(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.areSame(1, iter.prev());
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.isUndefined(iter.prev());
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());

			var list = new Y.LinkedList(1,2,3);
			var iter = list.iterator();
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.isUndefined(iter.prev());
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.areSame(1, iter.next());
			Y.Assert.isFalse(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.areSame(2, iter.next());
			Y.Assert.isFalse(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.areSame(3, iter.next());
			Y.Assert.isFalse(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			Y.Assert.isUndefined(iter.next());
			Y.Assert.isFalse(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			Y.Assert.areSame(3, iter.prev());
			Y.Assert.isFalse(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.areSame(2, iter.prev());
			Y.Assert.isFalse(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.areSame(1, iter.prev());
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.isUndefined(iter.prev());
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
		},

		testBeginningEnd: function()
		{
			var list = new Y.LinkedList();
			var iter = list.iterator();
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			iter.moveToEnd();
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			Y.Assert.isUndefined(iter.next());
			iter.moveToBeginning();
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			Y.Assert.isUndefined(iter.prev());

			var list = new Y.LinkedList(1);
			var iter = list.iterator();
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			iter.moveToEnd();
			Y.Assert.isFalse(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			Y.Assert.isUndefined(iter.next());
			Y.Assert.areSame(1, iter.prev());
			iter.moveToBeginning();
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.isUndefined(iter.prev());
			Y.Assert.areSame(1, iter.next());

			var list = new Y.LinkedList(1,2,3);
			var iter = list.iterator();
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			iter.moveToEnd();
			Y.Assert.isFalse(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			Y.Assert.isUndefined(iter.next());
			Y.Assert.areSame(3, iter.prev());
			iter.moveToBeginning();
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isFalse(iter.atEnd());
			Y.Assert.isUndefined(iter.prev());
			Y.Assert.areSame(1, iter.next());
		},

		testIteratorInsert: function()
		{
			var list = new Y.LinkedList();
			var iter = list.iterator();
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			iter.insert(1);
			Y.Assert.isFalse(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			iter.insert(2);
			Y.Assert.isFalse(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());
			Y.Assert.isUndefined(iter.next());
			Y.Assert.areSame(2, iter.prev());
			Y.Assert.areSame(1, iter.prev());
			Y.Assert.isUndefined(iter.prev());

			var list = new Y.LinkedList(1,2,3);
			var iter = list.iterator();
			iter.insert(4);
			iter.next();
			iter.next();
			iter.insert(5);
			Y.ArrayAssert.itemsAreSame([4,1,5,2,3], list.toArray());
		},

		testIteratorRemove: function()
		{
			var list = new Y.LinkedList();
			var iter = list.iterator();
			iter.removePrev();
			iter.removeNext();
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isTrue(iter.atEnd());

			var list = new Y.LinkedList(1,2,3);
			var iter = list.iterator();
			iter.removeNext();
			Y.Assert.isTrue(iter.atBeginning());
			Y.Assert.isUndefined(iter.prev());
			Y.Assert.areSame(2, iter.next());
			Y.ArrayAssert.itemsAreSame([2,3], list.toArray());

			var list = new Y.LinkedList(1,2,3);
			var iter = list.iterator();
			iter.moveToEnd();
			iter.removePrev();
			Y.Assert.isTrue(iter.atEnd());
			Y.Assert.isUndefined(iter.next());
			Y.Assert.areSame(2, iter.prev());
			Y.ArrayAssert.itemsAreSame([1,2], list.toArray());

			var list = new Y.LinkedList(1,2,3);
			var iter = list.iterator();
			iter.next();
			iter.removePrev();
			iter.removeNext();
			Y.Assert.areSame(3, iter.next());
			Y.Assert.isTrue(iter.atEnd());
			Y.Assert.isUndefined(iter.next());
			Y.ArrayAssert.itemsAreSame([3], list.toArray());
		},

		testIndexOf: function()
		{
			var list = new Y.LinkedList();
			Y.Assert.areSame(-1, list.indexOf(1));

			var list = new Y.LinkedList(1);
			Y.Assert.areSame(0, list.indexOf(1));
			Y.Assert.areSame(-1, list.indexOf(2));

			var list = new Y.LinkedList(1,2,3,1,2,3);
			Y.Assert.areSame(0, list.indexOf(1));
			Y.Assert.areSame(1, list.indexOf(2));
			Y.Assert.areSame(2, list.indexOf(3));
			Y.Assert.areSame(-1, list.indexOf(4));
		},

		testLastIndexOf: function()
		{
			var list = new Y.LinkedList();
			Y.Assert.areSame(-1, list.lastIndexOf(1));

			var list = new Y.LinkedList(1);
			Y.Assert.areSame(0, list.lastIndexOf(1));
			Y.Assert.areSame(-1, list.lastIndexOf(2));

			var list = new Y.LinkedList(1,2,3,1,2,3);
			Y.Assert.areSame(3, list.lastIndexOf(1));
			Y.Assert.areSame(4, list.lastIndexOf(2));
			Y.Assert.areSame(5, list.lastIndexOf(3));
			Y.Assert.areSame(-1, list.lastIndexOf(4));
		},

		testReverse: function()
		{
			var list = new Y.LinkedList();
			list.reverse();
			Y.ArrayAssert.itemsAreSame([], list.toArray());

			var list = new Y.LinkedList(1);
			list.reverse();
			Y.ArrayAssert.itemsAreSame([1], list.toArray());

			var list = new Y.LinkedList(1,2);
			list.reverse();
			Y.ArrayAssert.itemsAreSame([2,1], list.toArray());

			var list = new Y.LinkedList(1,2,3);
			list.reverse();
			Y.ArrayAssert.itemsAreSame([3,2,1], list.toArray());
		},

		testEach: function()
		{
			var list = new Y.LinkedList(1,2,3), array = [];
			list.each(function(value)
			{
				array.push(value);
			});

			Y.ArrayAssert.itemsAreSame([1,2,3], array);

			array = [];
			Y.each(list, function(value)
			{
				array.push(value);
			});

			Y.ArrayAssert.itemsAreSame([1,2,3], array);
		},

		testEvery: function()
		{
			var list = new Y.LinkedList(1,2,3), array = [];
			list.every(function(value)
			{
				array.push(value);
				return (value < 2);
			});

			Y.ArrayAssert.itemsAreSame([1,2], array);

			array = [];
			Y.every(list, function(value)
			{
				array.push(value);
				return (value < 2);
			});

			Y.ArrayAssert.itemsAreSame([1,2], array);
		},

		testFilter: function()
		{
			var list  = new Y.LinkedList(1,2,3);
			var list2 = list.filter(function(value, i)
			{
				return (value < 2 || i == 2);
			});

			Y.ArrayAssert.itemsAreSame([1,3], list2.toArray());

			list2 = Y.filter(list, function(value, i)
			{
				return (value < 2 || i == 2);
			});

			Y.ArrayAssert.itemsAreSame([1,3], list2.toArray());
		},

		testMap: function()
		{
			var list  = new Y.LinkedList(1,2,3);
			var list2 = list.map(function(value)
			{
				return value*value;
			});

			Y.ArrayAssert.itemsAreSame([1,4,9], list2.toArray());

			list2 = Y.map(list, function(value)
			{
				return value*value;
			});

			Y.ArrayAssert.itemsAreSame([1,4,9], list2.toArray());
		},

		testPartition: function()
		{
			var list = new Y.LinkedList(1,2,3);
			var obj  = list.partition(function(value, i)
			{
				return (value < 2 || i == 2);
			});

			Y.ArrayAssert.itemsAreSame([1,3], obj.matches.toArray());
			Y.ArrayAssert.itemsAreSame([2], obj.rejects.toArray());

			obj = Y.partition(list, function(value, i)
			{
				return (value < 2 || i == 2);
			});

			Y.ArrayAssert.itemsAreSame([1,3], obj.matches.toArray());
			Y.ArrayAssert.itemsAreSame([2], obj.rejects.toArray());
		},

		testReduce: function()
		{
			var list  = new Y.LinkedList(1,2,3);
			var value = list.reduce(1, function(sum, value)
			{
				return sum + value;
			});

			Y.Assert.areSame(7, value);

			value = Y.reduce(list, 1, function(sum, value)
			{
				return sum + value;
			});

			Y.Assert.areSame(7, value);

			list  = new Y.LinkedList('a','b','c');
			var value = list.reduce('x', function(sum, value)
			{
				return sum + value;
			});

			Y.Assert.areSame('xabc', value);

			value = Y.reduce(list, 'x', function(sum, value)
			{
				return sum + value;
			});

			Y.Assert.areSame('xabc', value);
		},

		testReduceRight: function()
		{
			var list  = new Y.LinkedList(1,2,3);
			var value = list.reduceRight(1, function(sum, value)
			{
				return sum + value;
			});

			Y.Assert.areSame(7, value);

			value = Y.reduceRight(list, 1, function(sum, value)
			{
				return sum + value;
			});

			Y.Assert.areSame(7, value);

			list  = new Y.LinkedList('a','b','c');
			var value = list.reduceRight('x', function(sum, value)
			{
				return sum + value;
			});

			Y.Assert.areSame('xcba', value);

			value = Y.reduceRight(list, 'x', function(sum, value)
			{
				return sum + value;
			});

			Y.Assert.areSame('xcba', value);
		},

		testReject: function()
		{
			var list  = new Y.LinkedList(1,2,3);
			var list2 = list.reject(function(value, i)
			{
				return (value < 2 || i == 2);
			});

			Y.ArrayAssert.itemsAreSame([2], list2.toArray());

			list2 = Y.reject(list, function(value, i)
			{
				return (value < 2 || i == 2);
			});

			Y.ArrayAssert.itemsAreSame([2], list2.toArray());
		},

		testSome: function()
		{
			var list = new Y.LinkedList(1,2,3), array = [];
			list.some(function(value)
			{
				array.push(value);
				return (value == 2);
			});

			Y.ArrayAssert.itemsAreSame([1,2], array);

			array = [];
			Y.some(list, function(value)
			{
				array.push(value);
				return (value == 2);
			});

			Y.ArrayAssert.itemsAreSame([1,2], array);
		}
	}));

}, '@VERSION@', {requires:['gallery-linkedlist','test','gallery-funcprog','gallery-test-extras']});
