const e = require('express');
const author_repository = require('../repository/author_repository');
const country_repository = require('../repository/country_repository');

exports.listAuthors = (req, resp) => {
    author_repository.getAuthors((err, res) => {
        if(err){
            resp.status(500).json({err: err.message});
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: 'No authors found.'});
        } else {
            resp.json(res.rows);
        };
    });
};

exports.listAuthorsById = (req, resp) => {
    const id = req.params.id;

    author_repository.getAuthorById(id, (err, res) => {
        if(err){
            resp.status(500).json({err: err.message});
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `The author with id ${id} not found.`});
        } else {
            resp.json(res.rows);
        };
    });
};

exports.createAuthors = (req, resp) => {
    let countryName = req.body.country;
    let authorName = req.body.name;

    if(authorName && countryName){
        countryName = countryName.toUpperCase();
        authorName = authorName.toUpperCase();
        country_repository.getCountryByName(countryName, (err, res) => {
            if(err){
                resp.status(500).json({err: err.message});
            } else if (res.rowCount == 0) {
                resp.status(404).json({msg: `Cannot create a new Author, because the country ${countryName} don't exist in countries table.`});
            } else {
                let countryId = res.rows[0].id;
                author_repository.postAuthor(authorName, countryId, (err, res) => {
                    if (err){
                        if(err.code == 23505){
                            resp.status(403).json({err: "Cannot create duplicate author, it already exists in authors table."});
                        } else {
                            resp.status(500).json({err: err});
                        };
                    } else {
                        resp.status(201).json({msg: 'Author created!', author: res.rows});
                    };
                });
            };
        });
    } else {
        resp.status(400).json({msg:"Invalid data entry"});
    };
};

exports.updateAuthors = (req, resp) => {
    const id = req.params.id;
    let countryName = req.body.country;
    let authorName = req.body.name;
    let countryId;

    if(authorName && countryName){
        countryName = countryName.toUpperCase();
        authorName = authorName.toUpperCase();
        country_repository.getCountryByName(countryName, (err, res) => {
            if (err) {
                resp.status(500).json({err: err.message});
            } else if (res.rowCount == 0) {
                resp.status(404).json({msg: `Cannot update the author, because the country ${countryName} don't exist in countries table.`});
            } else {
                countryId = res.rows[0].id;
                author_repository.putAuthor(id, authorName, countryId, (err, res) => {
                    if (err){
                        if(err.code = 23505){
                            resp.status(403).json({err: "Cannot create duplicate author, it already exists in authors table."});
                        } else {
                            resp.status(500).json({err: err.message});
                        }
                    } else if (res.rowCount == 0) {
                        resp.status(404).json({msg: `The author with id ${id} not found.`});
                    } else {
                        resp.json({msg: `The author with id ${id} updated!`, newAuthor: res.rows});
                    };
                });
            };
        });
    } else {
        resp.status(400).json({msg:"Invalid data entry"});
    };
};

exports.removeAuthors = (req, resp) => {
    const id = req.params.id;

    author_repository.deleteAuthor(id, (err, res) => {
        if(err){
            resp.status(500).json({err: err.message});
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `The author with id ${id} not found.`});
        } else {
            resp.json({msg: 'Author deleted!', author: res.rows});
        };
    });
};