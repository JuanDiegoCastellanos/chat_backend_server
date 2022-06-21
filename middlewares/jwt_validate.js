const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req= request, res= response, next) =>{
    //Leer token
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'no hay token'
        });

    }

    try {
        const { uid }  = jwt.verify(token,process.env.JWT_KEY);
        req.uid = uid;
    
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}
module.exports ={
    validateJWT
}