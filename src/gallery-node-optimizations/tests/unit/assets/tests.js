YUI.add('gallery-node-optimizations-tests', function(Y) {
"use strict";

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'Node optimizations',

		testAncestorByClassName: function()
		{
			var node = Y.one('#a2');
			Y.Assert.areSame(Y.one('#root'), node.getAncestorByClassName('root'));

			var node = Y.one('#b3');
			Y.Assert.areSame(Y.one('#root'), node.getAncestorByClassName('root'));

			var node = Y.one('#b3');
			Y.Assert.areSame(Y.one('#root'), node.ancestor('.root'));

			var node = Y.one('#b3');
			Y.Assert.areSame(Y.one('#root'), node.getAncestorByClassName('ro+t'));
		},

		testAncestorByTagName: function()
		{
			var node = Y.one('#a2');
			Y.Assert.areSame(Y.one('#list'), node.getAncestorByTagName('ul'));

			var node = Y.one('#b3');
			Y.Assert.areSame(Y.one('#b'), node.getAncestorByTagName('li'));

			var node = Y.one('#b3');
			Y.Assert.areSame(Y.one('#b'), node.ancestor('li'));
		},

		testElementsByClassName: function()
		{
			var node = Y.one('#root');

			var list = node.getElementsByClassName('c-child');
			Y.Assert.areSame(0, list.size());

			list = node.getElementsByClassName('a-child');
			Y.Assert.areSame(2, list.size());
			Y.Assert.areSame(Y.one('#a1'), list.item(0));
			Y.Assert.areSame(Y.one('#a2'), list.item(1));

			list = node.getElementsByClassName('a-child', 'div');
			Y.Assert.areSame(2, list.size());
			Y.Assert.areSame(Y.one('#a1'), list.item(0));
			Y.Assert.areSame(Y.one('#a2'), list.item(1));

			list = node.getElementsByClassName('b-child');
			Y.Assert.areSame(4, list.size());
			Y.Assert.areSame(Y.one('#b1'), list.item(0));
			Y.Assert.areSame(Y.one('#b2'), list.item(1));
			Y.Assert.areSame(Y.one('#b3'), list.item(2));
			Y.Assert.areSame(Y.one('#b4'), list.item(3));

			list = node.all('.a-child');
			Y.Assert.areSame(2, list.size());
			Y.Assert.areSame(Y.one('#a1'), list.item(0));
			Y.Assert.areSame(Y.one('#a2'), list.item(1));

			Y.Assert.areSame(Y.one('#a1'), node.one('.a-child'));
			Y.Assert.areSame(Y.one('#a1'), node.one('div.a-child'));

			list = node.getElementsByClassName('a-.*');
			Y.Assert.areSame(2, list.size());
			Y.Assert.areSame(Y.one('#a1'), list.item(0));
			Y.Assert.areSame(Y.one('#a2'), list.item(1));

			list = node.getElementsByClassName('a-child', 'span');
			Y.Assert.areSame(0, list.size());

			list = node.getElementsByClassName('s-child');
			Y.Assert.areSame(2, list.size());
			Y.Assert.areSame(Y.one('#s1'), list.item(0));
			Y.Assert.areSame(Y.one('#s2'), list.item(1));

			list = node.getElementsByClassName('s-child', 'span');
			Y.Assert.areSame(2, list.size());
			Y.Assert.areSame(Y.one('#s1'), list.item(0));
			Y.Assert.areSame(Y.one('#s2'), list.item(1));

			Y.Assert.areSame(Y.one('#a1'), Y.one('#a').one('*'));
		},

		testFirstElementByClassName: function()
		{
			var node = Y.one('#root');

			Y.Assert.areSame(Y.one('#b1'), node.getFirstElementByClassName('b-child'));
			Y.Assert.areSame(Y.one('#b1'), node.getFirstElementByClassName('b-child', 'div'));
			Y.Assert.areSame(Y.one('#s1'), node.getFirstElementByClassName('s-child'));
			Y.Assert.areSame(Y.one('#s1'), node.getFirstElementByClassName('s-child', 'span'));
			Y.Assert.areSame(null, node.getFirstElementByClassName('c-child'));
			Y.Assert.areSame(null, node.getFirstElementByClassName('c-child', 'a'));
		}
	}));

}, '@VERSION@', {requires:['gallery-node-optimizations','test']});
