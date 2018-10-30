const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/user-info', userCtrl.authMiddleware, userCtrl.userInfo);

module.exports = router;
