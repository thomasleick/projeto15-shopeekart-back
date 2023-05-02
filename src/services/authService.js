const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const refreshTokenExpiresIn = 24 * 60 * 60 * 1000 // one day
const accessTokenExpiresIn = 10 * 1000 // 10 seconds

const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

const generateTokens = (user) => {
    const accessToken = jwt.sign(
        {
            UserInfo: {
                name: user.name,
                email: user.email,
                id: user._id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: accessTokenExpiresIn }
    )
    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: refreshTokenExpiresIn }
    )
    return { accessToken, refreshToken }
}

const saveRefreshToken = async (userId, refreshToken) => {
    const user = await User.findById(userId).exec()
    user.refreshToken = refreshToken
    return user.save()
}

const generateAccessToken = (userInfo) => {
    return jwt.sign({ UserInfo: userInfo }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: accessTokenExpiresIn,
    })
}

const verifyRefreshToken = async (refreshToken) => {
    const foundUser = await User.findOne({ refreshToken }).exec()
    if (!foundUser) {
        return false
    }
    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        if (foundUser._id.toString() !== decoded.id) {
            return false
        }
        const accessToken = generateAccessToken({
            name: decoded.name,
            email: decoded.email,
            id: decoded._id,
        })
        return { foundUser, accessToken }
    } catch (error) {
        return false
    }
}

const deleteRefreshToken = async (refreshToken) => {
    const foundUser = await User.findOne({ refreshToken }).exec()
    if (!foundUser) {
        return false
    }

    foundUser.refreshToken = ''
    await foundUser.save()
    return true
}
const generatePassword = async length => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

module.exports = {
    comparePassword,
    generateTokens,
    saveRefreshToken,
    verifyRefreshToken,
    refreshTokenExpiresIn,
    accessTokenExpiresIn,
    deleteRefreshToken,
    generatePassword,
}
