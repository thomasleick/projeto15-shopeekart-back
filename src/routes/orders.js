const { Router } = require('express')
const {
    placeOrderController,
    getOrdersOfUserController,
    getSingleOrderOfUserController,
    getLatestOrderOfUserController,
} = require('../controllers/orderController')

const router = Router()

router.get('/orders', getOrdersOfUserController)
router.get('/order/:id', getSingleOrderOfUserController)
router.get('/orders/last', getLatestOrderOfUserController)
router.post('/orders', placeOrderController)

module.exports = router
