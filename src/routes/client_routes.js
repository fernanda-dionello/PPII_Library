const express = require('express');
const router = express.Router();
const client_controller = require('../controllers/client_controller');

router.get('/', client_controller.listBooks);
router.get('/:id', client_controller.listBooksById);
router.post('/', client_controller.postBooks);
router.put('/', client_controller.putBooks);
router.delete('/:id', client_controller.deleteBooks);

module.exports = router;