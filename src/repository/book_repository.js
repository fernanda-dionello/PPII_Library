const connection = require('../config/connection_bd');

exports.getBooks = (callback) => {
    connection.query(`
    SELECT books.id, books.isbn, books.name, authors.name as "author", publishing_companies.name as "publishing_company", books.year
    FROM books, authors, publishing_companies
    WHERE books.author = authors.id
    AND  books.publishing_company = publishing_companies.id
    ORDER BY books.id`, (err, res) => {
        callback(err,res);
    });
};

exports.getBookById = (id, callback) => {
    const values = [id];
    connection.query(`
    SELECT books.id, books.isbn, books.name, authors.name as "author", publishing_companies.name as "publishing_company", books.year
    FROM books, authors, publishing_companies
    WHERE books.author = authors.id
    AND books.id = $1
    AND books.publishing_company = publishing_companies.id`, values, (err, res) => {
        callback(err,res);
    });
};

exports.getBooksByAuthorId = (id, callback) => {
    const values = [id];
    connection.query(`SELECT books.id, books.isbn, books.name, authors.name as "author", publishing_companies.name as "publishing_company", books.year
    FROM books, authors, publishing_companies
    WHERE books.author = authors.id
    AND books.author = $1
    AND books.publishing_company = publishing_companies.id`, values, (err, res) => {
        callback(err,res);
    });
};

exports.getAvailableBooks = (callback) => {
    connection.query(`SELECT DISTINCT(books.id), books.isbn, books.name, authors.name as "author", publishing_companies.name as "publishing_company", books.year
    FROM books, authors, publishing_companies, rents
    WHERE books.author = authors.id
    AND  books.publishing_company = publishing_companies.id
	AND books.id != ALL(
	select book_id from rents where active = true) 
    ORDER BY books.id`, (err, res) => {
        callback(err,res);
    });
};

exports.postBook = (isbn, bookName, authorId, publishingCompanyId, year, callback) => {
    const values = [isbn, bookName, authorId, publishingCompanyId, year];
    connection.query('INSERT INTO books(isbn, name, author, publishing_company, year) VALUES ($1, $2, $3, $4, $5) RETURNING *', values, (err, res) => {
        callback(err,res);
    });
};

exports.putBook = (id, isbn, bookName, authorId, publishingCompanyId, year, callback) => {
    const values = [isbn, bookName, authorId, publishingCompanyId, year, id];
    connection.query('UPDATE books SET isbn=$1, name=$2, author=$3, publishing_company=$4, year=$5 WHERE id=$6 RETURNING *', values, (err, res) => {
        callback(err,res);
    });
};

exports.deleteBook = (id, callback) => {
    const values = [id];
    connection.query('DELETE FROM books WHERE id=$1 RETURNING *', values, (err, res) => {
        callback(err, res);
    });
};