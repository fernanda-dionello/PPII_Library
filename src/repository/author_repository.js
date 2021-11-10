const connection = require('../config/connection_bd');

exports.getAuthors = (callback) => {
    connection.query('SELECT authors.id, authors.name, countries.country FROM authors, countries WHERE authors.country = countries.id ORDER BY authors.id', (err, res) => {
        callback(err,res);
    });
};

exports.getAuthorById = (id, callback) => {
    const authorId = [id];
    connection.query('SELECT authors.id, authors.name, countries.country FROM authors, countries WHERE authors.id=$1 AND authors.country = countries.id ORDER BY authors.id', authorId, (err, res) => {
        callback(err,res);
    });
};

exports.getAuthorByName = (author, callback) => {
    const authorName = [author];
    connection.query('SELECT id FROM authors WHERE name=$1', authorName, (err, res) => {
        callback(err,res);
    });
};

exports.postAuthor = (authorName, countryId, callback) => {
    const values = [authorName, countryId];
    connection.query('INSERT INTO authors(name, country) VALUES ($1, $2) RETURNING *', values, (err, res) => {
        callback(err,res);
    });
};

exports.putAuthor = (id, authorName, countryId, callback) => {
    const values = [authorName, countryId, id];
    connection.query('UPDATE authors SET name=$1, country=$2 WHERE id=$3 RETURNING *', values, (err, res) => {
        callback(err,res);
    });
};

exports.deleteAuthor = (id, callback) => {
    const values = [id];
    connection.query('DELETE FROM authors WHERE id=$1 RETURNING *', values, (err, res) => {
        callback(err, res);
    });
};

