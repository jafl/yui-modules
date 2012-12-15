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
_yuitest_coverage["build/gallery-matrix-credits/gallery-matrix-credits.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-matrix-credits/gallery-matrix-credits.js",
    code: []
};
_yuitest_coverage["build/gallery-matrix-credits/gallery-matrix-credits.js"].code=["YUI.add('gallery-matrix-credits', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-matrix-credits"," */","","// Based on my ancient JMatrixCtrl MFC widget","","/**"," * Widget to display text similar to what was used in the credits for The"," * Matrix.  If you render the widget into the body, then it will fill the"," * viewport.  Otherwise, you must specify a width and height for the"," * widget."," * "," * @main gallery-matrix-credits"," * @class MatrixCredits"," * @constructor"," * @param config {Object} Widget configuration"," */","function MatrixCredits(config)","{","	this.timer = {};","","	MatrixCredits.superclass.constructor.call(this, config);","}","","MatrixCredits.NAME = 'matrixcredits';","","MatrixCredits.ATTRS =","{","	/**","	 * The sequence of messages to display.  Each item defines `intro`, a","	 * list of strings to display immediately, `lines`, a list of strings","	 * to phase in one at a time, and (optional) `pause`, the number of","	 * milliseconds to wait before continuing to the next item in the","	 * sequence.","	 *","	 * @attribute textSequence","	 * @type {Array}","	 * @required","	 */","	textSequence:","	{","		value:     [],","		validator: Y.Lang.isArray","	},","","	/**","	 * Milliseconds to wait before starting the text sequence.","	 *","	 * @attribute introDelay","	 * @type {Number}","	 * @default 5000","	 */","	introDelay:","	{","		value:     5000,","		validator: Y.Lang.isNumber","	},","","	/**","	 * Overridden by `pause` values in `textSequence`.","	 *","	 * @attribute pagePause","	 * @type {Number}","	 * @default 2000","	 */","	pagePause:","	{","		value:     2000,","		validator: Y.Lang.isNumber","	},","","	/**","	 * Milliseconds to wait before restarting the text sequence.","	 * Overridden by `pause` value of last item in `textSequence`.","	 *","	 * @attribute restartDelay","	 * @type {Number}","	 * @default 5000","	 */","	restartDelay:","	{","		value:     5000,","		validator: Y.Lang.isNumber","	},","","	/**","	 * <dl>","	 * <dt>none</dt><dd>Each line is drawn all at once and then begins to phase in.</dd>","	 * <dt>block</dt><dd>The text appears as a block cursor (\\u2588) scans across the container.</dd>","	 * <dt>char</dt><dd>The text appears as a randomly changing character scans across the container.</dd>","	 * </dl>","	 *","	 * @attribute cursor","	 * @type {String}","	 * @default \"block\"","	 */","	cursor:","	{","		value: 'block',","		validator: function(value)","		{","			return value == 'none' || value == 'block' || value == 'char';","		}","	},","","	/**","	 * The maximum number of iterations before a character is forced to the","	 * final value.  Each character stops changing when it hits the correct value","	 * or exceeds the maximum.  Specify zero to simply display the text.","	 *","	 * @attribute maxPhaseCount","	 * @type {Number}","	 * @default 20","	 */","	maxPhaseCount:","	{","		value:     20,","		validator: Y.Lang.isNumber","	},","","	/**","	 * The range of Unicode characters to use for spinning characters.  For","	 * most interesting results, all the characters in textSequence should","	 * be in this range.","	 * ","	 * @attribute charRange","	 * @type {Array}","	 * @default ['!', '~']","	 */","	charRange:","	{","		value: ['!', '~'],","		validator: function(value)","		{","			return (Y.Lang.isArray(value) && value.length == 2 &&","					value[0].length == 1 && value[1].length == 1 &&","					value[0] < value[1]);","		}","	},","","	/**","	 * @attribute background","	 * @type {Plugin.Base}","	 * @default {MatrixBackground}","	 * @writeonce","	 */","	background:","	{","		value:     Y.Plugin.MatrixBackground,","		writeOnce: true,","		validator: function(value)","		{","			return (value === null || (value instanceof Y.Plugin.Base));","		}","	},","","	/**","	 * Configuration for Y.MatrixBackground","	 *","	 * @attribute backgroundConfig","	 * @type {Object}","	 * @writeonce","	 */","	backgroundConfig:","	{","		writeOnce: true","	}","};","","var interval =","	{","		cursor: 30,","		spin:   10	// if possible, background's spin interval is used instead","	};","","var rnd        = Y.Plugin.MatrixBackground.rnd;","var startTimer = Y.Plugin.MatrixBackground.startTimer;","var stopTimer  = Y.Plugin.MatrixBackground.stopTimer;","","var getCharacterRange = Y.Plugin.MatrixBackground.getCharacterRange;","","function scheduleNextPage()","{","	var pages = this.get('textSequence');","	var page  = pages[ this.page_index ];","	var key   = (this.page_index == pages.length - 1) ? 'restartDelay' : 'pagePause';","	Y.later(page.pause || this.get(key), this, nextPage);","}","","function nextPage()","{","	var pages = this.get('textSequence');","","	this.page_index++;","	if (this.page_index >= pages.length)","	{","		this.page_index = 0;","	}","","	var page = pages[ this.page_index ];","","	var intro = Y.reduce(page.intro || [], '', function(s, line)","	{","		return s + '<p>' + (line || '&nbsp;') + '</p>';","	});","","	var lines = Y.reduce(page.lines || [], '', function(s, line)","	{","		s += '<p><span>';","		for (var i=0; i<line.length; i++)","		{","			s += '&nbsp;';","		}","		return s + '</span></p>';","	});","","	this.frame.setContent(intro + lines);","	this.frame_top = Math.floor((this.get('height') - this.frame.totalHeight())/2);","	this.frame.setStyle('top', this.frame_top + 'px')","","	if (page.lines)","	{","		this.frame_lines = this.frame.all('span');","		this.cursor_pt   = { row: -1, col: -1 };","","		this.cursor_top = this.frame_top - this.frame.totalHeight();","		startCursor.call(this);","		startSpin.call(this);","	}","	else","	{","		scheduleNextPage.call(this);","	}","}","","function startCursor()","{","	this.cursor.removeClass('hidden');","	startTimer.call(this, 'cursor');","","	var lines = this.get('textSequence')[ this.page_index ].lines;","	do","		{","		this.cursor_pt.row++;","		}","		while (lines[ this.cursor_pt.row ] == '&nbsp;');","","	this.cursor_pt.col = -1;","	this.spin_index    = 0;","	this.spin_count    = 0;","}","","function stopCursor()","{","	this.cursor.addClass('hidden');","	this.cursor.setStyles({ top: 0, left: 0 });","	stopTimer.call(this, 'cursor');","}","","function updateCursor()","{","	this.cursor_pt.col++;","	if (parseInt(this.cursor.getStyle('left'), 10) > this.get('width'))","	{","		stopCursor.call(this);","		checkLineFinished.call(this);","		return;","	}","","	var left       = this.cursor_width * this.cursor_pt.col,","		frame_line = this.frame_lines.item(this.cursor_pt.row);","	this.cursor.setStyles(","	{","		top:  (this.cursor_top + frame_line.get('offsetTop'))+'px',","		left: left + 'px'","	});","","	if (this.spin_index === 0 && left > frame_line.get('offsetLeft'))","	{","		this.spin_index++;","		this.spin_text = frame_line.get('innerHTML').replace(/&nbsp;/g, ' ').split('');","		this.end_text  = this.get('textSequence')[ this.page_index ].lines[ this.cursor_pt.row ].split('');","	}","	else if (0 < this.spin_index && this.spin_index < this.spin_text.length)","	{","		this.spin_index++;","	}","}","","function startSpin()","{","	if (this.bkgd)","	{","		this.spin_handle = this.bkgd.on('spin', updateSpin, this);","	}","	else","	{","		startTimer.call(this, 'spin');","	}","}","","function stopSpin()","{","	if (this.spin_handle)","	{","		this.spin_handle.detach();","		this.spin_handle = null;","	}","	else","	{","		stopTimer.call(this, 'spin');","	}","}","","function updateSpin()","{","	if (this.timer.cursor && this.get('cursor') == 'char')","	{","		var c_range = getCharacterRange.call(this.bkgd || this);","		this.cursor.set('innerHTML', String.fromCharCode(rnd(c_range[0], c_range[1]+1)));","	}","","	if (this.spin_index > 0)","	{","		var frame_line = this.frame_lines.item(this.cursor_pt.row),","			c_range    = getCharacterRange.call(this),","			done       = 0;","","		for (var i=0; i<this.spin_index; i++)","		{","			if (this.spin_text[i] === this.end_text[i])","			{","				done++;","				continue;","			}","","			this.spin_text[i] = String.fromCharCode(rnd(c_range[0], c_range[1]+1));","		}","","		this.spin_count++;","		if (this.spin_count > this.get('maxPhaseCount'))","		{","			this.spin_text = this.end_text.slice(0);","			done           = this.spin_text.length;","		}","","		frame_line.set('innerHTML', this.spin_text.join('').replace(/\\s/g, '&nbsp;'));","","		if (done >= this.spin_text.length)","		{","			stopSpin.call(this);","			checkLineFinished.call(this);","		}","	}","}","","function checkLineFinished()","{","	if (this.timer.cursor || this.spin_handle || this.timer.spin)","	{","		return;","	}","","	if (this.cursor_pt.row >= this.frame_lines.size() - 1)","	{","		scheduleNextPage.call(this);","	}","	else","	{","		startCursor.call(this);","		startSpin.call(this);","	}","}","","function updateCursorAppearance()","{","	var type = this.get('cursor');","	if (type == 'block')","	{","		this.cursor.set('innerHTML', '\\u2588');","	}","	else","	{","		this.cursor.set('innerHTML', '&nbsp;');","	}","","	this.cursor_width = this.cursor.get('offsetWidth');","}","","function resize()	// not using gallery-widget-fillviewport, because we subscribe to windowresize","{","	this.set('width', Y.DOM.winWidth());","	this.set('height', Y.DOM.winHeight());","}","","Y.extend(MatrixCredits, Y.Widget,","{","	initializer: function(config)","	{","		this.on('cursor', updateCursor);","		this.on('spin', updateSpin);","	},","","	destructor: function()","	{","		stopTimer.call(this, 'cursor');","	},","","	bindUI: function()","	{","		// now widget has been inserted into the DOM","","		if (this.get('boundingBox').ancestor() == Y.one('body'))","		{","			resize.call(this);","			Y.on('windowresize', resize, this);","		}","	},","","	syncUI: function()","	{","		// now the size has been applied to bounding box","","		var bkgd = this.get('background');","		if (bkgd)","		{","			var container = this.get('boundingBox');","			container.plug(bkgd, this.get('backgroundConfig'));","			this.bkgd = container.matrix;","		}","","		this.frame = Y.Node.create('<div class=\"frame\"></div>');","		this.get('contentBox').append(this.frame);","","		this.cursor = Y.Node.create('<span class=\"cursor hidden\"></span>');","		this.get('contentBox').append(this.cursor);","		updateCursorAppearance.call(this);","		this.after('cursorChange', updateCursorAppearance);","","		this.page_index = -1;	// incremented by nextPage","		Y.later(this.get('introDelay'), this, nextPage);","	}","});","","Y.MatrixCredits = MatrixCredits;","","","}, '@VERSION@', {\"skinnable\": \"true\", \"requires\": [\"widget\", \"gallery-matrix-background\", \"gallery-funcprog\"]});"];
_yuitest_coverage["build/gallery-matrix-credits/gallery-matrix-credits.js"].lines = {"1":0,"3":0,"22":0,"24":0,"26":0,"29":0,"31":0,"106":0,"139":0,"157":0,"174":0,"180":0,"181":0,"182":0,"184":0,"186":0,"188":0,"189":0,"190":0,"191":0,"194":0,"196":0,"198":0,"199":0,"201":0,"204":0,"206":0,"208":0,"211":0,"213":0,"214":0,"216":0,"218":0,"221":0,"222":0,"223":0,"225":0,"227":0,"228":0,"230":0,"231":0,"232":0,"236":0,"240":0,"242":0,"243":0,"245":0,"246":0,"248":0,"252":0,"253":0,"254":0,"257":0,"259":0,"260":0,"261":0,"264":0,"266":0,"267":0,"269":0,"270":0,"271":0,"274":0,"276":0,"282":0,"284":0,"285":0,"286":0,"288":0,"290":0,"294":0,"296":0,"298":0,"302":0,"306":0,"308":0,"310":0,"311":0,"315":0,"319":0,"321":0,"323":0,"324":0,"327":0,"329":0,"333":0,"335":0,"337":0,"338":0,"341":0,"344":0,"345":0,"347":0,"348":0,"351":0,"353":0,"355":0,"356":0,"361":0,"363":0,"365":0,"368":0,"370":0,"374":0,"375":0,"379":0,"381":0,"382":0,"384":0,"388":0,"391":0,"394":0,"396":0,"397":0,"400":0,"404":0,"405":0,"410":0,"417":0,"419":0,"420":0,"428":0,"429":0,"431":0,"432":0,"433":0,"436":0,"437":0,"439":0,"440":0,"441":0,"442":0,"444":0,"445":0,"449":0};
_yuitest_coverage["build/gallery-matrix-credits/gallery-matrix-credits.js"].functions = {"MatrixCredits:22":0,"validator:104":0,"validator:137":0,"validator:155":0,"scheduleNextPage:186":0,"(anonymous 2):206":0,"(anonymous 3):211":0,"nextPage:194":0,"startCursor:240":0,"stopCursor:257":0,"updateCursor:264":0,"startSpin:294":0,"stopSpin:306":0,"updateSpin:319":0,"checkLineFinished:361":0,"updateCursorAppearance:379":0,"resize:394":0,"initializer:402":0,"destructor:408":0,"bindUI:413":0,"syncUI:424":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-matrix-credits/gallery-matrix-credits.js"].coveredLines = 135;
_yuitest_coverage["build/gallery-matrix-credits/gallery-matrix-credits.js"].coveredFunctions = 22;
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 1);
YUI.add('gallery-matrix-credits', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 3);
"use strict";

