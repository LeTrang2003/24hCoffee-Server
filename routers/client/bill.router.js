const router = require('express').Router();
const controller = require('../../controllers/client/bill.controller')

router.post("/insert/bill", controller.insertBill)

router.post("/insert/bill/detail", controller.insertBillDetail)

router.get("/table/bill/:tableID", controller.readBillByTable)

router.get("/detail/bills/:billID", controller.readBillDetail)

router.post("/update/bill", controller.updateBill)

router.post("/update/quantity/bill", controller.updateQuantityBillDetail)

router.post("/delete/bill/detail", controller.deleteBillDetail)

router.post("/swap/table/bill", controller.swapTableBill)

module.exports = router