const airport = require('../lib/airport');

airport.getinfo((err, data) => {
    if (err) {
        return console.error('Error : ', err);
    }
    console.log('Airport getinfo : ', data);
});