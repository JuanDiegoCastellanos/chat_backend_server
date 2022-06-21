/*
    path: api/login

*/

const { Router } = require('express');
const { check } = require('express-validator');

const { newUser, loginUser, reNewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/fields_validate');
const { validateJWT } = require('../middlewares/jwt_validate');

const router = Router();

/**
 * Argumento N°1 es el path o ruta
 * Argumento N°2 son los middleware encargados de hacer validaciones
 * Argumento N°3 es el controlador o dicho de otra manera la función a ejecutar
 * 
 * check permite verificar campo por campo
 */
router.post('/new',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El campo no debe estar vacio').notEmpty(),
    check('email','El campo debe ser de tipo email').isEmail(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validateFields,
],newUser);

// post: / 
// Validate email and password
router.post('/',[
    check('email','El campo no debe estar vacio').notEmpty(),
    check('email','El campo debe ser de tipo email').isEmail(),
    check('password', 'El campo no debe estar vacio').notEmpty(),
    validateFields
],loginUser);

// validateJWT
router.get('/renew', validateJWT, reNewToken);

module.exports = router;