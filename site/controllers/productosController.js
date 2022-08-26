let products = require('../data/productos.json')
module.exports = {
    detalle: (req,res) => {nd
        let id = +req.params.id
        let productoenDetalle = products.find((product) => product.id === id )
        return res.render('detalle',{
            product : productoenDetalle,
            products
        })
    },
    carrito: (req,res) => {
        return res.render('carrito')
    }
}