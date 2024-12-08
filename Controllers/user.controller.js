const User = require('../Models/User.model')

const registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json({
            success: true,
            message: 'User registered successfully',
            user
        })
    } catch (error) {
        console.log(error.message)
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user
        })
    } catch (error) {
        console.log(error.message)
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            users
        })
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = { registerUser, loginUser, getUsers }