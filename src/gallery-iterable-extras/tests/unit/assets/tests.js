YUI.add('gallery-iterable-extras-tests', function(Y) {
"use strict";

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'Array Iterator',

		testForward: function()
		{
			var iter = new Y.ArrayIterator([1,2,3]);
			var list = [];
			while (!iter.atEnd())
			{
				list.push(iter.next());
			}

			Y.ArrayAssert.itemsAreSame([1,2,3], list);
		},

		testBackward: function()
		{
			var iter = new Y.ArrayIterator([1,2,3]);
			var list = [];

			iter.moveToEnd();
			while (!iter.atBeginning())
			{
				list.push(iter.prev());
			}

			Y.ArrayAssert.itemsAreSame([3,2,1], list);
		}
	}));

}, '@VERSION@', {requires:['gallery-iterable-extras','test']});
