YUI.add('gallery-checkboxgroups-tests', function(Y) {
"use strict";

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'AtLeastOneCheckboxGroup',

		testAtLeastOne: function()
		{
			new Y.AtLeastOneCheckboxGroup('.at-least-one');

			Y.Assert.isTrue(Y.one('#at-least-one-1').get('checked'));
			Y.Assert.isFalse(Y.one('#at-least-one-2').get('checked'));
			Y.Assert.isFalse(Y.one('#at-least-one-3').get('checked'));
			Y.Assert.isFalse(Y.one('#at-least-one-4').get('checked'));

			Y.one('#at-least-one-1').simulate('click');

			Y.Assert.isFalse(Y.one('#at-least-one-1').get('checked'));
			Y.Assert.isTrue(Y.one('#at-least-one-2').get('checked'));
			Y.Assert.isFalse(Y.one('#at-least-one-3').get('checked'));
			Y.Assert.isFalse(Y.one('#at-least-one-4').get('checked'));

			Y.one('#at-least-one-2').simulate('click');
			Y.one('#at-least-one-3').simulate('click');

			Y.Assert.isFalse(Y.one('#at-least-one-1').get('checked'));
			Y.Assert.isFalse(Y.one('#at-least-one-2').get('checked'));
			Y.Assert.isFalse(Y.one('#at-least-one-3').get('checked'));
			Y.Assert.isTrue(Y.one('#at-least-one-4').get('checked'));

			Y.one('#at-least-one-4').simulate('click');

			Y.Assert.isFalse(Y.one('#at-least-one-1').get('checked'));
			Y.Assert.isFalse(Y.one('#at-least-one-2').get('checked'));
			Y.Assert.isTrue(Y.one('#at-least-one-3').get('checked'));
			Y.Assert.isFalse(Y.one('#at-least-one-4').get('checked'));
		},

		testAtMostOne: function()
		{
			new Y.AtMostOneCheckboxGroup('.at-most-one');

			Y.Assert.isFalse(Y.one('#at-most-one-1').get('checked'));
			Y.Assert.isFalse(Y.one('#at-most-one-2').get('checked'));
			Y.Assert.isFalse(Y.one('#at-most-one-3').get('checked'));
			Y.Assert.isFalse(Y.one('#at-most-one-4').get('checked'));

			Y.one('#at-most-one-2').simulate('click');

			Y.Assert.isFalse(Y.one('#at-most-one-1').get('checked'));
			Y.Assert.isTrue(Y.one('#at-most-one-2').get('checked'));
			Y.Assert.isFalse(Y.one('#at-most-one-3').get('checked'));
			Y.Assert.isFalse(Y.one('#at-most-one-4').get('checked'));

			Y.one('#at-most-one-3').simulate('click');

			Y.Assert.isFalse(Y.one('#at-most-one-1').get('checked'));
			Y.Assert.isFalse(Y.one('#at-most-one-2').get('checked'));
			Y.Assert.isTrue(Y.one('#at-most-one-3').get('checked'));
			Y.Assert.isFalse(Y.one('#at-most-one-4').get('checked'));
		},

		testSelectAll: function()
		{
			new Y.SelectAllCheckboxGroup('#selectAllCB', '.select-all');

			Y.Assert.isFalse(Y.one('#selectAllCB').get('checked'));
			Y.Assert.isFalse(Y.one('#select-all-1').get('checked'));
			Y.Assert.isFalse(Y.one('#select-all-2').get('checked'));
			Y.Assert.isFalse(Y.one('#select-all-3').get('checked'));

			Y.one('#selectAllCB').simulate('click');

			Y.Assert.isTrue(Y.one('#selectAllCB').get('checked'));
			Y.Assert.isTrue(Y.one('#select-all-1').get('checked'));
			Y.Assert.isTrue(Y.one('#select-all-2').get('checked'));
			Y.Assert.isTrue(Y.one('#select-all-3').get('checked'));

			Y.one('#select-all-2').simulate('click');

			Y.Assert.isFalse(Y.one('#selectAllCB').get('checked'));
			Y.Assert.isTrue(Y.one('#select-all-1').get('checked'));
			Y.Assert.isFalse(Y.one('#select-all-2').get('checked'));
			Y.Assert.isTrue(Y.one('#select-all-3').get('checked'));

			Y.one('#select-all-2').simulate('click');

			Y.Assert.isTrue(Y.one('#selectAllCB').get('checked'));
			Y.Assert.isTrue(Y.one('#select-all-1').get('checked'));
			Y.Assert.isTrue(Y.one('#select-all-2').get('checked'));
			Y.Assert.isTrue(Y.one('#select-all-3').get('checked'));

			Y.one('#selectAllCB').simulate('click');

			Y.Assert.isFalse(Y.one('#selectAllCB').get('checked'));
			Y.Assert.isFalse(Y.one('#select-all-1').get('checked'));
			Y.Assert.isFalse(Y.one('#select-all-2').get('checked'));
			Y.Assert.isFalse(Y.one('#select-all-3').get('checked'));
		}
	}));

}, '@VERSION@', {requires:['gallery-checkboxgroups','test','node-event-simulate']});
