const router = require('express').Router();
const authMiddleware = require('../../middleware/auth-middleware.js');
const categoryController = require('../../controllers/server/category.controller.js');

router.get('/categories', authMiddleware.signed, categoryController.renderPageCategory);
router.post('/categories', authMiddleware.signed, categoryController.insertCategory);
router.post('/categories/update', authMiddleware.signed, categoryController.updateCategory);
router.post('/categories/remove', authMiddleware.signed, categoryController.removeCategory);

module.exports = router;