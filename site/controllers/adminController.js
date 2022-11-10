const fs = require('fs');
const path = require('path')
const productos = require('../data/productos.json');
const historial = require('../data/historial.json');

let db = require('../database/models')

module.exports = {
    listar: (req,res) => {

       db.Products.findAll({
            include: [
                "categoria",
                "editorial"
            ]
       })
       .then(productos => {
       /*return res.send(productos)*/
            return res.render('administrador/listar',{
            productos,
            redirection: "historial"
        })  
        })  .catch (error =>
         {
            return res.send(error)
        })
    },

    crear: async(req,res) => {
        try {
            let categorias = await db.categories.findAll()
            let editoriales = await db.editoriales.findAll()
            return res.render('administrador/crear',{
                categorias,
                editoriales
            })
        } catch (error) {
            return res.send(error)
        } 
    },
    nuevo: (req,res) => {
        /*return res.send (req.files)*/

        let {Titulo,Autor,Idioma,Editorial,Tapa,Modelo,Categoria,Precio,Descuento,Stock,Descripcion,Subcategoria} = req.body;
        db.Products.create ({
            titulo: Titulo,
            autor: Autor,
            idioma: Idioma,
            editorialesId: Editorial,
            tapa: Tapa,
            modelo: +Modelo,
            categoriesId: Categoria,
            precio: +Precio,
            descuento: +Descuento,
            stock: +Stock,
            descripcion: Descripcion,
            subcategoria: Subcategoria,
                
    })
  /*let imagenes = (imagen: req.files) ? img : ["default-image.jpg"];*/

    .then(productoNuevo => {
        if (req.files) {

            let img = req.files.map(imagen=>{
                let nuevo= {
                    name: imagen.filename,
                    productsId: productoNuevo.id
                    }
            return nuevo
            })
        console.log(img)
            db.imagenes.bulkCreate(img)
            .then(imagenes => {
            return res.redirect('/administrador/listar')
            })
    
        } else {
                db.imagenes.create({
                    name: "default-image.jpg" ,
                    productsId: productoNuevo.id
                })
    
                .then(imagenes => {
                    return res.redirect('/administrador/listar')
                      })
            
      }
    })

    .catch(error => res.send(error))
       /* productos.push(productoNuevo)
        guardar(productos)*/
    },

    editar:(req,res) => {

        let idParams = +req.params.id
        let categorias = db.categories.findAll()
        let editoriales = db.editoriales.findAll()
        let producto = db.Products.findOne({
            where: {
                id : idParams
            },
            include: [
                "categoria",
                "editorial",
                "imagenes"
            ]
        })
        Promise.all([categorias,producto,editoriales])

        .then(([categorias,producto,editoriales]) => {
        /* return res.send(imagenes) */
            return res.render('administrador/editar', {
                producto,
                categorias,
                editoriales
            })
    })
    .catch(error => res.send(error))

    },
    actualizar:(req,res) => {

        const idParams = +req.params.id
        const {Titulo,Autor,Idioma,Editorial,Tapa,Modelo,Categoria,Precio,Descuento,Stock,Descripcion,Subcategoria} = req.body;

        let producto = db.Products.findOne({
            where: {
                id : idParams
            },
            include: [
                "categoria",
                "editorial",
                "imagenes"
            ]
        })
        let actualizacion = db.Products.update({
            titulo: Titulo,
            autor: Autor,
            idioma: Idioma,
            editorialesId: Editorial,
            tapa: Tapa,
            modelo: +Modelo,
            categoriesId: Categoria,
            precio: +Precio,
            descuento: +Descuento,
            stock: +Stock,
            descripcion: Descripcion,
            subcategoria: Subcategoria,
        },{
            where: {
                id : idParams
            }
        })
        Promise.all([producto,actualizacion])

        .then(([producto, actualizacion]) => { 
            
            if (req.file) {

            let img = req.file.map(imagen=>{
                let nuevo= {
                    name: imagen.filename,
                    productsId: productos.id
                    }
            return nuevo
            })
        }
    })

    .catch(error => res.send(error))

    },
    destruir:(req,res) => {
        
        let idParams = +req.params.id
        db.Products.findOne({
            where : {
                id : idParams
            },
            include : [
                "categoria",
                "editorial",
                "imagenes"
            ]
        })
        .then(producto => {

            db.historiales.create({
                titulo: producto.titulo,
                autor: producto.autor,
                idioma: producto.idioma,
                editorialesId: producto.editorialesId,
                tapa: producto.tapa,
                modelo: producto.modelo,
                categoriesId: producto.categoriesId,
                precio: producto.precio,
                descuento: producto.descuento,
                stock: producto.stock,
                descripcion: producto.descripcion,
                subcategoria: producto.subcategoria
            })
            .then(historial => {
                let promesas = []
    
                let imagen1 = db.imagenes_historiales.create({
                    nombre: producto.imagenes[0].name,
                    historialesId: historial.id
                })
                let imagen2 = db.imagenes_historiales.create({
                    nombre: producto.imagenes[1].name,
                    historialesId: historial.id
                })
                let imagen3 = db.imagenes_historiales.create({
                    nombre: producto.imagenes[2].name,
                    historialesId: historial.id
                })
                let imagen4 = db.imagenes_historiales.create({
                    nombre: producto.imagenes[3].name,
                    historialesId: historial.id
                })
    
                Promise.all([imagen1,imagen2,imagen3,imagen4])
                .then(([imagen1,imagen2,imagen3,imagen4])=>{
                    db.Products.destroy({
                        where : {
                            id : idParams
                        }
                    })
                    .then(producto => {
                        return res.redirect('/administrador/historial')
                    }) .catch(error => res.send(error))
                }) .catch(error => res.send(error))
            }) .catch(error => res.send(error))

        })
    .catch(error => res.send(error))
    },
    historial:(req,res) => {

        db.historiales.findAll({
            include : [
                "categoria",
                "editorial"
            ]
        })   
            .then(historial => {
                /* return res.send(historial) */
                return res.render('administrador/listar', {
                    productos: historial,
                    redirection: "listar"
                })
            }) .catch(error => res.send (error)) 
    }}
    /*basura:(req,res) => {
        idParams = +req.params.id

        db.historiales.findOne({
            where: {id : idParams},
            include : [
            "imagen_historial"
            ]
    })
        .then(historiales => {
            console.log(historiales)
            console.log(idParams)
            let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', 'public', 'images', 'productosImages', dato))
            historiales.imagen_historial.forEach(imagen => {
                if (ruta(imagen.nombre) && (imagen.nombre !== "default-image.jpg")) {
                    fs.unlinkSync(path.join(__dirname, '..', 'public', 'images', 'productosImages', imagen.nombre))
                }
         })
         db.historiales.destroy({
            where : {
                id : idParams
            }
        })
        .then(eliminar => {
            return res.redirect('administrador/listar')
        }) 
        .catch(errores => res.send(errores))

        }) .catch(error => res.send (error))

        
    }
}*/
