const router = require('express').Router();
const authMiddleware = require('../../middleware/auth-middleware.js');
const bannerController = require('../../controllers/server/banner.controller.js');

router.get('/banners', authMiddleware.signed, bannerController.renderPageBanner);
router.post('/banners', authMiddleware.signed, bannerController.insertBanner);
router.post('/banners/update/:bannerID', authMiddleware.signed, bannerController.updateBannerStatus);
router.post('/banners/remove', authMiddleware.signed, bannerController.removeBanner);

module.exports = router;