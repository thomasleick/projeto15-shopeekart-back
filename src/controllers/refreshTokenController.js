const authService = require('../services/authService')

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt

    const result = await authService.verifyRefreshToken(refreshToken)
    if (!result) return res.sendStatus(403)
    const { foundUser, accessToken } = result

    res.json({
        name: foundUser.name,
        accessToken,
    })
}

module.exports = { handleRefreshToken }
