const {check,body} = require('express-validator')
const users = require('../data/usuarios.json')
const bcryptjs = require('bcryptjs')
module.exports = [
    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    /* Contraseña */
    check('pass').trim()
    .notEmpty().withMessage('Debe ingresar su contraseña').bail()
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres'),

  body('email')
  .custom((value,{req}) =>{
    /*let user = users.find(usuario => usuario.email === value && req.body.pass === usuario.pass)*/
    let user = users.find(usuario => usuario.email === value && bcryptjs.compareSync(req.body.pass, usuario.pass))

    if (user) {
      return true
  }else{
      return false
  }

  })
 
  .withMessage('El email o la contraseña no coincide')
]