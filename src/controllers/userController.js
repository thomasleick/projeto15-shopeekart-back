const { findUserById } = require("../services/userService")

const handlePut = async (req, res) => {
    
    const { name, email, avatar} = req.body

    const _id = res.locals.user.id

    if (!name || !email) return res.sendStatus(400)

    const foundUser = await findUserById(_id)
    console.log(foundUser)
    foundUser.name = name
    foundUser.email = email
    if (avatar)
    foundUser.avatar = avatar
    foundUser.save()

    return res.sendStatus(204)
}

module.exports = { handlePut }