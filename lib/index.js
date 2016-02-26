'use strict';
/**
* NOTE: the original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_53_0/libs/math/doc/sf_and_dist/html/math_toolkit/special/sf_gamma/digamma.html}.
*
* This implementation follows the original but has been adapted for use in JavaScript.
*/

/**
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var floor = require( 'math-floor' );
var tan = require( 'math-tan' );
var asymptoticApprox = require( './asymptotic_expansion.js' );
var rationalApprox = require( './rational_approximation.js' );


// CONSTANTS //

var PI = require( 'const-pi' );
var MIN_SAFE_ASYMPTOTIC = 10;


// DIGAMMA //

/**
* FUNCTION: digamma( x )
*	Evaluates the digamma function.
*
* @param {Number} x - input value
* @returns {Number} function value
*/
function digamma( x ) {
	var rem;
	var tmp;
	if ( x !== x || x === 0 ) {
		return NaN;
	}
	// Check for a negative `x` and use reflection...
	if ( x <= -1 ) {
		// Reflect:
		x = 1 - x;

		// Argument reduction for tan:
		rem = x - floor(x);

		// Shift to negative if > 0.5:
		if ( rem > 0.5 ) {
			rem -= 1;
		}
		// Check for evaluation at a negative pole:
		if ( rem === 0 ) {
			return NaN;
		}
		tmp = PI / tan( PI * rem );
	} else {
		tmp = 0;
	}
	// If we're above the lower-limit for the asymptotic expansion, then use it...
	if ( x >= MIN_SAFE_ASYMPTOTIC ) {
		tmp += asymptoticApprox( x );
	} else {
		// If x > 2, reduce to the interval [1,2]...
		while ( x > 2 ) {
			x -= 1;
			tmp += 1/x;
		}
		// If x < 1, use recurrence to shift to > 1..
		while ( x < 1 ) {
			tmp -= 1/x;
			x += 1;
		}
		tmp += rationalApprox( x );
	}
	return tmp;
} // end FUNCTION digamma()


// EXPORTS //

module.exports = digamma;