/**
 * @module gallery-matrix-credits
 */

// Based on my ancient JMatrixCtrl MFC widget

/**
 * Widget to display text similar to what was used in the credits for The
 * Matrix.  If you render the widget into the body, then it will fill the
 * viewport.  Otherwise, you must specify a width and height for the
 * widget.
 * 
 * @main gallery-matrix-credits
 * @class MatrixCredits
 * @constructor
 * @param config {Object} Widget configuration
 */
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 22);
function MatrixCredits(config)
{
	_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "MatrixCredits", 22);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 24);
this.timer = {};

	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 26);
MatrixCredits.superclass.constructor.call(this, config);
}

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 29);
MatrixCredits.NAME = 'matrixcredits';

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 31);
MatrixCredits.ATTRS =
{
	/**
	 * The sequence of messages to display.  Each item defines `intro`, a
	 * list of strings to display immediately, `lines`, a list of strings
	 * to phase in one at a time, and (optional) `pause`, the number of
	 * milliseconds to wait before continuing to the next item in the
	 * sequence.
	 *
	 * @attribute textSequence
	 * @type {Array}
	 * @required
	 */
	textSequence:
	{
		value:     [],
		validator: Y.Lang.isArray
	},

	/**
	 * Milliseconds to wait before starting the text sequence.
	 *
	 * @attribute introDelay
	 * @type {Number}
	 * @default 5000
	 */
	introDelay:
	{
		value:     5000,
		validator: Y.Lang.isNumber
	},

	/**
	 * Overridden by `pause` values in `textSequence`.
	 *
	 * @attribute pagePause
	 * @type {Number}
	 * @default 2000
	 */
	pagePause:
	{
		value:     2000,
		validator: Y.Lang.isNumber
	},

	/**
	 * Milliseconds to wait before restarting the text sequence.
	 * Overridden by `pause` value of last item in `textSequence`.
	 *
	 * @attribute restartDelay
	 * @type {Number}
	 * @default 5000
	 */
	restartDelay:
	{
		value:     5000,
		validator: Y.Lang.isNumber
	},

	/**
	 * <dl>
	 * <dt>none</dt><dd>Each line is drawn all at once and then begins to phase in.</dd>
	 * <dt>block</dt><dd>The text appears as a block cursor (\u2588) scans across the container.</dd>
	 * <dt>char</dt><dd>The text appears as a randomly changing character scans across the container.</dd>
	 * </dl>
	 *
	 * @attribute cursor
	 * @type {String}
	 * @default "block"
	 */
	cursor:
	{
		value: 'block',
		validator: function(value)
		{
			_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "validator", 104);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 106);
return value == 'none' || value == 'block' || value == 'char';
		}
	},

	/**
	 * The maximum number of iterations before a character is forced to the
	 * final value.  Each character stops changing when it hits the correct value
	 * or exceeds the maximum.  Specify zero to simply display the text.
	 *
	 * @attribute maxPhaseCount
	 * @type {Number}
	 * @default 20
	 */
	maxPhaseCount:
	{
		value:     20,
		validator: Y.Lang.isNumber
	},

	/**
	 * The range of Unicode characters to use for spinning characters.  For
	 * most interesting results, all the characters in textSequence should
	 * be in this range.
	 * 
	 * @attribute charRange
	 * @type {Array}
	 * @default ['!', '~']
	 */
	charRange:
	{
		value: ['!', '~'],
		validator: function(value)
		{
			_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "validator", 137);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 139);
