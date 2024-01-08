const router = require('express').Router();
const authMiddleware = require('../../middleware/auth-middleware.js');
const billController = require('../../controllers/server/bill.controller.js');

router.get('/bills', authMiddleware.signed, billController.renderPageBill);
router.get('/bills/:billID', authMiddleware.signed, billController.renderPageBillDetail);

module.exports = router;