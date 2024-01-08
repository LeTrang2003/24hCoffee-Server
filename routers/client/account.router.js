const router = require('express').Router();
const controller = require('../../controllers/client/account.controller')

router.post("/login", controller.loginController)


module.exports = router