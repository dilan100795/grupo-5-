const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator')
const users = require('../data/usuarios.json')
const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/usuarios.json')
    , JSON.stringify(dato, null, 4), 'utf-8')
module.exports = {
    register: (req,res) => {
        return res.render('register')
    },
    login: (req,res) => {
        return res.render('login')
    },

    processLogin:(req,res) => {
       
        let errors = validationResult(req)
        if (errors.isEmpty()){


        const {email,recordarme} = req.body
        let user = users.find(usuario => usuario.email === email)

        req.session.userLogin = {
            id : user.id,
            nombre : user.nombre,
            rol : user.rol
        }
        if(recordarme){
            res.cookie('eltiempo',req.session.userLogin,{maxAge: 1000 * 60 * 60 * 24})
        }
         return res.redirect('/usuarios/perfil')

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