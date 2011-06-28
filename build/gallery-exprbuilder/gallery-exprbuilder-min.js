YUI.add("gallery-exprbuilder",function(B){function E(K){E.superclass.constructor.call(this,K);}E.NAME="exprbuilder";E.ATTRS={fieldId:{value:B.guid(),validator:B.Lang.isString,writeOnce:true},fieldName:{value:"",validator:B.Lang.isString,writeOnce:true},formMgr:{validator:function(K){return(!K||K instanceof B.FormManager);},writeOnce:true},queryBuilder:{validator:function(K){return(!K||K instanceof B.QueryBuilder);},writeOnce:true},combinatorMap:{validator:B.Lang.isObject},parenLabel:{value:"()",validator:B.Lang.isString,writeOnce:true},andLabel:{value:"AND",validator:B.Lang.isString,writeOnce:true},orLabel:{value:"OR",validator:B.Lang.isString,writeOnce:true},notLabel:{value:"NOT",validator:B.Lang.isString,writeOnce:true},clearLabel:{value:"Clear",validator:B.Lang.isString,writeOnce:true},insertLabel:{value:"Insert",validator:B.Lang.isString,writeOnce:true},resetLabel:{value:"Cancel",validator:B.Lang.isString,writeOnce:true},tooManyParensError:{value:'The expression contains an extra closing parenthesis at "{context}...".',validator:B.Lang.isString},unmatchedSingleQuoteError:{value:'The expression contains an unmatched single quote at "{context}...".',validator:B.Lang.isString},unclosedParenError:{value:'The expression contains an unclosed parenthesis at "{context}...".',validator:B.Lang.isString},noVariableSelectedError:{value:"Please choose a variable.",validator:B.Lang.isString}};function F(){this.ie_range=document.selection.createRange();}function A(O,N){N=N||O.length;this.field.focus();var L=B.Node.getDOMNode(this.field);if(L.setSelectionRange){var P=L.selectionStart;L.value=L.value.substring(0,P)+O+L.value.substring(L.selectionEnd,L.value.length);var K=P+N;L.setSelectionRange(K,K);}else{if(document.selection){if(!this.ie_range){this.ie_range=document.selection.createRange();}var M=this.ie_range.duplicate();M.text=O;this.ie_range.move("character",N);this.ie_range.select();}}}function I(K){A.call(this,"()",1);K.halt();}function J(K){return function(L){A.call(this," "+this.get(K+"Label")+" ");L.halt();};}function D(K){this.clear();K.halt();}function H(R){var O=this.get("queryBuilder");if(!O.validateFields()){R.halt();return;}var T=O.toDatabaseQuery();if(T.length===0){var N=O.get("contentBox").one("select");O.displayFieldMessage(N,this.get("noVariableSelectedError"),"error");R.halt();return;}var L=this.get("combinatorMap");var U="";var Q=" "+this.get("andLabel")+" ";for(var P=0;P<T.length;P++){var K=T[P];if(P>0){U+=Q;}U+=K[0];var S=K[1];if(S.indexOf("{")==-1){S+="{value}";}var M=L&&L[K[1]];if(M){Q=M.operator;S=M.pattern;}U+=B.Lang.substitute(S,{value:K[2].replace(/'/g,"\\'")});}A.call(this,U);O.reset();R.halt();}function G(K){this.get("queryBuilder").reset();if(K){K.halt();}}function C(M){if(M){var L=this;var K=M.validateForm;M.validateForm=function(){G.call(L);K.apply(this,arguments);};M.setFunction(this.get("fieldId"),function(N,O){return L._validateExpression(N,O,this);});}}B.extend(E,B.Widget,{initializer:function(K){C.call(this,K.formMgr);this.after("formMgrChange",function(L){if(L.prevVal){L.prevVal.setFunction(this.get("fieldId"),null);}C.call(this,L.newVal);});},renderUI:function(){var K=this.get("contentBox");K.set("innerHTML",this._field());this.field=K.one("#"+this.get("fieldId"));if(document.selection){this.field.on("change",F,this);}K.one("."+this.getClassName("paren")).on("click",I,this);var N=["and","or","not"];for(var L=0;L<N.length;L++){K.one("."+this.getClassName(N[L])).on("click",J(N[L]),this);}K.one("."+this.getClassName("clear")).on("click",D,this);var M=this.get("queryBuilder");if(M){K.appendChild(B.Node.create(this._query()));M.render(K.one("."+this.getClassName("querybuilder")));K.one("."+this.getClassName("insert")).on("click",H,this);K.one("."+this.getClassName("reset")).on("click",G,this);}},destructor:function(){var K=this.get("queryBuilder");if(K){K.destroy();}this.ie_range=null;},clear:function(){this.field.set("value","");this.field.focus();},_validateExpression:function(M,Q,R){var U=Q.get("value");var T=0;var P=-1;var K=false;var L=-1;for(var O=0;O<U.length;O++){var S=U.charAt(O);if(!K&&S=="("){if(T===0){P=O;}T++;}else{if(!K&&S==")"){T--;if(T<0){var N=B.Lang.substitute(this.get("tooManyParensError"),{context:U.substr(0,O+1)});R.displayMessage(Q,N,"error");return false;}}else{if(S=="'"&&(O===0||U.charAt(O-1)!="\\")){if(!K){L=O;}K=!K;}}}}if(K&&(T===0||L<P)){var N=B.Lang.substitute(this.get("unmatchedSingleQuoteError"),{context:U.substr(0,L+1)});R.displayMessage(Q,N,"error");return false;}else{if(T>0){var N=B.Lang.substitute(this.get("unclosedParenError"),{context:U.substr(0,P+1)});R.displayMessage(Q,N,"error");return false;}}return true;},_field:function(){var K='<div class="{td}">'+'<textarea id="{tid}" name="{tn}" class="{ff} {ta}"></textarea>'+"</div>"+'<div class="{fctl}">'+'<button class="{pc}">{paren}</button>'+'<button class="{ac}">{and}</button>'+'<button class="{oc}">{or}</button>'+'<button class="{nc}">{not}</button>'+'<button class="{cc}">{clear}</button>'+"</div>";return B.Lang.substitute(K,{td:this.getClassName("field-container"),ff:B.FormManager.field_marker_class,ta:this.getClassName("field"),tid:this.get("fieldId"),tn:this.get("fieldName"),fctl:this.getClassName("controls"),pc:this.getClassName("paren"),ac:this.getClassName("and"),oc:this.getClassName("or"),nc:this.getClassName("not"),cc:this.getClassName("clear"),paren:this.get("parenLabel"),and:this.get("andLabel"),or:this.get("orLabel"),not:this.get("notLabel"),clear:this.get("clearLabel")});},_query:function(){var K='<div class="{qb}"></div>'+'<div class="{qbctl} {fr}">'+'<button class="{ic}">{insert}</button>'+'<button class="{rc}">{reset}</button>'+"</div>";return B.Lang.substitute(K,{qb:this.getClassName("querybuilder"),qbctl:this.getClassName("querybuilder-controls"),fr:B.FormManager.row_marker_class,ic:this.getClassName("insert"),rc:this.getClassName("reset"),insert:this.get("insertLabel"),reset:this.get("resetLabel")});}});B.ExpressionBuilder=E;},"@VERSION@",{requires:["gallery-querybuilder","gallery-formmgr"],skinnable:true});