return (Y.Lang.isArray(value) && value.length == 2 &&
					value[0].length == 1 && value[1].length == 1 &&
					value[0] < value[1]);
		}
	},

	/**
	 * @attribute background
	 * @type {Plugin.Base}
	 * @default {MatrixBackground}
	 * @writeonce
	 */
	background:
	{
		value:     Y.Plugin.MatrixBackground,
		writeOnce: true,
		validator: function(value)
		{
			_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "validator", 155);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 157);
return (value === null || (value instanceof Y.Plugin.Base));
		}
	},

	/**
	 * Configuration for Y.MatrixBackground
	 *
	 * @attribute backgroundConfig
	 * @type {Object}
	 * @writeonce
	 */
	backgroundConfig:
	{
		writeOnce: true
	}
};

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 174);
var interval =
	{
		cursor: 30,
		spin:   10	// if possible, background's spin interval is used instead
	};

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 180);
var rnd        = Y.Plugin.MatrixBackground.rnd;
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 181);
var startTimer = Y.Plugin.MatrixBackground.startTimer;
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 182);
var stopTimer  = Y.Plugin.MatrixBackground.stopTimer;

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 184);
var getCharacterRange = Y.Plugin.MatrixBackground.getCharacterRange;

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 186);
function scheduleNextPage()
{
	_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "scheduleNextPage", 186);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 188);
