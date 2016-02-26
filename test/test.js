'use strict';

// MODULES //

var tape = require( 'tape' );
var isfinite = require( 'validate.io-finite' );
var isnan = require( 'validate.io-nan' );
var abs = require( 'math-abs' );
var PINF = require( 'const-pinf-float64' );
var digamma = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/data.json' );
var expected = require( './fixtures/expected.json' );
var v;
var i;
for ( i = 0; i < expected.length; i++ ) {
	v = expected[ i ];
	if ( v === 'Inf' ) {
		expected[ i ] = PINF;
	}
	else if ( v === 'NaN' ) {
		expected[ i ] = NaN;
	}
}


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof digamma, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided a `NaN`', function test( t ) {
	var val = digamma( NaN );
	t.notOk( val === val, 'returns NaN' );
	t.end();
});

tape( 'the function returns `NaN` if provided `0`', function test( t ) {
	var val = digamma( 0 );
	t.notOk( val === val, 'returns NaN' );
	t.end();
});

tape( 'the function evaluates the digamma function', function test( t ) {
	var actual;
	var b1;
	var b2;
	var i;
	for ( i = 0; i < data.length; i++ ) {
		actual =  digamma( data[ i ] );

		b1 = isfinite( actual );
		b2 = isfinite( expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b2) ? 'finite' : 'not finite' ) );

		b1 = isnan( actual );
		b2 = isnan( expected[ i ] );
		t.equal( b1, b2, 'returned result is ' + ( (b1) ? '' : 'not' ) + ' NaN' );
		if ( !b1 ) {
			t.ok( abs( actual - expected[ i ] ) < 1e-14, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected[ i ] + '.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the digamma function for `x` such that remainder > 0.5', function test( t ) {
	var expected;
	var actual;
	var x;

	x = -3.8;
	expected = -2.863183589156929;
	actual = digamma( x );

	t.ok( abs( actual - expected ) < 1e-14, 'returned result within tolerance' );
	t.end();
});
