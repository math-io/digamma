options( digits = 16 );
library( jsonlite );

x = seq( -6.5, 25, 0.5 )
y = digamma( x )

cat( y, sep = ",\n" )

data = list(
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/output.json" )
