const fs = require('fs');
const path = require('path')
const productos = require('../data/productos.json');
const historial = require('../data/historial.json');

let db = require('../database/models')

/* const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/productos.json')
   , JSON.stringify(dato, null, 4), 'utf-8');

const guardarHistorial = (dato) => fs.writeFileSync(path.join(__dirname, '../data/historial.json')
    , JSON.stringify(dato, null, 4), 'utf-8'); 
*/
module.exports = {
    listar: (req,res) => {

       db.Products.findAll({
            include: [{
                all: true
            }]
       })
       .then(productos => {
       /* return res.send(productos) */
            return res.render('administrador/listar',{
            productos,
            redirection: "historial"
        })  
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
    nuevo: async (req,res) => {
        try {
                let {Titulo,Autor,Idioma,Editorial,Tapa,Modelo,Categoria,Precio,Descuento,Stock,Descripcion,Subcategoria} = req.body;
                let productoNuevo = await db.Products.create ({
                    titulo: Titulo,
                    autor: Autor,
                    idioma: Idioma,
                    editorialesId: Editorial,
                    tapa: Tapa,
                    modelo: Modelo,
                    categoriesId: Categoria,
                    precio: +Precio,
                    descuento: +Descuento,
                    stock: +Stock,
                    descripcion: Descripcion,
                    subcategoria: Subcategoria,
                
                })
 /*      let imagenes = (imagen: req.files) ? img : ["default-image.jpg"];*/

            if (req.file) {

            /*let img = req.files.map(imagen => {
                return imagen.filename
            })
            await img.forEach(imagen=>{ 
                db.imagenes.create({
                name: imagen,
                productsId: productoNuevo.id
            })
        });*/
 
        let img = req.file.map(imagen=>{
            let nuevo= {
                name: imagen.filename,
                productsId: productoNuevo.id
            }
            return nuevo
        })
        let bulkInsert = await db.imagenes.create({img})
        
           } else {
            let imagenPorDefecto = await db.imagenes.create({
                name: "default-image.jpg" ,
                productsId: productoNuevo.id
            })

           }
              return res.redirect('/administrador/listar')

            } catch (error) {
            
                return res.send(error)
            }          
       /* productos.push(productoNuevo)
        guardar(productos)*/
    
    },
    editar:(req,res) => {
        let idParams = +req.params.id
        let categorias = db.categories.findAll()
        let producto = db.Products.findOne({
            where: {
                id : idParams
            },
            include: [{
                all:true
            }]
        })
        Promise.all([categorias,producto])

        .then(([categorias,producto]) => {

            return res.render('administrador/editar', {
                producto,
                categorias,
            })
    })
    .catch(error => res.send(error))


        /*let categoria = ['Suspenso', 'Ciencia Ficcion', 'No Ficcion', 'Poesia', 'Educativo', 'Novelas', 'Clasicos','Infantiles']

        id = +req.params.id
        let producto = productos.find((elemento) => {
            return elemento.id == id
        }) 
        /*return res.send(producto) Comprobar que esta llegando bien el elemento*/
       /* return res.render('administrador/editar', {
            producto,
            categoria
        })*/
    },
    actualizar:(req,res) => {
        idParams = +req.params.id
        let {Titulo,Autor,Idioma,Editorial,Tapa,Modelo,Categoria,Precio,Descuento,Stock,Descripcion,Subcategoria} = req.body;
        productos.forEach(producto => {
            if (producto.id === idParams) {
                producto.titulo = Titulo
                producto.autor = Autor
                producto.idioma = Idioma
                producto.editorial = Editorial
                producto.tapa = Tapa
                producto.modelo = +Modelo
                producto.categoria = Categoria
                producto.precio = +Precio
                producto.descuento = +Descuento
                producto.stock = +Stock
                producto.descripcion = Descripcion
                producto.subcategoria = Subcategoria
            }
        })
        guardar(productos)
        return res.redirect('/administrador/listar')
    },
    destruir:(req,res) => {
        idParams = +req.params.id

        let productoParaEliminar = productos.find((elemento) => {
            return elemento.id == idParams
        })

        historial.push(productoParaEliminar)
        guardarHistorial(historial)

        let productosModificados = productos.filter(producto => producto.id !== idParams)
        guardar(productosModificados)

        return res.redirect('/administrador/historial')
    },
    historial:(req,res) => {
        return res.render('/administrador/listar', {
            productos: historial,
            redirection: "listar"
        })
    } /*,
    basura:(req,res) => {
        idParams = +req.params.id

        let productosModificados = productos.filter(producto => producto.id !== idParams)
        guardar(productosModificados)
        
    }*/

}