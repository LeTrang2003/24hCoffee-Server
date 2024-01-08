const router = require('express').Router();
const controller = require('../../controllers/client/banner.controller')

router.get("/banners", controller.getListBannerController)


module.exports = router