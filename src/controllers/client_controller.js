const client_repository = require('../repository/client_repository');

exports.listClients = (req, resp) => {
    client_repository.getClients((err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: 'No clients found.'});
        } else {
            resp.json(res.rows);
        };
    });
};

exports.listClientsById = (req, resp) => {
    const id = req.params.id;

    client_repository.getClientById(id, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `The client with id ${id} not found.`});
        } else {
            resp.json(res.rows);
        };
    });
};

exports.createClients = (req, resp) => {
    let client = req.body;

    client_repository.postClient(client, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else {
            resp.status(201).json({msg: 'Client created!', client: res.rows});
        };
    });
};

exports.updateClients = (req, resp) => {
    const id = req.params.id;
    const newClient = req.body;

    client_repository.putClient(id, newClient, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `The client with id ${id} not found.`});
        } else {
            resp.json({msg: `The client with id ${id} updated!`, newClient: res.rows});
        };
    });
};

exports.removeClients = (req, resp) => {
    const id = req.params.id;

    client_repository.deleteClient(id, (err, res) => {
        if(err){
            resp.status(500).json(err.message);
        } else if (res.rowCount == 0) {
            resp.status(404).json({msg: `The client with id ${id} not found.`});
        } else {
            resp.json({msg: 'Client deleted!', client: res.rows});
        };
    });
};