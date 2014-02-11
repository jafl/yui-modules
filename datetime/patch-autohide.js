YUI.add('patch-autohide', function (Y, NAME) {

var WIDGET_AUTOHIDE    = 'widgetAutohide',
    AUTOHIDE            = 'autohide',
    CLICK_OUTSIDE     = 'clickoutside',
    FOCUS_OUTSIDE     = 'focusoutside',
    DOCUMENT            = 'document',
    KEY                 = 'key',
    PRESS_ESCAPE         = 'esc',
    BIND_UI             = 'bindUI',
    SYNC_UI             = "syncUI",
    RENDERED            = "rendered",
    BOUNDING_BOX        = "boundingBox",
    VISIBLE             = "visible",
    CHANGE              = 'Change',

    getCN               = Y.ClassNameManager.getClassName;

Y.Popup.prototype._attachUIHandlesAutohide = function () {

            if (this._uiHandlesAutohide) { return; }

            var bb = this.get(BOUNDING_BOX),
                hide = Y.bind(this.hide,this),
                uiHandles = [],
                self = this,
                hideOn = this.get('hideOn'),
                i = 0,
                node,
                ev,
                keyCode;

                //push all events on which the widget should be hidden
                for (; i < hideOn.length; i++) {

                    node = hideOn[i].node;
                    ev = hideOn[i].eventName;
                    keyCode = hideOn[i].keyCode;

                    //no keycode or node defined
                    if (!node && !keyCode && ev) {
                        uiHandles.push(bb.on(ev, hide));
                    }

                    //node defined, no keycode (not a keypress)
                    else if (node && !keyCode && ev) {
                        uiHandles.push(Y.one(node).on(ev, hide));
                    }

                    //node defined, keycode defined, event defined (its a key press)
                    else if (node && keyCode && ev) {
                        uiHandles.push(Y.one(node).on(ev, hide, keyCode));
                    }

                    else {
                        Y.log('The event with name "'+ev+'" could not be attached.');
                    }

                }

            this._uiHandlesAutohide = uiHandles;
        };

}, '@VERSION@', {"requires": ["gallery-popup"]});
