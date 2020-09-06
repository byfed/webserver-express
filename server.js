const express = require('express')
const app = express()

const hbs = require('hbs');

//middleware - se ejecuta en todas las peticiones
app.use(express.static(__dirname + '/public'));

//usamos el template engine handlebars en su version para express
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//helpers
//Se movieron a un fichero independiente
// Nota: Como no devuelve nada, ni se van a usar como llamadas a funciones, basta con hacer el require y no hace falta export.
require('./hbs/helpers');

//Configuración para utilización del puerto en heroku
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {

    //El render es de express no de hbs
    res.render('home', {
        nombre: "federico pacheco",
        // sustituido por helper: funcion que se dispara cuando el template lo requiere 
        //anio: new Date().getFullYear()
    });
})

app.get('/about', (req, res) => {

    // al usar el helper ya no es necesario enviar ningún objeto
    // res.render('about', {
    //     anio: new Date().getFullYear()
    // });

    res.render('about');
})

//si se usa el app.use sustituye al app.get. Es mejor no usar los dos simultaneamente.

// app.get('/', (req, res) => {
//     let salida = {
//         nombre: 'Fernando',
//         edad: 32,
//         url: req.url
//     }
//     res.send(salida);
//     //    res.send('Hola mundo')
// })

app.get('/data', (req, res) => {

    res.send('Hola data')
})

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
})