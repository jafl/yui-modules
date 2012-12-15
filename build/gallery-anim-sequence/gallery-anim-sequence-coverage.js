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
_yuitest_coverage["build/gallery-anim-sequence/gallery-anim-sequence.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-anim-sequence/gallery-anim-sequence.js",
    code: []
};
_yuitest_coverage["build/gallery-anim-sequence/gallery-anim-sequence.js"].code=["YUI.add('gallery-anim-sequence', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-anim-sequence"," */","","/**********************************************************************"," * Manages a sequence of animations, so you don't have to chain them"," * manually. Each item in the sequence can be a single animation, an array"," * of animations to perform in parallel, a function which performs an"," * immediate action, or a delay in milliseconds."," * "," * Pass `sequence` in the configuration to set the initial animation"," * sequence."," * "," * This class exposes the same basic API as Y.Anim, so you can pass"," * Y.AnimSequence to anything that just needs to run/pause/stop an"," * animation."," * "," * @main gallery-anim-sequence"," * @class AnimSequence"," * @constructor"," * @param config {Object} configuration"," */","function AnimSequence(config)","{","	this._list = [];","	AnimSequence.superclass.constructor.apply(this, arguments);","}","","AnimSequence.NAME = \"AnimSequence\";","","AnimSequence.ATTRS =","{","	/**","	 * If true, the animation runs backwards.  Immediate actions receive","	 * the value of reverse as the only argument.","	 * ","	 * @attribute reverse","	 * @type {Boolean}","	 * @default false","	 */","	reverse:","	{","		value:     false,","		validator: Y.Lang.isBoolean","	},","","	/**","	 * The number of times the animation should run.  Can be \"infinite\"","	 * ","	 * @attribute iterations","	 * @type {Number|String}","	 * @default 1","	 */","	iterations:","	{","		value: 1,","		validator: function(value)","		{","			return Y.Lang.isNumber(value) || value == 'infinite';","		}","	},","","	/**","	 * The number of times the animation has run.  Resets to zero when","	 * the animation finishes or is stopped.","	 * ","	 * @attribute iterationCount","	 * @type {Number}","	 * @readOnly","	 */","	iterationCount:","	{","		value:    0,","		readOnly: true","	},","","	/**","	 * The behavior of the animation when \"iterations\" > 1:","	 * If \"normal\", the animation will repeat in the same direction.","	 * If \"alternate\", the animation will flip \"reverse\" at the end of the sequence.","	 * ","	 * @attribute direction","	 * @type {String}","	 * @default \"normal\"","	 */","	direction:","	{","		value: 'normal',","		validator: function(value)","		{","			return value == 'normal' || value == 'alternate';","		}","	},","","	/**","	 * Whether or not the animation is currently running.","	 * ","	 * @attribute running","	 * @type {Boolean}","	 * @default false","	 * @readonly","	 */","	running:","	{","		value:     false,","		validator: Y.Lang.isBoolean,","		readOnly:  true","	},","","	/**","	 * Whether or not the animation is currently paused.","	 * ","	 * @attribute paused","	 * @type {Boolean}","	 * @default false","	 * @readonly","	 */","	paused:","	{","		value:     false,","		validator: Y.Lang.isBoolean,","		readOnly:  true","	}","};","","/**"," * @event start"," * @description Fires when the sequence begins."," */","/**"," * @event item"," * @description Fires when an item in the sequence begins."," * @param index {int} the item index"," */","/**"," * @event end"," * @description Fires after the sequence finishes."," */","","/**"," * @event pause"," * @description Fires when the sequence is paused."," */","/**"," * @event resume"," * @description Fires when the sequence resumes (after being paused)."," */","","function next()","{","	if (this.get('paused'))","	{","		return;","	}","","	var reverse = this.get('reverse');","	if ((!reverse && this._index >= this._list.length) ||","		( reverse && this._index < 0))","	{","		var iter_max   = this.get('iterations'),","			iter_count = this.get('iterationCount') + 1;","		if (iter_max == 'infinite' || iter_count < iter_max)","		{","			if (this.get('direction') == 'alternate')","			{","				this.set('reverse', !reverse);","			}","","			this._set('iterationCount', iter_count);","			this._index = this.get('reverse') ? this._list.length-1 : 0;","			next.call(this);","		}","		else","		{","			this._set('running', false);","			this.fire('end');","		}","		return;","	}","","	var item = this._list[ this._index ];","	if (Y.Lang.isArray(item))","	{","		var tasks = new Y.Parallel();","		Y.each(item, function(a)","		{","			a.once('end', tasks.add());","			a.set('reverse', reverse);","			a.run();","		},","		this);","","		tasks.done(Y.bind(next, this));","	}","	else if ((item instanceof Y.Anim) || (item instanceof Y.AnimSequence))","	{","		item.once('end', next, this);","		item.set('reverse', reverse);","		item.run();","	}","	else if (Y.Lang.isFunction(item))","	{","		Y.later(0, this, function()","		{","			item.call(null, reverse);","			next.call(this);","		});","	}","	else if (Y.Lang.isNumber(item))","	{","		Y.later(item, this, next);","	}","	else","	{","		throw Error('unknown item type in sequence: ' + item);","	}","","	this._index += reverse ? -1 : +1;","}","","Y.extend(AnimSequence, Y.Base,","{","	initializer: function(config)","	{","		if (Y.Lang.isArray(config.sequence))","		{","			this.append.apply(this, config.sequence);","		}","	},","","	/**","	 * Append items to the sequence.","	 *","	 * @method append","	 * @param item* {Anim|Function|Array|Number} animation, function, list of animations and functions, or delay in milliseconds","	 */","	append: function(item)","	{","		if (arguments.length == 1)	// even for an array","		{","			this._list.push(item);","		}","		else","		{","			Y.each(Y.Array(arguments), function f(a)","			{","				this._list.push(a);","			},","			this);","		}","	},","","	/**","	 * Prepend items to the sequence.","	 *","	 * @method prepend","	 * @param item* {Anim|Function|Array|Number} animation, function, list of animations and functions, or delay in milliseconds","	 */","	prepend: function(item)","	{","		if (arguments.length == 1)	// even for an array","		{","			this._list.unshift(item);","		}","		else","		{","			Y.each(Y.Array(arguments), function f(a)","			{","				this._list.unshift(a);","			},","			this);","		}","	},","","	/**","	 * Starts or resumes the sequence.","	 *","	 * @method run","	 * @chainable","	 */","	run: function()","	{","		if (this.get('paused'))","		{","			this._set('paused', false);","			this.fire('resume');","		}","		else","		{","			this._set('iterationCount', 0);","			this._set('running', true);","			this.fire('start');","			this._index = this.get('reverse') ? this._list.length-1 : 0;","		}","","		next.call(this);","		return this;","	},","","	/**","	 * Stops and resets the sequence.","	 *","	 * @method stop","	 * @chainable","	 * @param finish {Boolean} If true, the animation will move to the last frame.","	 */","	stop: function(finish)","	{","		this._set('running', false);","		this._set('paused', false);","","		for (var i=this._index; i<this._list.length; i++)","		{","			var item = this._list[i];","			if (Y.Lang.isArray(item))","			{","				Y.each(item, function(a)","				{","					a.run();	// so items beyond the current item will finish","					a.stop(finish);","				},","				this);","			}","			else if ((item instanceof Y.Anim) || (item instanceof Y.AnimSequence))","			{","				item.run();		// so items beyond the current item will finish","				item.stop(finish);","			}","","			if (!finish)","			{","				break;","			}","		}","","		this.fire('end');","		return this;","	},","","	/**","	 * Pauses the sequence.  If the current item is a delay, the sequence will","	 * pause after the delay interval finishes.","	 *","	 * @method pause","	 * @chainable","	 */","	pause: function()","	{","		this._set('paused', true);","","		var item = this._list[ this._index ];","		if (Y.Lang.isArray(item))","		{","			Y.each(item, function(a)","			{","				a.pause();","			},","			this);","		}","		else if ((item instanceof Y.Anim) || (item instanceof Y.AnimSequence))","		{","			item.pause();","		}","","		this.fire('pause');","		return this;","	}","});","","Y.AnimSequence = AnimSequence;","/**"," * @module gallery-anim-sequence"," */","","/**"," * Binds an AnimSequence instance to a Node instance.  The API and"," * namespace is the same as NodeFX, so you can plug NodeFXSequence into"," * any node that just needs to run/pause/stop an animation."," * "," * Pass `sequence` in the configuration to set the initial animation"," * sequence."," * "," * @class Plugin.NodeFXSequence"," * @extends AnimSequence"," * @constructor"," * @param config {Object} configuration"," */","var NodeFXSequence = function(config)","{","	this._host = config.host;","	NodeFXSequence.superclass.constructor.apply(this, arguments);","};","","NodeFXSequence.NAME = \"nodefxseq\";","NodeFXSequence.NS   = \"fx\";","","function setNode(item)","{","	if (Y.Lang.isArray(item))","	{","		Y.each(item, function(a)","		{","			a.set('node', this._host);","		},","		this);","	}","	else if (item instanceof Y.Anim)","	{","		item.set('node', this._host);","	}","}","","Y.extend(NodeFXSequence, Y.AnimSequence,","{","	append: function(item)","	{","		if (arguments.length > 1)","		{","			Y.each(arguments, setNode, this);","		}","		else","		{","			setNode.call(this, item);","		}","","		NodeFXSequence.superclass.append.apply(this, arguments);","	},","","	prepend: function(item)","	{","		if (arguments.length > 1)","		{","			Y.each(arguments, setNode, this);","		}","		else","		{","			setNode.call(this, item);","		}","","		NodeFXSequence.superclass.prepend.apply(this, arguments);","	}","});","","Y.namespace('Plugin');","Y.Plugin.NodeFXSequence = NodeFXSequence;","","","}, '@VERSION@', {\"requires\": [\"anim-base\", \"parallel\", \"node-pluginhost\"]});"];
_yuitest_coverage["build/gallery-anim-sequence/gallery-anim-sequence.js"].lines = {"1":0,"3":0,"27":0,"29":0,"30":0,"33":0,"35":0,"63":0,"95":0,"153":0,"155":0,"157":0,"160":0,"161":0,"164":0,"166":0,"168":0,"170":0,"173":0,"174":0,"175":0,"179":0,"180":0,"182":0,"185":0,"186":0,"188":0,"189":0,"191":0,"192":0,"193":0,"197":0,"199":0,"201":0,"202":0,"203":0,"205":0,"207":0,"209":0,"210":0,"213":0,"215":0,"219":0,"222":0,"225":0,"229":0,"231":0,"243":0,"245":0,"249":0,"251":0,"265":0,"267":0,"271":0,"273":0,"287":0,"289":0,"290":0,"294":0,"295":0,"296":0,"297":0,"300":0,"301":0,"313":0,"314":0,"316":0,"318":0,"319":0,"321":0,"323":0,"324":0,"328":0,"330":0,"331":0,"334":0,"336":0,"340":0,"341":0,"353":0,"355":0,"356":0,"358":0,"360":0,"364":0,"366":0,"369":0,"370":0,"374":0,"392":0,"394":0,"395":0,"398":0,"399":0,"401":0,"403":0,"405":0,"407":0,"411":0,"413":0,"417":0,"421":0,"423":0,"427":0,"430":0,"435":0,"437":0,"441":0,"444":0,"448":0,"449":0};
_yuitest_coverage["build/gallery-anim-sequence/gallery-anim-sequence.js"].functions = {"AnimSequence:27":0,"validator:61":0,"validator:93":0,"(anonymous 2):189":0,"(anonymous 3):207":0,"next:153":0,"initializer:227":0,"f:249":0,"append:241":0,"f:271":0,"prepend:263":0,"run:285":0,"(anonymous 4):321":0,"stop:311":0,"(anonymous 5):358":0,"pause:351":0,"NodeFXSequence:392":0,"(anonymous 6):405":0,"setNode:401":0,"append:419":0,"prepend:433":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-anim-sequence/gallery-anim-sequence.js"].coveredLines = 111;
_yuitest_coverage["build/gallery-anim-sequence/gallery-anim-sequence.js"].coveredFunctions = 22;
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 1);
YUI.add('gallery-anim-sequence', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 3);
"use strict";

