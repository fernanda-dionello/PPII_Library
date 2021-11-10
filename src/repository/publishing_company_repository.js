const connection = require('../config/connection_bd');

exports.getPublishingCompanyByName = (publishingCompany, callback) => {
    const publishingCompanyName = [publishingCompany];
    connection.query('SELECT id FROM publishing_companies WHERE name = $1', publishingCompanyName, (err, res) => {
        callback(err,res);
    });
};