//81.0.25.172
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//crear el servidor
const app = express();

//conectar a la base de datos
conectarDB();
//habilitar cors
console.log(process.env.FRONTNED_URL);
const opcionesCors = {
    origin: process.env.FRONTNED_URL
}
app.use(cors(opcionesCors));

//puerto de la app
const port = process.env.PORT || 4500;

//habilitar leer los valores de body
app.use(express.json());

//habilitar carpeta pública
app.use( express.static('uploads'));


//rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));

//arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})