YUI.add('patch-calendar', function (Y, NAME) {

var getCN                 = Y.ClassNameManager.getClassName,
    CALENDAR              = 'calendar',
    CAL_GRID              = getCN(CALENDAR, 'grid'),
    CAL_LEFT_GRID         = getCN(CALENDAR, 'left-grid'),
    CAL_RIGHT_GRID        = getCN(CALENDAR, 'right-grid'),
    CAL_BODY              = getCN(CALENDAR, 'body'),
    CAL_HD                = getCN(CALENDAR, 'header'),
    CAL_HD_LABEL          = getCN(CALENDAR, 'header-label'),
    CAL_WDAYROW           = getCN(CALENDAR, 'weekdayrow'),
    CAL_WDAY              = getCN(CALENDAR, 'weekday'),
    CAL_COL_HIDDEN        = getCN(CALENDAR, 'column-hidden'),
    CAL_DAY_SELECTED      = getCN(CALENDAR, 'day-selected'),
    SELECTION_DISABLED    = getCN(CALENDAR, 'selection-disabled'),
    CAL_ROW               = getCN(CALENDAR, 'row'),
    CAL_DAY               = getCN(CALENDAR, 'day'),
    CAL_PREVMONTH_DAY     = getCN(CALENDAR, 'prevmonth-day'),
    CAL_NEXTMONTH_DAY     = getCN(CALENDAR, 'nextmonth-day'),
    CAL_ANCHOR            = getCN(CALENDAR, 'anchor'),
    CAL_PANE              = getCN(CALENDAR, 'pane'),
    CAL_STATUS            = getCN(CALENDAR, 'status'),
    L           = Y.Lang,
    substitute  = L.sub,
    arrayEach   = Y.Array.each,
    objEach     = Y.Object.each,
    iOf         = Y.Array.indexOf,
    hasKey      = Y.Object.hasKey,
    setVal      = Y.Object.setValue,
    isEmpty     = Y.Object.isEmpty,
    ydate       = Y.DataType.Date;

Y.CalendarBase.prototype._afterDateChange = function () {

        var contentBox = this.get('contentBox'),
            headerCell = contentBox.one("." + CAL_HD).one("." + CAL_HD_LABEL),
            calendarPanes = contentBox.all("." + CAL_GRID),
            currentDate = this.get("date"),
            counter = 0;

        contentBox.setStyle("visibility", "hidden");
        headerCell.setContent(this._updateCalendarHeader(currentDate));

        this._restoreModifiedCells();

        calendarPanes.each(function (curNode) {
            this._rerenderCalendarPane(ydate.addMonths(currentDate, counter++), curNode);
        }, this);

        this._afterShowPrevMonthChange();
        this._afterShowNextMonthChange();

        this._renderCustomRules();
        this._renderSelectedDates();

        contentBox.setStyle("visibility", "inherit");
    };

Y.CalendarBase.prototype._rerenderCalendarPane = function (newDate, pane) {

        // Get the first day of the week from the internationalization package, or else use Sunday as default.
        var firstday = this.get('strings.first_weekday') || 0,
            // Compute the cutoff column of the masked calendar table, based on the start date and the first day of week.
            cutoffCol = this._getCutoffColumn(newDate, firstday),
            // Compute the number of days in the month based on starting date
            daysInMonth = ydate.daysInMonth(newDate),
            // Get pane id for easier reference
            paneId = pane.get("id"),
            column,
            currentColumn,
            curCell;

        // Hide the pane before making DOM changes to speed them up
        pane.setStyle("visibility", "hidden");
        pane.setAttribute("aria-label", ydate.format(newDate, {format:"%B %Y"}));

        // Go through all columns, and flip their visibility setting based on whether they are within the unmasked range.
        for (column = 0; column <= 12; column++) {
            currentColumn = pane.all("." + "calendar_col" + column);
            currentColumn.removeClass(CAL_COL_HIDDEN);

            if (column < cutoffCol || column >= (cutoffCol + 7)) {
                currentColumn.addClass(CAL_COL_HIDDEN);
            } else {
                // Clean up dates in visible columns to account for the correct number of days in a month
                switch(column) {
                    case 0:
                        curCell = pane.one("#" + paneId + "_0_30");
                        if (daysInMonth >= 30) {
                            curCell.set("text", "30");
                            curCell.removeClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);
                        } else {
                            curCell.setContent("&nbsp;");
                            curCell.removeClass(CAL_DAY).addClass(CAL_NEXTMONTH_DAY);
                        }
                        break;
                    case 1:
                        curCell = pane.one("#" + paneId + "_1_31");
                        if (daysInMonth >= 31) {
                            curCell.set("text", "31");
                            curCell.removeClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);
                        } else {
                            curCell.setContent("&nbsp;");
                            curCell.removeClass(CAL_DAY).addClass(CAL_NEXTMONTH_DAY);
                        }
                        break;
                    case 6:
                        curCell = pane.one("#" + paneId + "_6_29");
                        if (daysInMonth >= 29) {
                            curCell.set("text", "29");
                            curCell.removeClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);
                        } else {
                            curCell.setContent("&nbsp;");
                            curCell.removeClass(CAL_DAY).addClass(CAL_NEXTMONTH_DAY);
                        }
                        break;
                    case 7:
                        curCell = pane.one("#" + paneId + "_7_30");
                        if (daysInMonth >= 30) {
                            curCell.set("text", "30");
                            curCell.removeClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);
                        } else {
                            curCell.setContent("&nbsp;");
                            curCell.removeClass(CAL_DAY).addClass(CAL_NEXTMONTH_DAY);
                        }
                        break;
                    case 8:
                        curCell = pane.one("#" + paneId + "_8_31");
                        if (daysInMonth >= 31) {
                            curCell.set("text", "31");
                            curCell.removeClass(CAL_NEXTMONTH_DAY).addClass(CAL_DAY);
                        } else {
                            curCell.setContent("&nbsp;");
                            curCell.removeClass(CAL_DAY).addClass(CAL_NEXTMONTH_DAY);
                        }
                        break;
                }
            }
        }

        // Update stored pane properties
        this._paneProperties[paneId].cutoffCol = cutoffCol;
        this._paneProperties[paneId].daysInMonth = daysInMonth;
        this._paneProperties[paneId].paneDate = newDate;

        // Bring the pane visibility back after all DOM changes are done
        pane.setStyle("visibility", "inherit");

    };

}, '@VERSION@', {"requires": ["calendar"]});
