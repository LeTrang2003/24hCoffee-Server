const router = require('express').Router();
const controller = require('../../controllers/client/table.controller')

router.get("/tables", controller.getListTableController)
router.get("/empty/tables", controller.getListTableEmtyController)

module.exports = router