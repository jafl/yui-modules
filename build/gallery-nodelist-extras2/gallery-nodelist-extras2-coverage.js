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
_yuitest_coverage["build/gallery-nodelist-extras2/gallery-nodelist-extras2.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-nodelist-extras2/gallery-nodelist-extras2.js",
    code: []
};
_yuitest_coverage["build/gallery-nodelist-extras2/gallery-nodelist-extras2.js"].code=["YUI.add('gallery-nodelist-extras2', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-nodelist-extras2"," */","","/**"," * <p>Augments Y.NodeList with the same higher-order functions that"," * array-extras adds to Y.Array.</p>"," * "," * @main gallery-nodelist-extras2"," * @class NodeList~extras2"," */","","Y.mix(Y.NodeList.prototype,","{","	/**","	 * Executes the supplied function on each Node in the NodeList.","	 * Iteration stops if the supplied function does not return a truthy","	 * value.  The function receives the Node, the index, and the NodeList","	 * itself as parameters (in that order).","	 *","	 * @method every","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @return {Boolean} true if every item in the array returns true from the supplied function, false otherwise","	 */","	every: function(f, c)","	{","		return Y.Array.every(this._nodes, function(node, index)","		{","			node = Y.one(node);","			return f.call(c || node, node, index, this);","		},","		this);","	},","","	/**","	 * Executes the supplied function on each Node in the NodeList,","	 * searching for the first Node that matches the supplied function.","	 * The function receives the Node, the index, and the NodeList itself","	 * as parameters (in that order).","	 *","	 * @method find","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @return {Node} the first Node for which the supplied function returns true, or null if it never returns true","	 */","	find: function(f, c)","	{","		var n = Y.Array.find(this._nodes, function(node, index)","		{","			node = Y.one(node);","			return f.call(c || node, node, index, this);","		},","		this);","","		return Y.one(n);","	},","","	/**","	 * Executes the supplied function on each Node in the NodeList and","	 * returns a new array with the results.  The function receives the","	 * Node, the index, and the NodeList itself as parameters (in that order).","	 *","	 * @method map","	 * @param f {String} the function to invoke","	 * @param c {Object} optional context object","	 * @return {Array} all return values, mapped according to the item key","	 */","	map: function(f, c)","	{","		return Y.Array.map(this._nodes, function(node, index)","		{","			node = Y.one(node);","			return f.call(c || node, node, index, this);","		},","		this);","	},","","	/**","	 * Partitions the NodeList into two new NodeLists, one with the items","	 * for which the supplied function returns true, and one with the","	 * items for which the function returns false.  The function receives","	 * the Node, the index, and the NodeList itself as parameters (in that","	 * order).","	 *","	 * @method partition","	 * @param f {Function} the function to execute on each item","	 * @param c {Object} optional context object","	 * @return {Object} object with two properties: matches and rejects. Each is a NodeList containing the items that were selected or rejected by the test function (or an empty object if none).","	 */","	partition: function(f, c)","	{","		var result =","		{","			matches: new Y.NodeList(),","			rejects: new Y.NodeList()","		};","","		Y.Array.each(this._nodes, function(node, index)","		{","			node    = Y.one(node);","			var set = f.call(c || node, node, index, this) ? result.matches : result.rejects;","			set.push(node);","		},","		this);","","		return result;","	},","","	/**","	 * Executes the supplied function on each Node in the NodeList, folding","	 * the NodeList into a single value.  The function receives the value","	 * returned by the previous iteration (or the initial value if this is","	 * the first iteration), the Node being iterated, the index, and the","	 * NodeList itself as parameters (in that order).  The function must","	 * return the updated value.","	 *","	 * @method reduce","	 * @param init {Mixed} the initial value","	 * @param f {String} the function to invoke","	 * @param c {Object} optional context object","	 * @return {Mixed} final result from iteratively applying the given function to each Node in the NodeList","	 */","	reduce: function(init, f, c)","	{","		return Y.Array.reduce(this._nodes, init, function(acc, node, index)","		{","			node = Y.one(node);","			return f.call(c || node, acc, node, index, this);","		},","		this);","	},","","	/**","	 * Executes the supplied function on each Node in the NodeList,","	 * starting at the end and folding the NodeList into a single value.","	 * The function receives the value returned by the previous iteration","	 * (or the initial value if this is the first iteration), the Node","	 * being iterated, the index, and the NodeList itself as parameters (in","	 * that order).  The function must return the updated value.","	 *","	 * @method reduceRight","	 * @param init {Mixed} the initial value","	 * @param f {String} the function to invoke","	 * @param c {Object} optional context object","	 * @return {Mixed} final result from iteratively applying the given function to each Node in the NodeList","	 */","	reduceRight: function(init, f, c)","	{","		return Y.Array.reduceRight(this._nodes, init, function(acc, node, index)","		{","			node = Y.one(node);","			return f.call(c || node, acc, node, index, this);","		},","		this);","	}","});","","","}, '@VERSION@', {\"requires\": [\"gallery-nodelist-extras\", \"gallery-funcprog\"], \"optional\": [\"\"]});"];
_yuitest_coverage["build/gallery-nodelist-extras2/gallery-nodelist-extras2.js"].lines = {"1":0,"3":0,"17":0,"32":0,"34":0,"35":0,"53":0,"55":0,"56":0,"60":0,"75":0,"77":0,"78":0,"97":0,"103":0,"105":0,"106":0,"107":0,"111":0,"130":0,"132":0,"133":0,"154":0,"156":0,"157":0};
_yuitest_coverage["build/gallery-nodelist-extras2/gallery-nodelist-extras2.js"].functions = {"(anonymous 2):32":0,"every:30":0,"(anonymous 3):53":0,"find:51":0,"(anonymous 4):75":0,"map:73":0,"(anonymous 5):103":0,"partition:95":0,"(anonymous 6):130":0,"reduce:128":0,"(anonymous 7):154":0,"reduceRight:152":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-nodelist-extras2/gallery-nodelist-extras2.js"].coveredLines = 25;
_yuitest_coverage["build/gallery-nodelist-extras2/gallery-nodelist-extras2.js"].coveredFunctions = 13;
_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 1);
YUI.add('gallery-nodelist-extras2', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 3);
"use strict";

