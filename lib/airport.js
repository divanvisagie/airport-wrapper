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

    if (!callback)
        throw 'executor() is missing callback function as parameter';

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


/*
    Parser functions
*/
function parseGetInfo( str ){

    var deferred = q.defer();

    var lines = str.split( '\n' );

    var to_return = {};
    for (var i in lines){
        
            var colonIndex = lines[i].indexOf( ':' );

            to_return[ lines[i].substr( 0, colonIndex ).trim() ] = lines[i].substr( colonIndex ).trim();
    }
    deferred.resolve( to_return );

    return deferred.promise;
}

function parseScan( str ) {

    var deferred = q.defer();

    var lines = str.split( '\n' );
    var colSsid = 0;
    var colMac = lines[0].indexOf( 'BSSID' );
    var colRssi = lines[0].indexOf( 'RSSI' );
    var colChannel = lines[0].indexOf( 'CHANNEL' );
    var colHt = lines[0].indexOf( 'HT' );
    var colCc = lines[0].indexOf( 'CC' );
    var colSec = lines[0].indexOf( 'SECURITY' );

    var wifis = [];
    for (var i=1,l=lines.length; i<l; i++) {
        wifis.push({
   
            'ssid' : lines[i].substr(0, colMac).trim(),
            'bssid' : lines[i].substr(colMac, colRssi - colMac).trim(),
            'rssi' : lines[i].substr( colRssi, colChannel - colRssi ).trim(),
            'channel' : lines[i].substr(colChannel, colHt - colChannel).trim(),
            'ht' : lines[i].substr( colHt, colCc - colHt ).trim(),
            'cc' : lines[i].substr( colCc, colSec - colCc ).trim(),
            'security' : lines[i].substr( colSec  ).trim()
        });
    }
    wifis.pop();

    deferred.resolve( wifis );
    return deferred.promise;
}


/* Run an airport scan and then parse the  */
function scan( callback ) {

    if (!callback)
        throw 'scan() is missing callback function';

    exec(macProvider + ' -s', function(err, stdout, stderr){
        if (err) {
            errClbk(err, null);
            return;
        }

        parseScan( stdout ).then( function( data ){

            callback( data );
        } );
  
    });
    
}

function getinfo( callback ){

    if (!callback)
        throw 'getinfo() is missing callback function';

    
    exec(macProvider + ' --getinfo', function(err, stdout, stderr){
        if (err) {
            errClbk(err, null);
            return;
        }

        parseGetInfo( stdout ).then( function( data ){

            callback( data );
        } );
  
    });
}

function disassociate( callback ){

    if (!callback)
        throw 'disassociate() is missing callback function';

    executor( '--disassociate', function( data,err ){

        callback( data, err );
    } );
}

function help( callback ){

    if (!callback)
        throw 'help() is missing callback function';

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