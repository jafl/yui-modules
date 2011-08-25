YUI.add("gallery-text-expander",function(B){var A=function(C){A.superclass.constructor.apply(this,arguments);};A.NAME="textExpander";A.NS="expander";A.ATTRS={line_height:{value:null},min_height:{value:null},max_height:{value:null}};B.extend(A,B.Plugin.Base,{initializer:function(C){this.t_area=this.get("host");if(this.get("line_height")){this.line_height_set=true;}else{if(!this.get("line_height")){if(this.t_area.get("lineHeight")){this.set("line_height",this.t_area.get("lineHeight"));this.line_height_set=true;}else{if(this.t_area.get("fontSize")){this.set("line_height",this.t_area.get("fontSize"));this.line_height_set=true;}else{this.prev_scroll_height=this.t_area.get("scrollHeight");this.previous_line_height=null;}}}}if(!this.get("min_height")){this.set("min_height",parseInt(this.t_area.getStyle("height"),10));}if(!this.get("max_height")){if(this.line_height_set){this.set("max_height",this.line_height*35);}else{this.set("max_height",450);}}this.t_area.setStyle("overflow","hidden");this.t_area.on("keyup",function(D){if(D.keyCode===8||D.keyCode===46||(D.keycode==88&&(D.ctrlKey||D.metaKey))){this.shrink_area();}this.enlarge_area();},this);this.enlarge_area();},enlarge_area:function(){var D=this.t_area,C=parseInt(D.getStyle("height"),10),G=0,F=D.get("scrollHeight"),E=this.get("line_height")||(F-this.prev_scroll_height);if(F>C){if(!this.line_height_set){if(E>50){E=0;}else{if(E===this.previous_line_height){this.set("line_height",E);this.line_height_set=true;}else{this.previous_line_height=E;}}}G=Math.min(F+E,this.get("max_height"));D.setStyle("height",(G+"px"));this.set_overflow();this.prev_scroll_height=F+E;}},shrink_area:function(){var F=this.t_area,D=F.get("value").length,C=F.get("offsetWidth"),G=0,E=0;if(!this.prev_len){this.prev_len=D;}if(!this.prev_width){this.prev_with=C;}if(D<this.prev_len||C>this.prev_width){F.setStyle("height","1px");G=F.get("scrollHeight");E=Math.max(this.get("min_height"),G);F.setStyle("height",E+"px");this.set_overflow();this.prev_len=D;this.prev_width=C;}},set_overflow:function(){this.t_area.setStyle("overflow",(this.t_area.get("scrollHeight")>this.get("max_height")?"auto":"hidden"));}});B.namespace("Plugin").TextExpander=A;},"@VERSION@",{requires:["plugin"]});