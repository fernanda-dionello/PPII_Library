const connection = require('../config/connection_bd');

exports.getClients = (callback) => {
    connection.query('SELECT * FROM clients ORDER BY registration_number', (err, res) => {
        callback(err,res);
    });
};

exports.getClientById = (registration_number, callback) => {
    const values = [registration_number];
    connection.query('SELECT * FROM clients WHERE registration_number=$1', values, (err, res) => {
        callback(err,res);
    });
};

exports.postClient = (name, cellphone, callback) => {
    const values = [name, cellphone];
    connection.query('INSERT INTO clients(name, cellphone) VALUES ($1, $2) RETURNING *', values, (err, res) => {
        callback(err,res);
    });
};

exports.putClient = (registration_number, name, cellphone, callback) => {
    const values = [name, cellphone, registration_number];
    connection.query('UPDATE clients SET name=$1, cellphone=$2 WHERE registration_number=$3 RETURNING *', values, (err, res) => {
        callback(err,res);
    });
};

exports.deleteClient = (registration_number, callback) => {
    const values = [registration_number];
    connection.query('DELETE FROM clients WHERE registration_number=$1 RETURNING *', values, (err, res) => {
        callback(err, res);
    });
};