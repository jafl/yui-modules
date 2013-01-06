YUI.add('gallery-sort-extras-tests', function(Y) {
"use strict";

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'Sort Utilities',

		testSort: function()
		{
			Y.ArrayAssert.itemsAreSame([3,2,1], [1,2,3].sort(Y.Sort.flip(Y.Sort.compareAsNumber)));
			Y.ArrayAssert.itemsAreSame(['c','b','a'], ['a','b','c'].sort(Y.Sort.flip(Y.Sort.compareAsString)));
			Y.ArrayAssert.itemsAreSame(['c','a','B'], ['a','B','c'].sort(Y.Sort.flip(Y.Sort.compareAsString)));
			Y.ArrayAssert.itemsAreSame(['c','B','a'], ['a','B','c'].sort(Y.Sort.flip(Y.Sort.compareAsStringNoCase)));
		},

		testKey: function()
		{
			var list =
			[
				{ a: 2, b: 2 },
				{ a: 1, b: 3 },
				{ a: 3, b: 1 }
			];

			list.sort(Y.bind(Y.Sort.compareKey, null, Y.Sort.compareAsNumber, 'a'));
			Y.Assert.areSame(1, list[0].a);
			Y.Assert.areSame(2, list[1].a);
			Y.Assert.areSame(3, list[2].a);

			list.sort(Y.bind(Y.Sort.compareKey, null, Y.Sort.compareAsNumber, 'b'));
			Y.Assert.areSame(3, list[0].a);
			Y.Assert.areSame(2, list[1].a);
			Y.Assert.areSame(1, list[2].a);
		},

		testDrill: function()
		{
			var list =
			[
				{ x: { a: 2, b: 2 } },
				{ x: { a: 1, b: 3 } },
				{ x: { a: 3, b: 1 } }
			];

			list.sort(Y.bind(Y.Sort.compareKey, null, Y.Sort.compareAsNumber, ['x', 'a']));
			Y.Assert.areSame(1, list[0].x.a);
			Y.Assert.areSame(2, list[1].x.a);
			Y.Assert.areSame(3, list[2].x.a);

			list.sort(Y.bind(Y.Sort.compareKey, null, Y.Sort.compareAsNumber, ['x', 'b']));
			Y.Assert.areSame(3, list[0].x.a);
			Y.Assert.areSame(2, list[1].x.a);
			Y.Assert.areSame(1, list[2].x.a);
		}
	}));

}, '@VERSION@', {requires:['gallery-sort-extras','test']});
