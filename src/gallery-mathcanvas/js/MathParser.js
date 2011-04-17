/* Jison generated parser */
var MathParser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expressions":3,"e":4,"EOF":5,"NUMBER":6,"E":7,"PI":8,"I":9,"(":10,")":11,"+":12,"-":13,"*":14,"/":15,"^":16,"ABS":17,"PHASE":18,"MIN":19,"arglist":20,"MAX":21,"SQRT":22,"LN":23,"ARCSIN":24,"ARCCOS":25,"ARCTAN":26,"SIN":27,"COS":28,"TAN":29,"SINH":30,"COSH":31,"TANH":32,"ARCSINH":33,"ARCCOSH":34,"ARCTANH":35,",":36,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"NUMBER",7:"E",8:"PI",9:"I",10:"(",11:")",12:"+",13:"-",14:"*",15:"/",16:"^",17:"ABS",18:"PHASE",19:"MIN",21:"MAX",22:"SQRT",23:"LN",24:"ARCSIN",25:"ARCCOS",26:"ARCTAN",27:"SIN",28:"COS",29:"TAN",30:"SINH",31:"COSH",32:"TANH",33:"ARCSINH",34:"ARCCOSH",35:"ARCTANH",36:","},
productions_: [0,[3,2],[4,1],[4,1],[4,1],[4,1],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,2],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[20,1],[20,3]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:return $$[$0-1];
break;
case 2:this.$ = new yy.MathFunction.Value(yytext);
break;
case 3:this.$ = new yy.MathFunction.E();
break;
case 4:this.$ = new yy.MathFunction.Pi();
break;
case 5:this.$ = new yy.MathFunction.I();
break;
case 6:this.$ = $$[$0-1];
break;
case 7:this.$ = yy.MathFunction.updateSum($$[$0-2], $$[$0]);
break;
case 8:this.$ = yy.MathFunction.updateSum($$[$0-2], new yy.MathFunction.Negate($$[$0]));
break;
case 9:this.$ = $$[$0-2]*$$[$0];
break;
case 10:this.$ = $$[$0-2]/$$[$0];
break;
case 11:this.$ = Math.pow($$[$0-2], $$[$0]);
break;
case 12:this.$ = new yy.MathFunction.Negate($$[$0]);
break;
case 13:this.$ = new yy.MathFunction.Magnitude($$[$0-1]);
break;
case 14:this.$ = new yy.MathFunction.Phase($$[$0-1]);
break;
case 15:this.$ = new yy.MathFunction.Min($$[$0-1]);
break;
case 16:this.$ = new yy.MathFunction.Max($$[$0-1]);
break;
case 17:this.$ = new yy.MathFunction.SquareRoot($$[$0-1]);
break;
case 18:this.$ = new yy.MathFunction.NaturalLog($$[$0-1]);
break;
case 19:this.$ = new yy.MathFunction.Arcsine($$[$0-1]);
break;
case 20:this.$ = new yy.MathFunction.Arccosine($$[$0-1]);
break;
case 21:this.$ = new yy.MathFunction.Arctangent($$[$0-1]);
break;
case 22:this.$ = new yy.MathFunction.Sine($$[$0-1]);
break;
case 23:this.$ = new yy.MathFunction.Cosine($$[$0-1]);
break;
case 24:this.$ = new yy.MathFunction.Tangent($$[$0-1]);
break;
case 25:this.$ = new yy.MathFunction.HyperbolicSine($$[$0-1]);
break;
case 26:this.$ = new yy.MathFunction.HyperbolicCosine($$[$0-1]);
break;
case 27:this.$ = new yy.MathFunction.HyperbolicTangent($$[$0-1]);
break;
case 28:this.$ = new yy.MathFunction.InverseHyperbolicSine($$[$0-1]);
break;
case 29:this.$ = new yy.MathFunction.InverseHyperbolicCosine($$[$0-1]);
break;
case 30:this.$ = new yy.MathFunction.InverseHyperbolicTangent($$[$0-1]);
break;
case 31:this.$ = [ $$[$0] ];
break;
case 32:this.$ = $$[$0-2].concat($$[$0]);
break;
}
},
table: [{3:1,4:2,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{1:[3]},{5:[1,27],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{5:[2,2],11:[2,2],12:[2,2],13:[2,2],14:[2,2],15:[2,2],16:[2,2],36:[2,2]},{5:[2,3],11:[2,3],12:[2,3],13:[2,3],14:[2,3],15:[2,3],16:[2,3],36:[2,3]},{5:[2,4],11:[2,4],12:[2,4],13:[2,4],14:[2,4],15:[2,4],16:[2,4],36:[2,4]},{5:[2,5],11:[2,5],12:[2,5],13:[2,5],14:[2,5],15:[2,5],16:[2,5],36:[2,5]},{4:33,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:34,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{10:[1,35]},{10:[1,36]},{10:[1,37]},{10:[1,38]},{10:[1,39]},{10:[1,40]},{10:[1,41]},{10:[1,42]},{10:[1,43]},{10:[1,44]},{10:[1,45]},{10:[1,46]},{10:[1,47]},{10:[1,48]},{10:[1,49]},{10:[1,50]},{10:[1,51]},{10:[1,52]},{1:[2,1]},{4:53,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:54,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:55,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:56,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:57,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{11:[1,58],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{5:[2,12],11:[2,12],12:[2,12],13:[2,12],14:[2,12],15:[2,12],16:[2,12],36:[2,12]},{4:59,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:60,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:62,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],20:61,21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:62,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],20:63,21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:64,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:65,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:66,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:67,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:68,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:69,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:70,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:71,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:72,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:73,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:74,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:75,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:76,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{4:77,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{5:[2,7],11:[2,7],12:[2,7],13:[2,7],14:[1,30],15:[1,31],16:[1,32],36:[2,7]},{5:[2,8],11:[2,8],12:[2,8],13:[2,8],14:[1,30],15:[1,31],16:[1,32],36:[2,8]},{5:[2,9],11:[2,9],12:[2,9],13:[2,9],14:[2,9],15:[2,9],16:[1,32],36:[2,9]},{5:[2,10],11:[2,10],12:[2,10],13:[2,10],14:[2,10],15:[2,10],16:[1,32],36:[2,10]},{5:[2,11],11:[2,11],12:[2,11],13:[2,11],14:[2,11],15:[2,11],16:[2,11],36:[2,11]},{5:[2,6],11:[2,6],12:[2,6],13:[2,6],14:[2,6],15:[2,6],16:[2,6],36:[2,6]},{11:[1,78],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{11:[1,79],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{11:[1,80],36:[1,81]},{11:[2,31],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32],36:[2,31]},{11:[1,82],36:[1,81]},{11:[1,83],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{11:[1,84],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{11:[1,85],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{11:[1,86],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{11:[1,87],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{11:[1,88],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{11:[1,89],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{11:[1,90],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{11:[1,91],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{11:[1,92],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{11:[1,93],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{11:[1,94],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{11:[1,95],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{11:[1,96],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32]},{5:[2,13],11:[2,13],12:[2,13],13:[2,13],14:[2,13],15:[2,13],16:[2,13],36:[2,13]},{5:[2,14],11:[2,14],12:[2,14],13:[2,14],14:[2,14],15:[2,14],16:[2,14],36:[2,14]},{5:[2,15],11:[2,15],12:[2,15],13:[2,15],14:[2,15],15:[2,15],16:[2,15],36:[2,15]},{4:97,6:[1,3],7:[1,4],8:[1,5],9:[1,6],10:[1,7],13:[1,8],17:[1,9],18:[1,10],19:[1,11],21:[1,12],22:[1,13],23:[1,14],24:[1,15],25:[1,16],26:[1,17],27:[1,18],28:[1,19],29:[1,20],30:[1,21],31:[1,22],32:[1,23],33:[1,24],34:[1,25],35:[1,26]},{5:[2,16],11:[2,16],12:[2,16],13:[2,16],14:[2,16],15:[2,16],16:[2,16],36:[2,16]},{5:[2,17],11:[2,17],12:[2,17],13:[2,17],14:[2,17],15:[2,17],16:[2,17],36:[2,17]},{5:[2,18],11:[2,18],12:[2,18],13:[2,18],14:[2,18],15:[2,18],16:[2,18],36:[2,18]},{5:[2,19],11:[2,19],12:[2,19],13:[2,19],14:[2,19],15:[2,19],16:[2,19],36:[2,19]},{5:[2,20],11:[2,20],12:[2,20],13:[2,20],14:[2,20],15:[2,20],16:[2,20],36:[2,20]},{5:[2,21],11:[2,21],12:[2,21],13:[2,21],14:[2,21],15:[2,21],16:[2,21],36:[2,21]},{5:[2,22],11:[2,22],12:[2,22],13:[2,22],14:[2,22],15:[2,22],16:[2,22],36:[2,22]},{5:[2,23],11:[2,23],12:[2,23],13:[2,23],14:[2,23],15:[2,23],16:[2,23],36:[2,23]},{5:[2,24],11:[2,24],12:[2,24],13:[2,24],14:[2,24],15:[2,24],16:[2,24],36:[2,24]},{5:[2,25],11:[2,25],12:[2,25],13:[2,25],14:[2,25],15:[2,25],16:[2,25],36:[2,25]},{5:[2,26],11:[2,26],12:[2,26],13:[2,26],14:[2,26],15:[2,26],16:[2,26],36:[2,26]},{5:[2,27],11:[2,27],12:[2,27],13:[2,27],14:[2,27],15:[2,27],16:[2,27],36:[2,27]},{5:[2,28],11:[2,28],12:[2,28],13:[2,28],14:[2,28],15:[2,28],16:[2,28],36:[2,28]},{5:[2,29],11:[2,29],12:[2,29],13:[2,29],14:[2,29],15:[2,29],16:[2,29],36:[2,29]},{5:[2,30],11:[2,30],12:[2,30],13:[2,30],14:[2,30],15:[2,30],16:[2,30],36:[2,30]},{11:[2,32],12:[1,28],13:[1,29],14:[1,30],15:[1,31],16:[1,32],36:[2,32]}],
defaultActions: {27:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    };

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+'\nExpecting '+expected.join(', ');
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};/* Jison generated lexer */
var lexer = (function(){var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);
            if (match) {
                lines = match[0].match(/\n.*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                if (token) return token;
                else return;
            }
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    }});
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:return 6;
break;
case 1:return 8;
break;
case 2:return 7;
break;
case 3:return 9;
break;
case 4:return 14;
break;
case 5:return 15;
break;
case 6:return 13;
break;
case 7:return 12;
break;
case 8:return 16;
break;
case 9:return 10;
break;
case 10:return 11;
break;
case 11:return 36;
break;
case 12:return 17;
break;
case 13:return 18;
break;
case 14:return 21;
break;
case 15:return 19;
break;
case 16:return 22;
break;
case 17:return 23;
break;
case 18:return 24;
break;
case 19:return 25;
break;
case 20:return 26;
break;
case 21:return 27;
break;
case 22:return 28;
break;
case 23:return 29;
break;
case 24:return 30;
break;
case 25:return 31;
break;
case 26:return 32;
break;
case 27:return 33;
break;
case 28:return 34;
break;
case 29:return 35;
break;
case 30:/* skip whitespace */
break;
case 31:return 5;
break;
}
};
lexer.rules = [/^[0-9]+(\.[0-9]+)?\b\b/,/^pi\b/,/^e\b/,/^i\b/,/^\*/,/^\//,/^-/,/^\+/,/^\^/,/^\(/,/^\)/,/^,/,/^abs\b/,/^phase\b/,/^max\b/,/^min\b/,/^sqrt\b/,/^ln\b/,/^arcsin\b/,/^arccos\b/,/^arctan\b/,/^sin\b/,/^cos\b/,/^tan\b/,/^sinh\b/,/^cosh\b/,/^tanh\b/,/^arcsinh\b/,/^arccosh\b/,/^arctanh\b/,/^\s+/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = MathParser;
exports.parse = function () { return MathParser.parse.apply(MathParser, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}