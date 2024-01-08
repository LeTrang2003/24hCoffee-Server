const router = require('express').Router();
const controller = require('../../controllers/client/category.controller')

router.get("/category", controller.getListCategoryController)


module.exports = router