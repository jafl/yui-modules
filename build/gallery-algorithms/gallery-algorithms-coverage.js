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
_yuitest_coverage["build/gallery-algorithms/gallery-algorithms.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-algorithms/gallery-algorithms.js",
    code: []
};
_yuitest_coverage["build/gallery-algorithms/gallery-algorithms.js"].code=["YUI.add('gallery-algorithms', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-algorithms"," */","","/**"," * <p>Useful algorithms not provided by browsers.</p>"," *"," * @main gallery-algorithms"," * @class Array~algorithms"," */","","/**********************************************************************"," * <p>Swaps two elements.</p>"," * "," * @method swap"," * @static"," * @param list {Array} the list on which to operate"," * @param i {int} first index"," * @param j {int} second index"," */","Y.Array.swap = function(list,i,j)","{","	var tmp = list[i];","	list[i] = list[j];","	list[j] = tmp;","};","","/**********************************************************************"," * <p>A -1,0,+1 comparator for case-sensitive string comparison.</p>"," * "," * @method compareStringsCaseSensitive"," * @static"," * @param s1 {String} first string"," * @param s2 {String} second string"," * @return -1 if s1&lt;s2, 0 if s1==s2, +1 if s1&gt;s2"," */","Y.Array.compareStringsCaseSensitive = function(s1, s2)","{","	if (s1 == s2)","		{","		return 0;","		}","	else","		{","		return (s1 < s2 ? -1 : +1);","		}","};","","/**********************************************************************"," * <p>A -1,0,+1 comparator for case-insensitive string comparison.</p>"," * "," * @method compareStringsCaseInsensitive"," * @static"," * @param s1 {String} first string"," * @param s2 {String} second string"," * @return -1 if s1&lt;s2, 0 if s1==s2, +1 if s1&gt;s2"," */","Y.Array.compareStringsCaseInsensitive = function(s1, s2)","{","	return Y.Array.compareStringsCaseSensitive(s1.toLowerCase(), s2.toLowerCase());","};","","/*","quick sort history:","","	Copyright (c) 2006 John Lindal","	Copyright (c) 2003 Scandinavian Digital Systems AB","","	Adapted from http://www.digsys.se","","	Freeware: The source code and its methods and algorithms may be","			  used as desired without restrictions.","*/","","function qsort1(list,i1,i2,compare)","{","	var n, m, ip, im, pivot, s, b=true;","","	if (!compare)","		{","		compare = Y.Array.compareStringsCaseSensitive;","		}","","	im=Math.floor((i1+i2)/2); // Note, im may be equal to i1 but never to i2","	n=im;","	ip=n--;","	pivot=list[ip];","	while (n>=i1 && b)","		{","		m=n--;","		b=(compare(pivot, list[m])===0);","		}","	n=im+1; // n may be equal to i2 but not i2+1 (at this point)","	while (n<=i2 && b)","		{","		m=n++;","		b=(compare(pivot, list[m])===0);","		}","	if (b) { return -1; }","	if (compare(list[m], pivot) > 0)","		{","		ip=m;","		pivot=list[ip];","		}","	n=i1;  // Left","	m=i2;  // Right","	while (n<=m)","		{","		while (compare(pivot, list[n]) > 0)","			{","			n++;","			}","		while (compare(pivot, list[m]) <= 0)","			{","			m--;","			}","		if (n<m)","			{","			s=list[m];","			list[m]=list[n];","			list[n]=s;","			m--;","			n++;","			}","		}","	return n;","}","","function qsortRange(list,first,last,compare)","{","	var center; // This local var is the only recursive stack space used","	if (first<last)","		{","		center=qsort1(list,first,last,compare);","		if (center!=-1)","			{","			qsortRange(list,first,center-1,compare);","			qsortRange(list,center,last,compare);","			}","		}","}","","/**********************************************************************"," * <p>Quick sort the given list.</p>"," * "," * @method quickSort"," * @static"," * @param list {Array} the list to search (sorted on the compare function)"," * @param compare=Y.Array.compareStringsCaseSensitive {Function} the comparison function"," */","Y.Array.quickSort = function(list,compare)","{","	qsortRange(list, 0, list.length-1, compare);","};","","/*","binary search history:","","	Dobrica Pavlinusic, dpavlin@rot13.org 2004-09-06","	Matko Andjelinic, matko.andjelinic@gmail.com 2004-09-09 (contributed OO implementation)","*/","","/**********************************************************************"," * <p>Binary search.</p>"," * "," * @method binarySearch"," * @static"," * @param list {Array} the list to search (sorted on the compare function)"," * @param target {Mixed} the object to search for"," * @param [compare=Y.Array.compareStringsCaseSensitive] {Function} the comparison function"," * @return {int} index of matched item or -1 if no match"," */","Y.Array.binarySearch = function(list, target, compare)","{","	if (!list || !list.length || Y.Lang.isUndefined(target))","		{","		return null;","		}","","	if (!compare)","		{","		compare = Y.Array.compareStringsCaseSensitive;","		}","","	var low  = 0;","	var high = list.length - 1;","","	var lastTry;","	while (low <= high)","	{","		var mid  = (low + high) / 2;","		var aTry = (mid < 1) ? 0 : parseInt(mid, 10);","","		var c = compare(list[aTry], target);","		if (c < 0)","		{","			low = aTry + 1;","			continue;","		}","		if (c > 0)","		{","			high = aTry - 1;","			continue;","		}","","		high    = aTry - 1;","		lastTry = aTry;","	}","","	return (Y.Lang.isUndefined(lastTry) ? -1 : lastTry);","};","/**"," * @module gallery-algorithms"," */","","if (Y.ArrayList)","{","	/**********************************************************************","	 * Useful algorithms that are not provided by browsers.  Available if","	 * Y.ArrayList (collection) is loaded.","	 * ","	 * @class ArrayList~extras","	 */","","	Y.mix(Y.ArrayList,","	{","		/**","		 * <p>Swap two elements.</p>","		 * ","		 * @method swap","		 * @param i {int} first index","		 * @param j {int} second index","		 */","		swap: function(i,j)","		{","			Y.Array.swap(this._items, i,j);","		},","","		/**","		 * <p>Set comparison function.</p>","		 * ","		 * @method setComparator","		 * @param compare {Function} the -1,0,+1 comparison function to use when sorting and searching","		 */","		setComparator: function(compare)","		{","			this._compare = compare;","		},","","		/**","		 * <p>Quick sort the given list, using the function passed to setComparator().</p>","		 * ","		 * @method quickSort","		 */","		quickSort: function()","		{","			Y.Array.quickSort(this._items, this._compare);","		},","","		/**","		 * <p>Binary search, using the function passed to setComparator().</p>","		 * ","		 * @method binarySearch","		 * @param target {Mixed} the object to search for","		 * @return {int} index of matched item or -1 if no match","		 */","		binarySearch: function(target)","		{","			Y.Array.binarySearch(this._items, target, this._compare);","		}","	});","}","","","}, '@VERSION@', {\"optional\": [\"collection\"]});"];
_yuitest_coverage["build/gallery-algorithms/gallery-algorithms.js"].lines = {"1":0,"3":0,"25":0,"27":0,"28":0,"29":0,"41":0,"43":0,"45":0,"49":0,"62":0,"64":0,"79":0,"81":0,"83":0,"85":0,"88":0,"89":0,"90":0,"91":0,"92":0,"94":0,"95":0,"97":0,"98":0,"100":0,"101":0,"103":0,"104":0,"106":0,"107":0,"109":0,"110":0,"111":0,"113":0,"115":0,"117":0,"119":0,"121":0,"123":0,"124":0,"125":0,"126":0,"127":0,"130":0,"133":0,"135":0,"136":0,"138":0,"139":0,"141":0,"142":0,"155":0,"157":0,"177":0,"179":0,"181":0,"184":0,"186":0,"189":0,"190":0,"192":0,"193":0,"195":0,"196":0,"198":0,"199":0,"201":0,"202":0,"204":0,"206":0,"207":0,"210":0,"211":0,"214":0,"220":0,"229":0,"240":0,"251":0,"261":0,"273":0};
_yuitest_coverage["build/gallery-algorithms/gallery-algorithms.js"].functions = {"swap:25":0,"compareStringsCaseSensitive:41":0,"compareStringsCaseInsensitive:62":0,"qsort1:79":0,"qsortRange:133":0,"quickSort:155":0,"binarySearch:177":0,"swap:238":0,"setComparator:249":0,"quickSort:259":0,"binarySearch:271":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-algorithms/gallery-algorithms.js"].coveredLines = 81;
_yuitest_coverage["build/gallery-algorithms/gallery-algorithms.js"].coveredFunctions = 12;
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 1);
YUI.add('gallery-algorithms', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-algorithms/gallery-algorithms.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 3);
"use strict";

