/* node `which jison` MathParser.jison; mv MathParser.js ../js/ */

/* http://zaach.github.com/jison/docs/ */

/* lexical grammar */
%lex

%%
[0-9]+("."[0-9]+)?\b	return 'NUMBER';

"pi"	return 'PI';
"e"		return 'E';
"i"		return 'I';

"*"	return '*';
"/"	return '/';
"-"	return '-';
"+"	return '+';
"^"	return '^';
"("	return '(';
")"	return ')';

","			return ',';
"abs"		return 'ABS';
"phase"		return 'PHASE';
"max"		return 'MAX';
"min"		return 'MIN';
"sqrt"		return 'SQRT';
"ln"		return 'LN';
"arcsin"	return 'ARCSIN';
"arccos"	return 'ARCCOS';
"arctan"	return 'ARCTAN';
"sin"		return 'SIN';
"cos"		return 'COS';
"tan"		return 'TAN';
"sinh"		return 'SINH';
"cosh"		return 'COSH';
"tanh"		return 'TANH';
"arcsinh"	return 'ARCSINH';
"arccosh"	return 'ARCCOSH';
"arctanh"	return 'ARCTANH';

\s+		/* skip whitespace */
<<EOF>>	return 'EOF';

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
		{$$ = yy.MathFunction.updateSum($1, $3);}
	| e '-' e
		{$$ = yy.MathFunction.updateSum($1, new yy.MathFunction.Negate($3));}
	| e '*' e
		{$$ = $1*$3;}
	| e '/' e
		{$$ = $1/$3;}
	| e '^' e
		{$$ = Math.pow($1, $3);}
	| '-' e %prec UMINUS
		{$$ = new yy.MathFunction.Negate($2);}

	| ABS '(' e ')'
		{$$ = new yy.MathFunction.Magnitude($3);}
	| PHASE '(' e ')'
		{$$ = new yy.MathFunction.Phase($3);}

	| MIN '(' arglist ')'
		{$$ = new yy.MathFunction.Min($3);}
	| MAX '(' arglist ')'
		{$$ = new yy.MathFunction.Max($3);}

	| SQRT '(' e ')'
		{$$ = new yy.MathFunction.SquareRoot($3);}

	| LN '(' e ')'
		{$$ = new yy.MathFunction.NaturalLog($3);}

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

	| ARCSINH '(' e ')'
		{$$ = new yy.MathFunction.InverseHyperbolicSine($3);}
	| ARCCOSH '(' e ')'
		{$$ = new yy.MathFunction.InverseHyperbolicCosine($3);}
	| ARCTANH '(' e ')'
		{$$ = new yy.MathFunction.InverseHyperbolicTangent($3);}
	;

arglist
	: e
		{$$ = [ $1 ];}
	| arglist ',' e
		{$$ = $1.concat($3);}
	;
