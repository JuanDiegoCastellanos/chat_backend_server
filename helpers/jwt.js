const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {

   return new Promise( (resolve, reject)=>{
    const payload = { uid };

    // Firmar uid, y poner secret key, si este es vulnerable se cambia 
    // y eso anula los jwt ya generados
    jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: '24h'
    }, (err, token )=> {
        if(err){
            // no se pudo generar token
            reject('No se pudo generar el JWT'); 
        }else{
            // token!
            resolve(token);
        }
    });

   });

}
module.exports = {
    generarJWT
}