const mongoose = require('mongoose')
const { Schema, Decimal128, ObjectId } = mongoose

const shipmentInfoSchema = new Schema({
    address: String,
})

const orderSchema = new Schema({
    author: ObjectId,
    products: [{ count: Number, product: ObjectId, _id: false }],
    placedAt: { type: Date, default: Date.now },
    orderTotal: Decimal128,
    shipmentInfo: {
        firstName: String,
        lastName: String,
        cpf: String,
        phone: String,
        address: String,
        city: String,
        uf: String,
        country: String,
        postalCode: String,
        _id: false,
    },
})

module.exports = mongoose.model('Order', orderSchema)
