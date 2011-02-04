YUI.add("gallery-checkboxgroups",function(B){var K=B.NodeList,I=Array.prototype,H=["concat","pop","push","shift","slice","splice","unshift"];B.Array.each(H,function(M){K.prototype[M]=function(){var O=[],P,N;for(P=0;P<arguments.length;P++){N=arguments[P];O.push(N._node||N._nodes||N);}return B.Node.scrubVal(I[M].apply(this._nodes,O));};});"use strict";function E(M){if(arguments.length===0){return;}this.cb_list=new B.NodeList("");this.ev_list=[];this.splice(0,0,M);this.ignore_change=false;}function F(N,M){this.checkboxChanged(N.target);}E.prototype={getCheckboxList:function(){return this.cb_list;},splice:function(P,O,M){for(var N=P;N<O;N++){this.ev_list[N].detach();}if(B.Lang.isString(M)){M=B.all(M);}if(M instanceof B.NodeList){M.each(function(Q,T){var S=P+T,R=(T===0?O:0);this.cb_list.splice(S,R,Q);this.ev_list.splice(S,R,Q.on("click",F,this));},this);}else{if(M instanceof B.Node){this.cb_list.splice(P,O,M);this.ev_list.splice(P,O,M.on("click",F,this));}else{this.cb_list.splice(P,O);this.ev_list.splice(P,O);}}},checkboxChanged:function(M){if(this.ignore_change||this.cb_list.isEmpty()||this.allDisabled()){return;}M=B.one(M);this.cb_list.each(function(N,O){if(N==M){this.enforceConstraints(this.cb_list,O);}},this);},enforceConstraints:function(M,N){},allChecked:function(){var O=this.cb_list.size();for(var N=0;N<O;N++){var M=this.cb_list.item(N);if(!M.get("disabled")&&!M.get("checked")){return false;}}return true;},allUnchecked:function(){var N=this.cb_list.size();for(var M=0;M<N;M++){if(this.cb_list.item(M).get("checked")){return false;}}return true;},allDisabled:function(){var N=this.cb_list.size();for(var M=0;M<N;M++){if(!this.cb_list.item(M).get("disabled")){return false;}}return true;}};B.CheckboxGroup=E;function J(M){this.direction=G.SLIDE_UP;J.superclass.constructor.call(this,M);}var G={SLIDE_UP:0,SLIDE_DOWN:1};function C(N,O){if(N.size()<2){return O;}var M=O;do{if(M===0){this.direction=G.SLIDE_DOWN;}else{if(M==N.size()-1){this.direction=G.SLIDE_UP;}}if(this.direction==G.SLIDE_UP){M=Math.max(0,M-1);}else{M=Math.min(N.size()-1,M+1);}}while(N.item(M).get("disabled"));return M;}B.extend(J,E,{enforceConstraints:function(N,O){if(N.item(O).get("checked")||!this.allUnchecked()){this.direction=G.SLIDE_UP;return;}var M=C.call(this,N,O);if(M==O){M=C.call(this,N,O);}this.ignore_change=true;N.item(M).set("checked",true);this.ignore_change=false;}});B.AtLeastOneCheckboxGroup=J;function L(M){L.superclass.constructor.call(this,M);}B.extend(L,E,{enforceConstraints:function(M,N){if(!M.item(N).get("checked")){return;}var P=M.size();for(var O=0;O<P;O++){if(O!=N){M.item(O).set("checked",false);}}}});B.AtMostOneCheckboxGroup=L;function A(N,M){this.select_all_cb=B.one(N);this.select_all_cb.on("click",this.toggleSelectAll,this);A.superclass.constructor.call(this,M);}B.extend(A,E,{getSelectAllCheckbox:function(){return this.select_all_cb;},toggleSelectAll:function(){var P=this.select_all_cb.get("checked");var O=this.cb_list.size();for(var N=0;N<O;N++){var M=this.cb_list.item(N);if(!M.get("disabled")){M.set("checked",P);}}},enforceConstraints:function(M,N){this.select_all_cb.set("checked",this.allChecked());}});B.SelectAllCheckboxGroup=A;function D(N,M){this.nodes=B.Lang.isString(M)?B.all(M):M;D.superclass.constructor.call(this,N);this.enforceConstraints(this.cb_list,0);}B.extend(D,E,{enforceConstraints:function(M,O){var N=this.allUnchecked();this.nodes.each(function(P){P.set("disabled",N);});}});B.EnableIfAnyCheckboxGroup=D;},"@VERSION@",{requires:["node-base"]});