/**
 * @module gallery-anim-sequence
 */

/**********************************************************************
 * Manages a sequence of animations, so you don't have to chain them
 * manually. Each item in the sequence can be a single animation, an array
 * of animations to perform in parallel, a function which performs an
 * immediate action, or a delay in milliseconds.
 * 
 * Pass `sequence` in the configuration to set the initial animation
 * sequence.
 * 
 * This class exposes the same basic API as Y.Anim, so you can pass
 * Y.AnimSequence to anything that just needs to run/pause/stop an
 * animation.
 * 
 * @main gallery-anim-sequence
 * @class AnimSequence
 * @constructor
 * @param config {Object} configuration
 */
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 27);
function AnimSequence(config)
{
	_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "AnimSequence", 27);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 29);
this._list = [];
	_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 30);
AnimSequence.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 33);
AnimSequence.NAME = "AnimSequence";

_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 35);
AnimSequence.ATTRS =
{
	/**
	 * If true, the animation runs backwards.  Immediate actions receive
	 * the value of reverse as the only argument.
	 * 
	 * @attribute reverse
	 * @type {Boolean}
	 * @default false
	 */
	reverse:
	{
		value:     false,
		validator: Y.Lang.isBoolean
	},

	/**
	 * The number of times the animation should run.  Can be "infinite"
	 * 
	 * @attribute iterations
	 * @type {Number|String}
	 * @default 1
	 */
	iterations:
	{
		value: 1,
		validator: function(value)
		{
			_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "validator", 61);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 63);
return Y.Lang.isNumber(value) || value == 'infinite';
		}
	},

	/**
	 * The number of times the animation has run.  Resets to zero when
	 * the animation finishes or is stopped.
	 * 
	 * @attribute iterationCount
	 * @type {Number}
	 * @readOnly
	 */
	iterationCount:
	{
		value:    0,
		readOnly: true
	},

	/**
	 * The behavior of the animation when "iterations" > 1:
	 * If "normal", the animation will repeat in the same direction.
	 * If "alternate", the animation will flip "reverse" at the end of the sequence.
	 * 
	 * @attribute direction
	 * @type {String}
	 * @default "normal"
	 */
	direction:
	{
		value: 'normal',
		validator: function(value)
		{
			_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "validator", 93);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 95);
