/* node `which jison` MathParser.jison */

/* http://zaach.github.com/jison/docs/ */

/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
"*"                   return '*';
"/"                   return '/';
"-"                   return '-';
"+"                   return '+';
"^"                   return '^';
"("                   return '(';
")"                   return ')';
"pi"                  return 'PI';
"e"                   return 'E';
"i"                   return 'I';

","						return ',';
"max"					return 'MAX';
"min"					return 'MIN';
"sqrt"					return 'SQRT';
"arcsin"				return 'ARCSIN';
"arccos"				return 'ARCCOS';
"arctan"				return 'ARCTAN';
"sin"					return 'SIN';
"cos"					return 'COS';
"tan"					return 'TAN';
"sinh"					return 'SINH';
"cosh"					return 'COSH';
"tanh"					return 'TANH';

<<EOF>>               return 'EOF';

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS

%start expressions

%% /* language grammar */

expressions
	: e EOF
		{return $1;}
	;

e
	: NUMBER
		{$$ = new yy.MathFunction.Value(yytext);}
	| E
		{$$ = new yy.MathFunction.E();}
	| PI
		{$$ = new yy.MathFunction.Pi();}
	| I
		{$$ = new yy.MathFunction.I();}

	| '(' e ')'
		{$$ = $2;}

	| e '+' e
		{$$ = $1+$3;}
	| e '-' e
		{$$ = $1-$3;}
	| e '*' e
		{$$ = $1*$3;}
	| e '/' e
		{$$ = $1/$3;}
	| e '^' e
		{$$ = Math.pow($1, $3);}
	| '-' e %prec UMINUS
		{$$ = -$2;}

	| SQRT '(' e ')'
		{$$ = new yy.MathFunction.SquareRoot($3);}

	| MIN '(' arglist ')'
		{$$ = new yy.MathFunction.Min($3);}
	| MAX '(' arglist ')'
		{$$ = new yy.MathFunction.Max($3);}

	| ARCSIN '(' e ')'
		{$$ = new yy.MathFunction.Arcsine($3);}
	| ARCCOS '(' e ')'
		{$$ = new yy.MathFunction.Arccosine($3);}
	| ARCTAN '(' e ')'
		{$$ = new yy.MathFunction.Arctangent($3);}

	| SIN '(' e ')'
		{$$ = new yy.MathFunction.Sine($3);}
	| COS '(' e ')'
		{$$ = new yy.MathFunction.Cosine($3);}
	| TAN '(' e ')'
		{$$ = new yy.MathFunction.Tangent($3);}

	| SINH '(' e ')'
		{$$ = new yy.MathFunction.HyperbolicSine($3);}
	| COSH '(' e ')'
		{$$ = new yy.MathFunction.HyperbolicCosine($3);}
	| TANH '(' e ')'
		{$$ = new yy.MathFunction.HyperbolicTangent($3);}
	;

arglist
	: e
		{$$ = [ $1 ];}
	| arglist ',' e
		{$$ = $1.concat($3);}
	;
