/**
 * @module gallery-algorithms
 */

/*
history:

  Copyright (c) 2006 John Lindal
  Copyright (c) 2003 Scandinavian Digital Systems AB

  Adapted from http://www.digsys.se

  Freeware: The source code and its methods and algorithms may be
            used as desired without restrictions.
*/

function qsort1(list,i1,i2,compare)
{
	var n, m, ip, im, pivot, s, b=true;

	if (!compare)
		{
		compare = Y.Array.compareStringsCaseSensitive;
		}

	im=Math.floor((i1+i2)/2); // Note, im may be equal to i1 but never to i2
	n=im;
	ip=n--;
	pivot=list[ip];
	while (n>=i1 && b)
		{
		m=n--;
		b=(compare(pivot, list[m])===0);
		}
	n=im+1; // n may be equal to i2 but not i2+1 (at this point)
	while (n<=i2 && b)
		{
		m=n++;
		b=(compare(pivot, list[m])===0);
		}
	if (b) { return -1; }
	if (compare(list[m], pivot) > 0)
		{
		ip=m;
		pivot=list[ip];
		}
	n=i1;  // Left
	m=i2;  // Right
	while (n<=m)
		{
		while (compare(pivot, list[n]) > 0)
			{
			n++;
			}
		while (compare(pivot, list[m]) <= 0)
			{
			m--;
			}
		if (n<m)
			{
			s=list[m];
			list[m]=list[n];
			list[n]=s;
			m--;
			n++;
			}
		}
	return n;
}

function qsortRange(list,first,last,compare)
{
	var center; // This local var is the only recursive stack space used
	if (first<last)
		{
		center=qsort1(list,first,last,compare);
		if (center!=-1)
			{
			qsortRange(list,first,center-1,compare);
			qsortRange(list,center,last,compare);
			}
		}
}

/**********************************************************************
 * <p>Quick sort the given list.</p>
 * 
 * @method Y.Array.quickSort
 * @static
 * @param list {Array} the list to search (sorted on the compare function)
 * @param compare {Function} the comparison function (default: Y.Array.compareStringsCaseSensitive)
 */
Y.Array.quickSort = function(list,compare)
{
	qsortRange(list, 0, list.length-1, compare);
};
