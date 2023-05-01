const userService = require('../services/userService')
const authService = require('../services/authService')

const changePassword = async (req, res) => {
    const { newpwd, pwd } = req?.body
    const id = res.locals.user.id

    try {
        const foundUser = await userService.findUserById(id)
        if (!foundUser) {
            return res.sendStatus(404) //unauthorized
        }
        const match = await authService.comparePassword(pwd, foundUser.pwd)
        if (match) {
            foundUser.pwd = newpwd
            await foundUser.save()
            return res.sendStatus(204)
        } else {
            return res.sendStatus(401) //unauthorized
        }
    } catch (err) {
        return res.sendStatus(500)
    }
}
const resetPassword = async (req, res) => {}

module.exports = { changePassword, resetPassword }
