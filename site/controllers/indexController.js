let products = require('../data/productos.json')

let db = require('../database/models')

module.exports = {
    home: (req,res) => {

        /*let productos = db.product.findAll()
        Promise.all(productos)

        .then((productos) => { return res.render

        })
        .catch(error => res.send(error))*/

        let productsOferta =products.filter( product =>product.subcategoria === "Oferta");
		let productsVendidos =products.filter(product =>product.subcategoria === "MasVendidos");
		let productsNovedades =products.filter( product =>product.subcategoria === "Novedades");
		
        res.render('home',
        { productsOferta,
            productsVendidos,
            productsNovedades,
        });
    },
    nosotros: (req,res) => {
        return res.render('nosotros')
    }
 /*   error404: (req,res) => {
        return res.render('404')
    }*/

}