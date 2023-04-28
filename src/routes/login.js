const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')
const checkRequests = require('../middlewares/checkRequests')

router.post('/', checkRequests.checkRequestLogin, loginController.handleLogin)

module.exports = router
