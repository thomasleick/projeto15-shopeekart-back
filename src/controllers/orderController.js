const { placeOrder, getOrdersOfUser } = require('../services/orderService')

const getOrdersOfUserController = async (req, res) => {
    const { id } = res.locals.user

    try {
        const orders = await getOrdersOfUser(id)
        return res.send(orders)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}

const placeOrderController = async (req, res) => {
    const { id } = res.locals.user

    try {
        const order = await placeOrder({ ...req.body, author: id })
        return res.sendStatus(201)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}

module.exports = { getOrdersOfUserController, placeOrderController }
