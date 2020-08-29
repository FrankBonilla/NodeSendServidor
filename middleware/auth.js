const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

module.exports = (req, res, next) => {

    const authHeader = req.get('Authorization');

    if(authHeader){
        //obtener el token
        const token = authHeader.split(' ')[1];
        //comprobar el jwt
        try {

            const usuario = jwt.verify(token, process.env.SECRETA);
            //console.log(usuario);
            //res.json({usuario});
            req.usuario = usuario;
        } catch (error) {

            console.log(error);
            console.log('JWT no válido');
        }
    
    }

    return next();
}