// configuracion de las rutas
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosPut, usuariosGet, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller');

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { valirdarCampos } = require('../middlewares/validar-campos');

const router = Router();

// enpoints => metodos de con el que trabajan las rutas
router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol', 'No es rol valido').custom( esRolValido ),
    valirdarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es necesario').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail().custom( emailExiste ),
    check('password', 'Necesita contraseña').isLength({min: 6}),
    check('rol', 'No es rol valido').custom( esRolValido ),
    valirdarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    valirdarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;
