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
_yuitest_coverage["build/gallery-console-test/gallery-console-test.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-console-test/gallery-console-test.js",
    code: []
};
_yuitest_coverage["build/gallery-console-test/gallery-console-test.js"].code=["YUI.add('gallery-console-test', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-console-test"," */","","/**********************************************************************"," * <p>Adds a menu of registered unit test suites to the YUI 3 Console.</p>"," *"," * @main gallery-console-test"," * @class ConsoleTest"," * @namespace Plugin"," * @extends Plugin.Base"," */","","function ConsoleTest(config)","{","	ConsoleTest.superclass.constructor.call(this, config);","}","","ConsoleTest.NAME = \"ConsoleTestPlugin\";","ConsoleTest.NS   = \"test\";","","function updateMenu(menu)","{","	var options    = Y.Node.getDOMNode(menu);","	options.length = 0;","","	options[0] = new Option('All tests', -1);","","	Y.Array.each(Y.Test.Runner.masterSuite.items, function(t, i)","	{","		options[i+1] = new Option(t.name, i);","	});","}","","Y.extend(ConsoleTest, Y.Plugin.Base,","{","	initializer: function(config)","	{","		this.doAfter('renderUI', this.renderUI);","","		if (this.get('host').get('rendered'))","		{","			this.renderUI();","		}","	},","","	destructor: function()","	{","		this.container.remove(true);","	},","","	renderUI: function()","	{","		var ft = this.get('host').get('contentBox').one('.'+Y.Console.CHROME_CLASSES.console_ft_class);","		if (ft)","		{","			this.container = Y.Node.create(","				Y.Lang.sub(","					'<div class=\"{c}\">' +","						'<select class=\"menu\"></select>' +","						'<button class=\"run\">{b1}</button>' +","						'<button class=\"refresh\">{b2}</button>' +","					'</div>',","				{","					c:  Y.ClassNameManager.getClassName('console', 'test', 'container'),","					b1: 'Run',","					b2: 'Refresh'","				}));","","			var menu = this.container.one('select');","			updateMenu(menu);","","			this.container.one('button.run').on('click', function()","			{","				var i = menu.get('value');","				if (i >= 0)","				{","					var tests = Y.Test.Runner.masterSuite.items;","					Y.Test.Runner.clear();","					Y.Test.Runner.add(tests[i]);","","					var h = Y.Test.Runner.on('complete', function()","					{","						h.detach();","						Y.Test.Runner.clear();","						Y.Array.each(tests, function(t)","						{","							Y.Test.Runner.add(t);","						});","					});","				}","","				Y.Test.Runner.run();","			});","","			this.container.one('button.refresh').on('click', function()","			{","				updateMenu(menu);","			});","","			var n1 = ft.one('.'+Y.Console.CHROME_CLASSES.console_controls_class);","			var n2 = n1.get('nextSibling');","			if (n2)","			{","				ft.insertBefore(this.container, n2);","			}","			else","			{","				ft.appendChild(this.container);","			}","		}","	}","});","","Y.namespace(\"Plugin\");","Y.Plugin.ConsoleTest = ConsoleTest;","","","}, '@VERSION@', {\"skinnable\": \"true\", \"requires\": [\"console\", \"plugin\", \"test\"]});"];
_yuitest_coverage["build/gallery-console-test/gallery-console-test.js"].lines = {"1":0,"3":0,"18":0,"20":0,"23":0,"24":0,"26":0,"28":0,"29":0,"31":0,"33":0,"35":0,"39":0,"43":0,"45":0,"47":0,"53":0,"58":0,"59":0,"61":0,"74":0,"75":0,"77":0,"79":0,"80":0,"82":0,"83":0,"84":0,"86":0,"88":0,"89":0,"90":0,"92":0,"97":0,"100":0,"102":0,"105":0,"106":0,"107":0,"109":0,"113":0,"119":0,"120":0};
_yuitest_coverage["build/gallery-console-test/gallery-console-test.js"].functions = {"ConsoleTest:18":0,"(anonymous 2):33":0,"updateMenu:26":0,"initializer:41":0,"destructor:51":0,"(anonymous 5):90":0,"(anonymous 4):86":0,"(anonymous 3):77":0,"(anonymous 6):100":0,"renderUI:56":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-console-test/gallery-console-test.js"].coveredLines = 43;
_yuitest_coverage["build/gallery-console-test/gallery-console-test.js"].coveredFunctions = 11;
_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 1);
YUI.add('gallery-console-test', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-console-test/gallery-console-test.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 3);
"use strict";

/**
 * @module gallery-console-test
 */

