const userService = require('../services/userService')
const authService = require('../services/authService')
const mailerService = require('../services/mailerService')

const changePassword = async (req, res) => {
    const { newpwd, pwd } = req?.body
    const id = res.locals.user.id

    if (!id) return res.sendStatus(404)

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
const resetPassword = async (req, res) => {
    const email = req.body.email
    try {
        const foundUser = await userService.findUserByEmail(email)
        if (!foundUser) {
            return res.sendStatus(404)
        }
        const newPwd = await authService.generatePassword(12)
        foundUser.pwd = newPwd
        foundUser.save()
        const to = email
        const subject = 'Shopeekart - Your New Password!'
        const text = `Your new password is: ${newPwd}`
        const html = `Your new password is: <strong>${newPwd}</strong>`
        mailerService.sendEmailWithSendgrid(to, subject, text, html)
        return res.sendStatus(204)
    } catch (err) {
        return res.sendStatus(500)
    }
}

module.exports = { changePassword, resetPassword }
