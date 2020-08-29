const Usuario = require('../models/Usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const { validationResult } = require('express-validator');

exports.autenticarUsuario = async (req, res, next) => {
    //mostrar msjs de error de express-validator
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //buscar el usuario para saber si esta registrado
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({email });
   // console.log(usuario);

    if(!usuario){
        res.status(400).json({msg: 'El usuario no existe'});
        return next();
    }
    //verificar el password y autenticar el usuario
    if(bcrypt.compareSync(password, usuario.password)){
        //crear JWT
        const token = jwt.sign({
            id: usuario._id,
            email: usuario.email,
            nombre: usuario.nombre
        }, process.env.SECRETA, {
            expiresIn: '8h'
        } );
        
        res.json({token});

    }else {
        res.status(401).json({msg: 'password incorrecto'});
        return next();
    }

}

exports.usuarioAutenticado = (req, res, next) => {

    res.json({usuario: req.usuario});
}