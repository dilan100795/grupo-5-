const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const db = require('../database/models')
/*const users = require('../data/usuarios.json')*/
/*const usuarios = require('../data/usuarios.json')*/
/*const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/usuarios.json')
    , JSON.stringify(dato, null, 4), 'utf-8')*/

module.exports = {
    register: (req, res) => {
        return res.render('register')
    },
    processRegister: (req, res) => {

        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'image',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }

        if (errors.isEmpty()) {
            /*return res.send (req.body)*/
            let { name, email, pass, } = req.body

            db.usuarios.create({
                name,
                email,
                password: bcrypt.hashSync(pass, 12),
                imagen: req.file ? req.file.filename : "default-image.jpg",
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
                        id: user.id,
                        nombre: user.name,
                        image: user.imagen,
                        email: user.email,
                        rol: user.rol,
                        direcion: user.direcion,
                        telefono: user.telefono,
                        provincia: user.provincia,
                        ciudad: user.ciudad,
                        codigo_postal: user.codigo_postal,
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

    login: (req, res) => {
        return res.render('login')
    },

    processLogin: (req, res) => {

        let errors = validationResult(req)
        if (errors.isEmpty()) {


            const { email, recordarme } = req.body

            /*let user = users.find(usuario => usuario.email === email)*/

            db.usuarios.findOne({
                where: {
                    email
                }
            })
                .then(user => {

                    req.session.userLogin = {
                        id: user.id,
                        nombre: user.name,
                        image: user.imagen,
                        email: user.email,
                        rol: user.rol,
                        direcion: user.direcion,
                        telefono: user.telefono,
                        provincia: user.provincia,
                        ciudad: user.ciudad,
                        codigo_postal: user.codigo_postal,
}
                    if (recordarme) {
                        res.cookie('eltiempo', req.session.userLogin, { maxAge: 1000 * 60 * 60 * 24 })
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
    perfil: (req, res) => {
        return res.render('usuarios/perfil')
    },
    editperfil: (req, res) => {
        console.log(req.body)


        let errors = validationResult(req)
        if (errors.isEmpty()) {


            const { name, codigo_postal, direcion, ciudad, provincia, telefono } = req.body

            /*let user = users.find(usuario => usuario.email === email)*/

            db.usuarios.findOne({
                where: {
                    id: req.params.id
                }
            })
                .then(user => {
                    console.log(user)
                    db.usuarios.update({
                        name: name,
                        email: user.email,
                        password: user.password,
                        rol: user.rol,
                        telefono: telefono.trim(),
                        ciudad: ciudad.trim(),
                        provincia: provincia.trim(),
                        codigo_postal: codigo_postal.trim(),
                        direcion: direcion.trim(),
                        imagen: req.file ? req.file.filename : user.imagen,
                    }, { where: { id: req.params.id } })
                        .then(data => {
                            if ((fs.existsSync(path.join(__dirname, '..', 'public', 'images', 'imagenesDePerfil', user.imagen)) && user.imagen !== 'default-image.jpg')){
                                fs.unlinkSync(path.join(__dirname, '..', 'public', 'images', 'imagenesDePerfil', user.imagen))
                            }

                            db.usuarios.findOne({
                                where: {
                                    id: req.params.id
                                }
                            }).then(usuario => {
                                req.session.userLogin = {
                                    id: usuario.id,
                                    nombre: usuario.name,
                                    email: user.email,
                                    image: usuario.imagen,
                                    rol: usuario.rol,
                                    direcion: usuario.direcion,
                                    telefono: usuario.telefono,
                                    provincia: usuario.provincia,
                                    ciudad: usuario.ciudad,
                                    codigo_postal: usuario.codigo_postal,

                                }
                                if (req.cookies.eltiempo) {
                                    res.cookie('eltiempo', '', { maxAge: -1 })

                                    res.cookie('eltiempo', req.session.userLogin, { maxAge: 1000 * 60 * 60 * 24 })
                                }
                                req.session.save( (err) => {
                                    req.session.reload((err) => {
                                        return res.redirect('/usuarios/perfil')
                    
                                    });
                                 });

                            }).catch(errores => res.send(errores))

                        }).catch(errores => res.send(errores))

                  
                })
                .catch(errores => res.send(errores))
            /*return res.send(req.body)*/
        } else {
            /* return res.send(errors.mapped())*/
            return res.render('usuarios/perfil', {
                errors: errors.mapped(),
                old: req.body
            })
        }

    },
    logout: (req, res) => {

        req.session.destroy();
        if (req.cookies.eltiempo) {
            res.cookie('eltiempo', '', { maxAge: -1 })
        }
        return res.redirect('/')
    }

}