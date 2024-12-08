const Cart = require('../Models/Cart.model')
const Product = require('../Models/Product.model')

const addToCart = async (req, res) => {
  const { productId, userId } = req.body

  try {
    // Check if the product exists
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'Product not found' })

    // Find the user's cart
    let cart = await Cart.findOne({ userId })

    if (!cart) {
      // If no cart exists, create one
      cart = new Cart({ userId, items: [{ productId, quantity: 1 }] })
    } else {
      // If cart exists, check if the product is already in the cart
      const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      )

      if (itemIndex > -1) {
        // Product exists, increment the quantity
        cart.items[itemIndex].quantity += 1
      } else {
        // Product does not exist, add to cart
        cart.items.push({ productId, quantity: 1 })
      }
    }

    await cart.save()
    res.status(200).json({ message: 'Product added to cart' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

const getCart = async (req, res) => {
  const { userId } = req.body
  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId')
    res.status(200).json({ cart })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { addToCart,getCart }
