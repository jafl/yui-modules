/**
 * @module gallery-algorithms
 */

/*
history:

	Dobrica Pavlinusic, dpavlin@rot13.org 2004-09-06
	Matko Andjelinic, matko.andjelinic@gmail.com 2004-09-09 (contributed OO implementation)
*/

/**********************************************************************
 * <p>Binary search.</p>
 * 
 * @method Y.Array.binarySearch
 * @static
 * @param list {Array} the list to search (sorted on the compare function)
 * @param target {Mixed} the object to search for
 * @param compare {Function} the comparison function (default: Y.Array.compareStringsCaseSensitive)
 * @return {int} index of matched item or -1 if no match
 */
Y.Array.binarySearch = function(list, target, compare)
{
	if (!list || !list.length || Y.Lang.isUndefined(target))
		{
		return null;
		}

	if (!compare)
		{
		compare = Y.Array.compareStringsCaseSensitive;
		}

	var low  = 0;
	var high = list.length - 1;

	var lastTry;
	while (low <= high)
	{
		var mid  = (low + high) / 2;
		var aTry = (mid < 1) ? 0 : parseInt(mid, 10);

		var c = compare(list[aTry], target);
		if (c < 0)
		{
			low = aTry + 1;
			continue;
		}
		if (c > 0)
		{
			high = aTry - 1;
			continue;
		}
		if (c === 0)
		{
			high = aTry - 1;
			lastTry = aTry;
			continue;
		}
		return aTry;
	}

	return (Y.Lang.isUndefined(lastTry) ? -1 : lastTry);
};