/**
 * @module gallery-algorithms
 */

/**
 * <p>Useful algorithms not provided by browsers.</p>
 *
 * @main gallery-algorithms
 * @class Array~algorithms
 */

/**********************************************************************
 * <p>Swaps two elements.</p>
 * 
 * @method swap
 * @static
 * @param list {Array} the list on which to operate
 * @param i {int} first index
 * @param j {int} second index
 */
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 25);
Y.Array.swap = function(list,i,j)
{
	_yuitest_coverfunc("build/gallery-algorithms/gallery-algorithms.js", "swap", 25);
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 27);
var tmp = list[i];
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 28);
list[i] = list[j];
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 29);
list[j] = tmp;
};

/**********************************************************************
 * <p>A -1,0,+1 comparator for case-sensitive string comparison.</p>
 * 
 * @method compareStringsCaseSensitive
 * @static
 * @param s1 {String} first string
 * @param s2 {String} second string
 * @return -1 if s1&lt;s2, 0 if s1==s2, +1 if s1&gt;s2
 */
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 41);
Y.Array.compareStringsCaseSensitive = function(s1, s2)
{
	_yuitest_coverfunc("build/gallery-algorithms/gallery-algorithms.js", "compareStringsCaseSensitive", 41);
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 43);
if (s1 == s2)
		{
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 45);
return 0;
		}
	else
		{
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 49);
return (s1 < s2 ? -1 : +1);
		}
};

