const express = require('express')
const { addToCart, getCart } = require('../Controllers/cart.controller')

const router = express.Router()

router.post('/add', addToCart)
router.get('/get', getCart)

module.exports = router