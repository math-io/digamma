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

// NOTES //

/**
* digamma(x)
*
* Method:
*   1. For `x < 0`, we use the reflection formula
*
*        digamma(1-x) = digamma(x) + pi/tan(pi*x)
*
*      to make `x` positive.
*
*   2. For `x` on the interval `[0,1]`, we use the recurrence relation
*
*        digamma(x) = digamma(x+1) - 1/x
*
*      to shift the evaluation range to `[1,2]`.
*
*   3. For `x` on the interval `[1,2]`, we use a rational approximation of the form:
*
*        digamma(x) = (x - root) * (Y + R(x-1))
*
*      where `root` is the location of the positive root of digamma, `Y` is a constant, and `R` is optimized for low absolute error compared to `Y`.
*
*      Note that since `root` is irrational, we need twice as many digits in `root` as in `x` in order to avoid cancellation error during subtraction, assuming `x` has an exact value.
*
*      This means that even if `x` is rounded to the next representable value, the result of `digamma(x)` will not be zero.
*
*      This approach gives 17-digit precision.
*
*   4. For `x` on the interval `[2,BIG]`, we use the recurrence relation
*
*        digamma(x+1) = digamma(x) + 1/x
*
*      to shift the evaluation range to `[1,2]`.
*
*   5. For `x > BIG`, we can use the asymptotic expression
*
*        digamma(x) = ln(x) + 1/(2x) - ( B_21/(2x^2) + B_22/(4x^4) + B_23/(6x^6) + ... )
*
*      This expansion, however, is divergent after a few terms. The number of terms depends on `x`.
*
*      Accordingly, we must choose a value of `BIG` which allows us to truncate the series at a term that is too small to an effect on the result.
*
*      For BIG=10 for up to 80-bit reals, allows us to truncate the series early and evaluate as `1/(x*x)`. This gives 17-digit precision for `x >= 10`.
*
*   Notes:
*     - Maximum deviation found: 1.466e-18
*     - Max error found: 2.452e-17 (double precision)
*/


// MODULES //

var floor = require( 'math-floor' );
var tan = require( 'math-tan' );
var asymptoticApprox = require( './asymptotic_expansion.js' );
var rationalApprox = require( './rational_approximation.js' );


// CONSTANTS //

var PI = require( 'const-pi' );
var MIN_SAFE_ASYMPTOTIC = 10; // BIG


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
	// If `x` is negative, use reflection...
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
		return tmp;
	}
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
	return tmp;
} // end FUNCTION digamma()


// EXPORTS //

module.exports = digamma;
