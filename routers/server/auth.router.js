const router = require('express').Router();
const authMiddleware = require('../../middleware/auth-middleware.js');
const authController = require('../../controllers/server/auth.controller.js');

router.get('/login', authController.renderPageLogin);
router.post('/login', authController.signIn);
router.get('/logout', authController.signOut);
router.get('/account', authMiddleware.signed, authController.renderPageAccountSetting);
router.post('/account', authMiddleware.signed, authController.updateAccount);

module.exports = router;