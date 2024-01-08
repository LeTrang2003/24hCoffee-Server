const express = require('express');
const router = express.Router();
const userController = require('../../controllers/client/user.controller');
const upload = require('../../cloud/cloudinary')

router.post('/read-user', userController.readUser);
router.post('/update/user/file', upload.uploadCloud.single('image'), userController.updateUser);
router.post('/update/user', userController.updateUserNoFile);
router.post('/update/password/user', userController.resetPass);

module.exports = router;  