/**
 * @module gallery-nodelist-extras2
 */

/**
 * <p>Augments Y.NodeList with the same higher-order functions that
 * array-extras adds to Y.Array.</p>
 * 
 * @main gallery-nodelist-extras2
 * @class NodeList~extras2
 */

_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 17);
Y.mix(Y.NodeList.prototype,
{
	/**
	 * Executes the supplied function on each Node in the NodeList.
	 * Iteration stops if the supplied function does not return a truthy
	 * value.  The function receives the Node, the index, and the NodeList
	 * itself as parameters (in that order).
	 *
	 * @method every
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @return {Boolean} true if every item in the array returns true from the supplied function, false otherwise
	 */
	every: function(f, c)
	{
		_yuitest_coverfunc("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", "every", 30);
_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 32);
return Y.Array.every(this._nodes, function(node, index)
		{
			_yuitest_coverfunc("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", "(anonymous 2)", 32);
_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 34);
node = Y.one(node);
			_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 35);
return f.call(c || node, node, index, this);
		},
		this);
	},

	/**
	 * Executes the supplied function on each Node in the NodeList,
	 * searching for the first Node that matches the supplied function.
	 * The function receives the Node, the index, and the NodeList itself
	 * as parameters (in that order).
	 *
	 * @method find
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @return {Node} the first Node for which the supplied function returns true, or null if it never returns true
	 */
	find: function(f, c)
	{
		_yuitest_coverfunc("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", "find", 51);
_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 53);
var n = Y.Array.find(this._nodes, function(node, index)
		{
			_yuitest_coverfunc("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", "(anonymous 3)", 53);
_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 55);
node = Y.one(node);
			_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 56);
return f.call(c || node, node, index, this);
		},
		this);

		_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 60);
