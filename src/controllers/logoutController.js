const authService = require('../services/authService')

const handleLogout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.sendStatus(204) // no content
    }
    const refreshToken = cookies.jwt
    const deleted = await authService.deleteRefreshToken(refreshToken)

    if (!deleted) {
        res.clearCookie('jwt'), { httpOnly: true }
        return res.sendStatus(403) // Forbidden
    }

    res.clearCookie('jwt'), { httpOnly: true, sameSite: 'None', secure: true }
    res.sendStatus(204)
}

module.exports = { handleLogout }
