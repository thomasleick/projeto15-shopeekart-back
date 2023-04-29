const userService = require('../services/userService')
const avatarService = require('../services/avatarService')

const registerUser = async (req, res) => {
    try {
        const { name, email, pwd } = req.body
        const avatar = avatarService.generateAvatar(name);
        const user = await userService.createUser({ name, email, pwd, avatar })
        res.status(201).json({ message: 'User registered successfully' })
    } catch (err) {
        // Handle validation errors
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(
                (error) => error.message
            )
            return res.status(400).json({ message: errors })
        }

        // Handle conflict errors
        if (err.name === 'MongoServerError' && err.code === 11000) {
            return res.status(409).json({ message: 'Email already in use' })
        }
        // Handle other errors
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = { registerUser }
