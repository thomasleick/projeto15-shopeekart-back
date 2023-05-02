const { Router } = require('express')
const {
    placeOrderController,
    getOrdersOfUserController,
    getSingleOrderOfUserController,
} = require('../controllers/orderController')

const router = Router()

router.get('/orders', getOrdersOfUserController)
router.get('/order/:id', getSingleOrderOfUserController)
router.post('/orders', placeOrderController)

module.exports = router
