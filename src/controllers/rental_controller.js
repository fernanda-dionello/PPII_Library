const rental_repository = require('../repository/rental_repository');

exports.borrow = (req, resp) => {
    const client_registration_number = req.body.client_registration_number;
    const book_id = req.body.book_id;

    rental_repository.getClientActiveBooks(client_registration_number, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else if (res.rows[0].count >= 3) {
            resp.status(405).json({msg: 'Client cannot take more than 3 books at time.'});
        } else {
            rental_repository.getBookAvailability(book_id, (err, res) => {
                if(err){
                    resp.status(500).json(err.message);
                } else if (res.rows[0].count > 0) {
                    resp.status(405).json({msg: 'Book already taken by another client.'});
                } else {
                    rental_repository.borrow(book_id, client_registration_number, (err, res) => {
                        if(err){
                            resp.status(500).json(err.message);
                        } else {
                            resp.status(201).json({msg: 'Book rent with success!'});
                        };
                    });
                };
            });
        };
    });
};

exports.return = (req, resp) => {
    const client_registration_number = req.body.client_registration_number;
    const book_id = req.body.book_id;

    rental_repository.getRental(book_id, client_registration_number, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `The rental with client id ${client_registration_number} and book id ${book_id} not found.`});
        } else {
            const rental_id = res.rows[0].id;
            const end_date = res.rows[0].end_date;
            const now = new Date();
            const delay = Math.abs(now.getTime() - end_date.getTime());
            const delay_days = Math.floor(delay / (1000 * 3600 * 24));

            rental_repository.return(rental_id, (err, res) => {
                if(err){
                    resp.status(500).json(err.message);
                } else if (delay_days > 0) {
                    resp.json({msg: `Book rent with success with ${delay_days} of delay.`});
                } else {
                    resp.json({msg: `Book returned with success!`});
                };
            });
        };
    });
};