const airport = require('../lib/airport');

airport.scan((err, data) => {
    if (err) {
        return console.err('Error: ', err);
    }
    console.log('Airport Scan :', data);
});

