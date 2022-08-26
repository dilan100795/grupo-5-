const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const methodOverride = require('method-override')

app.use(express.static(path.resolve(__dirname,'public')));

/*Requerir las rutas*/
let indexRouter = require('./routes/index')
let administradorRouter = require('./routes/administrador')
let productosRouter = require('./routes/productos')
let usuariosRouter = require('./routes/usuarios')

/*View Engine Setup*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Trabajar con metodos HTTP (post) */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* Trabajar con put y delete */
app.use(methodOverride('_method'))


/* Trabajar con put y delete */
app.use(methodOverride('_method'))

/*Middlewares*/
/*app.use(express.json());*/
app.use(express.static(path.resolve(__dirname,'public')))

/*Rutas*/
app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/productos', productosRouter);
app.use('/administrador', administradorRouter);

/*app.get('*',(req,res) => res.sendFile(path.resolve(__dirname,'views','404.html')));*/
app.listen(port,() => console.log(`Servidor corriendo en http://localhost:${port}`))