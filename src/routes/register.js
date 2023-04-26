const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const checkRequests  = require('../middlewares/checkRequests');

router.post('/', checkRequests.checkRequestRegister, registerController.registerUser);

module.exports = router;