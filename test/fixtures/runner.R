options( digits = 16 );
library( jsonlite );

x = seq( -6.5, 25, 0.5 )
y = digamma( x )

cat( y, sep = ",\n" )

write( toJSON( x, digits = 16, auto_unbox = TRUE ), "./test/fixtures/data.json" )
write( toJSON( y, digits = 16, auto_unbox = TRUE ), "./test/fixtures/expected.json" )
