let lista=['suspenso','novelas','poesia','infantiles', 'noFiccion', 'educativo', 'clasicos','cienciaFiccion'];
let categories =lista.map(categoria =>{
 return {
   name: categoria,
   createdAt : new Date,
   updatedAt : new Date
 }}
)

console.log(categories)
