const multer = require('multer')

const uploadAvatar = (req, res, next) => {
    const storage = multer.memoryStorage()
    const upload = multer({ storage })
    upload.single('avatar')(req, res, (err) => {
        if (err) {
            return next(err)
        }
        next()
    })
}

module.exports = { uploadAvatar }
