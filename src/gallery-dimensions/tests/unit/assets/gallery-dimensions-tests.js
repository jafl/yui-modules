YUI.add('gallery-dimensions-tests', function(Y) {
"use strict";

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'Node dimensions',

		test: function()
		{
			var n = Y.one('.test');

			Y.Assert.areEqual(5, n.parseDimensionStyle('marginTop'));
			Y.Assert.areEqual(4, n.parseDimensionStyle('borderLeftWidth'));
			Y.Assert.areEqual(15, n.parseDimensionStyle('paddingBottom'));

			Y.Assert.areEqual(66, n.horizMarginBorderPadding());
			Y.Assert.areEqual(44, n.vertMarginBorderPadding());
		}
	}));

}, '@VERSION@', {requires:['gallery-dimensions','test']});
