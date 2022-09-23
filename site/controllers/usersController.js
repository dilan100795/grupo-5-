const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
/*const users = require('../data/usuarios.json')*/
const usuarios = require('../data/usuarios.json')
const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/usuarios.json')
    , JSON.stringify(dato, null, 4), 'utf-8')

module.exports = {
    register: (req,res) => {
        return res.render('register')
    },
    processRegister:(req,res) => {
         
        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'image',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }

        if (errors.isEmpty()){
            /*return res.send(req.body);*/
            let {name,email,pass} = req.body
            let usuarioNuevo = {
                    id:usuarios[usuarios.length - 1].id + 1,
                    name,
                    email,
                    pass: bcrypt.hashSync(pass, 12),
                    image: req.file.size > 1 ? req.file.filename : "default-image.jpg",
                    rol : "usuario"
            }
            usuarios.push(usuarioNuevo)
            guardar(usuarios)
            
            return res.redirect('/')
        } else {   
            return res.send(errors.mapped())
            /*return res.render('register', {
                errors: errors.mapped(),
                old: req.body
            })*/
    }
},

    login: (req,res) => {
        return res.render('login')
    },

    processLogin:(req,res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()){


        const {email} = req.body
        let user = usuarios.find(usuario => usuario.email === email)

        req.session.userLogin = {
            id : user.id,
            nombre : user.name,
            image: user.image,
            rol : user.rol
        }
         return res.redirect('/')

            /*return res.send(req.body)*/
        } else {
           /* return res.send(errors.mapped())*/
           return res.render('login', {
            errors: errors.mapped(),
            old: req.body
           })
        }
       
    },
    perfil: (req,res) => {
        return res.render('usuarios/perfil')
    },

    logout : (req,res) => {
        req.session.destroy();
        return res.redirect('/')
    }

}