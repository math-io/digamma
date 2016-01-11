'use strict';

//  Adapted from the Boost library implementation:
//  (C) Copyright John Maddock 2006.
//  Use, modification and distribution are subject to the
//  Boost Software License, Version 1.0. (See accompanying file
//  LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)


// MODULES //

var polyval = require( 'compute-polynomial' ),
	isnan = require( 'validate.io-nan' );


// FUNCTIONS //

var floor = Math.floor,
	log = Math.log,
	tan = Math.tan;


// CONSTANTS //

var MIN_SAFE_ASYMPTOTIC = 10,
	PI = Math.PI;


/**
* FUNCTION: digamma_imp_large( x )
*	Evaluate digamma function via asymptotic expansion.
*	This gives 17-digit precision for x >= 10:
*
* @param {Number} x - input value
* @returns {Number} function value
*/
function digamma_imp_large( x ) {
	var P,
		result,
		z;
	P = [
		-0.44325980392156862745098039215686274509803921568627,
		0.083333333333333333333333333333333333333333333333333,
		-0.021092796092796092796092796092796092796092796092796,
		0.0075757575757575757575757575757575757575757575757576,
		-0.0041666666666666666666666666666666666666666666666667,
		0.003968253968253968253968253968253968253968253968254,
		-0.0083333333333333333333333333333333333333333333333333,
		0.083333333333333333333333333333333333333333333333333
	];
	x -= 1;
	result = log(x);
	result += 1 / (2 * x);
	z = 1 / (x*x);
	result -= z * polyval( P, z );
	return result;
} // end FUNCTION digamma_imp_large()


/**
* FUNCTION: digamma_imp_1_2( x )
*	Evaluates digamma function over interval [1,2]. This gives 17-digit precision.
*
* @param {Number} x - input value
* @returns {Number} function value
*/
function digamma_imp_1_2( x ) {
	/*
		Now the approximation, we use the form:

		digamma(x) = (x - root) * (Y + R(x-1))

		Where root is the location of the positive root of digamma,
		Y is a constant, and R is optimised for low absolute error
		compared to Y.

		Maximum Deviation Found:               1.466e-18
		At double precision, max error found:  2.452e-17
	*/
	var Y = 0.99558162689208984,
		root1 = 1569415565 / 1073741824,
		root2 = ( 381566830 / 1073741824 ) / 1073741824,
		root3 = 0.9016312093258695918615325266959189453125e-19,
		P,
		Q,
		g,
		r,
		result;

	P = [
		-0.0020713321167745952,
		-0.045251321448739056,
		-0.28919126444774784,
		-0.65031853770896507,
		-0.32555031186804491,
		0.25479851061131551,
	];
	Q = [
		-0.55789841321675513e-6,
		0.0021284987017821144,
		0.054151797245674225,
		0.43593529692665969,
		1.4606242909763515,
		2.0767117023730469,
		1.0
	];
	g = x - root1;
	g -= root2;
	g -= root3;
	r = polyval( P, x - 1 ) / polyval( Q, x - 1 );
	result = g * Y + g * r;
	return result;
} // end FUNCTION digamma_imp_1_2()


/**
* FUNCTION: digamma_imp( x )
*	Evaluates the digamma function.
*
* @param {Number} x - input value
* @returns {Number} function value
*/
function digamma_imp( x ) {
	if ( isnan( x ) ) {
		return NaN;
	}
	var result = 0,
		remainder;
	// Check for negative arguments and use reflection:
	if ( x <= -1 ) {
		// Reflect:
		x = 1 - x;
		// Argument reduction for tan:
		remainder = x - floor(x);
		// Shift to negative if > 0.5:
		if ( remainder > 0.5 ) {
			remainder -= 1;
		}
		// check for evaluation at a negative pole:
		if ( remainder === 0 ) {
			return NaN;
		}
		result = PI / tan( PI * remainder );
	}
	if (x === 0 ) {
		return NaN;
	}
	//
	// If we're above the lower-limit for the
	// asymptotic expansion then use it:
	//
	if ( x >= MIN_SAFE_ASYMPTOTIC ) {
		result += digamma_imp_large( x );
	} else {
		// If x > 2 reduce to the interval [1,2]:
		while ( x > 2 ) {
			x -= 1;
			result += 1/x;
		}
		// If x < 1 use recurrance to shift to > 1:
		while ( x < 1 ) {
			result -= 1/x;
			x += 1;
		}
		result += digamma_imp_1_2( x );
	}
	return result;
} // end FUNCTION digamma_imp()


// EXPORTS //

module.exports = digamma_imp;
