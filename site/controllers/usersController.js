const fs = require('fs');
const path = require('path')
const {validationResult} = require('express-validator')
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
            return res.send(req.body)
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
    }
}