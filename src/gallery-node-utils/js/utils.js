"use strict";

/**
 * @module gallery-node-utils
 */

/**
 * <p>Augments Y.Node with useful functions.</p>
 *
 * @main gallery-node-utils
 * @class Node~utils
 */

/**
 * Maximum height in pixels allowed for `Y.Node.adjustTextareaHeight()`.
 *
 * @property max_textarea_height
 * @type {Number}
 * @static
 */
Y.Node.max_textarea_height = Y.Node.emToPx(35);

/**
 * Adjusts the height of a textarea to fit the text.
 *
 * @method adjustTextareaHeight
 * @static
 * @param textarea {Node} textarea to adjust
 */
Y.Node.adjustTextareaHeight = function(textarea)
{
	textarea.setStyle('height', 'auto');
	textarea.setStyle('height', Math.min(
		 Y.Node.max_textarea_height, textarea.get('scrollHeight')) + 'px');
};

Y.mix(Y.Node.prototype,
{
	/**
	 * Positions the caret inside a text input or textarea.
	 *
	 * @method setCaretPosition
	 * @param pos {Number} the location of the caret
	 */
	setCaretPosition: function(pos)
	{
		this.selectRange(pos, 0);
	},

	/**
	 * Selects part of the text in a text input or textarea.
	 *
	 * @method selectRange
	 * @param start {Number} the start of the selection
	 * @param length {Number} the length of the selection
	 */
	selectRange: function(start, length)
	{
		var e = this.getDOMNode();
		if (e.setSelectionRange)
		{
			e.focus();
			e.setSelectionRange(start, start + length);
		}
		else if (e.createTextRange)
		{
			var range = e.createTextRange();
			e.collapse(true);
			e.moveEnd('character', start + length);
			e.moveStart('character', start);
			e.select();
		}
	},

	/**
	 * Selects all of the text in a text input or textarea.
	 *
	 * @method selectAllText
	 */
	selectAllText: function()
	{
		this.selectRange(0, e.value.length);
	}
});
