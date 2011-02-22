"use strict";

/**
 * @module gallery-algorithms
 */

/**********************************************************************
 * <p>Swaps two elements.</p>
 * 
 * @method Y.Array.swap
 * @static
 * @param list {Array} the list on which to operate
 * @param i {int} first index
 * @param j {int} second index
 */
Y.Array.swap = function(list,i,j)
{
	var tmp = list[i];
	list[i] = list[j];
	list[j] = tmp;
};
