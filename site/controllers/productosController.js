let products = require('../data/productos.json')

module.exports = {
    detalle: (req,res) => {

        let id = +req.params.id
        let productoenDetalle = products.find((product) => product.id === id )
        
        return res.render('detalle',{
            product : productoenDetalle,
            products,
         
        })


       /* let categoriaSeleccionada = req.params.categoria
        let categoria = ['suspenso','educativo','poesia','infantiles','noFiccion','cienciaFiccion','clasicos','novelas']
        
        productoPorCategoria = products.filter(product =>product.categoria === categoriaSeleccionada)*/

        /*res.render('productos',{
            categoria,
            categoriaSeleccionada,
            products,
            productoPorCategoria
        })*/
    },





    carrito: (req,res) => {
        return res.render('carrito')
    },


}