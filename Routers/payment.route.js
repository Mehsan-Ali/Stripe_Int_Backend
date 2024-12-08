const express = require('express')
const { checkoutPayment } = require('../Controllers/payment.controller')

const router = express.Router()

router.post('/create-checkout-session', checkoutPayment)

// router.get('/checkout-success', (req, res) => {
//     res.send('Your Payment Successfully Completed')
// })

// router.get('/cancel', (req, res) => {
//     res.send('Payment Cancelled')
//     // res.redirect('/')
// })

module.exports = router