var pages = this.get('textSequence');
	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 189);
var page  = pages[ this.page_index ];
	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 190);
var key   = (this.page_index == pages.length - 1) ? 'restartDelay' : 'pagePause';
	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 191);
Y.later(page.pause || this.get(key), this, nextPage);
}

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 194);
function nextPage()
{
	_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "nextPage", 194);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 196);
var pages = this.get('textSequence');

	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 198);
this.page_index++;
	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 199);
if (this.page_index >= pages.length)
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 201);
this.page_index = 0;
	}

	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 204);
var page = pages[ this.page_index ];

	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 206);
var intro = Y.reduce(page.intro || [], '', function(s, line)
	{
		_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "(anonymous 2)", 206);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 208);
return s + '<p>' + (line || '&nbsp;') + '</p>';
	});

	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 211);
var lines = Y.reduce(page.lines || [], '', function(s, line)
	{
		_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "(anonymous 3)", 211);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 213);
s += '<p><span>';
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 214);
for (var i=0; i<line.length; i++)
		{
			_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 216);
s += '&nbsp;';
		}
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 218);
return s + '</span></p>';
	});

	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 221);
this.frame.setContent(intro + lines);
	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 222);
this.frame_top = Math.floor((this.get('height') - this.frame.totalHeight())/2);
	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 223);
