const router = require('express').Router();
const authMiddleware = require('../../middleware/auth-middleware.js');
const employeeController = require('../../controllers/server/employee.controller.js');

router.get('/employees', authMiddleware.signed, employeeController.renderPageEmployee);
router.get('/employees/insert', authMiddleware.signed, employeeController.renderPageInsertEmployee);
router.post('/employees/insert', authMiddleware.signed, employeeController.insertEmployee);
router.post('/employees/remove', authMiddleware.signed, employeeController.removeEmployee);

module.exports = router;