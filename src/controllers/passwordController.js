const changePassword = async (req, res) => {
    const { newpwd, pwd } = req?.body
    const id = req?.id
    console.log(newpwd, pwd, id)
    res.sendStatus(200)
}
const resetPassword = async (req, res) => {
    
}

module.exports = { changePassword, resetPassword }