/**********************************************************************
 * <p>A -1,0,+1 comparator for case-insensitive string comparison.</p>
 * 
 * @method compareStringsCaseInsensitive
 * @static
 * @param s1 {String} first string
 * @param s2 {String} second string
 * @return -1 if s1&lt;s2, 0 if s1==s2, +1 if s1&gt;s2
 */
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 62);
Y.Array.compareStringsCaseInsensitive = function(s1, s2)
{
	_yuitest_coverfunc("build/gallery-algorithms/gallery-algorithms.js", "compareStringsCaseInsensitive", 62);
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 64);
return Y.Array.compareStringsCaseSensitive(s1.toLowerCase(), s2.toLowerCase());
};

/*
quick sort history:

	Copyright (c) 2006 John Lindal
	Copyright (c) 2003 Scandinavian Digital Systems AB

	Adapted from http://www.digsys.se

	Freeware: The source code and its methods and algorithms may be
			  used as desired without restrictions.
*/

_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 79);
function qsort1(list,i1,i2,compare)
{
	_yuitest_coverfunc("build/gallery-algorithms/gallery-algorithms.js", "qsort1", 79);
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 81);
var n, m, ip, im, pivot, s, b=true;

	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 83);
if (!compare)
		{
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 85);
compare = Y.Array.compareStringsCaseSensitive;
		}

	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 88);
im=Math.floor((i1+i2)/2); // Note, im may be equal to i1 but never to i2
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 89);
n=im;
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 90);
ip=n--;
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 91);
pivot=list[ip];
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 92);
while (n>=i1 && b)
		{
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 94);
m=n--;
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 95);
b=(compare(pivot, list[m])===0);
		}
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 97);
n=im+1; // n may be equal to i2 but not i2+1 (at this point)
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 98);
while (n<=i2 && b)
		{
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 100);
m=n++;
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 101);
b=(compare(pivot, list[m])===0);
		}
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 103);
if (b) { return -1; }
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 104);
if (compare(list[m], pivot) > 0)
		{
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 106);
ip=m;
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 107);
pivot=list[ip];
		}
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 109);
n=i1;  // Left
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 110);
m=i2;  // Right
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 111);
while (n<=m)
		{
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 113);
while (compare(pivot, list[n]) > 0)
			{
			_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 115);
n++;
			}
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 117);
while (compare(pivot, list[m]) <= 0)
			{
			_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 119);
m--;
			}
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 121);
if (n<m)
			{
			_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 123);
s=list[m];
			_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 124);
list[m]=list[n];
			_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 125);
list[n]=s;
			_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 126);
m--;
			_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 127);
n++;
			}
		}
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 130);
return n;
}

_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 133);
function qsortRange(list,first,last,compare)
{
	_yuitest_coverfunc("build/gallery-algorithms/gallery-algorithms.js", "qsortRange", 133);
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 135);
var center; // This local var is the only recursive stack space used
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 136);
if (first<last)
		{
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 138);
center=qsort1(list,first,last,compare);
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 139);
if (center!=-1)
			{
			_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 141);
