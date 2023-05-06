const { findUserById } = require('../services/userService');
const { fromByteArray } = require('base64-js');

const handlePut = async (req, res) => {
    const { name, email } = req.body;
    const _id = res.locals.user.id;
    if (!name || !email) return res.sendStatus(400);
    const foundUser = await findUserById(_id);
    foundUser.name = name;
    foundUser.email = email;
    if (req.file) {
        try {
            const buffer = req.file.buffer;
            const base64String = `data:${req.file.mimetype};base64,${fromByteArray(buffer)}`;
            foundUser.avatar = base64String;
        } catch (error) {
            return res.status(500).json({ message: 'Problems with file.buffer' });
        }
    }
    try {
        await foundUser.save();
        res.sendStatus(204);
    } catch (error) {
        return res.sendStatus(500);
    }
};

module.exports = { handlePut };