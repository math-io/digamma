'use strict';

// MODULES //

var polyval = require( 'compute-polynomial' );
var ln = require( 'math-ln' );


// CONSTANTS //

var P = [
	-0.44325980392156862745098039215686274509803921568627,
	0.083333333333333333333333333333333333333333333333333,
	-0.021092796092796092796092796092796092796092796092796,
	0.0075757575757575757575757575757575757575757575757576,
	-0.0041666666666666666666666666666666666666666666666667,
	0.003968253968253968253968253968253968253968253968254,
	-0.0083333333333333333333333333333333333333333333333333,
	0.083333333333333333333333333333333333333333333333333
];


// DIGAMMA //

/**
* FUNCTION: digamma( x )
*	Evaluate the digamma function via asymptotic expansion. This gives 17-digit precision for x >= 10.
*
* @param {Number} x - input value
* @returns {Number} function value
*/
function digamma( x ) {
	var y;
	var z;
	x -= 1;
	y = ln(x) + 1/(2*x);
	z = 1 / (x*x);
	return y - ( z*polyval( P, z ) );
} // end FUNCTION digamma()


// EXPORTS //

module.exports = digamma;