return value == 'normal' || value == 'alternate';
		}
	},

	/**
	 * Whether or not the animation is currently running.
	 * 
	 * @attribute running
	 * @type {Boolean}
	 * @default false
	 * @readonly
	 */
	running:
	{
		value:     false,
		validator: Y.Lang.isBoolean,
		readOnly:  true
	},

	/**
	 * Whether or not the animation is currently paused.
	 * 
	 * @attribute paused
	 * @type {Boolean}
	 * @default false
	 * @readonly
	 */
	paused:
	{
		value:     false,
		validator: Y.Lang.isBoolean,
		readOnly:  true
	}
};

/**
 * @event start
 * @description Fires when the sequence begins.
 */
/**
 * @event item
 * @description Fires when an item in the sequence begins.
 * @param index {int} the item index
 */
/**
 * @event end
 * @description Fires after the sequence finishes.
 */

/**
 * @event pause
 * @description Fires when the sequence is paused.
 */
/**
 * @event resume
 * @description Fires when the sequence resumes (after being paused).
 */

_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 153);
function next()
{
	_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "next", 153);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 155);
if (this.get('paused'))
	{
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 157);
return;
	}

	_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 160);
var reverse = this.get('reverse');
	_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 161);
if ((!reverse && this._index >= this._list.length) ||
		( reverse && this._index < 0))
	{
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 164);
var iter_max   = this.get('iterations'),
			iter_count = this.get('iterationCount') + 1;
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 166);
if (iter_max == 'infinite' || iter_count < iter_max)
		{
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 168);
if (this.get('direction') == 'alternate')
			{
				_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 170);
