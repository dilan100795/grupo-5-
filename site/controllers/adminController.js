const fs = require('fs');
const path = require('path')
const productos = require('../data/productos.json');
const historial = require('../data/historial.json');

const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify(dato, null, 4), 'utf-8');

const guardarHistorial = (dato) => fs.writeFileSync(path.join(__dirname, '../data/historial.json')
    , JSON.stringify(dato, null, 4), 'utf-8');

module.exports = {
    listar: (req,res) => {
        return res.render('administrador/listar',{
            productos,
            redirection: "historial"
        })
    },
    crear:(req,res) => {
        return res.render('administrador/crear')
    },
    nuevo:(req,res) => {
        let {Titulo,Autor,Idioma,Editorial,Tapa,Modelo,Categoria,Precio,Descuento,Stock,Descripcion,Subcategoria} = req.body;

        let productoNuevo = {
            id : productos[productos.length - 1].id + 1,
            titulo: Titulo,
            autor: Autor,
            idioma: Idioma,
            editorial: Editorial,
            tapa: Tapa,
            modelo: Modelo,
            categoria: Categoria,
            precio: Precio,
            descuento: Descuento,
            stock: Stock,
            descripcion: Descripcion,
            subcategoria: Subcategoria,
            imagen: ["default-image.jpg"]
        }
        productos.push(productoNuevo)
        guardar(productos)

       return res.redirect('/administrador/listar')
    },
    editar:(req,res) => {
        let categoria = ['Suspenso', 'Ciencia Ficcion', 'No Ficcion', 'Poesia', 'Educativo', 'Novelas', 'Clasicos','Infantiles']

        id = +req.params.id
        let producto = productos.find((elemento) => {
            return elemento.id == id
        }) 
        /*return res.send(producto) Comprobar que esta llegando bien el elemento*/
        return res.render('administrador/editar', {
            producto,
            categoria
        })
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

        return res.redirect('/administrador/listar')
    },
    historial:(req,res) => {
        return res.render('/administrador/listar', {
            productos: historial,
            redirection: "listar"
        })
    }

}