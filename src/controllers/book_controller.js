const book_repository = require('../repository/book_repository');
const author_repository = require('../repository/author_repository');
const publishing_company_repository = require('../repository/publishing_company_repository');

exports.listBooks = (req, resp) => {
    book_repository.getBooks((err, res) => {
        if(err){
            resp.status(500).json({err: err.message});
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: 'No books found.'});
        } else {
            resp.json(res.rows);
        };
    });
};

exports.listBooksById = (req, resp) => {
    const id = req.params.id;

    book_repository.getBookById(id, (err, res) => {
        if(err){
            resp.status(500).json({err: err.message});
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `The book with id ${id} not found.`});
        } else {
            resp.json(res.rows);
        };
    });
};

exports.createBooks = (req, resp) => {
    let isbn = req.body.isbn;
    let bookName = req.body.name;
    let authorName = req.body.author;
    let publishingCompanyName = req.body.publishing_company;
    let year = req.body.year;
    let authorId;
    let publishingCompanyId;
    
    if(isbn && bookName && authorName && publishingCompanyName && year){
        bookName = bookName.toUpperCase();
        authorName = authorName.toUpperCase();
        publishingCompanyName = publishingCompanyName.toUpperCase();

        author_repository.getAuthorByName(authorName, (err, res) => {
            if(err){
                resp.status(500).json({err: err.message});
            } else if (res.rowCount == 0) {
                resp.status(404).json({msg: `Cannot create a new Book, because the author ${authorName} don't exists in authors table.`});
            } else {
                authorId = res.rows[0].id;
    
                publishing_company_repository.getPublishingCompanyByName(publishingCompanyName, (err, res) => {
                    if(err){
                        resp.status(500).json({err: err.message});
                    } else if (res.rowCount == 0) {
                        resp.status(404).json({msg: `Cannot create a new Book, because the publishing company ${publishingCompanyName} don't exists in publishing_companies table.`});
                    } else {
                        publishingCompanyId = res.rows[0].id;
    
                        book_repository.postBook(isbn, bookName, authorId, publishingCompanyId, year, (err, res) => {
                            if(err){
                                if(err.code == 23505){
                                    resp.status(403).json({err: "Cannot create duplicate book with the same ISBN."});
                                } else {
                                    resp.status(500).json({err: err});
                                };
                            } else {
                                resp.status(201).json({msg: 'Book created!', book: res.rows});
                            };
                        });
                    };
                });
            };
        });
    } else {
        resp.status(400).json({msg:"Invalid data entry"});
    };
};

exports.updateBooks = (req, resp) => {
    const id = req.params.id;
    let isbn = req.body.isbn;
    let bookName = req.body.name;
    let authorName = req.body.author;
    let publishingCompanyName = req.body.publishing_company;
    let year = req.body.year;
    let authorId;
    let publishingCompanyId;

    if(isbn && bookName && authorName && publishingCompanyName && year && id){
        bookName = bookName.toUpperCase();
        authorName = authorName.toUpperCase();
        publishingCompanyName = publishingCompanyName.toUpperCase();
        author_repository.getAuthorByName(authorName, (err, res) => {
            if(err){
                resp.status(500).json(err.message);
            } else if (res.rowCount == 0) {
                resp.status(404).json({msg: `Cannot update, because the author ${authorName} don't exists in authors table.`});
            } else {
                authorId = res.rows[0].id;

                publishing_company_repository.getPublishingCompanyByName(publishingCompanyName, (err, res) => {
                    if(err){
                        resp.status(500).json(err.message);
                    } else if (res.rowCount == 0) {
                        resp.status(404).json({msg: `Cannot update, because the publishing company ${publishingCompanyName} don't exists in publishing_companies table.`});
                    } else {
                        publishingCompanyId = res.rows[0].id;

                        book_repository.putBook(id, isbn, bookName, authorId, publishingCompanyId, year, (err, res) => {
                            if(err){
                                if(err.code == 23505){
                                    resp.status(403).json({err: "Cannot create duplicate book with the same ISBN."});
                                } else {
                                    resp.status(500).json({err: err});
                                };
                            } else if (res.rowCount == 0) {
                                resp.status(404).json({msg: `The book with id ${id} not found.`});
                            } else {
                                resp.json({msg: `The book with id ${id} updated!`, book: res.rows});
                            };
                        });
                    };
                });
            };
        });
    } else {
        resp.status(400).json({msg:"Invalid data entry"});
    };
};

exports.removeBooks = (req, resp) => {
    const id = req.params.id;

    book_repository.deleteBook(id, (err, res) => {
        if(err){
            if(err.code = 23503){
                resp.status(403).json({err: "Cannot delete book, because this book has a vinculation to rents table."});
            } else {
                resp.status(500).json({err: err.message});
            }
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `The book with id ${id} not found.`});
        } else {
            resp.json({msg: 'Book deleted!', book: res.rows});
        };
    });    
};