this.set('reverse', !reverse);
			}

			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 173);
this._set('iterationCount', iter_count);
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 174);
this._index = this.get('reverse') ? this._list.length-1 : 0;
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 175);
next.call(this);
		}
		else
		{
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 179);
this._set('running', false);
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 180);
this.fire('end');
		}
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 182);
return;
	}

	_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 185);
var item = this._list[ this._index ];
	_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 186);
if (Y.Lang.isArray(item))
	{
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 188);
var tasks = new Y.Parallel();
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 189);
Y.each(item, function(a)
		{
			_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "(anonymous 2)", 189);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 191);
a.once('end', tasks.add());
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 192);
a.set('reverse', reverse);
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 193);
a.run();
		},
		this);

		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 197);
tasks.done(Y.bind(next, this));
	}
	else {_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 199);
if ((item instanceof Y.Anim) || (item instanceof Y.AnimSequence))
	{
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 201);
item.once('end', next, this);
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 202);
item.set('reverse', reverse);
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 203);
item.run();
	}
	else {_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 205);
if (Y.Lang.isFunction(item))
	{
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 207);
Y.later(0, this, function()
		{
			_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "(anonymous 3)", 207);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 209);
item.call(null, reverse);
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 210);
next.call(this);
		});
	}
	else {_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 213);
