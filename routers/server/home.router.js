const router = require('express').Router();
const authMiddleware = require('../../middleware/auth-middleware.js');
const homeController = require('../../controllers/server/home.controller.js');

router.get('/', authMiddleware.signed, homeController.renderPageHome);

module.exports = router;