const {check,body} = require('express-validator')
const db = require('../database/models')
const bcryptjs = require('bcryptjs')
module.exports = [
    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    /* Contraseña */
    check('pass').trim()
    .notEmpty().withMessage('Debe ingresar su contraseña').bail()
    .isLength({ min: 8, max: 12 }).withMessage('Debe contener al menos 8 caracteres')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(.{8,12})$/)
    .withMessage('La contraseña debe contener al menos un número, una mayúscula, una minúscula y tener entre 8 y 12 caracteres'),

    body('pass')
    .custom((value, {req}) => {
       return db.usuarios.findOne({
            where: {
                email: req.body.email
            }
       })
       .then(user => {
           if(!bcryptjs.compareSync(value, user.dataValues.password)){
               return Promise.reject()
           }
       })
       .catch(() => {
           return Promise.reject("Email o contraseña incorrecta")
       })
    })
]
 
