var airport = require( '../lib/airport' );

airport.scan(function( data, err ){
        
    //print the output object
    console.log(data);
});

airport.getinfo( function( data, err ){

    console.log( data );
});