this.frame.setStyle('top', this.frame_top + 'px')

	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 225);
if (page.lines)
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 227);
this.frame_lines = this.frame.all('span');
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 228);
this.cursor_pt   = { row: -1, col: -1 };

		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 230);
this.cursor_top = this.frame_top - this.frame.totalHeight();
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 231);
startCursor.call(this);
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 232);
startSpin.call(this);
	}
	else
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 236);
scheduleNextPage.call(this);
	}
}

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 240);
function startCursor()
{
	_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "startCursor", 240);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 242);
this.cursor.removeClass('hidden');
	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 243);
startTimer.call(this, 'cursor');

	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 245);
var lines = this.get('textSequence')[ this.page_index ].lines;
	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 246);
do
		{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 248);
this.cursor_pt.row++;
		}while (lines[ this.cursor_pt.row ] == '&nbsp;');

	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 252);
this.cursor_pt.col = -1;
	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 253);
this.spin_index    = 0;
	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 254);
this.spin_count    = 0;
}

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 257);
function stopCursor()
{
	_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "stopCursor", 257);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 259);
this.cursor.addClass('hidden');
	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 260);
this.cursor.setStyles({ top: 0, left: 0 });
	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 261);
stopTimer.call(this, 'cursor');
}

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 264);
function updateCursor()
{
	_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "updateCursor", 264);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 266);
