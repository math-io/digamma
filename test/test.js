'use strict';

// MODULES //

var test = require( 'tape' );
var isfinite = require( 'validate.io-finite' );
var abs = require( 'math-abs' );
var digamma = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/data.json' );
var expected = require( './fixtures/expected.json' );
var i;
var v;
for ( i = 0; i < expected.length; i++ ) {
	v = expected[ i ];
	if ( v === 'Inf' ) {
		expected[ i ] = Number.POSITIVE_INFINITY;
	}
	else if ( v === 'NaN' ) {
		expected[ i ] = NaN;
	}
}


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof digamma === 'function', 'main export is a function' );
	t.end();
});

test( 'the function returns `NaN` if provided a `NaN`', function test( t ) {
	var val = digamma( NaN );
	t.notOk( val === val, 'returns NaN' );
	t.end();
});

test( 'the function returns `NaN` if provided `0`', function test( t ) {
	var val = digamma( 0 );
	t.notOk( val === val, 'returns NaN' );
	t.end();
});

test( 'the function evaluates the digamma function', function test( t ) {
	var actual;
	var b1;
	var b2;
	var i;
	for ( i = 0; i < data.length; i++ ) {
		actual =  digamma( data[ i ] );
		b1 = isfinite( actual );
		b2 = isfinite( expected[ i ] );
		t.ok( b1, b2, 'returned result is ' + ( (b2) ? 'finite' : 'infinite' ) );
		t.ok( abs( actual - expected[ i ] ) < 1e-14, 'returned result is within tolerance. actual: ' + actual + '; expected: ' + expected[ i ] + '.' );
	}
	t.end();
});

test( 'the function evaluates the digamma function for `x` such that remainder > 0.5', function test( t ) {
	var expected;
	var actual;
	var x;

	x = -3.8;
	expected = -2.863183589156929;
	actual = digamma( x );

	t.ok( abs( actual - expected ) < 1e-14, 'returned result within tolerance' );
	t.end();
});
