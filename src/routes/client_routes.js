const express = require('express');
const router = express.Router();
const client_controller = require('../controllers/client_controller');

router.get('/', client_controller.listClients);
router.get('/:registration_number', client_controller.listClientsById);
router.post('/', client_controller.createClients);
router.put('/:registration_number', client_controller.updateClients);
router.delete('/:registration_number', client_controller.removeClients);

module.exports = router;