const author_repository = require('../repository/author_repository');

exports.listAuthors = (req, resp) => {
    author_repository.getAuthors((err, res) => {
        if(err){
            resp.status(500).json(err.message);
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
            resp.status(500).json(err.message);
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `The author with id ${id} not found.`});
        } else {
            resp.json(res.rows);
        };
    });
};

exports.createAuthors = (req, resp) => {
    let author = req.body;

    author_repository.postAuthor(author, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else {
            resp.status(201).json({msg: 'Author created!', author: res.rows});
        };
    });
};

exports.updateAuthors = (req, resp) => {
    const id = req.params.id;
    const newAuthor = req.body;

    author_repository.putAuthor(id, newAuthor, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `The author with id ${id} not found.`});
        } else {
            resp.json({msg: `The author with id ${id} updated!`, newAuthor: res.rows});
        };
    });
};

exports.removeAuthors = (req, resp) => {
    const id = req.params.id;

    author_repository.deleteAuthor(id, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `The author with id ${id} not found.`});
        } else {
            resp.json({msg: 'Author deleted!', author: res.rows});
        };
    });
};