const fs = require('fs')
let productos = require('./productos.json')

let ultimoId = productos[productos.length - 1].id + 1;
console.log(ultimoId);
