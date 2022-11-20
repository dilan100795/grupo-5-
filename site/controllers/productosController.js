let products = require('../data/productos.json')

let db = require('../database/models')

module.exports = {
    detalle: (req,res) => {

        let id = +req.params.id
        let productoenDetalle = products.find((product) => product.id === id )
        
        return res.render('detalle',{
            product : productoenDetalle,
            products,
        })
    },

    carrito: (req,res) => {
        return res.render('carrito')
    },

   categorias: (req,res) => {
        
        let productsSuspenso =products.filter( product =>product.categoria === "Suspenso");
        let productsCienciaFiccion =products.filter( product =>product.categoria === "CienciaFiccion");
        let productsNovelas =products.filter(product =>product.categoria === "Novelas");
        let productsClasicos =products.filter( product =>product.categoria === "Clasicos");
        let productsPoesia =products.filter( product =>product.categoria === "Poesia");
		let productsEducativo =products.filter(product =>product.categoria === "Educativo");
        let productsInfantiles =products.filter( product =>product.categoria === "Infantiles");
		let productsNoFiccion =products.filter(product =>product.categoria === "NoFiccion");
	
        res.render('categorias',
        {
            productsSuspenso,
            productsCienciaFiccion,
            productsNovelas,
            productsClasicos,
            productsPoesia,
            productsEducativo,
            productsInfantiles,
            productsNoFiccion, 
        });
    },
   

}