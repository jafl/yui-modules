YUI.add("gallery-paginator",function(B){function C(D){C.superclass.constructor.call(this,D);}B.mix(C,{NAME:"paginator",ID_BASE:"yui-pg-",VALUE_UNLIMITED:-1,TEMPLATE_DEFAULT:"{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink}",TEMPLATE_ROWS_PER_PAGE:"{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink} {RowsPerPageDropdown}",ui:{},isNumeric:function(D){return isFinite(+D);},toNumber:function(D){return isFinite(+D)?+D:null;}},true);C.ATTRS={rowsPerPage:{value:0,validator:C.isNumeric,setter:C.toNumber},totalRecords:{value:0,validator:C.isNumeric,setter:C.toNumber},recordOffset:{value:0,validator:function(E){var D=this.get("totalRecords");if(C.isNumeric(E)){E=+E;return D===C.VALUE_UNLIMITED||D>E||(D===0&&E===0);}return false;},setter:C.toNumber},initialPage:{value:1,validator:C.isNumeric,setter:C.toNumber},template:{value:C.TEMPLATE_DEFAULT,validator:B.Lang.isString},alwaysVisible:{value:true,validator:B.Lang.isBoolean},id:{value:B.guid(),readOnly:true}};B.extend(C,B.Widget,{_batch:false,_pageChanged:false,_state:null,initializer:function(G){var I=C.VALUE_UNLIMITED,D,E,F,H;this._selfSubscribe();D=this.get("initialPage");E=this.get("totalRecords");F=this.get("rowsPerPage");if(D>1&&F!==I){H=(D-1)*F;if(E===I||H<E){this.set("recordOffset",H);}}},_selfSubscribe:function(){this.after("totalRecordsChange",this.updateVisibility,this);this.after("alwaysVisibleChange",this.updateVisibility,this);this.after("totalRecordsChange",this._handleStateChange,this);this.after("recordOffsetChange",this._handleStateChange,this);this.after("rowsPerPageChange",this._handleStateChange,this);this.after("totalRecordsChange",this._syncRecordOffset,this);},renderUI:function(){this._renderTemplate(this.get("contentBox"),this.get("template"),C.ID_BASE+this.get("id"),true);this.updateVisibility();},_renderTemplate:function(D,H,G,E){if(!D){return;}D.setStyle("display","none");D.addClass(this.getClassName());var F=this.getClassName("ui");D.set("innerHTML",H.replace(/\{([a-z0-9_ \-]+)\}/gi,'<span class="'+F+" "+F+'-$1"></span>'));D.all("span."+F).each(function(I){this.renderUIComponent(I,G);},this);if(!E){D.setStyle("display","");}},renderUIComponent:function(D,J){var I=D.get("parentNode"),H=this.getClassName("ui"),G=new RegExp(H+"-(\\w+)").exec(D.get("className")),F=G&&C.ui[G[1]],E;if(B.Lang.isFunction(F)){E=new F(this);if(B.Lang.isFunction(E.render)){I.replaceChild(E.render(J),D);}}},updateVisibility:function(I){var E=this.get("alwaysVisible"),K,J,G,H,F,D;if(!I||I.type==="alwaysVisibleChange"||!E){K=this.get("totalRecords");J=true;G=this.get("rowsPerPage");H=this.get("rowsPerPageOptions");if(B.Lang.isArray(H)){for(F=0,D=H.length;F<D;++F){G=Math.min(G,H[F]);}}if(K!==C.VALUE_UNLIMITED&&K<=G){J=false;}J=J||E;this.get("contentBox").setStyle("display",J?"":"none");}},getTotalPages:function(){var D=this.get("totalRecords"),E=this.get("rowsPerPage");if(!E){return null;}if(D===C.VALUE_UNLIMITED){return C.VALUE_UNLIMITED;}return Math.ceil(D/E);},hasPage:function(E){if(!B.Lang.isNumber(E)||E<1){return false;}var D=this.getTotalPages();return(D===C.VALUE_UNLIMITED||D>=E);},getCurrentPage:function(){var D=this.get("rowsPerPage");if(!D||!this.get("totalRecords")){return 0;}return Math.floor(this.get("recordOffset")/D)+1;},hasNextPage:function(){var D=this.getCurrentPage(),E=this.getTotalPages();return D&&(E===C.VALUE_UNLIMITED||D<E);},getNextPage:function(){return this.hasNextPage()?this.getCurrentPage()+1:null;},hasPreviousPage:function(){return(this.getCurrentPage()>1);},getPreviousPage:function(){return(this.hasPreviousPage()?this.getCurrentPage()-1:1);},getPageRecords:function(G){if(!B.Lang.isNumber(G)){G=this.getCurrentPage();}var F=this.get("rowsPerPage"),E=this.get("totalRecords"),H,D;if(!G||!F){return null;}H=(G-1)*F;if(E!==C.VALUE_UNLIMITED){if(H>=E){return null;}D=Math.min(H+F,E)-1;}else{D=H+F-1;}return[H,D];},setPage:function(E,D){if(this.hasPage(E)&&E!==this.getCurrentPage()){if(D){this.set("recordOffset",(E-1)*this.get("rowsPerPage"));}else{this.fire("changeRequest",this.getState({"page":E}));}}},getRowsPerPage:function(){return this.get("rowsPerPage");},setRowsPerPage:function(E,D){if(C.isNumeric(E)&&+E>0&&+E!==this.get("rowsPerPage")){if(D){this.set("rowsPerPage",E);}else{this.fire("changeRequest",this.getState({"rowsPerPage":+E}));}}},getTotalRecords:function(){return this.get("totalRecords");},setTotalRecords:function(E,D){if(C.isNumeric(E)&&+E>=0&&+E!==this.get("totalRecords")){if(D){this.set("totalRecords",E);}else{this.fire("changeRequest",this.getState({"totalRecords":+E}));}}},getStartIndex:function(){return this.get("recordOffset");},setStartIndex:function(E,D){if(C.isNumeric(E)&&+E>=0&&+E!==this.get("recordOffset")){if(D){this.set("recordOffset",E);}else{this.fire("changeRequest",this.getState({"recordOffset":+E}));}}},getState:function(J){var L=C.VALUE_UNLIMITED,H=Math,I=H.max,K=H.ceil,F,D,G;function E(O,M,N){if(O<=0||M===0){return 0;}if(M===L||M>O){return O-(O%N);}return M-(M%N||N);}F={paginator:this,totalRecords:this.get("totalRecords"),rowsPerPage:this.get("rowsPerPage"),records:this.getPageRecords()};F.recordOffset=E(this.get("recordOffset"),F.totalRecords,F.rowsPerPage);F.page=K(F.recordOffset/F.rowsPerPage)+1;if(!J){return F;}D={paginator:this,before:F,rowsPerPage:J.rowsPerPage||F.rowsPerPage,totalRecords:(C.isNumeric(J.totalRecords)?I(J.totalRecords,L):+F.totalRecords)};if(D.totalRecords===0){D.recordOffset=D.page=0;}else{G=C.isNumeric(J.page)?(J.page-1)*D.rowsPerPage:C.isNumeric(J.recordOffset)?+J.recordOffset:F.recordOffset;D.recordOffset=E(G,D.totalRecords,D.rowsPerPage);D.page=K(D.recordOffset/D.rowsPerPage)+1;}D.records=[D.recordOffset,D.recordOffset+D.rowsPerPage-1];if(D.totalRecords!==L&&D.recordOffset<D.totalRecords&&D.records&&D.records[1]>D.totalRecords-1){D.records[1]=D.totalRecords-1;}return D;},setState:function(E){if(B.Lang.isObject(E)){this._state=this.getState({});E={page:E.page,rowsPerPage:E.rowsPerPage,totalRecords:E.totalRecords,recordOffset:E.recordOffset};
if(E.page&&E.recordOffset===undefined){E.recordOffset=(E.page-1)*(E.rowsPerPage||this.get("rowsPerPage"));}this._batch=true;this._pageChanged=false;for(var D in E){if(E.hasOwnProperty(D)&&this._configs.hasOwnProperty(D)){this.set(D,E[D]);}}this._batch=false;if(this._pageChanged){this._pageChanged=false;this._firePageChange(this.getState(this._state));}}},_syncRecordOffset:function(G){var D=G.newValue,F,E;if(G.prevValue!==D){if(D!==C.VALUE_UNLIMITED){F=this.get("rowsPerPage");if(F&&this.get("recordOffset")>=D){E=this.getState({totalRecords:G.prevValue,recordOffset:this.get("recordOffset")});this.set("recordOffset",E.before.recordOffset);this._firePageChange(E);}}}},_handleStateChange:function(E){if(E.prevValue!==E.newValue){var F=this._state||{},D;F[E.type.replace(/Change$/,"")]=E.prevValue;D=this.getState(F);if(D.page!==D.before.page){if(this._batch){this._pageChanged=true;}else{this._firePageChange(D);}}}},_firePageChange:function(D){if(B.Lang.isObject(D)){var E=D.before;delete D.before;this.fire("pageChange",{type:"pageChange",prevValue:D.page,newValue:E.page,prevState:D,newState:E});}}});B.Paginator=C;C.ui.CurrentPageInput=function(D){this.paginator=D;D.on("destroy",this.destroy,this);D.after("recordOffsetChange",this.update,this);D.after("rowsPerPageChange",this.update,this);D.after("totalRecordsChange",this.update,this);D.after("pageInputClassChange",this.update,this);};C.ATTRS.pageInputClass={value:B.ClassNameManager.getClassName(C.NAME,"page-input"),validator:B.Lang.isString};C.ATTRS.pageInputTemplate={value:"{currentPage} of {totalPages}",validator:B.Lang.isString};C.ui.CurrentPageInput.prototype={destroy:function(){this.span.remove(true);this.span=null;this.input=null;this.page_count=null;},render:function(D){this.span=B.Node.create('<span id="'+D+'-page-input">'+B.substitute(this.paginator.get("pageInputTemplate"),{currentPage:'<input class="yui-page-input"></input>',totalPages:'<span class="yui-page-count"></span>'})+"</span>");this.span.set("className",this.paginator.get("pageInputClass"));this.input=this.span.one("input");this.input.on("change",this._onChange,this);this.input.on("key",this._onReturnKey,"down:13",this);this.page_count=this.span.one("span.yui-page-count");this.update();return this.span;},update:function(D){if(D&&D.prevVal===D.newVal){return;}this.span.set("className",this.paginator.get("pageInputClass"));this.input.set("value",this.paginator.getCurrentPage());this.page_count.set("innerHTML",this.paginator.getTotalPages());},_onChange:function(D){this.paginator.setPage(parseInt(this.input.get("value"),10));},_onReturnKey:function(D){D.halt(true);this.paginator.setPage(parseInt(this.input.get("value"),10));}};C.ui.CurrentPageReport=function(D){this.paginator=D;D.on("destroy",this.destroy,this);D.after("recordOffsetChange",this.update,this);D.after("rowsPerPageChange",this.update,this);D.after("totalRecordsChange",this.update,this);D.after("pageReportClassChange",this.update,this);D.after("pageReportTemplateChange",this.update,this);};C.ATTRS.pageReportClass={value:B.ClassNameManager.getClassName(C.NAME,"current"),validator:B.Lang.isString};C.ATTRS.pageReportTemplate={value:"({currentPage} of {totalPages})",validator:B.Lang.isString};C.ATTRS.pageReportValueGenerator={value:function(F){var E=F.getCurrentPage(),D=F.getPageRecords();return{"currentPage":D?E:0,"totalPages":F.getTotalPages(),"startIndex":D?D[0]:0,"endIndex":D?D[1]:0,"startRecord":D?D[0]+1:0,"endRecord":D?D[1]+1:0,"totalRecords":F.get("totalRecords")};},validator:B.Lang.isFunction};C.ui.CurrentPageReport.sprintf=function(E,D){return E.replace(/\{([\w\s\-]+)\}/g,function(F,G){return(G in D)?D[G]:"";});};C.ui.CurrentPageReport.prototype={span:null,destroy:function(){this.span.remove(true);this.span=null;},render:function(D){this.span=B.Node.create('<span id="'+D+'-page-report"></span>');this.span.set("className",this.paginator.get("pageReportClass"));this.update();return this.span;},update:function(D){if(D&&D.prevVal===D.newVal){return;}this.span.set("className",this.paginator.get("pageReportClass"));this.span.set("innerHTML",C.ui.CurrentPageReport.sprintf(this.paginator.get("pageReportTemplate"),this.paginator.get("pageReportValueGenerator")(this.paginator)));}};C.ui.FirstPageLink=function(D){this.paginator=D;D.on("destroy",this.destroy,this);D.after("recordOffsetChange",this.update,this);D.after("rowsPerPageChange",this.update,this);D.after("totalRecordsChange",this.update,this);D.after("firstPageLinkLabelChange",this.rebuild,this);D.after("firstPageLinkClassChange",this.rebuild,this);};C.ATTRS.firstPageLinkLabel={value:"&lt;&lt; first",validator:B.Lang.isString};C.ATTRS.firstPageLinkClass={value:B.ClassNameManager.getClassName(C.NAME,"first"),validator:B.Lang.isString};C.ui.FirstPageLink.prototype={current:null,link:null,span:null,destroy:function(){this.link.remove(true);this.span.remove(true);this.current=this.link=this.span=null;},render:function(E){var F=this.paginator,G=F.get("firstPageLinkClass"),D=F.get("firstPageLinkLabel");this.link=B.Node.create('<a href="#" id="'+E+'-first-link">'+D+"</a>");this.link.set("className",G);this.link.on("click",this.onClick,this);this.span=B.Node.create('<span id="'+E+'-first-span">'+D+"</span>");this.span.set("className",G);this.current=F.getCurrentPage()>1?this.link:this.span;return this.current;},update:function(E){if(E&&E.prevVal===E.newVal){return;}var D=this.current?this.current.get("parentNode"):null;if(this.paginator.getCurrentPage()>1){if(D&&this.current===this.span){D.replaceChild(this.link,this.current);this.current=this.link;}}else{if(D&&this.current===this.link){D.replaceChild(this.span,this.current);this.current=this.span;}}},rebuild:function(F){if(F&&F.prevVal===F.newVal){return;}var E=this.paginator,G=E.get("firstPageLinkClass"),D=E.get("firstPageLinkLabel");this.link.set("className",G);this.link.set("innerHTML",D);this.span.set("className",G);this.span.set("innerHTML",D);},onClick:function(D){D.halt();this.paginator.setPage(1);}};C.ui.ItemRangeDropdown=function(D){this.paginator=D;
D.on("destroy",this.destroy,this);D.after("recordOffsetChange",this.update,this);D.after("rowsPerPageChange",this.update,this);D.after("totalRecordsChange",this.update,this);D.after("itemRangeDropdownClassChange",this.update,this);};C.ATTRS.itemRangeDropdownClass={value:B.ClassNameManager.getClassName(C.NAME,"ir-dropdown"),validator:B.Lang.isString};C.ATTRS.itemRangeDropdownTemplate={value:"{currentRange} of {totalItems}",validator:B.Lang.isString};C.ui.ItemRangeDropdown.prototype={destroy:function(){this.span.remove(true);this.span=null;this.menu=null;this.page_count=null;},render:function(D){this.span=B.Node.create('<span id="'+D+'-item-range">'+B.substitute(this.paginator.get("itemRangeDropdownTemplate"),{currentRange:'<select class="yui-current-item-range"></select>',totalItems:'<span class="yui-item-count"></span>'})+"</span>");this.span.set("className",this.paginator.get("itemRangeDropdownClass"));this.menu=this.span.one("select");this.menu.on("change",this._onChange,this);this.page_count=this.span.one("span.yui-item-count");this.prev_page_count=-1;this.prev_page_size=-1;this.prev_rec_count=-1;this.update();return this.span;},update:function(K){if(K&&K.prevVal===K.newVal){return;}var J=this.paginator.getCurrentPage();var H=this.paginator.getTotalPages();var G=this.paginator.getRowsPerPage();var I=this.paginator.getTotalRecords();if(H!=this.prev_page_count||G!=this.prev_page_size||I!=this.prev_rec_count){var E=B.Node.getDOMNode(this.menu).options;E.length=0;for(var F=1;F<=H;F++){var D=this.paginator.getPageRecords(F);E[F-1]=new Option((D[0]+1)+" - "+(D[1]+1),F);}this.page_count.set("innerHTML",I);this.prev_page_count=H;this.prev_page_size=G;this.prev_rec_count=I;}this.span.set("className",this.paginator.get("itemRangeDropdownClass"));this.menu.set("selectedIndex",J-1);},_onChange:function(D){this.paginator.setPage(parseInt(this.menu.get("value"),10));}};C.ui.LastPageLink=function(D){this.paginator=D;D.on("destroy",this.destroy,this);D.after("recordOffsetChange",this.update,this);D.after("rowsPerPageChange",this.update,this);D.after("totalRecordsChange",this.update,this);D.after("lastPageLinkClassChange",this.rebuild,this);D.after("lastPageLinkLabelChange",this.rebuild,this);};C.ATTRS.lastPageLinkClass={value:B.ClassNameManager.getClassName(C.NAME,"last"),validator:B.Lang.isString};C.ATTRS.lastPageLinkLabel={value:"last &gt;&gt;",validator:B.Lang.isString};C.ui.LastPageLink.prototype={current:null,link:null,span:null,na:null,destroy:function(){this.link.remove(true);this.span.remove(true);this.na.remove(true);this.current=this.link=this.span=this.na=null;},render:function(E){var G=this.paginator,H=G.get("lastPageLinkClass"),D=G.get("lastPageLinkLabel"),F=G.getTotalPages();this.link=B.Node.create('<a href="#" id="'+E+'-last-link">'+D+"</a>");this.link.set("className",H);this.link.on("click",this.onClick,this);this.span=B.Node.create('<span id="'+E+'-last-span">'+D+"</span>");this.span.set("className",H);this.na=B.Node.create('<span id="'+E+'-last-na"></span>');switch(F){case C.VALUE_UNLIMITED:this.current=this.na;break;case G.getCurrentPage():this.current=this.span;break;default:this.current=this.link;}return this.current;},update:function(E){if(E&&E.prevVal===E.newVal){return;}var D=this.current?this.current.get("parentNode"):null,F=this.link;if(D){switch(this.paginator.getTotalPages()){case C.VALUE_UNLIMITED:F=this.na;break;case this.paginator.getCurrentPage():F=this.span;break;}if(this.current!==F){D.replaceChild(F,this.current);this.current=F;}}},rebuild:function(F){if(F&&F.prevVal===F.newVal){return;}var E=this.paginator,G=E.get("lastPageLinkClass"),D=E.get("lastPageLinkLabel");this.link.set("className",G);this.link.set("innerHTML",D);this.span.set("className",G);this.span.set("innerHTML",D);},onClick:function(D){D.halt();this.paginator.setPage(this.paginator.getTotalPages());}};C.ui.NextPageLink=function(D){this.paginator=D;D.on("destroy",this.destroy,this);D.after("recordOffsetChange",this.update,this);D.after("rowsPerPageChange",this.update,this);D.after("totalRecordsChange",this.update,this);D.after("nextPageLinkClassChange",this.rebuild,this);D.after("nextPageLinkLabelChange",this.rebuild,this);};C.ATTRS.nextPageLinkClass={value:B.ClassNameManager.getClassName(C.NAME,"next"),validator:B.Lang.isString};C.ATTRS.nextPageLinkLabel={value:"next &gt;",validator:B.Lang.isString};C.ui.NextPageLink.prototype={current:null,link:null,span:null,destroy:function(){this.link.remove(true);this.span.remove(true);this.current=this.link=this.span=null;},render:function(E){var G=this.paginator,H=G.get("nextPageLinkClass"),D=G.get("nextPageLinkLabel"),F=G.getTotalPages();this.link=B.Node.create('<a href="#" id="'+E+'-next-link">'+D+"</a>");this.link.set("className",H);this.link.on("click",this.onClick,this);this.span=B.Node.create('<span id="'+E+'-next-span">'+D+"</span>");this.span.set("className",H);this.current=G.getCurrentPage()===F?this.span:this.link;return this.current;},update:function(F){if(F&&F.prevVal===F.newVal){return;}var E=this.paginator.getTotalPages(),D=this.current?this.current.get("parentNode"):null;if(this.paginator.getCurrentPage()!==E){if(D&&this.current===this.span){D.replaceChild(this.link,this.current);this.current=this.link;}}else{if(this.current===this.link){if(D){D.replaceChild(this.span,this.current);this.current=this.span;}}}},rebuild:function(F){if(F&&F.prevVal===F.newVal){return;}var E=this.paginator,G=E.get("nextPageLinkClass"),D=E.get("nextPageLinkLabel");this.link.set("className",G);this.link.set("innerHTML",D);this.span.set("className",G);this.span.set("innerHTML",D);},onClick:function(D){D.halt();this.paginator.setPage(this.paginator.getNextPage());}};C.ui.PageLinks=function(D){this.paginator=D;D.on("destroy",this.destroy,this);D.after("recordOffsetChange",this.update,this);D.after("rowsPerPageChange",this.update,this);D.after("totalRecordsChange",this.update,this);D.after("pageLinksContainerClassChange",this.rebuild,this);D.after("pageLinkClassChange",this.rebuild,this);
D.after("currentPageClassChange",this.rebuild,this);D.after("pageLinksChange",this.rebuild,this);};C.ATTRS.pageLinksContainerClass={value:B.ClassNameManager.getClassName(C.NAME,"pages"),validator:B.Lang.isString};C.ATTRS.pageLinkClass={value:B.ClassNameManager.getClassName(C.NAME,"page"),validator:B.Lang.isString};C.ATTRS.currentPageClass={value:B.ClassNameManager.getClassName(C.NAME,"current-page"),validator:B.Lang.isString};C.ATTRS.pageLinks={value:10,validator:C.isNumeric};C.ATTRS.pageLabelBuilder={value:function(D,E){return D;},validator:B.Lang.isFunction};C.ui.PageLinks.calculateRange=function(F,G,E){var J=C.VALUE_UNLIMITED,I,D,H;if(!F||E===0||G===0||(G===J&&E===J)){return[0,-1];}if(G!==J){E=E===J?G:Math.min(E,G);}I=Math.max(1,Math.ceil(F-(E/2)));if(G===J){D=I+E-1;}else{D=Math.min(G,I+E-1);}H=E-(D-I+1);I=Math.max(1,I-H);return[I,D];};C.ui.PageLinks.prototype={current:0,container:null,destroy:function(){this.container.remove(true);this.container=null;},render:function(D){this.container=B.Node.create('<span id="'+D+'-pages"></span>');this.container.on("click",this.onClick,this);this.update({newVal:null,rebuild:true});return this.container;},update:function(K){if(K&&K.prevVal===K.newVal){return;}var F=this.paginator,J=F.getCurrentPage();if(this.current!==J||!J||K.rebuild){var M=F.get("pageLabelBuilder"),I=C.ui.PageLinks.calculateRange(J,F.getTotalPages(),F.get("pageLinks")),E=I[0],G=I[1],L="",D,H;D='<a href="#" class="'+F.get("pageLinkClass")+'" page="';for(H=E;H<=G;++H){if(H===J){L+='<span class="'+F.get("currentPageClass")+" "+F.get("pageLinkClass")+'">'+M(H,F)+"</span>";}else{L+=D+H+'">'+M(H,F)+"</a>";}}this.container.set("className",F.get("pageLinksContainerClass"));this.container.set("innerHTML",L);}},rebuild:function(D){D.rebuild=true;this.update(D);},onClick:function(E){var D=E.target;if(D&&D.hasClass(this.paginator.get("pageLinkClass"))){E.halt();this.paginator.setPage(parseInt(D.getAttribute("page"),10));}}};C.ui.PreviousPageLink=function(D){this.paginator=D;D.on("destroy",this.destroy,this);D.after("recordOffsetChange",this.update,this);D.after("rowsPerPageChange",this.update,this);D.after("totalRecordsChange",this.update,this);D.after("previousPageLinkLabelChange",this.update,this);D.after("previousPageLinkClassChange",this.update,this);};C.ATTRS.previousPageLinkClass={value:B.ClassNameManager.getClassName(C.NAME,"previous"),validator:B.Lang.isString};C.ATTRS.previousPageLinkLabel={value:"&lt; prev",validator:B.Lang.isString};C.ui.PreviousPageLink.prototype={current:null,link:null,span:null,destroy:function(){this.link.remove(true);this.span.remove(true);this.current=this.link=this.span=null;},render:function(E){var F=this.paginator,G=F.get("previousPageLinkClass"),D=F.get("previousPageLinkLabel");this.link=B.Node.create('<a href="#" id="'+E+'-prev-link">'+D+"</a>");this.link.set("className",G);this.link.on("click",this.onClick,this);this.span=B.Node.create('<span id="'+E+'-prev-span">'+D+"</span>");this.span.set("className",G);this.current=F.getCurrentPage()>1?this.link:this.span;return this.current;},update:function(E){if(E&&E.prevVal===E.newVal){return;}var D=this.current?this.current.get("parentNode"):null;if(this.paginator.getCurrentPage()>1){if(D&&this.current===this.span){D.replaceChild(this.link,this.current);this.current=this.link;}}else{if(D&&this.current===this.link){D.replaceChild(this.span,this.current);this.current=this.span;}}},onClick:function(D){D.halt();this.paginator.setPage(this.paginator.getPreviousPage());}};C.ui.RowsPerPageDropdown=function(D){this.paginator=D;D.on("destroy",this.destroy,this);D.after("rowsPerPageChange",this.update,this);D.after("totalRecordsChange",this._handleTotalRecordsChange,this);D.after("rowsPerPageDropdownClassChange",this.rebuild,this);D.after("rowsPerPageDropdownTitleChange",this.rebuild,this);D.after("rowsPerPageOptionsChange",this.rebuild,this);};C.ATTRS.rowsPerPageDropdownClass={value:B.ClassNameManager.getClassName(C.NAME,"rpp-options"),validator:B.Lang.isString};C.ATTRS.rowsPerPageDropdownTitle={value:"Rows per page",validator:B.Lang.isString};C.ATTRS.rowsPerPageOptions={value:[],validator:B.Lang.isArray};C.ui.RowsPerPageDropdown.prototype={select:null,all:null,destroy:function(){this.select.remove(true);this.all=this.select=null;},render:function(D){this.select=B.Node.create('<select id="'+D+'-rpp"></select>');this.select.on("change",this.onChange,this);this.rebuild();return this.select;},rebuild:function(L){var E=this.paginator,G=this.select,M=E.get("rowsPerPageOptions"),D=B.Node.getDOMNode(G).options,F,K,H,I,J;this.all=null;G.set("className",this.paginator.get("rowsPerPageDropdownClass"));G.set("title",this.paginator.get("rowsPerPageDropdownTitle"));for(I=0,J=M.length;I<J;++I){K=M[I];F=D[I]||G.appendChild(B.Node.create("<option/>"));H=B.Lang.isValue(K.value)?K.value:K;F.set("innerHTML",B.Lang.isValue(K.text)?K.text:K);if(B.Lang.isString(H)&&H.toLowerCase()==="all"){this.all=F;F.set("value",E.get("totalRecords"));}else{F.set("value",H);}}while(D.length>M.length){G.get("lastChild").remove();}this.update();},update:function(H){if(H&&H.prevVal===H.newVal){return;}var G=this.paginator.get("rowsPerPage")+"",E=B.Node.getDOMNode(this.select).options,F,D;for(F=0,D=E.length;F<D;++F){if(E[F].value===G){E[F].selected=true;break;}}},onChange:function(D){this.paginator.setRowsPerPage(parseInt(B.Node.getDOMNode(this.select).options[this.select.get("selectedIndex")].value,10));},_handleTotalRecordsChange:function(D){if(!this.all||(D&&D.prevVal===D.newVal)){return;}this.all.set("value",D.newVal);if(this.all.get("selected")){this.paginator.set("rowsPerPage",D.newVal);}}};C.ui.ValidationPageLinks=function(D){C.ui.ValidationPageLinks.superclass.constructor.call(this,D);D.after("pageStatusChange",this.rebuild,this);};var A="yui3-has";C.ATTRS.pageStatus={value:[],validator:B.Lang.isArray};B.extend(C.ui.ValidationPageLinks,C.ui.PageLinks,{update:function(K){if(K&&K.prevVal===K.newVal){return;}var I=this.paginator.getCurrentPage();var F='<span class="{link} {curr} {status}">{label}</span>';
var M='<a href="#" class="{link} {status}" page="{page}">{label}</a>';if(this.current!==I||!I||K.rebuild){var H=this.paginator.get("pageLinkClass");var D=this.paginator.get("pageStatus");var L=this.paginator.get("pageLabelBuilder");var G=C.ui.PageLinks.calculateRange(I,this.paginator.getTotalPages(),this.paginator.get("pageLinks"));var J="";for(var E=G[0];E<=G[1];E++){J+=B.Lang.sub(E===I?F:M,{link:H,curr:(E===I?this.paginator.get("currentPageClass"):""),status:D[E-1]?A+D[E-1]:"",page:E,label:L(E,this.paginator)});}this.container.set("innerHTML",J);}}});},"@VERSION@",{requires:["widget","event-key","substitute"],skinnable:true});