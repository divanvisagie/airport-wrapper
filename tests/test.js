




'use strict';

var airport = require( '../lib/airport' );

exports['airport'] = {

  setUp: function(done) {
    done();
  },

  scan: function(test) {
    test.expect(1);
    airport.scan(function( err, data ){

      //print the output object
      //console.log(data);
      if ( err ) {
        test.ok(false);
      } else if (data) {
        test.ok(true);
        //TODO: test that the data has the right keys etc
      }
      test.done();

    });

  },

  getinfo: function(test) {
    test.expect(1);
    airport.getinfo( function( err, data ){

      //print the output object
      //console.log(data);
      if ( err ) {
        test.ok(false);
      } else if (data) {
        test.ok(true);
        //TODO: test that the data has the right keys etc
      }
      test.done();
    });
  },

  tearDown: function(done) {
    done();
  }
};