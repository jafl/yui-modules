YUI.add('gallery-mathcanvas-tests', function(Y) {
"use strict";

	Y.Test.Runner.add(new Y.Test.Case(
	{
		name: 'Parsing',

		testBasic: function()
		{
			var f = Y.MathCanvas.parse('3.5');
			Y.Assert.areSame(3.5, f.evaluate());

			f = Y.MathCanvas.parse('-7.1');
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(-7.1), f.evaluate(), 1e-5);

			f = Y.MathCanvas.parse('sqrt(-1)');
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0,1), f.evaluate(), 1e-5);

			f = Y.MathCanvas.parse('arg(1+j)');
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0.785398), f.evaluate(), 1e-5);

			f = Y.MathCanvas.parse('re(i)');
			Y.Assert.areSame(0, f.evaluate(), 1e-5);

			f = Y.MathCanvas.parse('im(i)');
			Y.Assert.areSame(1, f.evaluate(), 1e-5);

			f = Y.MathCanvas.parse('sin(pi/2)');
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1), f.evaluate(), 1e-5);

			f = Y.MathCanvas.parse('sin(pi/4)^2');
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0.5), f.evaluate(), 1e-5);

			f = Y.MathCanvas.parse('rotate(1, pi/2)');
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0,1), f.evaluate(), 1e-5);

			f = Y.MathCanvas.parse('rotate(sqrt(2),pi/4)');
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(1,1), f.evaluate(), 1e-5);

			f = Y.MathCanvas.parse('sin(i)');
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(0,1.1752), f.evaluate(), 1e-5);

			f = Y.MathCanvas.parse('abs(3-4*j)');
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(5), f.evaluate(), 1e-5);
		},

		testComplex: function()
		{
			var f = Y.MathCanvas.parse('sqrt(25+pi*sin(pi/2)+ln(e)-1)');
			Y.Assert.complexWithinEpsilon(new Y.ComplexNumber(5.30486), f.evaluate(), 1e-5);
		}
	}));

}, '@VERSION@', {requires:['gallery-mathcanvas','gallery-test-extras']});
