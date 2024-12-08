const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cookieParser = require('cookie-parser')
const PaymentRoute = require('./Routers/payment.route')
const CartRoute = require('./Routers/cart.route')
const UserRoute = require('./Routers/user.route')
const ProductRoute = require('./Routers/product.route')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})
)

const Database = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/paymentsIntegeration')
        console.log('Database is connected')
    } catch (error) {
        console.log(error.message)
    }
}

Database()

app.use('/api/payments', PaymentRoute)
app.use('/api/cart', CartRoute)
app.use('/api/products', ProductRoute)
app.use('/api/user', UserRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
