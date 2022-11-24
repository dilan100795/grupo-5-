const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const db = require('../database/models')
/*const users = require('../data/usuarios.json')*/
/*const usuarios = require('../data/usuarios.json')*/
/*const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/usuarios.json')
    , JSON.stringify(dato, null, 4), 'utf-8')*/

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
            /*return res.send (req.body)*/
            let {name,email,pass,} = req.body

            db.usuarios.create({
                name,
                email,
                password: bcrypt.hashSync(pass, 12),
                imagen: req.file? req.file.filename : "default-image.jpg",
                rol: 2
            })





            /*let usuarioNuevo = {
                    id:users[users.length - 1].id + 1,
                    name,
                    email,
                    pass: bcrypt.hashSync(pass, 12),
                    image: req.file ? req.file.filename : "default-image.jpg",
                    rol : "usuario"
            }
            users.push(usuarioNuevo)
            guardar(users)*/
         

            .then(user => {
            req.session.userLogin = {
                id : user.id,
                nombre : user.name,
                image: user.imagen,
                rol : user.rol
            }

            return res.redirect('/')
        })

        .catch(errores => res.send(errores))

        } else {   
           /* return res.send(errors.mapped())*/
            return res.render('register', {
                errors: errors.mapped(),
                old: req.body
            })
    }
},

    login: (req,res) => {
        return res.render('login')
    },

    processLogin:(req,res) => {
       
        let errors = validationResult(req)
        if (errors.isEmpty()){


        const {email,recordarme} = req.body
    
        /*let user = users.find(usuario => usuario.email === email)*/

        db.usuarios.findOne({
            where : {
                email
            }
        })
        .then(user => {

        req.session.userLogin = {
            id : user.id,
            nombre : user.name,
            image: user.imagen,
            rol : user.rol
        }
        if(recordarme){
            res.cookie('eltiempo',req.session.userLogin,{maxAge: 1000 * 60 * 60 * 24})
        }
         return res.redirect('/usuarios/perfil')
     })
     .catch(errores => res.send(errores))
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
        if(req.cookies.eltiempo){
            res.cookie('eltiempo','',{maxAge: -1})
        }
        return res.redirect('/')
    }

}