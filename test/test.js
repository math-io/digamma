'use strict';

// MODULES //

var test = require( 'tape' );
var isFiniteNumber = require( 'validate.io-finite' );
var digamma = require( './../lib' );


// FIXTURES //

var validationData = require( './fixtures/output.json' ),
	data = validationData.data,
	expected = validationData.expected.map( function( d ) {
		return d === 'Inf' ? Infinity : d;
	});


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

test( 'evaluates the digamma function', function test( t ) {
	var actual;
	for ( var i = 0; i < data.length; i++ ) {
		actual =  digamma( data[ i ] );
		if ( isFiniteNumber( actual ) && isFiniteNumber( expected[ i ] ) ) {
			t.ok( Math.abs( actual - expected[ i ] ) < 1e-14, data[ i ] );
		}
	}
	t.end();
});

test( 'evaluates the digamma function for x such that remainder > 0.5', function test( t ) {
	var data,
		expected,
		actual;
	data = -3.8;
	expected = -2.863183589156929;
	actual = digamma( data );
	t.ok( Math.abs( actual - expected ) < 1e-14, data );
	t.end();
});
