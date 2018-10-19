const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get('/register', userCtrl.register);

module.exports = router;
