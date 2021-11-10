const connection = require('../config/connection_bd');

exports.getCountryByName = (countryName, callback) => {
    const name = [countryName];
    connection.query('SELECT id FROM countries WHERE country = $1', name, (err, res) => {
        callback(err,res);
    });
};