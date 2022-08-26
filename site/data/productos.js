const fs = require('fs')
let productos = require('./productos.json')

let ultimoId = productos[productos.length - 1].id + 1;
console.log(ultimoId);

/*nuevo producto
let nuevoProducto = {
    "id": 26,
    "titulo": "Poesia Completa",
    "autor": "Alejandra Pizarnik",
    "precio": 4226,
    "idioma": "español",
    "editorial": "Lumen",
    "tapa": "blanda",
    "modelo": 2015,
    "categoria": "poesia",
    "descuento": 5,
    "stock": 8,
    "imagen": "poesia-completa-alejandra_pizarnik.webp",
    "descripcion": "Obra poética completa de una de las escritoras argentinas más emblemáticas de la segunda mitad de siglo, la controvertida, polémica y malograda Alejandra Pizarnik. Nuestra edición, a cargo de Ana Becciu, incluye los libros de poemas editados en vida de la autora y los poemas inéditos compilados a partir de manuscritos.",
    "subcategoria": "oferta"
  }
  */