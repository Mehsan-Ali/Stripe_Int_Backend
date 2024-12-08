const express = require('express')
const { registerUser, loginUser, getUsers } = require('../Controllers/user.controller')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/get', getUsers)

module.exports = router