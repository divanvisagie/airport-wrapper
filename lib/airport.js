var exec = require('child_process').exec,
    plist =  require( 'plist' ),
    colors = require( 'colors' ),
    q = require( 'q' );


var macProvider = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport';


/*
    The executor command simply executes the airport utility binary ,
    the result is returned in a plist and then parsed to a javascript object
*/
function executor( params, callback ){

    exec(macProvider + ' ' + params + ' --xml', function(err, stdout, stderr){

        if (err) {
            errClbk(err, null);
            return;
        }
        
        var obj = plist.parseStringSync( stdout );

        if( err )
            console.log( 'Error: '.red + err );
        if(stderr)
            console.log( 'STDERR: '.red + stderr );


        callback( obj, err || stderr );
    });
}


function scan( callback ) {

    executor( '--scan', function( data, err ){

        callback( data, err );
    } );
}

function getinfo( callback ){

    executor( '--getinfo', function( data, err ){

        callback( data, err );
    } );
}

function disassociate( callback ){

    executor( '--disassociate', function( data,err ){

        callback( data, err );
    } );
}

function help( callback ){

    executor( '--help', function( data, err ){

        callback( data, err );
    } );
}

exports.scan = scan;
exports.getinfo = getinfo;
exports.disassociate = disassociate;
exports.help = help;
exports.airport = executor;

exports.utility = macProvider;