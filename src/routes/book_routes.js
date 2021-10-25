const express = require('express');
const router = express.Router();
const book_controller = require('../controllers/book_controller');

router.get('/', book_controller.listBooks);
router.get('/:id', book_controller.listBooksById);
router.post('/', book_controller.postBooks);
router.put('/', book_controller.putBooks);
router.delete('/:id', book_controller.deleteBooks);

module.exports = router;