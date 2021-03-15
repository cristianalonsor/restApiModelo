// crea funciones y exportarlas
const { response, request } = require('express');
// importo la response para que sea mas simple el trabajar en el codigo

const usuariosGet = ( req = request, res = response) => {

    // extraer query params
    const query = req.query;

    res.status(200).json({
        mgs: 'GET exitoso',
        query
    })
};

const usuariosPut = ( req, res = response) => {

    // extraer valores dsde la url
    const id = req.params.id;

    res.status(200).json({
        mgs: 'PUT exitoso',
        id
    })
};

const usuariosPost = ( req, res = response) => {

    // la informacion que recibo desde el fornt viene cargada en el req.body
    // por lo que la variable queda cargada con toda la info y hay que limpiarla
    // si desestructuro el objeto solo recibo lo que me interesa en la peticion
    const { nombre, edad } = req.body


    res.status(201).json({
        mgs: 'POST exitoso',
        body
    })
};

const usuariosPatch = ( req, res = response) => {

    res.status(200).json({
        mgs: 'PATCH exitoso'
    })
};

const usuariosDelete = ( req, res = response) => {

    res.status(200).json({
        mgs: 'DELETE exitoso'
    })
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}