if (Y.Lang.isNumber(item))
	{
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 215);
Y.later(item, this, next);
	}
	else
	{
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 219);
throw Error('unknown item type in sequence: ' + item);
	}}}}

	_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 222);
this._index += reverse ? -1 : +1;
}

_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 225);
Y.extend(AnimSequence, Y.Base,
{
	initializer: function(config)
	{
		_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "initializer", 227);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 229);
if (Y.Lang.isArray(config.sequence))
		{
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 231);
this.append.apply(this, config.sequence);
		}
	},

	/**
	 * Append items to the sequence.
	 *
	 * @method append
	 * @param item* {Anim|Function|Array|Number} animation, function, list of animations and functions, or delay in milliseconds
	 */
	append: function(item)
	{
		_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "append", 241);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 243);
if (arguments.length == 1)	// even for an array
		{
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 245);
this._list.push(item);
		}
		else
		{
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 249);
Y.each(Y.Array(arguments), function f(a)
			{
				_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "f", 249);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 251);
this._list.push(a);
			},
			this);
		}
	},

	/**
	 * Prepend items to the sequence.
	 *
	 * @method prepend
	 * @param item* {Anim|Function|Array|Number} animation, function, list of animations and functions, or delay in milliseconds
	 */
	prepend: function(item)
	{
		_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "prepend", 263);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 265);
if (arguments.length == 1)	// even for an array
		{
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 267);
this._list.unshift(item);
		}
		else
		{
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 271);
Y.each(Y.Array(arguments), function f(a)
			{
				_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "f", 271);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 273);
this._list.unshift(a);
			},
			this);
		}
	},

	/**
	 * Starts or resumes the sequence.
	 *
	 * @method run
	 * @chainable
	 */
	run: function()
	{
		_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "run", 285);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 287);
if (this.get('paused'))
		{
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 289);
this._set('paused', false);
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 290);
this.fire('resume');
		}
		else
		{
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 294);
this._set('iterationCount', 0);
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 295);
this._set('running', true);
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 296);
this.fire('start');
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 297);
this._index = this.get('reverse') ? this._list.length-1 : 0;
		}

		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 300);
next.call(this);
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 301);
return this;
	},

	/**
	 * Stops and resets the sequence.
	 *
	 * @method stop
	 * @chainable
	 * @param finish {Boolean} If true, the animation will move to the last frame.
	 */
	stop: function(finish)
	{
		_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "stop", 311);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 313);
