const Product = require('../models/Product')

const getCategories = async () => {
    return await Product.find().distinct('category')
}

const getProductCount = async (category) => {
    return await Product.count(category && { category })
}

const getProduct = async (id) => {
    return await Product.findById(id)
}

const getProductPage = async (category, page, sort = {}, length = 30) => {
    const parsedPage = page || 1
    const skip = length * (parsedPage - 1)
    return Product.find(category && { category })
        .sort(sort)
        .skip(skip)
        .limit(length)
}

module.exports = { getCategories, getProductCount, getProduct, getProductPage }
