var airport = require( '../lib/airport' );

airport.scan(function( err, data ){

    //print the output object
    console.log(data);
});

airport.getinfo( function( err, data ){

    console.log( data );
});
