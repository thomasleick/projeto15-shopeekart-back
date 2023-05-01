const { Router } = require('express')
const {
    placeOrderController,
    getOrdersOfUserController,
} = require('../controllers/orderController')

const router = Router()

router.get('/orders', getOrdersOfUserController)
router.post('/orders', placeOrderController)

module.exports = router
