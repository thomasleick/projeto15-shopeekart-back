const User = require('../models/User')

const createUser = async (userData) => {
    const user = new User({ ...userData })
    await user.save()
    return user
}

const findUserByEmail = async (email) => {
    const user = await User.find({ email })
    return user
}

module.exports = { createUser, findUserByEmail }
