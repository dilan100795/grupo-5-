let products = require('../data/productos.json')
module.exports = {
    home: (req,res) => {
        let productsOferta =products.filter( product =>product.subcategoria === "oferta");
		let productsVendidos =products.filter(product =>product.subcategoria === "masVendidos");
		let productsNovedades =products.filter( product =>product.subcategoria === "novedades");
		
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