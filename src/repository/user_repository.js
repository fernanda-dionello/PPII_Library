const connection = require('../config/connection_bd');

exports.postLogin = (username, password, callback) => {
    const values = [username, password];
    connection.query('SELECT * FROM users WHERE username = $1 AND password = sha1($2)', values, (err, res) => {
        callback(err,res);
    });
};