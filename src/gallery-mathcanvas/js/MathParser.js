/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var MathParser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,3],$V1=[1,4],$V2=[1,5],$V3=[1,6],$V4=[1,7],$V5=[1,8],$V6=[1,9],$V7=[1,10],$V8=[1,11],$V9=[1,12],$Va=[1,13],$Vb=[1,14],$Vc=[1,15],$Vd=[1,16],$Ve=[1,17],$Vf=[1,18],$Vg=[1,19],$Vh=[1,20],$Vi=[1,21],$Vj=[1,22],$Vk=[1,23],$Vl=[1,24],$Vm=[1,25],$Vn=[1,26],$Vo=[1,27],$Vp=[1,28],$Vq=[1,29],$Vr=[1,30],$Vs=[1,31],$Vt=[1,32],$Vu=[1,33],$Vv=[1,34],$Vw=[1,35],$Vx=[1,37],$Vy=[1,38],$Vz=[1,39],$VA=[1,40],$VB=[1,41],$VC=[5,12,13,14,15,16,17,45],$VD=[5,12,13,14,45],$VE=[5,12,13,14,15,16,45],$VF=[1,107],$VG=[12,45];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expression":3,"e":4,"EOF":5,"NUMBER":6,"E":7,"PI":8,"I":9,"VARIABLE":10,"(":11,")":12,"+":13,"-":14,"*":15,"/":16,"^":17,"ABS":18,"PHASE":19,"CONJUGATE":20,"ROTATE":21,"arglist":22,"RE":23,"IM":24,"MIN":25,"MAX":26,"SQRT":27,"LOG":28,"LOG2":29,"LOG10":30,"LN":31,"ARCSIN":32,"ARCCOS":33,"ARCTAN":34,"ARCTAN2":35,"SIN":36,"COS":37,"TAN":38,"SINH":39,"COSH":40,"TANH":41,"ARCSINH":42,"ARCCOSH":43,"ARCTANH":44,",":45,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"NUMBER",7:"E",8:"PI",9:"I",10:"VARIABLE",11:"(",12:")",13:"+",14:"-",15:"*",16:"/",17:"^",18:"ABS",19:"PHASE",20:"CONJUGATE",21:"ROTATE",23:"RE",24:"IM",25:"MIN",26:"MAX",27:"SQRT",28:"LOG",29:"LOG2",30:"LOG10",31:"LN",32:"ARCSIN",33:"ARCCOS",34:"ARCTAN",35:"ARCTAN2",36:"SIN",37:"COS",38:"TAN",39:"SINH",40:"COSH",41:"TANH",42:"ARCSINH",43:"ARCCOSH",44:"ARCTANH",45:","},
productions_: [0,[3,2],[4,1],[4,1],[4,1],[4,1],[4,1],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,2],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[22,1],[22,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
return $$[$0-1];
break;
case 2:
this.$ = new yy.MathFunction.Value(yytext);
break;
case 3:
this.$ = new yy.MathFunction.E();
break;
case 4:
this.$ = new yy.MathFunction.Pi();
break;
case 5:
this.$ = new yy.MathFunction.I();
break;
case 6:
this.$ = new yy.MathFunction.Variable(yytext);
break;
case 7:
this.$ = $$[$0-1];
break;
case 8:
this.$ = yy.MathFunction.updateSum($$[$0-2], $$[$0]);
break;
case 9:
this.$ = yy.MathFunction.updateSum($$[$0-2], new yy.MathFunction.Negate($$[$0]));
break;
case 10:
this.$ = yy.MathFunction.updateProduct($$[$0-2], $$[$0]);
break;
case 11:
this.$ = new yy.MathFunction.Quotient($$[$0-2], $$[$0]);
break;
case 12:
this.$ = new yy.MathFunction.Exponential($$[$0-2], $$[$0]);
break;
case 13:
this.$ = new yy.MathFunction.Negate($$[$0]);
break;
case 14:
this.$ = new yy.MathFunction.Magnitude($$[$0-1]);
break;
case 15:
this.$ = new yy.MathFunction.Phase($$[$0-1]);
break;
case 16:
this.$ = new yy.MathFunction.Conjugate($$[$0-1]);
break;
case 17:
this.$ = new yy.MathFunction.Rotate($$[$0-1]);
break;
case 18:
this.$ = new yy.MathFunction.RealPart($$[$0-1]);
break;
case 19:
this.$ = new yy.MathFunction.ImaginaryPart($$[$0-1]);
break;
case 20:
this.$ = new yy.MathFunction.Min($$[$0-1]);
break;
case 21:
this.$ = new yy.MathFunction.Max($$[$0-1]);
break;
case 22:
this.$ = new yy.MathFunction.SquareRoot($$[$0-1]);
break;
case 23:
this.$ = new yy.MathFunction.Logarithm($$[$0-1]);
break;
case 24:
this.$ = new yy.MathFunction.Logarithm(new yy.MathFunction.Value(2), $$[$0-1]);
break;
case 25:
this.$ = new yy.MathFunction.Logarithm(new yy.MathFunction.Value(10), $$[$0-1]);
break;
case 26:
this.$ = new yy.MathFunction.NaturalLog($$[$0-1]);
break;
case 27:
this.$ = new yy.MathFunction.Arcsine($$[$0-1]);
break;
case 28:
this.$ = new yy.MathFunction.Arccosine($$[$0-1]);
break;
case 29:
this.$ = new yy.MathFunction.Arctangent($$[$0-1]);
break;
case 30:
this.$ = new yy.MathFunction.Arctangent2($$[$0-1]);
break;
case 31:
this.$ = new yy.MathFunction.Sine($$[$0-1]);
break;
case 32:
this.$ = new yy.MathFunction.Cosine($$[$0-1]);
break;
case 33:
this.$ = new yy.MathFunction.Tangent($$[$0-1]);
break;
case 34:
this.$ = new yy.MathFunction.HyperbolicSine($$[$0-1]);
break;
case 35:
this.$ = new yy.MathFunction.HyperbolicCosine($$[$0-1]);
break;
case 36:
this.$ = new yy.MathFunction.HyperbolicTangent($$[$0-1]);
break;
case 37:
this.$ = new yy.MathFunction.InverseHyperbolicSine($$[$0-1]);
break;
case 38:
this.$ = new yy.MathFunction.InverseHyperbolicCosine($$[$0-1]);
break;
case 39:
this.$ = new yy.MathFunction.InverseHyperbolicTangent($$[$0-1]);
break;
case 40:
this.$ = [ $$[$0] ];
break;
case 41:
this.$ = $$[$0-2].concat($$[$0]);
break;
}
},
table: [{3:1,4:2,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{1:[3]},{5:[1,36],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},o($VC,[2,2]),o($VC,[2,3]),o($VC,[2,4]),o($VC,[2,5]),o($VC,[2,6]),{4:42,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:43,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{11:[1,44]},{11:[1,45]},{11:[1,46]},{11:[1,47]},{11:[1,48]},{11:[1,49]},{11:[1,50]},{11:[1,51]},{11:[1,52]},{11:[1,53]},{11:[1,54]},{11:[1,55]},{11:[1,56]},{11:[1,57]},{11:[1,58]},{11:[1,59]},{11:[1,60]},{11:[1,61]},{11:[1,62]},{11:[1,63]},{11:[1,64]},{11:[1,65]},{11:[1,66]},{11:[1,67]},{11:[1,68]},{11:[1,69]},{1:[2,1]},{4:70,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:71,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:72,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:73,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:74,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{12:[1,75],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},o($VC,[2,13]),{4:76,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:77,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:78,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:80,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,22:79,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:81,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:82,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:80,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,22:83,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:80,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,22:84,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:85,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:80,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,22:86,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:87,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:88,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:89,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:90,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:91,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:92,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:80,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,22:93,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:94,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:95,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:96,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:97,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:98,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:99,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:100,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:101,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},{4:102,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},o($VD,[2,8],{15:$Vz,16:$VA,17:$VB}),o($VD,[2,9],{15:$Vz,16:$VA,17:$VB}),o($VE,[2,10],{17:$VB}),o($VE,[2,11],{17:$VB}),o($VE,[2,12],{17:$VB}),o($VC,[2,7]),{12:[1,103],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,104],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,105],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,106],45:$VF},o($VG,[2,40],{13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB}),{12:[1,108],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,109],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,110],45:$VF},{12:[1,111],45:$VF},{12:[1,112],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,113],45:$VF},{12:[1,114],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,115],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,116],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,117],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,118],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,119],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,120],45:$VF},{12:[1,121],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,122],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,123],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,124],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,125],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,126],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,127],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,128],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},{12:[1,129],13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB},o($VC,[2,14]),o($VC,[2,15]),o($VC,[2,16]),o($VC,[2,17]),{4:130,6:$V0,7:$V1,8:$V2,9:$V3,10:$V4,11:$V5,14:$V6,18:$V7,19:$V8,20:$V9,21:$Va,23:$Vb,24:$Vc,25:$Vd,26:$Ve,27:$Vf,28:$Vg,29:$Vh,30:$Vi,31:$Vj,32:$Vk,33:$Vl,34:$Vm,35:$Vn,36:$Vo,37:$Vp,38:$Vq,39:$Vr,40:$Vs,41:$Vt,42:$Vu,43:$Vv,44:$Vw},o($VC,[2,18]),o($VC,[2,19]),o($VC,[2,20]),o($VC,[2,21]),o($VC,[2,22]),o($VC,[2,23]),o($VC,[2,24]),o($VC,[2,25]),o($VC,[2,26]),o($VC,[2,27]),o($VC,[2,28]),o($VC,[2,29]),o($VC,[2,30]),o($VC,[2,31]),o($VC,[2,32]),o($VC,[2,33]),o($VC,[2,34]),o($VC,[2,35]),o($VC,[2,36]),o($VC,[2,37]),o($VC,[2,38]),o($VC,[2,39]),o($VG,[2,41],{13:$Vx,14:$Vy,15:$Vz,16:$VA,17:$VB})],
defaultActions: {36:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 6;	/* hex */
break;
case 1:return 6;	/* integer w/ exponent */
break;
case 2:return 6;	/* decimal w/ exponent */
break;
case 3:return 6;	/* decimal w/ exponent */
break;
case 4:return 6;	/* decimal integer */
break;
case 5:return 6;	/* zero */
break;
case 6:return 8;
break;
case 7:return 8;
break;
case 8:return 7;
break;
case 9:return 9;
break;
case 10:return 15;
break;
case 11:return 16;
break;
case 12:return 14;
break;
case 13:return 13;
break;
case 14:return 17;
break;
case 15:return 11;
break;
case 16:return 12;
break;
case 17:return 45;
break;
case 18:return 23;
break;
case 19:return 24;
break;
case 20:return 18;
break;
case 21:return 19;
break;
case 22:return 20;
break;
case 23:return 21;
break;
case 24:return 26;
break;
case 25:return 25;
break;
case 26:return 27;
break;
case 27:return 28;
break;
case 28:return 29;
break;
case 29:return 30;
break;
case 30:return 31;
break;
case 31:return 32;
break;
case 32:return 33;
break;
case 33:return 34;
break;
case 34:return 35;
break;
case 35:return 36;
break;
case 36:return 37;
break;
case 37:return 38;
break;
case 38:return 39;
break;
case 39:return 40;
break;
case 40:return 41;
break;
case 41:return 42;
break;
case 42:return 43;
break;
case 43:return 44;
break;
case 44:return 10;
break;
case 45:/* skip whitespace */
break;
case 46:return 5;
break;
}
},
rules: [/^(?:0[xX][0-9a-fA-F]+)/,/^(?:[0-9]+[eE][-+]?[0-9]+)/,/^(?:[0-9]+\.([0-9]+)?([eE][-+]?[0-9]+)?)/,/^(?:([0-9]+)?\.[0-9]+([eE][-+]?[0-9]+)?)/,/^(?:[1-9][0-9]*)/,/^(?:0\b)/,/^(?:pi\b)/,/^(?:\u03c0)/,/^(?:e\b)/,/^(?:i\b)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:\^)/,/^(?:\()/,/^(?:\))/,/^(?:,)/,/^(?:re\b)/,/^(?:im\b)/,/^(?:abs\b)/,/^(?:phase\b)/,/^(?:conjugate\b)/,/^(?:rotate\b)/,/^(?:max\b)/,/^(?:min\b)/,/^(?:sqrt\b)/,/^(?:log\b)/,/^(?:log2\b)/,/^(?:log10\b)/,/^(?:ln\b)/,/^(?:arcsin\b)/,/^(?:arccos\b)/,/^(?:arctan\b)/,/^(?:arctan2\b)/,/^(?:sin\b)/,/^(?:cos\b)/,/^(?:tan\b)/,/^(?:sinh\b)/,/^(?:cosh\b)/,/^(?:tanh\b)/,/^(?:arcsinh\b)/,/^(?:arccosh\b)/,/^(?:arctanh\b)/,/^(?:[^-*\/+^(),\s0-9][^-*\/+^(),\s]*)/,/^(?:\s+)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = MathParser;
exports.Parser = MathParser.Parser;
exports.parse = function () { return MathParser.parse.apply(MathParser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}