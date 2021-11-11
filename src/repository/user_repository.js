const connection = require('../config/connection_bd');

exports.findUsername = (username, callback) => {
    const userName = [username];
    connection.query('SELECT * FROM users WHERE username = $1', userName, (err,res) => {
        callback(err,res);
    });
};