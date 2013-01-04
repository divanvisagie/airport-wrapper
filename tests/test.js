var airport = require('./airport');

console.log( airport );

airport.scan(function( data, err ){

	console.log( 'Testing scan\n----' );
    if (err) {
        console.log("Error : " + err);
        return;
    }

    console.log(data);


    console.log(airport.utility);
});

console.log( 'Testing getinfo' );

airport.getinfo(function( data, err ){

	console.log( 'Testing getinfo\n----' );
    if (err) {
        console.log("Error : " + err);
        return;
    }

    console.log(data);


    console.log(airport.utility);
});