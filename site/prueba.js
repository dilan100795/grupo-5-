let listado = require('./data/productos.json')

let imagenes = []

listado.forEach(producto => {
 
  let imagen = {
    nombre: producto.imagen,
    productsId: producto.id,
    createdAt : new Date,
    updatedAt : new Date
  }
  imagenes.push(imagen)
});

console.log(imagenes)
