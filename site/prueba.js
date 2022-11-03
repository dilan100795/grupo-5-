let listado=['Fontana','Debolsillo','Alienta','Booket', 'PlanetaLector', 'Click', 'Urano']
let editoriales =listado.map(editorial =>{
 return {
   name: editorial,
   createdAt : new Date,
   updatedAt : new Date
 }})

console.log(editoriales)
