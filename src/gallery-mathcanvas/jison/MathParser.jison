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

","						return ',';
"max"					return 'MAX';
"min"					return 'MIN';
"sin"					return 'SIN';
"cos"					return 'COS';
"tan"					return 'TAN';
"sqrt"					return 'SQRT';

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

	| SIN '(' e ')'
		{$$ = new yy.MathFunction.Sine($3);}
	| COS '(' e ')'
		{$$ = new yy.MathFunction.Cosine($3);}
	| TAN '(' e ')'
		{$$ = new yy.MathFunction.Tangent($3);}

	| MIN '(' arglist ')'
		{$$ = new yy.MathFunction.Min($3);}
	| MAX '(' arglist ')'
		{$$ = new yy.MathFunction.Max($3);}
	;

arglist
	: e
		{$$ = [ $1 ];}
	| arglist ',' e
		{$$ = $1.concat($3);}
	;
