/**
 * @module gallery-algorithms
 */

/**********************************************************************
 * <p>A -1,0,+1 comparator for case-sensitive string comparison.</p>
 * 
 * @method Y.Array.compareStringsCaseSensitive
 * @static
 * @param s1 {String} first string
 * @param s2 {String} second string
 * @return -1 if s1&lt;s2, 0 if s1==s2, +1 if s1&gt;s2
 */
Y.Array.compareStringsCaseSensitive = function(s1, s2)
{
	if (s1 == s2)
		{
		return 0;
		}
	else
		{
		return (s1 < s2 ? -1 : +1);
		}
};

/**********************************************************************
 * <p>A -1,0,+1 comparator for case-insensitive string comparison.</p>
 * 
 * @method Y.Array.compareStringsCaseInsensitive
 * @static
 * @param s1 {String} first string
 * @param s2 {String} second string
 * @return -1 if s1&lt;s2, 0 if s1==s2, +1 if s1&gt;s2
 */
Y.Array.compareStringsCaseInsensitive = function(s1, s2)
{
	return Y.Array.compareStringsCaseSensitive(s1.toLowerCase(), s2.toLowerCase());
};

/**********************************************************************
 * <p>Converts a -1,0,+1 comparator into a boolean comparator, for use by
 * Y.Array.find().</p>
 * 
 * @method Y.Array.compareForFind
 * @static
 * @param f {Function} -1,0,+1 comparator function
 * @return {Function} function that returns true if the arguments are equal
 */
Y.Array.compareForFind = function(f)
{
	return function(a,b)
	{
		return (f(a,b) === 0);
	};
};
