const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { ensureWebToken } = require('../middleware/auth.middleware');

router.get('/me', ensureWebToken, userController.getMe);
router.get('/exists/username/:username', userController.checkUsername);
router.put('/me', ensureWebToken, userController.updateMe);
router.patch('/me', ensureWebToken, userController.updateMe);

module.exports = router;