this._set('running', false);
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 314);
this._set('paused', false);

		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 316);
for (var i=this._index; i<this._list.length; i++)
		{
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 318);
var item = this._list[i];
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 319);
if (Y.Lang.isArray(item))
			{
				_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 321);
Y.each(item, function(a)
				{
					_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "(anonymous 4)", 321);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 323);
a.run();	// so items beyond the current item will finish
					_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 324);
a.stop(finish);
				},
				this);
			}
			else {_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 328);
if ((item instanceof Y.Anim) || (item instanceof Y.AnimSequence))
			{
				_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 330);
item.run();		// so items beyond the current item will finish
				_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 331);
item.stop(finish);
			}}

			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 334);
if (!finish)
			{
				_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 336);
break;
			}
		}

		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 340);
this.fire('end');
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 341);
return this;
	},

	/**
	 * Pauses the sequence.  If the current item is a delay, the sequence will
	 * pause after the delay interval finishes.
	 *
	 * @method pause
	 * @chainable
	 */
	pause: function()
	{
		_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "pause", 351);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 353);
this._set('paused', true);

		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 355);
var item = this._list[ this._index ];
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 356);
if (Y.Lang.isArray(item))
		{
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 358);
Y.each(item, function(a)
			{
				_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "(anonymous 5)", 358);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 360);
a.pause();
			},
			this);
		}
		else {_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 364);
if ((item instanceof Y.Anim) || (item instanceof Y.AnimSequence))
		{
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 366);
item.pause();
		}}

		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 369);
this.fire('pause');
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 370);
return this;
	}
});

_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 374);
Y.AnimSequence = AnimSequence;
/**
 * @module gallery-anim-sequence
 */

/**
 * Binds an AnimSequence instance to a Node instance.  The API and
 * namespace is the same as NodeFX, so you can plug NodeFXSequence into
 * any node that just needs to run/pause/stop an animation.
 * 
 * Pass `sequence` in the configuration to set the initial animation
 * sequence.
 * 
 * @class Plugin.NodeFXSequence
 * @extends AnimSequence
 * @constructor
 * @param config {Object} configuration
 */
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 392);
var NodeFXSequence = function(config)
{
	_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "NodeFXSequence", 392);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 394);
this._host = config.host;
	_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 395);
NodeFXSequence.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 398);
NodeFXSequence.NAME = "nodefxseq";
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 399);
NodeFXSequence.NS   = "fx";

_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 401);
function setNode(item)
{
	_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "setNode", 401);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 403);
if (Y.Lang.isArray(item))
	{
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 405);
Y.each(item, function(a)
		{
			_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "(anonymous 6)", 405);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 407);
a.set('node', this._host);
		},
		this);
	}
	else {_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 411);
if (item instanceof Y.Anim)
	{
		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 413);
item.set('node', this._host);
	}}
}

_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 417);
Y.extend(NodeFXSequence, Y.AnimSequence,
{
	append: function(item)
	{
		_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "append", 419);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 421);
if (arguments.length > 1)
		{
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 423);
Y.each(arguments, setNode, this);
		}
		else
		{
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 427);
setNode.call(this, item);
		}

		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 430);
NodeFXSequence.superclass.append.apply(this, arguments);
	},

	prepend: function(item)
	{
		_yuitest_coverfunc("build/gallery-anim-sequence/gallery-anim-sequence.js", "prepend", 433);
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 435);
if (arguments.length > 1)
		{
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 437);
Y.each(arguments, setNode, this);
		}
		else
		{
			_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 441);
setNode.call(this, item);
		}

		_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 444);
NodeFXSequence.superclass.prepend.apply(this, arguments);
	}
});

_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 448);
Y.namespace('Plugin');
_yuitest_coverline("build/gallery-anim-sequence/gallery-anim-sequence.js", 449);
Y.Plugin.NodeFXSequence = NodeFXSequence;


}, '@VERSION@', {"requires": ["anim-base", "parallel", "node-pluginhost"]});
