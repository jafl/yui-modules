YUI.add('gallery-chipper-tests', function(Y) {
"use strict";

	var destroy_count = 0;

	function Foo()
	{
	}

	Foo.prototype =
	{
		destroy: function()
		{
			destroy_count++;
		}
	};

	function Bar()
	{
	}

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'Chipper',

		test: function()
		{
			Y.Chipper.destroy(new Foo());
			Y.Chipper.destroy(new Bar());
			Y.Chipper.destroy(new Foo());
			Y.Chipper.destroy(new Bar());
			Y.Chipper.destroy(new Foo());

			this.wait(function()
			{
				Y.Assert.areSame(3, destroy_count);
			},
			1000);
		}
	}));

}, '@VERSION@', {requires:['gallery-chipper','test']});
