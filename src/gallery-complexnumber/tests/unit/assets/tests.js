YUI.add('gallery-complexnumber-tests', function(Y) {
"use strict";

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'Complex number',

		_should:
		{
			error:
			{
				testAddConstant: true,
				testSubtractConstant: true,
				testMultiplyConstant: true,
				testDivideConstant: true
			}
		},

		testPolar: function()
		{
			var v = new Y.ComplexNumber(1,2);
			Y.Assert.complexWithinEpsilon(v, Y.ComplexNumber.fromPolar(v.magnitude(), v.phase()));
		},

		testAdd: function()
		{
			var v = new Y.ComplexNumber(1,2);
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(2,1), v.add(new Y.ComplexNumber(1,-1)));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1,1), v.add(-1));
		},

		testSubtract: function()
		{
			var v = new Y.ComplexNumber(1,2);
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(2,1), v.subtract(new Y.ComplexNumber(-1,1)));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1,1), v.subtract(1));
		},

		testMultiply: function()
		{
			var v = new Y.ComplexNumber(1,1);
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0,2), v.multiply(new Y.ComplexNumber(1,1)));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0,4), v.multiply(2));
		},

		testDivide: function()
		{
			var v = new Y.ComplexNumber(-1,1);
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0,1), v.divide(new Y.ComplexNumber(1,1)));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0,0.5), v.divide(2));
		},

		testNegate: function()
		{
			var v = new Y.ComplexNumber(-1,1);
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1,-1), v.negate());
		},

		testConjugate: function()
		{
			var v = new Y.ComplexNumber(-1,1);
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(-1,-1), v.conjugate());
		},

		testRotate: function()
		{
			var v = new Y.ComplexNumber(-1,1);
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(-Math.sqrt(2)), v.rotate(Math.PI/4));
		},

		testAddConstant: function()
		{
			Y.ComplexMath.I.add(2);
		},

		testSubtractConstant: function()
		{
			Y.ComplexMath.ZERO.add(2);
		},

		testMultiplyConstant: function()
		{
			Y.ComplexMath.I.add(2);
		},

		testDivideConstant: function()
		{
			Y.ComplexMath.ZERO.add(2);
		},

		testString: function()
		{
			Y.Assert.areEqual('1', new Y.ComplexNumber(1).toString());
			Y.Assert.areEqual('-1', new Y.ComplexNumber(-1).toString());
			Y.Assert.areEqual('i', new Y.ComplexNumber(0,1).toString());
			Y.Assert.areEqual('-i', new Y.ComplexNumber(0,-1).toString());
			Y.Assert.areEqual('2i', new Y.ComplexNumber(0,2).toString());
			Y.Assert.areEqual('-2i', new Y.ComplexNumber(0,-2).toString());
			Y.Assert.areEqual('-1+i', new Y.ComplexNumber(-1,1).toString());
			Y.Assert.areEqual('1-i', new Y.ComplexNumber(1,-1).toString());
			Y.Assert.areEqual('2+3i', new Y.ComplexNumber(2,3).toString());
			Y.Assert.areEqual('-2-3i', new Y.ComplexNumber(-2,-3).toString());
		}
	}));

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'Complex math',

		testAdd: function()
		{
			var v1 = new Y.ComplexNumber(1,1);
			var v2 = new Y.ComplexNumber(-1,1);
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(2), Y.ComplexMath.add(1, 1));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(2,2), Y.ComplexMath.add(v1, v1));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0,2), Y.ComplexMath.add(v1, v2));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(2,3), Y.ComplexMath.add(v1, v2, v1, 1));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(2,3), Y.ComplexMath.add([v1, v2, v1, 1]));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(2,3), Y.ComplexMath.add([v1, v2], v1, 1));
		},

		testSubtract: function()
		{
			var v1 = new Y.ComplexNumber(2,1);
			var v2 = new Y.ComplexNumber(-1,2);
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(-1), Y.ComplexMath.subtract(1, 2));
			Y.Assert.complexWithinEpsilon(Y.ComplexMath.ZERO, Y.ComplexMath.subtract(v1, v1));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(3,-1), Y.ComplexMath.subtract(v1, v2));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1,1), Y.ComplexMath.subtract(v1, 1));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(-1,-1), Y.ComplexMath.subtract(1, v1));
		},

		testMultiply: function()
		{
			var v1 = new Y.ComplexNumber(1,1);
			var v2 = new Y.ComplexNumber(-1,1);
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(6), Y.ComplexMath.multiply(2, 3));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0,2), Y.ComplexMath.multiply(v1, v1));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(-2), Y.ComplexMath.multiply(v1, v2));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(-8), Y.ComplexMath.multiply(v1, v1, v1, v1, 2));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(-8), Y.ComplexMath.multiply([v1, v1, v1, v1, 2]));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(-8), Y.ComplexMath.multiply(v1, [v1, v1], v1, 2));
		},

		testDivide: function()
		{
			var v1 = new Y.ComplexNumber(1,1);
			var v2 = new Y.ComplexNumber(-1,1);
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(2), Y.ComplexMath.divide(4, 2));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1), Y.ComplexMath.divide(v1, v1));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0,1), Y.ComplexMath.divide(v2, v1));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0.5,0.5), Y.ComplexMath.divide(v1, 2));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1,-1), Y.ComplexMath.divide(2, v1));
		},

		testNegative: function()
		{
			var v = new Y.ComplexNumber(-1,1);
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(-1), Y.ComplexMath.negative(1));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1,-1), Y.ComplexMath.negative(v));
		},

		testAbs: function()
		{
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(5), Y.ComplexMath.abs(new Y.ComplexNumber(3,4)));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(5), Y.ComplexMath.abs(new Y.ComplexNumber(3,-4)));
		},

		testPhase: function()
		{
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(Math.PI/4), Y.ComplexMath.phase(new Y.ComplexNumber(1,1)));
		},

		testConjugate: function()
		{
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1, -1), Y.ComplexMath.conjugate(new Y.ComplexNumber(1,1)));
		},

		testRotate: function()
		{
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(-1, 1), Y.ComplexMath.rotate(new Y.ComplexNumber(1,1), Math.PI/2));
		},

		testSqrt: function()
		{
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(2), Y.ComplexMath.sqrt(4));
			Y.Assert.complexWithinEpsilon(Y.ComplexMath.I, Y.ComplexMath.sqrt(-1));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(Math.cos(Math.PI/6), Math.sin(Math.PI/6)), Y.ComplexMath.sqrt(new Y.ComplexNumber(Math.cos(Math.PI/3), Math.sin(Math.PI/3))));
		},

		testExp: function()
		{
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1), Y.ComplexMath.exp(0));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(Math.exp(2)), Y.ComplexMath.exp(2));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0, 1), Y.ComplexMath.exp(new Y.ComplexNumber(0, Math.PI/2)));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0, Math.E), Y.ComplexMath.exp(new Y.ComplexNumber(1, Math.PI/2)));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1/Math.SQRT2, 1/Math.SQRT2), Y.ComplexMath.exp(new Y.ComplexNumber(0, Math.PI/4)));
		},

		testLog: function()
		{
			Y.Assert.complexWithinEpsilon(Y.ComplexMath.ZERO, Y.ComplexMath.log(Y.ComplexMath.exp(0)));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(2), Y.ComplexMath.log(Y.ComplexMath.exp(2)));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0, Math.PI/2), Y.ComplexMath.log(Y.ComplexMath.exp(new Y.ComplexNumber(0, Math.PI/2))));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1, Math.PI/2), Y.ComplexMath.log(Y.ComplexMath.exp(new Y.ComplexNumber(1, Math.PI/2))));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0, Math.PI/4), Y.ComplexMath.log(Y.ComplexMath.exp(new Y.ComplexNumber(0, Math.PI/4))));
		},

		testParallel: function()
		{
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(-1/2, 3/2), Y.ComplexMath.parallel(new Y.ComplexNumber(1,2), new Y.ComplexNumber(-2,1)));
		},

		testPow: function()
		{
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1), Y.ComplexMath.pow(0, 0));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1), Y.ComplexMath.pow(Y.ComplexMath.ZERO, Y.ComplexMath.ZERO));
			Y.Assert.complexWithinEpsilon(Y.ComplexMath.ZERO, Y.ComplexMath.pow(0, 2));
			Y.Assert.complexWithinEpsilon(Y.ComplexMath.ZERO, Y.ComplexMath.pow(Y.ComplexMath.ZERO, 2));

			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0.7692389013639721, 0.6389612763136348), Y.ComplexMath.pow(2, Y.ComplexMath.I));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0.2078795763507619), Y.ComplexMath.pow(Y.ComplexMath.I, Y.ComplexMath.I));
		},

		testTrigonometric: function()
		{
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(), Y.ComplexMath.cos(Math.PI/2));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1), Y.ComplexMath.sin(Math.PI/2));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1), Y.ComplexMath.tan(Math.PI/4));

			var v = new Y.ComplexNumber(0,3);
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(Math.cosh(3)), Y.ComplexMath.cos(v));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0,Math.sinh(3)), Y.ComplexMath.sin(v));
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0,Math.tanh(3)), Y.ComplexMath.tan(v));
		},

		testHyperbolic: function()
		{
			// branch cuts are tricky

			var v = new Y.ComplexNumber(1,2);
			Y.Assert.complexWithinEpsilon(v, Y.ComplexMath.acosh(Y.ComplexMath.cosh(v)));

			var v = new Y.ComplexNumber(-0.5,0.5);
			Y.Assert.complexWithinEpsilon(v, Y.ComplexMath.asinh(Y.ComplexMath.sinh(v)));
			Y.Assert.complexWithinEpsilon(v, Y.ComplexMath.atanh(Y.ComplexMath.tanh(v)));
		}
	}));

}, '@VERSION@', {requires:['gallery-complexnumber','test','gallery-test-extras']});
