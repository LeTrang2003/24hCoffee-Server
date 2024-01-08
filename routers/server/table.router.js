const router = require('express').Router();
const authMiddleware = require('../../middleware/auth-middleware.js');
const tableController = require('../../controllers/server/table.controller.js');

router.get('/tables', authMiddleware.signed, tableController.renderPageTable);
router.post('/tables', authMiddleware.signed, tableController.insertTable);
router.post('/tables/remove', authMiddleware.signed, tableController.removeTable);

module.exports = router;