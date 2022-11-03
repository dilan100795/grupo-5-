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
        
        let productsSuspenso =products.filter( product =>product.categoria === "suspenso");
        let productsCienciaFiccion =products.filter( product =>product.categoria === "cienciaFiccion");
        let productsNovelas =products.filter(product =>product.categoria === "novelas");
        let productsClasicos =products.filter( product =>product.categoria === "clasicos");
        let productsPoesia =products.filter( product =>product.categoria === "poesia");
		let productsEducativo =products.filter(product =>product.categoria === "educativo");
        let productsInfantiles =products.filter( product =>product.categoria === "infantiles");
		let productsNoFiccion =products.filter(product =>product.categoria === "noFiccion");
	
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