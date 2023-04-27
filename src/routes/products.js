const { Router } = require('express')
const {
    getCategoriesController,
    getProductController,
    getProductPageController,
} = require('../controllers/productControllers')

const router = Router()

router.get('/categories', getCategoriesController)
router.get('/product/:id', getProductController)
router.get('/products/:page', getProductPageController)

module.exports = router
