const { isObjectIdOrHexString } = require('mongoose')
const {
    getCategories,
    getProduct,
    getProductCount,
    getProductPage,
} = require('../services/productService')

const getCategoriesController = async (req, res) => {
    try {
        const categories = await getCategories()
        return res.send(categories)
    } catch (err) {
        console.error(err)
        return res.status(500).send(err)
    }
}

const getProductController = async (req, res) => {
    const { id } = req.params
    if (!isObjectIdOrHexString(id)) return res.sendStatus(404)

    try {
        const product = await getProduct(id)
        if (!product) return res.sendStatus(404)
        return res.send(product)
    } catch (err) {
        console.error(err)
        return res.status(500).send(err)
    }
}

const getProductPageController = async (req, res) => {
    const { page } = req.params
    const { category } = req.query
    const pageLenght = 30

    try {
        const productCount = await getProductCount(category)
        const maxPage = Math.ceil(productCount / pageLenght)
        const parsedPage = parseInt(page)

        if (!/[1-9][0-9]*/.test(page) || parsedPage > maxPage)
            return res.sendStatus(404)

        const products = await getProductPage(category, page)
        return res.send({
            productCount,
            maxPage,
            products,
            page: parsedPage,
            category: category ?? null,
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send(err)
    }
}

module.exports = {
    getCategoriesController,
    getProductController,
    getProductPageController,
}
