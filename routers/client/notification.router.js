const router = require('express').Router();
const controller = require('../../controllers/client/notification.controller')

router.post("/notifications", controller.readNotification)
router.post("/update/notification", controller.updateNotification)
router.post("/insert/notification", controller.insertNotification)
router.get("/delete/notification/:id", controller.deletetNotification)

module.exports = router