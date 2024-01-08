const router = require('express').Router();
const authMiddleware = require('../../middleware/auth-middleware.js');
const productController = require('../../controllers/server/product.controller.js');

router.get('/products', authMiddleware.signed, productController.renderPageProduct);
router.get('/products/insert', authMiddleware.signed, productController.renderPageInsertProduct);
router.post('/products/insert', authMiddleware.signed, productController.insertProduct);
router.get('/products/update/:productID', authMiddleware.signed, productController.renderPageUpdateProduct);
router.post('/products/update/:productID', authMiddleware.signed, productController.updateProduct);
router.post('/products/remove', authMiddleware.signed, productController.removeProduct);

module.exports = router;