const Order = require('../models/Order')

const getOrdersOfUser = async (userId) => {
    return await Order.find({ author: userId })
}

const placeOrder = async (order) => {
    const placedOrder = new Order(order)

    await placedOrder.save()
    await placedOrder.populate('shipmentInfo')
    return placedOrder
}

module.exports = { getOrdersOfUser, placeOrder }
