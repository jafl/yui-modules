YUI.add('gallery-instancemanager-tests', function(Y) {
"use strict";

	function Test(a)
	{
		this.a = a;
	}

	Test.prototype =
	{
		get: function()
		{
			return this.a;
		},

		incr: function()
		{
			this.a++;
		}
	};

	function incr(obj)
	{
		obj.value.incr();
	}

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'InstanceManager',

		setUp: function()
		{
			this.mgr = new Y.InstanceManager();
		},

		testPutObject: function()
		{
			var obj = new Test(2);
			this.mgr.put('a', obj)
			Y.Assert.areSame(obj, this.mgr.get('a'));
			Y.Assert.areEqual(2, this.mgr.get('a').get());
		},

		testPutFunction: function()
		{
			this.mgr.put('a', Test, 3);
			Y.Assert.isTrue(this.mgr.get('a') instanceof Test);
			Y.Assert.areEqual(3, this.mgr.get('a').get());
		},

		testApplyToAll: function()
		{
			this.mgr.put('a', new Test(2));
			this.mgr.put('b', Test, 3);
			this.mgr.applyToAll('incr');
			this.mgr.applyToAll(incr);
			Y.Assert.areEqual(4, this.mgr.get('a').get());
			Y.Assert.areEqual(5, this.mgr.get('b').get());
		}
	}));

}, '@VERSION@', {requires:['gallery-instancemanager','test']});
