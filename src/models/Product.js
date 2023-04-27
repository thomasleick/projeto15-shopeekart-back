const mongoose = require('mongoose')
const { Schema, Decimal128 } = mongoose

const productSchema = new Schema({
    productName: String,
    category: String,
    retailPrice: Decimal128,
    discountedPrice: Decimal128,
    image: [String],
    description: String,
    brand: String,
})

module.exports = mongoose.model('Product', productSchema)
