// crea funciones y exportarlas
const {
    response,
    request
} = require('express');
// importo la response para que sea mas simple el trabajar en el codigo
const Usuario = require('../models/usuario');
// la primera letra mayusucula para poder crear instancias del modelo
const bcrypt = require('bcryptjs');


const usuariosGet = async (req = request, res = response) => {

    // extraer query params
    const {
        limite = 5, desde = 0
    } = req.query;

    const query = {
        estado: true
    };

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    })
};

const usuariosPut = async (req, res = response) => {

    // extraer valores dsde la url
    const {
        id
    } = req.params;
    // extraer valores desde el body
    const {
        _id,
        password,
        google,
        correo,
        ...resto
    } = req.body;

    // validacion contra base de datos
    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        mgs: 'Actualización exitosa',
        usuario
    })
};

const usuariosPost = async (req, res = response) => {

    // la informacion que recibo desde el fornt viene cargada en el req.body
    // por lo que la variable queda cargada con toda la info y hay que limpiarla
    // si desestructuro el objeto solo recibo lo que me interesa en la peticion
    const {
        nombre,
        correo,
        password,
        rol
    } = req.body;
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });

    // encriptar password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // guardar en la base de datos
    await usuario.save();

    res.status(201).json({
        mgs: 'POST exitoso',
        usuario
    })
};

const usuariosPatch = (req, res = response) => {

    res.status(200).json({
        mgs: 'PATCH exitoso'
    })
};

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    // borrado fisicamente -> no recomendado
    // const usuario = await Usuario.findByIdAndDelete( id );

    // "borrado" cambiando el estado para no perder integridad en caso de que se ligue con datos
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });

    res.status(200).json({
        mgs: ` ${usuario.nombre} borrado con exito`,
        usuario
    })
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}