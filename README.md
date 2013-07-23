airport-wrapper
===============

[![NPM version](https://badge.fury.io/js/airport-wrapper.png)](http://badge.fury.io/js/airport-wrapper)
[![NGN Dependencies](https://david-dm.org/divanvisagie/airport-wrapper.png)](https://david-dm.org/divanvisagie/airport-wrapper)

A node.js wrapper for the airport tool on OSX

## Installation 

  npm install airport-wrapper

## Functions

  scan( callback )

  getinfo( callback )

  disassociate( callback )

  help( callback ) /* returns help object */

  airport( parameters, callback )


### scan(), getinfo(), disassociate(), help()

scan(), getinfo(), disassociate(), help() all work in the same way, they require a callback with a data and error parameter, 
when the operation completes it returns the data as a javascript object.

eg:

  var airport = require( 'airport-wrapper' );

  airport.scan(function( err, data ){

    /* print the output object */
    console.log( data );
  });

### airport()

The airport fuction takes a string of arguments and a callback as parameters. It will execute the airport tool passing it all of the parameters in the string and return the json representation of the output 

eg:

  airport.airport( '--scan', function( err, data ){

      console.log( data );
  });

## How does it work?

When you call a function in this library , the binary located at /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport in the system is executed with the appropriate parameters and the extra flag 
--xml , this causes it to return an XML Plist file as output , this is then parsed using the node-plist library and 
returned to you as a JavaScript object.

All functions use the plist method except for scan() and getinfo() which parse the data directly and much more cleanly , in
future this may apply to all functions.

## Credit

Inspired by some of the work in this project under lib/airport.js: https://github.com/mauricesvay/node-wifiscanner

#License 

MIT License

Copyright (C) 2013 Divan Visagie

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
