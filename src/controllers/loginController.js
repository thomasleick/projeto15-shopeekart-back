const userService = require('../services/userService')
const authService = require('../services/authService')

const handleLogin = async (req, res) => {
    try {
        const { email, pwd } = req.body
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email || !emailRegex.test(email)) {
            return res
                .status(400)
                .json({ message: 'A valid email is required.' })
        }
        if (!pwd) {
            return res.status(400).json({ message: 'Password is required.' })
        }
        const foundUser = await userService.findUserByEmail(email)
        if (!foundUser) {
            return res.sendStatus(404) //unauthorized
        }
        const match = await authService.comparePassword(pwd, foundUser.pwd)
        if (match) {
            const { accessToken, refreshToken } =
                authService.generateTokens(foundUser)
            await authService.saveRefreshToken(foundUser._id, refreshToken)

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: authService.refreshTokenExpiresIn,
            })

            return res.json({
                name: foundUser.name,
                avatar: foundUser.avatar,
                accessToken,
            })
        } else {
            return res.sendStatus(401) //unauthorized
        }
    } catch (err) {
        return res.sendStatus(500)
    }
}

module.exports = { handleLogin }
