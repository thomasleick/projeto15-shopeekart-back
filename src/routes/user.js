const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const bufferAvatar = require('../middlewares/bufferAvatar')


// Rota PUT do usuário que usa o middleware do multer
router.put('/edit', bufferAvatar.uploadAvatar, userController.handlePut)

module.exports = router