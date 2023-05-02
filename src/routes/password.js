const express = require('express')
const router = express.Router()
const passwordController = require('../controllers/passwordController')
const checkRequests = require('../middlewares/checkRequests')
const verifyJWT = require('../middlewares/verifyJWT')

// Change password when logged in
router.post('/change', verifyJWT, checkRequests.checkRequestChangePassword, passwordController.changePassword)

// Reset password when not logged in
router.post('/reset', checkRequests.checkRequestResetPassword, passwordController.resetPassword)

module.exports = router
