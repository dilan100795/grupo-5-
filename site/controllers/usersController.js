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


        const {email} = req.body
        let user = users.find(usuario => usuario.email === email)

        req.session.userLogin = {
            id : user.id,
            nombre : user.nombre,
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