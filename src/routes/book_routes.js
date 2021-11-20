const express = require('express');
const router = express.Router();
const book_controller = require('../controllers/book_controller');

router.get('/available', book_controller.listAvailableBooks);
router.get('/', book_controller.listBooks);
router.get('/:id', book_controller.listBooksById);
router.get('/author/:id', book_controller.listBooksByAuthorId);
router.post('/', book_controller.createBooks);
router.put('/:id', book_controller.updateBooks);
router.delete('/:id', book_controller.removeBooks);

module.exports = router;