YUI.add('gallery-math-tests', function(Y) {
"use strict";

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'Math extensions',

		testSign: function()
		{
			Y.Assert.areSame(-1, Math.sign(-2));
			Y.Assert.areSame(+1, Math.sign(+2));
			Y.Assert.areSame( 0, Math.sign( 0));
		},

		testAdd: function()
		{
			Y.Assert.areSame(1, Math.add(1));
			Y.Assert.areSame(3, Math.add(1,2));

			Y.Assert.areSame(6, Math.add(1,2,3));
			Y.Assert.areSame(6, Math.add([1,2,3]));
			Y.Assert.areSame(6, Math.add([1,2],3));
		},

		testMultiply: function()
		{
			Y.Assert.areSame(2, Math.multiply(2));
			Y.Assert.areSame(4, Math.multiply(2,2));

			Y.Assert.areSame(6, Math.multiply(1,2,3));
			Y.Assert.areSame(6, Math.multiply([1,2,3]));
			Y.Assert.areSame(6, Math.multiply([1,2],3));
		},

		testAngles: function()
		{
			Y.Assert.areWithinEpsilon( 45, Math.radiansToDegrees(Math.PI/4));
			Y.Assert.areWithinEpsilon( 90, Math.radiansToDegrees(Math.PI/2));
			Y.Assert.areWithinEpsilon(180, Math.radiansToDegrees(Math.PI));

			Y.Assert.areWithinEpsilon(Math.PI/4, Math.degreesToRadians(45));
			Y.Assert.areWithinEpsilon(Math.PI/2, Math.degreesToRadians(90));
			Y.Assert.areWithinEpsilon(Math.PI,   Math.degreesToRadians(180));
		},

		testHyperbolics: function()
		{
			Y.Assert.areWithinEpsilon(0, Math.sinh(0));
			Y.Assert.areWithinEpsilon(1, Math.cosh(0));
			Y.Assert.areWithinEpsilon(0, Math.tanh(0));

			Y.Assert.areWithinEpsilon(Math.sinh(-2), -Math.sinh(2));
			Y.Assert.areWithinEpsilon(Math.cosh(-2),  Math.cosh(2));
			Y.Assert.areWithinEpsilon(Math.tanh(-2), -Math.tanh(2));

			Y.Assert.areWithinEpsilon(1, Math.cosh(2)*Math.cosh(2) - Math.sinh(2)*Math.sinh(2));
		},

		testInverseHyperbolics: function()
		{
			Y.Assert.areWithinEpsilon(2, Math.asinh(Math.sinh(2)));
			Y.Assert.areWithinEpsilon(2, Math.acosh(Math.cosh(2)));
			Y.Assert.areWithinEpsilon(2, Math.atanh(Math.tanh(2)));

			Y.Assert.areWithinEpsilon(-2, Math.asinh(Math.sinh(-2)));
			Y.Assert.areWithinEpsilon(+2, Math.acosh(Math.cosh(-2)));
			Y.Assert.areWithinEpsilon(-2, Math.atanh(Math.tanh(-2)));
		},

		testParallel: function()
		{
			Y.Assert.areWithinEpsilon(1/2, Math.parallel(1,1));
			Y.Assert.areWithinEpsilon(2/3, Math.parallel(1,2));

			Y.Assert.areWithinEpsilon(1/3, Math.parallel(1,1,1));
			Y.Assert.areWithinEpsilon(1/3, Math.parallel([1,1,1]));
			Y.Assert.areWithinEpsilon(1/3, Math.parallel([1,1],1));
		}
	}));

}, '@VERSION@', {requires:['gallery-math','gallery-test-extras']});
