YUI.add("gallery-effects",function(B){var F=B.Lang,I=B.DOM,H="global",E={};E.EffectQueues={instances:{},get:function(K){if(!F.isString(K)){return K;}if(!this.instances[K]){this.instances[K]=new B.AsyncQueue();}return this.instances[K];}};E.GlobalQueue=E.EffectQueues.get(H);B.mix(B.DOM,{show:function(K){B.DOM.setStyle(K,"display","");},hide:function(K){B.DOM.setStyle(K,"display","none");},displayed:function(K){return B.DOM.getStyle(K,"display")!=="none";},toggle:function(K){B.DOM[B.DOM.displayed(K)?"hide":"show"](K);},getPositionedOffset:function(L){var K=0,N=0;do{K+=L.offsetTop||0;N+=L.offsetLeft||0;L=L.offsetParent;if(L){if(L.tagName==="BODY"){break;}var M=I.getStyle(L,"position");if(M!=="static"){break;}}}while(L);return[N,K];},positionAbsolutely:function(L){if(I.getStyle(L,"position")==="absolute"){return;}var K=I.getPositionedOffset(L);I.setStyles(L,{position:"absolute",top:K[1]+"px",left:K[0]+"px",width:L.clientWidth+"px",height:L.clientHeight+"px"});},getDimensions:function(L){var O;if(I.displayed(L)){O=I.region(L);return[O.width,O.height];}var M=I.getStyle(L,"visibility"),P=I.getStyle(L,"position"),K=I.getStyle(L,"display"),N;I.setStyles(L,{visibility:"hidden",position:"absolute",display:"block"});O=I.region(L);N=[O.width,O.height];I.setStyles(L,{visibility:M,position:P,display:K});return N;},makePositioned:function(K){var L=I.getStyle(K,"position");if(L==="static"||!L){I.setStyle(K,"position","relative");}},undoPositioned:function(K){I.setStyles(K,{position:"",top:"",left:"",bottom:"",right:""});},_makeClipping:function(K){if(K._overflow){return K;}K._overflow=I.getStyle(K,"overflow")||"auto";if(K._overflow!=="hidden"){I.setStyle(K,"overflow","hidden");}},_undoClipping:function(K){if(!K._overflow){return;}I.setStyle(K,"overflow",K._overflow==="auto"?"":K._overflow);K._overflow=undefined;}});B.Node.importMethod(B.DOM,["show","hide","displayed","toggle","getPositionedOffset","positionAbsolutely","getDimensions","makePositioned","undoPositioned","_makeClipping","_undoClipping"]);var C="queue",J="setup",D="finish";E.BaseEffect=function(K){E.BaseEffect.superclass.constructor.apply(this,arguments);};E.BaseEffect.NAME="baseEffect";E.BaseEffect.ATTRS={scope:{value:H,validator:F.isString},wait:{value:true,validator:F.isBoolean},managed:{value:false,validator:F.isBoolean},anim:{validator:function(K){return K instanceof B.Anim;}},node:{writeOnce:true,validator:function(K){return K instanceof B.Node;}},config:{validator:F.isObject}};B.extend(E.BaseEffect,B.Base,{initializer:function(K){this.set("config",K);this.set("node",B.one(K.node));this.publish(C,{defaultFn:this._queue});this.publish(J,{defaultFn:this.setup});this.publish(D,{defaultFn:this.finish});if(K.beforeStart){this.on(C,K.beforeStart);}if(K.beforeSetup){this.on(J,K.beforeSetup);}if(K.afterSetup){this.after(J,K.afterSetup);}if(K.beforeFinish){this.on(D,K.beforeFinish);}if(K.afterFinish){this.after(D,K.afterFinish);}},setup:function(){},addToQueue:function(){if(!this.get("managed")){this.fire(C);}},run:function(){this.fire(J);var K=this.get("anim");K.on("end",function(L){this.fire(D,{animEnd:L});},this);K.run();},finish:function(){this._finish();if(!this.get("managed")&&!this._getQueue().isRunning()){this._getQueue().run();}},_queue:function(){var K=this._getQueue();K.add({fn:this.run,context:this,autoContinue:!this.get("wait")});if(!K.isRunning()){K.run();}},_getQueue:function(){return E.EffectQueues.get(this.get("scope"));},_finish:function(){}});E.Parallel=function(K){E.Parallel.superclass.constructor.apply(this,arguments);};E.Parallel.NAME="parallel";E.Parallel.ATTRS={effects:{value:[],validator:F.isArray}};B.extend(E.Parallel,E.BaseEffect,{initializer:function(K){this.addToQueue();},run:function(){var L=this.get("effects"),K=this.get("config");this.fire(J);if(L.length){L[L.length-1].after("animChange",function(M){M.newVal.on("end",function(){this.fire(D,{animEnd:null});},this);},this);B.Array.each(L,function(M){M.set("config",B.merge(M.get("config"),K));M.run();});}else{this.fire(D,{animEnd:null});}}});E.Opacity=function(K){E.Opacity.superclass.constructor.apply(this,arguments);};E.Opacity.NAME="opacity";B.extend(E.Opacity,E.BaseEffect,{_startOpacity:0,initializer:function(K){this._startOpacity=this.get("node").getStyle("opacity")||0;this.addToQueue();},setup:function(){var K=this.get("config");K.from={opacity:K.from!==undefined?K.from:this._startOpacity};K.to={opacity:K.to!==undefined?K.to:1};this.set("anim",new B.Anim(K));}});E.Move=function(K){E.Move.superclass.constructor.apply(this,arguments);};E.Move.NAME="move";B.extend(E.Move,E.BaseEffect,{initializer:function(K){this.addToQueue();},setup:function(){var K=this.get("config"),M=this.get("node"),L=B.Node.getDOMNode(M);M.makePositioned();if(K.mode==="absolute"){K.to={xy:[K.x,K.y]};}else{K.to={left:((K.x||0)+parseFloat(L.style.left||"0"))+"px",top:((K.y||0)+parseFloat(L.style.top||"0"))+"px"};}this.set("anim",new B.Anim(K));}});E.Scroll=function(K){E.Scroll.superclass.constructor.apply(this,arguments);};E.Scroll.NAME="scroll";B.extend(E.Scroll,E.BaseEffect,{initializer:function(K){this.addToQueue();},setup:function(){var K=this.get("config");K.to={scroll:K.to};K.from={scroll:K.from};this.set("anim",new B.Anim(K));}});E.Morph=function(K){E.Morph.superclass.constructor.apply(this,arguments);};E.Morph.NAME="morph";B.extend(E.Morph,E.BaseEffect,{initializer:function(K){this.addToQueue();},setup:function(){this.set("anim",new B.Anim(this.get("config")));}});E.Scale=function(K){E.Scale.superclass.constructor.apply(this,arguments);};E.Scale.NAME="scale";E.Scale.ATTRS={scaleX:{value:true,validator:F.isBoolean},scaleY:{value:true,validator:F.isBoolean},scaleContent:{value:true,validator:F.isBoolean},scaleFromCenter:{value:false,validator:F.isBoolean},scaleMode:{value:"box",validator:function(K){return K==="box"||K==="contents"||F.isObject(K);}},scaleFrom:{value:100,validator:F.isNumber},scaleTo:{value:200,validator:F.isNumber,setter:function(K){return K;}},restoreAfterFinish:{value:false,validator:F.isBoolean}};
B.extend(E.Scale,E.BaseEffect,{_originalStyle:{},initializer:function(K){this.addToQueue();},setup:function(){var h=this.get("config"),b=this.get("node"),g=this.get("scaleX"),f=this.get("scaleY"),a=this.get("scaleContent"),S=this.get("scaleFromCenter"),d=this.get("scaleMode"),j=this.get("scaleFrom"),Q=this.get("scaleTo"),T=b.getStyle("position"),U=b.getPositionedOffset(),O=b.getStyle("fontSize")||"100%",Y,Z;B.Array.each(["top","left","width","height","fontSize"],B.bind(function(l){this._originalStyle[l]=b.getStyle(l);},this));B.Array.each(["em","px","%","pt"],function(k){if(O.toString().indexOf(k)>0){O=parseFloat(O);Y=k;}});if(d==="box"){Z=[b.get("offsetHeight"),b.get("offsetWidth")];}else{if(/^content/.test(d)){Z=[b.get("scrollHeight"),b.get("scrollWidth")];}else{Z=[d.originalHeight,d.originalWidth];}}var N={},c={},W=Q/100,L=j/100,X=Z[1]*L,V=Z[0]*L,M=Z[1]*W,R=Z[0]*W;if(a&&O){c.fontSize=O*L+Y;N.fontSize=O*W+Y;}if(g){c.width=X+"px";N.width=M+"px";}if(f){c.height=V+"px";N.height=R+"px";}if(S){var K=(V-Z[0])/2,e=(X-Z[1])/2,i=(R-Z[0])/2,P=(M-Z[1])/2;if(T==="absolute"){if(f){c.top=(U[1]-K)+"px";N.top=(U[1]-i)+"px";}if(g){c.left=(U[0]-e)+"px";N.left=(U[0]-P)+"px";}}else{if(f){c.top=-K+"px";N.top=-i+"px";}if(g){c.left=-e+"px";N.left=-P+"px";}}}h.to=N;h.from=c;this.set("anim",new B.Anim(h));},_finish:function(){if(this.get("restoreAfterFinish")){this.get("node").setStyles(this._originalStyle);}}});E.Highlight=function(K){if(!B.one(K.node).displayed()){return;}E.Highlight.superclass.constructor.apply(this,arguments);};E.Highlight.NAME="highlight";E.Highlight.ATTRS={startColor:{value:"#ff9",validator:F.isString},endColor:{value:"#fff",validator:F.isString},restoreColor:{value:"",validator:F.isString}};B.extend(E.Highlight,E.BaseEffect,{_previousBackgroundImage:"",initializer:function(K){this.addToQueue();},setup:function(){var K=B.merge({iterations:1,direction:"alternate"},this.get("config")),L=this.get("node");K.from={backgroundColor:this.get("startColor")};K.to={backgroundColor:this.get("endColor")};if(!this.get("restoreColor")){this.set("restoreColor",L.getStyle("backgroundColor"));}this._previousBackgroundImage=L.getStyle("backgroundImage");L.setStyle("backgroundImage","none");this.set("anim",new B.Anim(K));},_finish:function(){this.get("node").setStyles({backgroundImage:this._previousBackgroundImage,backgroundColor:this.get("restoreColor")});}});E.Puff=function(K){var N=B.one(K.node),M={opacity:N.getStyle("opacity"),position:N.getStyle("position"),top:N.getStyle("top"),left:N.getStyle("left"),width:N.getStyle("width"),height:N.getStyle("height")},L=new E.Parallel(B.merge({effects:[new E.Scale({node:N,managed:true,scaleTo:200,scaleFromCenter:true,scaleContent:true,restoreAfterFinish:true}),new E.Opacity({node:N,managed:true,to:0})],duration:1},K));L.on("setup",function(){this.get("node").positionAbsolutely();});L.after("finish",function(){this.get("node").hide().setStyles(M);});return L;};E.Appear=function(K){var M=B.one(K.node),N=!M.displayed()?0:M.getStyle("opacity")||0,L=new E.Opacity(B.merge({from:N,to:1},K));L.on("setup",function(){this.get("node").setStyle("opacity",N).show();});return L;};E.Fade=function(L){var O=B.one(L.node),M=O.getStyle("opacity"),K=L.to||0,N=new E.Opacity(B.merge({from:M||1,to:K},L));N.after("finish",function(){if(K!==0){return;}this.get("node").hide().setStyle("opacity",M);});return N;};E.BlindUp=function(K){var M=B.one(K.node);M._makeClipping();var L=new E.Scale(B.merge({scaleTo:0,scaleContent:false,scaleX:false,restoreAfterFinish:true},K));L.after("finish",function(){this.get("node").hide()._undoClipping();});return L;};E.BlindDown=function(L){var N=B.one(L.node),K=N.getDimensions(),M=new E.Scale(B.merge({scaleTo:100,scaleContent:false,scaleX:false,scaleFrom:0,scaleMode:{originalHeight:K[1],originalWidth:K[0]},restoreAfterFinish:true},L));M.after("setup",function(){var O=this.get("node");O._makeClipping().setStyle("height","0px").show();});M.after("finish",function(){this.get("node")._undoClipping();});return M;};E.SwitchOff=function(L){var K,M=new E.Appear(B.merge({duration:0.4,from:0,easing:function(O,N,R,P){var Q=((-Math.cos(O/P*Math.PI)/4)+0.75)+Math.random()/4;return R*(Q>1?1:Q)+N;}},L));M.on("setup",function(){K=this.get("node").getStyle("opacity");});M.after("finish",function(){var N=new E.Scale({node:this.get("node"),scaleTo:1,duration:0.3,scaleFromCenter:false,scaleX:false,scaleContent:false,restoreAfterFinish:true});N.on("setup",function(){this.get("node").makePositioned()._makeClipping();});N.after("finish",function(){this.get("node").hide()._undoClipping().undoPositioned().setStyle("opacity",K);});});return M;};E.DropOut=function(L){var K,M=new E.Parallel(B.merge({effects:[new E.Move({node:L.node,managed:true,x:0,y:100}),new E.Opacity({node:L.node,managed:true,to:0})],duration:0.5},L));M.on("setup",function(){var N=this.get("node");K={top:N.getStyle("top"),left:N.getStyle("left"),opacity:N.getStyle("opacity")};this.get("node").makePositioned();});M.after("finish",function(){this.get("node").hide().undoPositioned().setStyles(K);});return M;};E.Squish=function(K){var L=new E.Scale(B.merge({scaleTo:0,restoreAfterFinish:true},K));L.on("setup",function(){this.get("node")._makeClipping();});L.after("finish",function(){this.get("node").hide()._undoClipping();});return L;};B.Effects=E;var G={},A="opacity move scroll scale morph highlight appear fade puff blindUp blindDown switchOff dropOut squish".split(" ");B.Array.each(A,function(K){G[K]=function(M,L){L=B.merge({node:B.get(M)},L||{});var N=new B.Effects[K.charAt(0).toUpperCase()+K.substring(1)](L);};});B.Node.importMethod(G,A);},"gallery-2010.05.21-18-16",{requires:["node","anim","async-queue"]});