const connection = require('../config/connection_bd');

exports.getAllRents = (callback) => {
    connection.query('SELECT * FROM rents ORDER BY id', (err, res) => {
        callback(err,res);
    });
};

exports.getClientActiveBooks = (client_registration_number, callback) => {
    const registration_number = [client_registration_number];
    connection.query('SELECT count(*) FROM rents WHERE client_registration_number = $1 AND active = true', registration_number, (err, res) => {
        callback(err,res);
    });
};

exports.getBookAvailability = (book_id, callback) => {
    const id = [book_id];
    connection.query('SELECT count(*) FROM rents WHERE book_id = $1 AND active = true', id, (err, res) => {
        callback(err,res);
    });
};

exports.borrow = (book_id, client_registration_number, callback) => {
    const values = [client_registration_number, book_id];
    connection.query(`INSERT INTO rents (client_registration_number, book_id, active, start_date, end_date) VALUES ($1, $2, true, current_date, (current_date + INTERVAL '7 day'))`, values , (err, res) => {
        callback(err,res);
    });
};

exports.getRental = (book_id, client_registration_number, callback) => {
    const values = [book_id, client_registration_number];
    connection.query('SELECT id, end_date FROM rents WHERE book_id = $1 AND client_registration_number = $2 AND active = true', values , (err, res) => {
        callback(err,res);
    });
};

exports.return = (rental_id, callback) => {
    const rental = [rental_id];
    connection.query('UPDATE rents SET active = false WHERE id = $1', rental , (err, res) => {
        callback(err,res);
    });
};