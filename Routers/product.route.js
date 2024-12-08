const express = require('express')
const { createProduct, getAllProducts } = require('../Controllers/product.controller')

const router = express.Router()

router.post('/add', createProduct)
router.get('/get', getAllProducts)

module.exports = router
