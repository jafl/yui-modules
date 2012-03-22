YUI.add("gallery-busyoverlay",function(c){function a(d){a.superclass.constructor.apply(this,arguments);}a.NAME="BusyOverlayPlugin";a.NS="busy";a.ATTRS={css:{value:"yui3-component-busy",validator:c.Lang.isString}};function b(){var d=this.getTargetNode().get("region");if(d&&(!this.target_region||d.top!==this.target_region.top||d.bottom!==this.target_region.bottom||d.left!==this.target_region.left||d.right!==this.target_region.right)){this.target_region=d;this.o.setXY([d.left,d.top]);this.o.setStyle("width",d.width+"px");this.o.setStyle("height",d.height+"px");}}c.extend(a,c.Plugin.Base,{initializer:function(d){this.o=c.Node.create('<div style="position:absolute;display:none;visibility:hidden;"></div>');this.o.set("className",this.get("css"));this.getTargetNode().get("parentNode").appendChild(this.o);this.on("cssChange",function(f){this.o.set("className",f.newVal);});},destructor:function(){this.o.remove();},isVisible:function(){return(this.o.getStyle("visibility")!="hidden");},show:function(){this.setVisible(true);},hide:function(){this.setVisible(false);},toggleVisible:function(){this.setVisible(!this.isVisible());},setVisible:function(d){this.target_region=null;this.o.setStyle("display",(d?"":"none"));b.call(this);this.o.setStyle("visibility",(d?"":"hidden"));if(d){if(!this.timer){this.timer=c.later(500,this,b,null,true);}this.getTargetNode().addClass("yui3-busyoverlay-browser-hacks");}else{if(this.timer){this.timer.cancel();this.timer=null;}this.getTargetNode().removeClass("yui3-busyoverlay-browser-hacks");}},getTargetNode:function(){var d=this.get("host");return(c.Widget&&d instanceof c.Widget?d.get("boundingBox"):d);}});c.namespace("Plugin");c.Plugin.BusyOverlay=a;},"@VERSION@",{requires:["plugin","node-pluginhost","node-screen","node-style"],skinnable:true});