return Y.one(n);
	},

	/**
	 * Executes the supplied function on each Node in the NodeList and
	 * returns a new array with the results.  The function receives the
	 * Node, the index, and the NodeList itself as parameters (in that order).
	 *
	 * @method map
	 * @param f {String} the function to invoke
	 * @param c {Object} optional context object
	 * @return {Array} all return values, mapped according to the item key
	 */
	map: function(f, c)
	{
		_yuitest_coverfunc("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", "map", 73);
_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 75);
return Y.Array.map(this._nodes, function(node, index)
		{
			_yuitest_coverfunc("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", "(anonymous 4)", 75);
_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 77);
node = Y.one(node);
			_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 78);
return f.call(c || node, node, index, this);
		},
		this);
	},

	/**
	 * Partitions the NodeList into two new NodeLists, one with the items
	 * for which the supplied function returns true, and one with the
	 * items for which the function returns false.  The function receives
	 * the Node, the index, and the NodeList itself as parameters (in that
	 * order).
	 *
	 * @method partition
	 * @param f {Function} the function to execute on each item
	 * @param c {Object} optional context object
	 * @return {Object} object with two properties: matches and rejects. Each is a NodeList containing the items that were selected or rejected by the test function (or an empty object if none).
	 */
	partition: function(f, c)
	{
		_yuitest_coverfunc("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", "partition", 95);
_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 97);
var result =
		{
			matches: new Y.NodeList(),
			rejects: new Y.NodeList()
		};

		_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 103);
Y.Array.each(this._nodes, function(node, index)
		{
			_yuitest_coverfunc("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", "(anonymous 5)", 103);
_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 105);
node    = Y.one(node);
			_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 106);
var set = f.call(c || node, node, index, this) ? result.matches : result.rejects;
			_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 107);
set.push(node);
		},
		this);

		_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 111);
return result;
	},

	/**
	 * Executes the supplied function on each Node in the NodeList, folding
	 * the NodeList into a single value.  The function receives the value
	 * returned by the previous iteration (or the initial value if this is
	 * the first iteration), the Node being iterated, the index, and the
	 * NodeList itself as parameters (in that order).  The function must
	 * return the updated value.
	 *
	 * @method reduce
	 * @param init {Mixed} the initial value
	 * @param f {String} the function to invoke
	 * @param c {Object} optional context object
	 * @return {Mixed} final result from iteratively applying the given function to each Node in the NodeList
	 */
	reduce: function(init, f, c)
	{
		_yuitest_coverfunc("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", "reduce", 128);
_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 130);
return Y.Array.reduce(this._nodes, init, function(acc, node, index)
		{
			_yuitest_coverfunc("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", "(anonymous 6)", 130);
_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 132);
node = Y.one(node);
			_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 133);
return f.call(c || node, acc, node, index, this);
		},
		this);
	},

	/**
	 * Executes the supplied function on each Node in the NodeList,
	 * starting at the end and folding the NodeList into a single value.
	 * The function receives the value returned by the previous iteration
	 * (or the initial value if this is the first iteration), the Node
	 * being iterated, the index, and the NodeList itself as parameters (in
	 * that order).  The function must return the updated value.
	 *
	 * @method reduceRight
	 * @param init {Mixed} the initial value
	 * @param f {String} the function to invoke
	 * @param c {Object} optional context object
	 * @return {Mixed} final result from iteratively applying the given function to each Node in the NodeList
	 */
	reduceRight: function(init, f, c)
	{
		_yuitest_coverfunc("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", "reduceRight", 152);
_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 154);
return Y.Array.reduceRight(this._nodes, init, function(acc, node, index)
		{
			_yuitest_coverfunc("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", "(anonymous 7)", 154);
_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 156);
node = Y.one(node);
			_yuitest_coverline("build/gallery-nodelist-extras2/gallery-nodelist-extras2.js", 157);
return f.call(c || node, acc, node, index, this);
		},
		this);
	}
});


}, '@VERSION@', {"requires": ["gallery-nodelist-extras", "gallery-funcprog"], "optional": [""]});
