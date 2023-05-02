const {
    placeOrder,
    getOrdersOfUser,
    getSingleOrderOfUser,
    getLatestOrderOfUser,
} = require('../services/orderService')

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

const getLatestOrderOfUserController = async (req, res) => {
    const { id } = res.locals.user

    try {
        const lastOrder = await getLatestOrderOfUser(id)
        if (lastOrder === null)
            return res.sendStatus(204)
        return res.send(lastOrder)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}

const getSingleOrderOfUserController = async (req, res) => {
    const { id: userId } = res.locals.user
    const { id: orderId } = req.params

    try {
        const order = await getSingleOrderOfUser(orderId, userId)

        if (!order) {
            return res.sendStatus(404)
        }

        return res.send(order)
    } catch (err) {
        console.error(err)
        return res.status(500).send(err)
    }
}

const placeOrderController = async (req, res) => {
    const { id } = res.locals.user

    try {
        const order = await placeOrder({ ...req.body, author: id })
        return res.status(201).send(order)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}

module.exports = {
    getOrdersOfUserController,
    getSingleOrderOfUserController,
    placeOrderController,
    getLatestOrderOfUserController,
}
