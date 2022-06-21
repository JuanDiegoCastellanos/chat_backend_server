const {response} = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const  newUser = async (req, res = response, next) => {

    const { email, password } = req.body;

    try {
        const existeEmail = await User.findOne({email: email}); 

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = User(req.body);

        // Encriptar clave
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();

        //Generar JWT
        const token =await generarJWT(usuario.id);

    
        res.json({
            ok: true,
            usuario, 
            token,
        });   
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok:false,
                msg: 'Hable con el admin'
            }
        );
        
    }
}


const loginUser  = async (req, res = response , next) => {

    const { email, password } = req.body;

    try {
        const usuarioDB = await User.findOne({email: email}); 

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales inválidas'
            });
        }

        // Validar Password 
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(! validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales Inválidas'
            });
        } 
        
        // Generar JWT
        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        }); 

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok:false,
                msg: 'Hable con el admin'
            }
        );
        
    }
}

const reNewToken = async( req, res = response, next) =>{

    // const uid uid del usuario 
    const uid= req.uid;

    // generar un nuevo JWT, generarJWT, uid
    const token = await generarJWT(uid);

    // Obtener el usuario por el uid, Usuario.findById ...
    const userDB = await User.findById(uid);

    // Responder con el nuevo token
 
    res.json({
        ok: true,
        usuario: userDB,
        token
    }); 
       
}

module.exports = {
    newUser,
    loginUser,
    reNewToken
}