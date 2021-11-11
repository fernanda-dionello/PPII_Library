const client_repository = require('../repository/client_repository');

exports.listClients = (req, resp) => {
    client_repository.getClients((err, res) => {
        if(err){
            resp.status(500).json({err: err.message});
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: 'No clients found.'});
        } else {
            resp.json(res.rows);
        };
    });
};

exports.listClientsById = (req, resp) => {
    const registration_number = req.params.registration_number;

    client_repository.getClientById(registration_number, (err, res) => {
        if(err){
            resp.status(500).json({err: err.message});
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `The client with registration number ${registration_number} not found.`});
        } else {
            resp.json(res.rows);
        };
    });
};

exports.createClients = (req, resp) => {
    let name = req.body.name;
    const cellphone = req.body.cellphone;

    if(name && cellphone){
        name = name.toUpperCase();
        client_repository.postClient(name, cellphone, (err, res) => {
            if(err){
                resp.status(500).json({err: err.message});
            } else {
                resp.status(201).json({msg: 'Client created!', client: res.rows});
            };
        });
    } else {
        resp.status(400).json({msg:"Invalid data entry"});
    };
};

exports.updateClients = (req, resp) => {
    const registration_number = req.params.registration_number;
    const cellphone = req.body.cellphone;
    let name = req.body.name;

    if(name && cellphone && registration_number){
        name = name.toUpperCase();
        client_repository.putClient(registration_number, name, cellphone, (err, res) => {
            if(err){
                resp.status(500).json({err: err.message});
            } else if (res.rowCount == 0) {
                resp.status(404).json({msg: `The client with registration number ${registration_number} not found.`});
            } else {
                resp.json({msg: `The client with registration number ${registration_number} updated!`, newClient: res.rows});
            };
        });
    } else {
        resp.status(400).json({msg:"Invalid data entry"});
    }
};

exports.removeClients = (req, resp) => {
    const registration_number = req.params.registration_number;

    client_repository.deleteClient(registration_number, (err, res) => {
        if(err){
            resp.status(500).json({err: err.message});
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `The client with registration number ${registration_number} not found.`});
        } else {
            resp.json({msg: 'Client deleted!', client: res.rows});
        };
    });
};