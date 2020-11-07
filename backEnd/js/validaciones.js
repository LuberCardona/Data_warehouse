const sequelize = require('./conexiondb.js');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;



// Validar que el token sea verdadero - TOKEN
const validacionToken = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        jwt.verify(token, SECRET);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json('Token no válido');
    }
}

// VALIDAR PERFIL DE USUARIO
const validarPerfil = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const payload = jwt.decode(token);
        if (payload.perfilUsuario === 1){ 
            next();
        }else{
            res.status(401).json('Usuario no autorizado para realizar esta acción');
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    validacionToken,
    validarPerfil,
}