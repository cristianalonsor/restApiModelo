// configuracion de las rutas
const { Router } = require('express');
const { usuariosPut, usuariosGet, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller');
const router = Router();

// enpoints => metodos de con el que trabajan las rutas
router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);


module.exports = router;
