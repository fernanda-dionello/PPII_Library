const express = require('express');
const router = express.Router();
const author_controller = require('../controllers/author_controller');

router.get('/', author_controller.listAuthors);
router.get('/:id', author_controller.listAuthorsById);
router.post('/', author_controller.createAuthors);
router.put('/', author_controller.updateAuthors);
router.delete('/:id', author_controller.removeAuthors);

module.exports = router;