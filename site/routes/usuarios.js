const express = require('express')
const router = express.Router()
const loginValidator = require('../validations/loginValidation')

let {login,register,processLogin,perfil,logout} = require('../controllers/usersController')

router.get('/register', register);

router.get('/login', login);
router.post('/login',loginValidator,processLogin);



router.get('/perfil', perfil);
router.delete('/logout', logout);
module.exports = router