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
_yuitest_coverage["gallery-algorithms"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "gallery-algorithms",
    code: []
};
_yuitest_coverage["gallery-algorithms"].code=["YUI.add('gallery-algorithms', function (Y, NAME) {","","\"use strict\";","","/**"," * @module gallery-algorithms"," */","","/**"," * <p>Useful algorithms not provided by browsers.</p>"," *"," * @main gallery-algorithms"," * @class Array~algorithms"," */","","/**********************************************************************"," * <p>Swaps two elements.</p>"," * "," * @method swap"," * @static"," * @param list {Array} the list on which to operate"," * @param i {int} first index"," * @param j {int} second index"," */","Y.Array.swap = function(list,i,j)","{","	var tmp = list[i];","	list[i] = list[j];","	list[j] = tmp;","};","","/**********************************************************************"," * <p>A -1,0,+1 comparator for case-sensitive string comparison.</p>"," * "," * @method compareStringsCaseSensitive"," * @static"," * @param s1 {String} first string"," * @param s2 {String} second string"," * @return -1 if s1&lt;s2, 0 if s1==s2, +1 if s1&gt;s2"," */","Y.Array.compareStringsCaseSensitive = function(s1, s2)","{","	if (s1 == s2)","		{","		return 0;","		}","	else","		{","		return (s1 < s2 ? -1 : +1);","		}","};","","/**********************************************************************"," * <p>A -1,0,+1 comparator for case-insensitive string comparison.</p>"," * "," * @method compareStringsCaseInsensitive"," * @static"," * @param s1 {String} first string"," * @param s2 {String} second string"," * @return -1 if s1&lt;s2, 0 if s1==s2, +1 if s1&gt;s2"," */","Y.Array.compareStringsCaseInsensitive = function(s1, s2)","{","	return Y.Array.compareStringsCaseSensitive(s1.toLowerCase(), s2.toLowerCase());","};","","/**********************************************************************"," * <p>Converts a -1,0,+1 comparator into a boolean comparator, for use by"," * Y.Array.find().</p>"," * "," * @method compareForFind"," * @static"," * @param f {Function} -1,0,+1 comparator function"," * @return {Function} function that returns true if the arguments are equal"," */","Y.Array.compareForFind = function(f)","{","	return function(a,b)","	{","		return (f(a,b) === 0);","	};","};","","/*","quick sort history:","","	Copyright (c) 2006 John Lindal","	Copyright (c) 2003 Scandinavian Digital Systems AB","","	Adapted from http://www.digsys.se","","	Freeware: The source code and its methods and algorithms may be","			  used as desired without restrictions.","*/","","function qsort1(list,i1,i2,compare)","{","	var n, m, ip, im, pivot, s, b=true;","","	if (!compare)","		{","		compare = Y.Array.compareStringsCaseSensitive;","		}","","	im=Math.floor((i1+i2)/2); // Note, im may be equal to i1 but never to i2","	n=im;","	ip=n--;","	pivot=list[ip];","	while (n>=i1 && b)","		{","		m=n--;","		b=(compare(pivot, list[m])===0);","		}","	n=im+1; // n may be equal to i2 but not i2+1 (at this point)","	while (n<=i2 && b)","		{","		m=n++;","		b=(compare(pivot, list[m])===0);","		}","	if (b) { return -1; }","	if (compare(list[m], pivot) > 0)","		{","		ip=m;","		pivot=list[ip];","		}","	n=i1;  // Left","	m=i2;  // Right","	while (n<=m)","		{","		while (compare(pivot, list[n]) > 0)","			{","			n++;","			}","		while (compare(pivot, list[m]) <= 0)","			{","			m--;","			}","		if (n<m)","			{","			s=list[m];","			list[m]=list[n];","			list[n]=s;","			m--;","			n++;","			}","		}","	return n;","}","","function qsortRange(list,first,last,compare)","{","	var center; // This local var is the only recursive stack space used","	if (first<last)","		{","		center=qsort1(list,first,last,compare);","		if (center!=-1)","			{","			qsortRange(list,first,center-1,compare);","			qsortRange(list,center,last,compare);","			}","		}","}","","/**********************************************************************"," * <p>Quick sort the given list.</p>"," * "," * @method quickSort"," * @static"," * @param list {Array} the list to search (sorted on the compare function)"," * @param compare=Y.Array.compareStringsCaseSensitive {Function} the comparison function"," */","Y.Array.quickSort = function(list,compare)","{","	qsortRange(list, 0, list.length-1, compare);","};","","/*","binary search history:","","	Dobrica Pavlinusic, dpavlin@rot13.org 2004-09-06","	Matko Andjelinic, matko.andjelinic@gmail.com 2004-09-09 (contributed OO implementation)","*/","","/**********************************************************************"," * <p>Binary search.</p>"," * "," * @method binarySearch"," * @static"," * @param list {Array} the list to search (sorted on the compare function)"," * @param target {Mixed} the object to search for"," * @param compare=Y.Array.compareStringsCaseSensitive {Function} the comparison function"," * @return {int} index of matched item or -1 if no match"," */","Y.Array.binarySearch = function(list, target, compare)","{","	if (!list || !list.length || Y.Lang.isUndefined(target))","		{","		return null;","		}","","	if (!compare)","		{","		compare = Y.Array.compareStringsCaseSensitive;","		}","","	var low  = 0;","	var high = list.length - 1;","","	var lastTry;","	while (low <= high)","	{","		var mid  = (low + high) / 2;","		var aTry = (mid < 1) ? 0 : parseInt(mid, 10);","","		var c = compare(list[aTry], target);","		if (c < 0)","		{","			low = aTry + 1;","			continue;","		}","		if (c > 0)","		{","			high = aTry - 1;","			continue;","		}","		if (c === 0)","		{","			high = aTry - 1;","			lastTry = aTry;","			continue;","		}","		return aTry;","	}","","	return (Y.Lang.isUndefined(lastTry) ? -1 : lastTry);","};","/**"," * @module gallery-algorithms"," */","","if (Y.ArrayList)","{","	/**********************************************************************","	 * Useful algorithms that are not provided by browsers.  Available if","	 * Y.ArrayList (collection) is loaded.","	 * ","	 * @class ArrayList~extras","	 */","","	Y.mix(Y.ArrayList,","	{","		/**","		 * <p>Swap two elements.</p>","		 * ","		 * @method swap","		 * @param i {int} first index","		 * @param j {int} second index","		 */","		swap: function(i,j)","		{","			Y.Array.swap(this._items, i,j);","		},","","		/**","		 * <p>Set comparison function.</p>","		 * ","		 * @method setComparator","		 * @param compare {Function} the -1,0,+1 comparison function to use when sorting and searching","		 */","		setComparator: function(compare)","		{","			this._compare = compare;","		},","","		/**","		 * <p>Quick sort the given list, using the function passed to setComparator().</p>","		 * ","		 * @method quickSort","		 */","		quickSort: function()","		{","			Y.Array.quickSort(this._items, this._compare);","		},","","		/**","		 * <p>Binary search, using the function passed to setComparator().</p>","		 * ","		 * @method binarySearch","		 * @param target {Mixed} the object to search for","		 * @return {int} index of matched item or -1 if no match","		 */","		binarySearch: function(target)","		{","			Y.Array.binarySearch(this._items, target, this._compare);","		}","	});","}","","","}, '@VERSION@', {});"];
_yuitest_coverage["gallery-algorithms"].lines = {"1":0,"3":0,"25":0,"27":0,"28":0,"29":0,"41":0,"43":0,"45":0,"49":0,"62":0,"64":0,"76":0,"78":0,"80":0,"96":0,"98":0,"100":0,"102":0,"105":0,"106":0,"107":0,"108":0,"109":0,"111":0,"112":0,"114":0,"115":0,"117":0,"118":0,"120":0,"121":0,"123":0,"124":0,"126":0,"127":0,"128":0,"130":0,"132":0,"134":0,"136":0,"138":0,"140":0,"141":0,"142":0,"143":0,"144":0,"147":0,"150":0,"152":0,"153":0,"155":0,"156":0,"158":0,"159":0,"172":0,"174":0,"194":0,"196":0,"198":0,"201":0,"203":0,"206":0,"207":0,"209":0,"210":0,"212":0,"213":0,"215":0,"216":0,"218":0,"219":0,"221":0,"223":0,"224":0,"226":0,"228":0,"229":0,"230":0,"232":0,"235":0,"241":0,"250":0,"261":0,"272":0,"282":0,"294":0};
_yuitest_coverage["gallery-algorithms"].functions = {"swap:25":0,"compareStringsCaseSensitive:41":0,"compareStringsCaseInsensitive:62":0,"(anonymous 2):78":0,"compareForFind:76":0,"qsort1:96":0,"qsortRange:150":0,"quickSort:172":0,"binarySearch:194":0,"swap:259":0,"setComparator:270":0,"quickSort:280":0,"binarySearch:292":0,"(anonymous 1):1":0};
_yuitest_coverage["gallery-algorithms"].coveredLines = 87;
_yuitest_coverage["gallery-algorithms"].coveredFunctions = 14;
_yuitest_coverline("gallery-algorithms", 1);
YUI.add('gallery-algorithms', function (Y, NAME) {

_yuitest_coverfunc("gallery-algorithms", "(anonymous 1)", 1);
_yuitest_coverline("gallery-algorithms", 3);
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
_yuitest_coverline("gallery-algorithms", 25);
Y.Array.swap = function(list,i,j)
{
	_yuitest_coverfunc("gallery-algorithms", "swap", 25);
_yuitest_coverline("gallery-algorithms", 27);
var tmp = list[i];
	_yuitest_coverline("gallery-algorithms", 28);
list[i] = list[j];
	_yuitest_coverline("gallery-algorithms", 29);
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
_yuitest_coverline("gallery-algorithms", 41);
Y.Array.compareStringsCaseSensitive = function(s1, s2)
{
	_yuitest_coverfunc("gallery-algorithms", "compareStringsCaseSensitive", 41);
_yuitest_coverline("gallery-algorithms", 43);
if (s1 == s2)
		{
		_yuitest_coverline("gallery-algorithms", 45);
return 0;
		}
	else
		{
		_yuitest_coverline("gallery-algorithms", 49);
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
_yuitest_coverline("gallery-algorithms", 62);
Y.Array.compareStringsCaseInsensitive = function(s1, s2)
{
	_yuitest_coverfunc("gallery-algorithms", "compareStringsCaseInsensitive", 62);
_yuitest_coverline("gallery-algorithms", 64);
return Y.Array.compareStringsCaseSensitive(s1.toLowerCase(), s2.toLowerCase());
};

/**********************************************************************
 * <p>Converts a -1,0,+1 comparator into a boolean comparator, for use by
 * Y.Array.find().</p>
 * 
 * @method compareForFind
 * @static
 * @param f {Function} -1,0,+1 comparator function
 * @return {Function} function that returns true if the arguments are equal
 */
_yuitest_coverline("gallery-algorithms", 76);
Y.Array.compareForFind = function(f)
{
	_yuitest_coverfunc("gallery-algorithms", "compareForFind", 76);
_yuitest_coverline("gallery-algorithms", 78);
return function(a,b)
	{
		_yuitest_coverfunc("gallery-algorithms", "(anonymous 2)", 78);
_yuitest_coverline("gallery-algorithms", 80);
return (f(a,b) === 0);
	};
};

/*
quick sort history:

	Copyright (c) 2006 John Lindal
	Copyright (c) 2003 Scandinavian Digital Systems AB

	Adapted from http://www.digsys.se

	Freeware: The source code and its methods and algorithms may be
			  used as desired without restrictions.
*/

_yuitest_coverline("gallery-algorithms", 96);
function qsort1(list,i1,i2,compare)
{
	_yuitest_coverfunc("gallery-algorithms", "qsort1", 96);
_yuitest_coverline("gallery-algorithms", 98);
var n, m, ip, im, pivot, s, b=true;

	_yuitest_coverline("gallery-algorithms", 100);
if (!compare)
		{
		_yuitest_coverline("gallery-algorithms", 102);
compare = Y.Array.compareStringsCaseSensitive;
		}

	_yuitest_coverline("gallery-algorithms", 105);
im=Math.floor((i1+i2)/2); // Note, im may be equal to i1 but never to i2
	_yuitest_coverline("gallery-algorithms", 106);
n=im;
	_yuitest_coverline("gallery-algorithms", 107);
ip=n--;
	_yuitest_coverline("gallery-algorithms", 108);
pivot=list[ip];
	_yuitest_coverline("gallery-algorithms", 109);
while (n>=i1 && b)
		{
		_yuitest_coverline("gallery-algorithms", 111);
m=n--;
		_yuitest_coverline("gallery-algorithms", 112);
b=(compare(pivot, list[m])===0);
		}
	_yuitest_coverline("gallery-algorithms", 114);
n=im+1; // n may be equal to i2 but not i2+1 (at this point)
	_yuitest_coverline("gallery-algorithms", 115);
while (n<=i2 && b)
		{
		_yuitest_coverline("gallery-algorithms", 117);
m=n++;
		_yuitest_coverline("gallery-algorithms", 118);
b=(compare(pivot, list[m])===0);
		}
	_yuitest_coverline("gallery-algorithms", 120);
if (b) { return -1; }
	_yuitest_coverline("gallery-algorithms", 121);
if (compare(list[m], pivot) > 0)
		{
		_yuitest_coverline("gallery-algorithms", 123);
ip=m;
		_yuitest_coverline("gallery-algorithms", 124);
pivot=list[ip];
		}
	_yuitest_coverline("gallery-algorithms", 126);
n=i1;  // Left
	_yuitest_coverline("gallery-algorithms", 127);
m=i2;  // Right
	_yuitest_coverline("gallery-algorithms", 128);
while (n<=m)
		{
		_yuitest_coverline("gallery-algorithms", 130);
while (compare(pivot, list[n]) > 0)
			{
			_yuitest_coverline("gallery-algorithms", 132);
n++;
			}
		_yuitest_coverline("gallery-algorithms", 134);
while (compare(pivot, list[m]) <= 0)
			{
			_yuitest_coverline("gallery-algorithms", 136);
m--;
			}
		_yuitest_coverline("gallery-algorithms", 138);
if (n<m)
			{
			_yuitest_coverline("gallery-algorithms", 140);
s=list[m];
			_yuitest_coverline("gallery-algorithms", 141);
list[m]=list[n];
			_yuitest_coverline("gallery-algorithms", 142);
list[n]=s;
			_yuitest_coverline("gallery-algorithms", 143);
m--;
			_yuitest_coverline("gallery-algorithms", 144);
n++;
			}
		}
	_yuitest_coverline("gallery-algorithms", 147);
return n;
}

_yuitest_coverline("gallery-algorithms", 150);
function qsortRange(list,first,last,compare)
{
	_yuitest_coverfunc("gallery-algorithms", "qsortRange", 150);
_yuitest_coverline("gallery-algorithms", 152);
var center; // This local var is the only recursive stack space used
	_yuitest_coverline("gallery-algorithms", 153);
if (first<last)
		{
		_yuitest_coverline("gallery-algorithms", 155);
center=qsort1(list,first,last,compare);
		_yuitest_coverline("gallery-algorithms", 156);
if (center!=-1)
			{
			_yuitest_coverline("gallery-algorithms", 158);
qsortRange(list,first,center-1,compare);
			_yuitest_coverline("gallery-algorithms", 159);
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
_yuitest_coverline("gallery-algorithms", 172);
Y.Array.quickSort = function(list,compare)
{
	_yuitest_coverfunc("gallery-algorithms", "quickSort", 172);
_yuitest_coverline("gallery-algorithms", 174);
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
 * @param compare=Y.Array.compareStringsCaseSensitive {Function} the comparison function
 * @return {int} index of matched item or -1 if no match
 */
_yuitest_coverline("gallery-algorithms", 194);
Y.Array.binarySearch = function(list, target, compare)
{
	_yuitest_coverfunc("gallery-algorithms", "binarySearch", 194);
_yuitest_coverline("gallery-algorithms", 196);
if (!list || !list.length || Y.Lang.isUndefined(target))
		{
		_yuitest_coverline("gallery-algorithms", 198);
return null;
		}

	_yuitest_coverline("gallery-algorithms", 201);
if (!compare)
		{
		_yuitest_coverline("gallery-algorithms", 203);
compare = Y.Array.compareStringsCaseSensitive;
		}

	_yuitest_coverline("gallery-algorithms", 206);
var low  = 0;
	_yuitest_coverline("gallery-algorithms", 207);
var high = list.length - 1;

	_yuitest_coverline("gallery-algorithms", 209);
var lastTry;
	_yuitest_coverline("gallery-algorithms", 210);
while (low <= high)
	{
		_yuitest_coverline("gallery-algorithms", 212);
var mid  = (low + high) / 2;
		_yuitest_coverline("gallery-algorithms", 213);
var aTry = (mid < 1) ? 0 : parseInt(mid, 10);

		_yuitest_coverline("gallery-algorithms", 215);
var c = compare(list[aTry], target);
		_yuitest_coverline("gallery-algorithms", 216);
if (c < 0)
		{
			_yuitest_coverline("gallery-algorithms", 218);
low = aTry + 1;
			_yuitest_coverline("gallery-algorithms", 219);
continue;
		}
		_yuitest_coverline("gallery-algorithms", 221);
if (c > 0)
		{
			_yuitest_coverline("gallery-algorithms", 223);
high = aTry - 1;
			_yuitest_coverline("gallery-algorithms", 224);
continue;
		}
		_yuitest_coverline("gallery-algorithms", 226);
if (c === 0)
		{
			_yuitest_coverline("gallery-algorithms", 228);
high = aTry - 1;
			_yuitest_coverline("gallery-algorithms", 229);
lastTry = aTry;
			_yuitest_coverline("gallery-algorithms", 230);
continue;
		}
		_yuitest_coverline("gallery-algorithms", 232);
return aTry;
	}

	_yuitest_coverline("gallery-algorithms", 235);
return (Y.Lang.isUndefined(lastTry) ? -1 : lastTry);
};
/**
 * @module gallery-algorithms
 */

_yuitest_coverline("gallery-algorithms", 241);
if (Y.ArrayList)
{
	/**********************************************************************
	 * Useful algorithms that are not provided by browsers.  Available if
	 * Y.ArrayList (collection) is loaded.
	 * 
	 * @class ArrayList~extras
	 */

	_yuitest_coverline("gallery-algorithms", 250);
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
			_yuitest_coverfunc("gallery-algorithms", "swap", 259);
_yuitest_coverline("gallery-algorithms", 261);
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
			_yuitest_coverfunc("gallery-algorithms", "setComparator", 270);
_yuitest_coverline("gallery-algorithms", 272);
this._compare = compare;
		},

		/**
		 * <p>Quick sort the given list, using the function passed to setComparator().</p>
		 * 
		 * @method quickSort
		 */
		quickSort: function()
		{
			_yuitest_coverfunc("gallery-algorithms", "quickSort", 280);
_yuitest_coverline("gallery-algorithms", 282);
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
			_yuitest_coverfunc("gallery-algorithms", "binarySearch", 292);
_yuitest_coverline("gallery-algorithms", 294);
Y.Array.binarySearch(this._items, target, this._compare);
		}
	});
}


}, '@VERSION@', {});
