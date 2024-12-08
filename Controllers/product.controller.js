const Product = require('../Models/Product.model')

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      product
    })
  } catch (error) {
    console.log(error.message)
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      products
    })
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { createProduct, getAllProducts }
