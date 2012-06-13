YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Accordion",
        "ArrayIterator",
        "ArrayList~extras",
        "Array~algorithms",
        "Array~funcprog-extras",
        "Array~object-extras",
        "Assert",
        "AtLeastOneCheckboxGroup",
        "AtMostOneCheckboxGroup",
        "BulkEditor",
        "Canvas.Context2d",
        "CheckboxGroup",
        "Chipper",
        "ComplexMath",
        "ComplexNumber",
        "DataSource.AsyncFunction",
        "DataSource.BulkEdit",
        "DataSource.Treeble",
        "DateTimeUtils",
        "EnableIfAnyCheckboxGroup",
        "ExpirationCache",
        "ExpressionBuilder",
        "FormManager",
        "HTMLTableBulkEditor",
        "InstanceManager",
        "Iterable",
        "LinkedList",
        "LinkedListItem",
        "LinkedListIterator",
        "MRUCache",
        "Math",
        "MathCanvas",
        "MathCanvas.Parser",
        "MathCanvas.RectList",
        "MathFunction",
        "MathFunction.Arccosine",
        "MathFunction.Arcsine",
        "MathFunction.Arctangent",
        "MathFunction.Arctangent2",
        "MathFunction.Conjugate",
        "MathFunction.Cosine",
        "MathFunction.E",
        "MathFunction.Exponential",
        "MathFunction.FunctionWithArgs",
        "MathFunction.HyperbolicCosine",
        "MathFunction.HyperbolicSine",
        "MathFunction.HyperbolicTangent",
        "MathFunction.I",
        "MathFunction.ImaginaryPart",
        "MathFunction.InverseHyperbolicCosine",
        "MathFunction.InverseHyperbolicSine",
        "MathFunction.InverseHyperbolicTangent",
        "MathFunction.Logarithm",
        "MathFunction.Magnitude",
        "MathFunction.Max",
        "MathFunction.Min",
        "MathFunction.NaturalLog",
        "MathFunction.Negate",
        "MathFunction.Phase",
        "MathFunction.Pi",
        "MathFunction.Product",
        "MathFunction.Quotient",
        "MathFunction.RealPart",
        "MathFunction.Rotate",
        "MathFunction.Sine",
        "MathFunction.SquareRoot",
        "MathFunction.Sum",
        "MathFunction.Tangent",
        "MathFunction.Value",
        "MathFunction.Variable",
        "MatrixBackground",
        "MatrixCredits",
        "MultiObject",
        "NodeList~extras2",
        "Node~dimensions",
        "Node~event-set",
        "Node~optimizations",
        "Node~scrollIntoView",
        "Object~extras",
        "PageLayout",
        "Paginator",
        "Paginator.ui.CurrentPageInput",
        "Paginator.ui.CurrentPageReport",
        "Paginator.ui.FirstPageLink",
        "Paginator.ui.ItemRangeDropdown",
        "Paginator.ui.LastPageLink",
        "Paginator.ui.NextPageLink",
        "Paginator.ui.PageLinks",
        "Paginator.ui.PreviousPageLink",
        "Paginator.ui.RowsPerPageDropdown",
        "Paginator.ui.ValidationPageLinks",
        "Parsers",
        "Plugin.BusyOverlay",
        "Plugin.ConsoleTest",
        "Plugin.DataTableQuickEdit",
        "Plugin.DataTableRowExpansion",
        "Plugin.DataTableState",
        "Plugin.FixedSizeAccordion",
        "Plugin.InputCalendarSync",
        "Plugin.Neon",
        "Plugin.OverlayForm",
        "Plugin.PageLayoutDataTableModule",
        "QueryBuilder",
        "QueryBuilder.Select",
        "QueryBuilder.String",
        "RPC.Mojito",
        "SelectAllCheckboxGroup",
        "Sort",
        "Treeble",
        "YUI~funcprog",
        "io~multiresponse"
    ],
    "modules": [
        "gallery-accordion-horiz-vert",
        "gallery-algorithms",
        "gallery-anim-class",
        "gallery-bulkedit",
        "gallery-busyoverlay",
        "gallery-canvas",
        "gallery-checkboxgroups",
        "gallery-chipper",
        "gallery-complexnumber",
        "gallery-console-test",
        "gallery-datasource-async-function",
        "gallery-datatable-row-expansion",
        "gallery-datatable-state",
        "gallery-datetime-utils",
        "gallery-dimensions",
        "gallery-expiration-cache",
        "gallery-exprbuilder",
        "gallery-formmgr",
        "gallery-formmgr-css-validation",
        "gallery-formmgr-overlay-plugin",
        "gallery-funcprog",
        "gallery-input-calendar-sync",
        "gallery-instancemanager",
        "gallery-io-multiresponse",
        "gallery-iterable-extras",
        "gallery-layout",
        "gallery-layout-cols",
        "gallery-layout-datatable",
        "gallery-layout-rows",
        "gallery-linkedlist",
        "gallery-math",
        "gallery-mathcanvas",
        "gallery-matrix-background",
        "gallery-matrix-credits",
        "gallery-mojito-rpc",
        "gallery-mru-cache",
        "gallery-multiobject",
        "gallery-neon",
        "gallery-node-event-set",
        "gallery-node-optimizations",
        "gallery-nodelist-extras2",
        "gallery-object-extras",
        "gallery-paginator",
        "gallery-querybuilder",
        "gallery-quickedit",
        "gallery-scrollintoview",
        "gallery-sort-extras",
        "gallery-test-extras",
        "gallery-treeble"
    ],
    "allModules": [
        {
            "displayName": "gallery-accordion-horiz-vert",
            "name": "gallery-accordion-horiz-vert",
            "description": "Widget to manage an accordion, either horizontally or vertically.\nAllows either multiple open sections or only a single open section.\nProvides option to always force at least one item to be open."
        },
        {
            "displayName": "gallery-algorithms",
            "name": "gallery-algorithms",
            "description": "<p>Useful algorithms not provided by browsers.</p>"
        },
        {
            "displayName": "gallery-anim-class",
            "name": "gallery-anim-class",
            "description": "<p>Adds CSS class animation to `Y.Anim`, so you can specify `cssClass`\nin `from` and/or `to`.  At the end of the animation, the `from` class is\nreplaced by the `to` class, and all the individual styles used during\nthe animation are removed.</p>\n\n<p>Explicit entries in `from` or `to` override values set by cssClass.</p>"
        },
        {
            "displayName": "gallery-bulkedit",
            "name": "gallery-bulkedit",
            "description": "A widget for editing many records at once."
        },
        {
            "displayName": "gallery-busyoverlay",
            "name": "gallery-busyoverlay",
            "description": "A plugin for Y.Node or Y.Widget that creates an overlaying div.\nEspecially useful for a widget that is waiting for an AJAX response."
        },
        {
            "displayName": "gallery-canvas",
            "name": "gallery-canvas",
            "description": "<p>Wrapper for a canvas 2d context.  It exposes the exact same api as\nthe native 2d context, plus some extras, documented below.  Just like\nY.Node, use get() and set() to modify attributes.</p>"
        },
        {
            "displayName": "gallery-checkboxgroups",
            "name": "gallery-checkboxgroups",
            "description": "Various behaviors that can be attached to a group of checkboxes."
        },
        {
            "displayName": "gallery-chipper",
            "name": "gallery-chipper",
            "description": "<p>Destroys objects asynchronously.</p>"
        },
        {
            "displayName": "gallery-complexnumber",
            "name": "gallery-complexnumber",
            "description": "Support for complex numbers."
        },
        {
            "displayName": "gallery-console-test",
            "name": "gallery-console-test",
            "description": "<p>Adds a menu of registered unit test suites to the YUI 3 Console.</p>"
        },
        {
            "displayName": "gallery-datasource-async-function",
            "name": "gallery-datasource-async-function",
            "description": "<p>Data source that calls an asynchronous function.</p>"
        },
        {
            "displayName": "gallery-datatable-row-expansion",
            "name": "gallery-datatable-row-expansion",
            "description": "<p>Plugin for DataTable to show additional information for each row via\na twistdown.  The result of the template is displayed spanning all the\ncolumns beyond the twistdown column.</p>\n\n<p>This class patches `getCell` and `getRow` to ignore the additional\nrows created by this plugin.</p>"
        },
        {
            "displayName": "gallery-datatable-state",
            "name": "gallery-datatable-state",
            "description": "<p>Plugin for DataTable to preserve state, either on a single page or\nacross pages.</p>"
        },
        {
            "displayName": "gallery-datetime-utils",
            "name": "gallery-datetime-utils",
            "description": "Utility functions work working with dates and times."
        },
        {
            "displayName": "gallery-dimensions",
            "name": "gallery-dimensions",
            "description": "Functions for measuring the size of a node."
        },
        {
            "displayName": "gallery-expiration-cache",
            "name": "gallery-expiration-cache",
            "description": "<p>Cache which drops items based on a user-defined expiration criterion,\ne.g., age.  By default, expired items are only removed when they are\nrequested.  If you want to \"stop the world\" and clean out the cache,\ncall clean().</p>"
        },
        {
            "displayName": "gallery-exprbuilder",
            "name": "gallery-exprbuilder",
            "description": "Widget which helps user to build a query expression."
        },
        {
            "displayName": "gallery-formmgr",
            "name": "gallery-formmgr",
            "description": "<p>FormManager provides support for initializing a form, pre-validating\nuser input, and displaying messages returned by the server.</p>\n\n<p>Also see the documentation for gallery-formmgr-css-validation.</p>"
        },
        {
            "displayName": "gallery-formmgr-css-validation",
            "name": "gallery-formmgr-css-validation",
            "description": "<p>FormManager CSS Validation provides basic functionality for\npre-validating user input based on CSS classes set on form elements.</p>\n\n<p>The following classes can be applied to a form element for\npre-validation:</p>\n\n<dl>\n<dt><code>yiv-required</code></dt>\n<dd>Value must not be empty.</dd>\n\n<dt><code>yiv-length:[x,y]</code></dt>\n<dd>String must be at least x characters and at most y characters.\nAt least one of x and y must be specified.</dd>\n\n<dt><code>yiv-integer:[x,y]</code></dt>\n<dd>The integer value must be at least x and at most y.\nx and y are both optional.</dd>\n\n<dt><code>yiv-decimal:[x,y]</code></dt>\n<dd>The decimal value must be at least x and at most y.  Exponents are\nnot allowed.  x and y are both optional.</dd>\n</dl>\n\n<p>If we ever need to allow exponents, we can use yiv-float.</p>"
        },
        {
            "displayName": "gallery-formmgr-overlay-plugin",
            "name": "gallery-formmgr-overlay-plugin",
            "description": "A simple plugin for Y.Overlay which attaches a Y.FormManager to the\n&lt;form&gt; inside the overlay.  Before the overlay is shown,\nprepareForm() is called to insert the default values.  (If this returns\nfalse, the overlay is not shown.)  After the overlay is shown, focus is\nset to the first field."
        },
        {
            "displayName": "gallery-funcprog",
            "name": "gallery-funcprog",
            "description": "<p>Augments global Y object with the same higher-order functions that\narray-extras adds to Y.Array.  Note that, unlike arrays and NodeLists,\niteration order for an object is arbitrary, so be careful when applying\nnon-commutative operations!</p>"
        },
        {
            "displayName": "gallery-input-calendar-sync",
            "name": "gallery-input-calendar-sync",
            "description": "Plugin for an input field which syncs the value with a calendar."
        },
        {
            "displayName": "gallery-instancemanager",
            "name": "gallery-instancemanager",
            "description": "<p>Stores instances of JavaScript components.  Allows a constructor or\nfactory method to be passed in place of an instance.  This enables lazy\nconstruction on demand.</p>\n\n<p>One use is to create a global repository of JavaScript components\nattached to DOM id's, e.g., YUI Buttons built on top of HTML\nbuttons.</p>"
        },
        {
            "displayName": "gallery-io-multiresponse",
            "name": "gallery-io-multiresponse",
            "description": "<p>Extends the IO base class to enable multiple responses using an\niframe as the transport medium.</p>"
        },
        {
            "displayName": "gallery-iterable-extras",
            "name": "gallery-iterable-extras",
            "description": "<p>Functional programming support for iterable classes.  The class must\nimplement the `iterator` and `newInstance` methods.</p>\n\n<p>For most methods, the iterator only needs to implement `next` and\n`atEnd`.  Backwards iterators like `reduceRight` require `prev` and\n`atBeginning`.</p>\n\n<p>Iterable classes must mix these functions:  `Y.mix(SomeClass,\nY.Iterable, false, null, 4);`  Passing false as the third argument\nallows your class to provide optimized implementations of individual\nfunctions.</p>"
        },
        {
            "displayName": "gallery-layout",
            "name": "gallery-layout",
            "description": "Provides fluid layout for the content on a page."
        },
        {
            "displayName": "gallery-layout-cols",
            "name": "gallery-layout-cols",
            "description": "PageLayout plugin for managing horizontally stacked columns on a page,\nsandwiched vertically between header and footer.  Each column contains\none or more modules."
        },
        {
            "displayName": "gallery-layout-datatable",
            "name": "gallery-layout-datatable",
            "description": "<p>Plugin for scrolling DataTable to make it fit inside a PageLayout\nmodule.  After you plug it in, it automatically detects the PageLayout\nmodule, so you don't have to do anything.</p>"
        },
        {
            "displayName": "gallery-layout-rows",
            "name": "gallery-layout-rows",
            "description": "PageLayout plugin for managing vertically stacked rows on a page,\nsandwiched vertically between header and footer.  Each row contains one\nor more modules."
        },
        {
            "displayName": "gallery-linkedlist",
            "name": "gallery-linkedlist",
            "description": "<p>Doubly linked list for storing items.  Supports iteration via\nLinkedListIterator (returned by this.iterator()) or Y.each().  Also\nsupports all the other operations defined in gallery-funcprog.</p>\n\n<p>Direct indexing into the list is not supported, as a reminder that it\nis an expensive operation.  Instead, use find() with a function that\nchecks the index.</p>"
        },
        {
            "displayName": "gallery-math",
            "name": "gallery-math",
            "description": "<p>Augments built-in JavaScript Math namespace with additional\nmathematical functions.</p>"
        },
        {
            "displayName": "gallery-mathcanvas",
            "name": "gallery-mathcanvas",
            "description": "Displays an arithmetical expression the way you would write it on paper."
        },
        {
            "displayName": "gallery-matrix-background",
            "name": "gallery-matrix-background",
            "description": "Node plugin to display falling text similar to what was used in the\ncredits for The Matrix.  If you plug into the body element, then it will\nfill the viewport.  Otherwise, you must set a width and height for the\nnode."
        },
        {
            "displayName": "gallery-matrix-credits",
            "name": "gallery-matrix-credits",
            "description": "Widget to display text similar to what was used in the credits for The\nMatrix.  If you render the widget into the body, then it will fill the\nviewport.  Otherwise, you must specify a width and height for the\nwidget."
        },
        {
            "displayName": "gallery-mojito-rpc",
            "name": "gallery-mojito-rpc",
            "description": "<p>RPC wrapper for Mojit proxy.  This allows you to use either\nY.RPC.JSON or Y.RPC.Mojito interchangeably.  The method in the Mojit\nproxy receives the parameters as an array in <code>body.params</code>.\nYou can pass this to the model as follows:\n<code>model.getItems.apply(model,\nac.params.getFromBody().params)</code></p>"
        },
        {
            "displayName": "gallery-mru-cache",
            "name": "gallery-mru-cache",
            "description": "<p>Cache which drops items based on \"most recently used.\"  Items are\ndropped when a user-defined criterion is exceeded, e.g., total size or\nnumber of items.</p>\n\n<p>The items are stored in a map of {data,mru_item_ref}.  The MRU items\nare stored in a doubly linked list (which stores the map keys) to allow\neasy re-ordering and dropping of items.  Every cache hit moves the\nassociated MRU item to the front of the list.</p>"
        },
        {
            "displayName": "gallery-multiobject",
            "name": "gallery-multiobject",
            "description": "<p>MultiObject exposes exactly the same API as each individual object,\nboth functions and events, and the state of all the objects is kept in\nsync.  The objects must maintain all state via\nY.Attribute.<p>\n\n<p>MultiObject is similar to Y.ArrayList, except:</p>\n<ul>\n<li>All objects must be of the same type, since MultiObject is supposed\n\t\tto behave exactly like any single object.</li>\n<li>MultiObject automatically delegates all methods.</li>\n<li>By default, MultiObject returns the result from the first object\n\t\tin the list, not an array of results.</li>\n<li>MultiObject propagates all events.</li>\n</ul>\n\n<p>Internally, MultiObject delegates all methods by name, so it supports\nY.Do.before, Y.Do.after, etc.</p>\n\n<p>To avoid shadowing potential function names, we inherit from\nY.EventTarget and use multi_ as the prefix for our own functions.</p>"
        },
        {
            "displayName": "gallery-neon",
            "name": "gallery-neon",
            "description": "Overrides Y.Node.show() to make it look like a flickering neon sign."
        },
        {
            "displayName": "gallery-node-event-set",
            "name": "gallery-node-event-set",
            "description": "Patches Y.Node to provide \"set\" events for attributes and styles similar\nto the \"change\" events provided by `Y.Attribute`.  Simply subscribe to\n_attr_Set or _style_Set, e.g., valueSet, z-indexSet, or classSet.\n\nIMPORTANT: \"set\" events will ONLY fire if changes are made through\nY.Node, NOT when directly operating on the DOM element.  Also NOT when a\ndifferent sandbox operates on a separate Y.Node instance for the same\nelement.\n\nNote: The valuechange event provided by YUI captures all changes to the\nelement's value attribute, but only when the element has focus.\n\nTo minimize the performance impact, this module initially overrides only\nY.Node.on().  Patches are then applied to the appropriate functions on\nindividual instances when a \"set\" event is requested.\n\n<dl>\n<dt>set, setAttrs, setAttribute, setStyle, setStyles</dt>\n<dd>Fires _attr_Set or _style_Set event with prevVal, newVal.</dd>\n<dt>setData,clearData</dt>\n<dd>Fires dataSet event with dataKey, prevVal, newVal.</dd>\n<dt>addClass, removeClass, replaceClass</dt>\n<dd>Fires classNameSet event with prevVal, newVal -- consistent with set('className', ...).  Also includes addedClass or removedClass, as appropriate.</dd>\n<dt>setX, setY, setXY</dt>\n<dd>Fires xySet event with prevVal and newVal defining x, y, or both.</dd>"
        },
        {
            "displayName": "gallery-node-optimizations",
            "name": "gallery-node-optimizations",
            "description": "Optimizations for searching DOM tree."
        },
        {
            "displayName": "gallery-nodelist-extras2",
            "name": "gallery-nodelist-extras2",
            "description": "<p>Augments Y.NodeList with the same higher-order functions that\narray-extras adds to Y.Array.</p>"
        },
        {
            "displayName": "gallery-object-extras",
            "name": "gallery-object-extras",
            "description": "<p>Augments Y.Object with the same higher-order functions that\narray-extras adds to Y.Array.  Note that, unlike Y.Array, iteration\norder for objects is arbitrary, so be careful when applying\nnon-commutative operations!</p>"
        },
        {
            "displayName": "gallery-paginator",
            "name": "gallery-paginator"
        },
        {
            "displayName": "gallery-querybuilder",
            "name": "gallery-querybuilder",
            "description": "Widget which allows user to build a list of query criteria, e.g., for\nsearching.  All the conditions are either AND'ed or OR'ed.  For a more\ngeneral query builder, see gallery-exprbuilder."
        },
        {
            "displayName": "gallery-quickedit",
            "name": "gallery-quickedit",
            "description": "<p>The QuickEdit plugin provides a new mode for DataTable where all\nvalues in the table can be edited simultaneously, controlled by the\ncolumn configuration.  Each editable cell contains an input field.  If\nthe user decides to save the changes, then you can extract the changed\nvalues by calling <code><i>dt</i>.qe.getChanges()</code>.</p>\n\n<p>For a column to be editable in QuickEdit mode, the column\nconfiguration must include <code>quickEdit</code>.  The contents of\nthis object define the column's behavior in QuickEdit mode.</p>\n\n<p>To move up or down within a column while in QuickEdit mode, hold down\nthe Ctrl key and press the up or down arrow.</p>\n\n<p>If a column should not be editable, but needs to be formatted\ndifferently in QuickEdit mode, then you must define qeFormatter in\nthe column configuration. This is simply a normal cell formatter\nfunction that will be used in QuickEdit mode.  The static functions\n<code>readonly*Formatter</code> provide examples.</p>\n\n<p>The following configuration can be provided as part of\nquickEdit:</p>\n\n<dl>\n\n<dt>changed</dt><dd>Optional.  The function to call with the old and new\nvalue.  Should return true if the values are different.</dd>\n\n<dt>formatter</dt><dd>The cell formatter which will render an\nappropriate form field: &lt;input type=\"text\"&gt;, &lt;textarea&gt;,\nor &lt;select&gt;.</dd>\n\n<dt>validation</dt><dd>Validation configuration for every field in\nthe column.</dd>\n\n<dt>copyDown</dt><dd>If true, the top cell in the column will have a\nbutton to copy the value down to the rest of the rows.</dd>\n\n</dl>\n\n<p>The following configuration can be provided as part of\nquickEdit.validation:</p>\n\n<dl>\n\n<dt>css</dt><dd>CSS classes encoding basic validation rules:\n <dl>\n <dt><code>yiv-required</code></dt>\n     <dd>Value must not be empty.</dd>\n\n <dt><code>yiv-length:[x,y]</code></dt>\n     <dd>String must be at least x characters and at most y characters.\n     At least one of x and y must be specified.</dd>\n\n <dt><code>yiv-integer:[x,y]</code></dt>\n     <dd>The integer value must be at least x and at most y.\n     x and y are both optional.</dd>\n\n <dt><code>yiv-decimal:[x,y]</code></dt>\n     <dd>The decimal value must be at least x and at most y.  Exponents are\n     not allowed.  x and y are both optional.</dd>\n </dl>\n</dd>\n\n<dt>fn</dt><dd>A function that will be called with the DataTable as its\nscope and the cell's form element as the argument. Return true if the\nvalue is valid. Otherwise, call this.qe.displayMessage(...) to display\nan error and return false.</dd>\n\n<dt>msg</dt><dd>A map of types to messages that will be displayed\nwhen a basic or regex validation rule fails. The valid types are:\nrequired, min_length, max_length, integer, decimal, and regex.\nThere is no default for type regex, so you must specify a message if\nyou configure a regex validation.</dd>\n\n<dt>regex</dt><dd>Regular expression that the value must satisfy in\norder to be considered valid.</dd>\n\n</dl>\n\n<p>Custom QuickEdit Formatters</p>\n\n<p>To write a custom cell formatter for QuickEdit mode, you must\nstructure the function as follows:</p>\n\n<pre>\nfunction myQuickEditFormatter(o) {\n&nbsp;&nbsp;var markup =\n&nbsp;&nbsp;&nbsp;&nbsp;'&lt;input type=\"text\" class=\"{yiv} quickedit-field quickedit-key:{key}\" value=\"{value}\"/&gt;' +\n&nbsp;&nbsp;&nbsp;&nbsp;'{cd}' + Y.Plugin.DataTableQuickEdit.error_display_markup;\n\n&nbsp;&nbsp;var qe = o.column.quickEdit;\n&nbsp;&nbsp;return Y.Lang.sub(markup, {\n&nbsp;&nbsp;&nbsp;&nbsp;key: o.column.key,\n&nbsp;&nbsp;&nbsp;&nbsp;value: o.value.toString().replace(/\"/g, '&quot;'),\n&nbsp;&nbsp;&nbsp;&nbsp;yiv: qe.validation ? (qe.validation.css || '') : '',\n&nbsp;&nbsp;&nbsp;&nbsp;cd: QuickEdit.copyDownFormatter.call(this, o)\n&nbsp;&nbsp;});\n};\n</pre>\n\n<p>You can use textarea or select instead of input, but you can only\ncreate a single field.</p>\n\n<p><code>extractMyEditableValue</code> does not have to be a separate\nfunction. The work should normally be done inline in the formatter\nfunction, but the name of the sample function makes the point clear.</p>"
        },
        {
            "displayName": "gallery-scrollintoview",
            "name": "gallery-scrollintoview",
            "description": "<p>Only scrolls the browser if the object is not currently visible.</p>\n\n<p>This requires that all scrollable elements have position:relative.\nOtherwise, this algorithm will skip over them with unpredictable\nresults.</p>"
        },
        {
            "displayName": "gallery-sort-extras",
            "name": "gallery-sort-extras",
            "description": "<p>Utilities for sorting.</p>"
        },
        {
            "displayName": "gallery-test-extras",
            "name": "gallery-test-extras",
            "description": "<p>Additional assertions for unit tests.</p>"
        },
        {
            "displayName": "gallery-treeble",
            "name": "gallery-treeble",
            "description": "Treeble displays a tree of data in a table."
        }
    ]
} };
});