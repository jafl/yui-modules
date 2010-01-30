YAHOO.env.classMap = {"Paginator": "gallery-paginator", "Paginator.ui.FirstPageLink": "gallery-paginator", "Paginator.ui.NextPageLink": "gallery-paginator", "Paginator.ui.LastPageLink": "gallery-paginator", "Paginator.ui.CurrentPageInput": "gallery-paginator", "Paginator.ui.PreviousPageLink": "gallery-paginator", "Paginator.ui.ItemRangeDropdown": "gallery-paginator", "Paginator.ui.RowsPerPageDropdown": "gallery-paginator", "Paginator.ui.CurrentPageReport": "gallery-paginator", "Paginator.ui.PageLinks": "gallery-paginator"};

YAHOO.env.resolveClass = function(className) {
    var a=className.split('.'), ns=YAHOO.env.classMap;

    for (var i=0; i<a.length; i=i+1) {
        if (ns[a[i]]) {
            ns = ns[a[i]];
        } else {
            return null;
        }
    }

    return ns;
};
