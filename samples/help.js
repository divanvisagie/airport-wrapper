const airport = require('../lib/airport');

airport.help((err, data) => {
    if (err) {
        return console.error('Error :', err);
    }
    console.log('Airport help :', data);
});