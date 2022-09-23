const express = require('express')
let {login,register,processLogin,perfil,logout, processRegister} = require('../controllers/usersController')
const router = express.Router()

const loginValidator = require('../validations/loginValidation')
const registerValidator = require('../validations/registerValidation')
const upload = require('../middlewares/multerUsuarios')
const userCheck = require('../middlewares/userCheck')


router.get('/register', register);
router.post('/register', upload.single('image') ,registerValidator, processRegister);


router.get('/login', login);
router.post('/login',loginValidator,processLogin);

router.get('/perfil',userCheck, perfil);
router.delete('/logout', logout);
module.exports = router