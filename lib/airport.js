const exec = require('child_process').exec;
const plist =  require('plist');
require('colors');

const {parseGetInfo, parseScan, parseHelp} = require('./parsers');

const macProvider = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport';

/*
  The executor command simply executes the airport utility binary ,
  the result is returned in a plist and then parsed to a javascript object
*/
function executor(params, callback){
  if (!callback) {
    throw 'executor() is missing callback function as parameter';
  }
  
  exec(`${macProvider} ${params} --xml`, (err, stdout, stderr) => {
    if (err) return callback(err, null);
    const obj = plist.parseStringSync(stdout);
    callback((err || stderr), obj);
  });
}

/* Run an airport scan and then parse the  */
function scan(callback) {

  if (!callback) {
    throw 'scan() is missing callback function';
  }
  exec(macProvider + ' -s', function(err, stdout, stderr){
    if (err) {
      return callback(err, null);
    }

    const data = parseScan(stdout);
    callback(null, data);
  });

}

function getinfo(callback){
  if (!callback) {
    throw 'getinfo() is missing callback function';
  }
  exec(`${macProvider} --getinfo`, function(err, stdout, stderr){
    if (err) return callback(err, null);
    const data = parseGetInfo(stdout);
    callback(null, data);
  });
}

function disassociate(callback){
  if (!callback) {
    throw 'disassociate() is missing callback function';
  }
  executor('--disassociate', (err, data) => {
    callback(err, data);
  });
}

function help(callback){
  if (!callback) {
    throw 'help() is missing callback function';
  }
  exec(`${macProvider} --help`, (err, stdout, stderr) => {
    callback(null , stdout);
  });
}

module.exports = {
  scan,
  getinfo,
  disassociate,
  help,
  airport: executor,
  utility: macProvider,
};
