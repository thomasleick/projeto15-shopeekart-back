const Order = require('../models/Order')
const Product = require('../models/Product')

const getOrdersOfUser = async (userId) => {
    return await Order.find({ author: userId })
}

const getSingleOrderOfUser = async (orderId, userId) => {
    const order = await Order.findOne({ author: userId, _id: orderId })

    if (!order) return null

    const productIds = order.products.map((item) => item.product._id)
    const products = await Promise.all(
        productIds.map((id) => Product.findById(id))
    )

    const orderCopy = { ...order._doc }
    orderCopy.products = order.products.map((item, index) => {
        return { count: item.count, product: products[index] }
    })

    return orderCopy
}

const placeOrder = async (order) => {
    const placedOrder = new Order(order)

    await placedOrder.save()
    await placedOrder.populate('shipmentInfo')
    return placedOrder
}
const getLatestOrderOfUser = async (userId) => {
    const latestOrder = await Order.findOne({ author: userId }).sort({ placedAt: -1 });
    return latestOrder || null;
}
module.exports = { getOrdersOfUser, getSingleOrderOfUser, placeOrder, getLatestOrderOfUser }