this.cursor_pt.col++;
	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 267);
if (parseInt(this.cursor.getStyle('left'), 10) > this.get('width'))
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 269);
stopCursor.call(this);
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 270);
checkLineFinished.call(this);
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 271);
return;
	}

	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 274);
var left       = this.cursor_width * this.cursor_pt.col,
		frame_line = this.frame_lines.item(this.cursor_pt.row);
	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 276);
this.cursor.setStyles(
	{
		top:  (this.cursor_top + frame_line.get('offsetTop'))+'px',
		left: left + 'px'
	});

	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 282);
if (this.spin_index === 0 && left > frame_line.get('offsetLeft'))
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 284);
this.spin_index++;
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 285);
this.spin_text = frame_line.get('innerHTML').replace(/&nbsp;/g, ' ').split('');
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 286);
this.end_text  = this.get('textSequence')[ this.page_index ].lines[ this.cursor_pt.row ].split('');
	}
	else {_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 288);
if (0 < this.spin_index && this.spin_index < this.spin_text.length)
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 290);
this.spin_index++;
	}}
}

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 294);
function startSpin()
{
	_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "startSpin", 294);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 296);
if (this.bkgd)
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 298);
this.spin_handle = this.bkgd.on('spin', updateSpin, this);
	}
	else
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 302);
startTimer.call(this, 'spin');
	}
}

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 306);
function stopSpin()
{
	_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "stopSpin", 306);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 308);
if (this.spin_handle)
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 310);
this.spin_handle.detach();
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 311);
this.spin_handle = null;
	}
	else
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 315);
stopTimer.call(this, 'spin');
	}
}

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 319);
function updateSpin()
{
	_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "updateSpin", 319);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 321);
if (this.timer.cursor && this.get('cursor') == 'char')
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 323);
var c_range = getCharacterRange.call(this.bkgd || this);
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 324);
this.cursor.set('innerHTML', String.fromCharCode(rnd(c_range[0], c_range[1]+1)));
	}

	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 327);
if (this.spin_index > 0)
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 329);
var frame_line = this.frame_lines.item(this.cursor_pt.row),
			c_range    = getCharacterRange.call(this),
			done       = 0;

		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 333);
