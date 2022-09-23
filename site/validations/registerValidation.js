const {check,body} = require('express-validator');

module.exports = [

/*Nombre*/ 

check('name').trim()
.notEmpty().withMessage('Debes ingresar tu nombre').bail()
.isLength({min:2}).withMessage('Debe contener al menos 2 caracteres'),

/*Email*/
 
check('email').trim()
.notEmpty().withMessage('Debes ingresar tu email').bail()
.isEmail().withMessage('Debes ingresar un email valido'),

/*Contraseña*/ 
check('pass')
.isLength({min:8}).withMessage('Debe contener al menos 8 caracteres'),
check('pass2')
.isLength({min:8}).withMessage('Debe contener al menos 8 caracteres').bail(),
/*Comentario - textarea
check('comentarios')
.notEmpty().withMessage('')
.isLength({min:9}).withMessage('Debe contener al menos 9 caracteres'),*/ 

/*Terminos y condiciones*/ 
check('terminos')
.notEmpty().withMessage('Debe Aceptar nuestros terminos y condiciones'),

/*Coincidencia de contraseñas*/
body('pass2')
    .custom((value,{req}) => value !== req.body.pass ? false : true)
    .withMessage('Las contraseñas no coinciden')
]