const router = require('express').Router();
const controller = require('../../controllers/client/product.controller')

router.get("/products", controller.getListProductController)
router.get("/have/products", controller.getListProductHaveController)

module.exports = router