/**********************************************************************
 * <p>Adds a menu of registered unit test suites to the YUI 3 Console.</p>
 *
 * @main gallery-console-test
 * @class ConsoleTest
 * @namespace Plugin
 * @extends Plugin.Base
 */

_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 18);
function ConsoleTest(config)
{
	_yuitest_coverfunc("build/gallery-console-test/gallery-console-test.js", "ConsoleTest", 18);
_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 20);
ConsoleTest.superclass.constructor.call(this, config);
}

_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 23);
ConsoleTest.NAME = "ConsoleTestPlugin";
_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 24);
ConsoleTest.NS   = "test";

_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 26);
function updateMenu(menu)
{
	_yuitest_coverfunc("build/gallery-console-test/gallery-console-test.js", "updateMenu", 26);
_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 28);
var options    = Y.Node.getDOMNode(menu);
	_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 29);
options.length = 0;

	_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 31);
options[0] = new Option('All tests', -1);

	_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 33);
Y.Array.each(Y.Test.Runner.masterSuite.items, function(t, i)
	{
		_yuitest_coverfunc("build/gallery-console-test/gallery-console-test.js", "(anonymous 2)", 33);
_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 35);
options[i+1] = new Option(t.name, i);
	});
}

_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 39);
Y.extend(ConsoleTest, Y.Plugin.Base,
{
	initializer: function(config)
	{
		_yuitest_coverfunc("build/gallery-console-test/gallery-console-test.js", "initializer", 41);
_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 43);
this.doAfter('renderUI', this.renderUI);

		_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 45);
if (this.get('host').get('rendered'))
		{
			_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 47);
this.renderUI();
		}
	},

	destructor: function()
	{
		_yuitest_coverfunc("build/gallery-console-test/gallery-console-test.js", "destructor", 51);
_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 53);
this.container.remove(true);
	},

	renderUI: function()
	{
		_yuitest_coverfunc("build/gallery-console-test/gallery-console-test.js", "renderUI", 56);
_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 58);
var ft = this.get('host').get('contentBox').one('.'+Y.Console.CHROME_CLASSES.console_ft_class);
		_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 59);
if (ft)
		{
			_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 61);
this.container = Y.Node.create(
				Y.Lang.sub(
					'<div class="{c}">' +
						'<select class="menu"></select>' +
						'<button class="run">{b1}</button>' +
						'<button class="refresh">{b2}</button>' +
					'</div>',
				{
					c:  Y.ClassNameManager.getClassName('console', 'test', 'container'),
					b1: 'Run',
					b2: 'Refresh'
				}));

			_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 74);
var menu = this.container.one('select');
			_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 75);
updateMenu(menu);

			_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 77);
this.container.one('button.run').on('click', function()
			{
				_yuitest_coverfunc("build/gallery-console-test/gallery-console-test.js", "(anonymous 3)", 77);
_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 79);
var i = menu.get('value');
				_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 80);
if (i >= 0)
				{
					_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 82);
var tests = Y.Test.Runner.masterSuite.items;
					_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 83);
Y.Test.Runner.clear();
					_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 84);
Y.Test.Runner.add(tests[i]);

					_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 86);
var h = Y.Test.Runner.on('complete', function()
					{
						_yuitest_coverfunc("build/gallery-console-test/gallery-console-test.js", "(anonymous 4)", 86);
_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 88);
h.detach();
						_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 89);
Y.Test.Runner.clear();
						_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 90);
Y.Array.each(tests, function(t)
						{
							_yuitest_coverfunc("build/gallery-console-test/gallery-console-test.js", "(anonymous 5)", 90);
_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 92);
Y.Test.Runner.add(t);
						});
					});
				}

				_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 97);
Y.Test.Runner.run();
			});

			_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 100);
this.container.one('button.refresh').on('click', function()
			{
				_yuitest_coverfunc("build/gallery-console-test/gallery-console-test.js", "(anonymous 6)", 100);
_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 102);
updateMenu(menu);
			});

			_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 105);
var n1 = ft.one('.'+Y.Console.CHROME_CLASSES.console_controls_class);
			_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 106);
var n2 = n1.get('nextSibling');
			_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 107);
if (n2)
			{
				_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 109);
ft.insertBefore(this.container, n2);
			}
			else
			{
				_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 113);
ft.appendChild(this.container);
			}
		}
	}
});

_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 119);
Y.namespace("Plugin");
_yuitest_coverline("build/gallery-console-test/gallery-console-test.js", 120);
Y.Plugin.ConsoleTest = ConsoleTest;


}, '@VERSION@', {"skinnable": "true", "requires": ["console", "plugin", "test"]});
