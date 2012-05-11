YUI.add("gallery-canvas",function(c){function b(f,e,d){f[d]=function(){return e[d].apply(e,arguments);};}function a(e,d){this.context=e.invoke("getContext","2d");if(!this.context){c.error("Canvas requires a canvas element.");}d=d||{};this.set("pixelAlign",c.Lang.isUndefined(d.pixelAlign)?true:d.pixelAlign);for(var g in this.context){if(c.Lang.isFunction(this.context[g])&&!this[g]){b(this,this.context,g);}}}a.NAME="canvas2dcontext";a.prototype={get:function(d){if(d=="pixelAlign"){return this.pixel_align;}else{return this.context[d];}},set:function(d,e){if(d=="pixelAlign"){this.pixel_align=e;this.pixel_offset=e?0.5:0;}else{this.context[d]=e;}},moveTo:function(d,e){this._x=d;this._y=e;this.context.moveTo(d+this.pixel_offset,e+this.pixel_offset);},move:function(e,d){this.moveTo(this._x+e,this._y+d);},lineTo:function(d,e){this._x=d;this._y=e;this.context.lineTo(d+this.pixel_offset,e+this.pixel_offset);},line:function(e,d){this.lineTo(this._x+e,this._y+d);},arc:function(d,e){d+=this.pixel_offset;e+=this.pixel_offset;this.context.arc.apply(this.context,arguments);},arcTo:function(f,h,e,g,d){this.context.arcTo(f+this.pixel_offset,h+this.pixel_offset,e+this.pixel_offset,g+this.pixel_offset,d);},bezierCurveTo:function(f,e,h,g,d,i){d+=this.pixel_offset;i+=this.pixel_offset;this.context.bezierCurveTo.apply(this.context,arguments);},quadraticCurveTo:function(f,e,d,g){d+=this.pixel_offset;g+=this.pixel_offset;this.context.quadraticCurveTo.apply(this.context,arguments);},roundedRect:function(h,g,e,f,d){this.beginPath();var i=this.pixel_offset;this.moveTo(g+d,h);this.lineTo(f-d,h);this.arcTo(f,h,f,e,d);this.moveTo(f,h+d);this.lineTo(f,e-d);this.arcTo(f,e,g,e,d);this.moveTo(f-d,e);this.lineTo(g+d,e);this.arcTo(g,e,g,h,d);this.moveTo(g,e-d);this.lineTo(g,h+d);this.arcTo(g,h,f,h,d);},poly:function(d){c.Array.each(d,function(e){this.line(e.dx||0,e.dy||0);},this);}};c.namespace("Canvas");c.Canvas.Context2d=a;},"@VERSION@",{requires:["node-base"]});