const checkRequestRegister = (req, res, next) => {
    if (!Object.keys(req?.body?.name)) {
        return res.status(400).json({ error: 'Name is required on body' })
    }
    if (!Object.keys(req?.body?.email)) {
        return res.status(400).json({ error: 'Email is required on body' })
    }
    if (!Object.keys(req?.body?.pwd)) {
        return res.status(400).json({ error: 'Pwd is required on body' })
    }
    next()
}
const checkRequestLogin = (req, res, next) => {
    if (!Object.keys(req?.body?.email)) {
        return res.status(400).json({ error: 'Email is required on body' })
    }
    if (!Object.keys(req?.body?.pwd)) {
        return res.status(400).json({ error: 'Pwd is required on body' })
    }
    next()
}

const checkRequestChangePassword = (req, res, next) => {
    if (!Object.keys(req?.body?.newpwd)) {
        return res.status(400).json({ error: 'NewPwd is required on body' })
    }
    if (!Object.keys(req?.body?.pwd)) {
        return res.status(400).json({ error: 'Pwd is required on body' })
    }
    next()
}
const checkRequestResetPassword = (req, res, next) => {
    if (!Object.keys(req?.body?.email)) {
        return res.status(400).json({ error: 'Email is required on body' })
    }
    next()
}

module.exports = {
    checkRequestRegister,
    checkRequestLogin,
    checkRequestChangePassword,
    checkRequestResetPassword,
}
