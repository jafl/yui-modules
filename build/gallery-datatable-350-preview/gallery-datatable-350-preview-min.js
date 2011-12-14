YUI.add("gallery-datatable-350-preview",function(a){YUI.add("gallery-datatable-350-preview-core",function(i){var e=i.Attribute.INVALID_VALUE,g=i.Lang,h=g.isFunction,d=g.isArray,b=g.isString,f=i.Object.keys,c;c=i.namespace("DataTable").Core=function(){};c.ATTRS={columns:{validator:d,getter:"_getColumns"},recordType:{validator:"_validateRecordType",writeOnce:true},data:{value:[],setter:"_setData",getter:"_getData"},headerView:{validator:"_validateView",writeOnce:true},footerView:{validator:"_validateView",writeOnce:true},bodyView:{validator:"_validateView",writeOnce:true},summary:{value:"",setter:i.Escape.html},caption:{value:""},recordset:{},columnset:{}};i.mix(c.prototype,{TABLE_TEMPLATE:"<table></table>",CAPTION_TEMPLATE:"<caption></caption>",bindUI:function(){this.after({captionChange:this._afterCaptionChange,summaryChange:this._afterSummaryChange});},getCell:function(k,j){return this.body&&this.body.getCell&&this.body.getCell(k,j);},getColumn:function(j){return this.get("columns."+j);},getRow:function(j){return this.body&&this.body.getCell&&this.body.getRow(j);},initializer:function(j){this._initColumns();this._initRecordType();this._initData();this.after("columnsChange",this._afterColumnsChange);},renderUI:function(){var j=this.get("contentBox"),k;this._renderTable();this._renderHeader();this._renderFooter();this._renderBody();k=this._tableNode;if(k){if(!k.inDoc()||!k.ancestor().compareTo(j)){j.append(k);}}},_afterCaptionChange:function(j){this._uiUpdateCaption(j.newVal);},_afterColumnsChange:function(j){this._columnMap=this._parseColumns(j.newVal);},_afterSummaryChange:function(j){this._uiUpdateSummary(j.newVal);},_createRecordClass:function(l){var k={},m,j;for(m=0,j=l.length;m<j;++m){k[l[m]]={};}return i.Base.create("record",i.Model,[],null,{ATTRS:k});},_getColumns:function(k,j){j=j.slice(8);return(j)?this._columnMap[j]:k;},_getData:function(j){return this.data||j;},_initColumns:function(){var j=this.get("columns"),l,k;if(!j){k=this.get("recordType");if(!k){l=this.get("data");if(l){if(d(l)&&l.length){j=f(l[0]);}else{if(l.size&&l.size()){k=l.item(0).constructor;}}}}if(k&&k.ATTRS){j=f(k.ATTRS);}}this._columnMap=this._parseColumns(j||[]);},_initData:function(){var k=this.get("data"),l,j;if(d(k)){l=this.get("recordType");j=k;k=new i.ModelList();if(l){k.model=l;k.reset(j,{silent:true});}}this.data=k;},_initRecordType:function(){var l,j,m,k;if(!this.get("recordType")){l=this.get("data");j=this._columnMap;if(l.model){m=l.model;}else{if(l.size&&l.size()){m=l.model=l.item(0).constructor;}else{if(d(l)&&l.length){m=this._createRecordClass(f(l[0]));}else{if(f(j).length){m=this._createRecordClass(f(j));}}}}if(m){this.set("recordType",m,{silent:true});if(!j){this._initColumns();}}else{k=this.after(["columnsChange","recordTypeChange","dataChange"],function(n){k.detach();if(!this.data.model){this._initRecordType();this.data.model=this.get("recordType");}});}}},_parseColumns:function(m,n){var l,j,k;n||(n={});for(l=0,j=m.length;l<j;++l){k=m[l];if(b(k)){k={key:k};}if(k.key){n[k.key]=k;}else{if(d(k.children)){this._parseColumns(k.children,n);}}}return n;},_renderBody:function(k,l){var j=this.get("bodyView");if(j){this.body=(h(j))?new j({source:this,container:this._tableNode,columns:this.get("columns"),modelList:this.data,cssPrefix:this._cssPrefix}):j;this.body.addTarget(this);this.body.render();}},_renderFooter:function(k,l){var j=this.get("footerView");if(j){this.foot=(h(j))?new j({source:this,container:this._tableNode,columns:this.get("columns"),modelList:this.data,cssPrefix:this._cssPrefix}):j;this.foot.addTarget(this);this.foot.render();}},_renderHeader:function(){var j=this.get("headerView");if(j){this.head=(h(j))?new j({source:this,container:this._tableNode,columns:this.get("columns"),modelList:this.data,cssPrefix:this._cssPrefix}):j;this.head.addTarget(this);this.head.render();}},_renderTable:function(){var j=this.get("caption");if(!this._tableNode){this._tableNode=i.Node.create(this.TABLE_TEMPLATE);}this._tableNode.addClass(this.getClassName("table"));this._uiUpdateSummary(this.get("summary"));this._uiUpdateCaption(j);},_setData:function(j){if(j===null){j=[];}if(d(j)){if(this.data){if(!this.data.model&&j.length){this.set("recordType",this._createRecordClass(f(j[0])));}this.data.reset(j);}}else{if(j&&j.getAttrs&&j.addTarget){this.data=j;}else{j=e;}}return j;},_uiUpdateCaption:function(k){var j=this._tableNode.one("> caption");if(k){if(!this._captionNode){this._captionNode=i.Node.create(this.CAPTION_TEMPLATE);}this._captionNode.setContent(k);if(j){if(!j.compareTo(this._captionNode)){j.replace(this._captionNode);}}else{this._tableNode.prepend(this._captionNode);}this._captionNode=j;}else{if(this._captionNode){if(j&&j.compareTo(this._captionNode)){j=null;}this._captionNode.remove(true);delete this._captionNode;}if(j){j.remove(true);}}},_uiUpdateSummary:function(j){this._tableNode.setAttribute("summary",j||"");},_validateRecordType:function(k){var j=(h(k))?k.prototype:{};return j.addTarget&&j.get&&j.getAttrs&&j.set;},_validateView:function(k){var j=h(k)?k.prototype:k;return(j===null)||(j.render&&j.addTarget);}});},"gallery-2011.12.14-21-12",{requires:["model-list"]});YUI.add("gallery-datatable-350-preview-head",function(h){var g=h.Lang.sub,e=h.Lang,b=e.isArray,c=h.Array,f=h.ClassNameManager,d=f.getClassName;h.namespace("DataTable").HeaderView=h.Base.create("tableHeader",h.View,[],{CELL_TEMPLATE:'<th id="{_yuid}" abbr="{abbr}" '+'colspan="{colspan}" rowspan="{rowspan}">'+'<div class="{linerClass}">'+"{content}"+"</div>"+"</th>",ROW_TEMPLATE:"<tr>{content}</tr>",THEAD_TEMPLATE:'<thead class="{classes}">{content}</thead>',bindUI:function(){this._eventHandles.push(this.host.after("columnsChange",this._afterColumnChange));},destructor:function(){(new h.EventHandle(this._eventHandles)).detach();},getClassName:function(){var i=c(arguments);i.unshift(this._cssPrefix);i.push(true);return d.apply(f,i);},initializer:function(i){var j=i.cssPrefix||(i.host||{}).cssPrefix;this.host=i.source;this.columns=this._parseColumns(i.columns);
this._eventHandles=[];if(j){this._cssPrefix=j;}},render:function(){var v=this.get("container"),n=this.columns,t=this.host._theadNode,o={abbr:"",colspan:1,rowspan:1,linerClass:this.getClassName("liner")},k,l,q,s,p,u,m,r;v=h.one(v);if(v&&v.get("tagName")!=="TABLE"){v=v.one("table");}if(!v){return this;}k=v.one("> ."+this.getClassName("columns"));l=k&&(!t||!t.compareTo(k));if(!t){t="";if(n.length){for(q=0,s=n.length;q<s;++q){r="";for(p=0,u=n[q].length;p<u;++p){m=n[q][p];r+=g(this.CELL_TEMPLATE,h.merge(o,m,{content:m.label||m.key||("Column "+p)}));}t+=g(this.ROW_TEMPLATE,{content:r});}}t=g(this.THEAD_TEMPLATE,{classes:this.getClassName("columns"),content:t});}if(k){if(l){k.replace(t);}}else{v.insertBefore(t,v.one("> tfoot, > tbody"));}this.bindUI();return this;},_afterColumnChange:function(i){},_cssPrefix:"table",_parseColumns:function(p){var m=[],s=[],r=1,u,v,l,k,t,o,q,n;if(b(p)&&p.length){s.push([p,-1]);while(s.length){u=s[s.length-1];v=u[0];o=u[1]+1;for(q=v.length;o<q;++o){l=v[o];k=l.children;if(typeof l==="string"){v[o]=l={key:l};}h.stamp(l);if(b(k)&&k.length){s.push([k,-1]);u[1]=o;r=Math.max(r,s.length);break;}else{l.colspan=1;}}if(o>=q){if(s.length>1){u=s[s.length-2];t=u[0][u[1]];t.colspan=0;for(o=0,q=v.length;o<q;++o){t.colspan+=v[o].colspan;v[o].parent=t;}}s.pop();}}for(o=0;o<r;++o){m.push([]);}s.push([p,-1]);while(s.length){u=s[s.length-1];v=u[0];o=u[1]+1;for(q=v.length;o<q;++o){l=v[o];k=l.children;m[s.length-1].push(l);u[1]=o;if(k&&k.length){s.push([k,-1]);break;}else{l.headers=[l._yuid];for(n=s.length-2;n>=0;--n){t=s[n][0][s[n][1]];l.headers.unshift(t._yuid);}l.rowspan=r-s.length+1;}}if(o>=q){s.pop();}}}return m;}});},"gallery-2011.12.14-21-12",{requires:["view","gallery-datatable-350-preview-core"]});YUI.add("gallery-datatable-350-preview-body",function(b){var f=b.Lang,k=f.isObject,g=f.isArray,i=b.Escape.html,j=b.Lang.sub,h=b.Array.indexOf,d=b.Array,c=b.ClassNameManager,e=c.getClassName;b.namespace("DataTable").BodyView=b.Base.create("tableBody",b.View,[],{TBODY_TEMPLATE:'<tbody class="{classes}">{content}</tbody>',ROW_TEMPLATE:'<tr id="{clientId}" class="{rowClasses}">'+"{content}"+"</tr>",CELL_TEMPLATE:'<td headers="{headers}" class="{classes}">'+'<div class="{linerClass}">'+"{content}"+"</div>"+"</td>",bindUI:function(){this._eventHandles.push(this.host.after("columnChange",this._afterColumnChange),this.get("modelList").after(["*:change","*:destroy"],this._afterDataChange,this));},destructor:function(){(new b.EventHandle(this._eventHandles)).detach();},getCell:function(n,l){var m=null;if(this._tbodyNode){m=this._tbodyNode.getDOMNode().rows[+n];m&&(m=m.cells[+l]);}return b.one(m);},getClassName:function(){var l=d(arguments);l.unshift(this._cssPrefix);l.push(true);return e.apply(c,l);},getRow:function(l){var m;if(this._tbodyNode){m=this._tbodyNode.getDOMNode().rows[+l];}return b.one(m);},initializer:function(l){var m=l.cssPrefix||(l.host||{}).cssPrefix;this.host=l.source;this.columns=this._parseColumns(l.columns);this._tbodyNode=l.tbodyNode;this._eventHandles=[];if(m){this._cssPrefix=m;}},render:function(){var p=this.get("container"),q=this.get("modelList"),n=this.columns,l=this._tbodyNode,o,m;p=b.one(p);if(p&&p.get("tagName")!=="TABLE"){p=p.one("table");}if(!p){return this;}o=p.one("> ."+this.getClassName("data"));m=o&&(!l||!l.compareTo(o));this._createRowTemplate(n);if((!l||m)&&q){l=b.Node.create(this._createDataHTML(n));this._applyNodeFormatters(l,n);}if(o){if(m){o.replace(l);}}else{p.append(l);}this.bindUI();return this;},_afterColumnsChange:function(l){this._parseColumns(l.newVal);this.render();},_afterDataChange:function(l){},_applyNodeFormatters:function(q,l){var t=this.host,o=this.get("modelList"),n=[],s=q.getDOMNode(),m="."+this.getClassName("liner"),p,r;for(p=0,r=l.length;p<r;++p){if(l[p].nodeFormatter){n.push(p);}}if(o&&n.length){o.each(function(y,z){var w={data:y.getAttrs(),record:y,rowindex:z},D=s.rows[z],x,A,v,C,B,u;if(D){for(x=0,A=n.length;x<A;++x){B=b.one(D.cells[n[x]]);if(B){v=w.column=l[n[x]];C=v.key||v._yuid;w.value=y.get(C);w.td=B;w.cell=B.one(m)||B;u=v.nodeFormatter.call(t,w);if(u===false){B.destroy(true);}}}}});}},_cssPrefix:"table",_createDataHTML:function(m){var n=this.host,p=this.get("modelList"),o=this.getClassName("odd"),r=this.getClassName("even"),q=this._rowTemplate,l="";if(p){p.each(function(w,x){var u=w.getAttrs(),v,y,s,B,A,t,z;for(v=0,y=m.length;v<y;++v){s=m[v];B=s.key||s._yuid;A=u[B];u[B+"-classes"]="";if(s.formatter){t={value:A,data:u,column:s,record:w,classnames:"",rowindex:x};if(typeof s.formatter==="string"){A=j(s.formatter,t);}else{A=s.formatter.call(n,t);if(A===undefined){A=t.value;}u[B+"-classes"]=t.classnames;}}if((A===undefined||A==="")&&s.emptyCellValue){A=s.emptyCellValue;}u[B]=A;}u.rowClasses=(x%2)?o:r;l+=j(q,u);});}return j(this.TBODY_TEMPLATE,{classes:this.getClassName("data"),content:l});},_createRowTemplate:function(n){var p="",t=this.CELL_TEMPLATE,s=this.getClassName("liner"),o,q,m,r,l;for(o=0,q=n.length;o<q;++o){m=n[o];r=m.key||m.name||m._yuid;l={content:"{"+r+"}",headers:m.headers.join(" "),linerClass:s,classes:this.getClassName(r)+" {"+r+"-classes}"};if(m.nodeFormatter){l.content="";l.attributes="";l.classes="";}p+=j(t,l);}this._rowTemplate=j(this.ROW_TEMPLATE,{content:p});},_parseColumns:function(p,o){var m,n,l;o||(o=[]);if(g(p)&&p.length){for(n=0,l=p.length;n<l;++n){m=p[n];if(typeof m==="string"){m={key:m};}if(m.key||m.formatter||m.nodeFormatter){m.index=o.length;o.push(m);}else{if(m.children){this._parseColumns(m.children,o);}}}}return o;}});},"gallery-2011.12.14-21-12",{requires:["view","gallery-datatable-350-preview-core"]});a.use("gallery-datatable-350-preview-core","gallery-datatable-350-preview-head","gallery-datatable-350-preview-body");a.DataTable.Base=a.Base.create("datatable",a.Widget,[a.DataTable.Core],null,{ATTRS:{headerView:{value:a.DataTable.HeaderView},bodyView:{value:a.DataTable.BodyView}}});a.DataTable=a.mix(a.Base.create("datatable",a.DataTable.Base,[]),a.DataTable);},"gallery-2011.12.14-21-12",{requires:["build-base","widget"]});