for (var i=0; i<this.spin_index; i++)
		{
			_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 335);
if (this.spin_text[i] === this.end_text[i])
			{
				_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 337);
done++;
				_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 338);
continue;
			}

			_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 341);
this.spin_text[i] = String.fromCharCode(rnd(c_range[0], c_range[1]+1));
		}

		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 344);
this.spin_count++;
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 345);
if (this.spin_count > this.get('maxPhaseCount'))
		{
			_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 347);
this.spin_text = this.end_text.slice(0);
			_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 348);
done           = this.spin_text.length;
		}

		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 351);
frame_line.set('innerHTML', this.spin_text.join('').replace(/\s/g, '&nbsp;'));

		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 353);
if (done >= this.spin_text.length)
		{
			_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 355);
stopSpin.call(this);
			_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 356);
checkLineFinished.call(this);
		}
	}
}

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 361);
function checkLineFinished()
{
	_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "checkLineFinished", 361);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 363);
if (this.timer.cursor || this.spin_handle || this.timer.spin)
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 365);
return;
	}

	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 368);
if (this.cursor_pt.row >= this.frame_lines.size() - 1)
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 370);
scheduleNextPage.call(this);
	}
	else
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 374);
startCursor.call(this);
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 375);
startSpin.call(this);
	}
}

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 379);
function updateCursorAppearance()
{
	_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "updateCursorAppearance", 379);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 381);
var type = this.get('cursor');
	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 382);
if (type == 'block')
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 384);
this.cursor.set('innerHTML', '\u2588');
	}
	else
	{
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 388);
this.cursor.set('innerHTML', '&nbsp;');
	}

	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 391);
this.cursor_width = this.cursor.get('offsetWidth');
}

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 394);
function resize()	// not using gallery-widget-fillviewport, because we subscribe to windowresize
{
	_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "resize", 394);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 396);
this.set('width', Y.DOM.winWidth());
	_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 397);
this.set('height', Y.DOM.winHeight());
}

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 400);
Y.extend(MatrixCredits, Y.Widget,
{
	initializer: function(config)
	{
		_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "initializer", 402);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 404);
this.on('cursor', updateCursor);
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 405);
this.on('spin', updateSpin);
	},

	destructor: function()
	{
		_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "destructor", 408);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 410);
stopTimer.call(this, 'cursor');
	},

	bindUI: function()
	{
		// now widget has been inserted into the DOM

		_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "bindUI", 413);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 417);
if (this.get('boundingBox').ancestor() == Y.one('body'))
		{
			_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 419);
resize.call(this);
			_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 420);
Y.on('windowresize', resize, this);
		}
	},

	syncUI: function()
	{
		// now the size has been applied to bounding box

		_yuitest_coverfunc("build/gallery-matrix-credits/gallery-matrix-credits.js", "syncUI", 424);
_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 428);
var bkgd = this.get('background');
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 429);
if (bkgd)
		{
			_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 431);
var container = this.get('boundingBox');
			_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 432);
container.plug(bkgd, this.get('backgroundConfig'));
			_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 433);
this.bkgd = container.matrix;
		}

		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 436);
this.frame = Y.Node.create('<div class="frame"></div>');
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 437);
this.get('contentBox').append(this.frame);

		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 439);
this.cursor = Y.Node.create('<span class="cursor hidden"></span>');
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 440);
this.get('contentBox').append(this.cursor);
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 441);
updateCursorAppearance.call(this);
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 442);
this.after('cursorChange', updateCursorAppearance);

		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 444);
this.page_index = -1;	// incremented by nextPage
		_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 445);
Y.later(this.get('introDelay'), this, nextPage);
	}
});

_yuitest_coverline("build/gallery-matrix-credits/gallery-matrix-credits.js", 449);
Y.MatrixCredits = MatrixCredits;


}, '@VERSION@', {"skinnable": "true", "requires": ["widget", "gallery-matrix-background", "gallery-funcprog"]});
