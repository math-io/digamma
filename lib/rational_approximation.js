'use strict';

// MODULES //

var evalrational = require( 'math-evalrational' ).factory;


// CONSTANTS //

var root1 = 1569415565 / 1073741824;
var root2 = ( 381566830 / 1073741824 ) / 1073741824;
var root3 = 0.9016312093258695918615325266959189453125e-19;
var Y = 0.99558162689208984;
var P = [
	0.25479851061131551,
	-0.32555031186804491,
	-0.65031853770896507,
	-0.28919126444774784,
	-0.045251321448739056,
	-0.0020713321167745952,
	0
];
var Q = [
	1.0,
	2.0767117023730469,
	1.4606242909763515,
	0.43593529692665969,
	0.054151797245674225,
	0.0021284987017821144,
	-0.55789841321675513e-6
];


// FUNCTIONS //

// Compile a function to evaluate a rational function based on the above coefficients...
var rateval = evalrational( P, Q );


// DIGAMMA //

/**
* FUNCTION: digamma( x )
*	Evaluates the digamma function over interval [1,2].
*
* @param {Number} x - input value
* @returns {Number} function value
*/
function digamma( x ) {
	var g;
	var r;
	g = x - root1;
	g -= root2;
	g -= root3;
	r = rateval( x - 1 );
	return g*Y + g*r;
} // end FUNCTION digamma()


// EXPORTS //

module.exports = digamma;
