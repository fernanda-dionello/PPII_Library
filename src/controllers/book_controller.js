const book_repository = require('../repository/book_repository');

exports.listBooks = (req, resp) => {
    book_controller.getBooks((err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: 'No books found.'});
        } else {
            resp.json(res.rows);
        };
    });
};

exports.listBooksById = (req, resp) => {
    const id = req.params.id;

    book_controller.getBookById(id, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `The book with id ${id} not found.`});
        } else {
            resp.json(res.rows);
        };
    });
};

exports.createBooks = (req, resp) => {
    let book = req.body;

    book_controller.postBook(book, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else {
            resp.status(201).json({msg: 'Book created!', book: res.rows});
        };
    });
};

exports.updateBooks = (req, resp) => {
    const id = req.params.id;
    const newBook = req.body;

    book_controller.putBook(id, newBook, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `The book with id ${id} not found.`});
        } else {
            resp.json({msg: `The book with id ${id} updated!`, newBook: res.rows});
        };
    });
};

exports.removeBooks = (req, resp) => {
    const id = req.params.id;

    book_controller.deleteBook(id, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `The book with id ${id} not found.`});
        } else {
            resp.json({msg: 'Book deleted!', book: res.rows});
        };
    });
};