qsortRange(list,first,center-1,compare);
			_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 142);
qsortRange(list,center,last,compare);
			}
		}
}

/**********************************************************************
 * <p>Quick sort the given list.</p>
 * 
 * @method quickSort
 * @static
 * @param list {Array} the list to search (sorted on the compare function)
 * @param compare=Y.Array.compareStringsCaseSensitive {Function} the comparison function
 */
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 155);
Y.Array.quickSort = function(list,compare)
{
	_yuitest_coverfunc("build/gallery-algorithms/gallery-algorithms.js", "quickSort", 155);
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 157);
qsortRange(list, 0, list.length-1, compare);
};

/*
binary search history:

	Dobrica Pavlinusic, dpavlin@rot13.org 2004-09-06
	Matko Andjelinic, matko.andjelinic@gmail.com 2004-09-09 (contributed OO implementation)
*/

/**********************************************************************
 * <p>Binary search.</p>
 * 
 * @method binarySearch
 * @static
 * @param list {Array} the list to search (sorted on the compare function)
 * @param target {Mixed} the object to search for
 * @param [compare=Y.Array.compareStringsCaseSensitive] {Function} the comparison function
 * @return {int} index of matched item or -1 if no match
 */
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 177);
Y.Array.binarySearch = function(list, target, compare)
{
	_yuitest_coverfunc("build/gallery-algorithms/gallery-algorithms.js", "binarySearch", 177);
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 179);
if (!list || !list.length || Y.Lang.isUndefined(target))
		{
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 181);
return null;
		}

	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 184);
if (!compare)
		{
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 186);
compare = Y.Array.compareStringsCaseSensitive;
		}

	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 189);
var low  = 0;
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 190);
var high = list.length - 1;

	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 192);
var lastTry;
	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 193);
while (low <= high)
	{
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 195);
var mid  = (low + high) / 2;
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 196);
var aTry = (mid < 1) ? 0 : parseInt(mid, 10);

		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 198);
var c = compare(list[aTry], target);
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 199);
if (c < 0)
		{
			_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 201);
low = aTry + 1;
			_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 202);
continue;
		}
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 204);
if (c > 0)
		{
			_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 206);
high = aTry - 1;
			_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 207);
continue;
		}

		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 210);
high    = aTry - 1;
		_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 211);
lastTry = aTry;
	}

	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 214);
return (Y.Lang.isUndefined(lastTry) ? -1 : lastTry);
};
/**
 * @module gallery-algorithms
 */

_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 220);
if (Y.ArrayList)
{
	/**********************************************************************
	 * Useful algorithms that are not provided by browsers.  Available if
	 * Y.ArrayList (collection) is loaded.
	 * 
	 * @class ArrayList~extras
	 */

	_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 229);
Y.mix(Y.ArrayList,
	{
		/**
		 * <p>Swap two elements.</p>
		 * 
		 * @method swap
		 * @param i {int} first index
		 * @param j {int} second index
		 */
		swap: function(i,j)
		{
			_yuitest_coverfunc("build/gallery-algorithms/gallery-algorithms.js", "swap", 238);
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 240);
Y.Array.swap(this._items, i,j);
		},

		/**
		 * <p>Set comparison function.</p>
		 * 
		 * @method setComparator
		 * @param compare {Function} the -1,0,+1 comparison function to use when sorting and searching
		 */
		setComparator: function(compare)
		{
			_yuitest_coverfunc("build/gallery-algorithms/gallery-algorithms.js", "setComparator", 249);
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 251);
this._compare = compare;
		},

		/**
		 * <p>Quick sort the given list, using the function passed to setComparator().</p>
		 * 
		 * @method quickSort
		 */
		quickSort: function()
		{
			_yuitest_coverfunc("build/gallery-algorithms/gallery-algorithms.js", "quickSort", 259);
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 261);
Y.Array.quickSort(this._items, this._compare);
		},

		/**
		 * <p>Binary search, using the function passed to setComparator().</p>
		 * 
		 * @method binarySearch
		 * @param target {Mixed} the object to search for
		 * @return {int} index of matched item or -1 if no match
		 */
		binarySearch: function(target)
		{
			_yuitest_coverfunc("build/gallery-algorithms/gallery-algorithms.js", "binarySearch", 271);
_yuitest_coverline("build/gallery-algorithms/gallery-algorithms.js", 273);
Y.Array.binarySearch(this._items, target, this._compare);
		}
	});
}


}, '@VERSION@', {"optional": ["collection"]});
