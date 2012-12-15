if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-test-extras/gallery-test-extras.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-test-extras/gallery-test-extras.js",
    code: []
};
_yuitest_coverage["build/gallery-test-extras/gallery-test-extras.js"].code=["YUI.add('gallery-test-extras', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-test-extras"," */","","/**"," * <p>Additional assertions for unit tests.</p>"," * "," * @main gallery-test-extras"," * @class Assert"," */","","var logToLog10 = 1/Math.log(10);","","Y.mix(Y.Assert,","{","	/**","	 * Asserts that the mantissas of two values are with epsilon of each","	 * other.  (The test automatically fails if the exponents are different.)","	 * ","	 * @method areWithinEpsilon","	 * @static","	 * @param expected {Number} the expected value","	 * @param actual {Number} the actual value to test","	 * @param epsilon {Number} the maximum allowed difference in the mantissas","	 */","	areWithinEpsilon: function(expected, actual, epsilon)","	{","		if (Y.Lang.isUndefined(epsilon))","		{","			epsilon = 1e-9;","		}","","		if (expected !== 0)","		{","			var scale = Math.pow(10, Math.floor(Math.log(Math.abs(expected))*logToLog10));","			expected /= scale;","			actual   /= scale;","		}","","		Y.Assert.isTrue(Math.abs(expected-actual) <= epsilon, 'Values should be within '+epsilon+'\\nExpected: '+expected+' (number)\\nActual:'+actual+ ' (number)\\n-----');","	},","","	/**","	 * Asserts that both real and imaginary parts of two complex values are","	 * with epsilon of each other.  (The test automatically fails if the","	 * exponents are different.)","	 * ","	 * @method complexWithinEpsilon","	 * @static","	 * @param expected {ComplexNumber} the expected value","	 * @param actual {ComplexNumber} the actual value to test","	 * @param epsilon {ComplexNumber} the maximum allowed difference in the mantissas","	 */","	complexWithinEpsilon: function(expected, actual, epsilon)","	{","		Y.Assert.areWithinEpsilon(expected.r, actual.r, epsilon);","		Y.Assert.areWithinEpsilon(expected.i, actual.i, epsilon);","	}","});","","","}, '@VERSION@', {\"requires\": [\"test\"], \"optional\": [\"gallery-complexnumber\"]});"];
_yuitest_coverage["build/gallery-test-extras/gallery-test-extras.js"].lines = {"1":0,"3":0,"16":0,"18":0,"32":0,"34":0,"37":0,"39":0,"40":0,"41":0,"44":0,"60":0,"61":0};
_yuitest_coverage["build/gallery-test-extras/gallery-test-extras.js"].functions = {"areWithinEpsilon:30":0,"complexWithinEpsilon:58":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-test-extras/gallery-test-extras.js"].coveredLines = 13;
_yuitest_coverage["build/gallery-test-extras/gallery-test-extras.js"].coveredFunctions = 3;
_yuitest_coverline("build/gallery-test-extras/gallery-test-extras.js", 1);
YUI.add('gallery-test-extras', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-test-extras/gallery-test-extras.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-test-extras/gallery-test-extras.js", 3);
"use strict";

/**
 * @module gallery-test-extras
 */

/**
 * <p>Additional assertions for unit tests.</p>
 * 
 * @main gallery-test-extras
 * @class Assert
 */

_yuitest_coverline("build/gallery-test-extras/gallery-test-extras.js", 16);
var logToLog10 = 1/Math.log(10);

_yuitest_coverline("build/gallery-test-extras/gallery-test-extras.js", 18);
Y.mix(Y.Assert,
{
	/**
	 * Asserts that the mantissas of two values are with epsilon of each
	 * other.  (The test automatically fails if the exponents are different.)
	 * 
	 * @method areWithinEpsilon
	 * @static
	 * @param expected {Number} the expected value
	 * @param actual {Number} the actual value to test
	 * @param epsilon {Number} the maximum allowed difference in the mantissas
	 */
	areWithinEpsilon: function(expected, actual, epsilon)
	{
		_yuitest_coverfunc("build/gallery-test-extras/gallery-test-extras.js", "areWithinEpsilon", 30);
_yuitest_coverline("build/gallery-test-extras/gallery-test-extras.js", 32);
if (Y.Lang.isUndefined(epsilon))
		{
			_yuitest_coverline("build/gallery-test-extras/gallery-test-extras.js", 34);
epsilon = 1e-9;
		}

		_yuitest_coverline("build/gallery-test-extras/gallery-test-extras.js", 37);
if (expected !== 0)
		{
			_yuitest_coverline("build/gallery-test-extras/gallery-test-extras.js", 39);
var scale = Math.pow(10, Math.floor(Math.log(Math.abs(expected))*logToLog10));
			_yuitest_coverline("build/gallery-test-extras/gallery-test-extras.js", 40);
expected /= scale;
			_yuitest_coverline("build/gallery-test-extras/gallery-test-extras.js", 41);
actual   /= scale;
		}

		_yuitest_coverline("build/gallery-test-extras/gallery-test-extras.js", 44);
Y.Assert.isTrue(Math.abs(expected-actual) <= epsilon, 'Values should be within '+epsilon+'\nExpected: '+expected+' (number)\nActual:'+actual+ ' (number)\n-----');
	},

	/**
	 * Asserts that both real and imaginary parts of two complex values are
	 * with epsilon of each other.  (The test automatically fails if the
	 * exponents are different.)
	 * 
	 * @method complexWithinEpsilon
	 * @static
	 * @param expected {ComplexNumber} the expected value
	 * @param actual {ComplexNumber} the actual value to test
	 * @param epsilon {ComplexNumber} the maximum allowed difference in the mantissas
	 */
	complexWithinEpsilon: function(expected, actual, epsilon)
	{
		_yuitest_coverfunc("build/gallery-test-extras/gallery-test-extras.js", "complexWithinEpsilon", 58);
_yuitest_coverline("build/gallery-test-extras/gallery-test-extras.js", 60);
Y.Assert.areWithinEpsilon(expected.r, actual.r, epsilon);
		_yuitest_coverline("build/gallery-test-extras/gallery-test-extras.js", 61);
Y.Assert.areWithinEpsilon(expected.i, actual.i, epsilon);
	}
});


}, '@VERSION@', {"requires": ["test"], "optional": ["gallery-complexnumber"]});
