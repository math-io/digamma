digamma
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Digamma][digamma-function] function.

The [digamma function][digamma-function] `ψ` is the logarithmic derivative of the [gamma function][gamma-function], i.e.

<div class="equation" align="center" data-raw-text="\psi(x) =\frac{d}{dx} \ln{\Gamma(x)}= \frac{\Gamma\,'(x)}{\Gamma(x)}." data-equation="eq:digamma_function">
	<img src="https://cdn.rawgit.com/math-io/digamma/4c0980aeb7de5af0a1e8cc028f6b3d53bae6f63f/docs/img/eqn.svg" alt="Digamma function.">
	<br>
</div>


## Installation

``` bash
$ npm install math-digamma
```


## Usage

``` javascript
var digamma = require( 'math-digamma' );
```


#### digamma( x )

Evaluates the [digamma function][digamma-function].

``` javascript
var v = digamma( -2.5 );
// returns ~1.103

v = digamma( 1 );
// returns ~-0.577

v = digamma( 10 );
// returns ~2.252
```

If `x` is `0` or a negative `integer`, the `function` returns `NaN`.

``` javascript
var v = digamma( 0 );
// returns NaN

v = digamma( -1 );
// returns NaN

v = digamma( -2 );
// returns NaN
```

If provided `NaN`, the `function` returns `NaN`.

``` javascript
var v = digamma( NaN );
// returns NaN
```


## Examples

``` javascript
var digamma = require( 'math-digamma' );

var x;
var v;
var i;

for ( i = 0; i < 10; i++ ) {
	x = Math.random()*10 - 5;
	v = digamma( x );
	console.log( 'x: %d, f(x): %d', x, v );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-digamma.svg
[npm-url]: https://npmjs.org/package/math-digamma

[build-image]: http://img.shields.io/travis/math-io/digamma/master.svg
[build-url]: https://travis-ci.org/math-io/digamma

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/digamma/master.svg
[coverage-url]: https://codecov.io/github/math-io/digamma?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/digamma.svg
[dependencies-url]: https://david-dm.org/math-io/digamma

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/digamma.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/digamma

[github-issues-image]: http://img.shields.io/github/issues/math-io/digamma.svg
[github-issues-url]: https://github.com/math-io/digamma/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[boost-digamma]: http://www.boost.org/doc/libs/1_53_0/libs/math/doc/sf_and_dist/html/math_toolkit/special/sf_gamma/digamma.html#math_toolkit.special.sf_gamma.digamma.implementation
[compute-io]: https://github.com/compute-io/
[digamma-function]: https://en.wikipedia.org/wiki/Digamma_function
[gamma-function]: https://en.wikipedia.org/wiki/Gamma_function
