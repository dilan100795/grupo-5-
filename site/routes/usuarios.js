const express = require('express')
const router = express.Router()
const loginValidator = require('../validations/loginValidation')

let {login,register,processLogin} = require('../controllers/usersController')

router.get('/register', register)

router.get('/login', login);
router.post('/login',loginValidator,processLogin)

module.exports = router